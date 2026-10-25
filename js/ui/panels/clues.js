/* =========================================================================
   Panneau « Définitions » : définitions des mots de remplissage, mots
   bannis, mots perso hors grille et points à vérifier.
   ========================================================================= */
window.MF = window.MF || {};
MF.panels = MF.panels || {};

MF.panels.clues = (() => {
  const { esc, normalize, plural } = MF.util;
  const ic = MF.icons.svg;

  function render(root, { puzzle, derived, actions }) {
    const { layout, issues, fillers } = derived;
    const game = MF.games.get(puzzle.game);
    const themes = (game.engine === 'meles' ? MF.wordsearch : MF.builder).prepare(puzzle.words);
    const placed = derived.pageOf.size;
    const missing = fillers.filter(f => !f.clue);
    const total = layout?.words.length || 0;
    const levelIcon = { err: 'alert', warn: 'alert', info: 'info' };
    const outWords = layout ? puzzle.words.filter(w => normalize(w.text).length >= 2 && !derived.pageOf.has(w.id)) : [];

    root.innerHTML = `<div class="diag">
      <div class="kpis">
        <div class="kpi glass-soft"><span class="label">Mes mots</span><span class="value">${placed}<small>/ ${themes.length}</small></span>
          <div class="progress"><i style="width:${themes.length ? (placed / themes.length) * 100 : 0}%"></i></div></div>
        <div class="kpi glass-soft"><span class="label">Mots en tout</span><span class="value">${total}</span><span class="delta">dans la grille</span></div>
        ${game.clues ? `<div class="kpi glass-soft ${missing.length ? 'is-warn' : ''}"><span class="label">À définir</span><span class="value">${missing.length}</span><span class="delta">${missing.length ? 'à écrire' : 'tout est défini ✓'}</span></div>`
          : `<div class="kpi glass-soft"><span class="label">Jeu</span><span class="value kpi-text">${esc(game.short)}</span><span class="delta">sans définitions</span></div>`}
      </div>

      ${game.clues && fillers.length ? `
      <div class="section-title">${ic('edit')}Mots de remplissage <span class="badge">${fillers.length}</span>
        ${missing.length ? `<button type="button" class="btn btn-sm btn-ghost" id="fill-auto">${ic('wand')}Chercher les ${missing.length} manquantes</button>` : ''}</div>
      <p class="muted small">Mots courants ajoutés pour remplir la grille. Personnalise leurs définitions, ou ${ic('x', 'ic-inline muted')} pour ne plus jamais utiliser un mot.</p>
      <div class="filler-list">${fillers.map(f => `
        <div class="filler ${f.clue ? '' : 'missing'}" data-key="${f.key}">
          <span class="fw mono">${esc(f.word)}<small>${f.word.length}</small></span>
          <input class="input input-sm" data-word="${esc(f.word)}" value="${esc(f.clue)}" maxlength="${MF.schema.LIMITS.clue}" placeholder="${f.ready ? esc(f.ready) : 'Écris une définition…'}" spellcheck="true" lang="fr">
          <button type="button" class="btn btn-sm btn-ghost btn-icon" data-find="${esc(f.word)}" title="Chercher une définition">${ic('book')}</button>
          ${f.own && f.ready ? `<button type="button" class="btn btn-sm btn-ghost btn-icon" data-reset="${esc(f.word)}" title="Revenir à « ${esc(f.ready)} »">${ic('refresh')}</button>` : ''}
          <button type="button" class="btn btn-sm btn-ghost btn-icon btn-danger" data-ban="${esc(f.word)}" title="Ne plus utiliser ce mot">${ic('x')}</button>
        </div>`).join('')}</div>` : ''}

      ${puzzle.banned.length ? `
      <div class="section-title">${ic('x')}Mots bannis <span class="badge">${puzzle.banned.length}</span></div>
      <p class="muted small">Jamais utilisés pour remplir la grille (au prochain calcul). Clique pour les autoriser à nouveau.</p>
      <div class="chips">${puzzle.banned.map(w => `<button type="button" class="chip chip-btn mono" data-unban="${esc(w)}">${esc(w)} ${ic('x', 'ic-xs')}</button>`).join('')}</div>` : ''}

      ${outWords.length ? `
      <div class="section-title">${ic('grid')}Mots hors de la grille <span class="badge warn">${outWords.length}</span></div>
      <p class="muted small">Ils n'ont pas trouvé de place. Mets une ${ic('star', 'ic-inline')} aux plus importants puis recalcule, ou agrandis la grille (onglet Grille).</p>
      <div class="chips">${outWords.map(w => `<span class="chip mono" title="${esc(w.clue)}">${esc(normalize(w.text))}</span>`).join(' ')}</div>` : ''}

      ${issues.length ? `<div class="section-title">${ic('alert')}À vérifier</div><div class="checks">${issues.map(it => `
        <div class="check-item ${it.level}" ${it.wid ? `data-wid="${it.wid}"` : ''}>
          ${ic(levelIcon[it.level])}
          <div class="grow"><div><b>${esc(it.title)}</b></div><div class="detail">${esc(it.detail)}</div></div>
        </div>`).join('')}</div>` : (layout ? `<div class="all-good">${ic('check')}<span><b>Tout est en ordre.</b> Ta grille est prête à être exportée.</span></div>` : '')}

      <p class="muted small diag-foot">${layout?.pages?.[0]?.attempts ? `${plural(layout.pages[0].attempts, 'grille essayée', 'grilles essayées')} lors du dernier calcul. ` : ''}« Mélanger » cherche une autre disposition.</p>
    </div>`;

    const box = root.firstElementChild;
    box.querySelectorAll('input[data-word]').forEach(inp => {
      inp.addEventListener('focus', () => actions.focusSlot(inp.closest('[data-key]').dataset.key));
      inp.addEventListener('change', () => actions.setFillerClue(inp.dataset.word, inp.value.trim()));
      inp.addEventListener('keydown', e => {
        if (e.key !== 'Enter') return;
        e.preventDefault();
        const all = [...box.querySelectorAll('input[data-word]')];
        const next = all[all.indexOf(inp) + 1];
        inp.dispatchEvent(new Event('change'));
        requestAnimationFrame(() => root.querySelector(`input[data-word="${next?.dataset.word}"]`)?.focus());
      });
    });
    box.addEventListener('click', async e => {
      const t = e.target.closest('button');
      if (!t) {
        const ci = e.target.closest('[data-wid]');
        if (ci) actions.focusWord(ci.dataset.wid);
        return;
      }
      if (t.dataset.reset) actions.setFillerClue(t.dataset.reset, null);
      if (t.dataset.ban) actions.banWord(t.dataset.ban, true);
      if (t.dataset.unban) actions.banWord(t.dataset.unban, false);
      if (t.dataset.find) {
        const cur = box.querySelector(`input[data-word="${t.dataset.find}"]`)?.value || '';
        const def = await MF.pickers.chooseDefinition(t.dataset.find.charAt(0) + t.dataset.find.slice(1).toLowerCase(), cur);
        if (def) actions.setFillerClue(t.dataset.find, def);
      }
      if (t.id === 'fill-auto') actions.autoDefineFillers(missing.map(f => f.word));
    });
  }

  return render;
})();
