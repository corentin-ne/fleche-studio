/* =========================================================================
   Client Wiktionnaire / Wikipédia (API publiques, sans clé, CORS anonyme).
     - autocomplétion et correction orthographique (recherche floue) ;
     - définitions d'un mot (extraites du wikicode, raccourcies) ;
     - listes de mots par thème (catégories du Wiktionnaire) ;
     - résumé Wikipédia (noms propres).

   Sécurité : requêtes sans cookie ni référent, délai maximal, réponses
   traitées comme du TEXTE uniquement (jamais injectées en HTML), domaines
   limités par la CSP (connect-src).
   ========================================================================= */
window.MF = window.MF || {};

MF.wiki = (() => {
  const WIKT = 'https://fr.wiktionary.org/w/api.php';
  const WIKI = 'https://fr.wikipedia.org/api/rest_v1/page/summary/';
  const { cleanText, fetchJson } = MF.util;
  const cache = new Map();

  let online = navigator.onLine !== false;
  addEventListener('online', () => { online = true; });
  addEventListener('offline', () => { online = false; });

  async function api(params, opts) {
    const qs = new URLSearchParams({ format: 'json', formatversion: '2', origin: '*', ...params });
    const url = `${WIKT}?${qs}`;
    if (cache.has(url)) return cache.get(url);
    const p = fetchJson(url, opts).catch(e => { cache.delete(url); throw e; });
    cache.set(url, p);
    if (cache.size > 400) cache.delete(cache.keys().next().value);
    return p;
  }

  /** Un titre de page est-il un mot simple utilisable en grille ? */
  const isPlainWord = t => /^[a-zàâäéèêëîïôöùûüÿçœæ'-]{2,24}$/i.test(t) && MF.util.normalize(t).length >= 2;

  /** Autocomplétion (préfixe). */
  async function complete(prefix, { signal } = {}) {
    if (!online || prefix.trim().length < 2) return [];
    const r = await api({ action: 'opensearch', search: prefix.trim(), limit: '10', namespace: '0', profile: 'normal' }, { signal, timeout: 5000 });
    return (Array.isArray(r?.[1]) ? r[1] : []).filter(isPlainWord).slice(0, 8);
  }

  /** Correction : mots proches orthographiquement (recherche floue). */
  async function suggest(word, { signal } = {}) {
    if (!online || word.trim().length < 3) return { exists: false, suggestions: [] };
    const q = word.trim().toLowerCase();
    const r = await api({ action: 'opensearch', search: q, limit: '8', namespace: '0', profile: 'fuzzy' }, { signal, timeout: 5000 });
    const titles = (Array.isArray(r?.[1]) ? r[1] : []).filter(isPlainWord);
    const exists = titles.some(t => t.toLowerCase() === q);
    const nq = MF.util.normalize(q);
    const suggestions = titles.filter(t => t.toLowerCase() !== q && MF.util.levenshtein(MF.util.normalize(t), nq, 3) <= 3).slice(0, 4);
    return { exists, suggestions };
  }

  /* ---------------- Définitions ---------------- */
  /** Remplace les modèles {{…}} du wikicode, du plus imbriqué au plus externe. */
  function stripTemplates(s) {
    let guard = 0;
    while (/\{\{[^{}]*\}\}/.test(s) && guard++ < 40) {
      s = s.replace(/\{\{([^{}]*)\}\}/g, (_, inner) => {
        const parts = inner.split('|').map(x => x.trim());
        const name = parts[0].toLowerCase();
        const args = parts.slice(1).filter(a => !a.includes('='));
        if (['lien', 'l', 'lien-ancre-étym', 'ws', 'nom w pc', 'petites capitales', 'pc', 'smcp', 'nobr'].includes(name)) return args.slice(0, name === 'nom w pc' ? 2 : 1).join(' ');
        if (name === 'w') return args[1] || args[0] || '';
        if (['variante de', 'variante ortho de'].includes(name)) return `Variante de ${args[0] || ''}`;
        if (['pluriel de', 'fr-verbe-flexion'].includes(name)) return '';
        if (name === 'siècle' || name === 'siècle2') return args[0] ? `${args[0]}e siècle` : '';
        if (name === 'formatnum') return args[0] || '';
        return ''; // étiquettes de registre / domaine, références… : retirées
      });
    }
    return s;
  }

  function cleanWikitext(line) {
    let s = line.replace(/^#+\s*/, '');
    s = s.replace(/<ref[^>]*\/>/gi, '').replace(/<ref[\s\S]*?<\/ref>/gi, '');
    s = stripTemplates(s);
    s = s.replace(/\[\[(?:Fichier|File|Image|Catégorie|Category):[^\]]*\]\]/gi, '');
    s = s.replace(/\[\[([^\]|]*)\|([^\]]*)\]\]/g, '$2').replace(/\[\[([^\]]*)\]\]/g, '$1');
    s = s.replace(/\[https?:[^\s\]]+\s?([^\]]*)\]/g, '$1');
    s = s.replace(/'{2,}/g, '').replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ');
    s = s.replace(/\(\s*\)/g, '').replace(/\s+([,.;:])/g, '$1').replace(/\s{2,}/g, ' ').trim();
    s = s.replace(/^[,.;:)\s]+/, '');
    return cleanText(s, 400);
  }

  /** Version courte d'une définition, adaptée à une case de grille. */
  function shorten(text, max = 58) {
    let s = text.replace(/\([^)]*\)/g, '').replace(/\s{2,}/g, ' ').trim();
    s = s.split(/(?<=[a-zà-ÿ)])\.\s|;\s/)[0].replace(/[.;:,]+$/, '');
    if (s.length > max) {
      const cut = s.lastIndexOf(',', max);
      s = cut > 18 ? s.slice(0, cut) : s.slice(0, s.lastIndexOf(' ', max)) + '…';
    }
    return s.charAt(0).toUpperCase() + s.slice(1);
  }

  const POS = { nom: 'Nom', 'nom propre': 'Nom propre', verbe: 'Verbe', adjectif: 'Adjectif', adverbe: 'Adverbe', interjection: 'Interjection', 'prénom': 'Prénom', 'locution nominale': 'Locution', 'onomatopée': 'Onomatopée' };

  /** Définitions françaises d'un mot : [{ pos, text, short }]. */
  async function definitions(word, { signal } = {}) {
    if (!online) throw new Error('Hors ligne');
    const titles = [...new Set([word.trim().toLowerCase(), word.trim()])];
    for (const page of titles) {
      let r;
      try { r = await api({ action: 'parse', page, prop: 'wikitext', redirects: '1' }, { signal }); } catch (e) { if (e.name === 'AbortError') throw e; continue; }
      const wt = typeof r?.parse?.wikitext === 'string' ? r.parse.wikitext : '';
      const start = wt.search(/==\s*\{\{langue\|fr\}\}\s*==/);
      if (start < 0) continue;
      const rest = wt.slice(start + 10);
      const end = rest.search(/\n==\s*\{\{langue\|/);
      const section = end >= 0 ? rest.slice(0, end) : rest;
      const out = [];
      let pos = '';
      for (const line of section.split('\n')) {
        const h = /^===\s*\{\{S\|([^|}]+)\|fr/.exec(line);
        if (h) { pos = POS[h[1].toLowerCase()] || ''; continue; }
        if (!/^#(?![*:#])/.test(line) || !pos) continue;
        const text = cleanWikitext(line);
        if (text.length < 3) continue;
        out.push({ pos, text, short: shorten(text) });
        if (out.length >= 10) break;
      }
      if (out.length) return out;
    }
    return [];
  }

  /** Premier paragraphe Wikipédia (noms propres, lieux, personnes). */
  async function wikipedia(title, { signal } = {}) {
    if (!online) throw new Error('Hors ligne');
    const r = await fetchJson(WIKI + encodeURIComponent(title.trim().replace(/\s+/g, '_')), { signal });
    if (r?.type === 'disambiguation' || typeof r?.extract !== 'string') return null;
    const text = cleanText(r.extract, 600);
    return { title: cleanText(r.title, 120), text, short: shorten(text.replace(new RegExp(`^${title.trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\s+(est|était|sont)\\s+`, 'i'), ''), 60) };
  }

  /* ---------------- Thèmes (catégories) ---------------- */
  /** Catégories du Wiktionnaire correspondant à un thème (« fruits », « oiseaux »…). */
  async function categories(theme, { signal } = {}) {
    if (!online) throw new Error('Hors ligne');
    const q = cleanText(theme, 60).replace(/[^\p{L}\p{N}\s'-]/gu, '');
    if (!q) return [];
    const r = await api({ action: 'query', list: 'search', srsearch: `intitle:${q} intitle:français`, srnamespace: '14', srlimit: '12' }, { signal });
    return (r?.query?.search || []).map(x => String(x.title || '')).filter(t => /en français/.test(t) && !/(ancien|moyen) français/.test(t)).map(t => t.replace(/^Catégorie:/, '')).slice(0, 8);
  }

  /** Mots simples d'une catégorie. */
  async function members(category, { signal, limit = 500 } = {}) {
    if (!online) throw new Error('Hors ligne');
    const r = await api({ action: 'query', list: 'categorymembers', cmtitle: `Catégorie:${category}`, cmnamespace: '0', cmlimit: String(limit), cmtype: 'page' }, { signal });
    return (r?.query?.categorymembers || []).map(x => String(x.title || '')).filter(isPlainWord);
  }

  return { complete, suggest, definitions, wikipedia, categories, members, shorten, isOnline: () => online };
})();
