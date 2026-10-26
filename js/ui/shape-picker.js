/* =========================================================================
   Sélecteur de forme de grille, partagé par le panneau Grille et l'assistant
   de création : familles en puces (Formes, Symboles, Lettres, Chiffres),
   une seule famille visible à la fois. Le changement de famille se fait
   sur place (aucun nouveau rendu) ; la dernière famille ouverte est retenue.
   ========================================================================= */
window.MF = window.MF || {};

MF.shapePicker = (() => {
  const { esc } = MF.util;
  const S = MF.shapes;
  let lastGroup = null;

  /**
   * @param current  forme sélectionnée
   * @param attrs    id => attributs du bouton (ce que lit le gestionnaire de clic de l'appelant)
   * @param compact  vignettes plus petites (assistant)
   */
  function html(current, { attrs = id => `data-shape-id="${id}"`, compact = false } = {}) {
    // Famille ouverte : celle de la forme choisie, sauf si l'on vient d'en ouvrir une autre
    const open = lastGroup && S.GROUPS[lastGroup] ? lastGroup : S.groupOf(current);
    const n = compact ? 11 : 13;
    const chips = Object.entries(S.GROUPS).map(([g, label]) => {
      const has = S.groupOf(current) === g;
      return `<button type="button" class="chip chip-btn ${g === open ? 'active' : ''}" data-shape-cat="${g}" aria-pressed="${g === open}">${esc(label)}${has ? '<i class="chip-dot" aria-label="forme choisie"></i>' : ''}<small>${S.byGroup(g).length}</small></button>`;
    }).join('');
    const panels = Object.keys(S.GROUPS).map(g => {
      const glyphs = g === 'letters' || g === 'digits';
      return `<div class="shape-grid ${glyphs ? 'glyphs' : ''} ${compact ? 'compact' : ''}" data-shape-panel="${g}" ${g === open ? '' : 'hidden'}>${S.byGroup(g).map(id => {
        const s = S.SHAPES[id];
        return `<button type="button" class="shape-btn ${id === current ? 'active' : ''}" ${attrs(id)} title="${esc(s.label)}" aria-label="${esc(s.label)}">${S.preview(id, n)}<span>${esc(s.short || s.label)}</span></button>`;
      }).join('')}</div>`;
    }).join('');
    return `<div class="shape-picker"><div class="chips shape-cats" role="toolbar" aria-label="Familles de formes">${chips}</div>${panels}</div>`;
  }

  /** Bascule de famille, sur place. */
  function bind(root) {
    root.querySelectorAll('.shape-picker').forEach(picker => picker.addEventListener('click', e => {
      const btn = e.target.closest('.shape-btn');
      if (btn) {
        // La pastille suit la famille de la forme choisie (utile quand l'appelant ne redessine pas)
        const g = btn.closest('[data-shape-panel]').dataset.shapePanel;
        picker.querySelectorAll('[data-shape-cat]').forEach(c => {
          c.querySelector('.chip-dot')?.remove();
          if (c.dataset.shapeCat === g) c.querySelector('small').insertAdjacentHTML('beforebegin', '<i class="chip-dot" aria-label="forme choisie"></i>');
        });
        return;
      }
      const chip = e.target.closest('[data-shape-cat]');
      if (!chip) return;
      lastGroup = chip.dataset.shapeCat;
      picker.querySelectorAll('[data-shape-cat]').forEach(c => { const on = c === chip; c.classList.toggle('active', on); c.setAttribute('aria-pressed', on); });
      picker.querySelectorAll('[data-shape-panel]').forEach(p => { p.hidden = p.dataset.shapePanel !== lastGroup; });
    }));
  }

  return { html, bind };
})();
