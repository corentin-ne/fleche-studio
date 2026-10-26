// @ts-check
/* =========================================================================
   Types de jeux proposés. Fléchés, croisés et codés partagent le même
   générateur (mots qui se croisent) ; seuls le dessin et le jeu changent.
   Les mots mêlés ont leur propre générateur (MF.wordsearch).

   Chaque jeu décrit ses particularités ici (plutôt que des tests sur son
   identifiant dispersés dans l'interface) :
     engine     module de calcul ('builder' | 'meles')
     clues      le jeu a des définitions à écrire
     wordSearch on joue en entourant des mots (pas de saisie de lettres)
     theme      thème proposé par le démarrage rapide
   ========================================================================= */
window.MF = window.MF || {};

MF.games = (() => {
  const { t } = MF.i18n;
  const GAMES = {
    fleches: {
      label: t('Mots fléchés'), short: t('Fléchés'), icon: 'arrowGrid', engine: 'builder', clues: true, wordSearch: false, theme: 'violet',
      desc: t('Les définitions sont dans la grille, une flèche montre où écrire la réponse.'),
    },
    croises: {
      label: t('Mots croisés'), short: t('Croisés'), icon: 'crossGrid', engine: 'builder', clues: true, wordSearch: false, theme: 'print',
      desc: t('Cases noires et définitions numérotées, horizontalement et verticalement.'),
    },
    codes: {
      label: t('Mots codés'), short: t('Codés'), icon: 'hash', engine: 'builder', clues: false, wordSearch: false, theme: 'minimal',
      desc: t('Chaque lettre devient un nombre : quelques lettres sont données, à toi de décoder le reste.'),
    },
    meles: {
      label: t('Mots mêlés'), short: t('Mêlés'), icon: 'search', engine: 'meles', clues: false, wordSearch: true, theme: 'candy',
      desc: t('Les mots sont cachés dans tous les sens au milieu de lettres : retrouve-les !'),
    },
  };
  const get = id => GAMES[id] || GAMES.fleches;
  // Modules de calcul (chargés après ce fichier, d'où la résolution à l'appel)
  const ENGINES = { builder: () => MF.builder, meles: () => MF.wordsearch };
  /** Module de calcul d'un moteur ('builder' | 'meles') : generate, prepare, layoutHash. */
  const engineModule = id => (ENGINES[id] || ENGINES.builder)();
  /** Module de calcul d'un jeu. */
  const engine = gameId => engineModule(get(gameId).engine);
  /** La grille calculée d'une grille correspond-elle à son jeu (un changement de jeu peut changer de moteur) ? */
  const compatible = pz => !!pz?.layout && pz.layout.engine === get(pz.game).engine;
  return { GAMES, get, ids: Object.keys(GAMES), engine, engineModule, compatible };
})();
