// @ts-check
/* =========================================================================
   Aide : premiers pas, raccourcis clavier, confidentialité, version.
   ========================================================================= */
window.MF = window.MF || {};

MF.help = (() => {
  const { t } = MF.i18n;
  const ic = MF.icons.svg;
  const { esc } = MF.util;

  const row = (keys, label) => `<div class="kbd-row"><span>${keys.map(x => `<kbd>${x}</kbd>`).join(' ')}</span><span>${label}</span></div>`;

  function open() {
    MF.ui.modal({
      title: t('Aide & raccourcis'), icon: 'help',
      body: `<div class="help-grid">
        <div><h4>${t('Pour démarrer')}</h4><ol class="small help-steps">
          <li>${t('<b>Mots</b> : tape tes mots (autocomplétion, correction) ou pioche dans la bibliothèque, les thèmes, un fichier Excel…')}</li>
          <li>${t('<b>Grille</b> : choisis le jeu (fléchés, croisés, mêlés, codés), la forme (cœur, étoile…) et la taille.')}</li>
          <li>${t('<b>Design</b> : un thème en un clic, puis fond, cases, polices, titre…')}</li>
          <li>${t('<b>Décor</b> : emojis, stickers, textes et photos à glisser sur l\'affiche.')}</li>
          <li>${t('<b>Exporter</b> : PNG, SVG, PDF, choix du format de page et de la position de la grille.')}</li></ol></div>
        <div><h4>${t('Raccourcis')}</h4>
          ${row(['Ctrl', 'Z'], t('Annuler|undo'))}${row(['Ctrl', 'Y'], t('Rétablir'))}${row(['N'], t('Ajouter un mot'))}${row(['M'], t('Mélanger la grille'))}${row(['E'], t('Exporter'))}${row(['P'], t('Jouer / quitter le jeu'))}${row(['1', '…', '5'], t('Onglets du panneau'))}
          ${row([t('Suppr')], t('Effacer le décor sélectionné'))}${row(['←', '↑', '→', '↓'], t('Déplacer le décor (Maj = plus vite)'))}${row(['Ctrl', t('molette')], t('Zoom'))}${row(['?'], t('Cette aide'))}
          <h4>${t('Mots mêlés au clavier')}</h4>
          ${row(['←', '↑', '→', '↓'], t('Déplacer le curseur'))}${row([t('Entrée')], t('Début puis fin du mot'))}${row(['Échap'], t('Annuler la sélection'))}</div>
      </div>
      <div class="privacy small">${ic('lock')}<p>${t('<b>Confidentialité :</b> pas de compte, pas de serveur, pas de traceur. Tout est enregistré dans ce navigateur. Pense à « Sauvegarder » de temps en temps (onglet Grille → Mes données).')}</p></div>
      <p class="muted small help-version">${t('Version {v}', { v: esc(MF.loader?.VERSION || '') })}</p>`,
      actions: [{ label: t('Compris'), kind: 'primary', value: null }],
    });
  }

  return { open };
})();
