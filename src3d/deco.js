// Plants and landmarks for the diorama: the props on the plinth border around
// the board (palms on the sand, pines in the snow, lanterns in the zen garden…)
// and the small plants of open-air areas. Leaf-card foliage (geo.js foliage).
// Every prop sits on y = 0, centred on (0, 0); sizes in metres.
import { foliage } from './geo.js';

const pick = (r, a) => a[Math.floor(r() * a.length)];
const TRUNK = '#6b4a34';

export const PLANTS = {
  palm(b, r) {
    const h = 1.1 + r() * 0.4, lean = (r() - 0.5) * 0.3;
    for (let i = 0; i < 6; i++) b.cyl(0.07 - i * 0.006, 0.08 - i * 0.006, h / 6 + 0.02, lean * i * 0.06, (i * h) / 6, 0, i % 2 ? '#8a6a4a' : '#7a5a3a', { seg: 8 });
    const top = [lean * 0.36, h, 0];
    for (let i = 0; i < 8; i++) {
      const a = (i / 8) * Math.PI * 2 + r() * 0.3;
      b.cbox(0.14, 0.02, 0.7, top[0] + Math.cos(a) * 0.3, top[1] - 0.06, Math.sin(a) * 0.3, ['#2f7a3a', '#3f9a45', '#5aa84a'][i % 3], { ry: -a + Math.PI / 2, rx: 0.45, flat: true });
    }
    for (let i = 0; i < 3; i++) b.sphere(0.06, top[0] + Math.cos(i * 2.1) * 0.08, h - 0.08, Math.sin(i * 2.1) * 0.08, '#6b4a2a', { seg: 8 });
  },
  pine(b, r) {
    const h = 1.0 + r() * 0.5;
    b.cyl(0.06, 0.08, h * 0.25, 0, 0, 0, TRUNK, { seg: 8 });
    for (let i = 0; i < 3; i++) foliage(b, { seed: Math.floor(r() * 9999), rx: 0.42 - i * 0.11, ry: 0.22, palette: 'pine', voxel: 0.12 }, 0, h * 0.18 + i * h * 0.24, 0);
    if (r() < 0.6) b.cyl(0.05, 0.3, 0.12, 0, h * 0.8, 0, '#f4f8fc', { seg: 8 });
  },
  bush(b, r) {
    foliage(b, { seed: Math.floor(r() * 9999), rx: 0.35 + r() * 0.15, ry: 0.28, palette: pick(r, ['green', 'lime', 'olive']), voxel: 0.1, flowers: r() < 0.4 ? pick(r, ['#f4f1ff', '#e8492c', '#f2c94c']) : null }, 0, 0, 0);
  },
  tree(b, r) {
    const h = 0.9 + r() * 0.4;
    b.cyl(0.06, 0.09, h * 0.55, 0, 0, 0, TRUNK, { seg: 8 });
    foliage(b, { seed: Math.floor(r() * 9999), rx: 0.5, ry: 0.42, palette: pick(r, ['green', 'lime', 'autumn']), voxel: 0.14 }, 0, h * 0.5, 0);
  },
  sakura(b, r) {
    b.cyl(0.06, 0.09, 0.6, 0, 0, 0, '#4a3428', { seg: 8 });
    b.cbox(0.05, 0.4, 0.05, 0.12, 0.6, 0, '#4a3428', { rz: -0.6 });
    foliage(b, { seed: Math.floor(r() * 9999), rx: 0.55, ry: 0.36, palette: 'blossom', voxel: 0.12 }, 0.1, 0.62, 0);
  },
  bonsai(b, r) {
    b.box(0.4, 0.12, 0.26, 0, 0, 0, '#2f5a6e');
    b.cbox(0.05, 0.3, 0.05, 0, 0.26, 0, '#4a3428', { rz: 0.5 });
    foliage(b, { seed: Math.floor(r() * 9999), rx: 0.24, ry: 0.12, palette: 'dark', voxel: 0.06 }, 0.1, 0.32, 0);
  },
  cypress(b, r) {
    b.cyl(0.05, 0.06, 0.2, 0, 0, 0, TRUNK, { seg: 6 });
    foliage(b, { seed: Math.floor(r() * 9999), rx: 0.2, ry: 0.65, palette: 'dark', voxel: 0.1 }, 0, 0.1, 0);
  },
  topiary(b, r) {
    b.cyl(0.18, 0.14, 0.24, 0, 0, 0, '#c9b8a0', { seg: 12 });
    b.cyl(0.03, 0.03, 0.35, 0, 0.22, 0, TRUNK, { seg: 6 });
    foliage(b, { seed: Math.floor(r() * 9999), rx: 0.26, ry: 0.24, palette: 'green', voxel: 0.08 }, 0, 0.5, 0);
  },
  rosebush(b, r) {
    foliage(b, { seed: Math.floor(r() * 9999), rx: 0.36, ry: 0.26, palette: 'dark', voxel: 0.09, flowers: pick(r, ['#e8492c', '#f4bfd3', '#f4f1ff']) }, 0, 0, 0);
  },
  fern(b, r) {
    for (let i = 0; i < 9; i++) {
      const a = (i / 9) * Math.PI * 2 + r() * 0.4;
      b.cbox(0.09, 0.015, 0.5, Math.cos(a) * 0.2, 0.14, Math.sin(a) * 0.2, ['#2f6a2e', '#3f8a3a', '#5aa04a'][i % 3], { ry: -a + Math.PI / 2, rx: 0.6, flat: true });
    }
  },
  kelp(b, r) {
    for (let k = 0; k < 4; k++) {
      const x = (r() - 0.5) * 0.3, z = (r() - 0.5) * 0.3, n = 5 + Math.floor(r() * 4);
      for (let i = 0; i < n; i++) b.cbox(0.08, 0.2, 0.015, x + Math.sin(i * 0.9 + k) * 0.05, 0.1 + i * 0.16, z, ['#3f6a32', '#5a8a3a', '#7aa84a'][i % 3], { rz: Math.sin(i + k) * 0.4, ry: k });
    }
  },
  coralTree(b, r) {
    const c = pick(r, ['#f08a7e', '#f0a8c4', '#b56ad8', '#e8743a']);
    b.cyl(0.06, 0.09, 0.3, 0, 0, 0, c, { seg: 8 });
    for (let i = 0; i < 7; i++) {
      const a = r() * 6.28, t = 0.3 + r() * 0.5;
      b.cbox(0.06, 0.35 + r() * 0.2, 0.06, Math.cos(a) * 0.12, 0.35 + t * 0.2, Math.sin(a) * 0.12, c, { rz: Math.cos(a) * t, rx: -Math.sin(a) * t, round: 0.025 });
      b.sphere(0.05, Math.cos(a) * 0.25, 0.6 + t * 0.2, Math.sin(a) * 0.25, c, { seg: 8 });
    }
  },
  bamboo(b, r) {
    for (let k = 0; k < 5; k++) {
      const x = (r() - 0.5) * 0.35, z = (r() - 0.5) * 0.35, h = 0.8 + r() * 0.6;
      for (let i = 0; i < 4; i++) b.cyl(0.035, 0.035, h / 4 - 0.015, x, (i * h) / 4, z, i % 2 ? '#7aa84a' : '#6a9a3e', { seg: 8 });
      b.cbox(0.06, 0.012, 0.22, x + 0.08, h * 0.85, z, '#5a9440', { ry: r() * 3, rx: 0.4, flat: true });
    }
  },
  cactus(b, r) {
    const h = 0.6 + r() * 0.4, c = '#5a8a4a';
    b.cyl(0.11, 0.12, h, 0, 0, 0, c, { seg: 10 });
    b.sphere(0.11, 0, h, 0, c, { seg: 10 });
    for (const s of [-1, 1]) {
      if (r() < 0.3) continue;
      const y = h * (0.35 + r() * 0.25);
      b.cbox(0.2, 0.08, 0.08, s * 0.16, y, 0, c, { round: 0.04 });
      b.cyl(0.07, 0.07, 0.25, s * 0.25, y, 0, c, { seg: 8 });
      b.sphere(0.07, s * 0.25, y + 0.25, 0, c, { seg: 8 });
    }
    if (r() < 0.5) b.sphere(0.04, 0, h + 0.1, 0, '#e8492c', { seg: 6 });
  },
  dryBush(b, r) {
    foliage(b, { seed: Math.floor(r() * 9999), rx: 0.3, ry: 0.18, palette: 'dry', voxel: 0.08 }, 0, 0, 0);
  },
  deadTree(b, r) {
    b.cyl(0.05, 0.09, 0.9, 0, 0, 0, '#3a3036', { seg: 7 });
    for (let i = 0; i < 5; i++) {
      const a = r() * 6.28, y = 0.4 + r() * 0.45;
      b.cbox(0.035, 0.4, 0.035, Math.cos(a) * 0.12, y + 0.12, Math.sin(a) * 0.12, '#3a3036', { rz: Math.cos(a) * 0.9, rx: -Math.sin(a) * 0.9 });
    }
  },
  flowers(b, r) {
    for (let i = 0; i < 7; i++) {
      const x = (r() - 0.5) * 0.45, z = (r() - 0.5) * 0.45, h = 0.12 + r() * 0.12;
      b.cyl(0.01, 0.01, h, x, 0, z, '#3f7a35', { seg: 4 });
      b.sphere(0.04, x, h, z, pick(r, ['#e8492c', '#f2c94c', '#f4f1ff', '#c46aa8', '#5a8adf']), { seg: 6 });
    }
  },
  tuft(b, r) {
    for (let i = 0; i < 7; i++) {
      const a = r() * 6.28;
      b.cbox(0.03, 0.2 + r() * 0.12, 0.012, Math.cos(a) * 0.04, 0.1, Math.sin(a) * 0.04, pick(r, ['#5a9440', '#7cae4f', '#a9c96c']), { rz: Math.cos(a) * 0.5, rx: Math.sin(a) * 0.5, ry: a, flat: true });
    }
  },
};

