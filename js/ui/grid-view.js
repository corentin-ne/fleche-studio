/* =========================================================================
   Vue de la grille à l'écran : SVG (identique aux exports) + surcouche de jeu.
   Modes : 'solution' (lettres visibles), 'blank' (grille vierge), 'play' (on remplit).
   ========================================================================= */
window.MF = window.MF || {};

MF.gridView = (() => {
  const { U, FRAME } = MF.gridModel;
  let ctx = null; // { container, model, puzzle, mode, entries, dir, onEntries }

  function render(container, model, puzzle, { mode = 'solution', cell = 64, entries = {}, onEntries, onMissing, photoMarks = false } = {}) {
    if (!model.cols) {
      container.innerHTML = `<div class="empty">${MF.icons.svg('grid')}<h3>Aucune grille</h3><p>Ajoute au moins deux mots pour générer la grille.</p></div>`;
      ctx = null;
      return;
    }
    const { w } = MF.renderers.size(model);
    const width = Math.round(w * cell / U);
    const svg = MF.renderers.svg(model, puzzle.accent, {
      letters: mode === 'solution',
      style: { clueFill: puzzle.options?.clueFill },
      photoMarks,
    });
    container.innerHTML = `<div class="sheet ${mode === 'play' ? 'playing' : ''}" style="width:${width}px">${svg}</div>`;
    ctx = { container, model, puzzle, mode, entries: { ...entries }, dir: 'H', onEntries, cellPx: cell };
    if (mode === 'play') mountPlay(container.firstElementChild);
    container.querySelector('.mf-svg')?.addEventListener('click', e => {
      const m = e.target.closest('.missing');
      if (m) onMissing?.(m.dataset.key);
    });
  }

  /* ---------- Surbrillance d'un mot (depuis la liste) ---------- */
  function cellsOf(wid) {
    const out = [];
    if (!ctx) return out;
    ctx.model.cells.forEach((row, r) => row.forEach((cell, c) => {
      if (cell.type === 'letter' && (cell.words.H === wid || cell.words.V === wid)) out.push([r, c]);
      if (cell.type === 'clue' && cell.clues.some(cl => cl.wid === wid)) out.push([r, c]);
    }));
    return out;
  }

  function highlight(wid, { flash = true, scroll = true } = {}) {
    if (!ctx) return false;
    ctx.container.querySelectorAll('.hl').forEach(el => el.classList.remove('hl', 'flash'));
    const cells = cellsOf(wid);
    cells.forEach(([r, c]) => {
      const el = ctx.container.querySelector(`rect[data-r="${r}"][data-c="${c}"]`);
      if (el) { el.classList.add('hl'); if (flash) el.classList.add('flash'); }
    });
    if (scroll && cells.length) {
      ctx.container.querySelector(`rect[data-r="${cells[0][0]}"][data-c="${cells[0][1]}"]`)
        ?.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
    }
    return cells.length > 0;
  }

  /* ---------- Mode jeu ---------- */
  const key = (r, c) => `${r},${c}`;

  function mountPlay(sheet) {
    const { w, h } = MF.renderers.size(ctx.model);
    const layer = document.createElement('div');
    layer.className = 'play-layer';
    ctx.model.cells.forEach((row, r) => row.forEach((cell, c) => {
      if (cell.type !== 'letter') return;
      const inp = document.createElement('input');
      inp.className = 'play-cell';
      inp.maxLength = 1;
      inp.autocomplete = 'off';
      inp.spellcheck = false;
      inp.setAttribute('aria-label', `Case ligne ${r + 1}, colonne ${c + 1}`);
      inp.dataset.r = r; inp.dataset.c = c;
      inp.value = ctx.entries[key(r, c)] || '';
      Object.assign(inp.style, {
        left: `${((FRAME + c * U) / w) * 100}%`, top: `${((FRAME + r * U) / h) * 100}%`,
        width: `${(U / w) * 100}%`, height: `${(U / h) * 100}%`,
        fontSize: `${ctx.cellPx * 0.52}px`,
      });
      layer.appendChild(inp);
    }));
    sheet.appendChild(layer);

    layer.addEventListener('focusin', e => { if (e.target.matches('.play-cell')) markWord(+e.target.dataset.r, +e.target.dataset.c); });
    layer.addEventListener('mousedown', e => {
      const t = e.target;
      if (!t.matches('.play-cell') || document.activeElement !== t) return;
      const cell = ctx.model.cells[+t.dataset.r][+t.dataset.c];
      if (cell.words.H && cell.words.V) { ctx.dir = ctx.dir === 'H' ? 'V' : 'H'; markWord(+t.dataset.r, +t.dataset.c); }
    });
    layer.addEventListener('keydown', onKey);
    layer.addEventListener('input', e => {
      const t = e.target;
      const ch = MF.util.normalize(t.value).slice(-1);
      t.value = ch;
      t.classList.remove('wrong', 'right');
      setEntry(+t.dataset.r, +t.dataset.c, ch);
      if (ch) move(+t.dataset.r, +t.dataset.c, 1);
    });
  }

  function setEntry(r, c, ch) {
    if (ch) ctx.entries[key(r, c)] = ch; else delete ctx.entries[key(r, c)];
    ctx.onEntries?.(ctx.entries);
  }

  const inputAt = (r, c) => ctx.container.querySelector(`.play-cell[data-r="${r}"][data-c="${c}"]`);

  function move(r, c, step, dir = ctx.dir) {
    const [dr, dc] = dir === 'H' ? [0, step] : [step, 0];
    const next = inputAt(r + dr, c + dc);
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
      const cell = ctx.model.cells[r][c];
      if (cell.words[dir]) ctx.dir = dir;
      move(r, c, step, dir);
    } else if (e.key === 'Backspace' && !t.value) {
      e.preventDefault();
      if (move(r, c, -1)) { const prev = document.activeElement; prev.value = ''; setEntry(+prev.dataset.r, +prev.dataset.c, ''); }
    }
  }

  function markWord(r, c) {
    const cell = ctx.model.cells[r][c];
    if (!cell.words[ctx.dir]) ctx.dir = ctx.dir === 'H' ? 'V' : 'H';
    const wid = cell.words[ctx.dir];
    ctx.container.querySelectorAll('.play-cell.cur').forEach(el => el.classList.remove('cur'));
    cellsOf(wid).forEach(([rr, cc]) => inputAt(rr, cc)?.classList.add('cur'));
    highlight(wid, { flash: false, scroll: false });
  }

  /** Vérifie les lettres saisies. Renvoie { filled, total, wrong }. */
  function check() {
    if (!ctx || ctx.mode !== 'play') return null;
    let filled = 0, total = 0, wrong = 0;
    ctx.container.querySelectorAll('.play-cell').forEach(inp => {
      const sol = ctx.model.cells[+inp.dataset.r][+inp.dataset.c].ch;
      total++;
      inp.classList.remove('wrong', 'right');
      if (!inp.value) return;
      filled++;
      if (inp.value === sol) inp.classList.add('right'); else { inp.classList.add('wrong'); wrong++; }
    });
    return { filled, total, wrong };
  }

  function clearEntries() {
    if (!ctx) return;
    ctx.container.querySelectorAll('.play-cell').forEach(inp => { inp.value = ''; inp.classList.remove('wrong', 'right'); });
    ctx.entries = {};
    ctx.onEntries?.(ctx.entries);
  }

  return { render, highlight, check, clearEntries };
})();
