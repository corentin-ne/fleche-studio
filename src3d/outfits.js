// The figurines' bodies: a face (eyes, brows, cheeks, smile), one of several
// hairstyles, the outfit of their world (puzzle.theme: kimono, toga, Regency
// gown, spacesuit, mermaid tail…) and a little thing held in hand (a fan, a
// lantern, a cutlass…). Each person gets their variant from a hash of their id,
// so it never changes. The head is centred at y = 0.84, radius 0.19; hats
// (figures.js) sit on top. Facing +z, standing at the origin.
import * as THREE from 'three';
import { patternMaterial } from './geo.js';

const V = (pts) => pts.map(([x, y]) => new THREE.Vector2(x, y));
// Body outlines turned around Y: [radius, height] from the feet to the neck.
const PROFILES = {
  pawn: V([[0, 0], [0.3, 0], [0.31, 0.04], [0.27, 0.1], [0.21, 0.28], [0.175, 0.44], [0.215, 0.54], [0.21, 0.6], [0.12, 0.665], [0, 0.675]]),
  gown: V([[0, 0], [0.36, 0], [0.37, 0.03], [0.32, 0.12], [0.24, 0.3], [0.165, 0.46], [0.2, 0.55], [0.2, 0.6], [0.12, 0.665], [0, 0.675]]),
  robe: V([[0, 0], [0.28, 0], [0.29, 0.04], [0.25, 0.18], [0.21, 0.36], [0.19, 0.46], [0.215, 0.55], [0.21, 0.6], [0.12, 0.665], [0, 0.675]]),
  suit: V([[0, 0], [0.22, 0], [0.23, 0.04], [0.19, 0.12], [0.18, 0.28], [0.17, 0.44], [0.215, 0.55], [0.21, 0.6], [0.12, 0.665], [0, 0.675]]),
  tail: V([[0, 0], [0.2, 0.02], [0.13, 0.12], [0.13, 0.28], [0.17, 0.44], [0.215, 0.55], [0.21, 0.6], [0.12, 0.665], [0, 0.675]]),
  bulky: V([[0, 0], [0.27, 0], [0.28, 0.04], [0.25, 0.14], [0.23, 0.32], [0.22, 0.46], [0.24, 0.55], [0.22, 0.61], [0.13, 0.665], [0, 0.675]]),
};

const shade = (c, l) => new THREE.Color(c).offsetHSL(0, 0, l).getStyle();
const GOLD = '#d9b44a';
const BRASS = { metalness: 0.75, roughness: 0.3 };

// ---------------------------------------------------------------- outfits
// shapes: body outlines picked per person; c2: a second colour (sash, vest,
// cape…); parts: details drawn over the body; props: things held in the hand.
const OUTFITS = {
  manor: { shapes: ['suit', 'gown'], c2: '#2a2220', parts: ['vest', 'bow'], props: ['magnifier', 'teacup', 'cane'] },
  mermaids: { shapes: ['tail'], c2: '#7fd6c8', parts: ['scales', 'fin', 'shells'], props: ['trident', 'shell'] },
  japan: { shapes: ['robe'], c2: '#2a2a3a', parts: ['obi', 'kimonoCollar'], props: ['fan', 'katana', 'fan'] },
  paris: { shapes: ['suit', 'gown'], c2: '#24427a', parts: ['marin', 'scarf'], props: ['baguette', 'brush', 'baguette'] },
  regency: { shapes: ['gown', 'suit'], c2: '#f6f2ea', parts: ['empire', 'tails', 'lace'], props: ['fan', 'cane', 'letter'] },
  egypt: { shapes: ['robe'], c2: GOLD, parts: ['broadCollar', 'kilt'], props: ['ankh', 'staff'] },
  pirates: { shapes: ['suit'], c2: '#7a1f2a', parts: ['sash', 'coat', 'boots'], props: ['cutlass', 'spyglass', 'hook'] },
  western: { shapes: ['suit'], c2: '#6b3a22', parts: ['vestOpen', 'bandana', 'boots'], props: ['lasso', 'star'] },
  space: { shapes: ['bulky'], c2: '#eef2f6', parts: ['spacesuit'], props: ['tablet', 'wrench'] },
  haunted: { shapes: ['robe', 'gown'], c2: '#1d1716', parts: ['cape', 'highCollar'], props: ['candle', 'book'] },
  medieval: { shapes: ['robe', 'suit'], c2: '#7a1f2a', parts: ['tabard', 'belt', 'cape'], props: ['sword', 'goblet', 'shieldArm'] },
  prehistory: { shapes: ['robe'], c2: '#8a6a4a', parts: ['fur'], props: ['club', 'bone'] },
  circus: { shapes: ['suit', 'gown'], c2: '#f2c94c', parts: ['stripes', 'buttons', 'ruff'], props: ['balls', 'baton', 'whip'] },
  train: { shapes: ['suit', 'gown'], c2: '#2a2220', parts: ['coat', 'bow'], props: ['suitcase', 'newspaper'] },
  chalet: { shapes: ['bulky'], c2: '#f6f2ea', parts: ['sweater', 'scarf'], props: ['mug', 'skiPole'] },
  world: { shapes: ['suit'], c2: '#a8703f', parts: ['backpack', 'belt'], props: ['camera', 'map'] },
  rome: { shapes: ['robe'], c2: '#8a2a2a', parts: ['toga'], props: ['scroll', 'grapes'] },
  halloween: { shapes: ['robe', 'gown'], c2: '#1d1716', parts: ['cape', 'highCollar'], props: ['candyBucket', 'wand', 'candyBucket'] },
  easter: { shapes: ['gown', 'suit'], c2: '#f6f2ea', parts: ['apron', 'bow'], props: ['eggBasket', 'egg'] },
  carnival: { shapes: ['gown', 'suit'], c2: GOLD, parts: ['ruff', 'diamonds'], props: ['maskStick', 'fan'] },
  lunar: { shapes: ['robe'], c2: GOLD, parts: ['mandarinCollar', 'frogs'], props: ['handLantern', 'fan', 'orange'] },
  forest: { shapes: ['robe', 'suit'], c2: '#5a8a3a', parts: ['leafCape', 'belt'], props: ['wand', 'mushroom'] },
  xmas: { shapes: ['bulky'], c2: '#f6f2ea', parts: ['sweater', 'scarf'], props: ['present', 'candyCane'] },
  birthday: { shapes: ['suit', 'gown'], c2: '#f2c94c', parts: ['dots'], props: ['balloon', 'present'] },
  love: { shapes: ['gown', 'suit'], c2: '#ffb3c4', parts: ['empire', 'bow'], props: ['rose', 'heart'] },
};

