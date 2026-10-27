// Themed pictures and screens, fires and stoves, counters and stalls, chests,
// lamps, trees, fountains and plants. See common.js for the conventions.
import * as THREE from 'three';
import { foliage, patternMaterial, rng } from '../geo.js';
import { BRASS, GOLD, decoProp, glow, heartOutline, lamp, lathe, pick, pottedPlant, roundLegs, shade, slab } from './common.js';

// Flame: two glowing drops and a light.
function flame(b, x, y, z, s = 1, c = '#ff9a3a', light = 1.6) {
  b.sphere(0.12 * s, x, y + 0.1 * s, z, c, { ...glow('#ff7a1a', 1.8), sy: 1.4 });
  b.sphere(0.07 * s, x, y + 0.22 * s, z, '#ffe08a', { ...glow('#ffcf5a', 2), sy: 1.5 });
  if (light) lamp(b, '#ff9a3c', light, x, y + 0.3 * s, z, 3.5);
}

// A picture: random painted blocks inside a frame (portraits, frescoes, posters).
function picture(b, w, h, x, y, z, cols, r, frame = null) {
  if (frame) b.box(w + 0.1, h + 0.1, 0.04, x, y - 0.05, z - 0.01, frame, frame === GOLD ? BRASS : {});
  b.box(w, h, 0.02, x, y, z + 0.01, cols[0]);
  for (let i = 0; i < 5; i++) b.box(w * (0.2 + r() * 0.3), h * (0.15 + r() * 0.3), 0.01, x + (r() - 0.5) * w * 0.6, y + r() * h * 0.6, z + 0.025, pick(r, cols.slice(1)));
}

