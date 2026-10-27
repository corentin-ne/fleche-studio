// People as little painted figurines: a coloured base, a pawn-like body in the
// person's colour, a round head with hair, and a floating badge with their
// initial (a sprite, always facing the camera and drawn on top). The victim
// lies on the floor in a muted colour inside a chalk outline.
// Built with building-builder's Builder (handmade wobble, merged parts).
import * as THREE from 'three';
import { Builder, handmade, hashStr, seedBuilders } from './geo.js';
import { markText } from './textmask.js';

const SKIN = ['#f2d2b6', '#e8be9a', '#c68e6a', '#8d5a3f', '#f5dcc6', '#b07850'];
const HAIR = ['#2a1d18', '#5a3b26', '#8a5a2a', '#d9b45a', '#9c9c9c', '#a33b2b', '#1d1b1c'];
export const FIGURE_H = 1.25;

function luminance(hex) {
  const c = new THREE.Color(hex);
  return 0.2126 * c.r + 0.7152 * c.g + 0.0722 * c.b;
}

export function muted(hex) {
  const c = new THREE.Color(hex);
  const hsl = {};
  c.getHSL(hsl);
  c.setHSL(hsl.h, hsl.s * 0.3, 0.42 + hsl.l * 0.2);
  return '#' + c.getHexString();
}

const PROFILE = [[0.0, 0], [0.3, 0], [0.31, 0.04], [0.27, 0.1], [0.21, 0.28], [0.175, 0.44], [0.215, 0.54], [0.21, 0.6], [0.12, 0.665], [0.0, 0.675]].map(([x, y]) => new THREE.Vector2(x, y));

// The figure's body parts, standing at the origin and facing +z.
function body(b, color, skin, hair, pose) {
  const dark = new THREE.Color(color).offsetHSL(0, 0, -0.14).getStyle();
  b.geo(new THREE.LatheGeometry(PROFILE, 22), color, { roughness: 0.6 });
  // belt and collar
  b.cyl(0.18, 0.18, 0.03, 0, 0.43, 0, dark, { seg: 20 });
  b.cyl(0.13, 0.15, 0.04, 0, 0.64, 0, '#f6f2ea', { seg: 18 });
  // arms
  for (const s of [-1, 1]) {
    b.cbox(0.09, 0.34, 0.11, s * 0.22, 0.43, 0.01, color, { rz: s * 0.18, round: 0.04, roughness: 0.6 });
    b.sphere(0.055, s * 0.26, 0.26, 0.03, skin, { seg: 10 });
  }
  b.sphere(0.19, 0, 0.84, 0, skin, { seg: 20, roughness: 0.7 });
  b.sphere(0.2, 0, 0.9, -0.03, hair, { seg: 18, sy: 0.72, roughness: 0.8 });
  b.sphere(0.12, 0, 0.82, -0.12, hair, { seg: 12 });
  if (pose === 'dead') {
    for (const s of [-1, 1]) {
      b.cbox(0.06, 0.015, 0.012, s * 0.07, 0.86, 0.182, '#1d1b1c', { rz: 0.785, jitter: 0, shadow: false });
      b.cbox(0.06, 0.015, 0.012, s * 0.07, 0.86, 0.182, '#1d1b1c', { rz: -0.785, jitter: 0, shadow: false });
    }
  } else {
    for (const s of [-1, 1]) b.sphere(0.025, s * 0.07, 0.86, 0.175, '#1d1b1c', { seg: 8, shadow: false });
    b.sphere(0.03, 0, 0.8, 0.188, new THREE.Color(skin).offsetHSL(0, 0.1, -0.08).getStyle(), { seg: 8, shadow: false });
  }
}

