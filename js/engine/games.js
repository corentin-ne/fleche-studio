// @ts-check
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
    murdoku: {
      label: 'Murdoku', short: 'Murdoku', icon: 'magnifier', engine: 'murdoku', clues: false, words: false,
      desc: t('Une enquête en plan : place chaque suspect grâce aux indices, puis démasque le coupable.'),
    },
  };
  const get = id => GAMES[id] || GAMES.fleches;
  // Modules de calcul (chargés après ce fichier, d'où la résolution à l'appel)
  // Murdoku : pas de mots ; l'adaptateur (empreinte des réglages) vit avec son interface
  const ENGINES = { builder: () => MF.builder, meles: () => MF.wordsearch, murdoku: () => MF.murdokuView?.engine };
  /** Module de calcul d'un moteur ('builder' | 'meles' | 'murdoku') : prepare, layoutHash (et generate pour les mots). */
  const engineModule = id => (ENGINES[id] || ENGINES.builder)();
  /** Module de calcul d'un jeu. */
  const engine = gameId => engineModule(get(gameId).engine);
  return { GAMES, get, ids: Object.keys(GAMES), engine, engineModule };
})();
