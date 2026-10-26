// @ts-check
/* =========================================================================
   Langues de l'interface.
   Le texte français sert de clé et de repli : t('Mots fléchés') renvoie la
   traduction du catalogue de la langue active, ou le français s'il manque.
   Paramètres : t('{n} mots placés', { n: 3 }).
   La langue est choisie au chargement (choix mémorisé, sinon langue du
   navigateur) ; en changer recharge la page, ce qui garde tout cohérent
   (y compris les libellés calculés au démarrage des modules).
   Utilisable dans le worker (sans DOM) : il reste alors en français.
   ========================================================================= */
window.MF = window.MF || {};

MF.i18n = (() => {
  const LANGS = {
    fr: { label: 'Français', short: 'FR', locale: 'fr-FR' },
    en: { label: 'English', short: 'EN', locale: 'en-GB' },
  };
  const KEY = 'fleche-studio-lang';
  const catalogs = {};

  /** Choix mémorisé, sinon première langue connue du navigateur (anglais par défaut). */
  function detect() {
    try {
      const saved = localStorage.getItem(KEY);
      if (LANGS[saved]) return saved;
    } catch { /* stockage indisponible */ }
    for (const l of navigator.languages || [navigator.language || '']) {
      const code = String(l).slice(0, 2).toLowerCase();
      if (LANGS[code]) return code;
    }
    return 'en';
  }
  const lang = typeof document === 'undefined' ? 'fr' : detect();
  const locale = LANGS[lang].locale;

  /** Ajoute des traductions : { 'texte français': 'traduction' }. */
  const add = (l, entries) => { catalogs[l] = Object.assign(catalogs[l] || {}, entries); };

  /**
   * Un même mot français peut avoir deux sens : « Annuler|undo » (Rétablir / Annuler)
   * contre « Annuler » (bouton d'une fenêtre). Le contexte après « | » n'est jamais affiché.
   */
  function t(fr, params) {
    const bar = fr.indexOf('|');
    const plain = bar < 0 ? fr : fr.slice(0, bar);
    let s = lang === 'fr' ? plain : catalogs[lang]?.[fr] ?? plain;
    if (params) s = s.replace(/\{(\w+)\}/g, (m, k) => (k in params ? params[k] : m));
    return s;
  }

  /** « 3 mots » / « 3 words » : les deux formes sont traduites par le catalogue. */
  function plural(n, one, many) {
    const several = lang === 'fr' ? n > 1 : n !== 1;
    return `${n} ${t(several ? many || `${one}s` : one)}`;
  }

  const num = n => Number(n).toLocaleString(locale);
  const compare = (a, b) => a.localeCompare(b, lang);

  function set(l) {
    if (!LANGS[l] || l === lang) return;
    try { localStorage.setItem(KEY, l); } catch { /* le choix ne sera pas retenu */ }
    location.reload();
  }

  /**
   * Traduit le HTML statique (index.html) : textes et attributs title, aria-label,
   * placeholder dont la valeur exacte figure au catalogue.
   */
  function apply(root = document) {
    document.documentElement.lang = lang;
    if (lang === 'fr') return;
    const dict = catalogs[lang] || {};
    const walker = document.createTreeWalker(root.body || root, NodeFilter.SHOW_TEXT);
    for (let n = walker.nextNode(); n; n = walker.nextNode()) {
      const key = n.nodeValue.trim();
      // translate="no" : nom de marque, jamais traduit
      if (key && dict[key] && !n.parentElement.closest('[translate="no"]')) n.nodeValue = n.nodeValue.replace(key, dict[key]);
    }
    for (const attr of ['title', 'aria-label', 'placeholder']) {
      (root.body || root).querySelectorAll(`[${attr}]`).forEach(el => { const v = dict[el.getAttribute(attr)]; if (v) el.setAttribute(attr, v); });
    }
    // Application installée : nom, raccourcis et description dans la langue de l'interface
    const manifest = /** @type {HTMLLinkElement | null} */ (document.querySelector('link[rel="manifest"]'));
    if (manifest) manifest.href = `manifest.${lang}.webmanifest`;
    const desc = /** @type {HTMLMetaElement} */ (document.querySelector('meta[name="description"]'));
    if (desc && dict[desc.content]) desc.content = dict[desc.content];
  }

  /** Le catalogue d'une langue contient-il ce texte ? (tests de couverture des traductions) */
  const has = (l, key) => Object.prototype.hasOwnProperty.call(catalogs[l] || {}, key);

  return { LANGS, lang, locale, add, has, t, plural, num, compare, set, apply };
})();