// Headwear of each world (puzzle.theme): a few variants, picked per person.
// The head's top is at y ≈ 1.03 (body space), its centre at y = 0.84.
const HATS = {
  pirates: ['tricorne', 'bandana', 'tricorne'],
  western: ['cowboy', 'cowboy', 'bandana'],
  japan: ['kasa', 'topknot', 'headband'],
  regency: ['tophat', 'bonnet', 'tophat'],
  egypt: ['nemes', 'nemes', 'headband'],
  circus: ['partyHat', 'tophat', 'partyHat'],
  chalet: ['beanie', 'beanie', 'earmuffs'],
  space: ['helmet', 'helmet', 'antennae'],
  haunted: ['witch', 'witch', 'tophat'],
  medieval: ['crown', 'helm', 'hood'],
  prehistory: ['bone', 'feather', 'bone'],
  mermaids: ['shellCrown', 'starfish', 'shellCrown'],
  paris: ['beret', 'beret', 'boater'],
  train: ['bowler', 'cloche', 'bowler'],
  rome: ['laurel', 'laurel', 'hood'],
  world: ['boater', 'cap', 'beanie'],
  halloween: ['witch', 'devilHorns', 'witch'],
  easter: ['bunnyEars', 'bonnet', 'bunnyEars'],
  carnival: ['mask', 'partyHat', 'mask'],
  lunar: ['mandarinCap', 'topknot', 'mandarinCap'],
  xmas: ['santa', 'elf', 'santa'],
  birthday: ['partyHat', 'partyHat', 'crown'],
  love: ['flowerCrown', 'tophat', 'bonnet'],
  forest: ['flowerCrown', 'hood', 'feather'],
};
function hat(b, kind, c, r) {
  const y = 0.98;
  switch (kind) {
    case 'tricorne':
      b.cyl(0.27, 0.27, 0.03, 0, y, -0.02, '#2a2220', { seg: 3 });
      b.cyl(0.13, 0.16, 0.1, 0, y + 0.02, -0.02, '#2a2220', { seg: 12 });
      b.cyl(0.272, 0.272, 0.012, 0, y + 0.025, -0.02, '#d9b44a', { seg: 3 });
      break;
    case 'bandana':
      b.sphere(0.205, 0, 0.9, -0.02, c, { sy: 0.72, seg: 16 });
      b.sphere(0.045, 0.12, 0.88, -0.18, c, { seg: 8 });
      for (let i = 0; i < 5; i++) b.sphere(0.02, Math.cos(i * 1.2) * 0.17, 0.95, Math.sin(i * 1.2) * 0.17 - 0.02, '#f6f2ea', { seg: 6 });
      break;
    case 'cowboy':
      b.cyl(0.3, 0.3, 0.025, 0, y - 0.02, 0, '#8a5a32', { seg: 22, rx: -0.12 });
      b.cyl(0.14, 0.16, 0.15, 0, y - 0.01, 0, '#8a5a32', { seg: 16 });
      b.cyl(0.162, 0.162, 0.03, 0, y + 0.01, 0, '#3a2618', { seg: 16 });
      break;
    case 'kasa':
      b.cyl(0.0, 0.34, 0.16, 0, y - 0.04, 0, '#d8c08a', { seg: 20 });
      break;
    case 'topknot':
      b.sphere(0.07, 0, y + 0.04, -0.06, '#1d1b1c', { seg: 10, sy: 1.1 });
      break;
    case 'headband':
      b.cyl(0.196, 0.196, 0.05, 0, 0.88, 0, c, { seg: 18 });
      b.sphere(0.04, 0, 0.9, 0.19, '#d9b44a', { seg: 8 });
      break;
    case 'tophat':
      b.cyl(0.24, 0.24, 0.02, 0, y, 0, '#1d1b1c', { seg: 20 });
      b.cyl(0.13, 0.14, 0.28, 0, y, 0, '#1d1b1c', { seg: 18 });
      b.cyl(0.141, 0.141, 0.04, 0, y + 0.03, 0, c, { seg: 18 });
      break;
    case 'bonnet':
      b.sphere(0.23, 0, 0.9, -0.05, '#f4e2c8', { sy: 0.8, seg: 16 });
      b.cyl(0.24, 0.24, 0.03, 0, 0.92, 0.03, c, { seg: 18, rx: 1.2 });
      break;
    case 'nemes':
      b.sphere(0.215, 0, 0.88, -0.02, '#e0b23a', { sy: 0.8, seg: 16 });
      for (let i = 0; i < 4; i++) b.cyl(0.217, 0.217, 0.02, 0, 0.8 + i * 0.05, -0.02, '#2f5e8c', { seg: 16, t0: Math.PI * 0.75, tl: Math.PI * 1.5 });
      for (const s of [-1, 1]) b.box(0.08, 0.22, 0.05, s * 0.18, 0.62, 0.03, '#e0b23a');
      break;
    case 'partyHat':
      b.cyl(0.0, 0.12, 0.3, 0, y - 0.02, 0, c, { seg: 14, rz: (r() - 0.5) * 0.4 });
      b.sphere(0.04, 0, y + 0.3, 0, '#f2c94c', { seg: 8 });
      break;
    case 'beanie':
      b.sphere(0.205, 0, 0.92, -0.01, c, { sy: 0.78, seg: 16 });
      b.cyl(0.205, 0.205, 0.05, 0, 0.86, -0.01, '#f6f2ea', { seg: 16 });
      b.sphere(0.06, 0, y + 0.1, 0, '#f6f2ea', { seg: 10 });
      break;
    case 'earmuffs':
      b.cyl(0.21, 0.21, 0.02, 0, 0.84, 0, '#c9c9c9', { rz: 1.57, seg: 16, t0: 0, tl: Math.PI });
      for (const s of [-1, 1]) b.sphere(0.065, s * 0.2, 0.84, 0, c, { seg: 10 });
      break;
    case 'helmet':
      b.sphere(0.27, 0, 0.84, 0, '#dff4ff', { seg: 20, roughness: 0.05, opacity: 0.35 });
      b.cyl(0.27, 0.27, 0.05, 0, 0.6, 0, '#c9d1db', { seg: 20, metalness: 0.5 });
      break;
    case 'antennae':
      for (const s of [-1, 1]) {
        b.cbox(0.015, 0.2, 0.015, s * 0.08, y + 0.06, 0, '#2a2523', { rz: -s * 0.3 });
        b.sphere(0.035, s * 0.12, y + 0.17, 0, c, { seg: 8, emissive: c, ei: 0.6 });
      }
      break;
    case 'witch':
      b.cyl(0.28, 0.28, 0.02, 0, y - 0.02, 0, '#2a2236', { seg: 20 });
      b.cyl(0.0, 0.15, 0.38, 0, y - 0.02, 0, '#2a2236', { seg: 14, rx: -0.2 });
      b.cyl(0.152, 0.152, 0.035, 0, y, 0, c, { seg: 14 });
      break;
    case 'devilHorns':
      for (const s of [-1, 1]) b.cyl(0, 0.035, 0.12, s * 0.09, y - 0.02, 0.02, '#c0283a', { seg: 8, rz: -s * 0.35 });
      break;
    case 'bunnyEars':
      for (const s of [-1, 1]) {
        b.sphere(0.05, s * 0.08, y + 0.14, -0.02, '#f6f2ea', { sy: 3, seg: 10, rz: -s * 0.15 });
        b.sphere(0.028, s * 0.08, y + 0.14, 0.022, '#f2a6c0', { sy: 2.8, seg: 8, rz: -s * 0.15 });
      }
      break;
    case 'mask':
      // Loup de carnaval sur les yeux, et une plume
      b.cbox(0.3, 0.075, 0.04, 0, 0.87, 0.175, c, { round: 0.02 });
      b.sphere(0.035, 0.13, y + 0.04, 0.08, '#f2c94c', { sy: 3, seg: 8, rz: -0.5 });
      break;
    case 'mandarinCap':
      b.sphere(0.205, 0, 0.92, -0.01, '#1d1b1c', { sy: 0.62, seg: 16 });
      b.sphere(0.035, 0, y + 0.05, 0, '#c0283a', { seg: 8 });
      break;
    case 'crown':
      b.cyl(0.15, 0.15, 0.08, 0, y - 0.02, 0, '#e0b23a', { seg: 18, metalness: 0.7, roughness: 0.3 });
      for (let i = 0; i < 6; i++) b.cyl(0, 0.03, 0.07, Math.cos(i * 1.047) * 0.14, y + 0.06, Math.sin(i * 1.047) * 0.14, '#e0b23a', { seg: 4, metalness: 0.7 });
      b.sphere(0.025, 0, y + 0.02, 0.15, '#c0283a', { seg: 8 });
      break;
    case 'helm':
      b.sphere(0.22, 0, 0.88, 0, '#9aa6b4', { sy: 0.9, seg: 16, metalness: 0.6, roughness: 0.35 });
      b.box(0.04, 0.2, 0.04, 0, 0.74, 0.2, '#9aa6b4', { metalness: 0.6 });
      break;
    case 'hood':
      b.sphere(0.23, 0, 0.87, -0.04, c, { sy: 0.95, seg: 16 });
      break;
    case 'bone':
      b.cbox(0.26, 0.035, 0.035, 0, y + 0.01, 0, '#efe6d0', { rz: 0.3 });
      for (const s of [-1, 1]) b.sphere(0.035, s * 0.125, y + 0.01 + s * 0.04, 0, '#efe6d0', { seg: 6 });
      break;
    case 'feather':
      b.cyl(0.196, 0.196, 0.04, 0, 0.9, 0, '#8a5a32', { seg: 16 });
      b.cbox(0.05, 0.28, 0.015, 0.06, y + 0.08, -0.12, c, { rz: -0.3, round: 0.012 });
      break;
    case 'shellCrown':
      for (let i = 0; i < 5; i++) b.sphere(0.05, Math.cos(i * 0.6 - 1.2) * 0.17, y - 0.01, Math.sin(i * 0.6 - 1.2) * 0.17 + 0.04, ['#f6d3c9', '#f8f4ff', '#f0a8c4'][i % 3], { sy: 1.3, seg: 8 });
      break;
    case 'starfish':
      for (let i = 0; i < 5; i++) b.cbox(0.1, 0.02, 0.035, 0.1 + Math.cos(i * 1.256) * 0.04, 0.95, 0.08 + Math.sin(i * 1.256) * 0.04, '#e8743a', { ry: -i * 1.256, rz: 0.6 });
      break;
    case 'beret':
      b.cyl(0.2, 0.2, 0.05, 0.03, y - 0.03, 0, c, { seg: 18, rz: 0.25 });
      b.cyl(0.01, 0.01, 0.04, 0.05, y + 0.01, 0, c, { seg: 4 });
      break;
    case 'boater':
      b.cyl(0.27, 0.27, 0.02, 0, y - 0.01, 0, '#e8d49a', { seg: 20 });
      b.cyl(0.15, 0.15, 0.09, 0, y - 0.01, 0, '#e8d49a', { seg: 18 });
      b.cyl(0.152, 0.152, 0.03, 0, y + 0.01, 0, c, { seg: 18 });
      break;
    case 'bowler':
      b.cyl(0.22, 0.22, 0.02, 0, y - 0.01, 0, '#2a2220', { seg: 20 });
      b.sphere(0.15, 0, y, 0, '#2a2220', { sy: 0.8, seg: 16 });
      break;
    case 'cloche':
      b.sphere(0.215, 0, 0.9, 0, c, { sy: 0.8, seg: 16 });
      b.cyl(0.24, 0.24, 0.02, 0, 0.84, 0, c, { seg: 18 });
      break;
    case 'cap':
      b.sphere(0.2, 0, 0.92, 0, c, { sy: 0.7, seg: 16 });
      b.box(0.24, 0.02, 0.16, 0, 0.9, 0.2, c);
      break;
    case 'santa':
      b.cyl(0.215, 0.215, 0.06, 0, 0.86, 0, '#f6f2ea', { seg: 18 });
      b.cyl(0.02, 0.19, 0.32, 0, 0.9, -0.02, '#c0283a', { seg: 14, rx: -0.45 });
      b.sphere(0.055, 0, 1.12, -0.16, '#f6f2ea', { seg: 10 });
      break;
    case 'elf':
      b.cyl(0.0, 0.17, 0.34, 0, y - 0.06, 0, '#3f7a4a', { seg: 14, rz: 0.35 });
      b.cyl(0.175, 0.175, 0.04, 0, y - 0.07, 0, '#c0283a', { seg: 14 });
      b.sphere(0.03, -0.12, y + 0.24, 0, '#f2c94c', { seg: 8 });
      break;
    case 'flowerCrown':
      for (let i = 0; i < 9; i++) {
        const a = (i / 9) * Math.PI * 2;
        b.sphere(0.04, Math.cos(a) * 0.18, 0.96, Math.sin(a) * 0.18, i % 3 ? c : '#f6f2ea', { seg: 8, sy: 0.8 });
        if (i % 3 === 1) b.sphere(0.028, Math.cos(a + 0.35) * 0.19, 0.94, Math.sin(a + 0.35) * 0.19, '#5a9a4a', { seg: 6, sy: 0.6 });
      }
      break;
    case 'laurel':
      for (let i = 0; i < 12; i++) {
        const a = Math.PI * 0.15 + (i / 11) * Math.PI * 0.7 + Math.PI;
        b.cbox(0.07, 0.015, 0.035, Math.cos(a) * 0.19, 0.95, -Math.sin(a) * 0.19, '#7aa84a', { ry: a, rz: 0.4 });
      }
      break;
  }
}

