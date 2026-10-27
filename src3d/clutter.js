// Decor for the Murdoku diorama: small props that make each room feel lived in
// (food, books, bottles, crates, shells, bones, little mats…). Pure decoration:
// they never change the puzzle. Props stay small and low, in the corners of a
// cell (people stand in the middle), or on top of tables, desks and counters.
// Every prop sits on y = 0, centred on (0, 0), and is merged into one mesh.
import { Builder, rng, seedBuilders } from './geo.js';
import { PLANTS } from './deco.js';

const pick = (r, a) => a[Math.floor(r() * a.length)];
const FRUIT = ['#e8492c', '#e0a94a', '#7cae4f', '#f2c94c', '#8e3b7a', '#f08a3c'];
const CLOTH = ['#c0392b', '#2f6f7e', '#7a3fa0', '#d9a441', '#3f7a4a', '#c46aa8', '#33405a', '#e07a5f'];
const GLASS = ['#3f7a4a', '#7a2a2a', '#2f5d8a', '#c9a24a', '#5a3b26'];
const WOOD = ['#8a5a36', '#a8703f', '#6b4a34', '#b98552'];

// --- props -------------------------------------------------------------------
export const PROPS = {
  plate(b, r) {
    b.cyl(0.17, 0.13, 0.025, 0, 0, 0, '#f6f2ea', { seg: 18, roughness: 0.3 });
    const food = pick(r, ['#c0602a', '#e0a94a', '#7cae4f', '#a33b2b']);
    b.sphere(0.08, 0, 0.04, 0, food, { sy: 0.5, seg: 10 });
    b.sphere(0.04, 0.07, 0.04, 0.03, pick(r, FRUIT), { seg: 8 });
  },
  fruitBowl(b, r) {
    b.sphere(0.16, 0, 0.05, 0, pick(r, ['#efe6c8', '#2f6f7e', '#c9a24a']), { sy: 0.45, seg: 16 });
    for (let i = 0; i < 5; i++) b.sphere(0.055, Math.cos(i * 1.3) * 0.07, 0.1 + (i % 2) * 0.03, Math.sin(i * 1.3) * 0.07, pick(r, FRUIT), { seg: 8 });
  },
  cake(b, r) {
    const icing = pick(r, ['#f6d3e0', '#f6f2ea', '#c97a4a', '#f2e2a0']);
    b.cyl(0.18, 0.18, 0.015, 0, 0, 0, '#f6f2ea', { seg: 20 });
    b.cyl(0.13, 0.13, 0.1, 0, 0.015, 0, '#e0b47e', { seg: 20 });
    b.cyl(0.135, 0.135, 0.03, 0, 0.1, 0, icing, { seg: 20 });
    for (let i = 0; i < 5; i++) b.sphere(0.02, Math.cos(i * 1.256) * 0.09, 0.14, Math.sin(i * 1.256) * 0.09, '#c0283a', { seg: 6 });
  },
  teaset(b, r) {
    const c = pick(r, ['#f6f2ea', '#2f6f7e', '#c46aa8', '#d9a441']);
    b.sphere(0.08, 0, 0.08, 0, c, { sy: 0.9, seg: 14 });
    b.cyl(0.02, 0.02, 0.03, 0, 0.15, 0, c);
    b.cbox(0.1, 0.025, 0.025, 0.1, 0.1, 0, c, { rz: 0.6 });
    for (const [x, z] of [[-0.16, 0.08], [0.14, 0.12]]) {
      b.cyl(0.06, 0.06, 0.012, x, 0, z, '#f6f2ea', { seg: 12 });
      b.cyl(0.04, 0.032, 0.05, x, 0.012, z, c, { seg: 12 });
    }
  },
  bottles(b, r) {
    const n = 2 + Math.floor(r() * 2);
    for (let i = 0; i < n; i++) {
      const x = (i - (n - 1) / 2) * 0.09, z = (r() - 0.5) * 0.08, h = 0.18 + r() * 0.08, c = pick(r, GLASS);
      b.cyl(0.035, 0.038, h, x, 0, z, c, { seg: 10, roughness: 0.2 });
      b.cyl(0.014, 0.022, 0.07, x, h, z, c, { seg: 8, roughness: 0.2 });
      b.cyl(0.016, 0.016, 0.02, x, h + 0.07, z, '#8a5a36', { seg: 6 });
    }
  },
  candles(b, r) {
    b.cyl(0.11, 0.12, 0.02, 0, 0, 0, '#c9a24a', { seg: 14, metalness: 0.7, roughness: 0.3 });
    for (let i = 0; i < 3; i++) {
      const x = Math.cos(i * 2.1) * 0.05, z = Math.sin(i * 2.1) * 0.05, h = 0.1 + r() * 0.12;
      b.cyl(0.022, 0.022, h, x, 0.02, z, '#f6f2ea', { seg: 8 });
      b.sphere(0.014, x, 0.04 + h, z, '#ffcf7a', { emissive: '#ffb340', ei: 1.5, shadow: false, seg: 6 });
    }
  },
  books(b, r) {
    const n = 2 + Math.floor(r() * 3);
    for (let i = 0; i < n; i++) b.cbox(0.26 - r() * 0.05, 0.045, 0.19, (r() - 0.5) * 0.03, 0.022 + i * 0.045, 0, pick(r, CLOTH), { ry: (r() - 0.5) * 0.7 });
  },
  papers(b, r) {
    for (let i = 0; i < 4; i++) b.cbox(0.18, 0.004, 0.24, (r() - 0.5) * 0.18, 0.003 + i * 0.003, (r() - 0.5) * 0.16, i === 3 ? '#efe2b8' : '#f6f2ea', { ry: r() * 3, shadow: false });
  },
  scroll(b, r) {
    b.cbox(0.06, 0.06, 0.3, 0, 0.03, 0, '#efe2b8', { round: 0.028, ry: r() * 3 });
    b.cbox(0.02, 0.065, 0.02, 0, 0.03, 0, '#a33b2b', { ry: r() * 3 });
  },
  crate(b, r) {
    const s = 0.34 + r() * 0.08, w = pick(r, WOOD);
    b.box(s, s, s, 0, 0, 0, w);
    for (const y of [0.04, s - 0.04]) b.box(s + 0.01, 0.04, s + 0.01, 0, y - 0.02, 0, '#5a3b26');
    if (r() < 0.5) b.box(s * 0.6, s * 0.5, s * 0.6, 0.02, s, 0.01, pick(r, WOOD));
  },
  barrel(b, r) {
    const h = 0.42;
    b.cyl(0.15, 0.15, h, 0, 0, 0, pick(r, WOOD), { seg: 14 });
    b.cyl(0.18, 0.18, h * 0.5, 0, h * 0.25, 0, pick(r, WOOD), { seg: 14 });
    for (const y of [0.06, h / 2 - 0.02, h - 0.08]) b.cyl(0.182, 0.182, 0.03, 0, y, 0, '#3a3433', { seg: 14, metalness: 0.5 });
  },
  sack(b, r) {
    const c = pick(r, ['#c9b27a', '#b89a6a', '#d8c79a']);
    b.sphere(0.17, 0, 0.14, 0, c, { sy: 0.85, seg: 12 });
    b.cyl(0.05, 0.08, 0.1, 0, 0.26, 0, c, { seg: 10 });
    b.cyl(0.055, 0.055, 0.02, 0, 0.3, 0, '#7a5a3a', { seg: 10 });
  },
  bread(b, r) {
    b.cyl(0.16, 0.13, 0.08, 0, 0, 0, '#a8703f', { seg: 14 });
    b.cbox(0.3, 0.07, 0.08, 0, 0.1, 0, '#d9a066', { round: 0.035, ry: 0.4 });
    b.sphere(0.06, -0.06, 0.12, 0.05, '#c98a4a', { seg: 10 });
    if (r() < 0.5) b.cbox(0.26, 0.06, 0.06, 0.02, 0.15, -0.04, '#e0b47e', { round: 0.03, ry: -0.5 });
  },
  cheese(b, r) {
    b.cyl(0.14, 0.14, 0.09, 0, 0, 0, '#f2d46a', { seg: 16, t0: 0, tl: Math.PI * 1.6 });
    b.cbox(0.08, 0.06, 0.06, 0.16, 0.03, 0.08, '#f5dd84', { ry: r() * 3 });
  },
  pumpkin(b, r) {
    const s = 0.14 + r() * 0.05;
    for (let i = 0; i < 6; i++) b.sphere(s * 0.6, Math.cos(i * 1.05) * s * 0.45, s * 0.75, Math.sin(i * 1.05) * s * 0.45, '#e07a2a', { sy: 1.2, seg: 10 });
    b.cyl(0.02, 0.03, 0.08, 0, s * 1.4, 0, '#4a6a2a', { seg: 6 });
  },
  mushrooms(b, r) {
    for (let i = 0; i < 3; i++) {
      const x = (r() - 0.5) * 0.25, z = (r() - 0.5) * 0.25, h = 0.06 + r() * 0.08;
      b.cyl(0.02, 0.025, h, x, 0, z, '#f6f2ea', { seg: 8 });
      b.sphere(0.05 + r() * 0.03, x, h, z, pick(r, ['#c0283a', '#a8703f', '#e0b47e']), { sy: 0.55, seg: 10 });
    }
  },
  rocks(b, r) {
    for (let i = 0; i < 3; i++) b.sphere(0.06 + r() * 0.08, (r() - 0.5) * 0.3, 0.03, (r() - 0.5) * 0.3, pick(r, ['#8e8a82', '#a9a296', '#6e6a62']), { sy: 0.6, seg: 7 });
  },
  shells(b, r) {
    for (let i = 0; i < 3; i++) b.sphere(0.05 + r() * 0.03, (r() - 0.5) * 0.3, 0.015, (r() - 0.5) * 0.3, pick(r, ['#f6d3c9', '#f2e6d8', '#e9b8a8']), { sy: 0.4, seg: 8, t0: 0 });
    // starfish
    const x = (r() - 0.5) * 0.2, z = (r() - 0.5) * 0.2;
    for (let i = 0; i < 5; i++) b.cbox(0.16, 0.025, 0.045, x + Math.cos(i * 1.256) * 0.07, 0.013, z + Math.sin(i * 1.256) * 0.07, '#e8743a', { ry: -i * 1.256 });
  },
  pearls(b, r) {
    b.sphere(0.13, 0, 0.03, 0, '#e9b8a8', { sy: 0.35, seg: 12 });
    for (let i = 0; i < 5; i++) b.sphere(0.03, Math.cos(i * 1.3) * 0.06, 0.06, Math.sin(i * 1.3) * 0.06, '#f8f4ff', { seg: 8, roughness: 0.15 });
  },
  coral(b, r) {
    const c = pick(r, ['#f08a7e', '#f0a8c4', '#e8743a', '#b56ad8']);
    for (let i = 0; i < 5; i++) b.cbox(0.035, 0.2 + r() * 0.15, 0.035, (r() - 0.5) * 0.12, 0.12, (r() - 0.5) * 0.12, c, { rz: (r() - 0.5) * 0.9, rx: (r() - 0.5) * 0.9, round: 0.015 });
  },
  coins(b, r) {
    for (let i = 0; i < 9; i++) b.cyl(0.04, 0.04, 0.012, (r() - 0.5) * 0.18, i < 5 ? 0 : 0.012 * (i - 4), (r() - 0.5) * 0.18, '#e0b23a', { seg: 10, metalness: 0.8, roughness: 0.3 });
  },
  bones(b, r) {
    for (let i = 0; i < 2; i++) {
      const ry = r() * 3, x = (r() - 0.5) * 0.15, z = (r() - 0.5) * 0.15;
      b.cbox(0.26, 0.03, 0.03, x, 0.02, z, '#efe6d0', { ry });
      for (const s of [-1, 1]) b.sphere(0.03, x + Math.cos(ry) * 0.13 * s, 0.025, z - Math.sin(ry) * 0.13 * s, '#efe6d0', { seg: 6 });
    }
    if (r() < 0.5) { b.sphere(0.08, 0.1, 0.07, 0.08, '#efe6d0', { seg: 10 }); b.box(0.06, 0.05, 0.06, 0.1, 0, 0.13, '#efe6d0'); }
  },
  hay(b, r) {
    b.cbox(0.4, 0.22, 0.26, 0, 0.11, 0, '#e0c46a', { round: 0.04, ry: r() * 3 });
    for (let i = 0; i < 6; i++) b.cbox(0.012, 0.012, 0.18, (r() - 0.5) * 0.4, 0.005, (r() - 0.5) * 0.4, '#e9d48a', { ry: r() * 3, shadow: false });
  },
  logs(b, r) {
    for (let i = 0; i < 3; i++) b.cbox(0.09, 0.09, 0.36, (i - 1) * 0.1, 0.045 + (i === 1 ? 0.08 : 0), 0, '#7a5a3a', { round: 0.04, ry: 1.57 + (r() - 0.5) * 0.2 });
  },
  vase(b, r) {
    const c = pick(r, ['#2f6f7e', '#efe6c8', '#c46aa8', '#d9a441']);
    b.cyl(0.05, 0.07, 0.18, 0, 0, 0, c, { seg: 12 });
    for (let i = 0; i < 5; i++) b.sphere(0.04, Math.cos(i * 1.3) * 0.05, 0.24 + (i % 2) * 0.04, Math.sin(i * 1.3) * 0.05, pick(r, ['#f2c94c', '#e8492c', '#f4f1ff', '#c46aa8']), { seg: 6 });
  },
  lantern(b, r) {
    b.box(0.12, 0.02, 0.12, 0, 0, 0, '#2a2523');
    b.box(0.09, 0.14, 0.09, 0, 0.02, 0, '#ffd27a', { emissive: '#ffb340', ei: 0.9 });
    b.cyl(0.0, 0.08, 0.06, 0, 0.16, 0, '#2a2523', { seg: 4 });
  },
  cushion(b, r) {
    b.cbox(0.32, 0.08, 0.32, 0, 0.04, 0, pick(r, CLOTH), { round: 0.035, ry: r() * 3 });
  },
  mat(b, r) {
    // a small rug, never the size of a cell (a full rug is a puzzle object)
    const [a, c] = [pick(r, CLOTH), pick(r, ['#efe6c8', '#f4efe4', '#e9d9b8'])];
    const w = 0.55 + r() * 0.15, d = 0.36;
    b.box(w, 0.008, d, 0, 0, 0, c, { jitter: 0, shadow: false });
    b.box(w - 0.08, 0.012, d - 0.08, 0, 0, 0, a, { jitter: 0, shadow: false });
    b.box(w - 0.22, 0.016, 0.06, 0, 0, 0, c, { jitter: 0, shadow: false });
  },
  hat(b, r) {
    const c = pick(r, ['#2a2523', '#7a3f2a', '#33405a', '#c9a24a']);
    b.cyl(0.15, 0.15, 0.015, 0, 0, 0, c, { seg: 16 });
    b.cyl(0.08, 0.09, 0.12, 0, 0.015, 0, c, { seg: 14 });
    b.cyl(0.092, 0.092, 0.025, 0, 0.03, 0, pick(r, CLOTH), { seg: 14 });
  },
  suitcase(b, r) {
    const c = pick(r, ['#7a3f2a', '#33405a', '#a8703f', '#3f6a4a']);
    b.box(0.4, 0.12, 0.28, 0, 0, 0, c, { round: 0.02 });
    b.box(0.41, 0.02, 0.29, 0, 0.06, 0, '#c9a24a', { metalness: 0.6 });
    b.box(0.1, 0.03, 0.02, 0, 0.12, 0.08, '#2a2523');
  },
  bucket(b, r) {
    b.cyl(0.12, 0.09, 0.18, 0, 0, 0, pick(r, ['#8e9aa6', '#a8703f']), { seg: 14, metalness: 0.4 });
    b.cyl(0.105, 0.105, 0.01, 0, 0.15, 0, '#5fa5b5', { seg: 14, roughness: 0.1 });
  },
  ball(b, r) {
    b.sphere(0.11, 0, 0.11, 0, pick(r, CLOTH), { seg: 14 });
    b.cbox(0.225, 0.03, 0.03, 0, 0.11, 0, '#f6f2ea', { ry: r() * 3, round: 0.012 });
  },
  jar(b, r) {
    const c = pick(r, ['#c9763a', '#b5523b', '#d9b47a']);
    b.sphere(0.12, 0, 0.13, 0, c, { sy: 1.15, seg: 12 });
    b.cyl(0.05, 0.07, 0.08, 0, 0.24, 0, c, { seg: 10 });
    if (r() < 0.6) b.cbox(0.1, 0.03, 0.04, 0.1, 0.22, 0, c, { rz: 0.8 });
  },
  rope(b) {
    for (let i = 0; i < 3; i++) b.cyl(0.16 - i * 0.04, 0.16 - i * 0.04, 0.04, 0, i * 0.04, 0, '#c9a46a', { seg: 16, roughness: 1 });
  },
  cannonballs(b) {
    const p = [[-0.07, 0, -0.04], [0.07, 0, -0.04], [0, 0, 0.08], [0, 0.11, 0]];
    for (const [x, y, z] of p) b.sphere(0.07, x, y + 0.07, z, '#2a2523', { seg: 10, metalness: 0.5 });
  },
  mugs(b, r) {
    for (const [x, z] of [[-0.07, 0], [0.08, 0.05]]) {
      const c = pick(r, CLOTH);
      b.cyl(0.045, 0.045, 0.1, x, 0, z, c, { seg: 12 });
      b.cbox(0.03, 0.06, 0.012, x + 0.055, 0.05, z, c);
      b.cyl(0.04, 0.04, 0.01, x, 0.09, z, '#6b3a1a', { seg: 12 });
    }
  },
  popcorn(b, r) {
    b.cyl(0.08, 0.06, 0.18, 0, 0, 0, '#d8263f', { seg: 12 });
    for (let i = 0; i < 7; i++) b.sphere(0.03, (r() - 0.5) * 0.1, 0.2 + r() * 0.04, (r() - 0.5) * 0.1, '#f8efc8', { seg: 6 });
  },
  canisters(b, r) {
    for (let i = 0; i < 2; i++) {
      const x = (i - 0.5) * 0.14;
      b.cyl(0.06, 0.06, 0.26, x, 0, 0, pick(r, ['#c9d1db', '#e0a040', '#5fb3a8']), { seg: 12, metalness: 0.6, roughness: 0.35 });
      b.cyl(0.035, 0.035, 0.03, x, 0.26, 0, '#2a2523', { seg: 8 });
    }
  },
  footprints(b, r) {
    // a trail of muddy footprints (pure atmosphere)
    const ry = r() * 6.28;
    for (let i = 0; i < 3; i++) b.cbox(0.06, 0.004, 0.11, Math.cos(ry) * i * 0.11 + (i % 2) * 0.05, 0.002, Math.sin(ry) * i * 0.11, '#4a3628', { ry: -ry + Math.PI / 2, shadow: false, jitter: 0 });
  },
  puddle(b, r) {
    // a knocked-over glass in a little spill
    b.cyl(0.14, 0.14, 0.004, 0, 0, 0, pick(r, ['#7a2a2a', '#5fa5b5', '#c9a24a']), { seg: 14, roughness: 0.05, shadow: false });
    b.cbox(0.05, 0.12, 0.05, 0.06, 0.03, 0.02, '#e8f0f2', { rz: 1.57, roughness: 0.1 });
  },
  roundMat(b, r) {
    const cs = [pick(r, CLOTH), pick(r, ['#efe6c8', '#f4efe4']), pick(r, CLOTH)];
    for (let i = 0; i < 3; i++) b.cyl(0.32 - i * 0.09, 0.32 - i * 0.09, 0.008 + i * 0.004, 0, 0, 0, cs[i], { seg: 22, jitter: 0, shadow: false });
  },
  runner(b, r) {
    const c = pick(r, CLOTH);
    b.box(0.3, 0.008, 0.85, 0, 0, 0, '#efe6c8', { jitter: 0, shadow: false });
    b.box(0.22, 0.012, 0.77, 0, 0, 0, c, { jitter: 0, shadow: false });
    for (let i = 0; i < 3; i++) b.cbox(0.08, 0.016, 0.08, 0, 0.006, -0.25 + i * 0.25, '#efe6c8', { ry: 0.785, jitter: 0, shadow: false });
  },
  stool(b, r) {
    const c = pick(r, WOOD);
    for (const [x, z] of [[-0.09, -0.09], [0.09, -0.09], [0, 0.11]]) b.cyl(0.018, 0.022, 0.26, x, 0, z, c, { seg: 6 });
    b.cyl(0.15, 0.15, 0.04, 0, 0.26, 0, c, { seg: 14 });
  },
  skis(b, r) {
    const c = pick(r, ['#c0283a', '#2f5d8a', '#f2c94c']);
    for (const x of [-0.05, 0.05]) { b.box(0.07, 0.015, 0.75, x, 0, 0, c); b.cbox(0.07, 0.015, 0.1, x, 0.03, 0.4, c, { rx: -0.5 }); }
    b.cyl(0.012, 0.012, 0.6, 0.15, 0.01, 0, '#2a2523', { rx: 1.57, seg: 5 });
  },
  horseshoe(b) {
    for (let i = 0; i < 7; i++) {
      const a = Math.PI * (i / 6);
      b.cbox(0.05, 0.02, 0.035, Math.cos(a) * 0.08, 0.01, Math.sin(a) * 0.08, '#8e8a82', { ry: -a, metalness: 0.6 });
    }
  },
  pins(b, r) {
    for (let i = 0; i < 3; i++) {
      const x = (i - 1) * 0.08, c = pick(r, CLOTH);
      b.cyl(0.03, 0.02, 0.18, x, 0, 0, '#f6f2ea', { seg: 8 });
      b.sphere(0.035, x, 0.2, 0, c, { seg: 8 });
      b.cyl(0.032, 0.032, 0.02, x, 0.1, 0, c, { seg: 8 });
    }
  },
  robot(b, r) {
    const c = pick(r, ['#c9d1db', '#e0a040', '#5fb3a8']);
    b.box(0.2, 0.18, 0.16, 0, 0.06, 0, c, { round: 0.03, metalness: 0.5 });
    b.box(0.14, 0.1, 0.12, 0, 0.25, 0, c, { round: 0.03, metalness: 0.5 });
    for (const x of [-0.035, 0.035]) b.sphere(0.018, x, 0.3, 0.062, '#5ad8ff', { emissive: '#2ab8ff', ei: 1.4, seg: 6 });
    for (const x of [-0.07, 0.07]) b.cyl(0.035, 0.035, 0.04, x, 0, 0, '#2a2f38', { rz: 1.57, seg: 10 });
    b.cyl(0.006, 0.006, 0.08, 0, 0.35, 0, '#2a2f38', { seg: 4 });
    b.sphere(0.018, 0, 0.44, 0, '#ff4a4a', { emissive: '#ff2020', ei: 1.4, seg: 6 });
  },
  cables(b, r) {
    for (let k = 0; k < 2; k++) {
      const c = pick(r, ['#c0283a', '#2f5d8a', '#2a2523', '#f2c94c']);
      for (let i = 0; i < 9; i++) b.cbox(0.06, 0.02, 0.02, Math.cos(i * 0.7 + k) * 0.12, 0.01, Math.sin(i * 0.9 + k) * 0.12, c, { ry: i * 0.7 + k, jitter: 0 });
    }
  },
  sandals(b, r) {
    const c = pick(r, ['#c9a46a', '#7a5a3a', '#c0283a']);
    for (const x of [-0.06, 0.06]) { b.box(0.08, 0.025, 0.2, x, 0, 0, c, { round: 0.01 }); b.box(0.06, 0.012, 0.012, x, 0.025, 0.05, '#2a2523'); }
  },
  grapes(b, r) {
    const c = pick(r, ['#6a2a6a', '#8ab04a']);
    b.cyl(0.13, 0.11, 0.02, 0, 0, 0, '#c9a24a', { seg: 14, metalness: 0.6 });
    for (let i = 0; i < 12; i++) b.sphere(0.025, (r() - 0.5) * 0.12, 0.04 + (i % 3) * 0.025, (r() - 0.5) * 0.1, c, { seg: 6 });
  },
  letters(b, r) {
    for (let i = 0; i < 3; i++) {
      b.cbox(0.16, 0.006, 0.11, (r() - 0.5) * 0.12, 0.004 + i * 0.006, (r() - 0.5) * 0.12, '#f6efdc', { ry: r() * 3, shadow: false });
    }
    b.cyl(0.018, 0.018, 0.008, 0.02, 0.022, 0.01, '#a33b2b', { seg: 8 });
  },
  paperLantern(b, r) {
    const c = pick(r, ['#e8492c', '#f2c94c', '#f6efdc']);
    b.sphere(0.11, 0, 0.13, 0, c, { sy: 1.25, seg: 12, emissive: c, ei: 0.35 });
    b.cyl(0.05, 0.05, 0.02, 0, 0, 0, '#2a2523', { seg: 8 });
    b.cyl(0.05, 0.05, 0.02, 0, 0.26, 0, '#2a2523', { seg: 8 });
  },
  eggs(b, r) {
    // Nid de paille et œufs peints
    b.cyl(0.13, 0.1, 0.05, 0, 0, 0, '#c9a46a', { seg: 12 });
    for (let i = 0; i < 4; i++) b.sphere(0.045, Math.cos(i * 1.6 + r()) * 0.06, 0.08, Math.sin(i * 1.6 + r()) * 0.06, pick(r, ['#f2a6c0', '#9ad0e0', '#f6e08a', '#b7d98a', '#c8a0e0']), { sy: 1.3, seg: 10, roughness: 0.4 });
  },
  confetti(b, r) {
    for (let i = 0; i < 14; i++) b.cbox(0.035, 0.006, 0.022, (r() - 0.5) * 0.36, 0.003, (r() - 0.5) * 0.36, pick(r, CLOTH), { ry: r() * 3.14, jitter: 0, shadow: false });
  },
  firecrackers(b, r) {
    for (let i = 0; i < 5; i++) {
      const x = (i - 2) * 0.042, h = 0.14 + r() * 0.04;
      b.cyl(0.02, 0.02, h, x, 0, 0, '#c0283a', { seg: 8 });
      b.cyl(0.021, 0.021, 0.02, x, h - 0.02, 0, '#e0b23a', { seg: 8, metalness: 0.6 });
    }
  },
  scarab(b) {
    b.sphere(0.07, 0, 0.03, 0, '#2f8a6a', { sy: 0.5, seg: 10, metalness: 0.6, roughness: 0.3 });
    b.sphere(0.035, 0, 0.025, 0.08, '#1f5a4a', { seg: 8, metalness: 0.6 });
  },
  fishbones(b) {
    b.box(0.26, 0.012, 0.015, 0, 0.005, 0, '#efe6d0');
    for (let i = 0; i < 6; i++) b.cbox(0.012, 0.012, 0.09, -0.08 + i * 0.03, 0.005, 0, '#efe6d0');
    b.cbox(0.06, 0.015, 0.06, 0.15, 0.008, 0, '#efe6d0', { ry: 0.785 });
  },
  birdcage(b) {
    b.cyl(0.1, 0.1, 0.02, 0, 0, 0, '#c9a24a', { seg: 12, metalness: 0.7 });
    for (let i = 0; i < 10; i++) b.cyl(0.005, 0.005, 0.26, Math.cos(i * 0.628) * 0.09, 0.02, Math.sin(i * 0.628) * 0.09, '#c9a24a', { seg: 4, metalness: 0.7 });
    b.sphere(0.1, 0, 0.27, 0, '#c9a24a', { sy: 0.5, seg: 10, metalness: 0.7 });
    b.sphere(0.035, 0, 0.1, 0, '#f2c94c', { seg: 8 });
  },
  umbrella(b, r) {
    const c = pick(r, CLOTH);
    b.cyl(0.008, 0.008, 0.6, 0, 0.02, 0, '#2a2523', { rz: 1.3, seg: 4 });
    b.cyl(0.0, 0.08, 0.36, -0.12, 0.08, 0, c, { rz: 1.3, seg: 8 });
  },
};
for (const [k, fn] of Object.entries(PLANTS)) if (['fern', 'flowers', 'tuft', 'bush', 'bonsai', 'kelp', 'cactus', 'dryBush'].includes(k)) PROPS[`plant_${k}`] = fn;

