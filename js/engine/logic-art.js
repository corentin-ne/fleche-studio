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
  // Deux plans d'une même pièce de l'univers (sols, meubles, personnages) : à droite, quelques cases ont changé.
  // Le décor (couleurs des sols, meubles de l'univers, couleurs des personnages) est préparé dans la page.
  (() => {
    const ITEM = /^(|o\d{1,2}|p\d)$/;
    const EMOJI = /^[^<>&"'\\\s]{1,12}$/u;
    const FALLBACK = { floors: ['#e9d8b4', '#c9e4d6', '#d8d3ee', '#f3d1c8', '#d6e6f2', '#efe3a8'], icons: ['🛋️', '🛏️', '🪑', '🪴', '📚', '🎹', '🛁', '💡', '🍽️', '🗄️'], people: ['#e69f00', '#56b4e9', '#009e73', '#f0e442', '#0072b2', '#d55e00', '#cc79a7'], wall: '#5a4636' };
    function generate(o, rnd) {
      const sc = o.scene && Array.isArray(o.scene.floors) && o.scene.floors.length >= 2 && Array.isArray(o.scene.icons) && o.scene.icons.length >= 3 ? o.scene : FALLBACK;
      const n = K.clamp(o.size || 7, 5, 10), N = n * n;
      const floors = sc.floors.filter(c => HEX.test(c)).slice(0, 12), icons = sc.icons.filter(x => EMOJI.test(x)).slice(0, 40), people = (sc.people || FALLBACK.people).filter(c => HEX.test(c)).slice(0, 8);
      // Pièces, chacune son sol (deux pièces voisines n'ont pas le même)
      const owner = K.renumber(K.partition(n, n, rnd, [4, 6, 7, 8, 9, 10]));
      const R = Math.max(...owner) + 1;
      const floorOf = new Array(R).fill(-1);
      for (let id = 0; id < R; id++) {
        const near = new Set();
        owner.forEach((v, i) => { if (v === id) K.neighbors(i, n, n).forEach(q => { if (owner[q] !== id && floorOf[owner[q]] >= 0) near.add(floorOf[owner[q]]); }); });
        const ok = [...floors.keys()].filter(f => !near.has(f));
        floorOf[id] = K.pick(ok.length ? ok : [...floors.keys()], rnd);
      }
      // Meubles et personnes du plan de gauche
      const a = new Array(N).fill('');
      for (let i = 0; i < N; i++) {
        const x = rnd();
        if (x < 0.36) a[i] = `o${Math.floor(rnd() * icons.length)}`;
        else if (x < 0.36 + 0.9 / n) a[i] = `p${Math.floor(rnd() * people.length)}`;
      }
      // Différences : cases éloignées les unes des autres (jamais voisines, pour qu'un doigt ne se trompe pas)
      const count = { easy: 5, medium: 7, hard: 9, expert: 12 }[o.level] || 7;
      const subtle = o.level === 'hard' || o.level === 'expert';
      const b = a.slice(), diffs = [];
      for (const i of K.shuffle([...Array(N).keys()], rnd)) {
        if (diffs.length >= count) break;
        if (diffs.some(d => K.neighbors(d, n, n, true).includes(i))) continue;
        const cur = a[i];
        const other = (list, k) => { const j = (k + 1 + Math.floor(rnd() * (list.length - 1))) % list.length; return j; };
        if (cur[0] === 'o') b[i] = subtle || rnd() < 0.5 ? `o${other(icons, +cur.slice(1))}` : '';
        else if (cur[0] === 'p') b[i] = subtle || rnd() < 0.5 ? `p${other(people, +cur.slice(1))}` : '';
        else if (!subtle || rnd() < 0.3) b[i] = rnd() < 0.7 ? `o${Math.floor(rnd() * icons.length)}` : `p${Math.floor(rnd() * people.length)}`;
        if (b[i] !== a[i]) diffs.push(i);
      }
      return { kind: 'differences', n, floors, icons, people, wall: HEX.test(sc.wall || '') ? sc.wall : FALLBACK.wall, rooms: K.regionRows(owner, n, n), floor: floorOf, a, b };
    }
    function sanitize(p, out) {
      const n = K.int(p.n, 4, 12);
      if (!n) return null;
      const colors = x => Array.isArray(x) && x.length >= 1 && x.length <= 40 && x.every(c => typeof c === 'string' && HEX.test(c));
      if (!colors(p.floors) || !colors(p.people) || !Array.isArray(p.icons) || !p.icons.length || p.icons.length > 40 || !p.icons.every(x => typeof x === 'string' && EMOJI.test(x))) return null;
      if (!K.grid(p.rooms, n, n, /^[A-Za-z0-9]+$/)) return null;
      const R = Math.max(...K.regionsOf(p.rooms)) + 1;
      if (!Array.isArray(p.floor) || p.floor.length !== R || !p.floor.every(f => K.int(f, 0, p.floors.length - 1) !== null)) return null;
      const items = x => Array.isArray(x) && x.length === n * n && x.every(v => typeof v === 'string' && ITEM.test(v) && (v === '' || +v.slice(1) < (v[0] === 'o' ? p.icons.length : p.people.length)));
      if (!items(p.a) || !items(p.b)) return null;
      return Object.assign(out, { n, floors: p.floors.slice(), icons: p.icons.slice(), people: p.people.slice(), wall: HEX.test(p.wall || '') ? p.wall : FALLBACK.wall, rooms: p.rooms.slice(), floor: p.floor.slice(), a: p.a.slice(), b: p.b.slice() });
    }
    function model(page, { kit }) {
      const { n, a, b } = page;
      const owner = K.regionsOf(page.rooms);
      const item = v => (!v ? null : v[0] === 'o' ? { emoji: page.icons[+v.slice(1)] } : { token: page.people[+v.slice(1)] });
      const m = kit.base('differences', 2 * n + 1, n, { shape: 'free', toggle: 'path' });
      m.cells = kit.grid(n, 2 * n + 1, (r, c) => {
        if (c === n) return { type: 'out' };
        const right = c > n, cc = right ? c - n - 1 : c, i = r * n + cc;
        const bg = page.floors[page.floor[owner[i]]];
        if (!right) return { type: 'scene', bg, item: item(a[i]) };
        return kit.letter(a[i] !== b[i] ? '1' : '0', { mark: 'diff', bg, item: item(b[i]) });
      });
      // Murs des pièces et contour, sur les deux plans
      const walls = kit.wallsOf(owner, n);
      for (const dx of [0, n + 1]) {
        m.walls.push(...walls.map(w => ({ ...w, x1: w.x1 + dx, x2: w.x2 + dx, color: page.wall })));
        m.walls.push({ x1: dx, y1: 0, x2: dx + n, y2: 0, color: page.wall }, { x1: dx, y1: n, x2: dx + n, y2: n, color: page.wall }, { x1: dx, y1: 0, x2: dx, y2: n, color: page.wall }, { x1: dx + n, y1: 0, x2: dx + n, y2: n, color: page.wall });
      }
      const k = a.filter((v, i) => v !== b[i]).length;
      m.note = t('Trouve les {n} différences : touche-les sur le plan de droite.', { n: k });
      return m;
    }
    MF.logicGames.differences = { defaults: { size: 7 }, generate, sanitize, model };
  })();
})();
