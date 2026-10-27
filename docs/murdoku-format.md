# Murdoku : format des données

Contrat entre le moteur (`js/engine/murdoku.js`, `MF.murdoku`), le rendu 3D
(`js/vendor/murdoku3d.js`, généré depuis `src3d/`) et l'interface.

## Règles du jeu

- Plateau N × N (N de 5 à 8), découpé en pièces contiguës.
- N personnes : N − 1 suspects et 1 victime. **Exactement une personne par
  ligne et par colonne.**
- Une personne ne peut pas se trouver sur un objet bloquant (table, plante,
  bibliothèque, piano, baignoire, cheminée, meuble…). Elle peut être sur une
  case vide ou sur un objet occupable (lit, canapé, fauteuil, chaise, tapis, banc).
- Le **coupable** est le seul suspect qui se trouve **seul dans une pièce avec
  la victime** (la pièce de la victime contient exactement la victime et lui).
- Les indices permettent de retrouver une seule disposition ; on en déduit le coupable.

## Puzzle (sérialisable en JSON)

```js
{
  engine: 'murdoku',
  v: 1,
  size: 6,                         // N
  seed: 123456,
  rooms: [                         // pièces
    { id: 0, type: 'kitchen' },    // types : living, kitchen, bedroom, bathroom, office, library,
  ],                               //   dining, garden, hall, music, guest, game, veranda, laundry
                                   // habillage facultatif (univers) : name, in (« dans la cambuse »),
                                   //   floor: [motif, couleur 1, couleur 2], wall: couleur
  cells: [[0, 0, 1, ...], ...],    // N lignes × N colonnes : indice de pièce
  objects: [                       // au plus un objet par case
    { type: 'table', r: 2, c: 3 },
  ],
  people: [                        // positions = SOLUTION
    { id: 'p0', name: 'Alice', color: '#e4572e', role: 'suspect', r: 0, c: 4 },
    { id: 'p5', name: 'Victor', color: '#2b2d42', role: 'victim', r: 3, c: 1 },
  ],
  victim: 'p5',                    // id de la victime (toujours la dernière personne)
  murderer: 'p2',
  clues: [                         // indices structurés (texte produit à l'affichage)
    { kind: 'inRoom', person: 'p0', room: 0 },
  ],
  difficulty: 'easy' | 'medium' | 'hard' | 'expert',
  lang: 'fr' | 'en',               // langue de l'énigme (prénoms, lieux, phrases des indices)
  theme: 'pirates',                // univers (facultatif, js/data/murdoku-themes.js)
  objectNames: { bed: { name: 'Hamac', a: 'un hamac', on: 'dans un hamac', icon: '🪢' } }, // facultatif
  story: '…',                      // histoire (facultatif), nom de la victime déjà inséré
}
```

- `rooms[i].id === i` ; `cells[r][c]` est l'indice de la pièce. Les pièces sont numérotées
  dans l'ordre de lecture (première case rencontrée).
- `people` : suspects `p0` … `p(N-2)` puis la victime `p(N-1)`. Couleurs : `MF.murdoku.COLORS`
  (palette Okabe-Ito) pour les suspects, `MF.murdoku.VICTIM_COLOR` pour la victime.
