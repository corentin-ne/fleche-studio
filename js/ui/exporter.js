/* =========================================================================
   Export des grilles : PNG haute définition, SVG vectoriel, impression,
   et lot ZIP (toutes les pages, vierges + solutions, en un seul téléchargement).
   Pensé pour Canva : cadre, bande et cases photo dans la couleur, cases à remplir blanches.

   Une « page » à exporter : { name, accent, style, model }.
   ========================================================================= */
window.MF = window.MF || {};

MF.exporter = (() => {
  const { esc, plural } = MF.util;
  const slug = s => MF.util.normalize(s).toLowerCase() || 'grille';

  const fileName = (page, letters, ext) => `mots-fleches-${slug(page.name)}${letters ? '-solution' : ''}.${ext}`;

  async function pngBlob(page, { letters, scale }) {
    await document.fonts?.ready;
    const cv = MF.renderers.canvas(page.model, page.accent, { letters, scale, style: page.style });
    const blob = await new Promise(r => cv.toBlob(r, 'image/png'));
    cv.width = cv.height = 0; // libère la mémoire tout de suite (lots en Ultra)
    return blob;
  }

  const svgMarkup = (page, letters) =>
    '<?xml version="1.0" encoding="UTF-8"?>\n' + MF.renderers.svg(page.model, page.accent, { letters, style: page.style, forExport: true });

  async function png(page, opts) {
    MF.util.downloadBlob(fileName(page, opts.letters, 'png'), await pngBlob(page, opts));
  }

  function svg(page, { letters }) {
    MF.util.download(fileName(page, letters, 'svg'), svgMarkup(page, letters), 'image/svg+xml');
  }

  function print(page, { letters }) {
    const area = document.getElementById('print-area');
    // Format de la feuille (A4 / A3, portrait / paysage) : @page ne peut pas être modifié autrement
    let sheet = document.getElementById('print-page');
    if (!sheet) { sheet = document.createElement('style'); sheet.id = 'print-page'; document.head.appendChild(sheet); }
    sheet.textContent = MF.paper.printCss(page.paper);
    area.innerHTML = `<h1>${esc(page.name)}</h1>${MF.renderers.svg(page.model, page.accent, { letters, style: page.style, forExport: true })}`;
    window.print();
  }

  /**
   * Lot ZIP : chaque page en version vierge (dossier « Grilles vierges ») et avec solution (« Solutions »).
   * @param format 'png' | 'svg' | 'both'
   */
  async function bundle(pages, { format, scale, zipName }) {
    const exts = format === 'both' ? ['png', 'svg'] : [format];
    const total = pages.length * 2 * exts.length;
    MF.ui.toast(`Préparation de ${plural(total, 'fichier')}…`, 'info', 2500);
    const files = [];
    for (const letters of [false, true]) {
      const dir = letters ? 'Solutions' : 'Grilles vierges';
      for (const page of pages) {
        for (const ext of exts) {
          const data = ext === 'png' ? await pngBlob(page, { letters, scale }) : svgMarkup(page, letters);
          files.push({ name: `${dir}/${fileName(page, letters, ext)}`, data });
          await MF.util.nextFrame(); // l'interface reste fluide pendant le rendu
        }
      }
    }
    MF.util.downloadBlob(zipName, await MF.zip.create(files));
    MF.ui.toast(`ZIP prêt : ${plural(total, 'fichier')} (vierges + solutions).`, 'ok', 4500);
  }

  /**
   * Modale d'export avec aperçu.
   * @param page     page affichée (export unitaire)
   * @param scopes   lots possibles : [{ id, label, pages, zipName }] (le premier est sélectionné)
   */
  function open(page, scopes = []) {
    const { w, h } = MF.renderers.size(page.model);
    const seg = (id, items, active) => `<div class="segmented" id="${id}">${items.map(([v, l]) => `<button type="button" data-v="${v}" class="${v === active ? 'active' : ''}">${l}</button>`).join('')}</div>`;
    const body = `
      <div class="export-grid">
        <div class="export-preview" id="exp-preview"></div>
        <div class="stack">
          <div class="field"><span>Contenu</span>${seg('exp-content', [['blank', 'Grille vierge'], ['solution', 'Avec solution']], 'blank')}</div>
          <div class="field"><span>Définition PNG</span>${seg('exp-scale', [['1', 'Standard'], ['2', 'HD'], ['3', 'Ultra']], '2')}
            <span class="field-hint" id="exp-px"></span>
          </div>
          ${scopes.length ? `
          <div class="export-bundle glass-soft">
            <div class="field"><span>${MF.icons.svg('archive')}Tout télécharger d'un coup (ZIP)</span>
              ${scopes.length > 1 ? seg('exp-scope', scopes.map(s => [s.id, s.label]), scopes[0].id) : `<span class="field-hint">${esc(scopes[0].label)}</span>`}
              ${seg('exp-format', [['png', 'PNG'], ['svg', 'SVG'], ['both', 'PNG + SVG']], 'png')}
              <span class="field-hint" id="exp-bundle-hint"></span>
            </div>
          </div>` : ''}
          <div class="tip glass-soft">
            ${MF.icons.svg('info')}
            <p><strong>Pour Canva :</strong> importe le PNG HD (ou le SVG) puis place-le sous les photos.
            ${page.model.band ? `La bande du haut (${page.model.band} lignes) et les cases photo` : 'Le cadre et les cases photo'} sont pleins dans la couleur de la grille : ta pote peut poser les images dessus sans masquer de case à remplir.</p>
          </div>
          <div class="muted small">${MF.paper.label(page.paper)} · ${page.model.cols} × ${page.model.rows} cases${page.model.band ? ` · dont ${page.model.band} lignes de bande photo` : ''}</div>
        </div>
      </div>`;

    let letters = false, scale = 2, format = 'png', scopeId = scopes[0]?.id;
    const scope = () => scopes.find(s => s.id === scopeId);
    const refresh = root => {
      root.querySelector('#exp-preview').innerHTML = MF.renderers.svg(page.model, page.accent, { letters, style: page.style, forExport: true });
      const pw = Math.round(w * scale), ph = Math.round(h * scale);
      root.querySelector('#exp-px').textContent = `${pw} × ${ph} px · ~${MF.paper.dpi(pw, ph, page.paper)} dpi en ${MF.paper.label(page.paper)}`;
      const hint = root.querySelector('#exp-bundle-hint');
      if (hint) {
        const n = scope().pages.length;
        const per = format === 'both' ? 2 : 1;
        hint.textContent = `${plural(n, 'page')} × (vierge + solution)${per > 1 ? ' × 2 formats' : ''} = ${plural(n * 2 * per, 'fichier')}${format !== 'svg' ? ` · PNG en ${['', 'Standard', 'HD', 'Ultra'][scale]}` : ''}${scope().note ? `. ${scope().note}` : ''}`;
      }
    };
    const bindSeg = (root, id, fn) => root.querySelector(id)?.addEventListener('click', e => {
      const b = e.target.closest('button'); if (!b) return;
      root.querySelectorAll(`${id} button`).forEach(x => x.classList.toggle('active', x === b));
      fn(b.dataset.v); refresh(root);
    });

    return MF.ui.modal({
      title: `Exporter « ${page.name} »`,
      wide: true,
      body,
      onOpen: root => {
        bindSeg(root, '#exp-content', v => { letters = v === 'solution'; });
        bindSeg(root, '#exp-scale', v => { scale = +v; });
        bindSeg(root, '#exp-scope', v => { scopeId = v; });
        bindSeg(root, '#exp-format', v => { format = v; });
        refresh(root);
      },
      actions: [
        { label: 'Imprimer', icon: 'print', value: () => (print(page, { letters }), 'print') },
        { label: 'SVG', icon: 'download', value: () => (svg(page, { letters }), 'svg') },
        { label: 'PNG', icon: 'image', value: () => (png(page, { letters, scale }), 'png') },
        ...(scopes.length ? [{
          label: 'Tout en ZIP', icon: 'archive', kind: 'primary',
          value: () => (bundle(scope().pages, { format, scale, zipName: scope().zipName })
            .catch(() => MF.ui.toast('Le ZIP n\'a pas pu être créé.', 'err')), 'zip'),
        }] : []),
      ],
    });
  }

  return { open, png, svg, print, bundle, slug };
})();
