// The Murdoku board as a diorama: a plinth, one floor per room (building-builder
// pattern materials), low cut-away walls with dark section caps (like
// building-builder's "Inside" view), door gaps with stone sills, a subtle grid,
// row/column labels and one piece of furniture per object cell.
import * as THREE from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
import { Builder, handmade, patternMaterial, rng, seedBuilders, foliage } from './geo.js';
import { buildObject } from './furniture.js';
import { buildClutter, PROPS } from './clutter.js';
import { PLANTS, LANDMARKS } from './deco.js';
import { styleFor, WALL_COLORS } from './styles.js';

export const CELL = 2; // one board cell, in metres
export const WALL_H = 0.42;
export const WALL_T = 0.14;
export const MARGIN = 0.95; // plinth border around the board (labels live here)
export const PLINTH_H = 0.7;
const SUB = 5; // floor subdivisions per cell (the wobble bends the floors)
const CAP = '#1d1b1c';
const FACADE = '#efe6c8';

// floor pattern, colours, texture repeats per cell; wall colour
export const ROOM_STYLE = {
  living: { floor: ['parquet', '#d9a066', '#8a5a36', 1.5], wall: '#86a6bf' },
  kitchen: { floor: ['checker', '#f1ede4', '#b8463a', 2], wall: '#e8dcc2' },
  bedroom: { floor: ['carpet', '#d9917a', '#c4601e', 1], wall: '#8a6cc4' },
  bathroom: { floor: ['hex', '#d8ecee', '#8fb3b9', 1.5], wall: '#a9c4d8' },
  office: { floor: ['wood', '#b98552', '#83552f', 1], wall: '#9fb08a' },
  library: { floor: ['carpet', '#7f9a6c', '#4a6a48', 1], wall: '#5d7d6a' },
  dining: { floor: ['wood', '#c98f5a', '#8c6239', 1], wall: '#d9a3a0' },
  garden: { floor: ['grass', '#8fbc5a', '#5a9440', 1], wall: '#cfc2a8' },
  hall: { floor: ['marble', '#efe9dc', '#b5a88e', 1], wall: '#e9e2d2' },
  music: { floor: ['parquet', '#e0b47e', '#a5703e', 1.5], wall: '#c4a27a' },
  guest: { floor: ['carpet', '#c9a0c8', '#8a5a8a', 1], wall: '#e8c8d8' },
  game: { floor: ['carpet', '#3f6b5a', '#2a4c3f', 1], wall: '#c7a96b' },
  veranda: { floor: ['tile', '#f1e3c8', '#c9a87a', 2], wall: '#bfe0c6' },
  laundry: { floor: ['tile', '#e6eef0', '#a8bcc4', 2], wall: '#c8dce4' },
};
const styleOf = (type) => ROOM_STYLE[type] ?? ROOM_STYLE.living;
export const PATTERNS = ['wood', 'tile', 'carpet', 'grass', 'stone', 'sand', 'water', 'snow', 'marble', 'tatami', 'planks', 'parquet', 'metal', 'mosaic', 'cobble', 'hex', 'straw', 'checker'];
const REPEAT = { tile: 2, checker: 2, hex: 1.5, mosaic: 1, cobble: 1.5, parquet: 1.5 };
// A room may carry its own look (Murdoku themes): floor [pattern, c1, c2] and wall colour
function roomStyle(rm) {
  const base = styleOf(rm?.type);
  const f = Array.isArray(rm?.floor) ? rm.floor : null;
  const floor = f && PATTERNS.includes(f[0]) ? [f[0], f[1] || base.floor[1], f[2] || base.floor[2], REPEAT[f[0]] ?? 1] : base.floor;
  return { floor, wall: typeof rm?.wall === 'string' ? rm.wall : base.wall };
}

function shade(hex, l) {
  const c = new THREE.Color(hex);
  c.offsetHSL(0, 0, l);
  return '#' + c.getHexString();
}

// cell centre in world space; row 0 at the back (-z), column 0 on the left (-x)
export function cellCenter(n, r, c) {
  return new THREE.Vector3((c - (n - 1) / 2) * CELL, 0, (r - (n - 1) / 2) * CELL);
}

