// Murdoku 3D board renderer: public API of js/vendor/murdoku3d.js.
// Built with `npm run build:3d` (tools/build-3d.mjs). Contract: docs/murdoku-format.md.
// Objects, materials, lights and looks are adapted from building-builder.
import { STYLES, MOOD_SETTINGS } from './looks.js';
import { BoardView } from './view.js';

let supportCache = null;
export function supported() {
  if (supportCache !== null) return supportCache;
  try {
    const cv = document.createElement('canvas');
    const gl = cv.getContext('webgl2') || cv.getContext('webgl');
    supportCache = !!gl;
    gl?.getExtension('WEBGL_lose_context')?.loseContext();
  } catch {
    supportCache = false;
  }
  return supportCache;
}

export const LOOKS = Object.entries(STYLES).map(([id, s]) => ({ id, label: s.label }));
export const MOODS = Object.keys(MOOD_SETTINGS);

export async function createView(container, opts = {}) {
  if (!container) throw new Error('murdoku3d: container required');
  return new BoardView(container, opts);
}

// Offscreen render of a puzzle into a new canvas (PNG export, print).
export async function renderImage(puzzle, { show = 'blank', placements, crosses, selected, highlight, look, mood, camera, labels, names, width = 1600, height, transparent = false } = {}) {
  height = height ?? width;
  const div = document.createElement('div');
  div.style.cssText = `position:fixed;left:-20000px;top:0;width:${Math.min(width, 1200)}px;height:${Math.round((Math.min(width, 1200) * height) / width)}px;pointer-events:none;`;
  document.body.appendChild(div);
  const opts = { interactive: false };
  for (const [k, v] of Object.entries({ look, mood, camera, labels, names })) if (v !== undefined) opts[k] = v;
  const view = new BoardView(div, opts);
  try {
    view.setPuzzle(puzzle, { show, placements, crosses, selected, highlight });
    return await view.toCanvas({ width, height, transparent });
  } finally {
    view.dispose();
    div.remove();
  }
}
