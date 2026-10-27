// @ts-check
/* =========================================================================
   Jeux de chiffres (et le wordoku) : sudoku, wordoku, calcudoku, futoshiki,
   kakuro, nombres fléchés / croisés. Chaque générateur tire une solution au
   hasard puis ajoute ou retire des indices jusqu'à ce que la solution soit
   UNIQUE (vérifiée par MF.solver).

   Pages produites (engine 'logic', voir MF.logic) : la solution est écrite
   ligne par ligne dans `rows` (chiffres, lettres, '#' = case noire) et les
   cases données au départ dans `given` ('1' = donnée).
   ========================================================================= */
window.MF = window.MF || {};

MF.logicNumbers = (() => {
  const S = () => MF.solver;
  const { shuffle } = MF.util;
  const LEVEL_KEEP = { easy: 0.52, medium: 0.42, hard: 0.34, expert: 0 };

  const pick = (list, rnd) => list[Math.floor(rnd() * list.length)];
  /** @type {(vals: ArrayLike<any>, w: number, h: number, fn?: (v: any) => string) => string[]} */
  const toRows = (vals, w, h, fn = String) => Array.from({ length: h }, (_, r) => Array.from({ length: w }, (_, c) => fn(vals[r * w + c])).join(''));
  const givenRows = (given, w, h) => toRows(given, w, h, v => (v ? '1' : '0'));
  const neighbors = (i, w, h) => {
    const r = Math.floor(i / w), c = i % w, out = [];
    if (r > 0) out.push(i - w);
    if (r < h - 1) out.push(i + w);
    if (c > 0) out.push(i - 1);
    if (c < w - 1) out.push(i + 1);
    return out;
  };

  /* ---------------- Sudoku & wordoku ---------------- */
  const BOX = { 4: [2, 2], 6: [2, 3], 8: [2, 4], 9: [3, 3] };
  function boxRegions(n) {
    const [bh, bw] = BOX[n];
    return Array.from({ length: n * n }, (_, i) => Math.floor(Math.floor(i / n) / bh) * (n / bw) + Math.floor((i % n) / bw));
  }
  /** Régions irrégulières : on part des carrés, puis on échange des cases voisines sans couper une région. */
  function jigsawRegions(n, rnd) {
    const reg = boxRegions(n);
    const connected = id => {
      const cells = reg.map((x, i) => (x === id ? i : -1)).filter(i => i >= 0);
      const seen = new Set([cells[0]]), stack = [cells[0]];
      while (stack.length) for (const q of neighbors(stack.pop(), n, n)) if (reg[q] === id && !seen.has(q)) { seen.add(q); stack.push(q); }
      return seen.size === cells.length;
    };
    for (let t = 0; t < n * n * 8; t++) {
      const a = Math.floor(rnd() * n * n);
      const b = pick(neighbors(a, n, n), rnd);
      const A = reg[a], B = reg[b];
      if (A === B) continue;
      reg[a] = B; reg[b] = A;
      if (!connected(A) || !connected(B)) { reg[a] = A; reg[b] = B; }
    }
    return reg;
  }
  function sudokuGroups(n, regions, variant) {
    const groups = S().latinGroups(n);
    for (let g = 0; g < n; g++) groups.push(regions.map((x, i) => (x === g ? i : -1)).filter(i => i >= 0));
    if (variant === 'diagonal') {
      groups.push(Array.from({ length: n }, (_, i) => i * n + i));
      groups.push(Array.from({ length: n }, (_, i) => i * n + (n - 1 - i)));
    }
    return groups;
  }

  /**
   * Retire des cases données tant que la solution reste unique (paires symétriques).
   * @param {(fixed: Record<number, number>) => number} count  nombre de solutions (limité à 2)
   */
  function dig(sol, N, level, rnd, count, symmetric = true) {
    const given = new Array(N).fill(true);
    const keep = Math.round(N * (LEVEL_KEEP[level] ?? 0.42));
    let left = N;
    for (const i of shuffle([...Array(N).keys()], rnd)) {
      if (left <= keep) break;
      const j = symmetric ? N - 1 - i : i;
      if (!given[i]) continue;
      given[i] = false; given[j] = false;
      /** @type {Record<number, number>} */
      const fixed = {};
      given.forEach((g, k) => { if (g) fixed[k] = sol[k]; });
      if (count(fixed) === 1) left -= i === j ? 1 : 2;
      else { given[i] = true; given[j] = true; }
    }
    return given;
  }

  function sudoku(opts, rnd, { letters = null } = {}) {
    const n = [4, 6, 8, 9].includes(opts.size) ? opts.size : 9;
    const variant = ['classic', 'jigsaw', 'diagonal'].includes(opts.variant) ? opts.variant : 'classic';
    for (let attempt = 0; attempt < 40; attempt++) {
      const regions = variant === 'jigsaw' ? jigsawRegions(n, rnd) : boxRegions(n);
      const full = sudokuGroups(n, regions, variant);
      const base = { size: n * n, values: S().range(n), full };
      const first = S().solve(base, { limit: 1, rnd, maxNodes: 20000 });
      if (!first.solution) continue;
      const sol = first.solution;
      const given = dig(sol, n * n, opts.level, rnd, fixed => { const r = S().solve({ ...base, fixed }, { limit: 2, maxNodes: 40000 }); return r.aborted ? 2 : r.count; }, variant !== 'jigsaw');
      // Wordoku : les chiffres deviennent les lettres du mot, lu dans la première ligne
      const sym = letters ? Object.fromEntries(sol.slice(0, n).map((v, i) => [v, letters[i]])) : null;
      return {
        kind: opts.game, n, variant, rows: toRows(sol, n, n, v => (sym ? sym[v] : String(v))),
        given: givenRows(given, n, n), regions: toRows(regions, n, n, v => String.fromCharCode(65 + v)),
        ...(letters ? { word: letters.join('') } : {}),
      };
    }
    throw new Error('sudoku');
  }

  /** Wordoku : un mot de n lettres toutes différentes (le tien, sinon un mot du dictionnaire). */
  function wordoku(opts, rnd, words) {
    const n = [4, 6, 8, 9].includes(opts.size) ? opts.size : 9;
    const distinct = w => w.length === n && new Set(w).size === n;
    const mine = words.map(w => w.norm).filter(distinct);
    let word = mine.length ? pick(mine, rnd) : '';
    if (!word) {
      const dict = Object.keys(MF.lexicon.get(opts.lang)).filter(distinct);
      word = dict.length ? pick(dict, rnd) : 'ABCDEFGHI'.slice(0, n);
    }
    return sudoku({ ...opts, size: n }, rnd, { letters: [...word] });
  }

  /* ---------------- Calcudoku ---------------- */
  const OPS = { '+': (a, b) => a + b, x: (a, b) => a * b };
  function cageTarget(vals, op) {
    if (op === '=') return vals[0];
    if (op === '-') return Math.abs(vals[0] - vals[1]);
    if (op === '/') return Math.max(...vals) / Math.min(...vals);
    return vals.reduce(OPS[op]);
  }
  function chooseOp(vals, rnd, variant) {
    if (vals.length === 1) return '=';
    if (variant === 'add') return '+';
    if (vals.length === 2) {
      const [a, b] = [Math.max(...vals), Math.min(...vals)];
      const ops = ['-', '-', '+', 'x'];
      if (a % b === 0) ops.push('/', '/');
      return pick(ops, rnd);
    }
    return vals.reduce((p, v) => p * v, 1) <= 400 && rnd() < 0.45 ? 'x' : '+';
  }
  function tuplesOf(cage, n) {
    const k = cage.cells.length, out = [];
    const cur = new Array(k);
    const rec = i => {
      if (i === k) { if (cageTarget(cur, cage.op) === cage.target) out.push([...cur]); return; }
      for (let v = 1; v <= n; v++) { cur[i] = v; rec(i + 1); }
    };
    rec(0);
    return out;
  }
  function components(cells, n) {
    const left = new Set(cells), out = [];
    while (left.size) {
      const start = left.values().next().value;
      const comp = [start], stack = [start];
      left.delete(start);
      while (stack.length) for (const q of neighbors(stack.pop(), n, n)) if (left.has(q)) { left.delete(q); comp.push(q); stack.push(q); }
      out.push(comp);
    }
    return out;
  }

  function calcudoku(opts, rnd) {
    const n = MF.util.clamp(opts.size || 5, 4, 7);
    const maxSize = { easy: 2, medium: 3, hard: 4, expert: 4 }[opts.level] || 3;
    const latin = { size: n * n, values: S().range(n), full: S().latinGroups(n) };
    const sol = S().solve(latin, { limit: 1, rnd }).solution;
    const make = cells => { const vals = cells.map(i => sol[i]); const op = chooseOp(vals, rnd, opts.variant); return { cells, op, target: cageTarget(vals, op) }; };
    // Découpage en cages connexes de 1 à maxSize cases
    const owner = new Int16Array(n * n).fill(-1);
    let cages = [];
    for (const s of shuffle([...Array(n * n).keys()], rnd)) {
      if (owner[s] >= 0) continue;
      const want = Math.min(maxSize, rnd() < 0.08 ? 1 : 2 + Math.floor(rnd() * Math.max(1, maxSize - 1)));
      const cells = [s];
      owner[s] = cages.length;
      while (cells.length < want) {
        const front = cells.flatMap(i => neighbors(i, n, n)).filter(q => owner[q] < 0);
        if (!front.length) break;
        const q = pick(front, rnd);
        owner[q] = cages.length;
        cells.push(q);
      }
      // Une cage « - » ou « / » n'a que 2 cases ; deux cases d'une même ligne dans une cage de 3+ restent permises
      cages.push(make(cells));
    }
    // Tant que l'énigme a plusieurs solutions : la case qui diffère devient une cage d'une case
    for (let guard = 0; guard < n * n; guard++) {
      const res = S().solve({ ...latin, tuples: cages.map(cg => ({ cells: cg.cells, list: tuplesOf(cg, n) })) }, { limit: 2, maxNodes: 80000 });
      if (res.count === 1 && !res.aborted) break;
      const diff = res.second ? res.solution.map((v, i) => (v !== res.second[i] ? i : -1)).filter(i => i >= 0) : cages.filter(cg => cg.cells.length > 1).flatMap(cg => cg.cells);
      if (!diff.length) break;
      const d = pick(diff, rnd);
      const ci = cages.findIndex(cg => cg.cells.includes(d));
      const rest = cages[ci].cells.filter(i => i !== d);
      cages.splice(ci, 1, make([d]), ...components(rest, n).map(make));
    }
    cages = cages.map(cg => ({ cells: [...cg.cells].sort((a, b) => a - b), op: cg.op, target: cg.target }));
    return { kind: 'calcudoku', n, variant: opts.variant === 'add' ? 'add' : 'all', rows: toRows(sol, n, n), given: givenRows(new Array(n * n).fill(false), n, n), cages };
  }

  /* ---------------- Futoshiki ---------------- */
  function futoshiki(opts, rnd) {
    const n = MF.util.clamp(opts.size || 5, 4, 7);
    const latin = { size: n * n, values: S().range(n), full: S().latinGroups(n) };
    const sol = S().solve(latin, { limit: 1, rnd }).solution;
    const pairs = [];
    for (let i = 0; i < n * n; i++) {
      if (i % n < n - 1) pairs.push(sol[i] < sol[i + 1] ? [i, i + 1] : [i + 1, i]);
      if (i < n * (n - 1)) pairs.push(sol[i] < sol[i + n] ? [i, i + n] : [i + n, i]);
    }
    const pool = shuffle(pairs, rnd);
    let signs = pool.slice(0, Math.round(pairs.length * 0.3));
    const given = new Array(n * n).fill(false);
    const fixedOf = () => Object.fromEntries(given.map((g, i) => [i, g ? sol[i] : -1]).filter(([, v]) => v > 0));
    const count = (sg = signs) => S().solve({ ...latin, less: sg, fixed: fixedOf() }, { limit: 2, maxNodes: 60000 });
    for (let guard = 0; guard < n * n * 2; guard++) {
      const res = count();
      if (res.count === 1 && !res.aborted) break;
      const diff = res.second ? res.solution.map((v, i) => (v !== res.second[i] ? i : -1)).filter(i => i >= 0) : [Math.floor(rnd() * n * n)];
      const d = pick(diff, rnd);
      const extra = pool.find(p => (p[0] === d || p[1] === d) && !signs.includes(p));
      if (extra) signs = [...signs, extra]; else given[d] = true;
    }
    // Énigme plus dure : on retire les signes superflus (une partie seulement en niveau moyen)
    const removable = { easy: 0, medium: 0.5, hard: 1, expert: 1 }[opts.level] ?? 0.5;
    let tries = Math.round(signs.length * removable);
    for (const s of shuffle(signs, rnd)) {
      if (tries-- <= 0) break;
      const next = signs.filter(x => x !== s);
      const res = count(next);
      if (res.count === 1 && !res.aborted) signs = next;
    }
    if (opts.level === 'easy') for (const i of shuffle([...Array(n * n).keys()], rnd).slice(0, Math.ceil(n / 2))) given[i] = true;
    return { kind: 'futoshiki', n, rows: toRows(sol, n, n), given: givenRows(given, n, n), signs: signs.map(([a, b]) => [a, b]) };
  }

  /* ---------------- Motifs de cases noires (kakuro, nombres croisés) ---------------- */
  /**
   * Cases noires symétriques. `frame` : la première ligne et la première colonne sont noires (kakuro).
   * Chaque case blanche appartient à une suite de 2 cases ou plus (dans les deux sens si `both`).
   */
  function pattern(W, H, rnd, { density, maxRun, frame, both }) {
    let kept = null;
    for (let attempt = 0; attempt < 60; attempt++) {
      const black = new Uint8Array(W * H);
      const r0 = frame ? 1 : 0;
      const set = (r, c) => { black[r * W + c] = 1; const rr = H - 1 - r + r0, cc = W - 1 - c + r0; if (rr >= r0 && cc >= r0 && rr < H && cc < W) black[rr * W + cc] = 1; };
      if (frame) for (let i = 0; i < W; i++) black[i] = 1;
      if (frame) for (let i = 0; i < H; i++) black[i * W] = 1;
      for (let r = r0; r < H; r++) for (let c = r0; c < W; c++) if (rnd() < density) set(r, c);
      const runLen = (i, dr, dc) => {
        const r = Math.floor(i / W), c = i % W;
        let a = 0, b = 0;
        while (r - (a + 1) * dr >= 0 && c - (a + 1) * dc >= 0 && !black[(r - (a + 1) * dr) * W + c - (a + 1) * dc]) a++;
        while (r + (b + 1) * dr < H && c + (b + 1) * dc < W && !black[(r + (b + 1) * dr) * W + c + (b + 1) * dc]) b++;
        return { len: a + b + 1, start: a };
      };
      for (let changed = true, guard = 0; changed && guard < 200; guard++) {
        changed = false;
        for (let i = 0; i < W * H; i++) {
          if (black[i]) continue;
          const h = runLen(i, 0, 1), v = runLen(i, 1, 0);
          const r = Math.floor(i / W), c = i % W;
          if (both ? h.len < 2 || v.len < 2 : h.len < 2 && v.len < 2) { set(r, c); changed = true; }
          else if (h.len > maxRun && h.start === Math.floor(h.len / 2)) { set(r, c); changed = true; }
          else if (v.len > maxRun && v.start === Math.floor(v.len / 2)) { set(r, c); changed = true; }
        }
      }
      // Une seule zone de cases blanches (la plus grande)
      const whites = [...black.keys()].filter(i => !black[i]);
      if (!whites.length) continue;
      const comp = new Int16Array(W * H).fill(-1);
      let best = -1, bestSize = 0, id = 0;
      for (const s of whites) {
        if (comp[s] >= 0) continue;
        let size = 0;
        const stack = [s];
        comp[s] = id;
        while (stack.length) { const q = stack.pop(); size++; for (const x of neighbors(q, W, H)) if (!black[x] && comp[x] < 0) { comp[x] = id; stack.push(x); } }
        if (size > bestSize) { bestSize = size; best = id; }
        id++;
      }
      whites.forEach(i => { if (comp[i] !== best) black[i] = 1; });
      if (bestSize >= (W - r0) * (H - r0) * 0.5) return black;
      // Sinon on garde le meilleur essai, au cas où aucun n'atteindrait la moitié de la grille
      if (!kept || bestSize > kept.size) kept = { size: bestSize, black };
    }
    return kept && kept.size >= 6 ? kept.black : null;
  }
  /** Suites horizontales et verticales de 2 cases blanches ou plus. */
  function runsOf(black, W, H) {
    const out = [];
    for (const [dir, dr, dc] of /** @type {[string, number, number][]} */ ([['H', 0, 1], ['V', 1, 0]])) {
      for (let r = 0; r < H; r++) {
        for (let c = 0; c < W; c++) {
          const i = r * W + c;
          if (black[i]) continue;
          const pr = r - dr, pc = c - dc;
          if (pr >= 0 && pc >= 0 && !black[pr * W + pc]) continue;
          const cells = [];
          for (let rr = r, cc = c; rr < H && cc < W && !black[rr * W + cc]; rr += dr, cc += dc) cells.push(rr * W + cc);
          if (cells.length >= 2) out.push({ dir, r, c, cells });
        }
      }
    }
    return out;
  }

  /* ---------------- Kakuro ---------------- */
  function kakuro(opts, rnd) {
    const side = MF.util.clamp(opts.size || 8, 5, 14);
    const aspect = MF.util.clamp(opts.aspect || 1, 0.6, 1.6);
    const H = side + 1, W = Math.max(5, Math.round(side * Math.min(aspect, 1.3))) + 1;
    // Plusieurs essais (moins d'une seconde) : on garde la grille qui donne le moins de chiffres au départ
    const t0 = Date.now();
    let best = null;
    for (let attempt = 0; attempt < 30 && !(best && (best.count === 0 || Date.now() - t0 > 700)); attempt++) {
      const black = pattern(W, H, rnd, { density: 0.2, maxRun: opts.level === 'easy' ? 5 : 7, frame: true, both: true });
      if (!black) continue;
      const runs = runsOf(black, W, H);
      const values = S().range(9);
      const fill = S().solve({ size: W * H, values, groups: runs.map(r => r.cells), fixed: Object.fromEntries([...black.keys()].filter(i => black[i]).map(i => [i, 0])) }, { limit: 1, rnd, maxNodes: 30000 });
      if (!fill.solution) continue;
      // Les cases noires prennent la « valeur » 0 (hors du jeu)
      const sol = fill.solution;
      const sums = runs.map(r => ({ cells: r.cells, combos: S().combos(r.cells.length, r.cells.reduce((s, i) => s + sol[i], 0)) }));
      const blackFixed = Object.fromEntries([...black.keys()].filter(i => black[i]).map(i => [i, 0]));
      const given = new Array(W * H).fill(false);
      let ok = false;
      for (let guard = 0; guard < 40; guard++) {
        const fixed = { ...blackFixed };
        given.forEach((g, i) => { if (g) fixed[i] = sol[i]; });
        const res = S().solve({ size: W * H, values, groups: runs.map(r => r.cells), sums, fixed }, { limit: 2, maxNodes: 120000 });
        if (res.count === 1 && !res.aborted) { ok = true; break; }
        const diff = res.second ? res.solution.map((v, i) => (v !== res.second[i] ? i : -1)).filter(i => i >= 0) : [];
        if (!diff.length) break;
        given[pick(diff, rnd)] = true;
      }
      if (!ok) continue;
      const count = given.filter(Boolean).length;
      if (!best || count < best.count) best = { count, page: { kind: 'kakuro', w: W, h: H, rows: toRows(sol, W, H, v => (v ? String(v) : '#')), given: givenRows(given, W, H) } };
    }
    if (best) return best.page;
    throw new Error('kakuro');
  }

  /* ---------------- Nombres fléchés / croisés ---------------- */
  /** Définition calculée d'un nombre : { t, a, b, c } (texte écrit par MF.logic.formula). */
  function formula(n, rnd, level) {
    const kinds = { easy: ['add', 'sub', 'dbl', 'half'], medium: ['add', 'sub', 'mul', 'div', 'dbl', 'half'], hard: ['mul', 'div', 'mix', 'sub', 'sq'], expert: ['mix', 'mix2', 'div', 'sq', 'mul'] }[level] || ['add', 'sub', 'mul', 'div'];
    const root = Math.round(Math.sqrt(n)), cube = Math.round(Math.cbrt(n));
    if (root * root === n && root > 3 && rnd() < 0.7) return { t: 'sq', a: root };
    if (cube ** 3 === n && cube > 2 && rnd() < 0.7) return { t: 'cube', a: cube };
    for (let tries = 0; tries < 12; tries++) {
      const k = pick(kinds, rnd);
      const small = Math.max(2, Math.min(n - 1, Math.round(n * (0.15 + rnd() * 0.6))));
      if (k === 'add') return { t: 'add', a: n - small, b: small };
      if (k === 'sub') return { t: 'sub', a: n + small, b: small };
      if (k === 'dbl' && n % 2 === 0) return { t: 'dbl', a: n / 2 };
      if (k === 'half') return { t: 'half', a: n * 2 };
      if (k === 'div') { const b = 2 + Math.floor(rnd() * 8); return { t: 'div', a: n * b, b }; }
      if (k === 'sq' && root > 3) { const c = n - root * root; if (c > 0) return { t: 'sqp', a: root, b: c }; }
      if (k === 'mul' || k === 'mix' || k === 'mix2') {
        const divs = [];
        for (let d = 2; d * d <= n && d < 100; d++) if (n % d === 0) divs.push(d);
        if (k === 'mul' && divs.length) { const d = pick(divs, rnd); return { t: 'mul', a: n / d, b: d }; }
        if (k !== 'mul') {
          const b = 3 + Math.floor(rnd() * 7), a = Math.floor(n / b), c = n - a * b;
          if (a > 1 && c > 0) return k === 'mix' ? { t: 'mix', a, b, c } : { t: 'mix2', a: a + 1, b, c: b - c };
        }
      }
    }
    return { t: 'add', a: n - 1, b: 1 };
  }

  function nombres(opts, rnd) {
    const side = MF.util.clamp(opts.size || 9, 5, 15);
    const aspect = MF.util.clamp(opts.aspect || 0.8, 0.5, 2);
    const H = side, W = Math.max(5, Math.round(side * aspect));
    // Nombres de 2 à 4 chiffres (jusqu'à 5 ou 6 en difficile et expert)
    const maxRun = { easy: 3, medium: 4, hard: 5, expert: 6 }[opts.level] || 4;
    const black = pattern(W, H, rnd, { density: maxRun <= 3 ? 0.18 : 0.22, maxRun, frame: false, both: false });
    if (!black) throw new Error('nombres');
    const runs = runsOf(black, W, H);
    const starts = new Set(runs.map(r => r.cells[0]));
    const digit = Array.from({ length: W * H }, (_, i) => (black[i] ? -1 : (starts.has(i) ? 1 : 0) + Math.floor(rnd() * (starts.has(i) ? 9 : 10))));
    const rows = toRows(digit, W, H, v => (v < 0 ? '#' : String(v)));
    const fleches = opts.variant === 'fleches';
    const off = fleches ? 1 : 0;
    const words = runs.map(run => {
      const word = run.cells.map(i => digit[i]).join('');
      const w = { r: run.r + off, c: run.c + off, dir: run.dir, len: run.cells.length, word, arrow: run.dir === 'H' ? 'right' : 'down', clue: formula(Number(word), rnd, opts.level) };
      return fleches ? { ...w, sr: run.dir === 'H' ? w.r : w.r - 1, sc: run.dir === 'H' ? w.c - 1 : w.c } : { ...w, sr: w.r, sc: w.c };
    });
    // Fléchés : une ligne et une colonne de cases définitions en plus, en haut et à gauche
    const out = fleches ? ['#'.repeat(W + 1), ...rows.map(r => `#${r}`)] : rows;
    return { kind: 'nombres', variant: fleches ? 'fleches' : 'croises', w: W + off, h: H + off, rows: out, words };
  }

  return { sudoku, wordoku, calcudoku, futoshiki, kakuro, nombres, formula, runsOf, boxRegions };
})();
