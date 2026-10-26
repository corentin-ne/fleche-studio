/* =========================================================================
   Panneau « Grille » : type de jeu, forme, feuille, taille, remplissage,
   et gestion des données locales (sauvegarde, stockage, effacement).
   ========================================================================= */
window.MF = window.MF || {};
MF.panels = MF.panels || {};

MF.panels.settings = (() => {
  const { esc, plural } = MF.util;
  const { t } = MF.i18n;
  const ic = MF.icons.svg;
  const ui = MF.ui;

  function render(root, { puzzle, state, actions, view }) {
    const o = puzzle.options;
    const game = MF.games.get(puzzle.game);
    const paper = MF.paper.of(o);
    const TABS = [['game', t('Jeu'), 'grid'], ['shape', t('Forme'), 'heart'], ['size', t('Taille'), 'page-portrait'], ['data', t('Données'), 'shield']];
    const tab = TABS.some(([k]) => k === view.settingsTab) ? view.settingsTab : 'game';
    const S = (id, title, icon, html) => (id === tab || (id === 'fill' && tab === 'size') ? `<div class="pgroup">${id === 'fill' ? `<div class="pgroup-title">${esc(title)}</div>` : ''}${html}</div>` : '');
    const builder = game.engine === 'builder';

    root.innerHTML = `<div class="settings-panel">
      <nav class="subtabs" id="settings-tabs">${TABS.map(([k, l, i]) => `<button type="button" data-stab="${k}" class="${k === tab ? 'active' : ''}">${ic(i)}<span>${l}</span></button>`).join('')}</nav>
      ${tab === 'game' ? `<label class="field"><span>${t('Nom de la grille')}</span><input class="input" id="set-name" value="${esc(puzzle.name)}" maxlength="${MF.schema.LIMITS.name}"></label>` : ''}

      ${S('game', t('Type de jeu'), 'grid', `<div class="game-grid">${Object.entries(MF.games.GAMES).map(([id, g]) => `
        <button type="button" class="game-card ${puzzle.game === id ? 'active' : ''}" data-game="${id}">${ic(g.icon)}<b>${esc(g.label)}</b><small>${esc(g.desc)}</small></button>`).join('')}</div>
        <div class="field"><span>${t('Langue des mots')}</span>${ui.segmented('lang', MF.lexicon.ids.map(l => [l, MF.lexicon.LANGS[l].label]), o.lang, 'data-opt')}
          <span class="field-hint">${t('Mots ajoutés, définitions proposées et recherches en ligne dans cette langue.')}</span></div>
        ${puzzle.game === 'codes' ? ui.slider('opt.givens', t('Lettres données au départ'), o.givens, 0, 8, 1) : ''}
        ${puzzle.game === 'meles' ? `<div class="field"><span>${t('Sens des mots cachés')}</span>${ui.segmented('directions', [['easy', t('Facile →↓')], ['normal', t('Normal + diagonales')], ['hard', t('Expert : tous sens')]], o.directions, 'data-opt')}</div>` : ''}`)}

      ${S('shape', t('Forme de la grille'), 'heart', `${MF.shapePicker.html(o.shape)}
        <p class="field-hint">${t('Les mots ne sont placés qu\'à l\'intérieur de la forme. Une forme (ou une lettre) demande un peu plus de place : la grille s\'agrandit toute seule. Astuce : une lettre ressort mieux sur une grande grille.')}</p>`)}

      ${S('size', t('Taille & feuille'), 'page-portrait', `
        <div class="field"><span>${t('Feuille de référence')}</span>
          <div class="row paper-row">${ui.segmented('paper', [['A4', 'A4'], ['A3', 'A3']], paper.format, 'data-paper')}${ui.segmented('orientation', [['portrait', t('Portrait'), 'page-portrait'], ['landscape', t('Paysage'), 'page-landscape']], paper.orientation, 'data-paper')}</div>
          <span class="field-hint">${t('Donne les proportions de la grille. Format de page final : Design → Page.')}</span></div>
        <div class="field"><span>${t('Taille')}</span>${ui.segmented('size', [['auto', t('Auto : tous mes mots')], ['fixed', t('Fixe')]], o.size, 'data-opt')}</div>
        ${o.size === 'fixed' ? `<div class="size-presets">${MF.paper.presets(o).map(({ cols, rows, label }) => `<button type="button" data-size="${cols}x${rows}" class="${o.cols === cols && o.rows === rows ? 'active' : ''}">${label} · ${cols}×${rows}</button>`).join('')}</div>
          <div class="row">
            <label class="field mini"><span class="field-hint">${t('Colonnes')}</span><input class="input" type="number" min="5" max="50" id="set-cols" value="${o.cols}"></label>
            <span class="muted">×</span>
            <label class="field mini"><span class="field-hint">${t('Lignes')}</span><input class="input" type="number" min="5" max="50" id="set-rows" value="${o.rows}"></label>
          </div>` : ''}
        <div class="field"><span>${t('Nombre de grilles')}</span>${ui.segmented('pages', [[1, t('1 grille')], [2, t('2 grilles (moitié-moitié)')]], o.pages, 'data-opt')}</div>
        <div class="field"><span>${t('Bande libre en haut')} <span class="field-hint">${t('photos, titre…')}</span></span>${ui.segmented('photoBand', [[0, t('Aucune')], [3, '3'], [4, '4'], [6, '6'], [8, '8'], [10, t('10 lignes')]], o.photoBand, 'data-opt')}</div>
        <label class="check"><input type="checkbox" id="set-marks" ${state.ui.photoMarks ? 'checked' : ''}> ${t('Montrer les repères des zones libres (écran seulement)')}</label>`)}

      ${builder ? S('fill', t('Remplissage'), 'sparkle', `
        <div class="field"><span>${t('Mots ajoutés')}</span>${ui.segmented('fillers', [[true, t('Mes mots + mots courants')], [false, t('Mes mots uniquement')]], o.fillers, 'data-opt')}
          <span class="field-hint">${t('Des mots courants (tous définis) comblent les trous autour des tiens.')}</span></div>
        ${o.fillers ? `<div class="field"><span>${t('Densité')}</span>${ui.segmented('density', [['airy', t('Aérée')], ['normal', t('Normale')], ['dense', t('Dense')]], o.density, 'data-opt')}</div>` : ''}
        <div class="field"><span>${t('Effort de recherche')}</span>${ui.segmented('effort', [['fast', t('Rapide')], ['normal', t('Normal')], ['deep', t('Approfondi')]], o.effort, 'data-opt')}
          <span class="field-hint">${t('Plus d\'effort = plus de dispositions essayées, donc plus de tes mots placés.')}</span></div>`) : ''}

      ${S('data', t('Mes données & confidentialité'), 'shield', `
        <div class="privacy">${ic('lock')}<p><b>${t('Aucun compte, aucun serveur.')}</b> ${t('Tes grilles et images restent dans ce navigateur (stockage local). Seules les recherches de mots/définitions interrogent le Wiktionnaire et Wikipédia, sans cookie ni donnée personnelle.')}</p></div>
        <div class="storage-meter" id="storage-meter"><span class="muted small">${t('Calcul de l\'espace utilisé…')}</span></div>
        <div class="row wrap-gap">
          <button type="button" class="btn btn-sm" id="set-backup">${ic('download')}${t('Sauvegarder tout')}</button>
          <button type="button" class="btn btn-sm" id="set-restore">${ic('upload')}${t('Restaurer')}</button>
          <button type="button" class="btn btn-sm" id="set-persist">${ic('shield')}${t('Protéger le stockage')}</button>
        </div>
        <div class="versions" id="versions">
          <div class="pgroup-title">${ic('clock')}${t('Versions automatiques')}</div>
          <p class="field-hint">${t('Toutes tes grilles sont copiées dans ce navigateur toutes les 10 minutes quand elles changent. En cas d\'erreur, reviens à une version précédente.')}</p>
          <div class="version-list" id="version-list"><span class="muted small">${t('Chargement…')}</span></div>
        </div>
        <button type="button" class="btn btn-sm btn-ghost btn-danger" id="set-wipe">${ic('trash')}${t('Effacer toutes mes données de ce navigateur')}</button>`)}

      ${tab === 'game' ? `<div class="row danger-row">
        <button class="btn" id="set-dup">${ic('copy')}${t('Dupliquer')}</button>
        <button class="btn btn-danger" id="set-del">${ic('trash')}${t('Supprimer la grille')}</button>
      </div>` : ''}
    </div>`;

    bind(root, puzzle, actions, view);
    MF.shapePicker.bind(root);
    storage(root.querySelector('#storage-meter'), state);
    versions(root.querySelector('#version-list'));
  }

  /** Liste des versions automatiques, chacune restaurable. */
  async function versions(el) {
    if (!el) return;
    const list = await MF.versions.list();
    if (!el.isConnected) return;
    const date = new Intl.DateTimeFormat(MF.i18n.locale, { weekday: 'short', day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' });
    el.innerHTML = list.length
      ? list.map(v => `<div class="version-row">
          <div><b>${esc(date.format(v.at))}</b><small class="muted">${plural(v.count, 'grille')} · ${esc(v.names.join(', '))}${v.count > v.names.length ? '…' : ''}</small></div>
          <button type="button" class="btn btn-sm" data-version="${esc(v.id)}">${ic('refresh')}${t('Restaurer')}</button></div>`).join('')
      : `<p class="muted small">${t('Aucune version pour l\'instant : la première sera créée dans quelques minutes.')}</p>`;
  }

  async function restoreVersion(id, actions) {
    const ok = await MF.ui.confirm(t('Revenir à cette version ?'), t('Toutes tes grilles seront remplacées par celles de cette version. L\'état actuel est d\'abord copié dans les versions, et Ctrl+Z annule le retour.'), t('Restaurer'), 'primary');
    if (!ok) return;
    const data = await MF.versions.get(id);
    if (!data) { MF.ui.toast(t('Version illisible.'), 'err'); return; }
    await MF.versions.save(MF.store.get());
    MF.store.replacePuzzles(data.puzzles, data.activeId);
    MF.ui.toast(t('Version restaurée.'), 'ok', 5000, { label: t('Annuler|undo'), run: () => MF.store.undo() });
    actions.refreshSide();
  }

  async function storage(el, state) {
    if (!el) return;
    const est = await navigator.storage?.estimate?.().catch(() => null);
    const persisted = await navigator.storage?.persisted?.().catch(() => false);
    const assets = await MF.assets.list();
    const imgBytes = assets.reduce((s, a) => s + a.size, 0);
    const kb = n => (n > 1048576 ? t('{n} Mo', { n: MF.i18n.num(+(n / 1048576).toFixed(1)) }) : t('{n} Ko', { n: MF.i18n.num(Math.max(1, Math.round(n / 1024))) }));
    if (!el.isConnected) return;
    el.innerHTML = `<div class="small"><b>${plural(state.puzzles.length, 'grille')}</b> · ${t('{size} de données', { size: kb(MF.store.bytes()) })} · ${plural(assets.length, 'image')} (${kb(imgBytes)})
      ${est?.quota ? `<div class="progress"><i style="width:${Math.max(1, Math.min(100, (est.usage / est.quota) * 100))}%"></i></div><span class="muted">${t('{used} utilisés sur {total} disponibles', { used: kb(est.usage), total: kb(est.quota) })}</span>` : ''}
      <div class="${persisted ? 'ok-text' : 'muted'}">${persisted ? t('✓ Stockage protégé : le navigateur ne l\'effacera pas pour faire de la place.') : t('Conseil : « Protéger le stockage » évite que le navigateur efface tes grilles s\'il manque de place.')}</div></div>`;
  }

  function bind(root, puzzle, actions, view) {
    const on = (sel, ev, fn) => root.querySelector(sel)?.addEventListener(ev, fn);
    on('#set-name', 'change', e => actions.setPuzzle({ name: e.target.value.trim() || puzzle.name }));
    root.addEventListener('click', e => {
      const btn = e.target.closest('button');
      if (!btn) return;
      if (btn.dataset.stab) { view.settingsTab = btn.dataset.stab; actions.refreshSide(); }
      else if (btn.dataset.game) actions.setGame(btn.dataset.game);
      else if (btn.dataset.shapeId) actions.setOption('shape', btn.dataset.shapeId);
      else if (btn.dataset.size) { const [cols, rows] = btn.dataset.size.split('x').map(Number); actions.setOptions({ cols, rows }); }
      else if (btn.id === 'set-backup') actions.backup();
      else if (btn.id === 'set-restore') actions.restore();
      else if (btn.id === 'set-wipe') actions.wipeAll();
      else if (btn.dataset.version) restoreVersion(btn.dataset.version, actions);
      else if (btn.id === 'set-dup') actions.duplicatePuzzle();
      else if (btn.id === 'set-del') actions.deletePuzzle();
      else if (btn.id === 'set-persist') {
        navigator.storage?.persist?.().catch(() => false).then(ok => {
          MF.ui.toast(ok ? t('Stockage protégé ✓') : t('Le navigateur a refusé (il l\'accorde souvent après quelques visites, ou si le site est installé).'), ok ? 'ok' : 'warn', 5000);
          actions.refreshSide();
        });
      } else {
        const opt = btn.closest('[data-opt]');
        if (opt) actions.setOption(opt.dataset.opt, MF.util.parseValue(btn.dataset.v));
        const pap = btn.closest('[data-paper]');
        if (pap) actions.setPaper({ [pap.dataset.paper]: btn.dataset.v });
      }
    });
    root.querySelectorAll('[data-slider]').forEach(inp => {
      const out = inp.closest('.slider-field').querySelector('output');
      inp.addEventListener('input', () => { out.textContent = `${inp.value}${out.dataset.unit}`; });
      inp.addEventListener('change', () => actions.setOption(inp.dataset.slider.replace('opt.', ''), +inp.value));
    });
    const num = (id, k) => on(id, 'change', e => actions.setOption(k, Math.min(50, Math.max(5, parseInt(e.target.value, 10) || 5))));
    num('#set-cols', 'cols');
    num('#set-rows', 'rows');
    on('#set-marks', 'change', e => actions.setUi({ photoMarks: e.target.checked }));
  }

  return render;
})();