// ---------------------------------------------------------------- face and hair
function face(b, skin, hair, pose) {
  b.sphere(0.19, 0, 0.84, 0, skin, { seg: 20, roughness: 0.7 });
  const cheek = shade(skin, -0.06);
  b.sphere(0.03, 0, 0.82, 0.185, cheek, { seg: 8, shadow: false });
  if (pose === 'dead') {
    for (const s of [-1, 1]) for (const r of [0.785, -0.785]) b.cbox(0.06, 0.015, 0.012, s * 0.07, 0.87, 0.18, '#1d1b1c', { rz: r, jitter: 0, shadow: false });
    return;
  }
  for (const s of [-1, 1]) {
    b.sphere(0.036, s * 0.07, 0.87, 0.158, '#fbf8f2', { seg: 10, sy: 1.15, shadow: false });
    b.sphere(0.022, s * 0.07, 0.866, 0.186, '#2a1d18', { seg: 8, shadow: false });
    b.sphere(0.008, s * 0.065, 0.876, 0.205, '#ffffff', { seg: 6, shadow: false, emissive: '#ffffff', ei: 0.6 });
    b.cbox(0.055, 0.013, 0.014, s * 0.072, 0.925, 0.168, shade(hair, -0.05), { rz: s * 0.18, jitter: 0, shadow: false });
    b.sphere(0.03, s * 0.115, 0.805, 0.15, '#f08a8a', { sy: 0.55, seg: 8, opacity: 0.55, shadow: false });
  }
  // a little smile
  const g = new THREE.TorusGeometry(0.036, 0.008, 5, 10, Math.PI);
  g.rotateZ(Math.PI);
  g.translate(0, 0.785, 0.178);
  b.geo(g, '#8a3a2a', { tess: false, shadow: false });
}

// Hairstyles: short, bob, long, bun, ponytail, curly (and the colour).
function hairdo(b, hair, kind) {
  const o = { roughness: 0.8 };
  b.sphere(0.2, 0, 0.9, -0.03, hair, { seg: 18, sy: 0.72, ...o });
  // a fringe over the forehead
  b.cbox(0.26, 0.06, 0.06, 0, 0.98, 0.12, hair, { round: 0.03, rx: 0.4, ...o });
  switch (kind) {
    case 'bob':
      b.sphere(0.21, 0, 0.82, -0.04, hair, { seg: 16, sy: 0.85, ...o });
      for (const s of [-1, 1]) b.cbox(0.08, 0.22, 0.2, s * 0.17, 0.79, 0.0, hair, { round: 0.04, ...o });
      break;
    case 'long':
      b.cbox(0.36, 0.5, 0.12, 0, 0.67, -0.13, hair, { round: 0.06, ...o });
      for (const s of [-1, 1]) b.cbox(0.08, 0.36, 0.14, s * 0.17, 0.72, -0.02, hair, { round: 0.04, ...o });
      break;
    case 'bun':
      b.sphere(0.1, 0, 1.06, -0.08, hair, { seg: 12, ...o });
      b.sphere(0.12, 0, 0.82, -0.12, hair, { seg: 12, ...o });
      break;
    case 'ponytail':
      b.sphere(0.12, 0, 0.84, -0.13, hair, { seg: 12, ...o });
      b.cbox(0.1, 0.32, 0.1, 0, 0.7, -0.24, hair, { round: 0.05, rx: 0.35, ...o });
      b.cyl(0.05, 0.05, 0.04, 0, 0.88, -0.2, '#c0283a', { seg: 8, rx: 0.4 });
      break;
    case 'curly':
      for (let i = 0; i < 9; i++) { const a = (i / 9) * Math.PI * 2; b.sphere(0.08, Math.cos(a) * 0.17, 0.92 + Math.sin(i * 1.7) * 0.03, Math.sin(a) * 0.15 - 0.03, hair, { seg: 8, ...o }); }
      b.sphere(0.12, 0, 1.0, -0.02, hair, { seg: 10, ...o });
      break;
    default:
      b.sphere(0.12, 0, 0.82, -0.12, hair, { seg: 12, ...o });
  }
}

