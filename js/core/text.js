// @ts-check
/* =========================================================================
   Mesure et mise en forme de texte (partagées par le modèle de grille,
   la mise en page des affiches et les rendus SVG / Canvas).
   ========================================================================= */
window.MF = window.MF || {};

MF.text = (() => {
  let ctx = null;
  const cache = new Map();

  /** Largeur d'un texte (unités = px de la taille donnée). */
  function measure(text, size, family, weight = 600) {
    const k = `${weight}|${family}|${size}|${text}`;
    let w = cache.get(k);
    if (w !== undefined) return w;
    ctx = ctx || document.createElement('canvas').getContext('2d');
    ctx.font = `${weight} ${size}px ${family}`;
    w = ctx.measureText(text).width;
    if (cache.size > 20000) cache.clear();
    cache.set(k, w);
    return w;
  }
  /** À appeler quand une police finit de charger (les mesures changent). */
  const invalidate = () => cache.clear();

  /** Coupe un mot trop long pour la largeur, avec un tiret. */
  function splitLongWord(word, size, maxW, family, weight) {
    const parts = [];
    let cur = '';
    for (const ch of word) {
      if (cur && measure(cur + ch + '-', size, family, weight) > maxW) { parts.push(cur + '-'); cur = ch; } else cur += ch;
    }
    if (cur) parts.push(cur);
    return parts;
  }

  /** Découpe en lignes ; null si un mot ne tient pas et que la césure est interdite. */
  function wrap(text, size, maxW, family, weight, allowSplit = true) {
    const lines = [];
    for (const para of String(text).split(/\n/)) {
      let cur = '';
      for (const raw of para.split(/\s+/).filter(Boolean)) {
        const tooWide = measure(raw, size, family, weight) > maxW;
        if (tooWide && !allowSplit) return null;
        const pieces = tooWide ? splitLongWord(raw, size, maxW, family, weight) : [raw];
        for (const word of pieces) {
          const tryLine = cur ? cur + ' ' + word : word;
          if (!cur || measure(tryLine, size, family, weight) <= maxW) cur = tryLine;
          else { lines.push(cur); cur = word; }
        }
      }
      lines.push(cur);
    }
    while (lines.length && !lines[lines.length - 1]) lines.pop();
    return lines;
  }

  /** Plus grande taille de police (entre min et max) pour laquelle le texte tient dans la boîte. */
  function fit(text, boxW, boxH, { family, weight = 600, lineH = 1.1, max = 17, min = 6.5 } = /** @type {any} */ ({})) {
    const clean = String(text || '').trim();
    if (!clean) return { size: max, lines: [] };
    let best = null;
    // 1er passage sans couper de mot ; 2e passage avec césure forcée en dernier recours.
    for (const allowSplit of [false, true]) {
      for (let size = max; size >= min; size -= 0.5) {
        const lines = wrap(clean, size, boxW, family, weight, allowSplit);
        if (!lines) continue;
        best = { size, lines };
        if (lines.length * size * lineH <= boxH) return best;
      }
    }
    return best;
  }

  return { measure, invalidate, wrap, fit };
})();
