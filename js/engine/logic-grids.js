// @ts-check
/* =========================================================================
   Registre des jeux « logique » ajoutés en version 6 (MF.logicGames) et
   premiers jeux de chiffres : gratte-ciel, binairo, suguru, numbrix / hidato.

   Chaque jeu du registre se décrit entièrement ici (pas de test sur son
   identifiant ailleurs dans le moteur) :
     defaults               réglages par défaut (MF.logic.DEFAULTS)
     usesPage               la grille prend les proportions de la page
     generate(o, rnd, W)    page à solution unique (o : réglages, W : mots choisis)
     sanitize(p, out)       page venue de l'extérieur vérifiée (null si refusée)
     model(page, ctx)       modèle de dessin (ctx : { lang, puzzle, layout, kit })
   ========================================================================= */
window.MF = window.MF || {};

MF.logicGames = MF.logicGames || {};

/** Outils communs aux jeux du registre. */
MF.logicKit = (() => {
  const { shuffle, clamp } = MF.util;
  const pick = (list, rnd) => list[Math.floor(rnd() * list.length)];
  /** @type {(vals: ArrayLike<any>, w: number, h: number, fn?: (v: any) => string) => string[]} */
  const toRows = (vals, w, h, fn = String) => Array.from({ length: h }, (_, r) => Array.from({ length: w }, (_, c) => fn(vals[r * w + c])).join(''));
  const givenRows = (given, w, h) => toRows(given, w, h, v => (v ? '1' : '0'));
  const flat = rows => rows.join('');
  /** Voisins d'une case : 4 (côtés) ou 8 (côtés et coins). */
  function neighbors(i, w, h, diag = false) {
    const r = Math.floor(i / w), c = i % w, out = [];
    for (let dr = -1; dr <= 1; dr++) {
      for (let dc = -1; dc <= 1; dc++) {
        if ((!dr && !dc) || (!diag && dr && dc)) continue;
        const rr = r + dr, cc = c + dc;
        if (rr >= 0 && rr < h && cc >= 0 && cc < w) out.push(rr * w + cc);
      }
    }
    return out;
  }
  /** Les cases `on` (tableau de booléens) forment-elles une seule zone (voisins par les côtés) ? */
  function connected(on, w, h) {
    const start = on.findIndex(Boolean);
    if (start < 0) return true;
    const seen = new Uint8Array(w * h);
    seen[start] = 1;
    const stack = [start];
    let n = 1;
    while (stack.length) {
      for (const q of neighbors(stack.pop(), w, h)) if (on[q] && !seen[q]) { seen[q] = 1; n++; stack.push(q); }
    }
    return n === on.filter(Boolean).length;
  }
  /**
   * Retire des cases données tant que la solution reste unique.
   * @param {number} N  nombre de cases
   * @param {(fixed: boolean[]) => boolean} unique  la grille avec ces cases données a-t-elle une seule solution ?
   * @param {number} keep  part des cases à garder au moins (0 : le moins possible)
   * @param {boolean[]} [start]  cases données au départ (toutes par défaut)
   */
  function dig(N, unique, keep, rnd, start = null, budgetMs = 1500) {
    const given = start ? start.slice() : new Array(N).fill(true);
    const t0 = Date.now();
    let left = given.filter(Boolean).length;
    const min = Math.round(N * keep);
    for (const i of shuffle([...Array(N).keys()], rnd)) {
      if (left <= min || Date.now() - t0 > budgetMs) break;
      if (!given[i]) continue;
      given[i] = false;
      if (unique(given)) left--; else given[i] = true;
    }
    return given;
  }
  // Régions : jusqu'à 62 zones (A…Z, a…z, 0…9)
  const REG = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const regionRows = (owner, w, h) => toRows(owner, w, h, v => REG[v]);
  const regionsOf = rows => [...flat(rows)].map(ch => REG.indexOf(ch));
  /** Découpe la grille en zones connexes de tailles tirées dans `sizes` (liste pondérée). */
  function partition(w, h, rnd, sizes, diag = false) {
    const owner = new Int16Array(w * h).fill(-1);
    let id = 0;
    for (const s of shuffle([...Array(w * h).keys()], rnd)) {
      if (owner[s] >= 0) continue;
      const want = pick(sizes, rnd);
      const cells = [s];
      owner[s] = id;
      while (cells.length < want) {
        const front = cells.flatMap(i => neighbors(i, w, h, diag)).filter(q => owner[q] < 0);
        if (!front.length) break;
        const q = pick(front, rnd);
        owner[q] = id;
        cells.push(q);
      }
      id++;
    }
    return Array.from(owner);
  }
  /** Zones renumérotées dans l'ordre de lecture (0, 1, 2…). */
  function renumber(owner) {
    const map = new Map();
    return owner.map(v => { if (!map.has(v)) map.set(v, map.size); return map.get(v); });
  }

  /* ---------------- Vérification des pages venues de l'extérieur ---------------- */
  const int = (v, min, max) => (Number.isInteger(v) && v >= min && v <= max ? v : null);
  const grid = (rows, w, h, re) => Array.isArray(rows) && rows.length === h && rows.every(r => typeof r === 'string' && r.length === w && re.test(r));
  const text = (v, max) => (typeof v === 'string' ? MF.util.cleanText(v, max) : '');
  const givenOr = (g, w, h) => (grid(g, w, h, /^[01]+$/) ? g.slice() : Array(h).fill('0'.repeat(w)));
  const isObj = v => !!v && typeof v === 'object' && !Array.isArray(v);

  /** Nombre de cases à 1 parmi `cells`, pour le solveur à valeurs 0 / 1 (MF.solver). */
  const binary = (size, extra) => ({ size, values: 3, ...extra });

  return { pick, shuffle, clamp, toRows, givenRows, flat, neighbors, connected, dig, REG, regionRows, regionsOf, partition, renumber, int, grid, text, givenOr, isObj, binary };
})();

