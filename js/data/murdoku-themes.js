// @ts-check
/* =========================================================================
   Murdoku : univers (thèmes). Chaque univers habille les types de pièces et
   d'objets du moteur (MF.murdoku.ROOMS, OBJECTS) : noms de lieux et d'objets,
   prénoms des suspects, victimes, histoire, couleurs des sols et des murs.
   La logique du jeu ne change pas : un « hamac » reste un lit (occupable).

   Pièces : type -> [nom FR, « dans … » FR, nom EN, « in … » EN, motif, sol 1, sol 2, mur, plein air?]
            (motif : wood, tile, carpet, grass, stone, sand, water, snow, marble, tatami, planks,
            parquet, metal, mosaic, cobble, hex, straw, checker ; plein air = 1 : une zone, pas une
            pièce, sans murs avec les zones voisines)
   Objets : type -> ['g:Nom|prép', 'name|prep'] ; g = m ou f (un / une), prép. = « sur »
            par défaut (« dans » pour un fauteuil…), « on » en anglais.
   gen    : matière du générateur (ouvertures, objets trouvés, surnoms, titres et noms de
            victimes) : chaque enquête mélange ces morceaux pour des noms et une histoire neufs.
   Tout reste modifiable dans l'enquête (noms, lieux, objets, histoire).
   ========================================================================= */
window.MF = window.MF || {};

