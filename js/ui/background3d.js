/* =========================================================================
   Fond « liquid glass » en WebGL (three.js) : nappes lumineuses fluides
   teintées par la couleur de la grille active, derrière les panneaux en verre.
   - rendu à demi-résolution, pause quand l'onglet est caché ;
   - image fixe si « réduire les animations » est actif ;
   - repli CSS automatique si WebGL / three.js indisponible.
   ========================================================================= */
window.MF = window.MF || {};

MF.bg3d = (() => {
  let renderer, scene, camera, uniforms, raf, running = false;
  const target = { color: null };

  const FRAG = `
    precision highp float;
    uniform float uTime;
    uniform vec2 uRes;
    uniform vec3 uAccent;
    uniform vec3 uBase;
    uniform float uLight;
    uniform vec2 uMouse;

    // Bruit simplex 2D (Ashima Arts, domaine public)
    vec3 permute(vec3 x){ return mod(((x*34.0)+1.0)*x, 289.0); }
    float snoise(vec2 v){
      const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
      vec2 i = floor(v + dot(v, C.yy));
      vec2 x0 = v - i + dot(i, C.xx);
      vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
      vec4 x12 = x0.xyxy + C.xxzz; x12.xy -= i1;
      i = mod(i, 289.0);
      vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
      vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
      m = m*m; m = m*m;
      vec3 x = 2.0 * fract(p * C.www) - 1.0;
      vec3 h = abs(x) - 0.5;
      vec3 ox = floor(x + 0.5);
      vec3 a0 = x - ox;
      m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
      vec3 g; g.x = a0.x * x0.x + h.x * x0.y; g.yz = a0.yz * x12.xz + h.yz * x12.yw;
      return 130.0 * dot(m, g);
    }

    void main(){
      vec2 uv = gl_FragCoord.xy / uRes;
      vec2 p = (gl_FragCoord.xy - 0.5 * uRes) / min(uRes.x, uRes.y);
      float t = uTime * 0.045;

      // Distorsion de domaine : effet de liquide qui s'écoule
      // Basses fréquences uniquement : grandes nappes douces, sans motifs serrés
      vec2 q = vec2(snoise(p * 0.45 + t), snoise(p * 0.45 - t + 3.1));
      vec2 r = vec2(snoise(p * 0.6 + q * 0.8 + vec2(1.7, 9.2) + t * 0.8), snoise(p * 0.6 + q * 0.8 + vec2(8.3, 2.8) - t * 0.6));
      float n = snoise(p * 0.5 + r * 0.7);

      // Trois nappes : accent, bleu froid, sarcelle
      vec3 cool = vec3(0.28, 0.40, 0.85);
      vec3 teal = vec3(0.12, 0.55, 0.52);
      float a = smoothstep(-0.2, 1.0, n);
      float b = smoothstep(0.0, 1.0, r.x);
      float c = smoothstep(0.1, 1.0, q.y);

      vec3 col = uBase;
      col = mix(col, uAccent, a * (uLight > 0.5 ? 0.30 : 0.42));
      col = mix(col, cool, b * (uLight > 0.5 ? 0.12 : 0.16));
      col = mix(col, teal, c * (uLight > 0.5 ? 0.08 : 0.10));

      // Halo lumineux qui suit doucement la souris
      float d = length(uv - uMouse);
      col += uAccent * 0.07 * smoothstep(0.6, 0.0, d);

      // Reflet spéculaire diffus, très léger
      float sheen = pow(max(0.0, snoise(p * 0.8 + r + t)), 4.0);
      col += vec3(sheen) * (uLight > 0.5 ? 0.05 : 0.06);

      // Vignettage + grain fin (évite les bandes de dégradé)
      col *= mix(1.0, 0.72, smoothstep(0.35, 1.25, length(p)) * (1.0 - uLight * 0.7));
      col += (fract(sin(dot(gl_FragCoord.xy, vec2(12.9898, 78.233))) * 43758.5453) - 0.5) * 0.018;
      gl_FragColor = vec4(col, 1.0);
    }`;

  function hexToVec(hex) {
    const [r, g, b] = MF.util.hexToRgb(hex);
    return new THREE.Vector3(r / 255, g / 255, b / 255);
  }

  function baseColor() {
    const light = document.documentElement.dataset.theme === 'light';
    return { light, base: light ? new THREE.Vector3(0.92, 0.94, 0.97) : new THREE.Vector3(0.025, 0.032, 0.05) };
  }

  function init(canvas) {
    if (!window.THREE) { document.body.classList.add('no-webgl'); return false; }
    try {
      renderer = new THREE.WebGLRenderer({ canvas, antialias: false, alpha: false, powerPreference: 'low-power' });
    } catch {
      document.body.classList.add('no-webgl'); return false;
    }
    scene = new THREE.Scene();
    camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const { light, base } = baseColor();
    uniforms = {
      uTime: { value: Math.random() * 100 },
      uRes: { value: new THREE.Vector2(1, 1) },
      uAccent: { value: hexToVec(getComputedStyle(document.documentElement).getPropertyValue('--accent').trim() || '#a8432f') },
      uBase: { value: base },
      uLight: { value: light ? 1 : 0 },
      uMouse: { value: new THREE.Vector2(0.3, 0.7) },
    };
    const mat = new THREE.ShaderMaterial({ uniforms, fragmentShader: FRAG, vertexShader: 'void main(){ gl_Position = vec4(position, 1.0); }' });
    scene.add(new THREE.Mesh(new THREE.PlaneGeometry(2, 2), mat));

    const resize = () => {
      const scale = 0.5; // demi-résolution : le flou du verre masque la différence
      renderer.setPixelRatio(1);
      renderer.setSize(Math.ceil(innerWidth * scale), Math.ceil(innerHeight * scale), false);
      canvas.style.width = '100vw'; canvas.style.height = '100vh';
      uniforms.uRes.value.set(Math.ceil(innerWidth * scale), Math.ceil(innerHeight * scale));
      if (!running) renderer.render(scene, camera);
    };
    addEventListener('resize', resize);
    resize();

    const mouseTarget = new THREE.Vector2(0.3, 0.7);
    addEventListener('pointermove', e => mouseTarget.set(e.clientX / innerWidth, 1 - e.clientY / innerHeight), { passive: true });

    let last = performance.now();
    const loop = now => {
      raf = requestAnimationFrame(loop);
      const dt = Math.min(0.05, (now - last) / 1000); last = now;
      uniforms.uTime.value += dt;
      uniforms.uMouse.value.lerp(mouseTarget, 0.03);
      if (target.color) uniforms.uAccent.value.lerp(target.color, 0.04);
      renderer.render(scene, camera);
    };
    const start = () => { if (running || !motionAllowed()) return; running = true; last = performance.now(); raf = requestAnimationFrame(loop); };
    const stop = () => { running = false; cancelAnimationFrame(raf); };
    document.addEventListener('visibilitychange', () => (document.hidden ? stop() : start()));
    MF.bg3d.start = start; MF.bg3d.stop = stop;
    renderer.render(scene, camera);
    start();
    return true;
  }

  function motionAllowed() {
    return !matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  function setColor(hex) {
    if (!uniforms) return;
    target.color = hexToVec(hex);
    if (!running) { uniforms.uAccent.value.copy(target.color); renderer.render(scene, camera); }
  }

  function setTheme() {
    if (!uniforms) return;
    const { light, base } = baseColor();
    uniforms.uBase.value.copy(base);
    uniforms.uLight.value = light ? 1 : 0;
    renderer.render(scene, camera);
  }

  return { init, setColor, setTheme, start: () => {}, stop: () => {} };
})();
