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
      design: { accent: '#ff4d8d', colors: { clue: '#fff1a8', arrow: '#7b3fe4' }, background: { type: 'pattern', pattern: 'confetti', c1: '#fff7e6', c2: '#ff8fb1', c3: '#7cc6ff', scale: 1.6 }, cell: { style: 'bubbles', gap: 6, radius: 22, line: 0, letterShape: 'circle', shadow: false }, voids: 'transparent', frame: { width: 0 }, font: { clue: 'baloo', letter: 'baloo', clueWeight: 700 }, title: { font: 'baloo' } },
    },
    neon: {
      label: t('Néon'), moods: ['dark', 'vivid'],
      design: { accent: '#00e5ff', colors: { letter: '#151532', clue: '#22224a', ink: '#ffffff', clueInk: '#d8dcff', arrow: '#ff3ec8', line: '#3a3a7a', frame: '#00e5ff', solution: '#00e5ff' }, background: { type: 'gradient', c1: '#0b0b1f', c2: '#1a0b3a', c3: '#0b2a3a', angle: 160 }, cell: { style: 'tiles', gap: 8, radius: 12, line: 0, letterShape: 'square', shadow: true }, voids: 'transparent', frame: { width: 0 }, font: { clue: 'grotesk', letter: 'grotesk' }, title: { font: 'marker', color: '#00e5ff' } },
    },
    kraft: {
      label: t('Kraft vintage'), moods: ['soft'],
      design: { accent: '#6b4226', colors: { letter: '#fdf6e3', clue: '#efe0c2', ink: '#3b2516', clueInk: '#3b2516', arrow: '#a0522d' }, background: { type: 'pattern', pattern: 'notebook', c1: '#d8b98a', c2: '#c4a070', c3: '#c9a87a', scale: 1.4 }, cell: { style: 'classic', gap: 0, radius: 0, line: 3, letterShape: 'square', shadow: false }, arrows: { style: 'chevron' }, voids: 'frame', frame: { width: 22, radius: 8 }, font: { clue: 'playfair', letter: 'playfair', clueWeight: 700 }, title: { font: 'playfair' } },
    },
    chalk: {
      label: t('Tableau noir'), moods: ['dark'],
      design: { accent: '#f4f1e8', colors: { letter: '#2f4636', clue: '#3c5845', ink: '#f6f3ea', clueInk: '#f6f3ea', arrow: '#ffd86b', line: '#c9d6cc', frame: '#5b3b23', solution: '#ffffff' }, background: { type: 'radial', c1: '#3e5a47', c2: '#24362a' }, cell: { style: 'thin', gap: 0, radius: 0, line: 2, letterShape: 'square', shadow: false }, voids: 'transparent', frame: { width: 30, radius: 6 }, font: { clue: 'patrick', letter: 'caveat', clueWeight: 400 }, title: { font: 'caveat', color: '#ffffff' } },
    },
    ocean: {
      label: t('Océan'), moods: ['vivid'],
      design: { accent: '#0f5c8c', colors: { clue: '#d7efff', arrow: '#0f5c8c' }, background: { type: 'pattern', pattern: 'seaMix', c1: '#0f5c8c', c2: '#3d8fc4', c3: '#d7efff', scale: 1 }, cell: { style: 'tiles', gap: 8, radius: 16, line: 0, letterShape: 'square', shadow: true }, voids: 'transparent', frame: { width: 0 }, font: { clue: 'nunito', letter: 'nunito', clueWeight: 700 }, title: { font: 'baloo', color: '#ffffff' } },
    },
    forest: {
      label: t('Forêt'), moods: ['soft'],
      design: { accent: '#2f6b3a', colors: { clue: '#e3f1dc' }, background: { type: 'pattern', pattern: 'forestMix', c1: '#eef6e8', c2: '#a8d48f', c3: '#e8b86a', scale: 1 }, cell: { style: 'rounded', gap: 0, radius: 16, line: 3, letterShape: 'square', shadow: false }, voids: 'transparent', frame: { width: 24, radius: 28 }, font: { clue: 'nunito', letter: 'nunito', clueWeight: 700 }, title: { font: 'fraunces' } },
    },
    sunset: {
      label: t('Coucher de soleil'), moods: ['vivid'],
      design: { accent: '#ff6a3d', colors: { clue: '#ffe3d1', arrow: '#c2185b' }, background: { type: 'gradient', c1: '#ffb36b', c2: '#ff6a8a', c3: '#7b3fe4', angle: 180 }, cell: { style: 'tiles', gap: 7, radius: 12, line: 0, letterShape: 'square', shadow: true }, voids: 'transparent', frame: { width: 0 }, font: { clue: 'grotesk', letter: 'grotesk' }, title: { font: 'baloo', color: '#ffffff' } },
    },
    love: {
      label: t('Love'), moods: ['party', 'soft'],
      design: { accent: '#e5384f', colors: { clue: '#ffe1e6' }, background: { type: 'pattern', pattern: 'loveMix', c1: '#fff0f3', c2: '#ffb3c4', c3: '#ff7f99', scale: 1 }, cell: { style: 'rounded', gap: 0, radius: 20, line: 3, letterShape: 'square', shadow: false }, voids: 'transparent', frame: { width: 20, radius: 36 }, font: { clue: 'nunito', letter: 'fraunces', clueWeight: 700 }, title: { font: 'caveat' } },
    },
    minimal: {
      label: t('Minimal'), moods: ['soft'],
      design: { accent: '#222222', colors: { clue: '#f4f4f4', line: '#d0d0d0', arrow: '#ff5a36' }, background: { type: 'solid', c1: '#ffffff' }, cell: { style: 'thin', gap: 0, radius: 0, line: 1.5, letterShape: 'square', shadow: false }, voids: 'light', frame: { width: 4 }, font: { clue: 'grotesk', letter: 'grotesk', clueWeight: 500 }, arrows: { style: 'chevron' }, title: { font: 'grotesk' } },
    },
    xmas: {
      label: t('Noël'), moods: ['party'],
      design: { accent: '#b3202c', colors: { clue: '#e9f4ea', arrow: '#1f6b3a' }, background: { type: 'pattern', pattern: 'xmasMix', c1: '#123d27', c2: '#e8c45a', c3: '#ffffff', scale: 1 }, cell: { style: 'rounded', gap: 0, radius: 14, line: 3, letterShape: 'square', shadow: false }, voids: 'transparent', frame: { width: 24, radius: 20 }, font: { clue: 'nunito', letter: 'fraunces', clueWeight: 700 }, title: { font: 'playfair', color: '#ffffff' } },
    },
    memphis: {
      label: t('Memphis 90s'), moods: ['vivid'],
      design: { accent: '#231f20', colors: { clue: '#fff27a', arrow: '#ff3e8a' }, background: { type: 'pattern', pattern: 'memphis', c1: '#9fe7f5', c2: '#ff3e8a', c3: '#231f20', scale: 1.5 }, cell: { style: 'bold', gap: 0, radius: 0, line: 6, letterShape: 'square', shadow: false }, voids: 'hatch', frame: { width: 14 }, font: { clue: 'grotesk', letter: 'grotesk', clueWeight: 700 }, title: { font: 'marker' } },
    },
    mint: {
      label: t('Menthe fraîche'), moods: ['soft'],
      design: { accent: '#16a394', colors: { clue: '#dcf5ef', arrow: '#0f7a6e' }, background: { type: 'mesh', c1: '#f0fbf8', c2: '#bdeee0', c3: '#fff1c9' }, cell: { style: 'rounded', gap: 0, radius: 16, line: 3, letterShape: 'square', shadow: false }, voids: 'light', frame: { width: 18, radius: 26 }, font: { clue: 'nunito', letter: 'nunito', clueWeight: 700 }, title: { font: 'baloo' } },
    },
    lavender: {
      label: t('Lavande'), moods: ['soft'],
      design: { accent: '#8e6bd8', colors: { clue: '#ece4fb', arrow: '#6a45c2' }, background: { type: 'pattern', pattern: 'flowers', c1: '#f7f3ff', c2: '#ddd0fa', c3: '#c3aef2', scale: 1.4 }, cell: { style: 'bubbles', gap: 6, radius: 22, line: 0, letterShape: 'circle', shadow: false }, voids: 'transparent', frame: { width: 0 }, font: { clue: 'baloo', letter: 'baloo', clueWeight: 700 }, title: { font: 'caveat' } },
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
      design: { accent: '#3a3a5c', colors: { clue: '#ffffff', arrow: '#3a3a5c', line: '#3a3a5c', frame: '#3a3a5c' }, background: { type: 'pattern', pattern: 'dots', c1: '#fffdf6', c2: '#ffe3ef', c3: '#d8f0ff', scale: 1.6 }, cell: { style: 'rounded', gap: 0, radius: 14, line: 3, letterShape: 'square', shadow: false }, voids: 'frame', frame: { width: 16, radius: 24 }, font: { clue: 'nunito', letter: 'baloo', clueWeight: 700 }, title: { font: 'baloo' }, multi: { on: true, targets: { letters: true, cells: false, clues: true, words: true }, mode: 'word', preset: 'candy', palette: ['#ff4d8d', '#ff9f1c', '#ffd23f', '#3ec300', '#00bbf9', '#9b5de5'] } },
    },
    night: {
      label: t('Nuit étoilée'), moods: ['dark'],
      design: { accent: '#ffd166', colors: { letter: '#14213d', clue: '#1f3160', ink: '#fdf6e3', clueInk: '#e6ecff', arrow: '#ffd166', line: '#2c4377', frame: '#0b1530', solution: '#ffd166' }, background: { type: 'pattern', pattern: 'nightMix', c1: '#0b1530', c2: '#ffd166', c3: '#8aa0d8', scale: 1 }, cell: { style: 'tiles', gap: 8, radius: 12, line: 0, letterShape: 'square', shadow: true }, voids: 'transparent', frame: { width: 0 }, font: { clue: 'nunito', letter: 'fraunces', clueWeight: 700 }, title: { font: 'fraunces', color: '#ffd166' } },
    },
    gold: {
      label: t('Noir & or'), moods: ['dark'],
      design: { accent: '#c9a227', colors: { letter: '#1a1a1a', clue: '#262626', ink: '#f3e3b0', clueInk: '#e9d48f', arrow: '#c9a227', line: '#c9a227', frame: '#c9a227', solution: '#ffd76a' }, background: { type: 'solid', c1: '#0e0e0e' }, cell: { style: 'thin', gap: 0, radius: 0, line: 1.5, letterShape: 'square', shadow: false }, voids: 'transparent', frame: { width: 6 }, font: { clue: 'playfair', letter: 'playfair', clueWeight: 700 }, arrows: { style: 'chevron' }, title: { font: 'playfair', color: '#c9a227' } },
    },
    birthday: {
      label: t('Anniversaire'), moods: ['party', 'vivid'],
      design: { accent: '#ff7a00', colors: { clue: '#fff0c2', arrow: '#e5384f' }, background: { type: 'pattern', pattern: 'partyMix', c1: '#fffaf0', c2: '#ff7a00', c3: '#1f8fff', scale: 1 }, cell: { style: 'rounded', gap: 0, radius: 18, line: 3, letterShape: 'square', shadow: false }, voids: 'transparent', frame: { width: 20, radius: 30 }, font: { clue: 'baloo', letter: 'baloo', clueWeight: 700 }, title: { font: 'baloo' } },
    },
    halloween: {
      label: t('Halloween'), moods: ['party', 'dark'],
      design: { accent: '#ff7518', colors: { letter: '#fff4e6', clue: '#3a2350', clueInk: '#fbe9d0', arrow: '#ff7518', frame: '#2a1838', line: '#2a1838' }, background: { type: 'pattern', pattern: 'halloweenMix', c1: '#34204a', c2: '#ff8a2a', c3: '#d9c8f0', scale: 1 }, cell: { style: 'classic', gap: 0, radius: 0, line: 3, letterShape: 'square', shadow: false }, voids: 'transparent', frame: { width: 24, radius: 12 }, font: { clue: 'patrick', letter: 'marker', clueWeight: 400 }, title: { font: 'marker', color: '#ff7518' } },
      confetti: { colors: ['#ff7518', '#8e44ad', '#8fd16a', '#ffd23f', '#2a1838'], emojis: ['🎃', '👻', '🦇', '🍬', '🕷️'] },
    },
    easter: {
      label: t('Pâques'), moods: ['party', 'soft'],
      design: { accent: '#8e6bd8', colors: { clue: '#fdf3d8', arrow: '#5f9a4a', line: '#d9c8ee', frame: '#b7d98a' }, background: { type: 'pattern', pattern: 'easterMix', c1: '#f4fbef', c2: '#f4b6cf', c3: '#f2d86a', scale: 1 }, cell: { style: 'rounded', gap: 0, radius: 16, line: 3, letterShape: 'square', shadow: false }, voids: 'transparent', frame: { width: 20, radius: 28 }, font: { clue: 'nunito', letter: 'baloo', clueWeight: 700 }, title: { font: 'baloo', color: '#5f9a4a' } },
      confetti: { colors: ['#f6c9dc', '#b9e0f2', '#f6e08a', '#b7d98a', '#c8a0e0'], emojis: ['🐣', '🥚', '🐰', '🌷', '🍫'] },
    },
    carnival: {
      label: t('Carnaval'), moods: ['party', 'vivid'],
      design: { accent: '#6a1f6e', colors: { clue: '#fff1c2', arrow: '#e0283a', frame: '#6a1f6e', solution: '#e0283a' }, background: { type: 'pattern', pattern: 'harlequin', c1: '#2a0f2e', c2: '#6a1f6e', c3: '#f2c94c', scale: 1.6 }, cell: { style: 'tiles', gap: 6, radius: 10, line: 0, letterShape: 'square', shadow: true }, voids: 'transparent', frame: { width: 0 }, font: { clue: 'grotesk', letter: 'playfair', clueWeight: 700 }, title: { font: 'playfair', color: '#f2c94c' } },
      confetti: { colors: ['#e0283a', '#f2c94c', '#3fa08a', '#6a1f6e', '#2f6a9a'], emojis: ['🎭', '🎊', '🎉', '🪶'] },
    },
    lunar: {
      label: t('Nouvel an chinois'), moods: ['party', 'vivid'],
      design: { accent: '#b3202c', colors: { letter: '#fff8e8', clue: '#f9e1b0', ink: '#3a1010', clueInk: '#7a1018', arrow: '#b3202c', line: '#e0b23a', frame: '#e0b23a', solution: '#b3202c' }, background: { type: 'pattern', pattern: 'lunarMix', c1: '#a81c26', c2: '#e8a020', c3: '#fbe3a0', scale: 1 }, cell: { style: 'classic', gap: 0, radius: 0, line: 3, letterShape: 'square', shadow: false }, voids: 'transparent', frame: { width: 22, radius: 10 }, font: { clue: 'nunito', letter: 'fraunces', clueWeight: 700 }, title: { font: 'fraunces', color: '#fbe3a0' } },
      confetti: { colors: ['#b3202c', '#e0b23a', '#f2c14e', '#7a1018'], emojis: ['🧧', '🏮', '🐉', '🧨', '🍊'] },
    },
    pirates: {
      label: t('Pirates'), moods: ['dark', 'vivid'],
      design: { accent: '#e0a94a', colors: { letter: '#f6ead2', clue: '#e7d3a8', ink: '#2a1a10', clueInk: '#3b2516', arrow: '#8a2a2a', line: '#5a3a22', frame: '#3b2516', solution: '#8a2a2a' }, background: { type: 'pattern', pattern: 'pirateMix', c1: '#123e52', c2: '#e0a94a', c3: '#f6ead2', scale: 1 }, cell: { style: 'classic', gap: 0, radius: 0, line: 3, letterShape: 'square', shadow: false }, voids: 'transparent', frame: { width: 22, radius: 8 }, font: { clue: 'patrick', letter: 'playfair', clueWeight: 400 }, title: { font: 'marker', color: '#e0a94a' } },
      confetti: { colors: ['#e0a94a', '#8a2a2a', '#123e52', '#f6ead2'], emojis: ['🏴‍☠️', '💰', '⚓', '🦜'] },
    },
    space: {
      label: t('Espace'), moods: ['dark'],
      design: { accent: '#7f8cff', colors: { letter: '#1b2440', clue: '#26305a', ink: '#ffffff', clueInk: '#cfd6ff', arrow: '#ffcc4d', line: '#3a4680', frame: '#7f8cff', solution: '#ffcc4d' }, background: { type: 'pattern', pattern: 'spaceMix', c1: '#0b1028', c2: '#5a66c8', c3: '#ffcc4d', scale: 1 }, cell: { style: 'tiles', gap: 8, radius: 12, line: 0, letterShape: 'square', shadow: true }, voids: 'transparent', frame: { width: 0 }, font: { clue: 'grotesk', letter: 'grotesk' }, title: { font: 'grotesk', color: '#ffcc4d' } },
      confetti: { colors: ['#7f8cff', '#ffcc4d', '#ffffff', '#ff6ad5'], emojis: ['🚀', '🪐', '⭐', '👽'] },
    },
    japan: {
      label: t('Japon'), moods: ['soft'],
      design: { accent: '#c0283a', colors: { clue: '#fbe7e7', arrow: '#c0283a', line: '#e8c4c4', frame: '#c0283a' }, background: { type: 'pattern', pattern: 'japanMix', c1: '#fdf6f0', c2: '#f6b8c8', c3: '#e3cbb4', scale: 1 }, cell: { style: 'classic', gap: 0, radius: 0, line: 2, letterShape: 'square', shadow: false }, voids: 'transparent', frame: { width: 16, radius: 4 }, font: { clue: 'nunito', letter: 'fraunces', clueWeight: 700 }, title: { font: 'fraunces', color: '#c0283a' } },
      confetti: { colors: ['#f6b8c8', '#c0283a', '#ffffff', '#e3cbb4'], emojis: ['🌸', '🎏', '🍡'] },
    },
    egypt: {
      label: t('Égypte'), moods: ['vivid'],
      design: { accent: '#2f5e8c', colors: { clue: '#f6e3b0', arrow: '#b8862b', frame: '#b8862b', line: '#d9b870' }, background: { type: 'pattern', pattern: 'egyptMix', c1: '#ecd08a', c2: '#c9a456', c3: '#2f5e8c', scale: 1 }, cell: { style: 'classic', gap: 0, radius: 0, line: 3, letterShape: 'square', shadow: false }, voids: 'transparent', frame: { width: 20, radius: 6 }, font: { clue: 'nunito', letter: 'playfair', clueWeight: 700 }, title: { font: 'playfair', color: '#2f5e8c' } },
      confetti: { colors: ['#e0b23a', '#2f5e8c', '#c9a456', '#ffffff'], emojis: ['🐫', '🏺', '☀️'] },
    },
    mermaid: {
      label: t('Sirènes'), moods: ['soft', 'vivid'],
      design: { accent: '#1d6f8a', colors: { clue: '#dff6f2', arrow: '#1d6f8a', frame: '#7fd6c8', line: '#a8e2da' }, background: { type: 'pattern', pattern: 'mermaidMix', c1: '#e8f8f6', c2: '#7fd6c8', c3: '#f2a6c0', scale: 1 }, cell: { style: 'rounded', gap: 0, radius: 16, line: 3, letterShape: 'square', shadow: false }, voids: 'transparent', frame: { width: 18, radius: 28 }, font: { clue: 'nunito', letter: 'baloo', clueWeight: 700 }, title: { font: 'baloo', color: '#1d6f8a' } },
      confetti: { colors: ['#7fd6c8', '#f2a6c0', '#1d6f8a', '#ffffff'], emojis: ['🧜‍♀️', '🐚', '🐠', '🫧'] },
    },
    /* Versions 2D des univers Murdoku (même identifiant : voir MF.library) */
    manor: {
      label: t('Manoir'), moods: ['dark'],
      design: { accent: '#c99a5b', colors: { letter: '#fbf3e4', clue: '#ecd9b8', ink: '#2e1f18', clueInk: '#3a2a20', arrow: '#7a2e22', line: '#5b3a29', frame: '#5b3a29', solution: '#7a2e22' }, background: { type: 'pattern', pattern: 'fleurs', c1: '#3a2620', c2: '#5b3a29', c3: '#c99a5b', scale: 1.3 }, cell: { style: 'classic', gap: 0, radius: 0, line: 3, letterShape: 'square', shadow: false }, arrows: { style: 'chevron' }, voids: 'transparent', frame: { width: 22, radius: 6 }, font: { clue: 'playfair', letter: 'playfair', clueWeight: 700 }, title: { font: 'playfair', color: '#e8c48a' } },
      confetti: { colors: ['#c99a5b', '#7a2e22', '#fbf3e4', '#5b3a29'], emojis: ['🕯️', '🔍', '🗝️'] },
    },
    haunted: {
      label: t('Château hanté'), moods: ['dark'],
      design: { accent: '#8fd16a', colors: { letter: '#ede6f6', clue: '#3a3046', ink: '#1f1a2a', clueInk: '#e8dcff', arrow: '#5a8a3a', line: '#2b1d3a', frame: '#2b1d3a', solution: '#4a2e6a' }, background: { type: 'pattern', pattern: 'bats', c1: '#1f1a2a', c2: '#3a3046', c3: '#8fd16a', scale: 1 }, cell: { style: 'classic', gap: 0, radius: 0, line: 3, letterShape: 'square', shadow: false }, voids: 'transparent', frame: { width: 20, radius: 6 }, font: { clue: 'grotesk', letter: 'fraunces', clueWeight: 600 }, title: { font: 'fraunces', color: '#c8f0a8' } },
      confetti: { colors: ['#8fd16a', '#3a3046', '#ede6f6', '#b56ad8'], emojis: ['👻', '🦇', '🕸️', '🕯️'] },
    },
    paris: {
      label: t('Paris'), moods: ['soft'],
      design: { accent: '#24427a', colors: { clue: '#fbe4e6', arrow: '#c0392b', line: '#24427a', frame: '#24427a' }, background: { type: 'pattern', pattern: 'parisMix', c1: '#f6eef0', c2: '#24427a', c3: '#e8b4b8', scale: 1 }, cell: { style: 'classic', gap: 0, radius: 0, line: 3, letterShape: 'square', shadow: false }, voids: 'transparent', frame: { width: 18, radius: 12 }, font: { clue: 'nunito', letter: 'playfair', clueWeight: 700 }, title: { font: 'caveat', color: '#24427a' } },
      confetti: { colors: ['#24427a', '#ffffff', '#c0392b', '#e8b4b8'], emojis: ['🥐', '🗼', '🎨', '🥖'] },
    },
    regency: {
      label: t('Bal de la Régence'), moods: ['soft'],
      design: { accent: '#7d6bb3', colors: { clue: '#f4e8f6', arrow: '#b0507a', line: '#c9b6e8', frame: '#7d6bb3' }, background: { type: 'pattern', pattern: 'flowers', c1: '#f7f1fb', c2: '#d9c8f0', c3: '#f2c6d6', scale: 1.3 }, cell: { style: 'rounded', gap: 0, radius: 18, line: 3, letterShape: 'square', shadow: false }, voids: 'transparent', frame: { width: 20, radius: 26 }, font: { clue: 'playfair', letter: 'playfair', clueWeight: 700 }, title: { font: 'playfair', color: '#5a4890' } },
      confetti: { colors: ['#c9b6e8', '#f2c6d6', '#ffffff', '#7d6bb3'], emojis: ['💐', '🎀', '💌'] },
    },
    rome: {
      label: t('Rome antique'), moods: ['vivid'],
      design: { accent: '#8a2a2a', colors: { clue: '#f2e6c8', arrow: '#8a2a2a', line: '#b8a070', frame: '#8a2a2a' }, background: { type: 'pattern', pattern: 'romeMix', c1: '#efe6d0', c2: '#8a2a2a', c3: '#b8a070', scale: 1 }, cell: { style: 'classic', gap: 0, radius: 0, line: 3, letterShape: 'square', shadow: false }, voids: 'transparent', frame: { width: 20, radius: 4 }, font: { clue: 'fraunces', letter: 'playfair', clueWeight: 700 }, title: { font: 'playfair', color: '#8a2a2a' } },
      confetti: { colors: ['#8a2a2a', '#e0b23a', '#efe6d0', '#7aa84a'], emojis: ['🏛️', '🍇', '🏺'] },
    },
    medieval: {
      label: t('Chevaliers'), moods: ['dark', 'vivid'],
      design: { accent: '#d9b45a', colors: { letter: '#f8f1e0', clue: '#e6d7b4', ink: '#232a3c', clueInk: '#232a3c', arrow: '#9a2a2a', line: '#4a5a7a', frame: '#4a5a7a', solution: '#2e3a66' }, background: { type: 'pattern', pattern: 'medievalMix', c1: '#2e3a56', c2: '#4a5a7a', c3: '#d9b45a', scale: 1 }, cell: { style: 'classic', gap: 0, radius: 0, line: 3, letterShape: 'square', shadow: false }, voids: 'transparent', frame: { width: 22, radius: 6 }, font: { clue: 'fraunces', letter: 'fraunces', clueWeight: 700 }, title: { font: 'fraunces', color: '#e8c873' } },
      confetti: { colors: ['#d9b45a', '#9a2a2a', '#4a5a7a', '#f8f1e0'], emojis: ['🏰', '🛡️', '⚔️', '👑'] },
    },
    prehistory: {
      label: t('Préhistoire'), moods: ['vivid'],
      design: { accent: '#6b4a2e', colors: { clue: '#e8f0d0', arrow: '#c0602a', line: '#8a6a4a', frame: '#6b4a2e' }, background: { type: 'pattern', pattern: 'prehistoryMix', c1: '#efe2c4', c2: '#9fc46a', c3: '#6b4a2e', scale: 1 }, cell: { style: 'rounded', gap: 0, radius: 16, line: 4, letterShape: 'square', shadow: false }, voids: 'transparent', frame: { width: 24, radius: 30 }, font: { clue: 'baloo', letter: 'baloo', clueWeight: 700 }, title: { font: 'marker', color: '#6b4a2e' } },
      confetti: { colors: ['#9fc46a', '#6b4a2e', '#e0a94a', '#efe2c4'], emojis: ['🦣', '🦴', '🔥', '🦖'] },
    },
    western: {
      label: t('Far West'), moods: ['vivid'],
      design: { accent: '#8a4b26', colors: { letter: '#fdf4e2', clue: '#f2dcb0', ink: '#3a2414', clueInk: '#3a2414', arrow: '#a8321e', line: '#8a4b26', frame: '#8a4b26', solution: '#a8321e' }, background: { type: 'pattern', pattern: 'westernMix', c1: '#f2d9a8', c2: '#8a4b26', c3: '#e7b866', scale: 1 }, cell: { style: 'classic', gap: 0, radius: 0, line: 3, letterShape: 'square', shadow: false }, voids: 'transparent', frame: { width: 22, radius: 4 }, font: { clue: 'grotesk', letter: 'playfair', clueWeight: 700 }, title: { font: 'marker', color: '#8a4b26' } },
      confetti: { colors: ['#e7b866', '#8a4b26', '#a8321e', '#fdf4e2'], emojis: ['🤠', '🌵', '🐎', '⭐'] },
    },
    train: {
      label: t('Train de nuit'), moods: ['dark'],
      design: { accent: '#c9a24a', colors: { letter: '#f8f2e2', clue: '#e8dcb8', ink: '#1a2a24', clueInk: '#1a2a24', arrow: '#7a2e22', line: '#1f3a33', frame: '#1f3a33', solution: '#1f3a33' }, background: { type: 'pattern', pattern: 'trains', c1: '#1f3a33', c2: '#2c5048', c3: '#c9a24a', scale: 1 }, cell: { style: 'classic', gap: 0, radius: 0, line: 3, letterShape: 'square', shadow: false }, arrows: { style: 'chevron' }, voids: 'transparent', frame: { width: 20, radius: 10 }, font: { clue: 'playfair', letter: 'playfair', clueWeight: 700 }, title: { font: 'playfair', color: '#e0c06a' } },
      confetti: { colors: ['#c9a24a', '#1f3a33', '#f8f2e2', '#7a2e22'], emojis: ['🚂', '🧳', '🎫'] },
    },
    circus: {
      label: t('Cirque'), moods: ['party', 'vivid'],
      design: { accent: '#c0283a', colors: { clue: '#fff1c2', arrow: '#c0283a', line: '#c0283a', frame: '#c0283a' }, background: { type: 'pattern', pattern: 'bunting', c1: '#fff6e0', c2: '#c0283a', c3: '#f5d36b', scale: 1.4 }, cell: { style: 'tiles', gap: 7, radius: 12, line: 0, letterShape: 'square', shadow: true }, voids: 'transparent', frame: { width: 22, radius: 20 }, font: { clue: 'baloo', letter: 'baloo', clueWeight: 700 }, title: { font: 'marker', color: '#c0283a' } },
      confetti: { colors: ['#c0283a', '#f5d36b', '#2f6f9a', '#ffffff'], emojis: ['🎪', '🤹', '🎈', '🍿'] },
    },
    chalet: {
      label: t('Chalet'), moods: ['soft'],
      design: { accent: '#2f5a8a', colors: { clue: '#e3edf7', arrow: '#c0392b', line: '#9fb8d4', frame: '#2f5a8a' }, background: { type: 'pattern', pattern: 'snowflakes', c1: '#e6eef6', c2: '#9fb8d4', c3: '#ffffff', scale: 1.2 }, cell: { style: 'rounded', gap: 0, radius: 14, line: 3, letterShape: 'square', shadow: false }, voids: 'transparent', frame: { width: 22, radius: 22 }, font: { clue: 'nunito', letter: 'nunito', clueWeight: 700 }, title: { font: 'fraunces', color: '#2f5a8a' } },
      confetti: { colors: ['#ffffff', '#9fb8d4', '#2f5a8a', '#c0392b'], emojis: ['❄️', '⛷️', '☕'] },
    },
    world: {
      label: t('Tour du monde'), moods: ['vivid'],
      design: { accent: '#1aa3d9', colors: { clue: '#e0f4fc', arrow: '#e07a1a', line: '#1aa3d9', frame: '#1aa3d9' }, background: { type: 'pattern', pattern: 'clouds', c1: '#bfe6f6', c2: '#ffffff', c3: '#f5c542', scale: 1.2 }, cell: { style: 'tiles', gap: 7, radius: 12, line: 0, letterShape: 'square', shadow: true }, voids: 'transparent', frame: { width: 20, radius: 18 }, font: { clue: 'grotesk', letter: 'grotesk', clueWeight: 700 }, title: { font: 'grotesk', color: '#0f6a8f' } },
      confetti: { colors: ['#1aa3d9', '#f5c542', '#e07a1a', '#ffffff'], emojis: ['🌍', '✈️', '🧳', '🗺️'] },
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
