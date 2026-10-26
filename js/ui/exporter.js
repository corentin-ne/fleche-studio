// @ts-check
/* =========================================================================
   Export : PNG, JPEG, WebP, SVG, impression / PDF, lot ZIP ou PDF, envoi par
   la feuille de partage du téléphone.
   La fenêtre d'export règle le fichier : type, résolution (dpi pour
   l'impression, pixels pour l'écran), contenu, fond, décor, nom. Le format
   de page se règle dans Design → Page (rappelé ici, avec un raccourci).

   Une « page » à exporter : { name, puzzle, model }.
   ========================================================================= */
window.MF = window.MF || {};

MF.exporter = (() => {
  const { esc, plural } = MF.util;
  const { t } = MF.i18n;
  const ic = MF.icons.svg;
  /** Nom de fichier lisible : « Test étoile » -> « test-etoile ». */
  const slug = s => String(s || '').normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 60) || t('grille');

  const TYPES = {
    png: { label: 'PNG', mime: 'image/png', alpha: true, hint: t('Qualité parfaite, fond transparent possible') },
    jpeg: { label: 'JPEG', mime: 'image/jpeg', alpha: false, hint: t('Fichier léger, idéal pour envoyer') },
    webp: { label: 'WebP', mime: 'image/webp', alpha: true, hint: t('Léger et net, pour le web') },
    svg: { label: 'SVG', mime: 'image/svg+xml', alpha: true, hint: t('Vectoriel : Canva, Illustrator, impression géante') },
  };

  /** Copie du puzzle adaptée à l'export (fond transparent si demandé). */
  function exportPuzzle(pz, { transparent }) {
    if (!transparent) return pz;
    const copy = MF.util.deepClone(pz);
    copy.design.background.type = 'none';
    return copy;
  }
  const sceneOf = (page, o, assetUrl) => MF.scene.compose(page.model, exportPuzzle(page.puzzle, o), {
    letters: o.letters, forExport: true, assetUrl, stickers: o.decor !== false, title: o.title !== false,
  });

  /** Images utilisées par une page, en data URL (SVG autonome). */
  async function dataUrls(pz) {
    const ids = [pz.design.background.imageId, ...pz.stickers.map(s => s.imageId)].filter(Boolean);
    const map = new Map();
    await Promise.all(ids.map(async id => map.set(id, await MF.assets.dataUrl(id))));
    return id => map.get(id) || null;
  }

  /** Fichier d'une page : { blob, ext }. */
  async function render(page, o) {
    if (o.type === 'svg') {
      const url = await dataUrls(page.puzzle);
      const text = '<?xml version="1.0" encoding="UTF-8"?>\n' + MF.renderers.svg(sceneOf(page, o, url), { forExport: true });
      return { blob: new Blob([text], { type: 'image/svg+xml;charset=utf-8' }), ext: 'svg' };
    }
    await document.fonts?.ready;
    const ty = TYPES[o.type] || TYPES.png;
    const scene = sceneOf(page, o, MF.assets.url);
    // JPEG n'a pas de transparence : fond blanc dessous
    const cv = await MF.renderers.canvas(scene, { scale: o.width / scene.W, matte: ty.alpha ? null : '#ffffff' });
    const blob = await new Promise(r => cv.toBlob(r, ty.mime, o.quality));
    cv.width = cv.height = 0; // libère la mémoire tout de suite
    // Navigateur sans encodeur WebP : il renvoie du PNG, on garde la bonne extension
    const ext = blob?.type === 'image/png' ? 'png' : o.type === 'jpeg' ? 'jpg' : o.type;
    return { blob, ext };
  }

  const fileName = (base, letters, ext) => `${base}${letters ? '-solution' : ''}.${ext}`;

  async function download(page, o) {
    const variants = o.content === 'both' ? [false, true] : [o.content === 'solution'];
    for (const letters of variants) {
      const { blob, ext } = await render(page, { ...o, letters });
      if (!blob) throw new Error(t('Format non pris en charge par ce navigateur'));
      MF.util.downloadBlob(fileName(o.name || slug(page.name), letters, ext), blob);
      await MF.util.sleep(250);
    }
  }

  /** Format de feuille d'une page, pour @page (A4 portrait si le format n'est pas un papier). */
  const sheetOf = pz => { const mm = MF.design.formatMm(pz.design.poster); return mm ? `${mm[0]}mm ${mm[1]}mm` : 'A4 portrait'; };

  /**
   * Impression (ou « Enregistrer en PDF ») d'une suite de feuilles [{ page, letters }].
   * Chaque format de papier a sa page nommée : un lot mêlant A4 et carré s'imprime au bon format.
   */
  function printSheets(sheets, o) {
    const area = document.getElementById('print-area');
    const sizes = [...new Set(sheets.map(x => sheetOf(x.page.puzzle)))];
    let style = document.getElementById('print-page');
    if (!style) { style = document.createElement('style'); style.id = 'print-page'; document.head.appendChild(style); }
    style.textContent = `@media print { @page { size: ${sizes[0]}; margin: 8mm; } ${sizes.map((sz, i) => `@page s${i} { size: ${sz}; margin: 8mm; } .print-page.s${i} { page: s${i}; }`).join(' ')} }`;
    area.innerHTML = sheets.map(({ page, letters }) => `<div class="print-page s${sizes.indexOf(sheetOf(page.puzzle))}">${MF.renderers.svg(sceneOf(page, { ...o, letters }, MF.assets.url), { forExport: true })}</div>`).join('');
    setTimeout(() => window.print(), 50);
  }

  function print(page, o) {
    const variants = o.content === 'both' ? [false, true] : [o.content === 'solution'];
    printSheets(variants.map(letters => ({ page, letters })), o);
  }

  /** Lot à imprimer : toutes les grilles à remplir, puis toutes les solutions (un seul PDF). */
  const printAll = (pages, o) => printSheets([...pages.map(page => ({ page, letters: false })), ...pages.map(page => ({ page, letters: true }))], o);

  /** Envoi de l'image par la feuille de partage du téléphone (WhatsApp, Mail…), sinon téléchargement. */
  const canShareFiles = () => { try { return !!navigator.canShare?.({ files: [new File([''], 'x.png', { type: 'image/png' })] }); } catch { return false; } };
  async function shareImage(page, o) {
    const { blob, ext } = await render(page, { ...o, type: o.type === 'svg' ? 'png' : o.type, letters: o.content === 'solution' });
    if (!blob) throw new Error(t('Format non pris en charge par ce navigateur'));
    const file = new File([blob], fileName(o.name || slug(page.name), o.content === 'solution', ext), { type: blob.type });
    try { await navigator.share({ files: [file], title: page.name }); } catch (e) {
      if (e?.name === 'AbortError') return;
      MF.util.downloadBlob(file.name, blob); // partage refusé (délai dépassé, navigateur) : fichier téléchargé
    }
  }

  /** Lot ZIP : chaque page en version vierge et avec solution. */
  async function bundle(pages, o) {
    const types = o.zipBoth ? [o.type === 'svg' ? 'png' : o.type, 'svg'] : [o.type];
    const total = pages.length * 2 * types.length;
    MF.ui.toast(t('Préparation de {files}…', { files: plural(total, 'fichier') }), 'info', 2500);
    const files = [];
    for (const letters of [false, true]) {
      for (const page of pages) {
        for (const type of types) {
          const { blob, ext } = await render(page, { ...o, type, letters });
          files.push({ name: `${letters ? t('Solutions') : t('Grilles')}/${fileName(slug(page.name), letters, ext)}`, data: blob });
          await MF.util.nextFrame();
        }
      }
    }
    MF.util.downloadBlob(o.zipName, await MF.zip.create(files));
    MF.ui.toast(t('ZIP prêt : {files}.', { files: plural(total, 'fichier') }), 'ok', 4500);
  }

  /** Résolutions proposées selon le format : dpi pour l'impression, pixels sinon. */
  function resolutions(design) {
    const p = design.poster, f = MF.design.FORMATS[p.format] || MF.design.FORMATS.fit;
    if (f.mm) {
      const mmW = MF.design.formatMm(p)[0];
      return [[150, t('Brouillon')], [300, t('Impression')], [600, t('Haute qualité')]].map(([dpi, label]) => ({ width: Math.round((mmW / 25.4) * dpi), label: `${dpi} dpi`, hint: label }));
    }
    if (f.px) return [[1, t('Natif')], [2, 'Retina'], [4, t('Très grand')]].map(([k, label]) => ({ width: f.px[0] * k, label: `${f.px[0] * k} px`, hint: label }));
    return [[1200, 'Web'], [2400, 'HD'], [4800, t('Impression')]].map(([w, label]) => ({ width: w, label: `${w} px`, hint: label }));
  }

  /**
   * Fenêtre d'export.
   * @param getPage   () => page affichée (relue à chaque changement de mise en page)
   * @param scopes    lots possibles : [{ id, label, pages, zipName }]
   * @param onEditPage () => void : ouvre le réglage du format de page (la fenêtre se ferme)
   */
  function open(getPage, scopes, onEditPage) {
    const first = getPage();
    const st = {
      content: 'blank', type: 'png', width: 2400, quality: 0.92, transparent: false, decor: true, title: true,
      name: slug(first.name), scopeId: scopes[0]?.id, zipBoth: false,
    };
    const scope = () => scopes.find(s => s.id === st.scopeId);
    const seg = (id, items, active) => MF.ui.segmented(id, items, active, 'data-exp');

    const body = `
      <div class="export-grid">
        <div class="export-preview"><div id="exp-preview"></div><div class="exp-meta" id="exp-meta"></div></div>
        <div class="export-side">
          <div class="exp-tabs segmented" id="exp-tabs"><button type="button" data-t="file" class="active">${ic('image')}${t('Fichier')}</button><button type="button" data-t="batch">${ic('archive')}${t('Lot')}</button></div>
          <div class="exp-pane" data-pane="file">
            <div class="field"><span>${t('Contenu')}</span>${seg('content', [['blank', t('À remplir')], ['solution', t('Solution')], ['both', t('Les deux')]], st.content)}</div>
            <div class="field"><span>${t('Type de fichier')}</span>
              <div class="type-grid">${Object.entries(TYPES).map(([k, ty]) => `<button type="button" class="type-card ${k === st.type ? 'active' : ''}" data-type="${k}"><b>${ty.label}</b><small>${esc(ty.hint)}</small></button>`).join('')}</div></div>
            <div class="field" id="exp-res-field"><span>${t('Résolution')}</span><div class="res-grid" id="exp-res"></div>
              <div class="row"><label class="field mini grow"><span class="field-hint">${t('Largeur personnalisée (px)')}</span><input class="input" type="number" id="exp-width" min="200" max="12000" step="10"></label></div></div>
            <div id="exp-quality-field" hidden>${MF.ui.slider('quality', t('Qualité / compression'), 92, 50, 100, 1, '%')}</div>
            <div class="toggles">
              <label class="check" id="exp-transparent-wrap"><input type="checkbox" id="exp-transparent"> ${t('Fond transparent')}</label>
              <label class="check"><input type="checkbox" id="exp-decor" checked> ${t('Décor (stickers, photos)')}</label>
              <label class="check"><input type="checkbox" id="exp-title" checked> ${t('Titre')}</label>
            </div>
            <label class="field"><span>${t('Nom du fichier')}</span><div class="name-row"><input class="input" id="exp-name" maxlength="80" value="${esc(st.name)}"><span class="muted small" id="exp-ext">.png</span></div></label>
          </div>
          <div class="exp-pane" data-pane="batch" hidden>
            <p class="muted small">${t('Un seul fichier ZIP avec chaque page en version <b>à remplir</b> et <b>solution</b>, dans le type et la résolution choisis (onglet Fichier).')}</p>
            ${scopes.length > 1 ? `<div class="field"><span>${t('Quelles grilles ?')}</span>${seg('scope', scopes.map(s => [s.id, s.label]), st.scopeId)}</div>` : `<p class="small"><b>${esc(scopes[0]?.label || '')}</b></p>`}
            <label class="check"><input type="checkbox" id="exp-zipboth"> ${t('Ajouter aussi la version SVG')}</label>
            <p class="field-hint" id="exp-bundle-hint"></p>
            <div class="row"><button type="button" class="btn btn-primary" id="exp-zip">${ic('archive')}${t('Télécharger le ZIP')}</button>
              <button type="button" class="btn" id="exp-print-all" title="${esc(t('Toutes les grilles à remplir, puis toutes les solutions, dans un seul document'))}">${ic('print')}${t('Imprimer / PDF du lot')}</button></div>
          </div>
        </div>
      </div>`;

    const refresh = root => {
      const page = getPage();
      if (!page) return;
      const scene = sceneOf(page, { ...st, letters: st.content === 'solution' }, MF.assets.url);
      root.querySelector('#exp-preview').innerHTML = MF.renderers.svg(scene, { forExport: true });
      const ty = TYPES[st.type];
      const h = Math.round((st.width * scene.H) / scene.W);
      const f = MF.design.FORMATS[page.puzzle.design.poster.format];
      const orient = f.mm ? ` ${MF.design.formatMm(page.puzzle.design.poster)[0] > MF.design.formatMm(page.puzzle.design.poster)[1] ? t('paysage') : t('portrait')}` : '';
      root.querySelector('#exp-meta').innerHTML = `<span>${esc(f.label + orient)} · ${st.type === 'svg' ? t('vectoriel') : `${st.width} × ${h} px`}</span><button type="button" class="btn btn-sm btn-ghost" id="exp-page">${ic('frame')}${t('Changer le format')}</button>`;
      root.querySelector('#exp-ext').textContent = st.content === 'both' ? `.${st.type === 'jpeg' ? 'jpg' : st.type} (+ -solution)` : `${st.content === 'solution' ? '-solution' : ''}.${st.type === 'jpeg' ? 'jpg' : st.type}`;
      root.querySelector('#exp-res-field').hidden = st.type === 'svg';
      root.querySelector('#exp-quality-field').hidden = !['jpeg', 'webp'].includes(st.type);
      root.querySelector('#exp-transparent-wrap').classList.toggle('is-disabled', !ty.alpha);
      const res = resolutions(page.puzzle.design);
      root.querySelector('#exp-res').innerHTML = res.map(r => `<button type="button" class="res-card ${r.width === st.width ? 'active' : ''}" data-width="${r.width}"><b>${esc(r.label)}</b><small>${esc(r.hint)}</small></button>`).join('');
      root.querySelector('#exp-width').value = st.width;
      const hint = root.querySelector('#exp-bundle-hint');
      if (hint && scope()) {
        const n = scope().pages.length, per = st.zipBoth ? 2 : 1;
        hint.textContent = `${plural(n, 'page')} × 2 (${t('à remplir + solution')})${per > 1 ? ` × ${t('2 formats')}` : ''} = ${plural(n * 2 * per, 'fichier')}`;
      }
    };
    /** Changement de format : on cale la résolution sur la première proposition adaptée. */
    const snapResolution = root => {
      const page = getPage();
      const res = resolutions(page.puzzle.design);
      if (!res.some(r => r.width === st.width)) st.width = res[1]?.width || res[0].width;
      refresh(root);
    };

    return MF.ui.modal({
      title: t('Exporter'), wide: true, icon: 'download', className: 'export-modal',
      body,
      onOpen: (root, close) => {
        root.querySelector('#exp-tabs').addEventListener('click', e => {
          const b = e.target.closest('[data-t]'); if (!b) return;
          root.querySelectorAll('#exp-tabs button').forEach(x => x.classList.toggle('active', x === b));
          root.querySelectorAll('.exp-pane').forEach(p => { p.hidden = p.dataset.pane !== b.dataset.t; });
        });
        root.addEventListener('click', e => {
          const b = e.target.closest('button');
          if (!b) return;
          if (b.id === 'exp-page') { close(null); onEditPage(); return; }
          const group = b.closest('[data-exp]');
          if (group) {
            group.querySelectorAll('button').forEach(x => x.classList.toggle('active', x === b));
            st[group.dataset.exp === 'scope' ? 'scopeId' : group.dataset.exp] = b.dataset.v;
            refresh(root);
          } else if (b.dataset.type) {
            st.type = b.dataset.type;
            root.querySelectorAll('[data-type]').forEach(x => x.classList.toggle('active', x === b));
            refresh(root);
          } else if (b.dataset.width) { st.width = +b.dataset.width; refresh(root); }
        });
        root.querySelector('#exp-width').addEventListener('change', e => { st.width = MF.util.clamp(parseInt(e.target.value, 10) || 2400, 200, 12000); refresh(root); });
        root.querySelector('[data-slider="quality"]').addEventListener('input', e => { st.quality = +e.target.value / 100; e.target.closest('.slider-field').querySelector('output').textContent = `${e.target.value}%`; });
        root.querySelector('#exp-transparent').addEventListener('change', e => { st.transparent = e.target.checked; refresh(root); });
        root.querySelector('#exp-decor').addEventListener('change', e => { st.decor = e.target.checked; refresh(root); });
        root.querySelector('#exp-title').addEventListener('change', e => { st.title = e.target.checked; refresh(root); });
        root.querySelector('#exp-name').addEventListener('input', e => { st.name = MF.util.cleanText(e.target.value, 80).replace(/[\\/:*?"<>|]+/g, '-') || t('grille'); });
        root.querySelector('#exp-zipboth').addEventListener('change', e => { st.zipBoth = e.target.checked; refresh(root); });
        root.querySelector('#exp-zip')?.addEventListener('click', () => {
          bundle(scope().pages, { ...st, zipName: scope().zipName }).catch(() => MF.ui.toast(t('Le ZIP n\'a pas pu être créé.'), 'err'));
          close('zip');
        });
        root.querySelector('#exp-print-all').addEventListener('click', () => { printAll(scope().pages, st); close('print'); });
        snapResolution(root);
      },
      actions: [
        ...(canShareFiles() ? [{ label: t('Envoyer…'), icon: 'share', value: () => (shareImage(getPage(), st).catch(e => MF.ui.toast(t('Export impossible : {error}', { error: e.message }), 'err')), 'share') }] : []),
        { label: t('Imprimer / PDF'), icon: 'print', value: () => (print(getPage(), st), 'print') },
        { label: t('Télécharger'), icon: 'download', kind: 'primary', value: () => (download(getPage(), st).catch(e => MF.ui.toast(t('Export impossible : {error}', { error: e.message }), 'err')), 'file') },
      ],
    });
  }

  return { open, download, print, printAll, bundle, slug };
})();
