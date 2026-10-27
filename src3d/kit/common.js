// Shared bits for the furniture models (furniture.js and the themed kits):
// legs, potted plants, rows of books, glows and little lamps.
// Every model sits on y = 0, centred on (0, 0), its front facing +z, and
// returns its footprint { w, d }, top height h, seat height when someone can
// stand or sit on it, and wall: true when it likes to stand against a wall.
import * as THREE from 'three';
import { foliage, rng } from '../geo.js';
import { PLANTS, LANDMARKS } from '../deco.js';

export const BRASS = { metalness: 0.8, roughness: 0.3 };
export const GOLD = '#d9b44a';
export const WOODS = ['#8a5a36', '#a8703f', '#6b4a34', '#b98552'];
export const pick = (r, a) => a[Math.floor(r() * a.length)];

/** Lighter (l > 0) or darker (l < 0) shade of a colour. */
export const shade = (c, l) => new THREE.Color(c).offsetHSL(0, 0, l).getStyle();

/** Material options for a part that glows. */
export const glow = (c, ei = 1.2) => ({ emissive: c, ei, shadow: false });

/** A warm point light (lamps, fires, lanterns). */
export function lamp(b, color, intensity, x, y, z, dist = 4) {
  const l = new THREE.PointLight(color, intensity, dist, 1.6);
  l.position.set(x, y, z);
  b.add(l);
}

/** Four legs under a w × d top, h tall. */
export function legs(b, w, d, h, color, t = 0.05, y = 0, o = {}) {
  for (const sx of [-1, 1]) for (const sz of [-1, 1]) b.box(t, h, t, sx * (w / 2 - t / 2), y, sz * (d / 2 - t / 2), color, o);
}

/** Turned (round) legs. */
export function roundLegs(b, w, d, h, color, r = 0.035, o = {}) {
  for (const sx of [-1, 1]) for (const sz of [-1, 1]) b.cyl(r * 0.7, r, h, sx * (w / 2 - r), 0, sz * (d / 2 - r), color, { seg: 8, ...o });
}

/** A shape turned around Y (bowls, vases, shells): points [[radius, y], …]. */
export function lathe(b, pts, color, o = {}, x = 0, y = 0, z = 0) {
  const g = new THREE.LatheGeometry(pts.map(([r, h]) => new THREE.Vector2(r, h)), o.seg ?? 20);
  g.translate(x, y, z);
  return b.geo(g, color, { tess: false, ...o });
}

/** A flat shape (outline in x / z) extruded upwards by h. */
export function slab(b, outline, h, color, y = 0, o = {}) {
  const s = new THREE.Shape();
  outline.forEach(([x, z], i) => (i ? s.lineTo(x, -z) : s.moveTo(x, -z)));
  s.closePath();
  const g = new THREE.ExtrudeGeometry(s, { depth: h, bevelEnabled: !!o.bevel, bevelSize: o.bevel ?? 0, bevelThickness: o.bevel ?? 0, bevelSegments: 2, curveSegments: 16 });
  g.rotateX(-Math.PI / 2);
  g.translate(0, y, 0);
  return b.geo(g, color, { tess: false, ...o });
}

/** Points of a heart outline (x, z), w wide, pointing to +z. */
export function heartOutline(w, n = 28) {
  const pts = [];
  for (let i = 0; i < n; i++) {
    const t = (i / n) * Math.PI * 2;
    const x = 16 * Math.sin(t) ** 3, y = 13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t);
    pts.push([(x / 34) * w, (-y / 34) * w]);
  }
  return pts;
}

/** A row of books on a shelf. */
export function bookRow(b, w, x, y, z, d, r, maxH, cols = ['#a33b2b', '#2f5d8a', '#d9b44a', '#3f7a4a', '#7a3f7a', '#e4dccb', '#c56b2c', '#1f2c3c']) {
  let cx = x - w / 2 + 0.02;
  while (cx < x + w / 2 - 0.06) {
    const bw = 0.03 + r() * 0.05;
    const bh = maxH * (0.6 + r() * 0.38);
    if (r() < 0.08) { cx += bw * 2; continue; }
    b.box(bw, bh, d * (0.7 + r() * 0.2), cx + bw / 2, y, z, cols[Math.floor(r() * cols.length)]);
    cx += bw + 0.004;
  }
}

/** A plant in a pot (leafy bush or palm fronds). */
export function pottedPlant(b, s, seed, plant = 'leafy', pot = '#b8673f', palette = 'green', flowers = null, x = 0, y = 0, z = 0) {
  const r = rng(seed);
  b.cyl(s / 2, s * 0.38, s * 0.8, x, y, z, pot, { seg: 14 });
  b.cyl(s / 2 + 0.02, s / 2 + 0.02, s * 0.1, x, y + s * 0.72, z, pot, { seg: 14 });
  b.cyl(s / 2 - 0.02, s / 2 - 0.02, 0.01, x, y + s * 0.8, z, '#3a2a1e', { seg: 14 });
  if (plant === 'palm') {
    const pal = ['#2f5e2c', '#3f7a35', '#5a9440', '#7cae4f', '#a9c96c'];
    for (let i = 0; i < 11; i++) {
      const a = (i / 11) * Math.PI * 2 + r();
      const L = s * (1.4 + r() * 1.0);
      const tilt = 0.5 + r() * 0.6;
      b.cbox(0.16 * s, L, 0.02, x + Math.cos(a) * L * 0.3, y + s * 0.8 + L * 0.38, z + Math.sin(a) * L * 0.3, pal[1 + (i % 4)], { rz: -Math.cos(a) * tilt, rx: Math.sin(a) * tilt, flat: true });
    }
  } else {
    const rr = s * 0.72;
    foliage(b, { seed, rx: rr, ry: s * 0.75, palette, voxel: Math.max(0.06, s * 0.17), flowers, flowerRate: 0.2 }, x, y + s * 0.7, z);
  }
}

/** One of the border plants or landmarks of deco.js, scaled by s. */
export function decoProp(b, name, s, seed, x = 0, y = 0, z = 0) {
  const fn = PLANTS[name] ?? LANDMARKS[name];
  if (!fn) return;
  const sub = b.constructor ? new b.constructor() : null;
  fn(sub, rng(seed));
  if (s !== 1) for (const bk of sub.buckets.values()) for (const g of bk.gs) g.scale(s, s, s);
  for (const c of [...sub.group.children]) {
    c.position.multiplyScalar(s);
    c.position.add(new THREE.Vector3(x, y, z));
    b.add(c);
  }
  b.merge(sub, 0, x, y, z);
}

/** A little stack of things on a top (books, boxes). */
export function stack(b, n, w, d, x, y, z, cols, r) {
  for (let k = 0; k < n; k++) b.cbox(w, 0.05, d, x + (r() - 0.5) * 0.04, y + 0.025 + k * 0.05, z, cols[k % cols.length], { ry: (r() - 0.5) * 0.5 });
}
