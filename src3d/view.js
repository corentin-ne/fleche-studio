// The board view: renderer, lights, cameras, post-processing, picking and
// exports. Renderer, light rig, moods and the style pipeline are adapted from
// building-builder (src/viewport.js): render on demand, static shadow map,
// GTAO contact shade, OutputPass, then the art-book StyleShader.
import * as THREE from 'three';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { ShaderPass } from 'three/addons/postprocessing/ShaderPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';
import { GTAOPass } from 'three/addons/postprocessing/GTAOPass.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { WOBBLE } from './geo.js';
import { StyleShader, STYLES, MOOD_SETTINGS, SkewCamera, distortUV } from './looks.js';
import { buildBoard, cellCenter, CELL, MARGIN, PLINTH_H } from './board.js';
import { buildFigure, buildBadge, chalkOutline, FIGURE_H } from './figures.js';

// iso: a gentle 3/4 diorama through a long lens with a hand-drawn slant;
// top: a near top-down orthographic view, best for reading the grid.
const CAMERAS = {
  iso: { az: 16, el: 52, fov: 20, skew: 0.07, lean: -0.02 },
  top: { az: 0, el: 76, ortho: true },
};

const DEFAULTS = { look: 'print', mood: 'day', camera: 'iso', labels: true, names: false, clutter: 'some', interactive: true, ao: true, padding: 0.04, maxPixelRatio: 2, background: null };

const _v = new THREE.Vector3();

