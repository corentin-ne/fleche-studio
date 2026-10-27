// @ts-check
/* =========================================================================
   Données préparées dans la page avant le calcul d'un jeu « logique »
   (le worker n'a ni dessin ni univers) :
     - picross : le dessin, en cases pleines / vides, tiré d'un emoji (rendu
       par le navigateur, sans service extérieur), d'une forme, d'un texte ou
       d'une photo de l'utilisateur ;
     - logigramme : les catégories (suspects, lieux, objets, heures) d'un
       univers du Murdoku, dans la langue de la grille.
   ========================================================================= */
window.MF = window.MF || {};

MF.logicInput = (() => {
  const { clamp, shuffle } = MF.util;
  /** Emojis proposés pour un picross : animaux en pied plutôt que leur tête, pour une silhouette reconnaissable. */
  const EMOJIS = ['🐈', '🐕', '🐇', '🐘', '🦒', '🐿️', '🦩', '🐧', '🦉', '🐢', '🐟', '🐙', '🦋', '🐌', '🦕', '🐳', '🌸', '🌻', '🍄', '🌵', '🌲', '🍎', '🍐', '🍓', '🍒', '🧁', '☕', '⭐', '🌙', '☂️', '⛄', '🎄', '🎃', '👻', '🎈', '🎁', '🏠', '🚀', '⛵', '🚲', '✈️', '⚓', '🔑', '💡', '🎸', '👑', '❤️', '✂️'];
  const EMOJI_FONT = '"Apple Color Emoji", "Segoe UI Emoji", "Noto Color Emoji", "Twemoji Mozilla", sans-serif';

  /* ---------------- Picross ---------------- */
  /** Lit les pixels d'un dessin et en fait une grille de w × h cases. */
  function sample(canvas, w, h, detail, opaque) {
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    const { width: CW, height: CH } = canvas;
    const px = ctx.getImageData(0, 0, CW, CH).data;
    const cov = new Float32Array(w * h), lum = new Float32Array(w * h);
    for (let r = 0; r < h; r++) {
      for (let c = 0; c < w; c++) {
        const x0 = Math.floor((c * CW) / w), x1 = Math.max(x0 + 1, Math.floor(((c + 1) * CW) / w));
        const y0 = Math.floor((r * CH) / h), y1 = Math.max(y0 + 1, Math.floor(((r + 1) * CH) / h));
        let a = 0, l = 0, n = 0;
        for (let y = y0; y < y1; y++) {
          for (let x = x0; x < x1; x++) {
            const k = (y * CW + x) * 4, al = px[k + 3] / 255;
            a += al;
            l += al * (0.2126 * px[k] + 0.7152 * px[k + 1] + 0.0722 * px[k + 2]) / 255;
            n++;
          }
        }
        cov[r * w + c] = a / n;
        lum[r * w + c] = a ? l / a : 1;
      }
    }
    // Seuil de clarté : la médiane des cases dessinées (une photo : toutes ses cases)
    const inside = [...cov.keys()].filter(i => opaque || cov[i] > 0.45).map(i => lum[i]).sort((a, b) => a - b);
    const mid = inside.length ? inside[Math.floor(inside.length * (opaque ? 0.5 : 0.55))] : 0.5;
    const on = i => (opaque ? lum[i] < mid : cov[i] > 0.45 && (detail !== 'details' || lum[i] <= mid));
    return Array.from({ length: h }, (_, r) => Array.from({ length: w }, (_, c) => (on(r * w + c) ? '1' : '0')).join(''));
  }

  /** Recadre un dessin (fond transparent) sur ses pixels visibles. */
  function cropped(canvas) {
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    const { width: W, height: H } = canvas;
    const px = ctx.getImageData(0, 0, W, H).data;
    let x0 = W, y0 = H, x1 = -1, y1 = -1;
    for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) if (px[(y * W + x) * 4 + 3] > 40) { x0 = Math.min(x0, x); x1 = Math.max(x1, x); y0 = Math.min(y0, y); y1 = Math.max(y1, y); }
    if (x1 < 0) return null;
    const out = document.createElement('canvas');
    out.width = x1 - x0 + 1; out.height = y1 - y0 + 1;
    out.getContext('2d').drawImage(canvas, x0, y0, out.width, out.height, 0, 0, out.width, out.height);
    return out;
  }

  /** Dessin à la taille voulue : n cases sur le grand côté, le petit suit ses proportions. */
  function fit(canvas, n, detail, opaque = false) {
    const ratio = canvas.width / canvas.height;
    const w = ratio >= 1 ? n : clamp(Math.round(n * ratio), 5, n), h = ratio >= 1 ? clamp(Math.round(n / ratio), 5, n) : n;
    return { rows: sample(canvas, w, h, detail, opaque) };
  }

  function drawText(text, fontCss, color = '#000') {
    const S = 320;
    const c = document.createElement('canvas');
    const ctx = c.getContext('2d');
    ctx.font = `${S}px ${fontCss}`;
    const w = Math.ceil(ctx.measureText(text).width) + S;
    c.width = Math.min(8000, w); c.height = Math.round(S * 1.6);
    const g = c.getContext('2d');
    g.font = `${S}px ${fontCss}`;
    g.textAlign = 'center';
    g.textBaseline = 'middle';
    g.fillStyle = color;
    g.fillText(text, c.width / 2, c.height / 2);
    return cropped(c);
  }

  const loadImage = src => new Promise((resolve, reject) => { const img = new Image(); img.onload = () => resolve(img); img.onerror = reject; img.src = src; });

  /** Dessin d'un picross : { rows: ['0110…', …] } ou null (le moteur prend alors un cœur). */
  async function picture(o) {
    const n = clamp(o.size || 15, 5, 30);
    try {
      if (o.source === 'shape') {
        const m = MF.shapes.mask(o.shape || 'heart', n, n, 0);
        return { rows: Array.from({ length: n }, (_, r) => Array.from({ length: n }, (_, c) => (m[r * n + c] ? '1' : '0')).join('')) };
      }
      if (o.source === 'text') {
        const text = (o.text || 'A').slice(0, 12);
        const canvas = drawText(text, '800 "Inter", "Arial Black", sans-serif');
        return canvas ? fit(canvas, n, 'silhouette') : null;
      }
      if (o.source === 'image' && o.imageId) {
        await MF.assets.ensure([o.imageId]);
        const src = MF.assets.url(o.imageId);
        if (!src) return null;
        const img = await loadImage(src);
        const c = document.createElement('canvas');
        const k = Math.min(1, 600 / Math.max(img.width, img.height));
        c.width = Math.max(1, Math.round(img.width * k)); c.height = Math.max(1, Math.round(img.height * k));
        c.getContext('2d').drawImage(img, 0, 0, c.width, c.height);
        return fit(c, n, 'details', true);
      }
      const canvas = drawText(o.emoji || EMOJIS[0], EMOJI_FONT);
      return canvas ? fit(canvas, n, o.detail) : null;
    } catch { return null; }
  }

  /* ---------------- Logigramme ---------------- */
  // Lieux et objets de la maison (univers sans habillage propre) : textes du Murdoku, dans la langue de la grille
  const HOME_ROOMS = [['Salon', 'dans le salon'], ['Cuisine', 'dans la cuisine'], ['Chambre', 'dans la chambre'], ['Bureau', 'dans le bureau'], ['Bibliothèque', 'dans la bibliothèque'], ['Jardin', 'dans le jardin'], ['Salle de bain', 'dans la salle de bain'], ['Salle à manger', 'dans la salle à manger']];
  const HOME_OBJECTS = [['Lampe', 'une lampe'], ['Piano', 'un piano'], ['Plante', 'une plante'], ['Fauteuil', 'un fauteuil'], ['Tapis', 'un tapis'], ['Armoire', 'une armoire'], ['Fontaine', 'une fontaine'], ['Étagère', 'une étagère']];
  const HOURS = { fr: h => [`${h} h`, `à ${h} h`], en: h => [`${h > 12 ? h - 12 : h} pm`, `at ${h > 12 ? h - 12 : h} pm`] };

  /** Catégories d'un logigramme : [{ kind, name, items: [{ label, ph }] }]. */
  function categories(o, lang) {
    const tr = s => MF.i18n.tr(lang, s);
    const M = clamp(o.size || 4, 3, 5), K = clamp(o.count || 3, 3, 4);
    const th = MF.murdokuThemes.resolve(o.universe || 'manor', lang, {}, MF.util.randomSeed() % 99991 + 1);
    const people = shuffle([...new Set(th.names)]).slice(0, M).map(name => ({ label: name, ph: name }));
    const rooms = Object.values(th.rooms).filter(r => r.name).map(r => ({ label: r.name, ph: r.in || MF.murdokuThemes.where(r.name, lang) }));
    const places = shuffle(rooms.length >= M ? rooms : HOME_ROOMS.map(([n, i]) => ({ label: tr(n), ph: tr(i) }))).slice(0, M);
    const objects = Object.values(th.objects).filter(x => x?.name && x?.a).map(x => ({ label: x.name, ph: x.a }));
    const things = shuffle(objects.length >= M ? objects : HOME_OBJECTS.map(([n, a]) => ({ label: tr(n), ph: tr(a) }))).slice(0, M);
    const start = 17 + Math.floor(Math.random() * 3);
    const hour = HOURS[lang] || HOURS.fr;
    const times = Array.from({ length: M }, (_, i) => { const [label, ph] = hour(start + i); return { label, ph }; });
    const cats = [
      { kind: 'person', name: tr('Suspects'), items: people },
      { kind: 'place', name: tr('Lieux'), items: places },
      { kind: 'thing', name: tr('Objets'), items: things },
      { kind: 'time', name: tr('Heures'), items: times },
    ];
    return cats.slice(0, K);
  }

  /** Options supplémentaires du calcul d'un jeu (à ajouter à MF.paper.gridOptions). */
  async function prepare(pz) {
    const o = MF.logic.settings(pz.game, pz.options.logic);
    if (pz.game === 'picross') return { picture: await picture(o) };
    if (pz.game === 'logigramme') return { cats: categories(o, pz.options.lang) };
    return {};
  }

  return { prepare, picture, categories, EMOJIS };
})();
