/* =========================================================================
   Formes de grille : rectangle, cercle, cœur, étoile…
   Une forme est une fonction (u, v) -> dedans ? sur le carré [-1, 1]²
   (v vers le bas). Le masque d'un cadre de w × h cases en découle :
   seules les cases « dedans » reçoivent lettres et définitions.
   ========================================================================= */
window.MF = window.MF || {};

MF.shapes = (() => {
  /** Point dans un polygone (règle pair-impair). */
  function inPoly(pts, x, y) {
    let inside = false;
    for (let i = 0, j = pts.length - 1; i < pts.length; j = i++) {
      const [xi, yi] = pts[i], [xj, yj] = pts[j];
      if ((yi > y) !== (yj > y) && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) inside = !inside;
    }
    return inside;
  }
  /** Polygone recadré pour remplir tout le carré [-1, 1]². */
  function fitted(pts) {
    const xs = pts.map(p => p[0]), ys = pts.map(p => p[1]);
    const [x0, x1, y0, y1] = [Math.min(...xs), Math.max(...xs), Math.min(...ys), Math.max(...ys)];
    return pts.map(([x, y]) => [((x - x0) / (x1 - x0)) * 2 - 1, ((y - y0) / (y1 - y0)) * 2 - 1]);
  }
  const star = fitted(Array.from({ length: 10 }, (_, i) => {
    const a = -Math.PI / 2 + (i * Math.PI) / 5, r = i % 2 ? 0.5 : 1;
    return [Math.cos(a) * r, Math.sin(a) * r];
  }));
  const tree = fitted([[0, -1], [0.5, -0.38], [0.28, -0.38], [0.75, 0.22], [0.45, 0.22], [1, 0.74], [0.24, 0.74], [0.24, 1], [-0.24, 1], [-0.24, 0.74], [-1, 0.74], [-0.45, 0.22], [-0.75, 0.22], [-0.28, -0.38], [-0.5, -0.38]]);
  const house = [[0, -1], [1, -0.15], [0.78, -0.15], [0.78, 1], [-0.78, 1], [-0.78, -0.15], [-1, -0.15]];
  const cloud = (u, v) => [[-0.45, 0.15, 0.55], [0.1, -0.2, 0.68], [0.55, 0.2, 0.48]].some(([x, y, r]) => (u - x) ** 2 + (v - y) ** 2 <= r * r) || (v >= 0.1 && v <= 0.68 && Math.abs(u) <= 0.95);

  const SHAPES = {
    rect: { label: 'Rectangle', test: () => true },
    rounded: { label: 'Arrondi', test: (u, v) => u ** 4 + v ** 4 <= 1 },
    circle: { label: 'Cercle', test: (u, v) => u * u + v * v <= 1 },
    heart: {
      label: 'Cœur',
      test: (u, v) => { const x = u * 1.14, y = -v * 1.13 + 0.12; return (x * x + y * y - 1) ** 3 - x * x * y ** 3 <= 0; },
    },
    star: { label: 'Étoile', test: (u, v) => inPoly(star, u, v) },
    diamond: { label: 'Losange', test: (u, v) => Math.abs(u) + Math.abs(v) <= 1.04 },
    hexagon: { label: 'Hexagone', test: (u, v) => Math.abs(v) <= 1 && Math.abs(u) <= 1 - Math.abs(v) * 0.5 },
    cross: { label: 'Croix', test: (u, v) => Math.abs(u) <= 0.38 || Math.abs(v) <= 0.38 },
    tree: { label: 'Sapin', test: (u, v) => inPoly(tree, u, v) },
    house: { label: 'Maison', test: (u, v) => inPoly(house, u, v) },
    cloud: { label: 'Nuage', test: (u, v) => cloud(u, v * 1.25 - 0.05) },
  };
  const get = id => SHAPES[id] || SHAPES.rect;

  /** Une case est dans la forme si au moins 3 de ses 5 points témoins le sont (bords plus réguliers). */
  const SAMPLES = [[0.5, 0.5], [0.22, 0.22], [0.78, 0.22], [0.22, 0.78], [0.78, 0.78]];
  const cache = new Map();

  /**
   * Masque d'un cadre : Uint8Array w*h (1 = case utilisable).
   * Les `top` premières lignes (bande libre) sont hors forme.
   */
  function mask(shapeId, w, h, top = 0) {
    const key = `${shapeId}|${w}|${h}|${top}`;
    if (cache.has(key)) return cache.get(key);
    const m = new Uint8Array(w * h);
    const { test } = get(shapeId);
    const H = h - top;
    for (let r = top; r < h; r++) {
      for (let c = 0; c < w; c++) {
        let n = 0;
        for (const [dx, dy] of SAMPLES) if (test(((c + dx) / w) * 2 - 1, ((r - top + dy) / H) * 2 - 1)) n++;
        m[r * w + c] = shapeId === 'rect' || n >= 3 ? 1 : 0;
      }
    }
    if (cache.size > 200) cache.clear();
    cache.set(key, m);
    return m;
  }

  /** Part utilisable du cadre (1 pour le rectangle). */
  function fraction(shapeId) {
    if (shapeId === 'rect') return 1;
    const m = mask(shapeId, 40, 40, 0);
    return m.reduce((s, x) => s + x, 0) / m.length;
  }

  /** Aperçu : la forme dessinée en petites cases (SVG). */
  function preview(shapeId, n = 13) {
    const m = mask(shapeId, n, n, 0);
    let rects = '';
    for (let r = 0; r < n; r++) for (let c = 0; c < n; c++) if (m[r * n + c]) rects += `<rect x="${c * 2}" y="${r * 2}" width="1.7" height="1.7" rx=".35"/>`;
    return `<svg viewBox="0 0 ${n * 2} ${n * 2}" class="shape-preview" aria-hidden="true">${rects}</svg>`;
  }

  return { SHAPES, mask, fraction, preview, ids: Object.keys(SHAPES) };
})();
