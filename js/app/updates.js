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

  /** Nouveautés de la version en cours (affichées dans « À propos »). */
  const NOTES = [
    'Créer et jouer : choisis tes réglages et la partie commence aussitôt, la grille se construit sans montrer la solution (aussi depuis la Salle de jeu : « Nouvelle partie »)',
    'Sudoku, kakuro, picross, logigramme et les autres jeux de chiffres et de logique se remplissent sous tes yeux à la création, comme les grilles de mots',
    '12 nouveaux jeux : mots casés, mot mystère, citation codée, échelle de mots, wordoku, sudoku (classique, irrégulier, X), kakuro, nombres fléchés et croisés, calcudoku, futoshiki, picross et logigramme, chacun avec une seule solution',
    'Picross : le dessin vient d\'un emoji, d\'une forme, d\'un texte ou de ta photo ; logigramme : suspects, lieux et objets des univers du Murdoku',
    'Les nouveaux jeux ont tout le reste : thèmes, multicolore, décor, export, lien de partage et mode jeu chronométré (cases à cocher au doigt ou à la souris pour le picross et le logigramme)',
    'Murdoku : chaque univers a ses propres meubles 3D, fidèles à leur nom (futon, hamac, trône, brasero, sarcophage, capsule de sommeil…), et des personnages habillés pour leur monde avec visage, coiffure et objet en main ; noms de pièces sur deux lignes quand ils sont longs',
    'Murdoku : vue 3D plongeante par défaut, sans taches sur le sol ; export avec la vue classique ou l\'angle actuel (tourné, zoomé, déplacé)',
    'Murdoku : vue 3D plus haute et plus lisible, jusqu\'au fond du plateau ; figurines et meubles légèrement couchés vers l\'arrière pour rester lisibles vu de haut, aussi dans les exports',
    'Bibliothèque de thèmes commune à tous les jeux, rangée en rayons (Styles, Univers, Fêtes) : chaque univers Murdoku a sa version 2D pour les grilles, et inversement',
    '12 nouveaux thèmes de grille (Manoir, Château hanté, Paris, Far West, Chevaliers…) et 4 nouveaux univers Murdoku : Forêt enchantée, Nuit de Noël, Fête d\'anniversaire, Saint-Valentin',
    'Murdoku : caméra libre sur le plateau 3D (glisser pour tourner, molette ou pincer pour zoomer, clic droit ou deux doigts pour déplacer) et boutons pour tourner, incliner et recadrer',
    'Motifs de fond : plus de 60 motifs rangés par catégorie, dont des mélanges à thème (Halloween, Noël, mer, espace…) semés sans répétition visible',
    'Thèmes retravaillés avec des fonds illustrés, et 5 nouveaux thèmes : Pirates, Espace, Japon, Égypte, Sirènes',
    'Nouveaux thèmes de fête : Halloween revisité, Pâques, Carnaval et Nouvel an chinois (motifs, stickers, emojis et confettis)',
    'Murdoku : 4 univers de fête (soirée Halloween, chasse aux œufs, carnaval, Nouvel an chinois) avec chapeaux et décor 3D',
    'Murdoku : figurines coiffées selon l\'univers (tricornes, casques spatiaux, kasa, hauts-de-forme…), plan et export aux couleurs de l\'univers',
    'Murdoku : plateaux 3D par univers (bords en sable, mer, neige…), zones en plein air sans murs, murs variés, noms des pièces et feuillages touffus',
    'Murdoku : 13 nouveaux sols (sable, eau, neige, marbre, tatami, mosaïque…) et encore plus de décor',
    'Murdoku : scènes 3D bien plus vivantes (nourriture, livres, tonneaux, coquillages, petits tapis…), réglable dans Rendu',
    'Murdoku : générateur de surnoms, de victimes et d\'histoires qui mélange les ingrédients de chaque univers',
    'Murdoku : 17 univers (sirènes, samouraïs, pirates, pharaons, Paris, bal de la Régence…) avec lieux, objets, suspects et histoire, tous modifiables',
    'Murdoku : niveau Expert, nouveaux indices (bord du plan, « pas à côté de ») et phrases plus variées',
    'Création repensée en trois étapes, plus simple sur téléphone',
    'Nouveau jeu : Murdoku, une enquête en diorama 3D peint (place les suspects, démasque le coupable), jouable et exportable',
    'Studio et jeu séparés : une page de jeu à part et une Salle de jeu dans le tableau de bord',
    'Multicolore : lettres, cases, définitions et mots de plusieurs couleurs (arc-en-ciel, pastel, néon…, couleurs au choix)',
    'Version de l\'application affichée dans le menu « Plus », avec vérification des mises à jour',
    '18 packs à thème de 25 mots, rappel de sauvegarde, meilleur temps en mode jeu',
  ];

  /** Version installée : « 4.4.0 · 1a2b3c4 ». */
  const label = () => { const a = MF.loader.about; return `${a.release} · ${a.build}`; };

  /** Demande au serveur s'il existe une version plus récente : true (elle arrive), false (à jour), null (vérification impossible). */
  async function check() {
    const reg = await navigator.serviceWorker?.getRegistration().catch(() => null);
    if (!reg) return null;
    await reg.update().catch(() => {});
    return !!(reg.installing || reg.waiting);
  }

  /** Fenêtre « À propos » : version, date de mise en ligne, nouveautés, vérification des mises à jour. */
  function about() {
    const a = MF.loader.about;
    const { esc } = MF.util;
    const date = a.deployed ? new Date(a.deployed).toLocaleString(MF.i18n.locale, { dateStyle: 'long', timeStyle: 'short' }) : t('version locale (non publiée)');
    MF.ui.modal({
      title: t('À propos de Flèche Studio'), icon: 'info', size: 'small',
      body: `<dl class="about-list"><dt>${t('Version')}</dt><dd class="mono">${esc(a.release)}</dd><dt>${t('Build')}</dt><dd class="mono">${esc(a.build)}</dd><dt>${t('Mise en ligne')}</dt><dd>${esc(date)}</dd></dl>
        <p class="small"><b>${t('Nouveautés')}</b></p><ul class="about-notes small">${NOTES.map(n => `<li>${esc(t(n))}</li>`).join('')}</ul>
        <p class="muted small" id="about-status" aria-live="polite"></p>`,
      actions: [{ label: t('Fermer'), value: null }, { label: t('Vérifier les mises à jour'), icon: 'refresh', kind: 'primary', value: null, validate: root => {
        const st = root.querySelector('#about-status');
        st.textContent = t('Vérification…');
        check().then(found => {
          st.textContent = found === null ? t('Vérification impossible ici (hors ligne ou navigation privée) : recharge la page pour obtenir la dernière version.')
            : found ? t('Nouvelle version en cours de téléchargement : recharge quand on te le propose.') : t('Tu as la dernière version.');
        });
        return false; // la fenêtre reste ouverte pour afficher le résultat
      } }],
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
    // Dictionnaires chargés par cette page : gardés pour le hors ligne (ceux chargés plus tard passent par le service worker)
    navigator.serviceWorker.ready.then(r => r.active?.postMessage({ type: 'warm', paths: MF.loader.loadedLexicons() })).catch(() => {});
    reg.addEventListener('updatefound', () => {
      const sw = reg.installing;
      sw?.addEventListener('statechange', () => { if (sw.state === 'activated' && hadController) announce(); });
    });
    // Onglet laissé ouvert longtemps : on vérifie de temps en temps qu'aucune version n'est sortie
    const check = () => reg.update().catch(() => {});
    setInterval(check, CHECK_MS);
    document.addEventListener('visibilitychange', () => { if (!document.hidden) check(); });
  }

  return { register, check, about, label };
})();
