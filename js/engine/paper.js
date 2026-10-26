/* =========================================================================
   Formats papier (A4 / A3) et orientation (portrait / paysage).
   Source unique pour le moteur (proportions du cadre), les réglages (tailles
   proposées), l'export (dpi réels) et l'impression (@page).
   ========================================================================= */
window.MF = window.MF || {};

MF.paper = (() => {
  const SHEETS = { A4: { w: 210, h: 297 }, A3: { w: 297, h: 420 } };
  const MARGIN = 12;       // marge d'impression (mm)
  const TITLE = 18;        // place du titre imprimé au-dessus de la grille (mm)
  const RATIO = 0.72;      // colonnes / lignes d'un cadre portrait (feuille moins marges et titre)
  const MM_PER_IN = 25.4;

  // Tailles fixes proposées, en portrait (colonnes × lignes) ; inversées en paysage
  const PRESETS = {
    A4: [[13, 17, 'Compact'], [15, 21, 'Standard'], [17, 24, 'Grand'], [15, 15, 'Carré']],
    A3: [[18, 25, 'Compact'], [21, 30, 'Standard'], [24, 34, 'Géant'], [21, 21, 'Carré']],
  };
  // Taille minimale d'une grille auto en A3 (lignes, portrait) : une vraie grande grille, pas une A4 agrandie
  const MIN_ROWS = { A4: 0, A3: 25 };

  /** Réglages papier, avec valeurs par défaut. Accepte les options d'une grille ({ paper }) ou un résultat de `of` ({ format }). */
  const of = (o = {}) => ({
    format: SHEETS[o.paper ?? o.format] ? (o.paper ?? o.format) : 'A4',
    orientation: o.orientation === 'landscape' ? 'landscape' : 'portrait',
  });
  const isLandscape = o => of(o).orientation === 'landscape';

  /** Dimensions de la feuille (mm) dans son orientation. */
  function sheet(o) {
    const { format, orientation } = of(o);
    const s = SHEETS[format];
    return orientation === 'landscape' ? { w: s.h, h: s.w } : { ...s };
  }

  /** Cadre (en cases) de `rows` lignes aux proportions de la feuille. */
  const colsFor = (rows, o) => Math.max(7, Math.round(rows * (isLandscape(o) ? 1 / RATIO : RATIO)));

  /** Nombre minimal de lignes d'une grille auto. */
  const minRows = o => {
    const m = MIN_ROWS[of(o).format];
    return isLandscape(o) ? Math.round(m * RATIO) : m;
  };

  /** Tailles fixes proposées : [{ cols, rows, label }]. */
  function presets(o) {
    const land = isLandscape(o);
    return PRESETS[of(o).format].map(([c, r, label]) => (land ? { cols: r, rows: c, label: MF.i18n.t(label) } : { cols: c, rows: r, label: MF.i18n.t(label) }));
  }

  /** Libellé court, ex. « A3 paysage ». */
  const label = o => `${of(o).format} ${isLandscape(o) ? 'paysage' : 'portrait'}`;

  /** Résolution d'impression d'une image de pxW × pxH mise à la taille de la feuille (marges comprises). */
  function dpi(pxW, pxH, o) {
    const s = sheet(o);
    const inW = (s.w - MARGIN * 2) / MM_PER_IN, inH = (s.h - MARGIN * 2 - TITLE) / MM_PER_IN;
    return Math.round(Math.min(pxW / inW, pxH / inH));
  }

  /** Feuille de style @page pour imprimer dans ce format. */
  function printCss(o) {
    const s = sheet(o);
    const { format, orientation } = of(o);
    return `@media print { @page { size: ${format} ${orientation}; margin: ${MARGIN}mm; }
      #print-area svg { max-height: ${s.h - MARGIN * 2 - TITLE}mm; } }`;
  }

  /**
   * Taille fixe équivalente après un changement de format ou d'orientation :
   * paysage <-> portrait échange colonnes et lignes ; A4 <-> A3 multiplie les côtés par √2.
   */
  function convert(cols, rows, from, to) {
    let c = cols, r = rows;
    if (isLandscape(from) !== isLandscape(to)) [c, r] = [r, c];
    const k = Math.sqrt(SHEETS[of(to).format].w / SHEETS[of(from).format].w * (SHEETS[of(to).format].h / SHEETS[of(from).format].h));
    return { cols: Math.round(c * k), rows: Math.round(r * k) };
  }

  return { of, sheet, colsFor, minRows, presets, label, dpi, printCss, convert, isLandscape };
})();