export class BoardView {
  constructor(container, opts = {}) {
    this.container = container;
    this.opts = { ...DEFAULTS, ...opts };
    this.onCell = null;
    this.state = { show: 'blank' };
    this.cache = new Map(); // figure / badge cache
    this.owned = new Set(); // textures and materials to dispose

    const r = (this.renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true, stencil: false, preserveDrawingBuffer: false, powerPreference: 'high-performance' }));
    r.setPixelRatio(Math.min(window.devicePixelRatio || 1, this.opts.maxPixelRatio));
    r.shadowMap.enabled = true;
    r.shadowMap.type = THREE.VSMShadowMap;
    r.shadowMap.autoUpdate = false;
    r.toneMapping = THREE.NeutralToneMapping;
    r.debug.checkShaderErrors = false;
    const cv = r.domElement;
    cv.style.display = 'block';
    cv.style.width = '100%';
    cv.style.height = '100%';
    cv.style.touchAction = 'manipulation';
    cv.setAttribute('aria-hidden', 'true');
    container.appendChild(cv);

    this.scene = new THREE.Scene();
    this.overlay = new THREE.Scene(); // badges and marks, drawn on top
    this.hemi = new THREE.HemisphereLight('#e7eefc', '#8a7a64', 1.1);
    this.sun = new THREE.DirectionalLight('#fff3e0', 2.6);
    this.sun.castShadow = true;
    this.sun.shadow.mapSize.setScalar(2048);
    this.sun.shadow.bias = -0.0003;
    this.sun.shadow.normalBias = 0.03;
    this.sun.shadow.radius = 5;
    this.sun.shadow.blurSamples = 12;
    this.bounce = new THREE.DirectionalLight('#ffd9a8', 0.4);
    this.rim = new THREE.DirectionalLight('#c9dcff', 0.5);
    this.bounce.target = this.rim.target = this.sun.target;
    this.scene.add(this.hemi, this.sun, this.sun.target, this.bounce, this.rim);
    const pmrem = new THREE.PMREMGenerator(r);
    this.envRT = pmrem.fromScene(new RoomEnvironment(), 0.04);
    this.scene.environment = this.envRT.texture;
    pmrem.dispose();

    this.world = new THREE.Group();
    this.dyn = new THREE.Group();
    this.scene.add(this.world, this.dyn);
    this.marks = new THREE.Group();
    this.overlay.add(this.marks);

    this.persp = new SkewCamera(20, 1, 0.1, 1000);
    this.ortho = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 1000);
    this.makeHelpers();

    this.size = { w: 1, h: 1 };
    this.setupComposer();
    this.applyLook();
    this.applyMood();

    this.ro = new ResizeObserver(() => this.resize());
    this.ro.observe(container);
    if (this.opts.interactive) this.bindEvents();
    this.resize();
  }

  get camera() {
    return CAMERAS[this.opts.camera]?.ortho ? this.ortho : this.persp;
  }

  setupComposer() {
    const cam = this.camera;
    if (this.composer && this.composerCam === cam) return;
    this.disposeComposer();
    this.composerCam = cam;
    const rt = new THREE.WebGLRenderTarget(1, 1, { samples: 4, type: THREE.HalfFloatType });
    this.composer = new EffectComposer(this.renderer, rt);
    this.renderPass = new RenderPass(this.scene, cam);
    this.composer.addPass(this.renderPass);
    this.aoPass = new GTAOPass(this.scene, cam, 1, 1);
    this.aoPass.blendIntensity = 0.8;
    this.aoPass.updateGtaoMaterial({ radius: 0.55, distanceExponent: 1.5, thickness: 1, scale: 1.1 });
    this.aoPass.enabled = !!this.opts.ao;
    this.composer.addPass(this.aoPass);
    this.overlayPass = new RenderPass(this.overlay, cam);
    this.overlayPass.clear = false;
    this.composer.addPass(this.overlayPass);
    this.composer.addPass(new OutputPass());
    this.stylePass = new ShaderPass(StyleShader);
    this.composer.addPass(this.stylePass);
    if (this.look) this.resize();
  }

  disposeComposer() {
    if (!this.composer) return;
    for (const p of this.composer.passes) p.dispose?.();
    this.composer.renderTarget1.dispose();
    this.composer.renderTarget2.dispose();
    this.composer = null;
  }

  // hover fill, highlight frame and the X mark material
  makeHelpers() {
    const fillGeo = new THREE.PlaneGeometry(CELL * 0.96, CELL * 0.96).rotateX(-Math.PI / 2);
    this.hover = new THREE.Mesh(fillGeo, new THREE.MeshBasicMaterial({ color: '#fffaf0', transparent: true, opacity: 0.32, depthWrite: false, toneMapped: false }));
    this.hover.visible = false;
    this.hover.renderOrder = 3;
    this.scene.add(this.hover);

    const hl = (this.highlight = new THREE.Group());
    const gold = new THREE.MeshBasicMaterial({ color: '#ffb52e', toneMapped: false });
    const fill = new THREE.Mesh(fillGeo, new THREE.MeshBasicMaterial({ color: '#ffd36a', transparent: true, opacity: 0.3, depthWrite: false, toneMapped: false }));
    fill.renderOrder = 3;
    hl.add(fill);
    const t = 0.09, L = CELL - 0.16;
    for (const [w, d, x, z] of [[L, t, 0, -L / 2], [L, t, 0, L / 2], [t, L, -L / 2, 0], [t, L, L / 2, 0]]) {
      const m = new THREE.Mesh(new THREE.BoxGeometry(w + (w > d ? t : 0), 0.03, d), gold);
      m.position.set(x, 0.02, z);
      hl.add(m);
    }
    hl.visible = false;
    this.scene.add(hl);

    // X marks: an inked brush cross
    const S = 256;
    const cv = document.createElement('canvas');
    cv.width = cv.height = S;
    const g = cv.getContext('2d');
    g.lineCap = 'round';
    for (const [w, col] of [[44, 'rgba(255,250,240,0.85)'], [26, 'rgba(160,30,36,0.92)']]) {
      g.strokeStyle = col;
      g.lineWidth = w;
      g.beginPath();
      g.moveTo(58, 62);
      g.quadraticCurveTo(130, 126, 196, 198);
      g.moveTo(198, 58);
      g.quadraticCurveTo(122, 132, 60, 196);
      g.stroke();
    }
    const tex = new THREE.CanvasTexture(cv);
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.anisotropy = 8;
    this.xMat = new THREE.MeshBasicMaterial({ map: tex, transparent: true, depthTest: false, depthWrite: false, toneMapped: false });
    this.xGeo = new THREE.PlaneGeometry(CELL * 0.62, CELL * 0.62).rotateX(-Math.PI / 2);
    this.owned.add(tex);
  }

  // ---------------------------------------------------------------- options
  setOptions(o = {}) {
    const prev = { ...this.opts };
    Object.assign(this.opts, o);
    if (this.opts.camera !== prev.camera) this.setupComposer();
    if (o.ao !== undefined && this.aoPass) this.aoPass.enabled = !!o.ao;
    if (this.opts.look !== prev.look) this.applyLook();
    if (this.opts.mood !== prev.mood || o.background !== undefined) this.applyMood();
    this.syncLabels();
    if (this.opts.names !== prev.names) this.refresh();
    if (this.opts.clutter !== prev.clutter && this.puzzle) this.setPuzzle(this.puzzle, this.state);
    this.fit();
    this.invalidate(true);
  }

  syncLabels() {
    if (!this.board) return;
    this.board.labels.visible = !!this.opts.labels;
    const front = !CAMERAS[this.opts.camera]?.ortho;
    for (const m of this.board.labels.children) m.visible = m.userData.edge !== (front ? 'back' : 'front');
  }

  applyLook() {
    const s = STYLES[this.opts.look] ?? STYLES.print;
    this.look = s;
    this.syncStyleUniforms();
  }

  syncStyleUniforms(k = 1) {
    const s = this.look;
    if (!s || !this.stylePass) return;
    const u = this.stylePass.uniforms;
    for (const key of ['posterize', 'halftone', 'misreg', 'grain', 'saturation', 'lens', 'chroma', 'mist', 'tilt', 'vignette', 'warmth', 'fade', 'ink', 'wash', 'hatch', 'shadowTint']) u[key].value = s[key] ?? 0;
    u.pixel.value = Math.max(1, Math.round((s.pixel ?? 1) * k));
    u.dotSize.value = (s.dot ?? 3) * k;
    u.paper.value.set(s.paper ?? '#f6eedb');
  }

  applyMood() {
    const m = (this.mood = MOOD_SETTINGS[this.opts.mood] ?? MOOD_SETTINGS.day);
    this.hemi.color.set(m.sky);
    this.hemi.groundColor.set(m.ground);
    this.hemi.intensity = m.hemi;
    this.sun.color.set(m.sun);
    this.sun.intensity = m.sunI;
    this.bounce.color.set(m.bounce);
    this.bounce.intensity = m.bounceI;
    this.rim.color.set(m.rim);
    this.rim.intensity = m.rimI;
    this.scene.environmentIntensity = m.env;
    this.renderer.toneMappingExposure = m.exposure;
    this.scene.background = new THREE.Color(this.opts.background ?? m.backdrop);
    const dark = this.opts.mood === 'night';
    for (const mat of this.board?.labelMats ?? []) mat.color.set(dark ? '#f3e7cf' : '#3a2c26');
    this.scaleLamps();
    this.placeSun();
  }

  scaleLamps() {
    const s = this.mood?.lampScale ?? 1;
    this.world.traverse((o) => {
      if (!o.isPointLight) return;
      if (o.userData.base === undefined) o.userData.base = o.intensity;
      o.intensity = o.userData.base * s;
    });
  }

  placeSun() {
    const m = this.mood;
    const n = this.board?.n ?? 6;
    const rad = (n * CELL) / 2 + MARGIN + 1.5;
    const az = THREE.MathUtils.degToRad(m.sunAz), el = THREE.MathUtils.degToRad(m.sunEl);
    this.sun.target.position.set(0, 0, 0);
    this.sun.position.set(Math.sin(az) * Math.cos(el) * rad * 2, Math.sin(el) * rad * 2, Math.cos(az) * Math.cos(el) * rad * 2);
    this.bounce.position.set(-Math.sin(az) * rad, rad * 0.25, -Math.cos(az) * rad);
    this.rim.position.set(-Math.sin(az + 1.2) * rad, rad * 0.6, -Math.cos(az + 1.2) * rad);
    const sc = this.sun.shadow.camera;
    sc.left = sc.bottom = -rad;
    sc.right = sc.top = rad;
    sc.near = 0.1;
    sc.far = rad * 4;
    sc.updateProjectionMatrix();
    this.sun.target.updateMatrixWorld();
  }

  // ---------------------------------------------------------------- puzzle
  setPuzzle(puzzle, state = {}) {
    if (!puzzle || !puzzle.size || !puzzle.cells) throw new Error('murdoku3d: invalid puzzle');
    const sig = JSON.stringify([puzzle.size, puzzle.seed, puzzle.rooms, puzzle.cells, puzzle.objects, puzzle.theme, this.opts.clutter]);
    if (sig !== this.sig) {
      this.sig = sig;
      this.clearBoard();
      this.board = buildBoard(puzzle, { clutter: this.opts.clutter });
      this.world.add(this.board.group);
      this.syncLabels();
      this.pickables = [];
      this.board.group.traverse((o) => o.isMesh && o.userData.cell && this.pickables.push(o));
      this.applyMood();
      this.fit();
    }
    this.puzzle = puzzle;
    this.state = { show: 'blank', placements: null, crosses: [], selected: null, highlight: null, ...state };
    this.refresh();
  }

  clearBoard() {
    if (!this.board) return;
    this.board.group.removeFromParent();
    disposeTree(this.board.group);
    this.board = null;
  }

  // people, marks and highlight from this.state
  refresh() {
    if (!this.board || !this.puzzle) return;
    const { n, cells } = this.board;
    const st = this.state;
    this.dyn.clear();
    this.marks.clear();
    const want = new Set();
    const people = this.puzzle.people ?? [];
    for (const p of people) {
      let pos = null;
      if (st.show === 'solution') pos = { r: p.r, c: p.c };
      else if (st.show === 'play') pos = st.placements?.[p.id] ?? null;
      if (!pos || !(pos.r >= 0 && pos.r < n && pos.c >= 0 && pos.c < n)) continue;
      const victim = p.role === 'victim';
      const selected = st.selected != null && st.selected === p.id;
      const info = cells[pos.r][pos.c];
      const y = info.object ? (info.occupiable ? info.seat : info.top) : 0;
      const at = cellCenter(n, pos.r, pos.c);
      const fk = `f|${p.id}|${p.color}|${victim}|${selected}`;
      const fig = this.cached(fk, () => buildFigure(p, { victim, selected }));
      fig.position.set(at.x, y, at.z);
      fig.traverse((o) => (o.userData.cell = [pos.r, pos.c]));
      this.dyn.add(fig);
      want.add(fk);
      if (victim && (!info.object || info.object === 'rug')) {
        const ck = `chalk|${p.id}`;
        const chalk = this.cached(ck, () => chalkOutline());
        chalk.position.set(at.x, y + 0.02, at.z);
        chalk.rotation.y = 0.35;
        this.dyn.add(chalk);
        want.add(ck);
      }
      const bk = `b|${p.id}|${p.name}|${p.color}|${victim}|${selected}|${!!this.opts.names}`;
      const badge = this.cached(bk, () => buildBadge(p, { victim, selected, name: !!this.opts.names }));
      badge.position.set(at.x, y + (victim ? 0.72 : FIGURE_H * 1.12 + 0.16), at.z);
      this.marks.add(badge);
      want.add(bk);
    }
    for (const key of st.crosses ?? []) {
      const [r, c] = String(key).split(',').map(Number);
      if (!(r >= 0 && r < n && c >= 0 && c < n)) continue;
      const m = new THREE.Mesh(this.xGeo, this.xMat);
      const at = cellCenter(n, r, c);
      m.position.set(at.x, 0.05, at.z);
      m.renderOrder = 5;
      this.marks.add(m);
    }
    const h = st.highlight;
    this.highlight.visible = !!(h && h.r >= 0 && h.r < n && h.c >= 0 && h.c < n);
    if (this.highlight.visible) this.highlight.position.copy(cellCenter(n, h.r, h.c));
    // forget cached figures that are no longer shown for a while
    for (const [k, v] of this.cache) {
      if (want.has(k)) v.age = 0;
      else if (++v.age > 40) {
        disposeTree(v.obj);
        this.cache.delete(k);
      }
    }
    this.invalidate(true);
  }

  cached(key, make) {
    let e = this.cache.get(key);
    if (!e) this.cache.set(key, (e = { obj: make(), age: 0 }));
    return e.obj;
  }

  // ---------------------------------------------------------------- camera
  fit(aspect) {
    const w = this.size.w, h = this.size.h;
    aspect = aspect ?? w / Math.max(1, h);
    const cfg = CAMERAS[this.opts.camera] ?? CAMERAS.iso;
    const cam = this.camera;
    const n = this.board?.n ?? 6;
    const half = (n * CELL) / 2, H = half + MARGIN;
    const pts = [];
    for (const x of [-H, H]) for (const z of [-H, H]) pts.push(new THREE.Vector3(x, -PLINTH_H, z), new THREE.Vector3(x, 0, z));
    for (const x of [-half, half]) for (const z of [-half, half]) pts.push(new THREE.Vector3(x * 0.85, 1.7, z * 0.85));
    const az = THREE.MathUtils.degToRad(cfg.az), el = THREE.MathUtils.degToRad(cfg.el);
    const dir = new THREE.Vector3(Math.sin(az) * Math.cos(el), Math.sin(el), Math.cos(az) * Math.cos(el));
    const target = new THREE.Vector3(0, 0, 0);
    const pad = 1 - 2 * (this.opts.padding ?? 0.04);
    let dist = 60, halfH = H * 1.2;
    if (!cfg.ortho) {
      cam.fov = cfg.fov;
      cam.oblique = cfg.skew ?? 0;
      cam.lean = cfg.lean ?? 0;
      cam.aspect = aspect;
      dist = H / Math.tan(THREE.MathUtils.degToRad(cfg.fov) / 2) * 1.3;
    }
    const right = new THREE.Vector3(), up = new THREE.Vector3();
    for (let it = 0; it < 6; it++) {
      if (cfg.ortho) {
        cam.left = -halfH * aspect;
        cam.right = halfH * aspect;
        cam.top = halfH;
        cam.bottom = -halfH;
        cam.near = 0.1;
        cam.far = 200;
        cam.position.copy(target).addScaledVector(dir, 60);
      } else {
        cam.position.copy(target).addScaledVector(dir, dist);
        cam.focus = dist;
        cam.near = Math.max(0.1, dist * 0.2);
        cam.far = dist * 3 + 50;
      }
      cam.up.set(0, 1, 0);
      cam.lookAt(target);
      cam.updateMatrixWorld();
      cam.updateProjectionMatrix();
      let x0 = Infinity, x1 = -Infinity, y0 = Infinity, y1 = -Infinity;
      for (const p of pts) {
        _v.copy(p).project(cam);
        x0 = Math.min(x0, _v.x); x1 = Math.max(x1, _v.x);
        y0 = Math.min(y0, _v.y); y1 = Math.max(y1, _v.y);
      }
      const cx = (x0 + x1) / 2, cy = (y0 + y1) / 2;
      const ext = Math.max((x1 - x0) / 2, (y1 - y0) / 2) / pad;
      right.setFromMatrixColumn(cam.matrixWorld, 0);
      up.setFromMatrixColumn(cam.matrixWorld, 1);
      const hh = cfg.ortho ? halfH : dist * Math.tan(THREE.MathUtils.degToRad(cam.fov) / 2);
      target.addScaledVector(right, cx * hh * aspect).addScaledVector(up, cy * hh);
      if (cfg.ortho) halfH *= ext;
      else dist *= ext;
    }
    this.invalidate();
  }

  // ---------------------------------------------------------------- frame
  resize() {
    const w = Math.max(1, this.container.clientWidth), h = Math.max(1, this.container.clientHeight);
    this.size = { w, h };
    const pr = Math.min(window.devicePixelRatio || 1, this.opts.maxPixelRatio);
    if (pr !== this.renderer.getPixelRatio()) {
      this.renderer.setPixelRatio(pr);
      this.composer.setPixelRatio(pr);
    }
    this.renderer.setSize(w, h, false);
    this.composer.setSize(w, h);
    this.stylePass.uniforms.resolution.value.set(w * pr, h * pr);
    this.syncStyleUniforms(1);
    this.fit();
    this.render();
  }

  invalidate(shadows = false) {
    if (shadows) this.shadowDirty = true;
    if (this.raf || this.disposed) return;
    this.raf = requestAnimationFrame(() => {
      this.raf = 0;
      this.render();
    });
  }

  render() {
    if (this.disposed) return;
    WOBBLE.value = this.look?.wobble ?? 1;
    if (this.shadowDirty !== false) {
      this.renderer.shadowMap.needsUpdate = true;
      this.shadowDirty = false;
    }
    this.renderPass.camera = this.overlayPass.camera = this.camera;
    this.composer.render();
  }

  // ---------------------------------------------------------------- picking
  bindEvents() {
    const el = this.renderer.domElement;
    let down = null;
    this.handlers = {
      pointerdown: (e) => {
        down = { x: e.clientX, y: e.clientY, t: performance.now(), id: e.pointerId };
      },
      pointerup: (e) => {
        if (!down || down.id !== e.pointerId) return;
        const moved = Math.hypot(e.clientX - down.x, e.clientY - down.y);
        down = null;
        if (moved > 12) return;
        const cell = this.pickCell(e);
        if (cell && this.onCell) this.onCell(cell.r, cell.c, e);
      },
      pointermove: (e) => {
        if (e.pointerType !== 'mouse') return;
        this.lastMove = e;
        if (this.moveRaf) return;
        this.moveRaf = requestAnimationFrame(() => {
          this.moveRaf = 0;
          this.setHover(this.pickCell(this.lastMove));
        });
      },
      pointerleave: () => this.setHover(null),
    };
    for (const [k, f] of Object.entries(this.handlers)) el.addEventListener(k, f);
  }

  setHover(cell) {
    const key = cell ? `${cell.r},${cell.c}` : '';
    if (key === this.hoverKey) return;
    this.hoverKey = key;
    this.renderer.domElement.style.cursor = cell ? 'pointer' : '';
    this.hover.visible = !!cell && !!this.board;
    if (this.hover.visible) this.hover.position.copy(cellCenter(this.board.n, cell.r, cell.c)).setY(0.02);
    this.invalidate();
  }

  // board cell under a pointer event (or null)
  pickCell(ev) {
    if (!this.board) return null;
    const rect = this.renderer.domElement.getBoundingClientRect();
    const uv = distortUV({ x: (ev.clientX - rect.left) / rect.width, y: 1 - (ev.clientY - rect.top) / rect.height }, this.look?.lens ?? 0, rect.width / rect.height);
    const ray = new THREE.Raycaster();
    const cam = this.camera;
    cam.updateMatrixWorld();
    // the skewed projection has no single eye point: unproject both ends
    const a = new THREE.Vector3(uv.x * 2 - 1, uv.y * 2 - 1, -1).unproject(cam);
    const b = new THREE.Vector3(uv.x * 2 - 1, uv.y * 2 - 1, 1).unproject(cam);
    ray.set(a, b.sub(a).normalize());
    ray.camera = cam;
    const hits = ray.intersectObjects([...this.pickables, ...this.dyn.children], true);
    for (const h of hits) if (h.object.userData.cell) return { r: h.object.userData.cell[0], c: h.object.userData.cell[1] };
    const pt = new THREE.Vector3();
    if (!ray.ray.intersectPlane(new THREE.Plane(new THREE.Vector3(0, 1, 0), 0), pt)) return null;
    const n = this.board.n;
    const c = Math.floor(pt.x / CELL + n / 2), r = Math.floor(pt.z / CELL + n / 2);
    return r >= 0 && r < n && c >= 0 && c < n ? { r, c } : null;
  }

  // ---------------------------------------------------------------- export
  async toCanvas({ width = 1600, height, transparent = false } = {}) {
    const { w, h } = this.size;
    width = Math.round(width);
    height = Math.round(height ?? (width * h) / Math.max(1, w));
    const gl = this.renderer.getContext();
    const max = Math.min(gl.getParameter(gl.MAX_RENDERBUFFER_SIZE), gl.getParameter(gl.MAX_TEXTURE_SIZE), ...gl.getParameter(gl.MAX_VIEWPORT_DIMS));
    const s = Math.min(1, max / Math.max(width, height));
    const W = Math.floor(width * s), H = Math.floor(height * s);
    const pr = this.renderer.getPixelRatio();
    const hover = this.hover.visible;
    this.hover.visible = false;
    this.renderer.setPixelRatio(1);
    this.composer.setPixelRatio(1);
    this.renderer.setSize(W, H, false);
    this.composer.setSize(W, H);
    this.stylePass.uniforms.resolution.value.set(W, H);
    // print dots and pixels grow with the picture, so it looks the same
    this.syncStyleUniforms(Math.max(1, Math.min(W, H) / 900));
    this.fit(W / H);
    const bg = this.scene.background;
    if (transparent) {
      this.scene.background = null;
      this.renderer.setClearColor(0x000000, 0);
      this.stylePass.uniforms.alphaOut.value = 1;
    }
    this.shadowDirty = true;
    this.render();
    const out = document.createElement('canvas');
    out.width = W;
    out.height = H;
    out.getContext('2d').drawImage(this.renderer.domElement, 0, 0);
    // restore
    this.scene.background = bg;
    this.stylePass.uniforms.alphaOut.value = 0;
    this.hover.visible = hover;
    this.renderer.setPixelRatio(pr);
    this.composer.setPixelRatio(pr);
    this.resize();
    return out;
  }

  dispose() {
    if (this.disposed) return;
    this.disposed = true;
    if (this.raf) cancelAnimationFrame(this.raf);
    if (this.moveRaf) cancelAnimationFrame(this.moveRaf);
    this.ro.disconnect();
    const el = this.renderer.domElement;
    for (const [k, f] of Object.entries(this.handlers ?? {})) el.removeEventListener(k, f);
    this.clearBoard();
    for (const { obj } of this.cache.values()) disposeTree(obj);
    this.cache.clear();
    disposeTree(this.scene);
    disposeTree(this.overlay);
    this.xGeo.dispose();
    this.xMat.dispose();
    for (const t of this.owned) t.dispose();
    this.envRT.dispose();
    this.disposeComposer();
    this.renderer.dispose();
    this.renderer.forceContextLoss();
    el.remove();
  }
}

// Frees per-board geometry, textures and materials. Shared materials and
// pattern textures (module caches in geo.js) are kept for the next board.
function disposeTree(root) {
  root.traverse((o) => {
    if (o.geometry && !o.isSprite) o.geometry.dispose();
    const mats = Array.isArray(o.material) ? o.material : o.material ? [o.material] : [];
    for (const m of mats) {
      if (m.userData?.shared) continue;
      if (m.map && !m.map.userData?.shared && !m.map.isRenderTargetTexture) m.map.dispose();
      m.dispose();
    }
  });
}
