/* =========================================================================
   Générateur de mots mêlés : les mots perso sont cachés dans la grille
   (dans les sens autorisés, en se croisant quand c'est possible), puis
   les cases restantes reçoivent des lettres au hasard (fréquences du français).
   ========================================================================= */
window.MF = window.MF || {};

MF.wordsearch = (() => {
  const DIRS = {
    easy: [[0, 1], [1, 0]],
    normal: [[0, 1], [1, 0], [1, 1], [-1, 1]],
    hard: [[0, 1], [1, 0], [1, 1], [-1, 1], [0, -1], [-1, 0], [-1, -1], [1, -1]],
  };
  // Fréquence des lettres en français (pour des lettres de remplissage naturelles)
  const FREQ = 'EEEEEEEEEEEEEEEAAAAAAAASSSSSSSIIIIIIITTTTTTTNNNNNNNRRRRRRUUUUUULLLLLOOOOOODDDCCCPPPMMMVVQFFBGGHJXYZK';
  const EFFORT_MS = { fast: 700, normal: 1600, deep: 3500 };

  function prepare(words) {
    const seen = new Set();
    const out = [];
    for (const w of words) {
      const norm = MF.util.normalize(w.text);
      if (norm.length < 2 || seen.has(norm)) continue;
      seen.add(norm);
      out.push({ id: w.id, norm, label: MF.util.cleanText(w.text, 40), priority: !!w.priority });
    }
    return out;
  }

  /** Essaie de placer tous les mots dans un cadre ; renvoie la meilleure tentative. */
  function attempt(frame, items, dirs, rnd) {
    const { w: W, h: H, top = 0 } = frame;
    const mask = MF.shapes.mask(frame.shape || 'rect', W, H, top);
    const grid = new Array(W * H).fill('');
    const placed = [];
    const unplaced = [];
    const ordered = [...items].sort((a, b) => (b.priority - a.priority) || (b.norm.length - a.norm.length) || (rnd() - 0.5));
    for (const it of ordered) {
      const L = it.norm.length;
      let best = null, bestScore = -1;
      for (let t = 0; t < 260; t++) {
        const [dr, dc] = dirs[Math.floor(rnd() * dirs.length)];
        const r = top + Math.floor(rnd() * (H - top)), c = Math.floor(rnd() * W);
        const er = r + dr * (L - 1), ec = c + dc * (L - 1);
        if (er < top || er >= H || ec < 0 || ec >= W) continue;
        let overlap = 0, ok = true;
        for (let i = 0; i < L; i++) {
          const k = (r + dr * i) * W + (c + dc * i);
          if (!mask[k]) { ok = false; break; }
          const ch = grid[k];
          if (ch && ch !== it.norm[i]) { ok = false; break; }
          if (ch) overlap++;
        }
        if (!ok || overlap === L) continue;
        const score = overlap * 3 + rnd();
        if (score > bestScore) { bestScore = score; best = { r, c, dr, dc }; }
      }
      if (!best) { unplaced.push(it); continue; }
      for (let i = 0; i < L; i++) grid[(best.r + best.dr * i) * W + (best.c + best.dc * i)] = it.norm[i];
      placed.push({ word: it.norm, ...best, len: L, wid: it.id, label: it.label });
    }
    return { grid, mask, placed, unplaced };
  }

  async function generate(words, opts = {}, { seed = Date.now(), signal, onProgress } = {}) {
    const items = prepare(words);
    if (!items.length) return null;
    const dirs = DIRS[opts.directions] || DIRS.normal;
    const rnd = MF.util.rng(seed);
    const budget = EFFORT_MS[opts.effort] || EFFORT_MS.normal;
    const longest = Math.max(...items.map(it => it.norm.length));
    const letters = items.reduce((s, it) => s + it.norm.length, 0);
    const shape = opts.shape || 'rect';
    const band = +opts.photoBand || 0;

    const frames = [];
    if (opts.size === 'fixed') frames.push({ w: opts.cols, h: opts.rows, top: Math.min(band, opts.rows - 5), shape });
    else {
      // Cadres de plus en plus grands, aux proportions de la feuille, jusqu'à tout placer
      const area = MF.shapes.fraction(shape);
      // Une forme garde ses vraies proportions (zone utile carrée)
      const colsFor = h => (shape === 'rect' ? MF.paper.colsFor(h, opts) : h);
      let h = Math.max(6, longest + (shape === 'rect' ? 0 : 3));
      while (colsFor(h) * h * area < letters * 1.7) h++;
      for (let k = 0; k < 14; k++, h++) {
        const top = Math.min(band, Math.floor(h / 3));
        frames.push({ w: shape === 'rect' ? MF.paper.colsFor(h + top, opts) : h, h: h + top, top, shape });
      }
    }

    let best = null;
    const t0 = performance.now();
    for (const [fi, frame] of frames.entries()) {
      const tEnd = performance.now() + (opts.size === 'fixed' ? budget : budget / 3);
      do {
        const res = attempt(frame, items, dirs, rnd);
        const score = res.placed.length * 100 + res.placed.filter(p => items.find(i => i.id === p.wid)?.priority).length * 1000;
        if (!best || score > best.score) best = { ...res, frame, score };
        if (!res.unplaced.length) break;
      } while (performance.now() < tEnd);
      onProgress?.(Math.min(0.95, (performance.now() - t0) / budget));
      await MF.util.nextFrame();
      if (signal?.cancelled) return null;
      if (best.frame === frame && !best.unplaced.length) break;
    }

    const { frame, grid, mask, placed, unplaced } = best;
    const rows = [];
    for (let r = 0; r < frame.h; r++) {
      let row = '';
      for (let c = 0; c < frame.w; c++) {
        const k = r * frame.w + c;
        row += !mask[k] ? '.' : grid[k] || FREQ[Math.floor(rnd() * FREQ.length)];
      }
      rows.push(row);
    }
    return { engine: 'meles', frame, rows, words: placed, unplaced: unplaced.map(it => it.id) };
  }

  /** Empreinte des données qui influencent la grille. */
  function layoutHash(puzzle) {
    const o = puzzle.options;
    const sig = prepare(puzzle.words).map(it => `${it.id}:${it.norm}:${it.priority ? 1 : 0}`).join('|');
    return MF.util.hash(`meles1#${sig}#${o.size === 'fixed' ? `${o.cols}x${o.rows}` : 'auto'}|${o.directions}|${o.shape}|${o.photoBand}|${MF.paper.label(o)}|${o.pages}`);
  }

  return { generate, prepare, layoutHash };
})();
