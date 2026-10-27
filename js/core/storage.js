// @ts-check
/* =========================================================================
   Stockage local (localStorage) : seul module qui y accède directement.
   Toutes les clés de l'application sont déclarées ici ; chaque accès est
   protégé (navigation privée, stockage désactivé ou plein) et ne lève
   jamais d'exception, sauf `write`, qui signale un stockage plein.
   ========================================================================= */
window.MF = window.MF || {};

MF.storage = (() => {
  /** Clés et préfixes utilisés par l'application. */
  const KEYS = {
    state: 'mfm:v2',              // grilles, mots, réglages (MF.store)
    play: 'mfm:play:',            // progression des parties (MF.play), une clé par page
    best: 'mfm:best',             // meilleurs temps (MF.play)
    lang: 'fleche-studio-lang',   // langue de l'interface (MF.i18n)
    legacy: 'mots-fleches-maker:', // ancienne version de l'application (récupération)
  };
  /** Préfixes effacés par « Tout effacer ». */
  const OWN = ['mfm:', KEYS.legacy];

  /** @returns {Storage | null} */
  function area() {
    try { return globalThis.localStorage || null; } catch { return null; }
  }

  /** @param {string} key */
  const get = key => { try { return area()?.getItem(key) ?? null; } catch { return null; } };

  /**
   * Valeur JSON, ou `fallback` si absente ou illisible.
   * @param {string} key
   * @param {any} [fallback]
   */
  function getJSON(key, fallback = null) {
    const raw = get(key);
    if (raw == null) return fallback;
    try { return JSON.parse(raw); } catch { return fallback; }
  }

  /**
   * Écrit une valeur ; lève l'erreur du navigateur si le stockage est plein (à traiter par l'appelant).
   * @param {string} key
   * @param {string} value
   */
  function write(key, value) {
    const s = area();
    if (s) s.setItem(key, value);
  }

  /**
   * Écrit une valeur ; renvoie false si le navigateur refuse (stockage plein ou indisponible).
   * @param {string} key
   * @param {any} value  texte, ou objet enregistré en JSON
   */
  function set(key, value) {
    try { write(key, typeof value === 'string' ? value : JSON.stringify(value)); return true; } catch { return false; }
  }

  /** @param {string} key */
  const remove = key => { try { area()?.removeItem(key); } catch { /* stockage indisponible */ } };

  /**
   * Clés qui commencent par l'un des préfixes.
   * @param {string | string[]} prefixes
   * @param {Storage | null} [storage]  remplaçable dans les tests
   */
  function keys(prefixes, storage = area()) {
    const list = [].concat(prefixes);
    try { return storage ? Object.keys(storage).filter(k => list.some(p => k.startsWith(p))) : []; } catch { return []; }
  }

  /**
   * Supprime toutes les clés qui commencent par l'un des préfixes ; renvoie leur nombre.
   * @param {string | string[]} prefixes
   */
  function removeAll(prefixes) {
    const list = keys(prefixes);
    list.forEach(remove);
    return list.length;
  }

  /** Taille approximative d'une valeur enregistrée (octets, UTF-16). @param {string} key */
  const bytes = key => (get(key) || '').length * 2;

  return { KEYS, OWN, area, get, getJSON, write, set, remove, keys, removeAll, bytes };
})();