// Canvas texture with text, for the labels.
export function textTexture(text, { size = 128, font = '700 96px Georgia, "Times New Roman", serif', color = '#ffffff', w = size, h = size } = {}) {
  const cv = document.createElement('canvas');
  cv.width = w;
  cv.height = h;
  const g = cv.getContext('2d');
  g.fillStyle = color;
  g.font = font;
  g.textAlign = 'center';
  g.textBaseline = 'middle';
  g.fillText(text, w / 2, h / 2 + h * 0.04);
  const t = new THREE.CanvasTexture(cv);
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 8;
  return t;
}

export function colName(c) {
  return String.fromCharCode(65 + c);
}

// Builds the static board. Returns { group, labels, cells[r][c] = { top, seat }, n, half }.
export function buildBoard(puzzle, { clutter = 'some' } = {}) {
  const st = styleFor(puzzle.theme);
  const n = puzzle.size;
  const half = (n * CELL) / 2;
  const seed = (puzzle.seed ?? 1) >>> 0;
  const r = rng(seed * 31 + 7);
  const roomOf = (rr, cc) => (rr < 0 || cc < 0 || rr >= n || cc >= n ? -1 : puzzle.cells[rr]?.[cc] ?? -1);
  const rooms = new Map((puzzle.rooms ?? []).map((rm) => [rm.id, rm]));
  const typeOf = (id) => rooms.get(id)?.type ?? 'living';
  const lookOf = (id) => roomStyle(rooms.get(id));
  // open-air areas (beach, garden, dunes…) are not rooms: no wall between two of them
  const isOpen = (id) => id >= 0 && (rooms.get(id)?.open ?? typeOf(id) === 'garden');
  const group = new THREE.Group();
  group.name = 'board';

  // ---- plinth with a cream border and a dark rim
  seedBuilders(seed);
  const pb = new Builder();
  const W = n * CELL + 2 * MARGIN;
  const ns = { jitter: 0, shadow: false };
  pb.box(W, PLINTH_H - 0.1, W, 0, -PLINTH_H, 0, st.side, ns);
  pb.box(W + 0.05, 0.07, W + 0.05, 0, -PLINTH_H - 0.01, 0, st.rim, ns);
  // the border (labels live here): sand, water, snow, cobbles… after the theme
  const [bp, b1, b2] = st.border;
  pb.box(W + 0.06, 0.07, W + 0.06, 0, -0.1, 0, '#ffffff', { ...ns, material: patternMaterial(bp, b1, b2, W / 2.4, W / 2.4) });
  pb.box(W + 0.07, 0.02, W + 0.07, 0, -0.105, 0, st.rim, ns);
  // dark section line around the floors
  pb.box(n * CELL + 0.12, 0.05, n * CELL + 0.12, 0, -0.06, 0, CAP, ns);
  group.add(pb.build());

  // ---- floors: one subdivided plane per cell, merged per room material
  const perMat = new Map();
  for (let rr = 0; rr < n; rr++)
    for (let cc = 0; cc < n; cc++) {
      const id = roomOf(rr, cc);
      const [pattern, c1, c2, rep] = lookOf(id).floor;
      // rooms of the same type get slightly different tones
      const tone = ((id * 37) % 5 - 2) * 0.018;
      const m = patternMaterial(pattern, shade(c1, tone), shade(c2, tone), rep, rep);
      const g = new THREE.PlaneGeometry(CELL, CELL, SUB, SUB).rotateX(-Math.PI / 2);
      const p = cellCenter(n, rr, cc);
      g.translate(p.x, 0, p.z);
      if (!perMat.has(m)) perMat.set(m, []);
      perMat.get(m).push(g);
    }
  // one mesh per floor material (a draw call per room look, not per cell)
  for (const [m, gs] of perMat) {
    const g = gs.length > 1 ? mergeGeometries(gs, false) : gs[0];
    if (gs.length > 1) gs.forEach((x) => x.dispose());
    const mesh = new THREE.Mesh(g, m);
    mesh.receiveShadow = true;
    mesh.userData.floor = true;
    group.add(mesh);
  }

  // ---- grid: a transparent overlay with the cell lines, same subdivisions
  const gridTex = gridTexture(n);
  const gridMat = handmade(new THREE.MeshStandardMaterial({ map: gridTex, transparent: true, depthWrite: false, roughness: 1 }));
  const grid = new THREE.Mesh(new THREE.PlaneGeometry(n * CELL, n * CELL, n * SUB, n * SUB).rotateX(-Math.PI / 2), gridMat);
  grid.position.y = 0.012;
  grid.receiveShadow = true;
  grid.renderOrder = 1;
  group.add(grid);

  // ---- walls along room boundaries and the outside
  seedBuilders(seed + 1);
  const wb = new Builder();
  /** What stands on the edge between areas a and b (-1 = outside the board). */
  const edgeKind = (a, b) => {
    const oa = isOpen(a), ob = isOpen(b);
    if (oa && ob) return { kind: 'open', style: st.open };
    if ((oa && b < 0) || (ob && a < 0)) return { kind: 'fence', style: st.fence };
    // a wall: an open area sees the closed room's colour on both faces
    const ca = a < 0 ? FACADE : oa ? lookOf(b).wall : lookOf(a).wall;
    const cb = b < 0 ? FACADE : ob ? lookOf(a).wall : lookOf(b).wall;
    return { kind: 'wall', style: st.wall, colA: ca, colB: cb };
  };
  // one door between each pair of adjacent rooms, on a shared edge
  const shared = new Map();
  const edgeKey = (r1, c1, r2, c2) => `${r1},${c1}|${r2},${c2}`;
  for (let rr = 0; rr < n; rr++)
    for (let cc = 0; cc < n; cc++) {
      const a = roomOf(rr, cc);
      for (const [dr, dc] of [[0, 1], [1, 0]]) {
        const b = roomOf(rr + dr, cc + dc);
        if (b < 0 || b === a) continue;
        const k = a < b ? `${a}-${b}` : `${b}-${a}`;
        if (!shared.has(k)) shared.set(k, []);
        shared.get(k).push(edgeKey(rr, cc, rr + dr, cc + dc));
      }
    }
  const doors = new Set();
  for (const [, edges] of shared) doors.add(edges[Math.floor(r() * edges.length)]);
  const wallSides = []; // [r][c] -> {n,s,w,e: 'wall'|'door'|null}
  for (let rr = 0; rr < n; rr++) wallSides.push(Array.from({ length: n }, () => ({})));

  // horizontal edges (between row rr-1 and rr), along x
  for (let rr = 0; rr <= n; rr++)
    for (let cc = 0; cc < n; cc++) {
      const a = roomOf(rr - 1, cc), b = roomOf(rr, cc);
      if (a === b) continue;
      const door = doors.has(edgeKey(rr - 1, cc, rr, cc));
      const x = (cc - (n - 1) / 2) * CELL, z = (rr - n / 2) * CELL;
      wallSegment(wb, { x, z, alongX: true, ...edgeKind(a, b), door: door && !(isOpen(a) && isOpen(b)), r });
      if (rr - 1 >= 0) wallSides[rr - 1][cc].s = door ? 'door' : 'wall';
      if (rr < n) wallSides[rr][cc].n = door ? 'door' : 'wall';
    }
  // vertical edges (between column cc-1 and cc), along z
  for (let cc = 0; cc <= n; cc++)
    for (let rr = 0; rr < n; rr++) {
      const a = roomOf(rr, cc - 1), b = roomOf(rr, cc);
      if (a === b) continue;
      const door = doors.has(edgeKey(rr, cc - 1, rr, cc));
      const x = (cc - n / 2) * CELL, z = (rr - (n - 1) / 2) * CELL;
      wallSegment(wb, { x, z, alongX: false, ...edgeKind(a, b), door: door && !(isOpen(a) && isOpen(b)), r });
      if (cc - 1 >= 0) wallSides[rr][cc - 1].e = door ? 'door' : 'wall';
      if (cc < n) wallSides[rr][cc].w = door ? 'door' : 'wall';
    }
  group.add(wb.build());

  // ---- labels on the border: row numbers on the left, column letters
  const labels = new THREE.Group();
  labels.name = 'labels';
  const labelMat = (t) => new THREE.MeshBasicMaterial({ map: t, transparent: true, depthWrite: false, toneMapped: false, color: '#3a2c26' });
  const lsz = MARGIN * 0.78;
  for (let i = 0; i < n; i++) {
    // column letters exist at the back (top view) and the front (iso view,
    // where the back wall would hide them); the view shows one set
    for (const [text, x, z, edge] of [
      [String(i + 1), -half - MARGIN / 2, (i - (n - 1) / 2) * CELL, 'left'],
      [colName(i), (i - (n - 1) / 2) * CELL, -half - MARGIN / 2, 'back'],
      [colName(i), (i - (n - 1) / 2) * CELL, half + MARGIN / 2, 'front'],
    ]) {
      const m = new THREE.Mesh(new THREE.PlaneGeometry(lsz, lsz).rotateX(-Math.PI / 2), labelMat(textTexture(text)));
      m.userData.edge = edge;
      m.position.set(x, 0.02, z);
      m.renderOrder = 2;
      labels.add(m);
    }
  }
  group.add(labels);
  for (const m of labels.children) m.material.color.set(st.ink);

  // ---- room names, on the floor like the plates of a board game
  const roomLabels = new THREE.Group();
  roomLabels.name = 'roomLabels';
  const hasObj = new Set((puzzle.objects ?? []).map((o) => `${o.r},${o.c}`));
  const plates = new Set(); // cells whose back edge holds a name plate (no decor there)
  for (const [id, rm] of rooms) {
    const text = String(puzzle.roomLabels?.[id] ?? rm.name ?? '').trim();
    if (!text) continue;
    // the back-left free cell of the room: its back wall never hides the plate
    let best = null;
    for (let rr = 0; rr < n; rr++)
      for (let cc = 0; cc < n; cc++) {
        if (roomOf(rr, cc) !== id) continue;
        const score = -rr * 10 - cc - (hasObj.has(`${rr},${cc}`) ? 100 : 0);
        if (!best || score > best.score) best = { rr, cc, score };
      }
    if (!best) continue;
    let span = 1;
    while (best.cc + span < n && roomOf(best.rr, best.cc + span) === id && !hasObj.has(`${best.rr},${best.cc + span}`)) span++;
    for (let k = 0; k < span; k++) plates.add(`${best.rr},${best.cc + k}`);
    const tex = plateTexture(text.toUpperCase());
    const maxW = span * CELL - 0.3, h = 0.46;
    const w = Math.min(maxW, (h * tex.image.width) / tex.image.height);
    const hh = Math.min(h, (w * tex.image.height) / tex.image.width);
    const m = new THREE.Mesh(new THREE.PlaneGeometry(w, hh).rotateX(-Math.PI / 2), new THREE.MeshBasicMaterial({ map: tex, transparent: true, depthWrite: false, toneMapped: false }));
    const p = cellCenter(n, best.rr, best.cc);
    m.position.set(p.x - CELL / 2 + 0.16 + w / 2, 0.03, p.z - CELL / 2 + 0.16 + hh / 2);
    m.renderOrder = 3;
    roomLabels.add(m);
  }
  group.add(roomLabels);

  // ---- props on the border: corners and the right-hand side (labels elsewhere)
  seedBuilders(seed + 9);
  const db = new Builder();
  const dr = rng(seed * 7 + 3);
  const spotsB = [];
  for (const sx of [-1, 1]) for (const sz of [-1, 1]) spotsB.push([sx * (half + MARGIN * 0.5), sz * (half + MARGIN * 0.5)]);
  for (let i = 0; i < n; i++) if (dr() < 0.55) spotsB.push([half + MARGIN * 0.5, (i - (n - 1) / 2) * CELL + (dr() - 0.5) * 0.6]);
  for (const [x, z] of spotsB) {
    const name = st.deco[Math.floor(dr() * st.deco.length)];
    const sub = new Builder();
    if (PLANTS[name]) PLANTS[name](sub, dr);
    else if (LANDMARKS[name]) LANDMARKS[name](sub, dr);
    else if (PROPS[name]) { PROPS[name](sub, dr); for (const bk of sub.buckets.values()) for (const g of bk.gs) g.scale(1.6, 1.6, 1.6); }
    else if (name === 'rock') PROPS.rocks(sub, dr);
    db.merge(sub, dr() * 6.28, x, -0.03, z);
  }
  group.add(db.build());

  // ---- furniture
  const cells = [];
  for (let rr = 0; rr < n; rr++) cells.push(Array.from({ length: n }, () => ({ top: 0, seat: 0, object: null })));
  const counts = new Map();
  const spots = new Map(); // "r,c" -> world places on top of a table, desk, counter…
  for (const o of puzzle.objects ?? []) {
    if (!(o.r >= 0 && o.r < n && o.c >= 0 && o.c < n)) continue;
    const id = roomOf(o.r, o.c);
    const room = typeOf(id);
    const k = (counts.get(o.type) ?? 0) + id;
    counts.set(o.type, (counts.get(o.type) ?? 0) + 1);
    const obj = buildObject(o.type, { room, k, seed: seed + o.r * 17 + o.c * 131 + 1, fit: CELL * 0.82 });
    const p = cellCenter(n, o.r, o.c);
    let ry = 0;
    if (obj.wall) {
      // back against a wall (not a door), preferring the back, then sides
      const ws = wallSides[o.r][o.c];
      const side = ['n', 'w', 'e', 's'].find((s) => ws[s] === 'wall') ?? ['n', 'w', 'e', 's'].find((s) => ws[s]);
      if (side) {
        ry = { n: 0, w: Math.PI / 2, e: -Math.PI / 2, s: Math.PI }[side];
        const push = Math.max(0, (CELL - obj.size[1]) / 2 - WALL_T / 2 - 0.05);
        const dir = { n: [0, -1], s: [0, 1], w: [-1, 0], e: [1, 0] }[side];
        p.x += dir[0] * push;
        p.z += dir[1] * push;
      }
    }
    obj.group.position.copy(p);
    obj.group.rotation.y = ry;
    obj.group.traverse((ch) => (ch.userData.cell = [o.r, o.c]));
    group.add(obj.group);
    cells[o.r][o.c] = { top: obj.h, seat: obj.seat ?? obj.h, object: o.type, occupiable: obj.seat != null };
    if (obj.spots.length) {
      const cs = Math.cos(ry), sn = Math.sin(ry);
      spots.set(`${o.r},${o.c}`, obj.spots.map(([x, y, z]) => [p.x + x * cs + z * sn, y, p.z - x * sn + z * cs]));
    }
  }

  // ---- decor: food, books, crates, shells… (never part of the puzzle)
  const decor = buildClutter(puzzle, { n, cells, cellCenter, roomType: (rr, cc) => typeOf(roomOf(rr, cc)), isOpen: (rr, cc) => isOpen(roomOf(rr, cc)), plates: puzzle.roomLabels ? plates : new Set(), spots, clutter });
  if (decor) group.add(decor);

  group.traverse((o) => {
    o.matrixAutoUpdate = false;
    o.updateMatrix();
  });
  return { group, labels, roomLabels, ink: st.ink, labelMats: labels.children.map((m) => m.material), cells, n, half, grid: gridMat };
}