/* =======================================================================
   Gratte-ciel : carré latin, chaque nombre au bord dit combien d'immeubles
   on voit depuis là (un immeuble plus haut cache ceux qui sont derrière).
   ======================================================================= */
(() => {
  const K = MF.logicKit;
  const S = () => MF.solver;
  const SIDES = ['t', 'b', 'l', 'r'];
  /** Cases d'une ligne de vue, depuis le bord. */
  const sight = (side, i, n) => Array.from({ length: n }, (_, k) => ({ t: k * n + i, b: (n - 1 - k) * n + i, l: i * n + k, r: i * n + (n - 1 - k) }[side]));
  const visible = vals => { let top = 0, k = 0; for (const v of vals) if (v > top) { top = v; k++; } return k; };
  const permCache = new Map();
  /** Permutations de 1…n rangées par nombre d'immeubles visibles. */
  function byVis(n) {
    if (permCache.has(n)) return permCache.get(n);
    const out = Array.from({ length: n + 1 }, () => []);
    const rec = (cur, used) => {
      if (cur.length === n) { out[visible(cur)].push(cur.slice()); return; }
      for (let v = 1; v <= n; v++) if (!(used & (1 << v))) { cur.push(v); rec(cur, used | (1 << v)); cur.pop(); }
    };
    rec([], 0);
    permCache.set(n, out);
    return out;
  }

  function generate(o, rnd) {
    const n = K.clamp(o.size || 5, 4, 7);
    const latin = { size: n * n, values: S().range(n), full: S().latinGroups(n) };
    const sol = S().solve(latin, { limit: 1, rnd }).solution;
    const P = byVis(n);
    /** @type {{ side: string, i: number, k: number, cells: number[] }[]} */
    const all = [];
    for (const side of SIDES) for (let i = 0; i < n; i++) { const cells = sight(side, i, n); all.push({ side, i, k: visible(cells.map(c => sol[c])), cells }); }
    const solveWith = (clues, given) => S().solve({
      ...latin, tuples: clues.map(cl => ({ cells: cl.cells, list: P[cl.k] })),
      fixed: Object.fromEntries(given.map((g, i) => [i, g ? sol[i] : -1]).filter(([, v]) => v > 0)),
    }, { limit: 2, maxNodes: n >= 7 ? 6000 : 30000 });
    const given = new Array(n * n).fill(false);
    let clues = all;
    // Toutes les vues ne suffisent pas toujours : une case qui diffère est donnée
    for (let guard = 0; guard < n * n; guard++) {
      const res = solveWith(clues, given);
      if (res.count === 1 && !res.aborted) break;
      const diff = res.second ? res.solution.map((v, i) => (v !== res.second[i] ? i : -1)).filter(i => i >= 0) : [Math.floor(rnd() * n * n)];
      given[K.pick(diff, rnd)] = true;
    }
    const removable = { easy: 0.35, medium: 0.7, hard: 1, expert: 1 }[o.level] ?? 0.7;
    let tries = Math.round(clues.length * removable);
    const t0 = Date.now();
    for (const cl of K.shuffle(clues, rnd)) {
      if (tries-- <= 0 || Date.now() - t0 > 2500) break;
      const next = clues.filter(x => x !== cl);
      const res = solveWith(next, given);
      if (res.count === 1 && !res.aborted) clues = next;
    }
    // Expert : on essaie aussi de retirer les cases données
    if (o.level === 'expert') for (let i = 0; i < n * n; i++) if (given[i]) { given[i] = false; const res = solveWith(clues, given); if (res.count !== 1 || res.aborted) given[i] = true; }
    if (o.level === 'easy') for (const i of K.shuffle([...Array(n * n).keys()], rnd).slice(0, Math.ceil(n / 2))) given[i] = true;
    const side = s => Array.from({ length: n }, (_, i) => String(clues.find(cl => cl.side === s && cl.i === i)?.k || 0)).join('');
    return { kind: 'gratte', n, rows: K.toRows(sol, n, n), given: K.givenRows(given, n, n), clues: Object.fromEntries(SIDES.map(s => [s, side(s)])) };
  }

  function sanitize(p, out) {
    const n = K.int(p.n, 3, 7);
    if (!n || !K.grid(p.rows, n, n, new RegExp(`^[1-${n}]+$`)) || !K.isObj(p.clues)) return null;
    const clues = {};
    for (const s of SIDES) { const v = p.clues[s]; if (typeof v !== 'string' || v.length !== n || !new RegExp(`^[0-${n}]+$`).test(v)) return null; clues[s] = v; }
    return Object.assign(out, { n, rows: p.rows.slice(), given: K.givenOr(p.given, n, n), clues });
  }

  function model(page, { kit }) {
    const { n, rows, clues } = page;
    const m = kit.base('gratte', n + 2, n + 2, { digits: true, shape: 'free' });
    const hint = v => (v && v !== '0' ? { type: 'hint', text: v } : { type: 'out' });
    m.cells = kit.grid(n + 2, n + 2, (r, c) => {
      const inR = r >= 1 && r <= n, inC = c >= 1 && c <= n;
      if (inR && inC) return kit.letter(rows[r - 1][c - 1], { given: page.given[r - 1][c - 1] === '1' });
      if (inC && r === 0) return hint(clues.t[c - 1]);
      if (inC && r === n + 1) return hint(clues.b[c - 1]);
      if (inR && c === 0) return hint(clues.l[r - 1]);
      if (inR && c === n + 1) return hint(clues.r[r - 1]);
      return { type: 'out' };
    });
    kit.lineSlots(m, n, n, n, 1, 1);
    m.walls.push({ x1: 1, y1: 1, x2: n + 1, y2: 1 }, { x1: 1, y1: n + 1, x2: n + 1, y2: n + 1 }, { x1: 1, y1: 1, x2: 1, y2: n + 1 }, { x1: n + 1, y1: 1, x2: n + 1, y2: n + 1 });
    return m;
  }

  MF.logicGames.gratte = { defaults: { size: 5 }, generate, sanitize, model, visible, byVis, sight };
})();

