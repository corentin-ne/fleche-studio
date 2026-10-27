// Handmade geometry, shared materials, painterly foliage and pattern textures.
// Adapted from building-builder (src/geo.js, "House Builder" by the same author):
// copied almost verbatim; only the board renderer's needs were kept in mind.

import * as THREE from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';

// ---------- deterministic randomness ----------
export function hashStr(s) {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

export function rng(seed) {
  let a = typeof seed === 'string' ? hashStr(seed) : seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// ---------- hand-made wobble ----------
// Every material bends its vertices with a smooth world-space noise, so long
// straight edges sag and lean a little like a hand-built model.
export const WOBBLE = { value: 1 };
const NOISE_GLSL = /* glsl */ `
uniform float uWobble;
float hb3(vec3 p){ return fract(sin(dot(p, vec3(127.1, 311.7, 74.7))) * 43758.5453); }
float vnoise(vec3 p){
  vec3 i = floor(p), f = fract(p); f = f * f * (3.0 - 2.0 * f);
  return mix(mix(mix(hb3(i), hb3(i + vec3(1,0,0)), f.x), mix(hb3(i + vec3(0,1,0)), hb3(i + vec3(1,1,0)), f.x), f.y),
             mix(mix(hb3(i + vec3(0,0,1)), hb3(i + vec3(1,0,1)), f.x), mix(hb3(i + vec3(0,1,1)), hb3(i + vec3(1,1,1)), f.x), f.y), f.z) * 2.0 - 1.0;
}
`;
const WOBBLE_VERTEX = /* glsl */ `#include <begin_vertex>
{
  vec3 wp = (modelMatrix * vec4(transformed, 1.0)).xyz;
  vec3 q = wp * 0.45;
  vec3 w = uWobble * vec3(0.045 * vnoise(q), 0.03 * vnoise(q + 11.3), 0.045 * vnoise(q + 27.1))
         + uWobble * 0.012 * vec3(vnoise(wp * 2.1 + 5.0), vnoise(wp * 2.1 + 9.0), vnoise(wp * 2.1 + 13.0));
  // flat on the floor (floors, rugs, mats, footprints): no vertical sag. Meshes of
  // different density bend differently, and what lies just under would show through
  // as dark blots.
  w.y *= smoothstep(0.02, 0.3, abs(wp.y));
  transformed += w;
}`;
export function handmade(m) {
  m.onBeforeCompile = (sh) => {
    sh.uniforms.uWobble = WOBBLE;
    sh.vertexShader = NOISE_GLSL + sh.vertexShader.replace('#include <begin_vertex>', WOBBLE_VERTEX);
  };
  m.customProgramCacheKey = () => 'handmade';
  return m;
}

// ---------- shared materials ----------
const matCache = new Map();
export function mat(color, o = {}) {
  const key = `${color}|${o.roughness ?? ''}|${o.metalness ?? ''}|${o.emissive ?? ''}|${o.ei ?? ''}|${o.opacity ?? ''}|${o.flat ? 1 : 0}|${o.vc ? 1 : 0}|${o.side ?? ''}`;
  let m = matCache.get(key);
  if (!m) {
    m = new THREE.MeshStandardMaterial({
      color: new THREE.Color(color),
      roughness: o.roughness ?? 0.92,
      metalness: o.metalness ?? 0,
      emissive: new THREE.Color(o.emissive ?? 0x000000),
      emissiveIntensity: o.ei ?? 1,
      transparent: (o.opacity ?? 1) < 1,
      opacity: o.opacity ?? 1,
      flatShading: !!o.flat,
      vertexColors: !!o.vc,
      side: o.side ?? THREE.FrontSide,
      depthWrite: (o.opacity ?? 1) >= 1,
    });
    handmade(m);
    m.userData.shared = true;
    matCache.set(key, m);
  }
  return m;
}

function paint(g, color) {
  const c = _paint.set(color);
  const n = g.attributes.position.count;
  const a = new Float32Array(n * 3);
  for (let i = 0; i < n; i++) {
    a[i * 3] = c.r;
    a[i * 3 + 1] = c.g;
    a[i * 3 + 2] = c.b;
  }
  g.setAttribute('color', new THREE.BufferAttribute(a, 3));
}
const _paint = new THREE.Color();

// ---------- geometry helpers ----------
// Rectangular frustum: base w×d at y=0, top tw×td at y=h. Flat shaded.
export function frustumGeometry(w, d, tw, td, h) {
  const b = [[-w / 2, 0, -d / 2], [w / 2, 0, -d / 2], [w / 2, 0, d / 2], [-w / 2, 0, d / 2]];
  const t = [[-tw / 2, h, -td / 2], [tw / 2, h, -td / 2], [tw / 2, h, td / 2], [-tw / 2, h, td / 2]];
  const quads = [
    [b[3], b[2], t[2], t[3]],
    [b[2], b[1], t[1], t[2]],
    [b[1], b[0], t[0], t[1]],
    [b[0], b[3], t[3], t[0]],
    [t[3], t[2], t[1], t[0]],
    [b[0], b[1], b[2], b[3]],
  ];
  const pos = [];
  const uv = [];
  for (const [a, bb, c, dd] of quads) {
    pos.push(...a, ...bb, ...c, ...a, ...c, ...dd);
    uv.push(0, 0, 1, 0, 1, 1, 0, 0, 1, 1, 0, 1);
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  g.setAttribute('uv', new THREE.Float32BufferAttribute(uv, 2));
  g.computeVertexNormals();
  return g;
}

// Triangular prism (gable): base w×d, ridge along x at height h.
export function gableGeometry(w, d, h) {
  const s = new THREE.Shape();
  s.moveTo(-d / 2, 0);
  s.lineTo(d / 2, 0);
  s.lineTo(0, h);
  s.closePath();
  const g = new THREE.ExtrudeGeometry(s, { depth: w, bevelEnabled: false });
  g.rotateY(Math.PI / 2);
  g.translate(-w / 2, 0, 0);
  return g;
}

// Split long triangle edges so the wobble shader has vertices to bend.
// Longest-edge bisection on flat typed arrays: vertices live interleaved in
// one growing arena, midpoints are appended to it and the result is indexed,
// so the subdivided pieces of a triangle share their vertices.
const ATTRS = ['position', 'normal', 'uv', 'color'];
export function tessellate(g, maxEdge = 0.45) {
  const P = g.attributes.position.array;
  let x0 = Infinity, y0 = Infinity, z0 = Infinity, x1 = -Infinity, y1 = -Infinity, z1 = -Infinity;
  for (let i = 0; i < P.length; i += 3) {
    const x = P[i], y = P[i + 1], z = P[i + 2];
    if (x < x0) x0 = x; if (x > x1) x1 = x;
    if (y < y0) y0 = y; if (y > y1) y1 = y;
    if (z < z0) z0 = z; if (z > z1) z1 = z;
  }
  if (Math.max(x1 - x0, y1 - y0, z1 - z0) <= maxEdge) return g;
  const names = ATTRS.filter((n) => g.attributes[n]);
  const isz = names.map((n) => g.attributes[n].itemSize);
  const stride = isz.reduce((a, b) => a + b, 0);
  const count = g.attributes.position.count;
  let V = new Float32Array(Math.max(count * stride * 4, 256));
  let off = 0;
  for (let k = 0; k < names.length; k++) {
    const arr = g.attributes[names[k]].array, n = isz[k];
    for (let i = 0; i < count; i++) for (let j = 0; j < n; j++) V[i * stride + off + j] = arr[i * n + j];
    off += n;
  }
  let nv = count;
  const max2 = maxEdge * maxEdge;
  let out = new Uint32Array(Math.max(64, (g.index ? g.index.count : count) * 4));
  let no = 0;
  let stack = new Int32Array(256);
  const d2 = (a, b) => {
    const pa = a * stride, pb = b * stride;
    const dx = V[pa] - V[pb], dy = V[pa + 1] - V[pb + 1], dz = V[pa + 2] - V[pb + 2];
    return dx * dx + dy * dy + dz * dz;
  };
  const mid = (a, b) => {
    if ((nv + 1) * stride > V.length) {
      const bigger = new Float32Array(V.length * 2);
      bigger.set(V);
      V = bigger;
    }
    const pa = a * stride, pb = b * stride, pm = nv * stride;
    for (let k = 0; k < stride; k++) V[pm + k] = (V[pa + k] + V[pb + k]) * 0.5;
    return nv++;
  };
  const idx = g.index?.array;
  const tris = idx ? idx.length / 3 : count / 3;
  for (let t = 0; t < tris; t++) {
    let sp = 0;
    stack[sp++] = idx ? idx[t * 3] : t * 3;
    stack[sp++] = idx ? idx[t * 3 + 1] : t * 3 + 1;
    stack[sp++] = idx ? idx[t * 3 + 2] : t * 3 + 2;
    stack[sp++] = 0;
    while (sp) {
      const depth = stack[--sp], c = stack[--sp], b = stack[--sp], a = stack[--sp];
      const e0 = d2(a, b), e1 = d2(b, c), e2 = d2(c, a);
      const m = Math.max(e0, e1, e2);
      if (m <= max2 || depth > 9) {
        if (no + 3 > out.length) {
          const bigger = new Uint32Array(out.length * 2);
          bigger.set(out);
          out = bigger;
        }
        out[no++] = a; out[no++] = b; out[no++] = c;
        continue;
      }
      if (sp + 8 > stack.length) {
        const bigger = new Int32Array(stack.length * 2);
        bigger.set(stack);
        stack = bigger;
      }
      const d = depth + 1;
      if (m === e0) {
        const p = mid(a, b);
        stack[sp++] = p; stack[sp++] = b; stack[sp++] = c; stack[sp++] = d;
        stack[sp++] = a; stack[sp++] = p; stack[sp++] = c; stack[sp++] = d;
      } else if (m === e1) {
        const p = mid(b, c);
        stack[sp++] = a; stack[sp++] = p; stack[sp++] = c; stack[sp++] = d;
        stack[sp++] = a; stack[sp++] = b; stack[sp++] = p; stack[sp++] = d;
      } else {
        const p = mid(c, a);
        stack[sp++] = p; stack[sp++] = b; stack[sp++] = c; stack[sp++] = d;
        stack[sp++] = a; stack[sp++] = b; stack[sp++] = p; stack[sp++] = d;
      }
    }
  }
  const r = new THREE.BufferGeometry();
  off = 0;
  for (let k = 0; k < names.length; k++) {
    const n = isz[k], a = new Float32Array(nv * n);
    for (let i = 0; i < nv; i++) for (let j = 0; j < n; j++) a[i * n + j] = V[i * stride + off + j];
    r.setAttribute(names[k], new THREE.BufferAttribute(a, n));
    off += n;
  }
  r.setIndex(new THREE.BufferAttribute(nv > 65535 ? out.slice(0, no) : Uint16Array.from(out.subarray(0, no)), 1));
  g.dispose();
  return r;
}

// Geometry stays indexed (built-in shapes already share vertices per face),
// which keeps vertex counts and uploads small.
function prep(g, tess, uv) {
  for (const name of Object.keys(g.attributes)) {
    if (!ATTRS.includes(name)) g.deleteAttribute(name);
  }
  if (!g.attributes.normal) g.computeVertexNormals();
  // untextured surfaces never read UVs: drop them (less memory, faster upload)
  if (!uv) g.deleteAttribute('uv');
  else if (!g.attributes.uv) {
    g.setAttribute('uv', new THREE.Float32BufferAttribute(new Float32Array(g.attributes.position.count * 2), 2));
  }
  g.clearGroups();
  const out = tess ? tessellate(g) : g;
  if (!out.index) {
    const n = out.attributes.position.count;
    const a = n > 65535 ? new Uint32Array(n) : new Uint16Array(n);
    for (let i = 0; i < n; i++) a[i] = i;
    out.setIndex(new THREE.BufferAttribute(a, 1));
  }
  return out;
}

// Collects primitives per material and merges them into a few meshes.
// Every part gets a tiny seeded tilt / offset so nothing is perfectly square.
let builderSeed = 1;
let builderCount = 0;
const _v = new THREE.Vector3();
const _m4 = new THREE.Matrix4();
const _r4 = new THREE.Matrix4();
export function seedBuilders(seed) {
  builderSeed = seed;
  builderCount = 0;
}
export class Builder {
  constructor() {
    this.group = new THREE.Group();
    this.buckets = new Map();
    this.r = rng(builderSeed * 131 + ++builderCount);
  }
  // Colours are baked into vertex colours, so every part sharing the same surface
  // kind (roughness, metalness, glow, opacity) merges into one mesh: a whole
  // building bay becomes a handful of draw calls instead of dozens.
  geo(g, color, o = {}) {
    let m = o.material;
    if (!m) {
      if (!o.vc) paint(g, color);
      m = mat('#ffffff', { ...o, vc: true });
    }
    const tess = !o.vc && o.tess !== false;
    const shadow = o.shadow ?? true;
    const key = `${m.uuid}|${tess}|${shadow}`;
    let b = this.buckets.get(key);
    if (!b) this.buckets.set(key, (b = { m, gs: [], shadow, tess }));
    b.gs.push(g);
    return g;
  }
  // Fold another builder's parts into this one (rotated about Y, then moved).
  merge(sub, ry = 0, x = 0, y = 0, z = 0) {
    const mtx = new THREE.Matrix4().makeRotationY(ry).setPosition(x, y, z);
    for (const [key, bk] of sub.buckets) {
      let b = this.buckets.get(key);
      if (!b) this.buckets.set(key, (b = { m: bk.m, gs: [], shadow: bk.shadow, tess: bk.tess }));
      for (const g of bk.gs) b.gs.push(g.applyMatrix4(mtx));
    }
    sub.buckets.clear();
    if (sub.group.children.length) {
      sub.group.rotation.y = ry;
      sub.group.position.set(x, y, z);
      this.group.add(sub.group);
    }
    return this;
  }
  // size: the part's extent when the caller knows it, so no bounding box pass.
  // All rotations and the move are folded into one matrix (one pass over the
  // vertices instead of up to seven, each recomputing the bounding box).
  _place(g, x, y, z, o, size) {
    const r = this.r;
    if (!size) {
      g.computeBoundingBox();
      const s = g.boundingBox.getSize(_v);
      size = [s.x, s.y, s.z];
    }
    // big parts lean less (a 10 m slab tilting 0.4° would poke through things)
    const j = (o.jitter ?? 1) * Math.min(1, 1.2 / Math.max(size[0], size[1], size[2], 0.01));
    const m = _m4.identity();
    if (j) {
      m.premultiply(_r4.makeRotationX((r() - 0.5) * 0.014 * j));
      m.premultiply(_r4.makeRotationZ((r() - 0.5) * 0.014 * j));
      m.premultiply(_r4.makeRotationY((r() - 0.5) * 0.02 * j));
    }
    if (o.rx) m.premultiply(_r4.makeRotationX(o.rx));
    if (o.rz) m.premultiply(_r4.makeRotationZ(o.rz));
    if (o.ry) m.premultiply(_r4.makeRotationY(o.ry));
    m.premultiply(_r4.makeTranslation(x + (r() - 0.5) * 0.01 * j, y, z + (r() - 0.5) * 0.01 * j));
    g.boundingBox = null;
    g.boundingSphere = null;
    g.applyMatrix4(m);
    return g;
  }
  _boxGeo(w, h, d, o) {
    w = Math.max(w, 0.001); h = Math.max(h, 0.001); d = Math.max(d, 0.001);
    if (o.round) {
      const rad = Math.min(o.round, w / 2.05, h / 2.05, d / 2.05);
      return new RoundedBoxGeometry(w, h, d, 3, rad);
    }
    return new THREE.BoxGeometry(w, h, d);
  }
  // Box with its base at y.
  box(w, h, d, x, y, z, color, o = {}) {
    return this.geo(this._place(this._boxGeo(w, h, d, o), x, y + h / 2, z, o, [w, h, d]), color, o);
  }
  // Box centered at (x,y,z) (useful for rotated parts).
  cbox(w, h, d, x, y, z, color, o = {}) {
    return this.geo(this._place(this._boxGeo(w, h, d, o), x, y, z, o, [w, h, d]), color, o);
  }
  cyl(rt, rb, h, x, y, z, color, o = {}) {
    const g = new THREE.CylinderGeometry(rt, rb, h, o.seg ?? 16, Math.max(1, Math.ceil(h / 0.4)), false, o.t0 ?? 0, o.tl ?? Math.PI * 2);
    return this.geo(this._place(g, x, o.center ? y : y + h / 2, z, o), color, o);
  }
  sphere(r, x, y, z, color, o = {}) {
    const g = new THREE.SphereGeometry(r, o.seg ?? 16, Math.max(6, Math.round((o.seg ?? 16) * 0.7)));
    if (o.sy) g.scale(1, o.sy, 1);
    return this.geo(this._place(g, x, y, z, o), color, o);
  }
  // Outline rectangle (moulding) in the XY plane facing +z.
  frame(w, h, t, x, y, z, color, depth = 0.03, o = {}) {
    this.box(w, t, depth, x, y, z, color, o);
    this.box(w, t, depth, x, y + h - t, z, color, o);
    this.box(t, h - 2 * t, depth, x - w / 2 + t / 2, y + t, z, color, o);
    this.box(t, h - 2 * t, depth, x + w / 2 - t / 2, y + t, z, color, o);
  }
  add(obj) {
    this.group.add(obj);
    return obj;
  }
  build() {
    for (const { m, gs, shadow, tess } of this.buckets.values()) {
      const merged = mergeGeometries(gs.map((g) => prep(g, tess, !!m.map)), false);
      gs.forEach((g) => g.dispose());
      if (!merged) continue;
      merged.computeBoundingSphere();
      const mesh = new THREE.Mesh(merged, m);
      mesh.castShadow = shadow && !m.transparent;
      // leaf cards: the shadow follows the leaves, not the card
      if (m.alphaTest > 0) mesh.customDepthMaterial = depthFor(m);
      mesh.receiveShadow = true;
      this.group.add(mesh);
    }
    this.buckets.clear();
    return this.group;
  }
}

// ---------- painterly foliage ----------
export const PALETTES = {
  green: ['#2f5e2c', '#3f7a35', '#5a9440', '#7cae4f', '#a9c96c'],
  lime: ['#557f2e', '#76a03c', '#98bd50', '#bcd673', '#dfe9a4'],
  dark: ['#1d3a26', '#27502f', '#346638', '#4a7d45', '#67965a'],
  olive: ['#4b5a2a', '#647534', '#7f9042', '#9eab5c', '#c1c886'],
  autumn: ['#7a3b1a', '#a2531f', '#c9762a', '#e0a33a', '#f0c75a'],
  blossom: ['#b85c84', '#d77aa1', '#e99bbb', '#f4bfd3', '#fbe0ea'],
  tropical: ['#1f5a2e', '#2f7a3a', '#3f9a45', '#6cbf4f', '#a5d867'],
  pine: ['#163a2e', '#1f4d3a', '#2a6046', '#3a7553', '#5a8f68'],
  kelp: ['#2a4a2a', '#3f6a32', '#5a8a3a', '#7aa84a', '#a8c46a'],
  coral: ['#a8445a', '#d0607a', '#ec8a9a', '#f6b0b8', '#fbd6d8'],
  dry: ['#6a6a3a', '#8a8448', '#a8a05a', '#c4ba74', '#ddd49a'],
};

const ICO0 = new THREE.IcosahedronGeometry(1, 0).attributes.position.array.slice();
const _c = new THREE.Color();
const _n = new THREE.Vector3();
const _m = new THREE.Vector3();
const _a = new THREE.Vector3();
const _b = new THREE.Vector3();
const _t = new THREE.Vector3();
const UP = new THREE.Vector3(0, 1, 0);

function pushVert(acc, x, y, z, nx, ny, nz, c, shade = 1) {
  acc.pos.push(x, y, z);
  acc.nor.push(nx, ny, nz);
  acc.col.push(c.r * shade, c.g * shade, c.b * shade);
  return acc.pos.length / 3 - 1;
}

// Soft normal: blend the face normal with the direction away from the plant's centre,
// so thousands of small leaves still shade like one painted mass.
function softNormal(x, y, z, fn, mass) {
  _m.set(x - mass.x, (y - mass.y) * 0.75, z - mass.z).normalize();
  return _n.copy(fn).lerp(_m, mass.blend).normalize();
}

// A single leaf card: a slightly cupped diamond, front face pointing along `n`.
function leaf(acc, p, n, len, wid, color, mass, r) {
  _t.set(r() - 0.5, r() - 0.5, r() - 0.5);
  _a.copy(_t).addScaledVector(n, -_t.dot(n));
  if (_a.lengthSq() < 1e-6) _a.set(1, 0, 0);
  _a.normalize();
  _b.crossVectors(n, _a);
  const cup = len * 0.12;
  const base = [p.x - _a.x * len * 0.4, p.y - _a.y * len * 0.4, p.z - _a.z * len * 0.4];
  const tip = [p.x + _a.x * len * 0.6 + n.x * cup, p.y + _a.y * len * 0.6 + n.y * cup, p.z + _a.z * len * 0.6 + n.z * cup];
  const L = [p.x + _b.x * wid * 0.5 + n.x * cup, p.y + _b.y * wid * 0.5 + n.y * cup, p.z + _b.z * wid * 0.5 + n.z * cup];
  const R = [p.x - _b.x * wid * 0.5 + n.x * cup, p.y - _b.y * wid * 0.5 + n.y * cup, p.z - _b.z * wid * 0.5 + n.z * cup];
  _c.set(color);
  const fn = n.clone();
  // four corners, two triangles sharing the base and the tip
  const ids = [];
  for (const [v, sh] of [[base, 0.85], [tip, 1.08], [L, 1], [R, 0.97]]) {
    const sn = softNormal(v[0], v[1], v[2], fn, mass);
    ids.push(pushVert(acc, v[0], v[1], v[2], sn.x, sn.y, sn.z, _c, sh));
  }
  acc.idx.push(ids[0], ids[1], ids[2], ids[0], ids[3], ids[1]);
}

// Dark low-poly core so you never see through the leaves.
function core(acc, cx, cy, cz, rx, ry, rz, color, mass) {
  _c.set(color);
  for (let i = 0; i < ICO0.length; i += 3) {
    const x = cx + ICO0[i] * rx, y = cy + ICO0[i + 1] * ry, z = cz + ICO0[i + 2] * rz;
    _t.set(ICO0[i], ICO0[i + 1], ICO0[i + 2]);
    const sn = softNormal(x, y, z, _t, mass);
    acc.idx.push(pushVert(acc, x, y, z, sn.x, sn.y, sn.z, _c, 0.55));
  }
}

function foliageGeometry(acc) {
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(acc.pos, 3));
  g.setAttribute('normal', new THREE.Float32BufferAttribute(acc.nor, 3));
  g.setAttribute('color', new THREE.Float32BufferAttribute(acc.col, 3));
  // cores and leaves sample the dense middle of the leaf texture; cards map it whole
  while (acc.uv.length < (acc.pos.length / 3) * 2) acc.uv.push(0.5, 0.5);
  g.setAttribute('uv', new THREE.Float32BufferAttribute(acc.uv, 2));
  g.setIndex(acc.idx);
  return g;
}

// One leaf card: a square of size `size` centred on p, facing n, rolled by `roll`.
const _white = new THREE.Color('#ffffff');
function card(acc, p, n, size, roll, tint, mass) {
  _t.set(Math.cos(roll), Math.sin(roll), 0.3);
  _a.copy(_t).addScaledVector(n, -_t.dot(n));
  if (_a.lengthSq() < 1e-6) _a.set(1, 0, 0);
  _a.normalize().multiplyScalar(size / 2);
  _b.crossVectors(n, _a);
  while (acc.uv.length < (acc.pos.length / 3) * 2) acc.uv.push(0.5, 0.5);
  const ids = [];
  for (const [sa, sb, u, v] of [[-1, -1, 0, 0], [1, -1, 1, 0], [1, 1, 1, 1], [-1, 1, 0, 1]]) {
    const x = p.x + _a.x * sa + _b.x * sb, y = p.y + _a.y * sa + _b.y * sb, z = p.z + _a.z * sa + _b.z * sb;
    const sn = softNormal(x, y, z, n, { ...mass, blend: 0.75 });
    ids.push(pushVert(acc, x, y, z, sn.x, sn.y, sn.z, _white, tint * (0.92 + (y - mass.y) * 0.25)));
    acc.uv.push(u, v);
  }
  acc.idx.push(ids[0], ids[1], ids[2], ids[0], ids[2], ids[3]);
}

export function foliageGeometryFor(o, ox = 0, oy = 0, oz = 0) {
  const r = rng(o.seed ?? 1);
  const s = Math.max(0.045, (o.voxel ?? 0.16) * 1.15);
  const rx = o.rx, ry = o.ry, rz = o.rz ?? o.rx;
  const cy = o.cy ?? ry;
  const pal = PALETTES[o.palette] ?? PALETTES.green;
  const acc = { pos: [], nor: [], col: [], idx: [], uv: [] };
  const mass = { x: ox, y: oy + cy, z: oz, blend: 0.6 };
  const density = (o.density ?? 1) * (1 - (o.sparse ?? 0.1) * 0.6);

  // 1. irregular lobes inside the envelope
  const minR = Math.min(rx, ry, rz);
  const column = ry > Math.max(rx, rz) * 1.8;
  const nLobes = THREE.MathUtils.clamp(Math.round(((rx * ry * rz) / (minR * minR * minR)) * 1.6 + 2), 3, 16);
  const lobes = [];
  for (let i = 0; i < nLobes; i++) {
    let lx, ly, lz, lr;
    if (i === 0) {
      lx = 0; ly = column ? -ry * 0.2 : -ry * 0.05; lz = 0; lr = minR * 0.75;
    } else if (column) {
      const t = i / (nLobes - 1);
      ly = (t * 1.6 - 0.75) * ry;
      const w = Math.sqrt(Math.max(0.05, 1 - (ly / ry) ** 2));
      lx = (r() - 0.5) * rx * 0.5 * w; lz = (r() - 0.5) * rz * 0.5 * w;
      lr = Math.max(s * 1.5, minR * (0.55 + r() * 0.35) * w);
    } else {
      const u = r() * 1.6 - 0.6, a = r() * Math.PI * 2, q = Math.sqrt(1 - Math.min(1, u * u));
      const d = 0.35 + r() * 0.4;
      lx = q * Math.cos(a) * rx * d; ly = u * ry * d; lz = q * Math.sin(a) * rz * d;
      lr = minR * (0.42 + r() * 0.42);
      // keep inside the envelope
      const k = Math.max(Math.abs(lx) + lr * 0.8 - rx, Math.abs(ly) + lr * 0.8 - ry, Math.abs(lz) + lr * 0.8 - rz, 0);
      lr = Math.max(s * 1.2, lr - k);
    }
    lobes.push({ x: ox + lx * (1 + (o.lean ?? 0)), y: oy + cy + ly, z: oz + lz, r: lr });
  }

  for (const L of lobes) core(acc, L.x, L.y, L.z, L.r * 0.7, L.r * 0.64, L.r * 0.7, pal[0], mass);

  // 2. leaf cards: textured quads around each lobe, facing outwards with a random roll,
  //    plus one crossed pair through the centre so the silhouette stays full from any side
  const p = new THREE.Vector3();
  const n = new THREE.Vector3();
  for (const L of lobes) {
    const count = Math.max(5, Math.round(((L.r * L.r) / (s * s)) * 0.55 * density + 5));
    for (let i = 0; i < count; i++) {
      const u = r() * 1.7 - 0.7, a = r() * Math.PI * 2, q = Math.sqrt(Math.max(0, 1 - u * u));
      n.set(q * Math.cos(a), u, q * Math.sin(a));
      p.set(L.x + n.x * L.r * 0.55, L.y + n.y * L.r * 0.5, L.z + n.z * L.r * 0.55);
      card(acc, p, n, L.r * (1.05 + r() * 0.45), r() * Math.PI * 2, (0.86 + r() * 0.3), mass);
    }
    for (let k = 0; k < 2; k++) {
      n.set(Math.cos(k * Math.PI / 2 + 0.4), 0.15, Math.sin(k * Math.PI / 2 + 0.4)).normalize();
      card(acc, p.set(L.x, L.y, L.z), n, L.r * 1.7, r() * Math.PI, 0.9, mass);
    }
  }

  // 3. hanging vines (ivy) and racemes (wisteria)
  if (o.droop) {
    const strands = Math.max(2, Math.round(rx * rz * 7 * (o.droopDensity ?? 1)));
    for (let k = 0; k < strands; k++) {
      const L = lobes[Math.floor(r() * lobes.length)];
      const a = r() * Math.PI * 2;
      let x = L.x + Math.cos(a) * L.r * 0.8, z = L.z + Math.sin(a) * L.r * 0.8;
      if (o.droopFront) z = oz + rz * (0.7 + r() * 0.3);
      let y = L.y - L.r * 0.3;
      const len = o.droop * (0.25 + r() * 0.75);
      const raceme = !!o.droopColor && r() < 0.8;
      const step = s * (raceme ? 0.22 : 0.45);
      const steps = Math.max(2, Math.round((raceme ? Math.min(len, 0.6) : len) / step));
      for (let m = 0; m < steps; m++) {
        y -= step;
        x += (r() - 0.5) * s * 0.25;
        if (o.droopFront) z += (r() - 0.35) * s * 0.12;
        const taper = 1 - (m / steps) * (raceme ? 0.8 : 0.45);
        p.set(x, y, z);
        const leaves = raceme ? 3 : 2;
        for (let f = 0; f < leaves; f++) {
          const side = f % 2 ? 1 : -1;
          n.set(side * (0.6 + r() * 0.4), 0.3 + r() * 0.4, (o.droopFront ? 1 : r() - 0.5)).normalize();
          const c = raceme ? (r() < 0.25 ? '#c7b4ef' : o.droopColor) : pal[1 + Math.floor(r() * 3)];
          const lz = (raceme ? s * 0.38 : s * 0.85) * taper * (0.8 + r() * 0.4);
          leaf(acc, p.clone().addScaledVector(n, lz * 0.3), n, lz, lz * 0.7, c, { ...mass, blend: 0.35 }, r);
        }
      }
    }
  }
  return acc.pos.length ? foliageGeometry(acc) : null;
}

// Foliage is the most expensive thing to generate; identical plants (same
// parameters, seed and offset) come from a small cache instead.
const foliageCache = new Map();
// Plants are generated at the origin and moved into place, so the same plant
// anywhere in the scene comes from the cache.
export function foliage(builder, o, x = 0, y = 0, z = 0) {
  const key = JSON.stringify(o);
  let cached = foliageCache.get(key);
  if (cached === undefined) {
    cached = foliageGeometryFor(o, 0, 0, 0);
    foliageCache.set(key, cached);
    if (foliageCache.size > 600) {
      const first = foliageCache.keys().next().value;
      foliageCache.get(first)?.dispose();
      foliageCache.delete(first);
    }
  } else {
    foliageCache.delete(key);
    foliageCache.set(key, cached);
  }
  const g = cached && cached.clone();
  if (g) builder.geo(x || y || z ? g.translate(x, y, z) : g, '#ffffff', { material: leafMaterial(o.palette, o.flowers), tess: false });
}

// ---------- leaf cards (game-style foliage) ----------
// A canvas of overlapping leaves with transparent gaps, used on crossed cards
// around a dark core: lush silhouettes for very few triangles.
const leafMats = new Map();
function leafTexture(palette, flowers) {
  const pal = PALETTES[palette] ?? PALETTES.green;
  const S = 256, cv = document.createElement('canvas');
  cv.width = cv.height = S;
  const g = cv.getContext('2d');
  const r = rng(`${palette}|${flowers}`);
  const leafShape = (x, y, a, l, w, c) => {
    g.save();
    g.translate(x, y);
    g.rotate(a);
    g.fillStyle = c;
    g.beginPath();
    g.moveTo(0, 0);
    g.quadraticCurveTo(w, l * 0.45, 0, l);
    g.quadraticCurveTo(-w, l * 0.45, 0, 0);
    g.fill();
    // midrib
    g.strokeStyle = 'rgba(0,0,0,0.18)';
    g.lineWidth = 1.2;
    g.beginPath();
    g.moveTo(0, l * 0.1);
    g.lineTo(0, l * 0.85);
    g.stroke();
    g.restore();
  };
  // back to front: dark inner leaves, light outer ones
  for (let layer = 0; layer < 3; layer++) {
    const n = [70, 90, 70][layer];
    for (let i = 0; i < n; i++) {
      const a = r() * Math.PI * 2, d = Math.sqrt(r()) * S * (0.22 + layer * 0.08);
      const x = S / 2 + Math.cos(a) * d, y = S / 2 + Math.sin(a) * d * 0.9;
      const ang = Math.atan2(y - S / 2, x - S / 2) - Math.PI / 2 + (r() - 0.5) * 1.4;
      const c = pal[Math.min(pal.length - 1, layer + Math.floor(r() * 3))];
      leafShape(x, y, ang, 26 + r() * 22, 9 + r() * 6, c);
    }
  }
  if (flowers) {
    for (let i = 0; i < 26; i++) {
      const a = r() * Math.PI * 2, d = Math.sqrt(r()) * S * 0.36;
      const x = S / 2 + Math.cos(a) * d, y = S / 2 + Math.sin(a) * d;
      g.fillStyle = flowers;
      for (let k = 0; k < 5; k++) {
        g.beginPath();
        g.arc(x + Math.cos(k * 1.256) * 4, y + Math.sin(k * 1.256) * 4, 3.6, 0, Math.PI * 2);
        g.fill();
      }
      g.fillStyle = '#f2c94c';
      g.beginPath();
      g.arc(x, y, 2.2, 0, Math.PI * 2);
      g.fill();
    }
  }
  const t = new THREE.CanvasTexture(cv);
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 4;
  return t;
}
export function leafMaterial(palette = 'green', flowers = null) {
  const key = `${palette}|${flowers ?? ''}`;
  let m = leafMats.get(key);
  if (!m) {
    m = handmade(new THREE.MeshStandardMaterial({ map: leafTexture(palette, flowers), alphaTest: 0.45, side: THREE.DoubleSide, vertexColors: true, roughness: 0.85 }));
    m.userData.shared = true;
    leafMats.set(key, m);
  }
  return m;
}
const depthMats = new Map();
function depthFor(m) {
  let d = depthMats.get(m.uuid);
  if (!d) {
    d = new THREE.MeshDepthMaterial({ depthPacking: THREE.RGBADepthPacking, map: m.map, alphaTest: m.alphaTest });
    depthMats.set(m.uuid, d);
  }
  return d;
}

// ---------- procedural canvas textures ----------
const texCache = new Map();
function shade(hex, amt) {
  const c = new THREE.Color(hex);
  const hsl = {};
  c.getHSL(hsl);
  c.setHSL(hsl.h, hsl.s, THREE.MathUtils.clamp(hsl.l + amt, 0, 1));
  return '#' + c.getHexString();
}

export function patternTexture(pattern, c1, c2) {
  const key = `${pattern}|${c1}|${c2}`;
  let tex = texCache.get(key);
  if (tex) return tex;
  const S = 256;
  const cv = document.createElement('canvas');
  cv.width = cv.height = S;
  const g = cv.getContext('2d');
  const r = rng(key);
  g.fillStyle = c1;
  g.fillRect(0, 0, S, S);
  const speckle = (n, amt, size = 2) => {
    for (let i = 0; i < n; i++) {
      g.fillStyle = shade(c1, (r() - 0.5) * amt);
      g.globalAlpha = 0.35;
      g.fillRect(r() * S, r() * S, size + r() * size, size + r() * size);
    }
    g.globalAlpha = 1;
  };
  switch (pattern) {
    case 'wood': {
      const rows = 8; // one metre = 8 planks
      for (let i = 0; i < rows; i++) {
        const y = (i * S) / rows;
        let x = -r() * S;
        while (x < S) {
          const len = S * (0.45 + r() * 0.6);
          g.fillStyle = shade(c1, (r() - 0.5) * 0.09);
          g.fillRect(x, y, len, S / rows);
          for (let k = 0; k < 4; k++) {
            g.strokeStyle = shade(c1, -0.05 - r() * 0.05);
            g.globalAlpha = 0.35;
            g.beginPath();
            const yy = y + r() * (S / rows);
            g.moveTo(x, yy);
            g.lineTo(x + len, yy + (r() - 0.5) * 3);
            g.stroke();
            g.globalAlpha = 1;
          }
          g.fillStyle = c2;
          g.fillRect(x, y, 1.5, S / rows);
          x += len;
        }
        g.fillStyle = c2;
        g.fillRect(0, y, S, 1.5);
      }
      break;
    }
    case 'tile': {
      const n = 4;
      const t = S / n;
      for (let i = 0; i < n; i++)
        for (let j = 0; j < n; j++) {
          g.fillStyle = shade(c1, (r() - 0.5) * 0.04);
          g.fillRect(i * t + 1, j * t + 1, t - 2, t - 2);
        }
      g.fillStyle = c2;
      for (let i = 0; i <= n; i++) {
        g.fillRect(i * t - 1, 0, 2, S);
        g.fillRect(0, i * t - 1, S, 2);
      }
      for (let i = 0; i <= n; i++)
        for (let j = 0; j <= n; j++) {
          g.save();
          g.translate(i * t, j * t);
          g.rotate(Math.PI / 4);
          g.fillRect(-7, -7, 14, 14);
          g.restore();
        }
      break;
    }
    case 'checker': {
      const n = 4;
      const t = S / n;
      for (let i = 0; i < n; i++)
        for (let j = 0; j < n; j++) {
          g.fillStyle = (i + j) % 2 ? c2 : c1;
          g.fillRect(i * t, j * t, t, t);
        }
      speckle(500, 0.06);
      break;
    }
    case 'stripes': {
      // wide bands (deckchairs, awnings, circus canvas)
      g.fillStyle = c2;
      for (let i = 0; i < 4; i++) g.fillRect(i * (S / 4), 0, S / 8, S);
      speckle(300, 0.05);
      break;
    }
    case 'lines': {
      // thin weave lines (mats, rush, tatami)
      g.fillStyle = c2;
      for (let i = 0; i < 16; i++) g.fillRect(0, i * (S / 16), S, 2);
      speckle(400, 0.08);
      break;
    }
    case 'stone': {
      g.fillStyle = c2;
      g.fillRect(0, 0, S, S);
      const cells = 3;
      const t = S / cells;
      for (let i = 0; i < cells; i++)
        for (let j = 0; j < cells; j++) {
          const w = t * (0.75 + r() * 0.2), h = t * (0.75 + r() * 0.2);
          g.fillStyle = shade(c1, (r() - 0.5) * 0.12);
          const x = i * t + (t - w) / 2, y = j * t + (t - h) / 2;
          g.beginPath();
          g.moveTo(x + r() * 6, y + r() * 6);
          g.lineTo(x + w - r() * 6, y + r() * 6);
          g.lineTo(x + w - r() * 6, y + h - r() * 6);
          g.lineTo(x + r() * 6, y + h - r() * 6);
          g.closePath();
          g.fill();
        }
      for (let i = 0; i < 60; i++) {
        g.fillStyle = PALETTES.green[2 + Math.floor(r() * 3)];
        g.globalAlpha = 0.6;
        g.fillRect(r() * S, r() * S, 3 + r() * 5, 3 + r() * 5);
      }
      g.globalAlpha = 1;
      break;
    }
    case 'carpet': {
      speckle(3000, 0.08, 1.5);
      break;
    }
    case 'grass': {
      for (let i = 0; i < 4000; i++) {
        g.fillStyle = PALETTES.green[Math.floor(r() * 5)];
        g.globalAlpha = 0.5;
        g.fillRect(r() * S, r() * S, 2 + r() * 3, 2 + r() * 3);
      }
      g.globalAlpha = 1;
      break;
    }
    case 'brick': {
      const rows = 8;
      const h = S / rows;
      g.fillStyle = c2;
      g.fillRect(0, 0, S, S);
      for (let i = 0; i < rows; i++) {
        const off = i % 2 ? h : 0;
        for (let x = -off; x < S; x += h * 2) {
          g.fillStyle = shade(c1, (r() - 0.5) * 0.1);
          g.fillRect(x + 1.5, i * h + 1.5, h * 2 - 3, h - 3);
        }
      }
      break;
    }
    case 'sand': {
      speckle(2600, 0.1, 1.4);
      // wind ripples
      g.strokeStyle = shade(c2, -0.02);
      g.lineWidth = 2;
      for (let i = 0; i < 9; i++) {
        g.globalAlpha = 0.35;
        g.beginPath();
        const y0 = r() * S;
        for (let x = 0; x <= S; x += 8) g.lineTo(x, y0 + Math.sin(x / 22 + i) * 6);
        g.stroke();
      }
      g.globalAlpha = 1;
      break;
    }
    case 'water': {
      const gr = g.createLinearGradient(0, 0, S, S);
      gr.addColorStop(0, c1);
      gr.addColorStop(1, shade(c1, -0.06));
      g.fillStyle = gr;
      g.fillRect(0, 0, S, S);
      g.strokeStyle = c2;
      g.lineCap = 'round';
      for (let i = 0; i < 26; i++) {
        g.globalAlpha = 0.5 + r() * 0.4;
        g.lineWidth = 2 + r() * 2;
        const x = r() * S, y = r() * S, w = 14 + r() * 26;
        g.beginPath();
        g.arc(x, y, w, Math.PI * 1.15, Math.PI * 1.85);
        g.stroke();
      }
      g.fillStyle = '#ffffff';
      for (let i = 0; i < 40; i++) {
        g.globalAlpha = 0.5;
        g.fillRect(r() * S, r() * S, 2, 2);
      }
      g.globalAlpha = 1;
      break;
    }
    case 'snow': {
      speckle(1500, 0.05, 2);
      g.fillStyle = '#ffffff';
      for (let i = 0; i < 90; i++) {
        g.globalAlpha = 0.6;
        g.beginPath();
        g.arc(r() * S, r() * S, 2 + r() * 5, 0, Math.PI * 2);
        g.fill();
      }
      g.globalAlpha = 1;
      break;
    }
    case 'marble': {
      speckle(300, 0.03, 4);
      g.strokeStyle = c2;
      for (let i = 0; i < 7; i++) {
        g.globalAlpha = 0.25 + r() * 0.3;
        g.lineWidth = 0.8 + r() * 1.6;
        g.beginPath();
        let x = r() * S, y = 0;
        g.moveTo(x, y);
        while (y < S) { x += (r() - 0.5) * 40; y += 12 + r() * 18; g.lineTo(x, y); }
        g.stroke();
      }
      g.globalAlpha = 0.5;
      g.fillStyle = shade(c2, 0.1);
      g.fillRect(0, S / 2 - 1, S, 2);
      g.fillRect(S / 2 - 1, 0, 2, S);
      g.globalAlpha = 1;
      break;
    }
    case 'tatami': {
      const t = S / 2;
      for (const [x, y, w, h] of [[0, 0, t, S], [t, 0, t, t], [t, t, t, t]]) {
        g.fillStyle = shade(c1, (r() - 0.5) * 0.05);
        g.fillRect(x, y, w, h);
        g.strokeStyle = shade(c1, -0.08);
        g.globalAlpha = 0.35;
        const vert = h > w;
        for (let k = 3; k < (vert ? w : h); k += 4) {
          g.beginPath();
          if (vert) { g.moveTo(x + k, y); g.lineTo(x + k, y + h); } else { g.moveTo(x, y + k); g.lineTo(x + w, y + k); }
          g.stroke();
        }
        g.globalAlpha = 1;
        g.strokeStyle = c2;
        g.lineWidth = 6;
        g.strokeRect(x + 3, y + 3, w - 6, h - 6);
        g.lineWidth = 1;
      }
      break;
    }
    case 'planks': {
      const cols = 4;
      for (let i = 0; i < cols; i++) {
        const x = (i * S) / cols;
        g.fillStyle = shade(c1, (r() - 0.5) * 0.1);
        g.fillRect(x, 0, S / cols, S);
        for (let k = 0; k < 5; k++) {
          g.strokeStyle = shade(c1, -0.07);
          g.globalAlpha = 0.4;
          g.beginPath();
          const xx = x + r() * (S / cols);
          g.moveTo(xx, 0);
          g.bezierCurveTo(xx + 6, S / 3, xx - 6, (2 * S) / 3, xx + 2, S);
          g.stroke();
        }
        g.globalAlpha = 1;
        g.fillStyle = c2;
        g.fillRect(x, 0, 3, S);
        // nail heads
        for (const y of [8, S / 2, S - 8]) { g.fillRect(x + 10, y, 3, 3); g.fillRect(x + S / cols - 12, y, 3, 3); }
      }
      break;
    }
    case 'parquet': {
      const u = S / 8;
      for (let i = -1; i < 9; i++)
        for (let j = -1; j < 9; j++) {
          g.fillStyle = shade(c1, (r() - 0.5) * 0.12);
          if ((i + j) % 2) g.fillRect(i * u, j * u, u * 2, u);
          else g.fillRect(i * u, j * u, u, u * 2);
          g.strokeStyle = c2;
          g.lineWidth = 1.2;
          if ((i + j) % 2) g.strokeRect(i * u, j * u, u * 2, u);
          else g.strokeRect(i * u, j * u, u, u * 2);
        }
      break;
    }
    case 'metal': {
      const t = S / 2;
      for (let i = 0; i < 2; i++)
        for (let j = 0; j < 2; j++) {
          g.fillStyle = shade(c1, (r() - 0.5) * 0.05);
          g.fillRect(i * t + 2, j * t + 2, t - 4, t - 4);
          g.fillStyle = c2;
          for (const [x, y] of [[8, 8], [t - 12, 8], [8, t - 12], [t - 12, t - 12]]) {
            g.beginPath();
            g.arc(i * t + x + 2, j * t + y + 2, 3, 0, Math.PI * 2);
            g.fill();
          }
        }
      // diamond tread
      g.strokeStyle = shade(c1, 0.08);
      g.globalAlpha = 0.5;
      for (let x = 10; x < S; x += 18)
        for (let y = 10; y < S; y += 18) {
          g.beginPath();
          g.moveTo(x - 4, y + ((x + y) % 36 ? 3 : -3));
          g.lineTo(x + 4, y - ((x + y) % 36 ? 3 : -3));
          g.stroke();
        }
      g.globalAlpha = 1;
      break;
    }
    case 'mosaic': {
      const n = 16, t = S / n;
      for (let i = 0; i < n; i++)
        for (let j = 0; j < n; j++) {
          const d = Math.abs(i - n / 2 + 0.5) + Math.abs(j - n / 2 + 0.5);
          g.fillStyle = (Math.floor(d) % 4 === 0) ? c2 : shade(c1, (r() - 0.5) * 0.1);
          g.fillRect(i * t + 0.8, j * t + 0.8, t - 1.6, t - 1.6);
        }
      break;
    }
    case 'cobble': {
      g.fillStyle = c2;
      g.fillRect(0, 0, S, S);
      for (let i = 0; i < 70; i++) {
        g.fillStyle = shade(c1, (r() - 0.5) * 0.16);
        g.beginPath();
        g.ellipse(r() * S, r() * S, 12 + r() * 10, 10 + r() * 8, r() * 3, 0, Math.PI * 2);
        g.fill();
      }
      break;
    }
    case 'hex': {
      const R = 18, w = R * Math.sqrt(3);
      for (let row = -1; row < S / (R * 1.5) + 1; row++)
        for (let col = -1; col < S / w + 1; col++) {
          const cx = col * w + (row % 2 ? w / 2 : 0), cy = row * R * 1.5;
          g.fillStyle = shade(c1, (r() - 0.5) * 0.08);
          g.strokeStyle = c2;
          g.lineWidth = 2;
          g.beginPath();
          for (let k = 0; k < 6; k++) g.lineTo(cx + Math.cos(Math.PI / 6 + (k * Math.PI) / 3) * R, cy + Math.sin(Math.PI / 6 + (k * Math.PI) / 3) * R);
          g.closePath();
          g.fill();
          g.stroke();
        }
      break;
    }
    case 'straw': {
      speckle(800, 0.06, 2);
      for (let i = 0; i < 900; i++) {
        g.strokeStyle = r() < 0.5 ? c2 : shade(c1, 0.08);
        g.globalAlpha = 0.6;
        g.lineWidth = 1.2;
        const x = r() * S, y = r() * S, a = r() * Math.PI, l = 6 + r() * 10;
        g.beginPath();
        g.moveTo(x, y);
        g.lineTo(x + Math.cos(a) * l, y + Math.sin(a) * l);
        g.stroke();
      }
      g.globalAlpha = 1;
      break;
    }
    case 'plain':
    default:
      speckle(800, 0.04);
  }
  tex = new THREE.CanvasTexture(cv);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.anisotropy = 4;
  texCache.set(key, tex);
  return tex;
}

const texMatCache = new Map();
export function patternMaterial(pattern, c1, c2, rx, ry) {
  const key = `${pattern}|${c1}|${c2}|${rx}|${ry}`;
  let m = texMatCache.get(key);
  if (!m) {
    const t = patternTexture(pattern, c1, c2).clone();
    t.needsUpdate = true;
    t.repeat.set(rx, ry);
    const shiny = { tile: 0.55, marble: 0.35, water: 0.18, metal: 0.45, ice: 0.2 }[pattern] ?? 0.92;
    m = handmade(new THREE.MeshStandardMaterial({ map: t, roughness: shiny, metalness: pattern === 'metal' ? 0.35 : 0 }));
    m.userData.shared = true;
    texMatCache.set(key, m);
  }
  return m;
}
