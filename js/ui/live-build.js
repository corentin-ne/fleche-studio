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
   ========================================================================= */
window.MF = window.MF || {};

MF.liveBuild = (() => {
  const { esc } = MF.util;
  const ARROW = { right: '→', down: '↓', downRight: '↳', rightDown: '⤵' };
  const DIR = { H: [0, 1], V: [1, 0] };
  const WAIT_FRAME = { w: 13, h: 17, top: 0, shape: 'rect' }; // grille fantôme avant le premier instantané
  const RING = 2 * Math.PI * 22;
  const STEPS = {
    builder: ['Placement de tes mots', 'Remplissage', 'Choix final'],
    meles: ['Cachette de tes mots', 'Lettres de remplissage'],
  };
  const DRAIN_FRAMES = 22; // la file est rattrapée en ~22 images : visible sans prendre de retard
  const HOLD_MS = 650; // la grille terminée reste un instant avant le rendu final
  const MAX_FINISH_MS = 2200; // jamais plus d'attente que ça pour l'utilisateur
  const reduced = () => matchMedia('(prefers-reduced-motion: reduce)').matches;

  let st = null; // { root, grid, cells, state, words, frameKey, ... }

  /* ---------------- Montage ---------------- */
  function mount(box, o) {
    box.innerHTML = `
      <div class="live-build waiting">
        <div class="lb-stage">
          <div class="lb-aura" aria-hidden="true"><i></i><i></i><i></i></div>
          <div class="lb-board">
            <div class="lb-frame"><div class="lb-grid" role="img" aria-label="Grille en cours de construction"></div></div>
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
            <div class="lb-title"><span class="lb-live"><i></i>En direct</span><span class="lb-phase">Préparation…</span></div>
            <div class="lb-stats"></div>
            <ol class="lb-steps"></ol>
          </div>
          <button class="btn btn-sm btn-ghost lb-stop" title="Arrêter le calcul">${MF.icons.svg('x')}Arrêter</button>
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
      cells: [], state: [], words: new Set(), frameKey: null, frame: null,
      queue: [], last: null, shown: null, live: {}, raf: 0, idle: [], skinKey: null,
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
    if (!reduced()) {
      st.grid.animate([
        { opacity: 0, transform: 'perspective(900px) rotateX(14deg) scale(.94)', filter: 'blur(8px)' },
        { opacity: 1, transform: 'none', filter: 'none' },
      ], { duration: 520, easing: 'cubic-bezier(.2,.8,.2,1)' });
    }
  }

  /** État voulu de chaque case : '' | 'L|X|t' (lettre, mot perso ?) | 'C|→↓' (définition) | 'G|X' (filigrane). */
  function targetState(snap) {
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
    const burst = delays.size > 80 ? 0.35 : 1;
    out.forEach((next, k) => {
      const prev = st.state[k];
      if (next === prev) return;
      const el = st.cells[k];
      const [kind, a, b] = next.split('|');
      const base = el.dataset.base;
      el.className = `${base}${kind ? ` ${kind}` : ''}${b ? ` ${b}` : ''}`.trim();
      if (kind === 'C') el.innerHTML = [...a].map(x => `<span>${esc(x)}</span>`).join('');
      else el.textContent = kind ? a : '';
      st.state[k] = next;
      if (!motion) return;
      if (kind === 'L' && !prev.startsWith('L|')) {
        el.animate([
          { opacity: 0, transform: 'translateY(-40%) scale(.3) rotateX(90deg)', filter: 'blur(6px)' },
          { opacity: 1, transform: 'translateY(4%) scale(1.12)', filter: 'none', offset: 0.6 },
          { opacity: 1, transform: 'none' },
        ], { duration: 460, delay: (delays.get(k) || 0) * burst, easing: 'cubic-bezier(.2,.8,.2,1)', fill: 'backwards' });
      } else if (kind === 'L') {
        // Lettre qui devient mot perso (ou l'inverse) : petit éclat
        el.animate([{ transform: 'scale(1.18)' }, { transform: 'none' }], { duration: 320, easing: 'cubic-bezier(.34,1.56,.64,1)' });
      } else if (kind === 'C' && !prev.startsWith('C|')) {
        el.animate([
          { opacity: 0, transform: 'scale(.5) rotate(-12deg)' },
          { opacity: 1, transform: 'none' },
        ], { duration: 380, delay: 60 * burst, easing: 'cubic-bezier(.34,1.56,.64,1)', fill: 'backwards' });
      } else if (!kind && prev && !prev.startsWith('G|')) {
        el.animate([{ opacity: 0.2, transform: 'scale(.7)' }, { opacity: 1, transform: 'none' }], { duration: 280, easing: 'ease-out' });
      }
    });
    st.words = seen;
  }

  /** Taille des cases : la grille entière tient dans la zone, au-dessus du panneau d'état. */
  function fit() {
    const f = st.frame;
    if (!f) return;
    const W = st.box.clientWidth - 40;
    const H = st.box.clientHeight - st.hud.offsetHeight - 64;
    const cs = Math.max(9, Math.min(46, Math.floor(Math.min(W / f.w, H / f.h))));
    st.grid.style.setProperty('--cs', `${cs}px`);
  }

  /* ---------------- Panneau d'état ---------------- */
  const fmt = n => Math.round(n).toLocaleString('fr-FR');

  function hud(live, snap) {
    const done = snap?.phase === 'done';
    const p = done ? 1 : Math.max(0, Math.min(1, live.progress || 0));
    st.bar.setAttribute('stroke-dashoffset', String(RING * (1 - p)));
    st.pct.textContent = `${Math.round(p * 100)}%`;

    const engine = snap?.engine || live.engine || 'builder';
    const steps = STEPS[engine] || STEPS.builder;
    const step = !snap ? -1 : done ? steps.length - 1 : snap.phase === 'fill' ? 1 : 0;
    let phase = 'Préparation…';
    if (snap) phase = done ? 'Grille prête' : snap.phase === 'fill' ? `Remplissage · variante ${snap.variant}/${snap.variants}` : steps[0];
    if (st.phase.textContent !== phase) st.phase.textContent = phase;
    st.root.classList.toggle('done', done);

    const chips = [];
    if (live.pages > 1) chips.push(`<span class="lb-chip page">Grille ${live.page + 1} / ${live.pages}</span>`);
    if (snap) {
      const all = snap.placed === snap.total;
      chips.push(`<span class="lb-chip ${all ? 'ok' : ''}"><b>${snap.placed}</b>/${snap.total} mots perso</span>`);
      const fillers = (snap.words || []).filter(w => w.src === 'curated').length;
      if (fillers) chips.push(`<span class="lb-chip"><b>${fillers}</b> ${fillers > 1 ? 'mots courants' : 'mot courant'}</span>`);
      const tries = snap.attempts || 0;
      chips.push(`<span class="lb-chip"><b>${fmt(tries)}</b> ${tries > 1 ? 'essais' : 'essai'}</span>`);
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
   * @param live { snapshot?, progress, page, pages, engine }
   * @param o { onCancel, design } : design de la grille, appliqué dès la grille fantôme
   */
  function update(box, live = {}, o = {}) {
    if (!active(box)) { mount(box, o); skin(o.design); show(null); }
    skin(o.design);
    st.live = live;
    if (live.snapshot && live.snapshot !== st.last) { st.last = live.snapshot; st.queue.push(live.snapshot); }
    schedule();
  }

  /**
   * Termine l'animation sur la grille retenue (résultat du moteur), puis rend la main.
   * Résolu quand la file est rejouée et la grille montrée un instant (borné à MAX_FINISH_MS).
   */
  function finish(box, result, total) {
    // Onglet en arrière-plan : pas d'images à rejouer, le résultat s'affiche directement
    if (!active(box) || !result || document.hidden) return Promise.resolve();
    const done = {
      engine: result.engine, phase: 'done', frame: result.frame, total,
      attempts: result.attempts ?? st.last?.attempts ?? 0,
      words: result.words.map(w => ({ ...w, src: w.src || 'theme' })),
      placed: total - (result.unplaced?.length || 0),
      rows: result.engine === 'meles' ? result.rows : null,
    };
    st.last = done;
    st.queue.push(done);
    schedule();
    return new Promise(resolve => {
      const t0 = performance.now();
      const end = () => setTimeout(resolve, Math.max(0, Math.min(HOLD_MS, MAX_FINISH_MS - (performance.now() - t0))));
      const timer = setTimeout(() => { if (st) { st.queue.length && show(st.queue.pop()); st.queue.length = 0; } resolve(); }, MAX_FINISH_MS);
      st.idle.push(() => { clearTimeout(timer); end(); });
    });
  }

  return { update, finish, active };
})();
