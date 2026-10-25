/* =========================================================================
   Réglages de mise en page de l'affiche (format, orientation, position,
   taille de la grille, marge), partagés par le panneau Design et l'export.
   ========================================================================= */
window.MF = window.MF || {};

MF.layoutControls = (() => {
  const { esc } = MF.util;
  const ic = MF.icons.svg;
  const F = MF.design.FORMATS;

  /** Vignette d'un format, à ses vraies proportions. */
  function shape(id, p) {
    const r = id === 'custom' ? null : id === 'fit' ? 0.8 : MF.design.formatRatio({ ...p, format: id });
    const w = r ? (r >= 1 ? 30 : 30 * r) : 26, h = r ? (r >= 1 ? 30 / r : 30) : 26;
    return `<span class="fmt-shape ${id === 'custom' ? 'dashed' : ''}" style="width:${w.toFixed(1)}px;height:${h.toFixed(1)}px">${id === 'fit' ? ic('grid', 'ic-xs') : id === 'custom' ? ic('edit', 'ic-xs') : ''}</span>`;
  }

  function html(design) {
    const p = design.poster;
    const groups = Object.entries(MF.design.FORMAT_GROUPS).map(([g, label]) => {
      const items = Object.entries(F).filter(([, f]) => f.group === g);
      return `<div class="fmt-group"><span class="fmt-group-label">${esc(label)}</span><div class="fmt-row">${items.map(([id, f]) => `
        <button type="button" class="fmt-card ${p.format === id ? 'active' : ''}" data-format="${id}" title="${esc(f.label)} · ${esc(f.hint)}">
          ${shape(id, p)}<span class="fmt-text"><b>${esc(f.label)}</b><small>${esc(f.hint)}</small></span></button>`).join('')}</div></div>`;
    }).join('');
    const fmt = F[p.format] || F.fit;
    const fixed = p.format !== 'fit';
    return `<div class="fmt-picker">${groups}</div>
      ${p.format === 'custom' ? `<div class="row custom-size">
        <label class="field mini"><span class="field-hint">Largeur</span><input class="input" type="number" min="1" max="20000" data-custom="customW" value="${p.customW}"></label>
        <span class="muted">×</span>
        <label class="field mini"><span class="field-hint">Hauteur</span><input class="input" type="number" min="1" max="20000" data-custom="customH" value="${p.customH}"></label>
        <span class="field-hint">px, mm… seul le rapport compte</span></div>` : ''}
      ${fmt.group === 'print' ? `<div class="field"><span>Orientation</span>${MF.ui.segmented('orientation', [['portrait', 'Portrait', 'page-portrait'], ['landscape', 'Paysage', 'page-landscape']], p.orientation, 'data-orient')}</div>` : ''}
      ${fixed ? `<div class="place-row">
          <div class="field"><span>Position</span><div class="anchor-grid">${MF.design.ANCHORS.map(a => `<button type="button" class="${p.anchor === a ? 'active' : ''}" data-anchor="${a}" aria-label="Position ${a}"><i></i></button>`).join('')}</div></div>
          <div class="grow stack">${MF.ui.slider('scale', 'Taille de la grille', Math.round(p.scale * 100), 30, 100, 1, '%')}${MF.ui.slider('padding', 'Marge', p.padding, 0, 400, 5)}</div>
        </div>` : MF.ui.slider('padding', 'Marge autour de la grille', p.padding, 0, 400, 5)}`;
  }

  /**
   * @param onPatch (posterPatch, live) => void
   * @param refresh () => void : redessiner les contrôles (changement de format)
   */
  function bind(root, onPatch, refresh) {
    root.addEventListener('click', e => {
      const b = e.target.closest('button');
      if (!b || !root.contains(b)) return;
      let patch = null;
      if (b.dataset.format) patch = { format: b.dataset.format };
      else if (b.dataset.anchor) patch = { anchor: b.dataset.anchor };
      else if (b.closest('[data-orient]')) patch = { orientation: b.dataset.v };
      if (patch) { onPatch(patch, false); refresh(); }
    });
    root.querySelectorAll('[data-slider]').forEach(inp => {
      const out = inp.closest('.slider-field').querySelector('output');
      const val = () => (inp.dataset.slider === 'scale' ? +inp.value / 100 : +inp.value);
      inp.addEventListener('input', () => { out.textContent = `${inp.value}${out.dataset.unit}`; onPatch({ [inp.dataset.slider]: val() }, true); });
      inp.addEventListener('change', () => onPatch({ [inp.dataset.slider]: val() }, false));
    });
    root.querySelectorAll('[data-custom]').forEach(inp => inp.addEventListener('change', () => onPatch({ [inp.dataset.custom]: Math.max(1, parseInt(inp.value, 10) || 1) }, false)));
  }

  return { html, bind };
})();
