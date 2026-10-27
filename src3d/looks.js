// Post-processing looks, light moods and the deformed isometric camera.
// Adapted from building-builder (src/viewport.js): the StyleShader (art-book
// CMYK print, ink & gouache, retro film, pixel art, clean), the light moods,
// distortUV (same barrel mapping as the shader, for picking) and SkewCamera.
// Presets are tuned a little softer here (less lens, tilt-shift and mist) so
// the board stays readable to its edges.
import * as THREE from 'three';

export const StyleShader = {
  uniforms: {
    tDiffuse: { value: null },
    resolution: { value: new THREE.Vector2(1, 1) },
    pixel: { value: 1 },
    posterize: { value: 0 },
    halftone: { value: 0 },
    dotSize: { value: 3 },
    misreg: { value: 1 },
    grain: { value: 0.04 },
    saturation: { value: 1.08 },
    lens: { value: 0 },
    chroma: { value: 0 },
    mist: { value: 0 },
    tilt: { value: 0 },
    vignette: { value: 0 },
    warmth: { value: 0 },
    fade: { value: 0 },
    ink: { value: 0 },
    wash: { value: 0 },
    hatch: { value: 0 },
    shadowTint: { value: 0 },
    paper: { value: new THREE.Color('#f6eedb') },
    alphaOut: { value: 0 },
    // text mask (textmask.js): those pixels are printed as clean solid ink
    tText: { value: null },
    textKeep: { value: 0 },
  },
  vertexShader: /* glsl */ `varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }`,
  fragmentShader: /* glsl */ `
    uniform sampler2D tDiffuse; uniform vec2 resolution; uniform vec3 paper;
    uniform float alphaOut;
    uniform sampler2D tText; uniform float textKeep;
    uniform float pixel, posterize, halftone, dotSize, misreg, grain, saturation, lens, chroma, mist, tilt, vignette, warmth, fade, ink, wash, hatch, shadowTint;
    varying vec2 vUv;
    float hash(vec2 p){ return fract(sin(dot(p, vec2(12.9898,78.233))) * 43758.5453); }
    float vnoise(vec2 p){ vec2 i = floor(p), f = fract(p); f = f*f*(3.0-2.0*f);
      return mix(mix(hash(i), hash(i+vec2(1,0)), f.x), mix(hash(i+vec2(0,1)), hash(i+vec2(1,1)), f.x), f.y); }
    vec2 distort(vec2 uv){
      float a = resolution.x / resolution.y;
      vec2 p = uv - 0.5; p.x *= a;
      float r2 = dot(p, p);
      float rc = (a * a + 1.0) * 0.25;
      p *= (1.0 + lens * r2) / (1.0 + lens * rc * 0.55);
      p.x /= a;
      return p + 0.5;
    }
    vec3 src(vec2 uv){
      if (pixel > 1.0) { vec2 c = resolution / pixel; uv = (floor(uv * c) + 0.5) / c; }
      if (uv.x < 0.0 || uv.y < 0.0 || uv.x > 1.0 || uv.y > 1.0) return paper;
      return texture2D(tDiffuse, uv).rgb;
    }
    float luma(vec3 c){ return dot(c, vec3(0.299, 0.587, 0.114)); }
    vec3 grade(vec3 c){
      float l = luma(c);
      c = mix(vec3(l), c, saturation);
      // gouache light: cool violet shadows, warm cream highlights
      float sh = 1.0 - smoothstep(0.08, 0.5, l);
      c = mix(c, c * vec3(0.74, 0.82, 1.12) + vec3(0.015, 0.02, 0.05), shadowTint * sh);
      c = mix(c, c * vec3(1.06, 1.02, 0.9), shadowTint * smoothstep(0.6, 0.95, l) * 0.6);
      c *= vec3(1.0 + warmth * 0.07, 1.0 + warmth * 0.015, 1.0 - warmth * 0.09);
      c = mix(c, vec3(0.16, 0.11, 0.12) + c * 0.86, fade);
      if (posterize > 1.0) c = floor(c * posterize + 0.5) / posterize;
      return clamp(c, 0.0, 1.0);
    }
    // Lit area of one halftone plate at this fragment (0..1)
    float screen(vec2 frag, float ang, float ink){
      mat2 R = mat2(cos(ang), -sin(ang), sin(ang), cos(ang));
      vec2 p = R * frag / dotSize;
      vec2 cell = fract(p) - 0.5;
      float r = sqrt(clamp(ink, 0.0, 1.0)) * 0.66;
      float w = 0.18 + 0.1 * vnoise(frag * 0.35);
      return 1.0 - smoothstep(r - w, r + w, length(cell) + (vnoise(frag * 0.9) - 0.5) * 0.08);
    }
    vec4 cmyk(vec3 c){
      float k = 1.0 - max(c.r, max(c.g, c.b));
      vec3 cmy = (1.0 - c - k) / max(1.0 - k, 1e-3);
      return vec4(cmy, k);
    }
    // Text mask, widened by a pixel or two so the letters keep a clean edge
    float textMask(vec2 uv){
      if (textKeep <= 0.0) return 0.0;
      vec2 px = 1.6 / resolution;
      float m = texture2D(tText, uv).a;
      for (int i = 0; i < 8; i++) {
        float a = float(i) * 0.785398;
        m = max(m, texture2D(tText, uv + vec2(cos(a), sin(a)) * px).a);
      }
      return m * textKeep;
    }
    void main(){
      vec2 uv = distort(vUv);
      vec2 dir = uv - 0.5;
      vec2 px = 1.0 / resolution;
      vec3 col = src(uv);
      if (chroma > 0.0) {
        col.r = src(uv + dir * chroma * 0.006).r;
        col.b = src(uv - dir * chroma * 0.006).b;
      }

      // soft diffusion + tilt-shift from one blur
      float tAmt = tilt * smoothstep(0.1, 0.55, abs(vUv.y - 0.5) * 1.1 + length(vUv - 0.5) * 0.35);
      float rad = 2.0 + tAmt * 7.0 + mist * 3.0;
      vec3 blur = col;
      if (tAmt > 0.002 || mist > 0.0) {
        blur = vec3(0.0);
        for (int i = 0; i < 12; i++) {
          float a = float(i) * 2.399963;
          float rr = sqrt(float(i) + 0.5) / sqrt(12.0);
          blur += src(uv + vec2(cos(a), sin(a)) * rr * rad * px);
        }
        blur /= 12.0;
      }
      col = mix(col, blur, clamp(tAmt, 0.0, 1.0));
      col = 1.0 - (1.0 - col) * (1.0 - blur * mist * 0.45);
      col = mix(col, blur, mist * 0.18);
      col = grade(col);

      // hand-inked contours: colour/value edges traced with a wobbly pen
      vec2 fq = vUv * resolution;
      float edge = 0.0;
      if (ink > 0.0 || wash > 0.0) {
        vec2 wob = (vec2(vnoise(fq * 0.045), vnoise(fq * 0.045 + 17.0)) - 0.5) * 2.2 * px;
        float rr = 1.15 * max(1.0, resolution.y / 1100.0);
        vec2 e = px * rr;
        vec3 c0 = src(uv + wob + vec2(-e.x, 0.0)), c1 = src(uv + wob + vec2(e.x, 0.0));
        vec3 c2 = src(uv + wob + vec2(0.0, -e.y)), c3 = src(uv + wob + vec2(0.0, e.y));
        vec3 gx = c1 - c0, gy = c3 - c2;
        float g = sqrt(dot(gx, gx) + dot(gy, gy));
        float lg = abs(luma(c1) - luma(c0)) + abs(luma(c3) - luma(c2));
        edge = smoothstep(0.16, 0.42, g * 0.6 + lg * 0.75);
        // the pen skips here and there
        edge *= 0.55 + 0.45 * smoothstep(0.25, 0.6, vnoise(fq * 0.07 + 3.0));
      }
      if (wash > 0.0) {
        // watercolour: pigment pools at the edges, uneven washes inside
        float bloom = vnoise(fq * 0.006) * 0.6 + vnoise(fq * 0.018 + 9.0) * 0.4;
        col *= 1.0 - wash * 0.16 * (bloom - 0.5);
        col = mix(col, col * col * 1.1, wash * edge * 0.35);
        col = mix(col, mix(col, paper, 0.4), wash * 0.06 * smoothstep(0.6, 0.85, bloom));
      }
      if (hatch > 0.0) {
        // cross-hatching in the shade, drawn on the paper
        float l = luma(col);
        float s1 = abs(fract((fq.x + fq.y) / 5.0 + vnoise(fq * 0.02) * 0.6) - 0.5);
        float s2 = abs(fract((fq.x - fq.y) / 5.0 + vnoise(fq * 0.02 + 5.0) * 0.6) - 0.5);
        float h1 = (1.0 - smoothstep(0.08, 0.2, s1)) * (1.0 - smoothstep(0.18, 0.42, l));
        float h2 = (1.0 - smoothstep(0.08, 0.2, s2)) * (1.0 - smoothstep(0.08, 0.26, l));
        col *= 1.0 - hatch * 0.35 * max(h1, h2);
      }
      if (ink > 0.0) col = mix(col, vec3(0.17, 0.11, 0.1) + col * 0.25, clamp(edge * ink, 0.0, 0.85));

      if (halftone > 0.0) {
        vec2 frag = vUv * resolution;
        // each plate is printed slightly out of register
        vec2 mo = vec2(1.0, -0.6) * misreg * px * dotSize * 0.45;
        vec4 kc = cmyk(col);
        vec4 kM = cmyk(grade(src(uv + mo)));
        vec4 kY = cmyk(grade(src(uv - mo * vec2(0.4, -1.3))));
        float cP = screen(frag, 0.2618, kc.x);
        float mP = screen(frag + mo * resolution, 1.309, kM.y);
        float yP = screen(frag - mo * resolution * vec2(0.4, -1.3), 0.0, kY.z);
        float kP = screen(frag, 0.7854, kc.w * 0.95);
        vec3 p = paper;
        p *= mix(vec3(1.0), vec3(0.05, 0.62, 0.86), cP);
        p *= mix(vec3(1.0), vec3(0.93, 0.2, 0.55), mP);
        p *= mix(vec3(1.0), vec3(1.0, 0.9, 0.12), yP);
        p *= mix(vec3(1.0), vec3(0.16, 0.13, 0.15), kP);
        // ink sits a bit soft in the paper: blend with the continuous tone
        vec3 cont = col * paper;
        col = mix(col, mix(p, cont, 0.28), halftone);
      }
      // texts: a clean solid print (no dots, offset plates, blur or ink lines)
      float keep = textMask(uv);
      if (keep > 0.0) col = mix(col, grade(src(uv)), keep);
      // paper fibres and grain
      vec2 fp = vUv * resolution;
      float fib = vnoise(fp * vec2(0.02, 0.05)) * 0.6 + vnoise(fp * 0.25) * 0.4;
      col *= 1.0 - grain * 0.8 * (fib - 0.5);
      col += (hash(fp) - 0.5) * grain * 0.7;
      float v = length((vUv - 0.5) * vec2(1.0, 0.85));
      col *= mix(1.0, vec3(0.78, 0.66, 0.6).r, vignette * smoothstep(0.35, 0.85, v));
      col = mix(col, col * vec3(0.95, 0.86, 0.8), vignette * smoothstep(0.4, 0.9, v));
      // transparent export: keep the scene's coverage as alpha
      float a = 1.0;
      if (alphaOut > 0.5) { vec2 au = uv; if (pixel > 1.0) { vec2 c = resolution / pixel; au = (floor(au * c) + 0.5) / c; } a = texture2D(tDiffuse, au).a; }
      gl_FragColor = vec4(col * a, a);
    }`,
};

