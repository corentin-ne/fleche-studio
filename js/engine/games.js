// @ts-check
/* =========================================================================
   Types de jeux proposés. Fléchés, croisés, codés et casés partagent le même
   générateur (mots qui se croisent) ; seuls le dessin et le jeu changent.
   Les mots mêlés et le mot mystère ont leur propre générateur (MF.wordsearch),
   les jeux de chiffres et de logique le leur (MF.logic).

   Chaque jeu décrit ses particularités ici (plutôt que des tests sur son
   identifiant dispersés dans l'interface) :
     engine     module de calcul ('builder' | 'meles' | 'logic' | 'murdoku')
     family     rayon du choix des jeux ('words' | 'numbers' | 'logic')
     words      la grille se construit à partir de la liste de mots (false : le jeu se règle
                dans son propre panneau, à la place des mots)
     clues      le jeu a des définitions (à écrire, ou calculées)
     wordSearch on joue en entourant des mots (pas de saisie de lettres)
     theme      thème proposé par le démarrage rapide
   ========================================================================= */
window.MF = window.MF || {};

MF.games = (() => {
  const { t } = MF.i18n;
  const GAMES = {
    fleches: {
      label: t('Mots fléchés'), short: t('Fléchés'), icon: 'arrowGrid', engine: 'builder', family: 'words', words: true, clues: true, wordSearch: false, theme: 'violet',
      desc: t('Les définitions sont dans la grille, une flèche montre où écrire la réponse.'),
    },
    croises: {
      label: t('Mots croisés'), short: t('Croisés'), icon: 'crossGrid', engine: 'builder', family: 'words', words: true, clues: true, wordSearch: false, theme: 'print',
      desc: t('Cases noires et définitions numérotées, horizontalement et verticalement.'),
    },
    cases: {
      label: t('Mots casés'), short: t('Casés'), icon: 'cases', engine: 'builder', family: 'words', words: true, clues: false, wordSearch: false, theme: 'pastel',
      desc: t('Tous les mots sont donnés, rangés par longueur : à toi de les caser dans la grille.'),
    },
    codes: {
      label: t('Mots codés'), short: t('Codés'), icon: 'hash', engine: 'builder', family: 'words', words: true, clues: false, wordSearch: false, theme: 'minimal',
      desc: t('Chaque lettre devient un nombre : quelques lettres sont données, à toi de décoder le reste.'),
    },
    meles: {
      label: t('Mots mêlés'), short: t('Mêlés'), icon: 'search', engine: 'meles', family: 'words', words: true, clues: false, wordSearch: true, theme: 'candy',
      desc: t('Les mots sont cachés dans tous les sens au milieu de lettres : retrouve-les !'),
    },
    mystere: {
      label: t('Mot mystère'), short: t('Mystère'), icon: 'mystery', engine: 'meles', family: 'words', words: true, clues: false, wordSearch: true, theme: 'mint',
      desc: t('Des mots mêlés dont les lettres restantes, lues dans l\'ordre, forment un mot secret.'),
    },
    citation: {
      label: t('Citation codée'), short: t('Citation'), icon: 'quote', engine: 'logic', family: 'words', words: false, clues: false, wordSearch: false, theme: 'chalk',
      desc: t('Une phrase ou un proverbe dont chaque lettre est remplacée par un nombre.'),
    },
    echelle: {
      label: t('Échelle de mots'), short: t('Échelle'), icon: 'ladder', engine: 'logic', family: 'words', words: false, clues: true, wordSearch: false, theme: 'ocean',
      desc: t('Passe d\'un mot à l\'autre en changeant une seule lettre à chaque marche.'),
    },
    wordoku: {
      label: t('Wordoku'), short: t('Wordoku'), icon: 'wordoku', engine: 'logic', family: 'words', words: false, clues: false, wordSearch: false, theme: 'lavender',
      desc: t('Un sudoku avec des lettres : un mot se cache dans la première ligne.'),
    },
    sudoku: {
      label: t('Sudoku'), short: t('Sudoku'), icon: 'sudoku', engine: 'logic', family: 'numbers', words: false, clues: false, wordSearch: false, theme: 'minimal',
      desc: t('Chaque chiffre une seule fois par ligne, par colonne et par région. Classique, irrégulier ou X.'),
    },
    kakuro: {
      label: t('Kakuro'), short: t('Kakuro'), icon: 'kakuro', engine: 'logic', family: 'numbers', words: false, clues: false, wordSearch: false, theme: 'print',
      desc: t('Des mots croisés en chiffres : chaque suite fait la somme indiquée, sans chiffre répété.'),
    },
    nombres: {
      label: t('Nombres fléchés'), short: t('Nombres'), icon: 'numbers', engine: 'logic', family: 'numbers', words: false, clues: true, wordSearch: false, theme: 'violet',
      desc: t('Des mots fléchés ou croisés en nombres : chaque définition est un petit calcul.'),
    },
    calcudoku: {
      label: t('Calcudoku'), short: t('Calcudoku'), icon: 'calc', engine: 'logic', family: 'numbers', words: false, clues: false, wordSearch: false, theme: 'sunset',
      desc: t('Chaque chiffre une fois par ligne et par colonne ; chaque cage donne le résultat d\'un calcul.'),
    },
    futoshiki: {
      label: t('Futoshiki'), short: t('Futoshiki'), icon: 'futoshiki', engine: 'logic', family: 'numbers', words: false, clues: false, wordSearch: false, theme: 'japan',
      desc: t('Chaque chiffre une fois par ligne et par colonne, en respectant les signes < et >.'),
    },
    picross: {
      label: t('Picross'), short: t('Picross'), icon: 'picross', engine: 'logic', family: 'logic', words: false, clues: false, wordSearch: false, theme: 'crayons',
      desc: t('Noircis les cases d\'après les nombres des lignes et des colonnes : un dessin apparaît.'),
    },
    logigramme: {
      label: t('Logigramme'), short: t('Logigramme'), icon: 'logic', engine: 'logic', family: 'logic', words: false, clues: false, wordSearch: false, theme: 'kraft',
      desc: t('Qui était où, avec quoi ? Coche la grille d\'après les indices jusqu\'à la seule solution.'),
    },
    murdoku: {
      label: 'Murdoku', short: 'Murdoku', icon: 'magnifier', engine: 'murdoku', family: 'logic', clues: false, words: false, wordSearch: false, theme: 'kraft',
      desc: t('Une enquête en plan : place chaque suspect grâce aux indices, puis démasque le coupable.'),
    },
  };
  /** Rayons du choix des jeux, dans l'ordre. */
  const FAMILIES = [['words', t('Jeux de lettres')], ['numbers', t('Jeux de chiffres')], ['logic', t('Logique & dessin')]];
  const get = id => GAMES[id] || GAMES.fleches;
  // Modules de calcul (chargés après ce fichier, d'où la résolution à l'appel)
  // Murdoku : pas de mots ; l'adaptateur (empreinte des réglages) vit avec son interface
  const ENGINES = { builder: () => MF.builder, meles: () => MF.wordsearch, logic: () => MF.logic, murdoku: () => MF.murdokuView?.engine };
  /** Module de calcul d'un moteur ('builder' | 'meles' | 'logic' | 'murdoku') : prepare, layoutHash (et generate pour les mots). */
  const engineModule = id => (ENGINES[id] || ENGINES.builder)();
  /** Module de calcul d'un jeu. */
  const engine = gameId => engineModule(get(gameId).engine);
  /** La grille calculée d'une grille correspond-elle à son jeu (un changement de jeu peut changer de moteur) ? */
  const compatible = pz => !!pz?.layout && pz.layout.engine === get(pz.game).engine && (pz.layout.engine !== 'logic' || pz.layout.pages[0]?.kind === pz.game);
  /** Le jeu se règle dans son propre panneau (pas de liste de mots à remplir). */
  const ownPanel = id => get(id).engine === 'logic';
  return { GAMES, FAMILIES, get, ids: Object.keys(GAMES), engine, engineModule, compatible, ownPanel };
})();
