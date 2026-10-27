// @ts-check
/* =========================================================================
   Modèle de dessin des jeux du moteur « logique » (voir MF.gridModel) :
   mêmes cases que les grilles de mots, plus quelques décorations que la
   scène sait dessiner :
     cell.given     case donnée au départ (toujours affichée, non modifiable)
     cell.corner    petit texte en haut à gauche (cages du calcudoku)
     cell.mark      case à cocher : 'fill' (picross) ou 'dot' (logigramme)
     cell.sums      case noire du kakuro : { a: somme à droite, d: somme en bas }
     cell.tint      case teintée (diagonales du sudoku X)
     type 'hint'    nombre d'un picross, hors de la grille
     type 'label'   nom d'un élément (logigramme), sur `span` cases, vertical si `rot`
     type 'sym'     ponctuation d'une citation (toujours affichée)
   model.walls (traits épais : régions, cages), model.signs (inégalités),
   model.lists (listes sous la grille), model.bank / model.note (lettres et
   remarque sous la grille), model.toggle (jeu à cocher), model.digits (saisie de chiffres).
   ========================================================================= */
window.MF = window.MF || {};

MF.logicModel = (() => {
  const { t } = MF.i18n;
  const CAGE_OP = { '=': '', '+': '+', '-': '−', x: '×', '/': '÷' };

  /** @returns {any} */
  const base = (game, cols, rows, extra = {}) => ({ game, cols, rows, band: 0, top: 0, shape: 'rect', cells: [], slots: new Map(), walls: [], signs: [], ...extra });
  const grid = (rows, cols, fn) => Array.from({ length: rows }, (_, r) => Array.from({ length: cols }, (_, c) => fn(r, c)));
  const letter = (ch, extra = {}) => ({ type: 'letter', ch, words: {}, arrows: [], ...extra });

  /** Traits entre deux cases voisines de zones différentes (régions, cages). */
  function wallsOf(owner, n, w = n, h = n) {
    const out = [];
    for (let r = 0; r < h; r++) {
      for (let c = 0; c < w; c++) {
        const i = r * w + c;
        if (c < w - 1 && owner[i] !== owner[i + 1]) out.push({ x1: c + 1, y1: r, x2: c + 1, y2: r + 1 });
        if (r < h - 1 && owner[i] !== owner[i + w]) out.push({ x1: c, y1: r + 1, x2: c + 1, y2: r + 1 });
      }
    }
    return out;
  }
  /** Lignes et colonnes en mots (surbrillance pendant le jeu, couleurs « mot par mot »). */
  function lineSlots(model, n, w = n, h = n, r0 = 0, c0 = 0) {
    for (let r = 0; r < h; r++) {
      const cells = Array.from({ length: w }, (_, c) => [r + r0, c + c0]);
      model.slots.set(`R${r}`, { cells, dir: 'H', word: '' });
      cells.forEach(([rr, cc]) => { model.cells[rr][cc].words.H = `R${r}`; });
    }
    for (let c = 0; c < w; c++) {
      const cells = Array.from({ length: h }, (_, r) => [r + r0, c + c0]);
      model.slots.set(`C${c}`, { cells, dir: 'V', word: '' });
      cells.forEach(([rr, cc]) => { model.cells[rr][cc].words.V = `C${c}`; });
    }
  }
  const isGiven = (page, r, c) => page.given?.[r]?.[c] === '1';

  /* ---------------- Grilles latines ---------------- */
  function latin(page, game) {
    const n = page.n;
    const m = base(game, n, n, { digits: game !== 'wordoku' });
    m.cells = grid(n, n, (r, c) => letter(page.rows[r][c], { given: isGiven(page, r, c) }));
    lineSlots(m, n);
    if (page.regions) m.walls = wallsOf(page.regions.join('').split(''), n);
    if (page.variant === 'diagonal') for (let i = 0; i < n; i++) { m.cells[i][i].tint = true; m.cells[i][n - 1 - i].tint = true; }
    if (page.cages) {
      const owner = new Array(n * n);
      page.cages.forEach((cg, k) => cg.cells.forEach(i => { owner[i] = k; }));
      m.walls = wallsOf(owner, n);
      for (const cg of page.cages) {
        const first = Math.min(...cg.cells);
        m.cells[Math.floor(first / n)][first % n].corner = `${cg.target}${CAGE_OP[cg.op]}`;
      }
    }
    if (page.signs) {
      for (const [a, b] of page.signs) {
        // a < b ; le signe est posé sur le trait commun, la pointe vers la plus petite valeur
        const [lo, hi] = a < b ? [a, b] : [b, a];
        const r = Math.floor(lo / n), c = lo % n;
        const across = hi === lo + 1;
        const smallFirst = lo === a;
        m.signs.push({ r, c, dir: across ? 'H' : 'V', sym: across ? (smallFirst ? '<' : '>') : (smallFirst ? '∧' : '∨') });
      }
    }
    if (game === 'wordoku') {
      m.bank = [...new Set(page.rows.join(''))].sort();
      m.note = t('Un mot se cache dans la première ligne.');
    }
    return m;
  }

  /* ---------------- Kakuro ---------------- */
  function kakuro(page) {
    const { w: W, h: H, rows } = page;
    const m = base('kakuro', W, H, { digits: true });
    const runSum = (r, c, dr, dc) => { let s = 0; for (let rr = r + dr, cc = c + dc; rr < H && cc < W && rows[rr][cc] !== '#'; rr += dr, cc += dc) s += +rows[rr][cc]; return s; };
    m.cells = grid(H, W, (r, c) => {
      if (rows[r][c] !== '#') return letter(rows[r][c], { given: isGiven(page, r, c) });
      const a = c + 1 < W && rows[r][c + 1] !== '#' ? runSum(r, c, 0, 1) : 0;
      const d = r + 1 < H && rows[r + 1][c] !== '#' ? runSum(r, c, 1, 0) : 0;
      return a || d ? { type: 'block', sums: { a, d } } : { type: 'block' };
    });
    for (const run of MF.logicNumbers.runsOf(Uint8Array.from(rows.join(''), ch => (ch === '#' ? 1 : 0)), W, H)) {
      const key = `${run.dir}:${run.r},${run.c}`;
      const cells = run.cells.map(i => [Math.floor(i / W), i % W]);
      m.slots.set(key, { cells, dir: run.dir, word: cells.map(([r, c]) => rows[r][c]).join('') });
      cells.forEach(([r, c]) => { m.cells[r][c].words[run.dir] = key; });
    }
    return m;
  }

  /* ---------------- Picross ---------------- */
  function picross(page) {
    const { w: W, h: H, rows } = page;
    const sol = rows.map(r => [...r].map(Number));
    const rowClues = sol.map(r => MF.solver.runs(r));
    const colClues = Array.from({ length: W }, (_, c) => MF.solver.runs(sol.map(r => r[c])));
    const L = Math.max(1, ...rowClues.map(x => x.length)), T = Math.max(1, ...colClues.map(x => x.length));
    const m = base('picross', L + W, T + H, { shape: 'free', toggle: 'picross', offset: [T, L] });
    m.cells = grid(T + H, L + W, (r, c) => {
      if (r >= T && c >= L) return letter(rows[r - T][c - L], { mark: 'fill', given: isGiven(page, r - T, c - L) });
      if (r < T && c >= L) { const cl = colClues[c - L].length ? colClues[c - L] : [0]; const k = r - (T - cl.length); return k >= 0 ? { type: 'hint', text: String(cl[k]) } : { type: 'out' }; }
      if (c < L && r >= T) { const cl = rowClues[r - T].length ? rowClues[r - T] : [0]; const k = c - (L - cl.length); return k >= 0 ? { type: 'hint', text: String(cl[k]) } : { type: 'out' }; }
      return { type: 'out' };
    });
    lineSlots(m, 0, W, H, T, L);
    // Repères tous les 5 cases et contour du dessin
    for (let x = 0; x <= W; x++) if (x % 5 === 0 || x === W) m.walls.push({ x1: L + x, y1: T, x2: L + x, y2: T + H });
    for (let y = 0; y <= H; y++) if (y % 5 === 0 || y === H) m.walls.push({ x1: L, y1: T + y, x2: L + W, y2: T + y });
    return m;
  }

  /* ---------------- Logigramme ---------------- */
  function logigramme(page, lang) {
    const { m: M, cats, order } = page;
    const K = cats.length;
    const LW = 3, LH = 3;
    const rowCats = [0, ...Array.from({ length: K - 2 }, (_, i) => K - 1 - i)];
    const colCats = Array.from({ length: K - 1 }, (_, i) => i + 1);
    const groupOf = (k, i) => order[k].indexOf(i);
    const cols = LW + colCats.length * M, rows = LH + rowCats.length * M;
    const m = base('logigramme', cols, rows, { shape: 'free', toggle: 'logic' });
    m.cells = grid(rows, cols, (r, c) => {
      if (r < LH && c >= LW) {
        const ci = Math.floor((c - LW) / M), j = (c - LW) % M;
        return r === 0 ? { type: 'label', text: cats[colCats[ci]].items[j].label, span: LH, rot: true } : { type: 'out' };
      }
      if (c < LW && r >= LH) {
        const ri = Math.floor((r - LH) / M), i = (r - LH) % M;
        return c === 0 ? { type: 'label', text: cats[rowCats[ri]].items[i].label, span: LW, rot: false } : { type: 'out' };
      }
      if (r < LH || c < LW) return { type: 'out' };
      const ri = Math.floor((r - LH) / M), ci = Math.floor((c - LW) / M);
      const a = rowCats[ri], b = colCats[ci];
      if (a !== 0 && b >= a) return { type: 'out' };
      const i = (r - LH) % M, j = (c - LW) % M;
      return letter(groupOf(a, i) === groupOf(b, j) ? 'O' : 'X', { mark: 'dot' });
    });
    // Blocs séparés par des traits épais
    rowCats.forEach((a, ri) => colCats.forEach((b, ci) => {
      if (a !== 0 && b >= a) return;
      const x = LW + ci * M, y = LH + ri * M;
      m.walls.push({ x1: x, y1: y, x2: x + M, y2: y }, { x1: x, y1: y + M, x2: x + M, y2: y + M }, { x1: x, y1: y, x2: x, y2: y + M }, { x1: x + M, y1: y, x2: x + M, y2: y + M });
    }));
    m.lists = [{ title: t('Indices'), items: page.clues.map((cl, i) => ({ num: i + 1, text: MF.logic.clueText(cl, cats, lang) })) }];
    return m;
  }

  /* ---------------- Échelle de mots ---------------- */
  function echelle(page) {
    const widths = page.ladders.map(l => l.words[0].length);
    const cols = widths.reduce((s, w) => s + w, 0) + page.ladders.length - 1;
    const rows = Math.max(...page.ladders.map(l => l.words.length));
    const m = base('echelle', cols, rows, { shape: 'free' });
    m.cells = grid(rows, cols, () => ({ type: 'out' }));
    m.lists = [];
    let x = 0;
    page.ladders.forEach((l, li) => {
      const last = l.words.length - 1;
      const items = [];
      l.words.forEach((w, r) => {
        const key = `L${li}R${r}`;
        const given = r === 0 || r === last;
        const cells = [...w].map((ch, i) => { m.cells[r][x + i] = letter(ch, { given, words: { H: key } }); return [r, x + i]; });
        m.slots.set(key, { cells, dir: 'H', word: w, text: given ? '' : l.clues[r] || '' });
        if (!given) items.push({ num: r, text: l.clues[r] || '…' });
      });
      m.lists.push({ title: page.ladders.length > 1 ? t('Échelle {n} : {from} → {to}', { n: li + 1, from: l.words[0], to: l.words[last] }) : `${l.words[0]} → ${l.words[last]}`, items });
      x += widths[li] + 1;
    });
    return m;
  }

  /* ---------------- Citation codée ---------------- */
  function citation(page, layout) {
    const { w: W, h: H, rows } = page;
    const m = base('codes', W, H, { shape: 'free' });
    m.cells = grid(H, W, (r, c) => {
      const ch = rows[r][c];
      if (/[A-Z]/.test(ch)) return letter(ch);
      return ch === ' ' ? { type: 'out' } : { type: 'sym', ch };
    });
    // Un mot = une suite de lettres sur une ligne
    rows.forEach((row, r) => {
      for (const match of row.matchAll(/[A-Z]+/g)) {
        const key = `W${r},${match.index}`;
        const cells = [...match[0]].map((_, i) => [r, match.index + i]);
        m.slots.set(key, { cells, dir: 'H', word: match[0] });
        cells.forEach(([rr, cc]) => { m.cells[rr][cc].words.H = key; });
      }
    });
    const { codes, givens } = MF.gridModel.codesFor(layout, rows, page.givens);
    m.codes = codes;
    m.givens = givens;
    m.cells.forEach(row => row.forEach(cell => { if (cell.type === 'letter') { cell.code = codes[cell.ch]; cell.given = givens.has(cell.ch); } }));
    m.used = [...new Set(rows.join('').replace(/[^A-Z]/g, ''))].sort((a, b) => codes[a] - codes[b]);
    if (page.author) m.note = `— ${page.author}`;
    return m;
  }

  /**
   * Modèle d'une page « logic ».
   * @param {any} page
   * @param {any} puzzle
   * @param {any} metrics
   * @param {any} layout
   */
  function from(page, puzzle, metrics, layout) {
    const lang = puzzle.options?.lang || 'fr';
    switch (page.kind) {
      case 'sudoku': case 'wordoku': case 'calcudoku': case 'futoshiki': return latin(page, page.kind);
      case 'kakuro': return kakuro(page);
      case 'picross': return picross(page);
      case 'logigramme': return logigramme(page, lang);
      case 'echelle': return echelle(page);
      case 'citation': return citation(page, layout);
      case 'nombres': {
        const m = MF.gridModel.fromBuilder(page, puzzle, metrics, page.variant === 'fleches' ? 'fleches' : 'croises', layout);
        m.digits = true;
        return m;
      }
      default: return base(page.kind, 0, 0);
    }
  }

  return { from };
})();
