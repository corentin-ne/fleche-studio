// @ts-check
/* =========================================================================
   Panneau « Design » en six onglets : Style, Couleurs, Fond, Cases, Texte, Page.
   « Style » suffit au parcours de base (un thème + une couleur) ; les autres
   onglets affinent, avec leurs réglages fins repliés par défaut.
   Chaque contrôle porte le chemin de la valeur qu'il règle (ex. « cell.gap ») :
   un seul gestionnaire d'événements pour tout le panneau.
   ========================================================================= */
window.MF = window.MF || {};
MF.panels = MF.panels || {};

MF.panels.design = (() => {
  const { esc } = MF.util;
  const ic = MF.icons.svg;
  const ui = MF.ui;
  const { t } = MF.i18n;
  const TABS = [['theme', t('Style'), 'sparkle'], ['colors', t('Couleurs'), 'palette'], ['background', t('Fond'), 'image'], ['cells', t('Cases'), 'grid'], ['text', t('Texte'), 'type'], ['page', t('Page'), 'frame']];

  const fontOptions = value => Object.entries(MF.design.FONTS).map(([id, f]) => `<option value="${id}" ${id === value ? 'selected' : ''} style="font-family:${esc(f.css)}">${esc(f.label)}</option>`).join('');
  const group = (title, content) => `<div class="pgroup">${title ? `<div class="pgroup-title">${esc(title)}</div>` : ''}${content}</div>`;

  /** Thèmes filtrés sur place par ambiance (aucun nouveau rendu). */
  function themeTab(d, filter = 'all') {
    const filters = [['all', t('Tous')], ...Object.entries(MF.themes.MOODS)];
    const quick = MF.palettes.ACCENTS[0][1];
    return group(t('Couleur'),`<div class="swatches quick-colors">${quick.map(x => `<button type="button" class="swatch-btn ${x === d.accent ? 'active' : ''}" data-accent="${x}" style="--c:${x}" aria-label="${x}" title="${x}"></button>`).join('')}
        <button type="button" class="btn btn-sm btn-ghost more-colors" data-dtab="colors">${quick.includes(d.accent) ? '' : `<i class="dot" style="--c:${d.accent}"></i>`}${t('Plus de couleurs')}${ic('chevronRight')}</button></div>`)
      + `<div class="pgroup"><div class="pgroup-title">${t('Thème')}</div><div class="chips theme-filters" role="toolbar" aria-label="${t('Filtrer les thèmes')}">${filters.map(([k, l]) => `<button type="button" class="chip chip-btn ${k === filter ? 'active' : ''}" data-theme-filter="${k}">${esc(l)}</button>`).join('')}</div>
      <div class="theme-grid">${Object.entries(MF.themes.THEMES).map(([id, th]) => `
      <button type="button" class="theme-card ${d.theme === id ? 'active' : ''}" data-theme-id="${id}" data-moods="${esc(th.moods.join(' '))}" ${filter === 'all' || th.moods.includes(filter) ? '' : 'hidden'} title="${esc(th.label)}">
        <span class="theme-thumb">${MF.previews.theme(id)}</span><span class="theme-name">${esc(th.label)}</span></button>`).join('')}</div></div>`;
  }

  /** Nuancier rangé par familles ; `attr` porte la valeur (ex. data-accent="#e8212b"). */
  const palette = (families, current, attr) => `<div class="swatch-palette">${families.map(([name, colors]) => `
      <div class="sp-row"><span class="sp-name">${esc(name)}</span><div class="swatches">${colors.map(x => `<button type="button" class="swatch-btn ${x === current ? 'active' : ''}" ${attr}="${x}" style="--c:${x}" aria-label="${x}" title="${x}"></button>`).join('')}</div></div>`).join('')}</div>`;

  function colorsTab(d, C, game) {
    const c = (k, label) => ui.colorField(`colors.${k}`, label, d.colors[k], { auto: true, resolved: C[k] });
    return group(t('Couleur principale'), `${palette(MF.palettes.ACCENTS, d.accent, 'data-accent')}
        <div class="row palette-tools">
          <label class="btn btn-sm palette-custom" title="${esc(t('Choisir n\'importe quelle couleur'))}"><span class="swatch-btn custom" style="--c:${d.accent}"><input type="color" data-accent-input value="${d.accent}" aria-label="${t('Couleur personnalisée')}"></span>${t('Sur mesure')}</label>
          <button type="button" class="btn btn-sm" data-random-accent>${ic('dice')}${t('Au hasard')}</button>
          <span class="palette-current"><i style="--c:${d.accent}"></i><code>${esc(d.accent)}</code></span>
        </div>
        <p class="field-hint">${t('Le cadre, les flèches et les cases définitions suivent cette couleur. Les textes restent toujours lisibles (contraste automatique).')}</p>`)
      + multiGroup(d, game)
      + group('', ui.advanced('colors-detail', t('Couleur de chaque élément'), `<div class="color-grid">${c('frame', t('Cadre & cases noires'))}${c('line', t('Traits'))}${c('letter', t('Cases lettres'))}${c('clue', t('Cases définitions'))}${c('clueInk', t('Texte des définitions'))}${c('arrow', t('Flèches'))}${c('solution', t('Lettres solution'))}${c('ink', t('Numéros & lettres'))}${c('void', t('Cases vides claires'))}</div>
        <button type="button" class="btn btn-sm btn-ghost" data-reset-colors>${ic('refresh')}${t('Tout en automatique')}</button>`));
  }

  /** Multicolore : plusieurs couleurs dans la grille (lettres, cases, définitions, mots). */
  function multiGroup(d, game) {
    const mu = d.multi, M = MF.design;
    const toggle = `<label class="check mc-switch"><input type="checkbox" data-toggle="multi.on" ${mu.on ? 'checked' : ''}> ${t('Plusieurs couleurs dans la grille')}</label>`;
    const strip = (list, cls = '') => `<span class="mc-strip ${cls}">${list.map(x => `<i style="--c:${esc(x)}"></i>`).join('')}</span>`;
    if (!mu.on) return group(t('Multicolore'), `${toggle}${strip(M.presetColors('rainbow'), 'mc-teaser')}<p class="field-hint">${t('Les lettres, les cases ou les mots de toutes les couleurs : arc-en-ciel, pastel, néon… ou ta propre palette.')}</p>`);
    const wordSearch = MF.games.get(game).wordSearch;
    const targets = [
      ['letters', wordSearch ? t('Lettres') : t('Lettres de la solution')],
      ['cells', t('Fond des cases lettres')],
      ...(game === 'fleches' ? [['clues', t('Fond des définitions')], ['words', t('Flèches (une couleur par mot)')]] : []),
      ...(wordSearch ? [['words', t('Mots entourés et liste')]] : []),
    ];
    const n = mu.palette.length;
    const presets = Object.entries(M.MULTI_PRESETS).map(([id, p]) => `<button type="button" class="mc-preset ${mu.preset === id ? 'active' : ''}" data-multi-preset="${id}" title="${esc(p.label)}">${strip(M.presetColors(id, undefined, d.accent))}<span>${esc(p.label)}</span></button>`).join('');
    const swatches = mu.palette.map((x, i) => `<span class="mc-swatch"><label class="color-swatch" style="--c:${esc(x)}" title="${esc(t('Couleur {n}', { n: i + 1 }))}"><input type="color" data-multi-color="${i}" value="${esc(x)}" aria-label="${esc(t('Couleur {n}', { n: i + 1 }))}"></label>${n > M.MULTI_MIN ? `<button type="button" class="mc-remove" data-multi-remove="${i}" aria-label="${esc(t('Retirer cette couleur'))}" title="${esc(t('Retirer cette couleur'))}">${ic('x')}</button>` : ''}</span>`).join('');
    const add = n < M.MULTI_MAX ? `<button type="button" class="mc-add" data-multi-add aria-label="${esc(t('Ajouter une couleur'))}" title="${esc(t('Ajouter une couleur'))}">${ic('plus')}</button>` : '';
    return group(t('Multicolore'), `${toggle}
        <div class="field"><span>${t('Ce qui change de couleur')}</span><div class="mc-targets">${targets.map(([k, l]) => `<label class="check"><input type="checkbox" data-toggle="multi.targets.${k}" ${mu.targets[k] ? 'checked' : ''}> ${esc(l)}</label>`).join('')}</div></div>
        <div class="field"><span>${t('Répartition')}</span>${ui.segmented('multi.mode', Object.entries(M.MULTI_MODES), mu.mode)}</div>
        ${mu.mode === 'random' ? `<button type="button" class="btn btn-sm" data-multi-shuffle>${ic('dice')}${t('Autre tirage')}</button>` : ''}
        <div class="field"><span>${t('Palette')}</span><div class="mc-presets">${presets}</div></div>
        <label class="slider-field"><span>${t('Nombre de couleurs')}<output>${n}</output></span>
          <input type="range" data-multi-count min="${M.MULTI_MIN}" max="${M.MULTI_MAX}" step="1" value="${n}"></label>
        <div class="mc-swatches">${swatches}${add}</div>
        <div class="row"><button type="button" class="btn btn-sm btn-ghost" data-multi-reverse>${ic('flip')}${t('Inverser l\'ordre')}</button></div>
        <p class="field-hint">${t('Les textes restent lisibles : les couleurs trop claires ou trop sombres pour leur case sont ajustées automatiquement.')}</p>`);
  }

  function backgroundTab(d) {
    const b = d.background;
    const types = [['solid', t('Uni')], ['gradient', t('Dégradé')], ['radial', t('Halo')], ['mesh', t('Aurore')], ['pattern', t('Motif')], ['image', t('Image')], ['none', t('Aucun')]];
    const col = (k, label) => ui.colorField(`background.${k}`, label, b[k]);
    let extra = '';
    if (b.type === 'solid') extra = `${palette(MF.palettes.BACKGROUNDS, b.c1, 'data-bg-color')}<div class="color-row">${col('c1', t('Sur mesure'))}</div>`;
    if (b.type === 'gradient') extra = `<div class="color-row">${col('c1', t('Début'))}${col('c2', t('Milieu'))}${col('c3', t('Fin'))}</div>${ui.slider('background.angle', t('Angle'), b.angle, 0, 360, 5, '°')}`;
    if (b.type === 'radial') extra = `<div class="color-row">${col('c1', t('Centre'))}${col('c2', t('Bords'))}</div>`;
    if (b.type === 'mesh') extra = `<div class="color-row">${col('c1', t('Fond'))}${col('c2', t('Lueur 1'))}${col('c3', t('Lueur 2'))}</div><button type="button" class="btn btn-sm" data-random-palette>${ic('dice')}${t('Couleurs au hasard')}</button>`;
    if (b.type === 'pattern') {
      extra = `<div class="pattern-grid">${Object.entries(MF.backgrounds.PATTERNS).map(([id, p]) => `<button type="button" class="pattern-btn ${b.pattern === id ? 'active' : ''}" data-pattern="${id}" title="${esc(p.label)}" style="background:${esc(MF.backgrounds.thumb(id, b.c1, b.c2, b.c3))} 0 0 / 34px auto"><span>${esc(p.label)}</span></button>`).join('')}</div>
        <div class="color-row">${col('c1', t('Fond'))}${col('c2', t('Motif'))}${col('c3', t('Motif 2'))}</div>${ui.slider('background.scale', t('Taille du motif'), b.scale, 0.3, 4, 0.1, '×')}`;
    }
    if (b.type === 'image') {
      const has = b.imageId && MF.assets.has(b.imageId);
      extra = `<div class="bg-image-row">
          ${has ? `<span class="bg-thumb" style="background-image:url('${esc(MF.assets.url(b.imageId))}')"></span>` : `<span class="bg-thumb empty">${ic('image')}</span>`}
          <div class="stack grow"><button type="button" class="btn btn-sm btn-primary" data-upload-bg>${ic('upload')}${has ? t('Changer l\'image') : t('Choisir une image')}</button>
          <span class="field-hint">${t('Nettoyée (métadonnées retirées) et gardée dans ton navigateur.')}</span></div></div>
        <div class="field"><span>${t('Ajustement')}</span>${ui.segmented('background.fit', [['cover', t('Remplir')], ['contain', t('Entière')], ['tile', t('Mosaïque')]], b.fit)}</div>
        ${ui.slider('background.imageOpacity', t('Opacité de l\'image'), b.imageOpacity, 0, 1, 0.05)}
        <div class="color-row">${col('c1', t('Couleur dessous'))}${col('overlay', t('Voile'))}</div>
        ${ui.slider('background.overlayOpacity', t('Voile coloré'), b.overlayOpacity, 0, 0.9, 0.05)}`;
    }
    if (b.type === 'none') extra = `<p class="field-hint">${t('Fond transparent : idéal pour poser la grille dans Canva, Word ou sur une photo.')}</p>`;
    return group('', `${ui.segmented('background.type', types, b.type)}<div class="stack">${extra}</div>`);
  }

  function cellsTab(d, C, game) {
    const styles = Object.entries(MF.design.CELL_STYLES);
    return group(t('Style'), `<div class="cell-styles">${styles.map(([id, s]) => {
      const { label, ...vals } = s;
      return `<button type="button" class="cell-style ${d.cell.style === id ? 'active' : ''}" data-cell-style="${id}"><span class="cs-thumb">${MF.previews.design(MF.design.merge(d, { cell: { ...vals, style: id } }))}</span><span>${esc(label)}</span></button>`;
    }).join('')}</div>`)
      + group('', ui.advanced('cells-fine', t('Réglages fins des cases'), `${ui.slider('cell.gap', t('Espace entre les cases'), d.cell.gap, 0, 24, 1)}
        ${ui.slider('cell.radius', t('Arrondi'), d.cell.radius, 0, 50, 1)}
        ${ui.slider('cell.line', t('Épaisseur des traits'), d.cell.line, 0, 12, 0.5)}
        <div class="row"><div class="field"><span>${t('Cases lettres')}</span>${ui.segmented('cell.letterShape', [['square', t('Carrées')], ['circle', t('Rondes')]], d.cell.letterShape)}</div>
        <label class="check"><input type="checkbox" data-toggle="cell.shadow" ${d.cell.shadow ? 'checked' : ''}> ${t('Ombre')}</label></div>
        <div class="field"><span>${t('Cases vides')}</span>${ui.segmented('voids', Object.entries(MF.design.VOIDS).map(([k, v]) => [k, v.split(' (')[0]]), d.voids)}</div>`))
      + (game === 'fleches' ? group(t('Flèches'), `${ui.segmented('arrows.style', Object.entries(MF.design.ARROWS), d.arrows.style)}${ui.slider('arrows.size', t('Taille'), d.arrows.size, 0.6, 1.8, 0.05, '×')}`) : '')
      + group(t('Cadre'), `${ui.slider('frame.width', t('Épaisseur'), d.frame.width, 0, 80, 1)}${ui.slider('frame.radius', t('Arrondi'), d.frame.radius, 0, 120, 1)}`);
  }

  function textTab(d, game) {
    const ti = d.title;
    return group(t('Grille'), `<div class="two-col">
        <label class="field"><span>${t('Définitions')}</span><select class="select" data-select="font.clue">${fontOptions(d.font.clue)}</select></label>
        <label class="field"><span>${t('Lettres')}</span><select class="select" data-select="font.letter">${fontOptions(d.font.letter)}</select></label></div>
        <div class="field"><span>${t('Graisse')}</span>${ui.segmented('font.clueWeight', [[400, t('Normal|graisse')], [600, t('Semi-gras')], [800, t('Gras')]], d.font.clueWeight)}</div>
        ${ui.slider('font.clueSize', t('Taille max. des définitions'), d.font.clueSize, 11, 26, 0.5)}
        <label class="check"><input type="checkbox" data-toggle="font.upper" ${d.font.upper ? 'checked' : ''}> ${t('Définitions en MAJUSCULES')}</label>`)
      + (game !== 'fleches' ? group(t('Listes sous la grille'), `<label class="field"><span>${t('Police')}</span><select class="select" data-select="lists.font">${fontOptions(d.lists.font)}</select></label>
        ${ui.slider('lists.size', t('Taille'), d.lists.size, 18, 60, 1)}
        <div class="color-row">${ui.colorField('lists.color', t('Couleur'), d.lists.color, { auto: true, resolved: MF.design.resolve(d).list })}</div>`) : '')
      + group(t('Titre'), `<label class="check"><input type="checkbox" data-toggle="title.show" ${ti.show ? 'checked' : ''}> ${t('Afficher un titre au-dessus de la grille')}</label>
        <div class="stack ${ti.show ? '' : 'is-disabled'}">
          <input class="input" data-text="title.text" value="${esc(ti.text)}" maxlength="${MF.schema.LIMITS.title}" placeholder="${esc(t('Titre (ex : Joyeux anniversaire Léa !)'))}" aria-label="${esc(t('Titre'))}">
          <input class="input" data-text="title.subtitle" value="${esc(ti.subtitle)}" maxlength="${MF.schema.LIMITS.title}" placeholder="${esc(t('Sous-titre'))}" aria-label="${esc(t('Sous-titre'))}">
          <div class="two-col"><select class="select" data-select="title.font" aria-label="${esc(t('Police du titre'))}">${fontOptions(ti.font)}</select>${ui.segmented('title.align', [['left', t('G')], ['center', t('C')], ['right', t('D')]], ti.align)}</div>
          ${ui.slider('title.size', t('Taille'), ti.size, 40, 260, 2)}
          <div class="color-row">${ui.colorField('title.color', t('Couleur du titre'), ti.color, { auto: true, resolved: MF.design.resolve(d).title })}</div>
        </div>`);
  }

  function pageTab(d) {
    return `<div id="layout-box">${MF.layoutControls.html(d)}</div>${group('', ui.slider('poster.radius', t('Coins arrondis de l\'affiche'), d.poster.radius, 0, 200, 5))}`;
  }

  function render(root, { puzzle, actions, view }) {
    const d = puzzle.design;
    const C = MF.design.resolve(d);
    const tab = TABS.some(([k]) => k === view.designTab) ? view.designTab : 'theme';
    const content = { theme: () => themeTab(d, MF.themes.MOODS[view.themeFilter] ? view.themeFilter : 'all'), colors: () => colorsTab(d, C, puzzle.game), background: () => backgroundTab(d), cells: () => cellsTab(d, C, puzzle.game), text: () => textTab(d, puzzle.game), page: () => pageTab(d) }[tab]();
    root.innerHTML = `<div class="design-panel">
      <nav class="subtabs" id="design-tabs">${TABS.map(([k, l, i]) => `<button type="button" data-dtab="${k}" class="${k === tab ? 'active' : ''}">${ic(i)}<span>${l}</span></button>`).join('')}</nav>
      <div class="subtab-body">${content}</div>
      <input type="file" id="bg-file" accept="${MF.assets.ACCEPT.join(',')}" hidden>
    </div>`;
    bind(root, puzzle, actions, view);
  }

  function filterThemes(root, chip) {
    const k = chip.dataset.themeFilter;
    root.querySelectorAll('[data-theme-filter]').forEach(c => c.classList.toggle('active', c === chip));
    root.querySelectorAll('.theme-card').forEach(card => { card.hidden = k !== 'all' && !card.dataset.moods.split(' ').includes(k); });
  }

  /** Couleur du nuancier tirée au hasard (jamais la couleur actuelle). */
  function randomAccent(current) {
    const all = MF.palettes.ACCENTS.flatMap(([, c]) => c).filter(c => c !== current);
    return all[Math.floor(Math.random() * all.length)];
  }

  /**
   * Palette multicolore ramenée à n couleurs : une palette prête à l'emploi est
   * ré-échantillonnée ; une palette perso garde ses couleurs (on retire les
   * dernières, ou on ajoute des teintes bien distinctes).
   */
  function resizePalette(d, n, custom = false) {
    const mu = d.multi, M = MF.design;
    n = Math.max(M.MULTI_MIN, Math.min(M.MULTI_MAX, n));
    if (!custom && mu.preset !== 'custom') return M.presetColors(mu.preset, n, d.accent);
    if (n <= mu.palette.length) return mu.palette.slice(0, n);
    // Couleur ajoutée : la teinte du cercle chromatique la plus éloignée des couleurs déjà là
    const wheel = [...M.presetColors('rainbow', 12), '#ff4d8d', '#00bfa5', '#795548', '#455a64'];
    const dist = (x, y) => { const [a, b] = [MF.util.hexToRgb(x), MF.util.hexToRgb(y)]; return Math.hypot(a[0] - b[0], a[1] - b[1], a[2] - b[2]); };
    const out = [...mu.palette];
    while (out.length < n) out.push(wheel.reduce((best, c) => (Math.min(...out.map(o => dist(o, c))) > Math.min(...out.map(o => dist(o, best))) ? c : best)));
    return out;
  }

  function bind(root, puzzle, actions, view) {
    const set = (path, value, live) => actions.setDesignPath(path, value, { live });
    const setMulti = (patch, live = false) => actions.setDesign({ multi: patch }, { live });
    root.querySelector('#design-tabs').addEventListener('click', e => {
      const b = e.target.closest('[data-dtab]');
      if (b) { view.designTab = b.dataset.dtab; actions.refreshSide(); }
    });
    const layout = root.querySelector('#layout-box');
    if (layout) MF.layoutControls.bind(layout, (patch, live) => actions.setDesign({ poster: patch }, { live }), () => {});
    root.querySelector('.design-panel').addEventListener('click', e => {
      const t = e.target.closest('button');
      if (!t || t.closest('#layout-box') || t.closest('#design-tabs')) return;
      if (t.dataset.dtab) { view.designTab = t.dataset.dtab; actions.refreshSide(); } // raccourci vers un autre onglet
      else if (t.dataset.themeId) actions.applyTheme(t.dataset.themeId);
      else if (t.dataset.themeFilter) { view.themeFilter = t.dataset.themeFilter; filterThemes(root, t); }
      else if (t.dataset.accent) actions.setDesign({ accent: t.dataset.accent });
      else if (t.dataset.bgColor) set('background.c1', t.dataset.bgColor);
      else if (t.hasAttribute('data-random-accent')) actions.setDesign({ accent: randomAccent(puzzle.design.accent) });
      else if (t.dataset.cellStyle) { const { label, ...vals } = MF.design.CELL_STYLES[t.dataset.cellStyle]; void label; actions.setDesign({ cell: { ...vals, style: t.dataset.cellStyle } }); }
      else if (t.dataset.pattern) set('background.pattern', t.dataset.pattern);
      else if (t.hasAttribute('data-auto')) set(t.closest('[data-color-key]').dataset.colorKey, 'auto');
      else if (t.hasAttribute('data-upload-bg')) root.querySelector('#bg-file').click();
      else if (t.hasAttribute('data-reset-colors')) actions.setDesign({ colors: Object.fromEntries(Object.keys(MF.design.DEFAULT.colors).map(k => [k, 'auto'])) });
      else if (t.hasAttribute('data-random-palette')) {
        const h = Math.random() * 360;
        const hsl = (hh, s, l) => { const c = document.createElement('canvas').getContext('2d'); c.fillStyle = `hsl(${hh % 360} ${s}% ${l}%)`; return c.fillStyle; };
        actions.setDesign({ background: { c1: hsl(h, 70, 96), c2: hsl(h + 40, 85, 80), c3: hsl(h + 180, 75, 85) } });
      } else {
        const seg = t.closest('[data-seg]');
        if (seg?.dataset.seg === 'background.type' && ['pattern', 'mesh'].includes(t.dataset.v)) {
          // Motif / aurore : couleurs assez contrastées avec le fond pour être visibles
          const b = puzzle.design.background, a = puzzle.design.accent;
          const far = (x, y) => Math.abs(MF.util.luminance(x) - MF.util.luminance(y)) > 0.12;
          const patch = { type: t.dataset.v };
          if (!far(b.c1, b.c2)) patch.c2 = MF.util.mix(b.c1, MF.util.luminance(b.c1) > 0.5 ? a : MF.util.tint(a, 0.3), 0.55);
          if (!far(b.c1, b.c3)) patch.c3 = MF.util.mix(b.c1, MF.util.luminance(b.c1) > 0.5 ? '#ffb000' : '#ffffff', 0.45);
          actions.setDesign({ background: patch });
        } else if (seg) set(seg.dataset.seg, MF.util.parseValue(t.dataset.v));
      }
    });
    ui.bindFields(root, set, { skip: '#layout-box' });
    ui.bindAdvanced(root);
    root.querySelector('[data-accent-input]')?.addEventListener('input', MF.util.debounce(e => actions.setDesign({ accent: e.target.value }, { live: true }), 60));
    root.querySelector('[data-accent-input]')?.addEventListener('change', e => actions.setDesign({ accent: e.target.value }));
    // Multicolore : écouteur posé sur le panneau (recréé à chaque rendu), pour qu'un clic
    // n'ajoute ou ne retire jamais deux couleurs d'un coup
    root.querySelector('.design-panel').addEventListener('click', e => {
      const b = e.target.closest('button');
      const mu = puzzle.design.multi;
      if (!b) return;
      if (b.dataset.multiPreset) setMulti({ preset: b.dataset.multiPreset, palette: MF.design.presetColors(b.dataset.multiPreset, mu.palette.length, puzzle.design.accent) });
      else if (b.dataset.multiRemove) setMulti({ preset: 'custom', palette: mu.palette.filter((_, i) => i !== +b.dataset.multiRemove) });
      else if (b.hasAttribute('data-multi-add')) setMulti({ preset: 'custom', palette: resizePalette(puzzle.design, mu.palette.length + 1, true) });
      else if (b.hasAttribute('data-multi-reverse')) setMulti({ palette: [...mu.palette].reverse(), preset: 'custom' });
      else if (b.hasAttribute('data-multi-shuffle')) setMulti({ seed: (mu.seed + 1 + Math.floor(Math.random() * 997)) % 99999 });
    });
    const count = root.querySelector('[data-multi-count]');
    if (count) {
      const out = count.closest('.slider-field').querySelector('output');
      const apply = live => { out.textContent = count.value; setMulti({ palette: resizePalette(puzzle.design, +count.value) }, live); };
      count.addEventListener('input', () => apply(true));
      count.addEventListener('change', () => apply(false));
    }
    root.querySelectorAll('[data-multi-color]').forEach(inp => {
      const pick = live => {
        inp.parentElement.style.setProperty('--c', inp.value);
        const palette = [...puzzle.design.multi.palette];
        palette[+inp.dataset.multiColor] = inp.value;
        setMulti({ palette, preset: 'custom' }, live);
      };
      inp.addEventListener('input', MF.util.debounce(() => pick(true), 60));
      inp.addEventListener('change', () => pick(false));
    });
    root.querySelector('#bg-file').addEventListener('change', e => {
      const f = e.target.files[0];
      e.target.value = '';
      if (f) actions.setBackgroundImage(f);
    });
  }

  return render;
})();
