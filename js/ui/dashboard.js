// @ts-check
/* =========================================================================
   Tableau de bord « Mes grilles » (clic sur le logo) : toutes les grilles en
   vignettes réelles, recherche, tri, statistiques, création rapide.
   ========================================================================= */
window.MF = window.MF || {};

MF.dashboard = (() => {
  const { esc, plural, normalize } = MF.util;
  const { t } = MF.i18n;
  const ic = MF.icons.svg;
  const thumbs = new Map(); // id -> { key, svg }

  /** Vignette réelle d'une grille (mise en cache tant qu'elle ne change pas). */
  function thumb(pz) {
    const key = `${pz.updatedAt}|${pz.layout?.at}|${pz.game}`;
    const hit = thumbs.get(pz.id);
    if (hit?.key === key) return hit.svg;
    let svg = '';
    const engine = MF.games.get(pz.game).engine;
    const page = pz.layout?.engine === engine ? pz.layout.pages[0] : null;
    if (page) {
      try {
        const model = MF.gridModel.from(page, pz, MF.design.metrics(pz.design), pz.layout);
        svg = MF.renderers.svg(MF.scene.compose(model, pz, { letters: false, forExport: true, assetUrl: MF.assets.url }), { cls: 'dash-svg' });
      } catch { svg = ''; }
    }
    thumbs.set(pz.id, { key, svg });
    return svg;
  }

  /** « il y a 3 h », « hier », « 12 oct. » */
  function ago(time) {
    const s = (Date.now() - time) / 1000;
    if (s < 60) return t('à l\'instant');
    if (s < 3600) return t('il y a {n} min', { n: Math.floor(s / 60) });
    if (s < 86400) return t('il y a {n} h', { n: Math.floor(s / 3600) });
    if (s < 172800) return t('hier');
    return new Date(time).toLocaleDateString(MF.i18n.locale, { day: 'numeric', month: 'short' });
  }

  const SORTS = {
    recent: (a, b) => b.updatedAt - a.updatedAt,
    name: (a, b) => MF.i18n.compare(a.name, b.name),
    words: (a, b) => b.words.length - a.words.length,
  };

  /**
   * @param {any} o  options : { puzzles, activeId, view, backup: { at, due }, onOpen(id), onNew(), onQuick(game), onDuplicate(id), onDelete(id), onImport(), onBackup() }
   */
  function render(root, o) {
    const v = o.view;
    v.dashSort = SORTS[v.dashSort] ? v.dashSort : 'recent';
    const q = normalize(v.dashQuery || '');
    const list = o.puzzles.filter(p => !q || normalize(`${p.name} ${MF.games.get(p.game).label}`).includes(q)).sort(SORTS[v.dashSort]);
    const words = o.puzzles.reduce((n, p) => n + p.words.length, 0);
    const byGame = Object.keys(MF.games.GAMES).map(g => [g, o.puzzles.filter(p => p.game === g).length]).filter(([, n]) => n);

    root.innerHTML = `<div class="dash">
      <header class="dash-head">
        <div class="dash-title"><span class="dash-logo">${MF.brand.svg(o.accent)}</span>
          <div><h1>${t('Mes grilles')}</h1><p class="muted small">${plural(o.puzzles.length, 'grille')} · ${plural(words, 'mot')}${byGame.length ? ` · ${byGame.map(([g, n]) => `${n} ${MF.games.get(g).short.toLowerCase()}`).join(', ')}` : ''}</p></div></div>
        <div class="dash-actions">
          <input class="input input-search" id="dash-q" placeholder="${esc(t('Rechercher une grille…'))}" value="${esc(v.dashQuery || '')}">
          <select class="select select-sm" id="dash-sort" aria-label="${esc(t('Trier'))}">${[['recent', t('Récentes')], ['name', t('Nom')], ['words', t('Nombre de mots')]].map(([k, l]) => `<option value="${k}" ${v.dashSort === k ? 'selected' : ''}>${esc(l)}</option>`).join('')}</select>
          <button class="btn" id="dash-import" title="${esc(t('Ouvrir une sauvegarde ou une liste de mots'))}">${ic('folder')}${t('Ouvrir')}</button>
          <button class="btn" id="dash-backup" title="${esc(t('Sauvegarder toutes mes grilles'))}">${ic('download')}${t('Sauvegarder')}</button>
          <button class="btn btn-primary" id="dash-new">${ic('plus')}${t('Nouvelle grille')}</button>
        </div>
      </header>

      ${o.backup?.due ? `<div class="dash-backup" role="status">${ic('alert')}<span><b>${o.backup.at ? t('Dernière sauvegarde : {when}', { when: ago(o.backup.at) }) : t('Aucune sauvegarde pour l\'instant')}</b> ${t('Si le navigateur efface ses données, tes grilles seront perdues. Garde une copie sur ton appareil.')}</span><button class="btn btn-sm btn-primary" id="dash-backup-now">${ic('download')}${t('Sauvegarder')}</button></div>` : ''}

      <div class="dash-quick">${Object.entries(MF.games.GAMES).map(([id, g]) => `<button class="quick-chip" data-quick="${id}">${ic(g.icon)}<span><b>${esc(g.short)}</b><small>${t('Créer')}</small></span></button>`).join('')}</div>

      <div class="dash-grid">
        <button class="dash-card dash-new" id="dash-new-card">${ic('plus', 'ic-lg')}<b>${t('Nouvelle grille')}</b><span class="muted small">${t('Fléchés, croisés, mêlés ou codés')}</span></button>
        ${list.map(p => {
          const g = MF.games.get(p.game);
          const svg = thumb(p);
          return `<article class="dash-card ${p.id === o.activeId ? 'is-active' : ''}" data-id="${p.id}" style="--c:${p.design.accent}" tabindex="0" aria-label="${esc(t('Ouvrir {name}', { name: p.name }))}">
            <div class="dash-thumb">${svg || `<div class="dash-empty">${ic('grid', 'ic-lg')}<span>${p.words.length ? t('Pas encore calculée') : t('Aucun mot')}</span></div>`}</div>
            <div class="dash-info">
              <div class="dash-name"><i class="dot"></i><b>${esc(p.name)}</b></div>
              <div class="dash-meta">${ic(g.icon, 'ic-xs')}${esc(g.short)}${p.options.shape !== 'rect' ? ` · ${esc(MF.shapes.SHAPES[p.options.shape].label)}` : ''} · ${plural(p.words.length, 'mot')} · ${ago(p.updatedAt)}</div>
            </div>
            <div class="dash-tools">
              <button class="btn btn-sm btn-icon btn-ghost" data-act="dup" title="${esc(t('Dupliquer'))}" aria-label="${esc(t('Dupliquer'))}">${ic('copy')}</button>
              <button class="btn btn-sm btn-icon btn-ghost btn-danger" data-act="del" title="${esc(t('Supprimer'))}" aria-label="${esc(t('Supprimer'))}">${ic('trash')}</button>
            </div>
          </article>`;
        }).join('')}
      </div>
      ${q && !list.length ? `<p class="empty small">${t('Aucune grille ne correspond.')}</p>` : ''}
      <footer class="dash-foot muted small">${ic('lock', 'ic-inline')} ${t('Tout est enregistré dans ce navigateur, rien sur un serveur. Pense à sauvegarder de temps en temps.')}</footer>
    </div>`;

    root.querySelector('#dash-new').onclick = o.onNew;
    root.querySelector('#dash-new-card').onclick = o.onNew;
    root.querySelector('#dash-import').onclick = o.onImport;
    root.querySelector('#dash-backup').onclick = o.onBackup;
    root.querySelector('#dash-backup-now')?.addEventListener('click', o.onBackup);
    root.querySelectorAll('[data-quick]').forEach(b => (b.onclick = () => o.onQuick(b.dataset.quick)));
    const qi = root.querySelector('#dash-q');
    qi.addEventListener('input', MF.util.debounce(() => {
      v.dashQuery = qi.value;
      render(root, o);
      const again = root.querySelector('#dash-q');
      again.focus();
      again.setSelectionRange(again.value.length, again.value.length);
    }, 150));
    root.querySelector('#dash-sort').addEventListener('change', e => { v.dashSort = e.target.value; render(root, o); });
    const grid = root.querySelector('.dash-grid');
    grid.addEventListener('click', e => {
      const card = e.target.closest('.dash-card[data-id]');
      if (!card) return;
      const act = e.target.closest('[data-act]')?.dataset.act;
      if (act === 'dup') o.onDuplicate(card.dataset.id);
      else if (act === 'del') o.onDelete(card.dataset.id);
      else o.onOpen(card.dataset.id);
    });
    grid.addEventListener('keydown', e => {
      const card = e.target.closest('.dash-card[data-id]');
      if (card && e.target === card && e.key === 'Enter') o.onOpen(card.dataset.id);
      if (card && e.target === card && e.key === 'Delete') o.onDelete(card.dataset.id);
    });
  }

  return { render };
})();