// Builds a person's figurine (meshes for the main scene).
export function buildFigure(person, { victim = false, selected = false, theme = '' } = {}) {
  const h = hashStr(person.id ?? person.name ?? 'p');
  const skin = SKIN[h % SKIN.length], hair = HAIR[(h >>> 4) % HAIR.length];
  const color = victim ? muted(person.color ?? '#888888') : person.color ?? '#888888';
  seedBuilders(h % 9973);
  const g = new THREE.Group();
  const b = new Builder();
  if (victim) {
    const sub = new Builder();
    body(sub, color, skin, hair, 'dead');
    const hv = HATS[theme];
    if (hv) hat(sub, hv[(h >>> 8) % hv.length], color, () => ((h >>> 12) % 100) / 100);
    // lying on its back, head towards -x, a little turned
    b.merge(sub);
    const model = b.build();
    // on its back: head towards -z, face up, centred on the cell
    model.rotation.set(-Math.PI / 2, 0, 0);
    model.scale.setScalar(1.15);
    model.position.set(0, 0.3, 0.6);
    const wrap = new THREE.Group();
    wrap.add(model);
    wrap.rotation.y = Math.PI / 2 + 0.35; // head to the left, like the chalk outline
    g.add(wrap);
  } else {
    const dark = new THREE.Color(color).offsetHSL(0, 0, -0.18).getStyle();
    b.cyl(0.4, 0.42, 0.06, 0, 0, 0, dark, { seg: 28, roughness: 0.5 });
    b.cyl(0.41, 0.41, 0.012, 0, 0.06, 0, '#f6f2ea', { seg: 28, roughness: 0.5 });
    b.cyl(0.36, 0.36, 0.014, 0, 0.062, 0, dark, { seg: 28, roughness: 0.5 });
    const sub = new Builder();
    body(sub, color, skin, hair, 'stand');
    // the theme's headwear, in the person's colour where it has one
    const hv = HATS[theme];
    if (hv) hat(sub, hv[(h >>> 8) % hv.length], new THREE.Color(color).offsetHSL(0, 0, -0.08).getStyle(), () => ((h >>> 12) % 100) / 100);
    b.merge(sub, 0, 0, 0.07, 0);
    const model = b.build();
    model.scale.setScalar(1.12);
    g.add(model);
  }
  if (selected) {
    const ring = new THREE.Mesh(new THREE.TorusGeometry(0.56, 0.05, 10, 40).rotateX(Math.PI / 2), new THREE.MeshStandardMaterial({ color: '#ffd36a', emissive: '#ffb020', emissiveIntensity: 1.6 }));
    ring.position.y = 0.06;
    g.add(ring);
    g.traverse((o) => {
      if (o.isMesh && o.material && !o.material.userData.glowClone && o !== ring) {
        o.material = handmade(o.material.clone());
        o.material.userData = { glowClone: true };
        o.material.emissive = new THREE.Color('#ffcf7a');
        o.material.emissiveIntensity = 0.22;
      }
    });
  }
  g.traverse((o) => {
    o.castShadow = o.isMesh;
    o.receiveShadow = o.isMesh;
  });
  return g;
}

