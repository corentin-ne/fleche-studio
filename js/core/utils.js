/* =========================================================================
   Utilitaires génériques (DOM, texte, aléa reproductible, couleurs)
   ========================================================================= */
window.MF = window.MF || {};

MF.util = (() => {
  /** Mot saisi -> lettres de grille : majuscules, sans accents, sans espaces ni tirets. */
  function normalize(text) {
    return String(text || '')
      .replace(/œ/gi, m => (m === 'Œ' ? 'OE' : 'oe'))
      .replace(/æ/gi, m => (m === 'Æ' ? 'AE' : 'ae'))
      .normalize('NFD').replace(/[̀-ͯ]/g, '')
      .toUpperCase()
      .replace(/[^A-Z]/g, '');
  }

  const esc = s => String(s ?? '').replace(/[&<>"']/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch]));

  const uid = () => Math.random().toString(36).slice(2, 10);

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

  /** Empreinte FNV-1a d'une chaîne (détection de mise en page périmée). */
  function hash(str) {
    let h = 0x811c9dc5;
    for (let i = 0; i < str.length; i++) { h ^= str.charCodeAt(i); h = Math.imul(h, 0x01000193); }
    return (h >>> 0).toString(36);
  }

  function hexToRgb(hex) {
    const m = String(hex).replace('#', '').match(/^([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i);
    return m ? [parseInt(m[1], 16), parseInt(m[2], 16), parseInt(m[3], 16)] : [192, 0, 0];
  }

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
    return (...args) => { clearTimeout(t); t = setTimeout(() => fn(...args), ms); };
  }

  const plural = (n, one, many) => `${n} ${n > 1 ? (many || one + 's') : one}`;

  function downloadBlob(filename, blob) {
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = filename;
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(a.href), 1000);
  }

  const download = (filename, content, type = 'application/json') =>
    downloadBlob(filename, new Blob([content], { type: type + ';charset=utf-8' }));

  function readFile(file) {
    return new Promise((resolve, reject) => {
      const r = new FileReader();
      r.onload = () => resolve(r.result);
      r.onerror = () => reject(r.error);
      r.readAsText(file);
    });
  }

  const nextFrame = () => new Promise(r => setTimeout(r, 0));

  return { normalize, esc, uid, rng, hash, hexToRgb, html, $, $$, debounce, plural, download, downloadBlob, readFile, nextFrame };
})();