// Props on the floor and on table tops, by room type
const FLOOR = {
  living: ['books', 'cushion', 'mat', 'roundMat', 'vase', 'ball', 'papers', 'mugs', 'stool', 'birdcage'],
  kitchen: ['sack', 'bread', 'crate', 'bucket', 'jar', 'fruitBowl', 'cheese', 'stool', 'runner'],
  bedroom: ['cushion', 'books', 'hat', 'suitcase', 'mat', 'roundMat', 'papers', 'letters'],
  bathroom: ['bucket', 'mat', 'bottles', 'cushion', 'roundMat'],
  office: ['papers', 'books', 'scroll', 'crate', 'mugs', 'letters', 'stool'],
  library: ['books', 'books', 'scroll', 'papers', 'candles', 'cushion', 'runner', 'letters'],
  dining: ['bottles', 'crate', 'jar', 'mat', 'fruitBowl', 'runner', 'stool'],
  garden: ['rocks', 'mushrooms', 'ball', 'hay', 'logs', 'plant_flowers', 'plant_tuft', 'plant_fern', 'plant_bush'],
  hall: ['suitcase', 'hat', 'mat', 'footprints', 'crate', 'runner', 'umbrella'],
  music: ['papers', 'candles', 'cushion', 'mat', 'roundMat', 'vase'],
  guest: ['suitcase', 'cushion', 'books', 'hat', 'roundMat'],
  game: ['ball', 'bottles', 'cushion', 'papers', 'mugs', 'pins', 'stool'],
  veranda: ['vase', 'cushion', 'rocks', 'hat', 'mugs', 'plant_flowers', 'birdcage'],
  laundry: ['bucket', 'sack', 'crate', 'mat', 'runner'],
};
// Open-air areas (beach, dunes, pistes…): mostly plants and stones
const OUTDOOR = ['rocks', 'plant_tuft', 'plant_flowers', 'plant_fern', 'mushrooms', 'plant_tuft', 'footprints', 'plant_bush'];
const TOP = ['plate', 'plate', 'fruitBowl', 'cake', 'teaset', 'bottles', 'candles', 'books', 'cheese', 'bread', 'vase', 'mugs', 'papers', 'grapes', 'letters'];
// Theme extras (puzzle.theme), mixed in with the room props
const THEME = {
  mermaids: ['shells', 'pearls', 'coral', 'shells', 'coral', 'plant_kelp', 'fishbones', 'coins'],
  japan: ['teaset', 'lantern', 'paperLantern', 'cushion', 'scroll', 'sandals', 'plant_bonsai', 'roundMat'],
  paris: ['bread', 'cheese', 'bottles', 'papers', 'books', 'umbrella', 'letters', 'plant_flowers'],
  regency: ['teaset', 'cake', 'vase', 'hat', 'letters', 'birdcage', 'plant_flowers', 'runner'],
  egypt: ['jar', 'scroll', 'coins', 'jar', 'scarab', 'sandals', 'plant_dryBush', 'grapes'],
  pirates: ['barrel', 'crate', 'coins', 'rope', 'cannonballs', 'bottles', 'fishbones', 'birdcage'],
  western: ['hay', 'barrel', 'bottles', 'hat', 'sack', 'horseshoe', 'plant_cactus', 'stool'],
  space: ['canisters', 'crate', 'papers', 'canisters', 'robot', 'cables', 'robot'],
  haunted: ['pumpkin', 'candles', 'bones', 'books', 'footprints', 'birdcage', 'mushrooms', 'puddle'],
  medieval: ['barrel', 'sack', 'bread', 'candles', 'hay', 'stool', 'logs'],
  prehistory: ['bones', 'rocks', 'mushrooms', 'logs', 'hay', 'plant_fern', 'fishbones'],
  circus: ['ball', 'popcorn', 'hat', 'cushion', 'ball', 'pins', 'roundMat'],
  train: ['suitcase', 'papers', 'bottles', 'hat', 'suitcase', 'letters', 'umbrella'],
  chalet: ['logs', 'mugs', 'books', 'cushion', 'skis', 'roundMat'],
  world: ['suitcase', 'hat', 'fruitBowl', 'coins', 'letters', 'umbrella', 'paperLantern'],
  rome: ['jar', 'fruitBowl', 'scroll', 'coins', 'grapes', 'sandals', 'roundMat'],
  halloween: ['pumpkin', 'pumpkin', 'candles', 'mushrooms', 'cake', 'footprints', 'hay'],
  easter: ['eggs', 'eggs', 'cake', 'plant_flowers', 'teaset', 'hay', 'roundMat'],
  carnival: ['confetti', 'confetti', 'hat', 'cake', 'bottles', 'cushion', 'runner'],
  lunar: ['paperLantern', 'lantern', 'teaset', 'firecrackers', 'coins', 'scroll', 'plant_bonsai'],
  manor: ['books', 'teaset', 'candles', 'vase', 'puddle', 'letters', 'birdcage'],
};
// Props small enough for a table top
const SMALL = new Set([...TOP, 'coins', 'pearls', 'shells', 'scroll', 'jar', 'lantern', 'popcorn', 'canisters', 'pumpkin', 'hat', 'grapes', 'letters', 'scarab', 'paperLantern', 'birdcage', 'eggs', 'firecrackers']);
const AMOUNT = { none: 0, some: 0.4, lots: 0.85 };
const FLOOR_SCALE = 1.35;