// Same barrel mapping as the shader, for picking.
export function distortUV(uv, lens, aspect) {
  const p = { x: (uv.x - 0.5) * aspect, y: uv.y - 0.5 };
  const r2 = p.x * p.x + p.y * p.y;
  const rc = (aspect * aspect + 1) * 0.25;
  const f = (1 + lens * r2) / (1 + lens * rc * 0.55);
  return { x: (p.x * f) / aspect + 0.5, y: p.y * f + 0.5 };
}

// Long-lens perspective with an extra shear, like a hand-drawn "wrong"
// isometric: an oblique slant (depth slides sideways, so one face opens up)
// and a slight lean of the verticals. The view stays centred on the target.
export class SkewCamera extends THREE.PerspectiveCamera {
  constructor(...a) {
    super(...a);
    this.oblique = 0;
    this.lean = 0;
    this.focus = 60;
  }
  updateProjectionMatrix() {
    super.updateProjectionMatrix();
    if (!this.oblique && !this.lean) return;
    const f = this.focus;
    const S = new THREE.Matrix4().set(
      1, this.lean, this.oblique, this.oblique * f,
      0, 1, -this.oblique * 0.35, -this.oblique * 0.35 * f,
      0, 0, 1, 0,
      0, 0, 0, 1,
    );
    this.projectionMatrix.multiply(S);
    this.projectionMatrixInverse.copy(this.projectionMatrix).invert();
  }
}

