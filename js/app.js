/* =========================================================================
   Orchestration : état -> calcul de grille -> rendu, et actions utilisateur.
   Une grille prend quelques secondes à calculer et change entièrement à chaque
   calcul : on ne recalcule donc qu'à la demande (bandeau « Recalculer »),
   sauf s'il n'existe encore aucune grille.
   ========================================================================= */
(() => {
  const { $, $$, esc, normalize, plural, hexToRgb } = MF.util;
  const store = MF.store;

  const view = { filter: '', draft: {}, entries: {}, page: 0 };
  const jobs = new Map();     // recherches en cours, par grille
  let derivedCache = { key: null, value: null };

  /* ---------------- Calcul dérivé (modèle de dessin, diagnostic) ---------------- */
  function derive(pz) {
    const key = `${pz.id}|${pz.layout?.at}|${view.page}|${MF.util.hash(JSON.stringify([pz.words, pz.fillerClues, pz.options]))}`;
    if (derivedCache.key === key) return derivedCache.value;
    const pages = pz.layout?.pages || [];
    const page = Math.min(view.page, Math.max(0, pages.length - 1));
    const layout = pages[page] || null;
    // Page de chaque mot perso placé
    const pageOf = new Map();
    pages.forEach((pg, i) => pg.words.forEach(w => { if (w.src === 'theme') pageOf.set(w.wid, i); }));
    const value = {
      layout, pages, page, pageOf,
      model: MF.gridModel.from(layout, pz),
      issues: MF.diagnostics.analyze(pz, layout),
      fillers: MF.diagnostics.fillers(pz, layout),
    };
    derivedCache = { key, value };
    return value;
  }

  /** La grille enregistrée correspond-elle encore aux mots (lettres, priorités) et à la taille ? */
  const isFresh = pz => !!pz.layout && pz.layout.hash === MF.builder.layoutHash(pz);

  async function regenerate(pzId) {
    const pz = store.puzzle(pzId);
    if (!pz) return;
    jobs.get(pzId)?.cancel();
    const job = { cancelled: false, cancel() { this.cancelled = true; } };
    jobs.set(pzId, job);
    setBusy(true, 0);
    renderGrid();

    // Signature des mots et réglages AU DÉPART : s'ils changent pendant le calcul, le bandeau « Recalculer » réapparaît
    const hash = MF.builder.layoutHash(pz);
    // Une ou deux grilles (moitié-moitié) ; les mots courants ne se répètent pas d'une page à l'autre
    const nPages = +pz.options.pages === 2 ? 2 : 1;
    const groups = MF.builder.split(pz.words, nPages);
    const pages = [];
    const exclude = new Set();
    for (const [i, group] of groups.entries()) {
      const result = await MF.builder.generate(group, pz.options, {
        seed: (Math.random() * 2 ** 32) >>> 0,
        signal: job,
        exclude,
        onProgress: p => { if (store.get().activeId === pzId) setBusy(true, (i + p) / nPages); },
      });
      if (job.cancelled) return;
      if (!result) break;
      result.words.forEach(w => exclude.add(w.word));
      pages.push(result);
    }
    jobs.delete(pzId);
    setBusy(false);
    if (pages.length !== nPages) { MF.ui.toast('Aucune grille trouvée : essaie une grille plus grande ou plus d\'effort.', 'err', 5000); renderAll(); return; }

    view.page = 0;
    store.update(s => {
      const p = s.puzzles.find(x => x.id === pzId);
      if (p) p.layout = { engine: 'builder', pages, hash, at: Date.now() };
    }, 'layout');

    const themes = MF.builder.prepare(pz.words).length;
    const placed = pages.reduce((n, pg) => n + pg.words.filter(w => w.src === 'theme').length, 0);
    MF.ui.toast(`${nPages > 1 ? '2 grilles prêtes' : 'Grille prête'} : ${placed} mots perso sur ${themes}`, placed === themes ? 'ok' : 'warn', 4500);
  }

  function setBusy(on, p = 0) {
    $('#gen-bar').hidden = !on;
    $('#gen-progress').style.width = `${Math.round(p * 100)}%`;
    $('#btn-shuffle').disabled = on;
  }

  /* ---------------- Actions (appelées par les panneaux) ---------------- */
  const active = () => store.active();
  const mutatePuzzle = (fn, reason) => store.update(s => fn(s.puzzles.find(p => p.id === s.activeId)), reason);
  /** Mot de la grille (et sa page) correspondant à un mot perso. */
  function slotOfWord(pz, wid) {
    for (const [page, pg] of (pz.layout?.pages || []).entries()) {
      const slot = pg.words.find(w => w.wid === wid);
      if (slot) return { slot, page };
    }
    return null;
  }

  const actions = {
    addWords(list, { keepAuthor } = {}) {
      const pz = active();
      const existing = new Set(pz.words.map(w => normalize(w.text)));
      const fresh = list.filter(w => !existing.has(normalize(w.text)));
      const skipped = list.length - fresh.length;
      if (!fresh.length) { MF.ui.toast(skipped ? 'Ce mot est déjà dans la liste.' : 'Rien à ajouter.', 'warn'); return; }
      view.draft = keepAuthor ? { author: keepAuthor } : {};
      mutatePuzzle(p => p.words.push(...fresh.map(w => ({ id: MF.util.uid(), text: w.text, clue: w.clue || '', author: w.author || '', priority: false }))), 'words');
      MF.ui.toast(`${plural(fresh.length, 'mot ajouté', 'mots ajoutés')}${skipped ? ` (${skipped} déjà présent${skipped > 1 ? 's' : ''})` : ''}`, 'ok');
      requestAnimationFrame(() => $('#add-form [name=text]')?.focus());
    },
    updateWord(id, patch) { mutatePuzzle(p => Object.assign(p.words.find(w => w.id === id), patch), 'words'); },
    toggleStar(id) { mutatePuzzle(p => { const w = p.words.find(x => x.id === id); w.priority = !w.priority; }, 'words'); },
    async deleteWord(id) {
      const w = active().words.find(x => x.id === id);
      if (!w) return;
      const ok = await MF.ui.confirm('Supprimer ce mot ?', `« ${w.text} » sera retiré de la liste.`, 'Supprimer');
      if (ok) mutatePuzzle(p => { p.words = p.words.filter(x => x.id !== id); }, 'words');
    },
    focusWord(id) {
      const found = slotOfWord(active(), id);
      if (!found) { MF.ui.toast("Ce mot n'est pas encore dans la grille : recalcule-la.", 'warn'); return; }
      if (store.get().ui.mode === 'play') setMode('solution');
      if (found.page !== view.page) { view.page = found.page; renderAll(); }
      MF.gridView.highlight(MF.gridModel.slotKey(found.slot));
    },
    setPage(i) { view.page = i; renderAll(); },
    focusSlot(key) { MF.gridView.highlight(key, { flash: false }); },
    setFillerClue(word, clue) {
      mutatePuzzle(p => {
        p.fillerClues = p.fillerClues || {};
        if (clue === null) delete p.fillerClues[word]; else p.fillerClues[word] = clue;
      }, 'clues');
    },
    setFilter(v) { view.filter = v; renderSide(); requestAnimationFrame(() => { const f = $('#word-filter'); f?.focus(); f?.setSelectionRange(v.length, v.length); }); },
    startDraft(draft) {
      view.draft = draft;
      store.update(s => { s.ui.tab = 'words'; }, 'ui');
      requestAnimationFrame(() => $('#add-form [name=text]')?.focus());
    },
    /** Clic sur « à définir » dans la grille : ouvre l'éditeur de définitions sur ce mot. */
    editMissing(key) {
      store.update(s => { s.ui.tab = 'diag'; }, 'ui');
      requestAnimationFrame(() => $(`#side-body [data-key="${key}"] input`)?.focus());
    },
    setPuzzle(patch) { mutatePuzzle(p => Object.assign(p, patch), 'puzzle'); },
    setOption(k, v) { actions.setOptions({ [k]: v }); },
    setOptions(patch) { mutatePuzzle(p => Object.assign(p.options, patch), 'puzzle'); },
    /** Format / orientation : une taille fixe est convertie pour garder le même aspect sur la nouvelle feuille. */
    setPaper(patch) {
      mutatePuzzle(p => {
        const next = { ...p.options, ...patch };
        if (p.options.size === 'fixed') {
          const { cols, rows } = MF.paper.convert(p.options.cols, p.options.rows, p.options, next);
          Object.assign(next, { cols: Math.min(50, Math.max(7, cols)), rows: Math.min(50, Math.max(7, rows)) });
        }
        Object.assign(p.options, next);
      }, 'puzzle');
    },
    setPhotoMarks(on) { store.update(s => { s.ui.photoMarks = on; }, 'ui'); },
    duplicatePuzzle() {
      const src = active();
      const copy = store.makePuzzle({ ...JSON.parse(JSON.stringify(src)), id: null, name: `${src.name} (copie)` });
      store.update(s => { s.puzzles.push(copy); s.activeId = copy.id; }, 'puzzles');
      MF.ui.toast('Grille dupliquée.', 'ok');
    },
    async deletePuzzle() {
      const pz = active();
      const ok = await MF.ui.confirm('Supprimer la grille ?', `« ${pz.name} » et ses ${pz.words.length} mots seront supprimés.`, 'Supprimer');
      if (!ok) return;
      store.update(s => { s.puzzles = s.puzzles.filter(p => p.id !== pz.id); s.activeId = s.puzzles[0].id; }, 'puzzles');
    },
    async resetAll() {
      const ok = await MF.ui.confirm('Tout réinitialiser ?', 'Toutes les grilles reviennent aux mots de départ. Pense à sauvegarder en JSON avant si besoin.', 'Réinitialiser');
      if (ok) store.reset();
    },
  };

  /** Pages exportables d'une grille (avec 2 grilles, le nom précise la page). */
  function exportPages(pz) {
    const pages = pz.layout?.pages || [];
    return pages.map((pg, i) => ({
      name: pages.length > 1 ? `${pz.name} grille ${i + 1}` : pz.name,
      accent: pz.accent,
      style: { clueFill: pz.options.clueFill },
      paper: MF.paper.of(pz.options),
      model: MF.gridModel.from(pg, pz),
    }));
  }

  /* ---------------- Rendu ---------------- */
  function applyTheme() {
    const s = store.get();
    document.documentElement.dataset.theme = s.theme;
    document.querySelector('meta[name=theme-color]').content = s.theme === 'light' ? '#eef1f6' : '#07090d';
    MF.bg3d.setTheme();
  }

  function applyAccent(pz) {
    const [r, g, b] = hexToRgb(pz.accent);
    const root = document.documentElement.style;
    root.setProperty('--accent', pz.accent);
    root.setProperty('--accent-rgb', `${r}, ${g}, ${b}`);
    MF.bg3d.setColor(pz.accent);
  }

  function renderTabs() {
    const s = store.get();
    $('#puzzle-tabs').innerHTML = s.puzzles.map(p => `
      <button class="ptab ${p.id === s.activeId ? 'active' : ''}" data-id="${p.id}" style="--c:${p.accent}">
        <i class="dot"></i>${esc(p.name)}<small>${p.words.length}</small>
      </button>`).join('') +
      `<button class="ptab add" id="btn-new-puzzle" title="Nouvelle grille">${MF.icons.svg('plus')}</button>`;
  }

  function renderGrid() {
    const s = store.get();
    const pz = active();
    const d = derive(pz);
    const busy = jobs.has(pz.id);
    $('#grid-name').textContent = pz.name;

    const themes = MF.builder.prepare(pz.words).length;
    const missing = d.fillers.filter(f => !f.clue).length;
    const onPage = d.layout ? d.layout.words.filter(w => w.src === 'theme').length : 0;
    // Sélecteur de page (2 grilles moitié-moitié)
    $('#page-switch').hidden = d.pages.length < 2;
    $('#page-switch').innerHTML = d.pages.map((pg, i) => `<button data-page="${i}" class="${i === d.page ? 'active' : ''}">Grille ${i + 1}<small>${pg.words.filter(w => w.src === 'theme').length} mots</small></button>`).join('');
    $('#grid-stats').innerHTML = d.layout
      ? `<span class="badge">${d.layout.frame.w} × ${d.layout.frame.h} cases</span>
         <span class="badge ok"><span class="dot"></span>${d.pages.length > 1 ? `${onPage} mots perso ici · ${d.pageOf.size} / ${themes} en tout` : `${d.pageOf.size} / ${themes} mots perso`}</span>
         ${d.model.band ? `<span class="badge">Bande photo : ${d.model.band} lignes</span>` : ''}
         ${d.layout.photos ? `<span class="badge">${plural(d.layout.photos, 'case photo', 'cases photo')}</span>` : ''}
         <span class="badge ${missing ? 'warn' : 'ok'}"><span class="dot"></span>${missing ? `${plural(missing, 'définition', 'définitions')} à écrire` : 'Toutes les définitions sont écrites'}</span>`
      : '';
    // Bandeau : la liste a changé depuis le dernier calcul
    $('#stale-bar').hidden = busy || !d.layout || isFresh(pz);

    $$('#mode-switch button').forEach(btn => btn.classList.toggle('active', btn.dataset.mode === s.ui.mode));
    $('#play-bar').hidden = s.ui.mode !== 'play';
    const cell = s.ui.fit ? fitCell(d.model) : s.ui.cell;
    $('#zoom').value = cell;
    $('#btn-fit').classList.toggle('active', !!s.ui.fit);

    const entriesFor = `${pz.layout?.at}#${d.page}`;
    if (view.entriesFor !== entriesFor) { view.entries = loadEntries(pz, d.page); view.entriesFor = entriesFor; }
    if (!d.model.cols) {
      $('#grid-scroll').innerHTML = busy
        ? '<div class="empty"><span class="spinner"></span><h3>Construction de la grille…</h3><p>Placement de vos mots puis remplissage case par case.</p></div>'
        : `<div class="empty">${MF.icons.svg('grid')}<h3>Pas encore de grille</h3><p><button class="btn btn-primary" data-regen>${MF.icons.svg('refresh')}Calculer la grille</button></p></div>`;
      return;
    }
    MF.gridView.render($('#grid-scroll'), d.model, pz, {
      mode: s.ui.mode, cell, entries: view.entries, photoMarks: !!s.ui.photoMarks,
      onEntries: e => { view.entries = e; saveEntries(pz, d.page, e); },
      onMissing: key => actions.editMissing(key),
    });
  }

  /** Taille de case pour que toute la grille tienne dans la zone visible. */
  function fitCell(model) {
    if (!model.cols) return 64;
    const box = $('#grid-scroll');
    const extra = (MF.gridModel.FRAME * 2) / MF.gridModel.U;
    const cw = (box.clientWidth - 48) / (model.cols + extra);
    const ch = (box.clientHeight - 48) / (model.rows + extra);
    return Math.max(16, Math.min(120, Math.floor(Math.min(cw, ch))));
  }

  function renderSide() {
    const s = store.get();
    const pz = active();
    const d = derive(pz);
    $$('#side-tabs button').forEach(b => b.classList.toggle('active', b.dataset.tab === s.ui.tab));
    $('#count-words').textContent = pz.words.length;
    const missing = d.fillers.filter(f => !f.clue).length;
    const errs = d.issues.filter(i => i.level === 'err').length;
    const badge = $('#count-diag');
    badge.textContent = missing || errs || '✓';
    badge.className = `badge ${errs ? 'err' : missing ? 'warn' : 'ok'}`;

    const body = $('#side-body');
    const ctx = { puzzle: pz, derived: d, actions, state: s, filter: view.filter, draft: view.draft };
    if (s.ui.tab === 'diag') MF.panels.diag(body, ctx);
    else if (s.ui.tab === 'settings') MF.panels.settings(body, ctx);
    else MF.panels.words(body, ctx);
  }

  function renderAll() {
    const pz = active();
    applyAccent(pz);
    renderTabs();
    renderGrid();
    renderSide();
  }

  /* Progression du mode jeu, mémorisée par grille et par disposition */
  const entriesKey = (pz, page) => `mots-fleches-maker:play:${pz.id}:${page}`;
  function loadEntries(pz, page) {
    try {
      const saved = JSON.parse(localStorage.getItem(entriesKey(pz, page)) || 'null');
      return saved && saved.at === pz.layout?.at ? saved.entries : {};
    } catch { return {}; }
  }
  const saveEntries = MF.util.debounce((pz, page, entries) => {
    try { localStorage.setItem(entriesKey(pz, page), JSON.stringify({ at: pz.layout?.at, entries })); } catch { /* ignoré */ }
  }, 300);

  function setMode(mode) { store.update(s => { s.ui.mode = mode; }, 'ui'); }

  /* ---------------- Événements globaux ---------------- */
  function bind() {
    $('#puzzle-tabs').addEventListener('click', async e => {
      const b = e.target.closest('.ptab');
      if (!b) return;
      if (b.classList.contains('add')) {
        const name = await MF.ui.modal({
          title: 'Nouvelle grille',
          body: `<label class="field"><span>Pour qui ?</span><input class="input" id="new-name" placeholder="Prénom" autofocus></label>`,
          actions: [{ label: 'Annuler', value: null }, { label: 'Créer', kind: 'primary', value: r => r.querySelector('#new-name').value.trim() || 'Nouvelle grille' }],
          onOpen: r => r.querySelector('#new-name').addEventListener('keydown', e2 => { if (e2.key === 'Enter') r.querySelector('.btn-primary').click(); }),
        });
        if (!name) return;
        const pz = store.makePuzzle({ name, accent: '#7b3fe4' });
        store.update(s => { s.puzzles.push(pz); s.activeId = pz.id; s.ui.tab = 'words'; }, 'puzzles');
        return;
      }
      if (b.dataset.id !== store.get().activeId) {
        view.filter = ''; view.draft = {}; view.page = 0;
        store.update(s => { s.activeId = b.dataset.id; }, 'active');
      }
    });

    $('#side-tabs').addEventListener('click', e => {
      const b = e.target.closest('button[data-tab]');
      if (b) store.update(s => { s.ui.tab = b.dataset.tab; }, 'ui');
    });
    $('#page-switch').addEventListener('click', e => {
      const b = e.target.closest('button[data-page]');
      if (b) actions.setPage(+b.dataset.page);
    });
    $('#mode-switch').addEventListener('click', e => {
      const b = e.target.closest('button[data-mode]');
      if (b) setMode(b.dataset.mode);
    });
    $('#zoom').addEventListener('input', e => store.update(s => { s.ui.cell = +e.target.value; s.ui.fit = false; }, 'zoom'));
    $('#btn-fit').onclick = () => store.update(s => { s.ui.fit = !s.ui.fit; }, 'zoom');
    addEventListener('resize', MF.util.debounce(() => { if (store.get().ui.fit) renderGrid(); }, 150));
    $('#btn-shuffle').onclick = () => regenerate(active().id);
    document.addEventListener('click', e => { if (e.target.closest('[data-regen]')) regenerate(active().id); });
    $('#btn-export').onclick = () => {
      const d = derive(active());
      if (!d.model.cols) return MF.ui.toast('Aucune grille à exporter.', 'warn');
      const missing = d.fillers.filter(f => !f.clue).length;
      if (missing) MF.ui.toast(`Attention : ${plural(missing, 'définition', 'définitions')} encore vide${missing > 1 ? 's' : ''} (onglet Définitions).`, 'warn', 4500);
      const pz = active();
      const mine = exportPages(pz);
      const { puzzles } = store.get();
      const everyone = puzzles.flatMap(exportPages);
      const notReady = puzzles.filter(p => !p.layout?.pages?.length).map(p => p.name);
      const scopes = [{ id: 'puzzle', label: `${pz.name} · ${plural(mine.length, 'page')}`, pages: mine, zipName: `mots-fleches-${MF.exporter.slug(pz.name)}-tout.zip` }];
      if (puzzles.length > 1) scopes.push({
        id: 'all', label: `Toutes les grilles · ${plural(everyone.length, 'page')}`, pages: everyone, zipName: 'mots-fleches-toutes-les-grilles.zip',
        note: notReady.length ? `Pas encore calculée${notReady.length > 1 ? 's' : ''} (ouvre-${notReady.length > 1 ? 'les' : 'la'} d'abord) : ${notReady.join(', ')}` : '',
      });
      MF.exporter.open(mine[d.page], scopes);
    };
    $('#btn-check').onclick = () => {
      const r = MF.gridView.check();
      if (!r) return;
      if (r.filled === r.total && !r.wrong) MF.ui.toast('Bravo, grille complète ! 🎉', 'ok', 5000);
      else MF.ui.toast(`${r.filled}/${r.total} cases remplies · ${plural(r.wrong, 'erreur')}`, r.wrong ? 'warn' : 'info');
    };
    $('#btn-clear-play').onclick = () => MF.gridView.clearEntries();

    $('#btn-theme').onclick = () => store.update(s => { s.theme = s.theme === 'light' ? 'dark' : 'light'; }, 'theme');
    $('#btn-export-json').onclick = () => {
      const s = store.get();
      const data = { app: 'mots-fleches-maker', v: 2, exportedAt: new Date().toISOString(), puzzles: s.puzzles };
      MF.util.download(`mots-fleches-${new Date().toISOString().slice(0, 10)}.json`, JSON.stringify(data, null, 2));
    };
    $('#btn-import').onclick = () => $('#file-import').click();
    $('#file-import').addEventListener('change', async e => {
      const file = e.target.files[0];
      e.target.value = '';
      if (!file) return;
      try {
        const data = JSON.parse(await MF.util.readFile(file));
        const list = (Array.isArray(data) ? data : data.puzzles || []).map(store.makePuzzle);
        if (!list.length) throw new Error('vide');
        store.update(s => {
          for (const p of list) {
            const i = s.puzzles.findIndex(x => x.id === p.id);
            if (i >= 0) s.puzzles[i] = p; else s.puzzles.push(p);
          }
          s.activeId = list[0].id;
        }, 'puzzles');
        MF.ui.toast(`${plural(list.length, 'grille importée', 'grilles importées')}.`, 'ok');
      } catch {
        MF.ui.toast('Fichier JSON illisible.', 'err');
      }
    });

    // Raccourcis clavier
    document.addEventListener('keydown', e => {
      if (e.target.closest('input, textarea, select, [contenteditable]') || e.ctrlKey || e.metaKey || e.altKey) return;
      if (e.key === 'n') { e.preventDefault(); actions.startDraft({}); }
      if (e.key === 'm') $('#btn-shuffle').click();
      if (e.key === 'e') $('#btn-export').click();
    });

    // Zoom à la molette + Ctrl dans la grille
    $('#grid-scroll').addEventListener('wheel', e => {
      if (!e.ctrlKey) return;
      e.preventDefault();
      const cur = +$('#zoom').value;
      const next = Math.max(16, Math.min(120, cur + (e.deltaY < 0 ? 4 : -4)));
      if (next !== cur) store.update(s => { s.ui.cell = next; s.ui.fit = false; }, 'zoom');
    }, { passive: false });
  }

  /* ---------------- Démarrage ---------------- */
  function onChange(reason) {
    if (reason === 'theme') { applyTheme(); return; }
    if (reason === 'zoom') { renderGrid(); return; }
    renderAll();
    // Première visite d'une grille sans aucun calcul : on la construit tout de suite
    const pz = active();
    if (!pz.layout && !jobs.has(pz.id) && ['active', 'puzzles', 'reset'].includes(reason)) regenerate(pz.id);
  }

  async function boot() {
    store.load();
    MF.icons.hydrate();
    MF.bg3d.init($('#bg3d'));
    applyTheme();
    bind();
    store.subscribe(onChange);
    // Les mesures de texte des définitions dépendent de la police : on la charge avant le premier rendu
    try { await Promise.all(['600 16px Inter', '700 16px Inter'].map(f => document.fonts.load(f))); } catch { /* police de repli */ }
    renderAll();
    if (!active().layout) regenerate(active().id);
  }

  boot();
})();
