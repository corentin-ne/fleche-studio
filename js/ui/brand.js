// @ts-check
/* =========================================================================
   Logo Flèche Studio, dessiné à la couleur d'accent de la grille active :
   un « F » géométrique fait de cases de grille, dont la barre du haut se
   termine en flèche, sur une forme « squircle » au dégradé discret.
   Le même dessin sert à la barre du haut, à l'accueil et à l'icône d'onglet.
   ========================================================================= */
window.MF = window.MF || {};

MF.brand = (() => {
  const DEFAULT = '#7b3fe4';
  const C = 106;            // pas de la grille (case 92 + espace 14)
  const S = 92, R = 24, O = 104;
  const cell = (col, row, extra = '') => `<rect x="${O + col * C}" y="${O + row * C}" width="${S}" height="${S}" rx="${R}" fill="#fff"${extra}/>`;

  /** SVG du logo (512 × 512) pour une couleur d'accent. */
  function svg(accent = DEFAULT) {
    const a = MF.util.HEX.test(accent) ? accent : DEFAULT;
    const top = MF.util.tint(a, 0.2), bottom = MF.util.shade(a, 0.3);
    const id = `fs${a.slice(1)}`;
    // Flèche : triangle aux angles arrondis dans la 3e case de la barre du haut
    const ax = O + 2 * C, ay = O;
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" role="img" aria-label="Flèche Studio">
      <defs>
        <linearGradient id="${id}g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${top}"/><stop offset="1" stop-color="${bottom}"/></linearGradient>
        <radialGradient id="${id}h" cx=".3" cy=".08" r=".7"><stop offset="0" stop-color="#fff" stop-opacity=".32"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient>
      </defs>
      <path d="M256 0C433 0 512 79 512 256S433 512 256 512 0 433 0 256 79 0 256 0Z" fill="url(#${id}g)"/>
      <path d="M256 0C433 0 512 79 512 256S433 512 256 512 0 433 0 256 79 0 256 0Z" fill="url(#${id}h)"/>
      ${cell(0, 0)}${cell(1, 0)}${cell(0, 1)}${cell(1, 1, ' opacity=".55"')}${cell(0, 2)}
      <path d="M${ax + 14} ${ay + 12}L${ax + S - 8} ${ay + S / 2}L${ax + 14} ${ay + S - 12}Z" fill="#fff" stroke="#fff" stroke-width="22" stroke-linejoin="round"/>
      <circle cx="${O + 2 * C + S / 2}" cy="${O + 2 * C + S / 2}" r="20" fill="#fff" opacity=".4"/>
    </svg>`;
  }

  let last = null;
  /** Applique le logo à l'accent courant : barre du haut, accueil, icône d'onglet. */
  function apply(accent = DEFAULT) {
    if (accent === last) return;
    last = accent;
    const markup = svg(accent);
    document.querySelectorAll('[data-brand]').forEach(el => { el.innerHTML = markup; });
    const link = /** @type {HTMLLinkElement} */ (document.querySelector('link[rel="icon"]'));
    if (link) link.href = `data:image/svg+xml,${encodeURIComponent(markup)}`;
  }

  return { svg, apply, DEFAULT };
})();
