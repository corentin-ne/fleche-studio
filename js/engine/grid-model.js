/* =========================================================================
   Modèle de dessin d'une grille, partagé par l'écran et les exports.
   Toutes les cotes sont exprimées en « unités case » : une case = 100 unités.

   Types de case : 'letter' | 'clue' (fléchés) | 'block' (croisés / codés)
                   'void' (case vide dans la forme) | 'out' (hors forme)
   ========================================================================= */
window.MF = window.MF || {};

MF.gridModel = (() => {
  const U = 100;

  // Ordre dans une case à 2 définitions : celle qui vise la droite en haut, celle qui vise le bas en dessous.
  // Si les deux visent la même case de droite, la flèche coudée (↴, dessinée dans le coin haut de la case)
  // va avec la définition du haut et la flèche droite (→, en bas) avec celle du bas.
  // Si les deux visent la case du dessous, on coupe la case verticalement (coudée ↳ à gauche, ↓ à droite).
  const CLUE_ORDER = { rightDown: 0, right: 1, downRight: 2, down: 3 };
  const BELOW = new Set(['down', 'downRight']);
  // Position des flèches le long du bord d'entrée de la case lettre (fraction de case)
  const AT = { corner: 0.13, first: 0.27, center: 0.5, second: 0.73, shifted: 0.34 };

  function splitOf(clues) {
    if (clues.length < 2) return null;
    return clues.every(cl => BELOW.has(cl.arrow)) ? 'v' : 'h';
  }

  /** Zone intérieure (origine = coin de la case) de la i-ème définition. */
  function clueBox(split, i, m) {
    const inner = m.inner, o = m.inset;
    if (split === 'h') return { x: o, y: o + (i * inner) / 2, w: inner, h: inner / 2 };
    if (split === 'v') return { x: o + (i * inner) / 2, y: o, w: inner / 2, h: inner };
    return { x: o, y: o, w: inner, h: inner };
  }

  function arrowAt(arrow, split, idx) {
    if (arrow === 'right') return split === 'h' ? (idx === 0 ? AT.first : AT.second) : AT.center;
    if (arrow === 'down') return split === 'v' ? AT.second : AT.center;
    return AT.corner;
  }

  /** Identifiant stable d'un mot de la grille (sens + case de départ). */
  const slotKey = w => `${w.dir}:${w.r},${w.c}`;

  /** Définition d'un mot : mot perso -> sa définition ; sinon celle écrite par l'utilisateur, sinon celle du dictionnaire. */
  function clueText(w, puzzle, wordsById = new Map(puzzle.words.map(x => [x.id, x]))) {
    if (w.src === 'theme') return wordsById.get(w.wid)?.clue || '';
    return (puzzle.fillerClues || {})[w.word] ?? MF.lexicon.get(puzzle.options?.lang)[w.word] ?? '';
  }

  /** Codes des mots codés : une permutation 1…26 et les lettres données, reproductibles pour une grille. */
  function codesFor(layout, rows, givensCount) {
    const rnd = MF.util.rng(Math.floor(layout?.at || 1) >>> 0);
    const letters = MF.util.shuffle('ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(''), rnd);
    const codes = Object.fromEntries(letters.map((l, i) => [l, i + 1]));
    // Lettres données : parmi les plus fréquentes de la grille, pour bien démarrer
    const count = {};
    rows.forEach(r => [...r].forEach(ch => { if (/[A-Z]/.test(ch)) count[ch] = (count[ch] || 0) + 1; }));
    const ranked = Object.keys(count).sort((a, b) => count[b] - count[a]);
    const pool = ranked.slice(0, Math.max(givensCount * 2, 6));
    const givens = new Set(MF.util.shuffle(pool, rnd).slice(0, givensCount));
    return { codes, givens };
  }

  /** Cases hors forme : 'void' pour la bande libre d'une grille rectangulaire, 'out' sinon. */
  function maskCells(frame, rows, cols) {
    const shape = frame?.shape || 'rect';
    const top = frame?.top || 0;
    const mask = MF.shapes.mask(shape, cols, rows, top);
    return { mask, shape, top, outType: (r, c) => (mask[r * cols + c] ? null : r < top && shape === 'rect' ? 'void' : 'out') };
  }

  /* ---------------- Fléchés, croisés, codés (grille « builder ») ---------------- */
  function fromBuilder(page, puzzle, m, game, layout) {
    const rows = page.rows.length, cols = page.rows[0].length;
    const { mask, shape, top, outType } = maskCells(page.frame, rows, cols);
    const wordsById = new Map(puzzle.words.map(w => [w.id, w]));
    const cells = page.rows.map((row, r) => [...row].map((ch, c) => {
      const o = outType(r, c);
      if (o) return { type: o };
      return ch === '#' ? { type: game === 'fleches' ? 'void' : 'block' } : { type: 'letter', ch, words: {}, arrows: [] };
    }));
    const slots = new Map();
    const byHolder = new Map();
    for (const w of page.words) {
      const key = slotKey(w);
      const [dr, dc] = w.dir === 'H' ? [0, 1] : [1, 0];
      const list = [];
      for (let i = 0; i < w.len; i++) {
        const cell = cells[w.r + i * dr][w.c + i * dc];
        if (cell.type === 'letter') cell.words[w.dir] = key;
        list.push([w.r + i * dr, w.c + i * dc]);
      }
      slots.set(key, { cells: list, dir: w.dir, word: w.word, src: w.src, wid: w.wid, holder: [w.sr, w.sc] });
      const hk = `${w.sr},${w.sc}`;
      if (!byHolder.has(hk)) byHolder.set(hk, []);
      byHolder.get(hk).push({ wid: key, word: w.word, src: w.src, arrow: w.arrow, dir: w.dir, tr: w.r, tc: w.c, text: clueText(w, puzzle, wordsById) });
    }
    const model = { game, cols, rows, band: shape === 'rect' ? top : 0, top, shape, mask, cells, slots };

    if (game === 'fleches') {
      const fitOpts = { family: m.clueFont, weight: m.clueWeight, lineH: m.lineH, max: m.maxFs, min: m.minFs };
      for (const [hk, list] of byHolder) {
        const [r, c] = hk.split(',').map(Number);
        const clues = list.sort((a, b) => CLUE_ORDER[a.arrow] - CLUE_ORDER[b.arrow]);
        const split = splitOf(clues);
        cells[r][c] = {
          type: 'clue', split,
          clues: clues.map((cl, i) => {
            const box = clueBox(split, i, m);
            const text = m.upper ? cl.text.toUpperCase() : cl.text;
            return { ...cl, box, missing: !cl.text.trim(), fit: MF.text.fit(text, box.w - m.pad * 2, box.h - m.pad * 2, fitOpts) };
          }),
        };
      }
      // Flèches dessinées dans la première case de chaque mot
      cells.forEach(row => row.forEach(cell => {
        if (cell.type !== 'clue') return;
        cell.clues.forEach((cl, idx) => {
          const target = cells[cl.tr]?.[cl.tc];
          if (target?.type === 'letter') target.arrows.push({ arrow: cl.arrow, at: arrowAt(cl.arrow, cell.split, idx) });
        });
      }));
      // Deux flèches coudées dans le même coin se croiseraient : on les écarte du coin.
      cells.forEach(row => row.forEach(cell => {
        if (cell.type !== 'letter') return;
        const bent = cell.arrows.filter(a => a.arrow === 'downRight' || a.arrow === 'rightDown');
        if (bent.length === 2) bent.forEach(a => { a.at = AT.shifted; });
      }));
      return model;
    }

    // Croisés et codés : numérotation des départs de mots (ordre de lecture)
    const starts = [...slots.entries()].sort(([, a], [, b]) => a.cells[0][0] - b.cells[0][0] || a.cells[0][1] - b.cells[0][1]);
    let n = 0;
    const numAt = new Map();
    model.across = []; model.down = [];
    for (const [key, s] of starts) {
      const [r, c] = s.cells[0];
      const k = `${r},${c}`;
      if (!numAt.has(k)) { numAt.set(k, ++n); cells[r][c].num = n; }
      const holder = byHolder.get(`${s.holder[0]},${s.holder[1]}`)?.find(x => x.wid === key);
      (s.dir === 'H' ? model.across : model.down).push({ num: numAt.get(k), key, word: s.word, len: s.word.length, text: holder?.text || '', missing: !holder?.text?.trim() });
    }
    if (game === 'codes') {
      const { codes, givens } = codesFor(layout, page.rows, puzzle.options.givens);
      model.codes = codes;
      model.givens = givens;
      cells.forEach(row => row.forEach(cell => { if (cell.type === 'letter') cell.code = codes[cell.ch]; }));
      model.used = [...new Set(page.rows.join('').replace(/[^A-Z]/g, ''))].sort((a, b) => codes[a] - codes[b]);
    }
    return model;
  }

  /* ---------------- Mots mêlés ---------------- */
  function fromMeles(page) {
    const rows = page.rows.length, cols = page.rows[0].length;
    const { mask, shape, top, outType } = maskCells(page.frame, rows, cols);
    const cells = page.rows.map((row, r) => [...row].map((ch, c) => (outType(r, c) || ch === '.' ? { type: outType(r, c) || 'out' } : { type: 'letter', ch, words: {} })));
    const slots = new Map();
    page.words.forEach((w, i) => {
      const list = Array.from({ length: w.len }, (_, k) => [w.r + w.dr * k, w.c + w.dc * k]);
      slots.set(`W${i}`, { cells: list, word: w.word, label: w.label, wid: w.wid, dr: w.dr, dc: w.dc });
    });
    const words = page.words.map((w, i) => ({ key: `W${i}`, word: w.word, label: w.label || w.word })).sort((a, b) => a.word.localeCompare(b.word));
    return { game: 'meles', cols, rows, band: shape === 'rect' ? top : 0, top, shape, mask, cells, slots, words };
  }

  /**
   * Construit le modèle d'une page de grille.
   * @param page    page calculée (builder ou meles)
   * @param metrics MF.design.metrics(design)
   */
  function from(page, puzzle, metrics, layout) {
    if (!page?.rows?.length) return { cols: 0, rows: 0, band: 0, cells: [], slots: new Map() };
    return page.engine === 'meles' ? fromMeles(page) : fromBuilder(page, puzzle, metrics, puzzle.game === 'meles' ? 'fleches' : puzzle.game, layout);
  }

  /**
   * Géométrie des flèches (origine = coin haut-gauche de la case lettre).
   * at = position le long du bord d'entrée.
   */
  function arrowShape(arrow, at = AT.center, style = 'solid', k = 1) {
    const P = at * U;
    const s = (style === 'bold' ? 1.35 : 1) * k;
    if (style === 'dot') {
      const r = 5 * k;
      if (arrow === 'right') return { dot: [r + 1, P, r] };
      if (arrow === 'down') return { dot: [P, r + 1, r] };
    }
    const chevron = style === 'chevron';
    switch (arrow) {
      case 'right': return chevron ? { line: [[1, P - 8 * s], [9 * s, P], [1, P + 8 * s]] } : { poly: [[0, P - 8 * s], [10 * s, P], [0, P + 8 * s]] };
      case 'down': return chevron ? { line: [[P - 8 * s, 1], [P, 9 * s], [P + 8 * s, 1]] } : { poly: [[P - 8 * s, 0], [P, 10 * s], [P + 8 * s, 0]] };
      case 'downRight': {
        const line = [[P, 0], [P, 14 * s], [P + 11 * s, 14 * s]];
        return chevron ? { line, line2: [[P + 9 * s, 8 * s], [P + 16 * s, 14 * s], [P + 9 * s, 20 * s]] } : { line, poly: [[P + 9 * s, 8 * s], [P + 18 * s, 14 * s], [P + 9 * s, 20 * s]] };
      }
      case 'rightDown': {
        const line = [[0, P], [14 * s, P], [14 * s, P + 11 * s]];
        return chevron ? { line, line2: [[8 * s, P + 9 * s], [14 * s, P + 16 * s], [20 * s, P + 9 * s]] } : { line, poly: [[8 * s, P + 9 * s], [14 * s, P + 18 * s], [20 * s, P + 9 * s]] };
      }
      default: return {};
    }
  }

  return { from, clueText, slotKey, arrowShape, codesFor, BELOW, U };
})();