/**
 * Builds the decor of a board into one Builder group.
 * @param {any} puzzle
 * @param {{ n: number, cells: any[][], cellCenter: Function, roomType: Function, isOpen?: Function, plates?: Set<string>, spots: Map<string, number[][]>, clutter?: string }} o
 */
export function buildClutter(puzzle, o) {
  const amount = AMOUNT[o.clutter] ?? AMOUNT.some;
  if (!amount) return null;
  const r = rng(((puzzle.seed ?? 1) >>> 0) * 977 + 13);
  seedBuilders(((puzzle.seed ?? 1) >>> 0) + 4242);
  const main = new Builder();
  const extra = THEME[puzzle.theme] ?? THEME.manor;
  const put = (name, x, y, z, ry, s = 1) => {
    seedBuilders(Math.floor(r() * 1e9));
    const sub = new Builder();
    PROPS[name](sub, r);
    if (name.startsWith('plant_')) s *= 0.55;
    if (s !== 1) for (const bk of sub.buckets.values()) for (const g of bk.gs) g.scale(s, s, s);
    main.merge(sub, ry, x, y, z);
  };
  const corners = [[-1, -1], [1, -1], [-1, 1], [1, 1]];
  for (let rr = 0; rr < o.n; rr++)
    for (let cc = 0; cc < o.n; cc++) {
      const cell = o.cells[rr][cc];
      const p = o.cellCenter(o.n, rr, cc);
      const type = o.roomType(rr, cc);
      // On top of a table, desk, counter or cabinet: food and things
      const tops = o.spots.get(`${rr},${cc}`);
      if (tops) {
        for (const [x, y, z] of tops) if (r() < Math.min(0.95, amount * 1.7)) put(pick(r, r() < 0.3 ? extra.filter((e) => SMALL.has(e)).concat(TOP) : TOP), x, y, z, r() * 6.28, 0.75);
        continue;
      }
      if (cell.object) continue; // beds, sofas, rugs, plants… fill the cell already
      // On the floor: one or two props in the corners (people stand in the middle)
      const n = r() < amount ? (r() < amount * 0.55 ? (r() < amount * 0.3 ? 3 : 2) : 1) : 0;
      // keep the back corners clear under a room-name plate
      const plate = o.plates?.has(`${rr},${cc}`);
      const free = corners.filter(([, sz]) => !plate || sz > 0).sort(() => r() - 0.5);
      const open = o.isOpen?.(rr, cc);
      const pool = open ? [...OUTDOOR, ...OUTDOOR, ...extra] : [...(FLOOR[type] ?? FLOOR.living), ...extra, ...extra];
      for (let i = 0; i < Math.min(n, free.length); i++) {
        const [sx, sz] = free[i];
        const off = 0.56 + r() * 0.06;
        put(pick(r, pool), p.x + sx * off, 0.005, p.z + sz * off, r() * 6.28, FLOOR_SCALE);
      }
    }
  const group = main.build();
  group.name = 'clutter';
  return group;
}
