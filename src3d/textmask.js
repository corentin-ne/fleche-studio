// Text protection for the art-book looks. The style pass prints everything with
// halftone dots, offset plates and blur, which makes small text unreadable. The
// texts (border coordinates, room plates, figure badges) are also drawn, as
// white silhouettes and depth-tested against the scene, into a mask; the style
// pass prints those pixels as a clean solid ink instead.
import * as THREE from 'three';

export const TEXT_LAYER = 1;

// White silhouette (alpha only) of a canvas texture, cached on the texture.
function silhouette(tex) {
  if (tex.userData.silhouette) return tex.userData.silhouette;
  const src = tex.image;
  const cv = document.createElement('canvas');
  cv.width = src.width;
  cv.height = src.height;
  const g = cv.getContext('2d');
  g.drawImage(src, 0, 0);
  g.globalCompositeOperation = 'source-in';
  g.fillStyle = '#ffffff';
  g.fillRect(0, 0, cv.width, cv.height);
  const t = new THREE.CanvasTexture(cv);
  t.anisotropy = tex.anisotropy;
  tex.userData.silhouette = t;
  return t;
}

// Marks a mesh or sprite with a texture of text as protected.
export function markText(obj) {
  const map = obj.material?.map;
  if (!map?.image) return obj;
  const sil = silhouette(map);
  obj.userData.textMask = obj.isSprite
    ? new THREE.SpriteMaterial({ map: sil, depthTest: false, depthWrite: false, transparent: true })
    : new THREE.MeshBasicMaterial({ map: sil, transparent: true, depthWrite: false, toneMapped: false, alphaTest: 0.02, side: obj.material.side });
  obj.layers.enable(TEXT_LAYER);
  return obj;
}

// Frees what markText created.
export function disposeText(obj) {
  const m = obj.userData.textMask;
  if (!m) return;
  m.map.dispose();
  m.dispose();
  obj.userData.textMask = null;
}

// Renders the text mask of `scenes` (seen by `camera`) into `target`:
// the first scene also gives the depth of what may hide the texts.
export class TextMask {
  constructor() {
    this.target = new THREE.WebGLRenderTarget(1, 1, { depthBuffer: true });
    this.depthOnly = new THREE.MeshBasicMaterial({ colorWrite: false });
    this._clear = new THREE.Color();
  }

  setSize(w, h) {
    this.target.setSize(Math.max(1, Math.round(w)), Math.max(1, Math.round(h)));
  }

  render(renderer, camera, scene, overlay) {
    const swapped = [];
    const swap = (root) => root.traverse((o) => {
      if (!o.userData.textMask || !o.visible) return;
      swapped.push([o, o.material]);
      o.material = o.userData.textMask;
    });
    const prev = { target: renderer.getRenderTarget(), alpha: renderer.getClearAlpha(), bg: scene.background, mask: camera.layers.mask, autoClear: renderer.autoClear };
    renderer.getClearColor(this._clear);
    renderer.setRenderTarget(this.target);
    renderer.setClearColor(0x000000, 0);
    renderer.clear();
    renderer.autoClear = false; // the depth of step 1 is kept for step 2
    scene.background = null;
    // 1. depth of the board (furniture, figures, walls may hide a plate)
    scene.overrideMaterial = this.depthOnly;
    renderer.render(scene, camera);
    scene.overrideMaterial = null;
    // 2. the texts themselves
    swap(scene);
    swap(overlay);
    camera.layers.set(TEXT_LAYER);
    renderer.render(scene, camera);
    renderer.render(overlay, camera);
    // restore
    camera.layers.mask = prev.mask;
    renderer.autoClear = prev.autoClear;
    for (const [o, m] of swapped) o.material = m;
    scene.background = prev.bg;
    renderer.setRenderTarget(prev.target);
    renderer.setClearColor(this._clear, prev.alpha);
    return swapped.length > 0;
  }

  dispose() {
    this.target.dispose();
    this.depthOnly.dispose();
  }
}
