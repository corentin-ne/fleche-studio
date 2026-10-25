/* =========================================================================
   Panneau « Mots » : saisie avec autocomplétion et correction, aide à la
   définition, imports (bibliothèque, thèmes, collage, fichier), liste.
   Les panneaux ne modifient jamais l'état directement : ils appellent
   `actions` (fournies par app.js).
   ========================================================================= */
window.MF = window.MF || {};
MF.panels = MF.panels || {};

MF.panels.words = (() => {
  const { esc, normalize, plural } = MF.util;
  const ic = MF.icons.svg;
  const D = MF.dictionary;
  let statusCtrl = null;

  function render(root, { puzzle, derived, actions, view }) {
    const game = MF.games.get(puzzle.game);
    const hasGrid = !!derived.layout;
    const q = normalize(view.filter);
    const sorters = {
      added: () => 0,
      alpha: (a, b) => normalize(a.text).localeCompare(normalize(b.text)),
      length: (a, b) => normalize(b.text).length - normalize(a.text).length,
      missing: (a, b) => (a.clue ? 1 : 0) - (b.clue ? 1 : 0),
    };
    const list = puzzle.words.filter(w => !q || normalize(w.text + ' ' + w.clue).includes(q)).sort(sorters[view.sort] || sorters.added);
    const stars = puzzle.words.filter(w => w.priority).length;
    const noClue = game.clues ? puzzle.words.filter(w => !w.clue.trim()).length : 0;
    const draft = view.draft;

    const status = w => {
      if (normalize(w.text).length < 2) return ['err', 'Mot trop court'];
      if (!hasGrid) return ['idle', 'Grille pas encore calculée'];
      return derived.pageOf.has(w.id) ? ['ok', derived.pages.length > 1 ? `Grille ${derived.pageOf.get(w.id) + 1}` : 'Dans la grille'] : ['out', 'Pas dans la grille (recalcule ou agrandis-la)'];
    };

    root.innerHTML = `
      <form class="composer glass-soft" id="add-form" autocomplete="off">
        <label class="field"><span>Nouveau mot <span class="field-hint" id="norm-preview"></span></span>
          <input class="input input-lg" name="text" placeholder="Tape un mot : autocomplétion et correction incluses" maxlength="${MF.schema.LIMITS.wordLen}" value="${esc(draft.text || '')}" spellcheck="false" autocapitalize="off"></label>
        <div class="word-status" id="word-status" aria-live="polite"></div>
        ${game.clues ? `<label class="field"><span>Définition <span class="field-hint">courte, c'est mieux</span></span>
          <div class="clue-wrap"><textarea class="textarea" name="clue" rows="2" maxlength="${MF.schema.LIMITS.clue}" placeholder="ex : Il galope dans le pré" spellcheck="true" lang="fr">${esc(draft.clue || '')}</textarea>
          <button type="button" class="btn btn-sm btn-ghost find-def" id="btn-find-def" title="Chercher une définition (dictionnaire, Wiktionnaire, Wikipédia)">${ic('book')}Trouver</button></div></label>`
        : `<p class="muted small game-note">${ic('info')}Pas besoin de définition pour les ${esc(game.label.toLowerCase())}.</p>`}
        <div class="row">
          <button class="btn btn-primary" type="submit">${ic('plus')}Ajouter</button>
          <span class="spacer"></span>
          <span class="muted small"><kbd>Entrée</kbd> pour ajouter</span>
        </div>
      </form>

      <div class="import-row" role="group" aria-label="Ajouter plusieurs mots">
        <button type="button" class="import-btn" data-import="library" title="${D.size().toLocaleString('fr-FR')} mots déjà définis">${ic('book')}Bibliothèque</button>
        <button type="button" class="import-btn" data-import="random" title="Choisis combien de mots et leur longueur">${ic('dice')}Hasard</button>
        <button type="button" class="import-btn" data-import="themes" title="Packs prêts et thèmes du Wiktionnaire">${ic('sparkle')}Thèmes</button>
        <button type="button" class="import-btn" data-import="paste" title="Texte ou colonnes de tableur">${ic('paste')}Coller</button>
        <button type="button" class="import-btn" data-import="file" title="Excel, CSV, TXT, JSON">${ic('file')}Fichier</button>
      </div>

      <div class="list-head">
        <input class="input input-search" id="word-filter" placeholder="Filtrer…" value="${esc(view.filter)}">
        <select class="select select-sm" id="word-sort" aria-label="Trier">
          ${[['added', 'Ordre d\'ajout'], ['alpha', 'A → Z'], ['length', 'Les plus longs'], ['missing', 'Sans définition d\'abord']].map(([v, l]) => `<option value="${v}" ${view.sort === v ? 'selected' : ''}>${l}</option>`).join('')}
        </select>
      </div>
      <div class="list-meta small muted">
        <span>${plural(puzzle.words.length, 'mot')}${stars ? ` · ${ic('star', 'ic-inline')} ${stars}` : ''}</span>
        <span class="spacer"></span>
        ${noClue ? `<button type="button" class="btn btn-sm btn-ghost" id="btn-autodef">${ic('wand')}Définir les ${noClue} manquants</button>` : ''}
        ${puzzle.words.length ? `<button type="button" class="btn btn-sm btn-ghost btn-danger" id="btn-clear-words" title="Supprimer tous les mots">${ic('trash')}</button>` : ''}
      </div>
      <ul class="word-list" id="word-list">
        ${list.map(w => {
          const [st, label] = status(w);
          const norm = normalize(w.text);
          return `<li class="word-item ${st === 'out' ? 'is-out' : ''}" data-id="${w.id}" tabindex="0">
            <button class="star ${w.priority ? 'on' : ''}" data-act="star" title="${w.priority ? 'Retirer la priorité' : 'Prioritaire : placé en premier'}" aria-pressed="${w.priority}">${ic('star')}</button>
            <div class="wi-main">
              <div class="wi-word"><span class="status-dot ${st}" title="${label}"></span><span class="mono">${esc(norm || w.text)}</span><small>${norm.length}</small>${derived.pages.length > 1 && derived.pageOf.has(w.id) ? `<span class="chip page">G${derived.pageOf.get(w.id) + 1}</span>` : ''}</div>
              ${game.clues ? `<div class="wi-clue">${w.clue ? esc(w.clue) : '<button type="button" class="link-btn" data-act="def">+ ajouter une définition</button>'}</div>` : ''}
            </div>
            <div class="wi-actions">
              <button class="btn btn-sm btn-icon btn-ghost" data-act="edit" title="Modifier" aria-label="Modifier">${ic('edit')}</button>
              <button class="btn btn-sm btn-icon btn-ghost btn-danger" data-act="del" title="Supprimer" aria-label="Supprimer">${ic('trash')}</button>
            </div>
          </li>`;
        }).join('') || (puzzle.words.length ? '<li class="empty small">Aucun mot ne correspond.</li>' : `<li class="empty-words">${ic('sparkle')}<b>Ta liste est vide</b><span>Tape un mot ci-dessus, ou pioche dans la bibliothèque et les thèmes.</span></li>`)}
      </ul>
      <input type="file" id="words-file" accept="${MF.importer.ACCEPT}" hidden>`;

    bindComposer(root, puzzle, actions, view, game);

    root.querySelector('.import-row').addEventListener('click', e => {
      const b = e.target.closest('[data-import]'); if (!b) return;
      if (b.dataset.import === 'file') root.querySelector('#words-file').click();
      else actions.importWords(b.dataset.import);
    });
    root.querySelector('#words-file').addEventListener('change', e => {
      const file = e.target.files[0];
      e.target.value = '';
      if (file) actions.importFile(file);
    });
    root.querySelector('#word-filter').addEventListener('input', MF.util.debounce(e => actions.setView({ filter: e.target.value }, '#word-filter'), 150));
    root.querySelector('#word-sort').addEventListener('change', e => actions.setView({ sort: e.target.value }));
    root.querySelector('#btn-autodef')?.addEventListener('click', () => actions.autoDefine());
    root.querySelector('#btn-clear-words')?.addEventListener('click', () => actions.clearWords());

    const wl = root.querySelector('#word-list');
    wl.addEventListener('click', e => {
      const li = e.target.closest('.word-item');
      if (!li) return;
      const act = e.target.closest('[data-act]')?.dataset.act;
      const w = puzzle.words.find(x => x.id === li.dataset.id);
      if (act === 'edit') editWord(w, actions, game);
      else if (act === 'del') actions.deleteWord(w.id);
      else if (act === 'star') actions.toggleStar(w.id);
      else if (act === 'def') findDef(w, actions);
      else actions.focusWord(w.id);
    });
    wl.addEventListener('keydown', e => {
      const li = e.target.closest('.word-item');
      if (!li || e.target !== li) return;
      if (e.key === 'Enter') actions.focusWord(li.dataset.id);
      if (e.key === 'Delete') actions.deleteWord(li.dataset.id);
      if (e.key === 'ArrowDown') { e.preventDefault(); li.nextElementSibling?.focus(); }
      if (e.key === 'ArrowUp') { e.preventDefault(); li.previousElementSibling?.focus(); }
    });
  }

  async function findDef(w, actions) {
    const clue = await MF.pickers.chooseDefinition(w.text, w.clue);
    if (clue !== null && clue !== undefined) actions.updateWord(w.id, { clue });
  }

  /* ---------------- Saisie d'un mot ---------------- */
  function bindComposer(root, puzzle, actions, view, game) {
    const form = root.querySelector('#add-form');
    const text = form.elements.text, clue = form.elements.clue;
    const preview = root.querySelector('#norm-preview');
    const statusEl = root.querySelector('#word-status');
    const existing = new Set(puzzle.words.map(w => normalize(w.text)));

    const setStatus = html => { statusEl.innerHTML = html; };
    const useWord = (value, def) => {
      text.value = value;
      if (clue && def && !clue.value.trim()) clue.value = def;
      view.draft = { text: text.value, clue: clue?.value || '' };
      updatePreview();
      checkWord();
    };
    const updatePreview = () => {
      const n = normalize(text.value);
      preview.textContent = n ? `→ ${n} · ${n.length} lettre${n.length > 1 ? 's' : ''}` : '';
    };

    /* Correction : dictionnaire local d'abord, puis Wiktionnaire (recherche floue) */
    const checkWord = MF.util.debounce(async () => {
      statusCtrl?.abort();
      const raw = text.value.trim(), n = normalize(raw);
      if (n.length < 2) { setStatus(''); return; }
      if (existing.has(n)) { setStatus(`<span class="st warn">${ic('alert')}Déjà dans ta liste</span>`); return; }
      const local = D.clue(n);
      if (local) {
        setStatus(`<span class="st ok">${ic('check')}Mot du dictionnaire</span>${clue && !clue.value.trim() ? `<button type="button" class="chip chip-btn" data-fill="${esc(local)}">${ic('plus', 'ic-xs')}« ${esc(local)} »</button>` : ''}`);
        return;
      }
      const near = D.suggest(raw);
      const chips = list => list.map(s => `<button type="button" class="chip chip-btn" data-use="${esc(s)}">${esc(typeof s === 'string' && s === s.toUpperCase() ? D.pretty(s) : s)}</button>`).join('');
      setStatus(near.length ? `<span class="st">${ic('help')}Vouliez-vous dire</span>${chips(near)}` : `<span class="st muted"><span class="spinner xs"></span>Vérification…</span>`);
      if (!MF.wiki.isOnline()) { if (!near.length) setStatus(`<span class="st muted">${ic('info')}Mot inconnu du dictionnaire (hors ligne)</span>`); return; }
      statusCtrl = new AbortController();
      try {
        const r = await MF.wiki.suggest(raw, { signal: statusCtrl.signal });
        if (text.value.trim() !== raw) return;
        if (r.exists) setStatus(`<span class="st ok">${ic('globe')}Mot du Wiktionnaire</span>${game.clues ? `<button type="button" class="chip chip-btn" data-finddef>${ic('book', 'ic-xs')}Voir ses définitions</button>` : ''}`);
        else {
          const seen = new Set();
          const all = [...near.map(D.pretty), ...r.suggestions].filter(s => !seen.has(normalize(s)) && seen.add(normalize(s))).slice(0, 5);
          const proper = /^[A-ZÀ-Ý]/.test(raw);
          setStatus(all.length
            ? `<span class="st">${ic('help')}Vouliez-vous dire</span>${chips(all)}${proper ? '<span class="st muted">ou nom propre : ok !</span>' : ''}`
            : `<span class="st muted">${ic('info')}${proper ? 'Nom propre ou mot perso : parfait pour une grille perso !' : 'Mot inconnu : vérifie l\'orthographe (ou garde-le, c\'est ta grille !)'}</span>`);
        }
      } catch { if (!near.length) setStatus(''); }
    }, 350);

    updatePreview();
    if (text.value) checkWord();
    text.addEventListener('input', () => { view.draft = { ...view.draft, text: text.value }; updatePreview(); checkWord(); });
    clue?.addEventListener('input', () => { view.draft = { ...view.draft, clue: clue.value }; });
    statusEl.addEventListener('click', e => {
      const use = e.target.closest('[data-use]');
      if (use) { useWord(use.dataset.use, D.clue(use.dataset.use)); text.focus(); }
      const fill = e.target.closest('[data-fill]');
      if (fill && clue) { clue.value = fill.dataset.fill; view.draft.clue = clue.value; clue.focus(); fill.remove(); }
      if (e.target.closest('[data-finddef]')) root.querySelector('#btn-find-def')?.click();
    });

    /* Autocomplétion : suggestions locales tout de suite, puis Wiktionnaire */
    MF.ui.autocomplete(text, {
      source: async (q, signal, show) => {
        const local = D.complete(q, 6).map(x => ({ value: D.pretty(x.word), label: D.pretty(x.word), hint: x.clue, badge: 'dico', clue: x.clue }));
        show(local);
        if (!MF.wiki.isOnline()) return;
        const online = await MF.wiki.complete(q, { signal });
        const seen = new Set(local.map(x => normalize(x.value)));
        show([...local, ...online.filter(t => !seen.has(normalize(t)) && seen.add(normalize(t))).slice(0, 5).map(t => ({ value: t, label: t, badge: 'wiki' }))]);
      },
      onPick: it => useWord(it.value, it.clue),
    });

    root.querySelector('#btn-find-def')?.addEventListener('click', async () => {
      const w = text.value.trim();
      if (normalize(w).length < 2) { MF.ui.toast('Tape d\'abord un mot.', 'warn'); text.focus(); return; }
      const def = await MF.pickers.chooseDefinition(w, clue.value);
      if (def) { clue.value = def; view.draft.clue = def; clue.focus(); }
    });

    form.addEventListener('submit', e => {
      e.preventDefault();
      const data = { text: text.value.trim(), clue: clue?.value.trim() || '' };
      if (normalize(data.text).length < 2) { MF.ui.toast('Le mot doit contenir au moins 2 lettres.', 'err'); text.focus(); return; }
      actions.addWords([data]);
    });
    clue?.addEventListener('keydown', e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); form.requestSubmit(); } });
    text.addEventListener('keydown', e => { if (e.key === 'Enter' && !e.defaultPrevented) { e.preventDefault(); if (clue && !clue.value.trim() && D.clue(text.value)) clue.value = D.clue(text.value); form.requestSubmit(); } });
  }

  /* ---------------- Modifier un mot ---------------- */
  async function editWord(w, actions, game) {
    const res = await MF.ui.modal({
      title: 'Modifier le mot', icon: 'edit',
      body: `<div class="stack">
        <label class="field"><span>Mot</span><input class="input" name="text" value="${esc(w.text)}" maxlength="${MF.schema.LIMITS.wordLen}" autofocus></label>
        ${game.clues ? `<label class="field"><span>Définition</span><textarea class="textarea" name="clue" rows="3" maxlength="${MF.schema.LIMITS.clue}" spellcheck="true" lang="fr">${esc(w.clue)}</textarea></label>
        <button type="button" class="btn btn-sm" id="edit-find">${ic('book')}Chercher une définition</button>` : ''}
        <label class="check"><input type="checkbox" name="priority" ${w.priority ? 'checked' : ''}> Mot prioritaire (placé en premier)</label>
      </div>`,
      onOpen: root => root.querySelector('#edit-find')?.addEventListener('click', async () => {
        const ta = root.querySelector('[name=clue]');
        const def = await MF.pickers.chooseDefinition(root.querySelector('[name=text]').value, ta.value);
        if (def) ta.value = def;
      }),
      actions: [
        { label: 'Annuler', value: null },
        {
          label: 'Enregistrer', kind: 'primary',
          validate: root => normalize(root.querySelector('[name=text]').value).length >= 2 || (MF.ui.toast('Mot trop court.', 'err'), false),
          value: root => ({
            text: root.querySelector('[name=text]').value.trim(),
            clue: root.querySelector('[name=clue]')?.value.trim() ?? w.clue,
            priority: root.querySelector('[name=priority]').checked,
          }),
        },
      ],
    });
    if (res) actions.updateWord(w.id, res);
  }

  return render;
})();
