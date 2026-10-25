/* =========================================================================
   Fonds d'affiche : uni, dégradés, halos, motifs, image.
   Produit des opérations de dessin (voir MF.renderers) : le même fond est
   dessiné à l'identique à l'écran (SVG) et à l'export (SVG / PNG).
   ========================================================================= */
window.MF = window.MF || {};

MF.backgrounds = (() => {
  const TYPES = {
    none: 'Transparent', solid: 'Uni', gradient: 'Dégradé', radial: 'Halo', mesh: 'Aurore', pattern: 'Motif', image: 'Image',
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

  const PATTERNS = {
    dots: { label: 'Pois', tile: a => ({ w: 40, h: 40, svg: `<circle cx="20" cy="20" r="4.5" fill="${a}"/>` }) },
    polka: { label: 'Gros pois', tile: (a, b) => ({ w: 70, h: 70, svg: `<circle cx="17" cy="17" r="9" fill="${a}"/><circle cx="52" cy="52" r="9" fill="${b}"/>` }) },
    grid: { label: 'Quadrillage', tile: a => ({ w: 40, h: 40, svg: `<path d="M40 0H0V40" fill="none" stroke="${a}" stroke-width="2"/>` }) },
    notebook: { label: 'Cahier', tile: (a, b) => ({ w: 40, h: 40, svg: `<path d="M0 39.5H40" stroke="${a}" stroke-width="1.6"/><path d="M0 19.5H40M19.5 0V40M39.5 0V40" stroke="${b}" stroke-width="0.8" opacity=".6"/>` }) },
    stripes: { label: 'Rayures', tile: a => ({ w: 30, h: 30, svg: `<path d="M-8 8L8 -8M0 30L30 0M22 38L38 22" stroke="${a}" stroke-width="7"/>` }) },
    lines: { label: 'Lignes', tile: a => ({ w: 30, h: 30, svg: `<rect y="13" width="30" height="4" fill="${a}"/>` }) },
    checker: { label: 'Damier', tile: a => ({ w: 50, h: 50, svg: `<rect width="25" height="25" fill="${a}"/><rect x="25" y="25" width="25" height="25" fill="${a}"/>` }) },
    gingham: { label: 'Vichy', tile: a => ({ w: 40, h: 40, svg: `<rect width="20" height="40" fill="${a}" opacity=".45"/><rect width="40" height="20" fill="${a}" opacity=".45"/>` }) },
    zigzag: { label: 'Zigzag', tile: a => ({ w: 40, h: 24, svg: `<polyline points="0,18 10,6 20,18 30,6 40,18" fill="none" stroke="${a}" stroke-width="3.5" stroke-linejoin="round"/>` }) },
    waves: { label: 'Vagues', tile: a => ({ w: 60, h: 30, svg: `<path d="M0 15Q15 3 30 15T60 15" fill="none" stroke="${a}" stroke-width="3.5"/>` }) },
    hearts: { label: 'Cœurs', tile: (a, b) => ({ w: 60, h: 60, svg: `<path d="${heart(15, 8, 18)}" fill="${a}"/><path d="${heart(45, 38, 18)}" fill="${b}"/>` }) },
    stars: { label: 'Étoiles', tile: (a, b) => ({ w: 70, h: 70, svg: `<path d="${starPath(18, 18, 10)}" fill="${a}"/><path d="${starPath(52, 52, 7)}" fill="${b}"/><circle cx="52" cy="14" r="2" fill="${a}"/><circle cx="16" cy="54" r="2" fill="${b}"/>` }) },
    confetti: {
      label: 'Confettis',
      tile: (a, b) => ({
        w: 120, h: 120,
        svg: [[12, 18, 25, a], [58, 10, -30, b], [96, 30, 60, a], [30, 62, -50, b], [78, 70, 15, a], [108, 96, -20, b], [18, 104, 70, a], [62, 108, 35, b]]
          .map(([x, y, r, col], i) => (i % 3 === 2 ? `<circle cx="${x}" cy="${y}" r="4" fill="${col}"/>` : `<rect x="${x - 7}" y="${y - 2.5}" width="14" height="5" rx="2" fill="${col}" transform="rotate(${r} ${x} ${y})"/>`)).join(''),
      }),
    },
    triangles: { label: 'Triangles', tile: (a, b) => ({ w: 40, h: 36, svg: `<polygon points="0,36 20,0 40,36" fill="${a}" opacity=".5"/><polygon points="20,36 30,18 40,36" fill="${b}" opacity=".6"/>` }) },
    plus: { label: 'Croix', tile: a => ({ w: 40, h: 40, svg: `<path d="M20 13v14M13 20h14" stroke="${a}" stroke-width="3.5" stroke-linecap="round"/>` }) },
    rings: { label: 'Anneaux', tile: a => ({ w: 50, h: 50, svg: `<circle cx="25" cy="25" r="12" fill="none" stroke="${a}" stroke-width="3"/>` }) },
    diamonds: { label: 'Losanges', tile: a => ({ w: 40, h: 40, svg: `<polygon points="20,5 35,20 20,35 5,20" fill="${a}"/>` }) },
    scales: { label: 'Écailles', tile: a => ({ w: 40, h: 20, svg: `<path d="M0 20a20 20 0 0 1 40 0M-20 0a20 20 0 0 1 40 0M20 0a20 20 0 0 1 40 0" fill="none" stroke="${a}" stroke-width="2.5"/>` }) },
    bubbles: { label: 'Bulles', tile: (a, b) => ({ w: 100, h: 100, svg: `<circle cx="22" cy="24" r="14" fill="${a}" opacity=".55"/><circle cx="70" cy="40" r="8" fill="${b}" opacity=".7"/><circle cx="48" cy="80" r="18" fill="${b}" opacity=".35"/><circle cx="90" cy="88" r="5" fill="${a}" opacity=".8"/>` }) },
    terrazzo: {
      label: 'Terrazzo',
      tile: (a, b) => ({ w: 120, h: 120, svg: `<path d="M14 20l12-6 6 10-10 6Z" fill="${a}"/><path d="M70 14l14 3-4 12-12-4Z" fill="${b}"/><path d="M98 60l10 8-8 8-8-6Z" fill="${a}"/><path d="M40 70l10-4 6 12-12 2Z" fill="${b}"/><path d="M14 98l9 2-2 10-9-3Z" fill="${a}"/><path d="M78 100l12-2 2 10-12 2Z" fill="${b}"/><circle cx="56" cy="40" r="3" fill="${a}"/><circle cx="104" cy="22" r="2.5" fill="${b}"/><circle cx="24" cy="58" r="2.5" fill="${b}"/>` }),
    },
    memphis: {
      label: 'Memphis',
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
   * @param assetUrl  id d'image -> URL utilisable (objet URL à l'écran, data URL à l'export)
   */
  function ops(bg, x, y, w, h, { assetUrl, radius = 0 } = {}) {
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
        const out = [rect(bg.c1)];
        if (src) out.push({ op: 'image', x, y, w, h, src, fit: bg.fit, opacity: bg.imageOpacity, r: radius });
        if (bg.overlayOpacity > 0) out.push({ ...rect(bg.overlay), opacity: bg.overlayOpacity });
        return out;
      }
      default: return [rect(bg.c1)];
    }
  }

  return { TYPES, PATTERNS, tile, hatch, thumb, ops, linear };
})();
