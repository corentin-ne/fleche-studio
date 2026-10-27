// @ts-check
/* =========================================================================
   Solveurs des jeux de logique (utilisés pour CRÉER des énigmes à solution
   unique, dans le worker de calcul) :
     - contraintes sur des cases à valeurs 1…9 : groupes « toutes différentes »
       (lignes, colonnes, régions, suites), sommes (kakuro), n-uplets permis
       (cages du calcudoku), inégalités (futoshiki) ;
     - lignes de picross (quelles cases sont forcément pleines ou vides).
   Les domaines sont des masques de bits (bit v = valeur v possible).
   ========================================================================= */
window.MF = window.MF || {};

MF.solver = (() => {
  const popcount = m => { let n = 0; while (m) { m &= m - 1; n++; } return n; };
  const low = m => 31 - Math.clz32(m & -m);
  const high = m => 31 - Math.clz32(m);
  const bitsOf = m => { const out = []; for (let v = 0; m; v++, m >>>= 1) if (m & 1) out.push(v); return out; };
  const single = m => m && !(m & (m - 1));

  /**
   * Prépare un problème :
   * @param {{ size: number, values: number, groups?: number[][], full?: number[][], sums?: { cells: number[], combos: number[] }[],
   *   tuples?: { cells: number[], list: number[][] }[], less?: number[][], fixed?: Record<number, number> }} p
   *   values : masque des valeurs possibles ; full : groupes qui contiennent chaque valeur exactement une fois
   */
  function compile(p) {
    const n = p.size;
    const groups = [...(p.groups || []), ...(p.full || [])];
    const peerSets = Array.from({ length: n }, () => new Set());
    for (const g of groups) for (const a of g) for (const b of g) if (a !== b) peerSets[a].add(b);
    return {
      n, values: p.values,
      peers: peerSets.map(s => [...s]),
      full: p.full || [],
      sums: (p.sums || []).map(s => ({ cells: s.cells, combos: s.combos, set: new Set(s.combos) })),
      tuples: p.tuples || [],
      less: p.less || [],
      fixed: p.fixed || {},
    };
  }

  /** Réduit les domaines jusqu'à stabilité ; false en cas de contradiction. */
  function propagate(dom, P) {
    const n = P.n;
    let changed = true;
    while (changed) {
      changed = false;
      for (let c = 0; c < n; c++) {
        const m = dom[c];
        if (!m) return false;
        if (single(m)) {
          for (const q of P.peers[c]) {
            if (dom[q] & m) { dom[q] &= ~m; if (!dom[q]) return false; changed = true; }
          }
        }
      }
      // Valeur possible dans une seule case d'un groupe complet : elle y va
      for (const g of P.full) {
        for (let rest = P.values; rest; rest &= rest - 1) {
          const b = rest & -rest;
          let at = -1, k = 0;
          for (const c of g) if (dom[c] & b) { k++; at = c; if (k > 1) break; }
          if (!k) return false;
          if (k === 1 && dom[at] !== b) { dom[at] = b; changed = true; }
        }
      }
      for (const [a, b] of P.less) {
        const below = (1 << high(dom[b])) - 1;
        if (dom[a] & ~below) { dom[a] &= below; if (!dom[a]) return false; changed = true; }
        const above = ~((2 << low(dom[a])) - 1);
        if (dom[b] & ~above) { dom[b] &= above; if (!dom[b]) return false; changed = true; }
      }
      for (const s of P.sums) {
        let fixed = 0, free = 0;
        for (const c of s.cells) { if (single(dom[c])) fixed |= dom[c]; else free++; }
        if (!free) { if (!s.set.has(fixed)) return false; continue; }
        let union = 0;
        for (const m of s.combos) {
          if ((m & fixed) !== fixed) continue;
          const rest = m & ~fixed;
          let ok = true;
          for (const c of s.cells) if (!single(dom[c]) && !(dom[c] & rest)) { ok = false; break; }
          if (ok) union |= rest;
        }
        if (!union) return false;
        for (const c of s.cells) {
          if (single(dom[c])) continue;
          const m = dom[c] & union;
          if (m !== dom[c]) { dom[c] = m; if (!m) return false; changed = true; }
        }
      }
      for (const t of P.tuples) {
        const keep = new Array(t.cells.length).fill(0);
        let any = false;
        for (const tu of t.list) {
          let ok = true;
          for (let i = 0; i < tu.length; i++) if (!(dom[t.cells[i]] & (1 << tu[i]))) { ok = false; break; }
          if (!ok) continue;
          any = true;
          for (let i = 0; i < tu.length; i++) keep[i] |= 1 << tu[i];
        }
        if (!any) return false;
        t.cells.forEach((c, i) => { const m = dom[c] & keep[i]; if (m !== dom[c]) { dom[c] = m; changed = true; } });
      }
    }
    return true;
  }

  /**
   * Compte les solutions (jusqu'à `limit`). `rnd` : ordre des valeurs au hasard (pour tirer une solution).
   * @returns {{ count: number, solution: number[] | null, second: number[] | null, aborted: boolean }}
   */
  function solve(p, { limit = 2, rnd = null, maxNodes = 60000 } = {}) {
    const P = compile(p);
    const dom = new Int32Array(P.n).fill(P.values);
    for (const [c, v] of Object.entries(P.fixed)) dom[+c] = 1 << v;
    let found = 0, nodes = 0;
    /** @type {number[] | null} */ let first = null;
    /** @type {number[] | null} */ let second = null;
    const rec = d => {
      if (found >= limit || nodes > maxNodes) return;
      nodes++;
      if (!propagate(d, P)) return;
      let best = -1, bs = 99;
      for (let c = 0; c < P.n; c++) {
        const k = popcount(d[c]);
        if (k > 1 && k < bs) { bs = k; best = c; if (k === 2) break; }
      }
      if (best < 0) {
        found++;
        const sol = Array.from(d, low);
        if (!first) first = sol; else if (!second) second = sol;
        return;
      }
      let vals = bitsOf(d[best]);
      if (rnd) vals = MF.util.shuffle(vals, rnd);
      for (const v of vals) {
        const next = d.slice();
        next[best] = 1 << v;
        rec(next);
        if (found >= limit) return;
      }
    };
    rec(dom);
    return { count: found, solution: first, second, aborted: nodes > maxNodes };
  }

  /** Masque des valeurs 1…n. */
  const range = n => ((1 << (n + 1)) - 1) & ~1;

  /** Groupes d'un carré latin n × n : lignes puis colonnes (indices de cases r * n + c). */
  function latinGroups(n) {
    const rows = [], cols = [];
    for (let i = 0; i < n; i++) {
      rows.push(Array.from({ length: n }, (_, j) => i * n + j));
      cols.push(Array.from({ length: n }, (_, j) => j * n + i));
    }
    return [...rows, ...cols];
  }

  /** Toutes les combinaisons de k chiffres distincts (1…9) de somme s, en masques. */
  const comboCache = new Map();
  function combos(k, s) {
    const key = `${k},${s}`;
    if (comboCache.has(key)) return comboCache.get(key);
    const out = [];
    for (let m = 0; m < 512; m++) {
      if (popcount(m) !== k) continue;
      let sum = 0;
      for (let v = 1; v <= 9; v++) if (m & (1 << (v - 1))) sum += v;
      if (sum === s) out.push(m << 1);
    }
    comboCache.set(key, out);
    return out;
  }

  /* ---------------- Picross : résolution ligne par ligne ---------------- */
  /**
   * Cases déduites d'une ligne : -1 inconnue, 0 vide, 1 pleine. Renvoie la ligne complétée, ou null (impossible).
   * @param {number[]} lens  longueurs des blocs
   * @param {Int8Array | number[]} line
   */
  function line(lens, line) {
    const n = line.length, k = lens.length;
    const memo = new Int8Array((n + 1) * (k + 1)).fill(-1);
    const fits = (i, L) => {
      if (i + L > n) return false;
      for (let x = i; x < i + L; x++) if (line[x] === 0) return false;
      return i + L === n || line[i + L] !== 1;
    };
    const F = (i, j) => {
      const key = i * (k + 1) + j;
      if (memo[key] >= 0) return memo[key] === 1;
      let ok = false;
      if (j === k) { ok = true; for (let x = i; x < n; x++) if (line[x] === 1) { ok = false; break; } }
      else {
        if (i < n && line[i] !== 1 && F(i + 1, j)) ok = true;
        if (!ok && fits(i, lens[j])) ok = F(Math.min(n, i + lens[j] + 1), j + 1);
      }
      memo[key] = ok ? 1 : 0;
      return ok;
    };
    if (!F(0, 0)) return null;
    const can0 = new Uint8Array(n), can1 = new Uint8Array(n);
    const seen = new Uint8Array((n + 1) * (k + 1));
    const stack = [[0, 0]];
    while (stack.length) {
      const [i, j] = stack.pop();
      const key = i * (k + 1) + j;
      if (seen[key]) continue;
      seen[key] = 1;
      if (j === k) { for (let x = i; x < n; x++) can0[x] = 1; continue; }
      if (i < n && line[i] !== 1 && F(i + 1, j)) { can0[i] = 1; stack.push([i + 1, j]); }
      const L = lens[j];
      if (fits(i, L) && F(Math.min(n, i + L + 1), j + 1)) {
        for (let x = i; x < i + L; x++) can1[x] = 1;
        if (i + L < n) can0[i + L] = 1;
        stack.push([Math.min(n, i + L + 1), j + 1]);
      }
    }
    return Int8Array.from(line, (v, x) => (can0[x] && can1[x] ? -1 : can1[x] ? 1 : 0));
  }

  /** Blocs d'une ligne pleine/vide (« 0110111 » -> [2, 3]). */
  function runs(cells) {
    const out = [];
    let len = 0;
    for (const v of cells) { if (v === 1) len++; else if (len) { out.push(len); len = 0; } }
    if (len) out.push(len);
    return out;
  }

  /**
   * Résout un picross par déduction ligne à ligne, à partir de cases connues (-1 sinon).
   * Renvoie la grille déduite (Int8Array, -1 pour les cases indécises) ou null si contradiction.
   */
  function picross(rowClues, colClues, known) {
    const H = rowClues.length, W = colClues.length;
    const g = Int8Array.from(known);
    let changed = true;
    while (changed) {
      changed = false;
      for (let r = 0; r < H; r++) {
        const res = line(rowClues[r], g.subarray(r * W, r * W + W));
        if (!res) return null;
        for (let c = 0; c < W; c++) if (res[c] !== g[r * W + c]) { g[r * W + c] = res[c]; changed = true; }
      }
      for (let c = 0; c < W; c++) {
        const col = Int8Array.from({ length: H }, (_, r) => g[r * W + c]);
        const res = line(colClues[c], col);
        if (!res) return null;
        for (let r = 0; r < H; r++) if (res[r] !== col[r]) { g[r * W + c] = res[r]; changed = true; }
      }
    }
    return g;
  }

  return { solve, range, latinGroups, combos, line, runs, picross, popcount, bitsOf };
})();
