/* =========================================================================
   Panneau « Grille » : type de jeu, forme, feuille, taille, remplissage,
   et gestion des données locales (sauvegarde, stockage, effacement).
   ========================================================================= */
window.MF = window.MF || {};
MF.panels = MF.panels || {};

MF.panels.settings = (() => {
  const { esc, plural } = MF.util;
  const ic = MF.icons.svg;
  const ui = MF.ui;

  function render(root, { puzzle, state, actions, view }) {
    const o = puzzle.options;
    const game = MF.games.get(puzzle.game);
    const paper = MF.paper.of(o);
    const TABS = [['game', 'Jeu', 'grid'], ['shape', 'Forme', 'heart'], ['size', 'Taille', 'page-portrait'], ['data', 'Données', 'shield']];
    const tab = TABS.some(([k]) => k === view.settingsTab) ? view.settingsTab : 'game';
    const S = (id, title, icon, html) => (id === tab || (id === 'fill' && tab === 'size') ? `<div class="pgroup">${id === 'fill' ? `<div class="pgroup-title">${esc(title)}</div>` : ''}${html}</div>` : '');
    const builder = game.engine === 'builder';

    root.innerHTML = `<div class="settings-panel">
      <nav class="subtabs" id="settings-tabs">${TABS.map(([k, l, i]) => `<button type="button" data-stab="${k}" class="${k === tab ? 'active' : ''}">${ic(i)}<span>${l}</span></button>`).join('')}</nav>
      ${tab === 'game' ? `<label class="field"><span>Nom de la grille</span><input class="input" id="set-name" value="${esc(puzzle.name)}" maxlength="${MF.schema.LIMITS.name}"></label>` : ''}

      ${S('game', 'Type de jeu', 'grid', `<div class="game-grid">${Object.entries(MF.games.GAMES).map(([id, g]) => `
        <button type="button" class="game-card ${puzzle.game === id ? 'active' : ''}" data-game="${id}">${ic(g.icon)}<b>${esc(g.label)}</b><small>${esc(g.desc)}</small></button>`).join('')}</div>
        ${puzzle.game === 'codes' ? ui.slider('opt.givens', 'Lettres données au départ', o.givens, 0, 8, 1) : ''}
        ${puzzle.game === 'meles' ? `<div class="field"><span>Sens des mots cachés</span>${ui.segmented('directions', [['easy', 'Facile →↓'], ['normal', 'Normal + diagonales'], ['hard', 'Expert : tous sens']], o.directions, 'data-opt')}</div>` : ''}`)}

      ${S('shape', 'Forme de la grille', 'heart', `<div class="shape-grid">${MF.shapes.ids.map(id => `<button type="button" class="shape-btn ${o.shape === id ? 'active' : ''}" data-shape-id="${id}" title="${esc(MF.shapes.SHAPES[id].label)}">${MF.shapes.preview(id)}<span>${esc(MF.shapes.SHAPES[id].label)}</span></button>`).join('')}</div>
        <p class="field-hint">Les mots ne sont placés qu'à l'intérieur de la forme. Une forme demande un peu plus de place : la grille s'agrandit toute seule.</p>`)}

      ${S('size', 'Taille & feuille', 'page-portrait', `
        <div class="field"><span>Feuille de référence</span>
          <div class="row paper-row">${ui.segmented('paper', [['A4', 'A4'], ['A3', 'A3']], paper.format, 'data-paper')}${ui.segmented('orientation', [['portrait', 'Portrait', 'page-portrait'], ['landscape', 'Paysage', 'page-landscape']], paper.orientation, 'data-paper')}</div>
          <span class="field-hint">Donne les proportions de la grille. Format de page final : Design → Page.</span></div>
        <div class="field"><span>Taille</span>${ui.segmented('size', [['auto', 'Auto : tous mes mots'], ['fixed', 'Fixe']], o.size, 'data-opt')}</div>
        ${o.size === 'fixed' ? `<div class="size-presets">${MF.paper.presets(o).map(({ cols, rows, label }) => `<button type="button" data-size="${cols}x${rows}" class="${o.cols === cols && o.rows === rows ? 'active' : ''}">${label} · ${cols}×${rows}</button>`).join('')}</div>
          <div class="row">
            <label class="field mini"><span class="field-hint">Colonnes</span><input class="input" type="number" min="5" max="50" id="set-cols" value="${o.cols}"></label>
            <span class="muted">×</span>
            <label class="field mini"><span class="field-hint">Lignes</span><input class="input" type="number" min="5" max="50" id="set-rows" value="${o.rows}"></label>
          </div>` : ''}
        <div class="field"><span>Nombre de grilles</span>${ui.segmented('pages', [[1, '1 grille'], [2, '2 grilles (moitié-moitié)']], o.pages, 'data-opt')}</div>
        <div class="field"><span>Bande libre en haut <span class="field-hint">photos, titre…</span></span>${ui.segmented('photoBand', [[0, 'Aucune'], [3, '3'], [4, '4'], [6, '6'], [8, '8'], [10, '10 lignes']], o.photoBand, 'data-opt')}</div>
        <label class="check"><input type="checkbox" id="set-marks" ${state.ui.photoMarks ? 'checked' : ''}> Montrer les repères des zones libres (écran seulement)</label>`)}

      ${builder ? S('fill', 'Remplissage', 'sparkle', `
        <div class="field"><span>Mots ajoutés</span>${ui.segmented('fillers', [[true, 'Mes mots + mots courants'], [false, 'Mes mots uniquement']], o.fillers, 'data-opt')}
          <span class="field-hint">Des mots courants (tous définis) comblent les trous autour des tiens.</span></div>
        ${o.fillers ? `<div class="field"><span>Densité</span>${ui.segmented('density', [['airy', 'Aérée'], ['normal', 'Normale'], ['dense', 'Dense']], o.density, 'data-opt')}</div>` : ''}
        <div class="field"><span>Effort de recherche</span>${ui.segmented('effort', [['fast', 'Rapide'], ['normal', 'Normal'], ['deep', 'Approfondi']], o.effort, 'data-opt')}
          <span class="field-hint">Plus d'effort = plus de dispositions essayées, donc plus de tes mots placés.</span></div>`) : ''}

      ${S('data', 'Mes données & confidentialité', 'shield', `
        <div class="privacy">${ic('lock')}<p><b>Aucun compte, aucun serveur.</b> Tes grilles et images restent dans ce navigateur (stockage local). Seules les recherches de mots/définitions interrogent le Wiktionnaire et Wikipédia, sans cookie ni donnée personnelle.</p></div>
        <div class="storage-meter" id="storage-meter"><span class="muted small">Calcul de l'espace utilisé…</span></div>
        <div class="row wrap-gap">
          <button type="button" class="btn btn-sm" id="set-backup">${ic('download')}Sauvegarder tout</button>
          <button type="button" class="btn btn-sm" id="set-restore">${ic('upload')}Restaurer</button>
          <button type="button" class="btn btn-sm" id="set-persist">${ic('shield')}Protéger le stockage</button>
        </div>
        <button type="button" class="btn btn-sm btn-ghost btn-danger" id="set-wipe">${ic('trash')}Effacer toutes mes données de ce navigateur</button>`)}

      ${tab === 'game' ? `<div class="row danger-row">
        <button class="btn" id="set-dup">${ic('copy')}Dupliquer</button>
        <button class="btn btn-danger" id="set-del">${ic('trash')}Supprimer la grille</button>
      </div>` : ''}
    </div>`;

    bind(root, puzzle, actions, view);
    storage(root.querySelector('#storage-meter'), state);
  }

  async function storage(el, state) {
    if (!el) return;
    const est = await navigator.storage?.estimate?.().catch(() => null);
    const persisted = await navigator.storage?.persisted?.().catch(() => false);
    const assets = await MF.assets.list();
    const imgBytes = assets.reduce((s, a) => s + a.size, 0);
    const kb = n => (n > 1048576 ? `${(n / 1048576).toFixed(1)} Mo` : `${Math.max(1, Math.round(n / 1024))} Ko`);
    if (!el.isConnected) return;
    el.innerHTML = `<div class="small"><b>${plural(state.puzzles.length, 'grille')}</b> · ${kb(MF.store.bytes())} de données · ${plural(assets.length, 'image')} (${kb(imgBytes)})
      ${est?.quota ? `<div class="progress"><i style="width:${Math.max(1, Math.min(100, (est.usage / est.quota) * 100))}%"></i></div><span class="muted">${kb(est.usage)} utilisés sur ${kb(est.quota)} disponibles</span>` : ''}
      <div class="${persisted ? 'ok-text' : 'muted'}">${persisted ? '✓ Stockage protégé : le navigateur ne l\'effacera pas pour faire de la place.' : 'Conseil : « Protéger le stockage » évite que le navigateur efface tes grilles s\'il manque de place.'}</div></div>`;
  }

  const parse = v => (v === 'true' ? true : v === 'false' ? false : /^-?\d+(\.\d+)?$/.test(v) ? +v : v);

  function bind(root, puzzle, actions, view) {
    const on = (sel, ev, fn) => root.querySelector(sel)?.addEventListener(ev, fn);
    on('#set-name', 'change', e => actions.setPuzzle({ name: e.target.value.trim() || puzzle.name }));
    root.addEventListener('click', e => {
      const t = e.target.closest('button');
      if (!t) return;
      if (t.dataset.stab) { view.settingsTab = t.dataset.stab; actions.refreshSide(); }
      else if (t.dataset.game) actions.setGame(t.dataset.game);
      else if (t.dataset.shapeId) actions.setOption('shape', t.dataset.shapeId);
      else if (t.dataset.size) { const [cols, rows] = t.dataset.size.split('x').map(Number); actions.setOptions({ cols, rows }); }
      else if (t.id === 'set-backup') actions.backup();
      else if (t.id === 'set-restore') actions.restore();
      else if (t.id === 'set-wipe') actions.wipeAll();
      else if (t.id === 'set-dup') actions.duplicatePuzzle();
      else if (t.id === 'set-del') actions.deletePuzzle();
      else if (t.id === 'set-persist') {
        navigator.storage?.persist?.().catch(() => false).then(ok => {
          MF.ui.toast(ok ? 'Stockage protégé ✓' : 'Le navigateur a refusé (il l\'accorde souvent après quelques visites, ou si le site est installé).', ok ? 'ok' : 'warn', 5000);
          actions.refreshSide();
        });
      } else {
        const opt = t.closest('[data-opt]');
        if (opt) actions.setOption(opt.dataset.opt, parse(t.dataset.v));
        const pap = t.closest('[data-paper]');
        if (pap) actions.setPaper({ [pap.dataset.paper]: t.dataset.v });
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
