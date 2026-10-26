// @ts-check
/* =========================================================================
   Vue de la grille à l'écran : affiche (SVG, identique aux exports) + jeu.
   Modes : 'solution' (lettres visibles), 'blank' (grille vierge), 'play' (on joue).
   Jeu : saisie case par case (fléchés, croisés, codés) ou sélection à la
   souris / au doigt des mots cachés (mêlés).
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
   */
  function render(container, model, puzzle, o = {}) {
    const { mode = 'solution', entries = {} } = o;
    if (!model.cols) { container.innerHTML = ''; ctx = null; return null; }
    const scene = MF.scene.compose(model, puzzle, { letters: mode === 'solution', photoMarks: o.photoMarks, assetUrl: o.assetUrl });
    // Taille d'une case à l'écran : fixe, ou calculée pour que toute l'affiche tienne (fonction)
    const cell = typeof o.cell === 'function' ? o.cell(scene.W, scene.H) : o.cell || 64;
    const width = Math.round((scene.W * cell) / U);
    // Re-rendu en cours de partie (zoom, clavier du téléphone qui redimensionne l'écran) :
    // on garde la case active, sinon le clavier virtuel se refermerait
    const act = container.contains(document.activeElement) && document.activeElement.matches('.play-cell') ? /** @type {HTMLElement} */ (document.activeElement) : null;
    const keep = act && ctx && mode === 'play' ? { r: act.dataset.r, c: act.dataset.c, dir: ctx.dir } : null;
    container.innerHTML = `<div class="sheet ${mode === 'play' ? 'playing' : ''} ${o.animate ? 'enter' : ''}" style="width:${width}px">${MF.renderers.svg(scene)}</div>`;
    const sheet = container.firstElementChild;
    ctx = { container, sheet, scene, model, puzzle, mode, entries: { ...entries }, dir: keep?.dir || 'H', o, cellPx: cell };
    if (mode === 'play') (model.game === 'meles' ? mountWordSearch : mountPlay)(sheet);
    if (keep) container.querySelector(`.play-cell[data-r="${keep.r}"][data-c="${keep.c}"]`)?.focus({ preventScroll: true });
    sheet.querySelector('.mf-svg').addEventListener('click', e => {
      const m = e.target.closest('.missing');
      if (m) o.onMissing?.(m.dataset.key);
    });
    return ctx;
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
    const codes = ctx.model.game === 'codes';
    ctx.model.cells.forEach((row, r) => row.forEach((cell, c) => {
      if (cell.type !== 'letter') return;
      const inp = document.createElement('input');
      inp.className = 'play-cell';
      inp.maxLength = 1;
      inp.autocomplete = 'off';
      inp.spellcheck = false;
      inp.setAttribute('autocapitalize', 'characters');
      inp.setAttribute('aria-label', MF.i18n.t('Case ligne {row}, colonne {col}', { row: r + 1, col: c + 1 }));
      // Lecteur d'écran : la définition du mot en cours est lue avec la case
      inp.setAttribute('aria-describedby', 'clue-text');
      inp.dataset.r = r; inp.dataset.c = c;
      const given = codes && ctx.model.givens.has(cell.ch);
      if (given) { inp.value = cell.ch; inp.readOnly = true; inp.classList.add('given'); } else inp.value = ctx.entries[key(r, c)] || '';
      const { x, y } = cellBox(r, c);
      Object.assign(inp.style, {
        left: pct(x, W), top: pct(y, H), width: pct(U, W), height: pct(U, H),
        fontSize: `${ctx.cellPx * (codes || ctx.model.game === 'croises' ? 0.46 : 0.52)}px`,
        paddingTop: codes || ctx.model.game === 'croises' ? `${ctx.cellPx * 0.16}px` : '0',
      });
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
      if (t.matches('.play-cell') && !t.readOnly && e.key.length === 1 && !e.ctrlKey && !e.metaKey && t.value) t.select();
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
      const ch = MF.util.normalize(t.value).slice(-1);
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
      if (ch) move(r, c, 1, ctx.dir, true);
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

    const capsule = (a, b, cls) => {
      const p = cellBox(a[0], a[1]), q = cellBox(b[0], b[1]);
      const x0 = p.x + U / 2, y0 = p.y + U / 2, x1 = q.x + U / 2, y1 = q.y + U / 2;
      const len = Math.hypot(x1 - x0, y1 - y0) + U * 0.8;
      const g = document.createElementNS(ns, 'rect');
      g.setAttribute('x', -len / 2); g.setAttribute('y', -U * 0.36); g.setAttribute('width', len); g.setAttribute('height', U * 0.72); g.setAttribute('rx', U * 0.36);
      g.setAttribute('transform', `translate(${(x0 + x1) / 2} ${(y0 + y1) / 2}) rotate(${(Math.atan2(y1 - y0, x1 - x0) * 180) / Math.PI})`);
      g.setAttribute('class', cls);
      g.style.setProperty('--ws', C.arrow);
      over.appendChild(g);
      return g;
    };
    const drawFound = () => {
      over.querySelectorAll('.ws-found').forEach(n => n.remove());
      ctx.found.forEach(k => { const s = ctx.model.slots.get(k); capsule(s.cells[0], s.cells[s.cells.length - 1], 'ws-found'); });
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
    if (ctx.model.game === 'meles') return { filled: ctx.found.size, total: ctx.model.slots.size, wrong: 0 };
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
    if (ctx.model.game === 'meles') {
      const k = [...ctx.model.slots.keys()].find(x => !ctx.found.has(x));
      if (!k) return false;
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
    if (!ctx || ctx.mode !== 'play' || ctx.model.game === 'meles') return false;
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
    ctx.container.querySelectorAll('.play-cell').forEach(inp => { if (!inp.readOnly) { inp.value = ''; inp.classList.remove('wrong', 'right', 'revealed'); } });
    ctx.entries = {};
    if (ctx.found) { ctx.found.clear(); ctx.redrawFound?.(); }
    ctx.o.onEntries?.(ctx.entries);
  }

  const current = () => ctx;

  return { render, highlight, check, reveal, clearEntries, current, stepWord, toggleDir };
})();
