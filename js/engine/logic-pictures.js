// @ts-check
/* =========================================================================
   Picross et logigramme (moteur « logique »).

   Picross : le dessin (0/1) est préparé dans la page à partir d'un emoji,
   d'une forme, d'un texte ou d'une photo (MF.logicInput), puis on vérifie
   qu'il se résout ligne à ligne. Sinon, quelques cases sont données au départ
   jusqu'à ce qu'il n'y ait plus aucune ambiguïté.

   Logigramme : K catégories de M éléments (suspects, lieux, objets, heures),
   préparées dans la page à partir d'un univers. Une solution est tirée, puis
   des indices vrais sont ajoutés jusqu'à ce qu'elle soit unique, et les
   indices superflus retirés. Les indices sont des données (texte écrit par
   MF.logic dans la langue de la grille).
   ========================================================================= */
window.MF = window.MF || {};

MF.logicPictures = (() => {
  const { shuffle, clamp } = MF.util;
  const pick = (list, rnd) => list[Math.floor(rnd() * list.length)];

  /* ---------------- Picross ---------------- */
  function picross(opts, rnd) {
    let pic = opts.picture;
    const valid = p => p && p.rows?.length >= 3 && p.rows.some(r => r.includes('1')) && p.rows.some(r => r.includes('0'));
    if (!valid(pic)) {
      const n = clamp(opts.size || 15, 5, 30);
      const mask = MF.shapes.mask('heart', n, n, 0);
      pic = { rows: Array.from({ length: n }, (_, r) => Array.from({ length: n }, (_, c) => (mask[r * n + c] ? '1' : '0')).join('')) };
    }
    const H = pic.rows.length, W = pic.rows[0].length;
    const sol = Int8Array.from(pic.rows.join(''), ch => (ch === '1' ? 1 : 0));
    const rowClues = Array.from({ length: H }, (_, r) => MF.solver.runs(sol.subarray(r * W, r * W + W)));
    const colClues = Array.from({ length: W }, (_, c) => MF.solver.runs(Array.from({ length: H }, (_, r) => sol[r * W + c])));
    const known = new Int8Array(W * H).fill(-1);
    const given = new Array(W * H).fill(false);
    // Tant que la déduction ligne à ligne bloque : une case pleine encore indécise est donnée
    for (let guard = 0; guard < W * H; guard++) {
      const g = MF.solver.picross(rowClues, colClues, known);
      if (!g) break;
      const open = [...g.keys()].filter(i => g[i] < 0);
      if (!open.length) break;
      const full = open.filter(i => sol[i]);
      const i = pick(full.length ? full : open, rnd);
      given[i] = true;
      g.forEach((v, k) => { known[k] = v; });
      known[i] = sol[i];
    }
    return {
      kind: 'picross', w: W, h: H, rows: pic.rows.slice(),
      given: Array.from({ length: H }, (_, r) => given.slice(r * W, r * W + W).map(g => (g ? '1' : '0')).join('')),
    };
  }

  /* ---------------- Logigramme ---------------- */
  /** Toutes les permutations de 0…m-1. */
  function perms(m) {
    if (m === 1) return [[0]];
    return perms(m - 1).flatMap(p => Array.from({ length: m }, (_, i) => [...p.slice(0, i), m - 1, ...p.slice(i)]));
  }

  /**
   * Indices (données) : { t, a: [cat, item], b: [cat, item], c?: [cat, item] }
   *   is  : a et b vont ensemble ; not : a et b ne vont pas ensemble ;
   *   or  : a va avec b ou avec c (une seule des deux) ;
   *   before / next : la catégorie ordonnée (heures) de a est avant celle de b (juste avant pour next).
   */
  function solver(K, M, ordered) {
    const P = perms(M);
    // Groupe (indice dans la catégorie 0) d'un élément, selon l'affectation
    const group = (asg, [k, i]) => (k === 0 ? i : asg[k][i]);
    const time = (asg, g) => asg.order[ordered][g];
    function holds(c, asg) {
      const ga = group(asg, c.a), gb = group(asg, c.b);
      if (c.t === 'is') return ga === gb;
      if (c.t === 'not') return ga !== gb;
      if (c.t === 'or') { const gc = group(asg, c.c); return (ga === gb) !== (ga === gc); }
      const ta = time(asg, ga), tb = time(asg, gb);
      return c.t === 'before' ? ta < tb : tb === ta + 1;
    }
    const cats = c => [c.a[0], c.b[0], c.c?.[0] ?? 0, c.t === 'before' || c.t === 'next' ? ordered : 0];
    /** Nombre de solutions (jusqu'à `limit`). */
    function count(clues, limit = 2) {
      const at = Array.from({ length: K }, () => []);
      for (const c of clues) at[Math.max(...cats(c))].push(c);
      if (at[0].length) return 0;
      // asg[k][i] : groupe de l'élément i de la catégorie k ; asg.order[k][g] : élément de k du groupe g
      const asg = /** @type {any} */ (Array.from({ length: K }, () => null));
      asg.order = Array.from({ length: K }, () => null);
      let found = 0;
      const rec = k => {
        if (found >= limit) return;
        if (k === K) { found++; return; }
        for (const p of P) {
          asg.order[k] = p;
          const inv = new Array(M);
          p.forEach((item, g) => { inv[item] = g; });
          asg[k] = inv;
          if (at[k].every(c => holds(c, asg))) rec(k + 1);
          if (found >= limit) return;
        }
      };
      rec(1);
      return found;
    }
    return { count, holds, P };
  }

  function logigramme(opts, rnd) {
    const cats = (opts.cats || []).filter(c => c.items?.length >= 3);
    if (cats.length < 3) throw new Error(MF.i18n.t('Univers incomplet : il faut au moins trois catégories.'));
    const K = cats.length;
    const M = Math.min(...cats.map(c => c.items.length));
    const ordered = cats.findIndex(c => c.kind === 'time');
    const S = solver(K, M, ordered);
    // Solution : order[k][g] = élément de la catégorie k du groupe g (catégorie 0 : identité)
    const order = cats.map((_, k) => (k === 0 ? [...Array(M).keys()] : shuffle([...Array(M).keys()], rnd)));
    const asg = /** @type {any} */ (order.map(o => { const inv = new Array(M); o.forEach((item, g) => { inv[item] = g; }); return inv; }));
    asg.order = order;
    // Réserve d'indices vrais
    const items = cats.flatMap((c, k) => [...Array(M).keys()].map(i => [k, i]));
    const pool = [];
    for (const a of items) {
      for (const b of items) {
        if (b[0] <= a[0]) continue;
        const truth = S.holds({ t: 'is', a, b }, asg);
        pool.push({ t: truth ? 'is' : 'not', a, b });
        if (truth) {
          const others = [...Array(M).keys()].filter(j => j !== b[1]);
          const c = [b[0], pick(others, rnd)];
          pool.push(rnd() < 0.5 ? { t: 'or', a, b, c } : { t: 'or', a, b: c, c: b });
        }
        if (ordered >= 0 && a[0] !== ordered && b[0] !== ordered) {
          for (const [x, y] of [[a, b], [b, a]]) {
            if (S.holds({ t: 'next', a: x, b: y }, asg)) pool.push({ t: 'next', a: x, b: y });
            else if (S.holds({ t: 'before', a: x, b: y }, asg)) pool.push({ t: 'before', a: x, b: y });
          }
        }
      }
    }
    const weight = { easy: { is: 3, not: 2, or: 1, before: 1, next: 1 }, medium: { is: 1.5, not: 2, or: 2, before: 2, next: 1.5 }, hard: { is: 0.6, not: 2, or: 2.5, before: 2.5, next: 2 }, expert: { is: 0.3, not: 2, or: 3, before: 3, next: 2.5 } }[opts.level] || { is: 1.5, not: 2, or: 2, before: 2, next: 1.5 };
    const ranked = pool.map(c => ({ c, k: rnd() ** (1 / weight[c.t]) })).sort((x, y) => y.k - x.k).map(x => x.c);
    // Indices ajoutés jusqu'à une solution unique (les superflus sont retirés ensuite)
    let clues = [];
    for (const c of ranked) {
      if (S.count(clues) === 1) break;
      clues = [...clues, c];
    }
    if (S.count(clues) !== 1) throw new Error('logigramme');
    // Indices superflus retirés (tous en niveau difficile, une partie en facile)
    const removable = { easy: 0.4, medium: 0.8, hard: 1, expert: 1 }[opts.level] ?? 0.8;
    let tries = Math.round(clues.length * removable);
    for (const c of shuffle(clues, rnd)) {
      if (tries-- <= 0) break;
      const next = clues.filter(x => x !== c);
      if (S.count(next) === 1) clues = next;
    }
    return {
      kind: 'logigramme', m: M,
      cats: cats.map(c => ({ kind: c.kind, name: c.name, items: c.items.slice(0, M) })),
      order, clues: shuffle(clues, rnd),
    };
  }

  return { picross, logigramme, solver };
})();
