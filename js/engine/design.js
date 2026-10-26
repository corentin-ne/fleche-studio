/* =========================================================================
   Design d'une grille : polices, styles de cases, couleurs résolues, métriques.
   Le design est une donnée pure (sérialisable) ; ce module en dérive tout ce
   que le modèle et les rendus doivent savoir.
   ========================================================================= */
window.MF = window.MF || {};

MF.design = (() => {
  const { tint, mix, onColor, luminance } = MF.util;

  /** Polices proposées (chargées par Google Fonts dans index.html). */
  const FONTS = {
    inter: { label: 'Inter', css: '"Inter", "Segoe UI", Arial, sans-serif', weights: [400, 500, 600, 700, 800] },
    nunito: { label: 'Nunito', css: '"Nunito", "Segoe UI", Arial, sans-serif', weights: [600, 700, 800] },
    baloo: { label: 'Baloo 2', css: '"Baloo 2", "Segoe UI", Arial, sans-serif', weights: [500, 600, 700, 800] },
    grotesk: { label: 'Space Grotesk', css: '"Space Grotesk", "Segoe UI", Arial, sans-serif', weights: [500, 600, 700] },
    fraunces: { label: 'Fraunces', css: '"Fraunces", Georgia, serif', weights: [500, 600, 700] },
    playfair: { label: 'Playfair Display', css: '"Playfair Display", Georgia, serif', weights: [600, 700] },
    caveat: { label: 'Caveat (manuscrite)', css: '"Caveat", "Segoe Print", cursive', weights: [600, 700] },
    patrick: { label: 'Patrick Hand', css: '"Patrick Hand", "Segoe Print", cursive', weights: [400] },
    marker: { label: 'Permanent Marker', css: '"Permanent Marker", "Segoe Print", cursive', weights: [400] },
    mono: { label: 'JetBrains Mono', css: '"JetBrains Mono", Consolas, monospace', weights: [400, 500, 600, 700] },
  };
  const font = id => FONTS[id] || FONTS.inter;
  /** Graisse disponible la plus proche (évite le faux gras des polices à une seule graisse). */
  const weightFor = (id, w) => font(id).weights.reduce((best, x) => (Math.abs(x - w) < Math.abs(best - w) ? x : best));

  /** Styles de cases : raccourcis qui règlent espacement, arrondi, trait et forme des lettres. */
  const CELL_STYLES = {
    classic: { label: 'Classique', gap: 0, radius: 0, line: 3, letterShape: 'square', shadow: false },
    rounded: { label: 'Arrondies', gap: 0, radius: 18, line: 3, letterShape: 'square', shadow: false },
    tiles: { label: 'Tuiles', gap: 9, radius: 14, line: 0, letterShape: 'square', shadow: true },
    bubbles: { label: 'Bulles', gap: 6, radius: 22, line: 0, letterShape: 'circle', shadow: false },
    thin: { label: 'Trait fin', gap: 0, radius: 0, line: 1.5, letterShape: 'square', shadow: false },
    bold: { label: 'Trait épais', gap: 0, radius: 0, line: 7, letterShape: 'square', shadow: false },
  };

  const ARROWS = { solid: 'Triangles', chevron: 'Chevrons', bold: 'Grosses flèches', dot: 'Pastilles' };
  const VOIDS = { frame: 'Couleur du cadre', transparent: 'Transparentes (voir le fond)', light: 'Couleur claire', hatch: 'Hachurées' };

  /**
   * Formats d'affiche, par famille.
   *  - print / cards : feuilles et cartes (mm, en portrait ; l'orientation peut basculer) ;
   *  - social / screen : formats en pixels, orientation fixe ;
   *  - fit : l'affiche épouse la grille ; custom : rapport libre.
   */
  const FORMAT_GROUPS = { auto: 'Automatique', print: 'Impression', cards: 'Cartes', social: 'Réseaux sociaux', screen: 'Écrans', custom: 'Sur mesure' };
  const FORMATS = {
    fit: { label: 'Ajusté', hint: 'Épouse la grille', group: 'auto' },
    A6: { label: 'A6', hint: '105 × 148 mm', group: 'print', mm: [105, 148] },
    A5: { label: 'A5', hint: '148 × 210 mm', group: 'print', mm: [148, 210] },
    A4: { label: 'A4', hint: '210 × 297 mm', group: 'print', mm: [210, 297] },
    A3: { label: 'A3', hint: '297 × 420 mm', group: 'print', mm: [297, 420] },
    A2: { label: 'A2', hint: '420 × 594 mm', group: 'print', mm: [420, 594] },
    letter: { label: 'US Letter', hint: '8,5 × 11 in', group: 'print', mm: [216, 279] },
    legal: { label: 'US Legal', hint: '8,5 × 14 in', group: 'print', mm: [216, 356] },
    tabloid: { label: 'Tabloïd', hint: '11 × 17 in', group: 'print', mm: [279, 432] },
    photo: { label: 'Photo 10 × 15', hint: '102 × 152 mm', group: 'cards', mm: [102, 152] },
    photo13: { label: 'Photo 13 × 18', hint: '130 × 180 mm', group: 'cards', mm: [130, 180] },
    card57: { label: 'Carte 5 × 7', hint: '127 × 178 mm', group: 'cards', mm: [127, 178] },
    cardSq: { label: 'Carte carrée', hint: '150 × 150 mm', group: 'cards', mm: [150, 150] },
    dl: { label: 'Flyer DL', hint: '99 × 210 mm', group: 'cards', mm: [99, 210] },
    bookmark: { label: 'Marque-page', hint: '50 × 180 mm', group: 'cards', mm: [50, 180] },
    square: { label: 'Carré', hint: '1080 × 1080', group: 'social', px: [1080, 1080] },
    post: { label: 'Post 4:5', hint: '1080 × 1350', group: 'social', px: [1080, 1350] },
    story: { label: 'Story 9:16', hint: '1080 × 1920', group: 'social', px: [1080, 1920] },
    pin: { label: 'Épingle 2:3', hint: '1000 × 1500', group: 'social', px: [1000, 1500] },
    youtube: { label: 'Miniature vidéo', hint: '1280 × 720', group: 'social', px: [1280, 720] },
    xpost: { label: 'Post paysage', hint: '1600 × 900', group: 'social', px: [1600, 900] },
    linkedin: { label: 'Lien partagé', hint: '1200 × 627', group: 'social', px: [1200, 627] },
    cover: { label: 'Bannière', hint: '1640 × 624', group: 'social', px: [1640, 624] },
    wide: { label: 'Écran 16:9', hint: '1920 × 1080', group: 'screen', px: [1920, 1080] },
    desk: { label: 'Écran 16:10', hint: '2560 × 1600', group: 'screen', px: [2560, 1600] },
    ultra: { label: 'Ultra-large 21:9', hint: '3440 × 1440', group: 'screen', px: [3440, 1440] },
    slide: { label: 'Diapo 4:3', hint: '1600 × 1200', group: 'screen', px: [1600, 1200] },
    phone: { label: 'Fond téléphone', hint: '1170 × 2532', group: 'screen', px: [1170, 2532] },
    tablet: { label: 'Fond tablette', hint: '1640 × 2360', group: 'screen', px: [1640, 2360] },
    custom: { label: 'Personnalisé', hint: 'Largeur × hauteur', group: 'custom' },
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

  return { FONTS, font, weightFor, CELL_STYLES, ARROWS, VOIDS, FORMATS, FORMAT_GROUPS, formatRatio, formatMm, ANCHORS, DEFAULT, merge, resolve, readable, contrast, metrics, fontsOf, backgroundTone };
})();