// Room-name plate: a cream pill with a dark outline and serif capitals.
function plateTexture(text) {
  const H = 96, font = '700 54px Georgia, "Times New Roman", serif';
  const cv = document.createElement('canvas');
  const g0 = cv.getContext('2d');
  g0.font = font;
  const W = Math.ceil(g0.measureText(text).width + H * 0.9);
  cv.width = W;
  cv.height = H;
  const g = cv.getContext('2d');
  const R = H / 2 - 6;
  g.beginPath();
  g.moveTo(6 + R, 6);
  g.arcTo(W - 6, 6, W - 6, H - 6, R);
  g.arcTo(W - 6, H - 6, 6, H - 6, R);
  g.arcTo(6, H - 6, 6, 6, R);
  g.arcTo(6, 6, W - 6, 6, R);
  g.closePath();
  g.fillStyle = 'rgba(255, 252, 244, 0.94)';
  g.fill();
  g.lineWidth = 5;
  g.strokeStyle = '#2a2220';
  g.stroke();
  g.fillStyle = '#2a2220';
  g.font = font;
  g.textAlign = 'center';
  g.textBaseline = 'middle';
  g.fillText(text, W / 2, H / 2 + 3);
  const t = new THREE.CanvasTexture(cv);
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 8;
  return t;
}


