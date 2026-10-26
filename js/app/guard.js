// @ts-check
/* =========================================================================
   Filets de sécurité de l'application :
     - une erreur inattendue ne bloque jamais l'appli et reste discrète ;
     - les grilles modifiées dans un autre onglet sont signalées ;
     - stockage plein : on libère de la place avant de prévenir.
   ========================================================================= */
window.MF = window.MF || {};

MF.guard = (() => {
  const { t } = MF.i18n;
  const QUIET_MS = 5000;
  const QUOTA_WARN_MS = 60000;

  /** @param {any} store */
  function install(store) {
    let last = 0;
    const report = err => {
      console.error(err);
      if (Date.now() - last < QUIET_MS) return;
      last = Date.now();
      MF.ui.toast(t('Petit souci technique : ton travail est sauvegardé. Si quelque chose semble bloqué, recharge la page.'), 'err', 6000);
    };
    addEventListener('error', e => report(e.error || e.message));
    addEventListener('unhandledrejection', e => report(e.reason));
    // Même appli ouverte dans un autre onglet : on propose de reprendre ses changements
    addEventListener('storage', e => {
      if (!store.isOwnKey(e.key)) return;
      MF.ui.toast(t('Tes grilles ont été modifiées dans un autre onglet.'), 'info', 10000, { label: t('Mettre à jour'), run: () => store.reload() });
    });
  }

  let quotaWarnedAt = 0;
  /**
   * Stockage plein : on libère d'abord la progression des parties terminées ou périmées,
   * puis toute la progression sauf `keep` (partie affichée) ; on ne prévient que si ça ne suffit pas.
   * @param {any} store
   * @param {{ keep: string | null, backup: () => void }} o
   */
  function recoverQuota(store, { keep, backup }) {
    const { puzzles } = store.get();
    if (MF.play.prune(puzzles) && store.flush()) return;
    if (MF.play.prune(puzzles, { all: true, keep }) && store.flush()) return;
    if (Date.now() - quotaWarnedAt < QUOTA_WARN_MS) return;
    quotaWarnedAt = Date.now();
    MF.ui.toast(t('Stockage du navigateur plein : supprime des images ou des grilles, et fais une sauvegarde.'), 'err', 8000, { label: t('Sauvegarder'), run: backup });
  }

  return { install, recoverQuota };
})();
