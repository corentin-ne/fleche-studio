// @ts-check
/* =========================================================================
   Proportions du cadre de la grille, déduites du format de page choisi
   (Design → Page) : un seul réglage pour la page ET la grille.
     - page à format fixe (A4, story, carré…) : la grille en prend les proportions ;
     - page « Ajustée » : la page épouse la grille, dont le sens suit l'orientation choisie ;
     - page A3 ou plus grande : vraie grande grille (taille minimale plus haute).
   Le moteur (worker) reçoit ces valeurs dans les options : { aspect, large }.
   ========================================================================= */
window.MF = window.MF || {};

MF.paper = (() => {
  const RATIO = 0.72;                // colonnes / lignes d'une grille sur une page A4 portrait (titre compris)
  const TITLE_ROOM = 1.02;           // le titre au-dessus prend un peu de hauteur à la grille
  const LARGE_MM2 = 297 * 420 * 0.9; // à partir de l'A3
  const MIN_ROWS_LARGE = 25;         // une grille A3 auto n'est pas une A4 agrandie

  // Tailles fixes proposées : nombre de cases du grand côté (le petit suit les proportions de la page)
  /** @type {Record<string, [number, string][]>} */
  const SIZES = {
    normal: [[17, 'Compact'], [21, 'Standard'], [24, 'Grand'], [15, 'Carré']],
    large: [[25, 'Compact'], [30, 'Standard'], [34, 'Géant'], [21, 'Carré']],
  };

  const round2 = n => Math.round(n * 100) / 100;

  /** Cadre déduit de la page : { aspect: colonnes / lignes, large }. */
  function frame(poster = {}) {
    const R = MF.design?.formatRatio(poster);
    if (!R) return { aspect: poster.orientation === 'landscape' ? round2(1 / RATIO) : RATIO, large: false };
    const mm = MF.design.formatMm(poster);
    const aspect = MF.util.clamp(R <= 1 ? R * TITLE_ROOM : R / TITLE_ROOM, 0.3, 3.5);
    return { aspect: round2(aspect), large: !!mm && mm[0] * mm[1] >= LARGE_MM2 };
  }

  /** Options de calcul d'une grille : les siennes, plus le cadre donné par sa page. */
  const gridOptions = pz => ({ ...pz.options, ...frame(pz.design?.poster) });

  const aspectOf = o => o.aspect || RATIO;
  const isLandscape = o => aspectOf(o) > 1;

  /** Colonnes d'un cadre de `rows` lignes. */
  const colsFor = (rows, o) => Math.max(7, Math.round(rows * aspectOf(o)));

  /** Nombre minimal de lignes d'une grille auto. */
  const minRows = o => (o.large ? (isLandscape(o) ? Math.round(MIN_ROWS_LARGE * RATIO) : MIN_ROWS_LARGE) : 0);

  /** Tailles fixes proposées pour cette page : [{ cols, rows, label }]. */
  function presets(o) {
    const a = aspectOf(o);
    return SIZES[o.large ? 'large' : 'normal'].map(([n, label]) => {
      const square = label === 'Carré';
      const [cols, rows] = square ? [n, n] : a <= 1 ? [Math.max(5, Math.round(n * a)), n] : [n, Math.max(5, Math.round(n / a))];
      return { cols: Math.min(50, cols), rows: Math.min(50, rows), label: MF.i18n.t(label) };
    });
  }

  /**
   * Partie de l'empreinte d'une grille qui dépend de la page. Seul ce qui change vraiment
   * le calcul compte (une grille de taille fixe ne dépend pas de la page) ; les libellés
   * historiques (« A4 portrait »…) sont gardés : les grilles déjà calculées restent à jour.
   */
  function key(o) {
    if (o.size === 'fixed') return 'A4 portrait';
    const fmt = o.large ? 'A3' : 'A4';
    const orient = isLandscape(o) ? 'paysage' : 'portrait';
    if ((o.shape && o.shape !== 'rect') || [RATIO, round2(1 / RATIO)].includes(aspectOf(o))) return `${fmt} ${o.shape && o.shape !== 'rect' && !o.large ? 'portrait' : orient}`;
    return `${fmt} r${aspectOf(o)}`;
  }

  return { frame, gridOptions, colsFor, minRows, presets, key, isLandscape };
})();