// ---------------------------------------------------------------- outfit details
function part(b, kind, c, c2) {
  const dark = shade(c, -0.14);
  switch (kind) {
    case 'vest': b.cyl(0.19, 0.18, 0.2, 0, 0.42, 0.005, c2, { seg: 20, t0: -0.9, tl: 1.8 }); for (let i = 0; i < 3; i++) b.sphere(0.012, 0, 0.47 + i * 0.05, 0.19, GOLD, BRASS); break;
    case 'bow': for (const s of [-1, 1]) b.cbox(0.06, 0.04, 0.02, s * 0.035, 0.63, 0.13, c2, { rz: s * 0.4, round: 0.01 }); break;
    case 'scales': b.geo(new THREE.LatheGeometry(V([[0.2, 0.02], [0.13, 0.12], [0.135, 0.28], [0.17, 0.44], [0, 0.44]]), 18), c2, { material: patternMaterial('hex', c2, shade(c2, -0.15), 3, 2), tess: false }); break;
    case 'fin': for (const s of [-1, 1]) b.cbox(0.22, 0.03, 0.14, s * 0.15, 0.03, 0.2, c2, { ry: s * 0.6, round: 0.02 }); break;
    case 'shells': for (const s of [-1, 1]) b.sphere(0.06, s * 0.08, 0.57, 0.16, '#f6d3c9', { sy: 0.6, seg: 8 }); b.cyl(0.17, 0.17, 0.015, 0, 0.62, 0, '#fbf6ff', { seg: 16 }); break;
    case 'obi': b.cyl(0.2, 0.2, 0.12, 0, 0.4, 0, c2, { seg: 20 }); b.cbox(0.2, 0.12, 0.08, 0, 0.46, -0.21, c2, { round: 0.03 }); b.cyl(0.205, 0.205, 0.015, 0, 0.45, 0, GOLD, { seg: 20 }); break;
    case 'kimonoCollar': for (const s of [-1, 1]) b.cbox(0.05, 0.25, 0.02, s * 0.05, 0.56, 0.17, '#f6f2ea', { rz: s * 0.5 }); break;
    case 'marin': b.geo(new THREE.LatheGeometry(V([[0.18, 0.4], [0.215, 0.54], [0.21, 0.6], [0, 0.6]]), 20), '#f6f2ea', { material: patternMaterial('lines', '#f6f2ea', c2, 1, 2), tess: false }); break;
    case 'scarf': b.cyl(0.15, 0.16, 0.06, 0, 0.62, 0, c2 === '#24427a' ? '#c0392b' : '#b3202c', { seg: 16 }); b.cbox(0.06, 0.22, 0.03, 0.08, 0.5, 0.15, c2 === '#24427a' ? '#c0392b' : '#b3202c', { rz: 0.15 }); break;
    case 'empire': b.cyl(0.2, 0.2, 0.04, 0, 0.53, 0, c2, { seg: 20 }); b.cbox(0.1, 0.06, 0.04, 0, 0.53, -0.2, c2, { round: 0.02 }); break;
    case 'tails': b.cbox(0.22, 0.3, 0.03, 0, 0.3, -0.18, dark, { rx: 0.15 }); break;
    case 'lace': b.cyl(0.14, 0.2, 0.05, 0, 0.6, 0, '#fbf8f2', { seg: 20 }); break;
    case 'broadCollar': for (let i = 0; i < 3; i++) b.cyl(0.13 + i * 0.03, 0.15 + i * 0.03, 0.025, 0, 0.62 - i * 0.025, 0, [GOLD, '#2f5e8c', '#a33b2b'][i], { seg: 20 }); break;
    case 'kilt': b.cyl(0.215, 0.24, 0.16, 0, 0.18, 0, '#f6f2ea', { seg: 20 }); b.cyl(0.19, 0.19, 0.03, 0, 0.42, 0, GOLD, { seg: 20 }); break;
    case 'sash': b.cbox(0.06, 0.45, 0.02, 0, 0.47, 0.18, c2, { rz: 0.6 }); b.cyl(0.19, 0.19, 0.05, 0, 0.4, 0, c2, { seg: 20 }); break;
    case 'coat': b.geo(new THREE.LatheGeometry(V([[0.25, 0.05], [0.22, 0.25], [0.19, 0.42], [0.22, 0.56], [0, 0.56]]), 20, -2.5, 5.0), dark, { tess: false }); for (let i = 0; i < 3; i++) b.sphere(0.014, 0.07, 0.38 + i * 0.06, 0.18, GOLD, BRASS); break;
    case 'boots': for (const s of [-1, 1]) b.cbox(0.1, 0.1, 0.16, s * 0.08, 0.03, 0.12, '#2a1d18', { round: 0.03 }); break;
    case 'vestOpen': for (const s of [-1, 1]) b.cbox(0.1, 0.24, 0.03, s * 0.1, 0.5, 0.165, c2, { rz: s * 0.1 }); break;
    case 'bandana': b.cyl(0.14, 0.16, 0.05, 0, 0.62, 0, '#b3202c', { seg: 16 }); b.cbox(0.12, 0.1, 0.02, 0, 0.58, 0.15, '#b3202c', { rz: 0.78 }); break;
    case 'spacesuit':
      b.cyl(0.235, 0.235, 0.05, 0, 0.36, 0, '#ff9a3a', { seg: 20 });
      b.cbox(0.2, 0.14, 0.04, 0, 0.5, 0.21, '#33405a', { round: 0.02 });
      for (let i = 0; i < 3; i++) b.cbox(0.03, 0.03, 0.02, -0.05 + i * 0.05, 0.52, 0.235, ['#ff4a4a', '#7cff8a', '#3fb6d9'][i], { emissive: ['#ff4a4a', '#7cff8a', '#3fb6d9'][i], ei: 1.2, shadow: false });
      b.cbox(0.3, 0.32, 0.12, 0, 0.42, -0.24, '#cfd6de', { round: 0.04 });
      break;
    case 'cape': b.geo(new THREE.LatheGeometry(V([[0.3, 0.02], [0.27, 0.2], [0.22, 0.45], [0.22, 0.6], [0, 0.62]]), 20, 1.2, 3.9), c2, { tess: false }); b.cyl(0.21, 0.21, 0.04, 0, 0.6, 0, '#7a1f2a', { seg: 18, t0: 1.2, tl: 3.9 }); break;
    case 'highCollar': b.cyl(0.24, 0.16, 0.16, 0, 0.62, -0.03, c2, { seg: 18, t0: 1.6, tl: 3.1 }); break;
    case 'tabard': b.cbox(0.24, 0.42, 0.03, 0, 0.36, 0.185, c2); b.cbox(0.1, 0.1, 0.035, 0, 0.45, 0.19, GOLD, { ry: 0, rz: 0.785 }); break;
    case 'belt': b.cyl(0.185, 0.185, 0.035, 0, 0.42, 0, '#3a2a1e', { seg: 20 }); b.cbox(0.05, 0.04, 0.02, 0, 0.42, 0.185, GOLD, BRASS); break;
    case 'fur': b.cyl(0.24, 0.22, 0.3, 0, 0.15, 0, c2, { seg: 9 }); b.cbox(0.3, 0.3, 0.06, 0.06, 0.48, 0.1, c2, { rz: -0.5, round: 0.03 }); break;
    case 'stripes': for (let i = 0; i < 4; i++) b.cyl(0.21 - i * 0.008, 0.215 - i * 0.008, 0.035, 0, 0.12 + i * 0.1, 0, c2, { seg: 20 }); break;
    case 'buttons': for (let i = 0; i < 3; i++) b.sphere(0.022, 0, 0.36 + i * 0.07, 0.19, c2, { seg: 8 }); break;
    case 'ruff': for (let i = 0; i < 10; i++) { const a = (i / 10) * Math.PI * 2; b.sphere(0.06, Math.cos(a) * 0.15, 0.63, Math.sin(a) * 0.15, '#fbf8f2', { sy: 0.6, seg: 8 }); } break;
    case 'sweater': b.geo(new THREE.LatheGeometry(V([[0.25, 0.28], [0.23, 0.46], [0.245, 0.55], [0.22, 0.61], [0, 0.61]]), 20), c, { material: patternMaterial('checker', c, c2, 4, 1), tess: false }); break;
    case 'backpack': b.cbox(0.26, 0.3, 0.14, 0, 0.45, -0.24, c2, { round: 0.05 }); for (const s of [-1, 1]) b.cbox(0.03, 0.3, 0.02, s * 0.1, 0.5, 0.17, c2); break;
    case 'toga': b.geo(new THREE.LatheGeometry(V([[0.29, 0.02], [0.25, 0.2], [0.21, 0.4], [0.22, 0.55], [0, 0.6]]), 20), '#f6f2ea', { tess: false }); b.cbox(0.08, 0.6, 0.02, 0.02, 0.4, 0.2, c2, { rz: 0.55 }); b.cbox(0.08, 0.3, 0.2, 0.17, 0.5, 0.0, '#f6f2ea', { round: 0.03 }); break;
    case 'apron': b.cbox(0.24, 0.3, 0.02, 0, 0.2, 0.25, c2, { rx: -0.25 }); b.cbox(0.16, 0.12, 0.02, 0, 0.48, 0.18, c2); b.cyl(0.2, 0.2, 0.02, 0, 0.42, 0, c2, { seg: 20 }); break;
    case 'diamonds': for (let i = 0; i < 6; i++) b.cbox(0.08, 0.08, 0.01, Math.cos(i) * 0.04, 0.15 + i * 0.07, 0.235 - i * 0.008, i % 2 ? c2 : '#1d1b1c', { rz: 0.785, rx: -0.2 }); break;
    case 'mandarinCollar': b.cyl(0.13, 0.13, 0.06, 0, 0.62, 0, c2, { seg: 16 }); b.cbox(0.02, 0.3, 0.02, 0.06, 0.48, 0.18, c2); break;
    case 'frogs': for (let i = 0; i < 3; i++) b.cbox(0.07, 0.015, 0.02, 0.06, 0.4 + i * 0.06, 0.19, c2); break;
    case 'leafCape': for (let i = 0; i < 7; i++) { const a = Math.PI + (i - 3) * 0.32; b.cbox(0.12, 0.3, 0.02, Math.sin(a) * 0.22, 0.42, Math.cos(a) * 0.22, i % 2 ? c2 : shade(c2, 0.1), { ry: a, rx: 0.15, round: 0.04 }); } break;
    case 'dots': for (let i = 0; i < 9; i++) { const a = i * 2.4, y = 0.12 + (i % 5) * 0.08; b.sphere(0.025, Math.sin(a) * (0.27 - y * 0.15), y, Math.cos(a) * (0.27 - y * 0.15), c2, { seg: 6, shadow: false }); } break;
    default:
  }
}