// The wall itself, in the theme's style. Plaster walls show each room's colour
// on its side; the other styles have their own material.
function wallBody(sub, style, x0, x1, colA, colB, r) {
  const len = x1 - x0, cx = (x0 + x1) / 2, T = WALL_T, H = WALL_H;
  const cols = WALL_COLORS[style];
  const capOn = (c = CAP) => sub.box(len + 0.004, 0.035, T + 0.012, cx, H, 0, c);
  switch (style) {
    case 'stone':
    case 'sandstone':
    case 'marble': {
      const rows = style === 'marble' ? 2 : 3, bh = H / rows;
      for (let i = 0; i < rows; i++) {
        let x = x0 - (i % 2 ? 0.18 : 0);
        while (x < x1) {
          const w = Math.min(0.3 + r() * 0.2, x1 - Math.max(x, x0));
          const a = Math.max(x, x0);
          if (w > 0.02) sub.box(w - 0.015, bh - 0.015, T, a + w / 2, i * bh, 0, cols[Math.floor(r() * cols.length)]);
          x = a + w;
        }
      }
      if (style === 'sandstone') sub.box(len, 0.05, T + 0.02, cx, H * 0.62, 0, '#2f6f8a');
      capOn(style === 'marble' ? '#c8bea8' : CAP);
      break;
    }
    case 'rock':
      for (let x = x0 + 0.1; x < x1; x += 0.2 + r() * 0.06) sub.sphere(0.14 + r() * 0.05, x, 0.12, (r() - 0.5) * 0.04, cols[Math.floor(r() * cols.length)], { sy: 1.3, seg: 7 });
      break;
    case 'planks': {
      for (let x = x0; x < x1 - 0.01; x += 0.17) sub.box(Math.min(0.16, x1 - x), H - 0.02 * (Math.floor(x * 7) % 2), T * 0.8, x + Math.min(0.16, x1 - x) / 2, 0, 0, cols[Math.floor(r() * cols.length)]);
      sub.box(len, 0.05, T + 0.03, cx, H * 0.25, 0, '#5a3b26');
      capOn('#4a3426');
      break;
    }
    case 'logs':
      for (let i = 0; i < 3; i++) sub.cbox(len, 0.13, 0.13, cx, 0.07 + i * 0.13, 0, cols[i % cols.length], { round: 0.06 });
      break;
    case 'metal':
      sub.box(len, H, T, cx, 0, 0, cols[0], { metalness: 0.5, roughness: 0.4 });
      sub.box(len + 0.01, 0.04, T + 0.02, cx, H * 0.55, 0, '#5ad8ff', { emissive: '#2ab8ff', ei: 1.2 });
      sub.box(len, 0.06, T + 0.03, cx, 0, 0, '#3a404a');
      capOn('#2a2f38');
      break;
    case 'shoji': {
      const k = Math.max(1, Math.round(len / 0.5));
      for (let i = 0; i <= k; i++) sub.box(0.05, H, T, x0 + (i * len) / k, 0, 0, '#3a2a22');
      sub.box(len, H - 0.08, T * 0.4, cx, 0.04, 0, '#f6efdc', { roughness: 1 });
      for (const y of [0.04, H * 0.5, H - 0.04]) sub.box(len, 0.025, T * 0.6, cx, y, 0, '#3a2a22');
      capOn('#2a2220');
      break;
    }
    case 'coral':
      for (let x = x0 + 0.08; x < x1; x += 0.13) {
        const c = cols[Math.floor(r() * cols.length)];
        sub.sphere(0.1 + r() * 0.04, x, 0.1, (r() - 0.5) * 0.05, c, { sy: 1.2, seg: 8 });
        if (r() < 0.6) sub.sphere(0.07, x + 0.03, 0.27 + r() * 0.08, 0, c, { seg: 8 });
      }
      break;
    case 'canvas': {
      let i = 0;
      for (let x = x0; x < x1 - 0.01; x += 0.2, i++) sub.box(Math.min(0.2, x1 - x), H, T * 0.5, x + Math.min(0.2, x1 - x) / 2, 0, 0, cols[i % 2]);
      sub.box(len, 0.06, T * 0.7, cx, H, 0, '#d9a441');
      break;
    }
    case 'plaster':
    default:
      sub.box(len, H, T / 2, cx, 0, -T / 4, colA);
      sub.box(len, H, T / 2, cx, 0, T / 4, colB);
      // skirting boards
      sub.box(len, 0.06, T + 0.03, cx, 0, 0, '#f4efe4');
      capOn();
  }
}

