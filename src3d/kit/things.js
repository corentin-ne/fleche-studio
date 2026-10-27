// Themed tables, desks, shelves, musical instruments, baths and basins.
// See common.js for the conventions; kits in index.js pick them per world.
import { foliage, patternMaterial, rng } from '../geo.js';
import { BRASS, GOLD, bookRow, glow, lamp, lathe, legs, pick, roundLegs, shade, stack } from './common.js';

const FRUIT = ['#e8492c', '#e0a94a', '#7cae4f', '#f2c94c', '#8e3b7a'];

// What sits on a table top at height y (dressing of the round / long tables).
function dressing(b, kind, y, R, r) {
  switch (kind) {
    case 'tea':
      lathe(b, [[0, 0], [0.07, 0.01], [0.09, 0.08], [0.06, 0.13], [0.02, 0.16], [0, 0.17]], '#f6f2ea', { seg: 12 }, 0, y, 0);
      b.cbox(0.1, 0.02, 0.02, 0.1, y + 0.1, 0, '#f6f2ea', { rz: 0.6 });
      for (let i = 0; i < 3; i++) { const a = i * 2.1 + 0.4; b.cyl(0.06, 0.04, 0.06, Math.cos(a) * R * 0.6, y, Math.sin(a) * R * 0.6, '#f6f2ea', { seg: 10 }); }
      b.cyl(0.13, 0.13, 0.03, -R * 0.4, y, R * 0.3, GOLD, BRASS);
      for (let i = 0; i < 4; i++) b.sphere(0.035, -R * 0.4 + Math.cos(i * 1.6) * 0.06, y + 0.05, R * 0.3 + Math.sin(i * 1.6) * 0.06, '#e0b47e', { sy: 0.6, seg: 6 });
      break;
    case 'feast':
      b.sphere(0.2, 0, y + 0.06, 0, '#b8662a', { sy: 0.6, seg: 14 });
      b.cyl(0.25, 0.22, 0.03, 0, y, 0, '#e8e2d2', { seg: 16 });
      for (let i = -2; i <= 2; i++) if (i) {
        b.cyl(0.11, 0.09, 0.02, i * R * 0.35, y, R * 0.55, '#f6f2ea', { seg: 12 });
        b.cyl(0.11, 0.09, 0.02, i * R * 0.35, y, -R * 0.55, '#f6f2ea', { seg: 12 });
        b.cyl(0.03, 0.025, 0.12, i * R * 0.35 + 0.12, y, R * 0.35, '#c9a24a', BRASS);
      }
      for (const s of [-1, 1]) {
        b.cyl(0.04, 0.05, 0.08, s * R * 0.8, y, 0, GOLD, BRASS);
        b.cyl(0.018, 0.018, 0.2, s * R * 0.8, y + 0.08, 0, '#f6f2ea', { seg: 6 });
        b.sphere(0.03, s * R * 0.8, y + 0.31, 0, '#ffcf7a', glow('#ffb340', 1.5));
      }
      break;
    case 'fruit':
      b.sphere(0.2, 0, y + 0.04, 0, '#efe6c8', { sy: 0.45, seg: 16 });
      for (let i = 0; i < 5; i++) b.sphere(0.065, Math.cos(i * 1.3) * 0.08, y + 0.1 + (i % 2) * 0.03, Math.sin(i * 1.3) * 0.08, FRUIT[i], { seg: 8 });
      for (let i = 0; i < 3; i++) b.sphere(0.03, 0.3 + (i % 2) * 0.04, y + 0.03, 0.1 + i * 0.04, '#5a2a6a', { seg: 6 });
      break;
    case 'cake':
      b.cyl(0.22, 0.22, 0.02, 0, y, 0, '#f6f2ea', { seg: 18 });
      b.cyl(0.17, 0.17, 0.14, 0, y + 0.02, 0, '#f6d3e0', { seg: 18 });
      b.cyl(0.11, 0.11, 0.1, 0, y + 0.16, 0, '#f6f2ea', { seg: 18 });
      for (let i = 0; i < 5; i++) { const a = i * 1.256; b.cyl(0.008, 0.008, 0.08, Math.cos(a) * 0.07, y + 0.26, Math.sin(a) * 0.07, ['#5aa9e6', '#ff4d8d', '#f2c94c'][i % 3], { seg: 4 }); b.sphere(0.014, Math.cos(a) * 0.07, y + 0.35, Math.sin(a) * 0.07, '#ffcf7a', glow('#ffb340', 1.6)); }
      break;
    case 'candle':
      b.cyl(0.05, 0.06, 0.06, 0, y, 0, GOLD, BRASS);
      b.cyl(0.02, 0.02, 0.18, 0, y + 0.06, 0, '#f6f2ea', { seg: 6 });
      b.sphere(0.028, 0, y + 0.27, 0, '#ffcf7a', glow('#ffb340', 1.6));
      for (const s of [-1, 1]) b.cyl(0.09, 0.08, 0.015, s * R * 0.5, y, 0, '#f6f2ea', { seg: 12 });
      lathe(b, [[0, 0], [0.03, 0.0], [0.035, 0.1], [0.05, 0.12], [0, 0.12]], '#e8eef4', { seg: 10, opacity: 0.6 }, R * 0.3, y, R * 0.35);
      for (let i = 0; i < 3; i++) b.sphere(0.035, -R * 0.35 + i * 0.05, y + 0.04, -R * 0.3, '#c0283a', { seg: 6 });
      break;
    case 'cards':
      for (let i = 0; i < 6; i++) b.cbox(0.06, 0.004, 0.09, (r() - 0.5) * R, y + 0.002, (r() - 0.5) * R, '#f6f2ea', { ry: r() * 3, jitter: 0 });
      for (let i = 0; i < 5; i++) for (let k = 0; k < 3; k++) b.cyl(0.025, 0.025, 0.012, R * 0.4 + (i % 2) * 0.06, y + k * 0.012, -R * 0.3 + i * 0.06, ['#c0283a', '#2f5d8a', '#f6f2ea', '#1d1b1c'][(i + k) % 4], { seg: 8 });
      b.cyl(0.04, 0.035, 0.12, -R * 0.4, y, R * 0.3, '#8a5a2a', { seg: 8, opacity: 0.7 });
      break;
    case 'sweets':
      for (let i = 0; i < 8; i++) b.sphere(0.04, (r() - 0.5) * R * 1.2, y + 0.03, (r() - 0.5) * R * 1.2, pick(r, ['#ff4d8d', '#f2c94c', '#7cc66a', '#5aa9e6', '#ff7a1a']), { seg: 6 });
      b.cyl(0.2, 0.16, 0.06, 0, y, 0, '#ff7518', { seg: 12 });
      break;
    case 'fondue':
      b.cyl(0.13, 0.1, 0.12, 0, y + 0.08, 0, '#b3202c', { seg: 14 });
      b.cyl(0.11, 0.11, 0.01, 0, y + 0.2, 0, '#f2d46a', { seg: 14 });
      b.cyl(0.08, 0.1, 0.08, 0, y, 0, '#3a3a3e', { seg: 10 });
      for (let i = 0; i < 5; i++) { const a = i * 1.256; b.cbox(0.01, 0.01, 0.3, Math.cos(a) * 0.15, y + 0.25, Math.sin(a) * 0.15, '#9aa6b4', { ry: -a + Math.PI / 2, rx: -0.6 }); }
      for (let i = 0; i < 6; i++) b.box(0.04, 0.04, 0.04, (r() - 0.5) * R, y, R * 0.5 + (r() - 0.5) * 0.1, '#e0b47e');
      break;
    case 'dumplings':
      for (let i = 0; i < 3; i++) for (let k = 0; k < 2; k++) {
        b.cyl(0.13, 0.13, 0.08, (i - 1) * 0.3, y + k * 0.08, 0, '#c9a477', { seg: 14 });
        if (k) for (let j = 0; j < 4; j++) b.sphere(0.035, (i - 1) * 0.3 + Math.cos(j * 1.6) * 0.06, y + 0.17, Math.sin(j * 1.6) * 0.06, '#f6efe0', { seg: 6 });
      }
      break;
    case 'party':
      dressing(b, 'cake', y, R, r);
      for (let i = 0; i < 6; i++) { const a = i * 1.05; b.cyl(0.04, 0.03, 0.08, Math.cos(a) * R * 0.75, y, Math.sin(a) * R * 0.75, pick(r, ['#ff4d8d', '#5aa9e6', '#f2c94c']), { seg: 8 }); }
      for (let i = 0; i < 2; i++) b.cyl(0, 0.06, 0.15, (i ? 1 : -1) * R * 0.5, y, R * 0.4, ['#7cc66a', '#b06ad8'][i], { seg: 10 });
      break;
    default:
  }
}

