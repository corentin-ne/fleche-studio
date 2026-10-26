/* =========================================================================
   Navigation téléphone : barre d'onglets en bas de l'écran. Sur petit écran,
   une seule vue à la fois (la grille ou un panneau d'édition), en plein écran.
   Sur ordinateur, la barre est masquée par le CSS et n'a aucun effet.
   ========================================================================= */
window.MF = window.MF || {};

MF.phoneNav = (() => {
  const { t } = MF.i18n;
  const query = matchMedia('(max-width: 760px)');
  const TABS = [
    { id: 'grid', icon: 'grid', label: t('Grille') },
    { id: 'words', icon: 'list', label: t('Mots'), badge: 'count-words' },
    { id: 'diag', icon: 'edit', label: t('Défs'), badge: 'count-diag' },
    { id: 'design', icon: 'palette', label: t('Design') },
    { id: 'decor', icon: 'sticker', label: t('Décor'), badge: 'count-decor' },
    { id: 'settings', icon: 'sliders', label: t('Options') },
  ];
  let root = null;

  /** @param el conteneur <nav> ; onSelect(id) : 'grid' ou un onglet du panneau */
  function init(el, { onSelect }) {
    root = el;
    root.innerHTML = TABS.map(tab => `<button type="button" data-ptab="${tab.id}" aria-label="${tab.label}">
      <span data-icon="${tab.icon}"></span><span class="pn-lbl">${tab.label}</span>${tab.badge ? `<span class="pn-badge" data-badge="${tab.badge}" hidden></span>` : ''}</button>`).join('');
    MF.icons.hydrate(root);
    root.addEventListener('click', e => {
      const b = e.target.closest('button[data-ptab]');
      if (b) onSelect(b.dataset.ptab);
    });
    // Changement d'orientation / de taille : la grille se réajuste via son ResizeObserver
    query.addEventListener?.('change', () => document.body.classList.toggle('is-phone', query.matches));
    document.body.classList.toggle('is-phone', query.matches);
    watchKeyboard();
    preventFocusZoom();
  }

  /**
   * Clavier virtuel réellement affiché : la barre du bas s'efface pour laisser la place.
   * Un champ actif ne suffit pas (sur Android, fermer le clavier laisse le focus dans le
   * champ) : on vérifie aussi que la zone visible de l'écran a rétréci.
   */
  function watchKeyboard() {
    const typing = el => el?.matches?.('input:not([type=range]):not([type=checkbox]):not([type=radio]):not([type=color]), textarea, [contenteditable="true"]');
    const vv = window.visualViewport;
    let full = vv ? vv.height : 0; // hauteur sans clavier (pour l'orientation courante)
    let open = false;
    const update = () => {
      if (vv) full = Math.max(full, vv.height);
      const shrunk = vv ? vv.height < full * 0.8 : true;
      const now = query.matches && typing(document.activeElement) && shrunk;
      // Clavier refermé (bouton retour du téléphone) : on quitte aussi le champ, l'interface revient
      if (open && !now && shrunk === false && typing(document.activeElement)) document.activeElement.blur();
      open = now;
      document.body.classList.toggle('kb-open', now);
    };
    addEventListener('focusin', () => setTimeout(update, 300)); // le clavier met un instant à s'ouvrir
    // focusout précède le focusin suivant : on attend la fin du changement de champ
    addEventListener('focusout', () => setTimeout(update, 60));
    vv?.addEventListener('resize', update);
    addEventListener('orientationchange', () => setTimeout(() => { full = vv ? vv.height : 0; update(); }, 400));
  }

  /** Ferme le clavier (quitte le champ actif). */
  const closeKeyboard = () => document.activeElement?.blur?.();

  /**
   * Les navigateurs mobiles zooment la page sur les petits champs (cases du jeu), ce qui
   * décale toute l'interface. Sur écran tactile, on fixe l'échelle : la grille a son
   * propre zoom à deux doigts (MF.pinchZoom).
   */
  function preventFocusZoom() {
    const meta = document.querySelector('meta[name=viewport]');
    if (matchMedia('(pointer: coarse)').matches && meta && !/maximum-scale/.test(meta.content)) meta.content += ', maximum-scale=1';
  }

  /**
   * Menu « Plus » en feuille du bas : reprend les boutons de la barre du haut
   * masqués sur téléphone (mêmes actions, aucune logique dupliquée).
   * @param items [{ id: id du bouton d'origine, icon, label }]
   */
  function menu(items) {
    const noPuzzle = document.body.classList.contains('no-puzzle');
    const available = items.filter(it => {
      const b = document.getElementById(it.id);
      return b && !b.disabled && !(noPuzzle && b.classList.contains('only-puzzle'));
    });
    MF.ui.modal({
      title: t('Plus d\'actions'), icon: 'more', actions: [],
      body: `<div class="phone-menu">${available.map(it => `<button type="button" class="pm-item" data-target="${it.id}">${MF.icons.svg(it.icon)}<span>${it.label}</span></button>`).join('')}</div>`,
    });
    const scrim = [...document.querySelectorAll('.modal-scrim')].pop();
    scrim?.querySelector('.phone-menu')?.addEventListener('click', e => {
      const b = e.target.closest('[data-target]');
      if (!b) return;
      scrim.querySelector('[data-close]').click();
      // Après la fermeture de la feuille (le focus y revient), on déclenche l'action d'origine
      setTimeout(() => document.getElementById(b.dataset.target)?.click(), 140);
    });
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

  return { init, sync, isPhone, menu, closeKeyboard };
})();