// Around an open-air area (on the board edge): a fence in the theme's style.
function fenceBody(sub, style, x0, x1, r) {
  const len = x1 - x0, cx = (x0 + x1) / 2, H = WALL_H * 0.85;
  const posts = (step, fn) => { const k = Math.max(2, Math.round(len / step)); for (let i = 0; i <= k; i++) fn(x0 + (i * len) / k, i); };
  switch (style) {
    case 'hedge':
      sub.box(len - 0.04, WALL_H * 0.8, WALL_T * 1.4, cx, 0, 0, '#2f5e2c');
      foliage(sub, { seed: Math.floor(r() * 1e6), rx: len / 2, ry: WALL_H * 0.5, rz: WALL_T * 1.3, palette: 'dark', voxel: 0.08 }, cx, 0, 0);
      break;
    case 'coral':
      wallBody(sub, 'coral', x0, x1, '', '', r);
      break;
    case 'bamboo':
      posts(0.07, (x, i) => sub.cyl(0.03, 0.03, H + (i % 3) * 0.05, x, 0, 0, i % 2 ? '#a8b45a' : '#8a9a42', { seg: 6 }));
      for (const y of [0.12, H - 0.08]) sub.box(len, 0.025, 0.08, cx, y, 0, '#5a3b26');
      break;
    case 'iron':
      posts(0.1, (x, i) => { sub.box(0.02, H, 0.02, x, 0, 0, '#2a2523'); if (i % 2) sub.cyl(0, 0.025, 0.06, x, H, 0, '#c9a24a', { seg: 4 }); });
      for (const y of [0.06, H - 0.06]) sub.box(len, 0.025, 0.025, cx, y, 0, '#2a2523');
      break;
    case 'rocks':
      for (let x = x0 + 0.1; x < x1; x += 0.22) sub.sphere(0.1 + r() * 0.05, x, 0.06, (r() - 0.5) * 0.06, ['#9a968c', '#b0aa9c', '#7f7a70'][Math.floor(r() * 3)], { sy: 0.8, seg: 7 });
      break;
    case 'rope':
      posts(0.6, (x) => sub.cyl(0.05, 0.06, H, x, 0, 0, '#7a5a3a', { seg: 8 }));
      for (let i = 0; i < 12; i++) {
        const t = (i + 0.5) / 12, x = x0 + t * len, sag = Math.sin(((t * len) / 0.6) * Math.PI) ** 2;
        sub.cbox(len / 12 + 0.01, 0.03, 0.03, x, H - 0.1 - sag * 0.08, 0, '#c9a46a');
      }
      break;
    case 'rail':
      posts(0.5, (x) => sub.box(0.06, H, 0.06, x, 0, 0, '#6b4a34'));
      for (const y of [H * 0.4, H - 0.04]) sub.box(len, 0.05, 0.05, cx, y, 0, '#8a5a36');
      break;
    case 'snow':
      for (let x = x0 + 0.12; x < x1; x += 0.2) sub.sphere(0.16 + r() * 0.04, x, 0.04, 0, '#f6f9fc', { sy: 0.6, seg: 8 });
      break;
    case 'palisade':
      posts(0.12, (x, i) => { sub.cyl(0.055, 0.055, H + 0.06 * (i % 2), x, 0, 0, '#8a6a4a', { seg: 7 }); sub.cyl(0, 0.055, 0.1, x, H + 0.06 * (i % 2), 0, '#8a6a4a', { seg: 7 }); });
      break;
    case 'picket':
    default:
      posts(0.16, (x, i) => sub.box(0.07, H - 0.04 + (i % 2) * 0.04, 0.03, x, 0, 0, '#f6f2ea'));
      for (const y of [0.1, H - 0.12]) sub.box(len, 0.04, 0.03, cx, y, -0.03, '#f1ede4');
  }
}

