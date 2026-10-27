// @ts-check
/* =========================================================================
   Export : prépare les pages à exporter (grille affichée, ou toutes les
   grilles) et ouvre la fenêtre d'export (MF.exporter).
   ========================================================================= */
window.MF = window.MF || {};

/**
 * @param {{ derive: (pz: any) => any, openPage: () => void }} app
 *   derive : calcul dérivé de la grille affichée (page en cours) ; openPage : réglage du format de page
 */
MF.createExportFlow = app => {
  const { t } = MF.i18n;
  const { plural } = MF.util;
  const store = MF.store;

  /** Pages exportables d'une grille de mots : { name, puzzle, model } (Murdoku a son propre export). */
  function pagesOf(pz) {
    if (!MF.games.compatible(pz) || pz.game === 'murdoku') return [];
    const m = MF.design.metrics(pz.design);
    const many = pz.layout.pages.length > 1;
    return pz.layout.pages.map((pg, i) => ({
      name: many ? t('{name} grille {n}', { name: pz.name, n: i + 1 }) : pz.name,
      puzzle: pz,
      model: MF.gridModel.from(pg, pz, m, pz.layout),
    }));
  }

  function open() {
    const pz = store.active();
    const d = app.derive(pz);
    if (!d.model.cols) { MF.ui.toast(t('Aucune grille à exporter.'), 'warn'); return; }
    const missing = MF.diagnostics.missing(pz, d.fillers);
    if (missing) MF.ui.toast(t(missing > 1 ? 'Attention : {n} encore vides.' : 'Attention : {n} encore vide.', { n: plural(missing, 'définition') }), 'warn', 4500);
    const { puzzles } = store.get();
    const mine = pagesOf(pz);
    const scopes = [{ id: 'puzzle', label: `${pz.name} · ${plural(mine.length, 'page')}`, pages: mine, zipName: `${MF.util.slug(pz.name, t('grille'))}.zip` }];
    if (puzzles.length > 1) {
      const everyone = puzzles.flatMap(pagesOf);
      scopes.push({ id: 'all', label: `${t('Toutes mes grilles')} · ${plural(everyone.length, 'page')}`, pages: everyone, zipName: `${t('toutes-mes-grilles')}.zip` });
    }
    // Page affichée au moment de l'aperçu (on peut changer de page ou de design pendant que la fenêtre est ouverte)
    const current = () => { const p = store.active(); return pagesOf(p)[app.derive(p).page]; };
    MF.exporter.open(current, scopes, app.openPage);
  }

  return { open, pagesOf };
};
