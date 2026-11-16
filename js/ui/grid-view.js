// @ts-check
/* =========================================================================
   Vue de la grille à l'écran : affiche (SVG, identique aux exports) + jeu.
   Modes : 'solution' (lettres visibles), 'blank' (grille vierge), 'play' (on joue).
   Jeu : saisie case par case (fléchés, croisés, codés, sudoku…), sélection à
   la souris / au doigt des mots cachés (mêlés, mot mystère), ou cases à
   cocher (picross, logigramme).
   ========================================================================= */
window.MF = window.MF || {};

MF.gridView = (() => {
  const U = 100;
  let ctx = null;

  /**
   * @param {any} [o]  options :
   *   o.cell      taille d'une case à l'écran (px)
   *   o.entries   saisies du joueur
   *   o.assetUrl  id d'image -> URL
   *   o.key       identité de la grille affichée (progression) : même clé et même dessin -> DOM conservé
   */
  function render(container, model, puzzle, o = {}) {
    const { mode = 'solution', entries = {} } = o;
    if (!model.cols) { container.innerHTML = ''; ctx = null; return null; }
    const scene = MF.scene.compose(model, puzzle, { letters: mode === 'solution', photoMarks: o.photoMarks, assetUrl: o.assetUrl });
    // Taille d'une case à l'écran : fixe, ou calculée pour que toute l'affiche tienne (fonction)
    const cell = typeof o.cell === 'function' ? o.cell(scene.W, scene.H) : o.cell || 64;
    const width = Math.round((scene.W * cell) / U);
    const markup = MF.renderers.svg(scene);
    // Dessin identique (zoom, rendu sans effet visible) : on garde le DOM, la partie en cours et le focus.
    // Évite de reconstruire des milliers de nœuds SVG pendant qu'on fait glisser un curseur.
    if (ctx && ctx.container === container && container.contains(ctx.sheet) && !o.animate
      && ctx.markup === markup && ctx.mode === mode && ctx.key === o.key) {
      ctx.sheet.style.width = `${width}px`;
      ctx.sheet.classList.remove('enter');
      Object.assign(ctx, { scene, model, puzzle, o, cellPx: cell });
      return ctx;
    }
    // Re-rendu en cours de partie (zoom, clavier du téléphone qui redimensionne l'écran) :
    // on garde la case active, sinon le clavier virtuel se refermerait
    const act = container.contains(document.activeElement) && document.activeElement.matches('.play-cell') ? /** @type {HTMLElement} */ (document.activeElement) : null;
    const keep = act && ctx && mode === 'play' ? { r: act.dataset.r, c: act.dataset.c, dir: ctx.dir } : null;
    container.innerHTML = `<div class="sheet ${mode === 'play' ? 'playing' : ''} ${o.animate && !o.morph ? 'enter' : ''}" style="width:${width}px">${markup}</div>`;
    const sheet = /** @type {HTMLElement} */ (container.firstElementChild);
    if (o.morph) morphFrom(sheet, o.morph, scene, model);
    ctx = { container, sheet, scene, model, puzzle, mode, entries: { ...entries }, dir: keep?.dir || 'H', o, cellPx: cell, markup, key: o.key };
    if (mode === 'play') {
      (model.game === 'meles' ? mountWordSearch : model.play === 'dots' ? mountDots : model.toggle ? mountToggle : mountPlay)(sheet);
      if (model.mystery) mountMystery(sheet);
    }
    if (keep) container.querySelector(`.play-cell[data-r="${keep.r}"][data-c="${keep.c}"]`)?.focus({ preventScroll: true });
    sheet.querySelector('.mf-svg').addEventListener('click', e => {
      const m = /** @type {any} */ (e.target).closest('.missing');
      if (m) ctx.o.onMissing?.(m.dataset.key);
    });
    return ctx;
  }

  /**
   * Relais depuis la construction en direct : la grille finale part de la place et de la taille
   * de la grille animée, puis glisse vers sa place (pas de saut de zoom à la fin du calcul).
   */
  function morphFrom(sheet, from, scene, model) {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches || !sheet.animate) return;
    const sb = sheet.getBoundingClientRect();
    if (!sb.width) return;
    const k = sb.width / scene.W;
    const gx = scene.grid.ox * k, gy = scene.grid.oy * k, gw = model.cols * U * k;
    const s = from.width / gw;
    if (!(s > 0.2 && s < 6)) return;
    const dx = from.left - (sb.left + gx), dy = from.top - (sb.top + gy);
    sheet.style.transformOrigin = `${gx}px ${gy}px`;
    const anim = sheet.animate([
      { transform: `translate(${dx}px, ${dy}px) scale(${s})` },
      { transform: 'none' },
    ], { duration: 620, easing: 'cubic-bezier(.22,.8,.24,1)' });
    anim.finished.then(() => { sheet.style.transformOrigin = ''; }, () => {});
  }

  const pct = (v, total) => `${(v / total) * 100}%`;
  const cellBox = (r, c) => ({ x: ctx.scene.grid.ox + c * U, y: ctx.scene.grid.oy + r * U });

  /* ---------- Surbrillance d'un mot ---------- */
  function cellsOf(wid) {
    const s = ctx?.model.slots.get(wid);
    if (!s) return [];
    const out = [...s.cells];
    if (ctx.model.game === 'fleches' && s.holder) out.push(s.holder);
    return out;
  }

  function highlight(wid, { flash = true, scroll = true } = {}) {
    if (!ctx) return false;
    ctx.container.querySelectorAll('.hl').forEach(el => el.classList.remove('hl', 'flash'));
    const cells = cellsOf(wid);
    /** @type {any} */
    let first = null;
    cells.forEach(([r, c]) => {
      const el = ctx.container.querySelector(`.mf-svg [data-r="${r}"][data-c="${c}"]`);
      if (el) { el.classList.add('hl'); if (flash) el.classList.add('flash'); first = first || el; }
    });
    if (scroll && first) first.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
    return cells.length > 0;
  }

  /* ---------- Saisie (fléchés, croisés, codés) ---------- */
  const key = (r, c) => `${r},${c}`;

  function mountPlay(sheet) {
    const { W, H } = ctx.scene;
    const layer = document.createElement('div');
    layer.className = 'play-layer';
    const C = MF.design.resolve(ctx.puzzle.design);
    layer.style.setProperty('--play-ink', C.ink);
    layer.style.setProperty('--play-font', MF.design.font(ctx.puzzle.design.font.letter).css);
    const MC = MF.design.multiColors(ctx.puzzle.design, C, ctx.model);
    const codes = ctx.model.game === 'codes';
    const digits = !!ctx.model.digits;
    // Numbrix : nombres de plusieurs chiffres dans une case
    const maxLen = ctx.model.maxLen || 1;
    // Chiffre ou lettre dans le coin de la case (numéros, codes, cages) : la saisie descend un peu
    const corner = codes || ctx.model.game === 'croises' || ctx.model.game === 'calcudoku';
    ctx.model.cells.forEach((row, r) => row.forEach((cell, c) => {
      if (cell.type !== 'letter') return;
      const inp = document.createElement('input');
      inp.className = 'play-cell';
      inp.maxLength = maxLen;
      inp.autocomplete = 'off';
      inp.spellcheck = false;
      inp.setAttribute('autocapitalize', 'characters');
      if (digits) inp.inputMode = 'numeric';
      inp.setAttribute('aria-label', MF.i18n.t('Case ligne {row}, colonne {col}', { row: r + 1, col: c + 1 }));
      // Lecteur d'écran : la définition du mot en cours est lue avec la case
      inp.setAttribute('aria-describedby', 'clue-text');
      inp.dataset.r = r; inp.dataset.c = c;
      const given = cell.given || (codes && ctx.model.givens.has(cell.ch));
      if (given) { inp.value = cell.ch; inp.readOnly = true; inp.classList.add('given'); } else inp.value = ctx.entries[key(r, c)] || '';
      const { x, y } = cellBox(r, c);
      Object.assign(inp.style, {
        left: pct(x, W), top: pct(y, H), width: pct(U, W), height: pct(U, H),
        fontSize: `${ctx.cellPx * (corner ? 0.46 : maxLen > 1 ? 0.4 : 0.52)}px`,
        paddingTop: corner ? `${ctx.cellPx * 0.16}px` : '0',
      });
      // Multicolore : chaque lettre saisie prend la couleur de sa case
      if (MC) inp.style.setProperty('--play-ink', MC.letter(r, c, C.ink));
      layer.appendChild(inp);
    }));
    sheet.appendChild(layer);

    layer.addEventListener('focusin', e => {
      const t = /** @type {HTMLInputElement} */ (e.target);
      if (!t.matches('.play-cell')) return;
      t.select(); // une nouvelle lettre remplace l'ancienne
      markWord(+t.dataset.r, +t.dataset.c);
    });
    // Case déjà remplie : la lettre tapée remplace (même si le curseur est resté en place)
    layer.addEventListener('keydown', e => {
      const t = /** @type {HTMLInputElement} */ (e.target);
      if (t.matches('.play-cell') && !t.readOnly && e.key.length === 1 && !e.ctrlKey && !e.metaKey && t.value.length >= maxLen && t.selectionStart === t.selectionEnd) t.select();
    });
    layer.addEventListener('mousedown', e => {
      const t = /** @type {HTMLInputElement} */ (e.target);
      if (!t.matches('.play-cell') || document.activeElement !== t) return;
      const cell = ctx.model.cells[+t.dataset.r][+t.dataset.c];
      if (cell.words.H && cell.words.V) { ctx.dir = ctx.dir === 'H' ? 'V' : 'H'; markWord(+t.dataset.r, +t.dataset.c); }
    });
    layer.addEventListener('keydown', onKey);
    layer.addEventListener('input', e => {
      const t = /** @type {HTMLInputElement} */ (e.target);
      if (t.readOnly) return;
      const ch = (digits ? t.value.replace(/[^0-9]/g, '') : MF.util.normalize(t.value)).slice(-maxLen);
      t.value = ch;
      const r = +t.dataset.r, c = +t.dataset.c;
      if (codes) {
        // Mots codés : une lettre trouvée remplit toutes les cases du même nombre
        const code = ctx.model.cells[r][c].code;
        ctx.model.cells.forEach((row, rr) => row.forEach((cl, cc) => {
          if (cl.type !== 'letter' || cl.code !== code) return;
          const inp = inputAt(rr, cc);
          if (inp && !inp.readOnly) { inp.value = ch; inp.classList.remove('wrong', 'right'); setEntry(rr, cc, ch, false); }
        }));
        ctx.o.onEntries?.(ctx.entries);
      } else {
        t.classList.remove('wrong', 'right');
        setEntry(r, c, ch);
      }
      if (ch && ch.length >= maxLen) move(r, c, 1, ctx.dir, true);
      checkDone();
    });
  }

  function setEntry(r, c, ch, notify = true) {
    if (ch) ctx.entries[key(r, c)] = ch; else delete ctx.entries[key(r, c)];
    if (notify) ctx.o.onEntries?.(ctx.entries);
  }

  const inputAt = (r, c) => ctx.container.querySelector(`.play-cell[data-r="${r}"][data-c="${c}"]`);

  /** Case suivante dans le sens donné (saute les cases données des mots codés si `skipGiven`). */
  function move(r, c, step, dir = ctx.dir, skipGiven = false) {
    const [dr, dc] = dir === 'H' ? [0, step] : [step, 0];
    let rr = r + dr, cc = c + dc;
    let next = inputAt(rr, cc);
    while (skipGiven && next?.readOnly) { rr += dr; cc += dc; next = inputAt(rr, cc); }
    if (next) next.focus();
    return !!next;
  }

  function onKey(e) {
    const t = e.target;
    if (!t.matches('.play-cell')) return;
    const r = +t.dataset.r, c = +t.dataset.c;
    const arrows = { ArrowRight: ['H', 1], ArrowLeft: ['H', -1], ArrowDown: ['V', 1], ArrowUp: ['V', -1] };
    if (arrows[e.key]) {
      e.preventDefault();
      const [dir, step] = arrows[e.key];
      if (ctx.model.cells[r][c].words[dir]) ctx.dir = dir;
      move(r, c, step, dir);
    } else if (e.key === 'Backspace' && (!t.value || t.readOnly)) {
      e.preventDefault();
      if (move(r, c, -1)) {
        const prev = /** @type {HTMLInputElement} */ (document.activeElement);
        if (!prev.readOnly) { prev.value = ''; prev.dispatchEvent(new Event('input', { bubbles: true })); }
      }
    } else if (e.key === ' ') {
      e.preventDefault();
      const cell = ctx.model.cells[r][c];
      if (cell.words.H && cell.words.V) { ctx.dir = ctx.dir === 'H' ? 'V' : 'H'; markWord(r, c); }
    }
  }

  function markWord(r, c) {
    const cell = ctx.model.cells[r][c];
    if (!cell.words[ctx.dir]) ctx.dir = ctx.dir === 'H' ? 'V' : 'H';
    const wid = cell.words[ctx.dir];
    ctx.current = wid;
    ctx.container.querySelectorAll('.play-cell.cur').forEach(el => el.classList.remove('cur'));
    (ctx.model.slots.get(wid)?.cells || []).forEach(([rr, cc]) => inputAt(rr, cc)?.classList.add('cur'));
    highlight(wid, { flash: false, scroll: false });
    ctx.o.onWord?.(wid);
  }

  /* ---------- Cases à cocher (picross, logigramme, étoiles, binairo, coloriage…) ---------- */
  // Picross et semblables : vide -> pleine -> croix ; logigramme : vide -> croix -> rond (oui) ;
  // binairo : vide -> 0 -> 1 ; labyrinthe : vide -> chemin ; coloriage : la couleur choisie.
  // exact : la case doit valoir exactement la solution (sinon : cochée ou non).
  const TOGGLES = {
    picross: { cycle: ['', '1', 'x'] }, logic: { cycle: ['', 'x', 'O'] }, binary: { cycle: ['', '0', '1'], exact: true },
    path: { cycle: ['', '1'] }, paint: { cycle: [''], exact: true },
  };
  let lastPaint = '1';
  const CYCLE = Object.fromEntries(Object.entries(TOGGLES).map(([k, v]) => [k, v.cycle]));
  const toggleKind = () => TOGGLES[ctx.model.toggle] || TOGGLES.picross;
  /** Valeur attendue d'une case à valeur exacte ('' : rien à faire, le fond d'un coloriage). */
  const target = cell => (ctx.model.toggle === 'paint' && cell.ch === '0' ? '' : cell.ch);
  function mountToggle(sheet) {
    const { W, H } = ctx.scene;
    const layer = document.createElement('div');
    layer.className = 'play-layer toggle-layer';
    layer.dataset.toggle = ctx.model.toggle;
    if (ctx.model.outline) layer.dataset.outline = '1';
    const C = MF.design.resolve(ctx.puzzle.design);
    const MC = MF.design.multiColors(ctx.puzzle.design, C, ctx.model);
    layer.style.setProperty('--play-ink', C.ink);
    layer.style.setProperty('--play-font', MF.design.font(ctx.puzzle.design.font.letter).css);
    const cycle = CYCLE[ctx.model.toggle] || CYCLE.picross;
    const palette = ctx.model.palette || null;
    ctx.marks = MF.schema.isObj(ctx.entries.marks) ? { ...ctx.entries.marks } : {};
    ctx.model.cells.forEach((row, r) => row.forEach((cell, c) => {
      if (cell.type !== 'letter') return;
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'play-cell toggle-cell';
      b.dataset.r = r; b.dataset.c = c;
      if (cell.mark) b.dataset.mark = cell.mark;
      // Nombre de la case (hitori, mosaïque, boucle) : reste lisible sur une case noircie
      if (cell.label && cell.mark === 'shade') { b.textContent = cell.label; b.classList.add('has-label'); }
      b.setAttribute('aria-label', MF.i18n.t('Case ligne {row}, colonne {col}', { row: r + 1, col: c + 1 }) + (cell.label ? ` : ${cell.label}` : ''));
      const { x, y } = cellBox(r, c);
      Object.assign(b.style, { left: pct(x, W), top: pct(y, H), width: pct(U, W), height: pct(U, H), fontSize: `${ctx.cellPx * 0.5}px` });
      if (MC) b.style.setProperty('--play-ink', MC.letter(r, c, C.ink));
      if (cell.given) { b.disabled = true; b.classList.add('given'); }
      layer.appendChild(b);
    }));
    sheet.appendChild(layer);
    // Coloriage : palette des couleurs (la couleur choisie se pose au doigt ou à la souris)
    if (palette) {
      ctx.paint = lastPaint && parseInt(lastPaint, 36) < palette.length ? lastPaint : '1';
      const bar = document.createElement('div');
      bar.className = 'paint-bar';
      bar.setAttribute('role', 'radiogroup');
      bar.setAttribute('aria-label', MF.i18n.t('Couleurs'));
      bar.innerHTML = palette.map((col, i) => (i ? `<button type="button" role="radio" data-paint="${i.toString(36).toUpperCase()}" style="--sw:${col}" aria-label="${MF.i18n.t('Couleur {n}', { n: i })}"><span>${i}</span></button>` : '')).join('')
        + `<button type="button" role="radio" data-paint="" class="eraser" aria-label="${MF.i18n.t('Gomme')}">${MF.icons.svg('eraser')}</button>`;
      const pick = v => { ctx.paint = v; lastPaint = v; /** @type {NodeListOf<HTMLElement>} */ (bar.querySelectorAll('[data-paint]')).forEach(x => { const on = x.dataset.paint === v; x.classList.toggle('active', on); x.setAttribute('aria-checked', String(on)); }); };
      bar.addEventListener('click', e => { const x = /** @type {HTMLElement} */ (e.target).closest('[data-paint]'); if (x) pick(/** @type {HTMLElement} */ (x).dataset.paint); });
      ctx.container.insertBefore(bar, sheet);
      pick(ctx.paint);
    }
    const paint = (b, v) => {
      b.dataset.v = v;
      b.classList.remove('wrong', 'right');
      b.setAttribute('aria-pressed', String(!!v && v !== 'x'));
      if (palette) b.style.background = v ? palette[parseInt(v, 36)] || '' : '';
    };
    /** @type {NodeListOf<HTMLButtonElement>} */ (layer.querySelectorAll('.toggle-cell')).forEach(b => paint(b, ctx.marks[key(b.dataset.r, b.dataset.c)] || ''));
    const set = (b, v) => {
      if (b.disabled) return;
      const k = key(b.dataset.r, b.dataset.c);
      if (v) ctx.marks[k] = v; else delete ctx.marks[k];
      paint(b, v);
    };
    const commit = () => { ctx.entries = { ...ctx.entries, marks: { ...ctx.marks } }; ctx.o.onEntries?.(ctx.entries); drawOutline(); checkDone(); };
    const nextOf = (b, right = false) => {
      if (palette) return b.dataset.v === ctx.paint ? '' : ctx.paint;
      if (right) return b.dataset.v === 'x' || !cycle.includes('x') ? '' : 'x';
      return cycle[(cycle.indexOf(b.dataset.v || '') + 1) % cycle.length];
    };
    // Glisser : toutes les cases survolées prennent l'état de la première
    let drag = null;
    layer.addEventListener('pointerdown', e => {
      const b = /** @type {HTMLButtonElement | null} */ (/** @type {HTMLElement} */ (e.target).closest('.toggle-cell'));
      if (!b || b.disabled) return;
      e.preventDefault();
      const v = nextOf(b, e.button === 2);
      drag = v;
      set(b, v);
      layer.setPointerCapture(e.pointerId);
    });
    layer.addEventListener('pointermove', e => {
      if (drag === null) return;
      const el = /** @type {HTMLButtonElement | null | undefined} */ (document.elementFromPoint(e.clientX, e.clientY)?.closest('.toggle-cell'));
      if (el && layer.contains(el) && el.dataset.v !== drag) { set(el, drag); drawOutline(); }
    });
    const end = () => { if (drag !== null) { drag = null; commit(); } };
    layer.addEventListener('pointerup', end);
    layer.addEventListener('pointercancel', end);
    layer.addEventListener('contextmenu', e => e.preventDefault());
    // Clavier : flèches pour se déplacer, Espace / Entrée pour changer la case, X pour une croix
    layer.addEventListener('keydown', e => {
      const b = /** @type {HTMLButtonElement | null} */ (/** @type {HTMLElement} */ (e.target).closest('.toggle-cell'));
      if (!b) return;
      const moves = { ArrowUp: [-1, 0], ArrowDown: [1, 0], ArrowLeft: [0, -1], ArrowRight: [0, 1] };
      if (moves[e.key]) {
        e.preventDefault();
        const [dr, dc] = moves[e.key];
        for (let r = +b.dataset.r + dr, c = +b.dataset.c + dc; ctx.model.cells[r]?.[c]; r += dr, c += dc) {
          const next = /** @type {HTMLElement | null} */ (layer.querySelector(`.toggle-cell[data-r="${r}"][data-c="${c}"]`));
          if (next) { next.focus(); break; }
        }
      } else if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        set(b, nextOf(b));
        commit();
      } else if (e.key.toLowerCase() === 'x' && cycle.includes('x')) {
        set(b, b.dataset.v === 'x' ? '' : 'x');
        commit();
      } else if (palette && /^[0-9a-j]$/i.test(e.key) && parseInt(e.key, 36) < palette.length) {
        set(b, e.key === '0' ? '' : e.key.toUpperCase());
        commit();
      }
    });
    drawOutline();
  }

  /** Bonne réponse d'une case à cocher : '1' (pleine) / 'O' (oui), sinon rien. */
  const markOn = cell => cell.ch === '1' || cell.ch === 'O';
  const isOn = v => v === '1' || v === 'O';

  /** Boucle : le contour des cases coloriées se dessine au fil du jeu. */
  function drawOutline() {
    if (!ctx?.model.outline) return;
    const layer = ctx.container.querySelector('.toggle-layer');
    if (!layer) return;
    const { W, H } = ctx.scene;
    const on = (r, c) => ctx.marks?.[key(r, c)] === '1';
    const ox = ctx.scene.grid.ox, oy = ctx.scene.grid.oy;
    let d = '';
    for (let r = 0; r <= ctx.model.rows; r++) for (let c = 0; c <= ctx.model.cols; c++) {
      if (c < ctx.model.cols && on(r - 1, c) !== on(r, c)) d += `M${ox + c * U} ${oy + r * U}h${U}`;
      if (r < ctx.model.rows && on(r, c - 1) !== on(r, c)) d += `M${ox + c * U} ${oy + r * U}v${U}`;
    }
    let svg = layer.querySelector('.outline-svg');
    if (!svg) {
      svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      svg.setAttribute('class', 'outline-svg');
      svg.setAttribute('viewBox', `0 0 ${W} ${H}`);
      svg.setAttribute('aria-hidden', 'true');
      svg.innerHTML = '<path fill="none" stroke-linecap="round" stroke-width="14"/>';
      layer.appendChild(svg);
    }
    svg.firstElementChild.setAttribute('d', d);
  }

  /* ---------- Points à relier : toucher les points dans l'ordre ---------- */
  function mountDots(sheet) {
    const { W, H } = ctx.scene;
    const dots = ctx.model.dots;
    const ox = ctx.scene.grid.ox, oy = ctx.scene.grid.oy;
    const P = dots.map(p => [ox + p.x * U, oy + p.y * U]);
    const layer = document.createElement('div');
    layer.className = 'play-layer dots-layer';
    layer.innerHTML = `<svg class="dots-svg" viewBox="0 0 ${W} ${H}" aria-hidden="true"><polyline fill="none" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
    const line = layer.querySelector('polyline');
    ctx.dotsDone = MF.util.clamp(+ctx.entries.dots || 0, 0, dots.length);
    const redraw = () => {
      const n = ctx.dotsDone;
      const pts = P.slice(0, n);
      if (n === dots.length) pts.push(P[0]);
      line.setAttribute('points', pts.map(p => p.join(',')).join(' '));
      layer.querySelectorAll('.dot-btn').forEach((b, i) => { b.classList.toggle('done', i < n); b.classList.toggle('next', i === n); });
    };
    dots.forEach((p, i) => {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'play-cell dot-btn';
      b.dataset.i = String(i);
      b.setAttribute('aria-label', MF.i18n.t('Point {n}', { n: i + 1 }));
      const size = `${Math.round(Math.max(26, Math.min(48, ctx.cellPx * 0.5)))}px`;
      Object.assign(b.style, { left: pct(P[i][0], W), top: pct(P[i][1], H), width: size, height: size });
      layer.appendChild(b);
    });
    layer.addEventListener('click', e => {
      const b = /** @type {HTMLElement | null} */ (/** @type {HTMLElement} */ (e.target).closest('.dot-btn'));
      if (!b) return;
      const i = +b.dataset.i;
      if (i === ctx.dotsDone) {
        ctx.dotsDone++;
        ctx.entries = { ...ctx.entries, dots: ctx.dotsDone };
        ctx.o.onEntries?.(ctx.entries);
        redraw();
        checkDone();
        /** @type {HTMLElement | null} */ (layer.querySelector(`.dot-btn[data-i="${ctx.dotsDone}"]`))?.focus({ preventScroll: true });
      } else if (i >= ctx.dotsDone) {
        b.classList.remove('nope');
        void b.offsetWidth;
        b.classList.add('nope');
      }
    });
    sheet.appendChild(layer);
    ctx.redrawDots = redraw;
    redraw();
  }

  /* ---------- Mot mystère : une case par lettre sous la liste ---------- */
  function mountMystery(sheet) {
    const boxes = [...sheet.querySelectorAll('.mf-svg .mys-box')];
    if (!boxes.length) return;
    const layer = document.createElement('div');
    layer.className = 'play-layer mystery-layer';
    const C = MF.design.resolve(ctx.puzzle.design);
    layer.style.setProperty('--play-ink', C.ink);
    layer.style.setProperty('--play-font', MF.design.font(ctx.puzzle.design.font.letter).css);
    const svg = /** @type {SVGSVGElement} */ (sheet.querySelector('.mf-svg'));
    const vb = svg.viewBox.baseVal;
    const saved = typeof ctx.entries.mystery === 'string' ? ctx.entries.mystery : '';
    boxes.forEach((box, i) => {
      const bb = /** @type {SVGGraphicsElement} */ (box).getBBox();
      const inp = document.createElement('input');
      inp.className = 'play-cell mystery-cell';
      inp.maxLength = 1;
      inp.autocomplete = 'off';
      inp.spellcheck = false;
      inp.setAttribute('autocapitalize', 'characters');
      inp.setAttribute('aria-label', MF.i18n.t('Mot mystère, lettre {n}', { n: i + 1 }));
      inp.dataset.i = String(i);
      inp.value = saved[i]?.trim() || '';
      Object.assign(inp.style, { left: pct(bb.x - vb.x, vb.width), top: pct(bb.y - vb.y, vb.height), width: pct(bb.width, vb.width), height: pct(bb.height, vb.height), fontSize: `${(ctx.cellPx * bb.height) / U * 0.55}px` });
      layer.appendChild(inp);
    });
    sheet.appendChild(layer);
    const inputs = [...layer.querySelectorAll('input')];
    const save = () => { ctx.entries = { ...ctx.entries, mystery: inputs.map(x => x.value || ' ').join('') }; ctx.o.onEntries?.(ctx.entries); checkDone(); };
    layer.addEventListener('focusin', e => /** @type {HTMLInputElement} */ (e.target).select?.());
    layer.addEventListener('input', e => {
      const t = /** @type {HTMLInputElement} */ (e.target);
      t.value = MF.util.normalize(t.value).slice(-1);
      t.classList.remove('wrong', 'right');
      if (t.value) inputs[+t.dataset.i + 1]?.focus();
      save();
    });
    layer.addEventListener('keydown', e => {
      const t = /** @type {HTMLInputElement} */ (e.target);
      const i = +t.dataset.i;
      if (e.key === 'Backspace' && !t.value && i > 0) { e.preventDefault(); inputs[i - 1].value = ''; inputs[i - 1].focus(); save(); }
      else if (e.key === 'ArrowLeft' && i > 0) { e.preventDefault(); inputs[i - 1].focus(); }
      else if (e.key === 'ArrowRight' && i < inputs.length - 1) { e.preventDefault(); inputs[i + 1].focus(); }
    });
  }
  /** Mot mystère : lettres justes, et nombre de lettres écrites. */
  function checkMystery(mark) {
    const inputs = [.../** @type {NodeListOf<HTMLInputElement>} */ (ctx.container.querySelectorAll('.mystery-cell'))];
    const word = ctx.model.mystery.word;
    let filled = 0, wrong = 0;
    inputs.forEach((inp, i) => {
      if (mark) inp.classList.remove('wrong', 'right');
      if (!inp.value) return;
      filled++;
      const ok = inp.value === word[i];
      if (!ok) wrong++;
      if (mark) inp.classList.add(ok ? 'right' : 'wrong');
    });
    return { filled, total: inputs.length, wrong };
  }

  /* ---------- Mots mêlés : sélection par glisser ---------- */
  function mountWordSearch(sheet) {
    const { W, H } = ctx.scene;
    const ns = 'http://www.w3.org/2000/svg';
    const over = document.createElementNS(ns, 'svg');
    over.setAttribute('viewBox', `0 0 ${W} ${H}`);
    over.setAttribute('class', 'ws-layer');
    // Jouable au clavier : flèches pour se déplacer, Entrée pour le début puis la fin d'un mot
    over.setAttribute('tabindex', '0');
    over.setAttribute('role', 'application');
    over.setAttribute('aria-label', MF.i18n.t('Mots mêlés : flèches pour se déplacer, Entrée pour marquer le début puis la fin d\'un mot'));
    sheet.appendChild(over);
    ctx.found = new Set(Array.isArray(ctx.entries.found) ? ctx.entries.found.filter(k => ctx.model.slots.has(k)) : []);
    const C = MF.design.resolve(ctx.puzzle.design);
    const MC = MF.design.multiColors(ctx.puzzle.design, C, ctx.model);

    const capsule = (a, b, cls, color = C.arrow) => {
      const p = cellBox(a[0], a[1]), q = cellBox(b[0], b[1]);
      const x0 = p.x + U / 2, y0 = p.y + U / 2, x1 = q.x + U / 2, y1 = q.y + U / 2;
      const len = Math.hypot(x1 - x0, y1 - y0) + U * 0.8;
      const g = document.createElementNS(ns, 'rect');
      g.setAttribute('x', -len / 2); g.setAttribute('y', -U * 0.36); g.setAttribute('width', len); g.setAttribute('height', U * 0.72); g.setAttribute('rx', U * 0.36);
      g.setAttribute('transform', `translate(${(x0 + x1) / 2} ${(y0 + y1) / 2}) rotate(${(Math.atan2(y1 - y0, x1 - x0) * 180) / Math.PI})`);
      g.setAttribute('class', cls);
      g.style.setProperty('--ws', color);
      over.appendChild(g);
      return g;
    };
    const drawFound = () => {
      over.querySelectorAll('.ws-found').forEach(n => n.remove());
      ctx.found.forEach(k => { const s = ctx.model.slots.get(k); capsule(s.cells[0], s.cells[s.cells.length - 1], 'ws-found', MC?.word(k) || C.arrow); });
      sheet.querySelectorAll('.mf-svg [data-key]').forEach(t => t.classList.toggle('found', ctx.found.has(t.dataset.key)));
    };
    drawFound();
    ctx.redrawFound = drawFound;

    const cellAt = e => {
      const rect = over.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * W - ctx.scene.grid.ox;
      const y = ((e.clientY - rect.top) / rect.height) * H - ctx.scene.grid.oy;
      const r = Math.floor(y / U), c = Math.floor(x / U);
      return ctx.model.cells[r]?.[c]?.type === 'letter' ? [r, c] : null;
    };
    /** Sélection de a à b : marque le mot s'il est caché là (dans un sens ou dans l'autre). */
    const select = (a, b) => {
      const sel = `${a}|${b}`, rev = `${b}|${a}`;
      for (const [k, s] of ctx.model.slots) {
        const ends = `${s.cells[0]}|${s.cells[s.cells.length - 1]}`;
        if ((ends === sel || ends === rev) && !ctx.found.has(k)) {
          ctx.found.add(k);
          ctx.entries.found = [...ctx.found];
          ctx.o.onEntries?.(ctx.entries);
          drawFound();
          ctx.o.onFound?.(s, ctx.found.size, ctx.model.slots.size);
          checkDone();
          return true;
        }
      }
      return false;
    };
    const aligned = (a, b) => { const dr = b[0] - a[0], dc = b[1] - a[1]; return !dr || !dc || Math.abs(dr) === Math.abs(dc); };

    let start = null, temp = null, end = null;
    sheet.addEventListener('pointerdown', e => {
      start = cellAt(e);
      if (!start) return;
      e.preventDefault();
      sheet.setPointerCapture(e.pointerId);
      end = start;
      temp = capsule(start, start, 'ws-temp');
    });
    sheet.addEventListener('pointermove', e => {
      if (!start) return;
      const c = cellAt(e);
      if (!c) return;
      // Seulement en ligne droite (horizontale, verticale ou diagonale)
      if (!aligned(start, c)) return;
      end = c;
      temp.remove();
      temp = capsule(start, end, 'ws-temp');
    });
    const finish = () => {
      if (!start) return;
      temp?.remove();
      select(start, end);
      start = null;
    };
    sheet.addEventListener('pointerup', finish);
    sheet.addEventListener('pointercancel', () => { temp?.remove(); start = null; });

    // Clavier : un curseur parcourt les lettres ; Entrée fixe le début, puis la fin
    let cursor = null, kbStart = null, kbTemp = null;
    const cursorRect = document.createElementNS(ns, 'rect');
    cursorRect.setAttribute('class', 'ws-cursor');
    cursorRect.setAttribute('width', U); cursorRect.setAttribute('height', U); cursorRect.setAttribute('rx', U * 0.18);
    const firstLetter = () => { for (const [r, row] of ctx.model.cells.entries()) { const c = row.findIndex(x => x.type === 'letter'); if (c >= 0) return [r, c]; } return null; };
    const showCursor = () => {
      if (!cursor) return;
      const { x, y } = cellBox(cursor[0], cursor[1]);
      cursorRect.setAttribute('x', x); cursorRect.setAttribute('y', y);
      over.appendChild(cursorRect);
      kbTemp?.remove();
      kbTemp = kbStart ? capsule(kbStart, aligned(kbStart, cursor) ? cursor : kbStart, 'ws-temp') : null;
    };
    over.addEventListener('focus', () => { cursor = cursor || firstLetter(); showCursor(); });
    over.addEventListener('blur', () => { cursorRect.remove(); kbTemp?.remove(); kbStart = null; });
    over.addEventListener('keydown', e => {
      const moves = { ArrowUp: [-1, 0], ArrowDown: [1, 0], ArrowLeft: [0, -1], ArrowRight: [0, 1] };
      if (moves[e.key] && cursor) {
        e.preventDefault();
        const [dr, dc] = moves[e.key];
        // Saute les cases sans lettre (formes) jusqu'à la prochaine lettre dans ce sens
        for (let r = cursor[0] + dr, c = cursor[1] + dc; ctx.model.cells[r]?.[c]; r += dr, c += dc) {
          if (ctx.model.cells[r][c].type === 'letter') { cursor = [r, c]; break; }
        }
        showCursor();
      } else if ((e.key === 'Enter' || e.key === ' ') && cursor) {
        e.preventDefault();
        if (!kbStart) { kbStart = cursor; showCursor(); return; }
        const a = kbStart;
        kbStart = null;
        if (aligned(a, cursor) && !select(a, cursor)) ctx.o.onMiss?.();
        showCursor();
      } else if (e.key === 'Escape' && kbStart) {
        e.preventDefault();
        e.stopPropagation();
        kbStart = null;
        showCursor();
      }
    });
  }

  /* ---------- Vérification, aides ---------- */
  /** Vérifie les lettres saisies. Renvoie { filled, total, wrong }. */
  function check({ mark = true } = {}) {
    if (!ctx || ctx.mode !== 'play') return null;
    if (ctx.model.game === 'meles') {
      const res = { filled: ctx.found.size, total: ctx.model.slots.size, wrong: 0 };
      // Mot mystère : il faut aussi l'écrire (compté comme un mot de plus)
      if (ctx.model.mystery) { const m = checkMystery(mark); res.total++; if (m.filled === m.total && !m.wrong) res.filled++; res.wrong = m.wrong; }
      return res;
    }
    if (ctx.model.play === 'dots') return { filled: ctx.dotsDone, total: ctx.model.dots.length, wrong: 0 };
    if (ctx.model.toggle && toggleKind().exact) {
      let filled = 0, total = 0, wrong = 0;
      /** @type {NodeListOf<HTMLElement>} */ (ctx.container.querySelectorAll('.toggle-cell')).forEach(b => {
        const cell = ctx.model.cells[+b.dataset.r][+b.dataset.c];
        const want = target(cell), v = cell.given ? want : b.dataset.v || '';
        if (mark) b.classList.remove('wrong', 'right');
        if (want) total++;
        if (v && v !== want) { wrong++; if (mark) b.classList.add('wrong'); } else if (v && want) { filled++; if (mark && !cell.given) b.classList.add('right'); }
      });
      return { filled, total, wrong };
    }
    if (ctx.model.toggle) {
      let filled = 0, total = 0, wrong = 0;
      /** @type {NodeListOf<HTMLElement>} */ (ctx.container.querySelectorAll('.toggle-cell')).forEach(b => {
        const cell = ctx.model.cells[+b.dataset.r][+b.dataset.c];
        const v = cell.given ? (markOn(cell) ? '1' : 'x') : b.dataset.v || '';
        if (markOn(cell)) total++;
        if (mark) b.classList.remove('wrong', 'right');
        // Une case cochée à tort, ou (picross) une croix sur une case pleine
        const bad = (isOn(v) && !markOn(cell)) || (v === 'x' && markOn(cell) && ctx.model.toggle !== 'logic');
        if (bad) { wrong++; if (mark) b.classList.add('wrong'); } else if (isOn(v)) { filled++; if (mark && !cell.given) b.classList.add('right'); }
      });
      return { filled, total, wrong };
    }
    let filled = 0, total = 0, wrong = 0;
    ctx.container.querySelectorAll('.play-cell').forEach(inp => {
      const sol = ctx.model.cells[+inp.dataset.r][+inp.dataset.c].ch;
      total++;
      if (mark) inp.classList.remove('wrong', 'right');
      if (!inp.value) return;
      filled++;
      if (inp.value === sol) { if (mark && !inp.readOnly) inp.classList.add('right'); } else { if (mark) inp.classList.add('wrong'); wrong++; }
    });
    return { filled, total, wrong };
  }

  function checkDone() {
    const r = check({ mark: false });
    if (r && r.filled === r.total && !r.wrong) ctx.o.onComplete?.();
  }

  /** Révèle la lettre de la case active, ou tout le mot courant. */
  function reveal(what = 'letter') {
    if (!ctx || ctx.mode !== 'play') return false;
    if (ctx.model.play === 'dots') {
      if (ctx.dotsDone >= ctx.model.dots.length) return false;
      ctx.dotsDone++;
      ctx.entries = { ...ctx.entries, dots: ctx.dotsDone };
      ctx.o.onEntries?.(ctx.entries);
      ctx.redrawDots?.();
      checkDone();
      return true;
    }
    if (ctx.model.toggle && toggleKind().exact) {
      const todo = [.../** @type {NodeListOf<HTMLElement>} */ (ctx.container.querySelectorAll('.toggle-cell:not(:disabled)'))].filter(b => (b.dataset.v || '') !== target(ctx.model.cells[+b.dataset.r][+b.dataset.c]));
      if (!todo.length) return false;
      const b = /** @type {HTMLElement} */ (todo[Math.floor(Math.random() * todo.length)]);
      const v = target(ctx.model.cells[+b.dataset.r][+b.dataset.c]);
      if (v) ctx.marks[key(b.dataset.r, b.dataset.c)] = v; else delete ctx.marks[key(b.dataset.r, b.dataset.c)];
      b.dataset.v = v;
      if (ctx.model.palette) b.style.background = v ? ctx.model.palette[parseInt(v, 36)] : '';
      b.classList.remove('wrong');
      b.classList.add('revealed');
      ctx.entries = { ...ctx.entries, marks: { ...ctx.marks } };
      ctx.o.onEntries?.(ctx.entries);
      checkDone();
      return true;
    }
    if (ctx.model.toggle) {
      // Une case à cocher (ou à corriger) au hasard parmi les fausses ou manquantes
      const todo = [.../** @type {NodeListOf<HTMLElement>} */ (ctx.container.querySelectorAll('.toggle-cell:not(:disabled)'))].filter(b => {
        const cell = ctx.model.cells[+b.dataset.r][+b.dataset.c];
        return isOn(b.dataset.v || '') !== markOn(cell);
      });
      if (!todo.length) return false;
      const b = /** @type {HTMLElement} */ (todo[Math.floor(Math.random() * todo.length)]);
      const v = markOn(ctx.model.cells[+b.dataset.r][+b.dataset.c]) ? CYCLE[ctx.model.toggle].find(isOn) : 'x';
      ctx.marks[key(b.dataset.r, b.dataset.c)] = v;
      b.dataset.v = v;
      b.classList.add('revealed');
      ctx.entries = { ...ctx.entries, marks: { ...ctx.marks } };
      ctx.o.onEntries?.(ctx.entries);
      drawOutline();
      checkDone();
      return true;
    }
    if (ctx.model.game === 'meles') {
      const k = [...ctx.model.slots.keys()].find(x => !ctx.found.has(x));
      if (!k) {
        // Tous les mots trouvés : une lettre du mot mystère
        const inp = /** @type {HTMLInputElement | undefined} */ ([...ctx.container.querySelectorAll('.mystery-cell')].find(x => x.value !== ctx.model.mystery?.word[+x.dataset.i]));
        if (!inp) return false;
        inp.value = ctx.model.mystery.word[+inp.dataset.i];
        inp.classList.add('revealed');
        inp.dispatchEvent(new Event('input', { bubbles: true }));
        return true;
      }
      ctx.found.add(k);
      ctx.entries.found = [...ctx.found];
      ctx.o.onEntries?.(ctx.entries);
      ctx.redrawFound();
      checkDone();
      return true;
    }
    const act = document.activeElement?.matches?.('.play-cell') ? /** @type {HTMLElement} */ (document.activeElement) : null;
    const cells = what === 'word' && ctx.current ? ctx.model.slots.get(ctx.current).cells : act ? [[+act.dataset.r, +act.dataset.c]] : [];
    if (!cells.length) return false;
    cells.forEach(([r, c]) => {
      const inp = inputAt(r, c);
      if (!inp || inp.readOnly) return;
      inp.value = ctx.model.cells[r][c].ch;
      inp.classList.remove('wrong');
      inp.classList.add('revealed');
      inp.dispatchEvent(new Event('input', { bubbles: true }));
    });
    act?.focus();
    return true;
  }

  /** Passe au mot suivant / précédent et place le curseur sur sa première case vide. */
  function stepWord(delta) {
    if (!ctx || ctx.mode !== 'play' || ctx.model.game === 'meles' || ctx.model.toggle || ctx.model.play) return false;
    const ids = [...ctx.model.slots.keys()];
    if (!ids.length) return false;
    const i = ids.indexOf(ctx.current);
    const s = ctx.model.slots.get(ids[(i + delta + ids.length) % ids.length]);
    if (s.dir) ctx.dir = s.dir;
    const target = s.cells.find(([r, c]) => { const inp = inputAt(r, c); return inp && !inp.readOnly && !inp.value; }) || s.cells[0];
    const inp = inputAt(target[0], target[1]);
    if (!inp) return false;
    if (document.activeElement === inp) markWord(target[0], target[1]); else inp.focus();
    return true;
  }

  /** Change le sens de saisie sur la case active (si elle appartient aux deux sens). */
  function toggleDir() {
    const act = document.activeElement?.matches?.('.play-cell') ? /** @type {HTMLElement} */ (document.activeElement) : null;
    if (!ctx || !act) return false;
    const r = +act.dataset.r, c = +act.dataset.c;
    const cell = ctx.model.cells[r][c];
    if (!(cell.words.H && cell.words.V)) return false;
    ctx.dir = ctx.dir === 'H' ? 'V' : 'H';
    markWord(r, c);
    return true;
  }

  function clearEntries() {
    if (!ctx) return;
    ctx.container.querySelectorAll('input.play-cell').forEach(inp => { if (!inp.readOnly) { inp.value = ''; inp.classList.remove('wrong', 'right', 'revealed'); } });
    /** @type {NodeListOf<HTMLElement>} */ (ctx.container.querySelectorAll('.toggle-cell:not(:disabled)')).forEach(b => { b.dataset.v = ''; b.style.background = ''; b.classList.remove('wrong', 'right', 'revealed'); b.setAttribute('aria-pressed', 'false'); });
    if (ctx.marks) ctx.marks = {};
    if (ctx.dotsDone) { ctx.dotsDone = 0; ctx.redrawDots?.(); }
    ctx.entries = {};
    if (ctx.found) { ctx.found.clear(); ctx.redrawFound?.(); }
    ctx.o.onEntries?.(ctx.entries);
    drawOutline();
  }

  const current = () => ctx;

  return { render, highlight, check, reveal, clearEntries, current, stepWord, toggleDir };
})();
