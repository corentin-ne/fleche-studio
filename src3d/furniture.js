// Furniture and decor for the Murdoku board, one model per object type of the
// data contract (docs/murdoku-format.md). Most models are adapted from
// building-builder (src/catalog.js and src/props.js): bed, sofa, chairs, tables,
// counter, cabinet, bookshelf, TV, fireplace, rug, lamp, bath, bench, fountain,
// trees and potted plants. Sink, desk props and the grand piano are new.
// These are the manor's furniture; each other world swaps in its own models
// and colours (kit/index.js), and falls back on these for what it leaves out.
// Every model sits on y = 0, centred on (0, 0), its front facing +z.
import * as THREE from 'three';
import { Builder, foliage, patternMaterial, rng, seedBuilders } from './geo.js';
import { BRASS, WOODS, bookRow, pottedPlant } from './kit/common.js';
import { KIT_MODELS, kitEntry } from './kit/index.js';

const DARK = '#1c1a1a';

// Per-room accent colours, so two bedrooms don't get the same bed.
const ACCENTS = ['#c0392b', '#2f6f7e', '#7a3fa0', '#d9a441', '#3f7a4a', '#d8432e', '#33405a', '#c46aa8'];

// --- the models --------------------------------------------------------------
// Each returns its footprint (w along x, d along z), the height of its top,
// the seat height when someone can stand or sit on it, and whether it likes to
// stand against a wall.
const MODELS = {
  bed(b, o) {
    const w = 1.3, d = 1.95;
    const frame = o.wood ?? WOODS[o.k % WOODS.length], sheet = o.sheet ?? ACCENTS[o.k % ACCENTS.length];
    b.box(w, 0.3, d, 0, 0.05, 0, frame);
    b.box(w - 0.06, 0.2, d - 0.06, 0, 0.35, 0, '#f2f0ea', { round: 0.07 });
    b.box(w + 0.04, 0.09, d * 0.62, 0, 0.5, d * 0.19, sheet, { round: 0.04 });
    b.box(w + 0.03, 0.3, 0.04, 0, 0.29, d / 2 - 0.01, sheet);
    // folded band at the top of the blanket
    b.box(w + 0.05, 0.1, 0.16, 0, 0.5, d * 0.19 - d * 0.31 + 0.08, '#f6f2ea', { round: 0.04 });
    for (const sx of [-1, 1]) b.box(w * 0.38, 0.14, 0.36, sx * w * 0.22, 0.53, -d / 2 + 0.3, '#e8eef6', { round: 0.06 });
    b.box(w + 0.1, 1.0, 0.1, 0, 0, -d / 2 - 0.02, frame);
    return { w: w + 0.1, d: d + 0.1, h: 1.0, seat: 0.58, wall: true };
  },

  sofa(b, o) {
    const w = 1.9, d = 0.9, color = o.c ?? ['#f1ede2', '#86a6bf', '#9fb08a', '#d9a3a0'][o.k % 4];
    const r = rng(o.seed);
    b.box(w, 0.25, d, 0, 0.1, 0, color, { round: 0.06 });
    b.box(w, 0.5, 0.24, 0, 0.3, -d / 2 + 0.12, color, { round: 0.09 });
    b.box(0.22, 0.34, d, -w / 2 + 0.11, 0.3, 0, color, { round: 0.09 });
    b.box(0.22, 0.34, d, w / 2 - 0.11, 0.3, 0, color, { round: 0.09 });
    const nc = 2, cw = (w - 0.4) / nc;
    for (let i = 0; i < nc; i++) b.box(cw - 0.03, 0.12, d - 0.26, -w / 2 + 0.2 + cw * (i + 0.5), 0.35, 0.1, color, { roughness: 0.95, round: 0.06 });
    for (const sx of [-1, 1]) for (const sz of [-1, 1]) b.box(0.06, 0.1, 0.06, sx * (w / 2 - 0.08), 0, sz * (d / 2 - 0.08), '#4a3a2a');
    const cols = ['#d9c641', '#d8432e', '#1f4d3d'];
    for (let i = 0; i < 3; i++) {
      const x = -w / 2 + 0.35 + ((i + 0.5) * (w - 0.7)) / 3;
      b.cbox(0.38, 0.38, 0.12, x, 0.66, -d / 2 + 0.3, cols[i], { rx: -0.25, rz: (r() - 0.5) * 0.35, round: 0.06 });
    }
    return { w, d, h: 0.8, seat: 0.47, wall: true };
  },

  armchair(b, o) {
    const color = o.c ?? ['#c0392b', '#2f6f7e', '#d9a441', '#7a3fa0'][o.k % 4];
    b.box(0.85, 0.4, 0.85, 0, 0.05, 0, color, { round: 0.08 });
    b.box(0.85, 0.55, 0.22, 0, 0.4, -0.32, color, { round: 0.09 });
    b.box(0.17, 0.27, 0.85, -0.34, 0.42, 0, color, { round: 0.08 });
    b.box(0.17, 0.27, 0.85, 0.34, 0.42, 0, color, { round: 0.08 });
    b.box(0.55, 0.12, 0.6, 0, 0.42, 0.08, '#f1ede2', { round: 0.05 });
    for (const sx of [-1, 1]) for (const sz of [-1, 1]) b.box(0.05, 0.06, 0.05, sx * 0.36, 0, sz * 0.36, '#4a3a2a');
    return { w: 0.85, d: 0.85, h: 0.95, seat: 0.54, up: 1.55 };
  },

  chair(b, o) {
    const color = o.c ?? ['#c0392b', '#3f7a4a', '#2f5d8a', '#d9a441'][o.k % 4], frame = o.wood ?? '#5a3b26';
    for (const sx of [-1, 1]) for (const sz of [-1, 1]) b.box(0.04, 0.45, 0.04, sx * 0.2, 0, sz * 0.2, frame);
    b.box(0.48, 0.07, 0.48, 0, 0.45, 0, frame);
    b.box(0.42, 0.04, 0.42, 0, 0.52, 0.01, color, { round: 0.015 });
    b.box(0.46, 0.5, 0.06, 0, 0.5, -0.22, frame);
    b.box(0.36, 0.3, 0.065, 0, 0.62, -0.22, color);
    return { w: 0.5, d: 0.5, h: 1.0, seat: 0.56, up: 1.75 };
  },

  rug(b, o) {
    const w = 1.75, d = 1.75;
    const pals = [['#8a2f3a', '#e9d9b8', '#2c3a6a'], ['#2c4a6a', '#efe6c8', '#c9762a'], ['#3f6b4a', '#f1ead2', '#a33b2b'], ['#6a3f7a', '#efe6c8', '#d9a441']];
    const [field, light, accent] = o.pal ?? pals[o.k % pals.length];
    b.box(w, 0.012, d, 0, 0, 0, light, { jitter: 0 });
    b.box(w - 0.12, 0.018, d - 0.12, 0, 0, 0, accent, { jitter: 0, roughness: 1 });
    b.box(w - 0.26, 0.022, d - 0.26, 0, 0, 0, field, { jitter: 0, roughness: 1 });
    b.cbox(0.62, 0.026, 0.62, 0, 0.013, 0, light, { ry: Math.PI / 4, jitter: 0 });
    b.cbox(0.36, 0.03, 0.36, 0, 0.015, 0, accent, { ry: Math.PI / 4, jitter: 0 });
    for (const sx of [-1, 1]) for (const sz of [-1, 1]) b.cbox(0.18, 0.026, 0.18, sx * (w / 2 - 0.3), 0.013, sz * (d / 2 - 0.3), light, { ry: Math.PI / 4, jitter: 0 });
    // fringes
    for (const sz of [-1, 1]) for (let i = 0; i < 14; i++) b.box(0.025, 0.008, 0.08, -w / 2 + 0.08 + (i * (w - 0.16)) / 13, 0, sz * (d / 2 + 0.03), light, { jitter: 0, shadow: false });
    return { w, d: d + 0.1, h: 0.03, seat: 0.03, up: 1 };
  },

  bench(b, o) {
    const w = 1.6, garden = o.room === 'garden';
    const color = o.c ?? (garden ? '#4f6f5a' : '#a8703f'), frame = o.wood ?? (garden ? '#2a2523' : '#6b4a34');
    for (const s of [-1, 1]) {
      b.box(0.06, 0.42, 0.5, s * (w / 2 - 0.15), 0, 0, frame);
      b.box(0.06, 0.25, 0.06, s * (w / 2 - 0.15), 0.42, -0.2, frame);
    }
    for (let i = 0; i < 3; i++) b.box(w, 0.04, 0.12, 0, 0.42, -0.14 + i * 0.14, color);
    for (let i = 0; i < 2; i++) b.cbox(w, 0.11, 0.035, 0, 0.62 + i * 0.15, -0.25 - i * 0.03, color, { rx: -0.2 });
    if (!garden && !o.c) b.box(w - 0.3, 0.06, 0.34, 0, 0.46, 0.0, '#c46aa8', { round: 0.03 });
    return { w, d: 0.6, h: 0.85, seat: 0.48, up: 1.05 };
  },

  table(b, o) {
    const wood = WOODS[o.k % WOODS.length];
    if (o.room === 'dining') {
      // round table with a cloth, plates and a candle
      b.cyl(0.62, 0.62, 0.05, 0, 0.7, 0, wood, { seg: 28 });
      b.cyl(0.66, 0.7, 0.3, 0, 0.45, 0, '#f4efe4', { seg: 28 });
      b.cyl(0.05, 0.06, 0.7, 0, 0, 0, '#5a3b26');
      b.cyl(0.28, 0.32, 0.04, 0, 0, 0, '#5a3b26');
      for (let i = 0; i < 4; i++) {
        const a = (i / 4) * Math.PI * 2 + Math.PI / 4;
        b.cyl(0.13, 0.11, 0.02, Math.cos(a) * 0.42, 0.75, Math.sin(a) * 0.42, '#ffffff', { seg: 18, roughness: 0.3 });
        b.cyl(0.07, 0.07, 0.022, Math.cos(a) * 0.42, 0.751, Math.sin(a) * 0.42, '#2f6f7e', { seg: 14, roughness: 0.3 });
      }
      b.cyl(0.07, 0.09, 0.08, 0, 0.75, 0, '#c9a24a', BRASS);
      b.cyl(0.025, 0.025, 0.22, 0, 0.83, 0, '#f6f2ea');
      b.sphere(0.03, 0, 1.08, 0, '#ffcf7a', { emissive: '#ffb340', ei: 1.5, shadow: false });
      return { w: 1.4, d: 1.4, h: 1.1, spots: [[0.4, 0.77, 0], [-0.4, 0.77, 0]] };
    }
    if (o.room === 'living') {
      // low coffee table with books and a bowl
      const r = rng(o.seed);
      b.box(1.2, 0.05, 0.7, 0, 0.4, 0, wood, { round: 0.02 });
      for (const sx of [-1, 1]) for (const sz of [-1, 1]) b.box(0.05, 0.4, 0.05, sx * 0.54, 0, sz * 0.29, '#3a2a22');
      b.box(1.1, 0.03, 0.6, 0, 0.12, 0, wood);
      for (let k = 0; k < 3; k++) b.cbox(0.3, 0.04, 0.22, -0.3, 0.47 + k * 0.04, 0.02, ['#a33b2b', '#2f5d8a', '#e4dccb'][k], { ry: (r() - 0.5) * 0.5 });
      b.sphere(0.16, 0.28, 0.45, 0, '#2f6f7e', { sy: 0.45, seg: 18 });
      for (let i = 0; i < 3; i++) b.sphere(0.06, 0.24 + i * 0.05, 0.52, (i - 1) * 0.06, ['#e8492c', '#e0a94a', '#7cae4f'][i], { seg: 8 });
      return { w: 1.2, d: 0.7, h: 0.6, up: 1.25, spots: [[0, 0.45, 0.2]] };
    }
    // kitchen table: wood with a checked cloth runner, fruit bowl, mugs
    b.box(1.4, 0.05, 0.85, 0, 0.72, 0, wood);
    for (const sx of [-1, 1]) for (const sz of [-1, 1]) b.box(0.06, 0.72, 0.06, sx * 0.62, 0, sz * 0.35, '#5a3b26');
    b.box(0.5, 0.008, 0.87, 0, 0.77, 0, '#d8263f', { material: patternMaterial('checker', '#f4efe4', '#c0392b', 2, 3) });
    b.sphere(0.2, 0, 0.82, 0, '#efe6c8', { sy: 0.45, seg: 18 });
    for (let i = 0; i < 4; i++) b.sphere(0.07, Math.cos(i * 1.6) * 0.08, 0.88, Math.sin(i * 1.6) * 0.08, ['#e8492c', '#e0a94a', '#7cae4f', '#e8492c'][i], { seg: 8 });
    b.cyl(0.05, 0.045, 0.1, 0.48, 0.77, 0.2, '#2f6f7e', { seg: 10 });
    b.cyl(0.05, 0.045, 0.1, -0.5, 0.77, -0.22, '#f4efe4', { seg: 10 });
    return { w: 1.4, d: 0.85, h: 0.95, spots: [[0.36, 0.77, -0.2], [-0.38, 0.77, 0.2]] };
  },

  desk(b, o) {
    const r = rng(o.seed);
    const wood = o.c ?? WOODS[(o.k + 1) % WOODS.length], w = 1.45, d = 0.75, h = 0.75;
    b.box(w, 0.05, d, 0, h - 0.05, 0, wood);
    for (const sx of [-1, 1]) for (const sz of [-1, 1]) b.box(0.06, h - 0.05, 0.06, sx * (w / 2 - 0.06), 0, sz * (d / 2 - 0.06), '#5a3b26');
    b.box(0.45, h - 0.1, d - 0.06, w / 2 - 0.25, 0, 0, wood);
    for (let i = 0; i < 3; i++) b.box(0.4, 0.015, 0.02, w / 2 - 0.25, 0.12 + i * 0.2, d / 2 - 0.02, '#e9e2d2');
    // green leather blotter, papers, a lamp, a pen pot
    b.box(0.7, 0.012, 0.42, -0.1, h, 0.08, '#2f5a46');
    for (let i = 0; i < 3; i++) b.cbox(0.21, 0.006, 0.3, -0.2 + i * 0.12, h + 0.016 + i * 0.006, 0.08, '#f6f2ea', { ry: (r() - 0.5) * 0.6 });
    b.cyl(0.08, 0.1, 0.02, 0.5, h, -0.2, '#c9a24a', BRASS);
    b.cyl(0.012, 0.012, 0.32, 0.5, h, -0.2, '#c9a24a', BRASS);
    b.cyl(0.05, 0.12, 0.1, 0.5, h + 0.3, -0.12, '#2f6f4a', { seg: 14 });
    b.cyl(0.04, 0.035, 0.1, -0.58, h, -0.22, '#a33b2b', { seg: 10 });
    for (let k = 0; k < 2; k++) b.cbox(0.26, 0.05, 0.2, 0.3, h + k * 0.05, 0.18, ['#2f5d8a', '#d9b44a'][k], { ry: 0.2 + k * 0.3 });
    return { w, d, h: h + 0.45, wall: true, up: 1.15, spots: [[-0.55, h, 0.16]] };
  },

  plant(b, o) {
    const big = o.k % 2 === 0;
    pottedPlant(b, 0.6, o.seed, big ? 'leafy' : 'palm', ['#b8673f', '#efe6c8', '#5d7d6a', '#2f6f7e'][o.k % 4], 'green', o.k % 3 === 1 ? '#f2c94c' : null);
    return { w: 0.95, d: 0.95, h: 1.3, up: 1.25 };
  },

  bookshelf(b, o) {
    const r = rng(o.seed), w = 1.5, h = 1.6, d = 0.42, color = o.c ?? ['#7a3fa0', '#6b4a34', '#2f5a46', '#8a5a36'][o.k % 4];
    b.box(w, h, 0.03, 0, 0, -d / 2 + 0.015, color);
    b.box(0.04, h, d, -w / 2 + 0.02, 0, 0, color);
    b.box(0.04, h, d, w / 2 - 0.02, 0, 0, color);
    const n = 4, sh = h / n;
    for (let i = 0; i <= n; i++) b.box(w, 0.03, d, 0, Math.min(i * sh, h - 0.03), 0, color);
    for (let i = 0; i < n; i++) bookRow(b, w - 0.08, 0, i * sh + 0.03, 0, d, r, sh - 0.08);
    // a few books lying on top, readable from above
    for (let k = 0; k < 3; k++) b.cbox(0.3, 0.05, 0.22, -0.4 + k * 0.05, h + 0.025 + k * 0.05, 0, ['#a33b2b', '#d9b44a', '#2f5d8a'][k], { ry: (r() - 0.5) * 0.4 });
    pottedPlant(b, 0.2, o.seed + 3, 'leafy', '#efe6c8', 'lime', null, 0.45, h, 0);
    return { w, d, h: h + 0.3, wall: true, up: 1.1 };
  },

  // Grand piano: the curved case reads at once from above.
  piano(b, o) {
    const s = new THREE.Shape();
    s.moveTo(-0.7, 0.75);
    s.lineTo(0.7, 0.75);
    s.lineTo(0.7, 0.1);
    s.bezierCurveTo(0.7, -0.5, 0.25, -0.35, 0.15, -0.95);
    s.bezierCurveTo(0.05, -1.05, -0.7, -1.05, -0.7, -0.8);
    s.closePath();
    const body = new THREE.ExtrudeGeometry(s, { depth: 0.3, bevelEnabled: true, bevelSize: 0.02, bevelThickness: 0.02, bevelSegments: 2, curveSegments: 24 });
    body.rotateX(Math.PI / 2);
    body.translate(0, 0.95, 0.1);
    const case_ = o.c ?? '#1d1716';
    b.geo(body, case_, { roughness: 0.3, tess: false });
    // open lid, propped on the right side
    const lid = new THREE.ExtrudeGeometry(s, { depth: 0.025, bevelEnabled: false, curveSegments: 24 });
    lid.rotateX(Math.PI / 2);
    lid.translate(0.7, 0, 0);
    lid.rotateZ(0.55);
    lid.translate(-0.7, 0.98, 0.1);
    b.geo(lid, o.c ? new THREE.Color(case_).offsetHSL(0, 0, 0.04).getStyle() : '#2a201d', { roughness: 0.25, tess: false });
    b.cbox(0.02, 0.6, 0.02, 0.3, 1.25, -0.2, '#c9a24a', { rz: 0.2, ...BRASS });
    // gold harp inside, strings
    for (let i = 0; i < 9; i++) b.box(0.012, 0.01, 1.2 - i * 0.07, -0.55 + i * 0.12, 0.97, 0.1 - (i * 0.05), '#c9a24a', { ...BRASS, shadow: false });
    // keyboard
    b.box(1.42, 0.06, 0.24, 0, 0.72, 0.95, '#1d1716', { roughness: 0.3 });
    b.box(1.32, 0.03, 0.16, 0, 0.78, 0.96, '#f6f2ea');
    for (let i = 0; i < 34; i++) if ([1, 3, 6, 8, 10].includes(i % 12)) b.box(0.022, 0.02, 0.09, -0.63 + i * 0.038, 0.81, 0.93, '#111');
    for (const [x, z] of [[-0.62, 0.8], [0.62, 0.8], [-0.4, -0.75]]) b.cyl(0.05, 0.04, 0.68, x, 0, z, '#1d1716', { seg: 8 });
    // bench
    b.box(0.7, 0.07, 0.32, 0, 0.45, 1.35, '#1d1716', { round: 0.02 });
    b.box(0.64, 0.03, 0.28, 0, 0.52, 1.35, '#8a2f3a', { round: 0.01 });
    for (const sx of [-1, 1]) for (const sz of [-1, 1]) b.box(0.04, 0.45, 0.04, sx * 0.3, 0, 1.35 + sz * 0.12, '#1d1716');
    return { w: 1.45, d: 2.6, h: 1.55, cz: 0.2 };
  },

  bath(b) {
    const color = '#f6f2ea', feet = '#c9a24a';
    b.box(1.6, 0.5, 0.75, 0, 0.14, 0, color, { round: 0.2 });
    b.box(1.4, 0.05, 0.55, 0, 0.6, 0, '#a9cfd8', { roughness: 0.1 });
    for (let i = 0; i < 5; i++) b.sphere(0.06 + (i % 2) * 0.02, -0.3 + i * 0.12, 0.64, (i % 3 - 1) * 0.1, '#ffffff', { seg: 8 });
    for (const sx of [-0.65, 0.65]) for (const sz of [-0.27, 0.27]) b.sphere(0.06, sx, 0.08, sz, feet, BRASS);
    b.cyl(0.02, 0.02, 0.35, -0.72, 0.6, 0, feet, { metalness: 0.8 });
    b.box(0.08, 0.03, 0.2, -0.66, 0.92, 0, feet, BRASS);
    b.box(0.25, 0.05, 0.12, 0.45, 0.66, -0.3, '#e0a94a', { round: 0.02 });
    return { w: 1.7, d: 0.8, h: 0.95, wall: true, up: 1 };
  },

  sink(b, o) {
    const kitchen = o.room === 'kitchen';
    const body = kitchen ? '#f3eee4' : '#86a6bf';
    b.box(1.0, 0.8, 0.5, 0, 0.05, -0.02, body);
    b.box(1.0, 0.05, 0.5, 0, 0, -0.04, '#2a2626');
    for (const sx of [-1, 1]) b.frame(0.44, 0.66, 0.025, sx * 0.24, 0.12, 0.235, '#cfc8ba', 0.02);
    b.box(1.08, 0.05, 0.56, 0, 0.85, 0, kitchen ? '#d8d8d4' : '#f6f2ea', { roughness: 0.35 });
    b.sphere(0.24, 0, 0.88, 0.02, '#ffffff', { sy: 0.32, seg: 22, roughness: 0.2 });
    b.cyl(0.18, 0.18, 0.012, 0, 0.9, 0.02, '#a9cfd8', { seg: 20, roughness: 0.05 });
    b.cyl(0.02, 0.02, 0.26, 0, 0.88, -0.2, '#cfd3d6', { metalness: 0.85, roughness: 0.2 });
    b.cbox(0.02, 0.02, 0.14, 0, 1.13, -0.14, '#cfd3d6', { metalness: 0.85, roughness: 0.2 });
    for (const sx of [-0.12, 0.12]) b.sphere(0.03, sx, 0.93, -0.2, '#cfd3d6', { metalness: 0.85 });
    if (kitchen) {
      b.cyl(0.07, 0.06, 0.18, 0.4, 0.88, -0.12, '#2f6f7e', { seg: 10 });
      foliage(b, { seed: o.seed, rx: 0.12, ry: 0.14, palette: 'lime', voxel: 0.05 }, 0.4, 1.1, -0.12);
    } else {
      // mirror against the wall
      b.box(0.7, 0.75, 0.04, 0, 1.0, -0.25, '#c9a24a', BRASS);
      b.box(0.62, 0.67, 0.045, 0, 1.04, -0.25, '#c9dde3', { metalness: 0.9, roughness: 0.05 });
      b.cyl(0.04, 0.035, 0.12, -0.38, 0.88, -0.1, '#f2c94c', { seg: 10 });
    }
    return { w: 1.08, d: 0.56, h: kitchen ? 1.2 : 1.8, wall: true, up: 1.25 };
  },

  tv(b, o) {
    const wood = o.c ?? WOODS[o.k % WOODS.length];
    b.box(1.5, 0.45, 0.45, 0, 0.05, 0, wood);
    for (const sx of [-1, 1]) for (const sz of [-1, 1]) b.box(0.04, 0.06, 0.04, sx * 0.68, 0, sz * 0.18, '#3a2a22');
    for (const sx of [-1, 1]) b.frame(0.68, 0.36, 0.025, sx * 0.36, 0.09, 0.226, '#3a2a22', 0.02);
    b.box(0.3, 0.03, 0.2, 0, 0.5, 0, '#1b1b1e');
    b.box(0.06, 0.12, 0.06, 0, 0.5, -0.02, '#1b1b1e');
    b.box(1.2, 0.7, 0.06, 0, 0.62, -0.02, '#1b1b1e');
    b.box(1.14, 0.64, 0.01, 0, 0.65, 0.015, '#2b4f7a', { roughness: 0.15, emissive: '#3c6ea8', ei: 0.35 });
    pottedPlant(b, 0.18, o.seed, 'leafy', '#efe6c8', 'green', null, 0.6, 0.5, 0.05);
    return { w: 1.5, d: 0.5, h: 1.35, wall: true, up: 1.1 };
  },

  fireplace(b, o) {
    const w = 1.4, h = 1.1, d = 0.5, color = o.c ?? (o.marble ? '#efe9dc' : '#9a4a3a');
    const ow = w * 0.55, oh = h * 0.6;
    const side = (w - ow) / 2;
    const m = o.marble ? { roughness: 0.25 } : { material: patternMaterial(o.stone ? 'stone' : 'brick', color, o.stone ? '#6e6a62' : '#d9c9b4', 2, 2) };
    b.box(side, h, d, -w / 2 + side / 2, 0, 0, color, m);
    b.box(side, h, d, w / 2 - side / 2, 0, 0, color, m);
    b.box(ow, h - oh, d, 0, oh, 0, color, m);
    b.box(ow, oh, 0.05, 0, 0, -d / 2 + 0.025, '#1a1412');
    b.box(w + 0.2, 0.08, d + 0.12, 0, h, 0.03, o.marble ? '#d9b44a' : '#c4a27a', o.marble ? BRASS : {});
    if (o.stockings) for (let i = 0; i < 3; i++) {
      b.box(0.14, 0.3, 0.06, -0.45 + i * 0.45, h - 0.3, d / 2 + 0.06, ['#b3202c', '#2f5a3a', '#f6f2ea'][i]);
      b.box(0.2, 0.08, 0.06, -0.42 + i * 0.45, h - 0.32, d / 2 + 0.06, ['#b3202c', '#2f5a3a', '#f6f2ea'][i]);
      b.box(0.16, 0.06, 0.065, -0.45 + i * 0.45, h - 0.06, d / 2 + 0.06, '#f6f2ea');
    }
    b.box(ow + 0.4, 0.04, 0.4, 0, 0, d / 2 + 0.14, '#2a2220');
    foliage(b, { seed: 7, rx: ow * 0.3, ry: oh * 0.3, rz: 0.12, voxel: 0.06, palette: 'autumn', sparse: 0.2 }, 0, 0.02, 0);
    b.sphere(0.12, 0, 0.12, 0, '#ff9a3a', { sy: 0.8, emissive: '#ff7a1a', ei: 1.6, shadow: false });
    b.box(ow * 0.6, 0.06, 0.15, 0, 0, 0, '#3a2418');
    // candlesticks and a clock on the mantel
    for (const sx of [-1, 1]) {
      b.cyl(0.04, 0.05, 0.12, sx * 0.55, h + 0.08, 0.02, '#c9a24a', BRASS);
      b.cyl(0.018, 0.018, 0.14, sx * 0.55, h + 0.2, 0.02, '#f6f2ea');
    }
    b.box(0.26, 0.22, 0.1, 0, h + 0.08, 0, '#c9a24a', BRASS);
    b.cyl(0.08, 0.08, 0.012, 0, h + 0.19, 0.05, '#f6f2ea', { rx: Math.PI / 2, center: true, seg: 14 });
    const l = new THREE.PointLight('#ff9a3c', 2.2, 3.5, 1.6);
    l.position.set(0, oh * 0.4, 0.45);
    b.add(l);
    return { w: w + 0.2, d: d + 0.3, h: h + 0.3, wall: true, up: 1.1 };
  },

  counter(b, o) {
    const w = 1.7, d = 0.65, h = 0.9, color = o.c ?? ['#f3eee4', '#9fb08a', '#86a6bf'][o.k % 3];
    b.box(w, h - 0.04, d - 0.05, 0, 0, -0.025, color);
    b.box(w, 0.04, d, 0, h - 0.04, 0, '#d8d8d4', { roughness: 0.4 });
    b.box(w, 0.08, d - 0.1, 0, 0, -0.07, '#2a2626');
    const n = 3;
    for (let i = 1; i < n; i++) b.box(0.012, h - 0.2, 0.01, -w / 2 + (i * w) / n, 0.1, d / 2 - 0.045, '#bdb6a8');
    for (let i = 0; i < n; i++) b.box(0.1, 0.02, 0.03, -w / 2 + ((i + 0.5) * w) / n, h - 0.2, d / 2 - 0.03, '#9c9c9c', { metalness: 0.7 });
    // stove with a copper pot, chopping board with bread
    const sx = w / 2 - 0.42;
    b.box(0.6, 0.012, 0.5, sx, h, 0, '#1d1d1f', { roughness: 0.25 });
    for (const dx of [-0.14, 0.14]) for (const dz of [-0.12, 0.12]) b.cyl(0.08, 0.08, 0.008, sx + dx, h + 0.012, dz, '#3a3a3e', { seg: 16 });
    b.cyl(0.12, 0.11, 0.16, sx - 0.14, h + 0.02, 0.12, '#c27a4a', { seg: 16, metalness: 0.6, roughness: 0.35 });
    b.cbox(0.24, 0.02, 0.04, sx - 0.36, h + 0.15, 0.12, '#3a2a22');
    b.box(0.45, 0.03, 0.3, -0.35, h, 0.02, '#c4a27a');
    b.sphere(0.12, -0.38, h + 0.06, 0.02, '#d9a066', { sy: 0.6, seg: 12 });
    b.box(0.08, 0.3, 0.08, -0.72, h, -0.2, '#efe6c8');
    return { w, d, h: h + 0.35, wall: true, up: 1.05, spots: [[0, h, 0.05]] };
  },

  cabinet(b, o) {
    const w = o.w ?? 1.2, d = 0.5, h = 1.0, color = o.c ?? ['#f3eee4', '#86a6bf', '#8a5a36', '#9fb08a'][o.k % 4];
    const trim = new THREE.Color(color).offsetHSL(0, 0, -0.08).getStyle();
    b.box(w, h, d, 0, 0, 0, color);
    b.box(w + 0.03, 0.03, d + 0.03, 0, h, 0, color);
    for (let i = 0; i < 2; i++) {
      const x = -w / 2 + ((i + 0.5) * w) / 2;
      b.frame(w / 2 - 0.08, h - 0.12, 0.025, x, 0.06, d / 2 + 0.005, trim, 0.02);
      b.sphere(0.025, x + (i % 2 ? -1 : 1) * (w / 4 - 0.1), h * 0.55, d / 2 + 0.03, '#c9a24a', { ...BRASS, seg: 8 });
    }
    // vase of flowers and a picture frame on top
    b.cyl(0.08, 0.1, 0.25, -0.3, h + 0.03, 0, '#2f6f7e', { seg: 12, roughness: 0.3 });
    foliage(b, { seed: o.seed, rx: 0.18, ry: 0.16, palette: 'green', voxel: 0.05, flowers: ['#e8492c', '#f4f1ff', '#f2c94c'][o.k % 3], flowerRate: 0.5 }, -0.3, h + 0.35, 0);
    b.cbox(0.26, 0.2, 0.03, 0.25, h + 0.13, -0.05, '#c9a24a', { rx: -0.2, ...BRASS });
    b.cbox(0.2, 0.15, 0.035, 0.25, h + 0.13, -0.045, '#8fc3d6', { rx: -0.2 });
    return { w: w + 0.05, d: d + 0.05, h: h + 0.5, wall: true, up: 1.2, spots: [[-0.02, h + 0.03, 0.05]] };
  },

  lamp(b, o) {
    const light = '#ffc777';
    const glow = { emissive: light, ei: 1.2 };
    // a floor lamp next to a little round side table
    b.cyl(0.18, 0.2, 0.03, -0.12, 0, 0, '#2a2523');
    b.cyl(0.015, 0.015, 1.4, -0.12, 0, 0, '#2a2523');
    b.cyl(0.17, 0.26, 0.3, -0.12, 1.3, 0, o.c ?? '#f3e2b8', glow);
    b.cyl(0.22, 0.22, 0.03, 0.3, 0.5, 0.15, WOODS[o.k % WOODS.length], { seg: 18 });
    b.cyl(0.025, 0.025, 0.5, 0.3, 0, 0.15, '#3a2a22');
    b.cyl(0.12, 0.12, 0.02, 0.3, 0, 0.15, '#3a2a22');
    b.cyl(0.05, 0.045, 0.09, 0.36, 0.53, 0.1, '#f4efe4', { seg: 10 });
    const l = new THREE.PointLight(light, 2.2, 4.5, 1.5);
    l.position.set(-0.12, 1.35, 0);
    b.add(l);
    return { w: 0.8, d: 0.6, h: 1.6, up: 1.3 };
  },

  tree(b, o) {
    const r = rng(o.seed), h = 2.5, spread = 1.75;
    const th = h * 0.5;
    b.cyl(0.07, 0.13, th, 0, 0, 0, '#6b4a34');
    for (let i = 0; i < 3; i++) {
      const a = r() * Math.PI * 2;
      b.cbox(0.06, th * 0.5, 0.06, Math.cos(a) * 0.22, th * 0.85, Math.sin(a) * 0.22, '#6b4a34', { rz: Math.cos(a) * 0.6, rx: -Math.sin(a) * 0.6 });
    }
    const palette = ['green', 'lime', 'olive', 'blossom'][o.k % 4];
    foliage(b, { seed: o.seed, rx: spread / 2, ry: (h - th) * 0.6, palette, voxel: 0.15, flowers: palette === 'blossom' ? null : '#f4f1ff', flowerRate: 0.04 }, 0, th * 0.85, 0);
    b.cyl(0.42, 0.45, 0.05, 0, 0, 0, '#8a6a4a', { seg: 16 });
    return { w: spread, d: spread, h, up: 1 };
  },

  fountain(b) {
    const R = 0.85, color = '#d8ccb2', water = '#5fa5b5';
    b.cyl(R, R + 0.05, 0.4, 0, 0, 0, color, { seg: 28 });
    b.cyl(R - 0.12, R - 0.12, 0.02, 0, 0.34, 0, water, { seg: 28, roughness: 0.1, metalness: 0.2 });
    b.cyl(0.14, 0.2, 0.9, 0, 0.3, 0, color, { seg: 14 });
    b.cyl(0.45, 0.25, 0.15, 0, 1.1, 0, color, { seg: 18 });
    b.cyl(0.37, 0.37, 0.02, 0, 1.2, 0, water, { seg: 18, roughness: 0.1 });
    b.sphere(0.1, 0, 1.33, 0, color);
    // lily pads
    for (let i = 0; i < 3; i++) b.cyl(0.09, 0.09, 0.012, Math.cos(i * 2.2) * 0.5, 0.36, Math.sin(i * 2.2) * 0.5, '#5a9440', { seg: 10, t0: 0.3, tl: Math.PI * 1.8 });
    return { w: 2 * R + 0.1, d: 2 * R + 0.1, h: 1.45, up: 1 };
  },
};