// Between two open-air areas: a low marker only (they are areas, not rooms).
function openBody(sub, style, x0, x1, r) {
  const len = x1 - x0, cx = (x0 + x1) / 2;
  switch (style) {
    case 'hedge':
      foliage(sub, { seed: Math.floor(r() * 1e6), rx: len / 2, ry: 0.13, rz: 0.12, palette: 'green', voxel: 0.06 }, cx, -0.02, 0);
      break;
    case 'shells':
      for (let x = x0 + 0.07; x < x1; x += 0.14) sub.sphere(0.05, x, 0.015, 0, ['#f6d3c9', '#f2e6d8', '#e9b8a8'][Math.floor(r() * 3)], { sy: 0.45, seg: 7 });
      break;
    case 'rocks':
    case 'pebbles':
      for (let x = x0 + 0.06; x < x1; x += 0.12) sub.sphere(style === 'rocks' ? 0.065 : 0.045, x, 0.012, (r() - 0.5) * 0.03, ['#9a968c', '#b8b2a4', '#7f7a70', '#d8d2c4'][Math.floor(r() * 4)], { sy: 0.55, seg: 6 });
      break;
    case 'rope':
      for (let x = x0; x < x1; x += 0.5) sub.cyl(0.035, 0.04, 0.2, x + 0.25, 0, 0, '#7a5a3a', { seg: 6 });
      sub.box(len, 0.025, 0.025, cx, 0.16, 0, '#c9a46a');
      break;
    case 'snow':
      for (let x = x0 + 0.1; x < x1; x += 0.18) sub.sphere(0.09, x, 0.01, 0, '#f6f9fc', { sy: 0.5, seg: 7 });
      break;
    case 'line':
    default:
      for (let x = x0 + 0.05; x < x1 - 0.05; x += 0.2) sub.box(0.12, 0.012, 0.05, x + 0.06, 0, 0, '#f6f2ea', { jitter: 0 });
  }
}

