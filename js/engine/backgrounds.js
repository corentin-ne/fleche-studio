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

  /* Petits dessins (boîte d'environ 20 × 20 centrée sur 0) pour les motifs à thème : `a` = couleur
     principale, `b` = détails. Chaque dessin est posé deux fois par tuile (duo), en quinconce. */
  const ICONS = {
    pumpkin: (a, b) => `<ellipse cx="-4" cy="1" rx="6" ry="7" fill="${a}"/><ellipse cx="4" cy="1" rx="6" ry="7" fill="${a}"/><ellipse cy="1" rx="4" ry="7.6" fill="${a}"/><path d="M0-6c0-3 1-5 3-6" stroke="${b}" stroke-width="2" fill="none" stroke-linecap="round"/>`,
    ghost: (a, b) => `<path d="M-8 9V-1a8 8 0 0 1 16 0V9l-4-3-4 3-4-3Z" fill="${a}"/><circle cx="-3" cy="-1" r="1.4" fill="${b}"/><circle cx="3" cy="-1" r="1.4" fill="${b}"/>`,
    spider: (a) => `<path d="M0-12V-3M0 1-8-5-10 0M0 1-9 2-10 7M0 1-7 8-7 12M0 1l8-6 2 5M0 1l9 1 1 5M0 1l7 7v4" stroke="${a}" stroke-width="1.2" fill="none"/><circle cy="2" r="3.5" fill="${a}"/><circle cy="-2.5" r="2.3" fill="${a}"/>`,
    snowflake: (a) => `<path d="M0-9V9M-7.8-4.5 7.8 4.5M-7.8 4.5 7.8-4.5M-2.5-7 0-4.5 2.5-7M-2.5 7 0 4.5 2.5 7M-8.3-1.2-5.5-2.6-6.3-5.6M8.3 1.2 5.5 2.6 6.3 5.6M-8.3 1.2-5.5 2.6-6.3 5.6M8.3-1.2 5.5-2.6 6.3-5.6" stroke="${a}" stroke-width="1.5" stroke-linecap="round" fill="none"/>`,
    tree: (a, b) => `<path d="M0-10 6-2H3L8 5H-8L-3-2H-6Z" fill="${a}"/><rect x="-1.5" y="5" width="3" height="4" fill="${b}"/><circle cy="-10" r="1.6" fill="${b}"/>`,
    gift: (a, b) => `<rect x="-8" y="-4" width="16" height="12" rx="1" fill="${a}"/><rect x="-9" y="-7" width="18" height="4" rx="1" fill="${a}"/><path d="M0-7V8" stroke="${b}" stroke-width="2.4"/><path d="M0-7c-2-4-7-4-5-1 1 1 5 1 5 1Zm0 0c2-4 7-4 5-1-1 1-5 1-5 1Z" fill="${b}"/>`,
    candyCane: (a, b) => `<path d="M2 9V-4a3.5 3.5 0 0 0-7 0" fill="none" stroke="${a}" stroke-width="3.4" stroke-linecap="round"/><path d="M2 9V-4a3.5 3.5 0 0 0-7 0" fill="none" stroke="${b}" stroke-width="3.4" stroke-dasharray="2 2.4"/>`,
    balloon: (a, b) => `<path d="M0 6c1 2-1 3 0 5" stroke="${b}" stroke-width="1" fill="none"/><ellipse cy="-2" rx="6" ry="7.5" fill="${a}"/><path d="M-1.5 5.5h3L0 7.5Z" fill="${a}"/><path d="M-3-6c1-2 2-2.5 3-2.5" stroke="#ffffff" stroke-width="1.3" stroke-linecap="round" fill="none" opacity=".6"/>`,
    firework: (a, b) => `<g stroke="${a}" stroke-width="1.4" stroke-linecap="round">${Array.from({ length: 10 }, (_, i) => { const r = (i * Math.PI) / 5; return `<path d="M${(Math.cos(r) * 3).toFixed(1)} ${(Math.sin(r) * 3).toFixed(1)}L${(Math.cos(r) * 9).toFixed(1)} ${(Math.sin(r) * 9).toFixed(1)}"/>`; }).join('')}</g><circle r="1.6" fill="${b}"/>`,
    shamrock: (a, b) => `<circle cy="-4" r="3.6" fill="${a}"/><circle cx="-3.8" cy="1.6" r="3.6" fill="${a}"/><circle cx="3.8" cy="1.6" r="3.6" fill="${a}"/><path d="M0 0c0 4 1 7 3 9" stroke="${b}" stroke-width="1.5" fill="none" stroke-linecap="round"/>`,
    bunny: (a, b) => `<ellipse cx="-3" cy="-7" rx="1.8" ry="5" fill="${a}"/><ellipse cx="3" cy="-7" rx="1.8" ry="5" fill="${a}"/><ellipse cy="2" rx="7" ry="6" fill="${a}"/><circle cx="-2.4" cy="1" r=".9" fill="${b}"/><circle cx="2.4" cy="1" r=".9" fill="${b}"/><path d="M-1 3.4h2L0 4.6Z" fill="${b}"/>`,
    mask: (a, b) => `<path d="M-10-2c4-3 7-2 10 1 3-3 6-4 10-1 0 6-3 8-5 8s-4-2-5-3c-1 1-3 3-5 3s-5-2-5-8Z" fill="${a}"/><ellipse cx="-4.5" cy="1" rx="2.4" ry="1.5" fill="${b}"/><ellipse cx="4.5" cy="1" rx="2.4" ry="1.5" fill="${b}"/><path d="M8-3c2-4 4-6 5-8" stroke="${b}" stroke-width="1.6" stroke-linecap="round" fill="none"/>`,
    moon: (a, b) => `<path d="M2-9a9 9 0 1 0 7 13A7 7 0 1 1 2-9Z" fill="${a}"/><path d="${starPath(7, -6, 2.6)}" fill="${b}"/>`,
    shell: (a, b) => `<path d="M0 8-9-2a9 9 0 0 1 18 0Z" fill="${a}"/><path d="M0 8-5.5-5.5M0 8-1.8-8M0 8 1.8-8M0 8 5.5-5.5M0 8 8.6-2.4M0 8-8.6-2.4" stroke="${b}" stroke-width=".9"/><rect x="-2.5" y="7" width="5" height="2.5" rx="1" fill="${a}"/>`,
    fish: (a, b) => `<path d="M-9 0c4-6 10-6 13 0-3 6-9 6-13 0Z" fill="${a}"/><path d="M3 0l6-5v10Z" fill="${a}"/><circle cx="-5" cy="-1" r="1.1" fill="${b}"/><path d="M-1-3.5c1 2 1 5 0 7" stroke="${b}" stroke-width=".9" fill="none"/>`,
    starfish: (a, b) => `<path d="${starPath(0, 0, 9.5)}" fill="${a}" stroke="${a}" stroke-width="2.5" stroke-linejoin="round"/><circle r="1.2" fill="${b}"/><circle cy="-4.5" r=".8" fill="${b}"/><circle cx="4.3" cy="-1.4" r=".8" fill="${b}"/><circle cx="-4.3" cy="-1.4" r=".8" fill="${b}"/>`,
    anchor: (a) => `<g fill="none" stroke="${a}" stroke-width="1.9" stroke-linecap="round"><circle cy="-8" r="2"/><path d="M0-6V8M-5-3h10M-7 2c1 5 5 6 7 6s6-1 7-6"/></g>`,
    skull: (a, b) => `<path d="M-6 6V3c-2-1-3-3-3-6a9 9 0 0 1 18 0c0 3-1 5-3 6v3Z" fill="${a}"/><circle cx="-3.2" cy="-2" r="2.2" fill="${b}"/><circle cx="3.2" cy="-2" r="2.2" fill="${b}"/><path d="M-2 6V3M0 6V3M2 6V3" stroke="${b}" stroke-width=".8"/>`,
    coin: (a, b) => `<circle r="7.5" fill="${a}"/><circle r="5.5" fill="none" stroke="${b}" stroke-width="1"/><rect x="-1.8" y="-1.8" width="3.6" height="3.6" fill="none" stroke="${b}" stroke-width="1.1"/>`,
    sakura: (a, b) => `${Array.from({ length: 5 }, (_, i) => { const r = (i * 2 * Math.PI) / 5 - Math.PI / 2; return `<ellipse cx="${(Math.cos(r) * 4.6).toFixed(1)}" cy="${(Math.sin(r) * 4.6).toFixed(1)}" rx="3.6" ry="4.6" transform="rotate(${Math.round((r * 180) / Math.PI + 90)} ${(Math.cos(r) * 4.6).toFixed(1)} ${(Math.sin(r) * 4.6).toFixed(1)})" fill="${a}"/>`; }).join('')}<circle r="1.8" fill="${b}"/>`,
    cloud: (a, b) => `<path d="M-9 5a4 4 0 0 1 1-8 5 5 0 0 1 9-2 4.5 4.5 0 0 1 8 4 3 3 0 0 1 0 6Z" fill="${a}"/><path d="M-3 0a2 2 0 1 1 2 2" stroke="${b}" stroke-width="1" fill="none" stroke-linecap="round"/>`,
    pyramid: (a, b) => `<path d="M-10 7 0-8 10 7Z" fill="${a}"/><path d="M0-8 10 7H3Z" fill="${b}" opacity=".55"/>`,
    eye: (a, b) => `<path d="M-9 0c4-6 14-6 18 0-4 5-14 5-18 0Z" fill="none" stroke="${a}" stroke-width="1.6"/><circle r="2.6" fill="${a}"/><path d="M-2 4c-1 3-3 5-6 5M2 4l2 5" stroke="${b}" stroke-width="1.4" fill="none" stroke-linecap="round"/>`,
    cactus: (a, b) => `<path d="M0 9V-7M0 3h-4.5v-5M0 0h4.5v-5" stroke="${a}" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round" fill="none"/><path d="M-5 9h10" stroke="${b}" stroke-width="2" stroke-linecap="round"/>`,
    horseshoe: (a, b) => `<path d="M-6 8V0a6 6 0 0 1 12 0v8" fill="none" stroke="${a}" stroke-width="3.6" stroke-linecap="round"/><circle cx="-6" cy="3" r=".8" fill="${b}"/><circle cx="6" cy="3" r=".8" fill="${b}"/><circle cx="-4.5" cy="-3.5" r=".8" fill="${b}"/><circle cx="4.5" cy="-3.5" r=".8" fill="${b}"/>`,
    rocket: (a, b) => `<path d="M0-10c4 4 4 10 2 15h-4c-2-5-2-11 2-15Z" fill="${a}"/><path d="M-2 2-5.5 8H-2ZM2 2l3.5 6H2Z" fill="${b}"/><circle cy="-3" r="1.6" fill="${b}"/><path d="M-1 6 0 10 1 6Z" fill="${b}"/>`,
    planet: (a, b) => `<circle r="5.5" fill="${a}"/><ellipse rx="10" ry="2.6" fill="none" stroke="${b}" stroke-width="1.4" transform="rotate(-20)"/>`,
    fleur: (a) => `<path d="M0-10c3 3 3 7 0 10-3-3-3-7 0-10ZM0 1c-2-5-8-6-9-1 0 3 3 4 5 2-1 2-3 3-1 4 2 0 4-2 5-5Zm0 0c2-5 8-6 9-1 0 3-3 4-5 2 1 2 3 3 1 4-2 0-4-2-5-5ZM-4 2h8v2h-8Z" fill="${a}"/>`,
    crown: (a, b) => `<path d="M-9 5-10-5l5 4 5-7 5 7 5-4-1 10Z" fill="${a}"/><circle cy="1" r="1.5" fill="${b}"/><circle cx="-5" cy="2" r="1.1" fill="${b}"/><circle cx="5" cy="2" r="1.1" fill="${b}"/>`,
    shield: (a, b) => `<path d="M-7-8h14v6c0 6-4 9-7 11-3-2-7-5-7-11Z" fill="${a}"/><path d="M0-8V9M-7-2h14" stroke="${b}" stroke-width="1.6"/>`,
    footprint: (a) => `<ellipse cy="-5" rx="1.8" ry="4" fill="${a}"/><ellipse cx="-4" cy="-3" rx="1.6" ry="3.6" transform="rotate(-30 -4 -3)" fill="${a}"/><ellipse cx="4" cy="-3" rx="1.6" ry="3.6" transform="rotate(30 4 -3)" fill="${a}"/><ellipse cy="3.5" rx="3.6" ry="3.2" fill="${a}"/>`,
    bone: (a) => `<path d="M-6-2h12M-6 2h12" stroke="${a}" stroke-width="2.6"/><circle cx="-7" cy="-2.5" r="2.2" fill="${a}"/><circle cx="-7" cy="2.5" r="2.2" fill="${a}"/><circle cx="7" cy="-2.5" r="2.2" fill="${a}"/><circle cx="7" cy="2.5" r="2.2" fill="${a}"/>`,
    eiffel: (a) => `<path d="M-1 -11h2l1 7h-4ZM-3-4h6l1 4h-8ZM-4 0h8l4 10h-3c-1-3-3-5-5-5s-4 2-5 5h-3Z" fill="${a}"/>`,
    croissant: (a, b) => `<path d="M-10 3C-9-6 9-6 10 3 7 7 4 1 0 1S-7 7-10 3Z" fill="${a}"/><path d="M-5-2-3 2M0-4V1M5-2 3 2" stroke="${b}" stroke-width="1.1" fill="none" stroke-linecap="round"/>`,
    laurel: (a, b) => `<path d="M0 9C-7 5-9-2-6-9M0 9C7 5 9-2 6-9" stroke="${b}" stroke-width="1.1" fill="none"/>${[[-6.5, -6, -30], [-8, -1, -60], [-6, 4, -80], [6.5, -6, 30], [8, -1, 60], [6, 4, 80]].map(([x, y, r]) => `<ellipse cx="${x}" cy="${y}" rx="1.6" ry="3.2" transform="rotate(${r} ${x} ${y})" fill="${a}"/>`).join('')}`,
    amphora: (a, b) => `<path d="M-2-9h4v3c4 2 5 6 4 10-1 3-3 5-4 6h-4c-1-1-3-3-4-6-1-4 0-8 4-10Z" fill="${a}"/><path d="M-2-6c-4 0-4 4-3 5M2-6c4 0 4 4 3 5" stroke="${a}" stroke-width="1.2" fill="none"/><path d="M-5 0h10" stroke="${b}" stroke-width="1.3"/>`,
    train: (a, b) => `<path d="M-9-3h10v-4h4v4h3v9H-9Z" fill="${a}"/><rect x="-7" y="-1" width="4" height="3" fill="${b}"/><circle cx="-5" cy="7" r="2.2" fill="${b}"/><circle cx="4" cy="7" r="2.2" fill="${b}"/><circle cx="3" cy="-10" r="1.6" fill="${b}" opacity=".6"/>`,
    note: (a) => `<path d="M-3 6.5a2.6 2.1 0 1 1-1.2-2.8V-7l9-2.2V4.4a2.6 2.1 0 1 1-1.2-2.8V-5.6l-6.6 1.6Z" fill="${a}"/>`,
    leaf: (a, b) => `<path d="M0-9C6-5 6 5 0 9-6 5-6-5 0-9Z" fill="${a}"/><path d="M0-7V8M0-1l3-3M0 3l-3-3" stroke="${b}" stroke-width=".9" fill="none"/>`,
    flower: (a, b) => `${Array.from({ length: 6 }, (_, i) => { const r = (i * Math.PI) / 3; return `<circle cx="${(Math.cos(r) * 4.6).toFixed(1)}" cy="${(Math.sin(r) * 4.6).toFixed(1)}" r="3.4" fill="${a}"/>`; }).join('')}<circle r="2.8" fill="${b}"/>`,
    paw: (a) => `<ellipse cy="3" rx="4.6" ry="3.8" fill="${a}"/><circle cx="-5.5" cy="-2.5" r="2" fill="${a}"/><circle cx="-2" cy="-6.5" r="2" fill="${a}"/><circle cx="2" cy="-6.5" r="2" fill="${a}"/><circle cx="5.5" cy="-2.5" r="2" fill="${a}"/>`,
    mushroom: (a, b) => `<path d="M-9 0a9 8 0 0 1 18 0Z" fill="${a}"/><path d="M-2.5 0h5l1 8h-7Z" fill="${b}"/><circle cx="-4" cy="-3" r="1.3" fill="${b}"/><circle cx="2" cy="-5" r="1.5" fill="${b}"/><circle cx="5" cy="-1.5" r="1" fill="${b}"/>`,
    cherry: (a, b) => `<path d="M-4 3C-3-3 0-7 3-9M4 4C4-2 3-6 3-9" stroke="${b}" stroke-width="1.2" fill="none"/><circle cx="-4.5" cy="5" r="3.6" fill="${a}"/><circle cx="4.5" cy="5.5" r="3.6" fill="${a}"/><path d="M3-9c3-1 6 0 7 2-3 1-6 0-7-2Z" fill="${b}"/>`,
    dino: (a, b) => `<path d="M-10 4c2-6 6-8 10-7l2-4c1-2 5-2 6 0 1 1 0 3-2 3l-2 1v7l2 3h-2l-2-2h-4l-1 2h-2l1-3c-2 0-4 1-6 0Z" fill="${a}"/><circle cx="10" cy="-6" r=".8" fill="${b}"/><path d="M-6-2-5-5-3-3-2-6 0-4" stroke="${b}" stroke-width="1" fill="none"/>`,
    heartSmall: (a) => `<path d="${heart(0, -7, 15)}" fill="${a}"/>`,
    star5: (a) => `<path d="${starPath(0, 0, 9)}" fill="${a}"/>`,
  };
  ICONS.bat = a => `<path transform="scale(.24) translate(-50 -48)" d="${BAT}" fill="${a}"/>`;
  ICONS.egg = (a, b) => `<path d="${egg(0, 1, 9)}" fill="${a}"/><polyline points="-6,1 -3,-2 0,1 3,-2 6,1" fill="none" stroke="${b}" stroke-width="1.4" stroke-linejoin="round"/>`;
  ICONS.lantern = (a, b) => `<g transform="scale(.44)">${lantern(-15, -25, a, b)}</g>`;
  const f1 = v => +v.toFixed(1);
  /**
   * Tuile « semée » (motifs illustrés) : le dessin réparti sur une grille n × n décalée au hasard, avec
   * des tailles, des angles et (a2) des couleurs variés, toujours les mêmes pour un motif. La
   * répétition ne se voit plus ; les dessins qui débordent sont repris de l'autre côté (raccord sans couture).
   *   icons : un dessin ou un mélange (['pumpkin', 'ghost:b'…] ; « :b » = dessiné dans la 2e couleur)
   *   s : taille moyenne ; rot : angle maximal (0 = toujours droit) ; a2 : échange parfois les deux couleurs
   */
  const scatter = (icons, { s = 3.2, rot = 15, a2 = false, n = 4, w = 560 } = {}) => (a, b) => {
    const list = [].concat(icons);
    const r = MF.util.rng(parseInt(MF.util.hash(list.join()), 36) || 1);
    const order = MF.util.shuffle(Array.from({ length: n * n }, (_, i) => i % list.length), r);
    const cell = w / n, out = [];
    for (let i = 0; i < n * n; i++) {
      const x = ((i % n) + 0.2 + r() * 0.6) * cell, y = (Math.floor(i / n) + 0.2 + r() * 0.6) * cell;
      const k = s * (0.7 + r() * 0.6), ang = Math.round((r() - 0.5) * 2 * rot);
      const [icon, alt] = list[order[i]].split(':');
      const swap = alt === 'b' ? !(a2 && r() < 0.4) : a2 && r() < 0.4;
      const g = ICONS[icon](swap ? b : a, swap ? a : b), m = 13 * k;
      const xs = [0, ...(x < m ? [w] : x > w - m ? [-w] : [])], ys = [0, ...(y < m ? [w] : y > w - m ? [-w] : [])];
      for (const dx of xs) for (const dy of ys) out.push(`<g transform="translate(${f1(x + dx)} ${f1(y + dy)}) rotate(${ang}) scale(${f1(k)})">${g}</g>`);
      // Quelques points de la 2e couleur entre les dessins
      if (r() < 0.45) out.push(`<circle cx="${f1(4 + r() * (w - 8))}" cy="${f1(4 + r() * (w - 8))}" r="${f1(2 + r() * 1.5)}" fill="${b}"/>`);
    }
    return { w, h: w, svg: out.join(''), thumb: Math.round(w * 0.24) };
  };

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
    waves: { cat: 'nature', label: t('Vagues'), tile: a => ({ w: 60, h: 30, svg: `<path d="M0 15Q15 3 30 15T60 15" fill="none" stroke="${a}" stroke-width="3.5"/>` }) },
    hearts: { cat: 'fetes', label: t('Cœurs'), tile: scatter(['heartSmall', 'heartSmall:b'], { s: 2, rot: 15 }) },
    stars: { cat: 'fetes', label: t('Étoiles'), tile: scatter(['star5', 'star5:b'], { s: 1.9, rot: 30 }) },
    confetti: {
      cat: 'fetes', label: t('Confettis'),
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
    scales: { cat: 'univers', label: t('Écailles'), tile: a => ({ w: 40, h: 20, svg: `<path d="M0 20a20 20 0 0 1 40 0M-20 0a20 20 0 0 1 40 0M20 0a20 20 0 0 1 40 0" fill="none" stroke="${a}" stroke-width="2.5"/>` }) },
    bubbles: { cat: 'nature', label: t('Bulles'), tile: (a, b) => ({ w: 100, h: 100, svg: `<circle cx="22" cy="24" r="14" fill="${a}" opacity=".55"/><circle cx="70" cy="40" r="8" fill="${b}" opacity=".7"/><circle cx="48" cy="80" r="18" fill="${b}" opacity=".35"/><circle cx="90" cy="88" r="5" fill="${a}" opacity=".8"/>` }) },
    terrazzo: {
      label: t('Terrazzo'),
      tile: (a, b) => ({ w: 120, h: 120, svg: `<path d="M14 20l12-6 6 10-10 6Z" fill="${a}"/><path d="M70 14l14 3-4 12-12-4Z" fill="${b}"/><path d="M98 60l10 8-8 8-8-6Z" fill="${a}"/><path d="M40 70l10-4 6 12-12 2Z" fill="${b}"/><path d="M14 98l9 2-2 10-9-3Z" fill="${a}"/><path d="M78 100l12-2 2 10-12 2Z" fill="${b}"/><circle cx="56" cy="40" r="3" fill="${a}"/><circle cx="104" cy="22" r="2.5" fill="${b}"/><circle cx="24" cy="58" r="2.5" fill="${b}"/>` }),
    },
    bats: {
      cat: 'fetes', label: t('Chauves-souris'),
      tile: scatter(['bat', 'bat', 'moon:b'], { rot: 12 }),
    },
    eggs: {
      cat: 'fetes', label: t('Œufs'),
      tile: scatter(['egg', 'egg:b'], { rot: 20 }),
    },
    harlequin: {
      cat: 'fetes', label: t('Arlequin'),
      tile: (a, b) => ({ w: 60, h: 80, svg: `<polygon points="30,0 60,40 30,80 0,40" fill="${a}"/><polygon points="30,0 60,40 30,80 0,40" fill="none" stroke="${b}" stroke-width="1.5" opacity=".6"/><circle cx="0" cy="0" r="3" fill="${b}"/><circle cx="60" cy="0" r="3" fill="${b}"/><circle cx="0" cy="80" r="3" fill="${b}"/><circle cx="60" cy="80" r="3" fill="${b}"/><circle cx="30" cy="40" r="2" fill="${b}"/>` }),
    },
    lanterns: {
      cat: 'fetes', label: t('Lanternes'),
      tile: scatter(['lantern', 'lantern:b'], { rot: 6 }),
    },
    memphis: {
      label: t('Memphis'),
      tile: (a, b) => ({ w: 140, h: 140, svg: `<path d="M10 30q10-14 20 0t20 0" fill="none" stroke="${a}" stroke-width="4" stroke-linecap="round"/><circle cx="100" cy="25" r="10" fill="none" stroke="${b}" stroke-width="4"/><polygon points="30,90 48,120 12,120" fill="${b}"/><path d="M85 85l20 20M105 85l-20 20" stroke="${a}" stroke-width="4" stroke-linecap="round"/><rect x="60" y="50" width="14" height="14" fill="${a}" transform="rotate(20 67 57)"/><circle cx="125" cy="120" r="4" fill="${b}"/>` }),
    },

    /* ---- Mélanges à thème (fonds des thèmes de fête et d'univers) ---- */
    halloweenMix: { cat: 'fetes', label: t('Halloween'), tile: scatter(['pumpkin', 'ghost:b', 'bat:b', 'spider', 'pumpkin', 'moon']) },
    xmasMix: { cat: 'fetes', label: t('Noël'), tile: scatter(['tree', 'snowflake:b', 'gift', 'candyCane', 'snowflake:b', 'star5']) },
    easterMix: { cat: 'fetes', label: t('Pâques'), tile: scatter(['egg', 'bunny:b', 'flower', 'egg:b', 'flower:b']) },
    carnivalMix: { cat: 'fetes', label: t('Carnaval'), tile: scatter(['mask', 'balloon:b', 'firework', 'mask:b', 'star5']) },
    lunarMix: { cat: 'fetes', label: t('Nouvel an chinois'), tile: scatter(['lantern', 'cloud:b', 'coin', 'lantern', 'firework:b'], { rot: 8 }) },
    partyMix: { cat: 'fetes', label: t('Anniversaire'), tile: scatter(['balloon', 'gift:b', 'balloon:b', 'star5', 'firework'], { rot: 12 }) },
    loveMix: { cat: 'fetes', label: t('Saint-Valentin'), tile: scatter(['heartSmall', 'heartSmall:b', 'flower', 'heartSmall']) },
    stPatrick: { cat: 'fetes', label: t('Saint-Patrick'), tile: scatter(['shamrock', 'coin:b', 'shamrock', 'horseshoe:b']) },
    seaMix: { cat: 'univers', label: t('Bord de mer'), tile: scatter(['shell', 'fish:b', 'starfish', 'anchor:b', 'fish']) },
    mermaidMix: { cat: 'univers', label: t('Sirènes'), tile: scatter(['shell', 'starfish:b', 'fish', 'coin:b']) },
    pirateMix: { cat: 'univers', label: t('Pirates'), tile: scatter(['skull', 'anchor:b', 'coin:b', 'skull', 'fish']) },
    spaceMix: { cat: 'univers', label: t('Espace'), tile: scatter(['rocket', 'planet:b', 'star5', 'moon:b', 'star5']) },
    nightMix: { cat: 'univers', label: t('Ciel de nuit'), tile: scatter(['moon', 'star5:b', 'star5', 'cloud:b'], { s: 2.6 }) },
    japanMix: { cat: 'univers', label: t('Japon'), tile: scatter(['sakura', 'cloud:b', 'sakura', 'sakura:b'], { rot: 40 }) },
    egyptMix: { cat: 'univers', label: t('Égypte'), tile: scatter(['pyramid', 'eye:b', 'amphora', 'pyramid'], { rot: 0 }) },
    westernMix: { cat: 'univers', label: t('Far West'), tile: scatter(['cactus', 'horseshoe:b', 'star5', 'cactus'], { rot: 8 }) },
    medievalMix: { cat: 'univers', label: t('Chevaliers'), tile: scatter(['shield', 'crown:b', 'fleur', 'shield:b'], { rot: 6 }) },
    prehistoryMix: { cat: 'univers', label: t('Préhistoire'), tile: scatter(['dino', 'footprint:b', 'bone', 'leaf:b']) },
    parisMix: { cat: 'univers', label: t('Paris'), tile: scatter(['eiffel', 'croissant:b', 'heartSmall', 'eiffel'], { rot: 8 }) },
    romeMix: { cat: 'univers', label: t('Rome antique'), tile: scatter(['laurel', 'amphora:b', 'coin', 'laurel:b'], { rot: 6 }) },
    musicMix: { cat: 'univers', label: t('Musique'), tile: scatter(['note', 'note:b', 'star5'], { rot: 20 }) },
    forestMix: { cat: 'nature', label: t('Sous-bois'), tile: scatter(['leaf', 'mushroom:b', 'leaf:b', 'flower']) },

    /* ---- Fêtes ---- */
    pumpkins: { cat: 'fetes', label: t('Citrouilles'), tile: scatter('pumpkin') },
    ghosts: { cat: 'fetes', label: t('Fantômes'), tile: scatter('ghost', { rot: 8 }) },
    spiders: { cat: 'fetes', label: t('Araignées'), tile: scatter('spider', { rot: 0 }) },
    bunnies: { cat: 'fetes', label: t('Lapins'), tile: scatter('bunny', { rot: 10 }) },
    masks: { cat: 'fetes', label: t('Masques'), tile: scatter('mask', { rot: 14, a2: true }) },
    snowflakes: { cat: 'fetes', label: t('Flocons'), tile: scatter('snowflake', { rot: 20, a2: true }) },
    firs: { cat: 'fetes', label: t('Sapins'), tile: scatter('tree', { rot: 0 }) },
    gifts: { cat: 'fetes', label: t('Cadeaux'), tile: scatter('gift', { rot: 10 }) },
    candyCanes: { cat: 'fetes', label: t('Sucres d\'orge'), tile: scatter('candyCane', { rot: 18 }) },
    balloons: { cat: 'fetes', label: t('Ballons'), tile: scatter('balloon', { rot: 10, a2: true }) },
    fireworks: { cat: 'fetes', label: t('Feux d\'artifice'), tile: scatter('firework', { rot: 0, a2: true }) },
    shamrocks: { cat: 'fetes', label: t('Trèfles'), tile: scatter('shamrock', { rot: 15 }) },
    bunting: {
      cat: 'fetes', label: t('Fanions'),
      tile: (a, b) => ({ w: 80, h: 44, svg: `<path d="M0 6Q40 16 80 6" fill="none" stroke="${b}" stroke-width="1.4"/>${[[6, a], [22, b], [38, a], [54, b], [70, a]].map(([x, c]) => { const y = 6 + 10 * (1 - ((x + 6 - 40) / 40) ** 2); return `<path d="M${x} ${f1(y - 1)}h12l-6 13Z" fill="${c}"/>`; }).join('')}` }),
    },

    /* ---- Univers ---- */
    shells: { cat: 'univers', label: t('Coquillages'), tile: scatter('shell', { rot: 15 }) },
    fish: { cat: 'univers', label: t('Poissons'), tile: scatter('fish', { rot: 8, a2: true }) },
    starfish: { cat: 'univers', label: t('Étoiles de mer'), tile: scatter('starfish', { rot: 18 }) },
    anchors: { cat: 'univers', label: t('Ancres'), tile: scatter('anchor', { rot: 10, a2: true }) },
    skulls: { cat: 'univers', label: t('Têtes de mort'), tile: scatter('skull', { rot: 10 }) },
    coins: { cat: 'univers', label: t('Pièces d\'or'), tile: scatter('coin', { rot: 0 }) },
    sakura: { cat: 'univers', label: t('Sakura'), tile: scatter('sakura', { rot: 20 }) },
    clouds: { cat: 'univers', label: t('Nuages'), tile: scatter('cloud', { rot: 0 }) },
    seigaiha: {
      cat: 'univers', label: t('Vagues japonaises'),
      tile: (a, b) => {
        const fan = (x, y) => [10, 7, 4].map((r, i) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${i % 2 ? b : a}"/>`).join('');
        return { w: 20, h: 10, svg: `${fan(0, 0)}${fan(20, 0)}${fan(10, 5)}${fan(0, 10)}${fan(20, 10)}` };
      },
    },
    pyramids: { cat: 'univers', label: t('Pyramides'), tile: scatter('pyramid', { rot: 0 }) },
    eyes: { cat: 'univers', label: t('Œil d\'Horus'), tile: scatter('eye', { rot: 0, a2: true }) },
    cacti: { cat: 'univers', label: t('Cactus'), tile: scatter('cactus', { rot: 0 }) },
    horseshoes: { cat: 'univers', label: t('Fers à cheval'), tile: scatter('horseshoe', { rot: 15 }) },
    rockets: { cat: 'univers', label: t('Fusées'), tile: scatter('rocket', { rot: 25 }) },
    planets: { cat: 'univers', label: t('Planètes'), tile: scatter('planet', { rot: 10, a2: true }) },
    moons: { cat: 'univers', label: t('Lunes'), tile: scatter('moon', { rot: 10 }) },
    fleurs: { cat: 'univers', label: t('Fleurs de lys'), tile: scatter('fleur', { rot: 0, a2: true }) },
    crowns: { cat: 'univers', label: t('Couronnes'), tile: scatter('crown', { rot: 10 }) },
    shields: { cat: 'univers', label: t('Blasons'), tile: scatter('shield', { rot: 0, a2: true }) },
    footprints: { cat: 'univers', label: t('Empreintes'), tile: scatter('footprint', { rot: 20 }) },
    bones: { cat: 'univers', label: t('Os'), tile: scatter('bone', { rot: 30 }) },
    dinos: { cat: 'univers', label: t('Dinosaures'), tile: scatter('dino', { rot: 0 }) },
    eiffel: { cat: 'univers', label: t('Tour Eiffel'), tile: scatter('eiffel', { rot: 0, a2: true }) },
    croissants: { cat: 'univers', label: t('Croissants'), tile: scatter('croissant', { rot: 15 }) },
    laurels: { cat: 'univers', label: t('Lauriers'), tile: scatter('laurel', { rot: 0 }) },
    amphoras: { cat: 'univers', label: t('Amphores'), tile: scatter('amphora', { rot: 0, a2: true }) },
    meander: {
      cat: 'univers', label: t('Grecque'),
      tile: a => ({ w: 24, h: 24, svg: `<path d="M0 20H18V4H6V14H12V9M0 22.5H24M0 1.5H24" fill="none" stroke="${a}" stroke-width="2"/>` }),
    },
    trains: { cat: 'univers', label: t('Locomotives'), tile: scatter('train', { rot: 0 }) },
    rails: {
      cat: 'univers', label: t('Rails'),
      tile: (a, b) => ({ w: 40, h: 40, svg: `<rect x="6" y="8" width="6" height="24" rx="1" fill="${b}"/><rect x="26" y="8" width="6" height="24" rx="1" fill="${b}"/><path d="M0 13H40M0 27H40" stroke="${a}" stroke-width="2.6"/>` }),
    },
    notes: { cat: 'univers', label: t('Notes de musique'), tile: scatter('note', { rot: 12, a2: true }) },
    stars5: { cat: 'univers', label: t('Étoiles filantes'), tile: (a, b) => ({ w: 90, h: 90, svg: `<g transform="translate(26 26) rotate(-12) scale(1.1)">${ICONS.star5(a)}</g><path d="M8 50 20 40M14 54l9-7" stroke="${b}" stroke-width="1.6" stroke-linecap="round" opacity=".7"/><g transform="translate(68 66) rotate(14) scale(.8)">${ICONS.star5(b)}</g><path d="M50 86l12-9" stroke="${a}" stroke-width="1.6" stroke-linecap="round" opacity=".7"/><circle cx="72" cy="18" r="1.6" fill="${b}"/><circle cx="22" cy="78" r="1.4" fill="${a}"/>` }) },

    /* ---- Nature ---- */
    leaves: { cat: 'nature', label: t('Feuilles'), tile: scatter('leaf', { rot: 30 }) },
    flowers: { cat: 'nature', label: t('Fleurs'), tile: scatter('flower', { rot: 0, a2: true }) },
    mushrooms: { cat: 'nature', label: t('Champignons'), tile: scatter('mushroom', { rot: 8 }) },
    cherries: { cat: 'nature', label: t('Cerises'), tile: scatter('cherry', { rot: 10 }) },
    paws: { cat: 'nature', label: t('Pattes'), tile: scatter('paw', { rot: 20 }) },
  };

  /** Catégories des motifs (panneau Design) ; « Formes » par défaut. */
  const PATTERN_CATS = { geo: t('Formes'), nature: t('Nature'), fetes: t('Fêtes'), univers: t('Univers') };

  /** Hachures fines (zones vides des grilles). */
  const hatch = color => ({ w: 16, h: 16, svg: `<path d="M-4 4L4 -4M0 16L16 0M12 20L20 12" stroke="${color}" stroke-width="2.2"/>` });

  function tile(id, a, b) {
    return (PATTERNS[id] || PATTERNS.dots).tile(a, b);
  }

  /** Taille d'affichage (px) d'une tuile dans les aperçus : les dessins gardent à peu près la même taille d'un motif à l'autre. */
  const thumbSize = id => { const tl = tile(id, '#000', '#000'); return Math.max(16, tl.thumb || Math.round(tl.w * 0.42)); };

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
      case 'pattern': return `${thumb(bg.pattern, bg.c1, bg.c2, bg.c3)} 0 0 / ${Math.round(size * bg.scale * thumbSize(bg.pattern) / 34)}px auto, ${bg.c1}`;
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

  return { TYPES, PATTERNS, PATTERN_CATS, BAT, tile, hatch, thumb, thumbSize, css, ops, linear };
})();
