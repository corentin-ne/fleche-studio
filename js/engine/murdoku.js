// @ts-check
/* =========================================================================
   Murdoku (sudoku du crime) : un plan de maison découpé en pièces, une
   personne par ligne et par colonne, jamais sur un objet bloquant. Le
   coupable est le seul suspect seul dans une pièce avec la victime.
   Ce module est pur (aucun DOM) : il tourne aussi dans le worker.
   Génération : pièces -> types -> mobilier -> solution -> réserve d'indices
   vrais -> on retire des indices tant que la solution reste unique.
   Format des données : docs/murdoku-format.md.
   ========================================================================= */
window.MF = window.MF || {};

MF.murdoku = (() => {
  /* ---------------- Pièces et objets ---------------- */
  /**
   * Types de pièces : objets possibles (le premier est toujours posé), sol suggéré
   * au rendu, taille préférée (1 petite … 3 grande), bord du plan obligatoire.
   */
  const ROOMS = {
    living: { floor: 'wood', size: 3, objects: ['sofa', 'armchair', 'table', 'rug', 'tv', 'fireplace', 'bookshelf', 'plant', 'lamp', 'piano'] },
    kitchen: { floor: 'tile', size: 2, objects: ['counter', 'table', 'chair', 'chair', 'sink', 'cabinet', 'plant'] },
    bedroom: { floor: 'carpet', size: 2, objects: ['bed', 'rug', 'tv', 'cabinet', 'lamp', 'plant', 'armchair'] },
    bathroom: { floor: 'tile', size: 1, objects: ['bath', 'sink', 'cabinet', 'plant', 'rug'] },
    office: { floor: 'wood', size: 2, objects: ['desk', 'chair', 'bookshelf', 'armchair', 'cabinet', 'lamp', 'plant'] },
    library: { floor: 'wood', size: 2, objects: ['bookshelf', 'armchair', 'bookshelf', 'armchair', 'fireplace', 'lamp', 'rug', 'table'] },
    dining: { floor: 'wood', size: 3, objects: ['table', 'chair', 'chair', 'chair', 'cabinet', 'plant', 'lamp'] },
    garden: { floor: 'grass', size: 3, edge: true, objects: ['tree', 'bench', 'tree', 'fountain', 'plant', 'bench'] },
    hall: { floor: 'stone', size: 1, objects: ['rug', 'bench', 'plant', 'cabinet', 'lamp'] },
    music: { floor: 'wood', size: 2, objects: ['piano', 'chair', 'armchair', 'rug', 'lamp', 'bookshelf'] },
    guest: { floor: 'carpet', size: 1, objects: ['bed', 'rug', 'cabinet', 'lamp', 'plant'] },
    game: { floor: 'carpet', size: 2, objects: ['table', 'sofa', 'armchair', 'tv', 'rug', 'chair'] },
    veranda: { floor: 'tile', size: 2, objects: ['plant', 'armchair', 'bench', 'table', 'plant', 'chair'] },
    laundry: { floor: 'tile', size: 1, objects: ['sink', 'cabinet', 'chair', 'plant'] },
  };
  const ROOM_TYPES = Object.keys(ROOMS);
  // Toujours proposés en premier (une maison a un salon, une cuisine…)
  const CORE_ROOMS = ['living', 'kitchen', 'bedroom', 'bathroom'];

  /** Objets : occupable (on peut s'y tenir), un seul par pièce, contre un mur de préférence. */
  const OBJECTS = {
    bed: { occupiable: true, one: true },
    sofa: { occupiable: true, one: true },
    armchair: { occupiable: true },
    chair: { occupiable: true },
    rug: { occupiable: true, one: true },
    bench: { occupiable: true },
    table: { occupiable: false, one: true },
    desk: { occupiable: false, one: true },
    plant: { occupiable: false },
    bookshelf: { occupiable: false, wall: true },
    piano: { occupiable: false, one: true },
    bath: { occupiable: false, one: true, wall: true },
    sink: { occupiable: false, one: true, wall: true },
    tv: { occupiable: false, one: true, wall: true },
    fireplace: { occupiable: false, one: true, wall: true },
    counter: { occupiable: false, wall: true },
    cabinet: { occupiable: false, wall: true },
    lamp: { occupiable: false, one: true },
    tree: { occupiable: false },
    fountain: { occupiable: false, one: true },
  };
  // Pièces typiques de chaque objet, déduites des pièces
  for (const [type, o] of Object.entries(OBJECTS)) o.rooms = ROOM_TYPES.filter(rt => ROOMS[rt].objects.includes(type));

  /** Prénoms des suspects : courts, initiales distinctes. */
  const NAMES = {
    fr: ['Alice', 'Bruno', 'Chloé', 'David', 'Emma', 'Félix', 'Gaby', 'Hugo', 'Inès', 'Jules', 'Karim', 'Léa', 'Marc', 'Nina', 'Oscar', 'Paula', 'Rose', 'Simon', 'Théo', 'Zoé'],
    en: ['Alice', 'Ben', 'Chloe', 'Dan', 'Emma', 'Frank', 'Grace', 'Harry', 'Ivy', 'Jack', 'Kate', 'Leo', 'Mia', 'Noah', 'Olive', 'Paul', 'Ruby', 'Sam', 'Tom', 'Zara'],
  };
  const VICTIMS = { fr: ['Victor', 'Viviane', 'Yves', 'Wanda'], en: ['Victor', 'Vera', 'Walter', 'Yvonne'] };
  /** Couleurs des suspects (palette Okabe-Ito, lisible par les daltoniens) et de la victime. */
  const COLORS = ['#e69f00', '#56b4e9', '#009e73', '#f0e442', '#0072b2', '#d55e00', '#cc79a7'];
  const VICTIM_COLOR = '#2b2d42';

  const KINDS = ['inRoom', 'notInRoom', 'onObject', 'besideObject', 'notBesideObject', 'edge', 'notEdge', 'row', 'column', 'sameRow', 'sameColumn', 'alone',
    'withPerson', 'notWith', 'above', 'below', 'leftOf', 'rightOf', 'roomCount', 'emptyRoom'];
  const UNARY = new Set(['inRoom', 'notInRoom', 'onObject', 'besideObject', 'notBesideObject', 'edge', 'notEdge', 'row', 'column', 'sameRow', 'sameColumn']);
  const LEVELS = ['easy', 'medium', 'hard', 'expert'];
  const PAIR = new Set(['withPerson', 'notWith', 'above', 'below', 'leftOf', 'rightOf']);
  /**
   * Poids de chaque sorte d'indice selon la difficulté : les indices sont retirés dans un ordre
   * aléatoire pondéré (les moins lourds d'abord), ce qui garde un mélange dominé par les plus lourds.
   */
  const PREF = {
    easy: { inRoom: 8, onObject: 6, row: 6, column: 6, emptyRoom: 5, roomCount: 4, alone: 4, withPerson: 4, edge: 3, besideObject: 3, sameRow: 2, sameColumn: 2, notInRoom: 1, notWith: 1, notEdge: 1, notBesideObject: 0.5, above: 1, below: 1, leftOf: 1, rightOf: 1 },
    medium: { besideObject: 5, inRoom: 4, onObject: 4, roomCount: 4, alone: 3, withPerson: 3, emptyRoom: 3, edge: 3, sameRow: 3, sameColumn: 3, above: 3, below: 3, leftOf: 3, rightOf: 3, row: 2, column: 2, notInRoom: 2, notWith: 2, notEdge: 2, notBesideObject: 1 },
    hard: { above: 5, below: 5, leftOf: 5, rightOf: 5, notInRoom: 5, besideObject: 5, notWith: 4, notBesideObject: 4, roomCount: 4, alone: 4, notEdge: 3, edge: 3, sameRow: 3, sameColumn: 3, withPerson: 3, emptyRoom: 2, onObject: 2, inRoom: 1, row: 0.5, column: 0.5 },
    // Expert : presque que des négations et des relations ; ni ligne ni colonne données
    expert: { notInRoom: 7, notWith: 6, notBesideObject: 6, notEdge: 5, above: 6, below: 6, leftOf: 6, rightOf: 6, besideObject: 4, sameRow: 4, sameColumn: 4, roomCount: 3, alone: 3, edge: 2, emptyRoom: 1, withPerson: 1, onObject: 1, inRoom: 0.3, row: 0.1, column: 0.1 },
  };
  // Indices redondants laissés pour aider
  const EXTRA = { easy: 3, medium: 1, hard: 0, expert: 0 };

  /* ---------------- Contexte et vérification ---------------- */
  /** Plateau prêt au calcul : pièce, objet et blocage de chaque case (indice k = r * N + c). */
  function context(pz) {
    const N = pz.size, NN = N * N;
    const room = pz.cells.flat();
    const obj = new Array(NN).fill(null);
    for (const o of pz.objects) obj[o.r * N + o.c] = o.type;
    const block = obj.map(o => !!o && !OBJECTS[o]?.occupiable);
    const idx = new Map(pz.people.map((p, i) => [p.id, i]));
    const near = Array.from({ length: NN }, (_, k) => {
      const r = Math.floor(k / N), c = k % N;
      return [[r - 1, c], [r + 1, c], [r, c - 1], [r, c + 1]].filter(([y, x]) => y >= 0 && x >= 0 && y < N && x < N).map(([y, x]) => y * N + x);
    });
    const rowOf = Array.from({ length: NN }, (_, k) => Math.floor(k / N)), colOf = rowOf.map((r, k) => k % N);
    return { N, NN, room, obj, block, idx, near, rowOf, colOf, P: pz.people.length, R: pz.rooms.length, victim: pz.people.findIndex(p => p.role === 'victim') };
  }

  /** Un indice portant sur une seule personne est-il vrai si elle est en case k ? */
  function cellTest(cl, x, k) {
    const { N } = x, r = Math.floor(k / N), c = k % N;
    switch (cl.kind) {
      case 'inRoom': return x.room[k] === cl.room;
      case 'notInRoom': return x.room[k] !== cl.room;
      case 'onObject': return x.obj[k] === cl.object;
      case 'besideObject': return x.near[k].some(j => x.obj[j] === cl.object);
      case 'notBesideObject': return !x.near[k].some(j => x.obj[j] === cl.object);
      case 'edge': return !r || !c || r === N - 1 || c === N - 1;
      case 'notEdge': return !(!r || !c || r === N - 1 || c === N - 1);
      case 'row': return r === cl.row;
      case 'column': return c === cl.col;
      case 'sameRow': for (let j = 0; j < N; j++) if (j !== c && x.obj[r * N + j] === cl.object) return true; return false;
      case 'sameColumn': for (let i = 0; i < N; i++) if (i !== r && x.obj[i * N + c] === cl.object) return true; return false;
    }
    return false;
  }
  /** Relation entre deux personnes en cases ka et kb. */
  function pairTest(kind, x, ka, kb) {
    switch (kind) {
      case 'withPerson': return x.room[ka] === x.room[kb];
      case 'notWith': return x.room[ka] !== x.room[kb];
      case 'above': return x.rowOf[ka] < x.rowOf[kb];
      case 'below': return x.rowOf[ka] > x.rowOf[kb];
      case 'leftOf': return x.colOf[ka] < x.colOf[kb];
      case 'rightOf': return x.colOf[ka] > x.colOf[kb];
    }
    return false;
  }
  /** L'indice est-il vrai pour la disposition pos (case de chaque personne) ? */
  function holds(cl, x, pos) {
    const at = id => pos[x.idx.get(id)];
    if (UNARY.has(cl.kind)) return cellTest(cl, x, at(cl.person));
    if (PAIR.has(cl.kind)) return pairTest(cl.kind, x, at(cl.a), at(cl.b));
    const count = R => pos.filter(k => x.room[k] === R).length;
    if (cl.kind === 'alone') return count(x.room[at(cl.person)]) === 1;
    if (cl.kind === 'roomCount') return count(cl.room) === cl.n;
    if (cl.kind === 'emptyRoom') return count(cl.room) === 0;
    return false;
  }

  /**
   * Recherche des dispositions compatibles avec les règles et les indices (au plus `limit`).
   * Retour arrière en choisissant à chaque pas la personne la plus contrainte.
   * @returns {number[][]} case de chaque personne, pour chaque solution
   */
  function search(x, clues, limit) {
    const { N, P, NN, room, victim } = x;
    const empty = new Set(clues.filter(cl => cl.kind === 'emptyRoom').map(cl => cl.room));
    const dom = [], ids = [...x.idx.keys()];
    for (let p = 0; p < P; p++) {
      const id = ids[p];
      const own = clues.filter(cl => UNARY.has(cl.kind) && cl.person === id);
      const d = [];
      for (let k = 0; k < NN; k++) if (!x.block[k] && !empty.has(room[k]) && own.every(cl => cellTest(cl, x, k))) d.push(k);
      if (!d.length) return [];
      dom.push(d);
    }
    const pairs = Array.from({ length: P }, () => []);
    for (const cl of clues) {
      if (!PAIR.has(cl.kind)) continue;
      const a = x.idx.get(cl.a), b = x.idx.get(cl.b);
      pairs[a].push({ kind: cl.kind, o: b, first: true });
      pairs[b].push({ kind: cl.kind, o: a, first: false });
    }
    // Cohérence d'arc (bornes) : chaque case gardée a une case compatible pour l'autre personne
    const pc = clues.filter(cl => PAIR.has(cl.kind)).map(cl => [cl.kind, x.idx.get(cl.a), x.idx.get(cl.b)]);
    const { rowOf, colOf } = x;
    const lo = (d, of) => { let m = N; for (const k of d) if (of[k] < m) m = of[k]; return m; };
    const hi = (d, of) => { let m = -1; for (const k of d) if (of[k] > m) m = of[k]; return m; };
    /** Resserre les listes de cases d (par personne) ; false si une liste se vide. */
    const narrow = (d, skip) => {
      for (let changed = true; changed;) {
        changed = false;
        for (const [kind, a, b] of pc) {
          if (skip(a) || skip(b)) continue;
          let da = d[a], db = d[b];
          if (kind === 'above' || kind === 'below' || kind === 'leftOf' || kind === 'rightOf') {
            const of = kind === 'above' || kind === 'below' ? rowOf : colOf;
            // Rien à retirer tant que les intervalles le permettent déjà
            if (kind === 'above' || kind === 'leftOf') {
              const m = hi(db, of); if (hi(da, of) >= m) da = da.filter(k => of[k] < m);
              const n = lo(da, of); if (lo(db, of) <= n) db = db.filter(k => of[k] > n);
            } else {
              const m = lo(db, of); if (lo(da, of) <= m) da = da.filter(k => of[k] > m);
              const n = hi(da, of); if (hi(db, of) >= n) db = db.filter(k => of[k] < n);
            }
          } else if (kind === 'withPerson') {
            const rb = new Set(db.map(k => room[k])); da = da.filter(k => rb.has(room[k]));
            const ra = new Set(da.map(k => room[k])); db = db.filter(k => ra.has(room[k]));
          } else {
            const rb = new Set(db.map(k => room[k])), ra = new Set(da.map(k => room[k]));
            if (rb.size === 1) da = da.filter(k => !rb.has(room[k]));
            if (ra.size === 1) db = db.filter(k => !ra.has(room[k]));
          }
          if (!da.length || !db.length) return false;
          if (da.length < d[a].length || db.length < d[b].length) { d[a] = da; d[b] = db; changed = true; }
        }
      }
      return true;
    };
    if (!narrow(dom, () => false)) return [];
    const alone = new Array(P).fill(false);
    for (const cl of clues) if (cl.kind === 'alone') alone[x.idx.get(cl.person)] = true;
    const max = new Array(x.R).fill(P), counts = clues.filter(cl => cl.kind === 'roomCount');
    for (const cl of counts) max[cl.room] = Math.min(max[cl.room], cl.n);
    const pos = new Array(P).fill(-1), rowUsed = new Array(N).fill(false), colUsed = new Array(N).fill(false);
    const cnt = new Array(x.R).fill(0), lone = new Array(x.R).fill(0), can = new Array(x.R).fill(0), seen = new Array(x.R).fill(0);
    const sols = [];
    const cellsOf = Array.from({ length: x.R }, () => []);
    for (let k = 0; k < NN; k++) if (!x.block[k]) cellsOf[room[k]].push(k);
    const bits = m => { let n = 0; for (; m; m &= m - 1) n++; return n; };
    const rowM = new Array(P).fill(0), colM = new Array(P).fill(0), owner = new Array(N).fill(-1);
    /** Couplage parfait des personnes restantes (masques des lignes ou colonnes possibles) ? */
    const matches = (masks, n) => {
      owner.fill(-1);
      const tryP = (p, vis) => {
        for (let i = 0; i < N; i++) {
          if (!(masks[p] >> i & 1) || vis[i]) continue;
          vis[i] = 1;
          if (owner[i] < 0 || tryP(owner[i], vis)) { owner[i] = p; return true; }
        }
        return false;
      };
      for (let p = 0; p < n; p++) if (!tryP(p, new Array(N).fill(0))) return false;
      return true;
    };

    const ok = (p, k) => {
      const R = room[k];
      if (rowUsed[Math.floor(k / N)] || colUsed[k % N] || cnt[R] >= max[R] || lone[R]) return false;
      if (alone[p] && cnt[R]) return false;
      if (p === victim ? cnt[R] > 1 : pos[victim] >= 0 && room[pos[victim]] === R && cnt[R] >= 2) return false;
      for (const q of pairs[p]) {
        const ko = pos[q.o];
        if (ko >= 0 && !(q.first ? pairTest(q.kind, x, k, ko) : pairTest(q.kind, x, ko, k))) return false;
      }
      return true;
    };
    const rec = left => {
      if (!left) {
        if (cnt[room[pos[victim]]] !== 2 || counts.some(cl => cnt[cl.room] !== cl.n)) return false;
        sols.push([...pos]);
        return sols.length >= limit;
      }
      // Personne la plus contrainte ; les personnes restantes doivent pouvoir se répartir
      // sur des lignes et des colonnes distinctes (couplage)
      let best = -1, bestList = null, nf = 0;
      can.fill(0);
      const lists = [];
      for (let p = 0; p < P; p++) {
        if (pos[p] >= 0) continue;
        const list = dom[p].filter(k => ok(p, k));
        if (!list.length) return false;
        lists[p] = list;
      }
      if (pc.length && !narrow(lists, p => pos[p] >= 0)) return false;
      for (let p = 0; p < P; p++) {
        if (pos[p] >= 0) continue;
        const list = lists[p];
        let rows = 0, cols = 0;
        seen.fill(0);
        for (const k of list) {
          rows |= 1 << rowOf[k]; cols |= 1 << colOf[k];
          if (!seen[room[k]]) { seen[room[k]] = 1; can[room[k]]++; }
        }
        rowM[nf] = rows; colM[nf++] = cols;
        if (best !== victim && (p === victim || !bestList || list.length < bestList.length)) { best = p; bestList = list; }
      }
      if (nf > 1 && (!matches(rowM, nf) || !matches(colM, nf))) return false;
      // Bornes basses : les personnes restantes peuvent-elles encore remplir les pièces ?
      // (au plus une personne de plus par ligne et par colonne libres de la pièce)
      const room2 = R => {
        let rs = 0, cs = 0;
        for (const k of cellsOf[R]) if (!rowUsed[rowOf[k]] && !colUsed[colOf[k]]) { rs |= 1 << rowOf[k]; cs |= 1 << colOf[k]; }
        return cnt[R] + Math.min(can[R], bits(rs), bits(cs));
      };
      if (counts.some(cl => room2(cl.room) < cl.n)) return false;
      if (pos[victim] >= 0 && room2(room[pos[victim]]) < 2) return false;
      // Branches : les cases de la personne la plus contrainte, ou bien, si une pièce attend
      // exactement une personne de plus, les (personne, case) qui la complètent (moins de choix)
      let branch = bestList.map(k => [best, k]);
      const need = [];
      if (pos[victim] >= 0 && cnt[room[pos[victim]]] === 1) need.push(room[pos[victim]]);
      for (const cl of counts) if (cl.n - cnt[cl.room] === 1) need.push(cl.room);
      for (const R of need) {
        const alt = [];
        for (let p = 0; p < P; p++) if (pos[p] < 0) for (const k of lists[p]) if (room[k] === R) alt.push([p, k]);
        if (alt.length < branch.length) branch = alt;
      }
      for (const [p, k] of branch) {
        const R = room[k], r = rowOf[k], c = colOf[k];
        pos[p] = k; rowUsed[r] = colUsed[c] = true; cnt[R]++; if (alone[p]) lone[R]++;
        const stop = rec(left - 1);
        pos[p] = -1; rowUsed[r] = colUsed[c] = false; cnt[R]--; if (alone[p]) lone[R]--;
        if (stop) return true;
      }
      return false;
    };
    rec(P);
    return sols;
  }

  const toMap = (pz, pos) => Object.fromEntries(pz.people.map((p, i) => [p.id, { r: Math.floor(pos[i] / pz.size), c: pos[i] % pz.size }]));
  const fromMap = (pz, placement) => pz.people.map(p => {
    const q = placement?.[p.id];
    return q && Number.isInteger(q.r) && Number.isInteger(q.c) && q.r >= 0 && q.c >= 0 && q.r < pz.size && q.c < pz.size ? q.r * pz.size + q.c : -1;
  });

  /** Indice bien formé pour ce puzzle (personnes, pièce, objet, ligne connus) ? */
  function validClue(cl, pz) {
    const ids = new Set(pz.people.map(p => p.id));
    const inRange = (v, n) => Number.isInteger(v) && v >= 0 && v < n;
    if (!cl || !KINDS.includes(cl.kind)) return false;
    if (PAIR.has(cl.kind)) return ids.has(cl.a) && ids.has(cl.b) && cl.a !== cl.b;
    if (cl.kind === 'roomCount') return inRange(cl.room, pz.rooms.length) && inRange(cl.n, pz.people.length + 1);
    if (cl.kind === 'emptyRoom') return inRange(cl.room, pz.rooms.length);
    if (!ids.has(cl.person)) return false;
    if (cl.kind === 'inRoom' || cl.kind === 'notInRoom') return inRange(cl.room, pz.rooms.length);
    if (cl.kind === 'row') return inRange(cl.row, pz.size);
    if (cl.kind === 'column') return inRange(cl.col, pz.size);
    return cl.kind === 'alone' || cl.kind === 'edge' || cl.kind === 'notEdge' || !!OBJECTS[cl.object];
  }

  /** Solutions (au plus `limit`) : { idPersonne: { r, c } } chacune. Les indices mal formés sont ignorés. */
  function solve(pz, clues = pz.clues, limit = 2) {
    return search(context(pz), (clues || []).filter(cl => validClue(cl, pz)), limit).map(pos => toMap(pz, pos));
  }

  /** Disposition conforme aux règles et à tous les indices ? */
  function isSolved(pz, placement) {
    const x = context(pz), pos = fromMap(pz, placement);
    if (pos.some(k => k < 0 || x.block[k])) return false;
    if (new Set(pos.map(k => Math.floor(k / x.N))).size !== x.P || new Set(pos.map(k => k % x.N)).size !== x.P) return false;
    if (pos.filter(k => x.room[k] === x.room[pos[x.victim]]).length !== 2) return false;
    return pz.clues.every(cl => !validClue(cl, pz) || holds(cl, x, pos));
  }

  /** Coupable d'une disposition : le seul suspect seul avec la victime (sinon null). */
  function murdererOf(pz, placement) {
    const x = context(pz), pos = fromMap(pz, placement);
    const kv = pos[x.victim];
    if (kv < 0) return null;
    const there = pz.people.filter((p, i) => i !== x.victim && pos[i] >= 0 && x.room[pos[i]] === x.room[kv]);
    return there.length === 1 ? there[0].id : null;
  }

  /* ---------------- Génération ---------------- */
  /** Découpe N × N en R pièces : coupes successives en rectangles, puis fusions (pièces en L). */
  function partition(N, R, rnd, minA) {
    const merges = Math.min(Math.ceil(R / 3), Math.floor((N * N) / minA) - R);
    let rects = [{ r: 0, c: 0, h: N, w: N }];
    while (rects.length < R + merges) {
      const cand = rects.filter(q => q.h * q.w >= 2 * minA && q.h * q.w > 1)
        .map(q => ({ q, s: q.h * q.w * (0.7 + rnd() * 0.6) })).sort((a, b) => b.s - a.s);
      if (!cand.length) break;
      const q = cand[0].q;
      const vert = q.w > q.h || (q.w === q.h && rnd() < 0.5);
      const len = vert ? q.w : q.h, other = vert ? q.h : q.w;
      const cuts = [];
      for (let a = 1; a < len; a++) if (a * other >= minA && (len - a) * other >= minA) cuts.push({ a, s: Math.abs(a - len / 2) + rnd() * len * 0.8 });
      if (!cuts.length) { rects = rects.filter(o => o !== q).concat([{ ...q, done: true }]); continue; }
      const a = cuts.sort((u, v) => u.s - v.s)[0].a;
      rects = rects.filter(o => o !== q).concat(vert
        ? [{ r: q.r, c: q.c, h: q.h, w: a }, { r: q.r, c: q.c + a, h: q.h, w: q.w - a }]
        : [{ r: q.r, c: q.c, h: a, w: q.w }, { r: q.r + a, c: q.c, h: q.h - a, w: q.w }]);
      if (rects.every(o => o.done)) break;
    }
    const id = new Array(N * N).fill(0);
    rects.forEach((q, i) => { for (let r = q.r; r < q.r + q.h; r++) for (let c = q.c; c < q.c + q.w; c++) id[r * N + c] = i; });
    // Fusions de pièces voisines (les plus petites d'abord) jusqu'au nombre voulu
    let n = rects.length;
    while (n > R) {
      const area = new Map();
      for (const v of id) area.set(v, (area.get(v) || 0) + 1);
      let best = null, bestS = Infinity;
      for (let k = 0; k < N * N; k++) {
        for (const j of [k + 1, k + N]) {
          if (j >= N * N || (j === k + 1 && j % N === 0) || id[j] === id[k]) continue;
          const s = area.get(id[k]) + area.get(id[j]) + rnd() * 3;
          if (s < bestS) { bestS = s; best = [id[k], id[j]]; }
        }
      }
      if (!best) break;
      for (let k = 0; k < N * N; k++) if (id[k] === best[1]) id[k] = best[0];
      n--;
    }
    // Numérotation dans l'ordre de lecture
    const renum = new Map();
    return id.map(v => { if (!renum.has(v)) renum.set(v, renum.size); return renum.get(v); });
  }

  /** Types des pièces : jamais deux fois le même si possible, le jardin au bord, les grands types aux grandes pièces. */
  function assignTypes(N, cellRoom, R, allowed, rnd) {
    const area = new Array(R).fill(0), edge = new Array(R).fill(0);
    cellRoom.forEach((v, k) => { area[v]++; const r = Math.floor(k / N), c = k % N; if (!r || !c || r === N - 1 || c === N - 1) edge[v]++; });
    const core = CORE_ROOMS.filter(t => allowed.includes(t));
    const list = [...core, ...MF.util.shuffle(allowed.filter(t => !core.includes(t)), rnd)];
    // Plus de pièces que de types : on répète les types (jamais un second jardin)
    const again = list.filter(t => t !== 'garden');
    const chosen = list.slice(0, R);
    for (let i = 0; chosen.length < R; i++) chosen.push((again.length ? again : list)[i % (again.length || list.length)]);
    const types = new Array(R).fill(null);
    if (chosen.includes('garden')) {
      const g = [...area.keys()].filter(v => edge[v]).sort((a, b) => edge[b] * 2 + area[b] - edge[a] * 2 - area[a])[0];
      if (g !== undefined) { types[g] = 'garden'; chosen.splice(chosen.indexOf('garden'), 1); }
      else chosen[chosen.indexOf('garden')] = list.find(t => t !== 'garden' && !chosen.includes(t)) || 'living';
    }
    const rooms = [...area.keys()].filter(v => !types[v]).sort((a, b) => area[b] - area[a] || a - b);
    const byPref = chosen.map(t => ({ t, s: ROOMS[t].size + rnd() * 1.2 })).sort((a, b) => b.s - a.s).map(o => o.t);
    rooms.forEach((v, i) => { types[v] = byPref[i]; });
    return types;
  }

  const DENSITY = { sparse: 0.17, normal: 0.3, full: 0.42 };

  /** Meubles : selon le type de chaque pièce, en laissant assez de cases libres par ligne et colonne. */
  function furnish(N, cellRoom, types, density, rnd) {
    const frac = DENSITY[density] ?? DENSITY.normal;
    const NN = N * N, obj = new Array(NN).fill(null);
    const rowB = new Array(N).fill(0), colB = new Array(N).fill(0), maxB = N - 3;
    const wall = k => {
      const r = Math.floor(k / N), c = k % N;
      return !r || !c || r === N - 1 || c === N - 1 || [k - 1, k + 1, k - N, k + N].some(j => j >= 0 && j < NN && Math.abs((j % N) - c) <= 1 && cellRoom[j] !== cellRoom[k]);
    };
    types.forEach((type, v) => {
      const cells = [];
      cellRoom.forEach((w, k) => { if (w === v) cells.push(k); });
      const n = Math.min(cells.length, Math.max(1, Math.round(cells.length * frac + rnd() - 0.5)));
      const pool = ROOMS[type].objects;
      let blocked = 0;
      for (let i = 0, tries = 0; i < n && tries < n * 4; tries++) {
        const t = i === 0 && tries === 0 ? pool[0] : pool[Math.floor(rnd() * pool.length)];
        const o = OBJECTS[t];
        if (o.one && cells.some(k => obj[k] === t)) continue;
        // Toujours au moins une case praticable dans la pièce
        if (!o.occupiable && blocked + 1 >= cells.length) continue;
        let free = cells.filter(k => !obj[k] && (o.occupiable || (rowB[Math.floor(k / N)] < maxB && colB[k % N] < maxB)));
        if (o.wall && free.some(wall)) free = free.filter(wall);
        if (!free.length) continue;
        const k = free[Math.floor(rnd() * free.length)];
        obj[k] = t; i++;
        if (!o.occupiable) { blocked++; rowB[Math.floor(k / N)]++; colB[k % N]++; }
      }
    });
    return obj;
  }

  /** Une disposition au hasard (une personne par ligne et colonne, hors objets bloquants), souvent sur les meubles occupables. */
  function placeAll(N, obj, rnd) {
    const block = obj.map(o => !!o && !OBJECTS[o].occupiable);
    const cols = new Array(N).fill(-1), used = new Array(N).fill(false);
    let steps = 0;
    const rec = r => {
      if (r === N) return true;
      if (++steps > 4000) return false;
      const order = [...Array(N).keys()].map(c => ({ c, s: rnd() - (obj[r * N + c] ? 0.35 : 0) })).sort((a, b) => a.s - b.s);
      for (const { c } of order) {
        if (used[c] || block[r * N + c]) continue;
        used[c] = true; cols[r] = c;
        if (rec(r + 1)) return true;
        used[c] = false;
      }
      return false;
    };
    return rec(0) ? cols.map((c, r) => r * N + c) : null;
  }

  /** Réserve d'indices vrais pour la solution (aucun ne désigne le coupable directement). */
  function cluePool(pz, x, pos, rnd) {
    const out = [];
    const { N, room, obj } = x;
    const ids = pz.people.map(p => p.id);
    const kv = pos[x.victim], vRoom = room[kv];
    const killer = x.idx.get(pz.murderer);
    const cnt = new Array(x.R).fill(0);
    for (const k of pos) cnt[room[k]]++;
    const pick = (arr, n) => MF.util.shuffle(arr, rnd).slice(0, n);
    const present = [...new Set(obj.filter(Boolean))];
    pos.forEach((k, i) => {
      const person = ids[i], r = Math.floor(k / N), c = k % N, R = room[k];
      if (!(i === killer && R === vRoom)) out.push({ kind: 'inRoom', person, room: R });
      for (const v of pick([...Array(x.R).keys()].filter(v => v !== R), 3)) out.push({ kind: 'notInRoom', person, room: v });
      if (obj[k]) out.push({ kind: 'onObject', person, object: obj[k] });
      const near = new Set(x.near[k].map(j => obj[j]).filter(Boolean));
      for (const t of near) out.push({ kind: 'besideObject', person, object: t });
      for (const t of pick(present.filter(t => !near.has(t)), 2)) out.push({ kind: 'notBesideObject', person, object: t });
      out.push({ kind: !r || !c || r === N - 1 || c === N - 1 ? 'edge' : 'notEdge', person });
      out.push({ kind: 'row', person, row: r }, { kind: 'column', person, col: c });
      const rowT = new Set(), colT = new Set();
      for (let j = 0; j < N; j++) {
        if (j !== c && obj[r * N + j]) rowT.add(obj[r * N + j]);
        if (j !== r && obj[j * N + c]) colT.add(obj[j * N + c]);
      }
      for (const t of pick([...rowT], 2)) out.push({ kind: 'sameRow', person, object: t });
      for (const t of pick([...colT], 2)) out.push({ kind: 'sameColumn', person, object: t });
      if (cnt[R] === 1) out.push({ kind: 'alone', person });
    });
    for (let i = 0; i < ids.length; i++) {
      for (let j = i + 1; j < ids.length; j++) {
        const [a, b] = rnd() < 0.5 ? [i, j] : [j, i];
        const ka = pos[a], kb = pos[b];
        if (room[ka] === room[kb]) { if (!(a === killer || b === killer) || !(a === x.victim || b === x.victim)) out.push({ kind: 'withPerson', a: ids[a], b: ids[b] }); }
        else out.push({ kind: 'notWith', a: ids[a], b: ids[b] });
        const v = rnd() < 0.5 ? 'above' : 'below', h = rnd() < 0.5 ? 'leftOf' : 'rightOf';
        out.push(pairTest(v, x, ka, kb) ? { kind: v, a: ids[a], b: ids[b] } : { kind: v, a: ids[b], b: ids[a] });
        out.push(pairTest(h, x, ka, kb) ? { kind: h, a: ids[a], b: ids[b] } : { kind: h, a: ids[b], b: ids[a] });
      }
    }
    for (let v = 0; v < x.R; v++) {
      if (!cnt[v]) out.push({ kind: 'emptyRoom', room: v });
      else if (v !== vRoom) out.push({ kind: 'roomCount', room: v, n: cnt[v] });
    }
    return out;
  }

  /** Nombre de pièces voulu. */
  function roomCount(N, rooms) {
    if (Number.isFinite(+rooms) && +rooms > 0) return MF.util.clamp(Math.round(+rooms), 2, Math.floor((N * N) / 2));
    return Math.max(2, Math.round((N * N) / ({ few: 10, many: 5 }[rooms] || 7)));
  }

  /** Prénoms : ceux fournis d'abord, puis la liste par défaut (initiales distinctes si possible). */
  function pickNames(n, lang, custom, victimName, rnd, pool = NAMES[lang] || NAMES.fr, victims = VICTIMS[lang] || VICTIMS.fr) {
    const clean = s => MF.util.cleanText(s, 20);
    const seen = new Set();
    const out = [];
    for (const s of custom || []) { const v = clean(s); if (v && !seen.has(v.toLowerCase()) && out.length < n) { seen.add(v.toLowerCase()); out.push(v); } }
    const init = () => new Set([...out].map(s => s[0].toUpperCase()));
    for (const s of MF.util.shuffle(pool, rnd)) {
      if (out.length >= n) break;
      if (!seen.has(s.toLowerCase()) && !init().has(s[0])) { seen.add(s.toLowerCase()); out.push(s); }
    }
    for (const s of [...pool, ...(NAMES[lang] || NAMES.fr)]) if (out.length < n && !seen.has(s.toLowerCase())) { seen.add(s.toLowerCase()); out.push(s); }
    let victim = clean(victimName || '');
    if (!victim || seen.has(victim.toLowerCase())) {
      const vs = MF.util.shuffle(victims, rnd);
      victim = vs.find(s => !init().has(s[0]) && !seen.has(s.toLowerCase())) || vs.find(s => !seen.has(s.toLowerCase())) || 'X';
    }
    return { suspects: out, victim };
  }

  /** Une tentative de génération (null si la disposition ne convient pas). */
  function attempt(o, seed) {
    const rnd = MF.util.rng(seed);
    const N = o.size;
    const R = roomCount(N, o.rooms);
    const cells1 = partition(N, R, rnd, o.rooms === 'many' || R * 2 > N * N / 2 ? 1 : 2);
    const nR = Math.max(...cells1) + 1;
    const types = assignTypes(N, cells1, nR, o.roomTypes, rnd);
    const obj = furnish(N, cells1, types, o.density, rnd);
    // Disposition avec une pièce à deux personnes (la victime et le coupable)
    let pos = null, duo = null;
    for (let t = 0; t < 30 && !duo; t++) {
      pos = placeAll(N, obj, rnd);
      if (!pos) return null;
      const cnt = new Array(nR).fill(0);
      for (const k of pos) cnt[cells1[k]]++;
      const pairs = [...cnt.keys()].filter(v => cnt[v] === 2);
      if (pairs.length) duo = pairs[Math.floor(rnd() * pairs.length)];
    }
    if (duo === null) return null;
    const inDuo = MF.util.shuffle(pos.filter(k => cells1[k] === duo), rnd);
    const others = MF.util.shuffle(pos.filter(k => cells1[k] !== duo), rnd);
    // Suspects p0…p(N-2), victime p(N-1) ; le coupable est un suspect au hasard
    const killer = Math.floor(rnd() * (N - 1));
    const cellOf = [];
    for (let i = 0, j = 0; i < N - 1; i++) cellOf.push(i === killer ? inDuo[1] : others[j++]);
    cellOf.push(inDuo[0]);
    const th = o.theme;
    const { suspects, victim } = pickNames(N - 1, o.lang, o.names, o.victimName, rnd, th?.names?.length ? th.names : undefined, th?.victims?.length ? th.victims : undefined);
    const people = cellOf.map((k, i) => ({
      id: `p${i}`, name: i < N - 1 ? suspects[i] : victim, color: i < N - 1 ? COLORS[i % COLORS.length] : VICTIM_COLOR,
      role: i < N - 1 ? 'suspect' : 'victim', r: Math.floor(k / N), c: k % N,
    }));
    const cells = [];
    for (let r = 0; r < N; r++) cells.push(cells1.slice(r * N, r * N + N));
    const pz = {
      engine: 'murdoku', v: 1, size: N, seed: o.seed, lang: o.lang,
      rooms: types.map((type, id) => ({ id, type, ...roomLook(th?.rooms?.[type]) })),
      cells,
      objects: obj.map((type, k) => (type ? { type, r: Math.floor(k / N), c: k % N } : null)).filter(Boolean),
      people, victim: `p${N - 1}`, murderer: `p${killer}`, clues: [], difficulty: o.difficulty,
    };
    // Habillage (univers) : noms des objets présents, histoire
    if (th) {
      pz.theme = th.id;
      const names = {};
      for (const t of new Set(obj.filter(Boolean))) if (th.objects?.[t]) names[t] = { ...th.objects[t], ...(th.icons?.[t] ? { icon: th.icons[t] } : {}) };
      if (Object.keys(names).length) pz.objectNames = names;
      if (th.story) pz.story = String(th.story).replace(/\{victim\}/g, victim);
    }
    const x = context(pz);
    // Expert : jamais de ligne ni de colonne données (sauf en dernier recours)
    const kinds = o.difficulty === 'expert' && !o.fallback ? o.clueKinds.filter(k => k !== 'row' && k !== 'column') : o.clueKinds;
    const all = cluePool(pz, x, cellOf, rnd).filter(cl => kinds.includes(cl.kind));
    if (search(x, all, 2).length !== 1) return null;
    // Minimisation : on retire d'abord les sortes d'indices les moins adaptées à la difficulté
    const pref = PREF[o.difficulty];
    const order = all.map(cl => ({ cl, s: rnd() ** (1 / pref[cl.kind]) })).sort((a, b) => a.s - b.s).map(e => e.cl);
    const kept = new Set(order);
    const removed = [];
    // Par paquets : tant que ça passe on double le paquet, sinon on le réduit (jusqu'à un seul indice)
    for (let i = 0, step = 8; i < order.length;) {
      const part = order.slice(i, i + step);
      for (const cl of part) kept.delete(cl);
      if (search(x, [...kept], 2).length === 1) { removed.push(...part); i += part.length; step *= 2; continue; }
      for (const cl of part) kept.add(cl);
      if (step > 1) step = Math.ceil(step / 4);
      else { i++; step = 2; }
    }
    // Quelques indices redondants pour les niveaux faciles (les plus directs)
    const extra = removed.filter(cl => pref[cl.kind] >= 4).sort((a, b) => pref[b.kind] - pref[a.kind] || 0);
    for (const cl of MF.util.shuffle(extra, rnd).slice(0, EXTRA[o.difficulty])) kept.add(cl);
    pz.clues = MF.util.shuffle([...kept], rnd);
    return pz;
  }

  /** Types de pièces d'un univers (tous si l'univers n'en fixe pas assez). */
  const themeTypes = th => {
    const list = Array.isArray(th?.roomTypes) ? th.roomTypes.filter(t => ROOMS[t]) : [];
    return list.length >= 4 ? list : ROOM_TYPES;
  };
  /** Nom, phrase et couleurs d'une pièce habillée (champs absents si l'univers n'en donne pas). */
  function roomLook(r) {
    if (!r) return {};
    const out = {};
    if (r.name) out.name = String(r.name).slice(0, 40);
    if (r.in) out.in = String(r.in).slice(0, 60);
    if (Array.isArray(r.floor) && r.floor[0]) out.floor = r.floor.slice(0, 3);
    if (r.wall) out.wall = r.wall;
    return out;
  }

  /** Options validées. */
  function options(opts = {}) {
    const size = MF.util.clamp(Math.round(+opts.size || 6), 5, 8);
    const pick = (v, list, def) => (list.includes(v) ? v : def);
    const roomTypes = (Array.isArray(opts.roomTypes) ? opts.roomTypes.filter(t => ROOMS[t]) : []);
    const clueKinds = (Array.isArray(opts.clueKinds) ? opts.clueKinds.filter(k => KINDS.includes(k)) : []);
    return {
      size,
      rooms: Number.isFinite(+opts.rooms) && +opts.rooms > 0 ? +opts.rooms : pick(opts.rooms, ['few', 'normal', 'many'], 'normal'),
      difficulty: pick(opts.difficulty, LEVELS, 'medium'),
      density: pick(opts.density, ['sparse', 'normal', 'full'], 'normal'),
      lang: pick(opts.lang, ['fr', 'en'], 'fr'),
      names: Array.isArray(opts.names) ? opts.names.map(String) : [],
      victimName: typeof opts.victimName === 'string' ? opts.victimName : '',
      roomTypes: roomTypes.length ? roomTypes : themeTypes(opts.theme),
      clueKinds: clueKinds.length ? clueKinds : KINDS,
      theme: opts.theme && typeof opts.theme === 'object' ? opts.theme : null,
    };
  }

  /**
   * Génère un puzzle Murdoku (déterministe pour une graine donnée).
   * Si la disposition ne mène pas à une solution unique, on réessaie avec une graine dérivée ;
   * en dernier recours, les indices de ligne et de colonne sont autorisés.
   */
  function generate(opts = {}, seed = MF.util.randomSeed()) {
    const o = { ...options(opts), seed: seed >>> 0, fallback: false };
    for (let t = 0; t < 40; t++) {
      if (t === 30) { o.clueKinds = [...new Set([...o.clueKinds, 'row', 'column'])]; o.fallback = true; }
      const pz = attempt(o, (o.seed + Math.imul(t, 0x9e3779b9)) >>> 0);
      if (pz) return pz;
    }
    return null;
  }

  /* ---------------- Textes ---------------- */
  // Langue forcée : textes dans la langue de l'énigme (prénoms et lieux de l'univers), sinon de l'interface
  let forced = '';
  const t = (fr, params) => {
    if (forced && MF.i18n.tr) return MF.i18n.tr(forced, fr, params);
    if (forced === 'fr') return fr.split('|')[0].replace(/\{(\w+)\}/g, (m, k) => (params && k in params ? params[k] : m));
    return MF.i18n.t(fr, params);
  };

  /** [nom, « dans la … »] de chaque type de pièce. */
  const roomWords = () => ({
    living: [t('Salon'), t('dans le salon')],
    kitchen: [t('Cuisine'), t('dans la cuisine')],
    bedroom: [t('Chambre'), t('dans la chambre')],
    bathroom: [t('Salle de bain'), t('dans la salle de bain')],
    office: [t('Bureau|pièce'), t('dans le bureau')],
    library: [t('Bibliothèque'), t('dans la bibliothèque')],
    dining: [t('Salle à manger'), t('dans la salle à manger')],
    garden: [t('Jardin'), t('dans le jardin')],
    hall: [t('Entrée|pièce'), t("dans l'entrée")],
    music: [t('Salle de musique'), t('dans la salle de musique')],
    guest: [t("Chambre d'amis"), t("dans la chambre d'amis")],
    game: [t('Salle de jeux'), t('dans la salle de jeux')],
    veranda: [t('Véranda'), t('dans la véranda')],
    laundry: [t('Buanderie'), t('dans la buanderie')],
  });
  /** [nom, « un … », « sur un … » (objets occupables)] de chaque objet. */
  const objectWords = () => ({
    bed: [t('Lit'), t('un lit'), t('sur un lit')],
    sofa: [t('Canapé'), t('un canapé'), t('sur un canapé')],
    armchair: [t('Fauteuil'), t('un fauteuil'), t('dans un fauteuil')],
    chair: [t('Chaise'), t('une chaise'), t('sur une chaise')],
    rug: [t('Tapis'), t('un tapis'), t('sur un tapis')],
    bench: [t('Banc'), t('un banc'), t('sur un banc')],
    table: [t('Table'), t('une table')],
    desk: [t('Bureau|meuble'), t('un bureau')],
    plant: [t('Plante'), t('une plante')],
    bookshelf: [t('Étagère'), t('une étagère')],
    piano: [t('Piano'), t('un piano')],
    bath: [t('Baignoire'), t('une baignoire')],
    sink: [t('Lavabo'), t('un lavabo')],
    tv: [t('Télévision'), t('une télévision')],
    fireplace: [t('Cheminée'), t('une cheminée')],
    counter: [t('Plan de travail'), t('un plan de travail')],
    cabinet: [t('Armoire'), t('une armoire')],
    lamp: [t('Lampe'), t('une lampe')],
    tree: [t('Arbre'), t('un arbre')],
    fountain: [t('Fontaine'), t('une fontaine')],
  });

  const roomLabel = type => (roomWords()[type] || [type])[0];
  const objectLabel = type => (objectWords()[type] || [type])[0];
  /** Nom affiché d'une pièce d'une énigme (habillage de l'univers, sinon type ; numéroté si répété). */
  function roomName(pz, id) {
    const room = pz.rooms[id];
    if (!room) return '?';
    const same = pz.rooms.filter(r => r.type === room.type && (r.name || '') === (room.name || ''));
    const base = room.name || roomLabel(room.type);
    return same.length > 1 ? `${base} ${same.indexOf(room) + 1}` : base;
  }
  /** Nom affiché d'un objet d'une énigme. */
  const objectName = (pz, type) => pz?.objectNames?.[type]?.name || objectLabel(type);
  const rowLabel = r => String(r + 1);
  const colLabel = c => String.fromCharCode(65 + c);

  /** « de Bruno » / « d'Alice », « que Bruno » / « qu'Alice ». */
  const elide = (w, name) => (/^[aeiouyhàâäéèêëîïôöûü]/i.test(name) ? `${w.slice(0, -1)}'${name}` : `${w} ${name}`);
  const capFirst = s => (s ? s[0].toUpperCase() + s.slice(1) : s);

  /**
   * Formulations de chaque sorte d'indice (même sens, ton varié) : la variante dépend de l'indice
   * lui-même, donc reste stable d'un affichage à l'autre.
   */
  const PHRASES = () => ({
    inRoom: [t('{name} était {where}.'), t('Un témoin l\'affirme : {name} se trouvait {where}.'), t('{name} a passé la soirée {where}.')],
    notInRoom: [t("{name} n'était pas {where}."), t("{name} n'a jamais mis les pieds {where}.")],
    onObject: [t('{name} était {where}.'), t('{name} se tenait {where}.')],
    besideObject: [t("{name} était à côté d'{obj}."), t("{name} se tenait juste à côté d'{obj}.")],
    notBesideObject: [t("{name} n'était pas à côté d'{obj}."), t("Aucune case voisine {deName} n'avait {obj}.")],
    edge: [t('{name} était sur une case du bord du plan.'), t('{name} se tenait au bord du plan.')],
    notEdge: [t("{name} n'était pas au bord du plan."), t('{name} se tenait loin des bords du plan (aucune case du bord).')],
    row: [t('{name} était sur la ligne {n}.'), t('La ligne {n} : voilà où se trouvait {name}.')],
    column: [t('{name} était sur la colonne {col}.'), t('La colonne {col} : voilà où se trouvait {name}.')],
    sameRow: [t("{name} était sur la même ligne qu'{obj}."), t('Sur la ligne {deName}, il y avait aussi {obj}.')],
    sameColumn: [t("{name} était sur la même colonne qu'{obj}."), t('Sur la colonne {deName}, il y avait aussi {obj}.')],
    alone: [t("Personne d'autre n'était dans la même pièce {queName}."), t('{name} était seul·e dans sa pièce.')],
    withPerson: [t('{a} et {b} étaient dans la même pièce.'), t('{a} était dans la même pièce {queB}.')],
    notWith: [t("{a} et {b} n'étaient pas dans la même pièce."), t('{a} évitait {b} : pas dans la même pièce.')],
    above: [t('{a} était plus haut {queB}.'), t('{a} se trouvait sur une ligne au-dessus de celle {deB}.')],
    below: [t('{a} était plus bas {queB}.'), t('{a} se trouvait sur une ligne en dessous de celle {deB}.')],
    leftOf: [t('{a} était plus à gauche {queB}.'), t('{a} se trouvait sur une colonne à gauche de celle {deB}.')],
    rightOf: [t('{a} était plus à droite {queB}.'), t('{a} se trouvait sur une colonne à droite de celle {deB}.')],
    roomOne: [t('Il y avait une seule personne {where}.'), t('{Where}, une seule personne, pas une de plus.')],
    roomMany: [t('Il y avait {n} personnes {where}.'), t('{Where}, on comptait {n} personnes.')],
    emptyRoom: [t("Il n'y avait personne {where}."), t('{Where}, pas âme qui vive.')],
  });

  /** Phrase d'un indice, dans la langue de l'énigme (lang, sinon pz.lang, sinon celle de l'interface). */
  function clueText(cl, pz, lang = pz?.lang) {
    forced = lang === 'fr' || lang === 'en' ? lang : '';
    try {
      const name = id => pz.people.find(p => p.id === id)?.name ?? '?';
      const rw = roomWords(), ow = objectWords();
      const roomIn = id => {
        const room = pz.rooms[id];
        const type = room?.type;
        const base = room?.in || (rw[type] || [type, type])[1];
        const same = pz.rooms.filter(r => r.type === type && (r.in || '') === (room?.in || ''));
        return same.length > 1 ? `${base} ${same.indexOf(room) + 1}` : base;
      };
      const objA = type => pz.objectNames?.[type]?.a || (ow[type] || [type, type])[1];
      const objOn = type => pz.objectNames?.[type]?.on || (ow[type] || [])[2] || objA(type);
      const n = name(cl.person), a = name(cl.a), b = name(cl.b);
      const where = cl.room !== undefined ? roomIn(cl.room) : '';
      const params = {
        name: n, a, b, queB: elide('que', b), deB: elide('de', b), queName: elide('que', n), deName: elide('de', n),
        where: cl.kind === 'onObject' ? objOn(cl.object) : where, Where: capFirst(where),
        obj: cl.object ? objA(cl.object) : '', n: cl.kind === 'row' ? rowLabel(cl.row) : cl.n, col: cl.kind === 'column' ? colLabel(cl.col) : '',
      };
      const P = PHRASES();
      const key = cl.kind === 'roomCount' ? (cl.n === 1 ? 'roomOne' : 'roomMany') : cl.kind;
      const list = P[key];
      if (!list) return '';
      const h = parseInt(MF.util.hash(JSON.stringify(cl)), 36);
      return list[h % list.length].replace(/\{(\w+)\}/g, (m, k) => (k in params ? params[k] : m));
    } finally {
      forced = '';
    }
  }

  /** Règles du jeu, une phrase par règle. */
  const rulesText = () => [
    t('Chaque ligne et chaque colonne contient exactement une personne.'),
    t('Personne ne se tient sur un objet bloquant (table, plante, meuble…) : seulement sur une case libre ou un objet où l\'on peut s\'asseoir ou s\'allonger (lit, canapé, fauteuil, chaise, tapis, banc).'),
    t('« À côté » veut dire sur une case voisine, par un côté (pas en diagonale). « Plus haut » ou « plus à gauche » : n\'importe quelle distance.'),
    t('Le coupable est le seul suspect seul dans une pièce avec la victime.'),
    t('Les indices mènent à une seule disposition : à toi de démasquer le coupable !'),
  ];

  return {
    OBJECTS, ROOMS, ROOM_TYPES, NAMES, VICTIMS, COLORS, VICTIM_COLOR, KINDS, LEVELS,
    generate, options, solve, isSolved, murdererOf, validClue, holds: (pz, cl, placement) => holds(cl, context(pz), fromMap(pz, placement)),
    clueText, rulesText, roomLabel, objectLabel, roomName, objectName, rowLabel, colLabel,
  };
})();
