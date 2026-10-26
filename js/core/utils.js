// @ts-check
/* =========================================================================
   Utilitaires génériques (DOM, texte, aléa reproductible, couleurs, réseau)
   ========================================================================= */
window.MF = window.MF || {};

MF.util = (() => {
  /** Texte sans accents ni ligatures (« Cœur été » -> « Coeur ete »). */
  const stripAccents = text => String(text ?? '')
    .replace(/œ/gi, m => (m === 'Œ' ? 'OE' : 'oe'))
    .replace(/æ/gi, m => (m === 'Æ' ? 'AE' : 'ae'))
    .normalize('NFD').replace(/[̀-ͯ]/g, '');

  /** Mot saisi -> lettres de grille : majuscules, sans accents, sans espaces ni tirets. */
  const normalize = text => stripAccents(text).toUpperCase().replace(/[^A-Z]/g, '');

  /** Nom de fichier lisible : « Test étoile » -> « test-etoile » (`fallback` si rien ne reste). */
  const slug = (text, fallback = 'grille') => stripAccents(text).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 60) || fallback;

  const esc = s => String(s ?? '').replace(/[&<>"']/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch]));

  /** Texte libre nettoyé : sans caractères de contrôle, espaces normalisés, longueur bornée. */
  const cleanText = (s, max = 500) => String(s ?? '')
    // eslint-disable-next-line no-control-regex
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F\u200B-\u200F\u202A-\u202E\u2066-\u2069]/g, '')
    .replace(/[ \t]+/g, ' ')
    .trim()
    .slice(0, max);

  /** Identifiant aléatoire cryptographique (base 36, 10 caractères). */
  function uid() {
    const a = new Uint32Array(2);
    crypto.getRandomValues(a);
    return (a[0].toString(36) + a[1].toString(36)).slice(0, 10).padEnd(10, '0');
  }

  /** Générateur pseudo-aléatoire reproductible (mulberry32). */
  function rng(seed) {
    let a = seed >>> 0;
    return () => {
      a = (a + 0x6D2B79F5) >>> 0;
      let t = a;
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }
  const randomSeed = () => crypto.getRandomValues(new Uint32Array(1))[0];
  const shuffle = (arr, rnd = Math.random) => {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(rnd() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
    return a;
  };

  /** Empreinte FNV-1a d'une chaîne (détection de mise en page périmée, caches). */
  function hash(str) {
    let h = 0x811c9dc5;
    for (let i = 0; i < str.length; i++) { h ^= str.charCodeAt(i); h = Math.imul(h, 0x01000193); }
    return (h >>> 0).toString(36);
  }

  const clamp = (v, min, max) => Math.min(max, Math.max(min, v));

  /** Distance d'édition (Levenshtein), avec arrêt anticipé au-delà de `max`. */
  function levenshtein(a, b, max = Infinity) {
    if (Math.abs(a.length - b.length) > max) return max + 1;
    let prev = Array.from({ length: b.length + 1 }, (_, i) => i);
    for (let i = 1; i <= a.length; i++) {
      const cur = [i];
      let best = i;
      for (let j = 1; j <= b.length; j++) {
        cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
        if (cur[j] < best) best = cur[j];
      }
      if (best > max) return max + 1;
      prev = cur;
    }
    return prev[b.length];
  }

  /* ---------------- Couleurs ---------------- */
  const HEX = /^#[0-9a-f]{6}$/i;
  function hexToRgb(hex) {
    const m = String(hex).replace('#', '').match(/^([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i);
    return m ? [parseInt(m[1], 16), parseInt(m[2], 16), parseInt(m[3], 16)] : [128, 128, 128];
  }
  const rgbToHex = (r, g, b) => '#' + [r, g, b].map(v => clamp(Math.round(v), 0, 255).toString(16).padStart(2, '0')).join('');
  /** Mélange deux couleurs (t = part de la seconde). */
  function mix(a, b, t) {
    const [r1, g1, b1] = hexToRgb(a), [r2, g2, b2] = hexToRgb(b);
    return rgbToHex(r1 + (r2 - r1) * t, g1 + (g2 - g1) * t, b1 + (b2 - b1) * t);
  }
  const tint = (hex, t) => mix(hex, '#ffffff', t);
  const shade = (hex, t) => mix(hex, '#000000', t);
  /** Luminance relative (0 noir … 1 blanc). */
  function luminance(hex) {
    const [r, g, b] = hexToRgb(hex).map(v => { v /= 255; return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; });
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  }
  /** Couleur de texte lisible sur un fond. */
  const onColor = (hex, dark = '#1d1b22', light = '#ffffff') => (luminance(hex) > 0.42 ? dark : light);

  /* ---------------- DOM ---------------- */
  /** Crée un élément depuis une chaîne HTML (premier nœud). */
  function html(markup) {
    const t = document.createElement('template');
    t.innerHTML = markup.trim();
    return t.content.firstElementChild;
  }
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

  function debounce(fn, ms = 250) {
    let t;
    const d = (...args) => { clearTimeout(t); t = setTimeout(() => fn(...args), ms); };
    d.cancel = () => clearTimeout(t);
    return d;
  }
  function throttleFrame(fn) {
    let queued = null;
    return (...args) => {
      if (queued) { queued = args; return; }
      queued = args;
      requestAnimationFrame(() => { const a = queued; queued = null; fn(...a); });
    };
  }

  /** « 3 mots » : délègue aux langues (formes traduites par le catalogue). */
  const plural = (n, one, many) => MF.i18n.plural(n, one, many);

  /* ---------------- Fichiers ---------------- */
  function downloadBlob(filename, blob) {
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = filename;
    a.rel = 'noopener';
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(a.href), 4000);
  }
  const download = (filename, content, type = 'application/json') =>
    downloadBlob(filename, new Blob([content], { type: type + ';charset=utf-8' }));

  function readFile(file, max = 25 * 1024 * 1024) {
    if (file.size > max) return Promise.reject(new Error(MF.i18n.t('Fichier trop volumineux')));
    return file.text();
  }

  function blobToDataUrl(blob) {
    return new Promise((resolve, reject) => {
      const r = new FileReader();
      r.onload = () => resolve(r.result);
      r.onerror = () => reject(r.error);
      r.readAsDataURL(blob);
    });
  }
  /** data:image/...;base64 -> Blob (types d'image autorisés uniquement). */
  function dataUrlToBlob(url) {
    const m = /^data:(image\/(?:png|jpeg|webp));base64,([A-Za-z0-9+/=]+)$/.exec(String(url || ''));
    if (!m) return null;
    const bin = atob(m[2]);
    const bytes = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
    return new Blob([bytes], { type: m[1] });
  }

  /* ---------------- Base64 URL (liens de partage) ---------------- */
  function bytesToB64url(bytes) {
    let s = '';
    for (let i = 0; i < bytes.length; i += 0x8000) s += String.fromCharCode(...bytes.subarray(i, i + 0x8000));
    return btoa(s).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  }
  function b64urlToBytes(str) {
    if (!/^[A-Za-z0-9_-]*$/.test(str)) throw new Error(MF.i18n.t('Encodage invalide'));
    const bin = atob(str.replace(/-/g, '+').replace(/_/g, '/') + '==='.slice((str.length + 3) % 4));
    const out = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
    return out;
  }

  /* ---------------- Réseau ---------------- */
  /**
   * GET JSON durci : délai maximal, aucun cookie ni référent envoyé, taille de réponse bornée.
   * Seuls les domaines autorisés par la politique CSP (connect-src) sont joignables.
   * @param {string} url
   * @param {{ timeout?: number, maxBytes?: number, signal?: AbortSignal }} [o]
   */
  async function fetchJson(url, { timeout = 9000, maxBytes = 3 * 1024 * 1024, signal } = {}) {
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), timeout);
    const onAbort = () => ctrl.abort();
    signal?.addEventListener('abort', onAbort);
    try {
      const res = await fetch(url, { signal: ctrl.signal, credentials: 'omit', referrerPolicy: 'no-referrer', mode: 'cors', cache: 'default', headers: { Accept: 'application/json' } });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const text = await res.text();
      if (text.length > maxBytes) throw new Error(MF.i18n.t('Réponse trop volumineuse'));
      return JSON.parse(text);
    } finally {
      clearTimeout(timer);
      signal?.removeEventListener('abort', onAbort);
    }
  }

  /**
   * Applique `fn` à chaque élément, au plus `limit` à la fois ; résultats dans l'ordre des éléments.
   * @template T, R
   * @param {T[]} items
   * @param {number} limit
   * @param {(item: T, index: number) => Promise<R>} fn
   * @param {{ signal?: AbortSignal, onProgress?: (done: number, total: number) => void }} [o]
   * @returns {Promise<R[]>}
   */
  async function pool(items, limit, fn, { signal, onProgress } = {}) {
    const out = new Array(items.length);
    let next = 0, done = 0;
    const run = async () => {
      while (next < items.length && !signal?.aborted) {
        const i = next++;
        out[i] = await fn(items[i], i);
        onProgress?.(++done, items.length);
      }
    };
    await Promise.all(Array.from({ length: Math.max(1, Math.min(limit, items.length)) }, run));
    return out;
  }

  const nextFrame = () => new Promise(r => setTimeout(r, 0));
  const sleep = ms => new Promise(r => setTimeout(r, ms));

  /** Valeur d'un attribut data-v : booléen, nombre ou texte. */
  const parseValue = v => (v === 'true' ? true : v === 'false' ? false : /^-?\d+(\.\d+)?$/.test(v) ? +v : v);

  const deepClone = o => (typeof structuredClone === 'function' ? structuredClone(o) : JSON.parse(JSON.stringify(o)));

  return {
    normalize, stripAccents, slug, esc, cleanText, uid, rng, randomSeed, shuffle, hash, clamp, levenshtein,
    HEX, hexToRgb, rgbToHex, mix, tint, shade, luminance, onColor,
    html, $, $$, debounce, throttleFrame, plural,
    download, downloadBlob, readFile, blobToDataUrl, dataUrlToBlob, bytesToB64url, b64urlToBytes,
    fetchJson, pool, nextFrame, sleep, deepClone, parseValue,
  };
})();