MF.murdokuThemes = (() => {
  const THEMES = {
    manor: {
      emoji: '🕯️', colors: ['#5b3a29', '#c99a5b'], look: 'print', mood: 'golden',
      gen: { open: [["Une nuit d'orage, au manoir.", "Le dîner d'anniversaire du notaire touchait à sa fin.", "Le vieux manoir grinçait sous la pluie, et la partie de bridge s'éternisait."], ["A stormy night at the manor.", "The notary's birthday dinner was drawing to a close.", "The old manor creaked in the rain, and the bridge game dragged on."]], things: [["une tasse de thé encore tiède", "un gant de velours", "une clé en laiton", "une lettre déchirée"], ["a still-warm cup of tea", "a velvet glove", "a brass key", "a torn letter"]], nick: [["Sans-Souci", "Main-Leste", "Pince-Sans-Rire", "Bec-Fin", "Belle-Plume", "Œil-Vif"], ["Quickhands", "Deadpan", "Sharpeye", "Silvertongue", "Lightfoot", "Goldpen"]], vt: [["Lord", "Tante", "Colonel", "Maître"], ["Lord", "Aunt", "Colonel", "Master"]], vn: ["Victor", "Wolff", "Valmont", "Vesper"] },
      label: ['Manoir', 'Manor'], tagline: ['Le grand classique du crime en huis clos', 'The classic locked-house mystery'],
      story: ['Une nuit d\'orage, au manoir. Au petit matin, {victim} est retrouvé·e sans vie. Les invités jurent n\'avoir rien entendu… mais chacun était quelque part.',
        'A stormy night at the manor. At dawn, {victim} is found dead. The guests swear they heard nothing… yet each of them was somewhere.'],
      rooms: {},
      objects: {},
      names: {
        fr: ['Alice', 'Bruno', 'Chloé', 'David', 'Emma', 'Félix', 'Gaby', 'Hugo', 'Inès', 'Jules', 'Karim', 'Léa', 'Marc', 'Nina', 'Oscar', 'Paula', 'Rose', 'Simon', 'Théo', 'Zoé'],
        en: ['Alice', 'Ben', 'Chloe', 'Dan', 'Emma', 'Frank', 'Grace', 'Harry', 'Ivy', 'Jack', 'Kate', 'Leo', 'Mia', 'Noah', 'Olive', 'Paul', 'Ruby', 'Sam', 'Tom', 'Zara'],
      },
      victims: { fr: ['Lord Victor', 'Tante Viviane', 'Le Majordome', 'Colonel Wolff'], en: ['Lord Victor', 'Aunt Vivian', 'The Butler', 'Colonel Wolff'] },
    },

    mermaids: {
      emoji: '🧜‍♀️', colors: ['#1d6f8a', '#7fd6c8'], look: 'gouache', mood: 'day',
      gen: { open: [["Au palais de corail, la fête des marées battait son plein.", "Sous la lune pleine, le royaume des sirènes chantait.", "Une tempête agitait la surface, mais au fond tout semblait calme."], ["The tide festival was in full swing at the coral palace.", "Under the full moon, the mermaid kingdom was singing.", "A storm raged at the surface, but down below all seemed calm."]], things: [["une écaille dorée", "une perle fendue", "un peigne de nacre", "une bouteille à la mer"], ["a golden scale", "a cracked pearl", "a mother-of-pearl comb", "a message in a bottle"]], nick: [["Queue-d'Or", "Voix-d'Écume", "Nage-Vite", "Œil-de-Perle", "Corail", "Bulle"], ["Goldtail", "Foamvoice", "Swiftfin", "Pearleye", "Coral", "Bubbles"]], vt: [["Roi", "Reine", "Vieux", "Sirène"], ["King", "Queen", "Old", "Siren"]], vn: ["Triton", "Ondine", "Poulpe", "Vaïa"] },
      label: ['Sirènes', 'Mermaids'], tagline: ['Un royaume de nacre au fond des mers', 'A pearly kingdom under the sea'],
      story: ['Au palais de corail, la fête des marées battait son plein. Quand la conque a sonné, {victim} flottait, immobile. Une sirène ment, et les bulles ne trahissent rien.',
        'The tide festival was in full swing at the coral palace. When the conch sounded, {victim} was drifting, lifeless. One mermaid is lying, and bubbles tell no tales.'],
      rooms: {
        living: ['Grotte de corail', 'dans la grotte de corail', 'Coral grotto', 'in the coral grotto', 'tile', '#f2a49a', '#d9776c', '#f6d3c9'],
        kitchen: ['Parc à huîtres', 'dans le parc à huîtres', 'Oyster beds', 'in the oyster beds', 'sand', '#e8d6a8', '#cdb47a', '#7fb7b1', 1],
        bedroom: ['Chambre de nacre', 'dans la chambre de nacre', 'Pearl chamber', 'in the pearl chamber', 'carpet', '#e9dff2', '#c5b2dc', '#b9a3d6'],
        bathroom: ['Bassin des bulles', 'dans le bassin des bulles', 'Bubble pool', 'in the bubble pool', 'tile', '#a8e1ea', '#6cbfcf', '#83c9d4'],
        office: ['Salle du trône', 'dans la salle du trône', 'Throne room', 'in the throne room', 'mosaic', '#f3d27a', '#d1a843', '#3b8ea5'],
        library: ['Grotte aux parchemins', 'dans la grotte aux parchemins', 'Scroll cave', 'in the scroll cave', 'stone', '#b9c7c4', '#8ea29e', '#5e7f86'],
        dining: ['Salle des festins', 'dans la salle des festins', 'Feast hall', 'in the feast hall', 'hex', '#f7c8a5', '#e09a6b', '#e07a6a'],
        garden: ['Forêt de varechs', 'dans la forêt de varechs', 'Kelp forest', 'in the kelp forest', 'sand', '#d9c890', '#b8a66a', '#5aa58a', 1],
        hall: ['Épave', 'dans l\'épave', 'Shipwreck', 'in the shipwreck', 'planks', '#8b6d4f', '#5c4532', '#4f6b70'],
        music: ['Conque des chants', 'dans la conque des chants', 'Singing conch', 'in the singing conch', 'carpet', '#f5c1d6', '#e08aae', '#f0a8c4'],
        veranda: ['Lagon', 'dans le lagon', 'Lagoon', 'in the lagoon', 'water', '#6fd0d8', '#e8fbff', '#5fc6c9', 1],
        guest: ['Grotte de la sorcière', 'dans la grotte de la sorcière', 'Sea witch\'s lair', 'in the sea witch\'s lair', 'stone', '#6d5a86', '#4a3a63', '#3d2f55'],
      },
      objects: {
        bed: ['f:Coquille géante|dans', 'giant clam shell|in'], sofa: ['m:Banc de corail', 'coral bench'], armchair: ['m:Trône de nacre', 'pearl throne'],
        chair: ['m:Rocher moussu', 'mossy rock'], rug: ['m:Tapis d\'algues', 'seaweed mat'], bench: ['f:Raie endormie', 'sleeping ray'],
        table: ['f:Table de corail', 'coral table'], desk: ['m:Pupitre de nacre', 'pearl lectern'], plant: ['f:Anémone', 'sea anemone'],
        bookshelf: ['f:Étagère de coquillages', 'shell shelf'], piano: ['f:Harpe', 'harp'], bath: ['m:Geyser de bulles', 'bubble geyser'],
        sink: ['f:Source chaude', 'thermal vent'], tv: ['m:Miroir magique', 'magic mirror'], fireplace: ['m:Volcan sous-marin', 'undersea volcano'],
        counter: ['m:Banc d\'huîtres', 'oyster bank'], cabinet: ['m:Coffre au trésor', 'treasure chest'], lamp: ['f:Méduse lumineuse', 'glowing jellyfish'],
        tree: ['m:Varech géant', 'giant kelp'], fountain: ['f:Ancre rouillée', 'rusty anchor'],
      },
      icons: { bed: '🐚', plant: '🪸', lamp: '🪼', tree: '🌿', fountain: '⚓', cabinet: '💰', piano: '🪕', bench: '🐟' },
      names: {
        fr: ['Ariel', 'Blu', 'Coralie', 'Delphine', 'Écume', 'Flipper', 'Galathée', 'Hélia', 'Iris', 'Jade', 'Kaï', 'Lorelei', 'Marina', 'Nérée', 'Océane', 'Perle', 'Thétis'],
        en: ['Ariel', 'Blue', 'Coral', 'Delphine', 'Echo', 'Finn', 'Galatea', 'Halia', 'Iris', 'Jade', 'Kai', 'Lorelei', 'Marina', 'Nereus', 'Ocean', 'Pearl', 'Thetis'],
      },
      victims: { fr: ['Roi Triton', 'Reine Ondine', 'Vieux Poulpe', 'Sirène Vaïa'], en: ['King Triton', 'Queen Undine', 'Old Octopus', 'Siren Vaia'] },
    },

    japan: {
      emoji: '🏯', colors: ['#7a1f1f', '#e9b7a5'], look: 'gouache', mood: 'dusk',
      gen: { open: [["Sous la lune d'automne, le château du daimyo dormait.", "La cérémonie du thé venait de commencer.", "Les cerisiers étaient en fleurs, et le tournoi de sabre attirait tout le monde."], ["Beneath the autumn moon, the daimyo's castle slept.", "The tea ceremony had just begun.", "The cherry trees were in bloom, and the sword tournament had drawn everyone."]], things: [["un shuriken", "un éventail brisé", "une sandale de paille", "un pétale de cerisier taché"], ["a shuriken", "a broken fan", "a straw sandal", "a stained cherry petal"]], nick: [["l'Ombre", "Lame-Vive", "Pas-Feutré", "Œil-de-Faucon", "Vent-du-Nord", "Main-de-Fer"], ["the Shadow", "Swiftblade", "Softstep", "Hawkeye", "Northwind", "Ironhand"]], vt: [["Seigneur", "Dame", "Maître", "Shogun"], ["Lord", "Lady", "Master", "Shogun"]], vn: ["Oda", "Murasaki", "Tanaka", "Ieyasu"] },
      label: ['Samouraïs & ninjas', 'Samurai & ninjas'], tagline: ['Japon féodal, lames et ombres', 'Feudal Japan, blades and shadows'],
      story: ['Sous la lune d\'automne, le château du daimyo dormait. À l\'aube, {victim} gisait sur les tatamis. Un ninja s\'est glissé parmi les invités : son honneur ne le sauvera pas.',
        'Beneath the autumn moon, the daimyo\'s castle slept. At dawn, {victim} lay on the tatami. A ninja is hiding among the guests: honour will not save them.'],
      rooms: {
        living: ['Salle du thé', 'dans la salle du thé', 'Tea room', 'in the tea room', 'tatami', '#ddd29a', '#3a5a3a', '#c84b3c'],
        kitchen: ['Cuisines', 'dans les cuisines', 'Kitchens', 'in the kitchens', 'wood', '#c9a77c', '#9c7a51', '#f2ead8'],
        bedroom: ['Chambre du shogun', 'dans la chambre du shogun', 'Shogun\'s chamber', 'in the shogun\'s chamber', 'tatami', '#e2d79f', '#5a2a2a', '#8f2d2d'],
        bathroom: ['Onsen', 'dans l\'onsen', 'Hot spring', 'in the hot spring', 'water', '#9fd0d4', '#ffffff', '#6c8a80', 1],
        office: ['Salle du conseil', 'dans la salle du conseil', 'Council room', 'in the council room', 'wood', '#a87b51', '#7a5434', '#2f2a28'],
        library: ['Salle des rouleaux', 'dans la salle des rouleaux', 'Scroll room', 'in the scroll room', 'tatami', '#d8cf98', '#3a3a2a', '#5b6e4a'],
        dining: ['Salle des banquets', 'dans la salle des banquets', 'Banquet hall', 'in the banquet hall', 'wood', '#b88655', '#8a5f37', '#d65a45'],
        garden: ['Jardin zen', 'dans le jardin zen', 'Zen garden', 'in the zen garden', 'sand', '#ece6d6', '#cfc6b0', '#8a9a6a', 1],
        hall: ['Dojo', 'dans le dojo', 'Dojo', 'in the dojo', 'planks', '#d6b07c', '#a77f4d', '#3a3433'],
        music: ['Pavillon du koto', 'dans le pavillon du koto', 'Koto pavilion', 'in the koto pavilion', 'wood', '#c99a66', '#99703f', '#e9a3a3'],
        guest: ['Grenier des ninjas', 'dans le grenier des ninjas', 'Ninja loft', 'in the ninja loft', 'wood', '#7d6550', '#55432f', '#2b2b33'],
        veranda: ['Pont rouge', 'sur le pont rouge', 'Red bridge', 'on the red bridge', 'planks', '#d0533f', '#a23b2b', '#e9d9b8', 1],
      },
      objects: {
        bed: ['m:Futon', 'futon'], sofa: ['m:Banc laqué', 'lacquered bench'], armchair: ['m:Coussin zabuton', 'zabuton cushion'],
        chair: ['m:Tabouret', 'stool'], rug: ['m:Tatami', 'tatami'], bench: ['m:Banc de pierre', 'stone bench'],
        table: ['f:Table basse', 'low table'], desk: ['f:Écritoire', 'writing desk'], plant: ['m:Bonsaï', 'bonsai'],
        bookshelf: ['m:Râtelier à katanas', 'katana rack'], piano: ['m:Koto', 'koto'], bath: ['m:Bain ofuro', 'ofuro tub'],
        sink: ['f:Vasque de pierre', 'stone basin'], tv: ['m:Paravent', 'folding screen'], fireplace: ['m:Foyer irori', 'irori hearth'],
        counter: ['m:Fourneau', 'cooking stove'], cabinet: ['m:Coffre à armure', 'armour chest'], lamp: ['f:Lanterne de papier', 'paper lantern'],
        tree: ['m:Cerisier', 'cherry tree'], fountain: ['m:Bassin aux carpes', 'koi pond'],
      },
      icons: { plant: '🎍', tree: '🌸', lamp: '🏮', fountain: '🎏', bookshelf: '⚔️', tv: '🀄', piano: '🪕', rug: '🟩' },
      names: {
        fr: ['Akira', 'Botan', 'Chiyo', 'Daisuke', 'Emi', 'Fumiko', 'Goro', 'Hanzo', 'Isamu', 'Jun', 'Kenji', 'Mei', 'Nobu', 'Rin', 'Sakura', 'Takeshi', 'Yuki'],
        en: ['Akira', 'Botan', 'Chiyo', 'Daisuke', 'Emi', 'Fumiko', 'Goro', 'Hanzo', 'Isamu', 'Jun', 'Kenji', 'Mei', 'Nobu', 'Rin', 'Sakura', 'Takeshi', 'Yuki'],
      },
      victims: { fr: ['Seigneur Oda', 'Dame Murasaki', 'Maître Tanaka', 'Shogun Ieyasu'], en: ['Lord Oda', 'Lady Murasaki', 'Master Tanaka', 'Shogun Ieyasu'] },
    },

    paris: {
      emoji: '🥐', colors: ['#24427a', '#e8b4b8'], look: 'print', mood: 'golden',
      gen: { open: [["Paris, 1900. La fête battait son plein de Montmartre aux quais de Seine.", "Le rideau du cabaret venait de tomber.", "Un matin de brouillard, la boulangerie embaumait tout le quartier."], ["Paris, 1900. The party was raging from Montmartre to the Seine.", "The cabaret curtain had just come down.", "One foggy morning, the bakery perfumed the whole street."]], things: [["un croissant entamé", "un béret rouge", "un pinceau plein de peinture", "un ticket de métro"], ["a half-eaten croissant", "a red beret", "a paint-soaked brush", "a metro ticket"]], nick: [["la Gouaille", "Belle-Moustache", "Pied-Léger", "Bon-Vivant", "Mille-Feuille", "Cancan"], ["Smoothtalk", "Grandmoustache", "Lightfoot", "Bon Vivant", "Millefeuille", "Cancan"]], vt: [["Monsieur", "Madame", "Baron", "Mademoiselle"], ["Monsieur", "Madame", "Baron", "Mademoiselle"]], vn: ["Vidal", "Vernet", "Valois", "Pinson"] },
      label: ['Paris, Belle Époque', 'Paris, Belle Époque'], tagline: ['Cabarets, croissants et coups bas', 'Cabarets, croissants and dirty tricks'],
      story: ['Paris, 1900. La fête battait son plein de Montmartre aux quais de Seine quand {victim} s\'est effondré·e, un croissant à la main. Oh là là… quelqu\'un ment, et ce n\'est pas l\'accordéoniste.',
        'Paris, 1900. The party was raging from Montmartre to the Seine when {victim} collapsed, croissant in hand. Oh là là… someone is lying, and it is not the accordion player.'],
      rooms: {
        living: ['Cabaret', 'au cabaret', 'Cabaret', 'at the cabaret', 'carpet', '#c0392b', '#8e2a20', '#2c2a4a'],
        kitchen: ['Boulangerie', 'à la boulangerie', 'Bakery', 'at the bakery', 'checker', '#f3e3c3', '#6a4a3a', '#e7c38f'],
        bedroom: ['Chambre de bonne', 'dans la chambre de bonne', 'Attic room', 'in the attic room', 'wood', '#c99868', '#9a6d45', '#a9b8d4'],
        bathroom: ['Bains-douches', 'aux bains-douches', 'Bathhouse', 'at the bathhouse', 'tile', '#e4eef0', '#9fbcc2', '#8fb3b9'],
        office: ['Atelier du peintre', 'dans l\'atelier du peintre', 'Painter\'s studio', 'in the painter\'s studio', 'planks', '#d8b48a', '#a9845c', '#e3c9a8'],
        library: ['Bouquiniste', 'chez le bouquiniste', 'Bookstall', 'at the bookstall', 'wood', '#9a6b43', '#6e4a2c', '#3e6b56'],
        dining: ['Bistrot', 'au bistrot', 'Bistro', 'at the bistro', 'checker', '#ece4d2', '#2d2d2d', '#9c2f2f'],
        garden: ['Jardin du Luxembourg', 'au jardin du Luxembourg', 'Luxembourg Gardens', 'in the Luxembourg Gardens', 'grass', '#95c06a', '#6b9a48', '#d8cfb4', 1],
        hall: ['Métro', 'dans le métro', 'Metro', 'in the metro', 'hex', '#f1ede4', '#3f7f5f', '#3f7f5f'],
        music: ['Opéra', 'à l\'Opéra', 'Opera house', 'at the opera house', 'carpet', '#a11d33', '#6e1424', '#d7b25a'],
        veranda: ['Terrasse de café', 'en terrasse', 'Café terrace', 'on the café terrace', 'cobble', '#d9d1c1', '#b3a993', '#c74b4b', 1],
        game: ['Fromagerie', 'à la fromagerie', 'Cheese shop', 'at the cheese shop', 'hex', '#f6e7a8', '#d9c06a', '#e5d39b'],
        laundry: ['Parfumerie', 'à la parfumerie', 'Perfumery', 'at the perfumery', 'marble', '#f2e8f4', '#c7a6d3', '#b28dc4'],
      },
      objects: {
        bed: ['m:Lit en fer', 'iron bed'], sofa: ['f:Méridienne', 'chaise longue'], armchair: ['m:Fauteuil Louis XV|dans', 'Louis XV armchair|in'],
        chair: ['f:Chaise de bistrot', 'bistro chair'], rug: ['m:Tapis', 'rug'], bench: ['m:Banc public', 'park bench'],
        table: ['m:Guéridon', 'pedestal table'], desk: ['m:Chevalet', 'easel'], plant: ['m:Pot de géraniums', 'pot of geraniums'],
        bookshelf: ['f:Boîte de bouquiniste', 'book box'], piano: ['m:Piano', 'piano'], bath: ['f:Baignoire à pieds', 'clawfoot bath'],
        sink: ['m:Lavabo', 'washbasin'], tv: ['f:Affiche de cabaret', 'cabaret poster'], fireplace: ['m:Four à pain', 'bread oven'],
        counter: ['m:Comptoir en zinc', 'zinc counter'], cabinet: ['m:Vaisselier', 'dresser'], lamp: ['m:Réverbère', 'street lamp'],
        tree: ['m:Marronnier', 'chestnut tree'], fountain: ['f:Fontaine Médicis', 'Medici fountain'],
      },
      icons: { counter: '🥖', fireplace: '🥐', tv: '🎭', desk: '🎨', plant: '🌺', lamp: '🏮', bookshelf: '📚' },
      names: {
        fr: ['Amélie', 'Bastien', 'Colette', 'Didier', 'Édith', 'Fanfan', 'Gaston', 'Hortense', 'Isidore', 'Josette', 'Lucien', 'Margot', 'Noémie', 'Octave', 'Pierrot', 'Suzette', 'Toinette'],
        en: ['Amélie', 'Bastien', 'Colette', 'Didier', 'Édith', 'Fanfan', 'Gaston', 'Hortense', 'Isidore', 'Josette', 'Lucien', 'Margot', 'Noémie', 'Octave', 'Pierrot', 'Suzette', 'Toinette'],
      },
      victims: { fr: ['Monsieur Vidal', 'Madame Vernet', 'Baron Valois', 'Mimi Pinson'], en: ['Monsieur Vidal', 'Madame Vernet', 'Baron Valois', 'Mimi Pinson'] },
    },

    regency: {
      emoji: '💐', colors: ['#7d6bb3', '#f2c6d6'], look: 'gouache', mood: 'golden',
      gen: { open: [["Chère lectrice, cher lecteur… Le bal de la saison battait son plein.", "Les débutantes venaient d'être présentées à la reine.", "Une partie de croquet tournait au vinaigre dans la roseraie."], ["Dearest reader… The ball of the season was in full swing.", "The debutantes had just been presented to the queen.", "A croquet game was turning sour in the rose garden."]], things: [["un éventail de dentelle", "une lettre anonyme", "un carnet de bal", "un gant parfumé"], ["a lace fan", "an anonymous letter", "a dance card", "a perfumed glove"]], nick: [["Ashford", "Bellerive", "Montclair", "Whitby", "Featherstone", "Langley"], ["Ashford", "Bellerive", "Montclair", "Whitby", "Featherstone", "Langley"]], vt: [["Lord", "Lady", "Duc", "Comtesse"], ["Lord", "Lady", "Duke", "Countess"]], vn: ["Ashworth", "Whitmore", "Valcourt", "Vane"], rate: 0.75 },
      label: ['Bal de la Régence', 'Regency ball'], tagline: ['Bals, scandales et lettres anonymes', 'Balls, scandals and anonymous letters'],
      story: ['Chère lectrice, cher lecteur… Au beau milieu du bal de la saison, {victim} s\'est effondré·e entre deux valses. Les éventails s\'agitent, les langues aussi : un seul invité a des choses à cacher.',
        'Dearest reader… In the middle of the season\'s grandest ball, {victim} collapsed between two waltzes. Fans flutter, tongues wag: only one guest has something to hide.'],
      rooms: {
        living: ['Grand salon', 'dans le grand salon', 'Drawing room', 'in the drawing room', 'carpet', '#cbb6e0', '#9f86c4', '#f3d7e3'],
        kitchen: ['Office des domestiques', 'dans l\'office des domestiques', 'Servants\' hall', 'in the servants\' hall', 'stone', '#e3d8c4', '#bfb197', '#d8ccb0'],
        bedroom: ['Boudoir', 'dans le boudoir', 'Boudoir', 'in the boudoir', 'carpet', '#f2b8c6', '#d78aa0', '#f7dbe3'],
        bathroom: ['Cabinet de toilette', 'dans le cabinet de toilette', 'Dressing room', 'in the dressing room', 'hex', '#f5eef2', '#d8c8d2', '#c8dcef'],
        office: ['Cabinet du duc', 'dans le cabinet du duc', 'Duke\'s study', 'in the duke\'s study', 'wood', '#9c6b45', '#6c4628', '#4e6d8c'],
        library: ['Bibliothèque', 'dans la bibliothèque', 'Library', 'in the library', 'parquet', '#a87750', '#76502f', '#5f7a5b'],
        dining: ['Salle de bal', 'dans la salle de bal', 'Ballroom', 'in the ballroom', 'marble', '#f4ecd8', '#c9a96a', '#e9d6f2'],
        garden: ['Roseraie', 'dans la roseraie', 'Rose garden', 'in the rose garden', 'grass', '#9ccc7a', '#6fa456', '#efe2c4', 1],
        hall: ['Grand escalier', 'dans le grand escalier', 'Grand staircase', 'on the grand staircase', 'marble', '#f0ebe1', '#cfc6b4', '#e7d8ea'],
        music: ['Salon de musique', 'dans le salon de musique', 'Music room', 'in the music room', 'parquet', '#dcb27c', '#ac8350', '#b9d3e8'],
        guest: ['Chambre de la débutante', 'dans la chambre de la débutante', 'Debutante\'s room', 'in the debutante\'s room', 'carpet', '#f6d0dc', '#e2a2b6', '#fbe7ee'],
        veranda: ['Orangerie', 'dans l\'orangerie', 'Orangery', 'in the orangery', 'checker', '#f3e7cf', '#8a6a4a', '#bfe0c6'],
        game: ['Salon de cartes', 'dans le salon de cartes', 'Card room', 'in the card room', 'carpet', '#3f6b5a', '#2a4c3f', '#c7a96b'],
      },
      objects: {
        bed: ['m:Lit à baldaquin', 'four-poster bed'], sofa: ['f:Méridienne', 'chaise longue'], armchair: ['f:Bergère|dans', 'wingback chair|in'],
        chair: ['f:Chaise dorée', 'gilded chair'], rug: ['m:Tapis persan', 'Persian rug'], bench: ['m:Banc de jardin', 'garden bench'],
        table: ['f:Table à thé', 'tea table'], desk: ['m:Secrétaire', 'writing bureau'], plant: ['m:Vase de roses', 'vase of roses'],
        bookshelf: ['m:Rayonnage', 'bookcase'], piano: ['m:Pianoforte', 'pianoforte'], bath: ['m:Tub en cuivre', 'copper tub'],
        sink: ['f:Coiffeuse', 'dressing table'], tv: ['m:Portrait de famille', 'family portrait'], fireplace: ['f:Cheminée de marbre', 'marble fireplace'],
        counter: ['m:Buffet', 'sideboard'], cabinet: ['f:Commode', 'chest of drawers'], lamp: ['m:Chandelier', 'candelabra'],
        tree: ['m:Saule', 'willow'], fountain: ['f:Fontaine aux cygnes', 'swan fountain'],
      },
      icons: { plant: '💐', tree: '🌳', lamp: '🕯️', tv: '🖼️', fountain: '🦢', sink: '🪞', desk: '✒️' },
      names: {
        fr: ['Arabella', 'Béatrice', 'Cassandra', 'Darcy', 'Edmund', 'Frederick', 'Georgiana', 'Henrietta', 'Ignatius', 'Julian', 'Kitty', 'Lydia', 'Montague', 'Octavia', 'Percival', 'Rosalind', 'Theodore'],
        en: ['Arabella', 'Beatrice', 'Cassandra', 'Darcy', 'Edmund', 'Frederick', 'Georgiana', 'Henrietta', 'Ignatius', 'Julian', 'Kitty', 'Lydia', 'Montague', 'Octavia', 'Percival', 'Rosalind', 'Theodore'],
      },
      victims: { fr: ['Lord Ashworth', 'Lady Whitmore', 'Duc de Valcourt', 'Comtesse Vane'], en: ['Lord Ashworth', 'Lady Whitmore', 'Duke of Valcourt', 'Countess Vane'] },
    },

    egypt: {
      emoji: '🐫', colors: ['#b8862b', '#2f5e8c'], look: 'print', mood: 'golden',
      gen: { open: [["Sur les rives du Nil, la crue s'annonçait belle.", "Le temple venait d'ouvrir ses portes pour la fête d'Opet.", "Une tempête de sable soufflait sur Thèbes."], ["On the banks of the Nile, the flood promised to be good.", "The temple had just opened its doors for the Opet festival.", "A sandstorm was blowing over Thebes."]], things: [["un scarabée de jade", "un papyrus froissé", "une sandale dorée", "une fiole de parfum vide"], ["a jade scarab", "a crumpled papyrus", "a golden sandal", "an empty perfume vial"]], nick: [["l'Ancien", "Œil-d'Horus", "Fils-du-Nil", "Main-d'Or", "Pied-de-Sable", "le Scribe"], ["the Elder", "Horus-Eye", "Nileborn", "Goldhand", "Sandfoot", "the Scribe"]], vt: [["Pharaon", "Grand prêtre", "Princesse", "Vizir"], ["Pharaoh", "High Priest", "Princess", "Vizier"]], vn: ["Ankhou", "Ka", "Isis", "Ptah"] },
      label: ['Pharaons', 'Pharaohs'], tagline: ['Sable, scarabées et malédictions', 'Sand, scarabs and curses'],
      story: ['Sur les rives du Nil, la crue s\'annonçait belle. Mais au lever de Râ, {victim} ne s\'est jamais réveillé·e. Les scribes ont tout noté : à toi de lire entre les hiéroglyphes.',
        'On the banks of the Nile, the flood promised to be good. But when Ra rose, {victim} never woke. The scribes wrote everything down: read between the hieroglyphs.'],
      rooms: {
        living: ['Salle du trône', 'dans la salle du trône', 'Throne room', 'in the throne room', 'marble', '#e8cf8f', '#a8843a', '#2f5e8c'],
        kitchen: ['Cuisines royales', 'dans les cuisines royales', 'Royal kitchens', 'in the royal kitchens', 'stone', '#e4c99b', '#c4a06a', '#d9b47a'],
        bedroom: ['Chambre de la reine', 'dans la chambre de la reine', 'Queen\'s chamber', 'in the queen\'s chamber', 'carpet', '#3f7fa8', '#2a5d80', '#e5c27a'],
        bathroom: ['Bains parfumés', 'dans les bains parfumés', 'Perfumed baths', 'in the perfumed baths', 'mosaic', '#bfe0e0', '#2f6f8a', '#d7b56d'],
        office: ['Atelier des scribes', 'dans l\'atelier des scribes', 'Scribes\' workshop', 'in the scribes\' workshop', 'stone', '#e6d2a6', '#c2a874', '#a9763f'],
        library: ['Salle des papyrus', 'dans la salle des papyrus', 'Papyrus hall', 'in the papyrus hall', 'stone', '#ead9ad', '#c9b27a', '#4f7a5a'],
        dining: ['Salle des offrandes', 'dans la salle des offrandes', 'Offering hall', 'in the offering hall', 'mosaic', '#e9c98a', '#2f5e8c', '#b5523b'],
        garden: ['Rives du Nil', 'sur les rives du Nil', 'Banks of the Nile', 'on the banks of the Nile', 'grass', '#8fbf6a', '#5f9a48', '#d8c08a', 1],
        hall: ['Tombeau secret', 'dans le tombeau secret', 'Secret tomb', 'in the secret tomb', 'stone', '#b9a27a', '#8c7552', '#3b3328'],
        music: ['Temple d\'Isis', 'dans le temple d\'Isis', 'Temple of Isis', 'in the temple of Isis', 'marble', '#f0dca8', '#d4b46e', '#3d6f8f'],
        veranda: ['Dunes', 'dans les dunes', 'Dunes', 'in the dunes', 'sand', '#f0d28e', '#c9a456', '#e6c27c', 1],
        guest: ['Chambre funéraire', 'dans la chambre funéraire', 'Burial chamber', 'in the burial chamber', 'stone', '#9a8463', '#6e5c43', '#2b2a3a'],
        laundry: ['Atelier des embaumeurs', 'chez les embaumeurs', 'Embalmers\' workshop', 'in the embalmers\' workshop', 'straw', '#d9c7a3', '#b19d76', '#7f6a4a'],
      },
      objects: {
        bed: ['m:Lit de repos', 'daybed'], sofa: ['m:Trône doré', 'golden throne'], armchair: ['m:Siège d\'ébène', 'ebony seat'],
        chair: ['m:Tabouret', 'stool'], rug: ['f:Natte de papyrus', 'papyrus mat'], bench: ['m:Banc de pierre', 'stone bench'],
        table: ['m:Autel', 'altar'], desk: ['f:Table du scribe', 'scribe\'s table'], plant: ['m:Papyrus', 'papyrus'],
        bookshelf: ['f:Niche à rouleaux', 'scroll niche'], piano: ['f:Harpe', 'harp'], bath: ['m:Bassin de lait', 'milk bath'],
        sink: ['f:Jarre', 'clay jar'], tv: ['f:Fresque', 'fresco'], fireplace: ['m:Brasero', 'brazier'],
        counter: ['m:Four à pain', 'bread oven'], cabinet: ['m:Sarcophage', 'sarcophagus'], lamp: ['f:Lampe à huile', 'oil lamp'],
        tree: ['m:Palmier', 'palm tree'], fountain: ['m:Obélisque', 'obelisk'],
      },
      icons: { tree: '🌴', cabinet: '⚱️', fountain: '🗿', plant: '🌾', bath: '🥛', lamp: '🪔', sink: '🏺', tv: '𓂀' },
      names: {
        fr: ['Amon', 'Bastet', 'Cléo', 'Djoser', 'Eset', 'Fayza', 'Hathor', 'Imhotep', 'Khéops', 'Layla', 'Mérit', 'Néfer', 'Osiris', 'Ramsès', 'Séti', 'Tiyi', 'Zahra'],
        en: ['Amun', 'Bastet', 'Cleo', 'Djoser', 'Eset', 'Fayza', 'Hathor', 'Imhotep', 'Khufu', 'Layla', 'Merit', 'Nefer', 'Osiris', 'Ramses', 'Seti', 'Tiye', 'Zahra'],
      },
      victims: { fr: ['Pharaon Ankhou', 'Grand prêtre Ka', 'Princesse Isis', 'Vizir Ptah'], en: ['Pharaoh Ankhu', 'High Priest Ka', 'Princess Isis', 'Vizier Ptah'] },
    },

    pirates: {
      emoji: '🏴‍☠️', colors: ['#123e52', '#e0a94a'], look: 'gouache', mood: 'golden',
      gen: { open: [["Mille sabords ! Le navire mouillait dans la crique.", "La chasse au trésor touchait au but.", "Le rhum coulait à flots après l'abordage."], ["Shiver me timbers! The ship lay at anchor in the cove.", "The treasure hunt was nearly over.", "The rum was flowing after the boarding."]], things: [["une plume de perroquet", "une pièce d'or maudite", "une carte au trésor déchirée", "une jambe de bois"], ["a parrot feather", "a cursed gold coin", "a torn treasure map", "a wooden leg"]], nick: [["Barbe-Rousse", "Jambe-de-Bois", "Œil-de-Verre", "Sabre-Clair", "Crochet", "Sans-Dents"], ["Redbeard", "Pegleg", "Glasseye", "Brightsabre", "Hook", "Toothless"]], vt: [["Capitaine", "Vieux", "Amiral", "Maître-coq"], ["Captain", "Old", "Admiral", "Cook"]], vn: ["Vane", "Bones", "Hawk", "Wilhelm"] },
      label: ['Pirates', 'Pirates'], tagline: ['Rhum, trésors et trahisons', 'Rum, treasure and treachery'],
      story: ['Mille sabords ! Le navire mouillait dans la crique quand {victim} a été retrouvé·e raide comme un mât. L\'équipage jure sur le rhum… mais un forban dit faux.',
        'Shiver me timbers! The ship lay at anchor in the cove when {victim} was found stiff as a mast. The crew swear on the rum… but one scallywag is lying.'],
      rooms: {
        living: ['Pont', 'sur le pont', 'Deck', 'on the deck', 'planks', '#c18f5a', '#8d6339', '#6b4a2b', 1],
        kitchen: ['Cambuse', 'dans la cambuse', 'Galley', 'in the galley', 'planks', '#a7784b', '#7a5532', '#c7a77a'],
        bedroom: ['Cabine du capitaine', 'dans la cabine du capitaine', 'Captain\'s cabin', 'in the captain\'s cabin', 'carpet', '#8c2f2f', '#5f1f1f', '#d4b483'],
        bathroom: ['Cale', 'dans la cale', 'Hold', 'in the hold', 'planks', '#7d5d40', '#55402b', '#4d3a2a'],
        office: ['Salle des cartes', 'dans la salle des cartes', 'Chart room', 'in the chart room', 'parquet', '#b48656', '#875e36', '#2f5a6e'],
        library: ['Taverne du port', 'à la taverne du port', 'Harbour tavern', 'at the harbour tavern', 'planks', '#9b6b42', '#6f4a2a', '#8a5a3b'],
        dining: ['Carré des officiers', 'dans le carré des officiers', 'Wardroom', 'in the wardroom', 'parquet', '#b88a5d', '#8b6239', '#a33a2c'],
        garden: ['Plage', 'sur la plage', 'Beach', 'on the beach', 'sand', '#f1dca2', '#d9bd78', '#e9d8a6', 1],
        hall: ['Ponton', 'sur le ponton', 'Jetty', 'on the jetty', 'planks', '#a88660', '#7d6142', '#5d8aa0', 1],
        music: ['Crique des pirates', 'dans la crique des pirates', 'Pirate cove', 'in the pirate cove', 'water', '#4fb3c6', '#e6fbff', '#4f8fa0', 1],
        game: ['Tripot', 'au tripot', 'Gambling den', 'in the gambling den', 'carpet', '#2f6b4f', '#1f4d38', '#a8763e'],
        laundry: ['Soute à poudre', 'dans la soute à poudre', 'Powder room', 'in the powder room', 'planks', '#6e5039', '#4b3626', '#3a2a20'],
        veranda: ['Nid-de-pie', 'dans le nid-de-pie', 'Crow\'s nest', 'in the crow\'s nest', 'planks', '#c79c68', '#987246', '#e0c08a', 1],
      },
      objects: {
        bed: ['m:Hamac|dans', 'hammock|in'], sofa: ['m:Tas de voiles', 'pile of sails'], armchair: ['m:Fauteuil du capitaine|dans', 'captain\'s chair|in'],
        chair: ['m:Tonnelet', 'keg'], rug: ['m:Filet de pêche', 'fishing net'], bench: ['m:Banc de nage', 'rowing bench'],
        table: ['f:Table des cartes', 'map table'], desk: ['m:Pupitre de navigation', 'navigation desk'], plant: ['m:Perroquet', 'parrot'],
        bookshelf: ['m:Râtelier à sabres', 'cutlass rack'], piano: ['m:Orgue de barbarie', 'barrel organ'], bath: ['m:Baril de rhum', 'rum barrel'],
        sink: ['m:Seau', 'bucket'], tv: ['f:Longue-vue', 'spyglass'], fireplace: ['m:Canon', 'cannon'],
        counter: ['m:Comptoir', 'bar counter'], cabinet: ['m:Coffre au trésor', 'treasure chest'], lamp: ['f:Lanterne', 'lantern'],
        tree: ['m:Palmier', 'palm tree'], fountain: ['m:Trésor enterré', 'buried treasure'],
      },
      icons: { plant: '🦜', tree: '🌴', cabinet: '💰', bath: '🛢️', fireplace: '💣', fountain: '❌', bookshelf: '⚔️', tv: '🔭', bed: '🪢', lamp: '🏮' },
      names: {
        fr: ['Anne', 'Barbe-Grise', 'Calico', 'Doublon', 'Edward', 'Flint', 'Grace', 'Hector', 'Isla', 'Jack', 'Kidd', 'Long John', 'Morgan', 'Nell', 'Olonnais', 'Pew', 'Rackham', 'Silver'],
        en: ['Anne', 'Greybeard', 'Calico', 'Doubloon', 'Edward', 'Flint', 'Grace', 'Hector', 'Isla', 'Jack', 'Kidd', 'Long John', 'Morgan', 'Nell', 'Olonnais', 'Pew', 'Rackham', 'Silver'],
      },
      victims: { fr: ['Capitaine Vane', 'Vieux Bones', 'Amiral Hawk', 'Wilhelmina'], en: ['Captain Vane', 'Old Bones', 'Admiral Hawk', 'Wilhelmina'] },
    },

    western: {
      emoji: '🤠', colors: ['#8a4b26', '#e7b866'], look: 'film', mood: 'golden',
      gen: { open: [["Dust Creek, midi pile.", "La diligence venait d'arriver en ville.", "Le grand concours de lasso battait son plein."], ["Dust Creek, high noon.", "The stagecoach had just pulled into town.", "The big lasso contest was in full swing."]], things: [["un éperon d'argent", "un as de pique", "une étoile de shérif cabossée", "un fer à cheval"], ["a silver spur", "an ace of spades", "a dented sheriff's star", "a horseshoe"]], nick: [["la Gâchette", "Gros-Bras", "Six-Coups", "Poussière", "le Kid", "Bottes-Rouges"], ["Trigger", "Bigarm", "Sixshooter", "Dusty", "the Kid", "Redboots"]], vt: [["Shérif", "Big", "Miss", "Juge"], ["Sheriff", "Big", "Miss", "Judge"]], vn: ["Walker", "Joe", "Lily", "Bean"] },
      label: ['Far West', 'Wild West'], tagline: ['Saloon, shérif et coups de feu', 'Saloons, sheriffs and gunfire'],
      story: ['Dust Creek, midi pile. Le piano du saloon s\'est tu d\'un coup : {victim} était à terre. Le shérif a fermé la ville. Personne ne sort tant que le coupable n\'est pas démasqué.',
        'Dust Creek, high noon. The saloon piano stopped dead: {victim} was down. The sheriff has locked the town. Nobody leaves until the culprit is unmasked.'],
      rooms: {
        living: ['Saloon', 'au saloon', 'Saloon', 'in the saloon', 'planks', '#b07a45', '#7f552d', '#8a3b2a'],
        kitchen: ['Cantine', 'à la cantine', 'Cookhouse', 'in the cookhouse', 'planks', '#c4985f', '#93693b', '#d8b98a'],
        bedroom: ['Hôtel', 'à l\'hôtel', 'Hotel room', 'in the hotel room', 'carpet', '#a8453a', '#7a2f27', '#d9c49a'],
        bathroom: ['Barbier', 'chez le barbier', 'Barber shop', 'at the barber shop', 'checker', '#ece4d4', '#5a3a2a', '#7aa3b5'],
        office: ['Bureau du shérif', 'au bureau du shérif', 'Sheriff\'s office', 'in the sheriff\'s office', 'planks', '#a6744a', '#77502e', '#5d6b4a'],
        library: ['Banque', 'à la banque', 'Bank', 'at the bank', 'marble', '#d9cfb8', '#8a7a5a', '#2f5a45'],
        dining: ['Relais de poste', 'au relais de poste', 'Stagecoach inn', 'at the stagecoach inn', 'planks', '#bd8a55', '#8e6235', '#b5523b'],
        garden: ['Ranch', 'au ranch', 'Ranch', 'on the ranch', 'straw', '#c9b26a', '#a08a46', '#a87a4a', 1],
        hall: ['Gare', 'à la gare', 'Train station', 'at the train station', 'wood', '#9b7653', '#6e5236', '#c2a26e'],
        music: ['Chapelle', 'à la chapelle', 'Chapel', 'in the chapel', 'planks', '#d6b17e', '#a7834f', '#efe6d0'],
        game: ['Salle de poker', 'dans la salle de poker', 'Poker room', 'in the poker room', 'carpet', '#2f6b4f', '#1f4d38', '#7a4a2a'],
        laundry: ['Écurie', 'à l\'écurie', 'Stable', 'in the stable', 'straw', '#c8a56a', '#9a7a44', '#8c5a32'],
        veranda: ['Porche', 'sous le porche', 'Porch', 'on the porch', 'planks', '#c79b62', '#98703f', '#d9b98a', 1],
      },
      objects: {
        bed: ['m:Lit de camp', 'cot'], sofa: ['f:Banquette', 'bench seat'], armchair: ['m:Rocking-chair|dans', 'rocking chair|in'],
        chair: ['m:Tabouret de bar', 'bar stool'], rug: ['f:Peau de bison', 'buffalo hide'], bench: ['m:Banc', 'bench'],
        table: ['f:Table de poker', 'poker table'], desk: ['m:Bureau du shérif', 'sheriff\'s desk'], plant: ['m:Cactus', 'cactus'],
        bookshelf: ['m:Râtelier à fusils', 'gun rack'], piano: ['m:Piano bastringue', 'honky-tonk piano'], bath: ['m:Baquet', 'tin bath'],
        sink: ['m:Abreuvoir', 'water trough'], tv: ['m:Avis de recherche', 'wanted poster'], fireplace: ['m:Poêle', 'stove'],
        counter: ['m:Comptoir', 'bar'], cabinet: ['m:Coffre-fort', 'safe'], lamp: ['f:Lampe à pétrole', 'oil lamp'],
        tree: ['m:Saguaro', 'saguaro'], fountain: ['m:Puits', 'well'],
      },
      icons: { plant: '🌵', tree: '🌵', tv: '📜', cabinet: '💰', bookshelf: '🔫', rug: '🦬', fountain: '🪣', sink: '🐴', lamp: '🏮' },
      names: {
        fr: ['Annie', 'Billy', 'Calamity', 'Doc', 'Elmer', 'Frank', 'Grace', 'Hank', 'Jesse', 'Kit', 'Lucky', 'Molly', 'Nate', 'Ruby', 'Sundance', 'Tex', 'Wyatt'],
        en: ['Annie', 'Billy', 'Calamity', 'Doc', 'Elmer', 'Frank', 'Grace', 'Hank', 'Jesse', 'Kit', 'Lucky', 'Molly', 'Nate', 'Ruby', 'Sundance', 'Tex', 'Wyatt'],
      },
      victims: { fr: ['Shérif Walker', 'Big Joe', 'Miss Lily', 'Le Croque-mort'], en: ['Sheriff Walker', 'Big Joe', 'Miss Lily', 'The Undertaker'] },
    },

    space: {
      emoji: '🚀', colors: ['#1b2440', '#7f8cff'], look: 'clean', mood: 'night',
      gen: { open: [["Station Orbitale 9, cycle 3042.", "Le vaisseau traversait une ceinture d'astéroïdes.", "L'équipage fêtait son millième jour en orbite."], ["Orbital Station 9, cycle 3042.", "The ship was crossing an asteroid belt.", "The crew was celebrating day one thousand in orbit."]], things: [["un gant de combinaison", "une puce mémoire effacée", "un tube de purée lyophilisée", "un badge d'accès"], ["a spacesuit glove", "a wiped memory chip", "a tube of freeze-dried mash", "an access badge"]], nick: [["X-7", "Zéro-G", "Nébuleuse", "Pulsar", "Quasar", "Comète"], ["X-7", "Zero-G", "Nebula", "Pulsar", "Quasar", "Comet"]], vt: [["Commandant", "Robot", "Docteure", "Capitaine"], ["Commander", "Robot", "Doctor", "Captain"]], vn: ["Vox", "V-8", "Weyl", "Zed"] },
      label: ['Station spatiale', 'Space station'], tagline: ['À des années-lumière de tout alibi', 'Light years away from any alibi'],
      story: ['Station Orbitale 9, cycle 3042. Les capteurs sont formels : {victim} ne respire plus. Aucune navette n\'a quitté le bord. Le coupable flotte encore parmi nous.',
        'Orbital Station 9, cycle 3042. The sensors are clear: {victim} has stopped breathing. No shuttle has left. The culprit is still floating among us.'],
      rooms: {
        living: ['Poste de pilotage', 'au poste de pilotage', 'Bridge', 'on the bridge', 'metal', '#c9d1db', '#8996a6', '#4b5d75'],
        kitchen: ['Cambuse', 'dans la cambuse', 'Galley', 'in the galley', 'hex', '#e3e8ee', '#8a96a6', '#7aa0b8'],
        bedroom: ['Quartiers de l\'équipage', 'dans les quartiers', 'Crew quarters', 'in the crew quarters', 'carpet', '#5b6aa8', '#3f4c84', '#8a96c8'],
        bathroom: ['Sas', 'dans le sas', 'Airlock', 'in the airlock', 'metal', '#c9d1db', '#e0a040', '#e0a040'],
        office: ['Laboratoire', 'au laboratoire', 'Lab', 'in the lab', 'hex', '#e8f0f2', '#b2c8cf', '#5fb3a8'],
        library: ['Archives', 'dans les archives', 'Data vault', 'in the data vault', 'metal', '#3a4560', '#262f45', '#6c7cff'],
        dining: ['Mess', 'au mess', 'Mess hall', 'in the mess hall', 'metal', '#dfe4ea', '#aab4c0', '#c07a5a'],
        garden: ['Serre hydroponique', 'dans la serre', 'Hydroponic bay', 'in the hydroponic bay', 'grass', '#7cc47a', '#4f9a52', '#a8d8b0', 0],
        hall: ['Coursive', 'dans la coursive', 'Corridor', 'in the corridor', 'metal', '#b9c0c9', '#8b939e', '#6b7685'],
        music: ['Observatoire', 'dans l\'observatoire', 'Observatory', 'in the observatory', 'carpet', '#232a4a', '#151a33', '#9aa6ff'],
        game: ['Salle de détente', 'dans la salle de détente', 'Rec room', 'in the rec room', 'carpet', '#7a4ea8', '#56357c', '#e07ad0'],
        laundry: ['Salle des machines', 'dans la salle des machines', 'Engine room', 'in the engine room', 'metal', '#8a8f98', '#5d626b', '#d9643a'],
        guest: ['Infirmerie', 'à l\'infirmerie', 'Med bay', 'in the med bay', 'hex', '#f0f4f6', '#c3d0d6', '#7fc4c0'],
      },
      objects: {
        bed: ['f:Capsule de sommeil|dans', 'sleep pod|in'], sofa: ['f:Banquette', 'lounge seat'], armchair: ['m:Siège de pilote|dans', 'pilot seat|in'],
        chair: ['m:Tabouret magnétique', 'magnetic stool'], rug: ['f:Dalle lumineuse', 'light panel'], bench: ['m:Banc de muscu', 'workout bench'],
        table: ['f:Console holographique', 'holo console'], desk: ['m:Poste de commande', 'command desk'], plant: ['f:Plante mutante', 'mutant plant'],
        bookshelf: ['m:Serveur', 'server rack'], piano: ['m:Synthétiseur', 'synthesizer'], bath: ['f:Cuve cryogénique', 'cryo tank'],
        sink: ['m:Recycleur d\'eau', 'water recycler'], tv: ['m:Hublot', 'porthole'], fireplace: ['m:Réacteur', 'reactor'],
        counter: ['m:Distributeur de rations', 'ration dispenser'], cabinet: ['m:Casier', 'locker'], lamp: ['m:Néon', 'neon light'],
        tree: ['f:Tour de culture', 'grow tower'], fountain: ['m:Réservoir', 'water tank'],
      },
      icons: { tv: '🪐', fireplace: '⚛️', plant: '🌱', tree: '🥬', bookshelf: '🖥️', bath: '🧊', lamp: '💡', table: '🛰️', piano: '🎛️', cabinet: '🎒' },
      names: {
        fr: ['Ada', 'Buzz', 'Cosmo', 'Dex', 'Écho', 'Flux', 'Gaïa', 'Halley', 'Io', 'Juno', 'Kepler', 'Luna', 'Mars', 'Nova', 'Orion', 'Rex', 'Sirius'],
        en: ['Ada', 'Buzz', 'Cosmo', 'Dex', 'Echo', 'Flux', 'Gaia', 'Halley', 'Io', 'Juno', 'Kepler', 'Luna', 'Mars', 'Nova', 'Orion', 'Rex', 'Sirius'],
      },
      victims: { fr: ['Commandant Vox', 'Robot V-8', 'Docteure Weyl', 'Capitaine Zed'], en: ['Commander Vox', 'Robot V-8', 'Doctor Weyl', 'Captain Zed'] },
    },

    haunted: {
      emoji: '👻', colors: ['#2b1d3a', '#8fd16a'], look: 'film', mood: 'night',
      gen: { open: [["Minuit sonne au château de Malvoisie.", "La séance de spiritisme venait de commencer.", "Un corbeau s'est posé sur la tour au coucher du soleil."], ["Midnight strikes at Grimwood Castle.", "The séance had just begun.", "A raven landed on the tower at sunset."]], things: [["une chandelle soufflée", "un crâne qui ricane", "une toile d'araignée déchirée", "une fiole verte"], ["a snuffed candle", "a grinning skull", "a torn cobweb", "a green vial"]], nick: [["Teint-Pâle", "Croc-Noir", "Nuit-Noire", "Os-Sec", "le Spectre", "Griffe"], ["Palecheek", "Blackfang", "Darknight", "Drybones", "the Spectre", "Claw"]], vt: [["Comte", "Baronne", "Docteur", "Majordome"], ["Count", "Baroness", "Doctor", "Butler"]], vn: ["Vlad", "Grim", "Wolf", "Mortis"] },
      label: ['Château hanté', 'Haunted castle'], tagline: ['Fantômes, grimoires et grincements', 'Ghosts, grimoires and creaking doors'],
      story: ['Minuit sonne au château de Malvoisie. Les chandelles vacillent, un corbeau croasse… et {victim} ne se relèvera pas. Les fantômes ne mentent jamais. Les invités, si.',
        'Midnight strikes at Grimwood Castle. Candles flicker, a raven croaks… and {victim} will not rise again. Ghosts never lie. The guests do.'],
      rooms: {
        living: ['Grand hall', 'dans le grand hall', 'Great hall', 'in the great hall', 'parquet', '#8a8296', '#5e5770', '#4a3a5e'],
        kitchen: ['Laboratoire', 'dans le laboratoire', 'Laboratory', 'in the laboratory', 'checker', '#a9b59a', '#3a3a3a', '#5f7a4a'],
        bedroom: ['Chambre du vampire', 'dans la chambre du vampire', 'Vampire\'s bedroom', 'in the vampire\'s bedroom', 'carpet', '#7a1f2b', '#521520', '#2e2236'],
        bathroom: ['Salle des miroirs', 'dans la salle des miroirs', 'Hall of mirrors', 'in the hall of mirrors', 'marble', '#c9c2d6', '#6c6485', '#6c6485'],
        office: ['Cabinet de curiosités', 'dans le cabinet de curiosités', 'Cabinet of curiosities', 'in the cabinet of curiosities', 'parquet', '#6f4f3a', '#4a3324', '#3f5a4a'],
        library: ['Bibliothèque interdite', 'dans la bibliothèque interdite', 'Forbidden library', 'in the forbidden library', 'parquet', '#5e4232', '#3e2b20', '#2f3d2f'],
        dining: ['Salle des banquets', 'dans la salle des banquets', 'Banquet hall', 'in the banquet hall', 'planks', '#7a5a42', '#52392a', '#6b2a3a'],
        garden: ['Cimetière', 'au cimetière', 'Graveyard', 'in the graveyard', 'grass', '#5f7a52', '#3f5a38', '#6e6a7a', 1],
        hall: ['Crypte', 'dans la crypte', 'Crypt', 'in the crypt', 'cobble', '#6e6a74', '#3a3740', '#2a2730'],
        music: ['Salle de l\'orgue', 'dans la salle de l\'orgue', 'Organ room', 'in the organ room', 'wood', '#6a4a62', '#4a3245', '#8f6aa8'],
        guest: ['Tour du nord', 'dans la tour du nord', 'North tower', 'in the north tower', 'cobble', '#7f7a88', '#57525f', '#3a3446'],
        laundry: ['Cachots', 'dans les cachots', 'Dungeon', 'in the dungeon', 'cobble', '#5c5850', '#3e3b35', '#2b2925'],
      },
      objects: {
        bed: ['m:Cercueil|dans', 'coffin|in'], sofa: ['m:Divan de velours', 'velvet couch'], armchair: ['m:Fauteuil grinçant|dans', 'creaky armchair|in'],
        chair: ['f:Chaise bancale', 'wobbly chair'], rug: ['f:Peau d\'ours', 'bearskin rug'], bench: ['m:Banc de pierre', 'stone bench'],
        table: ['f:Table du festin', 'feast table'], desk: ['m:Pupitre à grimoires', 'grimoire stand'], plant: ['f:Plante carnivore', 'carnivorous plant'],
        bookshelf: ['f:Étagère de grimoires', 'spellbook shelf'], piano: ['m:Orgue', 'pipe organ'], bath: ['m:Chaudron', 'cauldron'],
        sink: ['m:Bénitier', 'font'], tv: ['m:Portrait hanté', 'haunted portrait'], fireplace: ['f:Cheminée', 'fireplace'],
        counter: ['m:Alambic', 'alembic'], cabinet: ['f:Armure', 'suit of armour'], lamp: ['m:Candélabre', 'candelabra'],
        tree: ['m:Arbre mort', 'dead tree'], fountain: ['f:Pierre tombale', 'tombstone'],
      },
      icons: { bed: '⚰️', bath: '🧪', plant: '🪴', tree: '🥀', fountain: '🪦', lamp: '🕯️', tv: '🖼️', cabinet: '🛡️', counter: '⚗️', bookshelf: '📕' },
      names: {
        fr: ['Agatha', 'Boris', 'Corbin', 'Drusilla', 'Edgar', 'Frankie', 'Griselda', 'Hildegarde', 'Igor', 'Jack', 'Lilith', 'Mortimer', 'Nyx', 'Ombeline', 'Raven', 'Salem'],
        en: ['Agatha', 'Boris', 'Corbin', 'Drusilla', 'Edgar', 'Frankie', 'Griselda', 'Hildegard', 'Igor', 'Jack', 'Lilith', 'Mortimer', 'Nyx', 'Ombeline', 'Raven', 'Salem'],
      },
      victims: { fr: ['Comte Vlad', 'Baronne Grim', 'Le Majordome', 'Docteur Wolf'], en: ['Count Vlad', 'Baroness Grim', 'The Butler', 'Doctor Wolf'] },
    },

    medieval: {
      emoji: '🏰', colors: ['#4a5a7a', '#d9b45a'], look: 'print', mood: 'day',
      gen: { open: [["Oyez, oyez ! Le grand tournoi venait de s'achever.", "Le banquet du roi durait depuis trois jours.", "La brume enveloppait le donjon au petit matin."], ["Hear ye, hear ye! The great tournament had just ended.", "The king's banquet had lasted three days.", "Mist wrapped the keep at dawn."]], things: [["un gantelet cabossé", "une pomme croquée", "un sceau brisé", "une plume de faucon"], ["a dented gauntlet", "a bitten apple", "a broken seal", "a falcon feather"]], nick: [["Cœur-de-Lion", "Sans-Terre", "Brise-Fer", "le Hardi", "Barbe-Fleurie", "l'Écuyer"], ["Lionheart", "Lackland", "Ironbreaker", "the Bold", "Flowerbeard", "the Squire"]], vt: [["Roi", "Dame", "Sire", "Bouffon"], ["King", "Lady", "Sir", "Jester"]], vn: ["Godefroy", "Mélisende", "Wilfried", "Tristou"] },
      label: ['Chevaliers', 'Knights'], tagline: ['Tournois, bannières et trahison au donjon', 'Tournaments, banners and treason in the keep'],
      story: ['Oyez, oyez ! Le grand tournoi venait de s\'achever quand {victim} fut retrouvé·e sans vie. Le roi exige un nom avant le coucher du soleil. Gare à qui accusera à tort !',
        'Hear ye, hear ye! The great tournament had just ended when {victim} was found dead. The king demands a name before sunset. Woe to whoever accuses wrongly!'],
      rooms: {
        living: ['Grande salle', 'dans la grande salle', 'Great hall', 'in the great hall', 'cobble', '#cbbf9f', '#8a7e60', '#7a2e2e'],
        kitchen: ['Cuisines', 'dans les cuisines', 'Kitchens', 'in the kitchens', 'cobble', '#c9b48e', '#a28d68', '#b08a5a'],
        bedroom: ['Chambre du roi', 'dans la chambre du roi', 'King\'s chamber', 'in the king\'s chamber', 'carpet', '#3a5a9a', '#284278', '#d9b45a'],
        bathroom: ['Étuves', 'aux étuves', 'Bathhouse', 'at the bathhouse', 'planks', '#b08a62', '#82603e', '#8aa6b0'],
        office: ['Scriptorium', 'dans le scriptorium', 'Scriptorium', 'in the scriptorium', 'planks', '#a9805a', '#7b5838', '#6a7a4a'],
        library: ['Tour du mage', 'dans la tour du mage', 'Wizard\'s tower', 'in the wizard\'s tower', 'stone', '#8a7fa6', '#625882', '#4a3f6e'],
        dining: ['Salle du banquet', 'dans la salle du banquet', 'Banquet hall', 'in the banquet hall', 'planks', '#a87a4e', '#7b5532', '#9a2f2f'],
        garden: ['Lice', 'dans la lice', 'Jousting field', 'on the jousting field', 'grass', '#9ac06a', '#6f9a48', '#c9a76a', 1],
        hall: ['Pont-levis', 'sur le pont-levis', 'Drawbridge', 'on the drawbridge', 'planks', '#9a7a56', '#6e563b', '#7f7a70', 1],
        music: ['Galerie des ménestrels', 'dans la galerie des ménestrels', 'Minstrels\' gallery', 'in the minstrels\' gallery', 'planks', '#c09464', '#916b41', '#3f6a8a'],
        guest: ['Donjon', 'dans le donjon', 'Keep', 'in the keep', 'stone', '#9d978a', '#76705f', '#5a5448'],
        laundry: ['Forge', 'à la forge', 'Forge', 'at the forge', 'cobble', '#6e6258', '#4c433c', '#c0582f'],
        game: ['Salle d\'armes', 'dans la salle d\'armes', 'Armoury', 'in the armoury', 'stone', '#a8a090', '#807868', '#5a6a7a'],
        veranda: ['Chemin de ronde', 'sur le chemin de ronde', 'Battlements', 'on the battlements', 'cobble', '#bdb5a2', '#958c78', '#8a8272', 1],
      },
      objects: {
        bed: ['m:Lit à courtines', 'curtained bed'], sofa: ['m:Trône', 'throne'], armchair: ['m:Siège sculpté', 'carved seat'],
        chair: ['m:Tabouret', 'stool'], rug: ['f:Peau de loup', 'wolf pelt'], bench: ['m:Banc de chêne', 'oak bench'],
        table: ['f:Table ronde', 'round table'], desk: ['m:Lutrin', 'lectern'], plant: ['f:Botte de foin', 'hay bale'],
        bookshelf: ['m:Râtelier d\'épées', 'sword rack'], piano: ['f:Harpe', 'harp'], bath: ['m:Cuveau', 'wooden tub'],
        sink: ['f:Aiguière', 'ewer'], tv: ['f:Tapisserie', 'tapestry'], fireplace: ['m:Âtre', 'hearth'],
        counter: ['f:Enclume', 'anvil'], cabinet: ['m:Coffre', 'chest'], lamp: ['f:Torche', 'torch'],
        tree: ['m:Chêne', 'oak tree'], fountain: ['m:Puits', 'well'],
      },
      icons: { bookshelf: '⚔️', lamp: '🔥', tv: '🎏', counter: '⚒️', fountain: '🪣', plant: '🌾', sofa: '👑', cabinet: '🧰', piano: '🪕' },
      names: {
        fr: ['Arthur', 'Blanche', 'Clovis', 'Dagobert', 'Ermengarde', 'Fulbert', 'Guenièvre', 'Hugues', 'Isolde', 'Jehan', 'Lancelot', 'Mathilde', 'Perceval', 'Roland', 'Tristan'],
        en: ['Arthur', 'Blanche', 'Clovis', 'Dagobert', 'Edith', 'Fulbert', 'Guinevere', 'Hugh', 'Isolde', 'John', 'Lancelot', 'Matilda', 'Percival', 'Roland', 'Tristan'],
      },
      victims: { fr: ['Roi Godefroy', 'Le Bouffon', 'Dame Mélisende', 'Sire Wilfried'], en: ['King Godfrey', 'The Jester', 'Lady Melisende', 'Sir Wilfred'] },
    },

    prehistory: {
      emoji: '🦣', colors: ['#6b4a2e', '#9fc46a'], look: 'gouache', mood: 'day',
      gen: { open: [["Il y a très, très longtemps…", "La tribu dansait autour du feu.", "Les mammouths migraient dans la vallée."], ["A very, very long time ago…", "The tribe was dancing around the fire.", "The mammoths were migrating through the valley."]], things: [["un silex taillé", "une dent de mammouth", "une empreinte de main", "un os rongé"], ["a knapped flint", "a mammoth tooth", "a handprint", "a gnawed bone"]], nick: [["Gros-Bras", "Pied-Plat", "Œil-Vif", "Mange-Tout", "Cheveux-Feu", "Ouga"], ["Bigarm", "Flatfoot", "Sharpeye", "Eatsall", "Firehair", "Ooga"]], vt: [["Grand Sage", "Chef", "Vieille", "Chamane"], ["Elder", "Chief", "Old", "Shaman"]], vn: ["Ouk", "Mammouth", "Ula", "Wa"] },
      label: ['Préhistoire', 'Stone Age'], tagline: ['Silex, mammouths et feux de camp', 'Flint, mammoths and campfires'],
      story: ['Il y a très, très longtemps… La tribu dansait autour du feu quand {victim} s\'est écroulé·e. Pas d\'écriture, pas de témoins fiables : seulement des traces. Ouga !',
        'A very, very long time ago… The tribe was dancing around the fire when {victim} collapsed. No writing, no reliable witnesses: only tracks. Ooga!'],
      rooms: {
        living: ['Grande grotte', 'dans la grande grotte', 'Great cave', 'in the great cave', 'stone', '#b49a7a', '#8a7356', '#7a5f45'],
        kitchen: ['Feu de camp', 'autour du feu de camp', 'Campfire', 'by the campfire', 'sand', '#c4a27a', '#9a7b55', '#c06a3a', 1],
        bedroom: ['Abri sous roche', 'dans l\'abri sous roche', 'Rock shelter', 'in the rock shelter', 'straw', '#a89880', '#7f705b', '#6a5a48'],
        bathroom: ['Source chaude', 'à la source chaude', 'Hot spring', 'at the hot spring', 'water', '#8fd0cf', '#e8fbff', '#8a9a8a', 1],
        office: ['Grotte des peintures', 'dans la grotte des peintures', 'Painted cave', 'in the painted cave', 'stone', '#c9a684', '#a1805f', '#b5523b'],
        library: ['Atelier des silex', 'à l\'atelier des silex', 'Flint workshop', 'at the flint workshop', 'cobble', '#b8b0a0', '#8d8676', '#6e6a5e'],
        dining: ['Camp des cueilleurs', 'au camp des cueilleurs', 'Gatherers\' camp', 'at the gatherers\' camp', 'grass', '#b9b56a', '#8f8a48', '#9a7a4a', 1],
        garden: ['Forêt', 'dans la forêt', 'Forest', 'in the forest', 'grass', '#7fae5a', '#558a3f', '#6a8a4a', 1],
        hall: ['Gué', 'au gué', 'River ford', 'at the river ford', 'water', '#8fc2d0', '#e8fbff', '#8a9a7a', 1],
        music: ['Cercle de pierres', 'dans le cercle de pierres', 'Stone circle', 'in the stone circle', 'grass', '#a7c07a', '#7f9a55', '#9a9488', 1],
        veranda: ['Plaine des mammouths', 'dans la plaine des mammouths', 'Mammoth plain', 'on the mammoth plain', 'straw', '#c9c07a', '#a39a52', '#b0a070', 1],
        laundry: ['Tanière', 'dans la tanière', 'Den', 'in the den', 'stone', '#8a7a68', '#615546', '#4a3f34'],
      },
      objects: {
        bed: ['m:Lit de fougères', 'fern bed'], sofa: ['f:Peau de mammouth', 'mammoth hide'], armchair: ['m:Rocher plat', 'flat rock'],
        chair: ['f:Souche', 'tree stump'], rug: ['f:Fourrure', 'fur'], bench: ['m:Tronc couché', 'fallen log'],
        table: ['f:Pierre à broyer', 'grinding stone'], desk: ['f:Paroi peinte', 'painted wall'], plant: ['f:Fougère', 'fern'],
        bookshelf: ['m:Tas d\'os', 'pile of bones'], piano: ['m:Tambour', 'drum'], bath: ['f:Mare', 'pond'],
        sink: ['f:Calebasse', 'gourd'], tv: ['f:Peinture rupestre', 'cave painting'], fireplace: ['m:Foyer', 'fire pit'],
        counter: ['m:Tas de silex', 'flint pile'], cabinet: ['m:Tas de bois', 'woodpile'], lamp: ['f:Torche', 'torch'],
        tree: ['m:Arbre', 'tree'], fountain: ['m:Menhir', 'standing stone'],
      },
      icons: { fireplace: '🔥', bookshelf: '🦴', plant: '🌿', tv: '🦌', fountain: '🗿', piano: '🥁', lamp: '🔥', cabinet: '🪵', counter: '🪨', rug: '🦣' },
      names: {
        fr: ['Aya', 'Bok', 'Cro', 'Dina', 'Ekko', 'Fum', 'Gourm', 'Hou', 'Ika', 'Jabu', 'Kraa', 'Lo', 'Mana', 'Nok', 'Oumpa', 'Rok', 'Tika', 'Zog'],
        en: ['Aya', 'Bok', 'Cro', 'Dina', 'Ekko', 'Fum', 'Gurm', 'Hoo', 'Ika', 'Jabu', 'Kraa', 'Lo', 'Mana', 'Nok', 'Oompa', 'Rok', 'Tika', 'Zog'],
      },
      victims: { fr: ['Grand Sage Ouk', 'Chef Mammouth', 'Vieille Ula', 'Chamane Wa'], en: ['Elder Ook', 'Chief Mammoth', 'Old Ula', 'Shaman Wa'] },
    },

    circus: {
      emoji: '🎪', colors: ['#c0283a', '#f5d36b'], look: 'print', mood: 'dusk',
      gen: { open: [["Mesdames et messieurs !", "Le roulement de tambour retentissait sous le chapiteau.", "La parade venait de traverser la ville."], ["Ladies and gentlemen!", "The drumroll echoed under the big top.", "The parade had just crossed the town."]], things: [["un nez rouge", "une quille de jongleur", "une plume d'autruche", "un ticket d'entrée déchiré"], ["a red nose", "a juggling pin", "an ostrich feather", "a torn ticket"]], nick: [["Paillette", "le Magnifique", "Trapèze", "Grelot", "Barbe-à-Papa", "Mille-Pattes"], ["Sequin", "the Magnificent", "Trapeze", "Jingles", "Candyfloss", "Centipede"]], vt: [["Monsieur", "Grand", "Madame", "Hercule"], ["Mister", "Great", "Madame", "Hercules"]], vn: ["Loyal", "Zampano", "Zelda", "Fort"] },
      label: ['Cirque', 'Circus'], tagline: ['Paillettes, lions et tours de passe-passe', 'Glitter, lions and sleight of hand'],
      story: ['Mesdames et messieurs ! Le roulement de tambour s\'est arrêté net : {victim} gisait au milieu de la piste. Le spectacle doit continuer… mais pas avant d\'avoir démasqué le coupable.',
        'Ladies and gentlemen! The drumroll stopped dead: {victim} lay in the middle of the ring. The show must go on… but not before the culprit is unmasked.'],
      rooms: {
        living: ['Grand chapiteau', 'sous le grand chapiteau', 'Big top', 'under the big top', 'carpet', '#d2393f', '#a3262c', '#f0d26a'],
        kitchen: ['Roulotte-cantine', 'dans la roulotte-cantine', 'Cook wagon', 'in the cook wagon', 'planks', '#c99a62', '#9a713e', '#5aa0c8'],
        bedroom: ['Roulotte de la voyante', 'dans la roulotte de la voyante', 'Fortune teller\'s wagon', 'in the fortune teller\'s wagon', 'carpet', '#6a3a8a', '#4a2766', '#e0a83a'],
        bathroom: ['Loge du clown', 'dans la loge du clown', 'Clown\'s dressing room', 'in the clown\'s dressing room', 'checker', '#f5e2ea', '#e2a8bf', '#7ac0a8'],
        office: ['Bureau de Monsieur Loyal', 'dans le bureau de Monsieur Loyal', 'Ringmaster\'s office', 'in the ringmaster\'s office', 'planks', '#a87650', '#7b5333', '#c0283a'],
        library: ['Palais des glaces', 'au palais des glaces', 'Hall of mirrors', 'in the hall of mirrors', 'hex', '#d8e6f0', '#a9c0d4', '#9ab0e0'],
        dining: ['Buvette', 'à la buvette', 'Snack bar', 'at the snack bar', 'checker', '#f6e3b0', '#e07a4a', '#e07a4a'],
        garden: ['Ménagerie', 'à la ménagerie', 'Menagerie', 'in the menagerie', 'straw', '#c2b56a', '#9a8e48', '#b08a5a', 1],
        hall: ['Coulisses', 'dans les coulisses', 'Backstage', 'backstage', 'planks', '#8a6a4e', '#5e4835', '#3a3046'],
        music: ['Kiosque de la fanfare', 'dans le kiosque de la fanfare', 'Bandstand', 'on the bandstand', 'planks', '#e0b070', '#b0844a', '#2f6a9a', 1],
        game: ['Fête foraine', 'à la fête foraine', 'Funfair', 'at the funfair', 'cobble', '#e8d0b0', '#b89a7a', '#4ab0c8', 1],
        laundry: ['Atelier des costumes', 'à l\'atelier des costumes', 'Costume shop', 'in the costume shop', 'carpet', '#e8a8a0', '#c87a70', '#8a5aa8'],
        guest: ['Roulotte des acrobates', 'dans la roulotte des acrobates', 'Acrobats\' wagon', 'in the acrobats\' wagon', 'planks', '#c9a070', '#9a7848', '#3fa08a'],
      },
      objects: {
        bed: ['m:Hamac|dans', 'hammock|in'], sofa: ['m:Gradin', 'bleacher'], armchair: ['m:Fauteuil rouge|dans', 'red armchair|in'],
        chair: ['m:Tabouret de dompteur', 'tamer\'s stool'], rug: ['m:Tapis de saut', 'tumbling mat'], bench: ['m:Ballot de paille', 'straw bale'],
        table: ['f:Table de jonglage', 'juggling table'], desk: ['f:Caisse', 'ticket booth'], plant: ['f:Grappe de ballons', 'bunch of balloons'],
        bookshelf: ['m:Mur de masques', 'wall of masks'], piano: ['m:Orgue de foire', 'fairground organ'], bath: ['m:Bassin des otaries', 'sea lion pool'],
        sink: ['m:Seau de confettis', 'confetti bucket'], tv: ['f:Affiche', 'poster'], fireplace: ['m:Canon humain', 'human cannon'],
        counter: ['m:Stand de pop-corn', 'popcorn stand'], cabinet: ['f:Malle à costumes', 'costume trunk'], lamp: ['m:Projecteur', 'spotlight'],
        tree: ['m:Mât du chapiteau', 'tent pole'], fountain: ['m:Manège', 'carousel'],
      },
      icons: { plant: '🎈', fountain: '🎠', counter: '🍿', fireplace: '💥', lamp: '🔦', tv: '🎟️', bath: '🦭', bookshelf: '🎭', tree: '🎪', bench: '🌾' },
      names: {
        fr: ['Arlette', 'Bimbo', 'Coco', 'Dolly', 'Esmeralda', 'Fifi', 'Gaspard', 'Houdini', 'Iris', 'Jojo', 'Kiki', 'Lulu', 'Mimosa', 'Nono', 'Pipo', 'Rita', 'Zézette'],
        en: ['Arlo', 'Bimbo', 'Coco', 'Dolly', 'Esmeralda', 'Fifi', 'Gus', 'Houdini', 'Iris', 'Jojo', 'Kiki', 'Lulu', 'Mabel', 'Nono', 'Pip', 'Rita', 'Zaza'],
      },
      victims: { fr: ['Monsieur Loyal', 'Grand Zampano', 'Madame Zelda', 'Hercule le Fort'], en: ['The Ringmaster', 'Great Zampano', 'Madame Zelda', 'Hercules the Strong'] },
    },

    train: {
      emoji: '🚂', colors: ['#1f3a33', '#c9a24a'], look: 'film', mood: 'night',
      gen: { open: [["L'express de minuit est immobilisé par la neige.", "Le wagon-restaurant servait le dernier service.", "Le train filait vers Istanbul à travers la nuit."], ["The midnight express is snowbound.", "The dining car was serving the last sitting.", "The train sped towards Istanbul through the night."]], things: [["un billet de première classe", "un mouchoir brodé", "une montre arrêtée", "un bouton de manchette"], ["a first-class ticket", "an embroidered handkerchief", "a stopped watch", "a cufflink"]], nick: [["Ivanov", "Dubois", "Lindqvist", "Moretti", "Hartley", "Popescu"], ["Ivanov", "Dubois", "Lindqvist", "Moretti", "Hartley", "Popescu"]], vt: [["Baron", "Comtesse", "Mister", "Docteur"], ["Baron", "Countess", "Mister", "Doctor"]], vn: ["Vronski", "Valeska", "Whitaker", "Volkov"], rate: 0.75 },
      label: ['Train de nuit', 'Night train'], tagline: ['Un express de luxe bloqué par la neige', 'A luxury express stuck in the snow'],
      story: ['L\'express de minuit est immobilisé par la neige, quelque part entre Vienne et Istanbul. Au matin, {victim} ne répond plus. Personne n\'a pu quitter le train : le coupable est à bord.',
        'The midnight express is snowbound somewhere between Vienna and Istanbul. By morning, {victim} no longer answers. Nobody could leave the train: the culprit is on board.'],
      rooms: {
        living: ['Voiture-salon', 'dans la voiture-salon', 'Lounge car', 'in the lounge car', 'carpet', '#7a2a2a', '#521c1c', '#c9a24a'],
        kitchen: ['Cuisine du train', 'dans la cuisine du train', 'Galley car', 'in the galley car', 'checker', '#e6e2d8', '#3a3a3a', '#8a9a8a'],
        bedroom: ['Wagon-lit', 'dans le wagon-lit', 'Sleeper car', 'in the sleeper car', 'carpet', '#2f4a6a', '#20354e', '#b89a5a'],
        bathroom: ['Cabinet de toilette', 'dans le cabinet de toilette', 'Washroom', 'in the washroom', 'hex', '#e8eef0', '#b2c2c8', '#5a7a7a'],
        office: ['Fourgon postal', 'dans le fourgon postal', 'Mail van', 'in the mail van', 'planks', '#9a7550', '#6e5236', '#3f5a4a'],
        library: ['Voiture-bibliothèque', 'dans la voiture-bibliothèque', 'Library car', 'in the library car', 'parquet', '#8a5a3a', '#603d26', '#2f4a3f'],
        dining: ['Wagon-restaurant', 'au wagon-restaurant', 'Dining car', 'in the dining car', 'carpet', '#2f5a4a', '#1f3f33', '#d9b45a'],
        garden: ['Quai de gare', 'sur le quai', 'Station platform', 'on the platform', 'cobble', '#d8d6d0', '#9a988e', '#6a6a72', 1],
        hall: ['Couloir', 'dans le couloir', 'Corridor', 'in the corridor', 'carpet', '#8a3a3a', '#5e2727', '#a8865a'],
        music: ['Voiture-bar', 'à la voiture-bar', 'Bar car', 'in the bar car', 'parquet', '#6a3f2a', '#4a2b1c', '#c9a24a'],
        guest: ['Compartiment 7', 'dans le compartiment 7', 'Compartment 7', 'in compartment 7', 'carpet', '#4a3a6a', '#33284a', '#b8a06a'],
        laundry: ['Fourgon à bagages', 'dans le fourgon à bagages', 'Baggage car', 'in the baggage car', 'planks', '#a88a62', '#7a6244', '#5a5a5a'],
        veranda: ['Plateforme arrière', 'sur la plateforme arrière', 'Observation deck', 'on the observation deck', 'planks', '#b8946a', '#8a6c48', '#3a4a5a', 1],
      },
      objects: {
        bed: ['f:Couchette', 'berth'], sofa: ['f:Banquette de velours', 'velvet banquette'], armchair: ['m:Fauteuil club|dans', 'club chair|in'],
        chair: ['m:Strapontin', 'folding seat'], rug: ['m:Tapis', 'runner rug'], bench: ['m:Banc', 'bench'],
        table: ['f:Table nappée', 'linen table'], desk: ['m:Comptoir postal', 'mail desk'], plant: ['m:Palmier en pot', 'potted palm'],
        bookshelf: ['m:Porte-bagages', 'luggage rack'], piano: ['m:Piano-bar', 'bar piano'], bath: ['f:Baignoire', 'bathtub'],
        sink: ['m:Lave-mains', 'washbasin'], tv: ['f:Fenêtre givrée', 'frosted window'], fireplace: ['m:Poêle à charbon', 'coal stove'],
        counter: ['m:Bar', 'bar'], cabinet: ['f:Malle', 'steamer trunk'], lamp: ['f:Lampe Art déco', 'Art Deco lamp'],
        tree: ['m:Réverbère', 'lamp post'], fountain: ['m:Kiosque à journaux', 'newsstand'],
      },
      icons: { tv: '🪟', cabinet: '🧳', bookshelf: '🧳', fountain: '📰', tree: '🏮', counter: '🍸', plant: '🌴', desk: '✉️' },
      names: {
        fr: ['Ariane', 'Bertrand', 'Constance', 'Dimitri', 'Elena', 'Florent', 'Greta', 'Hector', 'Ingrid', 'Jasper', 'Katya', 'Lionel', 'Mary', 'Nikolaï', 'Olga', 'Pierre', 'Rudolf', 'Sonia'],
        en: ['Ariadne', 'Bertrand', 'Constance', 'Dimitri', 'Elena', 'Florence', 'Greta', 'Hector', 'Ingrid', 'Jasper', 'Katya', 'Lionel', 'Mary', 'Nikolai', 'Olga', 'Pierre', 'Rudolf', 'Sonia'],
      },
      victims: { fr: ['Baron Vronski', 'Comtesse Valeska', 'Le Contrôleur', 'Mister Whitaker'], en: ['Baron Vronsky', 'Countess Valeska', 'The Conductor', 'Mr Whitaker'] },
    },

    chalet: {
      emoji: '❄️', colors: ['#2f5a8a', '#e6eef6'], look: 'clean', mood: 'day',
      gen: { open: [["La tempête a coupé la route du chalet.", "La soirée fondue battait son plein.", "La dernière remontée venait de fermer."], ["The blizzard has cut off the chalet.", "The fondue night was in full swing.", "The last lift had just closed."]], things: [["un bâton de ski cassé", "un bonnet à pompon", "une trace de raquette", "un caquelon renversé"], ["a broken ski pole", "a bobble hat", "a snowshoe print", "a spilled fondue pot"]], nick: [["Poudreuse", "Schuss", "Flocon", "Chamois", "Slalom", "Avalanche"], ["Powder", "Schuss", "Snowflake", "Chamois", "Slalom", "Avalanche"]], vt: [["Moniteur", "Baronne", "Docteur", "Guide"], ["Instructor", "Baroness", "Doctor", "Guide"]], vn: ["Victor", "Wintz", "Vogel", "Yéti"] },
      label: ['Chalet au ski', 'Ski chalet'], tagline: ['Fondue, poudreuse et alibis glacés', 'Fondue, powder snow and frosty alibis'],
      story: ['La tempête a coupé la route du chalet. Entre deux fondues, {victim} a été retrouvé·e figé·e comme un glaçon. Personne ne descend dans la vallée tant que l\'affaire n\'est pas réglée.',
        'The blizzard has cut off the chalet. Between two fondues, {victim} was found frozen like an icicle. Nobody goes down to the valley until this is solved.'],
      rooms: {
        living: ['Salon du chalet', 'dans le salon du chalet', 'Lodge lounge', 'in the lodge lounge', 'planks', '#c08a55', '#8f6236', '#a8443a'],
        kitchen: ['Cuisine', 'dans la cuisine', 'Kitchen', 'in the kitchen', 'planks', '#d2a874', '#a37c4a', '#e6d2b0'],
        bedroom: ['Chambre sous les toits', 'dans la chambre sous les toits', 'Attic bedroom', 'in the attic bedroom', 'carpet', '#b8454a', '#8a3035', '#e9dccc'],
        bathroom: ['Sauna', 'dans le sauna', 'Sauna', 'in the sauna', 'planks', '#d9b07a', '#aa8450', '#c99a62'],
        office: ['Poste de secours', 'au poste de secours', 'Ski patrol hut', 'in the ski patrol hut', 'planks', '#b0805a', '#82593a', '#c0283a'],
        library: ['Coin lecture', 'dans le coin lecture', 'Reading nook', 'in the reading nook', 'carpet', '#5a7a5a', '#3f5a3f', '#b08a5a'],
        dining: ['Restaurant d\'altitude', 'au restaurant d\'altitude', 'Mountain restaurant', 'at the mountain restaurant', 'planks', '#c99a66', '#9a7040', '#5a7a9a'],
        garden: ['Piste noire', 'sur la piste noire', 'Black run', 'on the black run', 'snow', '#f4f7fa', '#d6e0ea', '#cfd8e2', 1],
        hall: ['Télésiège', 'au télésiège', 'Chairlift', 'at the chairlift', 'snow', '#e8eef4', '#c4d0dc', '#5a6a7a', 1],
        music: ['Bar après-ski', 'au bar après-ski', 'Après-ski bar', 'in the après-ski bar', 'planks', '#a87048', '#7a4e2e', '#d9643a'],
        game: ['Salle de jeux', 'dans la salle de jeux', 'Games room', 'in the games room', 'carpet', '#3f6a8a', '#2b4c66', '#c9a06a'],
        laundry: ['Local à skis', 'dans le local à skis', 'Ski room', 'in the ski room', 'cobble', '#b8b4ac', '#8e8a82', '#5a7a9a'],
        veranda: ['Terrasse ensoleillée', 'sur la terrasse', 'Sun terrace', 'on the sun terrace', 'planks', '#d6ad78', '#a8834e', '#f0e2c4', 1],
        guest: ['Igloo', 'dans l\'igloo', 'Igloo', 'in the igloo', 'snow', '#eef4fa', '#cfdbe8', '#dfe8f2'],
      },
      objects: {
        bed: ['m:Lit douillet', 'cosy bed'], sofa: ['m:Canapé en peau', 'leather sofa'], armchair: ['m:Fauteuil en bois|dans', 'wooden armchair|in'],
        chair: ['f:Chaise', 'chair'], rug: ['f:Peau de mouton', 'sheepskin'], bench: ['f:Luge', 'sledge'],
        table: ['f:Table à fondue', 'fondue table'], desk: ['m:Poste radio', 'radio desk'], plant: ['m:Sapin en pot', 'potted fir'],
        bookshelf: ['m:Râtelier à skis', 'ski rack'], piano: ['m:Cor des Alpes', 'alphorn'], bath: ['m:Jacuzzi', 'hot tub'],
        sink: ['m:Lavabo', 'washbasin'], tv: ['f:Tête de cerf', 'stag\'s head'], fireplace: ['f:Cheminée', 'fireplace'],
        counter: ['m:Comptoir', 'counter'], cabinet: ['m:Casier', 'locker'], lamp: ['f:Lanterne', 'lantern'],
        tree: ['m:Sapin', 'fir tree'], fountain: ['m:Bonhomme de neige', 'snowman'],
      },
      icons: { tree: '🌲', plant: '🌲', fountain: '⛄', bookshelf: '🎿', tv: '🦌', bench: '🛷', table: '🫕', piano: '📯', bath: '♨️' },
      names: {
        fr: ['Anouk', 'Bjorn', 'Clara', 'Dario', 'Elsa', 'Fritz', 'Gretel', 'Heidi', 'Ingrid', 'Jonas', 'Klaus', 'Liv', 'Mila', 'Nils', 'Olaf', 'Peter', 'Sven', 'Ulla'],
        en: ['Anouk', 'Bjorn', 'Clara', 'Dario', 'Elsa', 'Fritz', 'Gretel', 'Heidi', 'Ingrid', 'Jonas', 'Klaus', 'Liv', 'Mila', 'Nils', 'Olaf', 'Peter', 'Sven', 'Ulla'],
      },
      victims: { fr: ['Moniteur Victor', 'Baronne Wintz', 'Le Yéti', 'Docteur Vogel'], en: ['Instructor Victor', 'Baroness Wintz', 'The Yeti', 'Doctor Vogel'] },
    },

    world: {
      emoji: '🌍', colors: ['#1aa3d9', '#f5c542'], look: 'clean', mood: 'day',
      gen: { open: [["Le grand pari était lancé : faire le tour du monde en un temps record.", "L'avion venait d'atterrir après une escale mouvementée.", "Le dernier jour du rallye autour du monde commençait."], ["The great wager was on: around the world in record time.", "The plane had just landed after a bumpy layover.", "The final day of the round-the-world rally was starting."]], things: [["un passeport tamponné", "une boussole", "une carte postale sans adresse", "un billet d'avion froissé"], ["a stamped passport", "a compass", "a postcard with no address", "a crumpled plane ticket"]], nick: [["Globe-Trotteur", "Boussole", "Escale", "Jet-Lag", "Sac-à-Dos", "Long-Courrier"], ["Globetrotter", "Compass", "Layover", "Jetlag", "Backpack", "Longhaul"]], vt: [["Lord", "Capitaine", "Madame", "Docteur"], ["Lord", "Captain", "Madame", "Doctor"]], vn: ["Fogg", "Valise", "Voyage", "Globe"] },
      label: ['Tour du monde', 'Around the world'], tagline: ['Un crime, six continents, zéro escale', 'One crime, six continents, no layover'],
      story: ['Le grand pari était lancé : faire le tour du monde en un temps record. Mais à l\'arrivée, {victim} manquait à l\'appel. Chaque voyageur était quelque part sur la carte… un seul a du sang sur son passeport.',
        'The great wager was on: around the world in record time. But at the finish line, {victim} was missing. Every traveller was somewhere on the map… only one has blood on their passport.'],
      rooms: {
        living: ['Paris', 'à Paris', 'Paris', 'in Paris', 'cobble', '#c4bcae', '#857c6e', '#7a6ea8', 1],
        kitchen: ['Kyoto', 'à Kyoto', 'Kyoto', 'in Kyoto', 'tatami', '#e7d8a8', '#8a3a4a', '#d9a0b0'],
        bedroom: ['Monaco', 'à Monaco', 'Monaco', 'in Monaco', 'marble', '#f0ece4', '#c0283a', '#c0283a'],
        bathroom: ['Fidji', 'aux Fidji', 'Fiji', 'in Fiji', 'sand', '#f6e2b0', '#e0b87a', '#f0b88a', 1],
        office: ['New York', 'à New York', 'New York', 'in New York', 'parquet', '#c8ccd2', '#9aa0a8', '#5a6a7a'],
        library: ['Le Caire', 'au Caire', 'Cairo', 'in Cairo', 'sand', '#ead2a0', '#c8aa6a', '#b8862b', 1],
        dining: ['Rio', 'à Rio', 'Rio', 'in Rio', 'mosaic', '#ffd36a', '#2f9a5a', '#2f9a5a', 1],
        garden: ['Arusha', 'à Arusha', 'Arusha', 'in Arusha', 'straw', '#d9c27a', '#b09a50', '#c8a060', 1],
        hall: ['Antarctique', 'en Antarctique', 'Antarctica', 'in Antarctica', 'snow', '#eef4fa', '#c8d6e4', '#a8c0d8', 1],
        music: ['Venise', 'à Venise', 'Venice', 'in Venice', 'water', '#6fc0c0', '#e8fbff', '#e08a5a', 1],
        game: ['Las Vegas', 'à Las Vegas', 'Las Vegas', 'in Las Vegas', 'carpet', '#7a2a8a', '#521c5e', '#f5c542'],
        veranda: ['Bali', 'à Bali', 'Bali', 'in Bali', 'grass', '#7cc47a', '#4f9a52', '#d9b07a', 1],
        laundry: ['Reykjavik', 'à Reykjavik', 'Reykjavik', 'in Reykjavik', 'stone', '#9aa8b0', '#6e7c84', '#5a8ab0', 1],
        guest: ['Marrakech', 'à Marrakech', 'Marrakesh', 'in Marrakesh', 'mosaic', '#e8a070', '#2f8aa0', '#2f8aa0'],
      },
      objects: {
        bed: ['m:Hamac|dans', 'hammock|in'], sofa: ['m:Transat', 'deckchair'], armchair: ['m:Siège d\'avion|dans', 'plane seat|in'],
        chair: ['m:Pouf', 'pouf'], rug: ['m:Tapis berbère', 'Berber rug'], bench: ['m:Banc', 'bench'],
        table: ['f:Table de roulette', 'roulette table'], desk: ['m:Comptoir d\'enregistrement', 'check-in desk'], plant: ['m:Bambou', 'bamboo'],
        bookshelf: ['m:Présentoir à cartes postales', 'postcard rack'], piano: ['m:Piano', 'piano'], bath: ['f:Piscine', 'pool'],
        sink: ['f:Fontaine', 'drinking fountain'], tv: ['m:Tableau des départs', 'departures board'], fireplace: ['m:Brasero', 'brazier'],
        counter: ['m:Stand de street-food', 'street food stall'], cabinet: ['f:Valise', 'suitcase'], lamp: ['m:Lampion', 'paper lantern'],
        tree: ['m:Baobab', 'baobab'], fountain: ['f:Statue', 'statue'],
      },
      icons: { cabinet: '🧳', tv: '🛫', tree: '🌳', fountain: '🗽', plant: '🎋', lamp: '🏮', table: '🎰', bath: '🏊', counter: '🌮', armchair: '✈️' },
      names: {
        fr: ['Aiko', 'Bruno', 'Carmen', 'Diego', 'Eva', 'Fatou', 'Giulia', 'Hamid', 'Ivan', 'Jade', 'Kofi', 'Lars', 'Maya', 'Nuno', 'Olga', 'Priya', 'Rafael', 'Sven'],
        en: ['Aiko', 'Bruno', 'Carmen', 'Diego', 'Eva', 'Fatou', 'Giulia', 'Hamid', 'Ivan', 'Jade', 'Kofi', 'Lars', 'Maya', 'Nuno', 'Olga', 'Priya', 'Rafael', 'Sven'],
      },
      victims: { fr: ['Lord Fogg', 'Capitaine Valise', 'Madame Voyage', 'Wanda Globe'], en: ['Lord Fogg', 'Captain Valise', 'Madame Voyage', 'Wanda Globe'] },
    },

    rome: {
      emoji: '🏛️', colors: ['#8a2a2a', '#e9d9b0'], look: 'print', mood: 'day',
      gen: { open: [["Rome, aux ides de mars.", "Les jeux du cirque venaient de s'achever.", "Le banquet de l'empereur s'éternisait au triclinium."], ["Rome, on the Ides of March.", "The circus games had just ended.", "The emperor's banquet dragged on in the triclinium."]], things: [["une couronne de laurier", "une toge déchirée", "une pièce à l'effigie de César", "une grappe de raisin écrasée"], ["a laurel wreath", "a torn toga", "a coin bearing Caesar's face", "a crushed bunch of grapes"]], nick: [["Maximus", "Felix", "Magnus", "Rufus", "Pius", "Severus"], ["Maximus", "Felix", "Magnus", "Rufus", "Pius", "Severus"]], vt: [["Empereur", "Sénateur", "Vestale", "Gladiateur"], ["Emperor", "Senator", "Vestal", "Gladiator"]], vn: ["Nerva", "Varro", "Valeria", "Spartax"], rate: 0.6 },
      label: ['Rome antique', 'Ancient Rome'], tagline: ['Toges, sénateurs et poignards', 'Togas, senators and daggers'],
      story: ['Rome, aux ides de mars. Le Sénat bruisse de rumeurs quand {victim} tombe sans un mot. Tous les patriciens ont un alibi gravé dans le marbre… sauf un.',
        'Rome, on the Ides of March. The Senate is buzzing with rumours when {victim} falls without a word. Every patrician has an alibi carved in marble… except one.'],
      rooms: {
        living: ['Atrium', 'dans l\'atrium', 'Atrium', 'in the atrium', 'mosaic', '#e9dcc0', '#c4b08a', '#a8443a'],
        kitchen: ['Taverne', 'à la taverne', 'Tavern', 'in the tavern', 'cobble', '#d8c4a0', '#b09a74', '#c08a5a'],
        bedroom: ['Chambre de l\'empereur', 'dans la chambre de l\'empereur', 'Emperor\'s chamber', 'in the emperor\'s chamber', 'carpet', '#7a2a5a', '#561d3f', '#d9b45a'],
        bathroom: ['Thermes', 'aux thermes', 'Baths', 'at the baths', 'mosaic', '#bfe0e6', '#2f6f8a', '#e9dcc0'],
        office: ['Sénat', 'au Sénat', 'Senate', 'in the Senate', 'marble', '#f0ebe0', '#cfc6b2', '#8a2a2a'],
        library: ['Tablinum', 'dans le tablinum', 'Tablinum', 'in the tablinum', 'mosaic', '#d9c49a', '#b09a6a', '#3f6a5a'],
        dining: ['Triclinium', 'dans le triclinium', 'Triclinium', 'in the triclinium', 'mosaic', '#e8c8a0', '#c09a6a', '#b5523b'],
        garden: ['Péristyle', 'dans le péristyle', 'Peristyle garden', 'in the peristyle garden', 'grass', '#9ac06a', '#6f9a48', '#e8dcc0', 1],
        hall: ['Forum', 'sur le forum', 'Forum', 'in the forum', 'marble', '#e6dfd0', '#bfb5a0', '#a89a80', 1],
        music: ['Théâtre', 'au théâtre', 'Theatre', 'at the theatre', 'marble', '#e0d2b0', '#b8a882', '#6a4a8a'],
        game: ['Arène', 'dans l\'arène', 'Arena', 'in the arena', 'sand', '#e6cc90', '#c0a464', '#9a6a40', 1],
        laundry: ['Teinturerie', 'à la teinturerie', 'Dye works', 'at the dye works', 'hex', '#c8a0c0', '#a07898', '#6a3a7a'],
        veranda: ['Vignes', 'dans les vignes', 'Vineyard', 'in the vineyard', 'grass', '#a8b86a', '#7f8f48', '#7a3a5a', 1],
      },
      objects: {
        bed: ['f:Couche', 'couch bed'], sofa: ['m:Lit de banquet', 'dining couch'], armchair: ['f:Chaise curule', 'curule chair'],
        chair: ['m:Tabouret', 'stool'], rug: ['f:Mosaïque', 'mosaic'], bench: ['m:Gradin', 'stone tier'],
        table: ['f:Table de marbre', 'marble table'], desk: ['m:Pupitre', 'lectern'], plant: ['m:Laurier', 'laurel'],
        bookshelf: ['f:Niche à rouleaux', 'scroll niche'], piano: ['f:Lyre', 'lyre'], bath: ['m:Bassin', 'pool'],
        sink: ['f:Amphore', 'amphora'], tv: ['f:Fresque', 'fresco'], fireplace: ['m:Brasero', 'brazier'],
        counter: ['m:Comptoir', 'counter'], cabinet: ['m:Coffre', 'chest'], lamp: ['f:Lampe à huile', 'oil lamp'],
        tree: ['m:Olivier', 'olive tree'], fountain: ['f:Statue', 'statue'],
      },
      icons: { sink: '🏺', fountain: '🗿', tree: '🫒', plant: '🌿', piano: '🪕', lamp: '🪔', tv: '🖼️', rug: '🟫', fireplace: '🔥' },
      names: {
        fr: ['Aurelia', 'Brutus', 'Cassius', 'Drusus', 'Flavia', 'Gaius', 'Horatia', 'Julia', 'Livia', 'Marcus', 'Octavia', 'Petronius', 'Quintus', 'Sabina', 'Titus'],
        en: ['Aurelia', 'Brutus', 'Cassius', 'Drusus', 'Flavia', 'Gaius', 'Horatia', 'Julia', 'Livia', 'Marcus', 'Octavia', 'Petronius', 'Quintus', 'Sabina', 'Titus'],
      },
      victims: { fr: ['César', 'Sénateur Varro', 'Vestale Valeria', 'Gladiateur Spartax'], en: ['Caesar', 'Senator Varro', 'Vestal Valeria', 'Gladiator Spartax'] },
    },
  };
  const ids = Object.keys(THEMES);

  /* ---------------- Générateur : histoires et noms mélangés ---------------- */
  // Morceaux communs à tous les univers (fr, en), assemblés avec ceux de l'univers
  const FIND = [
    ['{victim} a été retrouvé·e sans vie.', 'On a retrouvé {victim}, immobile pour toujours.', '{victim} ne s\'est jamais relevé·e.', 'Un cri a déchiré le silence : {victim} gisait à terre.', 'Au petit matin, {victim} manquait à l\'appel… avant d\'être retrouvé·e, glacé·e.'],
    ['{victim} was found dead.', '{victim} was found, still forever.', '{victim} never got up again.', 'A scream broke the silence: {victim} lay on the floor.', 'By morning, {victim} was missing… until they were found, cold as ice.'],
  ];
  const CLUE = [
    ['Sur place, un seul indice : {thing}.', 'Près du corps traînait {thing}.', 'Et puis il y a ce détail : {thing}, là où rien ne devrait être.', 'Le seul témoin muet : {thing}.', 'Dans la poche de la victime : {thing}. Étrange…'],
    ['At the scene, a single clue: {thing}.', 'Near the body lay {thing}.', 'And then there is this detail: {thing}, where nothing should be.', 'The only silent witness: {thing}.', 'In the victim\'s pocket: {thing}. Strange…'],
  ];
  const TWIST = [
    ['Tout le monde a un alibi… mais un seul ment.', 'Les portes étaient fermées : le coupable est encore là.', 'Chacun accuse son voisin, personne ne dit tout.', 'Les témoignages se contredisent… presque tous.', 'L\'horloge s\'est arrêtée pile au moment du drame.', 'Personne n\'a rien entendu. Vraiment personne ?'],
    ['Everyone has an alibi… but one of them is lying.', 'The doors were locked: the culprit is still here.', 'Everyone blames their neighbour, nobody tells the whole story.', 'The statements contradict each other… almost all of them.', 'The clock stopped at the very moment of the crime.', 'Nobody heard a thing. Really, nobody?'],
  ];
  const END = [
    ['À toi de démasquer le coupable !', 'Place chaque suspect et trouve qui était seul avec la victime.', 'L\'enquête commence maintenant.', 'Ouvre l\'œil : chaque indice compte.'],
    ['Unmask the culprit!', 'Place every suspect and find who was alone with the victim.', 'The investigation starts now.', 'Keep your eyes open: every clue counts.'],
  ];

  /**
   * Prénoms, victimes et histoire d'une variante (déterministe pour une graine) : les prénoms
   * reçoivent parfois un surnom de l'univers, les victimes mêlent titres et noms, l'histoire
   * assemble une ouverture, la découverte, un détail troublant et une chute.
   */
  function generate(th, lang, seed) {
    // L'univers entre dans la graine : deux univers ne tirent pas les mêmes morceaux
    const i = L(lang), g = th.gen, r = MF.util.rng(((seed >>> 0) ^ parseInt(MF.util.hash(th.label[0]), 36)) >>> 0 || 1);
    const pick = a => a[Math.floor(r() * a.length)];
    const base = th.names[lang] || th.names.fr;
    if (!g) return { names: base, victims: th.victims[lang] || th.victims.fr, story: th.story[i] };
    const nicks = MF.util.shuffle(g.nick[i], r);
    let k = 0;
    const names = MF.util.shuffle(base, r).map(n => {
      if (k >= nicks.length || r() > (g.rate ?? 0.35)) return n;
      const full = `${n} ${nicks[k]}`;
      if (full.length > 20) return n;
      k++;
      return full;
    });
    const titles = MF.util.shuffle(g.vt[i].map((tt, j) => j), r);
    const victims = [...titles.map(j => `${g.vt[i][j]} ${pick(g.vn)}`), ...(th.victims[lang] || th.victims.fr)].filter(v => v.length <= 20);
    const story = r() < 0.2 ? th.story[i] : [
      pick(g.open[i]), pick(FIND[i]),
      r() < 0.75 ? pick(CLUE[i]).replace('{thing}', pick(g.things[i])) : '',
      r() < 0.6 ? pick(TWIST[i]) : '', pick(END[i]),
    ].filter(Boolean).join(' ');
    return { names, victims: [...new Set(victims)], story };
  }
  const get = id => THEMES[id] || THEMES.manor;
  const L = lang => (lang === 'en' ? 1 : 0);

  /* ---------------- Noms et articles ---------------- */
  const cap = s => (s ? s[0].toUpperCase() + s.slice(1) : s);
  const low = s => (s ? s[0].toLowerCase() + s.slice(1) : s);
  /** Article défini deviné pour un nom de lieu saisi (« la cave », « l'atelier », « le grenier »). */
  function where(name, lang) {
    const s = String(name || '').trim();
    if (!s) return '';
    if (lang === 'en') return `in the ${low(s)}`;
    if (/^[aeiouyhâàéèêîôû]/i.test(s)) return `dans l'${low(s)}`;
    const first = s.split(/[\s-]/)[0].toLowerCase();
    if (/s$|x$/.test(first) && s.split(/\s/).length === 1 && first.length > 3) return `dans les ${low(s)}`;
    return `dans ${/e$|té$|ion$/.test(first) ? 'la' : 'le'} ${low(s)}`;
  }
  /** Objet : 'f:Nom|prép' -> { name, a: « une … », on: « sur une … » } (ou en anglais « a … », « on a … »). */
  function objectWords(spec, lang) {
    const [head, prep] = String(spec).split('|');
    if (lang === 'en') {
      const n = head.replace(/^[mf]:/, '');
      const a = `${/^[aeiou]/i.test(n) ? 'an' : 'a'} ${n}`;
      return { name: cap(n), a, on: `${prep || 'on'} ${a}` };
    }
    const m = /^([mf]):(.*)$/.exec(head);
    const n = m ? m[2] : head;
    const g = m ? m[1] : (/e$/.test(n.split(' ')[0]) ? 'f' : 'm');
    const a = `${g === 'f' ? 'une' : 'un'} ${low(n)}`;
    return { name: cap(n), a, on: `${prep || 'sur'} ${a}` };
  }

  /**
   * Habillage complet d'une enquête : univers + retouches de l'auteur.
   * @param {string} id  univers
   * @param {string} lang 'fr' | 'en'
   * @param {{ rooms?: any, objects?: any, story?: string }} [custom]  noms retouchés (rooms[type] = { name, in }, objects[type] = nom)
   */
  function resolve(id, lang, custom = {}, seed = 0) {
    const th = get(id), i = L(lang);
    const gen = seed ? generate(th, lang, seed) : { names: th.names[lang] || th.names.fr, victims: th.victims[lang] || th.victims.fr, story: th.story[i] };
    const rooms = {};
    for (const [type, r] of Object.entries(th.rooms)) rooms[type] = { name: r[i * 2], in: r[i * 2 + 1], floor: [r[4], r[5], r[6]], wall: r[7], open: r[8] === 1 || (r[8] === undefined && type === 'garden') };
    for (const [type, c] of Object.entries(custom.rooms || {})) {
      const name = String(c?.name || '').trim(), inn = String(c?.in || '').trim();
      if (!name && !inn) continue;
      const base = rooms[type] || {};
      rooms[type] = { ...base, name: name || base.name || '', in: inn || (name ? where(name, lang) : base.in) };
    }
    const objects = {};
    for (const [type, o] of Object.entries(th.objects)) objects[type] = objectWords(o[i], lang);
    for (const [type, n] of Object.entries(custom.objects || {})) {
      const s = String(n || '').trim();
      if (s) objects[type] = objectWords(s, lang);
    }
    return {
      id: ids.includes(id) ? id : 'manor',
      roomTypes: Object.keys(th.rooms),
      rooms, objects, icons: th.icons || {},
      names: gen.names,
      victims: gen.victims,
      story: String(custom.story || '').trim() || gen.story,
      look: th.look, mood: th.mood,
    };
  }

  /** Libellés d'un univers (cartes de choix). */
  const card = (id, lang) => { const th = get(id), i = L(lang); return { id, emoji: th.emoji, label: th.label[i], tagline: th.tagline[i], colors: th.colors }; };

  return { THEMES, ids, get, resolve, generate, card, where, objectWords };
})();