// ---------------------------------------------------------------- props held in the right hand
function prop(b, kind, c) {
  const x = 0.3, y = 0.26, z = 0.1;
  switch (kind) {
    case 'magnifier': b.cbox(0.02, 0.16, 0.02, x, y + 0.06, z, '#5a3420', { rz: -0.4 }); b.cyl(0.07, 0.07, 0.015, x + 0.06, y + 0.18, z, GOLD, { rx: Math.PI / 2, center: true, seg: 14, ...BRASS }); b.cyl(0.058, 0.058, 0.017, x + 0.06, y + 0.18, z, '#cfe8f0', { rx: Math.PI / 2, center: true, seg: 14, opacity: 0.6 }); break;
    case 'teacup': b.cyl(0.05, 0.035, 0.05, x, y + 0.03, z, '#f6f2ea', { seg: 10 }); b.cyl(0.07, 0.07, 0.01, x, y + 0.02, z, '#f6f2ea', { seg: 10 }); break;
    case 'cane': b.cyl(0.015, 0.015, 0.36, x + 0.03, 0, z + 0.04, '#2a1d18', { seg: 6 }); b.sphere(0.03, x + 0.03, 0.37, z + 0.04, GOLD, BRASS); break;
    case 'trident': b.cyl(0.012, 0.012, 0.85, x, 0, z, GOLD, { seg: 6, ...BRASS }); for (const s of [-1, 0, 1]) b.cyl(0, 0.015, 0.12, x + s * 0.04, 0.85, z, GOLD, { seg: 5, ...BRASS }); b.cbox(0.1, 0.015, 0.015, x, 0.85, z, GOLD, BRASS); break;
    case 'shell': b.sphere(0.06, x, y + 0.04, z, '#f6d3c9', { sy: 0.5, seg: 10 }); break;
    case 'fan': for (let i = 0; i < 5; i++) b.cbox(0.03, 0.15, 0.008, x + Math.sin((i - 2) * 0.3) * 0.08, y + 0.08 + Math.cos((i - 2) * 0.3) * 0.08, z + 0.02, i % 2 ? c : '#f6f2ea', { rz: -(i - 2) * 0.3 }); break;
    case 'katana': b.cbox(0.02, 0.5, 0.03, x + 0.02, 0.3, z - 0.05, '#1d1716', { rz: -0.15 }); b.cbox(0.06, 0.02, 0.05, x - 0.01, 0.53, z - 0.05, GOLD, BRASS); break;
    case 'baguette': b.cbox(0.05, 0.42, 0.05, x, y + 0.08, z, '#d9a066', { rz: -0.5, round: 0.025 }); break;
    case 'brush': b.cbox(0.015, 0.2, 0.015, x, y + 0.06, z, '#a8703f', { rz: -0.4 }); b.sphere(0.02, x + 0.07, y + 0.15, z, '#e8492c', { seg: 6 }); break;
    case 'letter': b.cbox(0.1, 0.07, 0.01, x, y + 0.04, z + 0.03, '#f6f2ea', { rx: -0.3 }); b.sphere(0.012, x, y + 0.04, z + 0.04, '#b3202c', { seg: 6 }); break;
    case 'ankh': b.cbox(0.02, 0.18, 0.02, x, y + 0.05, z, GOLD, BRASS); b.cbox(0.1, 0.02, 0.02, x, y + 0.12, z, GOLD, BRASS); b.cyl(0.035, 0.035, 0.015, x, y + 0.18, z, GOLD, { rx: Math.PI / 2, center: true, seg: 10, ...BRASS }); break;
    case 'staff': b.cyl(0.012, 0.012, 0.9, x, 0, z, GOLD, { seg: 6, ...BRASS }); b.cbox(0.08, 0.04, 0.03, x + 0.02, 0.9, z, '#2f5e8c', { rz: 0.5 }); break;
    case 'cutlass': b.cbox(0.03, 0.35, 0.012, x + 0.06, y + 0.15, z, '#cfd6de', { rz: -0.5, metalness: 0.8, roughness: 0.25 }); b.cyl(0.04, 0.04, 0.02, x, y, z, GOLD, { seg: 8, ...BRASS }); break;
    case 'spyglass': b.cyl(0.022, 0.03, 0.26, x + 0.05, y, z, GOLD, { rz: -0.9, center: true, seg: 8, ...BRASS }); break;
    case 'hook': b.cyl(0.04, 0.03, 0.04, x, y - 0.02, z, '#2a1d18', { seg: 8 }); b.cyl(0.04, 0.04, 0.012, x, y - 0.07, z, '#cfd6de', { rx: Math.PI / 2, center: true, seg: 10, t0: 0, tl: Math.PI * 1.4, metalness: 0.8 }); break;
    case 'lasso': b.cyl(0.08, 0.08, 0.02, x, y - 0.02, z, '#c9a477', { rx: Math.PI / 2, center: true, seg: 14 }); b.cyl(0.07, 0.07, 0.02, x, y - 0.02, z + 0.015, '#c9a477', { rx: Math.PI / 2, center: true, seg: 14 }); break;
    case 'star': b.cyl(0.05, 0.05, 0.015, 0.09, 0.53, 0.19, GOLD, { rx: Math.PI / 2, center: true, seg: 5, ...BRASS }); break;
    case 'tablet': b.cbox(0.13, 0.17, 0.015, x - 0.02, y + 0.08, z + 0.05, '#1b2230', { rx: -0.5 }); b.cbox(0.11, 0.14, 0.006, x - 0.02, y + 0.085, z + 0.06, '#3fb6d9', { rx: -0.5, emissive: '#3fb6d9', ei: 1.2, shadow: false }); break;
    case 'wrench': b.cbox(0.025, 0.22, 0.015, x, y + 0.06, z, '#9aa6b4', { rz: -0.3, metalness: 0.7 }); b.cyl(0.035, 0.035, 0.015, x + 0.04, y + 0.17, z, '#9aa6b4', { rx: Math.PI / 2, center: true, seg: 8, t0: 0.6, tl: 5, metalness: 0.7 }); break;
    case 'candle': b.cyl(0.04, 0.05, 0.02, x, y, z, GOLD, { seg: 8, ...BRASS }); b.cyl(0.016, 0.016, 0.1, x, y + 0.02, z, '#f6f2ea', { seg: 6 }); b.sphere(0.02, x, y + 0.14, z, '#ffcf7a', { emissive: '#ffb340', ei: 1.8, shadow: false }); break;
    case 'book': b.cbox(0.12, 0.15, 0.04, x, y + 0.05, z, '#5a2a3a', { ry: 0.3 }); break;
    case 'sword': b.cbox(0.03, 0.45, 0.012, x + 0.02, y + 0.25, z, '#cfd6de', { metalness: 0.8, roughness: 0.25 }); b.cbox(0.12, 0.02, 0.03, x + 0.02, y + 0.02, z, GOLD, BRASS); break;
    case 'goblet': b.cyl(0.04, 0.012, 0.06, x, y + 0.04, z, GOLD, { seg: 10, ...BRASS }); b.cyl(0.03, 0.03, 0.01, x, y, z, GOLD, { seg: 10, ...BRASS }); break;
    case 'shieldArm': b.cbox(0.05, 0.28, 0.22, -0.3, 0.38, 0.02, c, { round: 0.04 }); b.cbox(0.055, 0.08, 0.08, -0.3, 0.4, 0.02, GOLD, BRASS); break;
    case 'club': b.cyl(0.05, 0.025, 0.36, x + 0.04, y - 0.05, z, '#7a5434', { rz: -0.3, seg: 8 }); break;
    case 'bone': b.cbox(0.025, 0.2, 0.025, x, y + 0.05, z, '#efe6d0', { rz: -0.4 }); for (const s of [-1, 1]) b.sphere(0.025, x + s * 0.04, y + 0.05 + s * 0.09, z, '#efe6d0', { seg: 6 }); break;
    case 'balls': for (let i = 0; i < 3; i++) b.sphere(0.035, x - 0.05 + i * 0.05, 0.75 + Math.sin(i * 2) * 0.05, z, ['#e8492c', '#f2c94c', '#2f6f9a'][i], { seg: 8 }); break;
    case 'baton': b.cyl(0.012, 0.012, 0.3, x, y - 0.05, z, '#f6f2ea', { seg: 6, rz: -0.6 }); b.sphere(0.03, x + 0.13, y + 0.06, z, '#c0283a', { seg: 8 }); break;
    case 'whip': b.cbox(0.02, 0.14, 0.02, x, y, z, '#3a2a1e', { rz: -0.5 }); b.cyl(0.006, 0.006, 0.4, x + 0.15, y - 0.1, z, '#3a2a1e', { rz: 1.2, seg: 4 }); break;
    case 'suitcase': b.box(0.16, 0.14, 0.06, x, 0.05, z, '#7a3f2a', { round: 0.02 }); b.cbox(0.06, 0.03, 0.02, x, 0.2, z, '#3a2a1e'); break;
    case 'newspaper': b.cbox(0.15, 0.18, 0.012, x - 0.02, y + 0.06, z + 0.05, '#efe9dc', { rx: -0.3, rz: 0.1 }); break;
    case 'mug': b.cyl(0.04, 0.04, 0.07, x, y, z, '#b3202c', { seg: 10 }); b.cyl(0.035, 0.035, 0.005, x, y + 0.065, z, '#5a2e1a', { seg: 10 }); break;
    case 'skiPole': b.cyl(0.01, 0.01, 0.75, x + 0.03, 0, z, '#9aa6b4', { seg: 5, metalness: 0.6 }); b.cyl(0.05, 0.05, 0.01, x + 0.03, 0.06, z, '#2a2a2e', { seg: 8 }); break;
    case 'camera': b.box(0.12, 0.08, 0.05, 0, 0.5, 0.2, '#2a2a2e', { round: 0.01 }); b.cyl(0.03, 0.03, 0.04, 0, 0.54, 0.24, '#5a6474', { rx: Math.PI / 2, center: true, seg: 10 }); break;
    case 'map': b.cbox(0.2, 0.15, 0.008, x - 0.04, y + 0.06, z + 0.05, '#e8d8a8', { rx: -0.3 }); b.cbox(0.06, 0.04, 0.009, x - 0.06, y + 0.07, z + 0.055, '#5aa9e6', { rx: -0.3 }); break;
    case 'scroll': b.cyl(0.025, 0.025, 0.16, x, y + 0.02, z, '#e8d8a8', { rz: Math.PI / 2 - 0.3, center: true, seg: 8 }); break;
    case 'grapes': for (let i = 0; i < 6; i++) b.sphere(0.022, x + (i % 2) * 0.03, y - 0.02 - Math.floor(i / 2) * 0.03, z, '#5a2a6a', { seg: 6 }); break;
    case 'candyBucket': b.cyl(0.06, 0.05, 0.09, x, y - 0.1, z, '#ff7518', { seg: 10 }); b.cyl(0.05, 0.05, 0.005, x, y - 0.02, z, '#2a1838', { seg: 10 }); break;
    case 'wand': b.cyl(0.008, 0.01, 0.25, x, y + 0.02, z, '#2a1d18', { rz: -0.4, seg: 5 }); b.sphere(0.025, x + 0.1, y + 0.23, z, '#f2c94c', { seg: 8, emissive: '#ffd36a', ei: 1.5, shadow: false }); break;
    case 'eggBasket': b.cyl(0.07, 0.06, 0.06, x, y - 0.1, z, '#c9a46a', { seg: 10 }); for (let i = 0; i < 3; i++) b.sphere(0.025, x + (i - 1) * 0.035, y - 0.03, z, ['#f2a6c0', '#9ad0e0', '#f6e08a'][i], { sy: 1.3, seg: 6 }); break;
    case 'egg': b.sphere(0.045, x, y + 0.04, z, '#9ad0e0', { sy: 1.3, seg: 8 }); break;
    case 'maskStick': b.cyl(0.008, 0.008, 0.25, x, y, z, GOLD, { seg: 5, ...BRASS }); b.cbox(0.16, 0.07, 0.02, x, y + 0.25, z, c, { round: 0.02 }); break;
    case 'handLantern': b.cyl(0.006, 0.006, 0.1, x, y - 0.05, z, '#1d1716', { seg: 4 }); b.sphere(0.06, x, y - 0.12, z, '#d8263f', { sy: 1.2, seg: 10, emissive: '#ff5a3a', ei: 0.8 }); break;
    case 'orange': b.sphere(0.045, x, y + 0.03, z, '#ff8a1a', { seg: 8 }); break;
    case 'mushroom': b.cyl(0.015, 0.02, 0.07, x, y, z, '#f2ead8', { seg: 6 }); b.sphere(0.045, x, y + 0.07, z, '#c0392b', { sy: 0.5, seg: 8 }); break;
    case 'present': b.box(0.12, 0.1, 0.12, x - 0.02, y - 0.05, z + 0.03, '#2f6f7e'); b.box(0.125, 0.105, 0.02, x - 0.02, y - 0.05, z + 0.03, '#f2c94c'); break;
    case 'candyCane': b.cyl(0.012, 0.012, 0.22, x, y - 0.04, z, '#f6f2ea', { seg: 6 }); b.cyl(0.04, 0.04, 0.024, x - 0.04, y + 0.18, z, '#c0283a', { rx: Math.PI / 2, center: true, seg: 10, t0: 0, tl: Math.PI }); break;
    case 'balloon': b.cyl(0.003, 0.003, 0.6, x, y, z, '#f6f2ea', { seg: 3, shadow: false }); b.sphere(0.11, x, y + 0.7, z, c === '#ff4d8d' ? '#5aa9e6' : '#ff4d8d', { sy: 1.2, seg: 12, roughness: 0.3 }); break;
    case 'rose': b.cyl(0.006, 0.006, 0.2, x, y, z, '#3f7a35', { seg: 4, rz: -0.2 }); b.sphere(0.035, x + 0.04, y + 0.2, z, '#c0283a', { seg: 8 }); break;
    case 'heart': for (const s of [-1, 1]) b.sphere(0.04, x + s * 0.03, y + 0.06, z + 0.02, '#e5384f', { seg: 8 }); b.cbox(0.06, 0.06, 0.04, x, y + 0.03, z + 0.02, '#e5384f', { rz: 0.785 }); break;
    default:
  }
}

