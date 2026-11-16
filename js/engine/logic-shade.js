// @ts-check
/* =========================================================================
   Jeux à cases à cocher du registre MF.logicGames (voir logic-grids.js) :
   étoiles, lumières, tentes, bataille navale, hitori, boucle, mosaïque et
   labyrinthe. Les cases valent 0 / 1 (solveur MF.solver à valeurs 0 / 1,
   contraintes « counts ») ; la solution est dans `rows` ('1' = case cochée).
   ========================================================================= */
window.MF = window.MF || {};

(() => {
  const K = MF.logicKit;
  const S = () => MF.solver;

  /** Indices des cases d'une fenêtre 2 × 2 (coin haut gauche r, c). */
  const square = (r, c, w) => [r * w + c, r * w + c + 1, (r + 1) * w + c, (r + 1) * w + c + 1];
  /** Lignes et colonnes : cases de chacune. */
  const lines = (w, h) => ({
    rows: Array.from({ length: h }, (_, r) => Array.from({ length: w }, (_, c) => r * w + c)),
    cols: Array.from({ length: w }, (_, c) => Array.from({ length: h }, (_, r) => r * w + c)),
  });
  /** Jamais deux cases cochées voisines, même par un coin. */
  function apart(w, h) {
    const out = [];
    for (let r = 0; r + 1 < h; r++) for (let c = 0; c + 1 < w; c++) out.push({ cells: square(r, c, w), min: 0, max: 1 });
    return out;
  }
  const fixedOf = (sol, given) => Object.fromEntries(given.map((g, i) => [i, g ? sol[i] : -1]).filter(([, v]) => v >= 0));
  /**
   * Ajoute des cases données (prises parmi celles où deux solutions diffèrent) jusqu'à une solution unique.
   * @returns {boolean[] | null}
   */
  function settle(problem, sol, rnd, given = new Array(sol.length).fill(false), maxNodes = 40000) {
    for (let guard = 0; guard < sol.length; guard++) {
      const res = S().solve({ ...problem, fixed: fixedOf(sol, given) }, { limit: 2, maxNodes });
      if (res.count === 1 && !res.aborted) return given;
      if (!res.count && !res.aborted) return null;
      const diff = res.second ? res.solution.map((v, i) => (v !== res.second[i] && !given[i] ? i : -1)).filter(i => i >= 0) : sol.map((_, i) => (given[i] ? -1 : i)).filter(i => i >= 0);
      if (!diff.length) return null;
      // Une case cochée de préférence (plus parlant qu'une case vide)
      const on = diff.filter(i => sol[i] === 1);
      given[K.pick(on.length ? on : diff, rnd)] = true;
    }
    return null;
  }
  const unique = (problem, fixed, maxNodes = 30000) => { const r = S().solve({ ...problem, fixed }, { limit: 2, maxNodes }); return r.count === 1 && !r.aborted; };
  /** Repères de bord (nombres en haut et à gauche, comme le picross). */
  function withHints(kit, game, w, h, rows, cell, extra = {}) {
    const top = Array.from({ length: w }, (_, c) => rows.reduce((s, row) => s + (row[c] === '1' ? 1 : 0), 0));
    const left = rows.map(row => [...row].filter(x => x === '1').length);
    const m = kit.base(game, w + 1, h + 1, { shape: 'free', offset: [1, 1], ...extra });
    m.cells = kit.grid(h + 1, w + 1, (r, c) => {
      if (r === 0 && c === 0) return { type: 'out' };
      if (r === 0) return { type: 'hint', text: String(top[c - 1]) };
      if (c === 0) return { type: 'hint', text: String(left[r - 1]) };
      return cell(r - 1, c - 1);
    });
    return m;
  }

  /* =====================================================================
     Étoiles (star battle) : k étoiles par ligne, par colonne et par zone,
     jamais deux étoiles qui se touchent (même par un coin).
     ===================================================================== */
  (() => {
    function problem(n, k, owner) {
      const { rows, cols } = lines(n, n);
      const zones = [...new Set(owner)].map(id => owner.map((v, i) => (v === id ? i : -1)).filter(i => i >= 0));
      return K.binary(n * n, { counts: [...[...rows, ...cols, ...zones].map(cells => ({ cells, min: k, max: k })), ...apart(n, n)] });
    }
    /** Zones qui poussent ensemble autour des étoiles (k = 2 : deux étoiles reliées par un chemin). */
    function grow(n, k, stars, rnd) {
      const owner = new Array(n * n).fill(-1);
      const side = i => K.neighbors(i, n, n);
      if (k === 1) stars.forEach((s, id) => { owner[s] = id; });
      else {
        const left = K.shuffle(stars, rnd);
        let id = 0;
        while (left.length) {
          const a = left.pop();
          // Étoile la plus proche joignable sans passer par une autre zone ni une autre étoile
          const prev = new Map([[a, -1]]);
          const queue = [a];
          let b = -1;
          while (queue.length && b < 0) {
            const x = queue.shift();
            for (const q of K.shuffle(side(x), rnd)) {
              if (prev.has(q) || owner[q] >= 0) continue;
              prev.set(q, x);
              if (left.includes(q)) { b = q; break; }
              if (!stars.includes(q)) queue.push(q);
            }
          }
          if (b < 0) return null;
          left.splice(left.indexOf(b), 1);
          for (let x = b; x >= 0; x = prev.get(x)) owner[x] = id;
          id++;
        }
      }
      const R = stars.length / k;
      for (let guard = 0; guard < n * n * 8 && owner.includes(-1); guard++) {
        const id = Math.floor(rnd() * R);
        const front = owner.map((v, i) => (v === id ? i : -1)).filter(i => i >= 0).flatMap(side).filter(q => owner[q] < 0);
        if (front.length) owner[K.pick(front, rnd)] = id;
      }
      // Cases restées libres (enclavées) : à la zone voisine
      for (let guard = 0; guard < n * n && owner.includes(-1); guard++) {
        owner.forEach((v, i) => { if (v < 0) { const nb = side(i).find(q => owner[q] >= 0); if (nb !== undefined) owner[i] = owner[nb]; } });
      }
      return owner;
    }

    function generate(o, rnd) {
      const n = K.clamp(o.size || 8, 5, 12);
      const k = n >= 10 || (o.count === 2 && n >= 8) ? 2 : 1;
      const { rows, cols } = lines(n, n);
      const base = K.binary(n * n, { counts: [...[...rows, ...cols].map(cells => ({ cells, min: k, max: k })), ...apart(n, n)] });
      const t0 = Date.now();
      let best = null;
      while (Date.now() - t0 < 2500 && !(best && best.count === 1)) {
        const sol = S().solve(base, { limit: 1, rnd, maxNodes: 20000 }).solution;
        if (!sol) continue;
        const stars = sol.map((v, i) => (v ? i : -1)).filter(i => i >= 0);
        const owner = grow(n, k, stars, rnd);
        if (!owner) continue;
        const count = own => { const r = S().solve(problem(n, k, own), { limit: 12, maxNodes: 12000 }); return r.aborted ? 99 : r.count; };
        let cur = count(owner);
        // Retouches des zones : une case passe chez la zone voisine si cela réduit le nombre de solutions
        for (let step = 0; step < n * n * 3 && cur > 1 && Date.now() - t0 < 2500; step++) {
          const i = Math.floor(rnd() * n * n);
          if (sol[i]) continue;
          const to = K.pick(K.neighbors(i, n, n).map(q => owner[q]).filter(x => x !== owner[i]), rnd);
          if (to === undefined) continue;
          const from = owner[i];
          owner[i] = to;
          if (!K.connected(owner.map(x => x === from), n, n)) { owner[i] = from; continue; }
          const c = count(owner);
          if (c <= cur && c >= 1) cur = c; else owner[i] = from;
        }
        if (!best || cur < best.count) best = { sol, owner: owner.slice(), count: cur };
      }
      if (!best) throw new Error('etoiles');
      const given = best.count === 1 ? new Array(n * n).fill(false) : settle(problem(n, k, best.owner), best.sol, rnd);
      if (!given) throw new Error('etoiles');
      return page(n, k, best.sol, best.owner, given, o, rnd);
    }
    function page(n, k, sol, owner, given, o, rnd) {
      // Facile : une étoile donnée pour démarrer
      if (o.level === 'easy') given[K.pick(sol.map((v, i) => (v ? i : -1)).filter(i => i >= 0), rnd)] = true;
      return { kind: 'etoiles', n, stars: k, rows: K.toRows(sol, n, n), given: K.givenRows(given, n, n), regions: K.regionRows(K.renumber(owner), n, n) };
    }
    function sanitize(p, out) {
      const n = K.int(p.n, 4, 12);
      if (!n || !K.grid(p.rows, n, n, /^[01]+$/) || !K.grid(p.regions, n, n, /^[A-Za-z0-9]+$/)) return null;
      return Object.assign(out, { n, stars: p.stars === 2 ? 2 : 1, rows: p.rows.slice(), given: K.givenOr(p.given, n, n), regions: p.regions.slice() });
    }
    function model(page, { kit }) {
      const { n, rows } = page;
      const m = kit.base('etoiles', n, n, { toggle: 'picross' });
      m.cells = kit.grid(n, n, (r, c) => kit.letter(rows[r][c], { mark: 'star', given: page.given[r][c] === '1' }));
      m.walls = kit.wallsOf(K.regionsOf(page.regions), n);
      m.note = MF.i18n.t(page.stars === 2 ? 'Deux étoiles par ligne, par colonne et par zone.' : 'Une étoile par ligne, par colonne et par zone.');
      return m;
    }
    MF.logicGames.etoiles = { defaults: { size: 8 }, generate, sanitize, model, problem };
  })();

  /* =====================================================================
     Lumières (akari) : des lampes éclairent leur ligne et leur colonne
     jusqu'au mur ; tout doit être éclairé, deux lampes ne se voient jamais,
     un mur numéroté touche ce nombre de lampes.
     ===================================================================== */
  (() => {
    /** Suites de cases libres (lignes et colonnes) entre les murs. */
    function segments(wall, w, h) {
      const out = [];
      for (const [dr, dc] of [[0, 1], [1, 0]]) {
        for (let r = 0; r < h; r++) {
          for (let c = 0; c < w; c++) {
            const i = r * w + c;
            if (wall[i]) continue;
            const pr = r - dr, pc = c - dc;
            if (pr >= 0 && pc >= 0 && !wall[pr * w + pc]) continue;
            const cells = [];
            for (let rr = r, cc = c; rr < h && cc < w && !wall[rr * w + cc]; rr += dr, cc += dc) cells.push(rr * w + cc);
            out.push(cells);
          }
        }
      }
      return out;
    }
    /** walls : '.' libre, '#' mur, '0'…'4' mur numéroté. */
    function problem(walls, w, h) {
      const flat = K.flat(walls);
      const wall = [...flat].map(ch => ch !== '.');
      const segs = segments(wall, w, h);
      const counts = segs.filter(s => s.length > 1).map(cells => ({ cells, min: 0, max: 1 }));
      const segOf = Array.from({ length: w * h }, () => []);
      segs.forEach(s => s.forEach(i => segOf[i].push(s)));
      for (let i = 0; i < w * h; i++) if (!wall[i]) counts.push({ cells: [...new Set(segOf[i].flat())], min: 1, max: 2 });
      [...flat].forEach((ch, i) => { if (/[0-4]/.test(ch)) { const nb = K.neighbors(i, w, h).filter(q => !wall[q]); counts.push({ cells: nb, min: +ch, max: +ch }); } });
      const fixed = Object.fromEntries(wall.map((x, i) => [i, 0]).filter(([i]) => wall[+i]));
      return { P: K.binary(w * h, { counts }), fixed };
    }

    function generate(o, rnd) {
      const n = K.clamp(o.size || 8, 5, 14);
      const w = n, h = n, N = w * h;
      const density = { easy: 0.2, medium: 0.18, hard: 0.16, expert: 0.15 }[o.level] ?? 0.18;
      for (let attempt = 0; attempt < 40; attempt++) {
        // Murs symétriques (demi-tour)
        const wall = new Array(N).fill(false);
        for (let i = 0; i < N; i++) if (rnd() < density) { wall[i] = true; wall[N - 1 - i] = true; }
        if (!K.connected(wall.map(x => !x), w, h)) continue;
        // Lampes posées au hasard tant qu'une case reste dans le noir
        const segs = segments(wall, w, h);
        const segOf = Array.from({ length: N }, () => []);
        segs.forEach(s => s.forEach(i => segOf[i].push(s)));
        const lamp = new Array(N).fill(0), lit = new Array(N).fill(false);
        for (const i of K.shuffle([...Array(N).keys()], rnd)) {
          if (wall[i] || lit[i]) continue;
          lamp[i] = 1;
          segOf[i].flat().forEach(q => { lit[q] = true; });
        }
        const num = i => K.neighbors(i, w, h).filter(q => lamp[q]).length;
        const walls = K.toRows(wall.map((x, i) => (x ? String(num(i)) : '.')), w, h);
        const { P, fixed } = problem(walls, w, h);
        let given = settle({ ...P, fixed: { ...fixed } }, lamp, rnd, new Array(N).fill(false));
        if (!given) continue;
        // Nombres retirés tant que la solution reste unique (moins en facile)
        const removable = { easy: 0.3, medium: 0.6, hard: 0.85, expert: 1 }[o.level] ?? 0.6;
        const cur = [...K.flat(walls)];
        let tries = Math.round(cur.filter(ch => ch !== '.').length * removable);
        const t0 = Date.now();
        for (const i of K.shuffle([...Array(N).keys()], rnd)) {
          if (tries <= 0 || Date.now() - t0 > 1500) break;
          if (!/[0-4]/.test(cur[i])) continue;
          tries--;
          const was = cur[i];
          cur[i] = '#';
          const Q = problem(K.toRows(cur, w, h), w, h);
          if (!unique(Q.P, { ...Q.fixed, ...fixedOf(lamp, given) })) cur[i] = was;
        }
        given = given.map((g, i) => g && !wall[i]);
        return { kind: 'lumieres', w, h, walls: K.toRows(cur, w, h), rows: K.toRows(lamp, w, h), given: K.givenRows(given, w, h) };
      }
      throw new Error('lumieres');
    }
    function sanitize(p, out) {
      const w = K.int(p.w, 3, 16), h = K.int(p.h, 3, 16);
      if (!w || !h || !K.grid(p.walls, w, h, /^[.#0-4]+$/) || !K.grid(p.rows, w, h, /^[01]+$/)) return null;
      return Object.assign(out, { w, h, walls: p.walls.slice(), rows: p.rows.slice(), given: K.givenOr(p.given, w, h) });
    }
    function model(page, { kit }) {
      const { w, h, rows, walls } = page;
      const m = kit.base('lumieres', w, h, { toggle: 'picross' });
      m.cells = kit.grid(h, w, (r, c) => {
        const ch = walls[r][c];
        if (ch !== '.') return ch === '#' ? { type: 'block' } : { type: 'block', text: ch };
        return kit.letter(rows[r][c], { mark: 'lamp', given: page.given[r][c] === '1' });
      });
      return m;
    }
    MF.logicGames.lumieres = { defaults: { size: 8 }, generate, sanitize, model, problem };
  })();

  /* =====================================================================
     Tentes : une tente à côté de chaque arbre (par un côté), les tentes ne
     se touchent jamais, les nombres disent combien de tentes par ligne et
     par colonne.
     ===================================================================== */
  (() => {
    /** Chaque tente a son arbre (couplage parfait arbres – tentes voisins). */
    function matched(tents, trees, w, h) {
      if (tents.length !== trees.length) return false;
      const treeSet = new Map(trees.map((t, k) => [t, k]));
      const owner = new Array(trees.length).fill(-1);
      const tryTent = (ti, seen) => {
        for (const q of K.neighbors(tents[ti], w, h)) {
          const k = treeSet.get(q);
          if (k === undefined || seen[k]) continue;
          seen[k] = true;
          if (owner[k] < 0 || tryTent(owner[k], seen)) { owner[k] = ti; return true; }
        }
        return false;
      };
      return tents.every((_, ti) => tryTent(ti, new Array(trees.length).fill(false)));
    }
    function problem(map, w, h) {
      const N = w * h, flat = K.flat(map);
      const trees = [...flat].map((ch, i) => (ch === 'T' ? i : -1)).filter(i => i >= 0);
      const { rows, cols } = lines(w, h);
      const line = cells => [...cells].filter(i => flat[i] === '1').length;
      const counts = [
        ...[...rows, ...cols].map(cells => ({ cells, min: line(cells), max: line(cells) })),
        ...apart(w, h),
        ...trees.map(t => ({ cells: K.neighbors(t, w, h).filter(q => flat[q] !== 'T'), min: 1, max: 4 })),
        { cells: [...Array(N).keys()], min: trees.length, max: trees.length },
      ];
      const fixed = {};
      for (let i = 0; i < N; i++) if (flat[i] === 'T' || !K.neighbors(i, w, h).some(q => flat[q] === 'T')) fixed[i] = 0;
      const accept = sol => matched(sol.map((v, i) => (v ? i : -1)).filter(i => i >= 0), trees, w, h);
      return { P: K.binary(N, { counts, accept }), fixed };
    }

    function generate(o, rnd) {
      const n = K.clamp(o.size || 8, 5, 14);
      const w = n, h = n, N = w * h;
      for (let attempt = 0; attempt < 40; attempt++) {
        const cell = new Array(N).fill('0');
        const target = Math.round(N * ({ easy: 0.16, medium: 0.18, hard: 0.2, expert: 0.2 }[o.level] ?? 0.18));
        let placed = 0;
        for (const i of K.shuffle([...Array(N).keys()], rnd)) {
          if (placed >= target) break;
          if (cell[i] !== '0' || K.neighbors(i, w, h, true).some(q => cell[q] === '1')) continue;
          const spots = K.neighbors(i, w, h).filter(q => cell[q] === '0');
          if (!spots.length) continue;
          cell[i] = '1';
          cell[K.pick(spots, rnd)] = 'T';
          placed++;
        }
        const map = K.toRows(cell, w, h);
        const sol = cell.map(ch => (ch === '1' ? 1 : 0));
        const { P, fixed } = problem(map, w, h);
        const given = settle({ ...P, fixed }, sol, rnd);
        if (!given) continue;
        if (o.level === 'easy') for (const i of K.shuffle([...Array(N).keys()], rnd).slice(0, Math.round(N / 10))) if (cell[i] !== 'T') given[i] = true;
        return { kind: 'tentes', w, h, rows: map, given: K.givenRows(given.map((g, i) => g && cell[i] !== 'T'), w, h) };
      }
      throw new Error('tentes');
    }
    function sanitize(p, out) {
      const w = K.int(p.w, 3, 16), h = K.int(p.h, 3, 16);
      if (!w || !h || !K.grid(p.rows, w, h, /^[01T]+$/)) return null;
      return Object.assign(out, { w, h, rows: p.rows.slice(), given: K.givenOr(p.given, w, h) });
    }
    function model(page, { kit }) {
      const { w, h, rows } = page;
      return withHints(kit, 'tentes', w, h, rows, (r, c) => (rows[r][c] === 'T'
        ? { type: 'icon', icon: 'tree' }
        : kit.letter(rows[r][c], { mark: 'tent', given: page.given[r][c] === '1' })), { toggle: 'picross' });
    }
    MF.logicGames.tentes = { defaults: { size: 8 }, generate, sanitize, model, problem, matched };
  })();

  /* =====================================================================
     Bataille navale : retrouver la flotte d'après le nombre de cases de
     bateau par ligne et par colonne ; les bateaux ne se touchent jamais.
     ===================================================================== */
  (() => {
    const FLEETS = { 6: [3, 2, 2, 1, 1, 1], 7: [3, 3, 2, 2, 1, 1, 1], 8: [4, 3, 3, 2, 2, 1, 1, 1], 9: [4, 3, 3, 2, 2, 2, 1, 1, 1], 10: [4, 3, 3, 2, 2, 2, 1, 1, 1, 1] };
    const fleetOf = n => FLEETS[K.clamp(n, 6, 10)];
    /** Longueurs des bateaux d'une grille (cases à 1), triées ; null si une forme n'est pas droite. */
    function ships(sol, w, h) {
      const seen = new Uint8Array(w * h), out = [];
      for (let i = 0; i < w * h; i++) {
        if (!sol[i] || seen[i]) continue;
        const comp = [i];
        seen[i] = 1;
        for (let k = 0; k < comp.length; k++) for (const q of K.neighbors(comp[k], w, h)) if (sol[q] && !seen[q]) { seen[q] = 1; comp.push(q); }
        const rs = new Set(comp.map(x => Math.floor(x / w))), cs = new Set(comp.map(x => x % w));
        if (rs.size > 1 && cs.size > 1) return null;
        out.push(comp.length);
      }
      return out.sort((a, b) => b - a);
    }
    function problem(sol, w, h, fleet) {
      const { rows, cols } = lines(w, h);
      const line = cells => cells.filter(i => sol[i]).length;
      const counts = [...rows, ...cols].map(cells => ({ cells, min: line(cells), max: line(cells) }));
      for (let r = 0; r + 1 < h; r++) for (let c = 0; c + 1 < w; c++) {
        const [a, b, cc, d] = square(r, c, w);
        counts.push({ cells: [a, d], min: 0, max: 1 }, { cells: [b, cc], min: 0, max: 1 });
      }
      const want = fleet.join(',');
      counts.push({ cells: [...Array(w * h).keys()], min: fleet.reduce((s, x) => s + x, 0), max: fleet.reduce((s, x) => s + x, 0) });
      return K.binary(w * h, { counts, accept: s => ships(s, w, h)?.join(',') === want });
    }
    function place(n, fleet, rnd) {
      for (let attempt = 0; attempt < 200; attempt++) {
        const sol = new Array(n * n).fill(0);
        const ok = fleet.every(len => {
          for (let tries = 0; tries < 100; tries++) {
            const horiz = rnd() < 0.5;
            const r = Math.floor(rnd() * (horiz ? n : n - len + 1)), c = Math.floor(rnd() * (horiz ? n - len + 1 : n));
            const cells = Array.from({ length: len }, (_, k) => (horiz ? r * n + c + k : (r + k) * n + c));
            if (cells.some(i => sol[i] || K.neighbors(i, n, n, true).some(q => sol[q]))) continue;
            cells.forEach(i => { sol[i] = 1; });
            return true;
          }
          return false;
        });
        if (ok) return sol;
      }
      return null;
    }
    function generate(o, rnd) {
      const n = K.clamp(o.size || 8, 6, 10);
      const fleet = fleetOf(n);
      const sol = place(n, fleet, rnd);
      if (!sol) throw new Error('bataille');
      const given = settle(problem(sol, n, n, fleet), sol, rnd, new Array(n * n).fill(false), 30000);
      if (!given) throw new Error('bataille');
      const extra = { easy: 4, medium: 1, hard: 0, expert: 0 }[o.level] ?? 1;
      for (const i of K.shuffle([...Array(n * n).keys()], rnd).slice(0, extra)) given[i] = true;
      return { kind: 'bataille', n, fleet, rows: K.toRows(sol, n, n), given: K.givenRows(given, n, n) };
    }
    function sanitize(p, out) {
      const n = K.int(p.n, 5, 12);
      if (!n || !K.grid(p.rows, n, n, /^[01]+$/)) return null;
      const sol = [...K.flat(p.rows)].map(Number);
      const found = ships(sol, n, n);
      if (!found) return null;
      return Object.assign(out, { n, fleet: found, rows: p.rows.slice(), given: K.givenOr(p.given, n, n) });
    }
    function model(page, { kit }) {
      const { n, rows, fleet } = page;
      const m = withHints(kit, 'bataille', n, n, rows, (r, c) => kit.letter(rows[r][c], { mark: 'ship', given: page.given[r][c] === '1' }), { toggle: 'picross' });
      const by = new Map();
      fleet.forEach(len => by.set(len, (by.get(len) || 0) + 1));
      m.note = `${MF.i18n.t('Flotte')} : ${[...by].map(([len, k]) => `${k} × ${'■'.repeat(len)}`).join('   ')}`;
      return m;
    }
    MF.logicGames.bataille = { defaults: { size: 8 }, generate, sanitize, model, problem, ships, FLEETS };
  })();

  /* =====================================================================
     Hitori : noircir des cases pour qu'aucun chiffre ne se répète dans une
     ligne ou une colonne ; deux cases noires ne se touchent pas (par un
     côté) et les cases blanches restent d'un seul tenant.
     ===================================================================== */
  (() => {
    function problem(nums, n) {
      const flat = K.flat(nums);
      const { rows, cols } = lines(n, n);
      const counts = [];
      for (const cells of [...rows, ...cols]) {
        const by = new Map();
        cells.forEach(i => { const v = flat[i]; if (!by.has(v)) by.set(v, []); by.get(v).push(i); });
        // k fois le même chiffre : au moins k − 1 cases noires
        for (const same of by.values()) if (same.length > 1) counts.push({ cells: same, min: same.length - 1, max: same.length });
      }
      for (let i = 0; i < n * n; i++) for (const q of K.neighbors(i, n, n)) if (q > i) counts.push({ cells: [i, q], min: 0, max: 1 });
      return K.binary(n * n, { counts, accept: sol => K.connected(sol.map(v => !v), n, n) });
    }
    function generate(o, rnd) {
      const n = K.clamp(o.size || 7, 4, 9);
      const latin = { size: n * n, values: S().range(n), full: S().latinGroups(n) };
      const density = { easy: 0.3, medium: 0.32, hard: 0.34, expert: 0.36 }[o.level] ?? 0.32;
      const t0 = Date.now();
      while (Date.now() - t0 < 3000) {
        const sol = S().solve(latin, { limit: 1, rnd }).solution;
        const black = new Array(n * n).fill(false);
        for (const i of K.shuffle([...Array(n * n).keys()], rnd)) {
          if (black.filter(Boolean).length >= n * n * density) break;
          if (K.neighbors(i, n, n).some(q => black[q])) continue;
          black[i] = true;
          if (!K.connected(black.map(x => !x), n, n)) black[i] = false;
        }
        // Une case noire reprend un chiffre déjà présent (en blanc) sur sa ligne ou sa colonne
        const vals = sol.slice();
        let ok = true;
        for (let i = 0; i < n * n && ok; i++) {
          if (!black[i]) continue;
          const r = Math.floor(i / n), c = i % n;
          const seen = [...Array(n).keys()].flatMap(k => [r * n + k, k * n + c]).filter(q => q !== i && !black[q]).map(q => vals[q]);
          if (!seen.length) ok = false; else vals[i] = K.pick(seen, rnd);
        }
        if (!ok) continue;
        const nums = K.toRows(vals, n, n);
        const res = S().solve(problem(nums, n), { limit: 2, maxNodes: 40000 });
        if (res.count === 1 && !res.aborted && res.solution.every((v, i) => !!v === black[i])) {
          return { kind: 'hitori', n, nums, rows: K.toRows(black, n, n, v => (v ? '1' : '0')) };
        }
      }
      throw new Error('hitori');
    }
    function sanitize(p, out) {
      const n = K.int(p.n, 3, 9);
      if (!n || !K.grid(p.nums, n, n, /^[1-9]+$/) || !K.grid(p.rows, n, n, /^[01]+$/)) return null;
      return Object.assign(out, { n, nums: p.nums.slice(), rows: p.rows.slice(), given: Array(n).fill('0'.repeat(n)) });
    }
    function model(page, { kit }) {
      const { n, rows, nums } = page;
      const m = kit.base('hitori', n, n, { toggle: 'picross' });
      m.cells = kit.grid(n, n, (r, c) => kit.letter(rows[r][c], { mark: 'shade', label: nums[r][c] }));
      return m;
    }
    MF.logicGames.hitori = { defaults: { size: 7 }, generate, sanitize, model, problem };
  })();

  /* =====================================================================
     Boucle (slitherlink) : une seule boucle fermée passe le long des côtés
     des cases ; chaque nombre dit combien de ses côtés elle longe. Au jeu,
     on colorie l'intérieur de la boucle (son contour est la boucle).
     ===================================================================== */
  (() => {
    const outside = (i, w, h) => { const r = Math.floor(i / w), c = i % w; return +(r === 0) + +(r === h - 1) + +(c === 0) + +(c === w - 1); };
    const clueAt = (ins, i, w, h) => K.neighbors(i, w, h).filter(q => ins[q] !== ins[i]).length + (ins[i] ? outside(i, w, h) : 0);
    /** Intérieur d'un seul tenant, extérieur relié au bord : le contour est une seule boucle. */
    function loopOk(ins, w, h) {
      if (!ins.some(Boolean)) return false;
      if (!K.connected(ins.map(Boolean), w, h)) return false;
      // Extérieur : chaque zone extérieure touche le bord
      const out = ins.map(v => !v), seen = new Uint8Array(w * h);
      const stack = [];
      for (let i = 0; i < w * h; i++) if (out[i] && outside(i, w, h)) { seen[i] = 1; stack.push(i); }
      while (stack.length) for (const q of K.neighbors(stack.pop(), w, h)) if (out[q] && !seen[q]) { seen[q] = 1; stack.push(q); }
      return out.every((v, i) => !v || seen[i]);
    }
    function problem(clues, w, h) {
      const flat = K.flat(clues);
      const tuples = [];
      for (let i = 0; i < w * h; i++) {
        if (flat[i] === '.') continue;
        const nb = K.neighbors(i, w, h), cells = [i, ...nb], k = +flat[i], extra = outside(i, w, h);
        const list = [];
        for (let m = 0; m < 1 << cells.length; m++) {
          const v = cells.map((_, j) => (m >> j) & 1);
          if (nb.filter((_, j) => v[j + 1] !== v[0]).length + (v[0] ? extra : 0) === k) list.push(v);
        }
        tuples.push({ cells, list });
      }
      // Jamais deux cases intérieures qui se touchent seulement par un coin
      for (let r = 0; r + 1 < h; r++) for (let c = 0; c + 1 < w; c++) tuples.push({ cells: square(r, c, w), list: [...Array(16).keys()].filter(m => m !== 9 && m !== 6).map(m => [m & 1, (m >> 1) & 1, (m >> 2) & 1, (m >> 3) & 1]) });
      return K.binary(w * h, { tuples, accept: sol => loopOk(sol, w, h) });
    }
    function region(w, h, rnd, fill) {
      const N = w * h, ins = new Array(N).fill(0);
      ins[Math.floor(rnd() * N)] = 1;
      const target = Math.round(N * fill);
      for (let guard = 0; guard < N * 20 && ins.filter(Boolean).length < target; guard++) {
        const front = [...new Set(ins.flatMap((v, i) => (v ? K.neighbors(i, w, h) : [])))].filter(q => !ins[q]);
        if (!front.length) break;
        const q = K.pick(front, rnd);
        ins[q] = 1;
        const r = Math.floor(q / w), c = q % w;
        const checker = [[r - 1, c - 1], [r - 1, c], [r, c - 1], [r, c]].some(([rr, cc]) => rr >= 0 && cc >= 0 && rr + 1 < h && cc + 1 < w && (() => { const [a, b, x, d] = square(rr, cc, w).map(i => ins[i]); return a === d && b === x && a !== b; })());
        if (checker || !loopOk(ins, w, h)) ins[q] = 0;
      }
      return ins;
    }
    function generate(o, rnd) {
      const n = K.clamp(o.size || 6, 4, 10);
      const w = n, h = n;
      const ins = region(w, h, rnd, 0.42 + rnd() * 0.15);
      const all = Array.from({ length: w * h }, (_, i) => String(clueAt(ins, i, w, h)));
      const cur = all.slice();
      const keep = { easy: 0.62, medium: 0.48, hard: 0.36, expert: 0.25 }[o.level] ?? 0.48;
      const t0 = Date.now();
      let shown = w * h;
      for (const i of K.shuffle([...Array(w * h).keys()], rnd)) {
        if (shown <= w * h * keep || Date.now() - t0 > 2500) break;
        cur[i] = '.';
        const r = S().solve(problem(K.toRows(cur, w, h), w, h), { limit: 2, maxNodes: 8000 });
        if (r.count === 1 && !r.aborted) shown--; else cur[i] = all[i];
      }
      return { kind: 'boucle', w, h, rows: K.toRows(ins, w, h), clues: K.toRows(cur, w, h) };
    }
    function sanitize(p, out) {
      const w = K.int(p.w, 3, 14), h = K.int(p.h, 3, 14);
      if (!w || !h || !K.grid(p.rows, w, h, /^[01]+$/) || !K.grid(p.clues, w, h, /^[.0-4]+$/)) return null;
      return Object.assign(out, { w, h, rows: p.rows.slice(), clues: p.clues.slice(), given: Array(h).fill('0'.repeat(w)) });
    }
    function model(page, { kit }) {
      const { w, h, rows, clues } = page;
      const m = kit.base('boucle', w, h, { toggle: 'picross', outline: true, lattice: true });
      m.cells = kit.grid(h, w, (r, c) => kit.letter(rows[r][c], { mark: 'shade', label: clues[r][c] === '.' ? '' : clues[r][c] }));
      // La boucle (solution) : côtés entre une case intérieure et une case extérieure
      const at = (r, c) => (r >= 0 && c >= 0 && r < h && c < w ? rows[r][c] : '0');
      m.solLines = [];
      for (let r = 0; r <= h; r++) for (let c = 0; c < w; c++) if (at(r - 1, c) !== at(r, c)) m.solLines.push({ x1: c, y1: r, x2: c + 1, y2: r });
      for (let c = 0; c <= w; c++) for (let r = 0; r < h; r++) if (at(r, c - 1) !== at(r, c)) m.solLines.push({ x1: c, y1: r, x2: c, y2: r + 1 });
      m.note = MF.i18n.t('Au jeu : colorie l\'intérieur de la boucle, son contour se dessine tout seul.');
      return m;
    }
    MF.logicGames.boucle = { defaults: { size: 6 }, generate, sanitize, model, problem, loopOk };
  })();

  /* =====================================================================
     Mosaïque (fill-a-pix) : chaque nombre dit combien de cases sont
     noircies autour de lui (sa case comprise, 3 × 3) ; un dessin apparaît.
     ===================================================================== */
  (() => {
    const around = (i, w, h) => [i, ...K.neighbors(i, w, h, true)];
    function problem(clues, w, h) {
      const flat = K.flat(clues);
      const counts = [];
      for (let i = 0; i < w * h; i++) if (flat[i] !== '.') counts.push({ cells: around(i, w, h), min: +flat[i], max: +flat[i] });
      return K.binary(w * h, { counts });
    }
    function generate(o, rnd) {
      let pic = o.picture;
      if (!(pic?.rows?.length >= 3 && pic.rows.some(r => r.includes('1')))) {
        const n = K.clamp(o.size || 15, 5, 30);
        const mask = MF.shapes.mask('heart', n, n, 0);
        pic = { rows: Array.from({ length: n }, (_, r) => Array.from({ length: n }, (_, c) => (mask[r * n + c] ? '1' : '0')).join('')) };
      }
      const h = pic.rows.length, w = pic.rows[0].length;
      const sol = [...K.flat(pic.rows)].map(Number);
      const all = sol.map((_, i) => String(around(i, w, h).filter(q => sol[q]).length));
      const given = settle(problem(K.toRows(all, w, h), w, h), sol, rnd, new Array(w * h).fill(false), 60000) || new Array(w * h).fill(true);
      const cur = all.slice();
      const removable = { easy: 0.3, medium: 0.55, hard: 0.75, expert: 0.9 }[o.level] ?? 0.55;
      let tries = Math.round(w * h * removable);
      const t0 = Date.now();
      for (const i of K.shuffle([...Array(w * h).keys()], rnd)) {
        if (tries-- <= 0 || Date.now() - t0 > 2500) break;
        cur[i] = '.';
        if (!unique(problem(K.toRows(cur, w, h), w, h), fixedOf(sol, given), 15000)) cur[i] = all[i];
      }
      return { kind: 'mosaique', w, h, rows: pic.rows.slice(), clues: K.toRows(cur, w, h), given: K.givenRows(given, w, h) };
    }
    function sanitize(p, out) {
      const w = K.int(p.w, 3, 40), h = K.int(p.h, 3, 40);
      if (!w || !h || !K.grid(p.rows, w, h, /^[01]+$/) || !K.grid(p.clues, w, h, /^[.0-9]+$/)) return null;
      return Object.assign(out, { w, h, rows: p.rows.slice(), clues: p.clues.slice(), given: K.givenOr(p.given, w, h) });
    }
    function model(page, { kit }) {
      const { w, h, rows, clues } = page;
      const m = kit.base('mosaique', w, h, { toggle: 'picross' });
      m.cells = kit.grid(h, w, (r, c) => kit.letter(rows[r][c], { mark: 'shade', label: clues[r][c] === '.' ? '' : clues[r][c], given: page.given[r][c] === '1' }));
      for (let x = 5; x < w; x += 5) m.walls.push({ x1: x, y1: 0, x2: x, y2: h, thin: true });
      for (let y = 5; y < h; y += 5) m.walls.push({ x1: 0, y1: y, x2: w, y2: y, thin: true });
      return m;
    }
    MF.logicGames.mosaique = { defaults: { size: 15, source: 'emoji' }, generate, sanitize, model, problem, picture: true };
  })();

  /* =====================================================================
     Labyrinthe : un seul chemin du départ à l'arrivée (labyrinthe parfait,
     dans une forme au choix). Au jeu, on colorie les cases du chemin.
     ===================================================================== */
  (() => {
    /** Chemin du départ à l'arrivée (cases), d'après les passages ouverts. */
    function route(mask, open, w, h, start, end) {
      const idx = ([r, c]) => r * w + c;
      const nb = i => {
        const r = Math.floor(i / w), c = i % w, out = [];
        const o = d => parseInt(open[r]?.[c] ?? '0', 16) & d;
        const oAt = (rr, cc, d) => parseInt(open[rr]?.[cc] ?? '0', 16) & d;
        if (c + 1 < w && o(1)) out.push(i + 1);
        if (r + 1 < h && o(2)) out.push(i + w);
        if (c > 0 && oAt(r, c - 1, 1)) out.push(i - 1);
        if (r > 0 && oAt(r - 1, c, 2)) out.push(i - w);
        return out.filter(q => mask[Math.floor(q / w)][q % w] === '1');
      };
      const prev = new Map([[idx(start), -1]]);
      const queue = [idx(start)];
      while (queue.length) { const x = queue.shift(); for (const q of nb(x)) if (!prev.has(q)) { prev.set(q, x); queue.push(q); } }
      if (!prev.has(idx(end))) return null;
      const out = [];
      for (let x = idx(end); x >= 0; x = prev.get(x)) out.unshift(x);
      return { path: out, reach: prev.size };
    }
    function generate(o, rnd) {
      const n = K.clamp(o.size || 14, 6, 40);
      const shape = o.shape && MF.shapes.ids.includes(o.shape) && o.source === 'shape' ? o.shape : 'rect';
      const w = n, h = n, N = w * h;
      let inside = shape === 'rect' ? new Array(N).fill(true) : Array.from(MF.shapes.mask(shape, w, h, 0), Boolean);
      // La plus grande zone de la forme
      const comp = new Int16Array(N).fill(-1);
      let best = -1, bestSize = 0;
      for (let s = 0, id = 0; s < N; s++) {
        if (!inside[s] || comp[s] >= 0) continue;
        const stack = [s]; comp[s] = id; let size = 0;
        while (stack.length) { const x = stack.pop(); size++; for (const q of K.neighbors(x, w, h)) if (inside[q] && comp[q] < 0) { comp[q] = id; stack.push(q); } }
        if (size > bestSize) { bestSize = size; best = id; }
        id++;
      }
      inside = inside.map((v, i) => v && comp[i] === best);
      // Labyrinthe parfait : parcours en profondeur au hasard
      const open = new Uint8Array(N);
      const seen = new Uint8Array(N);
      const s0 = inside.indexOf(true);
      const stack = [s0];
      seen[s0] = 1;
      while (stack.length) {
        const x = stack[stack.length - 1];
        const next = K.neighbors(x, w, h).filter(q => inside[q] && !seen[q]);
        if (!next.length) { stack.pop(); continue; }
        const q = K.pick(next, rnd);
        const [a, b] = x < q ? [x, q] : [q, x];
        open[a] |= b === a + 1 ? 1 : 2;
        seen[q] = 1;
        stack.push(q);
      }
      // Départ et arrivée : les deux cases les plus éloignées (deux parcours en largeur)
      const maskRows = K.toRows(inside, w, h, v => (v ? '1' : '0'));
      const openRows = K.toRows(open, w, h, v => v.toString(16));
      /** Case la plus éloignée de `from` en suivant les passages. */
      const far = from => {
        const dist = new Map([[from[0] * w + from[1], 0]]);
        const queue = [from[0] * w + from[1]];
        let last = queue[0];
        while (queue.length) {
          const x = queue.shift();
          last = x;
          const r = Math.floor(x / w), c = x % w, d = dist.get(x);
          const nbs = [];
          if (open[x] & 1) nbs.push(x + 1);
          if (open[x] & 2) nbs.push(x + w);
          if (c > 0 && open[x - 1] & 1) nbs.push(x - 1);
          if (r > 0 && open[x - w] & 2) nbs.push(x - w);
          for (const y of nbs) if (!dist.has(y)) { dist.set(y, d + 1); queue.push(y); }
        }
        return [Math.floor(last / w), last % w];
      };
      const startSeed = [Math.floor(s0 / w), s0 % w];
      const start = far(startSeed), end = far(start);
      return { kind: 'labyrinthe', w, h, mask: maskRows, open: openRows, start, end };
    }
    function sanitize(p, out) {
      const w = K.int(p.w, 3, 40), h = K.int(p.h, 3, 40);
      if (!w || !h || !K.grid(p.mask, w, h, /^[01]+$/) || !K.grid(p.open, w, h, /^[0-3]+$/)) return null;
      const pt = x => Array.isArray(x) && K.int(x[0], 0, h - 1) !== null && K.int(x[1], 0, w - 1) !== null && p.mask[x[0]][x[1]] === '1';
      if (!pt(p.start) || !pt(p.end) || !route(p.mask, p.open, w, h, p.start, p.end)) return null;
      return Object.assign(out, { w, h, mask: p.mask.slice(), open: p.open.slice(), start: p.start.slice(), end: p.end.slice() });
    }
    function model(page, { kit }) {
      const { w, h, mask, open, start, end } = page;
      const path = new Set(route(mask, open, w, h, start, end)?.path || []);
      const m = kit.base('labyrinthe', w, h, { toggle: 'path', shape: 'free' });
      const isIn = (r, c) => r >= 0 && c >= 0 && r < h && c < w && mask[r][c] === '1';
      m.cells = kit.grid(h, w, (r, c) => {
        if (!isIn(r, c)) return { type: 'out' };
        const i = r * w + c;
        const tip = r === start[0] && c === start[1] ? 'start' : r === end[0] && c === end[1] ? 'goal' : '';
        return kit.letter(path.has(i) ? '1' : '0', { mark: 'path', given: !!tip, icon: tip || undefined });
      });
      const o = (r, c) => parseInt(open[r][c], 16);
      for (let r = 0; r < h; r++) {
        for (let c = 0; c < w; c++) {
          if (!isIn(r, c)) continue;
          if (!isIn(r, c + 1) || !(o(r, c) & 1)) m.walls.push({ x1: c + 1, y1: r, x2: c + 1, y2: r + 1 });
          if (!isIn(r + 1, c) || !(o(r, c) & 2)) m.walls.push({ x1: c, y1: r + 1, x2: c + 1, y2: r + 1 });
          if (!isIn(r, c - 1)) m.walls.push({ x1: c, y1: r, x2: c, y2: r + 1 });
          if (!isIn(r - 1, c)) m.walls.push({ x1: c, y1: r, x2: c + 1, y2: r });
        }
      }
      return m;
    }
    MF.logicGames.labyrinthe = { defaults: { size: 14 }, generate, sanitize, model, route };
  })();
})();
