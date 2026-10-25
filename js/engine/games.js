/* =========================================================================
   Types de jeux proposés. Fléchés, croisés et codés partagent le même
   générateur (mots qui se croisent) ; seuls le dessin et le jeu changent.
   Les mots mêlés ont leur propre générateur (MF.wordsearch).
   ========================================================================= */
window.MF = window.MF || {};

MF.games = (() => {
  const GAMES = {
    fleches: {
      label: 'Mots fléchés', short: 'Fléchés', icon: 'arrowGrid', engine: 'builder', clues: true,
      desc: 'Les définitions sont dans la grille, une flèche montre où écrire la réponse.',
    },
    croises: {
      label: 'Mots croisés', short: 'Croisés', icon: 'crossGrid', engine: 'builder', clues: true,
      desc: 'Cases noires et définitions numérotées, horizontalement et verticalement.',
    },
    codes: {
      label: 'Mots codés', short: 'Codés', icon: 'hash', engine: 'builder', clues: false,
      desc: 'Chaque lettre devient un nombre : quelques lettres sont données, à toi de décoder le reste.',
    },
    meles: {
      label: 'Mots mêlés', short: 'Mêlés', icon: 'search', engine: 'meles', clues: false,
      desc: 'Les mots sont cachés dans tous les sens au milieu de lettres : retrouve-les !',
    },
  };
  const get = id => GAMES[id] || GAMES.fleches;
  return { GAMES, get, ids: Object.keys(GAMES) };
})();
