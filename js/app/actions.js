/* =========================================================================
   Actions métier : seules fonctions qui modifient l'état (via MF.store).
   Les panneaux et raccourcis appellent ces actions ; app.js s'occupe du rendu.
   ========================================================================= */
window.MF = window.MF || {};

MF.createActions = app => {
  const { normalize, plural } = MF.util;
  const store = MF.store;
  const { view } = app;
  const active = () => store.active();
  const mutate = (fn, reason, opts) => store.update(s => fn(s.puzzles.find(p => p.id === s.activeId)), reason, opts);
  const S = MF.schema;

  /** Écrit une valeur dans un objet à partir d'un chemin « a.b.c ». */
  function setPath(obj, path, value) {
    const keys = path.split('.');
    if (keys.some(k => k === '__proto__' || k === 'constructor' || k === 'prototype')) return;
    let o = obj;
    for (const k of keys.slice(0, -1)) o = o[k];
    o[keys[keys.length - 1]] = value;
  }

  /** Remplace le design par sa version validée (aucune valeur hors liste ne passe). */
  const commitDesign = (p, next) => { p.design = S.design(next); };

  /** Mots sans définition : complétés depuis le dictionnaire local, sans attendre. */
  const withLocalClues = list => list.map(w => (w.clue || !MF.dictionary.has(w.text) ? w : { ...w, clue: MF.dictionary.clue(w.text) }));

  const actions = {
    /* ---------------- Mots ---------------- */
    addWords(list, { silent = false } = {}) {
      const pz = active();
      if (!pz) return 0;
      const existing = new Set(pz.words.map(w => normalize(w.text)));
      const seen = new Set();
      const fresh = withLocalClues(list.map(S.word).filter(Boolean)).filter(w => {
        const n = normalize(w.text);
        if (n.length < 2 || existing.has(n) || seen.has(n)) return false;
        seen.add(n);
        return true;
      });
      const room = S.LIMITS.words - pz.words.length;
      const added = fresh.slice(0, Math.max(0, room));
      const skipped = list.length - added.length;
      if (!added.length) { if (!silent) MF.ui.toast(skipped ? 'Déjà dans la liste.' : 'Rien à ajouter.', 'warn'); return 0; }
      view.draft = {};
      mutate(p => p.words.push(...added.map(w => ({ ...w, id: MF.util.uid() }))), 'words');
      const game = MF.games.get(pz.game);
      const missing = game.clues ? added.filter(w => !w.clue).length : 0;
      if (!silent) {
        MF.ui.toast(`${plural(added.length, 'mot ajouté', 'mots ajoutés')}${skipped ? ` (${skipped} ignoré${skipped > 1 ? 's' : ''})` : ''}${missing ? ` · ${missing} sans définition` : ''}`, 'ok', 4500,
          missing && MF.wiki.isOnline() ? { label: 'Chercher en ligne', run: () => actions.autoDefine() } : null);
      }
      requestAnimationFrame(() => document.querySelector('#add-form [name=text]')?.focus());
      return added.length;
    },
    updateWord(id, patch) {
      const clean = S.word({ id, ...active().words.find(w => w.id === id), ...patch });
      if (clean) mutate(p => Object.assign(p.words.find(w => w.id === id), clean), 'words');
    },
    toggleStar(id) { mutate(p => { const w = p.words.find(x => x.id === id); w.priority = !w.priority; }, 'words'); },
    deleteWord(id) {
      const w = active().words.find(x => x.id === id);
      if (!w) return;
      mutate(p => { p.words = p.words.filter(x => x.id !== id); }, 'words');
      MF.ui.toast(`« ${w.text} » supprimé`, 'info', 4000, { label: 'Annuler', run: () => store.undo() });
    },
    async clearWords() {
      const pz = active();
      if (!await MF.ui.confirm('Supprimer tous les mots ?', `Les ${pz.words.length} mots de « ${pz.name} » seront retirés (Ctrl+Z pour annuler).`, 'Tout supprimer')) return;
      mutate(p => { p.words = []; }, 'words');
    },
    focusWord(id) {
      const pz = active();
      for (const [page, pg] of (pz.layout?.pages || []).entries()) {
        const slot = pg.words.findIndex(w => w.wid === id);
        if (slot < 0) continue;
        if (store.get().ui.mode === 'play') app.setMode('solution');
        if (page !== view.page) { view.page = page; app.renderAll(); }
        const w = pg.words[slot];
        MF.gridView.highlight(pg.engine === 'meles' ? `W${slot}` : MF.gridModel.slotKey(w));
        return;
      }
      MF.ui.toast('Ce mot n\'est pas (encore) dans la grille.', 'warn');
    },
    setPage(i) { view.page = i; app.renderAll(); },
    focusSlot(key) { MF.gridView.highlight(key, { flash: false }); },
    setFillerClue(word, clue) {
      mutate(p => { if (clue === null) delete p.fillerClues[word]; else p.fillerClues[word] = S.str(clue, S.LIMITS.clue); }, 'clues');
    },
    banWord(word, on) {
      mutate(p => { p.banned = on ? [...new Set([...p.banned, word])] : p.banned.filter(w => w !== word); }, 'puzzle');
      if (on) MF.ui.toast(`${word} ne sera plus utilisé (recalcule la grille).`, 'info', 4000, { label: 'Recalculer', run: () => app.regenerate(active().id) });
    },
    setView(patch, keepFocus) {
      Object.assign(view, patch);
      app.renderSide();
      if (keepFocus) requestAnimationFrame(() => { const f = document.querySelector(keepFocus); if (f) { f.focus(); f.setSelectionRange?.(f.value.length, f.value.length); } });
    },

    /* ---------------- Imports ---------------- */
    async importWords(kind) {
      const pz = active();
      const pick = { library: MF.pickers.library, themes: MF.pickers.themes, random: MF.pickers.random, paste: MF.pickers.paste }[kind] || MF.pickers.paste;
      const list = await pick(pz);
      if (list?.length) {
        const n = actions.addWords(list, { silent: true });
        afterImport(n);
      }
    },
    async importFile(file) {
      try {
        const list = await MF.importer.parseFile(file);
        if (!list.length) { MF.ui.toast('Aucun mot trouvé dans ce fichier.', 'warn'); return; }
        const picked = await MF.pickers.review(`Importer « ${MF.util.cleanText(file.name, 60)} »`, list, active(), `<p class="muted small">${plural(list.length, 'mot trouvé', 'mots trouvés')}. Décoche ceux que tu ne veux pas.</p>`);
        if (picked?.length) afterImport(actions.addWords(picked, { silent: true }));
      } catch (e) {
        MF.ui.toast(`Import impossible : ${e.message || 'fichier illisible'}`, 'err', 5000);
      }
    },
    /** Définitions manquantes : dictionnaire local puis Wiktionnaire. */
    async autoDefine() {
      const pz = active();
      const todo = pz.words.filter(w => !w.clue.trim());
      if (!todo.length) return;
      MF.ui.toast(`Recherche de ${plural(todo.length, 'définition')}…`, 'info', 2500);
      const found = new Map();
      await MF.pickers.autoDefine(todo.map(w => w.text), (i, clue) => found.set(todo[i].id, clue));
      if (found.size) mutate(p => p.words.forEach(w => { if (found.has(w.id) && !w.clue) w.clue = S.str(found.get(w.id), S.LIMITS.clue); }), 'words');
      MF.ui.toast(found.size ? `${plural(found.size, 'définition trouvée', 'définitions trouvées')} sur ${todo.length}. Relis-les, et rends-les drôles !` : 'Aucune définition trouvée (hors ligne ?).', found.size ? 'ok' : 'warn', 5000);
    },
    async autoDefineFillers(words) {
      MF.ui.toast(`Recherche de ${plural(words.length, 'définition')}…`, 'info', 2500);
      const found = new Map();
      await MF.pickers.autoDefine(words.map(w => w.toLowerCase()), (i, clue) => found.set(words[i], clue));
      if (found.size) mutate(p => found.forEach((c, w) => { p.fillerClues[w] = S.str(c, S.LIMITS.clue); }), 'clues');
      MF.ui.toast(found.size ? `${plural(found.size, 'définition trouvée', 'définitions trouvées')}.` : 'Rien trouvé : écris-les toi-même (ou bannis ces mots).', found.size ? 'ok' : 'warn');
    },

    /* ---------------- Grille ---------------- */
    setPuzzle(patch) { mutate(p => { if (patch.name !== undefined) p.name = S.str(patch.name, S.LIMITS.name) || p.name; }, 'puzzle'); },
    setOption(k, v) { actions.setOptions({ [k]: v }); },
    setOptions(patch) { mutate(p => { p.options = S.options({ ...p.options, ...patch }); }, 'options'); },
    setPaper(patch) {
      mutate(p => {
        const next = { ...p.options, ...patch };
        if (p.options.size === 'fixed') Object.assign(next, MF.paper.convert(p.options.cols, p.options.rows, p.options, next));
        p.options = S.options(next);
      }, 'options');
    },
    setGame(id) {
      const pz = active();
      if (pz.game === id) return;
      const sameEngine = MF.games.get(pz.game).engine === MF.games.get(id).engine;
      mutate(p => { p.game = id; }, sameEngine ? 'puzzle' : 'options');
      MF.ui.toast(`${MF.games.get(id).label} ✓${sameEngine ? ' (même grille, nouvelle présentation)' : ''}`, 'ok');
    },

    /* ---------------- Design ---------------- */
    setDesign(patch, { live = false } = {}) {
      view.sideLocked = live;
      mutate(p => commitDesign(p, MF.design.merge(p.design, patch)), 'design', { coalesce: live ? 'design-live' : undefined });
    },
    setDesignPath(path, value, { live = false } = {}) {
      view.sideLocked = live;
      mutate(p => { const next = MF.util.deepClone(p.design); setPath(next, path, value); commitDesign(p, next); }, 'design', { coalesce: `design:${path}` });
    },
    applyTheme(id) { mutate(p => { p.design = MF.themes.apply(p.design, id); }, 'design'); },
    async setBackgroundImage(file) {
      try {
        const a = await MF.assets.add(file, file.name);
        actions.setDesign({ background: { type: 'image', imageId: a.id } });
      } catch (e) { MF.ui.toast(e.message || 'Image refusée.', 'err', 5000); }
    },

    /* ---------------- Décor ---------------- */
    addSticker(partial) {
      const pz = active();
      if (pz.stickers.length >= S.LIMITS.stickers) { MF.ui.toast('Trop d\'éléments de décor.', 'warn'); return; }
      const jitter = () => (Math.random() - 0.5) * 0.12;
      const base = { x: 0.5 + jitter(), y: 0.5 + jitter(), ar: 1, ...partial };
      if (base.kind === 'text') base.ar = MF.stickers.textAspect(base);
      const s = S.sticker(base);
      if (!s) return;
      if (store.get().ui.mode === 'play') app.setMode('solution');
      view.selected = s.id;
      mutate(p => p.stickers.push(s), 'stickers');
    },
    updateSticker(id, patch, { live = false } = {}) {
      view.sideLocked = live;
      mutate(p => {
        const i = p.stickers.findIndex(s => s.id === id);
        if (i < 0) return;
        const next = { ...p.stickers[i], ...patch };
        if (next.kind === 'text' && (patch.text !== undefined || patch.font !== undefined)) next.ar = MF.stickers.textAspect(next);
        const clean = S.sticker(next);
        if (clean) p.stickers[i] = clean;
      }, 'stickers', { coalesce: live ? `st:${id}:${Object.keys(patch).join()}` : undefined });
    },
    selectSticker(id) {
      view.selected = id;
      MF.stickerEditor.select(id);
      app.renderSide();
    },
    stickerAction(act, id) {
      const pz = active();
      const s = pz.stickers.find(x => x.id === id);
      if (!s) return;
      if (act === 'del') { view.selected = null; mutate(p => { p.stickers = p.stickers.filter(x => x.id !== id); }, 'stickers'); }
      if (act === 'dup') { const c = S.sticker({ ...s, id: null, x: s.x + 0.03, y: s.y + 0.03 }); view.selected = c.id; mutate(p => p.stickers.push(c), 'stickers'); }
      if (act === 'front') actions.updateSticker(id, { layer: s.layer === 'below' ? 'above' : 'below' });
      if (act === 'lock') actions.updateSticker(id, { locked: !s.locked });
      if (act === 'deselect') actions.selectSticker(null);
    },
    moveSticker(id, dir) {
      mutate(p => {
        const i = p.stickers.findIndex(s => s.id === id), j = i + dir;
        if (i < 0 || j < 0 || j >= p.stickers.length) return;
        [p.stickers[i], p.stickers[j]] = [p.stickers[j], p.stickers[i]];
      }, 'stickers');
    },
    nudgeSticker(id, dx, dy) {
      const s = active().stickers.find(x => x.id === id);
      if (s && !s.locked) actions.updateSticker(id, { x: s.x + dx, y: s.y + dy }, { live: false });
    },
    async clearStickers() {
      if (await MF.ui.confirm('Retirer tout le décor ?', 'Emojis, stickers, textes et photos de cette grille seront retirés (Ctrl+Z pour annuler).', 'Tout retirer')) {
        view.selected = null;
        mutate(p => { p.stickers = []; }, 'stickers');
      }
    },
    async addPhotos(files) {
      const imgs = files.filter(f => /^image\//.test(f.type));
      if (!imgs.length) { MF.ui.toast('Aucune image reconnue.', 'warn'); return; }
      for (const [i, f] of imgs.slice(0, 12).entries()) {
        try {
          const a = await MF.assets.add(f, f.name);
          actions.addSticker({ kind: 'image', imageId: a.id, ar: a.h / a.w, w: 0.3, x: 0.35 + (i % 3) * 0.15, y: 0.35 + Math.floor(i / 3) * 0.12 });
        } catch (e) { MF.ui.toast(`${MF.util.cleanText(f.name, 40)} : ${e.message}`, 'err', 5000); }
      }
      store.update(s => { s.ui.tab = 'decor'; s.ui.decor = 'images'; }, 'ui');
    },

    /* ---------------- Interface ---------------- */
    setUi(patch) { store.update(s => Object.assign(s.ui, patch), 'ui'); },
    refreshSide() { app.renderSide(); },

    /* ---------------- Grilles & données ---------------- */
    async newPuzzle(defaults = {}) {
      const res = await MF.welcome.wizard(defaults);
      if (!res) return;
      const pz = store.makePuzzle({ name: res.name || MF.games.get(res.game).label, game: res.game, options: { shape: res.shape } });
      pz.design = MF.themes.apply(pz.design, res.theme);
      let words = [];
      if (res.start === 'random') words = MF.pickers.draw({ count: res.count, min: Math.min(res.min, res.max), max: Math.max(res.min, res.max) }, new Set());
      else if (res.start.startsWith('pack:')) words = (MF.packs[res.start.slice(5)]?.words || []).map(([text, clue]) => ({ text, clue }));
      pz.words = words.map(S.word).filter(Boolean);
      view.page = 0; view.selected = null; view.filter = '';
      store.update(s => { s.puzzles.push(pz); s.activeId = pz.id; s.ui.tab = 'words'; s.ui.mode = 'solution'; }, 'puzzles');
      if (!words.length) requestAnimationFrame(() => document.querySelector('#add-form [name=text]')?.focus());
    },
    quickStart(game) {
      return actions.newPuzzle({ game, start: 'random', theme: game === 'meles' ? 'candy' : game === 'codes' ? 'minimal' : game === 'croises' ? 'print' : 'violet' });
    },
    switchPuzzle(id) {
      if (id === store.get().activeId) return;
      view.filter = ''; view.draft = {}; view.page = 0; view.selected = null;
      store.update(s => { s.activeId = id; }, 'active');
    },
    duplicatePuzzle() {
      const src = active();
      const copy = store.makePuzzle({ ...MF.util.deepClone(src), id: null, name: `${src.name} (copie)` });
      store.update(s => { s.puzzles.push(copy); s.activeId = copy.id; }, 'puzzles');
      MF.ui.toast('Grille dupliquée.', 'ok');
    },
    async deletePuzzle() {
      const pz = active();
      const ok = await MF.ui.confirm('Supprimer la grille ?', `« ${pz.name} » et ses ${pz.words.length} mots seront supprimés. (Ctrl+Z pour annuler)`, 'Supprimer');
      if (!ok) return;
      view.selected = null;
      store.update(s => { s.puzzles = s.puzzles.filter(p => p.id !== pz.id); s.activeId = s.puzzles[0]?.id || null; }, 'puzzles');
    },

    /** Sauvegarde complète (JSON), images comprises si demandé. */
    async backup() {
      const s = store.get();
      const withImages = await MF.ui.modal({
        title: 'Sauvegarder mes grilles', size: 'small', icon: 'download',
        body: `<p class="muted small">Un fichier .json contenant toutes tes grilles (${s.puzzles.length}). Garde-le précieusement : il permet de tout restaurer, ici ou sur un autre appareil.</p>
          <label class="check"><input type="checkbox" id="bk-img" checked> Inclure les images (fichier plus lourd)</label>`,
        actions: [{ label: 'Annuler', value: null }, { label: 'Télécharger', kind: 'primary', icon: 'download', value: r => r.querySelector('#bk-img').checked }],
      });
      if (withImages === null) return;
      const assets = {};
      if (withImages) {
        const ids = new Set(s.puzzles.flatMap(p => [p.design.background.imageId, ...p.stickers.map(x => x.imageId)]).filter(Boolean));
        for (const id of ids) { const d = await MF.assets.dataUrl(id); if (d) assets[id] = d; }
      }
      const data = { app: 'mots-fleches-maker', v: 3, exportedAt: new Date().toISOString(), puzzles: s.puzzles, assets };
      MF.util.download(`mes-grilles-${new Date().toISOString().slice(0, 10)}.json`, JSON.stringify(data));
      MF.ui.toast('Sauvegarde téléchargée.', 'ok');
    },
    restore() {
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = '.json,application/json';
      input.onchange = () => { const f = input.files[0]; if (f) actions.openFile(f); };
      input.click();
    },
    /** Ouvre un fichier : sauvegarde complète, liste de mots ou image. */
    async openFile(file) {
      const name = (file.name || '').toLowerCase();
      if (/^image\//.test(file.type)) { if (active()) return actions.addPhotos([file]); MF.ui.toast('Crée d\'abord une grille.', 'warn'); return; }
      if (/\.json$/.test(name)) {
        let data;
        try { data = JSON.parse(await MF.util.readFile(file, 80 * 1024 * 1024)); } catch { MF.ui.toast('Fichier JSON illisible.', 'err'); return; }
        if (S.isObj(data) && Array.isArray(data.puzzles)) return restoreData(data);
      }
      if (!active()) await actions.newPuzzleSilent(file.name.replace(/\.[^.]+$/, ''));
      return actions.importFile(file);
    },
    async newPuzzleSilent(name) {
      const pz = store.makePuzzle({ name: MF.util.cleanText(name, 60) || 'Ma grille' });
      store.update(s => { s.puzzles.push(pz); s.activeId = pz.id; }, 'puzzles');
    },
    async recoverLegacy() {
      const list = store.legacy();
      if (!list.length) return;
      store.update(s => { s.puzzles.push(...list); s.activeId = list[0].id; }, 'puzzles');
      store.forgetLegacy();
      MF.ui.toast(`${plural(list.length, 'grille récupérée', 'grilles récupérées')}.`, 'ok');
    },
    async wipeAll() {
      const ok = await MF.ui.confirm('Effacer toutes tes données ?', 'Grilles, mots, images et progression seront définitivement supprimés de ce navigateur. Pense à « Sauvegarder tout » avant. Cette action ne peut pas être annulée.', 'Tout effacer');
      if (!ok) return;
      await store.wipe();
      MF.ui.toast('Toutes les données locales ont été effacées.', 'ok');
    },

    /* ---------------- Partage ---------------- */
    async share() {
      const pz = active();
      if (!pz?.layout) { MF.ui.toast('Calcule d\'abord la grille.', 'warn'); return; }
      let url;
      try { url = await MF.share.link(pz); } catch (e) { MF.ui.toast(e.message || 'Lien impossible.', 'err'); return; }
      await MF.ui.modal({
        title: 'Partager la grille à jouer', icon: 'share',
        body: `<p class="muted small">Envoie ce lien : on pourra jouer à ta grille directement dans le navigateur, sans compte. La grille est <b>dans le lien lui-même</b> (rien n'est stocké sur un serveur).</p>
          <div class="row share-row"><input class="input mono" id="share-url" readonly value="${MF.util.esc(url)}"><button class="btn btn-primary" id="share-copy">${MF.icons.svg('copy')}Copier</button></div>
          <p class="field-hint">${MF.icons.svg('info', 'ic-inline')} Le lien contient les réponses (pour vérifier) ; les photos importées ne sont pas incluses. ${(url.length / 1024).toFixed(1)} Ko.</p>`,
        onOpen: r => {
          const inp = r.querySelector('#share-url');
          inp.addEventListener('focus', () => inp.select());
          r.querySelector('#share-copy').onclick = async () => {
            try { await navigator.clipboard.writeText(url); MF.ui.toast('Lien copié !', 'ok'); } catch { inp.select(); document.execCommand?.('copy'); }
          };
          if (navigator.share) {
            const b = MF.util.html(`<button class="btn">${MF.icons.svg('share')}Envoyer…</button>`);
            b.onclick = () => navigator.share({ title: pz.name, url }).catch(() => {});
            r.querySelector('.share-row').appendChild(b);
          }
        },
        actions: [{ label: 'Fermer', value: null }],
      });
    },
  };

  async function afterImport(n) {
    if (!n) return;
    const pz = active();
    const missing = MF.games.get(pz.game).clues ? pz.words.filter(w => !w.clue).length : 0;
    MF.ui.toast(`${plural(n, 'mot ajouté', 'mots ajoutés')}${missing ? ` · ${missing} sans définition` : ''}`, 'ok', 5000,
      missing && MF.wiki.isOnline() ? { label: 'Les chercher', run: () => actions.autoDefine() } : null);
  }

  /** Restaure une sauvegarde : images ré-assainies, identifiants remappés. */
  async function restoreData(data) {
    const remap = new Map();
    if (S.isObj(data.assets)) {
      for (const [id, url] of Object.entries(data.assets).slice(0, 500)) {
        const a = await MF.assets.fromDataUrl(url);
        if (a) remap.set(id, a.id);
      }
    }
    const list = data.puzzles.slice(0, S.LIMITS.puzzles).map(p => {
      const pz = store.makePuzzle(p);
      if (pz.design.background.imageId) pz.design.background.imageId = remap.get(pz.design.background.imageId) || '';
      pz.stickers = pz.stickers.filter(s => s.kind !== 'image' || remap.has(s.imageId)).map(s => (s.kind === 'image' ? { ...s, imageId: remap.get(s.imageId) } : s));
      return pz;
    });
    if (!list.length) { MF.ui.toast('Aucune grille dans ce fichier.', 'warn'); return; }
    store.update(s => {
      for (const p of list) {
        const i = s.puzzles.findIndex(x => x.id === p.id);
        if (i >= 0) s.puzzles[i] = p; else s.puzzles.push(p);
      }
      s.activeId = list[0].id;
    }, 'puzzles');
    MF.ui.toast(`${plural(list.length, 'grille restaurée', 'grilles restaurées')}.`, 'ok');
  }

  return actions;
};
