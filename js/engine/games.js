/* =========================================================================
   Types de jeux proposés. Fléchés, croisés et codés partagent le même
   générateur (mots qui se croisent) ; seuls le dessin et le jeu changent.
   Les mots mêlés ont leur propre générateur (MF.wordsearch).
   ========================================================================= */
window.MF = window.MF || {};

MF.games = (() => {
  const { t } = MF.i18n;
  const GAMES = {
    fleches: {
      label: t('Mots fléchés'), short: t('Fléchés'), icon: 'arrowGrid', engine: 'builder', clues: true,
      desc: t('Les définitions sont dans la grille, une flèche montre où écrire la réponse.'),
    },
    croises: {
      label: t('Mots croisés'), short: t('Croisés'), icon: 'crossGrid', engine: 'builder', clues: true,
      desc: t('Cases noires et définitions numérotées, horizontalement et verticalement.'),
    },
    codes: {
      label: t('Mots codés'), short: t('Codés'), icon: 'hash', engine: 'builder', clues: false,
      desc: t('Chaque lettre devient un nombre : quelques lettres sont données, à toi de décoder le reste.'),
    },
    meles: {
      label: t('Mots mêlés'), short: t('Mêlés'), icon: 'search', engine: 'meles', clues: false,
      desc: t('Les mots sont cachés dans tous les sens au milieu de lettres : retrouve-les !'),
    },
  };
  const get = id => GAMES[id] || GAMES.fleches;
  return { GAMES, get, ids: Object.keys(GAMES) };
})();