/* =======================================================================
   Binairo (takuzu) : des 0 et des 1, autant de chaque par ligne et par
   colonne, jamais trois pareils à la suite, deux lignes jamais identiques.
   ======================================================================= */
(() => {
  const K = MF.logicKit;
  const S = () => MF.solver;

  function problem(n) {
    const counts = [];
    for (let i = 0; i < n; i++) {
      const row = Array.from({ length: n }, (_, j) => i * n + j), col = Array.from({ length: n }, (_, j) => j * n + i);
      counts.push({ cells: row, min: n / 2, max: n / 2 }, { cells: col, min: n / 2, max: n / 2 });
      for (let j = 0; j + 2 < n; j++) {
        counts.push({ cells: row.slice(j, j + 3), min: 1, max: 2 }, { cells: col.slice(j, j + 3), min: 1, max: 2 });
      }
    }
    // Deux lignes (ou deux colonnes) jamais identiques
    const accept = sol => {
      const rows = new Set(), cols = new Set();
      for (let i = 0; i < n; i++) {
        rows.add(sol.slice(i * n, i * n + n).join(''));
        cols.add(Array.from({ length: n }, (_, j) => sol[j * n + i]).join(''));
      }
      return rows.size === n && cols.size === n;
    };
    return K.binary(n * n, { counts, accept });
  }

  function generate(o, rnd) {
    const n = [6, 8, 10, 12].includes(o.size) ? o.size : 8;
    const base = problem(n);
    const sol = S().solve(base, { limit: 1, rnd, maxNodes: 200000 }).solution;
    if (!sol) throw new Error('binairo');
    const unique = given => {
      const fixed = {};
      given.forEach((g, i) => { if (g) fixed[i] = sol[i]; });
      const r = S().solve({ ...base, fixed }, { limit: 2, maxNodes: 20000 });
      return r.count === 1 && !r.aborted;
    };
    const keep = { easy: 0.45, medium: 0.36, hard: 0.28, expert: 0 }[o.level] ?? 0.36;
    const given = K.dig(n * n, unique, keep, rnd, null, 2500);
    return { kind: 'binairo', n, rows: K.toRows(sol, n, n), given: K.givenRows(given, n, n) };
  }

  function sanitize(p, out) {
    const n = [4, 6, 8, 10, 12, 14].includes(p.n) ? p.n : 0;
    if (!n || !K.grid(p.rows, n, n, /^[01]+$/)) return null;
    return Object.assign(out, { n, rows: p.rows.slice(), given: K.givenOr(p.given, n, n) });
  }

  function model(page, { kit }) {
    const { n, rows } = page;
    const m = kit.base('binairo', n, n, { toggle: 'binary' });
    m.cells = kit.grid(n, n, (r, c) => kit.letter(rows[r][c], { mark: 'binary', given: page.given[r][c] === '1' }));
    return m;
  }

  MF.logicGames.binairo = { defaults: { size: 8 }, generate, sanitize, model, problem };
})();

