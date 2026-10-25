/* =========================================================================
   Panneau « Design » : thèmes, couleurs, fond, style des cases, typo,
   flèches, cadre, mise en page de l'affiche et titre.
   Chaque contrôle porte le chemin de la valeur qu'il règle (ex. « cell.gap ») :
   un seul gestionnaire d'événements pour tout le panneau.
   ========================================================================= */
window.MF = window.MF || {};
MF.panels = MF.panels || {};

MF.panels.design = (() => {
  const { esc } = MF.util;
  const ic = MF.icons.svg;
  const ui = MF.ui;
  const ACCENTS = ['#e8212b', '#ff6a1a', '#ffb000', '#3db54a', '#16a394', '#1f8fff', '#7b3fe4', '#f0457f', '#6b4226', '#1d1b22'];

  const fontOptions = (value, preview = true) => Object.entries(MF.design.FONTS).map(([id, f]) => `<option value="${id}" ${id === value ? 'selected' : ''}${preview ? ` style="font-family:${esc(f.css)}"` : ''}>${esc(f.label)}</option>`).join('');

  function themeCards(d) {
    return `<div class="theme-grid">${Object.entries(MF.themes.THEMES).map(([id, t]) => {
      const { bg, C, d: td } = MF.themes.swatch(id);
      const round = td.cell.letterShape === 'circle' ? '50%' : `${Math.min(6, td.cell.radius / 3)}px`;
      return `<button type="button" class="theme-card ${d.theme === id ? 'active' : ''}" data-theme-id="${id}" title="${esc(t.label)}">
        <span class="theme-thumb" style="background:${esc(bg)}">
          <span class="mini-grid" style="--f:${C.frame};--l:${C.letter};--c:${C.clue};--a:${C.arrow};--r:${round};--g:${td.cell.gap ? 3 : 1}px">
            <i class="c"></i><i></i><i></i><i class="c"></i><i></i><i class="c"></i>
          </span>
        </span>
        <span class="theme-name">${esc(t.label)}</span>
      </button>`;
    }).join('')}</div>`;
  }

  function backgroundControls(d) {
    const b = d.background;
    const types = [['solid', 'Uni'], ['gradient', 'Dégradé'], ['radial', 'Halo'], ['mesh', 'Aurore'], ['pattern', 'Motif'], ['image', 'Image'], ['none', 'Aucun']];
    const col = (k, label) => ui.colorField(`background.${k}`, label, b[k]);
    let extra = '';
    if (b.type === 'solid') extra = `<div class="color-row">${col('c1', 'Couleur')}</div>`;
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
          <span class="field-hint">PNG, JPEG, WebP · nettoyée (métadonnées retirées) et gardée dans ton navigateur.</span></div>
        </div>
        <div class="field"><span>Ajustement</span>${ui.segmented('background.fit', [['cover', 'Remplir'], ['contain', 'Entière'], ['tile', 'Mosaïque']], b.fit)}</div>
        ${ui.slider('background.imageOpacity', 'Opacité de l\'image', b.imageOpacity, 0, 1, 0.05)}
        <div class="color-row">${col('c1', 'Couleur dessous')}${col('overlay', 'Voile')}</div>
        ${ui.slider('background.overlayOpacity', 'Voile coloré', b.overlayOpacity, 0, 0.9, 0.05)}`;
    }
    if (b.type === 'none') extra = '<p class="field-hint">Fond transparent : idéal pour poser la grille dans Canva, Word ou sur une photo (export PNG ou SVG).</p>';
    return `${ui.segmented('background.type', types, b.type)}${extra}
      ${ui.slider('poster.radius', 'Coins arrondis de l\'affiche', d.poster.radius, 0, 200, 5)}`;
  }

  function cellControls(d, C) {
    const styles = Object.entries(MF.design.CELL_STYLES);
    return `<div class="cell-styles">${styles.map(([id, s]) => `<button type="button" class="cell-style ${d.cell.style === id ? 'active' : ''}" data-cell-style="${id}">
        <span class="cs-demo" style="--gap:${Math.round(s.gap / 3)}px;--rad:${s.letterShape === 'circle' ? '50%' : Math.round(s.radius / 4) + 'px'};--line:${Math.max(1, Math.round(s.line / 2))}px;--f:${C.frame};--l:${C.letter};--c:${C.clue}"><i class="c"></i><i></i><i></i><i class="c"></i></span>
        <span>${esc(s.label)}</span></button>`).join('')}</div>
      ${ui.slider('cell.gap', 'Espace entre les cases', d.cell.gap, 0, 24, 1)}
      ${ui.slider('cell.radius', 'Arrondi des cases', d.cell.radius, 0, 50, 1)}
      ${ui.slider('cell.line', 'Épaisseur des traits', d.cell.line, 0, 12, 0.5)}
      <div class="field"><span>Cases lettres</span>${ui.segmented('cell.letterShape', [['square', 'Carrées'], ['circle', 'Rondes']], d.cell.letterShape)}</div>
      <label class="check"><input type="checkbox" data-toggle="cell.shadow" ${d.cell.shadow ? 'checked' : ''}> Ombre portée (avec espace entre les cases)</label>
      <div class="field"><span>Cases vides</span>${ui.segmented('voids', Object.entries(MF.design.VOIDS).map(([k, v]) => [k, v.split(' (')[0]]), d.voids)}</div>`;
  }

  function colorControls(d, C) {
    const c = (k, label) => ui.colorField(`colors.${k}`, label, d.colors[k], { auto: true, resolved: C[k] });
    return `<div class="color-grid">${c('frame', 'Cadre & cases noires')}${c('line', 'Traits')}${c('letter', 'Cases lettres')}${c('clue', 'Cases définitions')}${c('clueInk', 'Texte des définitions')}${c('arrow', 'Flèches')}${c('solution', 'Lettres solution')}${c('ink', 'Numéros & lettres')}${c('void', 'Cases vides claires')}</div>
      <button type="button" class="btn btn-sm btn-ghost" data-reset-colors>${ic('refresh')}Tout en automatique</button>`;
  }

  function typoControls(d, game) {
    return `<label class="field"><span>Police des définitions</span><select class="select" data-select="font.clue">${fontOptions(d.font.clue)}</select></label>
      <label class="field"><span>Police des lettres</span><select class="select" data-select="font.letter">${fontOptions(d.font.letter)}</select></label>
      <div class="field"><span>Graisse des définitions</span>${ui.segmented('font.clueWeight', [[400, 'Normal'], [600, 'Semi-gras'], [800, 'Gras']], d.font.clueWeight)}</div>
      ${ui.slider('font.clueSize', 'Taille max. des définitions', d.font.clueSize, 11, 26, 0.5)}
      <label class="check"><input type="checkbox" data-toggle="font.upper" ${d.font.upper ? 'checked' : ''}> Définitions en MAJUSCULES</label>
      ${game !== 'fleches' ? `<label class="field"><span>Police des listes</span><select class="select" data-select="lists.font">${fontOptions(d.lists.font)}</select></label>
      ${ui.slider('lists.size', 'Taille des listes', d.lists.size, 18, 60, 1)}
      <div class="color-row">${ui.colorField('lists.color', 'Couleur des listes', d.lists.color, { auto: true, resolved: MF.design.resolve(d).list })}</div>` : ''}`;
  }

  function layoutControls(d) {
    const p = d.poster;
    const fixed = p.format !== 'fit';
    return `<div class="format-grid">${Object.entries(MF.design.FORMATS).map(([id, f]) => {
      const r = f.ratio ? (f.fixed || p.orientation !== 'landscape' ? f.ratio : 1 / f.ratio) : 0.8;
      return `<button type="button" class="format-btn ${p.format === id ? 'active' : ''}" data-format="${id}"><span class="fmt-shape" style="aspect-ratio:${r}">${id === 'fit' ? ic('grid', 'ic-sm') : ''}</span><span>${esc(f.label)}</span></button>`;
    }).join('')}</div>
      ${fixed && !MF.design.FORMATS[p.format].fixed ? `<div class="field"><span>Orientation</span>${ui.segmented('poster.orientation', [['portrait', 'Portrait', 'page-portrait'], ['landscape', 'Paysage', 'page-landscape']], p.orientation)}</div>` : ''}
      ${fixed ? `<div class="row align-start">
          <div class="field"><span>Position de la grille</span><div class="anchor-grid">${MF.design.ANCHORS.map(a => `<button type="button" class="${p.anchor === a ? 'active' : ''}" data-anchor="${a}" aria-label="Position ${a}"><i></i></button>`).join('')}</div></div>
          <div class="grow">${ui.slider('poster.scale', 'Taille de la grille sur la page', Math.round(p.scale * 100), 30, 100, 1, '%')}</div>
        </div>` : ''}
      ${ui.slider('poster.padding', 'Marge autour', p.padding, 0, 400, 5)}
      ${ui.slider('frame.width', 'Épaisseur du cadre', d.frame.width, 0, 80, 1)}
      ${ui.slider('frame.radius', 'Arrondi du cadre', d.frame.radius, 0, 120, 1)}`;
  }

  function titleControls(d) {
    const t = d.title;
    return `<label class="check"><input type="checkbox" data-toggle="title.show" ${t.show ? 'checked' : ''}> Afficher un titre au-dessus de la grille</label>
      <div class="stack ${t.show ? '' : 'is-disabled'}">
        <label class="field"><span>Titre</span><input class="input" data-text="title.text" value="${esc(t.text)}" maxlength="${MF.schema.LIMITS.title}" placeholder="ex : Joyeux anniversaire Léa !"></label>
        <label class="field"><span>Sous-titre</span><input class="input" data-text="title.subtitle" value="${esc(t.subtitle)}" maxlength="${MF.schema.LIMITS.title}" placeholder="ex : 30 mots rien que pour toi"></label>
        <label class="field"><span>Police</span><select class="select" data-select="title.font">${fontOptions(t.font)}</select></label>
        ${ui.slider('title.size', 'Taille', t.size, 40, 260, 2)}
        <div class="field"><span>Alignement</span>${ui.segmented('title.align', [['left', 'Gauche'], ['center', 'Centre'], ['right', 'Droite']], t.align)}</div>
        <div class="color-row">${ui.colorField('title.color', 'Couleur du titre', t.color, { auto: true, resolved: MF.design.resolve(d).title })}</div>
      </div>`;
  }

  function render(root, { puzzle, actions, view }) {
    const d = puzzle.design;
    const C = MF.design.resolve(d);
    const open = id => view.sections[id] ?? ['theme', 'colors-main'].includes(id);
    const S = (id, title, icon, html) => ui.section(id, title, icon, html, open(id));
    root.innerHTML = `<div class="design-panel">
      ${S('theme', 'Thèmes', 'sparkle', themeCards(d))}
      ${S('colors-main', 'Couleur principale', 'palette', `<div class="swatches">${ACCENTS.map(c => `<button type="button" class="swatch-btn ${c === d.accent ? 'active' : ''}" data-accent="${c}" style="--c:${c}" aria-label="${c}"></button>`).join('')}
        <label class="swatch-btn custom" title="Couleur personnalisée" style="--c:${d.accent}"><input type="color" data-accent-input value="${d.accent}"></label></div>
        <p class="field-hint">Cadre, flèches et cases définitions s'accordent automatiquement à cette couleur.</p>`)}
      ${S('background', 'Fond de l\'affiche', 'image', backgroundControls(d))}
      ${S('cells', 'Style des cases', 'grid', cellControls(d, C))}
      ${S('colors', 'Couleurs détaillées', 'palette', colorControls(d, C))}
      ${S('typo', 'Polices & texte', 'type', typoControls(d, puzzle.game))}
      ${puzzle.game === 'fleches' ? S('arrows', 'Flèches', 'chevronRight', `${ui.segmented('arrows.style', Object.entries(MF.design.ARROWS), d.arrows.style)}${ui.slider('arrows.size', 'Taille', d.arrows.size, 0.6, 1.8, 0.05, '×')}`) : ''}
      ${S('layout', 'Mise en page & format', 'frame', layoutControls(d))}
      ${S('title', 'Titre', 'type', titleControls(d))}
      <input type="file" id="bg-file" accept="${MF.assets.ACCEPT.join(',')}" hidden>
    </div>`;
    bind(root, puzzle, actions, view);
  }

  const parse = v => (v === 'true' ? true : v === 'false' ? false : /^-?\d+(\.\d+)?$/.test(v) ? +v : v);

  function bind(root, puzzle, actions, view) {
    const set = (path, value, live) => actions.setDesignPath(path, value, { live });
    root.querySelectorAll('details.section').forEach(det => det.addEventListener('toggle', () => { view.sections[det.dataset.section] = det.open; }));
    root.addEventListener('click', e => {
      const t = e.target.closest('button');
      if (!t) return;
      if (t.dataset.themeId) actions.applyTheme(t.dataset.themeId);
      else if (t.dataset.accent) actions.setDesign({ accent: t.dataset.accent });
      else if (t.dataset.cellStyle) { const s = MF.design.CELL_STYLES[t.dataset.cellStyle]; const { label, ...vals } = s; void label; actions.setDesign({ cell: { ...vals, style: t.dataset.cellStyle } }); }
      else if (t.dataset.pattern) set('background.pattern', t.dataset.pattern);
      else if (t.dataset.format) actions.setDesign({ poster: { format: t.dataset.format } });
      else if (t.dataset.anchor) set('poster.anchor', t.dataset.anchor);
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
          // Motif / aurore : on garantit des couleurs assez contrastées avec le fond pour être visibles
          const b = puzzle.design.background, a = puzzle.design.accent;
          const far = (x, y) => Math.abs(MF.util.luminance(x) - MF.util.luminance(y)) > 0.12;
          const patch = { type: t.dataset.v };
          if (!far(b.c1, b.c2)) patch.c2 = MF.util.mix(b.c1, MF.util.luminance(b.c1) > 0.5 ? a : MF.util.tint(a, 0.3), 0.55);
          if (!far(b.c1, b.c3)) patch.c3 = MF.util.mix(b.c1, MF.util.luminance(b.c1) > 0.5 ? '#ffb000' : '#ffffff', 0.45);
          actions.setDesign({ background: patch });
        } else if (seg) set(seg.dataset.seg, parse(t.dataset.v));
      }
    });
    root.querySelectorAll('[data-slider]').forEach(inp => {
      const out = inp.closest('.slider-field').querySelector('output');
      const val = () => (inp.dataset.slider === 'poster.scale' ? +inp.value / 100 : +inp.value);
      inp.addEventListener('input', () => { out.textContent = `${+(+inp.value).toFixed(2)}${out.dataset.unit}`; set(inp.dataset.slider, val(), true); });
      inp.addEventListener('change', () => set(inp.dataset.slider, val(), false));
    });
    root.querySelectorAll('[data-color-key] input[type=color]').forEach(inp => {
      const key = inp.closest('[data-color-key]').dataset.colorKey;
      inp.addEventListener('input', () => { inp.parentElement.style.setProperty('--c', inp.value); set(key, inp.value, true); });
      inp.addEventListener('change', () => set(key, inp.value, false));
    });
    root.querySelector('[data-accent-input]')?.addEventListener('input', MF.util.debounce(e => actions.setDesign({ accent: e.target.value }, { live: true }), 60));
    root.querySelector('[data-accent-input]')?.addEventListener('change', e => actions.setDesign({ accent: e.target.value }));
    root.querySelectorAll('[data-select]').forEach(sel => sel.addEventListener('change', () => set(sel.dataset.select, sel.value)));
    root.querySelectorAll('[data-toggle]').forEach(cb => cb.addEventListener('change', () => set(cb.dataset.toggle, cb.checked)));
    root.querySelectorAll('[data-text]').forEach(inp => {
      inp.addEventListener('input', MF.util.debounce(() => set(inp.dataset.text, inp.value, true), 250));
      inp.addEventListener('change', () => set(inp.dataset.text, inp.value, false));
    });
    root.querySelector('#bg-file').addEventListener('change', e => {
      const f = e.target.files[0];
      e.target.value = '';
      if (f) actions.setBackgroundImage(f);
    });
  }

  return render;
})();
