// @ts-check
/* =========================================================================
   Aperçus réels des styles : un petit extrait de grille dessiné avec le vrai
   moteur de rendu. Ce que l'on voit dans les vignettes (thèmes, styles de
   cases) est exactement ce que l'on obtiendra.
   ========================================================================= */
window.MF = window.MF || {};

MF.previews = (() => {
  const cache = new Map();
  const SAMPLE = {
    engine: 'builder',
    frame: { w: 5, h: 3, top: 0, shape: 'rect' },
    rows: ['#CAP#', '#ILE#', '#RUE#'],
    words: [['CAP', 0], ['ILE', 1], ['RUE', 2]].map(([word, r]) => ({ r, c: 1, dir: 'H', len: 3, word, sr: r, sc: 0, arrow: 'right', src: 'curated' })),
  };
  const CLUES = { CAP: 'Pointe de terre', ILE: 'Terre isolée', RUE: 'Voie en ville' };

  /** SVG d'un extrait de grille pour un design donné. */
  function design(d) {
    const key = MF.util.hash(JSON.stringify(d));
    if (cache.has(key)) return cache.get(key);
    const des = MF.schema.design(MF.design.merge(d, { poster: { format: 'fit', padding: 22, radius: 0 }, frame: { width: Math.min(d.frame.width, 18) }, title: { show: false } }));
    const stub = { game: 'fleches', words: [], fillerClues: CLUES, options: { givens: 0 }, design: des, stickers: [] };
    const model = MF.gridModel.from(SAMPLE, stub, MF.design.metrics(des), { at: 1 });
    const svg = MF.renderers.svg(MF.scene.compose(model, stub, { letters: true, forExport: true, stickers: false, title: false, assetUrl: MF.assets.url }), { cls: 'preview-svg' });
    if (cache.size > 120) cache.clear();
    cache.set(key, svg);
    return svg;
  }

  /** Design d'un thème (appliqué sur le design par défaut). */
  const theme = id => design(MF.themes.apply(MF.schema.design({}), id));

  return { design, theme, clear: () => cache.clear() };
})();