// Chalk outline drawn around the lying victim (a decal on the floor).
export function chalkOutline() {
  const S = 256;
  const cv = document.createElement('canvas');
  cv.width = cv.height = S;
  const g = cv.getContext('2d');
  g.strokeStyle = 'rgba(255,255,255,0.92)';
  g.lineWidth = 7;
  g.lineCap = g.lineJoin = 'round';
  // a figure lying along x: head on the left
  const path = [
    [62, 128 - 26], [40, 108], [36, 128], [40, 148], [62, 154], [78, 150], [96, 168], [120, 176], [118, 158], [104, 150],
    [150, 154], [196, 176], [222, 172], [204, 150], [166, 136], [204, 120], [222, 92], [198, 86], [150, 106], [104, 108],
    [118, 98], [122, 78], [98, 86], [78, 106], [62, 102],
  ];
  g.beginPath();
  path.forEach(([x, y], i) => {
    const jx = x + Math.sin(i * 7.1) * 1.5, jy = y + Math.cos(i * 5.3) * 1.5;
    if (i === 0) g.moveTo(jx, jy);
    else g.lineTo(jx, jy);
  });
  g.closePath();
  g.stroke();
  const t = new THREE.CanvasTexture(cv);
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 8;
  const m = new THREE.Mesh(new THREE.PlaneGeometry(1.9, 1.9).rotateX(-Math.PI / 2), new THREE.MeshStandardMaterial({ map: t, transparent: true, depthWrite: false, roughness: 1 }));
  m.renderOrder = 2;
  return m;
}

