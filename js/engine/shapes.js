/* =========================================================================
   Formes de grille : rectangle, cercle, cœur, étoile… et lettres / chiffres.
   Une forme est une fonction (u, v) -> dedans ? sur le carré [-1, 1]²
   (v vers le bas). Le masque d'un cadre de w × h cases en découle :
   seules les cases « dedans » reçoivent lettres et définitions.
   Les lettres et chiffres sont dessinés au trait épais (squelette de
   segments + épaisseur) : aucune police nécessaire, donc utilisables dans
   le worker et identiques sur tous les appareils.
   ========================================================================= */
window.MF = window.MF || {};

MF.shapes = (() => {
  const { t } = MF.i18n;
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
  const disc = (u, v, x, y, r) => (u - x) ** 2 + (v - y) ** 2 <= r * r;
  const star = fitted(Array.from({ length: 10 }, (_, i) => {
    const a = -Math.PI / 2 + (i * Math.PI) / 5, r = i % 2 ? 0.5 : 1;
    return [Math.cos(a) * r, Math.sin(a) * r];
  }));
  const tree = fitted([[0, -1], [0.5, -0.38], [0.28, -0.38], [0.75, 0.22], [0.45, 0.22], [1, 0.74], [0.24, 0.74], [0.24, 1], [-0.24, 1], [-0.24, 0.74], [-1, 0.74], [-0.45, 0.22], [-0.75, 0.22], [-0.28, -0.38], [-0.5, -0.38]]);
  const house = [[0, -1], [1, -0.15], [0.78, -0.15], [0.78, 1], [-0.78, 1], [-0.78, -0.15], [-1, -0.15]];
  const crown = [[-1, 1], [-1, -0.75], [-0.5, -0.05], [0, -1], [0.5, -0.05], [1, -0.75], [1, 1]];
  const arrow = [[-1, -0.42], [0.15, -0.42], [0.15, -1], [1, 0], [0.15, 1], [0.15, 0.42], [-1, 0.42]];
  const catEars = [[[-0.95, 0], [-0.82, -1], [-0.2, -0.6]], [[0.95, 0], [0.82, -1], [0.2, -0.6]]];
  const cloud = (u, v) => [[-0.45, 0.15, 0.55], [0.1, -0.2, 0.68], [0.55, 0.2, 0.48]].some(([x, y, r]) => disc(u, v, x, y, r)) || (v >= 0.1 && v <= 0.68 && Math.abs(u) <= 0.95);

  /* ---------------- Lettres et chiffres au trait ---------------- */
  /** Arc d'ellipse en points (angles en degrés, 0 = droite, 90 = bas). */
  function arc(cx, cy, rx, ry, a0, a1, n = 18) {
    return Array.from({ length: n + 1 }, (_, i) => {
      const a = ((a0 + ((a1 - a0) * i) / n) * Math.PI) / 180;
      return [cx + Math.cos(a) * rx, cy + Math.sin(a) * ry];
    });
  }
  /**
   * Squelettes sur [0, 1]² (y vers le bas) : chaque glyphe est une liste de
   * traits (suites de points). Pensés pour des traits épais : pas de détail fin.
   */
  const RING = arc(0.5, 0.5, 0.5, 0.5, 0, 360, 32);
  const P_BOWL = [[0, 1], [0, 0], [0.5, 0], ...arc(0.5, 0.28, 0.5, 0.28, -90, 90), [0, 0.56]];
  const GLYPHS = {
    A: [[[0, 1], [0.5, 0], [1, 1]], [[0.22, 0.66], [0.78, 0.66]]],
    B: [[[0, 0], [0, 1]], [[0, 0], [0.55, 0], ...arc(0.55, 0.24, 0.38, 0.24, -90, 90), [0, 0.48]], [[0, 0.48], [0.6, 0.48], ...arc(0.6, 0.74, 0.4, 0.26, -90, 90), [0, 1]]],
    C: [arc(0.5, 0.5, 0.5, 0.5, -45, -315, 28)],
    D: [[[0, 0], [0, 1]], [[0, 0], [0.4, 0], ...arc(0.4, 0.5, 0.6, 0.5, -90, 90), [0, 1]]],
    E: [[[1, 0], [0, 0], [0, 1], [1, 1]], [[0, 0.5], [0.8, 0.5]]],
    F: [[[1, 0], [0, 0], [0, 1]], [[0, 0.48], [0.8, 0.48]]],
    G: [[...arc(0.5, 0.5, 0.5, 0.5, -45, -360, 28), [0.55, 0.5]]],
    H: [[[0, 0], [0, 1]], [[1, 0], [1, 1]], [[0, 0.5], [1, 0.5]]],
    I: [[[0.5, 0], [0.5, 1]], [[0.1, 0], [0.9, 0]], [[0.1, 1], [0.9, 1]]],
    J: [[[0.3, 0], [1, 0]], [[0.85, 0], [0.85, 0.62], ...arc(0.45, 0.62, 0.4, 0.38, 0, 180), [0.05, 0.55]]],
    K: [[[0, 0], [0, 1]], [[1, 0], [0, 0.6]], [[0.32, 0.38], [1, 1]]],
    L: [[[0, 0], [0, 1], [1, 1]]],
    M: [[[0, 1], [0, 0], [0.5, 0.62], [1, 0], [1, 1]]],
    N: [[[0, 1], [0, 0], [1, 1], [1, 0]]],
    O: [RING],
    P: [P_BOWL],
    Q: [RING, [[0.58, 0.62], [1, 1]]],
    R: [P_BOWL, [[0.42, 0.56], [1, 1]]],
    S: [[...arc(0.5, 0.25, 0.48, 0.25, -25, -270), ...arc(0.5, 0.75, 0.5, 0.25, -90, 155)]],
    T: [[[0, 0], [1, 0]], [[0.5, 0], [0.5, 1]]],
    U: [[[0, 0], [0, 0.55], ...arc(0.5, 0.55, 0.5, 0.45, 180, 0), [1, 0]]],
    V: [[[0, 0], [0.5, 1], [1, 0]]],
    W: [[[0, 0], [0.25, 1], [0.5, 0.3], [0.75, 1], [1, 0]]],
    X: [[[0, 0], [1, 1]], [[1, 0], [0, 1]]],
    Y: [[[0, 0], [0.5, 0.5], [1, 0]], [[0.5, 0.5], [0.5, 1]]],
    Z: [[[0, 0], [1, 0], [0, 1], [1, 1]]],
    0: [RING],
    1: [[[0.15, 0.25], [0.6, 0], [0.6, 1]], [[0.15, 1], [1, 1]]],
    2: [[...arc(0.5, 0.3, 0.5, 0.3, 180, 390), [0, 1], [1, 1]]],
    3: [[...arc(0.5, 0.25, 0.48, 0.25, -160, 90), ...arc(0.5, 0.75, 0.5, 0.25, -90, 160)]],
    4: [[[0.72, 1], [0.72, 0], [0, 0.68], [1, 0.68]]],
    5: [[[0.95, 0], [0.1, 0], [0.04, 0.46], ...arc(0.5, 0.69, 0.5, 0.31, -135, 150)]],
    6: [arc(0.5, 0.69, 0.5, 0.31, 0, 360, 28), [[0.85, 0], [0.3, 0.22], [0.02, 0.66]]],
    7: [[[0, 0], [1, 0], [0.38, 1]]],
    8: [arc(0.5, 0.25, 0.42, 0.25, 0, 360, 24), arc(0.5, 0.73, 0.5, 0.27, 0, 360, 24)],
    9: [arc(0.5, 0.31, 0.5, 0.31, 0, 360, 28), [[0.98, 0.34], [0.7, 0.78], [0.15, 1]]],
  };
  /** Demi-épaisseur du trait (fraction du glyphe) : assez large pour croiser des mots. */
  const STROKE = 0.13;
  function segDist2(px, py, [ax, ay], [bx, by]) {
    const dx = bx - ax, dy = by - ay, L = dx * dx + dy * dy;
    const t = L ? Math.max(0, Math.min(1, ((px - ax) * dx + (py - ay) * dy) / L)) : 0;
    return (px - ax - t * dx) ** 2 + (py - ay - t * dy) ** 2;
  }
  function glyph(strokes) {
    const segs = strokes.flatMap(s => s.slice(1).map((p, i) => [s[i], p]));
    const k = 1 - STROKE * 2, h2 = STROKE * STROKE;
    return (u, v) => {
      // Squelette rentré de l'épaisseur du trait : le contour touche les bords du cadre
      const x = ((u + 1) / 2 - STROKE) / k, y = ((v + 1) / 2 - STROKE) / k;
      return segs.some(([a, b]) => segDist2(x, y, a, b) * k * k <= h2);
    };
  }

  /* ---------------- Catalogue ---------------- */
  /** Familles du sélecteur, dans l'ordre d'affichage. */
  const GROUPS = { basic: t('Formes'), fun: t('Symboles'), letters: t('Lettres'), digits: t('Chiffres') };
  const SHAPES = {
    rect: { label: t('Rectangle'), group: 'basic', test: () => true },
    rounded: { label: t('Arrondi'), group: 'basic', test: (u, v) => u ** 4 + v ** 4 <= 1 },
    circle: { label: t('Cercle'), group: 'basic', test: (u, v) => u * u + v * v <= 1 },
    ring: { label: t('Anneau'), group: 'basic', test: (u, v) => { const r = u * u + v * v; return r <= 1 && r >= 0.16; } },
    triangle: { label: t('Triangle'), group: 'basic', test: (u, v) => Math.abs(u) <= (v + 1) / 2 },
    diamond: { label: t('Losange'), group: 'basic', test: (u, v) => Math.abs(u) + Math.abs(v) <= 1.04 },
    hexagon: { label: t('Hexagone'), group: 'basic', test: (u, v) => Math.abs(v) <= 1 && Math.abs(u) <= 1 - Math.abs(v) * 0.5 },
    octagon: { label: t('Octogone'), group: 'basic', test: (u, v) => Math.abs(u) + Math.abs(v) <= 1.45 },
    cross: { label: t('Croix'), group: 'basic', test: (u, v) => Math.abs(u) <= 0.38 || Math.abs(v) <= 0.38 },
    arrow: { label: t('Flèche'), group: 'basic', test: (u, v) => inPoly(arrow, u, v) },
    heart: {
      label: t('Cœur'), group: 'fun',
      test: (u, v) => { const x = u * 1.14, y = -v * 1.13 + 0.12; return (x * x + y * y - 1) ** 3 - x * x * y ** 3 <= 0; },
    },
    star: { label: t('Étoile'), group: 'fun', test: (u, v) => inPoly(star, u, v) },
    cloud: { label: t('Nuage'), group: 'fun', test: (u, v) => cloud(u, v * 1.25 - 0.05) },
    moon: { label: t('Lune'), group: 'fun', test: (u, v) => disc(u, v, 0, 0, 1) && !disc(u, v, 0.55, -0.3, 0.78) },
    drop: { label: t('Goutte'), group: 'fun', test: (u, v) => { const x = u * 0.66; return disc(x, v, 0, 0.34, 0.66) || Math.abs(x) <= ((v + 1) / 1.2) * 0.58; } },
    flower: { label: t('Fleur'), group: 'fun', test: (u, v) => Math.hypot(u, v) <= 0.74 + 0.26 * Math.cos(5 * (Math.atan2(v, u) + Math.PI / 2)) },
    egg: { label: t('Œuf'), group: 'fun', test: (u, v) => (u / (0.8 + 0.2 * v)) ** 2 + v * v <= 1 },
    cat: { label: t('Chat'), group: 'fun', test: (u, v) => disc(u, v, 0, 0.16, 0.84) || catEars.some(p => inPoly(p, u, v)) },
    crown: { label: t('Couronne'), group: 'fun', test: (u, v) => inPoly(crown, u, v) },
    shield: { label: t('Écusson'), group: 'fun', test: (u, v) => v <= 0.05 || Math.abs(u) <= 1 - ((v - 0.05) / 0.95) ** 1.7 },
    tree: { label: t('Sapin'), group: 'fun', test: (u, v) => inPoly(tree, u, v) },
    house: { label: t('Maison'), group: 'fun', test: (u, v) => inPoly(house, u, v) },
  };
  for (const [ch, strokes] of Object.entries(GLYPHS)) {
    const digit = /\d/.test(ch);
    SHAPES[digit ? `n${ch}` : `l${ch}`] = { label: digit ? t('Chiffre {ch}', { ch }) : t('Lettre {ch}', { ch }), short: ch, group: digit ? 'digits' : 'letters', glyph: true, test: glyph(strokes) };
  }
  const get = id => SHAPES[id] || SHAPES.rect;
  const ids = Object.keys(SHAPES);
  const byGroup = g => ids.filter(id => SHAPES[id].group === g);
  const groupOf = id => get(id).group;

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
    if (cache.size > 300) cache.clear();
    cache.set(key, m);
    return m;
  }

  /** Part utilisable du cadre (1 pour le rectangle). */
  function fraction(shapeId) {
    if (shapeId === 'rect') return 1;
    const m = mask(shapeId, 40, 40, 0);
    return m.reduce((s, x) => s + x, 0) / m.length;
  }

  /** Longueur de ligne utile par rapport au cadre : plus courte dans une forme, plus encore dans le trait d'une lettre. */
  const reach = shapeId => (shapeId === 'rect' ? 1 : get(shapeId).glyph ? 0.7 : 0.82);

  /** Aperçu : la forme dessinée en petites cases (SVG). Les lettres demandent plus de cases pour rester lisibles. */
  function preview(shapeId, n = 13) {
    if (get(shapeId).glyph) n = Math.max(n, 16);
    const m = mask(shapeId, n, n, 0);
    let rects = '';
    for (let r = 0; r < n; r++) for (let c = 0; c < n; c++) if (m[r * n + c]) rects += `<rect x="${c * 2}" y="${r * 2}" width="1.7" height="1.7" rx=".35"/>`;
    return `<svg viewBox="0 0 ${n * 2} ${n * 2}" class="shape-preview" aria-hidden="true">${rects}</svg>`;
  }

  return { SHAPES, GROUPS, mask, fraction, reach, preview, ids, byGroup, groupOf };
})();
