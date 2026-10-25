/* =========================================================================
   Modèle de dessin d'une grille, partagé par l'écran, l'export PNG et l'export SVG.
   Toutes les cotes sont exprimées en « unités case » : une case = 100 unités.
   ========================================================================= */
window.MF = window.MF || {};

MF.gridModel = (() => {
  const U = 100;            // taille d'une case
  const LINE = 3;           // épaisseur des traits entre cases
  const FRAME = 26;         // épaisseur du cadre extérieur
  const PAD = 5;            // marge intérieure du texte des définitions
  const FONT = '"Inter", "Segoe UI", Arial, sans-serif';
  const CLUE_WEIGHT = 600;
  const LINE_H = 1.1;
  const MAX_FS = 17, MIN_FS = 6.5;

  // Ordre dans une case à 2 définitions : celle qui vise la droite en haut, celle qui vise le bas en dessous.
  // Si les deux visent la même case de droite, la flèche coudée (↴, dessinée dans le coin haut de la case)
  // va avec la définition du haut et la flèche droite (→, en bas) avec celle du bas.
  // Si les deux visent la case du dessous, seule la moitié du bas toucherait cette case : on coupe alors
  // la case verticalement (coudée ↳ à gauche, flèche ↓ à droite), transposée exacte du cas précédent.
  const CLUE_ORDER = { rightDown: 0, right: 1, downRight: 2, down: 3 };
  const BELOW = new Set(['down', 'downRight']);

  // Position des flèches le long du bord d'entrée de la case lettre (fraction de case)
  const AT = { corner: 0.13, first: 0.27, center: 0.5, second: 0.73, shifted: 0.34 };

  /** Sens de coupe d'une case à définitions : 'h' (haut/bas), 'v' (gauche/droite) ou null (une seule). */
  function splitOf(clues) {
    if (clues.length < 2) return null;
    return clues.every(cl => BELOW.has(cl.arrow)) ? 'v' : 'h';
  }

  /** Zone intérieure (unités case, origine = coin de la case) de la i-ème définition. */
  function clueBox(split, i) {
    const inner = U - LINE, o = LINE / 2;
    if (split === 'h') return { x: o, y: o + i * inner / 2, w: inner, h: inner / 2 };
    if (split === 'v') return { x: o + i * inner / 2, y: o, w: inner / 2, h: inner };
    return { x: o, y: o, w: inner, h: inner };
  }

  /** Position de la flèche d'une définition sur le bord de sa case lettre. */
  function arrowAt(arrow, split, idx) {
    if (arrow === 'right') return split === 'h' ? (idx === 0 ? AT.first : AT.second) : AT.center;
    if (arrow === 'down') return split === 'v' ? AT.second : AT.center;
    return AT.corner; // flèches coudées : dans le coin
  }

  let ctx = null;
  function measure(text, size) {
    ctx = ctx || document.createElement('canvas').getContext('2d');
    ctx.font = `${CLUE_WEIGHT} ${size}px ${FONT}`;
    return ctx.measureText(text).width;
  }

  /** Coupe un mot trop long pour la largeur, avec un tiret. */
  function splitLongWord(word, size, maxW) {
    const parts = [];
    let cur = '';
    for (const ch of word) {
      if (cur && measure(cur + ch + '-', size) > maxW) { parts.push(cur + '-'); cur = ch; } else cur += ch;
    }
    if (cur) parts.push(cur);
    return parts;
  }

  function wrap(text, size, maxW, allowSplit) {
    const lines = [];
    let cur = '';
    for (const raw of text.split(/\s+/).filter(Boolean)) {
      const tooWide = measure(raw, size) > maxW;
      if (tooWide && !allowSplit) return null;
      const pieces = tooWide ? splitLongWord(raw, size, maxW) : [raw];
      for (const word of pieces) {
        const tryLine = cur ? cur + ' ' + word : word;
        if (!cur || measure(tryLine, size) <= maxW) cur = tryLine;
        else { lines.push(cur); cur = word; }
      }
    }
    if (cur) lines.push(cur);
    return lines;
  }

  /** Plus grande taille de police pour laquelle le texte tient dans la boîte. */
  function fitText(text, boxW, boxH) {
    const clean = String(text || '').trim();
    if (!clean) return { size: MAX_FS, lines: [] };
    // 1er passage : sans couper de mot ; 2e passage : césure forcée en dernier recours.
    let best = null;
    for (const allowSplit of [false, true]) {
      for (let size = MAX_FS; size >= MIN_FS; size -= 0.5) {
        const lines = wrap(clean, size, boxW, allowSplit);
        if (!lines) continue;
        best = { size, lines };
        if (lines.length * size * LINE_H <= boxH) return best;
      }
    }
    return best; // trop long : on garde la plus petite taille (signalé par le diagnostic)
  }

  /** Identifiant stable d'un mot de la grille (sens + case de départ). */
  const slotKey = w => `${w.dir}:${w.r},${w.c}`;

  /**
   * Texte de la définition d'un mot de la grille :
   * mot perso -> sa définition ; sinon définition écrite par l'utilisateur, sinon définition toute prête.
   */
  function clueText(w, puzzle, wordsById = new Map(puzzle.words.map(x => [x.id, x]))) {
    if (w.src === 'theme') return wordsById.get(w.wid)?.clue || '';
    return (puzzle.fillerClues || {})[w.word] ?? (MF.cluesFr || {})[w.word] ?? '';
  }

  /**
   * Construit le modèle de dessin d'une grille pleine.
   * layout : { rows: ['#A#B…', …], words: [{ r, c, dir, len, word, sr, sc, arrow, src, wid }] }
   * cells[row][col] = { type:'void'|'letter'|'clue', ch?, words?, clues?, arrows? }
   * band = nombre de lignes de la bande photo en haut (toutes vides).
   */
  function from(layout, puzzle) {
    if (!layout?.rows?.length) return { cols: 0, rows: 0, band: 0, cells: [] };
    const rows = layout.rows.length, cols = layout.rows[0].length;
    const wordsById = new Map(puzzle.words.map(w => [w.id, w]));
    const cells = layout.rows.map(row => [...row].map(ch => (ch === '#' ? { type: 'void' } : { type: 'letter', ch, words: {}, arrows: [] })));

    // Chaque mot : ses cases lettres, puis sa définition dans la case qui le porte
    const byHolder = new Map();
    for (const w of layout.words) {
      const key = slotKey(w);
      const [dr, dc] = w.dir === 'H' ? [0, 1] : [1, 0];
      for (let i = 0; i < w.len; i++) cells[w.r + i * dr][w.c + i * dc].words[w.dir] = key;
      const hk = `${w.sr},${w.sc}`;
      if (!byHolder.has(hk)) byHolder.set(hk, []);
      byHolder.get(hk).push({ wid: key, word: w.word, src: w.src, arrow: w.arrow, dir: w.dir, tr: w.r, tc: w.c, text: clueText(w, puzzle, wordsById) });
    }

    for (const [hk, list] of byHolder) {
      const [r, c] = hk.split(',').map(Number);
      const clues = list.sort((a, b) => CLUE_ORDER[a.arrow] - CLUE_ORDER[b.arrow]);
      const split = splitOf(clues);
      cells[r][c] = {
        type: 'clue',
        split,
        clues: clues.map((cl, i) => {
          const box = clueBox(split, i);
          return { ...cl, box, missing: !cl.text.trim(), fit: fitText(cl.text, box.w - PAD * 2, box.h - PAD * 2) };
        }),
      };
    }

    // Flèches dessinées dans la première case de chaque mot
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const cell = cells[r][c];
        if (cell.type !== 'clue') continue;
        cell.clues.forEach((cl, idx) => {
          const target = cells[cl.tr]?.[cl.tc];
          if (!target || target.type !== 'letter') return;
          target.arrows.push({ arrow: cl.arrow, at: arrowAt(cl.arrow, cell.split, idx) });
        });
      }
    }

    // Deux flèches coudées dans le même coin (↳ venant du dessus, ↴ venant de la gauche) se croiseraient :
    // on les écarte du coin, chacune le long de son propre bord.
    for (const row of cells) {
      for (const cell of row) {
        if (cell.type !== 'letter') continue;
        const bent = cell.arrows.filter(a => a.arrow === 'downRight' || a.arrow === 'rightDown');
        if (bent.length === 2) bent.forEach(a => { a.at = AT.shifted; });
      }
    }
    return { cols, rows, band: layout.frame?.top || 0, cells };
  }

  /**
   * Géométrie des flèches (unités case, origine = coin haut-gauche de la case lettre).
   * at = position le long du bord d'entrée : hauteur sur le bord gauche (right, rightDown),
   * abscisse sur le bord du haut (down, downRight).
   */
  function arrowShape(arrow, at = AT.center) {
    const P = at * U;
    switch (arrow) {
      case 'right': return { poly: [[0, P - 8], [10, P], [0, P + 8]] };
      case 'down': return { poly: [[P - 8, 0], [P, 10], [P + 8, 0]] };
      case 'downRight': return { line: [[P, 0], [P, 14], [P + 11, 14]], poly: [[P + 9, 8], [P + 18, 14], [P + 9, 20]] };
      case 'rightDown': return { line: [[0, P], [14, P], [14, P + 11]], poly: [[8, P + 9], [14, P + 18], [20, P + 9]] };
      default: return {};
    }
  }

  return { from, clueText, slotKey, fitText, arrowShape, BELOW, U, LINE, FRAME, PAD, FONT, CLUE_WEIGHT, LINE_H };
})();