// One segment on a cell edge: wall (maybe with a door gap and a sill), fence
// around an open area, or a low marker between two open areas.
function wallSegment(b, { x, z, alongX, kind, style, colA, colB, door, r }) {
  const L = CELL + (alongX ? WALL_T : 0);
  const sub = new Builder();
  const gap = door ? CELL * 0.36 : 0;
  const pieces = gap ? [[-L / 2, -gap / 2], [gap / 2, L / 2]] : [[-L / 2, L / 2]];
  for (const [x0, x1] of pieces) {
    if (kind === 'open') openBody(sub, style, x0, x1, r);
    else if (kind === 'fence') fenceBody(sub, style, x0, x1, r);
    else wallBody(sub, style, x0, x1, colA, colB, r);
  }
  if (gap) sub.box(gap + 0.02, 0.014, WALL_T + 0.06, 0, 0, 0, '#d8ccb2', { jitter: 0 });
  b.merge(sub, alongX ? 0 : Math.PI / 2, x, 0, z);
}

function gridTexture(n) {
  const px = 128;
  const S = n * px;
  const cv = document.createElement('canvas');
  cv.width = cv.height = S;
  const g = cv.getContext('2d');
  g.clearRect(0, 0, S, S);
  g.strokeStyle = 'rgba(40, 28, 24, 0.55)';
  g.lineWidth = 4;
  g.setLineDash([16, 8]);
  for (let i = 1; i < n; i++) {
    g.beginPath();
    g.moveTo(i * px, 0);
    g.lineTo(i * px, S);
    g.moveTo(0, i * px);
    g.lineTo(S, i * px);
    g.stroke();
  }
  // a small cross at every inner corner keeps the cells readable under furniture
  g.setLineDash([]);
  g.strokeStyle = 'rgba(40, 28, 24, 0.7)';
  g.lineWidth = 5;
  for (let i = 1; i < n; i++)
    for (let j = 1; j < n; j++) {
      g.beginPath();
      g.moveTo(i * px - 10, j * px);
      g.lineTo(i * px + 10, j * px);
      g.moveTo(i * px, j * px - 10);
      g.lineTo(i * px, j * px + 10);
      g.stroke();
    }
  const t = new THREE.CanvasTexture(cv);
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 8;
  return t;
}