/* =======================================================================
   Suguru (tectonic) : chaque zone de k cases contient 1…k ; deux cases
   voisines (même par un coin) n'ont jamais le même chiffre.
   ======================================================================= */
(() => {
  const K = MF.logicKit;
  const S = () => MF.solver;

  function problem(owner, w, h) {
    const sizes = new Map();
    owner.forEach(v => sizes.set(v, (sizes.get(v) || 0) + 1));
    const groups = [...sizes.keys()].map(id => owner.map((v, i) => (v === id ? i : -1)).filter(i => i >= 0));
    for (let i = 0; i < w * h; i++) for (const q of K.neighbors(i, w, h, true)) if (q > i) groups.push([i, q]);
    const domains = Object.fromEntries(owner.map((v, i) => [i, S().range(sizes.get(v))]));
    return { size: w * h, values: S().range(5), groups, domains };
  }

  /**
   * Zones et chiffres construits ensemble, case par case dans l'ordre de lecture (avec retours en arrière) :
   * chaque case ouvre une zone ou rejoint une zone voisine, avec un chiffre absent de la zone et de ses
   * voisines déjà posées. Une zone qui ne peut plus grandir doit contenir exactement 1…k.
   * `join` : envie de rejoindre une zone plutôt que d'en ouvrir une (zones plus grandes).
   */
  function layout(w, h, rnd, join = 0.8, maxNodes = 20000) {
    const N = w * h;
    const V = new Int8Array(N), owner = new Int16Array(N).fill(-1);
    const regs = []; // { cells: number[], mask: number }
    const before = Array.from({ length: N }, (_, i) => K.neighbors(i, w, h, true).filter(q => q < i));
    const side = Array.from({ length: N }, (_, i) => K.neighbors(i, w, h));
    // Une zone est close quand aucune de ses cases n'a de voisine encore libre (après la case i)
    const closed = (reg, i) => reg.cells.every(c => side[c].every(q => q <= i));
    const complete = reg => reg.mask === ((1 << (reg.cells.length + 1)) - 2);
    let nodes = 0;
    const rec = i => {
      if (i === N) return regs.every(complete);
      if (++nodes > maxNodes) return false;
      const near = before[i].map(q => V[q]);
      const opts = [];
      for (const id of new Set(side[i].filter(q => q < i).map(q => owner[q]))) {
        const reg = regs[id];
        if (reg.cells.length < 5) for (let v = 1; v <= 5; v++) if (!(reg.mask & (1 << v)) && !near.includes(v)) opts.push({ id, v, k: rnd() * join + (v <= reg.cells.length + 1 ? 0.2 : 0) });
      }
      for (let v = 1; v <= 5; v++) if (!near.includes(v)) opts.push({ id: -1, v, k: rnd() * (1 - join) + (v === 1 ? 0.3 : 0) });
      opts.sort((x, y) => y.k - x.k);
      for (const { id, v } of opts) {
        let reg = id >= 0 ? regs[id] : null;
        if (!reg) { reg = { cells: [], mask: 0 }; regs.push(reg); }
        const rid = id >= 0 ? id : regs.length - 1;
        reg.cells.push(i); reg.mask |= 1 << v; owner[i] = rid; V[i] = v;
        // Zones voisines qui se ferment maintenant : 1…k exactement
        const touched = new Set([rid, ...side[i].filter(q => q < i).map(q => owner[q])]);
        const ok = [...touched].every(t => !closed(regs[t], i) || complete(regs[t]));
        if (ok && rec(i + 1)) return true;
        reg.cells.pop(); reg.mask &= ~(1 << v); owner[i] = -1; V[i] = 0;
        if (id < 0) regs.pop();
        if (nodes > maxNodes) return false;
      }
      return false;
    };
    return rec(0) ? { V: Array.from(V), owner: K.renumber(Array.from(owner)) } : null;
  }

  function generate(o, rnd) {
    const n = K.clamp(o.size || 6, 4, 10);
    const w = n, h = n;
    const join = { easy: 0.7, medium: 0.8, hard: 0.85, expert: 0.9 }[o.level] || 0.8;
    // Le moins possible de zones d'une case : plusieurs essais, on garde le meilleur
    let best = null;
    const t0 = Date.now();
    for (let attempt = 0; attempt < 200 && Date.now() - t0 < 1500; attempt++) {
      const L = layout(w, h, rnd, join);
      if (!L) continue;
      const count = new Map();
      L.owner.forEach(v => count.set(v, (count.get(v) || 0) + 1));
      const small = [...count.values()].filter(x => x <= 2).length;
      if (!best || small < best.small) best = { ...L, small };
      if (small <= n / 3) break;
    }
    if (!best) throw new Error('suguru');
    const { V, owner } = best;
    const sol = V;
    const base = problem(owner, w, h);
    const unique = given => {
      const fixed = {};
      given.forEach((g, i) => { if (g) fixed[i] = sol[i]; });
      const r = S().solve({ ...base, fixed }, { limit: 2, maxNodes: 20000 });
      return r.count === 1 && !r.aborted;
    };
    const keep = { easy: 0.42, medium: 0.32, hard: 0.24, expert: 0 }[o.level] ?? 0.32;
    const given = K.dig(w * h, unique, keep, rnd, null, 2500);
    return { kind: 'suguru', w, h, rows: K.toRows(sol, w, h), given: K.givenRows(given, w, h), regions: K.regionRows(owner, w, h) };
  }

  function sanitize(p, out) {
    const w = K.int(p.w, 3, 12), h = K.int(p.h, 3, 12);
    if (!w || !h || !K.grid(p.rows, w, h, /^[1-5]+$/) || !K.grid(p.regions, w, h, /^[A-Za-z0-9]+$/)) return null;
    return Object.assign(out, { w, h, rows: p.rows.slice(), given: K.givenOr(p.given, w, h), regions: p.regions.slice() });
  }

  function model(page, { kit }) {
    const { w, h, rows } = page;
    const m = kit.base('suguru', w, h, { digits: true });
    m.cells = kit.grid(h, w, (r, c) => kit.letter(rows[r][c], { given: page.given[r][c] === '1' }));
    kit.lineSlots(m, 0, w, h);
    m.walls = kit.wallsOf(K.regionsOf(page.regions), 0, w, h);
    return m;
  }

  MF.logicGames.suguru = { defaults: { size: 6 }, generate, sanitize, model, problem, layout };
})();

