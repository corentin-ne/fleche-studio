// @ts-check
/* =========================================================================
   Client Wiktionnaire / Wikipédia (API publiques, sans clé, CORS anonyme).
     - autocomplétion et correction orthographique (recherche floue) ;
     - définitions d'un mot (extraites du wikicode, raccourcies) ;
     - listes de mots par thème (catégories du Wiktionnaire) ;
     - résumé Wikipédia (noms propres).
   Travaille dans la langue des mots de la grille ouverte
   (MF.dictionary.current()), résolue à chaque appel : fr.wiktionary.org pour
   une grille française, en.wiktionary.org pour une grille anglaise.

   Sécurité : requêtes sans cookie ni référent, délai maximal, réponses
   traitées comme du TEXTE uniquement (jamais injectées en HTML), domaines
   limités par la CSP (connect-src).
   ========================================================================= */
window.MF = window.MF || {};

MF.wiki = (() => {
  const { cleanText, fetchJson } = MF.util;
  const t = (s, p) => MF.i18n.t(s, p);
  const cache = new Map();

  let online = navigator.onLine !== false;
  addEventListener('online', () => { online = true; });
  addEventListener('offline', () => { online = false; });

  /* ---------------- Particularités de chaque Wiktionnaire ---------------- */
  // Natures grammaticales : l'étiquette est le texte français, traduit à l'affichage par t().
  const POS_FR = { nom: 'Nom|pos', 'nom propre': 'Nom propre', verbe: 'Verbe', adjectif: 'Adjectif', adverbe: 'Adverbe', interjection: 'Interjection', 'prénom': 'Prénom', 'locution nominale': 'Locution', 'onomatopée': 'Onomatopée' };
  const POS_EN = { noun: 'Nom|pos', 'proper noun': 'Nom propre', verb: 'Verbe', adjective: 'Adjectif', adverb: 'Adverbe', interjection: 'Interjection', pronoun: 'Pronom', preposition: 'Préposition', conjunction: 'Conjonction', numeral: 'Numéral', phrase: 'Locution', 'prepositional phrase': 'Locution', proverb: 'Locution', idiom: 'Locution', onomatopoeia: 'Onomatopée' };

  // Modèles anglais « … of » qui donnent une vraie définition (flexions, pluriels… : retirés).
  const EN_FORM_OF = {
    'alternative form of': 'Alternative form of', 'alt form': 'Alternative form of', 'alt form of': 'Alternative form of',
    'alternative spelling of': 'Alternative spelling of', 'alt sp': 'Alternative spelling of', 'alt spelling of': 'Alternative spelling of',
    'synonym of': 'Synonym of', 'syn of': 'Synonym of', 'abbreviation of': 'Abbreviation of', 'abbr of': 'Abbreviation of',
    'initialism of': 'Initialism of', 'acronym of': 'Acronym of', 'short for': 'Short for', 'clipping of': 'Clipping of',
    'diminutive of': 'Diminutive of', 'archaic form of': 'Archaic form of', 'obsolete form of': 'Obsolete form of',
  };
  const EN_LINKS = new Set(['l', 'm', 'll', 'link', 'mention', 'l-self', 'm-self']);
  const EN_PAREN = new Set(['gloss', 'gl', 'q', 'qual', 'qualifier', 'i', 'sense', 's']);
  const EN_TEXT = new Set(['vern', 'taxlink', 'taxfmt', 'non-gloss definition', 'non-gloss', 'n-g', 'ngd', 'ng', 'lc', 'nowrap', 'smallcaps', 'sc']);

  /** Modèle {{nom|args}} du Wiktionnaire français -> texte (null : non géré ici). */
  function templateFr(name, args) {
    if (['lien', 'l', 'lien-ancre-étym', 'ws', 'nom w pc', 'petites capitales', 'pc', 'smcp', 'nobr'].includes(name)) return args.slice(0, name === 'nom w pc' ? 2 : 1).join(' ');
    if (['variante de', 'variante ortho de'].includes(name)) return `Variante de ${args[0] || ''}`;
    if (['pluriel de', 'fr-verbe-flexion'].includes(name)) return '';
    if (name === 'siècle' || name === 'siècle2') return args[0] ? `${args[0]}e siècle` : '';
    return null;
  }

  /** Modèle du Wiktionnaire anglais -> texte ({{l|en|mot}}, {{gloss|…}}, {{lb|en|…}}…). */
  function templateEn(name, args) {
    if (EN_LINKS.has(name)) return args[2] || args[1] || ''; // args[0] : code de langue
    if (EN_PAREN.has(name)) return args.length ? `(${args.join(', ')})` : '';
    if (EN_TEXT.has(name)) return args[0] || '';
    if (name === '1' || name === 'cap') return (args[0] || '').charAt(0).toUpperCase() + (args[0] || '').slice(1);
    if (EN_FORM_OF[name]) return `${EN_FORM_OF[name]} ${args[1] || ''}`;
    if (name === 'surname') return 'A surname';
    if (name === 'given name') return `A ${args[1] ? `${args[1]} ` : ''}given name`;
    return null; // lb, senseid, defdate, flexions (plural of…), cite… : retirés plus bas
  }

  const LANGS = {
    fr: {
      section: /^==\s*\{\{langue\|fr\}\}\s*==.*$/m,
      nextSection: /\n==\s*\{\{langue\|/,
      // Seuls les titres de nature (=== {{S|nom|fr}} ===) changent la nature courante.
      heading: line => { const h = /^===\s*\{\{S\|([^|}]+)\|fr/.exec(line); return h ? POS_FR[h[1].toLowerCase()] || '' : null; },
      template: templateFr,
      catNs: 'Catégorie',
      catSearch: q => `intitle:${q} intitle:français`,
      catKeep: c => /en français/.test(c) && !/(ancien|moyen) français/.test(c),
      catLabel: c => c.replace(/ en français$/, ''),
      lead: /\s+(est|était|sont)\s+/,
    },
    en: {
      section: /^==\s*English\s*==\s*$/m,
      nextSection: /\n==[^=]/,
      // Tout titre (===Noun===, ====Verb====, ====Derived terms====…) redéfinit la nature.
      heading: line => { const h = /^={3,6}\s*([^=]+?)\s*={3,6}\s*$/.exec(line); return h ? POS_EN[h[1].toLowerCase()] || '' : null; },
      template: templateEn,
      catNs: 'Category',
      // Catégories thématiques anglaises : « Category:en:Birds », « Category:en:Fruits »…
      catSearch: q => `intitle:${q} prefix:Category:en:`,
      catKeep: c => /^en:/.test(c),
      catLabel: c => c.replace(/^en:/, ''),
      lead: /\s+(is|was|are|were)\s+/,
    },
  };

  /** Langue des mots de la grille ouverte, résolue à chaque appel. */
  function current() {
    const code = MF.lexicon.LANGS[MF.dictionary.current()]?.wiki;
    return LANGS[code] ? { code, ...LANGS[code] } : { code: 'fr', ...LANGS.fr };
  }

  async function api(params, opts) {
    const qs = new URLSearchParams({ format: 'json', formatversion: '2', origin: '*', ...params });
    const url = `https://${current().code}.wiktionary.org/w/api.php?${qs}`; // l'URL (domaine compris) sert de clé de cache
    if (cache.has(url)) return cache.get(url);
    const p = fetchJson(url, opts).catch(e => { cache.delete(url); throw e; });
    cache.set(url, p);
    if (cache.size > 400) cache.delete(cache.keys().next().value);
    return p;
  }

  const offline = () => new Error(t('Hors ligne'));

  /** Un titre de page est-il un mot simple utilisable en grille ? */
  const isPlainWord = s => /^[a-zàâäéèêëîïôöùûüÿçœæ'-]{2,24}$/i.test(s) && MF.util.normalize(s).length >= 2;

  /**
   * Autocomplétion (préfixe).
   * @param {string} prefix
   * @param {{ signal?: AbortSignal }} [o]
   */
  async function complete(prefix, { signal } = {}) {
    if (!online || prefix.trim().length < 2) return [];
    const r = await api({ action: 'opensearch', search: prefix.trim(), limit: '10', namespace: '0', profile: 'normal' }, { signal, timeout: 5000 });
    return (Array.isArray(r?.[1]) ? r[1] : []).filter(isPlainWord).slice(0, 8);
  }

  /**
   * Correction : mots proches orthographiquement (recherche floue).
   * @param {string} word
   * @param {{ signal?: AbortSignal }} [o]
   */
  async function suggest(word, { signal } = {}) {
    if (!online || word.trim().length < 3) return { exists: false, suggestions: [] };
    const q = word.trim().toLowerCase();
    const r = await api({ action: 'opensearch', search: q, limit: '8', namespace: '0', profile: 'fuzzy' }, { signal, timeout: 5000 });
    const titles = (Array.isArray(r?.[1]) ? r[1] : []).filter(isPlainWord);
    const exists = titles.some(x => x.toLowerCase() === q);
    const nq = MF.util.normalize(q);
    const suggestions = titles.filter(x => x.toLowerCase() !== q && MF.util.levenshtein(MF.util.normalize(x), nq, 3) <= 3).slice(0, 4);
    return { exists, suggestions };
  }

  /* ---------------- Définitions ---------------- */
  /** Remplace les modèles {{…}} du wikicode, du plus imbriqué au plus externe. */
  function stripTemplates(s, lang) {
    let guard = 0;
    while (/\{\{[^{}]*\}\}/.test(s) && guard++ < 40) {
      s = s.replace(/\{\{([^{}]*)\}\}/g, (_, inner) => {
        const parts = inner.split('|').map(x => x.trim());
        const name = parts[0].toLowerCase();
        const args = parts.slice(1).filter(a => !a.includes('='));
        const own = lang.template(name, args);
        if (own !== null) return own;
        if (name === 'w') return args[1] || args[0] || '';
        if (name === 'formatnum') return args[0] || '';
        return ''; // étiquettes de registre / domaine, références… : retirées
      });
    }
    return s;
  }

  function cleanWikitext(line, lang) {
    let s = line.replace(/^#+\s*/, '');
    s = s.replace(/<ref[^>]*\/>/gi, '').replace(/<ref[\s\S]*?<\/ref>/gi, '');
    s = stripTemplates(s, lang);
    s = s.replace(/\[\[(?:Fichier|File|Image|Catégorie|Category):[^\]]*\]\]/gi, '');
    s = s.replace(/\[\[([^\]|]*)\|([^\]]*)\]\]/g, '$2').replace(/\[\[([^\]#]*)(?:#[^\]]*)?\]\]/g, '$1');
    s = s.replace(/\[https?:[^\s\]]+\s?([^\]]*)\]/g, '$1');
    s = s.replace(/'{2,}/g, '').replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ');
    s = s.replace(/\(\s*\)/g, '').replace(/\s+([,.;:])/g, '$1').replace(/\s{2,}/g, ' ').trim();
    s = s.replace(/^[,.;:)\s]+/, '');
    return cleanText(s, 400);
  }

  /** Version courte d'une définition, adaptée à une case de grille. */
  function shorten(text, max = 58) {
    let s = text.replace(/\([^)]*\)/g, '').replace(/\s+([,.;:])/g, '$1').replace(/\s{2,}/g, ' ').trim();
    s = s.split(/(?<=[a-zà-ÿ)])\.\s|;\s/)[0].trim().replace(/[.;:,]+$/, '');
    if (s.length > max) {
      const cut = s.lastIndexOf(',', max);
      s = cut > 18 ? s.slice(0, cut) : s.slice(0, s.lastIndexOf(' ', max)) + '…';
    }
    return s.charAt(0).toUpperCase() + s.slice(1);
  }

  /** Définitions lues dans la section de la langue d'un wikicode : [{ pos, text, short }]. */
  function parseDefinitions(wt, lang = current()) {
    const m = lang.section.exec(wt);
    if (!m) return [];
    const rest = wt.slice(m.index + m[0].length);
    const end = rest.search(lang.nextSection);
    const section = end >= 0 ? rest.slice(0, end) : rest;
    const out = [];
    let pos = '';
    for (const line of section.split('\n')) {
      const h = lang.heading(line);
      if (h !== null) { pos = h; continue; }
      if (!/^#(?![*:#])/.test(line) || !pos) continue;
      const text = cleanWikitext(line, lang);
      if (text.length < 3) continue;
      out.push({ pos: t(pos), text, short: shorten(text) });
      if (out.length >= 10) break;
    }
    return out;
  }

  /**
   * Définitions d'un mot dans la langue de la grille : [{ pos, text, short }].
   * @param {string} word
   * @param {{ signal?: AbortSignal }} [o]
   */
  async function definitions(word, { signal } = {}) {
    if (!online) throw offline();
    const lang = current();
    const titles = [...new Set([word.trim().toLowerCase(), word.trim()])];
    for (const page of titles) {
      let r;
      try { r = await api({ action: 'parse', page, prop: 'wikitext', redirects: '1' }, { signal }); } catch (e) { if (e.name === 'AbortError') throw e; continue; }
      const out = parseDefinitions(typeof r?.parse?.wikitext === 'string' ? r.parse.wikitext : '', lang);
      if (out.length) return out;
    }
    return [];
  }

  /**
   * Premier paragraphe Wikipédia (noms propres, lieux, personnes).
   * @param {string} title
   * @param {{ signal?: AbortSignal }} [o]
   */
  async function wikipedia(title, { signal } = {}) {
    if (!online) throw offline();
    const lang = current();
    const r = await fetchJson(`https://${lang.code}.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(title.trim().replace(/\s+/g, '_'))}`, { signal });
    if (r?.type === 'disambiguation' || typeof r?.extract !== 'string') return null;
    const text = cleanText(r.extract, 600);
    const lead = new RegExp(`^${title.trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}${lang.lead.source}`, 'i');
    return { title: cleanText(r.title, 120), text, short: shorten(text.replace(lead, ''), 60) };
  }

  /* ---------------- Thèmes (catégories) ---------------- */
  /**
   * Catégories du Wiktionnaire correspondant à un thème (« oiseaux » -> « Oiseaux en français »,
   * « birds » -> « en:Birds »). Les noms rendus se passent tels quels à members() ;
   * categoryLabel() en donne le libellé à afficher.
   * @param {string} theme
   * @param {{ signal?: AbortSignal }} [o]
   */
  async function categories(theme, { signal } = {}) {
    if (!online) throw offline();
    const lang = current();
    const q = cleanText(theme, 60).replace(/[^\p{L}\p{N}\s'-]/gu, '').trim();
    if (!q) return [];
    const r = await api({ action: 'query', list: 'search', srsearch: lang.catSearch(q), srnamespace: '14', srlimit: '12' }, { signal });
    return (r?.query?.search || []).map(x => String(x.title || '').replace(/^[^:]+:/, '')).filter(lang.catKeep).slice(0, 8);
  }

  /** Libellé lisible d'une catégorie (« Oiseaux en français » -> « Oiseaux », « en:Birds » -> « Birds »). */
  const categoryLabel = c => current().catLabel(String(c));

  /**
   * Mots simples d'une catégorie.
   * @param {string} category
   * @param {{ signal?: AbortSignal, limit?: number }} [o]
   */
  async function members(category, { signal, limit = 500 } = {}) {
    if (!online) throw offline();
    const r = await api({ action: 'query', list: 'categorymembers', cmtitle: `${current().catNs}:${category}`, cmnamespace: '0', cmlimit: String(limit), cmtype: 'page' }, { signal });
    return (r?.query?.categorymembers || []).map(x => String(x.title || '')).filter(isPlainWord);
  }

  return { complete, suggest, definitions, parseDefinitions, wikipedia, categories, categoryLabel, members, shorten, isOnline: () => online };
})();
