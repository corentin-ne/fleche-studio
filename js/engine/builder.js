/* =========================================================================
   Générateur « mots perso d'abord » : objectif n°1 = placer le MAXIMUM de mots perso.

   1. Mots perso : placés en croisant les autres si possible, sinon seuls dans un coin libre.
      Beaucoup de tirages aléatoires, on garde celui qui en place le plus (★ d'abord).
   2. Comblement : des mots courants (tous définis) viennent se greffer là où il reste
      de la place, sans jamais coller deux lettres qui formeraient un mot parasite.
   3. Ce qui reste vide devient des cases photo (pour les images).

   Règles d'une grille de mots fléchés :
     - chaque mot a une case définition juste avant lui (à gauche ou au-dessus), qui en porte 2 au plus ;
     - toute suite de lettres est un mot défini (pas de lettres collées en parallèle) ;
     - le mot est encadré : pas de lettre juste avant ni juste après.

   Cases internes : lettre { t:'L', ch, H?:id, V?:id }, définition { t:'C', clues:[...], arrows:[...] },
   arrêt { t:'S' } (avant/après un mot : jamais de lettre, peut devenir définition).
   ========================================================================= */
window.MF = window.MF || {};

MF.builder = (() => {
  const OFF = 64, SPAN = 128;
  const K = (r, c) => (r + OFF) * SPAN + (c + OFF);
  const DIR = { H: [0, 1], V: [1, 0] };
  const SLOTS = {
    H: [{ dr: 0, dc: -1, arrow: 'right' }, { dr: -1, dc: 0, arrow: 'downRight' }],
    V: [{ dr: -1, dc: 0, arrow: 'down' }, { dr: 0, dc: -1, arrow: 'rightDown' }],
  };
  const EFFORT_MS = { fast: 2500, normal: 6000, deep: 14000 };
  const aimsBelow = arrow => MF.gridModel.BELOW.has(arrow); // grid-model est chargé après ce fichier

  class Board {
    constructor(frame) {
      this.frame = frame;
      this.mask = MF.shapes.mask(frame.shape || 'rect', frame.w, frame.h, frame.top || 0);
      this.cells = new Map();
      this.byLetter = new Map();
      this.placements = [];
      this.letters = 0;
      this.crossings = 0;
    }
    get(r, c) { return this.cells.get(K(r, c)); }
    set(r, c, v) { this.cells.set(K(r, c), v); }
    /** Case utilisable : dans le cadre, sous la bande libre du haut et dans la forme choisie. */
    inside(r, c) { return r >= (this.frame.top || 0) && c >= 0 && r < this.frame.h && c < this.frame.w && this.mask[r * this.frame.w + c] === 1; }
    clone() {
      const b = new Board(this.frame);
      for (const p of this.placements) place(b, p);
      return b;
    }
  }

  const isLetter = cell => cell !== undefined && cell.t === 'L';

  /** Placement possible du mot w en (r, c) dans le sens dir ? Renvoie { r, c, dir, cross, slot } ou null. */
  function evaluate(board, w, r, c, dir) {
    const [dr, dc] = DIR[dir];
    const L = w.length;
    if (!board.inside(r, c) || !board.inside(r + (L - 1) * dr, c + (L - 1) * dc)) return null;
    if (isLetter(board.get(r - dr, c - dc)) || isLetter(board.get(r + L * dr, c + L * dc))) return null;
    let cross = 0;
    for (let i = 0; i < L; i++) {
      const rr = r + i * dr, cc = c + i * dc;
      // Formes concaves (cœur, étoile…) : chaque lettre doit être dans la forme, pas seulement les extrémités
      if (!board.inside(rr, cc)) return null;
      const cell = board.get(rr, cc);
      if (cell) {
        if (cell.t !== 'L' || cell.ch !== w[i] || cell[dir] !== undefined) return null;
        cross++;
      } else if (isLetter(board.get(rr + dc, cc + dr)) || isLetter(board.get(rr - dc, cc - dr))) {
        return null; // lettre collée en parallèle : mot parasite
      }
    }
    if (cross === L) return null;
    let slot = null;
    SLOTS[dir].forEach((s, idx) => {
      const sr = r + s.dr, sc = c + s.dc;
      if (!board.inside(sr, sc)) return;
      const cell = board.get(sr, sc);
      let share = false;
      if (cell) {
        if (cell.t === 'L') return;
        if (cell.t === 'C') {
          if (cell.clues.length >= 2) return;
          // Deux définitions visant toutes deux la case du dessous : flèches impossibles à attribuer
          if (aimsBelow(s.arrow) && aimsBelow(cell.arrows[0])) return;
          share = true;
        }
      }
      const pref = (share ? 2 : 0) + (idx === 0 ? 1 : 0);
      if (!slot || pref > slot.pref) slot = { sr, sc, arrow: s.arrow, share, pref };
    });
    return slot ? { r, c, dir, cross, slot } : null;
  }

  function place(board, p) {
    const [dr, dc] = DIR[p.dir];
    const w = p.word;
    for (let i = 0; i < w.length; i++) {
      const rr = p.r + i * dr, cc = p.c + i * dc;
      let cell = board.get(rr, cc);
      if (!cell) {
        cell = { t: 'L', ch: w[i] };
        board.set(rr, cc, cell);
        if (!board.byLetter.has(w[i])) board.byLetter.set(w[i], []);
        board.byLetter.get(w[i]).push([rr, cc]);
        board.letters++;
      } else board.crossings++;
      cell[p.dir] = p.key;
    }
    for (const [sr, sc] of [[p.r - dr, p.c - dc], [p.r + w.length * dr, p.c + w.length * dc]]) {
      if (!board.get(sr, sc)) board.set(sr, sc, { t: 'S' });
    }
    let clue = board.get(p.sr, p.sc);
    if (!clue || clue.t === 'S') { clue = { t: 'C', clues: [], arrows: [] }; board.set(p.sr, p.sc, clue); }
    clue.clues.push(p.key);
    clue.arrows.push(p.arrow);
    board.placements.push(p);
  }

  const toPlacement = (word, src, wid, ev) => ({
    word, src, wid, key: `${ev.dir}:${ev.r},${ev.c}`,
    r: ev.r, c: ev.c, dir: ev.dir, len: word.length, sr: ev.slot.sr, sc: ev.slot.sc, arrow: ev.slot.arrow,
  });

  /** Placements qui croisent une lettre déjà posée. */
  function crossingSpots(board, w) {
    const out = [];
    const seen = new Set();
    for (let i = 0; i < w.length; i++) {
      for (const [rr, cc] of board.byLetter.get(w[i]) || []) {
        const cell = board.get(rr, cc);
        for (const dir of ['H', 'V']) {
          if (cell[dir] !== undefined) continue;
          const [dr, dc] = DIR[dir];
          const r = rr - i * dr, c = cc - i * dc;
          const key = dir + K(r, c);
          if (seen.has(key)) continue;
          seen.add(key);
          const ev = evaluate(board, w, r, c, dir);
          if (ev) out.push(ev);
        }
      }
    }
    return out;
  }

  /** Compacité : on se cale contre les bords et contre l'existant (moins de place perdue). */
  function snug(board, ev, L) {
    const [dr, dc] = DIR[ev.dir];
    let n = 0;
    for (let i = 0; i < L; i++) {
      const rr = ev.r + i * dr, cc = ev.c + i * dc;
      for (const k of [-2, 2]) if (!board.inside(rr + k * dc, cc + k * dr) || board.get(rr + k * dc, cc + k * dr)) n++;
      for (const k of [-1, 1]) if (!board.inside(rr + k * dc, cc + k * dr)) n += 1.5;
    }
    return n / L;
  }

  /* ---------------- 1. Mots perso ---------------- */
  function placeThemes(frame, items, rnd) {
    const board = new Board(frame);
    const out = [];
    let pending = items;
    for (let pass = 0; pass < 3 && pending.length; pass++) {
      const next = [];
      for (const it of pending) {
        let best = null, bestScore = -Infinity;
        for (const ev of crossingSpots(board, it.norm)) {
          const s = ev.cross * 6 + snug(board, ev, it.norm.length) * 3 + (ev.slot.share ? 2 : 0) + rnd() * 3;
          if (s > bestScore) { bestScore = s; best = ev; }
        }
        // Pas de croisement possible : on le pose seul (un mot perso placé vaut mieux qu'une grille connexe)
        if (!best && pass > 0) best = freeSpot(board, it.norm, rnd);
        if (!best && pass === 0 && !board.placements.length) best = freeSpot(board, it.norm, rnd);
        if (best) place(board, toPlacement(it.norm, 'theme', it.id, best)); else next.push(it);
      }
      pending = next;
    }
    pending.forEach(it => out.push(it));
    return { board, unplaced: out };
  }

  /** Meilleur emplacement libre (sans croisement) : collé à un bord ou à l'existant. */
  function freeSpot(board, w, rnd) {
    let best = null, bestScore = -Infinity;
    const { w: W, h: H, top = 0 } = board.frame;
    for (const dir of ['H', 'V']) {
      for (let r = top; r < H; r++) {
        for (let c = 0; c < W; c++) {
          const ev = evaluate(board, w, r, c, dir);
          if (!ev) continue;
          const s = snug(board, ev, w.length) + rnd();
          if (s > bestScore) { bestScore = s; best = ev; }
        }
      }
    }
    return best;
  }

  /* ---------------- 2. Comblement avec des mots courants ---------------- */
  let fillerIndex = null; // lettre -> [[mot, position]]
  function fillers() {
    if (fillerIndex) return fillerIndex;
    fillerIndex = new Map();
    for (const w of Object.keys(MF.cluesFr || {})) {
      if (w.length < 3 || w.length > 9) continue;
      for (let i = 0; i < w.length; i++) {
        if (!fillerIndex.has(w[i])) fillerIndex.set(w[i], []);
        fillerIndex.get(w[i]).push([w, i]);
      }
    }
    return fillerIndex;
  }

  const DENSITY = { airy: { rounds: 70, islands: false }, normal: { rounds: 400, islands: true }, dense: { rounds: 600, islands: true } };

  /** `tick` (facultatif) est appelé après chaque mot posé : construction visible en direct. */
  function fillGaps(board, rnd, used, deadline, density = 'normal', tick) {
    const index = fillers();
    const dz = DENSITY[density] || DENSITY.normal;
    for (let round = 0; round < dz.rounds && performance.now() < deadline; round++) {
      let best = null, bestScore = -Infinity;
      // Ancres : lettres posées qui peuvent encore être croisées
      for (const [, spots] of board.byLetter) {
        for (const [rr, cc] of spots) {
          const cell = board.get(rr, cc);
          for (const dir of ['H', 'V']) {
            if (cell[dir] !== undefined) continue;
            const list = index.get(cell.ch);
            if (!list) continue;
            const [dr, dc] = DIR[dir];
            // Échantillon aléatoire de mots contenant cette lettre
            for (let t = 0; t < 90; t++) {
              const [w, i] = list[Math.floor(rnd() * list.length)];
              if (used.has(w)) continue;
              const ev = evaluate(board, w, rr - i * dr, cc - i * dc, dir);
              if (!ev) continue;
              const s = ev.cross * 5 + w.length * 0.8 + (ev.slot.share ? 2 : 0) + rnd() * 2;
              if (s > bestScore) { bestScore = s; best = { ev, w }; }
            }
          }
        }
      }
      if (!best) break;
      used.add(best.w);
      place(board, toPlacement(best.w, 'curated', undefined, best.ev));
      tick?.();
    }
    if (dz.islands) fillIslands(board, rnd, used, deadline, tick);
  }

  /** Mots courants posés seuls dans les zones encore vides (les plus longs d'abord). */
  let byLength = null;
  function fillIslands(board, rnd, used, deadline, tick) {
    if (!byLength) {
      byLength = new Map();
      for (const w of Object.keys(MF.cluesFr || {})) {
        if (w.length < 3 || w.length > 9) continue;
        if (!byLength.has(w.length)) byLength.set(w.length, []);
        byLength.get(w.length).push(w);
      }
    }
    const { w: W, h: H, top = 0 } = board.frame;
    for (let round = 0; round < 200 && performance.now() < deadline; round++) {
      let best = null, bestScore = -Infinity;
      for (let r = top; r < H; r++) {
        for (let c = 0; c < W; c++) {
          if (board.get(r, c)) continue;
          for (const dir of ['H', 'V']) {
            for (let L = 9; L >= 3; L--) {
              const list = byLength.get(L);
              if (!list) continue;
              const w = list[Math.floor(rnd() * list.length)];
              if (used.has(w)) continue;
              const ev = evaluate(board, w, r, c, dir);
              if (!ev) continue;
              const s = L * 2 + ev.cross * 5 + snug(board, ev, L) + (ev.slot.share ? 2 : 0) + rnd();
              if (s > bestScore) { bestScore = s; best = { ev, w }; }
              break; // la plus grande longueur qui rentre suffit pour cette case
            }
          }
        }
      }
      if (!best) break;
      used.add(best.w);
      place(board, toPlacement(best.w, 'curated', undefined, best.ev));
      tick?.();
    }
  }

  /* ---------------- Orchestration ---------------- */
  function prepare(words) {
    const seen = new Set();
    const items = [];
    for (const w of words) {
      const norm = MF.util.normalize(w.text);
      if (norm.length < 2 || seen.has(norm)) continue;
      seen.add(norm);
      items.push({ id: w.id, norm, priority: !!w.priority });
    }
    return items;
  }

  /**
   * Répartit les mots perso sur `pages` grilles, moitié-moitié : les plus longs d'abord,
   * chacun sur la page qui a le moins de lettres (les ★ sont répartis de la même façon).
   */
  function split(words, pages) {
    const valid = prepare(words);
    const byId = new Map(words.map(w => [w.id, w]));
    const groups = Array.from({ length: pages }, () => ({ words: [], letters: 0 }));
    const ordered = [...valid].sort((a, b) => (b.priority - a.priority) || (b.norm.length - a.norm.length));
    for (const it of ordered) {
      const g = groups.reduce((m, x) => (x.letters < m.letters || (x.letters === m.letters && x.words.length < m.words.length) ? x : m));
      g.words.push(byId.get(it.id));
      g.letters += it.norm.length;
    }
    return groups.map(g => g.words);
  }

  function themeScore(board, all) {
    const placed = new Set(board.placements.map(p => p.wid));
    const prio = all.filter(it => it.priority && placed.has(it.id)).length;
    return placed.size * 100 + prio * 1000 + board.crossings * 2;
  }

  function summarize(board, all, extra) {
    const { w: W, h: H, top = 0 } = board.frame;
    const rows = [];
    for (let r = 0; r < H; r++) {
      let row = '';
      for (let c = 0; c < W; c++) { const cell = board.get(r, c); row += isLetter(cell) ? cell.ch : '#'; }
      rows.push(row);
    }
    const words = board.placements.map(p => ({ r: p.r, c: p.c, dir: p.dir, len: p.len, word: p.word, sr: p.sr, sc: p.sc, arrow: p.arrow, src: p.src, wid: p.wid }));
    const holders = new Set(words.map(w => w.sr * W + w.sc));
    let photos = 0;
    // Cases vides dans la forme (hors bande libre) = cases « photo »
    rows.forEach((row, r) => { if (r >= top) [...row].forEach((x, c) => { if (x === '#' && board.mask[r * W + c] && !holders.has(r * W + c)) photos++; }); });
    const placed = new Set(words.filter(w => w.src === 'theme').map(w => w.wid));
    return { engine: 'builder', frame: board.frame, rows, words, photos, unplaced: all.filter(it => !placed.has(it.id)).map(it => it.id), ...extra };
  }

  /** Instantané léger (sérialisable) d'une grille en cours de construction, pour l'aperçu animé. */
  function snapshot(board, all, extra) {
    const words = board.placements.map(p => ({ r: p.r, c: p.c, dir: p.dir, len: p.len, word: p.word, sr: p.sr, sc: p.sc, arrow: p.arrow, src: p.src }));
    const placed = new Set(board.placements.filter(p => p.src === 'theme').map(p => p.wid)).size;
    return { engine: 'builder', frame: board.frame, words, placed, total: all.length, ...extra };
  }

  /** Cadre aux proportions de la feuille (portrait ou paysage) de h lignes, dont `top` lignes de bande libre en haut. */
  // Une forme (cercle, cœur…) garde ses vraies proportions : sa zone utile est carrée
  const sheetFrame = (opts, h, top = 0) => ({ w: opts.shape && opts.shape !== 'rect' ? h - top : MF.paper.colsFor(h, opts), h, top, shape: opts.shape || 'rect' });

  /** Hauteur de la bande photo, bornée pour laisser au moins 7 lignes de grille. */
  const bandRows = (opts, h) => Math.max(0, Math.min(+opts.photoBand || 0, h - 7));

  /**
   * Recherche asynchrone.
   *  - Taille « auto » (par défaut) : la grille s'agrandit (aux proportions de la feuille) jusqu'à ce que TOUS
   *    les mots perso y entrent, puis on peaufine à cette taille.
   *  - Taille fixe : on place le maximum de mots perso dans le cadre demandé.
   * Ensuite, comblement des meilleures dispositions ; on garde celle qui laisse le moins de cases photo.
   */
  async function generate(words, opts = {}, { seed = Date.now(), onProgress, onSnapshot, signal, exclude = new Set(), banned = [] } = {}) {
    if (!prepare(words).length) return null;
    const all = prepare(words);
    const budget = EFFORT_MS[opts.effort] || EFFORT_MS.normal;
    const t0 = performance.now();
    let n = 0;
    // Aperçu en direct : l'appelant reçoit une fonction et ne construit l'instantané que s'il l'affiche.
    // `every` : chaque étape compte (remplissage, très rapide) et ne doit pas être sautée.
    const show = (board, phase, extra, every = false) => onSnapshot?.(() => snapshot(board, all, { phase, attempts: n, ...extra }), every);

    /** Tirages de dispositions de mots perso dans un cadre ; garde les 3 meilleures. */
    async function search(frame, ms, stopWhenAll) {
      const fits = all.filter(it => it.norm.length <= Math.max(frame.w, frame.h - (frame.top || 0)));
      const top = [];
      const tStart = performance.now();
      let trial = null; // dernier essai, montré en filigrane derrière le meilleur
      while (performance.now() - tStart < ms || !top.length) {
        const sliceEnd = performance.now() + 30;
        do {
          const rnd = MF.util.rng((seed + n * 7919) >>> 0);
          n++;
          const ordered = fits
            .map(it => ({ it, k: (it.priority ? 1000 : 0) + it.norm.length + rnd() * 5 }))
            .sort((a, b) => b.k - a.k)
            .map(x => x.it);
          const { board } = placeThemes(frame, ordered, rnd);
          trial = board;
          const score = themeScore(board, all);
          if (top.length < 3 || score > top[top.length - 1].score) {
            top.push({ board, score, placed: board.placements.length });
            top.sort((a, b) => b.score - a.score);
            if (top.length > 3) top.pop();
          }
        } while (performance.now() < sliceEnd);
        onProgress?.(Math.min(0.7, (performance.now() - t0) / budget));
        show(top[0].board, 'themes', { ghost: trial === top[0].board ? [] : trial.placements.map(p => ({ r: p.r, c: p.c, dir: p.dir, word: p.word })) });
        await MF.util.nextFrame();
        if (signal?.cancelled) return null;
        if (stopWhenAll && top[0].placed === all.length) break;
      }
      return top;
    }

    let top;
    const shape = opts.shape || 'rect';
    if (opts.size === 'fixed') {
      const h = opts.rows || 21;
      top = await search({ w: opts.cols || 15, h, top: bandRows(opts, h), shape }, budget * 0.7, false);
    } else {
      // Plus petit cadre (aux proportions de la feuille) dont la partie sous la bande libre contient
      // tous les mots : le plus long doit tenir dans un sens, la surface utile (dans la forme) doit suffire.
      // En A3, on part d'une taille minimale pour profiter de toute la feuille.
      const band = +opts.photoBand || 0;
      const longest = Math.max(...all.map(it => it.norm.length), 5);
      const letters = all.reduce((s, it) => s + it.norm.length, 0);
      const area = MF.shapes.fraction(shape);
      // Dans une forme, les lignes les plus longues sont plus courtes que le cadre
      const reach = MF.shapes.reach(shape);
      const frameAt = hh => sheetFrame(opts, hh, bandRows(opts, hh));
      const roomy = hh => {
        const f = frameAt(hh), useful = hh - f.top;
        return Math.max(f.w, useful) * reach > longest && f.w * useful * area >= letters * 2.2;
      };
      let h = Math.max(band + 7, MF.paper.minRows(opts));
      while (!roomy(h)) h++;
      for (; h <= 70; h++) {
        top = await search(frameAt(h), Math.max(500, budget / 8), true);
        if (!top) return null;
        if (top[0].placed === all.length) break;
      }
      // Peaufinage à la bonne taille avec le temps restant
      const more = await search(frameAt(h), Math.max(300, budget * 0.7 - (performance.now() - t0)), false);
      if (!more) return null;
      top = [...top, ...more].sort((a, b) => b.score - a.score).slice(0, 3);
    }
    if (!top) return null;

    // Comblement (sauf option « mots perso uniquement ») : chaque disposition retenue reçoit des mots courants,
    // jamais déjà utilisés sur une autre page (`exclude`)
    const withFillers = opts.fillers !== false;
    let best = null;
    for (const [i, cand] of top.entries()) {
      const board = cand.board.clone();
      // Mots déjà utilisés ailleurs ou bannis par l'utilisateur : jamais proposés en remplissage
      const used = new Set([...exclude, ...banned, ...board.placements.map(p => p.word)]);
      const tick = () => show(board, 'fill', { variant: i + 1, variants: top.length }, true);
      tick();
      if (withFillers) fillGaps(board, MF.util.rng((seed + i * 104729) >>> 0), used, performance.now() + Math.max(400, (budget * 0.3) / top.length), opts.density, tick);
      const res = summarize(board, all, { seed, attempts: n });
      res.score = cand.score * 10 - res.photos;
      if (!best || res.score > best.score) best = res;
      onProgress?.(0.7 + 0.3 * ((i + 1) / top.length));
      await MF.util.nextFrame();
      if (signal?.cancelled) return null;
    }
    return best;
  }

  const optionsKey = (o = {}) => {
    const paper = MF.paper.label(o);
    // A4 portrait (format historique) n'apparaît pas : les grilles déjà calculées restent à jour
    return `${o.size === 'fixed' ? `${o.cols || 15}x${o.rows || 21}` : 'auto'}|p${o.pages || 1}|f${o.fillers === false ? 0 : 1}|b${+o.photoBand || 0}|${paper}|${o.shape || 'rect'}|${o.density || 'normal'}${o.shape && o.shape !== 'rect' ? '|s2' : ''}`;
  };

  /** Empreinte des données qui influencent la grille. */
  function layoutHash(puzzle) {
    const sig = prepare(puzzle.words).map(it => `${it.id}:${it.norm}:${it.priority ? 1 : 0}`).join('|');
    return MF.util.hash(`builder3#${sig}#${optionsKey(puzzle.options)}#${(puzzle.banned || []).join(',')}`);
  }

  return { generate, split, prepare, layoutHash, optionsKey };
})();
