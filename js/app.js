/* =========================================================================
   Orchestration : état -> calcul de grille -> rendu, événements globaux.
   Une grille prend quelques secondes à calculer et change entièrement à chaque
   calcul : on recalcule automatiquement quand la forme ou la taille change, ou
   s'il n'existe encore aucune grille ; sinon à la demande (bandeau « Recalculer »).
   ========================================================================= */
(() => {
  const { $, $$, esc, plural, hexToRgb } = MF.util;
  const { t } = MF.i18n;
  const store = MF.store;
  const ic = MF.icons.svg;

  const view = { home: false, filter: '', sort: 'added', draft: {}, page: 0, selected: null, sections: {}, emojiCat: null, sideLocked: false, entries: {}, entriesFor: null, playStart: 0 };
  const jobs = new Map();
  let derivedCache = { key: null, value: null };
  let lastView = null;
  const assetsTried = new Set();
  const fontsReady = new Set();

  const engineOf = pz => MF.games.get(pz.game).engine;
  const engine = pz => MF.games.engine(pz.game);
  const hashOf = pz => engine(pz).layoutHash(pz);
  const prepared = pz => engine(pz).prepare(pz.words);
  /** La grille enregistrée correspond-elle au jeu choisi ? */
  const compatible = MF.games.compatible;
  const isFresh = pz => compatible(pz) && pz.layout.hash === hashOf(pz);
  /** Définitions encore vides de la page affichée (mots perso compris si `words`). */
  const missingClues = (pz, d, words = true) => MF.diagnostics.missing(pz, d.fillers, { words });

  /* ---------------- Calcul dérivé (modèle de dessin, diagnostic) ---------------- */
  // Recalculé seulement quand le contenu change (révision du store), pas à chaque réglage de couleur
  function derive(pz) {
    // Le modèle ne dépend du design que par ses mesures (polices, cases) : une couleur ne le recalcule pas
    const metrics = MF.design.metrics(pz.design);
    const key = `${pz.id}|${store.rev()}|${view.page}|${MF.lexicon.ready(pz.options.lang)}|${Object.values(metrics).join()}`;
    if (derivedCache.key === key) return derivedCache.value;
    const pages = compatible(pz) ? pz.layout.pages : [];
    const page = Math.min(view.page, Math.max(0, pages.length - 1));
    const layout = pages[page] || null;
    const pageOf = new Map();
    pages.forEach((pg, i) => MF.gridModel.placedIn(pg).forEach(w => pageOf.set(w.wid, i)));
    const value = {
      layout, pages, page, pageOf,
      model: MF.gridModel.from(layout, pz, metrics, pz.layout),
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
    if (!prepared(pz).length) { MF.ui.toast(t('Ajoute au moins un mot (2 lettres minimum).'), 'warn'); renderGrid(); return; }
    jobs.get(pzId)?.cancel();
    const job = { cancelled: false, run: null, live: null, cancel() { this.cancelled = true; this.run?.cancel(); } };
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
    const shown = () => !job.cancelled && store.get().activeId === pzId && !view.home;
    // Calcul en arrière-plan (Web Worker) : l'interface reste utilisable pendant la recherche,
    // et la grille se construit sous les yeux de l'utilisateur
    for (const [i, group] of groups.entries()) {
      job.live = { engine, page: i, pages: groups.length, progress: 0, snapshot: null };
      if (shown()) renderLive(job);
      job.run = MF.generator.run(
        { engine, words: group, options: MF.paper.gridOptions(pz), seed: MF.util.randomSeed(), exclude: [...exclude], banned: pz.banned },
        p => {
          job.live.progress = p;
          if (shown()) { setBusy(true, (i + p) / groups.length); renderLive(job); }
        },
        snap => { job.live.snapshot = snap; if (shown()) renderLive(job); },
      );
      const out = await job.run.promise;
      if (job.cancelled || out.cancelled) return;
      if (out.error || !out.result) { error = out.error; break; }
      // L'animation se termine sur la grille retenue avant le rendu final
      if (shown()) await MF.liveBuild.finish($('#grid-scroll'), out.result, MF.games.engineModule(engine).prepare(group).length);
      if (job.cancelled) return;
      out.result.words.forEach(w => exclude.add(w.word));
      pages.push(out.result);
    }
    jobs.delete(pzId);
    setBusy(false);
    if (!pages.length || pages.length !== groups.length) {
      MF.ui.toast(error ? t('Le calcul a échoué : {error}', { error }) : t('Aucune grille trouvée : essaie une grille plus grande ou une autre forme.'), 'err', 5000);
      renderAll();
      return;
    }

    view.page = 0;
    store.update(s => {
      const p = s.puzzles.find(x => x.id === pzId);
      if (p) p.layout = MF.schema.layout({ engine, pages, hash, at: Date.now() });
    }, 'layout');

    const total = prepared(pz).length;
    const placed = pages.reduce((n, pg) => n + MF.gridModel.placedIn(pg).length, 0);
    MF.ui.toast(t(pages.length > 1 ? '2 grilles prêtes : {placed} / {total} de tes mots placés' : 'Grille prête : {placed} / {total} de tes mots placés', { placed, total }), placed === total ? 'ok' : 'warn', 4000);
  }

  /** Construction en direct (chaque instantané est mis en file et rejoué à l'image par MF.liveBuild). */
  function renderLive(job) {
    if (jobs.get(store.get().activeId) !== job || view.home) return;
    MF.liveBuild.update($('#grid-scroll'), job.live, { onCancel: cancelGeneration, design: store.active()?.design });
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
    MF.ui.toast(t('Calcul arrêté.'), 'info');
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
      `<button class="ptab add" id="btn-new-puzzle" title="${t('Nouvelle grille (N)')}" aria-label="${t('Nouvelle grille')}">${ic('plus')}<span>${t('Nouvelle')}</span></button>`;
  }

  function renderToolbar() {
    $('#btn-undo').disabled = !store.canUndo();
    $('#btn-redo').disabled = !store.canRedo();
  }

  /** Images et polices nécessaires : chargées à la demande, puis nouveau rendu. */
  function ensureResources(pz) {
    const ids = MF.schema.assetIds(pz).filter(id => !assetsTried.has(id));
    if (ids.length) { ids.forEach(id => assetsTried.add(id)); MF.assets.ensure(ids).then(() => renderGrid()); }
    const fonts = MF.design.fontsOf(pz.design).filter(f => !fontsReady.has(f.css));
    if (fonts.length) {
      fonts.forEach(f => fontsReady.add(f.css));
      MF.design.loadFonts(fonts).then(() => { fontsChanged(); renderGrid(); });
    }
    // Dictionnaire de la langue de la grille : chargé à la demande (définitions des mots de remplissage)
    const lang = pz.options.lang;
    if (!MF.lexicon.ready(lang)) MF.lexicon.ensure(lang).then(() => { if (store.active()?.options.lang === lang) renderAll(); }).catch(() => {});
  }

  /** Polices chargées : mesures de texte et aperçus à refaire. */
  function fontsChanged() {
    MF.text.invalidate();
    MF.previews.clear();
    derivedCache.key = null;
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
    const missing = missingClues(pz, d);
    $('#page-switch').hidden = d.pages.length < 2;
    $('#page-switch').innerHTML = d.pages.map((pg, i) => `<button data-page="${i}" class="${i === d.page ? 'active' : ''}">${t('Grille {n}', { n: i + 1 })}</button>`).join('');
    $('#grid-stats').innerHTML = d.layout
      ? `<span class="badge">${d.model.cols} × ${d.model.rows}</span>
         <span class="badge ${d.pageOf.size === total ? 'ok' : 'warn'}"><span class="dot"></span>${t('{placed} / {total} mots placés', { placed: d.pageOf.size, total })}</span>
         ${game.clues ? `<span class="badge ${missing ? 'warn' : 'ok'}"><span class="dot"></span>${missing ? t('{n} à écrire', { n: plural(missing, 'définition') }) : t('Tout est défini')}</span>` : ''}`
      : '';
    $('#stale-bar').hidden = busy || !compatible(pz) || isFresh(pz);

    $$('#mode-switch button').forEach(btn => { const on = btn.dataset.mode === s.ui.mode; btn.classList.toggle('active', on); btn.setAttribute('aria-pressed', on); });
    $('#play-bar').hidden = s.ui.mode !== 'play' || !d.model.cols;
    $('#play-clue').hidden = $('#play-bar').hidden || !game.clues;
    syncClock();
    $('#btn-fit').classList.toggle('active', !!s.ui.fit);
    $('#btn-hint-word').hidden = game.wordSearch;
    $('#btn-hint').innerHTML = `${ic('bulb')}${t(game.wordSearch ? 'Indice' : 'Lettre')}`;

    const entriesFor = MF.play.keyOf(pz, d.page);
    if (view.entriesFor !== entriesFor) {
      view.entries = MF.play.load(entriesFor); view.entriesFor = entriesFor; view.playStart = Date.now();
      $('#clue-text').textContent = t('Touche une case pour voir sa définition');
    }
    const box = $('#grid-scroll');
    if (busy) {
      // Pendant le calcul : la grille se construit en direct (remplace l'ancienne grille)
      lastView = null;
      view.shownGrid = null;
      MF.liveBuild.update(box, jobs.get(pz.id).live || { engine: engineOf(pz) }, { onCancel: cancelGeneration, design: pz.design });
      return;
    }
    if (!d.model.cols) {
      lastView = null;
      box.innerHTML = total
          ? `<div class="empty">${ic('grid')}<h3>${t('Prêt à construire')}</h3><p>${t('{n} dans ta liste.', { n: plural(total, 'mot') })}</p><p><button class="btn btn-primary" data-regen>${ic('sparkle')}${t('Construire la grille')}</button></p></div>`
          : `<div class="empty start-hint">${ic('edit')}<h3>${t('Commence par ajouter des mots')}</h3><p>${t('Tape-les dans le panneau « Mots », ou pioche dans la bibliothèque et les thèmes. La grille se construit toute seule.')}</p></div>`;
      return;
    }
    const fit = (W, H) => Math.max(10, Math.min(160, Math.floor(Math.min((box.clientWidth - 28) / (W / 100), (box.clientHeight - 28) / (H / 100)))));
    const cell = s.ui.fit ? fit : s.ui.cell;
    // Petite animation d'apparition seulement pour une nouvelle grille (pas à chaque réglage)
    const animate = view.shownGrid !== entriesFor;
    view.shownGrid = entriesFor;
    lastView = MF.gridView.render(box, d.model, pz, {
      mode: s.ui.mode, cell, entries: view.entries, photoMarks: !!s.ui.photoMarks, assetUrl: MF.assets.url, animate, key: entriesFor,
      onEntries: e => { view.entries = e; MF.play.save(entriesFor, e); },
      onMissing: key => editMissing(key),
      onComplete: () => celebrate(),
      onWord: wid => showClue(wid),
      onFound: (slot, n, tot) => MF.ui.toast(`${slot.label || slot.word} ✓ (${n}/${tot})`, 'ok', 1500),
      onMiss: () => MF.ui.toast(t('Pas de mot caché ici.'), 'info', 1500),
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
    view.phonePanel = true;
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
    $$('#side-tabs button').forEach(b => { const on = b.dataset.tab === s.ui.tab; b.classList.toggle('active', on); b.setAttribute('aria-selected', on); });
    $('#count-words').textContent = pz.words.length;
    const missing = missingClues(pz, d, false);
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
    MF.phoneNav.sync({ tab: s.ui.tab, panel: view.phonePanel });
  }

  /** Téléphone : affiche la grille ou un panneau d'édition (plein écran). */
  function showPhone(tab) {
    view.phonePanel = tab !== 'grid';
    if (view.phonePanel && store.get().ui.tab !== tab) store.update(s => { s.ui.tab = tab; }, 'ui');
    else renderSide();
    if (view.phonePanel) $('#side-body').scrollTop = 0;
  }

  function renderAll() {
    const pz = store.active();
    // Autocomplétion, bibliothèque, tirages : dans la langue des mots de la grille ouverte
    MF.dictionary.use(pz?.options.lang || MF.lexicon.preferred());
    // Booléen strict : classList.toggle(x, undefined) inverserait la classe au lieu de la fixer
    const home = !pz || !!view.home;
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
  function setMode(mode) {
    view.selected = null;
    if (mode === 'play') view.playStart = Date.now();
    store.update(s => { s.ui.mode = mode; }, 'ui');
  }

  /** Chronomètre : ne tourne que si la barre de jeu est affichée. */
  let clock = null;
  function syncClock() {
    const on = !$('#play-bar').hidden;
    if (on === !!clock) return;
    if (on) {
      const tick = () => { $('#play-time').textContent = MF.play.elapsed(view.playStart); };
      tick();
      clock = setInterval(tick, 1000);
    } else { clearInterval(clock); clock = null; }
  }

  function celebrate() {
    MF.ui.toast(t('Bravo, grille terminée en {time} ! 🎉', { time: MF.play.elapsed(view.playStart) }), 'ok', 6000);
    MF.play.confetti();
  }

  /* ---------------- Événements globaux ---------------- */
  const app = { view, regenerate, renderAll, renderSide, renderGrid, setMode, derive };
  const actions = MF.createActions(app);
  const openExport = MF.createExportFlow({ derive, openPage: () => actions.openPage() }).open;

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
      const name = await MF.ui.prompt(t('Renommer la grille'), { label: t('Nom'), value: store.puzzle(b.dataset.id).name });
      if (name) actions.setPuzzle({ name });
    });
    $('#grid-name').addEventListener('click', async () => {
      const name = await MF.ui.prompt(t('Renommer la grille'), { label: t('Nom'), value: store.active().name });
      if (name) actions.setPuzzle({ name });
    });
    $('#side-tabs').addEventListener('click', e => {
      const b = e.target.closest('button[data-tab]');
      if (b) store.update(s => { s.ui.tab = b.dataset.tab; }, 'ui');
    });
    MF.phoneNav.init($('#phone-nav'), { onSelect: showPhone });
    $('#page-switch').addEventListener('click', e => { const b = e.target.closest('button[data-page]'); if (b) actions.setPage(+b.dataset.page); });
    $('#mode-switch').addEventListener('click', e => { const b = e.target.closest('button[data-mode]'); if (b) setMode(b.dataset.mode); });
    $('#zoom').addEventListener('input', e => store.update(s => { s.ui.cell = +e.target.value; s.ui.fit = false; }, 'zoom'));
    $('#btn-fit').onclick = () => store.update(s => { s.ui.fit = !s.ui.fit; }, 'zoom');
    // La zone de la grille change de taille (fenêtre, bandeaux, polices chargées) : on réajuste
    let lastBox = '';
    new ResizeObserver(MF.util.debounce(() => {
      const b = $('#grid-scroll'), key = `${b.clientWidth}x${b.clientHeight}`;
      // Pendant la saisie, l'ouverture du clavier du téléphone change la hauteur : on ne redessine pas
      if (document.activeElement?.matches?.('.play-cell')) return;
      if (key !== lastBox && store.get().ui.fit && store.active()) { lastBox = key; renderGrid(); }
    }, 120)).observe($('#grid-scroll'));
    $('#btn-shuffle').onclick = () => store.active() && regenerate(store.active().id);
    document.addEventListener('click', e => { if (e.target.closest('[data-regen]')) regenerate(store.active().id); });
    $('#btn-export').onclick = openExport;
    $('#btn-check').onclick = () => {
      const r = MF.gridView.check();
      if (!r) return;
      if (r.filled === r.total && !r.wrong) celebrate();
      else MF.ui.toast(MF.games.get(store.active().game).wordSearch ? t('{filled} / {total} mots trouvés', r) : `${t('{filled}/{total} cases remplies', r)} · ${plural(r.wrong, 'erreur')}`, r.wrong ? 'warn' : 'info');
    };
    $('#btn-hint').onclick = () => { if (!MF.gridView.reveal('letter')) MF.ui.toast(t('Clique d\'abord une case.'), 'info'); };
    $('#btn-hint-word').onclick = () => { if (!MF.gridView.reveal('word')) MF.ui.toast(t('Clique d\'abord une case du mot.'), 'info'); };
    $('#btn-clear-play').onclick = () => { MF.gridView.clearEntries(); view.playStart = Date.now(); };

    // Langue de l'interface : changer recharge la page dans la langue choisie
    $('#lang-code').textContent = MF.i18n.LANGS[MF.i18n.lang].short;
    $('#btn-lang').onclick = e => MF.ui.menu(e.currentTarget, Object.entries(MF.i18n.LANGS).map(([id, l]) => ({
      icon: id === MF.i18n.lang ? 'check' : 'globe', label: l.label, run: () => MF.i18n.set(id),
    })));
    $('#btn-theme').onclick = () => store.update(s => { s.theme = s.theme === 'light' ? 'dark' : 'light'; }, 'theme');
    $('#btn-undo').onclick = () => store.undo();
    $('#btn-redo').onclick = () => store.redo();
    $('#btn-share').onclick = () => actions.share();
    $('#btn-save').onclick = () => actions.backup();
    $('#btn-open').onclick = () => $('#file-open').click();
    $('#btn-help').onclick = () => MF.help.open();
    $('#file-open').addEventListener('change', e => { const f = e.target.files[0]; e.target.value = ''; if (f) actions.openFile(f); });

    MF.shortcuts.bind({ view, actions, showHome, openExport, setMode, cellPx: () => lastView?.cellPx || +$('#zoom').value });

    // Jeu : définition du mot en cours, mot précédent / suivant, changement de sens
    $('#clue-prev').onclick = () => MF.gridView.stepWord(-1);
    $('#clue-next').onclick = () => MF.gridView.stepWord(1);
    $('#clue-text').onclick = () => { if (!MF.gridView.toggleDir()) MF.gridView.stepWord(0); };
    $('#clue-done').onclick = () => MF.phoneNav.closeKeyboard();
    // Les boutons ne prennent pas le focus : la case active (et le clavier du téléphone) reste ouverte
    $$('#play-clue button').forEach(b => b.addEventListener('mousedown', e => e.preventDefault()));

    // Actions secondaires regroupées dans « Plus » : menu déroulant (feuille du bas sur téléphone)
    $('#btn-more').onclick = e => {
      const phone = MF.phoneNav.isPhone();
      const items = [
        { id: 'btn-share', icon: 'share', label: t('Partager un lien pour jouer') },
        { id: 'btn-open', icon: 'folder', label: t('Ouvrir un fichier (mots, Excel, sauvegarde)') },
        { id: 'btn-save', icon: 'download', label: t('Sauvegarder toutes mes grilles') },
        ...(phone ? [{ id: 'btn-theme', icon: 'contrast', label: t('Thème clair / sombre') }] : []),
        { id: 'btn-help', icon: 'help', label: t('Aide & raccourcis'), hint: '?' },
      ];
      if (phone) { MF.phoneNav.menu(items); return; }
      const noPuzzle = document.body.classList.contains('no-puzzle');
      MF.ui.menu(e.currentTarget, items
        .filter(it => !(noPuzzle && $(`#${it.id}`).classList.contains('only-puzzle')))
        .map(it => ({ ...it, run: () => $(`#${it.id}`).click() })));
    };
  }

  /** Jeu : affiche la définition du mot actif (sens indiqué par une flèche). */
  function showClue(wid) {
    const pz = store.active();
    const slot = derive(pz).model.slots.get(wid);
    if (!slot) return;
    const text = MF.gridModel.clueText(slot, pz) || t('Définition à écrire');
    $('#clue-text').innerHTML = `<b class="pc-dir">${slot.dir === 'V' ? '↓' : '→'}</b><span>${esc(text)}</span><small>${plural(slot.cells.length, 'lettre')}</small>`;
  }

  /* ---------------- Démarrage ---------------- */
  function onChange(reason) {
    if (reason === 'theme') { applyTheme(); return; }
    if (reason === 'quota') { MF.guard.recoverQuota(store, { keep: view.entriesFor, backup: () => actions.backup() }); return; }
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
    // Pas encore de grille, ou forme / taille / jeu / proportions de la page modifiés : on (re)construit automatiquement
    const frame = `${pz.id}|${MF.paper.key(MF.paper.gridOptions(pz))}`;
    const frameChanged = reason === 'design' && view.frame && view.frame !== frame;
    view.frame = frame;
    if (['options', 'active', 'puzzles', 'reset', 'history'].includes(reason) || frameChanged || (reason === 'words' && !compatible(pz))) autoRegen();
  }

  /** Ouverture d'un lien de partage (#g=…). */
  async function openShared() {
    let pz;
    try { pz = await MF.share.read(); } catch (e) { MF.ui.toast(t('Lien de partage invalide : {error}', { error: e.message }), 'err', 5000); MF.share.clearHash(); return; }
    MF.share.clearHash();
    if (!pz) return;
    if (!await MF.shareDialog.received(pz)) return;
    store.update(s => { s.puzzles.push(pz); s.activeId = pz.id; s.ui.mode = 'play'; }, 'puzzles');
  }

  async function boot() {
    MF.guard.install(store);
    store.load();
    MF.i18n.apply();
    MF.icons.hydrate();
    applyTheme();
    bind();
    store.subscribe(onChange);
    // Avant le premier rendu : polices par défaut (mesures de texte) et dictionnaire de la grille ouverte
    const lang = store.active()?.options.lang || MF.lexicon.preferred();
    await Promise.race([
      Promise.all([MF.design.loadFonts([MF.design.font('inter')]), MF.lexicon.ensure(lang)]).catch(() => { /* repli : rendu sans attendre */ }),
      MF.util.sleep(2500),
    ]);
    renderAll();
    const pz = store.active();
    if (pz && !compatible(pz) && prepared(pz).length) regenerate(pz.id);
    if (location.hash.startsWith('#g=')) openShared();
    // Toutes les polices en arrière-plan : aperçus des thèmes et mesures de texte exacts
    setTimeout(() => MF.design.loadFonts().then(() => { fontsChanged(); if (store.active()) renderAll(); }), 600);
    MF.updates.register();
    MF.versions.watch(store);
    // Ménage : images qui ne servent plus (ni aux grilles, ni à une version restaurable), progressions périmées
    setTimeout(async () => {
      MF.play.prune(store.get().puzzles);
      const keep = new Set([...store.usedAssets(), ...await MF.versions.keepAssets()]);
      MF.assets.collect(keep).catch(() => {});
    }, 4000);
  }

  boot();
})();