// Badge with the initial (and optionally the name), as a camera-facing sprite.
export function buildBadge(person, { victim = false, selected = false, name = false } = {}) {
  const color = victim ? muted(person.color ?? '#888') : person.color ?? '#888';
  const D = 256, PAD = 18;
  const nameH = name ? 120 : 0;
  const W = name ? 512 : D + 2 * PAD;
  const H = D + 2 * PAD + nameH;
  const cv = document.createElement('canvas');
  cv.width = W;
  cv.height = H;
  const g = cv.getContext('2d');
  const cx = W / 2, cy = PAD + D / 2, R = D / 2 - 6;
  if (selected) {
    const grd = g.createRadialGradient(cx, cy, R * 0.8, cx, cy, R + PAD);
    grd.addColorStop(0, 'rgba(255,208,106,0.95)');
    grd.addColorStop(1, 'rgba(255,208,106,0)');
    g.fillStyle = grd;
    g.beginPath();
    g.arc(cx, cy, R + PAD, 0, Math.PI * 2);
    g.fill();
  }
  // a small pointer under the disc
  g.fillStyle = '#2a1f1c';
  g.beginPath();
  g.moveTo(cx - 26, cy + R - 14);
  g.lineTo(cx + 26, cy + R - 14);
  g.lineTo(cx, cy + R + 16);
  g.closePath();
  g.fill();
  g.beginPath();
  g.arc(cx, cy, R, 0, Math.PI * 2);
  g.fillStyle = '#2a1f1c';
  g.fill();
  g.beginPath();
  g.arc(cx, cy, R - 12, 0, Math.PI * 2);
  g.fillStyle = victim ? '#efe6dc' : '#fbf6ea';
  g.fill();
  g.beginPath();
  g.arc(cx, cy, R - 26, 0, Math.PI * 2);
  g.fillStyle = color;
  g.fill();
  if (victim) {
    g.strokeStyle = '#a3242b';
    g.lineWidth = 10;
    g.beginPath();
    g.arc(cx, cy, R - 6, 0, Math.PI * 2);
    g.stroke();
  }
  const initial = (person.name ?? person.id ?? '?').trim().charAt(0).toUpperCase();
  g.fillStyle = luminance(color) > 0.55 ? '#2a1f1c' : '#ffffff';
  g.font = '700 150px Georgia, "Times New Roman", serif';
  g.textAlign = 'center';
  g.textBaseline = 'middle';
  g.fillText(initial, cx, cy + 10);
  if (name) {
    const label = person.name ?? '';
    g.font = '600 78px Georgia, "Times New Roman", serif';
    const tw = Math.min(W - 20, g.measureText(label).width + 44);
    const y = H - nameH + 6;
    g.fillStyle = 'rgba(42,31,28,0.9)';
    roundRect(g, cx - tw / 2, y, tw, nameH - 12, 26);
    g.fill();
    g.fillStyle = '#fbf6ea';
    g.fillText(label, cx, y + (nameH - 12) / 2 + 3, W - 40);
  }
  const t = new THREE.CanvasTexture(cv);
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 4;
  const mat = new THREE.SpriteMaterial({ map: t, depthTest: false, depthWrite: false, transparent: true });
  const s = new THREE.Sprite(mat);
  const unit = 0.7 / D; // world units per canvas pixel
  s.scale.set(W * unit, H * unit, 1);
  // anchor at the pointer tip
  s.center.set(0.5, 1 - (cy + R + 16) / H);
  s.renderOrder = 10;
  return markText(s);
}

function roundRect(g, x, y, w, h, r) {
  g.beginPath();
  g.moveTo(x + r, y);
  g.arcTo(x + w, y, x + w, y + h, r);
  g.arcTo(x + w, y + h, x, y + h, r);
  g.arcTo(x, y + h, x, y, r);
  g.arcTo(x, y, x + w, y, r);
  g.closePath();
}
