// The Murdoku board as a diorama: a plinth, one floor per room (building-builder
// pattern materials), low cut-away walls with dark section caps (like
// building-builder's "Inside" view), door gaps with stone sills, a subtle grid,
// row/column labels and one piece of furniture per object cell.
import * as THREE from 'three';
import { Builder, handmade, patternMaterial, rng, seedBuilders, foliage } from './geo.js';
import { buildObject } from './furniture.js';

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
  living: { floor: ['wood', '#d9a066', '#a8703f', 1], wall: '#86a6bf' },
  kitchen: { floor: ['tile', '#f1ede4', '#a59d90', 2], wall: '#e8dcc2' },
  bedroom: { floor: ['carpet', '#d9917a', '#c4601e', 1], wall: '#8a6cc4' },
  bathroom: { floor: ['tile', '#d8ecee', '#8fb3b9', 2], wall: '#a9c4d8' },
  office: { floor: ['wood', '#b98552', '#83552f', 1], wall: '#9fb08a' },
  library: { floor: ['carpet', '#7f9a6c', '#4a6a48', 1], wall: '#5d7d6a' },
  dining: { floor: ['wood', '#c98f5a', '#8c6239', 1], wall: '#d9a3a0' },
  garden: { floor: ['grass', '#8fbc5a', '#5a9440', 1], wall: '#cfc2a8' },
  hall: { floor: ['stone', '#e2d6bc', '#b5a88e', 1], wall: '#e9e2d2' },
  music: { floor: ['wood', '#e0b47e', '#a5703e', 1], wall: '#c4a27a' },
};
const styleOf = (type) => ROOM_STYLE[type] ?? ROOM_STYLE.living;
const PATTERNS = ['wood', 'tile', 'carpet', 'grass', 'stone'];
// A room may carry its own look (Murdoku themes): floor [pattern, c1, c2] and wall colour
function roomStyle(rm) {
  const base = styleOf(rm?.type);
  const f = Array.isArray(rm?.floor) ? rm.floor : null;
  const floor = f && PATTERNS.includes(f[0]) ? [f[0], f[1] || base.floor[1], f[2] || base.floor[2], f[0] === 'tile' ? 2 : 1] : base.floor;
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
export function buildBoard(puzzle) {
  const n = puzzle.size;
  const half = (n * CELL) / 2;
  const seed = (puzzle.seed ?? 1) >>> 0;
  const r = rng(seed * 31 + 7);
  const roomOf = (rr, cc) => (rr < 0 || cc < 0 || rr >= n || cc >= n ? -1 : puzzle.cells[rr]?.[cc] ?? -1);
  const rooms = new Map((puzzle.rooms ?? []).map((rm) => [rm.id, rm]));
  const typeOf = (id) => rooms.get(id)?.type ?? 'living';
  const lookOf = (id) => roomStyle(rooms.get(id));
  const group = new THREE.Group();
  group.name = 'board';

  // ---- plinth with a cream border and a dark rim
  seedBuilders(seed);
  const pb = new Builder();
  const W = n * CELL + 2 * MARGIN;
  const ns = { jitter: 0, shadow: false };
  pb.box(W, PLINTH_H - 0.1, W, 0, -PLINTH_H, 0, '#8a6446', ns);
  pb.box(W + 0.05, 0.07, W + 0.05, 0, -PLINTH_H - 0.01, 0, '#4a3426', ns);
  pb.box(W + 0.06, 0.07, W + 0.06, 0, -0.1, 0, '#e4d2ab', ns);
  pb.box(W + 0.07, 0.02, W + 0.07, 0, -0.105, 0, '#4a3426', ns);
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
  for (const [m, gs] of perMat) {
    for (const g of gs) {
      const mesh = new THREE.Mesh(g, m);
      mesh.receiveShadow = true;
      mesh.userData.floor = true;
      group.add(mesh);
    }
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
      wallSegment(wb, { x, z, alongX: true, colA: sideColor(a, lookOf), colB: sideColor(b, lookOf), door, garden: gardenEdge(a, b, typeOf), r });
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
      wallSegment(wb, { x, z, alongX: false, colA: sideColor(a, lookOf), colB: sideColor(b, lookOf), door, garden: gardenEdge(a, b, typeOf), r });
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

  // ---- furniture
  const cells = [];
  for (let rr = 0; rr < n; rr++) cells.push(Array.from({ length: n }, () => ({ top: 0, seat: 0, object: null })));
  const counts = new Map();
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
  }

  group.traverse((o) => {
    o.matrixAutoUpdate = false;
    o.updateMatrix();
  });
  return { group, labels, labelMats: labels.children.map((m) => m.material), cells, n, half, grid: gridMat };
}

function sideColor(id, lookOf) {
  return id < 0 ? FACADE : lookOf(id).wall;
}
function gardenEdge(a, b, typeOf) {
  const ga = a >= 0 && typeOf(a) === 'garden', gb = b >= 0 && typeOf(b) === 'garden';
  if (ga && gb) return 'hedge';
  if ((ga && b < 0) || (gb && a < 0)) return 'fence';
  return null;
}

// One wall segment on a cell edge: two halves in each side's room colour, a
// dark section cap, and maybe a door gap with a stone sill. In gardens, the
// outer edge is a picket fence and inner edges a clipped hedge.
function wallSegment(b, { x, z, alongX, colA, colB, door, garden, r }) {
  const L = CELL + (alongX ? WALL_T : 0);
  const sub = new Builder();
  const T = WALL_T;
  const gap = door ? CELL * 0.36 : 0;
  const pieces = gap ? [[-L / 2, -gap / 2], [gap / 2, L / 2]] : [[-L / 2, L / 2]];
  if (garden === 'fence') {
    const H = WALL_H * 0.85;
    for (const [x0, x1] of pieces) {
      const len = x1 - x0, cx = (x0 + x1) / 2;
      const k = Math.max(2, Math.round(len / 0.16));
      for (let i = 0; i <= k; i++) sub.box(0.07, H - 0.04 + (i % 2) * 0.04, 0.03, x0 + (i * len) / k, 0, 0, '#f6f2ea');
      for (const y of [0.1, H - 0.12]) sub.box(len, 0.04, 0.03, cx, y, -0.03, '#f1ede4');
    }
  } else if (garden === 'hedge') {
    for (const [x0, x1] of pieces) {
      const len = x1 - x0, cx = (x0 + x1) / 2;
      sub.box(len - 0.04, WALL_H * 0.9, T * 1.6, cx, 0, 0, '#2f5e2c');
      foliage(sub, { seed: Math.floor(r() * 1e6), rx: len / 2, ry: WALL_H * 0.55, rz: T * 1.2, palette: 'dark', voxel: 0.07, density: 1.2 }, cx, 0, 0);
    }
  } else {
    for (const [x0, x1] of pieces) {
      const len = x1 - x0, cx = (x0 + x1) / 2;
      sub.box(len, WALL_H, T / 2, cx, 0, -T / 4, colA);
      sub.box(len, WALL_H, T / 2, cx, 0, T / 4, colB);
      // skirting boards
      sub.box(len, 0.06, T + 0.03, cx, 0, 0, '#f4efe4');
      sub.box(len + 0.004, 0.035, T + 0.012, cx, WALL_H, 0, CAP);
    }
  }
  if (gap) sub.box(gap + 0.02, 0.014, T + 0.06, 0, 0, 0, '#d8ccb2', { jitter: 0 });
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
