// @ts-check
/* =========================================================================
   Design d'une grille : polices, styles de cases, couleurs résolues, métriques.
   Le design est une donnée pure (sérialisable) ; ce module en dérive tout ce
   que le modèle et les rendus doivent savoir.
   ========================================================================= */
window.MF = window.MF || {};

MF.design = (() => {
  const { tint, shade, mix, onColor, luminance } = MF.util;
  const { t } = MF.i18n;

  /** Polices proposées (hébergées avec l'application : css/fonts.css). */
  const FONTS = {
    inter: { label: 'Inter', css: '"Inter", "Segoe UI", Arial, sans-serif', weights: [400, 500, 600, 700, 800] },
    nunito: { label: 'Nunito', css: '"Nunito", "Segoe UI", Arial, sans-serif', weights: [600, 700, 800] },
    baloo: { label: 'Baloo 2', css: '"Baloo 2", "Segoe UI", Arial, sans-serif', weights: [500, 600, 700, 800] },
    grotesk: { label: 'Space Grotesk', css: '"Space Grotesk", "Segoe UI", Arial, sans-serif', weights: [500, 600, 700] },
    fraunces: { label: 'Fraunces', css: '"Fraunces", Georgia, serif', weights: [500, 600, 700] },
    playfair: { label: 'Playfair Display', css: '"Playfair Display", Georgia, serif', weights: [600, 700] },
    caveat: { label: t('Caveat (manuscrite)'), css: '"Caveat", "Segoe Print", cursive', weights: [600, 700] },
    patrick: { label: 'Patrick Hand', css: '"Patrick Hand", "Segoe Print", cursive', weights: [400] },
    marker: { label: 'Permanent Marker', css: '"Permanent Marker", "Segoe Print", cursive', weights: [400] },
    mono: { label: 'JetBrains Mono', css: '"JetBrains Mono", Consolas, monospace', weights: [400, 500, 600, 700] },
  };
  const font = id => FONTS[id] || FONTS.inter;
  /** Charge des polices dans toutes leurs graisses (résolu même si l'une échoue). */
  const loadFonts = (list = Object.values(FONTS)) =>
    Promise.all(list.flatMap(f => f.weights.map(w => document.fonts.load(`${w} 20px ${f.css}`).catch(() => null))));
  /** Graisse disponible la plus proche (évite le faux gras des polices à une seule graisse). */
  const weightFor = (id, w) => font(id).weights.reduce((best, x) => (Math.abs(x - w) < Math.abs(best - w) ? x : best));

  /** Styles de cases : raccourcis qui règlent espacement, arrondi, trait et forme des lettres. */
  const CELL_STYLES = {
    classic: { label: t('Classique'), gap: 0, radius: 0, line: 3, letterShape: 'square', shadow: false },
    rounded: { label: t('Arrondies'), gap: 0, radius: 18, line: 3, letterShape: 'square', shadow: false },
    tiles: { label: t('Tuiles'), gap: 9, radius: 14, line: 0, letterShape: 'square', shadow: true },
    bubbles: { label: t('Bulles'), gap: 6, radius: 22, line: 0, letterShape: 'circle', shadow: false },
    thin: { label: t('Trait fin'), gap: 0, radius: 0, line: 1.5, letterShape: 'square', shadow: false },
    bold: { label: t('Trait épais'), gap: 0, radius: 0, line: 7, letterShape: 'square', shadow: false },
  };

  const ARROWS = { solid: t('Triangles'), chevron: t('Chevrons'), bold: t('Grosses flèches'), dot: t('Pastilles') };
  const VOIDS = { frame: t('Couleur du cadre'), transparent: t('Transparentes (voir le fond)'), light: t('Couleur claire'), hatch: t('Hachurées') };

  /**
   * Formats d'affiche, par famille.
   *  - print / cards : feuilles et cartes (mm, en portrait ; l'orientation peut basculer) ;
   *  - social / screen : formats en pixels, orientation fixe ;
   *  - fit : l'affiche épouse la grille ; custom : rapport libre.
   */
  const FORMAT_GROUPS = { auto: t('Automatique'), print: t('Impression'), cards: t('Cartes'), social: t('Réseaux sociaux'), screen: t('Écrans'), custom: t('Sur mesure') };
  const FORMATS = {
    fit: { label: t('Ajusté'), hint: t('Épouse la grille'), group: 'auto' },
    A6: { label: 'A6', hint: '105 × 148 mm', group: 'print', mm: [105, 148] },
    A5: { label: 'A5', hint: '148 × 210 mm', group: 'print', mm: [148, 210] },
    A4: { label: 'A4', hint: '210 × 297 mm', group: 'print', mm: [210, 297] },
    A3: { label: 'A3', hint: '297 × 420 mm', group: 'print', mm: [297, 420] },
    A2: { label: 'A2', hint: '420 × 594 mm', group: 'print', mm: [420, 594] },
    letter: { label: 'US Letter', hint: t('8,5 × 11 in'), group: 'print', mm: [216, 279] },
    legal: { label: 'US Legal', hint: t('8,5 × 14 in'), group: 'print', mm: [216, 356] },
    tabloid: { label: t('Tabloïd'), hint: '11 × 17 in', group: 'print', mm: [279, 432] },
    photo: { label: t('Photo 10 × 15'), hint: '102 × 152 mm', group: 'cards', mm: [102, 152] },
    photo13: { label: t('Photo 13 × 18'), hint: '130 × 180 mm', group: 'cards', mm: [130, 180] },
    card57: { label: t('Carte 5 × 7'), hint: '127 × 178 mm', group: 'cards', mm: [127, 178] },
    cardSq: { label: t('Carte carrée'), hint: '150 × 150 mm', group: 'cards', mm: [150, 150] },
    dl: { label: t('Flyer DL'), hint: '99 × 210 mm', group: 'cards', mm: [99, 210] },
    bookmark: { label: t('Marque-page'), hint: '50 × 180 mm', group: 'cards', mm: [50, 180] },
    square: { label: t('Carré'), hint: '1080 × 1080', group: 'social', px: [1080, 1080] },
    post: { label: 'Post 4:5', hint: '1080 × 1350', group: 'social', px: [1080, 1350] },
    story: { label: 'Story 9:16', hint: '1080 × 1920', group: 'social', px: [1080, 1920] },
    pin: { label: t('Épingle 2:3'), hint: '1000 × 1500', group: 'social', px: [1000, 1500] },
    youtube: { label: t('Miniature vidéo'), hint: '1280 × 720', group: 'social', px: [1280, 720] },
    xpost: { label: t('Post paysage'), hint: '1600 × 900', group: 'social', px: [1600, 900] },
    linkedin: { label: t('Lien partagé'), hint: '1200 × 627', group: 'social', px: [1200, 627] },
    cover: { label: t('Bannière'), hint: '1640 × 624', group: 'social', px: [1640, 624] },
    wide: { label: t('Écran 16:9'), hint: '1920 × 1080', group: 'screen', px: [1920, 1080] },
    desk: { label: t('Écran 16:10'), hint: '2560 × 1600', group: 'screen', px: [2560, 1600] },
    ultra: { label: t('Ultra-large 21:9'), hint: '3440 × 1440', group: 'screen', px: [3440, 1440] },
    slide: { label: t('Diapo 4:3'), hint: '1600 × 1200', group: 'screen', px: [1600, 1200] },
    phone: { label: t('Fond téléphone'), hint: '1170 × 2532', group: 'screen', px: [1170, 2532] },
    tablet: { label: t('Fond tablette'), hint: '1640 × 2360', group: 'screen', px: [1640, 2360] },
    custom: { label: t('Personnalisé'), hint: t('Largeur × hauteur'), group: 'custom' },
  };
  for (const f of Object.values(FORMATS)) {
    const [w, h] = f.mm || f.px || [];
    if (w) f.ratio = w / h;
  }
  /** Dimensions en mm d'un format papier selon l'orientation (null pour les formats écran). */
  function formatMm(p) {
    const f = FORMATS[p.format];
    if (!f?.mm) return null;
    const [w, h] = f.mm;
    return p.orientation === 'landscape' ? [h, w] : [w, h];
  }
  /** Rapport largeur / hauteur effectif d'un format (null = ajusté à la grille). */
  function formatRatio(p) {
    const f = FORMATS[p.format] || FORMATS.fit;
    if (p.format === 'custom') return Math.max(0.1, Math.min(10, p.customW / p.customH));
    if (!f.ratio) return null;
    return f.mm && p.orientation === 'landscape' ? 1 / f.ratio : f.ratio;
  }
  const ANCHORS = ['nw', 'n', 'ne', 'w', 'c', 'e', 'sw', 's', 'se'];

  const DEFAULT = {
    theme: 'violet',
    accent: '#7b3fe4',
    colors: { frame: 'auto', line: 'auto', arrow: 'auto', letter: 'auto', clue: 'auto', ink: 'auto', clueInk: 'auto', solution: 'auto', void: 'auto' },
    background: { type: 'solid', c1: '#f6f1ff', c2: '#e3d5ff', c3: '#ffd9ec', angle: 135, pattern: 'dots', scale: 1, imageId: '', fit: 'cover', imageOpacity: 1, overlay: '#000000', overlayOpacity: 0 },
    frame: { width: 26, radius: 0 },
    voids: 'frame',
    cell: { style: 'classic', gap: 0, radius: 0, line: 3, letterShape: 'square', shadow: false },
    font: { clue: 'inter', letter: 'inter', clueWeight: 600, clueSize: 17, upper: false },
    arrows: { style: 'solid', size: 1 },
    poster: { format: 'fit', orientation: 'portrait', padding: 70, anchor: 'c', scale: 1, radius: 0, customW: 1200, customH: 1600 },
    title: { show: false, text: '', subtitle: '', font: 'fraunces', color: 'auto', size: 110, align: 'center' },
    lists: { font: 'inter', size: 30, color: 'auto' },
    // Multicolore : coupé par défaut (les anciennes grilles, sans ce réglage, ne changent pas)
    multi: { on: false, targets: { letters: true, cells: false, clues: false, words: false }, mode: 'letter', preset: 'rainbow', palette: ['#e53935', '#fb8c00', '#fdd835', '#43a047', '#1e88e5', '#3949ab', '#8e24aa'], seed: 0 },
  };

  /** Fusion profonde (objets simples uniquement), sans muter les entrées. */
  function merge(base, patch) {
    if (!patch || typeof patch !== 'object' || Array.isArray(patch)) return base;
    const out = Array.isArray(base) ? [...base] : { ...base };
    for (const [k, v] of Object.entries(patch)) {
      if (k === '__proto__' || k === 'constructor' || k === 'prototype') continue;
      out[k] = v && typeof v === 'object' && !Array.isArray(v) && base?.[k] && typeof base[k] === 'object' ? merge(base[k], v) : v;
    }
    return out;
  }

  /** Couleur dominante du fond de l'affiche (pour le titre automatique, etc.). */
  function backgroundTone(d) {
    const b = d.background;
    if (b.type === 'none') return '#ffffff';
    if (b.type === 'image') return b.overlayOpacity > 0.4 ? b.overlay : '#808080';
    if (b.type === 'gradient' || b.type === 'radial') return mix(b.c1, b.c2, 0.5);
    return b.c1;
  }

  /** Rapport de contraste WCAG entre deux couleurs (1 … 21). */
  const contrast = (x, y) => { const [l1, l2] = [luminance(x), luminance(y)].sort((p, q) => q - p); return (l1 + 0.05) / (l2 + 0.05); };
  /**
   * Couleur lisible sur un fond : si le contraste est insuffisant, on l'assombrit
   * (fond clair) ou l'éclaircit (fond sombre) jusqu'à atteindre le minimum.
   */
  function readable(color, bg, min = 4.5) {
    if (contrast(color, bg) >= min) return color;
    const dark = luminance(bg) > 0.4;
    for (let t = 0.15; t <= 1; t += 0.15) {
      const c = dark ? mix(color, '#000000', t) : mix(color, '#ffffff', t);
      if (contrast(c, bg) >= min) return c;
    }
    return dark ? '#1d1b22' : '#ffffff';
  }

  /* ---------------- Multicolore ---------------- */
  /** Palettes prêtes à l'emploi ; « accent » est un camaïeu dérivé de la couleur principale. */
  const MULTI_PRESETS = {
    rainbow: { label: t('Arc-en-ciel'), colors: ['#e53935', '#fb8c00', '#fdd835', '#43a047', '#1e88e5', '#3949ab', '#8e24aa'] },
    pastel: { label: t('Pastel'), colors: ['#ffadad', '#ffd6a5', '#fdffb6', '#caffbf', '#9bf6ff', '#a0c4ff', '#bdb2ff', '#ffc6ff'] },
    neon: { label: t('Néon'), colors: ['#ff2bd6', '#ff7a00', '#f5ff00', '#39ff14', '#00f0ff', '#2979ff', '#b026ff'] },
    candy: { label: t('Bonbons'), colors: ['#ff4d8d', '#ff9f1c', '#ffd23f', '#3ec300', '#00bbf9', '#9b5de5'] },
    sunset: { label: t('Coucher de soleil'), colors: ['#ffbe0b', '#fb5607', '#ff006e', '#8338ec', '#3a86ff'] },
    autumn: { label: t('Automne'), colors: ['#7f2704', '#b5451b', '#e07b24', '#f2a541', '#c9a227', '#8a9a3b', '#5b3a29'] },
    ocean: { label: t('Océan'), colors: ['#03045e', '#023e8a', '#0077b6', '#0096c7', '#00b4d8', '#48cae4', '#2a9d8f'] },
    earth: { label: t('Terre'), colors: ['#5b3a29', '#8d5524', '#c68642', '#a3b18a', '#588157', '#3a5a40', '#6b705c'] },
    accent: { label: t('Camaïeu'), colors: null },
  };
  const MULTI_MODES = { letter: t('Lettre par lettre'), word: t('Mot par mot'), diagonal: t('Diagonales'), random: t('Au hasard') };
  const MULTI_MIN = 2, MULTI_MAX = 12;

  /** Ré-échantillonne une palette à n couleurs (interpolation entre couleurs voisines). */
  function resample(colors, n) {
    const L = colors.length;
    if (!L) return [];
    if (n === L) return [...colors];
    if (L === 1 || n === 1) return Array.from({ length: n }, () => colors[0]);
    // Moins de couleurs : on en prend une sur deux, trois… (pas de mélange, les teintes restent franches)
    if (n < L) return Array.from({ length: n }, (_, i) => colors[Math.floor((i * L) / n)]);
    return Array.from({ length: n }, (_, i) => {
      const p = (i * (L - 1)) / (n - 1), lo = Math.floor(p);
      return lo >= L - 1 ? colors[L - 1] : mix(colors[lo], colors[lo + 1], p - lo);
    });
  }
  /** Couleurs d'une palette prête à l'emploi, ramenée à n couleurs (n absent : taille d'origine). */
  function presetColors(id, n, accent = DEFAULT.accent) {
    const base = id === 'accent'
      ? [shade(accent, 0.55), shade(accent, 0.3), accent, mix(accent, '#ffffff', 0.3), tint(accent, 0.55)]
      : (MULTI_PRESETS[id]?.colors || MULTI_PRESETS.rainbow.colors);
    return resample(base, Math.max(MULTI_MIN, Math.min(MULTI_MAX, n || base.length)));
  }

  /**
   * Adoucit une couleur pour en faire un fond de case : éclaircie vers le fond
   * (case claire) ou assombrie (case sombre), pour que le texte reste lisible.
   */
  function softFill(col, base, target, minK = 0) {
    const light = luminance(base) > 0.4;
    const ok = c => (light ? luminance(c) >= target : luminance(c) <= 0.1);
    const toward = light ? (luminance(base) >= target ? base : '#ffffff') : base;
    for (let k = minK; k <= 0.9; k += 0.1) {
      const c = mix(col, toward, k);
      if (ok(c)) return c;
    }
    return mix(col, toward, 0.9);
  }

  /**
   * Couleurs « multicolores » d'une grille, case par case. null si l'option est coupée
   * (le rendu est alors exactement celui d'une grille classique).
   * @param model modèle de grille (MF.gridModel)
   * @param {any} [opts] opts.solution : vue solution. Hors solution, le mode « mot par mot »
   *   des mots mêlés révélerait les mots cachés : il se replie sur « lettre par lettre ».
   */
  function multiColors(d, C, model, opts = {}) {
    const mu = d.multi, solution = !!opts.solution;
    if (!mu?.on || !model?.cells?.length) return null;
    const P = mu.palette?.length >= MULTI_MIN ? mu.palette : MULTI_PRESETS.rainbow.colors;
    const n = P.length;
    const tg = mu.targets || {};
    const mode = mu.mode === 'word' && model.game === 'meles' && !solution ? 'letter' : mu.mode;
    const step = Math.max(1, Math.round(n * 0.38)); // voisines (horizontales et verticales) toujours différentes
    const memo = new Map();
    const once = (key, fn) => { if (!memo.has(key)) memo.set(key, fn()); return memo.get(key); };

    // Mot par mot : coloriage glouton, deux mots qui se croisent n'ont pas la même couleur
    const slotIdx = new Map(), byCell = new Map();
    let i = 0;
    for (const [key, s] of model.slots || []) {
      const used = new Set();
      for (const [r, c] of s.cells) for (const k of byCell.get(`${r},${c}`) || []) used.add(slotIdx.get(k));
      let k = i % n;
      for (let j = 0; j < n && used.has(k); j++) k = (k + 1) % n;
      slotIdx.set(key, k);
      for (const [r, c] of s.cells) { const id = `${r},${c}`; if (!byCell.has(id)) byCell.set(id, []); byCell.get(id).push(key); }
      i++;
    }
    // Hasard reproductible : même grille, mêmes couleurs ; évite deux voisines identiques
    const rnd = [];
    const randomAt = (r, c) => {
      if (rnd[r]?.[c] !== undefined) return rnd[r][c];
      for (let rr = 0; rr <= r; rr++) {
        rnd[rr] = rnd[rr] || [];
        for (let cc = 0; cc < model.cols; cc++) {
          if (rnd[rr][cc] !== undefined) continue;
          const h = Math.imul(rr + 1, 0x9e3779b1) ^ Math.imul(cc + 1, 0x85ebca77) ^ Math.imul((mu.seed || 0) + 1, 0xc2b2ae3d);
          let k = Math.floor(MF.util.rng(h)() * n);
          const left = cc ? rnd[rr][cc - 1] : -1, up = rr ? rnd[rr - 1][cc] : -1;
          for (let j = 0; j < n && (k === left || k === up); j++) k = (k + 1) % n;
          rnd[rr][cc] = k;
        }
      }
      return rnd[r][c];
    };
    const posIdx = (r, c) => {
      if (mode === 'diagonal') return (r + c) % n;
      if (mode === 'random') return randomAt(r, c);
      return (c + r * step) % n;
    };
    /** Indice de couleur d'une case (-1 : couleur normale). */
    function idx(r, c) {
      const cell = model.cells[r]?.[c];
      if (!cell) return -1;
      if (mode !== 'word') return posIdx(r, c);
      let key = null;
      if (cell.type === 'clue') key = cell.clues?.[0]?.wid;
      else if (cell.words) key = cell.words.H || cell.words.V || (byCell.get(`${r},${c}`) || [])[0];
      return key && slotIdx.has(key) ? slotIdx.get(key) : -1;
    }
    const colorAt = (r, c) => { const k = idx(r, c); return k >= 0 ? P[k] : null; };

    const cellFill = (r, c) => once(`f${r},${c}`, () => { const col = tg.cells && colorAt(r, c); return col ? softFill(col, C.letter, 0.6, 0.2) : C.letter; });
    const clueFill = (r, c) => once(`q${r},${c}`, () => { const col = tg.clues && colorAt(r, c); return col ? softFill(col, C.clue, 0.72, 0.4) : C.clue; });
    // Flèche -> mot qu'elle annonce (fléchés)
    const arrowWord = new Map();
    if (tg.words && model.game === 'fleches') {
      model.cells.forEach(row => row.forEach(cell => {
        if (cell.type === 'clue') cell.clues.forEach(cl => arrowWord.set(`${cl.tr},${cl.tc},${cl.arrow}`, cl.wid));
      }));
    }
    const word = key => (tg.words && slotIdx.has(key) ? P[slotIdx.get(key)] : null);
    return {
      palette: P,
      targets: tg,
      /** Couleur brute d'une case (avant adoucissement). */
      color: colorAt,
      /** Fond d'une case lettre. */
      cellFill,
      /** Fond d'une case définition. */
      clueFill,
      /** Texte d'une définition, lisible sur son fond. */
      clueInk: (r, c) => (tg.clues ? readable(C.clueInk, clueFill(r, c), 7) : C.clueInk),
      /** Lettre (solution, jeu, mots mêlés) : sa couleur, ou `base`, toujours lisible sur la case. */
      letter: (r, c, base) => {
        const bg = cellFill(r, c);
        const col = tg.letters && colorAt(r, c);
        if (col) return readable(col, bg, 3);
        return tg.cells ? readable(base, bg, 4.5) : base;
      },
      /** Texte secondaire d'une case lettre (numéros, codes) : reste lisible sur un fond coloré. */
      ink: (r, c, base) => (tg.cells ? readable(base, cellFill(r, c), 4.5) : base),
      /** Couleur d'un mot (capsules des mots mêlés, liste), null si la cible « mots » est coupée. */
      word,
      /** Flèche d'une case lettre : couleur du mot qu'elle annonce. */
      arrow: (r, c, arrow, base) => {
        const col = word(arrowWord.get(`${r},${c},${arrow}`));
        return col ? readable(col, cellFill(r, c), 3) : (tg.cells ? readable(base, cellFill(r, c), 3) : base);
      },
    };
  }

  /** Couleurs effectives : chaque « auto » est déduit de la couleur principale, avec un contraste garanti. */
  function resolve(d) {
    const c = d.colors, a = d.accent;
    const pick = (k, auto) => (c[k] && c[k] !== 'auto' ? c[k] : auto);
    const frame = pick('frame', a);
    const letter = pick('letter', '#ffffff');
    const ink = readable(pick('ink', onColor(letter, '#231f20', '#f7f7fb')), letter, 7);
    const clue = pick('clue', luminance(letter) > 0.5 ? tint(a, 0.86) : mix(letter, a, 0.25));
    const tone = backgroundTone(d);
    return {
      accent: a, frame, letter, ink, clue,
      line: pick('line', frame),
      // Flèches et textes : toujours lisibles sur leur case, même avec des couleurs choisies à la main
      arrow: readable(pick('arrow', a), letter, 3),
      clueInk: readable(pick('clueInk', onColor(clue, '#231f20', '#f7f7fb')), clue, 7),
      solution: readable(pick('solution', ink), letter, 4.5),
      void: pick('void', tint(a, 0.55)),
      title: d.title.color !== 'auto' ? d.title.color : onColor(tone, luminance(a) < 0.5 && luminance(tone) > 0.6 ? a : '#1d1b22', '#ffffff'),
      list: d.lists.color !== 'auto' ? d.lists.color : onColor(tone, '#231f20', '#f7f7fb'),
    };
  }

  /** Métriques de dessin des cases (unités case : 1 case = 100). */
  function metrics(d) {
    const U = 100;
    const { gap, line } = d.cell;
    const inset = gap > 0 ? gap / 2 : line / 2;
    const inner = U - inset * 2;
    const radius = Math.min(d.cell.radius, inner / 2);
    return {
      U, inset, inner, radius, gap, line,
      pad: 5 + (d.cell.letterShape === 'circle' ? 0 : radius * 0.22),
      clueFont: font(d.font.clue).css, clueWeight: weightFor(d.font.clue, d.font.clueWeight),
      letterFont: font(d.font.letter).css, letterWeight: weightFor(d.font.letter, 700),
      upper: !!d.font.upper, lineH: 1.1, maxFs: d.font.clueSize, minFs: 6.5,
    };
  }

  /** Polices utilisées par un design (à charger avant de mesurer le texte). */
  function fontsOf(d) {
    const ids = new Set([d.font.clue, d.font.letter]);
    if (d.title.show) ids.add(d.title.font);
    ids.add(d.lists.font);
    return [...ids].map(font);
  }

  return { FONTS, font, loadFonts, weightFor, CELL_STYLES, ARROWS, VOIDS, FORMATS, FORMAT_GROUPS, formatRatio, formatMm, ANCHORS, DEFAULT, merge, resolve, readable, contrast, metrics, fontsOf, backgroundTone, MULTI_PRESETS, MULTI_MODES, MULTI_MIN, MULTI_MAX, resample, presetColors, multiColors };
})();
