/* =========================================================================
   Panneau « Design » en six onglets : Thème, Couleurs, Fond, Cases, Texte, Page.
   Chaque contrôle porte le chemin de la valeur qu'il règle (ex. « cell.gap ») :
   un seul gestionnaire d'événements pour tout le panneau.
   ========================================================================= */
window.MF = window.MF || {};
MF.panels = MF.panels || {};

MF.panels.design = (() => {
  const { esc } = MF.util;
  const ic = MF.icons.svg;
  const ui = MF.ui;
  const TABS = [['theme', 'Thème', 'sparkle'], ['colors', 'Couleurs', 'palette'], ['background', 'Fond', 'image'], ['cells', 'Cases', 'grid'], ['text', 'Texte', 'type'], ['page', 'Page', 'frame']];

  const fontOptions = value => Object.entries(MF.design.FONTS).map(([id, f]) => `<option value="${id}" ${id === value ? 'selected' : ''} style="font-family:${esc(f.css)}">${esc(f.label)}</option>`).join('');
  const group = (title, content) => `<div class="pgroup">${title ? `<div class="pgroup-title">${esc(title)}</div>` : ''}${content}</div>`;

  /** Thèmes filtrés sur place par ambiance (aucun nouveau rendu). */
  function themeTab(d, filter = 'all') {
    const filters = [['all', 'Tous'], ...Object.entries(MF.themes.MOODS)];
    return `<div class="chips theme-filters" role="toolbar" aria-label="Filtrer les thèmes">${filters.map(([k, l]) => `<button type="button" class="chip chip-btn ${k === filter ? 'active' : ''}" data-theme-filter="${k}">${esc(l)}</button>`).join('')}</div>
      <div class="theme-grid">${Object.entries(MF.themes.THEMES).map(([id, t]) => `
      <button type="button" class="theme-card ${d.theme === id ? 'active' : ''}" data-theme-id="${id}" data-moods="${esc(t.moods.join(' '))}" ${filter === 'all' || t.moods.includes(filter) ? '' : 'hidden'} title="${esc(t.label)}">
        <span class="theme-thumb">${MF.previews.theme(id)}</span><span class="theme-name">${esc(t.label)}</span></button>`).join('')}</div>`;
  }

  /** Nuancier rangé par familles ; `attr` porte la valeur (ex. data-accent="#e8212b"). */
  const palette = (families, current, attr) => `<div class="swatch-palette">${families.map(([name, colors]) => `
      <div class="sp-row"><span class="sp-name">${esc(name)}</span><div class="swatches">${colors.map(x => `<button type="button" class="swatch-btn ${x === current ? 'active' : ''}" ${attr}="${x}" style="--c:${x}" aria-label="${x}" title="${x}"></button>`).join('')}</div></div>`).join('')}</div>`;

  function colorsTab(d, C) {
    const c = (k, label) => ui.colorField(`colors.${k}`, label, d.colors[k], { auto: true, resolved: C[k] });
    return group('Couleur principale', `${palette(MF.palettes.ACCENTS, d.accent, 'data-accent')}
        <div class="row palette-tools">
          <label class="btn btn-sm palette-custom" title="Choisir n'importe quelle couleur"><span class="swatch-btn custom" style="--c:${d.accent}"><input type="color" data-accent-input value="${d.accent}" aria-label="Couleur personnalisée"></span>Sur mesure</label>
          <button type="button" class="btn btn-sm" data-random-accent>${ic('dice')}Au hasard</button>
          <span class="palette-current"><i style="--c:${d.accent}"></i><code>${esc(d.accent)}</code></span>
        </div>
        <p class="field-hint">Le cadre, les flèches et les cases définitions suivent cette couleur. Les textes restent toujours lisibles (contraste automatique).</p>`)
      + group('Détail', `<div class="color-grid">${c('frame', 'Cadre & cases noires')}${c('line', 'Traits')}${c('letter', 'Cases lettres')}${c('clue', 'Cases définitions')}${c('clueInk', 'Texte des définitions')}${c('arrow', 'Flèches')}${c('solution', 'Lettres solution')}${c('ink', 'Numéros & lettres')}${c('void', 'Cases vides claires')}</div>
        <button type="button" class="btn btn-sm btn-ghost" data-reset-colors>${ic('refresh')}Tout en automatique</button>`);
  }

  function backgroundTab(d) {
    const b = d.background;
    const types = [['solid', 'Uni'], ['gradient', 'Dégradé'], ['radial', 'Halo'], ['mesh', 'Aurore'], ['pattern', 'Motif'], ['image', 'Image'], ['none', 'Aucun']];
    const col = (k, label) => ui.colorField(`background.${k}`, label, b[k]);
    let extra = '';
    if (b.type === 'solid') extra = `${palette(MF.palettes.BACKGROUNDS, b.c1, 'data-bg-color')}<div class="color-row">${col('c1', 'Sur mesure')}</div>`;
    if (b.type === 'gradient') extra = `<div class="color-row">${col('c1', 'Début')}${col('c2', 'Milieu')}${col('c3', 'Fin')}</div>${ui.slider('background.angle', 'Angle', b.angle, 0, 360, 5, '°')}`;
    if (b.type === 'radial') extra = `<div class="color-row">${col('c1', 'Centre')}${col('c2', 'Bords')}</div>`;
    if (b.type === 'mesh') extra = `<div class="color-row">${col('c1', 'Fond')}${col('c2', 'Lueur 1')}${col('c3', 'Lueur 2')}</div><button type="button" class="btn btn-sm" data-random-palette>${ic('dice')}Couleurs au hasard</button>`;
    if (b.type === 'pattern') {
      extra = `<div class="pattern-grid">${Object.entries(MF.backgrounds.PATTERNS).map(([id, p]) => `<button type="button" class="pattern-btn ${b.pattern === id ? 'active' : ''}" data-pattern="${id}" title="${esc(p.label)}" style="background:${esc(MF.backgrounds.thumb(id, b.c1, b.c2, b.c3))} 0 0 / 34px auto"><span>${esc(p.label)}</span></button>`).join('')}</div>
        <div class="color-row">${col('c1', 'Fond')}${col('c2', 'Motif')}${col('c3', 'Motif 2')}</div>${ui.slider('background.scale', 'Taille du motif', b.scale, 0.3, 4, 0.1, '×')}`;
    }
    if (b.type === 'image') {
      const has = b.imageId && MF.assets.has(b.imageId);
      extra = `<div class="bg-image-row">
          ${has ? `<span class="bg-thumb" style="background-image:url('${esc(MF.assets.url(b.imageId))}')"></span>` : `<span class="bg-thumb empty">${ic('image')}</span>`}
          <div class="stack grow"><button type="button" class="btn btn-sm btn-primary" data-upload-bg>${ic('upload')}${has ? 'Changer l\'image' : 'Choisir une image'}</button>
          <span class="field-hint">Nettoyée (métadonnées retirées) et gardée dans ton navigateur.</span></div></div>
        <div class="field"><span>Ajustement</span>${ui.segmented('background.fit', [['cover', 'Remplir'], ['contain', 'Entière'], ['tile', 'Mosaïque']], b.fit)}</div>
        ${ui.slider('background.imageOpacity', 'Opacité de l\'image', b.imageOpacity, 0, 1, 0.05)}
        <div class="color-row">${col('c1', 'Couleur dessous')}${col('overlay', 'Voile')}</div>
        ${ui.slider('background.overlayOpacity', 'Voile coloré', b.overlayOpacity, 0, 0.9, 0.05)}`;
    }
    if (b.type === 'none') extra = '<p class="field-hint">Fond transparent : idéal pour poser la grille dans Canva, Word ou sur une photo.</p>';
    return group('', `${ui.segmented('background.type', types, b.type)}<div class="stack">${extra}</div>`);
  }

  function cellsTab(d, C, game) {
    const styles = Object.entries(MF.design.CELL_STYLES);
    return group('Style', `<div class="cell-styles">${styles.map(([id, s]) => {
      const { label, ...vals } = s;
      return `<button type="button" class="cell-style ${d.cell.style === id ? 'active' : ''}" data-cell-style="${id}"><span class="cs-thumb">${MF.previews.design(MF.design.merge(d, { cell: { ...vals, style: id } }))}</span><span>${esc(label)}</span></button>`;
    }).join('')}</div>`)
      + group('Réglages fins', `${ui.slider('cell.gap', 'Espace entre les cases', d.cell.gap, 0, 24, 1)}
        ${ui.slider('cell.radius', 'Arrondi', d.cell.radius, 0, 50, 1)}
        ${ui.slider('cell.line', 'Épaisseur des traits', d.cell.line, 0, 12, 0.5)}
        <div class="row"><div class="field"><span>Cases lettres</span>${ui.segmented('cell.letterShape', [['square', 'Carrées'], ['circle', 'Rondes']], d.cell.letterShape)}</div>
        <label class="check"><input type="checkbox" data-toggle="cell.shadow" ${d.cell.shadow ? 'checked' : ''}> Ombre</label></div>
        <div class="field"><span>Cases vides</span>${ui.segmented('voids', Object.entries(MF.design.VOIDS).map(([k, v]) => [k, v.split(' (')[0]]), d.voids)}</div>`)
      + (game === 'fleches' ? group('Flèches', `${ui.segmented('arrows.style', Object.entries(MF.design.ARROWS), d.arrows.style)}${ui.slider('arrows.size', 'Taille', d.arrows.size, 0.6, 1.8, 0.05, '×')}`) : '')
      + group('Cadre', `${ui.slider('frame.width', 'Épaisseur', d.frame.width, 0, 80, 1)}${ui.slider('frame.radius', 'Arrondi', d.frame.radius, 0, 120, 1)}`);
  }

  function textTab(d, game) {
    const t = d.title;
    return group('Grille', `<div class="two-col">
        <label class="field"><span>Définitions</span><select class="select" data-select="font.clue">${fontOptions(d.font.clue)}</select></label>
        <label class="field"><span>Lettres</span><select class="select" data-select="font.letter">${fontOptions(d.font.letter)}</select></label></div>
        <div class="field"><span>Graisse</span>${ui.segmented('font.clueWeight', [[400, 'Normal'], [600, 'Semi-gras'], [800, 'Gras']], d.font.clueWeight)}</div>
        ${ui.slider('font.clueSize', 'Taille max. des définitions', d.font.clueSize, 11, 26, 0.5)}
        <label class="check"><input type="checkbox" data-toggle="font.upper" ${d.font.upper ? 'checked' : ''}> Définitions en MAJUSCULES</label>`)
      + (game !== 'fleches' ? group('Listes sous la grille', `<label class="field"><span>Police</span><select class="select" data-select="lists.font">${fontOptions(d.lists.font)}</select></label>
        ${ui.slider('lists.size', 'Taille', d.lists.size, 18, 60, 1)}
        <div class="color-row">${ui.colorField('lists.color', 'Couleur', d.lists.color, { auto: true, resolved: MF.design.resolve(d).list })}</div>`) : '')
      + group('Titre', `<label class="check"><input type="checkbox" data-toggle="title.show" ${t.show ? 'checked' : ''}> Afficher un titre au-dessus de la grille</label>
        <div class="stack ${t.show ? '' : 'is-disabled'}">
          <input class="input" data-text="title.text" value="${esc(t.text)}" maxlength="${MF.schema.LIMITS.title}" placeholder="Titre (ex : Joyeux anniversaire Léa !)" aria-label="Titre">
          <input class="input" data-text="title.subtitle" value="${esc(t.subtitle)}" maxlength="${MF.schema.LIMITS.title}" placeholder="Sous-titre" aria-label="Sous-titre">
          <div class="two-col"><select class="select" data-select="title.font" aria-label="Police du titre">${fontOptions(t.font)}</select>${ui.segmented('title.align', [['left', 'G'], ['center', 'C'], ['right', 'D']], t.align)}</div>
          ${ui.slider('title.size', 'Taille', t.size, 40, 260, 2)}
          <div class="color-row">${ui.colorField('title.color', 'Couleur du titre', t.color, { auto: true, resolved: MF.design.resolve(d).title })}</div>
        </div>`);
  }

  function pageTab(d) {
    return `<div id="layout-box">${MF.layoutControls.html(d)}</div>${group('', ui.slider('poster.radius', 'Coins arrondis de l\'affiche', d.poster.radius, 0, 200, 5))}`;
  }

  function render(root, { puzzle, actions, view }) {
    const d = puzzle.design;
    const C = MF.design.resolve(d);
    const tab = TABS.some(([k]) => k === view.designTab) ? view.designTab : 'theme';
    const content = { theme: () => themeTab(d, MF.themes.MOODS[view.themeFilter] ? view.themeFilter : 'all'), colors: () => colorsTab(d, C), background: () => backgroundTab(d), cells: () => cellsTab(d, C, puzzle.game), text: () => textTab(d, puzzle.game), page: () => pageTab(d) }[tab]();
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

  function bind(root, puzzle, actions, view) {
    const set = (path, value, live) => actions.setDesignPath(path, value, { live });
    root.querySelector('#design-tabs').addEventListener('click', e => {
      const b = e.target.closest('[data-dtab]');
      if (b) { view.designTab = b.dataset.dtab; actions.refreshSide(); }
    });
    const layout = root.querySelector('#layout-box');
    if (layout) MF.layoutControls.bind(layout, (patch, live) => actions.setDesign({ poster: patch }, { live }), () => {});
    root.addEventListener('click', e => {
      const t = e.target.closest('button');
      if (!t || t.closest('#layout-box') || t.dataset.dtab) return;
      if (t.dataset.themeId) actions.applyTheme(t.dataset.themeId);
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
    root.querySelector('[data-accent-input]')?.addEventListener('input', MF.util.debounce(e => actions.setDesign({ accent: e.target.value }, { live: true }), 60));
    root.querySelector('[data-accent-input]')?.addEventListener('change', e => actions.setDesign({ accent: e.target.value }));
    root.querySelector('#bg-file').addEventListener('change', e => {
      const f = e.target.files[0];
      e.target.value = '';
      if (f) actions.setBackgroundImage(f);
    });
  }

  return render;
})();
