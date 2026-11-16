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
    const n = clamp(o.size || 15, 5, 48);
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

  /* ---------------- Coloriage magique ---------------- */
  /** Dessin en couleurs d'un emoji, d'un texte, d'une forme ou d'une photo (canvas), ou null. */
  async function source(o) {
    if (o.source === 'shape') {
      const n = 200, m = MF.shapes.mask(o.shape || 'heart', 50, 50, 0);
      const c = document.createElement('canvas');
      c.width = c.height = n;
      const g = c.getContext('2d');
      const grad = g.createLinearGradient(0, 0, n, n);
      grad.addColorStop(0, '#ff7a59'); grad.addColorStop(0.5, '#e4405f'); grad.addColorStop(1, '#7b3fe4');
      g.fillStyle = grad;
      for (let i = 0; i < m.length; i++) if (m[i]) g.fillRect((i % 50) * 4, Math.floor(i / 50) * 4, 4, 4);
      return { canvas: cropped(c), opaque: false };
    }
    if (o.source === 'text') return { canvas: drawText((o.text || 'A').slice(0, 12), '800 "Inter", "Arial Black", sans-serif', '#e4405f'), opaque: false };
    if (o.source === 'image' && o.imageId) {
      await MF.assets.ensure([o.imageId]);
      const src = MF.assets.url(o.imageId);
      if (!src) return null;
      const img = await loadImage(src);
      const c = document.createElement('canvas');
      const k = Math.min(1, 600 / Math.max(img.width, img.height));
      c.width = Math.max(1, Math.round(img.width * k)); c.height = Math.max(1, Math.round(img.height * k));
      c.getContext('2d').drawImage(img, 0, 0, c.width, c.height);
      return { canvas: c, opaque: true };
    }
    return { canvas: drawText(o.emoji || EMOJIS[0], EMOJI_FONT), opaque: false };
  }
  /** @type {(c: number[]) => string} */
  const hex = ([r, g, b]) => `#${[r, g, b].map(v => Math.round(MF.util.clamp(v, 0, 255)).toString(16).padStart(2, '0')).join('')}`;
  /**
   * Coloriage : chaque case prend la couleur moyenne de son morceau de dessin, puis les couleurs sont
   * regroupées en k teintes (k-moyennes). Case vide (fond transparent) : '0', blanche.
   * @returns {Promise<{ rows: string[], palette: string[] } | null>}
   */
  async function colors(o) {
    try {
      const src = await source(o);
      if (!src?.canvas) return null;
      const { canvas, opaque } = src;
      const n = clamp(o.size || 20, 8, 40);
      const ratio = canvas.width / canvas.height;
      const w = ratio >= 1 ? n : clamp(Math.round(n * ratio), 6, n), h = ratio >= 1 ? clamp(Math.round(n / ratio), 6, n) : n;
      const ctx = canvas.getContext('2d', { willReadFrequently: true });
      const px = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
      const cells = [];
      for (let r = 0; r < h; r++) {
        for (let c = 0; c < w; c++) {
          const x0 = Math.floor((c * canvas.width) / w), x1 = Math.max(x0 + 1, Math.floor(((c + 1) * canvas.width) / w));
          const y0 = Math.floor((r * canvas.height) / h), y1 = Math.max(y0 + 1, Math.floor(((r + 1) * canvas.height) / h));
          let a = 0, R = 0, G = 0, B = 0, k = 0;
          for (let y = y0; y < y1; y++) for (let x = x0; x < x1; x++) { const i = (y * canvas.width + x) * 4, al = px[i + 3] / 255; a += al; R += px[i] * al; G += px[i + 1] * al; B += px[i + 2] * al; k++; }
          cells.push(opaque || a / k > 0.5 ? [R / a, G / a, B / a] : null);
        }
      }
      const K = { easy: 4, medium: 6, hard: 8, expert: 10 }[o.level] || 6;
      const pts = cells.filter(Boolean);
      if (pts.length < 4) return null;
      // k-moyennes (départ : couleurs éloignées les unes des autres)
      const d2 = (p, q) => (p[0] - q[0]) ** 2 + (p[1] - q[1]) ** 2 + (p[2] - q[2]) ** 2;
      const centers = [pts[Math.floor(pts.length / 2)]];
      while (centers.length < Math.min(K, pts.length)) centers.push(pts.reduce((best, p) => (Math.min(...centers.map(c => d2(c, p))) > Math.min(...centers.map(c => d2(c, best))) ? p : best), pts[0]));
      const label = new Array(pts.length).fill(0);
      for (let it = 0; it < 12; it++) {
        pts.forEach((p, i) => { let b = 0; centers.forEach((c, j) => { if (d2(c, p) < d2(centers[b], p)) b = j; }); label[i] = b; });
        centers.forEach((c, j) => { const mine = pts.filter((_, i) => label[i] === j); if (mine.length) centers[j] = [0, 1, 2].map(k => mine.reduce((s, p) => s + p[k], 0) / mine.length); });
      }
      // Couleurs utilisées seulement, de la plus claire à la plus foncée
      const lum = c => 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
      const used = [...new Set(label)].sort((a, b) => lum(centers[b]) - lum(centers[a]));
      const index = new Map(used.map((j, k) => [j, k + 1]));
      let q = 0;
      const codes = cells.map(c => (c ? index.get(label[q++]).toString(36).toUpperCase() : '0'));
      return {
        rows: Array.from({ length: h }, (_, r) => codes.slice(r * w, r * w + w).join('')),
        palette: ['#ffffff', ...used.map(j => hex(centers[j]))],
      };
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

  /* ---------------- 7 différences ---------------- */
  /** Décor d'un univers du Murdoku : couleurs des sols, meubles (emoji), couleurs des personnages, murs. */
  function scene(o) {
    const th = MF.murdokuThemes.resolve(o.universe || 'manor', 'fr');
    const rooms = th.roomTypes.map(type => th.rooms[type]).filter(Boolean);
    const floors = [...new Set(rooms.flatMap(r => [r.floor?.[1], r.floor?.[2]]).filter(c => /^#[0-9a-f]{6}$/i.test(c || '')))].slice(0, 12);
    const icons = [...new Set(Object.values({ ...MF.murdokuView.ICONS, ...th.icons }).filter(x => typeof x === 'string' && x.length <= 12))].slice(0, 40);
    return { floors, icons, people: MF.murdoku.COLORS.slice(), wall: rooms.find(r => /^#[0-9a-f]{6}$/i.test(r.wall || ''))?.wall || '#5a4636' };
  }

  /** Options supplémentaires du calcul d'un jeu (à ajouter à MF.paper.gridOptions). */
  async function prepare(pz) {
    const o = MF.logic.settings(pz.game, pz.options.logic);
    if (pz.game === 'picross' || pz.game === 'mosaique') return { picture: await picture(o) };
    // Points à relier : dessin fin (48 cases), seul son contour compte
    if (pz.game === 'points') return { picture: await picture({ ...o, size: 48, detail: 'silhouette' }) };
    if (pz.game === 'coloriage') return { colors: await colors(o) };
    if (pz.game === 'differences') return { scene: scene(o) };
    if (pz.game === 'logigramme') return { cats: categories(o, pz.options.lang) };
    return {};
  }

  return { prepare, picture, categories, EMOJIS };
})();
