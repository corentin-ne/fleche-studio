// @ts-check
/* =========================================================================
   Jeux de dessin du registre MF.logicGames (voir logic-grids.js) :
     - coloriage magique : chaque case porte le numéro de sa couleur ; le
       dessin (emoji, forme, texte ou photo, en couleurs) est préparé dans
       la page (MF.logicInput) ;
     - points à relier : le contour d'un dessin devient une suite de points
       numérotés, à relier dans l'ordre.
   ========================================================================= */
window.MF = window.MF || {};

(() => {
  const K = MF.logicKit;
  const { t } = MF.i18n;
  const HEX = /^#[0-9a-f]{6}$/i;
  const CODES = '0123456789ABCDEFGHIJ';

  /** Dessin de secours : un cœur (le dessin n'a pas pu être préparé). */
  function heart(n) {
    const mask = MF.shapes.mask('heart', n, n, 0);
    return Array.from({ length: n }, (_, r) => Array.from({ length: n }, (_, c) => (mask[r * n + c] ? '1' : '0')).join(''));
  }

  /* ---------------- Coloriage magique ---------------- */
  (() => {
    function generate(o) {
      let pic = o.colors;
      const ok = pic && Array.isArray(pic.rows) && pic.rows.length >= 3 && Array.isArray(pic.palette) && pic.palette.length >= 2 && pic.palette.every(c => HEX.test(c));
      if (!ok) pic = { rows: heart(K.clamp(o.size || 16, 6, 40)), palette: ['#ffffff', '#e4405f'] };
      const h = pic.rows.length, w = pic.rows[0].length;
      return { kind: 'coloriage', w, h, rows: pic.rows.slice(), palette: pic.palette.slice(0, CODES.length) };
    }
    function sanitize(p, out) {
      const w = K.int(p.w, 3, 50), h = K.int(p.h, 3, 50);
      if (!w || !h || !Array.isArray(p.palette) || p.palette.length < 2 || p.palette.length > CODES.length || !p.palette.every(c => typeof c === 'string' && HEX.test(c))) return null;
      const re = new RegExp(`^[${CODES.slice(0, p.palette.length)}]+$`);
      if (!K.grid(p.rows, w, h, re)) return null;
      return Object.assign(out, { w, h, rows: p.rows.slice(), palette: p.palette.map(c => c.toLowerCase()) });
    }
    function model(page, { kit }) {
      const { w, h, rows, palette } = page;
      const m = kit.base('coloriage', w, h, { toggle: 'paint', palette });
      m.cells = kit.grid(h, w, (r, c) => {
        const ch = rows[r][c];
        return kit.letter(ch, { mark: 'paint', label: ch === '0' ? '' : String(CODES.indexOf(ch)) });
      });
      m.legend = palette.slice(1).map((color, i) => ({ num: i + 1, color }));
      m.note = t('Colorie chaque case numérotée avec la couleur de son numéro. Les cases sans numéro restent blanches.');
      return m;
    }
    MF.logicGames.coloriage = { defaults: { size: 20, source: 'emoji' }, generate, sanitize, model, picture: 'colors', CODES };
  })();

  /* ---------------- Points à relier ---------------- */
  (() => {
    /** Contour extérieur de la plus grande zone de cases pleines : sommets de la grille, dans l'ordre. */
    function outline(rows) {
      const h = rows.length, w = rows[0].length;
      // Deux cases qui ne se touchent que par un coin : on comble l'angle (un seul contour, sans pincement)
      const g = rows.map(r => [...r]);
      for (let r = 0; r + 1 < h; r++) {
        for (let c = 0; c + 1 < w; c++) {
          const [a, b, x, d] = [g[r][c], g[r][c + 1], g[r + 1][c], g[r + 1][c + 1]];
          if (a === '1' && d === '1' && b !== '1' && x !== '1') g[r][c + 1] = '1';
          else if (b === '1' && x === '1' && a !== '1' && d !== '1') g[r][c] = '1';
        }
      }
      const on = (r, c) => r >= 0 && c >= 0 && r < h && c < w && g[r][c] === '1';
      // Plus grande zone
      const comp = new Int32Array(w * h).fill(-1);
      let best = -1, size = 0;
      for (let s = 0, id = 0; s < w * h; s++) {
        if (!on(Math.floor(s / w), s % w) || comp[s] >= 0) continue;
        const stack = [s]; comp[s] = id; let n = 0;
        while (stack.length) {
          const x = stack.pop(); n++;
          for (const q of K.neighbors(x, w, h)) if (on(Math.floor(q / w), q % w) && comp[q] < 0) { comp[q] = id; stack.push(q); }
        }
        if (n > size) { size = n; best = id; }
        id++;
      }
      if (best < 0) return [];
      const inside = (r, c) => on(r, c) && comp[r * w + c] === best;
      // Côtés de bord orientés (l'intérieur à droite) : sommet de départ -> sommet d'arrivée
      const next = new Map();
      const key = (x, y) => y * (w + 1) + x;
      for (let r = 0; r < h; r++) {
        for (let c = 0; c < w; c++) {
          if (!inside(r, c)) continue;
          if (!inside(r - 1, c)) next.set(key(c, r), [c + 1, r]);
          if (!inside(r, c + 1)) next.set(key(c + 1, r), [c + 1, r + 1]);
          if (!inside(r + 1, c)) next.set(key(c + 1, r + 1), [c, r + 1]);
          if (!inside(r, c - 1)) next.set(key(c, r + 1), [c, r]);
        }
      }
      // Départ : le sommet le plus haut à gauche, puis on suit le bord
      let start = null;
      for (let r = 0; r < h && !start; r++) for (let c = 0; c < w && !start; c++) if (inside(r, c)) start = [c, r];
      const pts = [];
      let cur = start;
      for (let guard = 0; guard < 4 * w * h; guard++) {
        pts.push(cur);
        const nx = next.get(key(cur[0], cur[1]));
        if (!nx) break;
        cur = nx;
        if (cur[0] === start[0] && cur[1] === start[1]) break;
      }
      return pts;
    }
    /** Simplification (Douglas-Peucker) d'un tracé ouvert. */
    function simplify(pts, eps) {
      if (pts.length < 3) return pts;
      const [a, b] = [pts[0], pts[pts.length - 1]];
      const dx = b[0] - a[0], dy = b[1] - a[1], len = Math.hypot(dx, dy) || 1;
      let far = 0, at = 0;
      for (let i = 1; i < pts.length - 1; i++) {
        const d = Math.abs(dy * pts[i][0] - dx * pts[i][1] + b[0] * a[1] - b[1] * a[0]) / len;
        if (d > far) { far = d; at = i; }
      }
      if (far <= eps) return [a, b];
      return [...simplify(pts.slice(0, at + 1), eps).slice(0, -1), ...simplify(pts.slice(at), eps)];
    }
    /** Contour fermé ramené à environ `count` points (précision cherchée par dichotomie). */
    function reduce(loop, count) {
      if (loop.length <= count) return loop;
      const half = Math.floor(loop.length / 2);
      const run = eps => [...simplify(loop.slice(0, half + 1), eps).slice(0, -1), ...simplify([...loop.slice(half), loop[0]], eps).slice(0, -1)];
      let lo = 0, hi = 20, best = run(0.5);
      for (let k = 0; k < 24; k++) {
        const mid = (lo + hi) / 2, res = run(mid);
        if (res.length > count) lo = mid; else { hi = mid; best = res; }
      }
      return best;
    }
    function generate(o, rnd) {
      const rows = o.picture?.rows?.length >= 3 && o.picture.rows.some(r => r.includes('1')) ? o.picture.rows : heart(48);
      const count = { easy: 18, medium: 32, hard: 50, expert: 75 }[o.level] || 32;
      let pts = reduce(outline(rows), count);
      if (pts.length < 3) pts = reduce(outline(heart(48)), count);
      // Départ au hasard sur le contour (le dessin ne se devine pas au premier point)
      const s = Math.floor(rnd() * pts.length);
      pts = [...pts.slice(s), ...pts.slice(0, s)];
      const xs = pts.map(p => p[0]), ys = pts.map(p => p[1]);
      const x0 = Math.min(...xs), y0 = Math.min(...ys);
      const span = Math.max(Math.max(...xs) - x0, Math.max(...ys) - y0) || 1;
      const norm = pts.map(([x, y]) => [Math.round(((x - x0) / span) * 1000), Math.round(((y - y0) / span) * 1000)]);
      const w = Math.max(...norm.map(p => p[0])), h = Math.max(...norm.map(p => p[1]));
      return { kind: 'points', w: Math.max(1, w), h: Math.max(1, h), pts: norm };
    }
    function sanitize(p, out) {
      const w = K.int(p.w, 1, 1000), h = K.int(p.h, 1, 1000);
      if (!w || !h || !Array.isArray(p.pts) || p.pts.length < 3 || p.pts.length > 200) return null;
      if (!p.pts.every(q => Array.isArray(q) && K.int(q[0], 0, 1000) !== null && K.int(q[1], 0, 1000) !== null)) return null;
      return Object.assign(out, { w, h, pts: p.pts.map(q => [q[0], q[1]]) });
    }
    function model(page, { kit }) {
      const { w, h, pts } = page;
      // Planche de 10 cases sur le grand côté, marge d'une demi-case
      const big = Math.max(w, h), cols = Math.max(3, Math.round((10 * w) / big) + 1), rows = Math.max(3, Math.round((10 * h) / big) + 1);
      const m = kit.base('points', cols, rows, { shape: 'free', play: 'dots' });
      m.cells = kit.grid(rows, cols, () => ({ type: 'out' }));
      const k = 10 / big;
      m.dots = pts.map(([x, y], i) => ({ x: 0.5 + x * k, y: 0.5 + y * k, n: i + 1 }));
      m.note = t('Relie les points dans l\'ordre, de 1 à {n}, puis reviens au 1.', { n: pts.length });
      return m;
    }
    MF.logicGames.points = { defaults: { source: 'emoji' }, generate, sanitize, model, picture: true, outline, reduce };
  })();

  /* ---------------- Les 7 différences (univers du Murdoku) ---------------- */
  // Un plateau d'univers du Murdoku (pièces, meubles de chaque pièce, personnages) en deux versions : à droite
  // (ou en bas), quelques cases ont changé. Le décor de l'univers est préparé dans la page (MF.logicInput) ;
  // la page dessine les deux plateaux en 3D quand elle le peut (MF.diff3d), sinon en plan.
  //   a, b   contenu de chaque case : '' | 'o<k>' (meuble objs[k]) | 'p<k>' (personnage de couleur people[k])
  //   salt   cases dont seul le petit décor 3D change (difficile, expert ; invisibles sur le plan)
  (() => {
    const ITEM = /^(|o\d{1,2}|p\d)$/;
    const EMOJI = /^[^<>&"'\\\s]{1,12}$/u;
    const WORD = /^[a-z]{2,16}$/;
    const FALLBACK = {
      kinds: [['living', '#c8a27a'], ['kitchen', '#e9e1cf'], ['bedroom', '#b9a7d6'], ['bathroom', '#cfe3ea'], ['office', '#b98d62'], ['garden', '#8fc07a']].map(([type, c]) => ({ type, floor: ['plain', c, c], wall: '#5a4636', open: type === 'garden' })),
      objs: ['sofa', 'bed', 'chair', 'plant', 'bookshelf', 'piano', 'bath', 'lamp', 'table', 'cabinet', 'tree', 'bench'],
      icons: ['🛋️', '🛏️', '🪑', '🪴', '📚', '🎹', '🛁', '💡', '🍽️', '🗄️', '🌳', '🪵'],
      people: ['#e69f00', '#56b4e9', '#009e73', '#f0e442', '#0072b2', '#d55e00', '#cc79a7'],
    };
    const LIGHTS = new Set(['lamp', 'fireplace']);
    const kindOk = k => K.isObj(k) && WORD.test(k.type) && Array.isArray(k.floor) && k.floor.length === 3 && WORD.test(k.floor[0]) && HEX.test(k.floor[1]) && HEX.test(k.floor[2]) && HEX.test(k.wall);
    function generate(o, rnd) {
      const sc0 = o.scene;
      const sc = sc0 && Array.isArray(sc0.kinds) && sc0.kinds.filter(kindOk).length >= 2 && Array.isArray(sc0.objs) && sc0.objs.length >= 3 && sc0.objs.length === sc0.icons?.length ? sc0 : FALLBACK;
      const kinds = sc.kinds.filter(kindOk).slice(0, 14).map(k => ({ type: k.type, floor: k.floor.slice(), wall: k.wall, open: !!k.open }));
      const pairs = sc.objs.map((t, i) => [t, sc.icons[i]]).filter(([t, e]) => WORD.test(t) && EMOJI.test(e)).slice(0, 40);
      const objs = pairs.map(x => x[0]), icons = pairs.map(x => x[1]);
      const people = (sc.people || FALLBACK.people).filter(c => HEX.test(c)).slice(0, 8);
      const n = K.clamp(o.size || 6, 5, 8), N = n * n;
      // Pièces : deux pièces voisines n'ont pas le même type ; peu de jardins (pièces ouvertes)
      const owner = K.renumber(K.partition(n, n, rnd, [3, 4, 5, 6, 7, 8]));
      const R = Math.max(...owner) + 1;
      const room = new Array(R).fill(-1);
      for (let id = 0; id < R; id++) {
        const near = new Set();
        owner.forEach((v, i) => { if (v === id) K.neighbors(i, n, n).forEach(q => { if (owner[q] !== id && room[owner[q]] >= 0) near.add(room[owner[q]]); }); });
        const ok = [...kinds.keys()].filter(k => !near.has(k) && (!kinds[k].open || rnd() < 0.3));
        room[id] = K.pick(ok.length ? ok : [...kinds.keys()], rnd);
      }
      // Meubles de chaque pièce (ceux que le Murdoku y met), personnages sur les cases libres
      const fits = i => {
        const list = MF.murdoku?.ROOMS?.[kinds[room[owner[i]]].type]?.objects || [];
        const ks = [...new Set(list.map(t => objs.indexOf(t)).filter(k => k >= 0))];
        return ks.length ? ks : [...objs.keys()];
      };
      // Plus le niveau monte, plus le plateau est chargé (meubles, personnages ; le petit décor 3D aussi)
      const lv = Math.max(0, ['easy', 'medium', 'hard', 'expert'].indexOf(o.level));
      const objRate = [0.34, 0.42, 0.48, 0.52][lv] ?? 0.42, pplRate = ([1, 1.3, 1.6, 1.9][lv] ?? 1.3) / n;
      const a = new Array(N).fill('');
      for (let i = 0; i < N; i++) {
        const x = rnd();
        if (x < objRate) a[i] = `o${K.pick(fits(i), rnd)}`;
        else if (x < objRate + pplRate) a[i] = `p${Math.floor(rnd() * people.length)}`;
      }
      // Différences : jamais deux dans des cases voisines (même par un coin)
      const count = { easy: 5, medium: 7, hard: 9, expert: 12 }[o.level] || 7;
      const subtle = o.level === 'hard' || o.level === 'expert';
      const other = (len, k) => (k + 1 + Math.floor(rnd() * Math.max(1, len - 1))) % len;
      // Lampes et cheminées éclairent toute une zone en 3D : jamais une différence
      const light = k => LIGHTS.has(objs[k]);
      const calm = list => list.filter(k => !light(k));
      const saltRate = [0, 0.2, 0.45, 0.6][lv] ?? 0.2;
      const b = a.slice(), salt = [], diffs = [];
      for (const i of K.shuffle([...Array(N).keys()], rnd)) {
        if (diffs.length >= count) break;
        if (diffs.some(d => d === i || K.neighbors(d, n, n, true).includes(i))) continue;
        const cur = a[i];
        if (cur[0] === 'o' && light(+cur.slice(1))) continue;
        if (!cur && rnd() < saltRate) { salt.push(i); diffs.push(i); continue; }
        const swap = calm(fits(i).filter(k => k !== +cur.slice(1)));
        if (cur[0] === 'o') b[i] = (subtle || rnd() < 0.55) && swap.length ? `o${K.pick(swap, rnd)}` : '';
        else if (cur[0] === 'p') b[i] = subtle || rnd() < 0.5 ? `p${other(people.length, +cur.slice(1))}` : '';
        else if (calm(fits(i)).length && rnd() < 0.65) b[i] = `o${K.pick(calm(fits(i)), rnd)}`;
        else b[i] = `p${Math.floor(rnd() * people.length)}`;
        if (b[i] !== a[i]) diffs.push(i);
      }
      const theme = /^[a-z0-9-]{1,24}$/.test(o.universe || '') ? o.universe : 'manor';
      return { kind: 'differences', n, seed: 1 + Math.floor(rnd() * 1e9), theme, kinds, rooms: K.regionRows(owner, n, n), room, objs, icons, people, a, b, salt: salt.sort((x, y) => x - y) };
    }
    function sanitize(p, out) {
      const n = K.int(p.n, 4, 10);
      if (!n || !Array.isArray(p.kinds) || !p.kinds.length || p.kinds.length > 20 || !p.kinds.every(kindOk)) return null;
      if (!Array.isArray(p.objs) || !Array.isArray(p.icons) || !p.objs.length || p.objs.length > 40 || p.objs.length !== p.icons.length) return null;
      if (!p.objs.every(t => typeof t === 'string' && WORD.test(t)) || !p.icons.every(x => typeof x === 'string' && EMOJI.test(x))) return null;
      if (!Array.isArray(p.people) || !p.people.length || p.people.length > 10 || !p.people.every(c => typeof c === 'string' && HEX.test(c))) return null;
      if (!K.grid(p.rooms, n, n, /^[A-Za-z0-9]+$/)) return null;
      const R = Math.max(...K.regionsOf(p.rooms)) + 1;
      if (!Array.isArray(p.room) || p.room.length !== R || !p.room.every(k => K.int(k, 0, p.kinds.length - 1) !== null)) return null;
      const items = x => Array.isArray(x) && x.length === n * n && x.every(v => typeof v === 'string' && ITEM.test(v) && (v === '' || +v.slice(1) < (v[0] === 'o' ? p.objs.length : p.people.length)));
      if (!items(p.a) || !items(p.b)) return null;
      const salt = (Array.isArray(p.salt) ? p.salt : []).filter(i => K.int(i, 0, n * n - 1) !== null).slice(0, 20);
      return Object.assign(out, {
        n, seed: K.int(p.seed, 1, 2 ** 31) ?? 1, theme: typeof p.theme === 'string' && /^[a-z0-9-]{1,24}$/.test(p.theme) ? p.theme : 'manor',
        kinds: p.kinds.map(k => ({ type: k.type, floor: k.floor.slice(), wall: k.wall, open: !!k.open })), rooms: p.rooms.slice(), room: p.room.slice(),
        objs: p.objs.slice(), icons: p.icons.slice(), people: p.people.slice(), a: p.a.slice(), b: p.b.slice(), salt,
      });
    }
    /** Modèle 3D : les deux images (préparées par MF.diff3d), l'une au-dessus de l'autre. */
    function model3d(page, img, kit) {
      const W = 10, H = Math.round((W * img.h / img.w) * 100) / 100, gap = 0.6;
      const m = kit.base('differences', W, Math.ceil(H * 2 + gap), { shape: 'free', play: 'spot' });
      m.cells = kit.grid(m.rows, W, () => ({ type: 'out' }));
      m.photos = [{ src: img.a, x: 0, y: 0, w: W, h: H }, { src: img.b, x: 0, y: H + gap, w: W, h: H }];
      m.spots = img.spots.map(([x, y, r]) => ({ x: x * W, y: H + gap + y * W, r: r * W }));
      m.offset3d = H + gap;
      m.note = t('Trouve les {n} différences : touche-les sur l\'une ou l\'autre image.', { n: m.spots.length });
      return m;
    }
    function model(page, { kit }) {
      const img = MF.diff3d?.ready(page);
      if (img) return model3d(page, img, kit);
      MF.diff3d?.request(page);
      const { n, a, b } = page;
      const owner = K.regionsOf(page.rooms);
      const item = v => (!v ? null : v[0] === 'o' ? { emoji: page.icons[+v.slice(1)] } : { token: page.people[+v.slice(1)] });
      const m = kit.base('differences', 2 * n + 1, n, { shape: 'free', toggle: 'path' });
      m.cells = kit.grid(n, 2 * n + 1, (r, c) => {
        if (c === n) return { type: 'out' };
        const right = c > n, cc = right ? c - n - 1 : c, i = r * n + cc;
        const bg = page.kinds[page.room[owner[i]]].floor[1];
        if (!right) return { type: 'scene', bg, item: item(a[i]) };
        return kit.letter(a[i] !== b[i] ? '1' : '0', { mark: 'diff', bg, item: item(b[i]) });
      });
      // Murs des pièces et contour, sur les deux plans
      const wall = page.kinds[page.room[0]].wall;
      const walls = kit.wallsOf(owner, n);
      for (const dx of [0, n + 1]) {
        m.walls.push(...walls.map(w => ({ ...w, x1: w.x1 + dx, x2: w.x2 + dx, color: wall })));
        m.walls.push({ x1: dx, y1: 0, x2: dx + n, y2: 0, color: wall }, { x1: dx, y1: n, x2: dx + n, y2: n, color: wall }, { x1: dx, y1: 0, x2: dx, y2: n, color: wall }, { x1: dx + n, y1: 0, x2: dx + n, y2: n, color: wall });
      }
      const k = a.filter((v, i) => v !== b[i]).length;
      m.note = t('Trouve les {n} différences : touche-les sur le plan de droite.', { n: k });
      return m;
    }
    /** Plateaux au format du Murdoku (rendu 3D) : version de gauche (`b` false) ou de droite. */
    function boards(page) {
      const { n } = page;
      const owner = K.regionsOf(page.rooms);
      const one = cells => ({
        engine: 'murdoku', v: 1, size: n, seed: page.seed, theme: page.theme,
        rooms: page.room.map((k, id) => ({ id, ...page.kinds[k] })),
        cells: Array.from({ length: n }, (_, r) => owner.slice(r * n, r * n + n)),
        objects: cells.flatMap((v, i) => (v[0] === 'o' ? [{ type: page.objs[+v.slice(1)], r: Math.floor(i / n), c: i % n, k: (i * 7 + 3) % 5 }] : [])),
        people: cells.flatMap((v, i) => (v[0] === 'p' ? [{ id: `d${v.slice(1)}`, name: '', color: page.people[+v.slice(1)], role: 'suspect', r: Math.floor(i / n), c: i % n }] : [])),
      });
      const B = one(page.b);
      B.clutterSalt = Object.fromEntries((page.salt || []).map(i => [`${Math.floor(i / n)},${i % n}`, 1]));
      return [one(page.a), B];
    }
    MF.logicGames.differences = { defaults: { size: 6 }, generate, sanitize, model, boards };
  })();
})();
