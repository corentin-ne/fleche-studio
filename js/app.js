/* =========================================================================
   Orchestration : état -> calcul de grille -> rendu, événements globaux.
   Une grille prend quelques secondes à calculer et change entièrement à chaque
   calcul : on recalcule automatiquement quand la forme ou la taille change, ou
   s'il n'existe encore aucune grille ; sinon à la demande (bandeau « Recalculer »).
   ========================================================================= */
(() => {
  const { $, $$, esc, plural, hexToRgb } = MF.util;
  const store = MF.store;
  const ic = MF.icons.svg;

  const view = { filter: '', sort: 'added', draft: {}, page: 0, selected: null, sections: {}, emojiCat: null, sideLocked: false, entries: {}, entriesFor: null, playStart: 0 };
  const jobs = new Map();
  let derivedCache = { key: null, value: null };
  let lastView = null;
  const assetsTried = new Set();
  const fontsReady = new Set();

  const engineOf = pz => MF.games.get(pz.game).engine;
  const hashOf = pz => (engineOf(pz) === 'meles' ? MF.wordsearch : MF.builder).layoutHash(pz);
  const prepared = pz => (engineOf(pz) === 'meles' ? MF.wordsearch : MF.builder).prepare(pz.words);
  /** La grille enregistrée correspond-elle au jeu choisi ? */
  const compatible = pz => !!pz.layout && pz.layout.engine === engineOf(pz);
  const isFresh = pz => compatible(pz) && pz.layout.hash === hashOf(pz);

  /* ---------------- Calcul dérivé (modèle de dessin, diagnostic) ---------------- */
  function derive(pz) {
    const d = pz.design;
    const key = `${pz.id}|${pz.layout?.at}|${view.page}|${pz.game}|${MF.util.hash(JSON.stringify([pz.words, pz.fillerClues, pz.options.givens, d.font, d.cell, pz.game]))}`;
    if (derivedCache.key === key) return derivedCache.value;
    const pages = compatible(pz) ? pz.layout.pages : [];
    const page = Math.min(view.page, Math.max(0, pages.length - 1));
    const layout = pages[page] || null;
    const pageOf = new Map();
    pages.forEach((pg, i) => pg.words.forEach(w => { if (w.wid && (pg.engine === 'meles' || w.src === 'theme')) pageOf.set(w.wid, i); }));
    const value = {
      layout, pages, page, pageOf,
      model: MF.gridModel.from(layout, pz, MF.design.metrics(d), pz.layout),
      issues: MF.diagnostics.analyze(pz),
      fillers: MF.diagnostics.fillers(pz, layout),
    };
    derivedCache = { key, value };
    return value;
  }

  /* ---------------- Calcul de la grille ---------------- */
  async function regenerate(pzId) {
    const pz = store.puzzle(pzId);
    if (!pz) return;
    if (!prepared(pz).length) { MF.ui.toast('Ajoute au moins un mot (2 lettres minimum).', 'warn'); renderGrid(); return; }
    jobs.get(pzId)?.cancel();
    const job = { cancelled: false, run: null, cancel() { this.cancelled = true; this.run?.cancel(); } };
    jobs.set(pzId, job);
    setBusy(true, 0);
    renderGrid();

    const engine = engineOf(pz);
    const hash = hashOf(pz);
    const nPages = pz.options.pages === 2 ? 2 : 1;
    const groups = MF.builder.split(pz.words, nPages).filter(g => g.length);
    const pages = [];
    const exclude = new Set();
    let error = null;
    // Calcul en arrière-plan (Web Worker) : l'interface reste utilisable pendant la recherche
    for (const [i, group] of groups.entries()) {
      job.run = MF.generator.run(
        { engine, words: group, options: pz.options, seed: MF.util.randomSeed(), exclude: [...exclude], banned: pz.banned },
        p => { if (!job.cancelled && store.get().activeId === pzId) setBusy(true, (i + p) / groups.length); },
      );
      const out = await job.run.promise;
      if (job.cancelled || out.cancelled) return;
      if (out.error || !out.result) { error = out.error; break; }
      out.result.words.forEach(w => exclude.add(w.word));
      pages.push(out.result);
    }
    jobs.delete(pzId);
    setBusy(false);
    if (!pages.length || pages.length !== groups.length) {
      MF.ui.toast(error ? `Le calcul a échoué : ${error}` : 'Aucune grille trouvée : essaie une grille plus grande ou une autre forme.', 'err', 5000);
      renderAll();
      return;
    }

    view.page = 0;
    store.update(s => {
      const p = s.puzzles.find(x => x.id === pzId);
      if (p) p.layout = MF.schema.layout({ engine, pages, hash, at: Date.now() });
    }, 'layout');

    const total = prepared(pz).length;
    const placed = pages.reduce((n, pg) => n + pg.words.filter(w => w.wid && (engine === 'meles' || w.src === 'theme')).length, 0);
    MF.ui.toast(`${pages.length > 1 ? '2 grilles prêtes' : 'Grille prête'} : ${placed} / ${total} de tes mots placés`, placed === total ? 'ok' : 'warn', 4000);
  }

  function setBusy(on, p = 0) {
    $('#gen-bar').hidden = !on;
    $('#gen-progress').style.width = `${Math.round(p * 100)}%`;
  }

  /** Arrête le calcul en cours de la grille affichée. */
  function cancelGeneration() {
    const pz = store.active();
    const job = pz && jobs.get(pz.id);
    if (!job) return;
    job.cancel();
    jobs.delete(pz.id);
    setBusy(false);
    renderAll();
    MF.ui.toast('Calcul arrêté.', 'info');
  }

  /** Recalcul automatique (changement de forme, de taille, de jeu…), groupé. */
  const autoRegen = MF.util.debounce(() => {
    const pz = store.active();
    if (pz && !isFresh(pz) && prepared(pz).length && !jobs.has(pz.id)) regenerate(pz.id);
  }, 700);

  /* ---------------- Rendu ---------------- */
  function applyTheme() {
    const s = store.get();
    document.documentElement.dataset.theme = s.theme;
    $('meta[name=theme-color]').content = s.theme === 'light' ? '#eef1f6' : '#07090d';
  }

  function applyAccent(pz) {
    const accent = pz?.design.accent || '#7b3fe4';
    const [r, g, b] = hexToRgb(accent);
    const root = document.documentElement.style;
    root.setProperty('--accent', accent);
    root.setProperty('--accent-rgb', `${r}, ${g}, ${b}`);
    root.setProperty('--on-accent', MF.util.onColor(accent));
    // Le logo (barre du haut, icône d'onglet) prend la couleur de la grille active
    MF.brand.apply(accent);
  }

  function renderTabs() {
    const s = store.get();
    $('#puzzle-tabs').innerHTML = s.puzzles.map(p => `
      <button class="ptab ${p.id === s.activeId ? 'active' : ''}" data-id="${p.id}" style="--c:${p.design.accent}" title="${esc(MF.games.get(p.game).label)}">
        <i class="dot"></i>${esc(p.name)}<small>${p.words.length}</small>
      </button>`).join('') +
      `<button class="ptab add" id="btn-new-puzzle" title="Nouvelle grille (N)" aria-label="Nouvelle grille">${ic('plus')}<span>Nouvelle</span></button>`;
  }

  function renderToolbar() {
    $('#btn-undo').disabled = !store.canUndo();
    $('#btn-redo').disabled = !store.canRedo();
  }

  /** Images et polices nécessaires : chargées à la demande, puis nouveau rendu. */
  function ensureResources(pz) {
    const ids = [pz.design.background.imageId, ...pz.stickers.map(s => s.imageId)].filter(id => id && !assetsTried.has(id));
    if (ids.length) { ids.forEach(id => assetsTried.add(id)); MF.assets.ensure(ids).then(() => renderGrid()); }
    const fonts = MF.design.fontsOf(pz.design).filter(f => !fontsReady.has(f.css));
    if (fonts.length) {
      fonts.forEach(f => fontsReady.add(f.css));
      Promise.all(fonts.flatMap(f => f.weights.map(w => document.fonts.load(`${w} 20px ${f.css}`).catch(() => null))))
        .then(() => { MF.text.invalidate(); MF.previews.clear(); derivedCache.key = null; renderGrid(); });
    }
  }

  function renderGrid() {
    const s = store.get();
    const pz = store.active();
    if (!pz) return;
    ensureResources(pz);
    const d = derive(pz);
    const busy = jobs.has(pz.id);
    const game = MF.games.get(pz.game);
    $('#grid-name').textContent = pz.name;
    $('#grid-game').innerHTML = `${ic(game.icon, 'ic-sm')}${esc(game.label)}${pz.options.shape !== 'rect' ? ` · ${esc(MF.shapes.SHAPES[pz.options.shape].label)}` : ''}`;

    const total = prepared(pz).length;
    const missing = game.clues ? d.fillers.filter(f => !f.clue).length + pz.words.filter(w => !w.clue.trim()).length : 0;
    $('#page-switch').hidden = d.pages.length < 2;
    $('#page-switch').innerHTML = d.pages.map((pg, i) => `<button data-page="${i}" class="${i === d.page ? 'active' : ''}">Grille ${i + 1}</button>`).join('');
    $('#grid-stats').innerHTML = d.layout
      ? `<span class="badge">${d.model.cols} × ${d.model.rows}</span>
         <span class="badge ${d.pageOf.size === total ? 'ok' : 'warn'}"><span class="dot"></span>${d.pageOf.size} / ${total} mots placés</span>
         ${game.clues ? `<span class="badge ${missing ? 'warn' : 'ok'}"><span class="dot"></span>${missing ? `${plural(missing, 'définition')} à écrire` : 'Tout est défini'}</span>` : ''}`
      : '';
    $('#stale-bar').hidden = busy || !compatible(pz) || isFresh(pz);

    $$('#mode-switch button').forEach(btn => btn.classList.toggle('active', btn.dataset.mode === s.ui.mode));
    $('#play-bar').hidden = s.ui.mode !== 'play' || !d.model.cols;
    $('#btn-fit').classList.toggle('active', !!s.ui.fit);
    $('#btn-hint-word').hidden = pz.game === 'meles';
    $('#btn-hint').innerHTML = `${ic('bulb')}${pz.game === 'meles' ? 'Indice' : 'Lettre'}`;

    const entriesFor = `${pz.id}@${pz.layout?.at}#${d.page}`;
    if (view.entriesFor !== entriesFor) { view.entries = loadEntries(entriesFor); view.entriesFor = entriesFor; view.playStart = Date.now(); }
    const box = $('#grid-scroll');
    if (!d.model.cols) {
      lastView = null;
      box.innerHTML = busy
        ? `<div class="empty"><span class="spinner"></span><h3>Construction de la grille…</h3><p>Placement de tes mots, puis remplissage.</p></div>`
        : total
          ? `<div class="empty">${ic('grid')}<h3>Prêt à construire</h3><p>${plural(total, 'mot')} dans ta liste.</p><p><button class="btn btn-primary" data-regen>${ic('sparkle')}Construire la grille</button></p></div>`
          : `<div class="empty start-hint">${ic('edit')}<h3>Commence par ajouter des mots</h3><p>Tape-les dans le panneau « Mots », ou pioche dans la bibliothèque et les thèmes. La grille se construit toute seule.</p></div>`;
      return;
    }
    const fit = (W, H) => Math.max(10, Math.min(160, Math.floor(Math.min((box.clientWidth - 28) / (W / 100), (box.clientHeight - 28) / (H / 100)))));
    const cell = s.ui.fit ? fit : s.ui.cell;
    // Petite animation d'apparition seulement pour une nouvelle grille (pas à chaque réglage)
    const animate = view.shownGrid !== entriesFor;
    view.shownGrid = entriesFor;
    lastView = MF.gridView.render(box, d.model, pz, {
      mode: s.ui.mode, cell, entries: view.entries, photoMarks: !!s.ui.photoMarks, assetUrl: MF.assets.url, animate,
      onEntries: e => { view.entries = e; saveEntries(entriesFor, e); },
      onMissing: key => editMissing(key),
      onComplete: () => celebrate(),
      onFound: (slot, n, tot) => MF.ui.toast(`${slot.label || slot.word} ✓ (${n}/${tot})`, 'ok', 1500),
    });
    $('#zoom').value = lastView?.cellPx || 64;
    view.selected = pz.stickers.some(x => x.id === view.selected) ? view.selected : null;
    MF.stickerEditor.attach(lastView, {
      selected: view.selected,
      onSelect: id => {
        view.selected = id;
        MF.stickerEditor.select(id);
        if (id && s.ui.tab !== 'decor') store.update(st => { st.ui.tab = 'decor'; }, 'ui');
        else renderSide();
      },
      onCommit: (id, patch) => actions.updateSticker(id, patch),
      onAction: (act, id) => actions.stickerAction(act, id),
    });
  }

  /** Rendu groupé à l'image suivante : un curseur qu'on fait glisser ne redessine qu'une fois par image. */
  const scheduleGrid = MF.util.throttleFrame(() => renderGrid());

  function editMissing(key) {
    const pz = store.active();
    const d = derive(pz);
    const slot = d.layout?.words.find(w => MF.gridModel.slotKey(w) === key);
    if (slot?.src === 'theme') {
      store.update(s => { s.ui.tab = 'words'; }, 'ui');
      requestAnimationFrame(() => $(`#side-body .word-item[data-id="${slot.wid}"] [data-act="def"]`)?.click());
    } else {
      store.update(s => { s.ui.tab = 'diag'; }, 'ui');
      requestAnimationFrame(() => $(`#side-body [data-key="${key}"] input`)?.focus());
    }
  }

  function renderSide() {
    const s = store.get();
    const pz = store.active();
    if (!pz) return;
    const d = derive(pz);
    const game = MF.games.get(pz.game);
    $$('#side-tabs button').forEach(b => b.classList.toggle('active', b.dataset.tab === s.ui.tab));
    $('#count-words').textContent = pz.words.length;
    const missing = game.clues ? d.fillers.filter(f => !f.clue).length : 0;
    const errs = d.issues.filter(i => i.level === 'err').length;
    const badge = $('#count-diag');
    badge.textContent = errs || missing || '✓';
    badge.className = `badge ${errs ? 'err' : missing ? 'warn' : 'ok'}`;
    $('#count-decor').textContent = pz.stickers.length || '';
    $('#count-decor').hidden = !pz.stickers.length;

    const body = $('#side-body');
    const scroll = body.scrollTop;
    const ctx = { puzzle: pz, derived: d, actions, state: s, view };
    const panel = { diag: MF.panels.clues, design: MF.panels.design, decor: MF.panels.decor, settings: MF.panels.settings }[s.ui.tab] || MF.panels.words;
    const sameTab = body.dataset.tab === s.ui.tab;
    // Animation d'entrée seulement quand on change d'onglet (pas à chaque réglage)
    body.classList.toggle('enter', !sameTab);
    panel(body, ctx);
    body.dataset.tab = s.ui.tab;
    if (sameTab) body.scrollTop = scroll;
  }

  function renderAll() {
    const pz = store.active();
    const home = !pz || view.home;
    document.body.classList.toggle('no-puzzle', !pz);
    document.body.classList.toggle('show-home', home);
    applyAccent(pz);
    renderTabs();
    renderToolbar();
    if (!pz) {
      MF.welcome.render($('#welcome'), { legacy: store.legacy().length, onNew: () => actions.newPuzzle(), onOpen: () => $('#file-open').click(), onLegacy: actions.recoverLegacy, onQuick: actions.quickStart });
      return;
    }
    if (home) { renderDashboard(); return; }
    renderGrid();
    renderSide();
  }

  /** Tableau de bord « Mes grilles » (clic sur le logo). */
  function renderDashboard() {
    const s = store.get();
    MF.dashboard.render($('#welcome'), {
      puzzles: s.puzzles, activeId: s.activeId, view, accent: store.active()?.design.accent,
      onOpen: id => actions.switchPuzzle(id),
      onNew: () => actions.newPuzzle(),
      onQuick: actions.quickStart,
      onDuplicate: id => actions.duplicatePuzzle(id),
      onDelete: id => actions.deletePuzzle(id),
      onImport: () => $('#file-open').click(),
      onBackup: () => actions.backup(),
    });
  }

  function showHome(on = true) {
    if (!store.active()) return;
    view.home = on;
    view.selected = null;
    renderAll();
    if (on) $('#welcome').scrollTop = 0;
  }

  /* ---------------- Jeu ---------------- */
  const entriesKey = k => `mfm:play:${k}`;
  function loadEntries(k) {
    try { const v = JSON.parse(localStorage.getItem(entriesKey(k)) || '{}'); return MF.schema.isObj(v) ? v : {}; } catch { return {}; }
  }
  const saveEntries = MF.util.debounce((k, e) => {
    try { localStorage.setItem(entriesKey(k), JSON.stringify(e)); } catch { /* ignoré */ }
  }, 300);

  function setMode(mode) {
    view.selected = null;
    if (mode === 'play') view.playStart = Date.now();
    store.update(s => { s.ui.mode = mode; }, 'ui');
  }

  const timer = () => {
    const s = Math.floor((Date.now() - view.playStart) / 1000);
    return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
  };
  setInterval(() => { if (!$('#play-bar').hidden) $('#play-time').textContent = timer(); }, 1000);

  function celebrate() {
    MF.ui.toast(`Bravo, grille terminée en ${timer()} ! 🎉`, 'ok', 6000);
    const layer = MF.util.html('<div class="confetti" aria-hidden="true"></div>');
    const colors = ['#ff4d7d', '#ffd23f', '#3dd68c', '#4d9bff', '#7b3fe4', '#ff8a3d'];
    for (let i = 0; i < 90; i++) {
      const p = document.createElement('i');
      p.style.cssText = `--x:${Math.random() * 100}vw;--dx:${Math.round((Math.random() - 0.5) * 240)}px;--d:${1.6 + Math.random() * 1.8}s;--r:${Math.random() * 720 - 360}deg;--c:${colors[i % colors.length]};--delay:${Math.random() * 0.4}s`;
      layer.appendChild(p);
    }
    document.body.appendChild(layer);
    setTimeout(() => layer.remove(), 4000);
  }

  /* ---------------- Export ---------------- */
  function exportPages(pz) {
    if (!compatible(pz)) return [];
    const m = MF.design.metrics(pz.design);
    return pz.layout.pages.map((pg, i) => ({
      name: pz.layout.pages.length > 1 ? `${pz.name} grille ${i + 1}` : pz.name,
      puzzle: pz,
      model: MF.gridModel.from(pg, pz, m, pz.layout),
    }));
  }
  function openExport() {
    const pz = store.active();
    const d = derive(pz);
    if (!d.model.cols) return MF.ui.toast('Aucune grille à exporter.', 'warn');
    const game = MF.games.get(pz.game);
    const missing = game.clues ? d.fillers.filter(f => !f.clue).length + pz.words.filter(w => !w.clue.trim()).length : 0;
    if (missing) MF.ui.toast(`Attention : ${plural(missing, 'définition')} encore vide${missing > 1 ? 's' : ''}.`, 'warn', 4500);
    const { puzzles } = store.get();
    const mine = exportPages(pz);
    const everyone = puzzles.flatMap(exportPages);
    const scopes = [{ id: 'puzzle', label: `${pz.name} · ${plural(mine.length, 'page')}`, pages: mine, zipName: `${MF.exporter.slug(pz.name)}.zip` }];
    if (puzzles.length > 1) scopes.push({ id: 'all', label: `Toutes mes grilles · ${plural(everyone.length, 'page')}`, pages: everyone, zipName: 'toutes-mes-grilles.zip' });
    const getPage = () => { const p = store.active(); return exportPages(p)[derive(p).page]; };
    MF.exporter.open(getPage, scopes, (patch, live) => actions.setDesign(patch, { live: !!live }));
  }

  /* ---------------- Aide ---------------- */
  function help() {
    const k = (keys, label) => `<div class="kbd-row"><span>${keys.map(x => `<kbd>${x}</kbd>`).join(' ')}</span><span>${label}</span></div>`;
    MF.ui.modal({
      title: 'Aide & raccourcis', icon: 'help',
      body: `<div class="help-grid">
        <div><h4>Pour démarrer</h4><ol class="small help-steps">
          <li><b>Mots</b> : tape tes mots (autocomplétion, correction) ou pioche dans la bibliothèque, les thèmes, un fichier Excel…</li>
          <li><b>Grille</b> : choisis le jeu (fléchés, croisés, mêlés, codés), la forme (cœur, étoile…) et la taille.</li>
          <li><b>Design</b> : un thème en un clic, puis fond, cases, polices, titre…</li>
          <li><b>Décor</b> : emojis, stickers, textes et photos à glisser sur l'affiche.</li>
          <li><b>Exporter</b> : PNG, SVG, PDF, choix du format de page et de la position de la grille.</li></ol></div>
        <div><h4>Raccourcis</h4>
          ${k(['Ctrl', 'Z'], 'Annuler')}${k(['Ctrl', 'Y'], 'Rétablir')}${k(['N'], 'Ajouter un mot')}${k(['M'], 'Mélanger la grille')}${k(['E'], 'Exporter')}${k(['P'], 'Jouer / quitter le jeu')}${k(['1', '…', '5'], 'Onglets du panneau')}
          ${k(['Suppr'], 'Effacer le décor sélectionné')}${k(['←', '↑', '→', '↓'], 'Déplacer le décor (Maj = plus vite)')}${k(['Ctrl', 'molette'], 'Zoom')}${k(['?'], 'Cette aide')}</div>
      </div>
      <div class="privacy small">${ic('lock')}<p><b>Confidentialité :</b> pas de compte, pas de serveur, pas de traceur. Tout est enregistré dans ce navigateur. Pense à « Sauvegarder » de temps en temps (onglet Grille → Mes données).</p></div>`,
      actions: [{ label: 'Compris', kind: 'primary', value: null }],
    });
  }

  /* ---------------- Événements globaux ---------------- */
  const app = { view, regenerate, renderAll, renderSide, renderGrid, setMode, derive };
  const actions = MF.createActions(app);

  function bind() {
    // Logo + nom : tableau de bord « Mes grilles » (re-clic : retour à la grille)
    $('#btn-home').onclick = () => showHome(!view.home);
    $('#puzzle-tabs').addEventListener('click', e => {
      const b = e.target.closest('.ptab');
      if (!b) return;
      if (b.classList.contains('add')) actions.newPuzzle();
      else actions.switchPuzzle(b.dataset.id);
    });
    $('#puzzle-tabs').addEventListener('dblclick', async e => {
      const b = e.target.closest('.ptab[data-id]');
      if (!b) return;
      const name = await MF.ui.prompt('Renommer la grille', { label: 'Nom', value: store.puzzle(b.dataset.id).name });
      if (name) actions.setPuzzle({ name });
    });
    $('#grid-name').addEventListener('click', async () => {
      const name = await MF.ui.prompt('Renommer la grille', { label: 'Nom', value: store.active().name });
      if (name) actions.setPuzzle({ name });
    });
    $('#side-tabs').addEventListener('click', e => {
      const b = e.target.closest('button[data-tab]');
      if (b) store.update(s => { s.ui.tab = b.dataset.tab; }, 'ui');
    });
    $('#page-switch').addEventListener('click', e => { const b = e.target.closest('button[data-page]'); if (b) actions.setPage(+b.dataset.page); });
    $('#mode-switch').addEventListener('click', e => { const b = e.target.closest('button[data-mode]'); if (b) setMode(b.dataset.mode); });
    $('#zoom').addEventListener('input', e => store.update(s => { s.ui.cell = +e.target.value; s.ui.fit = false; }, 'zoom'));
    $('#btn-fit').onclick = () => store.update(s => { s.ui.fit = !s.ui.fit; }, 'zoom');
    // La zone de la grille change de taille (fenêtre, bandeaux, polices chargées) : on réajuste
    let lastBox = '';
    new ResizeObserver(MF.util.debounce(() => {
      const b = $('#grid-scroll'), key = `${b.clientWidth}x${b.clientHeight}`;
      if (key !== lastBox && store.get().ui.fit && store.active()) { lastBox = key; renderGrid(); }
    }, 120)).observe($('#grid-scroll'));
    $('#btn-shuffle').onclick = () => store.active() && regenerate(store.active().id);
    $('#btn-cancel-gen').onclick = cancelGeneration;
    document.addEventListener('click', e => { if (e.target.closest('[data-regen]')) regenerate(store.active().id); });
    $('#btn-export').onclick = openExport;
    $('#btn-check').onclick = () => {
      const r = MF.gridView.check();
      if (!r) return;
      if (r.filled === r.total && !r.wrong) celebrate();
      else MF.ui.toast(store.active().game === 'meles' ? `${r.filled} / ${r.total} mots trouvés` : `${r.filled}/${r.total} cases remplies · ${plural(r.wrong, 'erreur')}`, r.wrong ? 'warn' : 'info');
    };
    $('#btn-hint').onclick = () => { if (!MF.gridView.reveal('letter')) MF.ui.toast('Clique d\'abord une case.', 'info'); };
    $('#btn-hint-word').onclick = () => { if (!MF.gridView.reveal('word')) MF.ui.toast('Clique d\'abord une case du mot.', 'info'); };
    $('#btn-clear-play').onclick = () => { MF.gridView.clearEntries(); view.playStart = Date.now(); };

    $('#btn-theme').onclick = () => store.update(s => { s.theme = s.theme === 'light' ? 'dark' : 'light'; }, 'theme');
    $('#btn-undo').onclick = () => store.undo();
    $('#btn-redo').onclick = () => store.redo();
    $('#btn-share').onclick = () => actions.share();
    $('#btn-save').onclick = () => actions.backup();
    $('#btn-open').onclick = () => $('#file-open').click();
    $('#btn-help').onclick = help;
    $('#file-open').addEventListener('change', e => { const f = e.target.files[0]; e.target.value = ''; if (f) actions.openFile(f); });

    // Glisser-déposer de fichiers n'importe où : images -> décor, listes -> mots, sauvegarde -> restauration
    let dragDepth = 0;
    addEventListener('dragenter', e => { if (e.dataTransfer?.types?.includes('Files')) { dragDepth++; document.body.classList.add('dropping'); } });
    addEventListener('dragleave', () => { dragDepth = Math.max(0, dragDepth - 1); if (!dragDepth) document.body.classList.remove('dropping'); });
    addEventListener('dragover', e => { if (e.dataTransfer?.types?.includes('Files')) e.preventDefault(); });
    addEventListener('drop', async e => {
      if (!e.dataTransfer?.files?.length) return;
      e.preventDefault();
      dragDepth = 0;
      document.body.classList.remove('dropping');
      const files = [...e.dataTransfer.files];
      const images = files.filter(f => /^image\//.test(f.type));
      if (images.length && store.active()) actions.addPhotos(images);
      for (const f of files.filter(x => !/^image\//.test(x.type))) await actions.openFile(f);
    });

    // Coller une image (Ctrl+V) : ajoutée comme photo
    addEventListener('paste', e => {
      if (e.target.closest?.('input, textarea, [contenteditable]') || !store.active()) return;
      const files = [...(e.clipboardData?.files || [])].filter(f => /^image\//.test(f.type));
      if (files.length) { e.preventDefault(); actions.addPhotos(files); }
    });

    // Raccourcis clavier
    document.addEventListener('keydown', e => {
      const typing = e.target.closest?.('input, textarea, select, [contenteditable]');
      if ((e.ctrlKey || e.metaKey) && !e.altKey && !typing) {
        const k = e.key.toLowerCase();
        if (k === 'z' && !e.shiftKey) { e.preventDefault(); store.undo(); }
        else if (k === 'y' || (k === 'z' && e.shiftKey)) { e.preventDefault(); store.redo(); }
        return;
      }
      if (typing || e.ctrlKey || e.metaKey || e.altKey || document.querySelector('.modal-scrim')) return;
      const pz = store.active();
      if (!pz) { if (e.key === 'n') { e.preventDefault(); actions.newPuzzle(); } return; }
      if (e.key === 'h') { showHome(!view.home); return; }
      if (view.home) { if (e.key === 'n') { e.preventDefault(); actions.newPuzzle(); } if (e.key === 'Escape') showHome(false); return; }
      if (view.selected && store.get().ui.mode !== 'play') {
        const step = e.shiftKey ? 0.02 : 0.004;
        const moves = { ArrowLeft: [-step, 0], ArrowRight: [step, 0], ArrowUp: [0, -step], ArrowDown: [0, step] };
        if (moves[e.key]) { e.preventDefault(); actions.nudgeSticker(view.selected, ...moves[e.key]); return; }
        if (e.key === 'Delete' || e.key === 'Backspace') { e.preventDefault(); actions.stickerAction('del', view.selected); return; }
        if (e.key === 'Escape') { actions.selectSticker(null); return; }
      }
      if (e.key === 'n') { e.preventDefault(); store.update(s => { s.ui.tab = 'words'; }, 'ui'); requestAnimationFrame(() => $('#add-form [name=text]')?.focus()); }
      if (e.key === 'm') $('#btn-shuffle').click();
      if (e.key === 'e') openExport();
      if (e.key === 'p') setMode(store.get().ui.mode === 'play' ? 'solution' : 'play');
      if (e.key === '?') help();
      const tabs = ['words', 'diag', 'design', 'decor', 'settings'];
      if (/^[1-5]$/.test(e.key)) store.update(s => { s.ui.tab = tabs[+e.key - 1]; }, 'ui');
    });

    // Zoom à la molette + Ctrl dans la grille
    $('#grid-scroll').addEventListener('wheel', e => {
      if (!e.ctrlKey) return;
      e.preventDefault();
      const cur = lastView?.cellPx || +$('#zoom').value;
      const next = Math.max(10, Math.min(140, cur + (e.deltaY < 0 ? 4 : -4)));
      if (next !== cur) store.update(s => { s.ui.cell = next; s.ui.fit = false; }, 'zoom');
    }, { passive: false });
  }

  /* ---------------- Démarrage ---------------- */
  function onChange(reason) {
    if (reason === 'theme') { applyTheme(); return; }
    if (reason === 'quota') { MF.ui.toast('Stockage du navigateur plein : supprime des images ou des grilles, et fais une sauvegarde.', 'err', 8000); return; }
    if (reason === 'zoom') { renderGrid(); return; }
    renderToolbar();
    if (view.sideLocked) {
      // Réglage en cours (curseur, couleur) : le panneau reste tel quel, seule l'affiche est redessinée
      view.sideLocked = false;
      applyAccent(store.active());
      scheduleGrid();
      return;
    }
    renderAll();
    const pz = store.active();
    if (!pz) return;
    // Pas encore de grille, ou forme / taille / jeu modifiés : on (re)construit automatiquement
    if (['options', 'active', 'puzzles', 'reset', 'history'].includes(reason) || (reason === 'words' && !compatible(pz))) autoRegen();
  }

  /** Ouverture d'un lien de partage (#g=…). */
  async function openShared() {
    let pz;
    try { pz = await MF.share.read(); } catch (e) { MF.ui.toast(`Lien de partage invalide : ${e.message}`, 'err', 5000); MF.share.clearHash(); return; }
    MF.share.clearHash();
    if (!pz) return;
    const ok = await MF.ui.modal({
      title: 'Une grille t\'a été partagée !', icon: 'share',
      body: `<p><b>${esc(pz.name)}</b> · ${esc(MF.games.get(pz.game).label)} · ${plural(pz.words.length, 'mot')}</p><p class="muted small">Elle sera ajoutée à tes grilles (dans ce navigateur uniquement).</p>`,
      actions: [{ label: 'Non merci', value: false }, { label: 'Jouer', kind: 'primary', icon: 'play', value: true }],
    });
    if (!ok) return;
    store.update(s => { s.puzzles.push(pz); s.activeId = pz.id; s.ui.mode = 'play'; }, 'puzzles');
  }

  /** Filet de sécurité : une erreur inattendue ne bloque jamais l'appli et reste discrète. */
  function guard() {
    let last = 0;
    const report = err => {
      console.error(err);
      if (Date.now() - last < 5000) return;
      last = Date.now();
      MF.ui.toast('Petit souci technique : ton travail est sauvegardé. Si quelque chose semble bloqué, recharge la page.', 'err', 6000);
    };
    addEventListener('error', e => report(e.error || e.message));
    addEventListener('unhandledrejection', e => report(e.reason));
    // Même appli ouverte dans un autre onglet : on propose de reprendre ses changements
    addEventListener('storage', e => {
      if (!store.isOwnKey(e.key)) return;
      MF.ui.toast('Tes grilles ont été modifiées dans un autre onglet.', 'info', 10000, { label: 'Mettre à jour', run: () => store.reload() });
    });
  }

  async function boot() {
    guard();
    store.load();
    MF.icons.hydrate();
    applyTheme();
    bind();
    store.subscribe(onChange);
    // Les mesures de texte dépendent des polices : on charge celles par défaut avant le premier rendu
    try { await Promise.race([Promise.all(['600 16px Inter', '700 16px Inter'].map(f => document.fonts.load(f))), MF.util.sleep(1500)]); } catch { /* police de repli */ }
    renderAll();
    const pz = store.active();
    if (pz && !compatible(pz) && prepared(pz).length) regenerate(pz.id);
    if (location.hash.startsWith('#g=')) openShared();
    // Toutes les polices en arrière-plan : aperçus des thèmes et mesures de texte exacts
    setTimeout(() => Promise.all(Object.values(MF.design.FONTS).flatMap(f => f.weights.map(w => document.fonts.load(`${w} 20px ${f.css}`).catch(() => null))))
      .then(() => { MF.text.invalidate(); MF.previews.clear(); derivedCache.key = null; if (store.active()) renderAll(); }), 600);
    // Hors ligne et installable : le service worker garde une copie de l'application
    if ('serviceWorker' in navigator && /^https?:$/.test(location.protocol)) {
      navigator.serviceWorker.register('sw.js').catch(() => { /* navigation privée, etc. : l'appli marche quand même */ });
    }
    // Ménage : images qui ne servent plus à aucune grille
    setTimeout(() => MF.assets.collect(store.usedAssets()).catch(() => {}), 4000);
  }

  boot();
})();