export const SCENERY = {
  // ---------------------------------------------------------------- pictures, screens, mirrors
  screen(b, o) {
    // folding screen: four panels in a zigzag
    const c = o.c ?? '#f2ead8', frame = o.frame ?? '#1d1716', r = rng(o.seed);
    for (let i = 0; i < 4; i++) {
      const x = -0.6 + i * 0.4, ry = i % 2 ? 0.35 : -0.35;
      b.cbox(0.4, 1.5, 0.03, x, 0.8, 0, frame, { ry });
      b.cbox(0.34, 1.35, 0.035, x, 0.82, 0, c, { ry });
      if (o.art === 'crane') b.cbox(0.2, 0.1, 0.04, x, 1.1 - (i % 2) * 0.3, 0, '#f6f2ea', { ry, rz: 0.4 });
      else b.cbox(0.25, 0.3, 0.04, x + (r() - 0.5) * 0.05, 0.5 + r() * 0.6, 0, pick(r, o.cols ?? ['#c0283a', '#2f5a3a', '#e0a3b0']), { ry, round: 0.05 });
    }
    return { w: 1.7, d: 0.5, h: 1.6, wall: true, up: 1.1 };
  },

  fresco(b, o) {
    const r = rng(o.seed), cols = o.cols ?? ['#e8d4a0', '#b8862b', '#2f5e8c', '#a33b2b', '#3f7a4a', '#1d1b1c'];
    b.box(1.5, 1.4, 0.15, 0, 0, -0.1, o.wall ?? '#d9c48a');
    b.box(1.35, 1.1, 0.02, 0, 0.18, -0.02, cols[0]);
    // figures in profile, a band of signs
    for (let i = 0; i < 3; i++) {
      const x = -0.4 + i * 0.4;
      b.box(0.12, 0.45, 0.02, x, 0.45, 0.0, pick(r, cols.slice(1)));
      b.sphere(0.07, x, 0.98, 0.0, cols[cols.length - 1], { seg: 8 });
    }
    for (let i = 0; i < 8; i++) b.box(0.08, 0.08, 0.02, -0.55 + i * 0.16, 1.12, 0.0, pick(r, cols.slice(1)));
    if (o.hands) for (let i = 0; i < 5; i++) b.cbox(0.12, 0.14, 0.02, (r() - 0.5) * 1.1, 0.3 + r() * 0.8, 0.0, pick(r, ['#a33b2b', '#efe6d0', '#1d1b1c']), { rz: r() });
    return { w: 1.5, d: 0.3, h: 1.4, wall: true, up: 1.1 };
  },

  portrait(b, o) {
    // a framed picture on a stand: portrait, poster, wanted sign
    const w = o.w ?? 0.9, h = o.h ?? 1.1, cols = o.cols ?? ['#3a2a30', '#d9b49a', '#7a1f2a', '#2a1d18'];
    for (const s of [-1, 1]) b.cbox(0.05, 1.7, 0.05, s * 0.3, 0.85, 0.05, '#5a3420', { rz: s * 0.08, rx: -0.12 });
    b.cbox(0.05, 1.6, 0.05, 0, 0.8, -0.3, '#5a3420', { rx: 0.3 });
    const y = 0.55;
    if (o.frame !== false) b.cbox(w + 0.14, h + 0.14, 0.05, 0, y + h / 2, 0, o.frame ?? GOLD, { rx: -0.12, ...((o.frame ?? GOLD) === GOLD ? BRASS : {}) });
    b.cbox(w, h, 0.06, 0, y + h / 2, 0.01, cols[0], { rx: -0.12 });
    if (o.kind === 'poster') {
      b.cbox(w * 0.8, h * 0.18, 0.07, 0, y + h * 0.82, 0.02, cols[2], { rx: -0.12 });
      b.cbox(w * 0.5, h * 0.45, 0.07, 0, y + h * 0.45, 0.02, cols[1], { rx: -0.12, round: 0.05 });
      b.cbox(w * 0.7, h * 0.1, 0.07, 0, y + h * 0.12, 0.02, cols[3], { rx: -0.12 });
    } else {
      // a head and shoulders
      b.cbox(w * 0.6, h * 0.35, 0.07, 0, y + h * 0.2, 0.02, cols[2], { rx: -0.12, round: 0.08 });
      b.sphere(w * 0.17, 0, y + h * 0.58, 0.07, cols[1], { seg: 10, sy: 1.15 });
      b.sphere(w * 0.18, 0, y + h * 0.66, 0.05, cols[3], { seg: 10, sy: 0.7 });
      if (o.eyes) for (const s of [-1, 1]) b.sphere(0.025, s * 0.05, y + h * 0.6, 0.12, o.eyes, glow(o.eyes, 2));
    }
    return { w: w + 0.2, d: 0.6, h: y + h + 0.15, wall: true, up: 1.1 };
  },

  mirror(b, o) {
    const frame = o.c ?? GOLD, metal = frame === GOLD ? BRASS : {};
    b.box(0.7, 0.08, 0.35, 0, 0, 0, frame, metal);
    for (const s of [-1, 1]) b.box(0.06, 1.0, 0.06, s * 0.36, 0.08, 0, frame, metal);
    const g = new THREE.CircleGeometry(0.42, 28);
    g.scale(0.85, 1.25, 1);
    g.translate(0, 1.2, 0.025);
    b.geo(g, '#c9dde3', { tess: false, metalness: 0.9, roughness: 0.05, ...(o.glow ? glow(o.glow, 0.6) : {}) });
    const ring = new THREE.TorusGeometry(0.42, 0.04, 8, 28);
    ring.scale(0.85, 1.25, 1);
    ring.translate(0, 1.2, 0.02);
    b.geo(ring, frame, { tess: false, ...metal });
    if (o.crest === 'heart') slab(b, heartOutline(0.3).map(([x, z]) => [x, z]), 0.04, '#e5384f', 1.75);
    else b.sphere(0.08, 0, 1.78, 0.02, frame, metal);
    if (o.glow) lamp(b, o.glow, 0.8, 0, 1.2, 0.3, 2.5);
    return { w: 0.9, d: 0.4, h: 1.9, wall: true, up: 1.15 };
  },

  tapestry(b, o) {
    const c = o.c ?? '#7a1f2a';
    b.cyl(0.03, 0.03, 1.5, 0, 1.75, -0.1, '#5a3420', { rz: Math.PI / 2, center: true, seg: 8 });
    for (const s of [-1, 1]) b.cyl(0.03, 0.03, 1.75, s * 0.7, 0, -0.15, '#5a3420', { seg: 8 });
    b.box(1.3, 1.45, 0.03, 0, 0.28, -0.1, c);
    b.box(1.1, 1.2, 0.035, 0, 0.4, -0.1, shade(c, 0.12));
    b.box(0.5, 0.6, 0.04, 0, 0.7, -0.1, '#d9b45a');
    b.box(0.08, 0.6, 0.045, 0, 0.7, -0.1, c);
    b.box(0.5, 0.08, 0.045, 0, 1.1, -0.1, c);
    for (let i = 0; i < 6; i++) b.box(0.06, 0.12, 0.03, -0.55 + i * 0.22, 0.17, -0.1, '#d9b45a');
    return { w: 1.5, d: 0.3, h: 1.8, wall: true, up: 1.1 };
  },

  porthole(b, o) {
    b.box(1.3, 1.5, 0.2, 0, 0, -0.1, '#cfd6de', { metalness: 0.4 });
    b.cyl(0.5, 0.5, 0.08, 0, 0.85, 0.02, '#9aa6b4', { rx: Math.PI / 2, center: true, seg: 28, metalness: 0.7 });
    b.cyl(0.42, 0.42, 0.09, 0, 0.85, 0.02, '#0b1530', { rx: Math.PI / 2, center: true, seg: 28 });
    const r = rng(o.seed);
    for (let i = 0; i < 14; i++) { const a = r() * 6.28, d = r() * 0.38; b.sphere(0.012, Math.cos(a) * d, 0.85 + Math.sin(a) * d, 0.08, '#ffffff', glow('#ffffff', 2)); }
    b.sphere(0.12, 0.15, 0.95, 0.07, '#ff9a5a', { seg: 12, sy: 0.3 });
    for (let i = 0; i < 8; i++) b.sphere(0.03, Math.cos(i * 0.785) * 0.47, 0.85 + Math.sin(i * 0.785) * 0.47, 0.07, '#5a6474', { seg: 6, metalness: 0.6 });
    return { w: 1.3, d: 0.3, h: 1.5, wall: true, up: 1.1 };
  },

  frostWindow(b, o) {
    b.box(1.3, 1.5, 0.12, 0, 0, -0.1, '#5a3420');
    b.box(1.0, 0.9, 0.02, 0, 0.45, -0.03, '#dcecf6', { opacity: 0.8, roughness: 0.15 });
    b.box(0.05, 0.9, 0.04, 0, 0.45, -0.02, '#5a3420');
    b.box(1.0, 0.05, 0.04, 0, 0.9, -0.02, '#5a3420');
    for (let i = 0; i < 12; i++) b.cbox(0.12, 0.01, 0.01, -0.4 + (i % 4) * 0.27, 0.5 + Math.floor(i / 4) * 0.25, -0.01, '#ffffff', { rz: i, shadow: false });
    b.box(1.1, 0.08, 0.25, 0, 0.42, 0.05, '#5a3420');
    for (const s of [-1, 1]) b.box(0.25, 1.1, 0.06, s * 0.55, 0.35, 0.0, '#7a1f2a');
    return { w: 1.3, d: 0.35, h: 1.5, wall: true, up: 1.1 };
  },

  stagHead(b, o) {
    b.box(0.5, 0.7, 0.08, 0, 0.8, -0.15, '#6b4a34', { round: 0.03 });
    b.sphere(0.18, 0, 1.1, 0.0, '#8a5a36', { seg: 12, sy: 1.1 });
    b.cbox(0.14, 0.12, 0.3, 0, 1.0, 0.18, '#8a5a36', { round: 0.05 });
    b.sphere(0.04, 0, 1.0, 0.33, '#1d1b1c', { seg: 6 });
    for (const s of [-1, 1]) {
      b.cbox(0.04, 0.5, 0.04, s * 0.2, 1.42, 0, '#e8dcc0', { rz: -s * 0.5 });
      for (let i = 0; i < 3; i++) b.cbox(0.03, 0.2, 0.03, s * (0.25 + i * 0.07), 1.45 + i * 0.1, 0, '#e8dcc0', { rz: s * 0.4 });
      b.cbox(0.06, 0.14, 0.03, s * 0.17, 1.22, 0.02, '#8a5a36', { rz: s * 0.9 });
    }
    // a little dresser under it, so it stands on the floor
    b.box(0.8, 0.6, 0.4, 0, 0, 0, '#7a5434');
    b.box(0.82, 0.03, 0.42, 0, 0.6, 0, '#5a3a22');
    return { w: 0.9, d: 0.45, h: 1.8, wall: true, up: 1.1 };
  },

  board(b, o) {
    const r = rng(o.seed);
    for (const s of [-1, 1]) b.box(0.08, 1.6, 0.08, s * 0.65, 0, 0, '#3a3a3e');
    b.box(1.5, 0.75, 0.1, 0, 0.85, 0, '#1b1b1e');
    for (let i = 0; i < 5; i++) {
      b.box(0.5, 0.08, 0.01, -0.4, 0.95 + i * 0.12, 0.055, '#f2c94c', glow('#f2c94c', 0.8));
      b.box(0.25, 0.08, 0.01, 0.15, 0.95 + i * 0.12, 0.055, '#f6f2ea', glow('#ffffff', 0.6));
      b.box(0.2, 0.08, 0.01, 0.5, 0.95 + i * 0.12, 0.055, pick(r, ['#7cff8a', '#ff4a4a']), glow('#ffffff', 0.4));
    }
    return { w: 1.5, d: 0.2, h: 1.65, wall: true, up: 1.1 };
  },

  cuckoo(b, o) {
    b.box(0.6, 0.9, 0.25, 0, 0, -0.1, '#7a5434');
    // the chalet-shaped clock
    b.box(0.55, 0.55, 0.25, 0, 0.95, -0.05, '#8a5a36');
    for (const s of [-1, 1]) b.cbox(0.45, 0.04, 0.32, s * 0.2, 1.62, -0.05, '#5a3a22', { rz: -s * 0.6 });
    b.cyl(0.17, 0.17, 0.02, 0, 1.2, 0.08, '#f6f2ea', { rx: Math.PI / 2, center: true, seg: 16 });
    b.cbox(0.012, 0.13, 0.01, 0, 1.24, 0.1, '#1d1b1c', { rz: 0.4 });
    b.box(0.12, 0.1, 0.02, 0, 1.45, 0.08, '#2a1d18');
    b.sphere(0.04, 0, 1.47, 0.14, '#f2c94c', { seg: 8 });
    for (let i = 0; i < 4; i++) b.cbox(0.06, 0.08, 0.01, -0.18 + i * 0.12, 1.55, 0.09, '#5a9440', { rz: 0.6 });
    for (const s of [-1, 1]) { b.cyl(0.01, 0.01, 0.4, s * 0.08, 0.5, 0.0, '#c9a24a', { seg: 4 }); b.cyl(0.04, 0.04, 0.12, s * 0.08, 0.38, 0.0, '#5a3a22', { seg: 6 }); }
    return { w: 0.65, d: 0.35, h: 1.75, wall: true, up: 1.1 };
  },

  snowGlobe(b, o) {
    b.cyl(0.4, 0.48, 0.3, 0, 0, 0, '#b3202c', { seg: 18 });
    b.cyl(0.42, 0.42, 0.05, 0, 0.28, 0, GOLD, { seg: 18, ...BRASS });
    b.sphere(0.6, 0, 0.82, 0, '#e8f4ff', { seg: 22, opacity: 0.3, roughness: 0.02 });
    b.cyl(0.42, 0.42, 0.04, 0, 0.32, 0, '#f6f9fc', { seg: 18 });
    decoProp(b, 'pine', 0.5, o.seed, -0.12, 0.35, 0);
    b.box(0.2, 0.18, 0.18, 0.18, 0.35, 0.05, '#c46a3a');
    const r = rng(o.seed);
    for (let i = 0; i < 18; i++) b.sphere(0.018, (r() - 0.5) * 0.7, 0.45 + r() * 0.7, (r() - 0.5) * 0.7, '#ffffff', { seg: 4, shadow: false });
    return { w: 1.2, d: 1.2, h: 1.45, up: 1.2 };
  },

  // ---------------------------------------------------------------- fires and stoves
  irori(b, o) {
    b.box(1.2, 0.08, 1.2, 0, 0, 0, '#3a2a22');
    b.box(0.9, 0.1, 0.9, 0, 0.0, 0, '#cfc6b0');
    b.box(0.8, 0.02, 0.8, 0, 0.09, 0, '#6e665a');
    for (let i = 0; i < 4; i++) b.cbox(0.4, 0.06, 0.06, 0, 0.13, 0, '#5a3420', { ry: i * 0.8 });
    flame(b, 0, 0.12, 0, 1, '#ff9a3a', 1.6);
    // the hanging hook and an iron kettle
    b.cyl(0.02, 0.02, 1.4, 0, 0.5, 0, '#1d1716', { seg: 6 });
    b.cbox(0.4, 0.06, 0.1, 0, 1.3, 0, '#5a3420');
    lathe(b, [[0, 0], [0.15, 0.03], [0.17, 0.12], [0.1, 0.2], [0, 0.21]], '#2a2a2e', { seg: 14, metalness: 0.3 }, 0, 0.42, 0);
    return { w: 1.2, d: 1.2, h: 1.5, up: 1.3 };
  },

  brazier(b, o) {
    const metal = o.c ?? '#b8862b';
    for (let i = 0; i < 3; i++) b.cbox(0.05, 0.85, 0.05, Math.cos(i * 2.1) * 0.22, 0.42, Math.sin(i * 2.1) * 0.22, metal, { rz: Math.cos(i * 2.1) * 0.25, rx: -Math.sin(i * 2.1) * 0.25, ...BRASS });
    lathe(b, [[0.1, 0], [0.35, 0.1], [0.42, 0.22], [0.38, 0.24], [0, 0.18]], metal, { seg: 16, ...BRASS }, 0, 0.75, 0);
    for (let i = 0; i < 5; i++) b.sphere(0.07, Math.cos(i * 1.25) * 0.15, 0.95, Math.sin(i * 1.25) * 0.15, '#3a1a10', { seg: 6, ...glow('#ff5a1a', 0.6) });
    flame(b, 0, 0.92, 0, 1.4, '#ff9a3a', 2);
    return { w: 0.95, d: 0.95, h: 1.4, up: 1.3 };
  },

  cannon(b, o) {
    const c = o.c ?? '#2a2a2e', cart = o.cart ?? '#6b4a34';
    b.box(0.7, 0.3, 1.2, 0, 0.15, 0, cart);
    for (const sx of [-1, 1]) for (const sz of [-1, 1]) b.cyl(0.2, 0.2, 0.08, sx * 0.4, 0.2, sz * 0.4, shade(cart, -0.1), { rz: Math.PI / 2, center: true, seg: 14 });
    // the barrel, turned on its side, pointing forwards and a little up
    const barrel = lathe(b, [[0.2, 0], [0.22, 0.2], [0.17, 1.2], [0.2, 1.25], [0.12, 1.3], [0, 1.3]], c, { seg: 16, metalness: 0.5, roughness: 0.4 });
    barrel.rotateX(Math.PI / 2 - 0.25);
    barrel.translate(0, 0.55, -0.45);
    if (o.stripes) for (let i = 0; i < 3; i++) b.cyl(0.215, 0.215, 0.08, 0, 0.6 + i * 0.12, -0.2 + i * 0.3, '#f2c94c', { rx: Math.PI / 2 - 0.25, center: true, seg: 16 });
    for (let i = 0; i < 4; i++) b.sphere(0.1, 0.55 + (i % 2) * 0.1, 0.1 + Math.floor(i / 2) * 0.12, 0.5, '#1d1b1c', { seg: 10 });
    return { w: 1.0, d: 1.5, h: 1.0, wall: true, up: 1.2 };
  },

  potStove(b, o) {
    const c = o.c ?? '#2a2a2e';
    lathe(b, [[0.25, 0], [0.32, 0.15], [0.36, 0.55], [0.3, 0.85], [0.2, 0.9], [0, 0.9]], c, { seg: 18, metalness: 0.4 }, 0, 0.1, 0);
    for (let i = 0; i < 4; i++) b.cbox(0.05, 0.14, 0.05, Math.cos(i * 1.57 + 0.78) * 0.25, 0.05, Math.sin(i * 1.57 + 0.78) * 0.25, c);
    b.box(0.2, 0.18, 0.02, 0, 0.35, 0.34, '#ff7a1a', glow('#ff5a1a', 1.4));
    b.cyl(0.08, 0.08, 1.2, 0, 1.0, -0.05, c, { seg: 12, metalness: 0.4 });
    lathe(b, [[0, 0], [0.1, 0.02], [0.12, 0.16], [0.06, 0.24], [0, 0.25]], '#c27a4a', { seg: 12, metalness: 0.5 }, 0.15, 1.0, 0.1);
    lamp(b, '#ff8a3a', 1.4, 0, 0.45, 0.5, 3);
    if (o.coal) { b.cyl(0.15, 0.13, 0.25, 0.5, 0, 0.2, '#3a3a3e', { seg: 10 }); for (let i = 0; i < 5; i++) b.sphere(0.05, 0.5 + (i % 2) * 0.05, 0.25, 0.18 + i * 0.02, '#1d1b1c', { seg: 5 }); }
    return { w: 1.0, d: 0.8, h: 2.2, wall: true, up: 1.1 };
  },

  volcano(b, o) {
    lathe(b, [[0.7, 0], [0.6, 0.3], [0.35, 0.8], [0.2, 0.95], [0.12, 0.85], [0, 0.82]], '#4a3a40', { seg: 12, flat: true });
    b.cyl(0.13, 0.13, 0.02, 0, 0.87, 0, '#ff5a1a', glow('#ff5a1a', 2));
    for (let i = 0; i < 3; i++) b.cbox(0.06, 0.4, 0.04, Math.cos(i * 2) * 0.35, 0.55, Math.sin(i * 2) * 0.35, '#ff7a1a', { ...glow('#ff5a1a', 1.4), rz: Math.cos(i * 2) * 0.6, rx: -Math.sin(i * 2) * 0.6 });
    for (let i = 0; i < 5; i++) b.sphere(0.08 + i * 0.02, (i % 2 - 0.5) * 0.15, 1.05 + i * 0.13, 0, '#e8e8f0', { opacity: 0.4, seg: 8, shadow: false });
    lamp(b, '#ff6a2a', 2, 0, 1.1, 0, 3.5);
    return { w: 1.4, d: 1.4, h: 1.2, up: 1.3 };
  },

  hearth(b, o) {
    const stone = o.c ?? '#8e8a82';
    b.box(1.6, 1.4, 0.5, 0, 0, -0.1, stone, { material: patternMaterial('stone', stone, shade(stone, -0.2), 2, 2) });
    b.box(1.0, 0.9, 0.3, 0, 0, 0.05, '#1a1412');
    b.box(1.8, 0.1, 0.6, 0, 1.4, -0.1, '#5a3420');
    for (let i = 0; i < 3; i++) b.cbox(0.6, 0.1, 0.1, 0, 0.06, 0.1, '#5a3420', { ry: i * 0.6 });
    flame(b, 0, 0.1, 0.1, 1.5, '#ff9a3a', 2.4);
    // a pot hanging over the fire
    b.cbox(0.03, 0.6, 0.03, 0, 0.75, 0.1, '#2a2a2e');
    lathe(b, [[0, 0], [0.15, 0.03], [0.18, 0.18], [0.15, 0.24], [0, 0.22]], '#2a2a2e', { seg: 14, metalness: 0.3 }, 0, 0.4, 0.1);
    for (let i = 0; i < 3; i++) b.sphere(0.05, -0.45 + i * 0.1, 1.55, -0.1, '#e8dcc0', { seg: 6 });
    return { w: 1.8, d: 0.7, h: 1.6, wall: true, up: 1.1 };
  },

  firePit(b, o) {
    const r = rng(o.seed);
    for (let i = 0; i < 10; i++) { const a = (i / 10) * Math.PI * 2; b.sphere(0.13, Math.cos(a) * 0.45, 0.07, Math.sin(a) * 0.45, shade('#8e8a82', (r() - 0.5) * 0.15), { sy: 0.7, seg: 7, flat: true }); }
    for (let i = 0; i < 4; i++) b.cbox(0.55, 0.08, 0.08, 0, 0.1 + i * 0.03, 0, '#5a3420', { ry: i * 0.8, rz: 0.15 });
    flame(b, 0, 0.12, 0, 1.6, '#ff9a3a', 2.2);
    if (o.spit) {
      for (const s of [-1, 1]) b.cbox(0.04, 0.8, 0.04, s * 0.55, 0.4, 0, '#5a3420');
      b.cyl(0.02, 0.02, 1.2, 0, 0.75, 0, '#3a2a1e', { rz: Math.PI / 2, center: true, seg: 6 });
      b.sphere(0.15, 0, 0.75, 0, '#a8562a', { sy: 0.7, seg: 10 });
    }
    if (o.logs) for (let i = 0; i < 2; i++) b.cyl(0.12, 0.12, 0.8, (i ? 1 : -1) * 0.75, 0.12, 0, '#6b4a34', { rx: Math.PI / 2, center: true, seg: 10 });
    return { w: o.logs ? 1.8 : 1.2, d: 1.2, h: 1.0, up: 1.3 };
  },

  reactor(b, o) {
    const c = o.c ?? '#3fe0ff';
    b.cyl(0.6, 0.65, 0.3, 0, 0, 0, '#5a6474', { seg: 8, metalness: 0.5 });
    b.cyl(0.32, 0.32, 1.1, 0, 0.3, 0, c, { seg: 18, opacity: 0.55, ...glow(c, 1.6) });
    for (let i = 0; i < 4; i++) b.cyl(0.36, 0.36, 0.06, 0, 0.4 + i * 0.25, 0, '#9aa6b4', { seg: 18, metalness: 0.7 });
    b.cyl(0.45, 0.4, 0.2, 0, 1.4, 0, '#5a6474', { seg: 8, metalness: 0.5 });
    for (let i = 0; i < 4; i++) b.cbox(0.08, 1.2, 0.08, Math.cos(i * 1.57) * 0.5, 0.75, Math.sin(i * 1.57) * 0.5, '#ffcf3a', { metalness: 0.4 });
    lamp(b, c, 2, 0, 0.9, 0, 4);
    return { w: 1.3, d: 1.3, h: 1.6, up: 1.2 };
  },

  breadOven(b, o) {
    const c = o.c ?? '#c27a4a';
    b.box(1.3, 0.6, 1.0, 0, 0, 0, '#a09682', { material: patternMaterial('stone', '#a09682', '#7a7266', 2, 1) });
    lathe(b, [[0.6, 0], [0.55, 0.3], [0.35, 0.55], [0, 0.65]], c, { seg: 18 }, 0, 0.6, -0.05);
    b.cyl(0.25, 0.25, 0.1, 0, 0.75, 0.45, '#1a1412', { rx: Math.PI / 2, center: true, seg: 14, t0: -Math.PI / 2, tl: Math.PI });
    b.sphere(0.1, 0, 0.7, 0.4, '#ff8a3a', glow('#ff5a1a', 1.6));
    b.cyl(0.08, 0.08, 0.5, 0.3, 1.0, -0.25, c, { seg: 10 });
    for (let i = 0; i < 3; i++) b.sphere(0.1, -0.4 + i * 0.18, 0.66, 0.38, '#d9a066', { sy: 0.55, seg: 10 });
    b.cbox(0.05, 0.05, 1.0, 0.55, 0.65, 0.5, '#a8703f', { rx: -0.6 });
    lamp(b, '#ff8a3a', 1.2, 0, 0.8, 0.7, 3);
    return { w: 1.3, d: 1.1, h: 1.5, wall: true, up: 1.1 };
  },

  photoBooth(b, o) {
    b.box(1.0, 1.9, 1.0, 0, 0, -0.05, '#ff4d8d', { round: 0.04 });
    b.box(0.7, 1.4, 0.02, -0.08, 0.3, 0.46, '#2a2240');
    b.box(0.6, 1.4, 0.04, 0.12, 0.3, 0.48, '#b06ad8', { material: patternMaterial('stripes', '#b06ad8', '#f2c94c', 2, 1) });
    for (let i = 0; i < 4; i++) b.box(0.18, 0.16, 0.02, 0.38, 0.2 + i * 0.2, 0.47, '#f6f2ea');
    b.box(0.8, 0.25, 0.04, 0, 1.6, 0.47, '#f2c94c', glow('#f2c94c', 0.6));
    for (let i = 0; i < 8; i++) b.sphere(0.035, -0.4 + i * 0.115, 1.9, 0.47, '#fff2c8', glow('#ffd36a', 1.8));
    return { w: 1.0, d: 1.05, h: 1.95, wall: true, up: 1.0 };
  },

  // ---------------------------------------------------------------- counters and stalls
  kamado(b, o) {
    b.box(1.5, 0.75, 0.7, 0, 0, 0, '#d8cbb0', { material: patternMaterial('plain', '#d8cbb0', '#b8a888', 1, 1) });
    b.box(1.55, 0.06, 0.75, 0, 0.75, 0, '#5a3420');
    for (const s of [-1, 1]) {
      b.cyl(0.18, 0.18, 0.2, s * 0.4, 0.3, 0.33, '#1a1412', { rx: Math.PI / 2, center: true, seg: 14, t0: -Math.PI / 2, tl: Math.PI });
      b.sphere(0.07, s * 0.4, 0.28, 0.32, '#ff8a3a', glow('#ff5a1a', 1.5));
      lathe(b, [[0, 0], [0.2, 0.0], [0.22, 0.14], [0.18, 0.2], [0, 0.18]], '#2a2a2e', { seg: 14, metalness: 0.3 }, s * 0.4, 0.81, 0);
      b.cyl(0.21, 0.21, 0.04, s * 0.4, 1.01, 0, '#8a5a36', { seg: 14 });
    }
    lamp(b, '#ff8a3a', 1.0, 0, 0.4, 0.6, 3);
    return { w: 1.55, d: 0.75, h: 1.1, wall: true, up: 1.05 };
  },

  bar(b, o) {
    const wood = o.c ?? '#6b3a22', top = o.top ?? '#4a2a18', r = rng(o.seed);
    b.box(1.8, 1.0, 0.6, 0, 0, 0, wood);
    for (let i = 0; i < 4; i++) b.frame(0.38, 0.65, 0.025, -0.65 + i * 0.43, 0.15, 0.305, shade(wood, -0.12), 0.02);
    b.box(1.9, 0.06, 0.7, 0, 1.0, 0, top, o.zinc ? { metalness: 0.7, roughness: 0.3 } : {});
    b.cyl(0.025, 0.025, 1.85, 0, 0.12, 0.36, GOLD, { rz: Math.PI / 2, center: true, ...BRASS });
    for (let i = 0; i < 5; i++) {
      const x = -0.7 + i * 0.35, c = pick(r, ['#3f7a4a', '#7a2a2a', '#c9a24a', '#2f5d8a']);
      lathe(b, [[0, 0], [0.05, 0], [0.05, 0.18], [0.02, 0.25], [0.015, 0.32], [0, 0.32]], c, { seg: 10, opacity: 0.85 }, x, 1.06, -0.15);
    }
    for (let i = 0; i < 3; i++) b.cyl(0.04, 0.035, 0.12, -0.3 + i * 0.3, 1.06, 0.15, '#d8e8ee', { seg: 10, opacity: 0.6 });
    return { w: 1.9, d: 0.75, h: 1.4, wall: true, up: 1.05, spots: [[0.6, 1.06, 0.15]] };
  },

  steamers(b, o) {
    b.box(1.6, 0.85, 0.6, 0, 0, 0, '#7a1018');
    b.box(1.65, 0.05, 0.65, 0, 0.85, 0, '#1d1716', { roughness: 0.3 });
    dressingSteam(b, 0.9);
    for (let i = 0; i < 3; i++) b.cbox(0.25, 0.25, 0.02, -0.55 + i * 0.55, 0.45, 0.305, GOLD, { ...BRASS, ry: 0.78, rx: 0 });
    return { w: 1.65, d: 0.65, h: 1.3, wall: true, up: 1.05 };
  },

  oysterBank(b, o) {
    const r = rng(o.seed);
    b.cbox(1.6, 0.6, 0.7, 0, 0.3, 0, '#8ea29e', { round: 0.2 });
    for (let i = 0; i < 12; i++) {
      const x = (r() - 0.5) * 1.3, z = (r() - 0.5) * 0.5;
      lathe(b, [[0, 0], [0.11, 0.01], [0.12, 0.04], [0, 0.05]], pick(r, ['#c8bfb8', '#a8a098', '#e8e0d8']), { seg: 9 }, x, 0.6, z);
      if (i % 4 === 0) b.sphere(0.03, x, 0.66, z, '#fbf6ff', { roughness: 0.1, metalness: 0.3, seg: 8 });
    }
    return { w: 1.6, d: 0.75, h: 0.75, wall: true, up: 1.1 };
  },

  alembic(b, o) {
    b.box(1.6, 0.85, 0.6, 0, 0, 0, '#3a2a30');
    b.box(1.65, 0.05, 0.65, 0, 0.85, 0, '#2a1d20');
    lathe(b, [[0, 0], [0.18, 0.02], [0.22, 0.2], [0.12, 0.34], [0.05, 0.4], [0.05, 0.5], [0, 0.5]], '#c27a4a', { seg: 14, metalness: 0.6, roughness: 0.3 }, -0.4, 0.9, 0);
    b.cyl(0.02, 0.02, 0.8, 0.0, 1.35, 0, '#c27a4a', { rz: 1.2, center: true, metalness: 0.6 });
    lathe(b, [[0, 0], [0.12, 0.02], [0.13, 0.12], [0.04, 0.22], [0.03, 0.3], [0, 0.3]], '#7cff5a', { seg: 12, opacity: 0.7, ...glow('#7cff5a', 0.6) }, 0.4, 0.9, 0);
    b.cyl(0.1, 0.12, 0.08, -0.4, 0.88, 0, '#ff7a1a', glow('#ff5a1a', 1.4));
    for (let i = 0; i < 4; i++) lathe(b, [[0, 0], [0.04, 0], [0.04, 0.1], [0.015, 0.14], [0, 0.14]], ['#b56ad8', '#5aa9e6', '#e8492c', '#f2c94c'][i], { seg: 8, opacity: 0.8 }, 0.1 + i * 0.12, 0.9, 0.2);
    lamp(b, '#7cff5a', 0.9, 0.4, 1.2, 0.2, 2.5);
    return { w: 1.65, d: 0.65, h: 1.45, wall: true, up: 1.05 };
  },

  anvil(b, o) {
    b.cyl(0.3, 0.35, 0.45, 0, 0, 0, '#6b4a34', { seg: 12 });
    b.box(0.25, 0.2, 0.3, 0, 0.45, 0, '#3a3a3e', { metalness: 0.5 });
    b.box(0.7, 0.15, 0.3, 0.05, 0.65, 0, '#3a3a3e', { metalness: 0.5, roughness: 0.35 });
    b.cyl(0, 0.13, 0.35, 0.55, 0.72, 0, '#3a3a3e', { rz: Math.PI / 2, center: true, seg: 10, metalness: 0.5 });
    b.cbox(0.05, 0.4, 0.05, -0.15, 0.85, 0.1, '#6b4a34', { rz: 1.2 });
    b.box(0.2, 0.08, 0.14, -0.35, 0.8, 0.1, '#5a5a62', { metalness: 0.6 });
    // the forge behind
    b.box(0.8, 0.6, 0.6, -0.2, 0, -0.6, '#8e8a82', { material: patternMaterial('stone', '#8e8a82', '#5e5a52', 1, 1) });
    b.box(0.6, 0.05, 0.45, -0.2, 0.6, -0.6, '#3a1a10', glow('#ff5a1a', 0.9));
    lamp(b, '#ff7a3a', 1.2, -0.2, 0.9, -0.6, 3);
    return { w: 1.2, d: 1.3, h: 1.0, wall: true, up: 1.2 };
  },

  stonePile(b, o) {
    const r = rng(o.seed);
    for (let i = 0; i < 12; i++) b.cbox(0.2 + r() * 0.15, 0.08, 0.15 + r() * 0.1, (r() - 0.5) * 1.0, 0.05 + r() * 0.15, (r() - 0.5) * 0.5, pick(r, ['#5a5a62', '#3a3a42', '#7a7a82']), { ry: r() * 3, rz: (r() - 0.5) * 0.6, flat: true });
    b.sphere(0.35, 0.3, 0.2, -0.2, '#8e8a82', { sy: 0.6, seg: 8, flat: true });
    for (let i = 0; i < 3; i++) b.cbox(0.08, 0.3, 0.03, -0.4 + i * 0.12, 0.25, 0.25, '#3a3a42', { rz: 0.3, flat: true });
    return { w: 1.2, d: 0.8, h: 0.45, wall: true, up: 1.3 };
  },

  popcorn(b, o) {
    b.box(1.0, 0.9, 0.7, 0, 0, 0, '#c0283a', { material: patternMaterial('stripes', '#c0283a', '#f6f2ea', 2, 1) });
    b.box(0.9, 0.7, 0.6, 0, 0.9, 0, '#e8f4ff', { opacity: 0.4, roughness: 0.05 });
    const r = rng(o.seed);
    for (let i = 0; i < 40; i++) b.sphere(0.04, (r() - 0.5) * 0.8, 0.95 + r() * 0.3, (r() - 0.5) * 0.5, '#fff2c8', { seg: 5 });
    b.box(1.0, 0.1, 0.7, 0, 1.6, 0, '#c0283a');
    for (let i = 0; i < 4; i++) { const x = -0.3 + i * 0.2; b.cyl(0.07, 0.05, 0.18, x, 0.9, 0.45, '#f6f2ea', { seg: 8 }); }
    for (const s of [-1, 1]) b.cyl(0.2, 0.2, 0.05, s * 0.5, 0.2, 0, '#2a2523', { rz: Math.PI / 2, center: true, seg: 12 });
    return { w: 1.1, d: 0.8, h: 1.7, wall: true, up: 1.05 };
  },

  dispenserWall(b, o) {
    b.box(1.6, 1.5, 0.55, 0, 0, 0, '#cfd6de', { round: 0.04, metalness: 0.3 });
    for (let i = 0; i < 3; i++) {
      b.box(0.4, 0.4, 0.02, -0.5 + i * 0.5, 0.85, 0.28, '#1b2230');
      for (let k = 0; k < 4; k++) b.box(0.08, 0.08, 0.1, -0.62 + i * 0.5 + (k % 2) * 0.24, 0.9 + Math.floor(k / 2) * 0.15, 0.24, ['#f2c94c', '#7cc66a', '#e8492c', '#b06ad8'][k]);
      b.box(0.3, 0.06, 0.25, -0.5 + i * 0.5, 0.45, 0.35, '#9aa6b4', { metalness: 0.5 });
      b.box(0.1, 0.06, 0.01, -0.5 + i * 0.5, 0.7, 0.285, '#3fb6d9', glow('#3fb6d9', 1.4));
    }
    return { w: 1.6, d: 0.7, h: 1.5, wall: true, up: 1.05 };
  },

  stall(b, o) {
    const c = o.c ?? '#e8492c';
    b.box(1.6, 0.85, 0.7, 0, 0, 0, '#a8703f');
    for (const s of [-1, 1]) b.cyl(0.03, 0.03, 1.9, s * 0.78, 0, 0.3, '#5a3420', { seg: 6 });
    b.cbox(1.8, 0.04, 0.95, 0, 1.95, 0.2, c, { rx: 0.25, material: patternMaterial('stripes', c, '#f6f2ea', 3, 1) });
    for (let i = 0; i < 3; i++) {
      b.cyl(0.22, 0.2, 0.08, -0.5 + i * 0.5, 0.85, 0, '#3a3a3e', { seg: 14, metalness: 0.4 });
      for (let k = 0; k < 4; k++) b.sphere(0.05, -0.5 + i * 0.5 + Math.cos(k * 1.6) * 0.1, 0.96, Math.sin(k * 1.6) * 0.1, ['#e0a94a', '#a8562a', '#7cae4f'][i], { sy: 0.6, seg: 6 });
    }
    for (let i = 0; i < 5; i++) b.sphere(0.06, -0.6 + i * 0.3, 1.75, 0.55, ['#e8492c', '#f2c94c', '#5aa9e6'][i % 3], glow(['#e8492c', '#f2c94c', '#5aa9e6'][i % 3], 1));
    lamp(b, '#ffcf8a', 1, 0, 1.6, 0.3, 3);
    return { w: 1.8, d: 1.0, h: 2.1, wall: true, up: 1.0 };
  },

  chocFountain(b, o) {
    b.cyl(0.45, 0.5, 0.65, 0, 0, 0, '#f6f2ea', { seg: 16 });
    for (let i = 0; i < 3; i++) {
      const R = 0.38 - i * 0.1, y = 0.7 + i * 0.28;
      b.cyl(R, R * 0.7, 0.08, 0, y, 0, '#d9d4cc', { seg: 18, metalness: 0.6, roughness: 0.25 });
      b.cyl(R + 0.01, R + 0.01, 0.2, 0, y - 0.2, 0, '#5a2e1a', { seg: 18, opacity: 0.85 });
    }
    b.cyl(0.04, 0.04, 0.95, 0, 0.7, 0, '#d9d4cc', { seg: 8, metalness: 0.6 });
    b.sphere(0.08, 0, 1.6, 0, '#5a2e1a', { seg: 10 });
    for (let i = 0; i < 8; i++) { const a = i * 0.785; b.sphere(0.05, Math.cos(a) * 0.45, 0.7, Math.sin(a) * 0.45, ['#e8492c', '#f2d46a', '#f6f2ea'][i % 3], { seg: 6 }); }
    return { w: 1.0, d: 1.0, h: 1.7, up: 1.3 };
  },

  // ---------------------------------------------------------------- chests, trunks, cupboards
  trunk(b, o) {
    const w = o.w ?? 1.1, c = o.c ?? '#7a4a2a', band = o.band ?? '#3a3a3e', r = rng(o.seed);
    b.box(w, 0.5, 0.6, 0, 0, 0, c, { round: 0.02 });
    if (o.lid === 'round') b.cyl(0.3, 0.3, w, 0, 0.5, 0, shade(c, 0.05), { rz: Math.PI / 2, center: true, seg: 16, t0: 0, tl: Math.PI });
    else b.box(w + 0.02, 0.12, 0.62, 0, 0.5, 0, shade(c, 0.05), { round: 0.02 });
    for (const s of [-0.35, 0.35]) b.box(0.06, 0.66, 0.64, s * w, 0, 0, band, band === GOLD ? BRASS : { metalness: 0.4 });
    b.box(0.12, 0.14, 0.04, 0, 0.4, 0.31, GOLD, BRASS);
    if (o.open) {
      // treasure spilling out
      b.cbox(w, 0.06, 0.6, 0, 0.85, -0.3, shade(c, 0.05), { rx: -1.2 });
      for (let i = 0; i < 25; i++) b.cyl(0.05, 0.05, 0.015, (r() - 0.5) * w * 0.8, 0.5 + r() * 0.1, (r() - 0.5) * 0.4, GOLD, { seg: 10, ...BRASS });
      for (let i = 0; i < 4; i++) b.sphere(0.05, (r() - 0.5) * 0.6, 0.6, (r() - 0.5) * 0.3, pick(r, ['#c0283a', '#2f6fb3', '#3f9a5a', '#fbf6ff']), { roughness: 0.1, metalness: 0.3, seg: 8 });
      for (let i = 0; i < 8; i++) b.cyl(0.05, 0.05, 0.015, (r() - 0.5) * 1.2, 0, 0.45 + r() * 0.2, GOLD, { seg: 10, ...BRASS });
    }
    if (o.stickers) for (let i = 0; i < 4; i++) b.box(0.15, 0.12, 0.01, -w / 2 + 0.2 + i * 0.25, 0.15 + (i % 2) * 0.15, 0.305, pick(r, ['#e8492c', '#f2c94c', '#5aa9e6', '#f6f2ea']), { rz: (r() - 0.5) * 0.4 });
    if (o.top) for (let i = 0; i < 3; i++) b.sphere(0.07, -0.2 + i * 0.2, 0.68, 0, o.top, { sy: 1.2, seg: 8 });
    return { w: w + 0.05, d: 0.65, h: 0.7, wall: true, up: 1.2 };
  },

  sarcophagus(b, o) {
    const gold = '#d9b44a';
    const out = [[-0.3, -1.0], [0.3, -1.0], [0.38, -0.4], [0.3, 1.0], [-0.3, 1.0], [-0.38, -0.4]];
    slab(b, out, 0.5, gold, 0, { bevel: 0.03, metalness: 0.6, roughness: 0.35 });
    b.sphere(0.25, 0, 0.55, -0.65, gold, { sy: 0.5, seg: 12, metalness: 0.6, roughness: 0.35 });
    for (let i = 0; i < 6; i++) b.box(0.55 - Math.abs(i - 2.5) * 0.04, 0.02, 0.06, 0, 0.52, -0.3 + i * 0.18, i % 2 ? '#2f5e8c' : '#a33b2b');
    b.cbox(0.4, 0.04, 0.12, 0, 0.6, -0.5, '#2f5e8c');
    for (const s of [-1, 1]) b.sphere(0.03, s * 0.08, 0.66, -0.7, '#1d1b1c', { seg: 6 });
    return { w: 0.8, d: 2.0, h: 0.75, wall: true, up: 1.1 };
  },

  safe(b, o) {
    b.box(0.85, 1.1, 0.7, 0, 0.1, 0, '#2a3a2e', { round: 0.03, metalness: 0.3 });
    roundLegs(b, 0.75, 0.6, 0.1, GOLD, 0.04, BRASS);
    b.box(0.6, 0.8, 0.02, 0, 0.25, 0.35, '#1d2a22');
    b.frame(0.55, 0.75, 0.02, 0, 0.27, 0.36, GOLD, 0.02, BRASS);
    b.cyl(0.08, 0.08, 0.04, 0, 0.75, 0.37, '#cfd6de', { rx: Math.PI / 2, center: true, seg: 14, metalness: 0.8 });
    b.cbox(0.2, 0.025, 0.04, 0.15, 0.55, 0.38, GOLD, BRASS);
    b.box(0.8, 0.12, 0.5, 0, 1.2, 0, '#7a4a2a');
    return { w: 0.9, d: 0.75, h: 1.35, wall: true, up: 1.2 };
  },

  locker(b, o) {
    const c = o.c ?? '#9aa6b4', n = 3;
    for (let i = 0; i < n; i++) {
      b.box(0.42, 1.7, 0.5, -0.44 + i * 0.44, 0, 0, i % 2 ? shade(c, -0.05) : c, { metalness: 0.35 });
      for (let k = 0; k < 4; k++) b.box(0.25, 0.02, 0.01, -0.44 + i * 0.44, 1.3 + k * 0.06, 0.255, shade(c, -0.2));
      b.box(0.04, 0.12, 0.03, -0.3 + i * 0.44, 0.85, 0.26, '#5a6474', { metalness: 0.6 });
    }
    if (o.light) for (let i = 0; i < n; i++) b.box(0.06, 0.03, 0.01, -0.44 + i * 0.44, 1.05, 0.26, i % 2 ? '#7cff8a' : '#3fb6d9', glow(i % 2 ? '#7cff8a' : '#3fb6d9', 1.5));
    if (o.skis) for (let i = 0; i < 2; i++) b.cbox(0.07, 1.6, 0.03, 0.75 + i * 0.08, 0.85, 0.1, i ? '#c0392b' : '#2f5d8a', { rz: -0.1 });
    return { w: 1.4, d: 0.55, h: 1.7, wall: true, up: 1.1 };
  },

  armor(b, o) {
    b.box(0.6, 0.15, 0.6, 0, 0, 0, '#5a5a62');
    const steel = { metalness: 0.75, roughness: 0.3 };
    for (const s of [-1, 1]) {
      b.cyl(0.08, 0.1, 0.65, s * 0.12, 0.15, 0, '#9aa6b4', steel);
      b.sphere(0.12, s * 0.26, 1.22, 0, '#9aa6b4', { ...steel, sy: 0.8 });
      b.cyl(0.06, 0.07, 0.5, s * 0.3, 0.75, 0, '#9aa6b4', steel);
    }
    lathe(b, [[0.15, 0], [0.24, 0.1], [0.27, 0.35], [0.22, 0.5], [0.1, 0.55], [0, 0.55]], '#9aa6b4', { seg: 14, ...steel }, 0, 0.8, 0);
    b.sphere(0.17, 0, 1.55, 0, '#9aa6b4', { ...steel, sy: 1.2 });
    b.box(0.2, 0.03, 0.05, 0, 1.55, 0.15, '#1d1b1c');
    b.cyl(0, 0.04, 0.2, 0, 1.75, 0, o.plume ?? '#7a1f2a', { seg: 8 });
    b.cbox(0.06, 1.6, 0.03, 0.42, 0.85, 0.05, '#cfd6de', { metalness: 0.8 });
    b.cbox(0.22, 0.04, 0.05, 0.42, 0.25, 0.05, GOLD, BRASS);
    b.cbox(0.4, 0.5, 0.05, -0.35, 0.95, 0.18, o.shield ?? '#2f5d8a', { round: 0.05 });
    return { w: 1.0, d: 0.65, h: 1.85, wall: true, up: 1.1 };
  },

  woodpile(b, o) {
    const r = rng(o.seed);
    for (let row = 0; row < 4; row++) for (let i = 0; i < 6 - row; i++) b.cyl(0.11, 0.11, 0.7, -0.55 + i * 0.22 + row * 0.11, 0.11 + row * 0.19, 0, shade('#8a5a36', (r() - 0.5) * 0.15), { rx: Math.PI / 2, center: true, seg: 9 });
    b.cbox(0.05, 0.6, 0.05, 0.55, 0.3, 0.3, '#6b4a34', { rz: -0.3 });
    b.cbox(0.2, 0.15, 0.04, 0.68, 0.62, 0.3, '#8e8a82', { rz: -0.3, flat: true });
    return { w: 1.3, d: 0.75, h: 0.85, wall: true, up: 1.2 };
  },

  basket(b, o) {
    lathe(b, [[0.4, 0], [0.55, 0.2], [0.6, 0.55], [0.55, 0.58], [0, 0.5]], o.c ?? '#c9a46a', { seg: 18, material: patternMaterial('straw', o.c ?? '#c9a46a', '#a8803e', 2, 1) });
    b.cyl(0.6, 0.6, 0.06, 0, 1.15, 0, '#a8803e', { rz: Math.PI / 2, center: true, seg: 20, t0: 0, tl: Math.PI });
    b.cyl(0.55, 0.55, 0.02, 0, 0.5, 0, '#7cc66a', { seg: 18 });
    const r = rng(o.seed);
    for (let i = 0; i < 8; i++) b.sphere(0.1, (r() - 0.5) * 0.7, 0.62, (r() - 0.5) * 0.7, pick(r, ['#f2a6c0', '#9ad0e0', '#f6e08a', '#b7d98a', '#c8a0e0']), { sy: 1.3, seg: 10 });
    b.cbox(0.4, 0.1, 0.02, 0.4, 0.4, 0.45, '#f2a6c0', { ry: 0.6, round: 0.02 });
    return { w: 1.2, d: 1.2, h: 1.25, wall: true, up: 1.2 };
  },

  wardrobe(b, o) {
    const c = o.c ?? '#6a1f6e', gilt = GOLD;
    b.box(1.2, 1.8, 0.55, 0, 0, 0, c);
    b.box(1.3, 0.12, 0.6, 0, 1.8, 0, gilt, BRASS);
    for (const s of [-1, 1]) { b.frame(0.5, 1.5, 0.03, s * 0.29, 0.15, 0.28, gilt, 0.02, BRASS); b.sphere(0.03, s * 0.05, 0.9, 0.3, gilt, BRASS); }
    // one door ajar with a costume hanging out
    b.cbox(0.55, 1.6, 0.04, 0.85, 0.85, 0.35, c, { ry: -1.0 });
    b.cbox(0.4, 0.9, 0.12, 0.35, 0.6, 0.35, '#c0283a', { round: 0.05 });
    b.cbox(0.25, 0.12, 0.05, 0.35, 1.1, 0.42, '#f6f2ea', { round: 0.03 });
    return { w: 1.5, d: 0.75, h: 1.95, wall: true, up: 1.1 };
  },

  sack(b, o) {
    b.sphere(0.5, 0, 0.45, 0, o.c ?? '#b3202c', { sy: 0.9, seg: 16 });
    lathe(b, [[0.12, 0], [0.2, 0.15], [0.12, 0.2], [0, 0.18]], o.c ?? '#b3202c', { seg: 12 }, 0, 0.85, 0);
    b.cyl(0.13, 0.13, 0.05, 0, 0.88, 0, GOLD, { seg: 12, ...BRASS });
    const r = rng(o.seed);
    for (let i = 0; i < 4; i++) b.box(0.25, 0.22, 0.25, 0.35 + (i % 2) * 0.25, Math.floor(i / 2) * 0.22, 0.35 - (i % 2) * 0.3, pick(r, ['#2f6f7e', '#f2c94c', '#3f7a4a', '#c46aa8']), { ry: r() });
    return { w: 1.4, d: 1.2, h: 1.1, wall: true, up: 1.2 };
  },

  // ---------------------------------------------------------------- lamps
  andon(b, o) {
    b.box(0.35, 0.05, 0.35, 0, 0, 0, '#1d1716');
    for (const sx of [-1, 1]) for (const sz of [-1, 1]) b.box(0.03, 0.85, 0.03, sx * 0.16, 0.05, sz * 0.16, '#1d1716');
    b.box(0.3, 0.6, 0.3, 0, 0.25, 0, o.c ?? '#fff4dc', glow(o.c ?? '#ffe8b0', 1.0));
    b.box(0.36, 0.03, 0.36, 0, 0.88, 0, '#1d1716');
    lamp(b, '#ffd8a0', 1.8, 0, 0.6, 0, 4);
    return { w: 0.4, d: 0.4, h: 0.95, up: 1.6 };
  },

  lanternPost(b, o) {
    const c = o.c ?? '#d8263f', post = o.post ?? '#2a2523';
    b.cyl(0.18, 0.22, 0.06, 0, 0, 0, post, { seg: 12 });
    b.cyl(0.025, 0.03, 1.5, 0, 0.06, 0, post, { seg: 8 });
    b.cbox(0.5, 0.03, 0.03, 0.22, 1.52, 0, post);
    b.cyl(0.006, 0.006, 0.15, 0.4, 1.38, 0, post, { seg: 4 });
    lathe(b, [[0.04, 0], [0.18, 0.06], [0.22, 0.2], [0.18, 0.34], [0.04, 0.4], [0, 0.4]], c, { seg: 16, ...glow(c, 0.9) }, 0.4, 0.98, 0);
    for (const y of [0.98, 1.38]) b.cyl(0.06, 0.06, 0.03, 0.4, y - 0.01, 0, o.cap ?? '#1d1716', { seg: 10 });
    if (o.tassel) b.cyl(0.015, 0.03, 0.18, 0.4, 0.8, 0, o.tassel, { seg: 6 });
    lamp(b, '#ffb880', 1.6, 0.4, 1.15, 0, 4);
    return { w: 0.75, d: 0.5, h: 1.6, up: 1.4 };
  },

  candelabra(b, o) {
    const metal = o.c ?? GOLD, n = o.arms ?? 5, metalOpt = metal === GOLD ? BRASS : { metalness: 0.6, roughness: 0.35 };
    b.cyl(0.18, 0.24, 0.06, 0, 0, 0, metal, { seg: 12, ...metalOpt });
    lathe(b, [[0.06, 0], [0.04, 0.4], [0.07, 0.5], [0.035, 0.9], [0.06, 1.0], [0.03, 1.35], [0, 1.35]], metal, { seg: 10, ...metalOpt });
    for (let i = 0; i < n; i++) {
      const a = (i / n) * Math.PI * 2, R = 0.3;
      b.cbox(R, 0.025, 0.025, Math.cos(a) * R / 2, 1.3, Math.sin(a) * R / 2, metal, { ry: -a, ...metalOpt });
      b.cyl(0.04, 0.03, 0.05, Math.cos(a) * R, 1.3, Math.sin(a) * R, metal, { seg: 8, ...metalOpt });
      b.cyl(0.018, 0.018, 0.16, Math.cos(a) * R, 1.35, Math.sin(a) * R, o.wax ?? '#f6f2ea', { seg: 6 });
      b.sphere(0.022, Math.cos(a) * R, 1.54, Math.sin(a) * R, '#ffcf7a', glow('#ffb340', 1.8));
    }
    if (o.drops) for (let i = 0; i < 8; i++) b.sphere(0.03, Math.cos(i * 0.785) * 0.2, 1.15, Math.sin(i * 0.785) * 0.2, '#e8f4ff', { roughness: 0.05, metalness: 0.3, seg: 6 });
    if (o.web) b.cbox(0.4, 0.3, 0.005, 0.15, 1.1, 0, '#e8e8f0', { opacity: 0.35, rz: 0.5, shadow: false });
    lamp(b, '#ffb860', 1.8, 0, 1.6, 0, 4);
    return { w: 0.7, d: 0.7, h: 1.6, up: 1.5 };
  },

  oilLamp(b, o) {
    const metal = o.c ?? '#b8862b';
    b.cyl(0.18, 0.22, 0.05, 0, 0, 0, metal, { seg: 10, ...BRASS });
    for (let i = 0; i < 3; i++) b.cbox(0.03, 0.4, 0.03, Math.cos(i * 2.1) * 0.08, 0.2, Math.sin(i * 2.1) * 0.08, metal, { rz: Math.cos(i * 2.1) * 0.3, rx: -Math.sin(i * 2.1) * 0.3, ...BRASS });
    b.cyl(0.025, 0.03, 0.9, 0, 0.35, 0, metal, { seg: 8, ...BRASS });
    b.cyl(0.15, 0.1, 0.05, 0, 1.25, 0, metal, { seg: 12, ...BRASS });
    for (let i = 0; i < 3; i++) {
      const a = i * 2.1;
      lathe(b, [[0, 0], [0.06, 0.01], [0.07, 0.04], [0.03, 0.07], [0, 0.06]], o.clay ?? '#c27a4a', { seg: 10 }, Math.cos(a) * 0.12, 1.3, Math.sin(a) * 0.12);
      b.sphere(0.025, Math.cos(a) * 0.19, 1.38, Math.sin(a) * 0.19, '#ffcf7a', glow('#ffb340', 1.8));
    }
    lamp(b, '#ffb860', 1.6, 0, 1.45, 0, 4);
    return { w: 0.5, d: 0.5, h: 1.45, up: 1.6 };
  },

  shipLantern(b, o) {
    const post = o.post ?? '#5a3420', metal = o.c ?? '#2a2a2e';
    b.cyl(0.05, 0.06, 1.3, 0, 0, 0, post, { seg: 8 });
    b.box(0.35, 0.05, 0.35, 0, 0, 0, post);
    b.cbox(0.4, 0.05, 0.05, 0.18, 1.28, 0, post);
    const x = 0.33;
    b.cyl(0.13, 0.13, 0.04, x, 0.85, 0, metal, { seg: 8, metalness: 0.5 });
    b.cyl(0.11, 0.11, 0.26, x, 0.89, 0, '#fff0c0', { seg: 8, ...glow('#ffcf7a', 1.2), opacity: 0.85 });
    for (let i = 0; i < 4; i++) b.cbox(0.015, 0.28, 0.015, x + Math.cos(i * 1.57) * 0.11, 1.02, Math.sin(i * 1.57) * 0.11, metal, { metalness: 0.5 });
    b.cyl(0, 0.14, 0.12, x, 1.15, 0, metal, { seg: 8, metalness: 0.5 });
    b.cyl(0.03, 0.03, 0.1, x, 1.25, 0, metal, { rz: Math.PI / 2, center: true, seg: 8, t0: 0, tl: Math.PI });
    lamp(b, '#ffc070', 1.6, x, 1.0, 0, 4);
    return { w: 0.6, d: 0.4, h: 1.35, up: 1.6 };
  },

  streetLamp(b, o) {
    const metal = o.c ?? '#2a3a2e';
    b.cyl(0.18, 0.24, 0.3, 0, 0, 0, metal, { seg: 10, metalness: 0.4 });
    lathe(b, [[0.06, 0], [0.04, 1.2], [0.07, 1.3], [0.035, 2.1], [0, 2.1]], metal, { seg: 10, metalness: 0.4 }, 0, 0.3, 0);
    b.cyl(0.16, 0.1, 0.35, 0, 2.3, 0, '#fff0c0', { seg: 6, ...glow('#ffcf7a', 1.2), opacity: 0.85 });
    b.cyl(0, 0.22, 0.15, 0, 2.65, 0, metal, { seg: 6, metalness: 0.4 });
    b.sphere(0.04, 0, 2.82, 0, metal, { seg: 6 });
    lamp(b, '#ffc070', 2.0, 0, 2.4, 0, 5);
    return { w: 0.6, d: 0.6, h: 2.85, up: 1.0 };
  },

  neon(b, o) {
    const c = o.c ?? '#ff3ec8';
    b.box(0.4, 0.06, 0.4, 0, 0, 0, '#2a2e36', { metalness: 0.5 });
    b.cyl(0.04, 0.04, 1.6, 0, 0.06, 0, '#cfd6de', { seg: 8, metalness: 0.6 });
    for (let i = 0; i < 3; i++) b.cyl(0.03, 0.03, 0.9, (i - 1) * 0.12, 0.5 + i * 0.25, 0, [c, '#3fe0ff', '#7cff8a'][i], { seg: 8, ...glow([c, '#3fe0ff', '#7cff8a'][i], 2.2), rz: 0.3 * (i - 1) });
    lamp(b, c, 1.6, 0, 1.2, 0, 4);
    return { w: 0.6, d: 0.45, h: 1.7, up: 1.5 };
  },

  torch(b, o) {
    b.cyl(0.18, 0.22, 0.12, 0, 0, 0, '#5a5a62', { seg: 9 });
    b.cyl(0.04, 0.05, 1.3, 0, 0.1, 0, o.c ?? '#5a3420', { seg: 8 });
    lathe(b, [[0.05, 0], [0.11, 0.15], [0.12, 0.2], [0, 0.18]], '#3a3a3e', { seg: 10, metalness: 0.4 }, 0, 1.35, 0);
    flame(b, 0, 1.52, 0, 1.0, '#ff9a3a', 2);
    return { w: 0.45, d: 0.45, h: 1.85, up: 1.6 };
  },

  spotlight(b, o) {
    for (let i = 0; i < 3; i++) b.cbox(0.04, 1.3, 0.04, Math.cos(i * 2.1) * 0.22, 0.6, Math.sin(i * 2.1) * 0.22, '#2a2523', { rz: Math.cos(i * 2.1) * 0.2, rx: -Math.sin(i * 2.1) * 0.2 });
    b.cyl(0.22, 0.16, 0.45, 0, 1.25, 0.05, '#c0283a', { rx: 1.1, center: true, seg: 14, metalness: 0.4 });
    b.cyl(0.2, 0.2, 0.02, 0, 1.15, 0.25, '#fff4c8', { rx: 1.1, center: true, seg: 14, ...glow('#fff4c8', 2.4) });
    lamp(b, '#fff0d0', 2.2, 0, 1.2, 0.5, 5);
    return { w: 0.7, d: 0.7, h: 1.5, up: 1.5 };
  },

  jackLantern(b, o) {
    b.sphere(0.4, 0, 0.35, 0, '#ff7518', { sy: 0.85, seg: 16 });
    for (let i = 0; i < 8; i++) b.sphere(0.28, Math.cos(i * 0.785) * 0.18, 0.35, Math.sin(i * 0.785) * 0.18, shade('#ff7518', (i % 2) * -0.05), { sy: 1.15, seg: 10 });
    b.cyl(0.04, 0.06, 0.15, 0, 0.68, 0, '#3f6a32', { seg: 6 });
    b.cbox(0.3, 0.07, 0.04, 0, 0.27, 0.42, '#ffcf3a', glow('#ffb340', 2));
    for (const s of [-1, 1]) b.cbox(0.1, 0.1, 0.04, s * 0.13, 0.45, 0.4, '#ffcf3a', { ...glow('#ffb340', 2), rz: 0.78 });
    lamp(b, '#ff9a3a', 1.6, 0, 0.5, 0.5, 3.5);
    return { w: 0.95, d: 0.95, h: 0.85, up: 1.6 };
  },

  lightString(b, o) {
    for (const s of [-1, 1]) b.cyl(0.03, 0.04, 1.5, s * 0.6, 0, 0, '#5a3420', { seg: 8 });
    const cols = o.cols ?? ['#ff4a4a', '#ffcf3a', '#3fe0ff', '#7cff8a', '#ff3ec8'];
    for (let i = 0; i < 11; i++) {
      const t = i / 10, x = -0.6 + t * 1.2, y = 1.45 - Math.sin(t * Math.PI) * 0.35;
      b.sphere(0.04, x, y, 0, cols[i % cols.length], glow(cols[i % cols.length], 2));
    }
    for (let i = 0; i < 10; i++) { const t = (i + 0.5) / 10; b.cbox(0.13, 0.008, 0.008, -0.6 + t * 1.2, 1.47 - Math.sin(t * Math.PI) * 0.35, 0, '#2a3a2a', { rz: Math.cos(t * Math.PI) * 0.8, shadow: false }); }
    lamp(b, '#ffd890', 1.4, 0, 1.2, 0.3, 4);
    return { w: 1.35, d: 0.3, h: 1.55, up: 1.3 };
  },

  discoBall(b, o) {
    for (let i = 0; i < 3; i++) b.cbox(0.04, 1.5, 0.04, Math.cos(i * 2.1) * 0.2, 0.7, Math.sin(i * 2.1) * 0.2, '#9aa6b4', { rz: Math.cos(i * 2.1) * 0.15, rx: -Math.sin(i * 2.1) * 0.15, metalness: 0.6 });
    b.sphere(0.3, 0, 1.65, 0, '#e8eef4', { seg: 10, flat: true, metalness: 0.9, roughness: 0.15 });
    for (let i = 0; i < 6; i++) b.sphere(0.04, Math.cos(i) * 0.6, 0.02, Math.sin(i) * 0.6, ['#ff4d8d', '#3fe0ff', '#f2c94c'][i % 3], { sy: 0.2, ...glow(['#ff4d8d', '#3fe0ff', '#f2c94c'][i % 3], 2) });
    lamp(b, '#ff8ad8', 1.6, 0, 1.6, 0, 4);
    return { w: 1.0, d: 1.0, h: 1.95, up: 1.4 };
  },

  firefly(b, o) {
    b.cyl(0.03, 0.05, 1.0, 0, 0, 0, '#6b4a34', { seg: 6, rz: 0.1 });
    for (let i = 0; i < 3; i++) b.cbox(0.02, 0.3, 0.02, 0.05 + i * 0.05, 0.75 + i * 0.08, 0, '#6b4a34', { rz: -0.6 });
    b.sphere(0.12, 0.25, 1.1, 0, '#3a3a2a', { sy: 1.4, seg: 10 });
    b.sphere(0.16, 0.25, 0.92, 0, '#e8ff7a', { sy: 1.2, seg: 12, ...glow('#d8ff5a', 2.2) });
    for (const s of [-1, 1]) b.cbox(0.22, 0.01, 0.12, 0.25 + s * 0.15, 1.2, 0, '#e8f4ff', { opacity: 0.5, rz: s * 0.4, shadow: false });
    const r = rng(o.seed);
    for (let i = 0; i < 6; i++) b.sphere(0.03, (r() - 0.5) * 0.8, 0.5 + r() * 0.9, (r() - 0.5) * 0.6, '#e8ff7a', glow('#d8ff5a', 2.4));
    lamp(b, '#d8ff7a', 1.6, 0.25, 1.0, 0, 4);
    return { w: 0.8, d: 0.6, h: 1.4, up: 1.5 };
  },

  jellyfish(b, o) {
    const c = o.c ?? '#d8a0ff';
    lathe(b, [[0, 0], [0.32, 0.02], [0.3, 0.15], [0.18, 0.3], [0, 0.34]], c, { seg: 18, opacity: 0.7, ...glow(c, 1.4) }, 0, 1.1, 0);
    const r = rng(o.seed);
    for (let i = 0; i < 9; i++) { const a = (i / 9) * Math.PI * 2; b.cbox(0.02, 0.6 + r() * 0.3, 0.02, Math.cos(a) * 0.2, 0.75, Math.sin(a) * 0.2, c, { opacity: 0.6, ...glow(c, 1.2), rz: (r() - 0.5) * 0.3 }); }
    b.cyl(0.25, 0.3, 0.12, 0, 0, 0, '#8ea29e', { seg: 9, flat: true });
    lamp(b, c, 1.4, 0, 1.2, 0, 4);
    return { w: 0.7, d: 0.7, h: 1.45, up: 1.5 };
  },

  // ---------------------------------------------------------------- trees and big plants
  deco(b, o) {
    // one of the border props of deco.js, made bigger
    decoProp(b, o.name, o.s ?? 1.4, o.seed);
    if (o.pot) { b.cyl(0.3, 0.24, 0.35, 0, -0.01, 0, o.pot, { seg: 14 }); }
    return { w: o.w ?? 1.2, d: o.d ?? 1.2, h: o.h ?? 1.8, up: o.up ?? 1.3 };
  },

  tree(b, o) {
    const r = rng(o.seed), h = o.h ?? 2.5, spread = o.spread ?? 1.75, th = h * 0.5, bark = o.bark ?? '#6b4a34';
    b.cyl(0.07, 0.13, th, 0, 0, 0, bark);
    for (let i = 0; i < 3; i++) { const a = r() * Math.PI * 2; b.cbox(0.06, th * 0.5, 0.06, Math.cos(a) * 0.22, th * 0.85, Math.sin(a) * 0.22, bark, { rz: Math.cos(a) * 0.6, rx: -Math.sin(a) * 0.6 }); }
    foliage(b, { seed: o.seed, rx: spread / 2, ry: (h - th) * 0.6, palette: o.palette ?? 'green', voxel: 0.15, flowers: o.flowers ?? null, flowerRate: o.rate ?? 0.08 }, 0, th * 0.85, 0);
    if (o.hang) for (let i = 0; i < 6; i++) { const a = r() * 6.28, d = 0.3 + r() * 0.4; b.cyl(0.005, 0.005, 0.3, Math.cos(a) * d, th * 0.85 + 0.1, Math.sin(a) * d, '#f6f2ea', { seg: 3, shadow: false }); o.hang(b, Math.cos(a) * d, th * 0.85 + 0.05, Math.sin(a) * d, r); }
    b.cyl(0.42, 0.45, 0.05, 0, 0, 0, o.ground ?? '#8a6a4a', { seg: 16 });
    return { w: spread, d: spread, h, up: 1 };
  },

  willow(b, o) {
    const r = rng(o.seed);
    b.cyl(0.08, 0.15, 1.4, 0, 0, 0, '#6b5a44');
    foliage(b, { seed: o.seed, rx: 0.7, ry: 0.45, palette: 'lime', voxel: 0.13 }, 0, 1.3, 0);
    for (let i = 0; i < 22; i++) { const a = (i / 22) * Math.PI * 2 + r() * 0.2, d = 0.55 + r() * 0.25; b.cbox(0.05, 1.0 + r() * 0.4, 0.02, Math.cos(a) * d, 1.0, Math.sin(a) * d, pick(r, ['#7aa84a', '#98bd50', '#5a8a3a']), { ry: -a, flat: true }); }
    return { w: 1.7, d: 1.7, h: 2.2, up: 1 };
  },

  baobab(b, o) {
    lathe(b, [[0.45, 0], [0.42, 0.4], [0.38, 1.0], [0.42, 1.4], [0, 1.4]], '#a08a70', { seg: 14 });
    for (let i = 0; i < 6; i++) { const a = (i / 6) * Math.PI * 2; b.cbox(0.08, 0.6, 0.08, Math.cos(a) * 0.35, 1.6, Math.sin(a) * 0.35, '#a08a70', { rz: Math.cos(a) * 0.8, rx: -Math.sin(a) * 0.8 }); foliage(b, { seed: o.seed + i, rx: 0.25, ry: 0.12, palette: 'olive', voxel: 0.1 }, Math.cos(a) * 0.6, 1.8, Math.sin(a) * 0.6); }
    return { w: 1.6, d: 1.6, h: 2.0, up: 1 };
  },

  growTower(b, o) {
    b.cyl(0.25, 0.3, 0.1, 0, 0, 0, '#9aa6b4', { seg: 12, metalness: 0.5 });
    b.cyl(0.18, 0.18, 1.9, 0, 0.1, 0, '#eef2f6', { seg: 12 });
    for (let i = 0; i < 6; i++) {
      const y = 0.3 + i * 0.28, a = i * 1.1;
      b.cyl(0.08, 0.08, 0.1, Math.cos(a) * 0.2, y, Math.sin(a) * 0.2, '#cfd6de', { seg: 8 });
      foliage(b, { seed: o.seed + i, rx: 0.14, ry: 0.1, palette: i % 2 ? 'lime' : 'green', voxel: 0.05, flowers: i % 3 ? null : '#ff3ec8', flowerRate: 0.3 }, Math.cos(a) * 0.28, y + 0.05, Math.sin(a) * 0.28);
    }
    b.cyl(0.03, 0.03, 0.4, 0, 2.0, 0, '#3fe0ff', { seg: 6, ...glow('#c08aff', 2) });
    lamp(b, '#d8a0ff', 1.2, 0, 2.0, 0, 3);
    return { w: 0.8, d: 0.8, h: 2.2, up: 1.1 };
  },

  xmasTree(b, o) {
    b.box(0.4, 0.3, 0.4, 0, 0, 0, '#b3202c');
    b.cyl(0.06, 0.08, 0.4, 0, 0.3, 0, '#6b4a34', { seg: 8 });
    for (let i = 0; i < 4; i++) b.cyl(0.08, 0.75 - i * 0.16, 0.6, 0, 0.5 + i * 0.38, 0, ['#1f4d3a', '#2a6046', '#1f4d3a', '#2a6046'][i], { seg: 12 });
    const r = rng(o.seed), cols = ['#c0283a', '#f2c94c', '#3f8adf', '#f6f2ea'];
    for (let i = 0; i < 20; i++) { const t = r(), y = 0.6 + t * 1.5, R = (0.72 - t * 0.6) * 0.95, a = r() * 6.28; b.sphere(0.05, Math.cos(a) * R, y, Math.sin(a) * R, cols[i % 4], { seg: 8, ...(i % 4 === 1 ? glow('#ffd36a', 1.4) : { roughness: 0.2, metalness: 0.4 }) }); }
    slab(b, [[0, -0.17], [0.05, -0.05], [0.17, -0.05], [0.07, 0.03], [0.11, 0.16], [0, 0.08], [-0.11, 0.16], [-0.07, 0.03], [-0.17, -0.05], [-0.05, -0.05]], 0.05, GOLD, 2.25, { ...glow('#ffd36a', 1.4) });
    for (let i = 0; i < 4; i++) b.box(0.25, 0.2, 0.25, Math.cos(i * 1.6) * 0.55, 0, Math.sin(i * 1.6) * 0.55, cols[i], { ry: i });
    lamp(b, '#ffd890', 1.6, 0, 1.4, 0.6, 4);
    return { w: 1.6, d: 1.6, h: 2.45, up: 1 };
  },

  scarecrow(b, o) {
    b.cyl(0.04, 0.05, 1.9, 0, 0, 0, '#6b4a34', { seg: 8 });
    b.cyl(0.035, 0.035, 1.2, 0, 1.35, 0, '#6b4a34', { rz: Math.PI / 2, center: true, seg: 8 });
    b.cbox(0.5, 0.6, 0.22, 0, 1.15, 0, '#a33b2b', { round: 0.05, material: patternMaterial('checker', '#a33b2b', '#3a2a22', 2, 2) });
    for (const s of [-1, 1]) b.cbox(0.4, 0.14, 0.14, s * 0.4, 1.35, 0, '#a33b2b', { round: 0.04 });
    b.sphere(0.18, 0, 1.62, 0, '#e8c070', { seg: 12 });
    b.cyl(0.3, 0.3, 0.03, 0, 1.75, 0, '#c9a46a', { seg: 14 });
    b.cyl(0.12, 0.16, 0.2, 0, 1.75, 0, '#c9a46a', { seg: 12 });
    for (const s of [-1, 1]) b.cbox(0.05, 0.05, 0.02, s * 0.06, 1.65, 0.17, '#1d1b1c', { rz: 0.78 });
    for (let i = 0; i < 6; i++) b.cbox(0.02, 0.15, 0.02, (i - 2.5) * 0.07, 0.8, 0.02, '#e8c070', { rz: (i - 2.5) * 0.1 });
    b.sphere(0.07, 0.5, 1.47, 0, '#1d1b1c', { seg: 8 });
    b.sphere(0.4, 0.4, 0.2, 0.3, '#ff7518', { sy: 0.8, seg: 12 });
    return { w: 1.2, d: 0.9, h: 1.9, up: 1.1 };
  },

  tentPole(b, o) {
    b.cyl(0.08, 0.1, 2.4, 0, 0, 0, '#c0283a', { seg: 10, material: patternMaterial('stripes', '#c0283a', '#f6f2ea', 1, 3) });
    b.cyl(0.4, 0.45, 0.15, 0, 0, 0, '#5a3420', { seg: 12 });
    b.sphere(0.12, 0, 2.45, 0, GOLD, BRASS);
    for (let i = 0; i < 4; i++) { const a = i * 1.57; b.cbox(0.02, 0.02, 1.2, Math.cos(a) * 0.5, 1.9, Math.sin(a) * 0.5, '#d8c8a8', { ry: -a + Math.PI / 2, rx: 0.8 }); }
    b.cbox(0.4, 0.25, 0.01, 0.12, 2.25, 0, '#f2c94c', { rz: -0.1 });
    return { w: 1.0, d: 1.0, h: 2.55, up: 1 };
  },

  flowerFloat(b, o) {
    const r = rng(o.seed);
    b.box(1.5, 0.35, 0.9, 0, 0.15, 0, '#6a1f6e', { round: 0.05 });
    for (const sx of [-1, 1]) for (const sz of [-1, 1]) b.cyl(0.18, 0.18, 0.06, sx * 0.55, 0.18, sz * 0.45, GOLD, { rz: Math.PI / 2, center: true, seg: 14, ...BRASS });
    for (let i = 0; i < 9; i++) foliage(b, { seed: o.seed + i, rx: 0.25, ry: 0.2, palette: 'blossom', voxel: 0.07, flowers: pick(r, ['#f2c94c', '#e0283a', '#f6f2ea']), flowerRate: 0.4 }, -0.5 + (i % 3) * 0.5, 0.55 + Math.floor(i / 3) * 0.2, -0.25 + Math.floor(i / 3) * 0.2);
    b.sphere(0.3, 0, 1.3, 0, '#f2c94c', { seg: 12 });
    b.cbox(0.4, 0.15, 0.05, 0, 1.3, 0.28, '#f6f2ea', { round: 0.05 });
    return { w: 1.5, d: 1.0, h: 1.6, up: 1.1 };
  },

  // ---------------------------------------------------------------- fountains and landmarks
  fountain(b, o) {
    const R = 0.85, color = o.c ?? '#d8ccb2', water = o.water ?? '#5fa5b5';
    b.cyl(R, R + 0.05, 0.4, 0, 0, 0, color, { seg: 28 });
    b.cyl(R - 0.12, R - 0.12, 0.02, 0, 0.34, 0, water, { seg: 28, roughness: 0.1, metalness: 0.2 });
    b.cyl(0.14, 0.2, 0.9, 0, 0.3, 0, color, { seg: 14 });
    b.cyl(0.45, 0.25, 0.15, 0, 1.1, 0, color, { seg: 18 });
    b.cyl(0.37, 0.37, 0.02, 0, 1.2, 0, water, { seg: 18, roughness: 0.1 });
    if (o.top === 'swan') {
      b.sphere(0.16, 0, 1.33, 0, '#f6f2ea', { sy: 0.7, seg: 12 });
      b.cyl(0.04, 0.05, 0.3, 0, 1.38, 0.1, '#f6f2ea', { rx: -0.3, seg: 8 });
      b.sphere(0.06, 0, 1.68, 0.18, '#f6f2ea', { seg: 8 });
      b.cbox(0.04, 0.03, 0.08, 0, 1.68, 0.26, '#ff9a3a');
    } else if (o.top === 'cupid') {
      b.sphere(0.1, 0, 1.4, 0, '#f2e8e0', { seg: 10 });
      b.sphere(0.13, 0, 1.25, 0, '#f2e8e0', { seg: 10, sy: 1.2 });
      for (const s of [-1, 1]) b.cbox(0.15, 0.2, 0.02, s * 0.15, 1.3, -0.08, '#f6f2ea', { rz: s * 0.5, round: 0.03 });
      slab(b, heartOutline(0.3), 0.04, '#e5384f', 1.55);
    } else if (o.top === 'confetti') {
      const r = rng(o.seed);
      for (let i = 0; i < 30; i++) b.cbox(0.05, 0.005, 0.03, (r() - 0.5) * 1.2, 0.36 + r() * 1.2, (r() - 0.5) * 1.2, pick(r, ['#e0283a', '#f2c94c', '#3fa08a', '#6a1f6e']), { ry: r() * 3, rz: r() * 3, shadow: false });
      b.sphere(0.12, 0, 1.33, 0, GOLD, BRASS);
    } else b.sphere(0.1, 0, 1.33, 0, color);
    for (let i = 0; i < 3; i++) b.cyl(0.09, 0.09, 0.012, Math.cos(i * 2.2) * 0.5, 0.36, Math.sin(i * 2.2) * 0.5, '#5a9440', { seg: 10, t0: 0.3, tl: Math.PI * 1.8 });
    return { w: 2 * R + 0.1, d: 2 * R + 0.1, h: 1.7, up: 1 };
  },

  well(b, o) {
    const stone = o.c ?? '#8e8a82', wood = '#6b4a34';
    b.cyl(0.55, 0.6, 0.7, 0, 0, 0, stone, { seg: 14, material: patternMaterial('stone', stone, shade(stone, -0.2), 3, 1) });
    b.cyl(0.45, 0.45, 0.02, 0, 0.6, 0, '#2a4a5a', { seg: 14 });
    for (const s of [-1, 1]) b.box(0.08, 1.2, 0.08, s * 0.5, 0.6, 0, wood);
    b.cyl(0.05, 0.05, 1.1, 0, 1.55, 0, wood, { rz: Math.PI / 2, center: true, seg: 8 });
    for (const s of [-1, 1]) b.cbox(0.8, 0.05, 0.75, s * 0.32, 1.9, 0, o.roof ?? '#7a3a2a', { rz: s * 0.65 });
    b.cyl(0.13, 0.11, 0.18, 0, 1.0, 0, wood, { seg: 10 });
    b.cyl(0.006, 0.006, 0.45, 0, 1.15, 0, '#d8c8a8', { seg: 3 });
    if (o.flowers) foliage(b, { seed: o.seed, rx: 0.3, ry: 0.1, palette: 'lime', voxel: 0.06, flowers: o.flowers, flowerRate: 0.3 }, 0.45, 0.7, 0.3);
    return { w: 1.25, d: 1.25, h: 2.1, up: 1.1 };
  },

  waterTank(b, o) {
    b.cyl(0.55, 0.55, 1.4, 0, 0.1, 0, '#5fc6e8', { seg: 18, opacity: 0.5, roughness: 0.05 });
    for (const y of [0.1, 0.8, 1.5]) b.cyl(0.58, 0.58, 0.08, 0, y, 0, '#9aa6b4', { seg: 18, metalness: 0.6 });
    for (let i = 0; i < 8; i++) b.sphere(0.04, (i % 3 - 1) * 0.2, 0.3 + i * 0.14, (i % 2 - 0.5) * 0.3, '#e8fbff', { seg: 6, shadow: false });
    b.box(0.3, 0.15, 0.04, 0, 0.5, 0.58, '#1b2230');
    b.box(0.25, 0.04, 0.01, 0, 0.55, 0.6, '#3fb6d9', glow('#3fb6d9', 1.4));
    return { w: 1.2, d: 1.2, h: 1.6, up: 1.1 };
  },

  menhir(b, o) {
    b.cbox(0.5, 1.9, 0.35, 0, 0.95, 0, '#8e8a82', { round: 0.12, rz: 0.05, flat: true });
    for (let i = 0; i < 4; i++) b.cbox(0.2, 0.03, 0.01, 0, 0.6 + i * 0.3, 0.18, '#a33b2b', { rz: (i % 2) * 0.6 });
    for (let i = 0; i < 3; i++) b.sphere(0.15, Math.cos(i * 2.1) * 0.4, 0.06, Math.sin(i * 2.1) * 0.35, '#7a766e', { sy: 0.6, seg: 7, flat: true });
    foliage(b, { seed: o.seed, rx: 0.25, ry: 0.06, palette: 'lime', voxel: 0.05 }, -0.1, 1.85, 0);
    return { w: 1.0, d: 1.0, h: 1.95, up: 1.1 };
  },

  carousel(b, o) {
    b.cyl(0.8, 0.85, 0.2, 0, 0, 0, '#f6f2ea', { seg: 16 });
    b.cyl(0.06, 0.06, 1.6, 0, 0.2, 0, GOLD, { seg: 10, ...BRASS });
    b.cyl(0.05, 0.95, 0.45, 0, 1.75, 0, '#c0283a', { seg: 16, material: patternMaterial('stripes', '#c0283a', '#f6f2ea', 4, 1) });
    b.sphere(0.1, 0, 2.25, 0, GOLD, BRASS);
    for (let i = 0; i < 4; i++) {
      const a = i * 1.57, x = Math.cos(a) * 0.55, z = Math.sin(a) * 0.55;
      b.cyl(0.02, 0.02, 1.5, x, 0.2, z, GOLD, { seg: 6, ...BRASS });
      b.cbox(0.16, 0.2, 0.45, x, 0.7 + (i % 2) * 0.15, z, ['#f6f2ea', '#f2c94c', '#9ad0e0', '#f2a6c0'][i], { ry: -a, round: 0.06 });
      b.cbox(0.1, 0.25, 0.12, x + Math.cos(a + 1.57) * 0.2, 0.9 + (i % 2) * 0.15, z + Math.sin(a + 1.57) * 0.2, ['#f6f2ea', '#f2c94c', '#9ad0e0', '#f2a6c0'][i], { ry: -a, round: 0.04 });
    }
    for (let i = 0; i < 12; i++) b.sphere(0.035, Math.cos(i * 0.52) * 0.95, 1.75, Math.sin(i * 0.52) * 0.95, '#fff2c8', glow('#ffd36a', 1.8));
    lamp(b, '#ffd890', 1.4, 0, 1.6, 0, 4);
    return { w: 1.9, d: 1.9, h: 2.35, up: 1 };
  },

  newsstand(b, o) {
    b.box(1.0, 1.4, 0.8, 0, 0, 0, '#2f5a46');
    b.cyl(0.05, 0.7, 0.4, 0, 1.4, 0, '#2f5a46', { seg: 8 });
    b.sphere(0.07, 0, 1.85, 0, GOLD, BRASS);
    const r = rng(o.seed);
    for (let i = 0; i < 6; i++) b.box(0.25, 0.32, 0.02, -0.33 + (i % 3) * 0.33, 0.35 + Math.floor(i / 3) * 0.45, 0.41, pick(r, ['#f6f2ea', '#e8d8a8', '#f2c94c', '#e8492c']));
    b.box(0.8, 0.15, 0.02, 0, 1.2, 0.41, '#f2c94c');
    return { w: 1.0, d: 0.85, h: 1.95, up: 1.1 };
  },

  statue(b, o) {
    const c = o.c ?? '#efe9dc';
    b.box(0.7, 0.6, 0.7, 0, 0, 0, shade(c, -0.08));
    b.box(0.8, 0.08, 0.8, 0, 0.6, 0, c);
    b.cyl(0.18, 0.25, 0.8, 0, 0.68, 0, c, { seg: 12 });
    b.cbox(0.4, 0.4, 0.22, 0, 1.6, 0, c, { round: 0.08 });
    b.sphere(0.13, 0, 1.95, 0, c, { seg: 12 });
    b.cbox(0.1, 0.5, 0.1, 0.25, 1.85, 0, c, { rz: -0.4 });
    b.cbox(0.1, 0.45, 0.1, -0.24, 1.55, 0.05, c, { rz: 0.2 });
    if (o.wreath) for (let i = 0; i < 8; i++) b.cbox(0.06, 0.015, 0.03, Math.cos(i * 0.6 + 3.5) * 0.14, 2.03, Math.sin(i * 0.6 + 3.5) * 0.14, '#7aa84a', { ry: -i * 0.6 });
    if (o.torch) { b.cyl(0.03, 0.04, 0.3, 0.4, 2.0, 0, GOLD, BRASS); flame(b, 0.4, 2.25, 0, 0.6, '#ff9a3a', 0); }
    return { w: 0.85, d: 0.85, h: 2.3, up: 1.1 };
  },

  treasureMound(b, o) {
    const r = rng(o.seed);
    b.sphere(0.8, 0, 0.0, 0, '#e6cc80', { sy: 0.4, seg: 14 });
    b.cbox(0.6, 0.1, 0.1, 0.1, 0.32, 0, '#c0283a', { ry: 0.78 });
    b.cbox(0.6, 0.1, 0.1, 0.1, 0.32, 0, '#c0283a', { ry: -0.78 });
    b.cbox(0.9, 0.35, 0.5, -0.35, 0.25, 0.25, '#7a4a2a', { rz: 0.35, ry: 0.3 });
    for (let i = 0; i < 12; i++) b.cyl(0.05, 0.05, 0.015, -0.2 + (r() - 0.5) * 0.6, 0.3 + r() * 0.1, 0.4 + (r() - 0.5) * 0.4, GOLD, { seg: 10, ...BRASS });
    b.cbox(0.05, 0.9, 0.12, 0.55, 0.5, -0.3, '#9aa6b4', { rz: -0.4, metalness: 0.5 });
    b.cbox(0.05, 0.35, 0.05, 0.75, 1.0, -0.3, '#6b4a34', { rz: -0.4 });
    return { w: 1.7, d: 1.7, h: 1.2, up: 1.1 };
  },

  anchor(b, o) {
    const iron = '#6a4a3a';
    b.cbox(0.1, 1.6, 0.1, 0, 0.9, 0, iron, { rz: 0.25, metalness: 0.4, roughness: 0.6 });
    b.cyl(0.6, 0.6, 0.1, 0.18, 0.55, 0, iron, { rz: 0.25, rx: Math.PI / 2, center: true, seg: 18, t0: Math.PI * 1.1, tl: Math.PI * 0.8, metalness: 0.4, roughness: 0.6 });
    b.cbox(0.7, 0.08, 0.08, -0.2, 1.5, 0, iron, { rz: 0.25 });
    b.cyl(0.13, 0.13, 0.05, -0.27, 1.75, 0, iron, { rx: Math.PI / 2, center: true, seg: 12 });
    for (let i = 0; i < 6; i++) b.cyl(0.05, 0.05, 0.02, -0.4 - i * 0.12, 1.6 - i * 0.25, 0.05, '#7a5a4a', { rx: Math.PI / 2, center: true, seg: 8 });
    foliage(b, { seed: o.seed, rx: 0.3, ry: 0.15, palette: 'kelp', voxel: 0.06 }, 0.3, 0, 0.2);
    return { w: 1.4, d: 0.8, h: 1.9, up: 1.1 };
  },

  dragon(b) {
    for (let i = 0; i < 7; i++) {
      const x = -0.75 + i * 0.25, y = 0.75 + Math.sin(i * 1.1) * 0.25;
      b.sphere(0.2 - i * 0.012, x, y, 0, i % 2 ? '#b3202c' : '#e0b23a', { sy: 0.9, seg: 12 });
      b.cyl(0.015, 0.02, y - 0.15, x, 0, 0.18, '#6b4a34', { seg: 6 });
    }
    b.cbox(0.4, 0.3, 0.3, -0.95, 0.95, 0, '#b3202c', { round: 0.08 });
    for (const s of [-1, 1]) { b.sphere(0.05, -1.08, 1.05, s * 0.1, '#f6f2ea', { seg: 6 }); b.cbox(0.04, 0.25, 0.04, -0.9, 1.2, s * 0.1, GOLD, { rz: 0.5 }); }
    b.cbox(0.25, 0.06, 0.25, -1.15, 0.85, 0, '#e0b23a');
    for (let i = 0; i < 5; i++) b.cbox(0.06, 0.15, 0.02, -0.7 + i * 0.3, 1.05 + Math.sin(i) * 0.2, 0, '#e0b23a', { rz: 0.3 });
    return { w: 2.3, d: 0.6, h: 1.3, up: 1.0 };
  },

  // ---------------------------------------------------------------- plants
  potted(b, o) {
    pottedPlant(b, o.s ?? 0.6, o.seed, o.plant ?? 'leafy', o.pot ?? '#b8673f', o.palette ?? 'green', o.flowers ?? null);
    return { w: 0.95, d: 0.95, h: 1.3, up: 1.25 };
  },

  papyrus(b, o) {
    lathe(b, [[0.22, 0], [0.3, 0.3], [0.26, 0.45], [0, 0.42]], o.pot ?? '#b8673f', { seg: 14 });
    const r = rng(o.seed);
    for (let i = 0; i < 9; i++) {
      const a = r() * 6.28, h = 1.0 + r() * 0.6, x = Math.cos(a) * 0.1, z = Math.sin(a) * 0.1, lean = 0.15 + r() * 0.15;
      b.cbox(0.02, h, 0.02, x + Math.cos(a) * h * lean * 0.5, 0.42 + h / 2, z + Math.sin(a) * h * lean * 0.5, '#5a8a3a', { rz: -Math.cos(a) * lean, rx: Math.sin(a) * lean });
      for (let k = 0; k < 8; k++) b.cbox(0.012, 0.2, 0.012, x + Math.cos(a) * h * lean, 0.42 + h, z + Math.sin(a) * h * lean, '#7aa84a', { rz: Math.cos(k * 0.785) * 0.9, rx: Math.sin(k * 0.785) * 0.9 });
    }
    return { w: 0.9, d: 0.9, h: 2.0, up: 1.2 };
  },

  parrot(b, o) {
    b.cyl(0.25, 0.3, 0.05, 0, 0, 0, '#6b4a34', { seg: 10 });
    b.cyl(0.03, 0.03, 1.3, 0, 0.05, 0, '#6b4a34', { seg: 8 });
    b.cyl(0.025, 0.025, 0.6, 0, 1.3, 0, '#6b4a34', { rz: Math.PI / 2, center: true, seg: 8 });
    b.sphere(0.12, 0.05, 1.45, 0, '#e0283a', { sy: 1.3, seg: 12 });
    b.sphere(0.08, 0.08, 1.62, 0.02, '#e0283a', { seg: 10 });
    b.cbox(0.05, 0.06, 0.06, 0.15, 1.6, 0.02, '#f2c94c', { rz: -0.4 });
    for (const s of [-1, 1]) b.cbox(0.05, 0.2, 0.12, 0.05, 1.45, s * 0.1, '#2f8adf', { rx: s * 0.2 });
    b.cbox(0.08, 0.35, 0.04, -0.05, 1.22, 0, '#3f9a45', { rz: 0.3 });
    b.cyl(0.08, 0.06, 0.06, -0.25, 1.3, 0, '#c9a477', { seg: 8 });
    return { w: 0.7, d: 0.6, h: 1.75, up: 1.5 };
  },

  pumpkin(b, o) {
    const s = o.s ?? 1, c = o.c ?? '#ff7518';
    for (let i = 0; i < 8; i++) b.sphere(0.4 * s, Math.cos(i * 0.785) * 0.22 * s, 0.38 * s, Math.sin(i * 0.785) * 0.22 * s, shade(c, (i % 2) * -0.05), { sy: 1.0, seg: 12 });
    b.cyl(0.05 * s, 0.07 * s, 0.25 * s, 0, 0.72 * s, 0, '#3f6a32', { seg: 6, rz: 0.2 });
    for (let i = 0; i < 2; i++) b.cbox(0.4 * s, 0.02, 0.2 * s, (i ? 1 : -1) * 0.3 * s, 0.72 * s, 0.1, '#5a8a3a', { ry: i * 2, rz: 0.3, flat: true });
    return { w: 1.0 * s, d: 1.0 * s, h: 0.95 * s, up: 1.4 };
  },

  flytrap(b, o) {
    lathe(b, [[0.2, 0], [0.28, 0.35], [0.25, 0.4], [0, 0.38]], '#4a3a40', { seg: 12 });
    const r = rng(o.seed);
    for (let i = 0; i < 4; i++) {
      const a = (i / 4) * Math.PI * 2 + r(), h = 0.6 + r() * 0.5, x = Math.cos(a) * 0.3, z = Math.sin(a) * 0.3;
      b.cbox(0.04, h, 0.04, x / 2, 0.4 + h / 2, z / 2, '#5a8a3a', { rz: -Math.cos(a) * 0.4, rx: Math.sin(a) * 0.4 });
      for (const s of [-1, 1]) {
        b.sphere(0.14, x, 0.4 + h, z, '#7aa84a', { sy: 0.35, seg: 10, rx: s * 0.6 });
        for (let k = 0; k < 4; k++) b.cbox(0.01, 0.07, 0.01, x + (k - 1.5) * 0.06, 0.4 + h + s * 0.06, z, '#f6f2ea');
      }
      b.sphere(0.1, x, 0.4 + h, z, '#c0283a', { sy: 0.2, seg: 8 });
    }
    return { w: 0.95, d: 0.95, h: 1.4, up: 1.3 };
  },

  anemone(b, o) {
    const c = o.c ?? '#f08a7e', r = rng(o.seed);
    b.cyl(0.3, 0.35, 0.3, 0, 0, 0, '#8ea29e', { seg: 9, flat: true });
    b.cyl(0.25, 0.3, 0.25, 0, 0.3, 0, c, { seg: 14 });
    for (let i = 0; i < 24; i++) { const a = r() * 6.28, d = r() * 0.22; b.cbox(0.04, 0.4 + r() * 0.3, 0.04, Math.cos(a) * d, 0.75, Math.sin(a) * d, pick(r, [c, '#f6b0b8', '#b56ad8']), { rz: Math.cos(a) * 0.4, rx: -Math.sin(a) * 0.4, round: 0.015 }); }
    b.cbox(0.12, 0.05, 0.05, 0.25, 0.9, 0.1, '#ff7a1a', { round: 0.02 });
    return { w: 0.85, d: 0.85, h: 1.15, up: 1.4 };
  },

  balloons(b, o) {
    b.cyl(0.18, 0.2, 0.15, 0, 0, 0, '#f6f2ea', { seg: 12 });
    const r = rng(o.seed);
    for (let i = 0; i < 6; i++) {
      const a = r() * 6.28, d = 0.12 + r() * 0.2, h = 1.1 + r() * 0.5;
      b.cbox(0.006, h - 0.1, 0.006, Math.cos(a) * d * 0.5, h / 2, Math.sin(a) * d * 0.5, '#f6f2ea', { rz: -Math.cos(a) * d * 0.4, rx: Math.sin(a) * d * 0.4, shadow: false });
      b.sphere(0.16, Math.cos(a) * d, h + 0.1, Math.sin(a) * d, pick(r, o.cols ?? ['#e8492c', '#2f6f7e', '#f2c94c', '#c46aa8', '#3f7a4a']), { sy: 1.2, seg: 12, roughness: 0.3 });
    }
    return { w: 0.8, d: 0.8, h: 1.9, up: 1.4 };
  },

  plumes(b, o) {
    lathe(b, [[0.12, 0], [0.2, 0.15], [0.15, 0.45], [0.18, 0.6], [0, 0.55]], GOLD, { seg: 14, ...BRASS });
    const r = rng(o.seed);
    for (let i = 0; i < 9; i++) { const a = r() * 6.28; b.cbox(0.1, 0.8 + r() * 0.3, 0.02, Math.cos(a) * 0.15, 1.0, Math.sin(a) * 0.15, pick(r, ['#e0283a', '#f2c94c', '#3fa08a', '#6a1f6e', '#2f6a9a']), { rz: -Math.cos(a) * 0.5, rx: Math.sin(a) * 0.5, ry: a, round: 0.04, flat: true }); }
    return { w: 0.8, d: 0.8, h: 1.6, up: 1.4 };
  },

  holly(b, o) {
    pottedPlant(b, 0.6, o.seed, 'leafy', o.pot ?? '#b3202c', 'pine', '#e0283a');
    b.cbox(0.62, 0.08, 0.04, 0, 0.35, 0.3, GOLD, BRASS);
    return { w: 0.95, d: 0.95, h: 1.3, up: 1.25 };
  },
};

// Steamer baskets for the dumpling counter (kept apart: they read better big).
function dressingSteam(b, y) {
  for (let i = 0; i < 3; i++) for (let k = 0; k < 2; k++) {
    b.cyl(0.18, 0.18, 0.1, -0.5 + i * 0.5, y + k * 0.1, 0, '#c9a477', { seg: 14 });
    if (k) for (let j = 0; j < 4; j++) b.sphere(0.045, -0.5 + i * 0.5 + Math.cos(j * 1.6) * 0.08, y + 0.21, Math.sin(j * 1.6) * 0.08, '#f6efe0', { seg: 6 });
  }
  for (let i = 0; i < 3; i++) b.sphere(0.1 + i * 0.03, -0.5 + i * 0.5, y + 0.4, 0, '#ffffff', { opacity: 0.35, seg: 8, shadow: false });
}