export const LANDMARKS = {
  lamp(b) {
    b.cyl(0.1, 0.12, 0.08, 0, 0, 0, '#2a2523', { seg: 10 });
    b.cyl(0.03, 0.035, 1.2, 0, 0.08, 0, '#2a2523', { seg: 8 });
    b.box(0.16, 0.2, 0.16, 0, 1.25, 0, '#ffd27a', { emissive: '#ffb340', ei: 1.2 });
    b.cyl(0.0, 0.14, 0.1, 0, 1.45, 0, '#2a2523', { seg: 4 });
  },
  lanternStone(b) {
    b.cyl(0.14, 0.18, 0.1, 0, 0, 0, '#9a968c', { seg: 8 });
    b.cyl(0.05, 0.06, 0.35, 0, 0.1, 0, '#9a968c', { seg: 8 });
    b.box(0.24, 0.18, 0.24, 0, 0.45, 0, '#9a968c');
    b.box(0.12, 0.1, 0.26, 0, 0.49, 0, '#ffd27a', { emissive: '#ffb340', ei: 0.8 });
    b.cyl(0.0, 0.24, 0.14, 0, 0.63, 0, '#8a867c', { seg: 4 });
  },
  obelisk(b) {
    b.box(0.3, 0.1, 0.3, 0, 0, 0, '#c9a456');
    b.cyl(0.07, 0.12, 1.1, 0, 0.1, 0, '#e0c088', { seg: 4 });
    b.cyl(0, 0.07, 0.12, 0, 1.2, 0, '#e0b23a', { seg: 4, metalness: 0.7 });
  },
  tomb(b, r) {
    b.box(0.34, 0.5, 0.1, 0, 0, 0, '#8a8690', { round: 0.08, rz: (r() - 0.5) * 0.3 });
    b.box(0.2, 0.04, 0.12, 0, 0.32, 0.01, '#6e6a74');
    b.box(0.04, 0.2, 0.12, 0, 0.22, 0.01, '#6e6a74');
  },
  column(b) {
    b.box(0.32, 0.08, 0.32, 0, 0, 0, '#e6dfd0');
    b.cyl(0.11, 0.12, 0.9, 0, 0.08, 0, '#f2ede2', { seg: 12 });
    b.box(0.3, 0.07, 0.3, 0, 0.98, 0, '#e6dfd0');
  },
  banner(b, r) {
    b.cyl(0.025, 0.025, 1.3, 0, 0, 0, '#5a3b26', { seg: 6 });
    const c = pick(r, ['#c0283a', '#2f5d8a', '#d9a441']);
    b.box(0.32, 0.45, 0.02, 0.17, 0.8, 0, c);
    b.box(0.12, 0.12, 0.025, 0.17, 1.0, 0, '#f2c94c');
  },
  antenna(b) {
    b.box(0.26, 0.08, 0.26, 0, 0, 0, '#5a6474');
    b.cyl(0.02, 0.03, 1.2, 0, 0.08, 0, '#9aa6b4', { seg: 6, metalness: 0.6 });
    b.sphere(0.04, 0, 1.3, 0, '#ff4a4a', { emissive: '#ff2020', ei: 1.5, seg: 8 });
    for (const y of [0.5, 0.8]) b.box(0.3, 0.015, 0.015, 0, y, 0, '#9aa6b4');
  },
  dish(b) {
    b.box(0.22, 0.2, 0.22, 0, 0, 0, '#5a6474');
    b.sphere(0.32, 0, 0.5, 0, '#c9d1db', { sy: 0.35, seg: 14, rx: 0.8, metalness: 0.4 });
    b.cyl(0.015, 0.015, 0.3, 0, 0.45, 0.1, '#9aa6b4', { rx: 0.8, seg: 6 });
  },
  snowman(b) {
    b.sphere(0.2, 0, 0.18, 0, '#f6f9fc', { seg: 12 });
    b.sphere(0.15, 0, 0.47, 0, '#f6f9fc', { seg: 12 });
    b.sphere(0.11, 0, 0.7, 0, '#f6f9fc', { seg: 12 });
    b.cbox(0.03, 0.03, 0.12, 0, 0.7, 0.14, '#e8743a', { round: 0.01 });
    b.cyl(0.13, 0.13, 0.02, 0, 0.78, 0, '#2a2523', { seg: 12 });
    b.cyl(0.08, 0.08, 0.14, 0, 0.79, 0, '#2a2523', { seg: 12 });
    b.box(0.32, 0.05, 0.08, 0, 0.58, 0, '#c0283a');
  },
  fountainSmall(b) {
    b.cyl(0.38, 0.4, 0.18, 0, 0, 0, '#d8ccb2', { seg: 18 });
    b.cyl(0.32, 0.32, 0.01, 0, 0.15, 0, '#5fa5b5', { seg: 18, roughness: 0.1 });
    b.cyl(0.05, 0.07, 0.4, 0, 0.15, 0, '#d8ccb2', { seg: 10 });
    b.sphere(0.08, 0, 0.58, 0, '#d8ccb2', { seg: 10 });
  },
  balloons(b, r) {
    for (let i = 0; i < 4; i++) {
      const x = (r() - 0.5) * 0.3, z = (r() - 0.5) * 0.3, h = 0.8 + r() * 0.4;
      b.cyl(0.004, 0.004, h, x * 0.3, 0, z * 0.3, '#f6f2ea', { seg: 3 });
      b.sphere(0.12, x, h + 0.1, z, pick(r, ['#e8492c', '#2f6f7e', '#f2c94c', '#c46aa8', '#3f7a4a']), { sy: 1.2, seg: 12, roughness: 0.3 });
    }
  },
  bench(b) {
    for (const s of [-1, 1]) b.box(0.05, 0.3, 0.3, s * 0.4, 0, 0, '#2a2523');
    for (let i = 0; i < 3; i++) b.box(0.95, 0.03, 0.08, 0, 0.3, -0.1 + i * 0.1, '#5a8a5a');
    b.cbox(0.95, 0.12, 0.03, 0, 0.45, -0.17, '#5a8a5a', { rx: -0.2 });
  },
};
