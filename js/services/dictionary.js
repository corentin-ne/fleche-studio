// @ts-check
/* =========================================================================
   Dictionnaire local (MF.lexicon) : recherche, autocomplétion, correction,
   tirages au hasard. Fonctionne hors ligne, instantanément.
   Travaille dans la langue des mots de la grille ouverte (use(lang)).
   ========================================================================= */
window.MF = window.MF || {};

MF.dictionary = (() => {
  const { normalize, levenshtein } = MF.util;
  let lang = 'fr';
  let dict = {};      // mot -> définition, dans la langue courante
  let words = null;   // liste triée des mots (forme normalisée)
  let byFirst = null; // première lettre -> mots

  /** Change la langue de travail (index reconstruit à la demande). */
  function use(l) {
    l = MF.lexicon.pick(l);
    if (l === lang && words) return;
    lang = l;
    words = null;
  }
  const current = () => lang;

  function index() {
    // Dictionnaire pas encore chargé : index vide, reconstruit dès qu'il arrive
    if (words && (words.length || !MF.lexicon.ready(lang))) return;
    dict = MF.lexicon.get(lang);
    words = Object.keys(dict).sort();
    byFirst = new Map();
    for (const w of words) {
      if (!byFirst.has(w[0])) byFirst.set(w[0], []);
      byFirst.get(w[0]).push(w);
    }
  }

  const size = () => (index(), words.length);
  const has = text => (index(), !!dict[normalize(text)]);
  const clue = text => (index(), dict[normalize(text)] || '');

  /** Mots qui commencent par la saisie (puis qui la contiennent). */
  function complete(text, limit = 8) {
    index();
    const q = normalize(text);
    if (q.length < 2) return [];
    const starts = [], contains = [];
    for (const w of byFirst.get(q[0]) || []) if (w.startsWith(q) && w !== q) starts.push(w);
    if (starts.length < limit && q.length >= 3) for (const w of words) if (!w.startsWith(q) && w.includes(q)) { contains.push(w); if (contains.length > limit) break; }
    return [...starts.sort((a, b) => a.length - b.length), ...contains].slice(0, limit).map(w => ({ word: w, clue: dict[w] }));
  }

  /** Mots proches (fautes de frappe) : distance d'édition 1 ou 2 selon la longueur. */
  function suggest(text, limit = 4) {
    index();
    const q = normalize(text);
    if (q.length < 3 || has(q)) return [];
    const max = q.length <= 5 ? 1 : 2;
    const scored = [];
    for (const w of words) {
      if (Math.abs(w.length - q.length) > max) continue;
      const d = levenshtein(q, w, max);
      if (d <= max) scored.push([d, w]);
    }
    return scored.sort((a, b) => a[0] - b[0] || a[1].localeCompare(b[1])).slice(0, limit).map(([, w]) => w);
  }

  /**
   * Recherche filtrée pour la bibliothèque de mots.
   * @param {{ q?: string, min?: number, max?: number, start?: string, pattern?: string }} [o]
   *   q : texte cherché (dans le mot ou sa définition) ; min / max : longueur ;
   *   start : première lettre ; pattern : motif « CH?VAL » (? = n'importe quelle lettre)
   */
  function search({ q = '', min = 2, max = 30, start = '', pattern = '' } = {}) {
    index();
    const nq = normalize(q);
    const lq = q.trim().toLowerCase();
    // Motif : lettres + jokers (? * .) uniquement, jamais d'expression régulière fournie telle quelle
    const reSrc = pattern ? MF.util.stripAccents(pattern).toUpperCase().replace(/[^A-Z?*.]/g, '').replace(/[?*.]/g, '.') : '';
    const rx = reSrc ? new RegExp(`^${reSrc}$`) : null;
    return words.filter(w => w.length >= min && w.length <= max
      && (!start || w[0] === start)
      && (!rx || rx.test(w))
      && (!q || w.includes(nq) || dict[w].toLowerCase().includes(lq)));
  }

  /** n mots au hasard (entre min et max lettres), hors exclus. */
  function random(n, { min = 3, max = 9, exclude = new Set() } = {}) {
    index();
    const pool = words.filter(w => w.length >= min && w.length <= max && !exclude.has(w));
    return MF.util.shuffle(pool).slice(0, n).map(w => ({ word: w, clue: dict[w] }));
  }

  /** Présente un mot normalisé de façon lisible (CHEVAL -> Cheval). */
  const pretty = w => w.charAt(0) + w.slice(1).toLowerCase();

  return { use, current, size, has, clue, complete, suggest, search, random, pretty };
})();
