/* =========================================================================
   Nuanciers proposés dans le panneau Design, rangés par familles :
   couleur principale (cadre, flèches, définitions) et couleur de fond.
   ========================================================================= */
window.MF = window.MF || {};

MF.palettes = {
  /** Couleur principale : chaque famille garde l'ordre de l'arc-en-ciel. */
  ACCENTS: [
    [MF.i18n.t('Vives'), ['#e8212b', '#ff6a1a', '#ffb000', '#8bc34a', '#3db54a', '#16a394', '#00a8e8', '#1f8fff', '#3f51b5', '#7b3fe4', '#c2185b', '#f0457f']],
    [MF.i18n.t('Douces'), ['#f28b82', '#f6ad7b', '#f5cd6a', '#b5d98a', '#86cfa3', '#7fd1c7', '#8fd3f4', '#9db8f0', '#b39ddb', '#d4a5e8', '#f4a6c6', '#e889b5']],
    [MF.i18n.t('Profondes'), ['#8b1a1a', '#a0522d', '#9a7b0a', '#4a6b1f', '#1f5c3a', '#0f5c5c', '#0f5c8c', '#1e3a8a', '#3b2a7a', '#5b2a6e', '#6b4226', '#1d1b22']],
    [MF.i18n.t('Néon'), ['#ff1744', '#ff9100', '#ffea00', '#c6ff00', '#00e676', '#1de9b6', '#00e5ff', '#2979ff', '#651fff', '#d500f9', '#ff3ec8', '#f50057']],
  ],
  /** Fonds unis : clairs pour l'impression, puis quelques fonds sombres. */
  BACKGROUNDS: [
    [MF.i18n.t('Clairs'), ['#ffffff', '#faf7f2', '#fff6e5', '#fff0f3', '#fdf1ff', '#f6f1ff', '#eef3ff', '#eaf7ff', '#e9fbf5', '#f1f8e9', '#fffde7', '#f4f4f4']],
    [MF.i18n.t('Sombres'), ['#1d1b22', '#0b1530', '#14213d', '#1b2e24', '#2f4636', '#3a2350', '#4a1c2c', '#3b2516', '#263238', '#0e0e0e', '#22224a', '#123d27']],
  ],
};