- Plusieurs pièces peuvent partager un type (plus de pièces que de types autorisés) : le texte
  les numérote alors (« dans la cuisine 2 », dans l'ordre des id).

Lignes numérotées 1…N de haut en bas, colonnes A, B, C… de gauche à droite
(`rowLabel(r)`, `colLabel(c)` ; dans les données, `r` et `c` commencent à 0).

## Indices

Chaque indice est vrai pour la solution ; le texte est produit à l'affichage par
`MF.murdoku.clueText(clue, puzzle, lang?)`. `row`, `col` commencent à 0.

| kind | champs | sens |
| --- | --- | --- |
| inRoom / notInRoom | person, room | était (n'était pas) dans la pièce |
| onObject | person, object | se tenait sur l'objet (occupable) |
| besideObject | person, object | à côté (case orthogonalement voisine) d'un objet de ce type |
| notBesideObject | person, object | aucune case voisine ne porte un objet de ce type |
| edge / notEdge | person | sur une case du bord du plan (pas sur une case du bord) |
| row / column | person, row / col | sur cette ligne / colonne |
| sameRow / sameColumn | person, object | un objet de ce type est sur sa ligne / colonne (autre case) |
| alone | person | personne d'autre dans sa pièce |
| withPerson / notWith | a, b | dans la même pièce / pas dans la même pièce |
| above / below | a, b | a sur une ligne plus haute / plus basse que b (distance quelconque) |
| leftOf / rightOf | a, b | a sur une colonne plus à gauche / plus à droite que b |
| roomCount | room, n | n personnes (victime comprise) dans la pièce |
| emptyRoom | room | personne dans la pièce |

Aucun indice ne désigne directement le coupable (jamais « X était avec la victime » ni
« X était dans la pièce de la victime » pour le coupable). La règle du coupable fait partie
des règles : le solveur impose que la pièce de la victime contienne exactement 2 personnes.

Chaque sorte d'indice a plusieurs formulations : la variante dépend de l'indice lui-même
(empreinte), elle reste donc stable d'un affichage à l'autre.

## Univers (`MF.murdokuThemes`)

`js/data/murdoku-themes.js` habille les types du moteur sans changer la logique : noms et
phrases des pièces, couleurs des sols et des murs (rendu 3D et plan 2D), noms et icônes des
objets, prénoms, victimes, histoire, style et ambiance de rendu. `resolve(id, lang, custom, seed)`
renvoie l'habillage complet, retouches de l'auteur comprises (`custom.rooms[type] = { name, in }`,
`custom.objects[type] = nom`, `custom.story`) ; le moteur le reçoit dans l'option `theme`. Avec une graine, le générateur mélange les
ingrédients de l'univers (`gen` : ouvertures, objets trouvés, surnoms, titres et noms de victimes) avec
des morceaux communs : prénoms parfois surnommés, victimes et histoire neufs pour chaque variante.

Chaque univers a aussi une version 2D, un thème de grille de même identifiant (`MF.themes`) : la
bibliothèque `MF.library` (`js/data/library.js`) les réunit, dans un seul ordre et des rayons communs à
tous les jeux. Choisir un univers applique sa version 2D à la page (titre, polices, export).

## Caméra du plateau 3D

La vue (`createView`) a une caméra libre posée sur le point de vue choisi (`camera` : `iso` ou `top`) :
glisser pour tourner et incliner, clic droit, bouton du milieu ou touche de modification pour déplacer,
molette pour zoomer ; au doigt, glisser de côté pour tourner (le glissé vertical fait défiler la page),
deux doigts pour zoomer, tourner et déplacer. Méthodes : `nudgeCamera({ az, el, zoom })` (animé, en
degrés et en facteur), `moveCamera(…)` (immédiat), `resetCamera()`, `cameraMoved` ; `onCamera(moved)`
est appelé après chaque mouvement. Les exports (`toCanvas`, `renderImage`) gardent toujours le point de
vue prédéfini.

Vue de base haute (3/4 à 66°, ou de dessus) et projection « debout » des jeux vus de haut : plus la
vue est haute, plus tout ce qui a une hauteur penche vers l'arrière (`standUpAngle` dans
`src3d/looks.js`), pour que figurines et meubles montrent leur face. Seule l'image est cisaillée :
lumière, ombres et clic sur les cases voient la vraie scène. Les figurines se tournent vers la caméra.

## Décor 3D

`src3d/clutter.js` ajoute des accessoires purement décoratifs (nourriture, livres, tonneaux,
coquillages, os, petits tapis…) dans les coins des cases libres et sur les tables, bureaux et
plans de travail ; quantité réglée par l'option de rendu `clutter` (`none`, `some`, `lots`).
Ils ne comptent jamais dans l'énigme : un petit tapis décoratif n'est pas l'objet « tapis ».

## Interface du moteur (`MF.murdoku`)

- `generate(options, seed)` → puzzle (déterministe pour une graine). Options :
  `size` 5…8 (6), `rooms` `'few' | 'normal' | 'many'` ou un nombre, `difficulty`,
  `density` `'sparse' | 'normal' | 'full'` (mobilier), `lang` `'fr' | 'en'`, `names` (prénoms
  des suspects, complétés par `NAMES[lang]`), `victimName`, `roomTypes` (types autorisés),
  `clueKinds` (sortes d'indices autorisées ; si elles ne suffisent jamais, lignes et colonnes
  sont ajoutées en dernier recours), `theme` (habillage de `MF.murdokuThemes.resolve`).
  `options(o)` renvoie les options validées. Le niveau `expert` n'utilise jamais d'indice de
  ligne ou de colonne (sauf en dernier recours).
- `solve(puzzle, clues = puzzle.clues, limit = 2)` → solutions `{ idPersonne: { r, c } }`.
- `isSolved(puzzle, placement)`, `murdererOf(puzzle, placement)` (id ou null),
  `holds(puzzle, clue, placement)`, `validClue(clue, puzzle)`.
- Textes (traduits via `MF.i18n.t`, ou en français forcé avec `lang = 'fr'`) :
  `clueText(clue, puzzle, lang = puzzle.lang)`, `rulesText()` (liste de phrases), `roomLabel(type)`,
  `objectLabel(type)`, `roomName(puzzle, id)`, `objectName(puzzle, type)` (noms habillés).
- Données : `OBJECTS`, `ROOMS` (`{ floor, size, edge?, objects }` : sol suggéré
  `wood | tile | carpet | grass | stone`, taille préférée 1…3, `objects[0]` toujours posé),
  `ROOM_TYPES`, `NAMES`, `VICTIMS`, `COLORS`, `VICTIM_COLOR`, `KINDS`.

## Objets

| type | occupable | pièces typiques |
| --- | --- | --- |
| bed | oui | bedroom, guest |
| sofa | oui | living, game |
| armchair | oui | living, bedroom, office, library, music, game, veranda |
| chair | oui | kitchen, office, dining, music, game, veranda, laundry |
| rug | oui | living, bedroom, bathroom, library, hall, music, guest, game |
| bench | oui | garden, hall, veranda |
| table | non | living, kitchen, library, dining, game, veranda |
| desk | non | office |
| plant | non | presque partout |
| bookshelf | non | living, office, library, music |
| piano | non | living, music |
| bath | non | bathroom |
| sink | non | kitchen, bathroom, laundry |
| tv | non | living, bedroom, game |
| fireplace | non | living, library |
| counter | non | kitchen |
| cabinet | non | kitchen, bedroom, bathroom, office, dining, hall, guest, laundry |
| lamp | non | living, bedroom, office, library, dining, hall, music, guest |
| tree | non | garden |
| fountain | non | garden |

`MF.murdoku.OBJECTS[type] = { occupiable, rooms, one?, wall? }` est la source de vérité
(`rooms` est déduit de `ROOMS[type].objects` ; `one` : au plus un par pièce ; `wall` : posé
contre un mur de préférence). Le jardin touche toujours le bord du plan.