// Look presets (from building-builder's STYLES), with French labels.
export const STYLES = {
  print: { label: 'Impression art-book', halftone: 0.7, dot: 2.2, misreg: 0.9, pixel: 1, posterize: 0, lens: 0.05, chroma: 0.25, mist: 0.22, tilt: 0.12, vignette: 0.2, warmth: 0.2, fade: 0.06, grain: 0.05, saturation: 1.2, wobble: 1, ink: 0.45, wash: 0.45, hatch: 0, shadowTint: 0.55 },
  gouache: { label: 'Encre et gouache', halftone: 0, dot: 3, misreg: 0, pixel: 1, posterize: 0, lens: 0.05, chroma: 0.15, mist: 0.2, tilt: 0.1, vignette: 0.2, warmth: 0.32, fade: 0.05, grain: 0.06, saturation: 1.22, wobble: 1.15, ink: 0.85, wash: 0.85, hatch: 0.3, shadowTint: 0.8 },
  film: { label: 'Film rétro', halftone: 0, dot: 3, misreg: 0, pixel: 1, posterize: 0, lens: 0.1, chroma: 0.6, mist: 0.45, tilt: 0.22, vignette: 0.42, warmth: 0.55, fade: 0.2, grain: 0.09, saturation: 1.05, wobble: 1, ink: 0, wash: 0.15, hatch: 0, shadowTint: 0.4 },
  pixel: { label: 'Pixel art', halftone: 0, dot: 3, misreg: 0, pixel: 3, posterize: 10, lens: 0, chroma: 0, mist: 0.08, tilt: 0, vignette: 0.12, warmth: 0.22, fade: 0.04, grain: 0.012, saturation: 1.2, wobble: 0.6, ink: 0.3, wash: 0, hatch: 0, shadowTint: 0.5 },
  clean: { label: 'Net', halftone: 0, dot: 3, misreg: 0, pixel: 1, posterize: 0, lens: 0, chroma: 0, mist: 0, tilt: 0, vignette: 0, warmth: 0, fade: 0, grain: 0, saturation: 1.05, wobble: 0.5, ink: 0.15, wash: 0, hatch: 0, shadowTint: 0.2 },
};

