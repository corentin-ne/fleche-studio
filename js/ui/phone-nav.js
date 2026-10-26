/* =========================================================================
   Navigation téléphone : barre d'onglets en bas de l'écran. Sur petit écran,
   une seule vue à la fois (la grille ou un panneau d'édition), en plein écran.
   Sur ordinateur, la barre est masquée par le CSS et n'a aucun effet.
   ========================================================================= */
window.MF = window.MF || {};

MF.phoneNav = (() => {
  const query = matchMedia('(max-width: 760px)');
  const TABS = [
    { id: 'grid', icon: 'grid', label: 'Grille' },
    { id: 'words', icon: 'list', label: 'Mots', badge: 'count-words' },
    { id: 'diag', icon: 'edit', label: 'Défs', badge: 'count-diag' },
    { id: 'design', icon: 'palette', label: 'Design' },
    { id: 'decor', icon: 'sticker', label: 'Décor', badge: 'count-decor' },
    { id: 'settings', icon: 'sliders', label: 'Options' },
  ];
  let root = null;

  /** @param el conteneur <nav> ; onSelect(id) : 'grid' ou un onglet du panneau */
  function init(el, { onSelect }) {
    root = el;
    root.innerHTML = TABS.map(t => `<button type="button" data-ptab="${t.id}" aria-label="${t.label}">
      <span data-icon="${t.icon}"></span><span class="pn-lbl">${t.label}</span>${t.badge ? `<span class="pn-badge" data-badge="${t.badge}" hidden></span>` : ''}</button>`).join('');
    MF.icons.hydrate(root);
    root.addEventListener('click', e => {
      const b = e.target.closest('button[data-ptab]');
      if (b) onSelect(b.dataset.ptab);
    });
    // Changement d'orientation / de taille : la grille se réajuste via son ResizeObserver
    query.addEventListener?.('change', () => document.body.classList.toggle('is-phone', query.matches));
    document.body.classList.toggle('is-phone', query.matches);
  }

  /** Reflète l'état : vue affichée, onglet actif et badges (copiés depuis ceux du panneau). */
  function sync({ tab, panel }) {
    if (!root) return;
    document.body.classList.toggle('m-panel', !!panel);
    const current = panel ? tab : 'grid';
    root.querySelectorAll('button[data-ptab]').forEach(b => b.classList.toggle('active', b.dataset.ptab === current));
    root.querySelectorAll('[data-badge]').forEach(span => {
      const src = document.getElementById(span.dataset.badge);
      const text = src && !src.hidden ? src.textContent.trim() : '';
      span.textContent = text;
      span.hidden = !text || text === '0';
      span.className = `pn-badge ${src?.classList.contains('err') ? 'err' : src?.classList.contains('warn') ? 'warn' : ''}`;
    });
  }

  const isPhone = () => query.matches;

  return { init, sync, isPhone };
})();
