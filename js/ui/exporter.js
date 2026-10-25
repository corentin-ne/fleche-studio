/* =========================================================================
   Export : PNG haute définition, SVG vectoriel, impression / PDF, lot ZIP.
   La fenêtre d'export permet aussi de choisir la mise en page finale
   (format de la page, position et taille de la grille) avec aperçu direct.

   Une « page » à exporter : { name, puzzle, model }.
   ========================================================================= */
window.MF = window.MF || {};

MF.exporter = (() => {
  const { esc, plural } = MF.util;
  const ic = MF.icons.svg;
  const slug = s => MF.util.normalize(s).toLowerCase() || 'grille';
  const fileName = (page, letters, ext) => `${slug(page.name)}${letters ? '-solution' : ''}.${ext}`;

  /** Copie du puzzle adaptée à l'export (fond transparent si demandé). */
  function exportPuzzle(pz, { transparent }) {
    if (!transparent) return pz;
    const copy = MF.util.deepClone(pz);
    copy.design.background.type = 'none';
    return copy;
  }

  function sceneOf(page, opts, assetUrl) {
    return MF.scene.compose(page.model, exportPuzzle(page.puzzle, opts), { letters: opts.letters, forExport: true, assetUrl });
  }

  /** Images utilisées par une page, en data URL (pour un SVG autonome). */
  async function dataUrls(pz) {
    const ids = [pz.design.background.imageId, ...pz.stickers.map(s => s.imageId)].filter(Boolean);
    const map = new Map();
    await Promise.all(ids.map(async id => map.set(id, await MF.assets.dataUrl(id))));
    return id => map.get(id) || null;
  }

  async function pngBlob(page, opts) {
    await document.fonts?.ready;
    const cv = await MF.renderers.canvas(sceneOf(page, opts, MF.assets.url), { scale: opts.scale });
    const blob = await new Promise(r => cv.toBlob(r, 'image/png'));
    cv.width = cv.height = 0; // libère la mémoire tout de suite (lots en Ultra)
    return blob;
  }
  async function svgMarkup(page, opts) {
    const url = await dataUrls(page.puzzle);
    return '<?xml version="1.0" encoding="UTF-8"?>\n' + MF.renderers.svg(sceneOf(page, opts, url), { forExport: true });
  }

  async function png(page, opts) { MF.util.downloadBlob(fileName(page, opts.letters, 'png'), await pngBlob(page, opts)); }
  async function svg(page, opts) { MF.util.download(fileName(page, opts.letters, 'svg'), await svgMarkup(page, opts), 'image/svg+xml'); }

  function print(page, opts) {
    const area = document.getElementById('print-area');
    const scene = sceneOf(page, opts, MF.assets.url);
    const p = page.puzzle.design.poster;
    const fmt = ['A4', 'A3', 'letter'].includes(p.format) ? p.format : MF.paper.of(page.puzzle.options).format;
    const orient = ['A4', 'A3', 'letter'].includes(p.format) ? p.orientation : (scene.W > scene.H ? 'landscape' : 'portrait');
    let sheet = document.getElementById('print-page');
    if (!sheet) { sheet = document.createElement('style'); sheet.id = 'print-page'; document.head.appendChild(sheet); }
    sheet.textContent = `@media print { @page { size: ${fmt === 'letter' ? 'letter' : fmt} ${orient}; margin: 8mm; } }`;
    area.innerHTML = MF.renderers.svg(scene, { forExport: true });
    setTimeout(() => window.print(), 50);
  }

  /** Lot ZIP : chaque page en version vierge et avec solution. */
  async function bundle(pages, { format, zipName, ...opts }) {
    const exts = format === 'both' ? ['png', 'svg'] : [format];
    const total = pages.length * 2 * exts.length;
    MF.ui.toast(`Préparation de ${plural(total, 'fichier')}…`, 'info', 2500);
    const files = [];
    for (const letters of [false, true]) {
      const dir = letters ? 'Solutions' : 'Grilles';
      for (const page of pages) {
        for (const ext of exts) {
          const o = { ...opts, letters };
          const data = ext === 'png' ? await pngBlob(page, o) : await svgMarkup(page, o);
          files.push({ name: `${dir}/${fileName(page, letters, ext)}`, data });
          await MF.util.nextFrame();
        }
      }
    }
    MF.util.downloadBlob(zipName, await MF.zip.create(files));
    MF.ui.toast(`ZIP prêt : ${plural(total, 'fichier')} (grilles + solutions).`, 'ok', 4500);
  }

  /**
   * Fenêtre d'export avec aperçu.
   * @param getPage  () => page affichée (relue à chaque changement de mise en page)
   * @param scopes   lots possibles : [{ id, label, pages, zipName }]
   * @param setDesign (patch) => void : enregistre la mise en page choisie
   */
  function open(getPage, scopes, setDesign) {
    const st = { letters: false, scale: 2, format: 'png', transparent: false, scopeId: scopes[0]?.id };
    const seg = (id, items, active) => MF.ui.segmented(id, items, active, 'data-exp');
    const layoutHtml = d => {
      const p = d.poster;
      return `<div class="format-grid compact">${Object.entries(MF.design.FORMATS).map(([id, f]) => {
        const r = f.ratio ? (f.fixed || p.orientation !== 'landscape' ? f.ratio : 1 / f.ratio) : 0.8;
        return `<button type="button" class="format-btn ${p.format === id ? 'active' : ''}" data-format="${id}"><span class="fmt-shape" style="aspect-ratio:${r}">${id === 'fit' ? ic('grid', 'ic-sm') : ''}</span><span>${esc(f.label)}</span></button>`;
      }).join('')}</div>
      ${p.format !== 'fit' ? `<div class="row align-start">
        <div class="field"><span>Position</span><div class="anchor-grid">${MF.design.ANCHORS.map(a => `<button type="button" class="${p.anchor === a ? 'active' : ''}" data-anchor="${a}" aria-label="Position ${a}"><i></i></button>`).join('')}</div></div>
        <div class="grow stack">
          ${MF.design.FORMATS[p.format].fixed ? '' : `<div class="field"><span>Orientation</span>${MF.ui.segmented('orientation', [['portrait', 'Portrait', 'page-portrait'], ['landscape', 'Paysage', 'page-landscape']], p.orientation, 'data-orient')}</div>`}
          ${MF.ui.slider('scale', 'Taille de la grille', Math.round(p.scale * 100), 30, 100, 1, '%')}
        </div></div>` : ''}
      ${MF.ui.slider('padding', 'Marge autour', p.padding, 0, 400, 5)}`;
    };

    const body = `
      <div class="export-grid">
        <div class="export-preview" id="exp-preview"></div>
        <div class="stack">
          <div class="field"><span>Contenu</span>${seg('content', [['blank', 'Grille à remplir'], ['solution', 'Avec solution']], 'blank')}</div>
          <div class="export-layout glass-soft"><div class="field-label">${ic('frame')}Mise en page : où placer la grille ?</div><div id="exp-layout"></div></div>
          <div class="field"><span>Qualité PNG</span>${seg('scale', [['1', 'Standard'], ['2', 'HD'], ['3', 'Ultra']], '2')}<span class="field-hint" id="exp-px"></span></div>
          <label class="check"><input type="checkbox" id="exp-transparent"> Fond transparent (PNG / SVG)</label>
          ${scopes.length ? `<div class="export-bundle glass-soft">
            <div class="field"><span>${ic('archive')}Tout d'un coup (ZIP : grilles + solutions)</span>
              ${scopes.length > 1 ? seg('scope', scopes.map(s => [s.id, s.label]), scopes[0].id) : `<span class="field-hint">${esc(scopes[0].label)}</span>`}
              ${seg('format', [['png', 'PNG'], ['svg', 'SVG'], ['both', 'PNG + SVG']], 'png')}
              <span class="field-hint" id="exp-bundle-hint"></span></div></div>` : ''}
        </div>
      </div>`;

    const scope = () => scopes.find(s => s.id === st.scopeId);
    const refresh = root => {
      const page = getPage();
      if (!page) return;
      const scene = sceneOf(page, st, MF.assets.url);
      root.querySelector('#exp-preview').innerHTML = MF.renderers.svg(scene, { forExport: true });
      const pw = Math.round(scene.W * st.scale), ph = Math.round(scene.H * st.scale);
      root.querySelector('#exp-px').textContent = `${pw} × ${ph} px`;
      const hint = root.querySelector('#exp-bundle-hint');
      if (hint) {
        const n = scope().pages.length, per = st.format === 'both' ? 2 : 1;
        hint.textContent = `${plural(n, 'page')} × 2 (grille + solution)${per > 1 ? ' × 2 formats' : ''} = ${plural(n * 2 * per, 'fichier')}${scope().note ? `. ${scope().note}` : ''}`;
      }
    };
    const refreshLayout = root => {
      const page = getPage();
      root.querySelector('#exp-layout').innerHTML = layoutHtml(page.puzzle.design);
      root.querySelectorAll('#exp-layout [data-slider]').forEach(inp => {
        const out = inp.closest('.slider-field').querySelector('output');
        const val = () => (inp.dataset.slider === 'scale' ? +inp.value / 100 : +inp.value);
        inp.addEventListener('input', () => { out.textContent = `${inp.value}${out.dataset.unit}`; setDesign({ poster: { [inp.dataset.slider]: val() } }, true); refresh(root); });
        inp.addEventListener('change', () => setDesign({ poster: { [inp.dataset.slider]: val() } }));
      });
    };

    return MF.ui.modal({
      title: 'Exporter', wide: true, icon: 'download', className: 'export-modal',
      body,
      onOpen: root => {
        root.addEventListener('click', e => {
          const b = e.target.closest('button');
          if (!b) return;
          const group = b.closest('[data-exp]');
          if (group) {
            group.querySelectorAll('button').forEach(x => x.classList.toggle('active', x === b));
            const k = group.dataset.exp, v = b.dataset.v;
            if (k === 'content') st.letters = v === 'solution';
            if (k === 'scale') st.scale = +v;
            if (k === 'scope') st.scopeId = v;
            if (k === 'format') st.format = v;
            refresh(root);
            return;
          }
          let patch = null;
          if (b.dataset.format) patch = { format: b.dataset.format };
          if (b.dataset.anchor) patch = { anchor: b.dataset.anchor };
          if (b.closest('[data-orient]')) patch = { orientation: b.dataset.v };
          if (patch) { setDesign({ poster: patch }); refreshLayout(root); refresh(root); }
        });
        root.querySelector('#exp-transparent').addEventListener('change', e => { st.transparent = e.target.checked; refresh(root); });
        refreshLayout(root);
        refresh(root);
      },
      actions: [
        { label: 'Imprimer / PDF', icon: 'print', value: () => (print(getPage(), st), 'print') },
        { label: 'SVG', icon: 'download', value: () => (svg(getPage(), st).catch(() => MF.ui.toast('Export SVG impossible.', 'err')), 'svg') },
        { label: 'PNG', icon: 'image', kind: scopes.length ? '' : 'primary', value: () => (png(getPage(), st).catch(() => MF.ui.toast('Export PNG impossible.', 'err')), 'png') },
        ...(scopes.length ? [{
          label: 'Tout en ZIP', icon: 'archive', kind: 'primary',
          value: () => (bundle(scope().pages, { ...st, zipName: scope().zipName }).catch(() => MF.ui.toast('Le ZIP n\'a pas pu être créé.', 'err')), 'zip'),
        }] : []),
      ],
    });
  }

  return { open, png, svg, print, bundle, slug };
})();
