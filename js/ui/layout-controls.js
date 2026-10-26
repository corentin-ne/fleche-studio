/* =========================================================================
   Réglages de mise en page de l'affiche (format, orientation, position,
   taille de la grille, marge), partagés par le panneau Design et l'export.
   ========================================================================= */
window.MF = window.MF || {};

MF.layoutControls = (() => {
  const { esc } = MF.util;
  const { t } = MF.i18n;
  const ic = MF.icons.svg;
  const F = MF.design.FORMATS;

  /** Vignette d'un format, à ses vraies proportions. */
  function shape(id, p) {
    const r = id === 'custom' ? null : id === 'fit' ? 0.8 : MF.design.formatRatio({ ...p, format: id });
    const w = r ? (r >= 1 ? 30 : 30 * r) : 26, h = r ? (r >= 1 ? 30 / r : 30) : 26;
    return `<span class="fmt-shape ${id === 'custom' ? 'dashed' : ''}" style="width:${w.toFixed(1)}px;height:${h.toFixed(1)}px">${id === 'fit' ? ic('grid', 'ic-xs') : id === 'custom' ? ic('edit', 'ic-xs') : ''}</span>`;
  }

  /** Familles à onglets (les formats « Ajusté » et « Personnalisé » restent toujours visibles). */
  const TABBED = Object.keys(MF.design.FORMAT_GROUPS).filter(g => g !== 'auto' && g !== 'custom');
  let openGroup = null;

  const card = (id, p) => {
    const f = F[id];
    return `<button type="button" class="fmt-card ${p.format === id ? 'active' : ''}" data-format="${id}" title="${esc(f.label)} · ${esc(f.hint)}">
          ${shape(id, p)}<span class="fmt-text"><b>${esc(f.label)}</b><small>${esc(f.hint)}</small></span></button>`;
  };

  function html(design) {
    const p = design.poster;
    const current = (F[p.format] || F.fit).group;
    // Famille ouverte : celle du format choisi, sinon la dernière consultée
    const open = TABBED.includes(current) ? current : openGroup || 'print';
    openGroup = open;
    const ids = g => Object.keys(F).filter(id => F[id].group === g);
    const groups = `<div class="fmt-row fmt-main">${card('fit', p)}${card('custom', p)}</div>
      <div class="chips fmt-tabs" role="toolbar" aria-label="${esc(t('Familles de formats'))}">${TABBED.map(g => `<button type="button" class="chip chip-btn ${g === open ? 'active' : ''}" data-fmt-tab="${g}">${esc(MF.design.FORMAT_GROUPS[g])}${g === current ? `<i class="chip-dot" aria-label="${esc(t('format choisi'))}"></i>` : ''}<small>${ids(g).length}</small></button>`).join('')}</div>
      ${TABBED.map(g => `<div class="fmt-row" data-fmt-panel="${g}" ${g === open ? '' : 'hidden'}>${ids(g).map(id => card(id, p)).join('')}</div>`).join('')}`;
    const fmt = F[p.format] || F.fit;
    const fixed = p.format !== 'fit';
    return `<div class="fmt-picker">${groups}</div>
      ${p.format === 'custom' ? `<div class="row custom-size">
        <label class="field mini"><span class="field-hint">${t('Largeur')}</span><input class="input" type="number" min="1" max="20000" data-custom="customW" value="${p.customW}"></label>
        <span class="muted">×</span>
        <label class="field mini"><span class="field-hint">${t('Hauteur')}</span><input class="input" type="number" min="1" max="20000" data-custom="customH" value="${p.customH}"></label>
        <span class="field-hint">${t('px, mm… seul le rapport compte')}</span></div>` : ''}
      ${fmt.mm ? `<div class="field"><span>${t('Orientation')}</span>${MF.ui.segmented('orientation', [['portrait', t('Portrait'), 'page-portrait'], ['landscape', t('Paysage'), 'page-landscape']], p.orientation, 'data-orient')}</div>` : ''}
      ${fixed ? `<div class="place-row">
          <div class="field"><span>${t('Position')}</span><div class="anchor-grid">${MF.design.ANCHORS.map(a => `<button type="button" class="${p.anchor === a ? 'active' : ''}" data-anchor="${a}" aria-label="${esc(t('Position {anchor}', { anchor: a }))}"><i></i></button>`).join('')}</div></div>
          <div class="grow stack">${MF.ui.slider('scale', t('Taille de la grille'), p.scale, 30, 100, 1, '%', { div: 100 })}${MF.ui.slider('padding', t('Marge'), p.padding, 0, 400, 5)}</div>
        </div>` : MF.ui.slider('padding', t('Marge autour de la grille'), p.padding, 0, 400, 5)}`;
  }

  /**
   * @param onPatch (posterPatch, live) => void
   * @param refresh () => void : redessiner les contrôles (changement de format)
   */
  function bind(root, onPatch, refresh) {
    root.addEventListener('click', e => {
      const b = e.target.closest('button');
      if (!b || !root.contains(b)) return;
      if (b.dataset.fmtTab) {
        // Changement de famille sur place : rien n'est modifié tant qu'aucun format n'est choisi
        openGroup = b.dataset.fmtTab;
        root.querySelectorAll('[data-fmt-tab]').forEach(c => c.classList.toggle('active', c === b));
        root.querySelectorAll('[data-fmt-panel]').forEach(x => { x.hidden = x.dataset.fmtPanel !== openGroup; });
        return;
      }
      let patch = null;
      if (b.dataset.format) patch = { format: b.dataset.format };
      else if (b.dataset.anchor) patch = { anchor: b.dataset.anchor };
      else if (b.closest('[data-orient]')) patch = { orientation: b.dataset.v };
      if (patch) { onPatch(patch, false); refresh(); }
    });
    MF.ui.bindFields(root, (key, value, live) => onPatch({ [key]: value }, live));
    root.querySelectorAll('[data-custom]').forEach(inp => inp.addEventListener('change', () => onPatch({ [inp.dataset.custom]: Math.max(1, parseInt(inp.value, 10) || 1) }, false)));
  }

  return { html, bind };
})();
