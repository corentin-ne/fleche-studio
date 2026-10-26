/* =========================================================================
   Dictionnaires de mots définis, par langue (MF.cluesFr, MF.cluesEn).
   Chaque grille a sa langue de mots (options.lang) : une grille française
   garde ses mots français même si l'interface passe en anglais.
   Clé : mot sans accents en majuscules -> définition.
   ========================================================================= */
window.MF = window.MF || {};

MF.lexicon = (() => {
  const LANGS = {
    fr: { global: 'cluesFr', packs: 'packs', label: 'Français', wiki: 'fr' },
    en: { global: 'cluesEn', packs: 'packsEn', label: 'English', wiki: 'en' },
  };
  const ids = Object.keys(LANGS);
  const pick = lang => (LANGS[lang] ? lang : 'fr');
  /** Dictionnaire d'une langue (objet vide s'il n'est pas chargé). */
  const get = lang => MF[LANGS[pick(lang)].global] || {};
  /** Packs de mots à thème d'une langue. */
  const packs = lang => MF[LANGS[pick(lang)].packs] || {};
  /** Langue proposée pour une nouvelle grille : celle de l'interface si elle a un dictionnaire. */
  const preferred = () => pick(MF.i18n?.lang);
  return { LANGS, ids, pick, get, packs, preferred };
})();
