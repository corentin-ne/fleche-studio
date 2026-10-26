// @ts-check
/* =========================================================================
   Hors ligne et mises à jour : le service worker garde une copie de
   l'application. Quand une nouvelle version est publiée pendant qu'un
   onglet est ouvert, on propose de recharger : l'onglet ne mélange jamais
   des fichiers de deux versions (les dictionnaires se chargent à la demande).
   ========================================================================= */
window.MF = window.MF || {};

MF.updates = (() => {
  const { t } = MF.i18n;
  const CHECK_MS = 30 * 60 * 1000;
  let announced = false;

  function announce() {
    if (announced) return;
    announced = true;
    MF.ui.toast(t('Une nouvelle version de Flèche Studio est disponible.'), 'info', 60000, {
      label: t('Recharger'),
      run: () => { MF.store.flush(); location.reload(); },
    });
  }

  /** Enregistre le service worker (sites http/https uniquement). */
  async function register() {
    if (!('serviceWorker' in navigator) || !/^https?:$/.test(location.protocol)) return;
    let reg;
    try { reg = await navigator.serviceWorker.register('sw.js'); } catch { return; /* navigation privée, etc. : l'appli marche quand même */ }
    if (!reg) return; // service workers désactivés par le navigateur
    // Premier passage (aucune version installée avant) : rien à annoncer
    const hadController = !!navigator.serviceWorker.controller;
    reg.addEventListener('updatefound', () => {
      const sw = reg.installing;
      sw?.addEventListener('statechange', () => { if (sw.state === 'activated' && hadController) announce(); });
    });
    // Onglet laissé ouvert longtemps : on vérifie de temps en temps qu'aucune version n'est sortie
    const check = () => reg.update().catch(() => {});
    setInterval(check, CHECK_MS);
    document.addEventListener('visibilitychange', () => { if (!document.hidden) check(); });
  }

  return { register };
})();