export const THINGS = {
  // ---------------------------------------------------------------- tables
  roundTable(b, o) {
    const R = o.r ?? 0.6, h = o.h ?? 0.72, top = o.c ?? '#8a5a36', r = rng(o.seed);
    b.cyl(R, R, 0.05, 0, h - 0.05, 0, top, { seg: 26, ...(o.marble ? { roughness: 0.25 } : {}) });
    if (o.cloth) b.cyl(R + 0.04, R + 0.08, 0.28, 0, h - 0.3, 0, o.cloth, { seg: 26 });
    if (o.legs === 4) roundLegs(b, R * 1.3, R * 1.3, h - 0.05, o.leg ?? shade(top, -0.1), 0.04);
    else {
      b.cyl(0.05, 0.07, h - 0.05, 0, 0, 0, o.leg ?? shade(top, -0.1), { seg: 10 });
      b.cyl(R * 0.45, R * 0.5, 0.04, 0, 0, 0, o.leg ?? shade(top, -0.1), { seg: 16 });
    }
    dressing(b, o.items, h, R, r);
    return { w: R * 2.1, d: R * 2.1, h: h + 0.3, up: o.up ?? 1.3, spots: [[R * 0.55, h, 0], [-R * 0.55, h, 0]] };
  },

  longTable(b, o) {
    const L = 1.9, d = 0.9, h = 0.75, wood = o.c ?? '#5a3420', r = rng(o.seed);
    b.box(L, 0.07, d, 0, h - 0.07, 0, wood);
    if (o.cloth) b.box(L * 0.95, 0.01, d + 0.06, 0, h, 0, o.cloth);
    for (const s of [-1, 1]) {
      b.box(0.08, h - 0.07, d - 0.2, s * (L / 2 - 0.2), 0, 0, shade(wood, -0.1));
      b.box(0.3, 0.06, d - 0.15, s * (L / 2 - 0.2), 0, 0, shade(wood, -0.1));
    }
    dressing(b, o.items ?? 'feast', h + 0.01, L / 2, r);
    return { w: L, d, h: h + 0.35, up: 1.2 };
  },

  lowTable(b, o) {
    const w = 1.3, d = 0.85, h = 0.35, lac = o.c ?? '#1d1716';
    b.box(w, 0.06, d, 0, h - 0.06, 0, lac, { roughness: 0.25 });
    legs(b, w - 0.06, d - 0.06, h - 0.06, lac, 0.07);
    b.box(w - 0.1, 0.005, d - 0.1, 0, h, 0, shade(lac, 0.05), { roughness: 0.2 });
    // tea: iron kettle, cups on a tray
    b.box(0.4, 0.02, 0.25, 0.25, h, 0.1, '#7a5434');
    lathe(b, [[0, 0], [0.09, 0.02], [0.1, 0.08], [0.06, 0.13], [0, 0.14]], '#3a3a3e', { seg: 12 }, -0.3, h, 0);
    for (let i = 0; i < 3; i++) b.cyl(0.035, 0.03, 0.06, 0.15 + i * 0.1, h + 0.02, 0.1, '#e8e2d2', { seg: 10 });
    b.cyl(0.12, 0.1, 0.03, -0.3, h, 0.25, '#b3202c', { seg: 14 });
    return { w, d, h: h + 0.15, up: 1.5, spots: [[0.3, h, -0.2]] };
  },

  lazySusan(b, o) {
    const R = 0.6, h = 0.72, c = o.c ?? '#7a1018';
    b.cyl(R, R, 0.06, 0, h - 0.06, 0, c, { seg: 26, roughness: 0.3 });
    b.cyl(R * 0.45, R * 0.45, 0.04, 0, h, 0, GOLD, { seg: 22, ...BRASS });
    roundLegs(b, R * 1.2, R * 1.2, h - 0.06, '#1d1716', 0.04);
    for (let i = 0; i < 5; i++) { const a = i * 1.256; b.cyl(0.1, 0.08, 0.04, Math.cos(a) * 0.17, h + 0.04, Math.sin(a) * 0.17, '#f6f2ea', { seg: 12 }); b.sphere(0.05, Math.cos(a) * 0.17, h + 0.09, Math.sin(a) * 0.17, pick(rng(o.seed + i), ['#e0a94a', '#7cae4f', '#c0602a']), { sy: 0.6, seg: 8 }); }
    b.cyl(0.07, 0.06, 0.14, 0, h + 0.04, 0, '#f6f2ea', { seg: 12 });
    for (let i = 0; i < 6; i++) { const a = i * 1.05 + 0.5; b.cyl(0.08, 0.06, 0.03, Math.cos(a) * R * 0.75, h, Math.sin(a) * R * 0.75, '#f6f2ea', { seg: 10 }); }
    return { w: R * 2.1, d: R * 2.1, h: h + 0.2, up: 1.3 };
  },

  altar(b, o) {
    const c = o.c ?? '#d9c48a';
    b.box(1.3, 0.75, 0.7, 0, 0, 0, c);
    b.box(1.4, 0.08, 0.8, 0, 0.75, 0, shade(c, 0.08));
    for (let i = 0; i < 4; i++) b.box(0.22, 0.4, 0.01, -0.45 + i * 0.3, 0.2, 0.355, ['#2f5e8c', '#b8862b', '#a33b2b', '#3f7a4a'][i]);
    dressing(b, 'fruit', 0.83, 0.5, rng(o.seed));
    for (const s of [-1, 1]) lathe(b, [[0, 0], [0.06, 0], [0.09, 0.15], [0.05, 0.28], [0.06, 0.32], [0, 0.32]], '#b8862b', { seg: 10 }, s * 0.5, 0.83, -0.15);
    return { w: 1.4, d: 0.8, h: 1.2, up: 1.3, wall: true };
  },

  mapTable(b, o) {
    const w = 1.4, d = 0.9, h = 0.75, wood = '#6b4a34';
    b.box(w, 0.07, d, 0, h - 0.07, 0, wood);
    for (const s of [-1, 1]) b.cbox(0.1, h, 0.1, s * (w / 2 - 0.15), h / 2 - 0.05, 0, wood, { rz: s * 0.15 });
    b.box(1.1, 0.008, 0.7, 0, h, 0, '#e8d8a8', { material: patternMaterial('plain', '#e8d8a8', '#c9a477', 1, 1) });
    b.cbox(0.06, 0.012, 0.06, 0.15, h + 0.01, 0.05, '#c0283a', { ry: 0.78 });
    b.cbox(0.6, 0.008, 0.01, 0, h + 0.01, 0.05, '#c0283a', { ry: 0.4 });
    b.cyl(0.08, 0.08, 0.03, -0.38, h, -0.2, GOLD, BRASS);
    b.cyl(0.03, 0.035, 0.4, 0.42, h, -0.2, '#c9a24a', { rz: Math.PI / 2, center: true, ...BRASS });
    b.cyl(0.05, 0.06, 0.08, 0.45, h, 0.25, '#3a3a3e', { seg: 8 });
    b.cyl(0.02, 0.02, 0.15, 0.45, h + 0.08, 0.25, '#f6f2ea');
    return { w, d, h: h + 0.25, up: 1.25, spots: [[-0.4, h, 0.25]] };
  },

  pokerTable(b, o) {
    const R = 0.65, h = 0.72;
    b.cyl(R, R, 0.08, 0, h - 0.08, 0, '#6b4a34', { seg: 8 });
    b.cyl(R - 0.08, R - 0.08, 0.01, 0, h, 0, o.felt ?? '#2f6a3a', { seg: 8 });
    b.cyl(0.06, 0.08, h - 0.08, 0, 0, 0, '#4a2e1e', { seg: 8 });
    b.cyl(0.35, 0.4, 0.05, 0, 0, 0, '#4a2e1e', { seg: 8 });
    if (o.wheel) {
      b.cyl(0.22, 0.22, 0.06, 0, h, 0, '#2a2220', { seg: 24 });
      for (let i = 0; i < 12; i++) b.cbox(0.16, 0.012, 0.04, Math.cos(i * 0.52) * 0.12, h + 0.065, Math.sin(i * 0.52) * 0.12, i % 2 ? '#c0283a' : '#1d1b1c', { ry: -i * 0.52, jitter: 0 });
      b.cyl(0.03, 0.03, 0.06, 0, h + 0.06, 0, GOLD, BRASS);
    }
    dressing(b, 'cards', h + 0.01, R, rng(o.seed));
    return { w: R * 2, d: R * 2, h: h + 0.15, up: 1.3 };
  },

  grindStone(b, o) {
    b.sphere(0.65, 0, 0.12, 0, '#8e8a82', { sy: 0.45, seg: 10, flat: true });
    b.cyl(0.5, 0.55, 0.05, 0, 0.38, 0, '#a09682', { seg: 9 });
    b.sphere(0.12, 0.15, 0.48, 0.05, '#6e665a', { sy: 0.6, seg: 8 });
    for (let i = 0; i < 12; i++) b.sphere(0.02, -0.15 + (i % 4) * 0.05, 0.43, -0.1 + Math.floor(i / 4) * 0.05, '#e8d8a8', { seg: 4 });
    return { w: 1.3, d: 1.3, h: 0.55, up: 1.4 };
  },

  holoConsole(b, o) {
    const c = o.c ?? '#3fb6d9';
    b.cyl(0.55, 0.65, 0.75, 0, 0, 0, '#cfd6de', { seg: 20, metalness: 0.4 });
    b.cyl(0.5, 0.5, 0.02, 0, 0.75, 0, '#1b2230', { seg: 20 });
    b.cyl(0.4, 0.4, 0.01, 0, 0.77, 0, c, glow(c, 1.4));
    // the hologram: a planet and its ring, floating
    b.sphere(0.22, 0, 1.15, 0, c, { ...glow(c, 1.1), opacity: 0.55 });
    b.cyl(0.36, 0.36, 0.01, 0, 1.15, 0, c, { ...glow(c, 1.4), seg: 24, rx: 0.4, opacity: 0.6 });
    for (let i = 0; i < 3; i++) b.cyl(0.6, 0.6, 0.01, 0, 0.78, 0, '#ff9a3a', { seg: 20, t0: i * 2.1, tl: 0.6, ...glow('#ff9a3a', 1) });
    lamp(b, c, 1.2, 0, 1.1, 0, 3);
    return { w: 1.3, d: 1.3, h: 1.4, up: 1.2 };
  },

  coralTable(b, o) {
    const r = rng(o.seed);
    for (let i = 0; i < 5; i++) { const a = r() * 6.28; b.cbox(0.08, 0.7, 0.08, Math.cos(a) * 0.12, 0.35, Math.sin(a) * 0.12, pick(r, ['#f08a7e', '#e8743a', '#b56ad8']), { rz: Math.cos(a) * 0.25, rx: -Math.sin(a) * 0.25 }); }
    lathe(b, [[0, 0], [0.62, 0.0], [0.66, 0.05], [0.6, 0.08], [0, 0.07]], '#f6eef6', { seg: 22 }, 0, 0.7, 0);
    for (let i = 0; i < 9; i++) b.cbox(0.03, 0.02, 0.6, 0, 0.78, 0, '#e8d8e8', { ry: i * 0.35, jitter: 0 });
    b.sphere(0.07, 0.25, 0.83, 0.1, '#fbf6ff', { roughness: 0.15, metalness: 0.3 });
    return { w: 1.35, d: 1.35, h: 1.0, up: 1.3 };
  },

  stumpTable(b, o) {
    b.cyl(0.55, 0.65, 0.7, 0, 0, 0, '#6b4a34', { seg: 12 });
    b.cyl(0.55, 0.55, 0.02, 0, 0.7, 0, '#d9b47a', { seg: 16 });
    for (let i = 0; i < 3; i++) b.cyl(0.15 + i * 0.15, 0.15 + i * 0.15, 0.021, 0, 0.7, 0, i % 2 ? '#c49a62' : '#d9b47a', { seg: 16 });
    for (let i = 0; i < 5; i++) b.cbox(0.1, 0.08, 0.45, Math.cos(i * 1.3) * 0.62, 0.04, Math.sin(i * 1.3) * 0.62, '#5e4230', { ry: -i * 1.3 });
    for (let i = 0; i < 4; i++) b.sphere(0.06, -0.2 + i * 0.12, 0.76, 0.15, '#a8703f', { sy: 1.2, seg: 8 });
    b.cyl(0.08, 0.06, 0.1, 0.25, 0.71, -0.2, '#efe6c8', { seg: 10 });
    return { w: 1.4, d: 1.4, h: 0.85, up: 1.3, spots: [[-0.25, 0.71, -0.2]] };
  },

  // ---------------------------------------------------------------- desks and lecterns
  lowDesk(b, o) {
    const w = 1.2, d = 0.55, h = 0.32, lac = o.c ?? '#3a2a22', r = rng(o.seed);
    b.box(w, 0.05, d, 0, h - 0.05, 0, lac, { roughness: 0.3 });
    for (const s of [-1, 1]) b.box(0.06, h - 0.05, d, s * (w / 2 - 0.04), 0, 0, lac);
    b.box(0.5, 0.005, 0.35, -0.15, h, 0.02, '#f6f2ea');
    for (let i = 0; i < 4; i++) b.cbox(0.012, 0.012, 0.12, -0.1 + (r() - 0.5) * 0.3, h + 0.01, (r() - 0.5) * 0.2, '#1d1b1c', { ry: r() * 3 });
    b.box(0.12, 0.03, 0.08, 0.35, h, 0.05, '#1d1b1c');
    b.cyl(0.015, 0.015, 0.22, 0.35, h + 0.05, -0.12, '#7a5434', { rz: 1.2, center: true });
    if (o.scrolls) for (let i = 0; i < 3; i++) b.cyl(0.04, 0.04, 0.4, 0.3, h + 0.04 + i * 0.07, -0.1, '#e8d8a8', { rz: Math.PI / 2, center: true, seg: 10 });
    return { w, d, h: h + 0.2, wall: true, up: 1.6 };
  },

  lectern(b, o) {
    const wood = o.c ?? '#5a3420', book = o.book ?? '#7a1f2a';
    b.cyl(0.25, 0.3, 0.08, 0, 0, 0, wood, { seg: 10 });
    b.cyl(0.06, 0.08, 0.95, 0, 0.08, 0, wood, { seg: 8 });
    b.cbox(0.6, 0.04, 0.45, 0, 1.08, 0, wood, { rx: 0.45 });
    // an open book on it
    for (const s of [-1, 1]) b.cbox(0.26, 0.04, 0.36, s * 0.14, 1.12, 0.01, '#efe6d0', { rx: 0.45, rz: s * 0.06 });
    b.cbox(0.56, 0.02, 0.4, 0, 1.1, 0.01, book, { rx: 0.45 });
    if (o.candle) {
      b.cyl(0.03, 0.03, 0.18, 0.32, 1.0, -0.15, '#f6f2ea', { seg: 6 });
      b.sphere(0.03, 0.32, 1.22, -0.15, '#ffcf7a', glow('#ffb340', 1.6));
      lamp(b, '#ffb860', 0.8, 0.32, 1.3, -0.15, 2.5);
    }
    if (o.glow) b.sphere(0.08, 0, 1.3, 0.05, o.glow, { ...glow(o.glow, 1.6), opacity: 0.7 });
    return { w: 0.7, d: 0.6, h: 1.35, up: 1.4 };
  },

  bureau(b, o) {
    const wood = o.c ?? '#7a4a2a', w = 1.1, d = 0.55, r = rng(o.seed);
    b.box(w, 0.75, d, 0, 0, 0, wood);
    for (let i = 0; i < 3; i++) b.frame(w - 0.12, 0.18, 0.02, 0, 0.06 + i * 0.22, d / 2 + 0.005, shade(wood, -0.1), 0.02);
    for (let i = 0; i < 3; i++) b.sphere(0.025, 0, 0.15 + i * 0.22, d / 2 + 0.03, GOLD, BRASS);
    // the slanted writing flap, opened, with pigeonholes behind
    b.box(w, 0.35, 0.25, 0, 0.75, -d / 2 + 0.125, wood);
    for (let i = 0; i < 4; i++) b.box(0.01, 0.3, 0.2, -w / 2 + 0.22 * (i + 1), 0.77, -d / 2 + 0.13, shade(wood, -0.15));
    b.box(w, 0.04, 0.4, 0, 0.73, 0.1, o.leather ?? '#2f5a46');
    for (let i = 0; i < 3; i++) b.cbox(0.18, 0.006, 0.24, -0.2 + i * 0.12, 0.77 + i * 0.004, 0.12, '#f6f2ea', { ry: (r() - 0.5) * 0.6 });
    b.cyl(0.03, 0.035, 0.06, 0.38, 0.77, 0.1, '#1d1b1c', { seg: 8 });
    b.cbox(0.01, 0.2, 0.01, 0.39, 0.86, 0.1, '#f6f2ea', { rz: 0.4 });
    roundLegs(b, w - 0.04, d - 0.04, 0.08, GOLD, 0.03, BRASS);
    return { w, d: d + 0.1, h: 1.15, wall: true, up: 1.4, spots: [[0.3, 1.1, -0.15]] };
  },

  easel(b, o) {
    const wood = '#a8703f', r = rng(o.seed);
    for (const s of [-1, 1]) b.cbox(0.04, 1.8, 0.04, s * 0.32, 0.88, 0.05, wood, { rz: s * 0.12, rx: -0.1 });
    b.cbox(0.04, 1.7, 0.04, 0, 0.82, -0.35, wood, { rx: 0.35 });
    b.box(0.8, 0.05, 0.1, 0, 0.6, 0.08, wood);
    b.cbox(0.75, 0.6, 0.03, 0, 1.0, 0.04, '#f6f2ea', { rx: -0.1 });
    for (let i = 0; i < 7; i++) b.cbox(0.12 + r() * 0.2, 0.1 + r() * 0.15, 0.01, (r() - 0.5) * 0.5, 0.85 + r() * 0.3, 0.065, pick(r, ['#2f5d8a', '#e8492c', '#f2c94c', '#7cae4f', '#c46aa8']), { rx: -0.1 });
    b.cyl(0.22, 0.22, 0.015, 0.55, 0, 0.3, '#c9a477', { seg: 14 });
    for (let i = 0; i < 4; i++) b.sphere(0.03, 0.5 + i * 0.05, 0.02, 0.25, ['#e8492c', '#2f5d8a', '#f2c94c', '#f6f2ea'][i], { seg: 6 });
    return { w: 0.9, d: 0.9, h: 1.85, up: 1.2 };
  },

  booth(b, o) {
    const c = o.c ?? '#c0283a';
    b.box(1.0, 1.0, 0.8, 0, 0, 0, c, { material: patternMaterial('stripes', c, '#f6f2ea', 2, 1) });
    b.box(1.1, 0.06, 0.9, 0, 1.0, 0, GOLD, BRASS);
    b.box(0.6, 0.4, 0.04, 0, 1.06, 0.3, '#2a2220');
    b.cyl(0.7, 0.75, 0.35, 0, 1.5, 0, c, { seg: 8 });
    b.cyl(0, 0.75, 0.35, 0, 1.85, 0, '#f6f2ea', { seg: 8 });
    b.sphere(0.07, 0, 2.2, 0, GOLD, BRASS);
    for (let i = 0; i < 4; i++) b.box(0.18, 0.08, 0.003, -0.25 + i * 0.17, 0.75, 0.405, '#f2c94c');
    return { w: 1.2, d: 1.0, h: 2.3, wall: true, up: 1.0 };
  },

  checkin(b, o) {
    b.box(1.6, 0.95, 0.6, 0, 0, 0, '#eef2f6', { round: 0.04 });
    b.box(1.6, 0.05, 0.65, 0, 0.95, 0, '#2f5d8a');
    b.cbox(0.4, 0.28, 0.03, -0.35, 1.15, -0.1, '#1b2230', { rx: -0.2 });
    b.cbox(0.36, 0.24, 0.01, -0.35, 1.15, -0.08, '#5aa9e6', { ...glow('#5aa9e6', 0.8), rx: -0.2 });
    b.box(0.7, 0.3, 0.5, 0.6, 0, 0.55, '#3a3a3e');
    for (let i = 0; i < 2; i++) b.box(0.42, 0.28, 0.3, 0.6, 0.3, 0.55, ['#e8492c', '#f2c94c'][i], { round: 0.04, ry: i * 0.2 });
    return { w: 1.7, d: 1.2, h: 1.4, wall: true, up: 1.1 };
  },

  commandDesk(b, o) {
    const c = o.c ?? '#3fb6d9';
    b.box(1.6, 0.75, 0.7, 0, 0, 0, '#cfd6de', { round: 0.05, metalness: 0.3 });
    b.cbox(1.6, 0.06, 0.55, 0, 0.82, 0.05, '#2a2e36', { rx: 0.2 });
    for (let i = 0; i < 12; i++) b.box(0.08, 0.02, 0.06, -0.6 + (i % 6) * 0.24, 0.85, -0.05 + Math.floor(i / 6) * 0.15, ['#ff4a4a', '#7cff8a', '#ffcf3a', c][i % 4], glow(['#ff4a4a', '#7cff8a', '#ffcf3a', c][i % 4], 1.2));
    for (const s of [-1, 0, 1]) {
      b.cbox(0.48, 0.32, 0.03, s * 0.52, 1.15, -0.28, '#1b2230', { ry: -s * 0.3 });
      b.cbox(0.44, 0.28, 0.01, s * 0.52, 1.15, -0.26, c, { ...glow(c, 0.9), ry: -s * 0.3 });
    }
    return { w: 1.6, d: 0.8, h: 1.35, wall: true, up: 1.1 };
  },

  // ---------------------------------------------------------------- shelves and racks
  shelf(b, o) {
    // shelves of things: books, scrolls, potions, eggs, toys, games, shells
    const w = 1.4, h = o.h ?? 1.5, d = 0.42, wood = o.c ?? '#6b4a34', r = rng(o.seed), n = 4, sh = h / n;
    b.box(w, h, 0.03, 0, 0, -d / 2 + 0.015, shade(wood, -0.1));
    for (const s of [-1, 1]) b.box(0.05, h, d, s * (w / 2 - 0.025), 0, 0, wood);
    for (let i = 0; i <= n; i++) b.box(w, 0.04, d, 0, Math.min(i * sh, h - 0.04), 0, wood);
    for (let i = 0; i < n; i++) {
      const y = i * sh + 0.04, kind = o.items ?? 'books';
      if (kind === 'books') bookRow(b, w - 0.1, 0, y, 0, d, r, sh - 0.08, o.cols);
      else for (let x = -w / 2 + 0.15; x < w / 2 - 0.1; x += 0.2 + r() * 0.06) {
        const c = pick(r, o.cols ?? ['#7cc66a', '#b56ad8', '#5aa9e6', '#e8492c', '#f2c94c']);
        if (kind === 'potions') { lathe(b, [[0, 0], [0.06, 0], [0.07, 0.08], [0.03, 0.14], [0.025, 0.2], [0, 0.2]], c, { seg: 10, ...glow(c, 0.4), opacity: 0.85 }, x, y, 0); b.cyl(0.018, 0.018, 0.04, x, y + 0.2, 0, '#8a5a36', { seg: 6 }); }
        else if (kind === 'scrolls') for (let k = 0; k < 3; k++) b.cyl(0.035, 0.035, d * 0.8, x + (k % 2) * 0.04, y + 0.035 + k * 0.06, 0, pick(r, ['#e8d8a8', '#d9c48a', '#efe6d0']), { rx: Math.PI / 2, center: true, seg: 8 });
        else if (kind === 'eggs') b.sphere(0.07, x, y + 0.08, 0, c, { sy: 1.3, seg: 10 });
        else if (kind === 'shells') lathe(b, [[0, 0], [0.08, 0.01], [0.06, 0.06], [0, 0.12]], pick(r, ['#f6d3c9', '#f8f4ff', '#f0a8c4', '#e8d8a8']), { seg: 9 }, x, y, 0);
        else if (kind === 'toys') { if (r() < 0.5) b.box(0.13, 0.13, 0.13, x, y, 0, c, { ry: r() }); else { b.cyl(0.06, 0.07, 0.14, x, y, 0, c, { seg: 8 }); b.sphere(0.05, x, y + 0.19, 0, '#f2d2b6', { seg: 8 }); } }
        else if (kind === 'games') { b.box(0.17, sh * 0.7, 0.3, x, y, 0, c); b.box(0.172, 0.05, 0.302, x, y + sh * 0.35, 0, '#f6f2ea'); }
        else if (kind === 'jars') lathe(b, [[0, 0], [0.07, 0], [0.08, 0.12], [0.05, 0.16], [0, 0.16]], c, { seg: 10 }, x, y, 0);
      }
    }
    if (o.top) stack(b, 2, 0.3, 0.2, -0.35, h, 0, ['#a33b2b', '#d9b44a'], r);
    return { w, d, h: h + 0.15, wall: true, up: 1.15 };
  },

  rack(b, o) {
    // a wall rack of katanas, swords, cutlasses or rifles
    const kind = o.kind ?? 'sword', wood = o.c ?? (kind === 'katana' ? '#1d1716' : '#6b4a34');
    b.box(1.3, 1.5, 0.08, 0, 0, -0.18, wood, kind === 'katana' ? { roughness: 0.25 } : {});
    b.box(1.3, 0.12, 0.35, 0, 0, 0, wood);
    for (let i = 0; i < 4; i++) {
      const x = -0.45 + i * 0.3;
      if (kind === 'katana') for (let k = 0; k < 2; k++) {
        b.cbox(1.0, 0.05, 0.05, 0, 0.55 + k * 0.4 + i * 0.0, -0.1, k ? '#1d1716' : '#7a1f2a', { rz: 0.05 * (i % 2 ? 1 : -1) });
        if (i === 0) b.cbox(0.06, 0.06, 0.06, 0.3, 0.55 + k * 0.4, -0.1, GOLD, BRASS);
      } else if (kind === 'rifle') {
        b.cbox(0.05, 1.1, 0.06, x, 0.7, -0.08, '#3a3a3e', { metalness: 0.5 });
        b.cbox(0.09, 0.4, 0.08, x, 0.3, -0.08, '#7a4a2a', { rz: 0.08 });
      } else {
        const blade = kind === 'cutlass' ? 0.08 : 0.06;
        b.cbox(blade, 0.95, 0.015, x, 0.75, -0.1, '#cfd6de', { metalness: 0.8, roughness: 0.25, rz: kind === 'cutlass' ? 0.1 : 0 });
        b.cbox(0.24, 0.04, 0.05, x, 0.27, -0.1, GOLD, BRASS);
        b.cbox(0.04, 0.18, 0.04, x, 0.16, -0.1, '#4a2e1e');
      }
    }
    if (kind === 'katana') for (let i = 0; i < 2; i++) b.cbox(0.05, 0.3, 0.05, (i ? 1 : -1) * 0.5, 0.4, -0.12, '#1d1716');
    if (kind === 'sword') { b.cbox(0.5, 0.6, 0.04, 0, 1.15, -0.12, '#2f5d8a'); b.cbox(0.3, 0.06, 0.045, 0, 1.15, -0.1, GOLD, BRASS); b.cbox(0.06, 0.3, 0.045, 0, 1.15, -0.1, GOLD, BRASS); }
    return { w: 1.3, d: 0.4, h: 1.55, wall: true, up: 1.15 };
  },

  bonePile(b, o) {
    const r = rng(o.seed);
    for (let i = 0; i < 14; i++) {
      const x = (r() - 0.5) * 1.0, z = (r() - 0.5) * 0.5, y = 0.05 + r() * 0.4, ry = r() * 3;
      b.cbox(0.45, 0.06, 0.06, x, y, z, '#efe6d0', { ry, rz: (r() - 0.5) * 0.6 });
      for (const s of [-1, 1]) b.sphere(0.05, x + Math.cos(ry) * s * 0.22, y, z - Math.sin(ry) * s * 0.22, '#e6dcc4', { seg: 6 });
    }
    b.sphere(0.2, 0.2, 0.6, 0, '#efe6d0', { seg: 10, sy: 0.9 });
    for (const s of [-1, 1]) b.sphere(0.05, 0.2 + s * 0.08, 0.62, 0.17, '#2a1d18', { seg: 6 });
    b.cbox(0.06, 0.6, 0.06, -0.4, 0.75, -0.1, '#efe6d0', { rz: 0.5 });
    return { w: 1.2, d: 0.7, h: 0.9, wall: true, up: 1.4 };
  },

  maskWall(b, o) {
    const r = rng(o.seed);
    b.box(1.4, 1.5, 0.08, 0, 0, -0.15, o.c ?? '#6a1f6e');
    b.box(1.4, 0.1, 0.3, 0, 0, 0, '#2a1838');
    for (let i = 0; i < 3; i++) for (let j = 0; j < 3; j++) {
      const x = -0.42 + i * 0.42, y = 0.35 + j * 0.4, c = pick(r, ['#f6f2ea', GOLD, '#c0283a', '#2f6f9a', '#1d1b1c']);
      b.cbox(0.32, 0.15, 0.06, x, y, -0.08, c, { round: 0.05 });
      for (const s of [-1, 1]) b.cbox(0.08, 0.05, 0.02, x + s * 0.07, y + 0.01, -0.045, '#1d1b1c');
      if (r() < 0.5) b.cbox(0.03, 0.25, 0.02, x + 0.12, y + 0.18, -0.07, pick(r, ['#c0283a', '#f2c94c', '#2f6f9a']), { rz: -0.4 });
    }
    return { w: 1.4, d: 0.4, h: 1.55, wall: true, up: 1.15 };
  },

  luggageRack(b, o) {
    const brass = GOLD;
    for (const s of [-1, 1]) b.cyl(0.025, 0.025, 1.4, s * 0.6, 0, -0.1, brass, { seg: 8, ...BRASS });
    for (const y of [0.5, 1.0]) b.box(1.3, 0.03, 0.4, 0, y, -0.05, '#5a3420');
    const cols = ['#7a3f2a', '#33405a', '#a8703f', '#2f5a46'];
    for (let i = 0; i < 3; i++) b.box(0.35, 0.25 + i * 0.05, 0.32, -0.4 + i * 0.4, 0.53, -0.05, cols[i], { round: 0.03 });
    for (let i = 0; i < 2; i++) b.cyl(0.14, 0.14, 0.2, -0.2 + i * 0.4, 1.03, -0.05, cols[3 - i], { seg: 14 });
    b.box(0.55, 0.35, 0.42, 0, 0, 0, '#7a3f2a', { round: 0.03 });
    for (const s of [-1, 1]) b.box(0.04, 0.37, 0.43, s * 0.15, 0, 0, '#c9a477');
    return { w: 1.4, d: 0.5, h: 1.45, wall: true, up: 1.15 };
  },

  skiRack(b, o) {
    b.box(1.3, 1.6, 0.08, 0, 0, -0.15, '#8a5a36');
    b.box(1.3, 0.08, 0.25, 0, 0.3, -0.05, '#6b4a34');
    const cols = ['#c0392b', '#2f5d8a', '#f2c94c', '#3f7a4a'];
    for (let i = 0; i < 4; i++) for (const s of [-1, 1]) b.cbox(0.08, 1.55, 0.03, -0.45 + i * 0.3 + s * 0.05, 0.85, -0.08, cols[i], { rz: 0.04 });
    for (let i = 0; i < 2; i++) b.cyl(0.012, 0.012, 1.3, 0.55 + i * 0.06, 0, -0.05, '#9aa6b4', { seg: 5, metalness: 0.6 });
    return { w: 1.35, d: 0.35, h: 1.65, wall: true, up: 1.15 };
  },

  postcards(b, o) {
    const r = rng(o.seed);
    b.cyl(0.04, 0.04, 1.6, 0, 0, 0, '#cfd6de', { seg: 8, metalness: 0.5 });
    b.cyl(0.3, 0.32, 0.05, 0, 0, 0, '#cfd6de', { seg: 14, metalness: 0.5 });
    for (let k = 0; k < 4; k++) for (let i = 0; i < 4; i++) {
      const a = (i / 4) * Math.PI * 2 + k * 0.4, y = 0.45 + k * 0.3;
      b.cbox(0.2, 0.14, 0.01, Math.cos(a) * 0.18, y, Math.sin(a) * 0.18, pick(r, ['#5aa9e6', '#f2c94c', '#e8492c', '#7cae4f', '#f6f2ea']), { ry: -a + Math.PI / 2 });
    }
    return { w: 0.7, d: 0.7, h: 1.65, up: 1.4 };
  },

  bookBox(b, o) {
    const c = o.c ?? '#2f5a46';
    b.box(1.3, 0.75, 0.55, 0, 0.35, 0, c);
    b.cbox(1.3, 0.04, 0.6, 0, 1.3, -0.45, c, { rx: -1.2 });
    legs(b, 1.2, 0.5, 0.35, '#2a2523', 0.05);
    const r = rng(o.seed);
    bookRow(b, 1.15, 0, 1.1, 0.0, 0.4, r, 0.18);
    for (let i = 0; i < 4; i++) b.cbox(0.22, 0.008, 0.3, -0.4 + i * 0.26, 1.11, 0.12, pick(r, ['#e8d8a8', '#f6f2ea', '#c9a477']), { ry: (r() - 0.5) * 0.4 });
    return { w: 1.35, d: 0.7, h: 1.6, wall: true, up: 1.15 };
  },

  serverRack(b, o) {
    b.box(1.2, 1.7, 0.6, 0, 0, 0, '#2a2e36', { metalness: 0.4 });
    for (let i = 0; i < 9; i++) {
      b.box(1.05, 0.12, 0.02, 0, 0.12 + i * 0.17, 0.3, '#1b2230');
      for (let k = 0; k < 6; k++) b.box(0.03, 0.03, 0.02, -0.4 + k * 0.08, 0.17 + i * 0.17, 0.315, ['#7cff8a', '#3fb6d9', '#ffcf3a'][(i + k) % 3], glow(['#7cff8a', '#3fb6d9', '#ffcf3a'][(i + k) % 3], 1.4));
    }
    b.box(1.2, 0.04, 0.6, 0, 1.7, 0, '#9aa6b4', { metalness: 0.5 });
    return { w: 1.2, d: 0.65, h: 1.75, wall: true, up: 1.1 };
  },

  // ---------------------------------------------------------------- music
  harp(b, o) {
    const s = o.s ?? 1, frame = o.c ?? GOLD, metal = o.c ? {} : BRASS;
    b.box(0.4 * s, 0.12, 0.5 * s, 0, 0, 0, frame, metal);
    // the column, the neck curving over, the soundboard slanting
    b.cyl(0.05 * s, 0.06 * s, 1.75 * s, -0.12 * s, 0.1, 0, frame, { seg: 10, ...metal });
    b.cyl(0.04 * s, 0.04 * s, 0.95 * s, 0.25 * s, 1.55 * s, 0, frame, { rz: 1.1, center: true, seg: 10, ...metal });
    b.cbox(0.12 * s, 1.55 * s, 0.14 * s, 0.33 * s, 0.85 * s, 0, o.board ?? shade(frame, -0.2), { rz: -0.32 });
    for (let i = 0; i < 9; i++) {
      const t = (i + 1) / 10;
      const x0 = -0.12 * s + t * 0.06, xb = 0.08 * s + t * 0.48 * s, yb = 0.15 + t * 1.4 * s, yt = 1.2 * s + t * 0.55 * s;
      b.cbox(0.006, Math.abs(yt - yb) + 0.2, 0.006, (x0 + xb) / 2 + 0.1 * s * t, (yb + yt) / 2, 0, '#f6f2ea', { shadow: false, jitter: 0 });
    }
    if (o.leaves) foliage(b, { seed: o.seed, rx: 0.2, ry: 0.15, palette: 'lime', voxel: 0.05, flowers: '#f4f1ff', flowerRate: 0.2 }, 0, 1.85 * s, 0);
    return { w: 0.9 * s, d: 0.6 * s, h: 1.95 * s, up: 1.25 };
  },

  koto(b, o) {
    const L = 1.8, wood = o.c ?? '#a8703f';
    b.box(L, 0.1, 0.35, 0, 0.32, 0, wood, { round: 0.04 });
    for (const s of [-1, 1]) b.box(0.08, 0.32, 0.3, s * (L / 2 - 0.15), 0, 0, shade(wood, -0.15));
    for (let i = 0; i < 13; i++) {
      b.box(L - 0.2, 0.006, 0.006, 0, 0.43, -0.15 + i * 0.025, '#f6f2ea', { shadow: false, jitter: 0 });
      b.cbox(0.03, 0.05, 0.02, -0.5 + (i % 5) * 0.22 + i * 0.04, 0.45, -0.15 + i * 0.025, '#f6f2ea');
    }
    b.box(0.6, 0.08, 0.6, 0, 0, 0.55, o.cushion ?? '#7a2a3a', { round: 0.04 });
    return { w: L, d: 1.0, h: 0.55, up: 1.3 };
  },

  organ(b, o) {
    const kind = o.kind ?? 'pipe', wood = o.c ?? '#3a2420';
    if (kind === 'barrel') {
      // a street barrel organ on a cart
      b.box(0.8, 0.7, 0.55, 0, 0.35, 0, wood, { round: 0.03 });
      for (const s of [-1, 1]) b.cyl(0.3, 0.3, 0.05, s * 0.45, 0.3, 0, '#5a3420', { rz: Math.PI / 2, center: true, seg: 14 });
      for (let i = 0; i < 6; i++) b.cyl(0.04, 0.04, 0.35, -0.25 + i * 0.1, 1.05, 0.1, GOLD, { seg: 8, ...BRASS });
      b.cbox(0.05, 0.3, 0.05, 0.45, 0.75, 0.15, '#2a2220', { rz: 1.2 });
      b.box(0.6, 0.5, 0.02, 0, 0.45, 0.28, o.c2 ?? '#c0283a');
      return { w: 1.1, d: 0.7, h: 1.45, up: 1.4 };
    }
    const fair = kind === 'fair';
    b.box(1.5, 0.85, 0.6, 0, 0, 0, fair ? '#c0283a' : wood);
    b.box(1.3, 0.05, 0.25, 0, 0.75, 0.3, '#1d1716');
    b.box(1.2, 0.03, 0.15, 0, 0.8, 0.32, '#f6f2ea');
    const n = fair ? 9 : 11;
    for (let i = 0; i < n; i++) {
      const x = -0.65 + (i * 1.3) / (n - 1), h = 0.6 + (1 - Math.abs(i - (n - 1) / 2) / ((n - 1) / 2)) * 0.8;
      b.cyl(0.05, 0.05, h, x, 0.85, -0.15, fair ? pick(rng(i + 1), [GOLD, '#f6f2ea', '#2f6f9a']) : '#c9b48a', { seg: 10, ...BRASS });
    }
    if (fair) { b.box(1.5, 0.15, 0.62, 0, 1.75, -0.05, GOLD, BRASS); for (let i = 0; i < 6; i++) b.sphere(0.05, -0.6 + i * 0.24, 1.82, 0.27, '#fff2c8', glow('#ffd36a', 1.4)); }
    if (kind === 'harmonium') { b.box(1.5, 0.35, 0.4, 0, 0.85, -0.1, wood); b.box(1.2, 0.04, 0.02, 0, 0.3, 0.31, GOLD, BRASS); }
    return { w: 1.5, d: 0.7, h: fair ? 1.9 : 1.75, wall: true, up: 1.15 };
  },

  upright(b, o) {
    const c = o.c ?? '#4a2e1e';
    b.box(1.45, 1.25, 0.55, 0, 0, -0.05, c);
    b.box(1.35, 0.06, 0.28, 0, 0.72, 0.3, c);
    b.box(1.25, 0.03, 0.18, 0, 0.78, 0.32, '#f6f2ea');
    for (let i = 0; i < 30; i++) if ([1, 3, 6, 8, 10].includes(i % 12)) b.box(0.022, 0.02, 0.09, -0.58 + i * 0.04, 0.81, 0.29, '#111');
    b.box(0.5, 0.3, 0.02, 0, 0.88, 0.23, '#efe6d0', { rx: -0.2 });
    for (const s of [-1, 1]) { b.cyl(0.04, 0.05, 0.1, s * 0.55, 1.25, 0, GOLD, BRASS); b.cyl(0.015, 0.015, 0.12, s * 0.55, 1.35, 0, '#f6f2ea'); }
    if (o.glass) { b.cyl(0.04, 0.035, 0.12, 0.25, 1.25, 0.05, '#c9a24a', { opacity: 0.6, seg: 8 }); b.cyl(0.03, 0.03, 0.2, -0.2, 1.25, 0.05, '#3f7a4a', { seg: 8 }); }
    b.box(0.8, 0.07, 0.35, 0, 0.45, 0.7, c);
    legs(b, 0.75, 0.3, 0.45, shade(c, -0.1), 0.05, 0, {});
    return { w: 1.45, d: 1.1, h: 1.5, wall: true, up: 1.15 };
  },

  drum(b, o) {
    lathe(b, [[0.3, 0], [0.42, 0.3], [0.4, 0.62], [0, 0.62]], o.c ?? '#8a5a36', { seg: 16 });
    b.cyl(0.42, 0.42, 0.02, 0, 0.62, 0, '#d9c49a', { seg: 16 });
    for (let i = 0; i < 8; i++) b.cbox(0.015, 0.62, 0.015, Math.cos(i * 0.785) * 0.38, 0.31, Math.sin(i * 0.785) * 0.38, '#3a2a1e', { rz: Math.cos(i * 0.785) * 0.18, rx: -Math.sin(i * 0.785) * 0.18 });
    b.cyl(0.25, 0.3, 0.4, 0.6, 0, 0.2, shade(o.c ?? '#8a5a36', 0.08), { seg: 14 });
    b.cyl(0.3, 0.3, 0.02, 0.6, 0.4, 0.2, '#d9c49a', { seg: 14 });
    for (const s of [-1, 1]) { b.cbox(0.03, 0.03, 0.4, s * 0.1, 0.66, 0.1, '#efe6d0', { ry: s * 0.4 }); b.sphere(0.045, s * 0.18, 0.66, 0.28, '#efe6d0', { seg: 6 }); }
    return { w: 1.3, d: 0.9, h: 0.7, up: 1.5 };
  },

  synth(b, o) {
    const c = o.c ?? '#3fb6d9';
    b.box(1.5, 0.12, 0.5, 0, 0.78, 0, '#2a2e36', { round: 0.03 });
    b.box(1.2, 0.03, 0.18, 0, 0.9, 0.12, '#eef2f6');
    for (let i = 0; i < 26; i++) if ([1, 3, 6, 8, 10].includes(i % 12)) b.box(0.022, 0.02, 0.09, -0.55 + i * 0.045, 0.93, 0.09, '#111');
    for (let i = 0; i < 10; i++) b.cyl(0.025, 0.025, 0.03, -0.6 + i * 0.13, 0.9, -0.12, ['#ff4a4a', c, '#ffcf3a'][i % 3], { seg: 8, ...glow(['#ff4a4a', c, '#ffcf3a'][i % 3], 1) });
    for (const s of [-1, 1]) b.cbox(0.05, 0.8, 0.05, s * 0.4, 0.4, 0, '#9aa6b4', { rz: s * 0.4, metalness: 0.6 });
    b.box(0.3, 0.2, 0.03, 0.5, 0.92, -0.18, '#1b2230');
    b.box(0.26, 0.16, 0.01, 0.5, 0.94, -0.165, c, glow(c, 1));
    return { w: 1.5, d: 0.6, h: 1.15, up: 1.3 };
  },

  alphorn(b, o) {
    const wood = '#b98552';
    b.cyl(0.03, 0.06, 2.2, 0.1, 0.5, 0, wood, { rz: Math.PI / 2 - 0.2, center: true, seg: 10 });
    lathe(b, [[0.06, 0], [0.08, 0.15], [0.16, 0.3], [0.2, 0.35], [0.15, 0.36]], wood, { seg: 14 }, 0, 0, 0);
    b.cbox(0.2, 0.3, 0.12, -0.95, 0.15, 0, '#6b4a34');
    for (let i = 0; i < 4; i++) b.cyl(0.07 - i * 0.005, 0.07 - i * 0.005, 0.04, -0.4 + i * 0.35, 0.33 + i * 0.08, 0, '#2f5d8a', { rz: Math.PI / 2 - 0.2, center: true, seg: 10 });
    return { w: 2.3, d: 0.5, h: 0.75, up: 1.3 };
  },

  karaoke(b, o) {
    b.box(0.8, 0.9, 0.55, 0, 0, 0, '#2a2240', { round: 0.04 });
    for (let i = 0; i < 2; i++) { b.cyl(0.18, 0.18, 0.02, (i ? 1 : -1) * 0.2, 0.45, 0.28, '#1b1b1e', { rx: Math.PI / 2, center: true, seg: 16 }); b.cyl(0.08, 0.08, 0.025, (i ? 1 : -1) * 0.2, 0.45, 0.285, '#5a5a6a', { rx: Math.PI / 2, center: true, seg: 12 }); }
    b.cbox(0.6, 0.38, 0.04, 0, 1.12, -0.1, '#1b1b1e', { rx: -0.15 });
    b.cbox(0.55, 0.33, 0.01, 0, 1.12, -0.07, '#ff4d8d', { ...glow('#ff4d8d', 0.9), rx: -0.15 });
    b.cyl(0.02, 0.025, 1.3, 0.65, 0, 0.3, '#9aa6b4', { seg: 8, metalness: 0.6 });
    b.sphere(0.06, 0.65, 1.36, 0.3, '#3a3a3e', { seg: 10 });
    for (let i = 0; i < 6; i++) b.box(0.05, 0.05, 0.02, -0.3 + i * 0.12, 0.85, 0.28, ['#ff4d8d', '#5aa9e6', '#f2c94c'][i % 3], glow(['#ff4d8d', '#5aa9e6', '#f2c94c'][i % 3], 1.4));
    return { w: 1.1, d: 0.7, h: 1.45, wall: true, up: 1.3 };
  },

  // ---------------------------------------------------------------- baths and basins
  clawBath(b, o) {
    const c = o.c ?? '#f6f2ea', feet = o.feet ?? GOLD, metal = o.metal ? { metalness: 0.7, roughness: 0.3 } : {};
    b.box(1.6, 0.5, 0.75, 0, 0.14, 0, c, { round: 0.2, ...metal });
    b.box(1.4, 0.05, 0.55, 0, 0.6, 0, o.water ?? '#a9cfd8', { roughness: 0.1 });
    for (let i = 0; i < 5; i++) b.sphere(0.06 + (i % 2) * 0.02, -0.3 + i * 0.12, 0.64, (i % 3 - 1) * 0.1, o.foam ?? '#ffffff', { seg: 8 });
    for (const sx of [-0.65, 0.65]) for (const sz of [-0.27, 0.27]) b.sphere(0.06, sx, 0.08, sz, feet, BRASS);
    b.cyl(0.02, 0.02, 0.35, -0.72, 0.6, 0, feet, { metalness: 0.8 });
    b.box(0.08, 0.03, 0.2, -0.66, 0.92, 0, feet, BRASS);
    if (o.petals) for (let i = 0; i < 10; i++) b.cbox(0.05, 0.01, 0.03, (rng(o.seed + i)() - 0.5) * 1.1, 0.66, (rng(o.seed + i * 3)() - 0.5) * 0.4, o.petals, { ry: i, jitter: 0 });
    return { w: 1.7, d: 0.8, h: 0.95, wall: true, up: 1 };
  },

  tub(b, o) {
    // round wooden tub (ofuro, medieval bath, hot tub)
    const R = o.r ?? 0.65, h = o.h ?? 0.65, wood = o.c ?? '#c9a477';
    b.cyl(R, R * 0.95, h, 0, 0, 0, wood, { seg: o.square ? 4 : 18, ...(o.square ? { ry: Math.PI / 4 } : {}) });
    for (const t of [0.2, 0.8]) b.cyl(R * 1.02, R * 1.02, 0.04, 0, h * t, 0, o.band ?? '#5a4a3a', { seg: o.square ? 4 : 18, ...(o.square ? { ry: Math.PI / 4 } : {}) });
    b.cyl(R * 0.9, R * 0.9, 0.02, 0, h - 0.08, 0, o.water ?? '#9fd0d4', { seg: o.square ? 4 : 18, roughness: 0.1, ...(o.square ? { ry: Math.PI / 4 } : {}) });
    if (o.steam) for (let i = 0; i < 4; i++) b.sphere(0.12 + i * 0.03, (i % 2 - 0.5) * 0.3, h + 0.1 + i * 0.12, (i % 3 - 1) * 0.15, '#ffffff', { opacity: 0.35, seg: 8, shadow: false });
    if (o.bucket) { b.cyl(0.13, 0.11, 0.18, R + 0.25, 0, 0.2, wood, { seg: 12 }); b.box(0.35, 0.25, 0.3, -R - 0.15, 0, 0.3, shade(wood, -0.08)); }
    return { w: R * 2 + 0.5, d: R * 2 + 0.2, h: h + 0.2, up: 1.3 };
  },

  pond(b, o) {
    const R = o.r ?? 0.8, edge = o.edge ?? '#8e8a82', water = o.water ?? '#4f9fb5', r = rng(o.seed);
    for (let i = 0; i < 12; i++) { const a = (i / 12) * Math.PI * 2; b.sphere(0.16 + r() * 0.05, Math.cos(a) * R, 0.08, Math.sin(a) * R * 0.85, shade(edge, (r() - 0.5) * 0.1), { sy: 0.6, seg: 8, flat: true }); }
    b.cyl(R, R, 0.04, 0, 0.02, 0, water, { seg: 22, roughness: 0.08, metalness: 0.2 });
    b.cyl(R * 0.6, R * 0.6, 0.041, 0, 0.02, 0, shade(water, -0.1), { seg: 22, roughness: 0.08 });
    for (let i = 0; i < (o.fish ?? 0); i++) b.cbox(0.16, 0.03, 0.06, Math.cos(i * 2.3) * R * 0.45, 0.07, Math.sin(i * 2.3) * R * 0.4, pick(r, ['#ff7a1a', '#f6f2ea', '#e8492c']), { ry: i * 2.3, round: 0.02 });
    for (let i = 0; i < (o.pads ?? 0); i++) b.cyl(0.11, 0.11, 0.012, Math.cos(i * 2.1 + 1) * R * 0.6, 0.065, Math.sin(i * 2.1 + 1) * R * 0.5, '#5a9440', { seg: 10, t0: 0.3, tl: Math.PI * 1.8 });
    for (let i = 0; i < (o.ducks ?? 0); i++) {
      const x = -0.3 + i * 0.4, z = (i % 2) * 0.2;
      b.sphere(0.1, x, 0.13, z, '#f2d46a', { sy: 0.7, seg: 10 });
      b.sphere(0.06, x + 0.08, 0.24, z, '#f2d46a', { seg: 8 });
      b.cbox(0.05, 0.02, 0.03, x + 0.14, 0.24, z, '#ff7a1a');
    }
    if (o.reeds) for (let i = 0; i < 8; i++) b.cbox(0.02, 0.5 + r() * 0.3, 0.02, R * 0.8 + (r() - 0.5) * 0.2, 0.3, -R * 0.4 + (r() - 0.5) * 0.3, '#5a8a3a', { rz: (r() - 0.5) * 0.3 });
    if (o.seal) { b.sphere(0.2, 0.2, 0.18, 0, '#4a5058', { sy: 0.7, seg: 12 }); b.sphere(0.11, 0.38, 0.3, 0, '#4a5058', { seg: 10 }); b.sphere(0.08, 0.38, 0.48, 0, '#e8492c', { seg: 8 }); }
    return { w: R * 2.3, d: R * 2, h: 0.3, up: 1.1 };
  },

  ballPit(b, o) {
    const r = rng(o.seed);
    b.box(1.6, 0.4, 1.0, 0, 0, 0, '#5aa9e6', { round: 0.12 });
    b.box(1.4, 0.35, 0.8, 0, 0.06, 0, '#2a4a6a');
    for (let i = 0; i < 60; i++) b.sphere(0.06, (r() - 0.5) * 1.35, 0.38 + r() * 0.06, (r() - 0.5) * 0.75, pick(r, ['#ff4d8d', '#f2c94c', '#7cc66a', '#5aa9e6', '#ff7a1a']), { seg: 6 });
    return { w: 1.6, d: 1.0, h: 0.5, wall: true, up: 1.1 };
  },

  cryoTank(b, o) {
    const c = o.c ?? '#9fe8ff';
    b.box(1.6, 0.35, 0.8, 0, 0, 0, '#cfd6de', { round: 0.08, metalness: 0.3 });
    b.box(1.5, 0.28, 0.7, 0, 0.35, 0, c, { round: 0.12, opacity: 0.45, roughness: 0.05 });
    b.box(1.4, 0.02, 0.6, 0, 0.36, 0, c, glow(c, 1.4));
    for (const s of [-1, 1]) b.box(0.08, 0.5, 0.82, s * 0.8, 0, 0, '#9aa6b4', { metalness: 0.5 });
    b.box(0.2, 0.12, 0.02, 0.5, 0.15, 0.41, '#1b2230');
    b.box(0.06, 0.04, 0.01, 0.45, 0.19, 0.42, '#7cff8a', glow('#7cff8a', 1.5));
    return { w: 1.7, d: 0.85, h: 0.7, wall: true, up: 1.05 };
  },

  cauldron(b, o) {
    const c = o.c ?? '#7cff5a';
    lathe(b, [[0.2, 0], [0.42, 0.12], [0.5, 0.35], [0.46, 0.58], [0.4, 0.62], [0.38, 0.6], [0, 0.55]], '#2a2a2e', { seg: 18, metalness: 0.4 }, 0, 0.12, 0);
    b.cyl(0.38, 0.38, 0.02, 0, 0.68, 0, c, { seg: 18, ...glow(c, 0.9) });
    for (let i = 0; i < 3; i++) b.cbox(0.06, 0.18, 0.06, Math.cos(i * 2.1) * 0.3, 0.06, Math.sin(i * 2.1) * 0.3, '#2a2a2e');
    for (let i = 0; i < 4; i++) b.sphere(0.06 + i * 0.015, (i % 2 - 0.5) * 0.15, 0.8 + i * 0.12, (i % 3 - 1) * 0.1, c, { opacity: 0.4, seg: 8, shadow: false });
    if (o.fire) for (let i = 0; i < 5; i++) b.cbox(0.25, 0.06, 0.06, 0, 0.03, 0, '#5a3420', { ry: i * 0.6 });
    lamp(b, c, 0.9, 0, 0.9, 0, 2.5);
    return { w: 1.1, d: 1.1, h: 1.0, up: 1.4 };
  },

  basin(b, o) {
    const c = o.c ?? '#a9a296', h = o.h ?? 0.75;
    if (o.pedestal !== false) lathe(b, [[0.18, 0], [0.12, 0.08], [0.08, h * 0.5], [0.12, h - 0.1], [0, h - 0.1]], c, { seg: 14 });
    lathe(b, [[0, 0], [0.3, 0.02], [0.38, 0.15], [0.36, 0.18], [0.28, 0.08], [0, 0.07]], c, { seg: 18 }, 0, h - 0.12, 0);
    b.cyl(0.3, 0.3, 0.01, 0, h, 0, o.water ?? '#9fd0d4', { seg: 18, roughness: 0.08 });
    if (o.ladle) b.cbox(0.02, 0.02, 0.45, 0.1, h + 0.06, 0, '#a8703f', { ry: 0.6 });
    if (o.flowers) for (let i = 0; i < 6; i++) b.sphere(0.045, Math.cos(i) * 0.18, h + 0.02, Math.sin(i) * 0.18, o.flowers, { seg: 6 });
    return { w: 0.85, d: 0.85, h: h + 0.15, up: 1.5 };
  },

  jar(b, o) {
    const c = o.c ?? '#b8673f', h = o.h ?? 0.9, r = rng(o.seed);
    lathe(b, [[0.12, 0], [0.26, 0.15], [0.3, h * 0.45], [0.2, h * 0.8], [0.1, h * 0.88], [0.13, h], [0.09, h], [0, h * 0.9]], c, { seg: 16 });
    if (o.handles) for (const s of [-1, 1]) b.cyl(0.08, 0.08, 0.025, s * 0.2, h * 0.82, 0, c, { rx: Math.PI / 2, center: true, seg: 10, t0: s > 0 ? -1.6 : 1.6, tl: Math.PI });
    if (o.band) b.cyl(0.29, 0.29, 0.05, 0, h * 0.45, 0, o.band, { seg: 16 });
    if (o.more) for (let i = 0; i < 2; i++) lathe(b, [[0.08, 0], [0.16, 0.1], [0.17, 0.25], [0.08, 0.42], [0, 0.4]], shade(c, (r() - 0.5) * 0.1), { seg: 12 }, (i ? 1 : -1) * 0.4, 0, 0.15);
    return { w: o.more ? 1.1 : 0.7, d: 0.7, h, up: 1.5 };
  },

  bucket(b, o) {
    const c = o.c ?? '#8a5a36';
    lathe(b, [[0.22, 0], [0.28, 0.42], [0.26, 0.42], [0, 0.4]], c, { seg: 14 });
    for (const t of [0.08, 0.34]) b.cyl(0.24 + t * 0.12, 0.24 + t * 0.12, 0.03, 0, t, 0, '#3a3a3e', { seg: 14, metalness: 0.5 });
    b.cyl(0.25, 0.25, 0.01, 0, 0.4, 0, o.fill ?? '#5fa5b5', { seg: 14, roughness: 0.1 });
    if (o.items) { const r = rng(o.seed); for (let i = 0; i < 6; i++) b.sphere(0.06, (r() - 0.5) * 0.25, 0.44, (r() - 0.5) * 0.25, o.items, { seg: 8 }); }
    b.cyl(0.26, 0.26, 0.015, 0, 0.42, 0, '#3a3a3e', { rz: Math.PI / 2, center: true, seg: 14, t0: 0, tl: Math.PI });
    if (o.mop) b.cbox(0.03, 1.1, 0.03, 0.25, 0.55, 0, '#a8703f', { rz: -0.25 });
    return { w: 0.7, d: 0.7, h: 0.6, up: 1.8 };
  },

  trough(b, o) {
    b.box(1.6, 0.5, 0.55, 0, 0.1, 0, '#8a5a36');
    b.box(1.5, 0.02, 0.45, 0, 0.55, 0, '#5f8fa5', { roughness: 0.1 });
    legs(b, 1.5, 0.5, 0.12, '#5a3a22', 0.08);
    b.cyl(0.04, 0.04, 1.0, -0.7, 0, -0.35, '#3a3a3e', { seg: 8, metalness: 0.5 });
    b.cbox(0.35, 0.05, 0.05, -0.55, 0.95, -0.35, '#3a3a3e', { metalness: 0.5 });
    b.cbox(0.05, 0.4, 0.05, -0.72, 0.85, -0.2, '#3a3a3e', { rz: 0.6 });
    return { w: 1.6, d: 0.7, h: 1.05, wall: true, up: 1.05 };
  },

  vanity(b, o) {
    const c = o.c ?? '#f2e8ea', gilt = GOLD;
    b.box(1.1, 0.06, 0.5, 0, 0.72, 0, c);
    roundLegs(b, 1.0, 0.45, 0.72, gilt, 0.03, BRASS);
    b.box(1.1, 0.12, 0.5, 0, 0.6, 0, c);
    b.cyl(0.38, 0.38, 0.04, 0, 1.2, -0.2, gilt, { rx: Math.PI / 2, center: true, seg: 20, ...BRASS });
    b.cyl(0.33, 0.33, 0.045, 0, 1.2, -0.2, '#c9dde3', { rx: Math.PI / 2, center: true, seg: 20, metalness: 0.9, roughness: 0.05 });
    for (let i = 0; i < 4; i++) lathe(b, [[0, 0], [0.04, 0], [0.04, 0.08], [0.015, 0.12], [0, 0.13]], ['#f2a6c0', '#c8a0e0', '#9ad0e0', GOLD][i], { seg: 8 }, -0.4 + i * 0.12, 0.78, 0.05);
    b.cyl(0.08, 0.07, 0.04, 0.35, 0.78, 0.08, '#f6f2ea', { seg: 12 });
    return { w: 1.1, d: 0.55, h: 1.6, wall: true, up: 1.2 };
  },

  dispenser(b, o) {
    const c = o.c ?? '#f2d46a';
    b.box(0.8, 0.75, 0.55, 0, 0, 0, '#f6f2ea');
    b.cyl(0.25, 0.25, 0.6, 0, 0.75, 0, c, { seg: 18, opacity: 0.7, roughness: 0.05 });
    for (let i = 0; i < 4; i++) b.cyl(0.04, 0.04, 0.02, (i - 1.5) * 0.08, 1.0 + (i % 2) * 0.15, 0.2, '#f6e090', { rx: Math.PI / 2, center: true, seg: 10 });
    b.cyl(0.26, 0.26, 0.05, 0, 1.35, 0, '#d8d8d4', { seg: 18 });
    b.box(0.08, 0.06, 0.08, 0, 0.8, 0.25, '#9aa6b4', { metalness: 0.6 });
    for (let i = 0; i < 4; i++) b.cyl(0.04, 0.035, 0.1, -0.3 + i * 0.2, 0.75, 0.15, ['#ff4d8d', '#5aa9e6', '#f2c94c', '#7cc66a'][i], { seg: 8 });
    return { w: 0.85, d: 0.6, h: 1.4, wall: true, up: 1.3 };
  },

  recycler(b, o) {
    b.box(0.9, 1.3, 0.5, 0, 0, 0, '#cfd6de', { round: 0.04, metalness: 0.3 });
    b.cyl(0.18, 0.18, 0.9, -0.15, 0.25, 0.3, '#5fc6e8', { seg: 14, opacity: 0.5, roughness: 0.05 });
    for (let i = 0; i < 5; i++) b.sphere(0.03, -0.15 + (i % 2) * 0.05, 0.35 + i * 0.15, 0.32, '#e8fbff', { seg: 6, shadow: false });
    b.box(0.25, 0.2, 0.02, 0.22, 0.85, 0.26, '#1b2230');
    b.box(0.21, 0.16, 0.01, 0.22, 0.87, 0.27, '#3fb6d9', glow('#3fb6d9', 1));
    b.box(0.3, 0.05, 0.25, 0.2, 0.5, 0.3, '#9aa6b4', { metalness: 0.6 });
    return { w: 0.95, d: 0.8, h: 1.35, wall: true, up: 1.3 };
  },

  vent(b, o) {
    const r = rng(o.seed);
    for (let i = 0; i < 4; i++) b.cyl(0.3 - i * 0.06, 0.38 - i * 0.06, 0.25, (r() - 0.5) * 0.1, i * 0.22, (r() - 0.5) * 0.1, '#5e5a66', { seg: 9 });
    b.cyl(0.1, 0.1, 0.02, 0, 0.88, 0, '#ff9a3a', glow('#ff7a1a', 1.6));
    for (let i = 0; i < 6; i++) b.sphere(0.05 + i * 0.015, (r() - 0.5) * 0.2, 1.0 + i * 0.12, (r() - 0.5) * 0.2, '#e8fbff', { opacity: 0.45, seg: 8, shadow: false });
    lamp(b, '#ff9a3a', 1.0, 0, 1.0, 0, 2.5);
    return { w: 0.8, d: 0.8, h: 1.6, up: 1.4 };
  },
};

