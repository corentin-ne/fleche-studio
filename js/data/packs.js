/* =========================================================================
   Packs de mots à thème, avec définitions (rédigées pour ce projet).
   Ils servent de point de départ : on en ajoute un, puis on personnalise.
   ========================================================================= */
window.MF = window.MF || {};

MF.packs = {
  animaux: {
    label: 'Animaux', emoji: '🦊',
    words: [['Renard', 'Rusé de la fable'], ['Hibou', 'Il veille la nuit'], ['Girafe', 'Long cou de la savane'], ['Dauphin', 'Mammifère marin joueur'], ['Tortue', 'Lente mais têtue'], ['Lapin', 'Aux longues oreilles'], ['Abeille', 'Elle fait le miel'], ['Chat', 'Il ronronne'], ['Chien', 'Meilleur ami de l\'homme'], ['Lion', 'Roi des animaux'], ['Zèbre', 'Rayé de noir et blanc'], ['Koala', 'Accroché à l\'eucalyptus'], ['Pingouin', 'En frac sur la banquise'], ['Escargot', 'Il porte sa maison'], ['Papillon', 'Ancienne chenille'], ['Ours', 'Il hiberne'], ['Loup', 'Il hurle à la lune'], ['Panda', 'Noir et blanc, il croque le bambou']],
  },
  cuisine: {
    label: 'Cuisine', emoji: '🍳',
    words: [['Crêpe', 'Se fait sauter à la Chandeleur'], ['Raclette', 'Fromage fondu des soirées d\'hiver'], ['Baguette', 'Pain bien français'], ['Gratin', 'Doré au four'], ['Fondue', 'Plat savoyard à partager'], ['Omelette', 'On casse des œufs pour la faire'], ['Tarte', 'Aux pommes ou au citron'], ['Croissant', 'Viennoiserie du matin'], ['Ratatouille', 'Plat provençal de légumes'], ['Quiche', 'Lorraine, souvent'], ['Fromage', 'Camembert ou comté'], ['Chocolat', 'Noir, au lait ou blanc'], ['Soupe', 'Potage du soir'], ['Pâtes', 'Spaghetti ou coquillettes'], ['Mousse', 'Au chocolat, en dessert'], ['Salade', 'Verte ou composée']],
  },
  voyage: {
    label: 'Voyage', emoji: '✈️',
    words: [['Valise', 'On la boucle avant de partir'], ['Passeport', 'Indispensable à la frontière'], ['Avion', 'Il décolle de l\'aéroport'], ['Plage', 'Sable et serviette'], ['Montagne', 'Pour skier ou randonner'], ['Carte', 'Pour ne pas se perdre'], ['Hôtel', 'On y passe la nuit'], ['Train', 'Il roule sur des rails'], ['Soleil', 'On le cherche en vacances'], ['Boussole', 'Elle indique le nord'], ['Paris', 'Ville lumière'], ['Rome', 'Tous les chemins y mènent'], ['Croisière', 'Voyage en bateau'], ['Camping', 'Vacances sous la tente'], ['Souvenir', 'On le ramène de voyage'], ['Escale', 'Arrêt en cours de route']],
  },
  nature: {
    label: 'Nature', emoji: '🌿',
    words: [['Forêt', 'Grande étendue d\'arbres'], ['Rivière', 'Elle se jette dans un fleuve'], ['Cascade', 'Chute d\'eau'], ['Nuage', 'Il cache le soleil'], ['Arc-en-ciel', 'Après la pluie, en sept couleurs'], ['Volcan', 'Il crache de la lave'], ['Prairie', 'Herbe à perte de vue'], ['Chêne', 'Arbre robuste aux glands'], ['Rose', 'Fleur aux épines'], ['Orage', 'Tonnerre et éclairs'], ['Océan', 'Atlantique ou Pacifique'], ['Désert', 'Sable et chaleur'], ['Lune', 'Elle éclaire la nuit'], ['Étoile', 'Elle brille dans le ciel'], ['Saison', 'Il y en a quatre'], ['Neige', 'Flocons blancs de l\'hiver']],
  },
  sport: {
    label: 'Sport', emoji: '⚽',
    words: [['Football', 'Onze contre onze'], ['Tennis', 'Raquette et filet'], ['Rugby', 'Ballon ovale'], ['Natation', 'Crawl ou brasse'], ['Vélo', 'Petite reine'], ['Judo', 'Art martial en kimono'], ['Ski', 'Glisse sur la neige'], ['Marathon', 'Course de 42 km'], ['Arbitre', 'Il siffle les fautes'], ['Médaille', 'D\'or, d\'argent ou de bronze'], ['Stade', 'Lieu des matchs'], ['Équipe', 'Groupe de joueurs'], ['Basket', 'On y marque des paniers'], ['Golf', 'Dix-huit trous'], ['Escalade', 'On grimpe aux parois'], ['Yoga', 'Postures et respiration']],
  },
  musique: {
    label: 'Musique', emoji: '🎵',
    words: [['Guitare', 'Six cordes'], ['Piano', 'Touches noires et blanches'], ['Batterie', 'Elle donne le rythme'], ['Violon', 'Il se joue avec un archet'], ['Concert', 'Musique en public'], ['Chanson', 'Couplets et refrain'], ['Mélodie', 'Suite de notes agréable'], ['Rock', 'Style à guitares électriques'], ['Opéra', 'Spectacle chanté'], ['Micro', 'Pour chanter plus fort'], ['Disque', 'Vinyle ou CD'], ['Festival', 'Plusieurs concerts en plein air'], ['Rythme', 'Cadence de la musique'], ['Trompette', 'Cuivre à pistons'], ['Danse', 'On bouge en musique'], ['Note', 'Do, ré ou mi']],
  },
  fete: {
    label: 'Fête & anniversaire', emoji: '🎉',
    words: [['Gâteau', 'On y plante des bougies'], ['Bougie', 'On la souffle'], ['Cadeau', 'Il se déballe'], ['Ballon', 'Gonflé pour la déco'], ['Confettis', 'Petits papiers de fête'], ['Champagne', 'Ses bulles font la fête'], ['Surprise', 'Fête organisée en secret'], ['Danse', 'On la fait jusqu\'au bout de la nuit'], ['Invités', 'Ils viennent à la fête'], ['Musique', 'Le DJ la passe'], ['Souhait', 'On le fait en soufflant'], ['Joie', 'Bonne humeur'], ['Toast', 'On le porte en levant son verre'], ['Fête', 'Moment de célébration'], ['Âge', 'Il augmente chaque année'], ['Chanson', 'Joyeux anniversaire en est une']],
  },
  ecole: {
    label: 'École', emoji: '🎒',
    words: [['Cartable', 'Sac d\'écolier'], ['Crayon', 'On le taille'], ['Cahier', 'On y écrit ses leçons'], ['Gomme', 'Elle efface'], ['Règle', 'Pour tracer droit'], ['Maîtresse', 'Elle fait la classe'], ['Récréation', 'Pause dans la cour'], ['Tableau', 'Noir ou blanc, au mur'], ['Leçon', 'On l\'apprend par cœur'], ['Devoirs', 'À faire à la maison'], ['Dictée', 'Exercice d\'orthographe'], ['Calcul', 'Additions et soustractions'], ['Cantine', 'On y déjeune'], ['Classe', 'Salle de cours'], ['Stylo', 'Bille ou plume'], ['Livre', 'On le lit']],
  },
  noel: {
    label: 'Noël', emoji: '🎄',
    words: [['Sapin', 'On le décore en décembre'], ['Renne', 'Il tire le traîneau'], ['Traîneau', 'Véhicule du père Noël'], ['Guirlande', 'Elle brille sur le sapin'], ['Cadeau', 'Sous le sapin'], ['Étoile', 'Au sommet du sapin'], ['Bûche', 'Dessert roulé'], ['Neige', 'Pour un Noël tout blanc'], ['Lutin', 'Aide du père Noël'], ['Cheminée', 'Le père Noël y descend'], ['Hotte', 'Remplie de jouets'], ['Réveillon', 'Repas du 24 au soir'], ['Chaussette', 'On l\'accroche à la cheminée'], ['Bonnet', 'Rouge à pompon'], ['Houx', 'Feuilles piquantes et boules rouges'], ['Marrons', 'Glacés ou chauds']],
  },
  mer: {
    label: 'Mer & plage', emoji: '🏖️',
    words: [['Vague', 'Les surfeurs l\'attendent'], ['Sable', 'On y construit des châteaux'], ['Coquillage', 'On l\'écoute pour entendre la mer'], ['Phare', 'Il guide les bateaux'], ['Mouette', 'Oiseau du bord de mer'], ['Marée', 'Haute ou basse'], ['Crabe', 'Il marche de côté'], ['Bateau', 'Il flotte'], ['Parasol', 'Il fait de l\'ombre'], ['Surf', 'Glisse sur les vagues'], ['Corail', 'Récif coloré'], ['Requin', 'Prédateur des mers'], ['Île', 'Terre entourée d\'eau'], ['Port', 'Les bateaux y accostent'], ['Algue', 'Plante marine'], ['Plongée', 'Sport sous-marin']],
  },
  metiers: {
    label: 'Métiers', emoji: '👩‍🔧',
    words: [['Boulanger', 'Il fait le pain'], ['Médecin', 'Il soigne'], ['Pompier', 'Il éteint le feu'], ['Facteur', 'Il apporte le courrier'], ['Pilote', 'Aux commandes de l\'avion'], ['Cuisinier', 'Chef aux fourneaux'], ['Jardinier', 'Il entretient les plantes'], ['Peintre', 'Pinceau à la main'], ['Avocat', 'Il plaide'], ['Architecte', 'Il dessine les maisons'], ['Fleuriste', 'Elle compose des bouquets'], ['Coiffeur', 'Il coupe les cheveux'], ['Policier', 'Gardien de la paix'], ['Infirmière', 'Elle fait les piqûres'], ['Acteur', 'Il joue un rôle'], ['Vendeur', 'Il conseille en magasin']],
  },
  couleurs: {
    label: 'Couleurs', emoji: '🎨',
    words: [['Rouge', 'Couleur de la tomate'], ['Bleu', 'Couleur du ciel'], ['Vert', 'Couleur de l\'herbe'], ['Jaune', 'Couleur du citron'], ['Violet', 'Couleur de la lavande'], ['Orange', 'Fruit et couleur'], ['Rose', 'Couleur de la barbe à papa'], ['Noir', 'Couleur de la nuit'], ['Blanc', 'Couleur de la neige'], ['Gris', 'Couleur de la souris'], ['Turquoise', 'Bleu-vert des lagons'], ['Marron', 'Couleur du chocolat'], ['Doré', 'Couleur de l\'or'], ['Beige', 'Couleur du sable'], ['Indigo', 'Bleu profond de l\'arc-en-ciel'], ['Pastel', 'Couleur douce et claire']],
  },
};
