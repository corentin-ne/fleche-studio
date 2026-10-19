/* =========================================================================
   Panneaux latéraux : Mots, Définitions (diagnostic), Réglages + modales associées.
   Les panneaux ne modifient jamais l'état directement : ils appellent `actions`
   (fournies par app.js), ce qui garde la logique métier en un seul endroit.
   ========================================================================= */
window.MF = window.MF || {};

MF.panels = (() => {
  const { esc, normalize, plural } = MF.util;
  const ic = MF.icons.svg;

  /* =================== Mots perso =================== */
  function words(root, { puzzle, derived, actions, filter = '', draft = {} }) {
    const pageOf = derived.pageOf;
    const multi = derived.pages.length > 1;
    const hasGrid = !!derived.layout;
    const q = normalize(filter);
    const list = puzzle.words.filter(w => !q || normalize(w.text + ' ' + w.clue + ' ' + w.author).includes(q));
    const stars = puzzle.words.filter(w => w.priority).length;

    const status = w => {
      if (normalize(w.text).length < 2) return ['idle', 'Mot invalide'];
      if (!hasGrid) return ['idle', 'Grille pas encore calculée'];
      return pageOf.has(w.id) ? ['ok', multi ? `Grille ${pageOf.get(w.id) + 1}` : 'Dans la grille'] : ['out', 'Pas encore dans la grille (recalcule)'];
    };

    root.innerHTML = `
      <form class="add-form glass-soft" id="add-form" autocomplete="off">
        <div class="add-row">
          <label class="field grow"><span>Mot <span class="field-hint" id="norm-preview"></span></span>
            <input class="input" name="text" placeholder="ex : Clichy" required value="${esc(draft.text || '')}"></label>
          <label class="field author"><span>De la part de</span>
            <input class="input" name="author" placeholder="Prénom" list="authors" value="${esc(draft.author || '')}"></label>
        </div>
        <label class="field"><span>Définition</span>
          <textarea class="textarea" name="clue" rows="2" placeholder="ex : Plus belle ville de France, juste devant Malakoff">${esc(draft.clue || '')}</textarea></label>
        <div class="row">
          <button class="btn btn-primary" type="submit">${ic('plus')}Ajouter</button>
          <button class="btn" type="button" id="btn-bulk">${ic('paste')}Coller une liste</button>
          <span class="spacer"></span>
          <kbd>Entrée</kbd>
        </div>
        <datalist id="authors">${[...new Set(puzzle.words.map(w => w.author).filter(Boolean))].map(a => `<option value="${esc(a)}">`).join('')}</datalist>
      </form>
      <p class="muted small star-hint">${ic('star')} Étoile = mot prioritaire : placé en premier dans la grille.${stars ? ` <b>${plural(stars, 'mot prioritaire', 'mots prioritaires')}</b>.` : ''}</p>
      <div class="list-head">
        <input class="input input-search" id="word-filter" placeholder="Filtrer les mots…" value="${esc(filter)}">
      </div>
      <ul class="word-list" id="word-list">
        ${list.map(w => {
          const [st, label] = status(w);
          const norm = normalize(w.text);
          return `<li class="word-item ${st === 'out' ? 'is-out' : ''}" data-id="${w.id}" tabindex="0">
            <button class="star ${w.priority ? 'on' : ''}" data-act="star" title="${w.priority ? 'Retirer la priorité' : 'Mot prioritaire'}" aria-pressed="${w.priority}">${ic('star')}</button>
            <div class="wi-main">
              <div class="wi-word"><span class="status-dot ${st}" title="${label}"></span><span class="mono">${esc(norm || w.text)}</span><small>${norm.length}</small>${multi && pageOf.has(w.id) ? `<span class="chip page">G${pageOf.get(w.id) + 1}</span>` : ''}${w.author ? `<span class="chip">${esc(w.author)}</span>` : ''}</div>
              <div class="wi-clue">${esc(w.clue) || '<i class="muted">Sans définition</i>'}</div>
            </div>
            <div class="wi-actions">
              <button class="btn btn-sm btn-icon btn-ghost" data-act="edit" title="Modifier" aria-label="Modifier">${ic('edit')}</button>
              <button class="btn btn-sm btn-icon btn-ghost btn-danger" data-act="del" title="Supprimer" aria-label="Supprimer">${ic('trash')}</button>
            </div>
          </li>`;
        }).join('') || `<li class="empty small">Aucun mot${q ? ' ne correspond' : ''}.</li>`}
      </ul>`;

    const form = root.querySelector('#add-form');
    const preview = root.querySelector('#norm-preview');
    const textInput = form.elements.text;
    const updatePreview = () => {
      const n = normalize(textInput.value);
      preview.textContent = n ? `→ ${n} (${n.length})` : '';
    };
    updatePreview();
    textInput.addEventListener('input', updatePreview);
    form.addEventListener('submit', e => {
      e.preventDefault();
      const data = { text: textInput.value.trim(), clue: form.elements.clue.value.trim(), author: form.elements.author.value.trim() };
      if (normalize(data.text).length < 2) { MF.ui.toast('Le mot doit contenir au moins 2 lettres.', 'err'); return; }
      actions.addWords([data], { keepAuthor: data.author });
    });
    form.elements.clue.addEventListener('keydown', e => {
      if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); form.requestSubmit(); }
    });
    root.querySelector('#btn-bulk').onclick = () => bulkImport(puzzle, actions);
    root.querySelector('#word-filter').addEventListener('input', MF.util.debounce(e => actions.setFilter(e.target.value), 150));

    root.querySelector('#word-list').addEventListener('click', e => {
      const li = e.target.closest('.word-item');
      if (!li) return;
      const act = e.target.closest('[data-act]')?.dataset.act;
      const w = puzzle.words.find(x => x.id === li.dataset.id);
      if (act === 'edit') editWord(w, actions);
      else if (act === 'del') actions.deleteWord(w.id);
      else if (act === 'star') actions.toggleStar(w.id);
      else actions.focusWord(w.id);
    });
    root.querySelector('#word-list').addEventListener('keydown', e => {
      const li = e.target.closest('.word-item');
      if (li && e.key === 'Enter') actions.focusWord(li.dataset.id);
      if (li && e.key === 'Delete') actions.deleteWord(li.dataset.id);
    });
  }

  function wordFields(w = {}) {
    return `
      <div class="stack">
        <label class="field"><span>Mot</span><input class="input" name="text" value="${esc(w.text)}" autofocus></label>
        <label class="field"><span>Définition</span><textarea class="textarea" name="clue" rows="3">${esc(w.clue)}</textarea></label>
        <label class="field"><span>De la part de</span><input class="input" name="author" value="${esc(w.author)}"></label>
      </div>`;
  }

  async function editWord(w, actions) {
    const res = await MF.ui.modal({
      title: 'Modifier le mot',
      body: wordFields(w),
      actions: [
        { label: 'Annuler', value: null },
        {
          label: 'Enregistrer', kind: 'primary',
          validate: root => normalize(root.querySelector('[name=text]').value).length >= 2 || (MF.ui.toast('Mot trop court.', 'err'), false),
          value: root => ({
            text: root.querySelector('[name=text]').value.trim(),
            clue: root.querySelector('[name=clue]').value.trim(),
            author: root.querySelector('[name=author]').value.trim(),
          }),
        },
      ],
    });
    if (res) actions.updateWord(w.id, res);
  }

  /**
   * Lecture d'une liste collée (depuis un tableur ou un texte) :
   *   Prénom ⇥ Mot ⇥ Définition   (3 colonnes, comme le tableau d'origine)
   *   Mot ⇥ Définition  |  Mot ; Définition  |  Mot : Définition
   * Un prénom vide reprend le précédent ; les en-têtes et lignes « ex: » sont ignorés.
   */
  function parseList(text) {
    const out = [];
    let author = '';
    for (const raw of text.split(/\r?\n/)) {
      const line = raw.trim();
      if (!line || /^ex\s*:/i.test(line) || /^pr[ée]nom\b/i.test(line) || /^pour\s/i.test(line)) continue;
      let cols;
      if (raw.includes('\t')) cols = raw.split('\t').map(s => s.trim());
      else if (line.includes(';')) cols = line.split(';').map(s => s.trim());
      else if (/\s[:—–-]\s/.test(line)) cols = line.split(/\s[:—–-]\s/).map(s => s.trim());
      else cols = [line];
      let who = '', word, clue;
      if (cols.length >= 3) [who, word, clue] = [cols[0], cols[1], cols.slice(2).join(' ')];
      else [word, clue = ''] = cols;
      if (who) author = who;
      if (normalize(word).length < 2) continue;
      out.push({ text: word, clue, author: who || author });
    }
    return out;
  }

  async function bulkImport(puzzle, actions) {
    const res = await MF.ui.modal({
      title: `Coller une liste dans « ${puzzle.name} »`,
      wide: true,
      body: `
        <p class="muted small">Copie directement les lignes de ton tableau (colonnes <b>Prénom ⇥ Mot ⇥ Définition</b>) ou écris une ligne par mot au format <code>Mot ; Définition</code>.</p>
        <textarea class="textarea tall mono" id="bulk-text" autofocus placeholder="Léa&#9;Clichy&#9;Plus belle ville de France&#10;Kiff ; Mot très utilisé pendant les campagnes"></textarea>
        <div class="bulk-preview small" id="bulk-preview"></div>`,
      onOpen: root => {
        const ta = root.querySelector('#bulk-text');
        const pv = root.querySelector('#bulk-preview');
        const existing = new Set(puzzle.words.map(w => normalize(w.text)));
        ta.addEventListener('input', () => {
          const rows = parseList(ta.value);
          const dup = rows.filter(r => existing.has(normalize(r.text))).length;
          pv.innerHTML = rows.length
            ? `<b>${plural(rows.length, 'mot détecté', 'mots détectés')}</b>${dup ? ` · <span class="warn-text">${plural(dup, 'déjà présent', 'déjà présents')}</span>` : ''} — ${rows.slice(0, 12).map(r => `<span class="chip mono">${esc(normalize(r.text))}</span>`).join(' ')}${rows.length > 12 ? ' …' : ''}`
            : '<span class="muted">Rien à importer pour l\'instant.</span>';
        });
        ta.dispatchEvent(new Event('input'));
      },
      actions: [
        { label: 'Annuler', value: null },
        { label: 'Ajouter les mots', kind: 'primary', icon: 'plus', value: root => parseList(root.querySelector('#bulk-text').value) },
      ],
    });
    if (res?.length) actions.addWords(res);
  }

  /* =================== Définitions & diagnostic =================== */
  function diag(root, { puzzle, derived, actions }) {
    const { layout, issues, fillers } = derived;
    const themes = MF.builder.prepare(puzzle.words);
    const placed = derived.pageOf.size;
    const missing = fillers.filter(f => !f.clue);
    const total = layout?.words.length || 0;
    const levelIcon = { err: 'alert', warn: 'alert', info: 'info' };
    const outWords = layout ? puzzle.words.filter(w => normalize(w.text).length >= 2 && !derived.pageOf.has(w.id)) : [];

    root.innerHTML = `<div class="diag">
      <div class="kpis">
        <div class="kpi glass-soft"><span class="label">Mots perso</span><span class="value">${placed}<small>/ ${themes.length}</small></span>
          <div class="progress"><i style="width:${themes.length ? (placed / themes.length) * 100 : 0}%"></i></div></div>
        <div class="kpi glass-soft"><span class="label">Mots en tout</span><span class="value">${total}</span><span class="delta">dans la grille</span></div>
        <div class="kpi glass-soft ${missing.length ? 'is-warn' : ''}"><span class="label">À définir</span><span class="value">${missing.length}</span><span class="delta">${missing.length ? 'définitions à écrire' : 'tout est défini ✓'}</span></div>
      </div>

      ${fillers.length ? `
      <div class="section-title">${ic('edit')}Définitions des mots de remplissage</div>
      <p class="muted small">Mots courants ajoutés pour combler la grille autour des vôtres. ${missing.length ? `<b>${plural(missing.length, 'définition manque', 'définitions manquent')}</b> : écris-les ci-dessous (une blague perso marche très bien !).` : 'Toutes ont une définition : tu peux les personnaliser.'}</p>
      <div class="filler-list">${fillers.map(f => `
        <label class="filler ${f.clue ? '' : 'missing'}" data-key="${f.key}">
          <span class="fw mono">${esc(f.word)}<small>${f.word.length}</small></span>
          <input class="input input-sm" data-word="${esc(f.word)}" value="${esc(f.clue)}" placeholder="${f.ready ? esc(f.ready) : 'Écris une définition…'}">
          ${f.own && f.ready ? `<button type="button" class="btn btn-sm btn-ghost btn-icon" data-reset="${esc(f.word)}" title="Revenir à « ${esc(f.ready)} »">${ic('refresh')}</button>` : ''}
        </label>`).join('')}</div>` : ''}

      ${outWords.length ? `
      <div class="section-title">${ic('grid')}Mots perso hors de cette grille <span class="badge">${outWords.length}</span></div>
      <p class="muted small">Une seule grille A4 ne peut pas tous les contenir. Mets une ${ic('star', 'ic-inline')} aux plus importants (onglet Mots) puis recalcule, ou prends une grille plus grande dans Réglages.</p>
      <div class="chips">${outWords.map(w => `<span class="chip mono" title="${esc(w.clue)}">${esc(normalize(w.text))}</span>`).join(' ')}</div>` : ''}

      ${issues.length ? `<div class="section-title">${ic('alert')}À vérifier</div><div class="checks">${issues.map(it => `
        <div class="check-item ${it.level}">
          ${ic(levelIcon[it.level])}
          <div class="grow"><div><b>${esc(it.title)}</b></div><div class="detail">${esc(it.detail)}</div></div>
        </div>`).join('')}</div>` : ''}

      <p class="muted small diag-foot">${layout?.attempts ? `${plural(layout.attempts, 'grille essayée', 'grilles essayées')} lors du dernier calcul. ` : ''}« Mélanger » cherche une autre grille. Pour placer plus de mots perso : plus d'effort ou une grille plus grande (Réglages).</p>
    </div>`;

    const box = root.firstElementChild;
    box.querySelectorAll('input[data-word]').forEach(inp => {
      inp.addEventListener('focus', () => actions.focusSlot(inp.closest('[data-key]').dataset.key));
      inp.addEventListener('change', () => actions.setFillerClue(inp.dataset.word, inp.value.trim()));
      inp.addEventListener('keydown', e => {
        if (e.key !== 'Enter') return;
        e.preventDefault();
        // Entrée : passe à la définition suivante
        const all = [...box.querySelectorAll('input[data-word]')];
        all[all.indexOf(inp) + 1]?.focus();
        inp.dispatchEvent(new Event('change'));
      });
    });
    box.querySelectorAll('[data-reset]').forEach(b => (b.onclick = () => actions.setFillerClue(b.dataset.reset, null)));
  }

  /* =================== Réglages =================== */
  // Formats proches de l'A4 portrait, comme en magazine
  const SIZE_PRESETS = [[13, 17, 'A4 compact'], [15, 21, 'A4 standard'], [17, 24, 'A4 grand'], [15, 15, 'Carré']];
  const PRESETS = ['#e8212b', '#3db54a', '#f0457f', '#7b3fe4', '#ffb000', '#ff6a1a', '#1f8fff', '#16a394'];

  function settings(root, { puzzle, state, actions }) {
    const o = puzzle.options;
    const seg = (name, items, value) => `<div class="segmented" data-opt="${name}">${items.map(([v, l]) => `<button type="button" data-v="${v}" class="${String(value) === String(v) ? 'active' : ''}">${l}</button>`).join('')}</div>`;
    root.innerHTML = `
      <div class="stack settings">
        <label class="field"><span>Nom de la grille</span><input class="input" id="set-name" value="${esc(puzzle.name)}"></label>

        <div class="field"><span>Couleur (DA)</span>
          <div class="swatches">
            ${PRESETS.map(c => `<button type="button" class="swatch-btn ${c === puzzle.accent ? 'active' : ''}" data-color="${c}" style="--c:${c}" aria-label="${c}"></button>`).join('')}
            <label class="swatch-btn custom" title="Couleur personnalisée" style="--c:${puzzle.accent}"><input type="color" id="set-color" value="${puzzle.accent}"></label>
          </div>
        </div>

        <div class="field"><span>Nombre de grilles</span>${seg('pages', [[1, '1 grille'], [2, '2 grilles (moitié-moitié)']], o.pages || 1)}
          <span class="field-hint">À 2 grilles, les mots perso sont partagés équitablement : des grilles plus petites, plus lisibles à l'impression.</span></div>

        <div class="field"><span>Remplissage</span>${seg('fillers', [[true, 'Mots perso + mots courants'], [false, 'Mots perso uniquement']], o.fillers !== false)}
          <span class="field-hint">Les mots courants comblent les trous autour de vos mots (tous déjà définis).</span></div>

        <div class="field"><span>Cases définitions</span>${seg('clueFill', [['tint', 'Teintées'], ['white', 'Blanches']], o.clueFill || 'tint')}</div>

        <div class="field"><span>Repères des cases photo</span>
          <div class="segmented" id="set-photo-marks">${[[false, 'Masqués'], [true, 'Affichés']].map(([v, l]) => `<button type="button" data-v="${v}" class="${!!state.ui.photoMarks === v ? 'active' : ''}">${l}</button>`).join('')}</div>
          <span class="field-hint">Icône image dans les cases vides, à l'écran seulement (jamais à l'export).</span></div>

        <div class="field"><span>Bande photo en haut</span>${seg('photoBand', [[0, 'Aucune'], [4, '4 lignes'], [5, '5 lignes'], [6, '6 lignes'], [8, '8 lignes']], +o.photoBand || 0)}
          <span class="field-hint">Lignes du haut laissées pleines dans la couleur, sur toute la largeur : la place pour poser les photos dans Canva.</span></div>

        <div class="field"><span>Taille de la grille</span>${seg('size', [['auto', 'Auto : tous les mots'], ['fixed', 'Fixe']], o.size || 'auto')}
          <span class="field-hint">${o.size === 'fixed'
            ? 'Le maximum de mots perso dans la taille choisie ; les autres sont listés dans Définitions.'
            : 'La grille (format A4) s’agrandit jusqu’à contenir tous vos mots perso.'}</span></div>

        ${o.size === 'fixed' ? `<div class="field"><span>Dimensions <span class="field-hint">colonnes × lignes</span></span>
          <div class="size-presets">${SIZE_PRESETS.map(([cols, rows, label]) => `<button type="button" data-size="${cols}x${rows}" class="${o.cols === cols && o.rows === rows ? 'active' : ''}">${label} · ${cols}×${rows}</button>`).join('')}</div>
          <div class="row">
            <label class="field mini"><span class="field-hint">Colonnes</span><input class="input" type="number" min="7" max="30" id="set-cols" value="${o.cols}"></label>
            <span class="muted">×</span>
            <label class="field mini"><span class="field-hint">Lignes</span><input class="input" type="number" min="7" max="40" id="set-rows" value="${o.rows}"></label>
          </div>
          <span class="field-hint">Plus grande = plus de mots perso, mais des cases plus petites à l'impression.</span>
        </div>` : ''}

        <div class="field"><span>Effort de recherche</span>${seg('effort', [['fast', 'Rapide'], ['normal', 'Normal'], ['deep', 'Approfondi']], o.effort)}
          <span class="field-hint">Plus d'effort = plus de dispositions essayées, donc plus de mots perso placés.</span></div>

        <hr class="divider">
        <div class="row">
          <button class="btn" id="set-dup">${ic('copy')}Dupliquer</button>
          <button class="btn btn-danger" id="set-del" ${state.puzzles.length < 2 ? 'disabled' : ''}>${ic('trash')}Supprimer la grille</button>
        </div>
        <button class="btn btn-ghost btn-danger btn-sm reset" id="set-reset">${ic('refresh')}Réinitialiser toutes les données</button>
      </div>`;

    root.querySelector('#set-name').addEventListener('change', e => actions.setPuzzle({ name: e.target.value.trim() || puzzle.name }));
    root.querySelectorAll('[data-color]').forEach(b => (b.onclick = () => actions.setPuzzle({ accent: b.dataset.color })));
    root.querySelector('#set-color').addEventListener('input', MF.util.debounce(e => actions.setPuzzle({ accent: e.target.value }), 120));
    root.querySelectorAll('[data-opt]').forEach(group => group.addEventListener('click', e => {
      const b = e.target.closest('button'); if (!b) return;
      const v = b.dataset.v;
      actions.setOption(group.dataset.opt, v === 'true' ? true : v === 'false' ? false : /^\d+$/.test(v) ? +v : v);
    }));
    const num = (id, k, max) => root.querySelector(id)?.addEventListener('change', e => actions.setOption(k, Math.min(max, Math.max(7, parseInt(e.target.value, 10) || 7))));
    num('#set-cols', 'cols', 30);
    num('#set-rows', 'rows', 40);
    root.querySelectorAll('[data-size]').forEach(b => (b.onclick = () => {
      const [cols, rows] = b.dataset.size.split('x').map(Number);
      actions.setOptions({ cols, rows });
    }));
    root.querySelector('#set-photo-marks').addEventListener('click', e => {
      const b = e.target.closest('button'); if (b) actions.setPhotoMarks(b.dataset.v === 'true');
    });
    root.querySelector('#set-dup').onclick = actions.duplicatePuzzle;
    root.querySelector('#set-del').onclick = actions.deletePuzzle;
    root.querySelector('#set-reset').onclick = actions.resetAll;
  }

  return { words, diag, settings, parseList };
})();
