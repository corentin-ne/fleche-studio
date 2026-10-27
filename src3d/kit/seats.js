// Themed models people can stand or sit on: beds, sofas, armchairs, chairs,
// benches and rugs (they all return a seat height). See common.js for the
// conventions; kits in index.js pick a model and its colours per world.
import * as THREE from 'three';
import { foliage, patternMaterial, rng } from '../geo.js';
import { BRASS, GOLD, glow, heartOutline, lathe, legs, pick, roundLegs, shade, slab } from './common.js';

// Mattress, folded sheet and pillows, on top of a frame at height y.
function bedding(b, w, d, y, sheet, o = {}) {
  b.box(w - 0.06, 0.2, d - 0.06, 0, y, 0, o.mattress ?? '#f2f0ea', { round: 0.07 });
  b.box(w + 0.02, 0.09, d * 0.62, 0, y + 0.15, d * 0.19, sheet, { round: 0.04, ...(o.quilt ? { material: o.quilt } : {}) });
  b.box(w + 0.03, 0.1, 0.16, 0, y + 0.15, d * 0.19 - d * 0.31 + 0.08, o.band ?? '#f6f2ea', { round: 0.04 });
  for (const sx of [-1, 1]) b.box(w * 0.38, 0.14, 0.34, sx * w * 0.22, y + 0.18, -d / 2 + 0.3, o.pillow ?? '#eef0f4', { round: 0.06 });
}

