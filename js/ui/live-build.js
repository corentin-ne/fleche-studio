// @ts-check
/* =========================================================================
   Construction en direct : pendant le calcul, la grille se dessine sous les
   yeux de l'utilisateur à partir des instantanés envoyés par le moteur
   (MF.builder / MF.wordsearch via MF.generator).

   Le DOM est construit une fois par cadre (taille, forme), puis seules les
   cases qui changent sont mises à jour et animées (Web Animations API) :
   les lettres d'un mot nouvellement posé apparaissent l'une après l'autre.

   Les instantanés passent par une file rejouée à l'image : le remplissage,
   qui ne dure qu'une fraction de seconde côté moteur, se voit mot par mot.

   La grille en construction porte déjà le design choisi (fond, cadre, cases,
   couleurs, police) : quand la grille est trouvée, le style ne change pas.

   Jeux de chiffres et de logique : le moteur ne rend la grille qu'une fois
   trouvée ; elle se remplit alors à l'écran (cases données, puis la solution).
   En partie (option `secret`), les lettres et chiffres à trouver restent cachés.
   ========================================================================= */
window.MF = window.MF || {};

MF.liveBuild = (() => {
  const { esc } = MF.util;
  const { t } = MF.i18n;
  const ARROW = { right: '→', down: '↓', downRight: '↳', rightDown: '⤵' };
  const DIR = { H: [0, 1], V: [1, 0] };
  const WAIT_FRAME = { w: 13, h: 17, top: 0, shape: 'rect' }; // grille fantôme avant le premier instantané
  const RING = 2 * Math.PI * 22;
  const STEPS = {
    builder: [t('Placement de tes mots'), t('Remplissage'), t('Choix final')],
    meles: [t('Cachette de tes mots'), t('Lettres de remplissage')],
    logic: [t('Tirage d\'une solution'), t('Vérification : une seule solution')],
  };
  const DRAIN_FRAMES = 22; // la file est rattrapée en ~22 images : visible sans prendre de retard
  const HOLD_MS = 650; // la grille terminée reste un instant avant le rendu final
  const LOGIC_HOLD_MS = 1800; // jeux de logique : le temps de voir la solution se remplir
  const WAVE_MS = 900; // durée de la vague de remplissage d'une grille de logique
  const PUZZLE_MS = 350; // l'énigme seule, un instant, avant que la solution arrive
  const MAX_FINISH_MS = 2400; // jamais plus d'attente que ça pour l'utilisateur
  const reduced = () => matchMedia('(prefers-reduced-motion: reduce)').matches;

  let st = null; // { root, grid, cells, state, words, frameKey, ... }
  /** Position de la grille animée au moment où elle passe la main (la grille finale part de là). */
  let handoff = null;
  function capture() {
    if (!st?.grid?.isConnected) return;
    const r = st.grid.getBoundingClientRect();
    if (r.width > 0) handoff = { left: r.left, top: r.top, width: r.width, height: r.height, at: performance.now() };
  }
  /** Relais pour le rendu final : la place de la grille animée, si elle vient de se terminer. */
  function takeHandoff() {
    const h = handoff;
    handoff = null;
    return h && performance.now() - h.at < 1500 ? h : null;
  }

  /* ---------------- Montage ---------------- */
  function mount(box, o) {
    box.innerHTML = `
      <div class="live-build waiting">
        <div class="lb-stage">
          <div class="lb-aura" aria-hidden="true"><i></i><i></i><i></i></div>
          <div class="lb-board">
            <div class="lb-frame"><div class="lb-grid" role="img" aria-label="${esc(t('Grille en cours de construction'))}"></div></div>
            <div class="lb-scan" aria-hidden="true"></div>
          </div>
        </div>
        <div class="lb-hud glass" role="status" aria-live="polite">
          <div class="lb-ring">
            <svg viewBox="0 0 52 52" aria-hidden="true">
              <defs><linearGradient id="lb-grad" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="var(--accent)"/><stop offset="1" stop-color="var(--lb-accent-2)"/></linearGradient></defs>
              <circle class="track" cx="26" cy="26" r="22"/>
              <circle class="bar" cx="26" cy="26" r="22" stroke-dasharray="${RING}" stroke-dashoffset="${RING}"/>
            </svg>
            <b class="lb-pct">0%</b>
          </div>
          <div class="lb-info">
            <div class="lb-title"><span class="lb-live"><i></i>${t('En direct')}</span><span class="lb-phase">${t('Préparation…')}</span></div>
            <div class="lb-stats"></div>
            <ol class="lb-steps"></ol>
          </div>
          <button class="btn btn-sm btn-ghost lb-stop" title="${esc(t('Arrêter le calcul'))}">${MF.icons.svg('x')}${t('Arrêter')}</button>
        </div>
      </div>`;
    const root = box.firstElementChild;
    st = {
      box, root,
      grid: root.querySelector('.lb-grid'),
      bar: root.querySelector('.bar'),
      pct: root.querySelector('.lb-pct'),
      phase: root.querySelector('.lb-phase'),
      stats: root.querySelector('.lb-stats'),
      steps: root.querySelector('.lb-steps'),
      hud: root.querySelector('.lb-hud'),
      stage: root.querySelector('.lb-stage'),
      cells: [], state: [], words: new Set(), frameKey: null, frame: null,
      queue: [], last: null, shown: null, live: {}, raf: 0, idle: [], skinKey: null, secret: false,
      target: null, fixed: false, settled: false, placedKey: null, predict: null,
    };
    root.querySelector('.lb-stop').onclick = () => o.onCancel?.();
  }

  /* ---------------- Habillage : le design de la grille ---------------- */
  /** Variables CSS tirées du design (mêmes couleurs résolues que le rendu final). */
  function skin(design) {
    if (!design) return;
    const key = MF.util.hash(JSON.stringify([design.accent, design.colors, design.background, design.frame, design.voids, design.cell, design.font.letter, design.poster.radius]));
    if (key === st.skinKey) return;
    st.skinKey = key;
    const d = design, C = MF.design.resolve(d), M = MF.design.metrics(d);
    const k = v => `calc(var(--cs) * ${(v / 100).toFixed(3)})`;
    const vars = {
      '--lb-bg': MF.backgrounds.css(d.background, { assetUrl: MF.assets.url }),
      '--lb-poster-r': k(d.poster.radius),
      '--lb-poster-shadow': d.background.type === 'none' ? 'none' : '',
      '--lb-frame': C.frame,
      '--lb-frame-w': k(d.frame.width),
      '--lb-frame-r': k(d.frame.radius),
      '--lb-grid-bg': d.voids === 'frame' ? C.frame : 'transparent',
      '--lb-gap': d.cell.gap > 0 ? k(d.cell.gap) : '0px',
      '--lb-lw': d.cell.gap > 0 || !d.cell.line ? '0px' : `max(.5px, ${k(d.cell.line / 2)})`,
      '--lb-line': C.line,
      '--lb-r': k(M.radius),
      '--lb-letter-r': d.cell.letterShape === 'circle' ? '50%' : k(M.radius),
      '--lb-letter': C.letter,
      '--lb-ink': C.ink,
      '--lb-clue': C.clue,
      '--lb-arrow': C.arrow,
      '--lb-void': { frame: C.frame, light: C.void, hatch: `repeating-linear-gradient(135deg, ${C.letter} 0 5px, ${C.line} 5px 6.5px)` }[d.voids] || 'transparent',
      '--lb-void-shaped': d.voids === 'transparent' ? `color-mix(in srgb, ${C.letter} 35%, transparent)` : '',
      '--lb-font': M.letterFont,
      '--lb-weight': M.letterWeight,
      '--lb-shadow': d.cell.shadow ? '0 calc(var(--cs) * .06) calc(var(--cs) * .16) rgba(0, 0, 0, .2)' : 'none',
    };
    for (const [prop, v] of Object.entries(vars)) if (v) st.root.style.setProperty(prop, v); else st.root.style.removeProperty(prop);
    st.root.classList.add('skinned');
  }

  /* ---------------- Grille ---------------- */
  function buildFrame(frame) {
    const { w, h, top = 0, shape = 'rect' } = frame;
    const mask = MF.shapes.mask(shape, w, h, top);
    const frag = document.createDocumentFragment();
    const cells = [];
    for (let r = 0; r < h; r++) {
      for (let c = 0; c < w; c++) {
        const el = document.createElement('i');
        el.className = r < top ? 'band' : mask[r * w + c] ? '' : 'out';
        el.dataset.base = el.className;
        // Délai de « vague » pour le scintillement de la grille fantôme
        el.style.setProperty('--d', `${((r + c) % 12) * 90}ms`);
        frag.appendChild(el);
        cells.push(el);
      }
    }
    st.root.classList.toggle('shaped', shape !== 'rect');
    st.grid.style.setProperty('--w', w);
    st.grid.style.setProperty('--h', h);
    st.grid.replaceChildren(frag);
    st.cells = cells;
    st.state = new Array(w * h).fill('');
    st.words = new Set();
    st.frame = frame;
    // Nouvelle grille (page suivante) : elle reprend sa taille et sa place dans la zone
    st.fixed = false;
    st.settled = false;
    st.placedKey = null;
    st.stage.style.transform = '';
    if (!reduced()) {
      st.grid.animate([
        { opacity: 0, transform: 'perspective(900px) rotateX(14deg) scale(.94)', filter: 'blur(8px)' },
        { opacity: 1, transform: 'none', filter: 'none' },
      ], { duration: 520, easing: 'cubic-bezier(.2,.8,.2,1)' });
    }
  }

  /**
   * État voulu de chaque case : '' | 'L|X|t' (lettre, mot perso ?) | 'C|→↓' (définition) | 'G|X' (filigrane)
   * et, pour les jeux de logique : 'K|' (case noire), 'H|12' (nombre d'un picross), 'O|' (hors grille).
   */
  function targetState(snap) {
    // Jeu de logique : cases déjà décrites (logicSnaps)
    if (snap.cells) return { out: snap.cells, delays: new Map(snap.delays), seen: st.words };
    const { w, h } = snap.frame;
    const out = new Array(w * h).fill('');
    const letters = new Map(); // idx -> { ch, theme }
    const clues = new Map(); // idx -> flèches
    const delays = new Map(); // idx -> retard d'apparition (lettres des mots nouveaux)
    const seen = new Set();
    for (const wd of snap.words || []) {
      const [dr, dc] = wd.dir ? DIR[wd.dir] : [wd.dr, wd.dc];
      const key = `${dr},${dc}:${wd.r},${wd.c}:${wd.word}`;
      seen.add(key);
      const fresh = !st.words.has(key);
      for (let i = 0; i < wd.word.length; i++) {
        const k = (wd.r + i * dr) * w + (wd.c + i * dc);
        if (k < 0 || k >= out.length) continue;
        const cur = letters.get(k);
        letters.set(k, { ch: wd.word[i], theme: (cur?.theme) || wd.src === 'theme' });
        if (fresh && !delays.has(k)) delays.set(k, i * 38);
      }
      if (wd.arrow && wd.sr >= 0 && wd.sr < h && wd.sc >= 0 && wd.sc < w) {
        const k = wd.sr * w + wd.sc;
        clues.set(k, (clues.get(k) || '') + (ARROW[wd.arrow] || '•'));
      }
    }
    letters.forEach((v, k) => { out[k] = `L|${v.ch}|${v.theme ? 't' : ''}`; });
    clues.forEach((v, k) => { if (!out[k]) out[k] = `C|${v}`; });
    // Mots mêlés terminés : les lettres de remplissage scintillent en place
    (snap.rows || []).forEach((row, r) => [...row].forEach((ch, c) => {
      const k = r * w + c;
      if (!out[k] && /[A-Z]/.test(ch)) { out[k] = `L|${ch}|`; delays.set(k, Math.random() * 420); }
    }));
    for (const wd of snap.ghost || []) {
      const [dr, dc] = wd.dir ? DIR[wd.dir] : [wd.dr, wd.dc];
      for (let i = 0; i < wd.word.length; i++) {
        const k = (wd.r + i * dr) * w + (wd.c + i * dc);
        if (k >= 0 && k < out.length && !out[k]) out[k] = `G|${wd.word[i]}`;
      }
    }
    return { out, delays, seen };
  }

  function paint(snap) {
    const { out, delays, seen } = targetState(snap);
    const motion = !reduced();
    // Gros changement d'un coup (nouvelle variante) : on raccourcit la cascade pour rester vif
    const burst = !snap.cells && delays.size > 80 ? 0.35 : 1;
    out.forEach((next, k) => {
      const prev = st.state[k];
      if (next === prev) return;
      const el = st.cells[k];
      let [kind, a, b] = next.split('|');
      // En partie : la case apparaît, mais ce qu'il faut trouver n'est jamais écrit dans la page
      if (st.secret && (kind === 'L' || kind === 'G') && b !== 'gv') { a = a && ' '; b = ''; }
      const base = el.dataset.base;
      el.className = `${base}${kind ? ` ${kind}` : ''}${b ? ` ${b}` : ''}`.trim();
      if (kind === 'C') el.innerHTML = [...a].map(x => `<span>${esc(x)}</span>`).join('');
      else el.textContent = kind ? a : '';
      st.state[k] = next;
      if (!motion) return;
      // Nouvelle lettre, ou case vide d'un jeu de logique qui reçoit sa solution
      if (kind === 'L' && a && (!prev.startsWith('L|') || prev === 'L||')) {
        el.animate([
          { opacity: 0, transform: 'translateY(-40%) scale(.3) rotateX(90deg)', filter: 'blur(6px)' },
          { opacity: 1, transform: 'translateY(4%) scale(1.12)', filter: 'none', offset: 0.6 },
          { opacity: 1, transform: 'none' },
        ], { duration: 460, delay: (delays.get(k) || 0) * burst, easing: 'cubic-bezier(.2,.8,.2,1)', fill: 'backwards' });
      } else if (kind === 'L' && prev.startsWith('L|') && prev !== 'L||') {
        // Lettre qui devient mot perso (ou l'inverse) : petit éclat
        el.animate([{ transform: 'scale(1.18)' }, { transform: 'none' }], { duration: 320, easing: 'cubic-bezier(.34,1.56,.64,1)' });
      } else if (kind === 'C' && !prev.startsWith('C|')) {
        el.animate([
          { opacity: 0, transform: 'scale(.5) rotate(-12deg)' },
          { opacity: 1, transform: 'none' },
        ], { duration: 380, delay: 60 * burst, easing: 'cubic-bezier(.34,1.56,.64,1)', fill: 'backwards' });
      } else if ((kind === 'K' || kind === 'H' || (kind === 'L' && !a)) && !prev) {
        el.animate([{ opacity: 0, transform: 'scale(.6)' }, { opacity: 1, transform: 'none' }], { duration: 320, delay: delays.get(k) || 0, easing: 'ease-out', fill: 'backwards' });
      } else if (!kind && prev && !prev.startsWith('G|')) {
        el.animate([{ opacity: 0.2, transform: 'scale(.7)' }, { opacity: 1, transform: 'none' }], { duration: 280, easing: 'ease-out' });
      }
    });
    st.words = seen;
  }

  /**
   * Taille des cases quand la place finale n'est pas encore connue : la grille et son cadre
   * tiennent dans toute la zone (le panneau d'état flotte par-dessus, il ne prend pas de place).
   */
  function fit() {
    const f = st.frame;
    if (!f || st.fixed) return;
    const W = st.box.clientWidth - 28, H = st.box.clientHeight - 28;
    let cs = Math.max(9, Math.min(46, Math.floor(Math.min(W / f.w, H / f.h))));
    st.grid.style.setProperty('--cs', `${cs}px`);
    // Le cadre et les marges de l'affiche s'ajoutent aux cases : on réduit si ça déborde
    const b = st.root.querySelector('.lb-board')?.getBoundingClientRect();
    if (b?.width && (b.width > W || b.height > H)) {
      cs = Math.max(8, Math.floor(cs * Math.min(W / b.width, H / b.height)));
      st.grid.style.setProperty('--cs', `${cs}px`);
    }
  }

  /**
   * La grille animée prend la taille et la place qu'aura la grille finale (affiche centrée dans
   * la zone) : prévues dès le premier instantané, exactes quand la grille est trouvée (petit
   * glissement si besoin). Le rendu final la remplace sans saut ni changement de taille.
   * @param {{ gw: number, gx: number, gy: number, sw: number, sh: number }} tg  géométrie finale (px)
   */
  function placeAt(tg, animate) {
    const box = st.box, grid = st.grid, stage = st.stage;
    const r0 = grid.getBoundingClientRect(); // là où on la voit (pour glisser depuis cette place)
    if (!r0.width || !(tg.gw > 0)) return;
    stage.style.transform = '';
    st.fixed = true;
    // Mesures de mise en page, sans les animations en cours (apparition de la grille, glissement)
    const layout = () => {
      let x = 0, y = 0;
      for (let e = /** @type {HTMLElement | null} */ (grid); e && e !== stage; e = /** @type {HTMLElement | null} */ (e.offsetParent)) {
        x += e.offsetLeft + (/** @type {HTMLElement | null} */ (e.offsetParent)?.clientLeft || 0);
        y += e.offsetTop + (/** @type {HTMLElement | null} */ (e.offsetParent)?.clientTop || 0);
      }
      const sr = stage.getBoundingClientRect();
      return { left: sr.left + x, top: sr.top + y, width: grid.offsetWidth, x, y };
    };
    // Taille : deux passes (les espaces entre cases ne suivent pas tout à fait la taille des cases)
    let cs = parseFloat(grid.style.getPropertyValue('--cs')) || 28;
    for (let i = 0; i < 2; i++) {
      cs *= tg.gw / (grid.offsetWidth || tg.gw);
      grid.style.setProperty('--cs', `${cs}px`);
    }
    const r1 = layout();
    // Place : l'affiche finale est centrée dans la zone (sans rogner si elle déborde)
    const b = box.getBoundingClientRect(), cst = getComputedStyle(box);
    const pl = parseFloat(cst.paddingLeft), pt = parseFloat(cst.paddingTop);
    const innerW = box.clientWidth - pl - parseFloat(cst.paddingRight), innerH = box.clientHeight - pt - parseFloat(cst.paddingBottom);
    const fx = b.left + box.clientLeft + pl + Math.max(0, (innerW - tg.sw) / 2) + tg.gx;
    const fy = b.top + box.clientTop + pt + Math.max(0, (innerH - tg.sh) / 2) + tg.gy;
    const to = `translate(${fx - r1.left}px, ${fy - r1.top}px)`;
    stage.style.transformOrigin = `${r1.x}px ${r1.y}px`;
    stage.style.transform = to;
    if (animate && !reduced()) {
      stage.animate([
        { transform: `translate(${r0.left - r1.left}px, ${r0.top - r1.top}px) scale(${r0.width / r1.width})` },
        { transform: to },
      ], { duration: 460, easing: 'cubic-bezier(.22,.8,.24,1)' });
    }
  }

  /* ---------------- Panneau d'état ---------------- */
  const fmt = n => MF.i18n.num(Math.round(n));
  /** Unité accordée au nombre (le nombre est affiché à part, en gras). */
  const unit = (n, one, many) => t((MF.i18n.lang === 'fr' ? n > 1 : n !== 1) ? many : one);

  function hud(live, snap) {
    const done = snap?.phase === 'done';
    const p = done ? 1 : Math.max(0, Math.min(1, live.progress || 0));
    st.bar.setAttribute('stroke-dashoffset', String(RING * (1 - p)));
    st.pct.textContent = `${Math.round(p * 100)}%`;

    const engine = snap?.engine || live.engine || 'builder';
    const steps = STEPS[engine] || STEPS.builder;
    const step = !snap ? -1 : done ? steps.length - 1 : snap.phase === 'fill' ? 1 : 0;
    let phase = t('Préparation…');
    if (snap) phase = done ? t('Grille prête') : snap.phase === 'fill' ? t('Remplissage · variante {n}/{total}', { n: snap.variant, total: snap.variants }) : steps[0];
    if (st.phase.textContent !== phase) st.phase.textContent = phase;
    st.root.classList.toggle('done', done);

    const chips = [];
    if (live.pages > 1) chips.push(`<span class="lb-chip page">${t('Grille {n} / {total}', { n: live.page + 1, total: live.pages })}</span>`);
    if (snap?.cells) chips.push(`<span class="lb-chip">${snap.size}</span>`);
    else if (snap) {
      const all = snap.placed === snap.total;
      chips.push(`<span class="lb-chip ${all ? 'ok' : ''}"><b>${snap.placed}</b>/${snap.total} ${unit(snap.total, 'mot perso', 'mots perso')}</span>`);
      const fillers = (snap.words || []).filter(w => w.src === 'curated').length;
      if (fillers) chips.push(`<span class="lb-chip"><b>${fillers}</b> ${unit(fillers, 'mot courant', 'mots courants')}</span>`);
      const tries = snap.attempts || 0;
      chips.push(`<span class="lb-chip"><b>${fmt(tries)}</b> ${unit(tries, 'essai', 'essais')}</span>`);
      chips.push(`<span class="lb-chip">${snap.frame.w} × ${snap.frame.h - (snap.frame.top || 0)}</span>`);
    }
    st.stats.innerHTML = chips.join('');
    const stepsHtml = steps.map((s, i) => `<li class="${i < step || done ? 'done' : i === step ? 'on' : ''}">${esc(s)}</li>`).join('');
    if (st.steps.innerHTML !== stepsHtml) st.steps.innerHTML = stepsHtml;
  }

  /* ---------------- Lecture de la file ---------------- */
  function show(snap) {
    const frame = snap?.frame || WAIT_FRAME;
    const key = `${frame.w}x${frame.h}|${frame.top || 0}|${frame.shape || 'rect'}|${snap ? 1 : 0}`;
    st.root.classList.toggle('waiting', !snap);
    st.root.classList.toggle('filling', snap?.phase === 'fill');
    if (key !== st.frameKey) { buildFrame(frame); st.frameKey = key; }
    if (snap) paint(snap);
    st.shown = snap;
    if (!snap) return;
    if (snap.phase === 'done' && st.target && !st.settled) { st.settled = true; placeAt(st.target, true); st.placedKey = key; return; }
    // Place prévue dès que la grille a ses dimensions : elle ne changera plus de taille
    if (st.placedKey !== key) {
      let tg = st.target;
      if (!tg) try { tg = st.predict?.(frame, snap) || null; } catch { tg = null; }
      if (tg) { placeAt(tg, false); st.placedKey = key; }
    }
  }

  function pump() {
    st.raf = 0;
    const n = st.queue.length;
    if (n) {
      // Plus la file est longue, plus on avance vite : on rattrape le moteur sans à-coups
      const batch = st.queue.splice(0, Math.max(1, Math.ceil(n / DRAIN_FRAMES)));
      show(batch[batch.length - 1]);
    }
    hud(st.live, st.shown);
    fit();
    if (st.queue.length) st.raf = requestAnimationFrame(pump);
    else st.idle.splice(0).forEach(fn => fn());
  }

  const schedule = () => { if (!st.raf) st.raf = requestAnimationFrame(pump); };
  const active = box => !!st && st.box === box && st.root.parentNode === box;

  /* ---------------- API ---------------- */
  /**
   * Affiche (ou met à jour) la construction en direct dans `box`. À appeler pour chaque
   * instantané reçu : ils sont mis en file et rejoués à l'image.
   * @param live  objet { snapshot?, progress, page, pages, engine }
   * @param o     objet { onCancel, design, secret, place(frame, snap) } : design de la grille, appliqué dès la
   *              grille fantôme ; place : géométrie prévue de la grille finale (px) pour ces dimensions
   */
  function update(box, live = {}, o = {}) {
    if (!active(box)) { mount(box, o); skin(o.design); show(null); }
    skin(o.design);
    st.predict = o.place || null;
    if (!!o.secret !== st.secret) {
      st.secret = !!o.secret;
      st.root.classList.toggle('secret', st.secret);
      // Passage du jeu au studio (ou l'inverse) en cours de calcul : cases redessinées
      if (st.shown) { st.state.fill(''); paint(st.shown); }
    }
    st.live = live;
    if (live.snapshot && live.snapshot !== st.last) { st.last = live.snapshot; st.queue.push(live.snapshot); }
    schedule();
  }

  /**
   * Instantanés d'une page « logic » : l'énigme (cases données, cases noires, nombres),
   * puis la solution qui se remplit en vague depuis le coin haut gauche.
   * @param {any} page
   * @param {any} puzzle
   */
  function logicSnaps(page, puzzle) {
    const m = MF.logicModel.from(page, puzzle, MF.design.metrics(puzzle.design), puzzle.layout);
    const w = m.cols, h = m.rows;
    const start = new Array(w * h).fill('O|'), full = start.slice();
    const startDelays = [], fullDelays = [];
    m.cells.forEach((row, r) => row.forEach((cell, c) => {
      const k = r * w + c;
      const wave = (r + c) / Math.max(1, w + h - 2);
      let a = 'O|', b = a;
      if (cell?.type === 'letter') {
        // Nombre de la case (hitori, mosaïque, coloriage…) : visible dès le départ
        const lab = cell.label ? `L|${cell.label}|gv` : cell.item ? `L|${cell.item.emoji || '●'}|gv` : 'L||';
        if (cell.icon) b = `L|${cell.icon === 'start' ? '▶' : '★'}|gv`;
        else if (cell.mark === 'dot') b = cell.ch === 'O' ? 'L|●|' : 'L|×|x';
        else if (cell.mark === 'binary') b = `L|${cell.ch}|${cell.given ? 'gv' : ''}`;
        else if (cell.mark === 'paint' || cell.mark === 'diff') b = lab;
        else if (cell.mark) b = cell.ch === '1' ? 'L| |f' : lab;
        else b = `L|${cell.ch}|${cell.given ? 'gv' : ''}`;
        a = cell.given || cell.icon ? b : lab;
      } else if (cell?.type === 'icon') a = b = 'L|🌳|gv';
      else if (cell?.type === 'scene') a = b = cell.item ? `L|${cell.item.emoji || '●'}|gv` : 'L||';
      else if (cell?.type === 'sym') a = b = `L|${cell.ch}|gv`;
      else if (cell?.type === 'block' || cell?.type === 'clue') a = b = 'K|';
      else if (cell?.type === 'hint') a = b = `H|${cell.text}`;
      else if (cell?.type === 'void') a = b = '';
      start[k] = a;
      full[k] = b;
      startDelays.push([k, Math.round(wave * 380)]);
      if (b !== a) fullDelays.push([k, Math.round(PUZZLE_MS + wave * WAVE_MS + Math.random() * 140)]);
    }));
    const frame = { w, h, top: 0, shape: 'rect' };
    const size = `${w} × ${h}`;
    return [
      { engine: 'logic', phase: 'build', frame, size, cells: start, delays: startDelays },
      { engine: 'logic', phase: 'done', frame, size, cells: full, delays: fullDelays },
    ];
  }

  /**
   * Termine l'animation sur la grille retenue (résultat du moteur), puis rend la main.
   * Résolu quand la file est rejouée et la grille montrée un instant (borné à MAX_FINISH_MS).
   * `puzzle` : la grille, pour les jeux de logique (remplissage de la page trouvée).
   * `place` : géométrie de la grille finale à l'écran (px), où la grille animée vient se poser.
   */
  function finish(box, result, total, puzzle, place = null) {
    // Onglet en arrière-plan : pas d'images à rejouer, le résultat s'affiche directement
    if (!active(box) || !result || document.hidden) return Promise.resolve();
    st.target = place;
    if (result.engine === 'logic') {
      let snaps;
      try { snaps = logicSnaps(result, puzzle); } catch (e) { console.error(e); return Promise.resolve(); }
      st.last = snaps[1];
      st.queue.push(...snaps);
      return settle(LOGIC_HOLD_MS);
    }
    const done = {
      engine: result.engine, phase: 'done', frame: result.frame, total,
      attempts: result.attempts ?? st.last?.attempts ?? 0,
      words: result.words.map(w => ({ ...w, src: w.src || 'theme' })),
      placed: total - (result.unplaced?.length || 0),
      rows: result.engine === 'meles' ? result.rows : null,
    };
    st.last = done;
    st.queue.push(done);
    return settle(HOLD_MS);
  }

  /** Rejoue la file, garde la grille terminée `hold` ms, puis rend la main (jamais plus de MAX_FINISH_MS). */
  function settle(hold) {
    schedule();
    return new Promise(resolve => {
      const t0 = performance.now();
      const done = () => { capture(); resolve(); };
      const end = () => setTimeout(done, Math.max(0, Math.min(hold, MAX_FINISH_MS - (performance.now() - t0))));
      const timer = setTimeout(() => { if (st) { st.queue.length && show(st.queue.pop()); st.queue.length = 0; fit(); } done(); }, MAX_FINISH_MS);
      st.idle.push(() => { clearTimeout(timer); end(); });
    });
  }

  return { update, finish, active, takeHandoff };
})();
