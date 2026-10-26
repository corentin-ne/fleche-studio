// People as little painted figurines: a coloured base, a pawn-like body in the
// person's colour, a round head with hair, and a floating badge with their
// initial (a sprite, always facing the camera and drawn on top). The victim
// lies on the floor in a muted colour inside a chalk outline.
// Built with building-builder's Builder (handmade wobble, merged parts).
import * as THREE from 'three';
import { Builder, handmade, hashStr, seedBuilders } from './geo.js';

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

// Builds a person's figurine (meshes for the main scene).
export function buildFigure(person, { victim = false, selected = false } = {}) {
  const h = hashStr(person.id ?? person.name ?? 'p');
  const skin = SKIN[h % SKIN.length], hair = HAIR[(h >>> 4) % HAIR.length];
  const color = victim ? muted(person.color ?? '#888888') : person.color ?? '#888888';
  seedBuilders(h % 9973);
  const g = new THREE.Group();
  const b = new Builder();
  if (victim) {
    const sub = new Builder();
    body(sub, color, skin, hair, 'dead');
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
  return s;
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