// Light moods (from building-builder). Shadows stay cool (sky fill), lit faces
// warm (sun), and a weak warm bounce keeps shaded faces readable, like gouache.
// `backdrop` is the paper the board sits on in that light.
export const MOOD_SETTINGS = {
  day: { sky: '#d9e6fa', ground: '#b49a78', hemi: 1.25, sun: '#ffeccc', sunI: 3.2, bounce: '#ffd09a', bounceI: 0.5, rim: '#cfe0ff', rimI: 0.55, env: 0.35, exposure: 1.03, lampScale: 0.35, sunAz: 145, sunEl: 52, backdrop: '#f3e9d4' },
  golden: { sky: '#e4d0c4', ground: '#8a5e3c', hemi: 0.95, sun: '#ffb560', sunI: 3.4, bounce: '#ffa868', bounceI: 0.6, rim: '#b8c8ff', rimI: 0.6, env: 0.3, exposure: 1.0, lampScale: 0.9, sunAz: 115, sunEl: 26, backdrop: '#f1dfc4' },
  dusk: { sky: '#8a8fc4', ground: '#4a3550', hemi: 0.8, sun: '#ff8a5a', sunI: 1.5, bounce: '#ff9a80', bounceI: 0.4, rim: '#9aa8ff', rimI: 0.7, env: 0.22, exposure: 1.1, lampScale: 1.6, sunAz: 235, sunEl: 20, backdrop: '#ddd3d6' },
  night: { sky: '#3b4a82', ground: '#1a1a26', hemi: 0.55, sun: '#a8bcff', sunI: 0.5, bounce: '#6d7fc4', bounceI: 0.18, rim: '#7f95ff', rimI: 0.6, env: 0.14, exposure: 1.2, lampScale: 2.6, sunAz: 200, sunEl: 55, backdrop: '#2a3046' },
};