export const OBJECT_TYPES = Object.keys(MODELS);

// Builds one object, scaled to fit a footprint of `fit` (metres).
// Returns { group, h (top height), seat (height a person stands at), wall }.
// The world (theme) picks the model and its colours (kit/index.js).
export function buildObject(type, { room = 'living', k = 0, seed = 1, fit = 1.7, theme = '' } = {}) {
  const kit = kitEntry(theme, type);
  const fn = (kit && (KIT_MODELS[kit.model] ?? MODELS[kit.model])) || MODELS[type];
  const group = new THREE.Group();
  if (!fn) return { group, h: 0, seat: 0, wall: false, size: [0, 0] };
  seedBuilders(seed * 7919);
  const b = new Builder();
  const info = fn(b, { room, k, seed, ...(kit?.params ?? {}) }) ?? {};
  const model = b.build();
  const s = Math.min(info.up ?? 1.4, fit / Math.max(info.w, info.d));
  model.scale.setScalar(s);
  if (info.cz) model.position.z = -info.cz * s;
  group.add(model);
  // free places on its top for small decor (local, scaled)
  const spots = (info.spots ?? []).map(([x, y, z]) => [x * s, y * s, (z - (info.cz ?? 0)) * s]);
  return { group, h: info.h * s, seat: info.seat != null ? info.seat * s : null, wall: !!info.wall, size: [info.w * s, info.d * s], spots };
}

export { DARK };
