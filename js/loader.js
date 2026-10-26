// @ts-check
/* =========================================================================
   Chargeur : liste UNIQUE des fichiers de l'application, dans leur ordre de
   dépendance, et version de déploiement.

   Utilisé par la page (index.html), le worker de calcul, le service worker
   et la page de tests : aucune autre liste à maintenir à la main.

   Version : « __BUILD__ » est remplacé par l'empreinte du commit lors du
   déploiement (.github/workflows/pages.yml). En local, chaque chargement
   de page prend une version unique (jamais de fichier périmé en cache).

   Scripts classiques (pas de modules ES) : l'application reste utilisable
   en ouvrant directement index.html (file://), et le worker les charge
   avec importScripts.
   ========================================================================= */
(root => {
  /** @type {any} */
  const MF = (root.MF = root.MF || {});
  const BUILD = '__BUILD__';
  const VERSION = /^__/.test(BUILD) ? `dev-${Date.now().toString(36)}` : BUILD;

  /** Fichiers de la page, par couche (l'ordre compte : chaque fichier n'utilise que les précédents). */
  const GROUPS = {
    core: [
      'js/core/storage.js', 'js/core/i18n.js', 'js/i18n/en.js', 'js/core/utils.js', 'js/core/idb.js', 'js/core/lexicon.js', 'js/core/text.js',
      'js/engine/design.js', 'js/engine/shapes.js', 'js/engine/backgrounds.js', 'js/engine/games.js', 'js/data/stickers.js',
      'js/core/schema.js', 'js/core/assets.js', 'js/core/store.js', 'js/core/versions.js', 'js/core/zip.js', 'js/core/qr.js', 'js/core/share.js',
    ],
    data: ['js/data/packs.js', 'js/data/packs-en.js', 'js/data/palettes.js', 'js/data/themes.js'],
    services: ['js/services/dictionary.js', 'js/services/wiki.js', 'js/services/importer.js'],
    engine: [
      'js/engine/paper.js', 'js/engine/builder.js', 'js/engine/wordsearch.js', 'js/engine/generator.js',
      'js/engine/grid-model.js', 'js/engine/diagnostics.js', 'js/engine/renderers.js', 'js/engine/scene.js',
    ],
    ui: [
      'js/ui/components.js', 'js/ui/phone-nav.js', 'js/ui/pinch-zoom.js', 'js/ui/brand.js', 'js/ui/grid-view.js',
      'js/ui/live-build.js', 'js/ui/sticker-editor.js', 'js/ui/previews.js', 'js/ui/shape-picker.js', 'js/ui/layout-controls.js',
      'js/ui/pickers.js', 'js/ui/panels/words.js', 'js/ui/panels/clues.js', 'js/ui/panels/design.js', 'js/ui/panels/decor.js',
      'js/ui/panels/settings.js', 'js/ui/exporter.js', 'js/ui/share-dialog.js', 'js/ui/welcome.js', 'js/ui/dashboard.js',
    ],
    app: ['js/app/guard.js', 'js/app/actions.js', 'js/app/export-flow.js', 'js/app/play.js', 'js/app/help.js', 'js/app/shortcuts.js', 'js/app/updates.js', 'js/app.js'],
  };

  /** Dictionnaires (les plus gros fichiers) : chargés seulement pour la langue utilisée. */
  const LEXICONS = {
    fr: ['js/data/clues-fr.js', 'js/data/clues-fr-extra.js'],
    en: ['js/data/clues-en.js'],
  };

  /** Moteur seul, pour le worker de calcul (aucun accès au DOM ni au stockage). */
  const WORKER = ['js/core/i18n.js', 'js/core/utils.js', 'js/core/lexicon.js', 'js/engine/shapes.js', 'js/engine/games.js', 'js/engine/paper.js', 'js/engine/builder.js', 'js/engine/wordsearch.js', 'js/engine/grid-model.js'];

  /** Ce que chaque point d'entrée charge. */
  const ENTRIES = {
    app: [...GROUPS.core, ...GROUPS.data, ...GROUPS.services, ...GROUPS.engine, ...GROUPS.ui, ...GROUPS.app],
    tests: [...GROUPS.core, ...GROUPS.data, ...GROUPS.services, ...GROUPS.engine, ...LEXICONS.fr, ...LEXICONS.en, 'js/app/play.js', 'js/app/actions.js', 'tests/run.js'],
  };

  // Racine du site : déduite de l'adresse de ce fichier (page), ou fournie avant l'import (worker : MF.base)
  const script = /** @type {HTMLScriptElement | null} */ (typeof document !== 'undefined' ? document.currentScript : null);
  const base = MF.base || (script ? new URL('..', script.src).href : new URL('./', root.location.href).href);

  /** Adresse complète d'un fichier, avec la version (cache navigateur toujours cohérent). */
  const url = path => `${new URL(path, base).href}?v=${encodeURIComponent(VERSION)}`;

  const loaded = new Set();
  const pending = new Map();

  /** Ajoute un script à la page ; les scripts d'un même appel s'exécutent dans l'ordre. */
  function inject(path) {
    if (pending.has(path)) return pending.get(path);
    const p = new Promise((resolve, reject) => {
      const el = document.createElement('script');
      el.src = url(path);
      el.async = false; // ordre d'exécution garanti, téléchargements en parallèle
      el.onload = () => { loaded.add(path); resolve(); };
      el.onerror = () => { pending.delete(path); el.remove(); reject(new Error(`${path} : chargement impossible`)); };
      document.head.appendChild(el);
    });
    pending.set(path, p);
    return p;
  }

  /** Charge des fichiers (une seule fois chacun). Page : asynchrone ; worker : synchrone (importScripts). */
  function load(paths) {
    const todo = paths.filter(p => !loaded.has(p));
    if (!todo.length) return Promise.resolve();
    if (typeof document === 'undefined') {
      root.importScripts(...todo.map(url));
      todo.forEach(p => loaded.add(p));
      return Promise.resolve();
    }
    return Promise.all(todo.map(inject)).then(() => undefined);
  }

  /** Dictionnaire d'une langue : chargé à la demande. */
  const lexicon = lang => load(LEXICONS[lang] || []);
  const hasLexicon = lang => (LEXICONS[lang] || []).every(p => loaded.has(p));

  /** Application sans les dictionnaires : ce que le service worker met en cache dès l'installation. */
  const essential = () => [...new Set([...ENTRIES.app, ...WORKER, 'js/engine/worker.js', 'js/loader.js'])];
  /** Tous les fichiers utilisables hors ligne (les dictionnaires sont mis en cache à leur premier chargement). */
  const all = () => [...new Set([...essential(), ...Object.values(LEXICONS).flat()])];
  /** Dictionnaires déjà chargés dans cette page. */
  const loadedLexicons = () => Object.values(LEXICONS).flat().filter(p => loaded.has(p));

  MF.loader = { VERSION, GROUPS, LEXICONS, WORKER, ENTRIES, url, load, lexicon, hasLexicon, essential, all, loadedLexicons };

  // Page : point d'entrée indiqué par data-entry (« app » ou « tests »)
  const entry = script?.dataset.entry;
  if (entry && ENTRIES[entry]) {
    load(ENTRIES[entry]).catch(err => {
      console.error(err);
      document.body.insertAdjacentHTML('beforeend', '<p class="boot-error" role="alert">Flèche Studio n\'a pas pu se charger (connexion ?). Recharge la page. · Flèche Studio could not load. Please reload the page.</p>');
    });
  }
})(typeof window !== 'undefined' ? window : self);