// ---------------------------------------------------------------- the body
const HAIRDOS = ['short', 'bob', 'long', 'bun', 'ponytail', 'curly'];

/**
 * Body, outfit, face, hair and hand-held prop of a figurine.
 * @param {*} b Builder
 * @param {{ color: string, skin: string, hair: string, pose: string, theme: string, h: number }} o
 * @returns {string} the silhouette (gown, suit, robe…), for the hat
 */
export function dressBody(b, { color, skin, hair, pose, theme, h }) {
  const out = OUTFITS[theme] ?? OUTFITS.manor;
  const shape = out.shapes[h % out.shapes.length];
  const dark = shade(color, -0.14);
  b.geo(new THREE.LatheGeometry(PROFILES[shape] ?? PROFILES.pawn, 22), color, { roughness: 0.6 });
  // belt and collar (the outfit adds its own on top)
  if (!out.parts.some((p) => ['obi', 'empire', 'toga', 'spacesuit', 'sweater', 'fur', 'broadCollar'].includes(p))) {
    b.cyl(0.18, 0.18, 0.03, 0, 0.43, 0, dark, { seg: 20 });
    b.cyl(0.13, 0.15, 0.04, 0, 0.64, 0, '#f6f2ea', { seg: 18 });
  }
  for (const p of out.parts) {
    // some parts suit one silhouette only
    if ((p === 'tails' && shape !== 'suit') || (p === 'empire' && shape !== 'gown') || (p === 'lace' && shape !== 'gown')) continue;
    if ((p === 'vest' || p === 'bow') && theme === 'manor' && shape === 'gown') continue;
    part(b, p, color, out.c2);
  }
  // arms in the outfit's colour, hands in skin
  for (const s of [-1, 1]) {
    b.cbox(0.09, 0.34, 0.11, s * 0.22, 0.43, 0.01, theme === 'space' ? '#eef2f6' : color, { rz: s * 0.18, round: 0.04, roughness: 0.6 });
    b.sphere(0.055, s * 0.26, 0.26, 0.03, theme === 'space' ? '#cfd6de' : skin, { seg: 10 });
  }
  face(b, skin, hair, pose);
  hairdo(b, hair, HAIRDOS[(h >>> 3) % HAIRDOS.length]);
  if (pose !== 'dead') prop(b, out.props[(h >>> 6) % out.props.length], color);
  return shape;
}