/* =======================================================================
   Numbrix / Hidato : relier 1, 2, 3… jusqu'au dernier nombre, chaque
   nombre touche le suivant (par un côté ; aussi par un coin pour l'hidato).
   ======================================================================= */
(() => {
  const K = MF.logicKit;

  /** Chemin passant une fois par chaque case (mouvements « backbite » depuis un serpentin). */
  function randomPath(w, h, diag, rnd) {
    let path = [];
    for (let r = 0; r < h; r++) for (let c = 0; c < w; c++) path.push(r * w + (r % 2 ? w - 1 - c : c));
    for (let t = 0; t < w * h * 30; t++) {
      if (rnd() < 0.5) path.reverse();
      const end = path[0];
      const nb = K.neighbors(end, w, h, diag).filter(q => q !== path[1]);
      const v = K.pick(nb, rnd);
      const i = path.indexOf(v);
      path = [...path.slice(0, i).reverse(), ...path.slice(i)];
    }
    return path;
  }

  const dist = (a, b, w, diag) => {
    const dr = Math.abs(Math.floor(a / w) - Math.floor(b / w)), dc = Math.abs((a % w) - (b % w));
    return diag ? Math.max(dr, dc) : dr + dc;
  };

  /**
   * Nombre de chemins (jusqu'à `limit`) qui respectent les nombres donnés.
   * @param {number[]} vals  valeur de chaque case donnée, 0 sinon
   */
  function count(vals, w, h, diag, { limit = 2, maxNodes = 40000 } = {}) {
    const N = w * h;
    const at = new Int16Array(N + 2).fill(-1);
    vals.forEach((v, i) => { if (v) at[v] = i; });
    const nextGiven = new Int16Array(N + 2).fill(0);
    for (let v = N, g = 0; v >= 1; v--) { nextGiven[v] = g; if (at[v] >= 0) g = v; }
    const used = new Uint8Array(N);
    vals.forEach((v, i) => { if (v) used[i] = 2; });
    let found = 0, nodes = 0;
    const nb = Array.from({ length: N }, (_, i) => K.neighbors(i, w, h, diag));
    const ok = (cell, v) => {
      const g = nextGiven[v];
      if (!g) return true;
      const d = dist(cell, at[g], w, diag);
      return d <= g - v && (diag || (g - v - d) % 2 === 0);
    };
    const rec = (cell, v) => {
      if (found >= limit || nodes > maxNodes) return;
      nodes++;
      if (v === N) { found++; return; }
      const nv = v + 1;
      if (at[nv] >= 0) { if (nb[cell].includes(at[nv])) rec(at[nv], nv); return; }
      for (const q of nb[cell]) {
        if (used[q] || !ok(q, nv)) continue;
        used[q] = 1;
        rec(q, nv);
        used[q] = 0;
        if (found >= limit) return;
      }
    };
    if (at[1] >= 0) rec(at[1], 1);
    else {
      for (let s = 0; s < N && found < limit; s++) {
        if (used[s] || !ok(s, 1)) continue;
        used[s] = 1;
        rec(s, 1);
        used[s] = 0;
      }
    }
    return { count: found, aborted: nodes > maxNodes };
  }

  function generate(o, rnd) {
    const n = K.clamp(o.size || 7, 4, 9);
    const w = n, h = n, N = w * h;
    const diag = o.variant === 'hidato';
    const path = randomPath(w, h, diag, rnd);
    const vals = new Array(N);
    path.forEach((cell, i) => { vals[cell] = i + 1; });
    const unique = given => {
      const r = count(vals.map((v, i) => (given[i] ? v : 0)), w, h, diag, { maxNodes: 25000 });
      return r.count === 1 && !r.aborted;
    };
    const keep = { easy: 0.5, medium: 0.36, hard: 0.26, expert: 0.12 }[o.level] ?? 0.36;
    // Départ : un nombre sur deux le long du chemin (plus rapide que toute la grille)
    const start = path.reduce((g, cell, i) => { g[cell] = i % 2 === 0 || i === N - 1; return g; }, new Array(N).fill(false));
    const given = K.dig(N, unique, keep, rnd, unique(start) ? start : null, 2500);
    return { kind: 'numbrix', variant: diag ? 'hidato' : 'numbrix', w, h, vals, given: K.givenRows(given, w, h) };
  }

  function sanitize(p, out) {
    const w = K.int(p.w, 3, 12), h = K.int(p.h, 3, 12);
    if (!w || !h || !Array.isArray(p.vals) || p.vals.length !== w * h) return null;
    const N = w * h;
    if (!p.vals.every(v => K.int(v, 1, N) !== null) || new Set(p.vals).size !== N) return null;
    const diag = p.variant === 'hidato';
    const where = new Array(N + 1);
    p.vals.forEach((v, i) => { where[v] = i; });
    for (let v = 1; v < N; v++) if (!K.neighbors(where[v], w, h, diag).includes(where[v + 1])) return null;
    return Object.assign(out, { variant: diag ? 'hidato' : 'numbrix', w, h, vals: p.vals.slice(), given: K.givenOr(p.given, w, h) });
  }

  function model(page, { kit }) {
    const { w, h, vals } = page;
    const m = kit.base('numbrix', w, h, { digits: true, maxLen: String(w * h).length });
    m.cells = kit.grid(h, w, (r, c) => kit.letter(String(vals[r * w + c]), { given: page.given[r][c] === '1' }));
    kit.lineSlots(m, 0, w, h);
    return m;
  }

  MF.logicGames.numbrix = { defaults: { size: 7, variant: 'numbrix' }, generate, sanitize, model, count, randomPath };
})();
