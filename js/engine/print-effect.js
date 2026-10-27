// @ts-check
/* =========================================================================
   Effet « impression art-book » des affiches (option du design) : le même
   rendu que les plateaux Murdoku en 3D, en 2D. Trame de points (similigravure),
   clichés de couleur légèrement décalés, papier crème, grain et fibres.

   Un seul filtre SVG sert partout, en unités de l'affiche : à l'écran (affiche
   SVG vivante), dans l'export SVG et l'impression, et pour les exports PNG /
   JPEG (image dessinée puis filtrée de la même façon). Ce qu'on voit est ce
   qu'on exporte, à toutes les tailles.

   Les textes ne passent jamais dans le filtre : ils sont redessinés nets
   par-dessus (« aplat » d'encre), sinon la trame les rendrait illisibles.
   ========================================================================= */
window.MF = window.MF || {};

MF.printEffect = (() => {
  const PAPER = [0.965, 0.933, 0.859]; // #f6eedb, le papier des plateaux Murdoku

  /** Intensité de l'effet (0 = coupé) d'après le design. */
  const strengthOf = d => (d?.print?.on ? d.print.strength : 0);

  /**
   * Réglages pour une affiche W×H : tout est proportionnel à sa taille, pour que
   * la trame ait la même allure à l'écran, en export et en grand format.
   * @param {number} W
   * @param {number} H
   * @param {number} k  intensité 0..1
   */
  function params(W, H, k) {
    const dot = Math.max(W, H) / 260; // pas de la trame
    return {
      dot,
      shift: dot * 0.3 * (0.4 + k), // décalage des clichés
      halftone: 0.3 + 0.45 * k, // part de la trame dans la couleur
      paper: 0.35 + 0.5 * k,
      grain: 0.04 + 0.06 * k,
      saturation: 1 + 0.1 * k,
    };
  }

  const f = (/** @type {number} */ v) => (Math.round(v * 1000) / 1000).toString();

  /**
   * Trame de points sur toute l'affiche (motif SVG : raccords invisibles à tous
   * les zooms). Valeur = part de la case couverte par un point de ce rayon
   * (π·r²/d²) : la surface encrée suit ainsi la quantité d'encre.
   */
  function screen(W, H, d) {
    const R = 0.71; // rayon du dégradé (fraction du pas), jusqu'aux coins
    const stops = [0, 0.2, 0.4, 0.6, 0.8, 1].map(o => {
      const v = Math.round(Math.min(0.97, Math.PI * (o * R) ** 2) * 255);
      return `<stop offset="${o}" stop-color="rgb(${v},${v},${v})"/>`;
    }).join('');
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${f(W)}" height="${f(H)}" viewBox="0 0 ${f(W)} ${f(H)}"><defs>`
      + `<radialGradient id="g" cx="50%" cy="50%" r="71%">${stops}</radialGradient>`
      + `<pattern id="p" patternUnits="userSpaceOnUse" width="${f(d)}" height="${f(d)}"><rect width="${f(d)}" height="${f(d)}" fill="url(#g)"/></pattern>`
      + `</defs><rect width="100%" height="100%" fill="url(#p)"/></svg>`;
    return `data:image/svg+xml;base64,${btoa(svg)}`;
  }

  /** Identifiant propre à des réglages (plusieurs affiches dans la même page). */
  const idFor = (W, H, k) => `mfx-${MF.util.hash(`${f(W)}x${f(H)}@${f(k)}`)}`;

  /**
   * Définition <filter> pour une affiche W×H.
   * @param {string} id
   * @param {number} W
   * @param {number} H
   * @param {number} k  intensité 0..1
   * @param {{ y: number, h: number }} [band]  zone filtrée (export en bandes), toute l'affiche sinon
   */
  function filter(id, W, H, k, band = { y: 0, h: H }) {
    const p = params(W, H, k);
    const [pr, pg, pb] = PAPER.map(c => 1 - (1 - c) * p.paper);
    const h = p.halftone * 0.72;
    return `<filter id="${id}" filterUnits="userSpaceOnUse" primitiveUnits="userSpaceOnUse" x="0" y="${f(band.y)}" width="${f(W)}" height="${f(band.h)}" color-interpolation-filters="sRGB">`
      // clichés imprimés un peu à côté : le rouge et le vert sont repris décalés
      // (franges colorées aux bords, teintes inchangées à l'intérieur des formes)
      + `<feOffset in="SourceGraphic" dx="${f(-p.shift * 0.4)}" dy="${f(p.shift * 0.8)}" result="cs"/>`
      + `<feOffset in="SourceGraphic" dx="${f(p.shift)}" dy="${f(-p.shift * 0.6)}" result="ms"/>`
      + '<feColorMatrix in="cs" type="matrix" values="1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0" result="pr"/>'
      + '<feColorMatrix in="ms" type="matrix" values="0 0 0 0 0  0 1 0 0 0  0 0 0 0 0  0 0 0 1 0" result="pg"/>'
      + '<feColorMatrix in="SourceGraphic" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 1 0 0  0 0 0 1 0" result="pb"/>'
      + '<feComposite in="pr" in2="pg" operator="arithmetic" k2="1" k3="1" result="rg"/>'
      + '<feComposite in="rg" in2="pb" operator="arithmetic" k2="1" k3="1" result="reg"/>'
      + `<feColorMatrix in="reg" type="saturate" values="${f(p.saturation)}" result="sat"/>`
      // trame de points : chaque couche de couleur devient des points plus ou moins gros
      + `<feImage href="${screen(W, H, p.dot)}" x="0" y="0" width="${f(W)}" height="${f(H)}" preserveAspectRatio="none" result="tiles"/>`
      // encré là où (couleur + trame) < 1 ; calcul décalé de moitié (le filtre ramène tout négatif à 0)
      + '<feComposite in="sat" in2="tiles" operator="arithmetic" k2="0.5" k3="0.5" result="ht0"/>'
      + `<feComponentTransfer in="ht0" result="ht">${['R', 'G', 'B'].map(c => `<feFunc${c} type="linear" slope="28" intercept="-13"/>`).join('')}</feComponentTransfer>`
      // l'encre « boit » un peu dans le papier : trame mêlée au ton continu
      + `<feComposite in="ht" in2="sat" operator="arithmetic" k2="${f(h)}" k3="${f(1 - h)}" result="mix"/>`
      + `<feColorMatrix in="mix" type="matrix" values="${f(pr)} 0 0 0 0  0 ${f(pg)} 0 0 0  0 0 ${f(pb)} 0 0  0 0 0 1 0" result="paper"/>`
      // grain et fibres du papier
      + `<feTurbulence type="fractalNoise" baseFrequency="${f(1 / (p.dot * 0.35))}" numOctaves="1" seed="7" result="n0"/>`
      + `<feTurbulence type="fractalNoise" baseFrequency="${f(1 / (p.dot * 6))} ${f(1 / (p.dot * 2))}" numOctaves="2" seed="3" result="n1"/>`
      + '<feComposite in="n0" in2="n1" operator="arithmetic" k2="0.5" k3="0.5" result="n2"/>'
      + '<feColorMatrix in="n2" type="matrix" values="0.33 0.33 0.33 0 0  0.33 0.33 0.33 0 0  0.33 0.33 0.33 0 0  0 0 0 0 1" result="noise"/>'
      + `<feComposite in="paper" in2="noise" operator="arithmetic" k2="1" k3="${f(p.grain)}" k4="${f(-p.grain / 2)}" result="grain"/>`
      // la transparence de l'affiche est gardée telle quelle
      + '<feComposite in="grain" in2="SourceGraphic" operator="in"/>'
      + '</filter>';
  }

  /** Une opération (ou son contenu) est-elle du texte ? */
  const isText = o => o.op === 'text';

  /** Garde, dans un arbre d'opérations, celles qui vérifient `keep` (les groupes sont conservés s'ils en contiennent). */
  function prune(ops, keep) {
    const out = [];
    for (const o of ops) {
      if (o.op === 'group') {
        const children = prune(o.children, keep);
        if (children.length) out.push({ ...o, children });
      } else if (keep(o)) out.push(o);
    }
    return out;
  }

  /**
   * Découpe une scène en couches : décor filtré, puis textes nets, dans l'ordre
   * du dessin. Une nouvelle couche commence au décor posé au-dessus de la grille
   * (stickers « au premier plan »), pour qu'il continue de couvrir les textes.
   * @param {any[]} ops
   * @returns {{ art: any[], text: any[] }[]}
   */
  function layers(ops) {
    const runs = [];
    for (const o of ops) {
      const top = !!o.top;
      if (!runs.length || runs[runs.length - 1].top !== top) runs.push({ top, ops: [] });
      runs[runs.length - 1].ops.push(o);
    }
    return runs.map(r => ({ art: prune(r.ops, o => !isText(o)), text: prune(r.ops, isText) }));
  }

  const loadSvg = markup => new Promise(resolve => {
    const url = URL.createObjectURL(new Blob([markup], { type: 'image/svg+xml' }));
    const im = new Image();
    im.onload = () => { URL.revokeObjectURL(url); resolve(im); };
    im.onerror = () => { URL.revokeObjectURL(url); resolve(null); };
    im.src = url;
  });

  /** Pixels filtrés à la fois : les grands exports sont traités par bandes (mémoire du navigateur). */
  const BAND_PIXELS = 4e6;

  /**
   * Applique l'effet à une image déjà dessinée (export PNG / JPEG) : même filtre,
   * dans une affiche SVG qui ne contient que cette image. Le grain et la trame
   * dépendent de la position sur l'affiche : les bandes se raccordent sans couture.
   * @param {HTMLCanvasElement} cv
   * @param {number} W  largeur de l'affiche (unités)
   * @param {number} H
   * @param {number} k
   * @returns {Promise<HTMLCanvasElement>}
   */
  async function apply(cv, W, H, k) {
    const src = cv.toDataURL('image/png');
    const out = document.createElement('canvas');
    out.width = cv.width;
    out.height = cv.height;
    const g = out.getContext('2d');
    const bands = Math.max(1, Math.ceil((cv.width * cv.height) / BAND_PIXELS));
    const margin = params(W, H, k).dot * 2; // les clichés décalés débordent un peu d'une bande à l'autre
    for (let i = 0; i < bands; i++) {
      const y0 = Math.round((i * cv.height) / bands), y1 = Math.round(((i + 1) * cv.height) / bands);
      const uy = (y0 / cv.height) * H, uh = ((y1 - y0) / cv.height) * H;
      const id = `${idFor(W, H, k)}-${i}`;
      const markup = `<svg xmlns="http://www.w3.org/2000/svg" width="${cv.width}" height="${y1 - y0}" viewBox="0 ${f(uy)} ${f(W)} ${f(uh)}" preserveAspectRatio="none">`
        + `<defs>${filter(id, W, H, k, { y: uy - margin, h: uh + margin * 2 })}</defs>`
        + `<image href="${src}" x="0" y="0" width="${f(W)}" height="${f(H)}" preserveAspectRatio="none" filter="url(#${id})"/></svg>`;
      const img = await loadSvg(markup);
      if (!img) return cv; // navigateur sans filtres SVG en image : export sans l'effet
      g.drawImage(img, 0, y0, cv.width, y1 - y0);
    }
    return out;
  }

  return { strengthOf, params, filter, idFor, layers, apply, PAPER };
})();