export const SEATS = {
  // ---------------------------------------------------------------- beds
  fourPoster(b, o) {
    const w = 1.4, d = 2.0, wood = o.wood ?? '#5a3420', cur = o.curtain ?? '#7a1f2a', trim = o.trim ?? GOLD;
    b.box(w, 0.32, d, 0, 0.05, 0, wood);
    bedding(b, w, d, 0.37, o.sheet ?? cur, { band: o.band });
    // posts, a valance around the top (open, so the bed reads from above)
    for (const sx of [-1, 1]) for (const sz of [-1, 1]) {
      b.cyl(0.05, 0.06, 2.0, sx * (w / 2), 0, sz * (d / 2), wood, { seg: 10 });
      b.sphere(0.07, sx * (w / 2), 2.05, sz * (d / 2), trim, BRASS);
      // gathered curtains at each post
      b.cbox(0.16, 1.6, 0.14, sx * (w / 2 - 0.1), 1.0, sz * (d / 2 - 0.09), cur, { round: 0.06 });
    }
    for (const sz of [-1, 1]) b.box(w + 0.1, 0.16, 0.05, 0, 1.86, sz * (d / 2), cur);
    for (const sx of [-1, 1]) b.box(0.05, 0.16, d + 0.1, sx * (w / 2), 1.86, 0, cur);
    for (const sz of [-1, 1]) b.box(w + 0.12, 0.03, 0.06, 0, 1.84, sz * (d / 2), trim);
    b.box(w, 0.9, 0.08, 0, 0.3, -d / 2 + 0.02, wood);
    return { w: w + 0.15, d: d + 0.15, h: 2.1, seat: 0.6, wall: true };
  },

  ironBed(b, o) {
    const w = 1.3, d = 1.95, iron = o.iron ?? '#2a2a2e';
    b.box(w, 0.08, d, 0, 0.3, 0, iron);
    roundLegs(b, w, d, 0.32, iron, 0.03);
    bedding(b, w, d, 0.38, o.sheet ?? '#e9d9e8');
    for (const [z, hh] of [[-d / 2, 1.15], [d / 2, 0.8]]) {
      for (const sx of [-1, 1]) {
        b.cyl(0.03, 0.03, hh, sx * w / 2, 0, z, iron, { seg: 8 });
        b.sphere(0.05, sx * w / 2, hh, z, GOLD, BRASS);
      }
      b.cyl(0.02, 0.02, w, 0, hh - 0.08, z, iron, { rz: Math.PI / 2, center: true, seg: 6 });
      for (let i = 1; i < 7; i++) b.cyl(0.012, 0.012, hh - 0.45, -w / 2 + (i * w) / 7, 0.4, z, iron, { seg: 5 });
    }
    return { w, d, h: 1.15, seat: 0.6, wall: true };
  },

  futon(b, o) {
    const w = 1.15, d = 2.0;
    b.box(w, 0.1, d, 0, 0, 0, o.c ?? '#f2ede0', { round: 0.04 });
    b.box(w + 0.02, 0.06, d * 0.6, 0, 0.09, d * 0.2, o.c2 ?? '#2c3e6a', { round: 0.03, material: patternMaterial('checker', o.c2 ?? '#2c3e6a', '#e8e2d2', 3, 6) });
    b.box(0.6, 0.1, 0.28, 0, 0.1, -d / 2 + 0.25, '#e6dcc4', { round: 0.05 });
    return { w, d, h: 0.2, seat: 0.16, wall: true };
  },

  hammock(b, o) {
    const L = 2.2, cloth = o.c ?? '#d9c08a', post = o.post ?? '#7a5434';
    for (const s of [-1, 1]) {
      b.cyl(0.06, 0.07, 1.2, s * L / 2, 0, 0, post, { seg: 8 });
      b.cyl(0.07, 0.07, 0.04, s * L / 2, 1.2, 0, shade(post, -0.1), { seg: 8 });
    }
    // the cloth sags in a curve between the posts
    const n = 10;
    for (let i = 0; i < n; i++) {
      const t = (i + 0.5) / n, x = (t - 0.5) * (L - 0.4), y = 0.55 + 4 * 0.42 * (t - 0.5) ** 2;
      const slope = 8 * 0.42 * (t - 0.5);
      b.cbox((L - 0.4) / n + 0.02, 0.03, 0.85, x, y, 0, i % 2 ? cloth : shade(cloth, -0.06), { rz: Math.atan(slope / (L - 0.4)) * 2.2, jitter: 0 });
    }
    for (const s of [-1, 1]) b.cbox(0.3, 0.02, 0.02, s * (L / 2 - 0.12), 1.0, 0, '#d8c8a8', { rz: s * 0.9 });
    b.box(0.4, 0.08, 0.3, -0.55, 0.58, 0, '#f2ede0', { round: 0.03 });
    return { w: L, d: 0.9, h: 1.25, seat: 0.58, up: 1.2 };
  },

  cot(b, o) {
    const w = 0.9, d = 1.9, frame = o.wood ?? '#6b4a34';
    for (const sz of [-1, 1]) for (const r of [0.6, -0.6]) b.cbox(0.04, 0.6, 0.04, 0, 0.25, sz * (d / 2 - 0.15), frame, { rz: r });
    for (const sx of [-1, 1]) b.box(0.05, 0.05, d, sx * w / 2, 0.45, 0, frame);
    b.box(w, 0.04, d - 0.1, 0, 0.45, 0, '#b8a37a');
    b.box(w - 0.05, 0.08, d * 0.55, 0, 0.49, d * 0.2, o.c ?? '#8a2f2a', { round: 0.03, material: patternMaterial('checker', o.c ?? '#8a2f2a', '#2a2a2e', 2, 4) });
    b.box(0.5, 0.1, 0.28, 0, 0.49, -d / 2 + 0.25, '#e8dcc0', { round: 0.04 });
    return { w, d, h: 0.6, seat: 0.53, wall: true };
  },

  bunk(b, o) {
    // a loft bed: people stand on the top bunk, where they read from above
    const w = 1.2, d = 1.95, frame = o.wood ?? '#f2c94c';
    for (const sx of [-1, 1]) for (const sz of [-1, 1]) b.box(0.08, 1.75, 0.08, sx * (w / 2), 0, sz * (d / 2), frame);
    b.box(w, 0.1, d, 0, 0.2, 0, frame);
    bedding(b, w, d, 0.3, '#5aa9e6');
    b.box(w, 0.1, d, 0, 1.25, 0, frame);
    bedding(b, w, d, 1.35, o.c ?? '#ff7a8a');
    for (const sz of [-1, 1]) b.box(w, 0.08, 0.05, 0, 1.68, sz * d / 2, frame);
    for (let i = 0; i < 5; i++) b.box(0.05, 0.04, 0.3, w / 2 + 0.06, 0.25 + i * 0.27, d / 2 - 0.25, '#e8492c');
    return { w: w + 0.15, d, h: 1.75, seat: 1.57, wall: true, up: 1.1 };
  },

  clamBed(b, o) {
    const c = o.c ?? '#f4d9e4', R = 1.0;
    lathe(b, [[0.25, 0], [0.75, 0.08], [R, 0.35], [R * 0.98, 0.42], [0, 0.3]], c, { seg: 24 });
    // the open top shell, raised at the back
    const top = new THREE.LatheGeometry([[0, 0], [R * 0.95, 0.05], [R, 0.12], [0, 0.4]].map(([x, y]) => new THREE.Vector2(x, y)), 24);
    top.rotateX(-1.25);
    top.translate(0, 0.45, -R * 0.75);
    b.geo(top, shade(c, -0.05), { tess: false });
    for (let i = 0; i < 9; i++) b.cbox(0.04, 0.03, R * 0.9, Math.sin((i - 4) * 0.3) * 0.5, 0.45, 0, shade(c, -0.12), { ry: (i - 4) * 0.3, jitter: 0 });
    b.box(1.2, 0.12, 1.2, 0, 0.3, 0.05, '#f6eef6', { round: 0.06 });
    b.sphere(0.12, 0.45, 0.48, -0.35, '#fbf6ff', { roughness: 0.15, metalness: 0.3 });
    return { w: 2 * R, d: 2 * R, h: 1.2, seat: 0.45 };
  },

  coffin(b, o) {
    const wood = o.wood ?? '#3a2a30';
    const out = [[-0.28, -1.0], [0.28, -1.0], [0.45, -0.45], [0.32, 1.0], [-0.32, 1.0], [-0.45, -0.45]];
    slab(b, out, 0.42, wood, 0.06, { bevel: 0.02 });
    slab(b, out.map(([x, z]) => [x * 0.82, z * 0.9]), 0.02, o.c ?? '#7a1f2a', 0.47);
    b.box(0.5, 0.06, 0.3, 0, 0.46, -0.7, '#e8dcd8', { round: 0.03 });
    // its lid, set down beside it
    slab(b, out.map(([x, z]) => [x + 0.62, z]), 0.05, shade(wood, 0.05), 0.0);
    b.cbox(0.06, 0.4, 0.04, 0.62, 0.06, -0.1, GOLD, BRASS);
    b.cbox(0.2, 0.06, 0.04, 0.62, 0.06, -0.2, GOLD, BRASS);
    return { w: 1.6, d: 2.05, h: 0.5, seat: 0.5 };
  },

  leafBed(b, o) {
    const r = rng(o.seed);
    for (let i = 0; i < 9; i++) {
      const a = (i / 9) * Math.PI * 2;
      b.sphere(0.16, Math.cos(a) * 0.62, 0.08, Math.sin(a) * 0.95, o.edge ?? '#8a7a68', { sy: 0.7, seg: 8 });
    }
    foliage(b, { seed: o.seed, rx: 0.6, ry: 0.12, rz: 0.92, palette: o.palette ?? 'autumn', voxel: 0.09, sparse: 0.05 }, 0, 0, 0);
    for (let i = 0; i < 6; i++) b.cbox(0.3, 0.015, 0.12, (r() - 0.5) * 0.8, 0.26, (r() - 0.5) * 1.3, pick(r, ['#a2531f', '#c9762a', '#5a9440']), { ry: r() * 3, flat: true });
    return { w: 1.5, d: 2.1, h: 0.3, seat: 0.27 };
  },

  heartBed(b, o) {
    const c = o.c ?? '#e5384f', ht = heartOutline(2.0);
    slab(b, ht, 0.35, shade(c, -0.15), 0.02, { bevel: 0.03 });
    slab(b, heartOutline(1.85), 0.18, '#fbe8ee', 0.37, { bevel: 0.04 });
    slab(b, heartOutline(1.5).map(([x, z]) => [x, z + 0.15]), 0.08, c, 0.55, { bevel: 0.03 });
    for (const sx of [-1, 1]) b.box(0.45, 0.14, 0.3, sx * 0.3, 0.55, -0.55, '#ffffff', { round: 0.06 });
    // a heart headboard
    const hb = heartOutline(1.1).map(([x, z]) => [x, -z]);
    const s = new THREE.Shape();
    hb.forEach(([x, z], i) => (i ? s.lineTo(x, z) : s.moveTo(x, z)));
    const g = new THREE.ExtrudeGeometry(s, { depth: 0.08, bevelEnabled: false });
    g.translate(0, 1.0, -0.95);
    b.geo(g, c, { tess: false });
    return { w: 2.0, d: 2.0, h: 1.55, seat: 0.66, wall: true };
  },

  kline(b, o) {
    // Roman / Egyptian couch: one raised curved end, turned legs, cushions
    const L = 2.0, d = 0.85, wood = o.wood ?? '#6b4a34', c = o.c ?? '#a33b2b';
    b.box(L, 0.1, d, 0, 0.42, 0, wood);
    for (const sx of [-1, 1]) for (const sz of [-1, 1]) lathe(b, [[0.05, 0], [0.07, 0.1], [0.035, 0.22], [0.06, 0.32], [0.04, 0.42]], o.legs ?? wood, { seg: 10 }, sx * (L / 2 - 0.1), 0, sz * (d / 2 - 0.08));
    b.box(L - 0.05, 0.14, d - 0.05, 0, 0.52, 0, c, { round: 0.06 });
    b.cbox(0.16, 0.5, d, -L / 2 + 0.1, 0.72, 0, wood, { rz: 0.35, round: 0.04 });
    b.cyl(0.13, 0.13, d - 0.1, -L / 2 + 0.3, 0.72, 0, o.c2 ?? GOLD, { rx: Math.PI / 2, center: true, seg: 12 });
    b.box(0.5, 0.1, 0.4, 0.4, 0.66, 0, o.c2 ?? GOLD, { round: 0.04 });
    return { w: L, d, h: 1.0, seat: 0.66, wall: true };
  },

  sleepPod(b, o) {
    const c = o.c ?? '#e8eef4', glass = o.glass ?? '#9fe8ff';
    b.box(1.2, 0.45, 2.0, 0, 0, 0, c, { round: 0.18 });
    b.box(1.0, 0.12, 1.8, 0, 0.42, 0, '#5a6a80', { round: 0.05 });
    b.box(0.95, 0.06, 1.0, 0, 0.52, 0.35, o.c2 ?? '#3fb6d9', { round: 0.03 });
    // canopy slid back over the head
    b.sphere(0.6, 0, 0.45, -0.6, glass, { sy: 0.7, seg: 18, opacity: 0.35, roughness: 0.05 });
    for (const sx of [-1, 1]) b.box(0.04, 0.03, 1.6, sx * 0.58, 0.45, 0, glass, glow(glass, 1.5));
    return { w: 1.25, d: 2.05, h: 0.9, seat: 0.58, wall: true };
  },

  logBed(b, o) {
    const w = 1.35, d = 1.95, log = o.wood ?? '#8a5a36';
    b.box(w, 0.3, d, 0, 0.05, 0, log);
    bedding(b, w, d, 0.36, o.c ?? '#b3202c', { quilt: patternMaterial('checker', o.c ?? '#b3202c', o.c2 ?? '#f2e8d8', 3, 4) });
    for (const sx of [-1, 1]) for (const [z, h] of [[-d / 2, 1.2], [d / 2, 0.75]]) b.cyl(0.08, 0.09, h, sx * (w / 2), 0, z, log, { seg: 8 });
    for (const [z, h] of [[-d / 2, 1.0], [-d / 2, 0.7], [d / 2, 0.6]]) b.cyl(0.06, 0.06, w, 0, h, z, shade(log, -0.05), { rz: Math.PI / 2, center: true, seg: 8 });
    return { w: w + 0.2, d: d + 0.2, h: 1.25, seat: 0.6, wall: true };
  },

  // ---------------------------------------------------------------- sofas
  chaiseLongue(b, o) {
    const L = 1.8, d = 0.75, c = o.c ?? '#d9a3b8', wood = o.wood ?? GOLD;
    b.box(L, 0.18, d, 0, 0.22, 0, c, { round: 0.07 });
    // the high scrolled end and a low back on half the length
    b.cbox(0.25, 0.6, d, -L / 2 + 0.15, 0.55, 0, c, { rz: -0.25, round: 0.1 });
    b.cyl(0.13, 0.13, d + 0.02, -L / 2 + 0.05, 0.85, 0, c, { rx: Math.PI / 2, center: true, seg: 14 });
    b.box(L * 0.55, 0.38, 0.14, -L * 0.2, 0.38, -d / 2 + 0.07, c, { round: 0.06 });
    b.box(L, 0.04, d + 0.04, 0, 0.18, 0, wood, o.wood ? {} : BRASS);
    for (const sx of [-1, 1]) for (const sz of [-1, 1]) b.cbox(0.05, 0.2, 0.05, sx * (L / 2 - 0.08), 0.1, sz * (d / 2 - 0.06), wood, { rz: sx * 0.25, ...(o.wood ? {} : BRASS) });
    for (let i = 0; i < 6; i++) b.sphere(0.02, -0.3 + i * 0.22, 0.41, 0, shade(c, -0.15), { seg: 6 });
    b.box(0.35, 0.12, 0.3, -0.55, 0.42, 0.05, o.c2 ?? '#f6eef0', { round: 0.05 });
    return { w: L, d, h: 1.0, seat: 0.42, wall: true };
  },

  lacquerBench(b, o) {
    const L = 1.7, d = 0.7, lac = o.wood ?? '#1d1716', c = o.c ?? '#b3202c';
    b.box(L, 0.08, d, 0, 0.32, 0, lac, { roughness: 0.25 });
    for (const sx of [-1, 1]) b.box(0.08, 0.32, d - 0.1, sx * (L / 2 - 0.1), 0, 0, lac, { roughness: 0.25 });
    b.box(L - 0.1, 0.07, d - 0.1, 0, 0.4, 0, c, { round: 0.03 });
    b.box(L, 0.5, 0.07, 0, 0.4, -d / 2 + 0.04, lac, { roughness: 0.25 });
    for (let i = 0; i < 4; i++) b.box(0.32, 0.36, 0.02, -0.6 + i * 0.4, 0.46, -d / 2 + 0.085, o.c2 ?? GOLD, BRASS);
    return { w: L, d, h: 0.95, seat: 0.47, wall: true };
  },

  throne(b, o) {
    const c = o.c ?? '#a33b2b', frame = o.frame ?? GOLD, metal = o.frame ? {} : BRASS;
    const w = 0.9, d = 0.85;
    b.box(w, 0.42, d, 0, 0, 0, frame, metal);
    b.box(w - 0.12, 0.1, d - 0.12, 0, 0.42, 0.04, c, { round: 0.04 });
    b.box(w, 1.5, 0.12, 0, 0.42, -d / 2 + 0.06, frame, metal);
    b.box(w - 0.24, 1.15, 0.03, 0, 0.6, -d / 2 + 0.13, c);
    for (const sx of [-1, 1]) {
      b.box(0.1, 0.32, d, sx * (w / 2 - 0.05), 0.42, 0, frame, metal);
      b.sphere(0.08, sx * (w / 2 - 0.05), 0.8, d / 2 - 0.05, frame, metal);
      b.cyl(0, 0.07, 0.2, sx * (w / 2 - 0.08), 1.92, -d / 2 + 0.06, frame, { seg: 8, ...metal });
    }
    if (o.crest === 'shell') lathe(b, [[0, 0], [0.35, 0.05], [0.42, 0.25], [0, 0.3]], '#f6eef6', { seg: 12 }, 0, 1.75, -d / 2 + 0.05);
    else b.sphere(0.13, 0, 2.0, -d / 2 + 0.06, o.gem ?? '#2f6fb3', { roughness: 0.1, metalness: 0.4 });
    b.box(w + 0.2, 0.08, d + 0.25, 0, 0, 0.1, o.step ?? '#7a1f2a');
    return { w: w + 0.2, d: d + 0.25, h: 2.1, seat: 0.52, up: 1.3 };
  },

  rootThrone(b, o) {
    const bark = '#6b4a34';
    b.cyl(0.45, 0.55, 0.45, 0, 0, 0, bark, { seg: 10 });
    b.cyl(0.42, 0.42, 0.03, 0, 0.45, 0, '#c9a477', { seg: 16 });
    for (let i = 0; i < 6; i++) {
      const a = Math.PI + (i - 2.5) * 0.35;
      b.cbox(0.12, 1.3 - Math.abs(i - 2.5) * 0.18, 0.12, Math.sin(a) * 0.38, 0.9 - Math.abs(i - 2.5) * 0.08, Math.cos(a) * 0.38, shade(bark, (i % 2) * 0.05), { rz: Math.sin(a) * 0.15, rx: -0.15 });
    }
    for (let i = 0; i < 5; i++) b.cbox(0.1, 0.08, 0.5, Math.cos(i * 1.3) * 0.5, 0.04, Math.sin(i * 1.3) * 0.5, bark, { ry: -i * 1.3 });
    foliage(b, { seed: o.seed, rx: 0.4, ry: 0.15, palette: 'lime', voxel: 0.08, flowers: '#f2c94c', flowerRate: 0.1 }, 0, 1.45, -0.38);
    b.box(0.6, 0.06, 0.6, 0, 0.46, 0.04, '#5a9440', { round: 0.03 });
    return { w: 1.1, d: 1.1, h: 1.65, seat: 0.5, up: 1.2 };
  },

  sailPile(b, o) {
    const r = rng(o.seed);
    for (let i = 0; i < 6; i++) b.cbox(1.4 - i * 0.12, 0.12, 0.9 - i * 0.05, (r() - 0.5) * 0.15, 0.06 + i * 0.1, (r() - 0.5) * 0.1, i % 2 ? '#efe4c8' : '#e3d6b4', { ry: (r() - 0.5) * 0.4, round: 0.05 });
    for (let i = 0; i < 4; i++) b.cyl(0.25 - i * 0.04, 0.25 - i * 0.04, 0.05, 0.6, i * 0.05, 0.35, '#b89a6a', { seg: 14 });
    return { w: 1.5, d: 1.0, h: 0.7, seat: 0.66 };
  },

  hidePile(b, o) {
    const c = o.c ?? '#6b4a2e';
    for (let i = 0; i < 4; i++) b.cbox(1.5 - i * 0.2, 0.15, 1.0 - i * 0.1, 0, 0.08 + i * 0.12, -i * 0.05, i % 2 ? c : shade(c, 0.08), { round: 0.07, ry: (i - 1.5) * 0.15 });
    b.cbox(1.4, 0.4, 0.3, 0, 0.3, -0.45, shade(c, -0.05), { round: 0.15 });
    for (const s of [-1, 1]) b.cbox(0.06, 0.06, 0.5, s * 0.55, 0.12, 0.45, '#efe6d0', { ry: s * 0.4, rx: 0.3 });
    return { w: 1.5, d: 1.1, h: 0.6, seat: 0.5, wall: true };
  },

  bleacher(b, o) {
    const w = 1.7, c = o.c ?? '#c0283a', wood = '#a8703f';
    for (let i = 0; i < 3; i++) {
      b.box(w, 0.25, 0.32, 0, i * 0.25, 0.3 - i * 0.3, i % 2 ? '#f6f2ea' : c);
      b.box(w, 0.05, 0.34, 0, (i + 1) * 0.25, 0.3 - i * 0.3, wood);
    }
    b.box(w, 0.75, 0.32, 0, 0, -0.6, c);
    return { w, d: 1.2, h: 0.8, seat: 0.55 };
  },

  loungePod(b, o) {
    const c = o.c ?? '#eef2f6';
    lathe(b, [[0.2, 0], [0.8, 0.1], [0.9, 0.45], [0.75, 0.5], [0, 0.4]], c, { seg: 26 });
    b.cyl(0.7, 0.7, 0.08, 0, 0.42, 0, o.c2 ?? '#3fb6d9', { seg: 24 });
    b.cbox(1.5, 0.5, 0.18, 0, 0.7, -0.55, c, { round: 0.1, rx: -0.2 });
    b.cyl(0.85, 0.85, 0.02, 0, 0.02, 0, '#3fb6d9', glow('#3fb6d9', 1.2));
    return { w: 1.8, d: 1.7, h: 1.0, seat: 0.5 };
  },

  deckchair(b, o) {
    const c = o.c ?? '#e8492c', wood = '#c9a477';
    for (const sx of [-1, 1]) {
      b.cbox(0.05, 0.05, 1.3, sx * 0.3, 0.45, 0, wood, { rx: 0.55 });
      b.cbox(0.05, 0.05, 0.8, sx * 0.3, 0.25, 0.3, wood, { rx: -0.6 });
    }
    b.cbox(0.6, 0.02, 1.2, 0, 0.48, -0.02, c, { rx: 0.55, material: patternMaterial('stripes', c, '#f6f2ea', 3, 1) });
    b.box(0.6, 0.05, 0.45, 0, 0.32, 0.3, c);
    return { w: 0.75, d: 1.2, h: 0.95, seat: 0.36, up: 1.5 };
  },

  beanbag(b, o) {
    b.sphere(0.75, 0, 0.35, 0, o.c ?? '#ff4d8d', { sy: 0.5, seg: 20 });
    b.sphere(0.45, 0, 0.6, -0.35, shade(o.c ?? '#ff4d8d', -0.05), { sy: 0.7, seg: 16 });
    return { w: 1.5, d: 1.5, h: 0.75, seat: 0.66 };
  },

  log(b, o) {
    const r = rng(o.seed), L = 1.9, R = 0.28, bark = o.c ?? '#5e4230';
    b.cyl(R, R * 1.05, L, 0, R, 0, bark, { rz: Math.PI / 2, center: true, seg: 12 });
    for (const s of [-1, 1]) b.cyl(R * 0.85, R * 0.85, 0.02, s * L / 2, R, 0, '#c9a477', { rz: Math.PI / 2, center: true, seg: 12 });
    b.box(L * 0.7, 0.04, 0.3, 0, R * 1.9, 0, '#c9a477');
    foliage(b, { seed: o.seed, rx: 0.3, ry: 0.08, palette: 'lime', voxel: 0.06 }, -0.6, R * 1.8, -0.05);
    for (let i = 0; i < 3; i++) {
      const x = 0.3 + r() * 0.5;
      b.cyl(0.015, 0.02, 0.07, x, R * 1.7, R * 0.6, '#efe6d0', { seg: 5 });
      b.sphere(0.05, x, R * 1.7 + 0.08, R * 0.6, '#c0392b', { sy: 0.5, seg: 8 });
    }
    return { w: L, d: 0.65, h: 0.65, seat: R * 1.95 };
  },

  coralBench(b, o) {
    const r = rng(o.seed);
    b.cbox(1.6, 0.35, 0.7, 0, 0.2, 0, '#8ea29e', { round: 0.15 });
    b.box(1.4, 0.06, 0.55, 0, 0.36, 0, o.c ?? '#f6b0b8', { round: 0.03 });
    for (const s of [-1, 1]) for (let i = 0; i < 5; i++) {
      const a = r() * 6.28;
      b.cbox(0.06, 0.4 + r() * 0.3, 0.06, s * 0.75 + Math.cos(a) * 0.08, 0.5 + r() * 0.2, Math.sin(a) * 0.15, pick(r, ['#f08a7e', '#e8743a', '#b56ad8']), { rz: Math.cos(a) * 0.5, rx: Math.sin(a) * 0.5 });
    }
    return { w: 1.8, d: 0.75, h: 0.9, seat: 0.42 };
  },

  pew(b, o) {
    const L = 1.7, wood = o.wood ?? '#8a5a36';
    b.box(L, 0.08, 0.5, 0, 0.42, 0, wood);
    b.box(L, 0.75, 0.08, 0, 0.42, -0.22, wood);
    for (const sx of [-1, 1]) b.box(0.08, 0.95, 0.55, sx * (L / 2 - 0.04), 0, 0, shade(wood, -0.08));
    if (o.c) b.box(L - 0.2, 0.06, 0.42, 0, 0.5, 0.03, o.c, { round: 0.03 });
    return { w: L, d: 0.6, h: 1.2, seat: 0.52, wall: true };
  },

  // ---------------------------------------------------------------- armchairs and chairs
  wingback(b, o) {
    const c = o.c ?? '#2f5a46', wood = o.wood ?? '#4a2e1e';
    b.box(0.85, 0.38, 0.8, 0, 0.1, 0, c, { round: 0.06 });
    b.box(0.8, 0.85, 0.16, 0, 0.45, -0.32, c, { round: 0.07 });
    for (const sx of [-1, 1]) {
      b.cbox(0.12, 0.6, 0.45, sx * 0.38, 0.85, -0.18, c, { round: 0.05, ry: sx * 0.25 });
      b.box(0.14, 0.25, 0.75, sx * 0.36, 0.48, 0.02, c, { round: 0.06 });
    }
    b.box(0.58, 0.1, 0.55, 0, 0.48, 0.1, shade(c, 0.06), { round: 0.04 });
    roundLegs(b, 0.75, 0.7, 0.12, wood, 0.03);
    return { w: 0.9, d: 0.85, h: 1.3, seat: 0.56, up: 1.5 };
  },

  bergere(b, o) {
    const c = o.c ?? '#f2c6d6', gilt = o.wood ?? GOLD, metal = o.wood ? {} : BRASS;
    b.box(0.8, 0.12, 0.75, 0, 0.3, 0, gilt, metal);
    b.box(0.72, 0.12, 0.68, 0, 0.42, 0.02, c, { round: 0.05 });
    b.cyl(0.4, 0.4, 0.7, 0, 0.42, -0.25, gilt, { seg: 18, t0: Math.PI * 0.75, tl: Math.PI * 0.5, ...metal });
    b.cbox(0.62, 0.55, 0.06, 0, 0.75, -0.3, c, { round: 0.05 });
    for (const sx of [-1, 1]) {
      b.box(0.06, 0.25, 0.6, sx * 0.37, 0.42, 0, gilt, metal);
      b.cbox(0.05, 0.32, 0.05, sx * 0.34, 0.16, 0.3, gilt, { rx: -0.25, ...metal });
      b.cbox(0.05, 0.32, 0.05, sx * 0.34, 0.16, -0.3, gilt, { rx: 0.25, ...metal });
    }
    b.sphere(0.06, 0, 1.12, -0.3, gilt, metal);
    return { w: 0.85, d: 0.8, h: 1.2, seat: 0.54, up: 1.55 };
  },

  zabuton(b, o) {
    b.box(0.85, 0.1, 0.85, 0, 0, 0, o.c ?? '#7a2a3a', { round: 0.05 });
    b.sphere(0.04, 0, 0.1, 0, o.c2 ?? GOLD, { seg: 6 });
    // an armrest (kyosoku) behind
    b.box(0.6, 0.08, 0.14, 0, 0.3, -0.4, '#1d1716', { roughness: 0.3 });
    for (const sx of [-1, 1]) b.box(0.06, 0.3, 0.1, sx * 0.25, 0, -0.4, '#1d1716');
    return { w: 0.9, d: 0.95, h: 0.4, seat: 0.12, up: 1.7 };
  },

  rockSeat(b, o) {
    const c = o.c ?? '#8e8a82';
    b.sphere(0.5, 0, 0.18, 0, c, { sy: 0.55, seg: 10, flat: true });
    b.cyl(0.38, 0.4, 0.06, 0, 0.36, 0, shade(c, 0.05), { seg: 9 });
    if (o.moss) foliage(b, { seed: o.seed, rx: 0.3, ry: 0.06, palette: 'kelp', voxel: 0.06 }, 0.15, 0.36, -0.15);
    return { w: 1.0, d: 1.0, h: 0.45, seat: 0.42, up: 1.6 };
  },

  woodArmchair(b, o) {
    const wood = o.wood ?? '#7a5434', c = o.c ?? '#a33b2b';
    b.box(0.75, 0.06, 0.7, 0, 0.42, 0, wood);
    legs(b, 0.72, 0.66, 0.42, wood, 0.06);
    b.box(0.72, 0.07, 0.05, 0, 1.0, -0.32, wood);
    for (let i = 0; i < 5; i++) b.box(0.04, 0.52, 0.03, -0.24 + i * 0.12, 0.48, -0.32, wood);
    for (const sx of [-1, 1]) {
      b.box(0.08, 0.05, 0.72, sx * 0.36, 0.7, 0, wood);
      b.box(0.04, 0.24, 0.04, sx * 0.36, 0.46, 0.3, wood);
    }
    b.box(0.6, 0.07, 0.55, 0, 0.48, 0.03, c, { round: 0.03 });
    return { w: 0.8, d: 0.75, h: 1.05, seat: 0.55, up: 1.6 };
  },

  rockingChair(b, o) {
    const wood = o.wood ?? '#8a5a36';
    for (const sx of [-1, 1]) {
      b.cyl(0.6, 0.6, 0.05, sx * 0.3, 0.6, 0.05, wood, { rz: Math.PI / 2, center: true, seg: 20, t0: Math.PI * 0.82, tl: Math.PI * 0.36 });
      b.box(0.04, 0.4, 0.04, sx * 0.3, 0.04, 0.22, wood);
      b.cbox(0.04, 0.85, 0.04, sx * 0.3, 0.75, -0.3, wood, { rx: -0.2 });
      b.box(0.05, 0.04, 0.55, sx * 0.3, 0.68, 0, wood);
    }
    b.box(0.62, 0.05, 0.55, 0, 0.42, 0, wood);
    for (let i = 0; i < 5; i++) b.cbox(0.04, 0.6, 0.02, -0.2 + i * 0.1, 0.8, -0.32, wood, { rx: -0.2 });
    b.box(0.5, 0.05, 0.45, 0, 0.47, 0.02, o.c ?? '#a33b2b', { material: patternMaterial('checker', o.c ?? '#a33b2b', '#efe6d0', 2, 2) });
    return { w: 0.7, d: 0.9, h: 1.2, seat: 0.52, up: 1.5 };
  },

  pilotSeat(b, o) {
    const c = o.c ?? '#33405a';
    b.cyl(0.25, 0.32, 0.08, 0, 0, 0, '#9aa6b4', { seg: 14, metalness: 0.6 });
    b.cyl(0.06, 0.06, 0.35, 0, 0.08, 0, '#9aa6b4', { metalness: 0.6 });
    b.box(0.7, 0.14, 0.65, 0, 0.42, 0, c, { round: 0.06 });
    b.cbox(0.65, 0.85, 0.14, 0, 0.95, -0.3, c, { round: 0.07, rx: -0.12 });
    for (const sx of [-1, 1]) {
      b.box(0.1, 0.08, 0.5, sx * 0.38, 0.65, 0.05, '#cfd6de', { round: 0.03 });
      b.box(0.04, 0.6, 0.02, sx * 0.18, 0.6, -0.23, '#ff9a3a', { rx: -0.12 });
    }
    b.box(0.12, 0.06, 0.12, 0.38, 0.73, 0.25, '#ff4a4a', glow('#ff4a4a', 1));
    return { w: 0.85, d: 0.75, h: 1.4, seat: 0.56, up: 1.5 };
  },

  planeSeat(b, o) {
    const c = o.c ?? '#2f5d8a';
    b.box(0.6, 0.14, 0.55, 0, 0.38, 0, c, { round: 0.05 });
    b.cbox(0.58, 0.85, 0.14, 0, 0.9, -0.28, c, { round: 0.06, rx: -0.15 });
    b.box(0.45, 0.2, 0.1, 0, 1.25, -0.36, '#f6f2ea', { round: 0.04 });
    for (const sx of [-1, 1]) b.box(0.06, 0.06, 0.5, sx * 0.33, 0.6, 0, '#9aa6b4', { metalness: 0.4 });
    legs(b, 0.5, 0.45, 0.38, '#6a7480', 0.04);
    return { w: 0.7, d: 0.65, h: 1.4, seat: 0.52, up: 1.6 };
  },

  curule(b, o) {
    const metal = o.c ?? GOLD;
    for (const sz of [-1, 1]) for (const r of [0.7, -0.7]) b.cbox(0.05, 0.6, 0.05, 0, 0.25, sz * 0.25, metal, { rz: r, ...BRASS });
    b.box(0.7, 0.06, 0.55, 0, 0.45, 0, metal, BRASS);
    b.box(0.62, 0.08, 0.5, 0, 0.5, 0, o.c2 ?? '#7a1f2a', { round: 0.03 });
    for (const sx of [-1, 1]) b.sphere(0.05, sx * 0.35, 0.5, 0, metal, BRASS);
    return { w: 0.75, d: 0.6, h: 0.6, seat: 0.58, up: 1.7 };
  },

  stool(b, o) {
    const top = o.c ?? '#a8703f', leg = o.leg ?? shade(top, -0.12), h = o.h ?? 0.45;
    if (o.kind === 'drum') {
      // a barrel-shaped (porcelain, lacquer) stool
      lathe(b, [[0.2, 0], [0.26, 0.1], [0.28, h * 0.5], [0.26, h - 0.08], [0.2, h], [0, h]], top, { seg: 18 });
      b.cyl(0.27, 0.27, 0.05, 0, h * 0.45, 0, o.c2 ?? '#2f5d8a', { seg: 18 });
    } else if (o.kind === 'three') {
      b.cyl(0.24, 0.24, 0.07, 0, h - 0.07, 0, top, { seg: 14 });
      for (let i = 0; i < 3; i++) { const a = (i / 3) * Math.PI * 2; b.cbox(0.05, h, 0.05, Math.cos(a) * 0.14, h / 2 - 0.02, Math.sin(a) * 0.14, leg, { rz: Math.cos(a) * 0.2, rx: -Math.sin(a) * 0.2 }); }
    } else if (o.kind === 'bar') {
      b.cyl(0.22, 0.22, 0.08, 0, h - 0.08, 0, top, { seg: 16 });
      b.cyl(0.04, 0.05, h - 0.08, 0, 0, 0, leg, { seg: 8, metalness: 0.5 });
      b.cyl(0.2, 0.2, 0.03, 0, h * 0.35, 0, leg, { seg: 14, metalness: 0.5 });
      b.cyl(0.22, 0.24, 0.04, 0, 0, 0, leg, { seg: 14, metalness: 0.5 });
    } else {
      b.box(0.45, 0.07, 0.45, 0, h - 0.07, 0, top);
      legs(b, 0.4, 0.4, h - 0.07, leg, 0.05);
    }
    if (o.cushion) b.box(0.36, 0.06, 0.36, 0, h, 0, o.cushion, { round: 0.03 });
    return { w: 0.55, d: 0.55, h, seat: h + (o.cushion ? 0.05 : 0), up: 1.9 };
  },

  barrel(b, o) {
    const h = o.h ?? 0.75, R = o.r ?? 0.32, wood = o.c ?? '#8a5a36';
    lathe(b, [[R * 0.85, 0], [R, h * 0.25], [R * 1.08, h * 0.5], [R, h * 0.75], [R * 0.85, h], [0, h]], wood, { seg: 16 });
    for (const t of [0.12, 0.3, 0.7, 0.88]) b.cyl(R * (t > 0.2 && t < 0.8 ? 1.08 : 0.92), R * (t > 0.2 && t < 0.8 ? 1.08 : 0.92), 0.04, 0, h * t - 0.02, 0, '#3a3a3e', { seg: 16, metalness: 0.5 });
    if (o.liquid) b.cyl(R * 0.8, R * 0.8, 0.01, 0, h - 0.02, 0, o.liquid, { seg: 16, roughness: 0.1 });
    return { w: R * 2.2, d: R * 2.2, h, seat: h, up: 1.8 };
  },

  bistro(b, o) {
    const frame = o.c ?? '#2a2523';
    b.cyl(0.22, 0.22, 0.04, 0, 0.45, 0, o.seat ?? '#c9a477', { seg: 16 });
    for (let i = 0; i < 4; i++) { const a = (i / 4) * Math.PI * 2 + 0.78; b.cbox(0.03, 0.47, 0.03, Math.cos(a) * 0.16, 0.22, Math.sin(a) * 0.16, frame, { rz: Math.cos(a) * 0.12, rx: -Math.sin(a) * 0.12 }); }
    b.cyl(0.2, 0.2, 0.03, 0, 0.75, -0.08, frame, { seg: 14, t0: Math.PI * 0.6, tl: Math.PI * 0.8 });
    for (const sx of [-1, 1]) b.cbox(0.03, 0.45, 0.03, sx * 0.15, 0.7, -0.17, frame, { rx: -0.1 });
    b.cyl(0.16, 0.16, 0.025, 0, 0.18, 0, frame, { seg: 14 });
    return { w: 0.5, d: 0.5, h: 0.95, seat: 0.5, up: 1.9 };
  },

  gildedChair(b, o) {
    const gilt = GOLD, c = o.c ?? '#f2c6d6';
    b.box(0.5, 0.06, 0.48, 0, 0.42, 0, gilt, BRASS);
    b.box(0.44, 0.06, 0.42, 0, 0.48, 0.02, c, { round: 0.03 });
    for (const sx of [-1, 1]) for (const sz of [-1, 1]) b.cbox(0.04, 0.44, 0.04, sx * 0.21, 0.2, sz * 0.2, gilt, { rx: sz * 0.12, ...BRASS });
    // a medallion back
    b.cyl(0.2, 0.2, 0.04, 0, 0.88, -0.22, gilt, { rx: Math.PI / 2, center: true, seg: 18, ...BRASS });
    b.cyl(0.16, 0.16, 0.05, 0, 0.88, -0.22, c, { rx: Math.PI / 2, center: true, seg: 18 });
    for (const sx of [-1, 1]) b.box(0.04, 0.3, 0.04, sx * 0.12, 0.48, -0.22, gilt, BRASS);
    return { w: 0.55, d: 0.52, h: 1.1, seat: 0.53, up: 1.8 };
  },

  stump(b, o) {
    const R = o.r ?? 0.32, h = o.h ?? 0.45;
    b.cyl(R, R * 1.15, h, 0, 0, 0, '#6b4a34', { seg: 11 });
    b.cyl(R * 0.95, R * 0.95, 0.02, 0, h, 0, '#d9b47a', { seg: 14 });
    b.cyl(R * 0.5, R * 0.5, 0.021, 0, h, 0, '#c49a62', { seg: 14 });
    for (let i = 0; i < 4; i++) b.cbox(0.08, 0.06, 0.28, Math.cos(i * 1.6) * R, 0.03, Math.sin(i * 1.6) * R, '#5e4230', { ry: -i * 1.6 });
    if (o.moss) foliage(b, { seed: o.seed, rx: R * 0.6, ry: 0.06, palette: 'lime', voxel: 0.05 }, -R * 0.4, h, R * 0.2);
    return { w: R * 2.4, d: R * 2.4, h, seat: h + 0.01, up: 1.9 };
  },

  toadstoolSeat(b, o) {
    b.cyl(0.13, 0.18, 0.32, 0, 0, 0, '#f2ead8', { seg: 10 });
    lathe(b, [[0, 0], [0.38, 0.0], [0.4, 0.06], [0.3, 0.14], [0, 0.17]], o.c ?? '#c0392b', { seg: 18 }, 0, 0.3, 0);
    for (let i = 0; i < 6; i++) b.sphere(0.035, Math.cos(i) * 0.24, 0.42, Math.sin(i) * 0.24, '#fbf6ea', { sy: 0.4, seg: 6 });
    return { w: 0.8, d: 0.8, h: 0.47, seat: 0.46, up: 1.9 };
  },

  magStool(b, o) {
    b.cyl(0.25, 0.25, 0.06, 0, 0, 0, '#5a6474', { seg: 18, metalness: 0.5 });
    b.cyl(0.24, 0.24, 0.02, 0, 0.06, 0, '#3fb6d9', glow('#3fb6d9', 1.4));
    b.cyl(0.22, 0.22, 0.1, 0, 0.32, 0, o.c ?? '#eef2f6', { seg: 18 });
    b.cyl(0.04, 0.04, 0.26, 0, 0.06, 0, '#9aa6b4', { metalness: 0.7 });
    return { w: 0.55, d: 0.55, h: 0.42, seat: 0.43, up: 1.9 };
  },

  pouf(b, o) {
    b.cyl(0.32, 0.34, 0.35, 0, 0, 0, o.c ?? '#a8703f', { seg: 16 });
    b.cyl(0.3, 0.3, 0.03, 0, 0.35, 0, shade(o.c ?? '#a8703f', 0.1), { seg: 16 });
    for (let i = 0; i < 8; i++) b.box(0.02, 0.3, 0.01, Math.cos((i / 8) * 6.28) * 0.335, 0.03, Math.sin((i / 8) * 6.28) * 0.335, o.c2 ?? '#f2c94c', { ry: -(i / 8) * 6.28 });
    return { w: 0.7, d: 0.7, h: 0.38, seat: 0.38, up: 1.9 };
  },

  // ---------------------------------------------------------------- benches
  stoneBench(b, o) {
    const c = o.c ?? '#a9a296', L = 1.6;
    b.box(L, 0.12, 0.5, 0, 0.36, 0, c);
    for (const s of [-1, 1]) b.box(0.3, 0.36, 0.42, s * (L / 2 - 0.25), 0, 0, shade(c, -0.08));
    if (o.moss) foliage(b, { seed: o.seed, rx: 0.25, ry: 0.05, palette: 'lime', voxel: 0.05 }, L / 2 - 0.3, 0.48, -0.1);
    return { w: L, d: 0.55, h: 0.5, seat: 0.48 };
  },

  ray(b, o) {
    const c = o.c ?? '#7a8a96';
    slab(b, [[0, -0.75], [0.8, 0], [0, 0.55], [-0.8, 0]], 0.12, c, 0.08, { bevel: 0.05 });
    b.cbox(0.05, 0.03, 0.9, 0, 0.12, 0.95, shade(c, -0.1), { rx: 0.05 });
    for (const sx of [-1, 1]) b.sphere(0.04, sx * 0.15, 0.25, -0.3, '#1d1b1c', { seg: 6 });
    b.box(0.6, 0.03, 0.4, 0, 0.25, 0, shade(c, 0.12), { round: 0.01 });
    return { w: 1.7, d: 1.6, h: 0.3, seat: 0.28 };
  },

  rowBench(b, o) {
    const wood = '#8a5a36';
    b.box(1.6, 0.07, 0.4, 0, 0.42, 0, wood);
    for (const s of [-1, 1]) b.box(0.1, 0.42, 0.35, s * 0.65, 0, 0, shade(wood, -0.1));
    for (const s of [-1, 1]) {
      b.cbox(0.05, 0.05, 1.5, s * 0.35, 0.47, 0.25, '#c9a477', { ry: s * 0.25 });
      b.cbox(0.14, 0.03, 0.35, s * 0.35 + s * 0.18, 0.47, 0.95, '#c9a477', { ry: s * 0.25 });
    }
    return { w: 1.7, d: 1.4, h: 0.55, seat: 0.5 };
  },

  hayBale(b, o) {
    const c = o.c ?? '#e2c26a';
    b.box(1.3, 0.5, 0.7, 0, 0, 0, c, { round: 0.05, material: patternMaterial('straw', c, shade(c, -0.15), 1, 1) });
    for (const s of [-0.35, 0.35]) b.box(0.03, 0.52, 0.72, s, 0, 0, '#8a6a3a');
    return { w: 1.3, d: 0.7, h: 0.5, seat: 0.52 };
  },

  sleigh(b, o) {
    const c = o.c ?? '#b3202c', runner = o.runner ?? GOLD, L = 1.7;
    for (const s of [-1, 1]) {
      b.box(0.06, 0.04, L, s * 0.4, 0, 0, runner, BRASS);
      b.cyl(0.18, 0.18, 0.04, s * 0.4, 0.18, L / 2, runner, { rz: Math.PI / 2, center: true, seg: 14, t0: 0, tl: Math.PI, ...BRASS });
    }
    b.box(0.9, 0.35, L - 0.3, 0, 0.12, -0.1, c, { round: 0.08 });
    b.box(0.9, 0.55, 0.15, 0, 0.3, -L / 2 + 0.15, c, { round: 0.06 });
    b.box(0.75, 0.08, 1.0, 0, 0.47, 0.0, o.c2 ?? '#2f5a3a', { round: 0.04 });
    if (o.gifts) for (let i = 0; i < 3; i++) b.box(0.25, 0.22, 0.25, -0.25 + i * 0.25, 0.47, -0.55, ['#2f6f7e', '#f2c94c', '#3f7a4a'][i], { ry: i * 0.3 });
    return { w: 0.95, d: L, h: 0.85, seat: 0.55, up: 1.3 };
  },

  gymBench(b, o) {
    b.box(0.4, 0.12, 1.5, 0, 0.4, 0, o.c ?? '#33405a', { round: 0.05 });
    for (const s of [-1, 1]) b.box(0.3, 0.4, 0.08, 0, 0, s * 0.6, '#9aa6b4', { metalness: 0.6 });
    for (const s of [-1, 1]) {
      b.box(0.05, 0.9, 0.05, s * 0.45, 0, -0.65, '#9aa6b4', { metalness: 0.6 });
      b.cyl(0.18, 0.18, 0.06, s * 0.62, 0.9, -0.65, '#2a2e36', { rz: Math.PI / 2, center: true, seg: 16 });
    }
    b.cyl(0.02, 0.02, 1.4, 0, 0.9, -0.65, '#cfd6de', { rz: Math.PI / 2, center: true, metalness: 0.8 });
    return { w: 1.4, d: 1.6, h: 1.0, seat: 0.52 };
  },

  cushionPile(b, o) {
    const r = rng(o.seed), cols = ['#ff4d8d', '#5aa9e6', '#f2c94c', '#7cc66a', '#b06ad8'];
    for (let i = 0; i < 7; i++) b.cbox(0.6, 0.15, 0.6, (r() - 0.5) * 0.8, 0.08 + Math.floor(i / 3) * 0.14, (r() - 0.5) * 0.5, cols[i % cols.length], { round: 0.07, ry: r() * 3 });
    return { w: 1.3, d: 1.0, h: 0.45, seat: 0.42 };
  },

  // ---------------------------------------------------------------- rugs and mats
  tatami(b, o) {
    for (const [x, z, w, d] of [[-0.45, -0.45, 0.9, 0.9], [0.45, -0.45, 0.9, 0.9], [0, 0.45, 1.8, 0.9]]) {
      b.box(w - 0.02, 0.025, d - 0.02, x, 0, z, o.c ?? '#d8cf98', { jitter: 0, material: patternMaterial('lines', o.c ?? '#d8cf98', shade(o.c ?? '#d8cf98', -0.06), 1, 4) });
      for (const s of [-1, 1]) b.box(w - 0.02, 0.03, 0.05, x, 0, z + s * (d / 2 - 0.035), o.c2 ?? '#2f3a2a', { jitter: 0 });
    }
    return { w: 1.8, d: 1.8, h: 0.03, seat: 0.03, up: 1 };
  },

  net(b, o) {
    const c = o.c ?? '#8a7a5a';
    for (let i = 0; i < 9; i++) {
      b.box(1.7, 0.01, 0.02, 0, 0, -0.8 + i * 0.2, c, { jitter: 0, shadow: false, ry: (i % 2) * 0.03 });
      b.box(0.02, 0.012, 1.7, -0.8 + i * 0.2, 0, 0, c, { jitter: 0, shadow: false, ry: (i % 2) * 0.03 });
    }
    for (let i = 0; i < 4; i++) b.sphere(0.07, -0.75 + i * 0.5, 0.05, 0.85, i % 2 ? '#e8743a' : '#f6f2ea', { seg: 8 });
    return { w: 1.8, d: 1.8, h: 0.04, seat: 0.03, up: 1 };
  },

  pelt(b, o) {
    const c = o.c ?? '#8a6a4a';
    const out = [[0, -0.95], [0.25, -0.75], [0.6, -0.85], [0.5, -0.4], [0.62, 0.1], [0.45, 0.55], [0.65, 0.85], [0.2, 0.7], [0, 0.9], [-0.2, 0.7], [-0.65, 0.85], [-0.45, 0.55], [-0.62, 0.1], [-0.5, -0.4], [-0.6, -0.85], [-0.25, -0.75]];
    slab(b, out, 0.03, c, 0, { bevel: 0.015 });
    slab(b, out.map(([x, z]) => [x * 0.55, z * 0.6]), 0.02, shade(c, 0.1), 0.03);
    if (o.head) {
      b.sphere(0.22, 0, 0.12, -1.05, c, { sy: 0.6, seg: 12 });
      b.sphere(0.1, 0, 0.1, -1.25, shade(c, 0.15), { seg: 8 });
      for (const s of [-1, 1]) b.sphere(0.06, s * 0.15, 0.2, -0.95, c, { seg: 6 });
    }
    return { w: 1.4, d: 2.0, h: 0.05, seat: 0.04, up: 1 };
  },

  mosaic(b, o) {
    const cols = o.cols ?? ['#efe6d0', '#8a2a2a', '#2f5e8c', '#d9b45a'];
    b.box(1.75, 0.02, 1.75, 0, 0, 0, cols[0], { jitter: 0 });
    for (let i = 0; i < 7; i++) for (let j = 0; j < 7; j++) {
      const ring = Math.max(Math.abs(i - 3), Math.abs(j - 3));
      b.box(0.2, 0.025, 0.2, (i - 3) * 0.23, 0, (j - 3) * 0.23, cols[1 + (ring % 3)], { jitter: 0, shadow: false });
    }
    return { w: 1.75, d: 1.75, h: 0.03, seat: 0.03, up: 1 };
  },

  reedMat(b, o) {
    const c = o.c ?? '#d9c48a';
    b.box(1.6, 0.02, 1.2, 0, 0, 0, c, { jitter: 0, material: patternMaterial('lines', c, shade(c, -0.1), 6, 1) });
    for (const s of [-1, 1]) b.box(1.62, 0.025, 0.08, 0, 0, s * 0.6, o.c2 ?? '#2f5e8c', { jitter: 0 });
    return { w: 1.6, d: 1.25, h: 0.03, seat: 0.03, up: 1 };
  },

  lightPanel(b, o) {
    const c = o.c ?? '#3fb6d9';
    b.box(1.6, 0.03, 1.6, 0, 0, 0, '#2a2e36', { jitter: 0 });
    for (let i = 0; i < 4; i++) for (let j = 0; j < 4; j++) b.box(0.34, 0.035, 0.34, (i - 1.5) * 0.38, 0, (j - 1.5) * 0.38, (i + j) % 2 ? c : shade(c, -0.15), { ...glow(c, (i + j) % 2 ? 1.2 : 0.4), jitter: 0 });
    return { w: 1.6, d: 1.6, h: 0.04, seat: 0.04, up: 1 };
  },

  seaweedMat(b, o) {
    const r = rng(o.seed);
    b.box(1.6, 0.02, 1.6, 0, 0, 0, '#3f6a32', { jitter: 0 });
    for (let i = 0; i < 26; i++) b.cbox(0.06, 0.02, 0.5 + r() * 0.4, (r() - 0.5) * 1.5, 0.02, (r() - 0.5) * 1.4, pick(r, ['#5a8a3a', '#7aa84a', '#2a4a2a']), { ry: r() * 3, jitter: 0, shadow: false });
    return { w: 1.6, d: 1.6, h: 0.04, seat: 0.04, up: 1 };
  },

  mossRug(b, o) {
    b.cyl(0.85, 0.88, 0.03, 0, 0, 0, '#5a8a3a', { seg: 14, jitter: 0 });
    foliage(b, { seed: o.seed, rx: 0.75, ry: 0.04, palette: 'lime', voxel: 0.07, flowers: '#f4f1ff', flowerRate: 0.08 }, 0, 0.02, 0);
    return { w: 1.75, d: 1.75, h: 0.08, seat: 0.07, up: 1 };
  },

  playMat(b, o) {
    const cols = o.cols ?? ['#ff4d8d', '#5aa9e6', '#f2c94c', '#7cc66a'];
    for (let i = 0; i < 4; i++) for (let j = 0; j < 4; j++) b.box(0.42, 0.04, 0.42, (i - 1.5) * 0.43, 0, (j - 1.5) * 0.43, cols[(i + j * 2) % cols.length], { jitter: 0, round: 0.01 });
    return { w: 1.75, d: 1.75, h: 0.04, seat: 0.04, up: 1 };
  },

  roundRug(b, o) {
    const cols = o.cols ?? ['#f6f2ea', '#f2c94c', '#7cc66a'];
    for (let i = 0; i < 3; i++) b.cyl(0.85 - i * 0.25, 0.85 - i * 0.25, 0.015 + i * 0.006, 0, 0, 0, cols[i], { seg: 28, jitter: 0, shadow: false });
    if (o.petals) for (let i = 0; i < 10; i++) b.cbox(0.22, 0.03, 0.09, Math.cos(i * 0.628) * 0.48, 0.006, Math.sin(i * 0.628) * 0.48, o.petals, { ry: -i * 0.628, jitter: 0, shadow: false });
    return { w: 1.7, d: 1.7, h: 0.03, seat: 0.03, up: 1 };
  },
};

