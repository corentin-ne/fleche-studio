// @ts-check
/* =========================================================================
   Fonds d'affiche : uni, dégradés, halos, motifs, image.
   Produit des opérations de dessin (voir MF.renderers) : le même fond est
   dessiné à l'identique à l'écran (SVG) et à l'export (SVG / PNG).
   ========================================================================= */
window.MF = window.MF || {};

MF.backgrounds = (() => {
  const { t } = MF.i18n;
  const TYPES = {
    none: t('Transparent'), solid: t('Uni'), gradient: t('Dégradé'), radial: t('Halo'), mesh: t('Aurore'), pattern: t('Motif'), image: t('Image'),
  };

  /* Motifs : tuile de w × h unités, `a` = couleur du motif, `b` = 2e couleur. Le fond (c1) est peint dessous. */
  /** Cœur de largeur s, centré horizontalement en x, pointe en bas. */
  const heart = (x, y, s) => {
    const l = x - s / 2, f = v => v.toFixed(1);
    return `M${f(x)} ${f(y + s * 0.9)}C${f(l - s * 0.2)} ${f(y + s * 0.35)} ${f(l + s * 0.15)} ${f(y - s * 0.1)} ${f(x)} ${f(y + s * 0.25)}C${f(l + s * 0.85)} ${f(y - s * 0.1)} ${f(l + s * 1.2)} ${f(y + s * 0.35)} ${f(x)} ${f(y + s * 0.9)}Z`;
  };
  const starPath = (cx, cy, R) => 'M' + Array.from({ length: 10 }, (_, i) => {
    const ang = -Math.PI / 2 + (i * Math.PI) / 5, r = i % 2 ? R * 0.45 : R;
    return `${(cx + Math.cos(ang) * r).toFixed(1)} ${(cy + Math.sin(ang) * r).toFixed(1)}`;
  }).join('L') + 'Z';
  /** Chauve-souris dans une boîte 100 × 100 (motif « Chauves-souris » et sticker). */
  const BAT = 'M50 36C46 36 44 38 43 41 36 32 20 28 4 34c8 4 10 12 8 20 8-4 16-2 20 4 3-6 9-8 13-4 1 4 3 8 5 10 2-2 4-6 5-10 4-4 10-2 13 4 4-6 12-8 20-4-2-8 0-16 8-20-16-6-32-2-39 7-1-3-3-5-7-5ZM44 39l1-9 5 5 5-5 1 9Z';

  /** Œuf de hauteur ~1,75 s, centré en (x, y). */
  const egg = (x, y, s) => `M${x} ${y - s}C${x + s * 0.75} ${y - s} ${x + s * 0.8} ${y + s * 0.75} ${x} ${y + s * 0.75}C${x - s * 0.8} ${y + s * 0.75} ${x - s * 0.75} ${y - s} ${x} ${y - s}Z`;
  /** Lanterne chinoise (corps `a`, attaches et pompon `b`) dans une boîte d'environ 30 × 50 en (x, y). */
  const lantern = (x, y, a, b) => `<g transform="translate(${x} ${y})"><path d="M15 0V8M15 40v10" stroke="${b}" stroke-width="2"/><rect x="9" y="8" width="12" height="4" rx="1" fill="${b}"/><ellipse cx="15" cy="24" rx="15" ry="13" fill="${a}"/><path d="M15 11v26M7 13c-4 6-4 16 0 22M23 13c4 6 4 16 0 22" stroke="${b}" stroke-width="1" fill="none" opacity=".7"/><rect x="9" y="36" width="12" height="4" rx="1" fill="${b}"/></g>`;

  const PATTERNS = {
    dots: { label: t('Pois'), tile: a => ({ w: 40, h: 40, svg: `<circle cx="20" cy="20" r="4.5" fill="${a}"/>` }) },
    polka: { label: t('Gros pois'), tile: (a, b) => ({ w: 70, h: 70, svg: `<circle cx="17" cy="17" r="9" fill="${a}"/><circle cx="52" cy="52" r="9" fill="${b}"/>` }) },
    grid: { label: t('Quadrillage'), tile: a => ({ w: 40, h: 40, svg: `<path d="M40 0H0V40" fill="none" stroke="${a}" stroke-width="2"/>` }) },
    notebook: { label: t('Cahier'), tile: (a, b) => ({ w: 40, h: 40, svg: `<path d="M0 39.5H40" stroke="${a}" stroke-width="1.6"/><path d="M0 19.5H40M19.5 0V40M39.5 0V40" stroke="${b}" stroke-width="0.8" opacity=".6"/>` }) },
    stripes: { label: t('Rayures'), tile: a => ({ w: 30, h: 30, svg: `<path d="M-8 8L8 -8M0 30L30 0M22 38L38 22" stroke="${a}" stroke-width="7"/>` }) },
    lines: { label: t('Lignes|motif'), tile: a => ({ w: 30, h: 30, svg: `<rect y="13" width="30" height="4" fill="${a}"/>` }) },
    checker: { label: t('Damier'), tile: a => ({ w: 50, h: 50, svg: `<rect width="25" height="25" fill="${a}"/><rect x="25" y="25" width="25" height="25" fill="${a}"/>` }) },
    gingham: { label: t('Vichy'), tile: a => ({ w: 40, h: 40, svg: `<rect width="20" height="40" fill="${a}" opacity=".45"/><rect width="40" height="20" fill="${a}" opacity=".45"/>` }) },
    zigzag: { label: t('Zigzag'), tile: a => ({ w: 40, h: 24, svg: `<polyline points="0,18 10,6 20,18 30,6 40,18" fill="none" stroke="${a}" stroke-width="3.5" stroke-linejoin="round"/>` }) },
    waves: { label: t('Vagues'), tile: a => ({ w: 60, h: 30, svg: `<path d="M0 15Q15 3 30 15T60 15" fill="none" stroke="${a}" stroke-width="3.5"/>` }) },
    hearts: { label: t('Cœurs'), tile: (a, b) => ({ w: 60, h: 60, svg: `<path d="${heart(15, 8, 18)}" fill="${a}"/><path d="${heart(45, 38, 18)}" fill="${b}"/>` }) },
    stars: { label: t('Étoiles'), tile: (a, b) => ({ w: 70, h: 70, svg: `<path d="${starPath(18, 18, 10)}" fill="${a}"/><path d="${starPath(52, 52, 7)}" fill="${b}"/><circle cx="52" cy="14" r="2" fill="${a}"/><circle cx="16" cy="54" r="2" fill="${b}"/>` }) },
    confetti: {
      label: t('Confettis'),
      tile: (a, b) => ({
        w: 120, h: 120,
        svg: [[12, 18, 25, a], [58, 10, -30, b], [96, 30, 60, a], [30, 62, -50, b], [78, 70, 15, a], [108, 96, -20, b], [18, 104, 70, a], [62, 108, 35, b]]
          .map(([x, y, r, col], i) => (i % 3 === 2 ? `<circle cx="${x}" cy="${y}" r="4" fill="${col}"/>` : `<rect x="${x - 7}" y="${y - 2.5}" width="14" height="5" rx="2" fill="${col}" transform="rotate(${r} ${x} ${y})"/>`)).join(''),
      }),
    },
    triangles: { label: t('Triangles'), tile: (a, b) => ({ w: 40, h: 36, svg: `<polygon points="0,36 20,0 40,36" fill="${a}" opacity=".5"/><polygon points="20,36 30,18 40,36" fill="${b}" opacity=".6"/>` }) },
    plus: { label: t('Croix'), tile: a => ({ w: 40, h: 40, svg: `<path d="M20 13v14M13 20h14" stroke="${a}" stroke-width="3.5" stroke-linecap="round"/>` }) },
    rings: { label: t('Anneaux'), tile: a => ({ w: 50, h: 50, svg: `<circle cx="25" cy="25" r="12" fill="none" stroke="${a}" stroke-width="3"/>` }) },
    diamonds: { label: t('Losanges'), tile: a => ({ w: 40, h: 40, svg: `<polygon points="20,5 35,20 20,35 5,20" fill="${a}"/>` }) },
    scales: { label: t('Écailles'), tile: a => ({ w: 40, h: 20, svg: `<path d="M0 20a20 20 0 0 1 40 0M-20 0a20 20 0 0 1 40 0M20 0a20 20 0 0 1 40 0" fill="none" stroke="${a}" stroke-width="2.5"/>` }) },
    bubbles: { label: t('Bulles'), tile: (a, b) => ({ w: 100, h: 100, svg: `<circle cx="22" cy="24" r="14" fill="${a}" opacity=".55"/><circle cx="70" cy="40" r="8" fill="${b}" opacity=".7"/><circle cx="48" cy="80" r="18" fill="${b}" opacity=".35"/><circle cx="90" cy="88" r="5" fill="${a}" opacity=".8"/>` }) },
    terrazzo: {
      label: t('Terrazzo'),
      tile: (a, b) => ({ w: 120, h: 120, svg: `<path d="M14 20l12-6 6 10-10 6Z" fill="${a}"/><path d="M70 14l14 3-4 12-12-4Z" fill="${b}"/><path d="M98 60l10 8-8 8-8-6Z" fill="${a}"/><path d="M40 70l10-4 6 12-12 2Z" fill="${b}"/><path d="M14 98l9 2-2 10-9-3Z" fill="${a}"/><path d="M78 100l12-2 2 10-12 2Z" fill="${b}"/><circle cx="56" cy="40" r="3" fill="${a}"/><circle cx="104" cy="22" r="2.5" fill="${b}"/><circle cx="24" cy="58" r="2.5" fill="${b}"/>` }),
    },
    bats: {
      label: t('Chauves-souris'),
      tile: (a, b) => ({ w: 100, h: 100, svg: `<path transform="translate(4 8) scale(.38)" d="${BAT}" fill="${a}"/><path transform="translate(54 56) scale(.28) rotate(-12 50 50)" d="${BAT}" fill="${a}"/><path d="M82 12a10 10 0 1 0 8 17 8 8 0 1 1-8-17Z" fill="${b}"/><circle cx="22" cy="78" r="2" fill="${b}"/><circle cx="92" cy="92" r="1.5" fill="${b}"/><circle cx="58" cy="30" r="1.5" fill="${b}"/>` }),
    },
    eggs: {
      label: t('Œufs'),
      tile: (a, b) => ({ w: 80, h: 80, svg: `<path d="${egg(20, 24, 13)}" fill="${a}"/><polyline points="10,26 15,22 20,26 25,22 30,26" fill="none" stroke="#ffffff" stroke-width="2" stroke-linejoin="round" opacity=".75"/><path d="${egg(60, 62, 11)}" fill="${b}"/><circle cx="56" cy="60" r="1.8" fill="#ffffff" opacity=".8"/><circle cx="64" cy="64" r="1.8" fill="#ffffff" opacity=".8"/><circle cx="60" cy="18" r="2.2" fill="${b}"/><circle cx="18" cy="64" r="2" fill="${a}"/>` }),
    },
    harlequin: {
      label: t('Arlequin'),
      tile: (a, b) => ({ w: 60, h: 80, svg: `<polygon points="30,0 60,40 30,80 0,40" fill="${a}"/><polygon points="30,0 60,40 30,80 0,40" fill="none" stroke="${b}" stroke-width="1.5" opacity=".6"/><circle cx="0" cy="0" r="3" fill="${b}"/><circle cx="60" cy="0" r="3" fill="${b}"/><circle cx="0" cy="80" r="3" fill="${b}"/><circle cx="60" cy="80" r="3" fill="${b}"/><circle cx="30" cy="40" r="2" fill="${b}"/>` }),
    },
    lanterns: {
      label: t('Lanternes'),
      tile: (a, b) => ({ w: 100, h: 110, svg: `${lantern(8, 4, a, b)}<g transform="translate(56 56) scale(.75)">${lantern(0, 0, a, b)}</g><circle cx="80" cy="22" r="2" fill="${b}"/><circle cx="20" cy="88" r="2.4" fill="${b}"/><circle cx="92" cy="98" r="1.5" fill="${b}"/>` }),
    },
    memphis: {
      label: t('Memphis'),
      tile: (a, b) => ({ w: 140, h: 140, svg: `<path d="M10 30q10-14 20 0t20 0" fill="none" stroke="${a}" stroke-width="4" stroke-linecap="round"/><circle cx="100" cy="25" r="10" fill="none" stroke="${b}" stroke-width="4"/><polygon points="30,90 48,120 12,120" fill="${b}"/><path d="M85 85l20 20M105 85l-20 20" stroke="${a}" stroke-width="4" stroke-linecap="round"/><rect x="60" y="50" width="14" height="14" fill="${a}" transform="rotate(20 67 57)"/><circle cx="125" cy="120" r="4" fill="${b}"/>` }),
    },
  };

  /** Hachures fines (zones vides des grilles). */
  const hatch = color => ({ w: 16, h: 16, svg: `<path d="M-4 4L4 -4M0 16L16 0M12 20L20 12" stroke="${color}" stroke-width="2.2"/>` });

  function tile(id, a, b) {
    return (PATTERNS[id] || PATTERNS.dots).tile(a, b);
  }

  /** Vignette CSS d'un motif (aperçu dans les réglages). */
  function thumb(id, bg, a, b) {
    const t = tile(id, a, b);
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${t.w}" height="${t.h}" viewBox="0 0 ${t.w} ${t.h}"><rect width="100%" height="100%" fill="${bg}"/>${t.svg}</svg>`;
    return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
  }

  /** Dégradé linéaire orienté (angle CSS : 0 = vers le haut, 90 = vers la droite) sur un rectangle. */
  function linear(angle, x, y, w, h, stops) {
    const a = (angle * Math.PI) / 180;
    const dx = Math.sin(a), dy = -Math.cos(a);
    const half = Math.abs((w / 2) * dx) + Math.abs((h / 2) * dy);
    const cx = x + w / 2, cy = y + h / 2;
    return { type: 'linear', x1: cx - dx * half, y1: cy - dy * half, x2: cx + dx * half, y2: cy + dy * half, stops };
  }

  /**
   * Opérations de dessin du fond d'un rectangle (x, y, w, h).
   * @param {any} bg
   * @param {number} x
   * @param {number} y
   * @param {number} w
   * @param {number} h
   * @param {{ assetUrl?: (id: string) => string | null, radius?: number }} [o]  assetUrl : id d'image -> URL utilisable (objet URL à l'écran, data URL à l'export)
   * @returns {any[]}
   */
  function ops(bg, x, y, w, h, { assetUrl, radius = 0 } = /** @type {any} */ ({})) {
    const rect = fill => ({ op: 'rect', x, y, w, h, r: radius, fill });
    switch (bg.type) {
      case 'none': return [];
      case 'gradient': return [rect(linear(bg.angle, x, y, w, h, [[0, bg.c1], [0.55, bg.c2], [1, bg.c3]]))];
      case 'radial': return [rect({ type: 'radial', cx: x + w / 2, cy: y + h * 0.42, r: Math.hypot(w, h) * 0.6, stops: [[0, bg.c1], [1, bg.c2]] })];
      case 'mesh': {
        const R = Math.max(w, h);
        const blob = (fx, fy, k, c) => ({ op: 'rect', x, y, w, h, r: radius, fill: { type: 'radial', cx: x + w * fx, cy: y + h * fy, r: R * k, stops: [[0, c, 0.95], [1, c, 0]] } });
        return [rect(bg.c1), blob(0.12, 0.1, 0.7, bg.c2), blob(0.92, 0.85, 0.75, bg.c3), blob(0.85, 0.08, 0.45, MF.util.mix(bg.c2, bg.c3, 0.5)), blob(0.1, 0.95, 0.4, bg.c3)];
      }
      case 'pattern': return [rect(bg.c1), rect({ type: 'pattern', pattern: bg.pattern, a: bg.c2, b: bg.c3, scale: bg.scale })];
      case 'image': {
        const src = bg.imageId && assetUrl?.(bg.imageId);
        /** @type {any[]} */
        const out = [rect(bg.c1)];
        if (src) out.push({ op: 'image', x, y, w, h, src, fit: bg.fit, opacity: bg.imageOpacity, r: radius });
        if (bg.overlayOpacity > 0) out.push({ ...rect(bg.overlay), opacity: bg.overlayOpacity });
        return out;
      }
      default: return [rect(bg.c1)];
    }
  }

  /**
   * Équivalent CSS (approché) d'un fond : vignettes de thèmes, construction en direct.
   * @param {any} bg
   * @param {{ none?: string, tile?: number, assetUrl?: (id: string) => string | null }} [o]
   *   none : rendu du fond transparent ; tile : taille d'affichage d'une tuile de motif (px)
   */
  function css(bg, { none = 'transparent', tile: size = 24, assetUrl } = /** @type {any} */ ({})) {
    switch (bg.type) {
      case 'none': return none;
      case 'pattern': return `${thumb(bg.pattern, bg.c1, bg.c2, bg.c3)} 0 0 / ${Math.round(size * bg.scale)}px auto, ${bg.c1}`;
      case 'gradient': return `linear-gradient(${bg.angle}deg, ${bg.c1}, ${bg.c2} 55%, ${bg.c3})`;
      case 'mesh': return `radial-gradient(circle at 12% 10%, ${bg.c2}, transparent 60%), radial-gradient(circle at 92% 85%, ${bg.c3}, transparent 60%), ${bg.c1}`;
      case 'radial': return `radial-gradient(circle at 50% 42%, ${bg.c1}, ${bg.c2})`;
      case 'image': {
        const src = bg.imageId && assetUrl?.(bg.imageId);
        const veil = bg.overlayOpacity > 0 ? `linear-gradient(color-mix(in srgb, ${bg.overlay} ${Math.round(bg.overlayOpacity * 100)}%, transparent) 0 0), ` : '';
        return `${veil}${src ? `url("${src}") center / ${bg.fit === 'tile' ? 'auto' : bg.fit} ${bg.fit === 'tile' ? 'repeat' : 'no-repeat'}, ` : ''}${bg.c1}`;
      }
      default: return bg.c1;
    }
  }

  return { TYPES, PATTERNS, BAT, tile, hatch, thumb, css, ops, linear };
})();
