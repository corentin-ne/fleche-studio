// @ts-check
/* =========================================================================
   Bibliothèque de décors : stickers vectoriels (recolorables) et emojis.
   Un sticker = des chemins dans une boîte 100 × 100. Les couleurs « main » et
   « second » sont celles choisies par l'utilisateur ; les autres sont fixes.
   ========================================================================= */
window.MF = window.MF || {};

MF.stickers = (() => {
  const { t } = MF.i18n;
  const f = v => Math.round(v * 10) / 10;
  const star = (cx, cy, R, r, n = 5, rot = -90) => 'M' + Array.from({ length: n * 2 }, (_, i) => {
    const a = ((rot + (i * 180) / n) * Math.PI) / 180, rr = i % 2 ? r : R;
    return `${f(cx + Math.cos(a) * rr)} ${f(cy + Math.sin(a) * rr)}`;
  }).join('L') + 'Z';
  const circle = (cx, cy, r) => `M${f(cx - r)} ${f(cy)}a${r} ${r} 0 1 0 ${f(r * 2)} 0a${r} ${r} 0 1 0 ${f(-r * 2)} 0Z`;
  const scallop = (cx, cy, R, n) => Array.from({ length: n }, (_, i) => {
    const a = (i / n) * Math.PI * 2;
    return circle(cx + Math.cos(a) * R, cy + Math.sin(a) * R, (Math.PI * R) / n * 1.15);
  }).join('') + circle(cx, cy, R);
  const petals = (cx, cy, R, r, n) => Array.from({ length: n }, (_, i) => {
    const a = (i / n) * Math.PI * 2 - Math.PI / 2;
    return circle(cx + Math.cos(a) * R, cy + Math.sin(a) * R, r);
  }).join('');

  const P = (d, fill = 'main', extra = {}) => ({ d, fill, ...extra });
  const S = (d, stroke = 'main', sw = 6, extra = {}) => ({ d, fill: 'none', stroke, sw, cap: 'round', join: 'round', ...extra });

  /** Stickers : { label, cat, paths, main, second } (couleurs par défaut). */
  const SHAPES = {
    heart: { label: t('Cœur'), cat: 'Formes', main: '#ff4d7d', paths: [P('M50 90C18 68 5 50 5 31 5 16 16 6 30 6c9 0 16 5 20 13 4-8 11-13 20-13 14 0 25 10 25 25 0 19-13 37-45 59Z'), P('M24 22c5-5 12-6 17-3', 'none', { stroke: '#ffffff', sw: 5, cap: 'round', opacity: 0.55 })] },
    star: { label: t('Étoile'), cat: 'Formes', main: '#ffc83d', paths: [P(star(50, 54, 47, 21)), P(star(50, 54, 30, 13), 'second', { opacity: 0.45 })], second: '#ffffff' },
    sparkle: { label: t('Étincelle'), cat: 'Formes', main: '#ffd23f', second: '#ff8fb1', paths: [P('M44 6C47 34 58 45 86 48 58 51 47 62 44 90 41 62 30 51 2 48 30 45 41 34 44 6Z'), P('M82 62c1 10 5 14 15 15-10 1-14 5-15 15-1-10-5-14-15-15 10-1 14-5 15-15Z', 'second')] },
    burst: { label: t('Explosion'), cat: 'Formes', main: '#ff5c39', second: '#ffd23f', paths: [P(star(50, 50, 49, 36, 14)), P(star(50, 50, 34, 25, 14), 'second')] },
    badge: { label: t('Badge'), cat: 'Formes', main: '#7b3fe4', second: '#ffffff', paths: [P(scallop(50, 50, 38, 16)), P(circle(50, 50, 30), 'none', { stroke: 'second', sw: 3, dash: '4 4' })] },
    blob: { label: t('Tache'), cat: 'Formes', main: '#5ec8ff', paths: [P('M52 6c22 0 40 14 42 34 2 22-12 30-16 44-5 14-26 14-40 8C22 86 6 74 6 52 6 26 28 6 52 6Z')] },
    circle: { label: t('Rond'), cat: 'Formes', main: '#3dd68c', paths: [P(circle(50, 50, 46))] },
    ring: { label: t('Cercle'), cat: 'Formes', main: '#ff4d7d', paths: [S('M50 8C76 6 94 26 92 50S72 94 46 92 6 70 8 46C10 26 28 12 54 10', 'main', 5)] },
    bubble: { label: t('Bulle'), cat: 'Formes', main: '#ffffff', second: '#231f20', paths: [P('M16 10h68a10 10 0 0 1 10 10v44a10 10 0 0 1-10 10H48L26 94V74H16A10 10 0 0 1 6 64V20a10 10 0 0 1 10-10Z', 'main', { stroke: 'second', sw: 4, join: 'round' })] },
    cloud: { label: t('Nuage'), cat: 'Nature', main: '#ffffff', second: '#9fd3ff', paths: [P('M27 82a21 21 0 0 1-3-42 27 27 0 0 1 52-7 23 23 0 0 1 3 49Z', 'main', { stroke: 'second', sw: 4 })] },
    sun: { label: t('Soleil'), cat: 'Nature', main: '#ffc83d', second: '#ff8a3d', paths: [P(star(50, 50, 49, 34, 12), 'second'), P(circle(50, 50, 30))] },
    moon: { label: t('Lune'), cat: 'Nature', main: '#ffd86b', paths: [P('M64 6a44 44 0 1 0 30 64A36 36 0 1 1 64 6Z')] },
    flower: { label: t('Fleur'), cat: 'Nature', main: '#ffd23f', second: '#ff7eb6', paths: [P(petals(50, 50, 24, 19, 6), 'second'), P(circle(50, 50, 16))] },
    leaf: { label: t('Feuille'), cat: 'Nature', main: '#3dbb6b', second: '#1f7a43', paths: [P('M90 8C40 8 10 38 10 76c0 5 1 10 3 15C40 96 92 80 90 8Z'), S('M18 88C34 60 54 40 80 20', 'second', 3)] },
    rainbow: {
      label: t('Arc-en-ciel'), cat: 'Nature', main: '#ff4d4d',
      paths: /** @type {[string, number][]} */ ([['main', 44], ['#ff9f1c', 36], ['#ffd23f', 28], ['#3dd68c', 20], ['#4d9bff', 12]]).map(([c, r]) => S(`M${50 - r} 80a${r} ${r} 0 0 1 ${r * 2} 0`, c, 7, { cap: 'butt' })),
    },
    lightning: { label: t('Éclair'), cat: 'Formes', main: '#ffd23f', second: '#231f20', paths: [P('M60 4 16 58h28l-8 38 48-58H56Z', 'main', { stroke: 'second', sw: 3, join: 'round' })] },
    balloon: { label: t('Ballon'), cat: 'Fête', main: '#ff4d7d', paths: [S('M50 72c-4 8 4 12 0 26', '#8a8a8a', 2), P('M50 72C28 72 16 52 16 36 16 18 31 6 50 6s34 12 34 30c0 16-12 36-34 36Z'), P('M45 72h10l-5 7Z'), P('M32 24c3-6 9-9 14-9', 'none', { stroke: '#ffffff', sw: 4, cap: 'round', opacity: 0.6 })] },
    gift: { label: t('Cadeau'), cat: 'Fête', main: '#7b3fe4', second: '#ffd23f', paths: [P('M12 40h76v52H12Z'), P('M6 26h88v16H6Z'), P('M44 26h12v66H44Z', 'second'), S('M50 26C40 6 22 10 28 22 32 28 50 26 50 26ZM50 26c10-20 28-16 22-4-4 6-22 4-22 4Z', 'second', 5)] },
    cake: { label: t('Gâteau'), cat: 'Fête', main: '#ff9ec4', second: '#7a4a2e', paths: [P('M10 58h80v34H10Z', 'second'), P('M14 40h72v20H14Z'), P('M14 58q9 8 18 0t18 0 18 0 18 0V52H14Z', '#ffffff'), P('M47 18h6v22h-6Z', '#4d9bff'), P('M50 4c5 6 5 10 0 13-5-3-5-7 0-13Z', '#ffb000')] },
    crown: { label: t('Couronne'), cat: 'Fête', main: '#ffc83d', second: '#ff4d7d', paths: [P('M8 78 14 26l22 24 14-36 14 36 22-24 6 52Z'), P('M8 78h84v12H8Z', 'main'), P(circle(50, 60, 6), 'second'), P(circle(26, 66, 4), 'second'), P(circle(74, 66, 4), 'second')] },
    party: { label: t('Cotillon'), cat: 'Fête', main: '#7b3fe4', second: '#ffd23f', paths: [P('M8 92 30 36l34 34Z'), P('M17 70l7-17 15 15ZM12 84l3-8 6 6Z', 'second'), S('M46 30c4-10 14-12 20-8M60 44c10-4 18 0 22 6', 'second', 4), P(circle(76, 18, 5), '#ff4d7d'), P(circle(88, 36, 4), '#3dd68c'), P(circle(56, 12, 3), '#4d9bff')] },
    trophy: { label: t('Trophée'), cat: 'Fête', main: '#ffc83d', second: '#c98a00', paths: [S('M26 22H10c0 18 8 26 20 26M74 22h16c0 18-8 26-20 26', 'second', 5), P('M24 8h52v22c0 18-12 30-26 30S24 48 24 30Z'), P('M44 58h12v16H44Z', 'second'), P('M30 74h40v16H30Z')] },
    music: { label: t('Note'), cat: 'Loisirs', main: '#231f20', paths: [P('M36 14 84 4v58a12 10 0 1 1-6-9V22L42 30v44a12 10 0 1 1-6-9Z')] },
    camera: { label: t('Appareil'), cat: 'Loisirs', main: '#3a3f4b', second: '#9fd3ff', paths: [P('M8 30h18l8-12h32l8 12h18v54H8Z'), P(circle(50, 56, 20), '#ffffff'), P(circle(50, 56, 14), 'second'), P(circle(80, 40, 4), '#ff4d4d')] },
    paw: { label: t('Patte'), cat: 'Nature', main: '#7a4a2e', paths: [P('M50 50c14 0 28 18 28 30 0 10-10 12-28 12S22 90 22 80c0-12 14-30 28-30Z' + circle(22, 42, 10) + circle(40, 22, 10) + circle(60, 22, 10) + circle(78, 42, 10))] },
    smiley: { label: t('Smiley'), cat: 'Formes', main: '#ffd23f', second: '#231f20', paths: [P(circle(50, 50, 46)), P(circle(35, 40, 6) + circle(65, 40, 6), 'second'), S('M28 60c8 16 36 16 44 0', 'second', 6)] },
    check: { label: t('Validé'), cat: 'Formes', main: '#3dd68c', paths: [P(circle(50, 50, 46)), S('M28 52l15 15 30-32', '#ffffff', 9)] },
    arrow: { label: t('Flèche'), cat: 'Déco', main: '#231f20', paths: [S('M10 74C24 30 56 22 82 40', 'main', 5), S('M66 30l18 10-8 18', 'main', 5)] },
    banner: { label: t('Bannière'), cat: 'Déco', main: '#ff4d7d', second: '#c2185b', paths: [P('M2 40h18l-8 14 8 14H2l8-14Z', 'second'), P('M98 40H80l8 14-8 14h18l-8-14Z', 'second'), P('M14 30h72v34H14Z')] },
    tape: { label: t('Masking tape'), cat: 'Déco', main: '#ffd6e8', paths: [P('M4 34l4-4 4 4 4-4 4 4 4-4 4 4 4-4 4 4 4-4 4 4 4-4 4 4 4-4 4 4 4-4 4 4 4-4 4 4 4-4 4 4 4-4 4 4v32l-4 4-4-4-4 4-4-4-4 4-4-4-4 4-4-4-4 4-4-4-4 4-4-4-4 4-4-4-4 4-4-4-4 4-4-4-4 4-4-4-4 4-4-4-4 4-4-4Z', 'main', { opacity: 0.85 })] },
    polaroid: { label: t('Polaroid'), cat: 'Déco', main: '#ffffff', second: '#cfd8e3', paths: [P('M8 4h84v92H8Z', 'main', { stroke: '#e3e3e3', sw: 1 }), P('M15 11h70v64H15Z', 'second')] },
    scribble: { label: t('Gribouillis'), cat: 'Déco', main: '#ff4d7d', paths: [S('M6 60c10-20 20-20 22 0s14 20 22 0 14-20 22 0 14 20 22 0', 'main', 6)] },
    underline: { label: t('Souligné'), cat: 'Déco', main: '#ffd23f', paths: [S('M6 56C30 46 70 44 94 50M14 64c24-6 52-8 74-4', 'main', 7)] },
    pin: { label: t('Punaise'), cat: 'Déco', main: '#ff4d4d', paths: [S('M50 56v40', '#8a8a8a', 4), P(circle(50, 34, 26)), P(circle(42, 26, 7), '#ffffff', { opacity: 0.6 })] },
    tag: { label: t('Étiquette'), cat: 'Déco', main: '#ffe08a', second: '#7a4a2e', paths: [P('M30 14h56a6 6 0 0 1 6 6v60a6 6 0 0 1-6 6H30L6 50Z'), P(circle(28, 50, 6), '#ffffff'), S('M28 50C14 30 4 30 2 40', 'second', 2)] },
    plane: { label: t('Avion'), cat: 'Loisirs', main: '#4d9bff', second: '#ffffff', paths: [P('M96 8 4 46l26 10 6 30 14-18 22 16Z'), P('M30 56 90 12 40 62l-4 24Z', 'second', { opacity: 0.5 })] },
    pizza: { label: t('Pizza'), cat: 'Loisirs', main: '#ffcf5c', second: '#e5483b', paths: [P('M50 94 8 14c26-12 58-12 84 0Z'), P('M8 14c26-12 58-12 84 0l-4 8C64 12 36 12 12 22Z', '#c98a3c'), P(circle(40, 34, 7) + circle(60, 40, 6) + circle(50, 60, 6), 'second')] },
  };

  /** Emojis par catégorie. */
  const EMOJIS = {
    'Fête': ['🎉', '🎂', '🎈', '🎁', '🥳', '🍾', '🥂', '🎊', '✨', '🎆', '🪅', '🕯️'],
    'Amour': ['❤️', '💖', '💕', '😍', '😘', '💌', '🌹', '💍', '💐', '🫶', '💝', '😻'],
    'Visages': ['😀', '😂', '🥰', '😎', '🤩', '😜', '🤔', '😇', '🙃', '😴', '🤯', '🥹'],
    'Nature': ['🌸', '🌻', '🌈', '☀️', '🌙', '⭐', '🍀', '🌊', '🔥', '❄️', '🌵', '🍁'],
    'Animaux': ['🐶', '🐱', '🦊', '🐻', '🐼', '🦁', '🐸', '🐵', '🦄', '🐝', '🦋', '🐢'],
    'Miam': ['🍕', '🍔', '🍟', '🍩', '🍪', '🍫', '🍓', '🍉', '🥐', '🧀', '🍷', '☕'],
    'Voyage': ['✈️', '🚗', '🏖️', '🗺️', '🏔️', '🗼', '🏰', '⛵', '🚀', '🎒', '🧳', '🌍'],
    'Loisirs': ['⚽', '🏀', '🎾', '🎮', '🎨', '🎸', '🎤', '📚', '🎬', '📷', '🧩', '🎲'],
    'Objets': ['💡', '📌', '✏️', '🔑', '🎓', '🏆', '👑', '💎', '⏰', '🧸', '🪄', '🔮'],
  };

  /** Rapport hauteur / largeur d'un sticker texte (pour que la boîte épouse le texte). */
  function textAspect(st) {
    const lines = String(st.text || ' ').split('\n');
    const family = MF.design.font(st.font).css;
    const w = Math.max(...lines.map(l => MF.text.measure(l || ' ', 100, family, st.weight || 700))) + 30;
    return (lines.length * 118 + 20) / w;
  }

  /** Aperçu SVG (bibliothèque). */
  function preview(id, main, second) {
    const s = SHAPES[id];
    if (!s) return '';
    const col = c => (c === 'main' ? main || s.main : c === 'second' ? second || s.second || '#ffffff' : c);
    return `<svg viewBox="0 0 100 100" class="sticker-preview" aria-hidden="true">${s.paths.map(p => `<path d="${p.d}" fill="${p.fill === 'none' ? 'none' : col(p.fill)}"${p.stroke ? ` stroke="${col(p.stroke)}" stroke-width="${p.sw}" stroke-linecap="${p.cap || 'butt'}" stroke-linejoin="${p.join || 'miter'}"` : ''}${p.dash ? ` stroke-dasharray="${p.dash}"` : ''}${p.opacity ? ` opacity="${p.opacity}"` : ''}/>`).join('')}</svg>`;
  }

  return { SHAPES, EMOJIS, textAspect, preview };
})();
