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

  /** Formats d'affiche (rapport largeur / hauteur en portrait). */
  const FORMATS = {
    fit: { label: 'Ajusté à la grille' },
    A4: { label: 'Feuille A4', ratio: 210 / 297 },
    A3: { label: 'Feuille A3', ratio: 297 / 420 },
    letter: { label: 'US Letter', ratio: 8.5 / 11 },
    square: { label: 'Carré (Instagram)', ratio: 1 },
    story: { label: 'Story 9:16', ratio: 9 / 16 },
    wide: { label: 'Écran 16:9', ratio: 16 / 9, fixed: true },
  };
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
    poster: { format: 'fit', orientation: 'portrait', padding: 70, anchor: 'c', scale: 1, radius: 0 },
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

  /** Couleurs effectives : chaque « auto » est déduit de la couleur principale. */
  function resolve(d) {
    const c = d.colors, a = d.accent;
    const pick = (k, auto) => (c[k] && c[k] !== 'auto' ? c[k] : auto);
    const frame = pick('frame', a);
    const letter = pick('letter', '#ffffff');
    const ink = pick('ink', onColor(letter, '#231f20', '#f7f7fb'));
    const clue = pick('clue', luminance(letter) > 0.5 ? tint(a, 0.86) : mix(letter, a, 0.25));
    const tone = backgroundTone(d);
    return {
      accent: a, frame, letter, ink, clue,
      line: pick('line', frame),
      arrow: pick('arrow', a),
      clueInk: pick('clueInk', onColor(clue, '#231f20', '#f7f7fb')),
      solution: pick('solution', ink),
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

  return { FONTS, font, weightFor, CELL_STYLES, ARROWS, VOIDS, FORMATS, ANCHORS, DEFAULT, merge, resolve, metrics, fontsOf, backgroundTone };
})();
