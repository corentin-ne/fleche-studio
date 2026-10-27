// @ts-check
/* =========================================================================
   Thèmes prêts à l'emploi : un clic règle couleurs, fond, cases et polices.
   Chaque thème est un « patch » appliqué sur le design par défaut ;
   le titre et les images de l'utilisateur sont conservés.
   confetti (facultatif) : couleurs et emojis de la pluie de fin de partie.
   ========================================================================= */
window.MF = window.MF || {};

MF.themes = (() => {
  const { t } = MF.i18n;
  const T = {
    violet: {
      label: t('Violet doux'), moods: ['soft'],
      design: { accent: '#7b3fe4', background: { type: 'solid', c1: '#f6f1ff' }, cell: { style: 'classic', gap: 0, radius: 0, line: 3, letterShape: 'square', shadow: false }, voids: 'frame', font: { clue: 'inter', letter: 'inter' } },
    },
    canva: {
      label: t('Rouge magazine'), moods: ['vivid'],
      design: { accent: '#e8212b', background: { type: 'none' }, poster: { padding: 0 }, cell: { style: 'classic', gap: 0, radius: 0, line: 3, letterShape: 'square', shadow: false }, voids: 'frame', font: { clue: 'inter', letter: 'inter' } },
    },
    print: {
      label: t('Noir & blanc'), moods: ['soft'],
      design: { accent: '#1d1b22', colors: { clue: '#ececec', arrow: '#1d1b22' }, background: { type: 'solid', c1: '#ffffff' }, cell: { style: 'thin', gap: 0, radius: 0, line: 2, letterShape: 'square', shadow: false }, frame: { width: 10 }, voids: 'hatch', font: { clue: 'inter', letter: 'inter' } },
    },
    pastel: {
      label: t('Pastel'), moods: ['soft'],
      design: { accent: '#e889b5', colors: { clue: '#fde7f1', line: '#f3c4da', frame: '#e889b5' }, background: { type: 'mesh', c1: '#fff6fb', c2: '#ffd6ea', c3: '#d8e8ff' }, cell: { style: 'rounded', gap: 0, radius: 18, line: 3, letterShape: 'square', shadow: false }, voids: 'light', frame: { width: 18, radius: 30 }, font: { clue: 'nunito', letter: 'nunito', clueWeight: 700 }, title: { font: 'baloo' } },
    },
    candy: {
      label: t('Bonbons'), moods: ['vivid', 'party'],
      design: { accent: '#ff4d8d', colors: { clue: '#fff1a8', arrow: '#7b3fe4' }, background: { type: 'pattern', pattern: 'confetti', c1: '#fff7e6', c2: '#ff8fb1', c3: '#7cc6ff', scale: 1.2 }, cell: { style: 'bubbles', gap: 6, radius: 22, line: 0, letterShape: 'circle', shadow: false }, voids: 'transparent', frame: { width: 0 }, font: { clue: 'baloo', letter: 'baloo', clueWeight: 700 }, title: { font: 'baloo' } },
    },
    neon: {
      label: t('Néon'), moods: ['dark', 'vivid'],
      design: { accent: '#00e5ff', colors: { letter: '#151532', clue: '#22224a', ink: '#ffffff', clueInk: '#d8dcff', arrow: '#ff3ec8', line: '#3a3a7a', frame: '#00e5ff', solution: '#00e5ff' }, background: { type: 'gradient', c1: '#0b0b1f', c2: '#1a0b3a', c3: '#0b2a3a', angle: 160 }, cell: { style: 'tiles', gap: 8, radius: 12, line: 0, letterShape: 'square', shadow: true }, voids: 'transparent', frame: { width: 0 }, font: { clue: 'grotesk', letter: 'grotesk' }, title: { font: 'marker', color: '#00e5ff' } },
    },
    kraft: {
      label: t('Kraft vintage'), moods: ['soft'],
      design: { accent: '#6b4226', colors: { letter: '#fdf6e3', clue: '#efe0c2', ink: '#3b2516', clueInk: '#3b2516', arrow: '#a0522d' }, background: { type: 'pattern', pattern: 'notebook', c1: '#d8b98a', c2: '#c4a070', c3: '#c9a87a', scale: 1 }, cell: { style: 'classic', gap: 0, radius: 0, line: 3, letterShape: 'square', shadow: false }, arrows: { style: 'chevron' }, voids: 'frame', frame: { width: 22, radius: 8 }, font: { clue: 'playfair', letter: 'playfair', clueWeight: 700 }, title: { font: 'playfair' } },
    },
    chalk: {
      label: t('Tableau noir'), moods: ['dark'],
      design: { accent: '#f4f1e8', colors: { letter: '#2f4636', clue: '#3c5845', ink: '#f6f3ea', clueInk: '#f6f3ea', arrow: '#ffd86b', line: '#c9d6cc', frame: '#5b3b23', solution: '#ffffff' }, background: { type: 'radial', c1: '#3e5a47', c2: '#24362a' }, cell: { style: 'thin', gap: 0, radius: 0, line: 2, letterShape: 'square', shadow: false }, voids: 'transparent', frame: { width: 30, radius: 6 }, font: { clue: 'patrick', letter: 'caveat', clueWeight: 400 }, title: { font: 'caveat', color: '#ffffff' } },
    },
    ocean: {
      label: t('Océan'), moods: ['vivid'],
      design: { accent: '#0f5c8c', colors: { clue: '#d7efff', arrow: '#0f5c8c' }, background: { type: 'pattern', pattern: 'waves', c1: '#0f5c8c', c2: '#1d76ad', c3: '#ffffff', scale: 1.6 }, cell: { style: 'tiles', gap: 8, radius: 16, line: 0, letterShape: 'square', shadow: true }, voids: 'transparent', frame: { width: 0 }, font: { clue: 'nunito', letter: 'nunito', clueWeight: 700 }, title: { font: 'baloo', color: '#ffffff' } },
    },
    forest: {
      label: t('Forêt'), moods: ['soft'],
      design: { accent: '#2f6b3a', colors: { clue: '#e3f1dc' }, background: { type: 'mesh', c1: '#eef6e8', c2: '#bfe0a8', c3: '#f6e7b4' }, cell: { style: 'rounded', gap: 0, radius: 16, line: 3, letterShape: 'square', shadow: false }, voids: 'frame', frame: { width: 24, radius: 28 }, font: { clue: 'nunito', letter: 'nunito', clueWeight: 700 }, title: { font: 'fraunces' } },
    },
    sunset: {
      label: t('Coucher de soleil'), moods: ['vivid'],
      design: { accent: '#ff6a3d', colors: { clue: '#ffe3d1', arrow: '#c2185b' }, background: { type: 'gradient', c1: '#ffb36b', c2: '#ff6a8a', c3: '#7b3fe4', angle: 180 }, cell: { style: 'tiles', gap: 7, radius: 12, line: 0, letterShape: 'square', shadow: true }, voids: 'transparent', frame: { width: 0 }, font: { clue: 'grotesk', letter: 'grotesk' }, title: { font: 'baloo', color: '#ffffff' } },
    },
    love: {
      label: t('Love'), moods: ['party', 'soft'],
      design: { accent: '#e5384f', colors: { clue: '#ffe1e6' }, background: { type: 'pattern', pattern: 'hearts', c1: '#fff0f3', c2: '#ffc2cf', c3: '#ff8fa6', scale: 1.1 }, cell: { style: 'rounded', gap: 0, radius: 20, line: 3, letterShape: 'square', shadow: false }, voids: 'frame', frame: { width: 20, radius: 36 }, font: { clue: 'nunito', letter: 'fraunces', clueWeight: 700 }, title: { font: 'caveat' } },
    },
    minimal: {
      label: t('Minimal'), moods: ['soft'],
      design: { accent: '#222222', colors: { clue: '#f4f4f4', line: '#d0d0d0', arrow: '#ff5a36' }, background: { type: 'solid', c1: '#ffffff' }, cell: { style: 'thin', gap: 0, radius: 0, line: 1.5, letterShape: 'square', shadow: false }, voids: 'light', frame: { width: 4 }, font: { clue: 'grotesk', letter: 'grotesk', clueWeight: 500 }, arrows: { style: 'chevron' }, title: { font: 'grotesk' } },
    },
    xmas: {
      label: t('Noël'), moods: ['party'],
      design: { accent: '#b3202c', colors: { clue: '#e9f4ea', arrow: '#1f6b3a' }, background: { type: 'pattern', pattern: 'stars', c1: '#123d27', c2: '#f3d36b', c3: '#ffffff', scale: 1 }, cell: { style: 'rounded', gap: 0, radius: 14, line: 3, letterShape: 'square', shadow: false }, voids: 'frame', frame: { width: 24, radius: 20 }, font: { clue: 'nunito', letter: 'fraunces', clueWeight: 700 }, title: { font: 'playfair', color: '#ffffff' } },
    },
    memphis: {
      label: t('Memphis 90s'), moods: ['vivid'],
      design: { accent: '#231f20', colors: { clue: '#fff27a', arrow: '#ff3e8a' }, background: { type: 'pattern', pattern: 'memphis', c1: '#9fe7f5', c2: '#ff3e8a', c3: '#231f20', scale: 1 }, cell: { style: 'bold', gap: 0, radius: 0, line: 6, letterShape: 'square', shadow: false }, voids: 'hatch', frame: { width: 14 }, font: { clue: 'grotesk', letter: 'grotesk', clueWeight: 700 }, title: { font: 'marker' } },
    },
    mint: {
      label: t('Menthe fraîche'), moods: ['soft'],
      design: { accent: '#16a394', colors: { clue: '#dcf5ef', arrow: '#0f7a6e' }, background: { type: 'mesh', c1: '#f0fbf8', c2: '#bdeee0', c3: '#fff1c9' }, cell: { style: 'rounded', gap: 0, radius: 16, line: 3, letterShape: 'square', shadow: false }, voids: 'light', frame: { width: 18, radius: 26 }, font: { clue: 'nunito', letter: 'nunito', clueWeight: 700 }, title: { font: 'baloo' } },
    },
    lavender: {
      label: t('Lavande'), moods: ['soft'],
      design: { accent: '#8e6bd8', colors: { clue: '#ece4fb', arrow: '#6a45c2' }, background: { type: 'pattern', pattern: 'dots', c1: '#f7f3ff', c2: '#ddd0fa', c3: '#cbbaf5', scale: 1 }, cell: { style: 'bubbles', gap: 6, radius: 22, line: 0, letterShape: 'circle', shadow: false }, voids: 'transparent', frame: { width: 0 }, font: { clue: 'baloo', letter: 'baloo', clueWeight: 700 }, title: { font: 'caveat' } },
    },
    coral: {
      label: t('Corail'), moods: ['vivid'],
      design: { accent: '#ff5a5f', colors: { clue: '#ffe4e1', arrow: '#d93a49' }, background: { type: 'gradient', c1: '#fff3ec', c2: '#ffd7cc', c3: '#ffc2d1', angle: 150 }, cell: { style: 'tiles', gap: 7, radius: 12, line: 0, letterShape: 'square', shadow: true }, voids: 'transparent', frame: { width: 0 }, font: { clue: 'grotesk', letter: 'grotesk' }, title: { font: 'baloo' } },
    },
    rainbow: {
      label: t('Arc-en-ciel'), moods: ['vivid', 'party'],
      design: { accent: '#7b3fe4', colors: { clue: '#fff7d6', arrow: '#e5384f' }, background: { type: 'gradient', c1: '#ffd6e0', c2: '#fff3b0', c3: '#c7f0ff', angle: 120 }, cell: { style: 'tiles', gap: 8, radius: 14, line: 0, letterShape: 'square', shadow: true }, voids: 'transparent', frame: { width: 0 }, font: { clue: 'baloo', letter: 'baloo', clueWeight: 700 }, title: { font: 'baloo' }, multi: { on: true, targets: { letters: true, cells: false, clues: false, words: true }, mode: 'letter', preset: 'rainbow', palette: ['#e53935', '#fb8c00', '#fdd835', '#43a047', '#1e88e5', '#3949ab', '#8e24aa'] } },
    },
    crayons: {
      label: t('Crayons de couleur'), moods: ['party', 'vivid'],
      design: { accent: '#3a3a5c', colors: { clue: '#ffffff', arrow: '#3a3a5c', line: '#3a3a5c', frame: '#3a3a5c' }, background: { type: 'pattern', pattern: 'dots', c1: '#fffdf6', c2: '#ffe3ef', c3: '#d8f0ff', scale: 1 }, cell: { style: 'rounded', gap: 0, radius: 14, line: 3, letterShape: 'square', shadow: false }, voids: 'frame', frame: { width: 16, radius: 24 }, font: { clue: 'nunito', letter: 'baloo', clueWeight: 700 }, title: { font: 'baloo' }, multi: { on: true, targets: { letters: true, cells: false, clues: true, words: true }, mode: 'word', preset: 'candy', palette: ['#ff4d8d', '#ff9f1c', '#ffd23f', '#3ec300', '#00bbf9', '#9b5de5'] } },
    },
    night: {
      label: t('Nuit étoilée'), moods: ['dark'],
      design: { accent: '#ffd166', colors: { letter: '#14213d', clue: '#1f3160', ink: '#fdf6e3', clueInk: '#e6ecff', arrow: '#ffd166', line: '#2c4377', frame: '#0b1530', solution: '#ffd166' }, background: { type: 'pattern', pattern: 'stars', c1: '#0b1530', c2: '#ffd166', c3: '#ffffff', scale: 1 }, cell: { style: 'tiles', gap: 8, radius: 12, line: 0, letterShape: 'square', shadow: true }, voids: 'transparent', frame: { width: 0 }, font: { clue: 'nunito', letter: 'fraunces', clueWeight: 700 }, title: { font: 'fraunces', color: '#ffd166' } },
    },
    gold: {
      label: t('Noir & or'), moods: ['dark'],
      design: { accent: '#c9a227', colors: { letter: '#1a1a1a', clue: '#262626', ink: '#f3e3b0', clueInk: '#e9d48f', arrow: '#c9a227', line: '#c9a227', frame: '#c9a227', solution: '#ffd76a' }, background: { type: 'solid', c1: '#0e0e0e' }, cell: { style: 'thin', gap: 0, radius: 0, line: 1.5, letterShape: 'square', shadow: false }, voids: 'transparent', frame: { width: 6 }, font: { clue: 'playfair', letter: 'playfair', clueWeight: 700 }, arrows: { style: 'chevron' }, title: { font: 'playfair', color: '#c9a227' } },
    },
    birthday: {
      label: t('Anniversaire'), moods: ['party', 'vivid'],
      design: { accent: '#ff7a00', colors: { clue: '#fff0c2', arrow: '#e5384f' }, background: { type: 'pattern', pattern: 'confetti', c1: '#fffaf0', c2: '#ff7a00', c3: '#1f8fff', scale: 1.1 }, cell: { style: 'rounded', gap: 0, radius: 18, line: 3, letterShape: 'square', shadow: false }, voids: 'frame', frame: { width: 20, radius: 30 }, font: { clue: 'baloo', letter: 'baloo', clueWeight: 700 }, title: { font: 'baloo' } },
    },
    halloween: {
      label: t('Halloween'), moods: ['party', 'dark'],
      design: { accent: '#ff7518', colors: { letter: '#fff4e6', clue: '#3a2350', clueInk: '#fbe9d0', arrow: '#ff7518', frame: '#2a1838', line: '#2a1838' }, background: { type: 'pattern', pattern: 'bats', c1: '#34204a', c2: '#1b0f26', c3: '#ff9a3c', scale: 1.3 }, cell: { style: 'classic', gap: 0, radius: 0, line: 3, letterShape: 'square', shadow: false }, voids: 'frame', frame: { width: 24, radius: 12 }, font: { clue: 'patrick', letter: 'marker', clueWeight: 400 }, title: { font: 'marker', color: '#ff7518' } },
      confetti: { colors: ['#ff7518', '#8e44ad', '#8fd16a', '#ffd23f', '#2a1838'], emojis: ['🎃', '👻', '🦇', '🍬', '🕷️'] },
    },
    easter: {
      label: t('Pâques'), moods: ['party', 'soft'],
      design: { accent: '#8e6bd8', colors: { clue: '#fdf3d8', arrow: '#5f9a4a', line: '#d9c8ee', frame: '#b7d98a' }, background: { type: 'pattern', pattern: 'eggs', c1: '#f4fbef', c2: '#f6c9dc', c3: '#b9e0f2', scale: 1.1 }, cell: { style: 'rounded', gap: 0, radius: 16, line: 3, letterShape: 'square', shadow: false }, voids: 'light', frame: { width: 20, radius: 28 }, font: { clue: 'nunito', letter: 'baloo', clueWeight: 700 }, title: { font: 'baloo', color: '#5f9a4a' } },
      confetti: { colors: ['#f6c9dc', '#b9e0f2', '#f6e08a', '#b7d98a', '#c8a0e0'], emojis: ['🐣', '🥚', '🐰', '🌷', '🍫'] },
    },
    carnival: {
      label: t('Carnaval'), moods: ['party', 'vivid'],
      design: { accent: '#6a1f6e', colors: { clue: '#fff1c2', arrow: '#e0283a', frame: '#6a1f6e', solution: '#e0283a' }, background: { type: 'pattern', pattern: 'harlequin', c1: '#2a0f2e', c2: '#6a1f6e', c3: '#f2c94c', scale: 1 }, cell: { style: 'tiles', gap: 6, radius: 10, line: 0, letterShape: 'square', shadow: true }, voids: 'transparent', frame: { width: 0 }, font: { clue: 'grotesk', letter: 'playfair', clueWeight: 700 }, title: { font: 'playfair', color: '#f2c94c' } },
      confetti: { colors: ['#e0283a', '#f2c94c', '#3fa08a', '#6a1f6e', '#2f6a9a'], emojis: ['🎭', '🎊', '🎉', '🪶'] },
    },
    lunar: {
      label: t('Nouvel an chinois'), moods: ['party', 'vivid'],
      design: { accent: '#b3202c', colors: { letter: '#fff8e8', clue: '#f9e1b0', ink: '#3a1010', clueInk: '#7a1018', arrow: '#b3202c', line: '#e0b23a', frame: '#e0b23a', solution: '#b3202c' }, background: { type: 'pattern', pattern: 'lanterns', c1: '#a81c26', c2: '#e8a020', c3: '#fbe3a0', scale: 1.2 }, cell: { style: 'classic', gap: 0, radius: 0, line: 3, letterShape: 'square', shadow: false }, voids: 'frame', frame: { width: 22, radius: 10 }, font: { clue: 'nunito', letter: 'fraunces', clueWeight: 700 }, title: { font: 'fraunces', color: '#fbe3a0' } },
      confetti: { colors: ['#b3202c', '#e0b23a', '#f2c14e', '#7a1018'], emojis: ['🧧', '🏮', '🐉', '🧨', '🍊'] },
    },
  };

  /** Ambiances proposées pour filtrer les thèmes. */
  const MOODS = { soft: t('Doux'), vivid: t('Vifs'), dark: t('Sombres'), party: t('Fêtes') };

  /** Design par défaut + thème, en gardant le contenu de l'utilisateur (titre, image de fond, format). */
  function apply(design, id) {
    const theme = T[id];
    if (!theme) return design;
    const D = MF.design.DEFAULT;
    const base = MF.design.merge(D, { title: design.title, poster: { ...design.poster, padding: D.poster.padding }, lists: design.lists });
    const next = MF.design.merge(base, theme.design);
    next.theme = id;
    // L'image de fond importée reste disponible si on revient au type « Image »
    if (design.background.imageId) next.background.imageId = design.background.imageId;
    next.title = { ...next.title, text: design.title.text, subtitle: design.title.subtitle, show: design.title.show };
    return MF.schema.design(next);
  }

  /** Aperçu miniature (couleurs principales) d'un thème. */
  function swatch(id) {
    const d = MF.schema.design(MF.design.merge(MF.design.DEFAULT, T[id].design));
    const C = MF.design.resolve(d);
    const bg = MF.backgrounds.css(d.background, { none: 'repeating-conic-gradient(#ddd 0 25%, #fff 0 50%) 0 0/10px 10px' });
    return { bg, C, d };
  }

  return { THEMES: T, MOODS, apply, swatch };
})();
