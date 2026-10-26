// @ts-check
/* =========================================================================
   Panneau « Enquête » (Murdoku) : une nouvelle enquête en un clic ; taille
   et difficulté en vue ; pièces, mobilier, noms et rendu dans les réglages
   avancés (repliés : le parcours de base reste simple).
   ========================================================================= */
window.MF = window.MF || {};
MF.panels = MF.panels || {};

MF.panels.murdoku = (() => {
  const { esc, plural } = MF.util;
  const { t } = MF.i18n;
  const ic = MF.icons.svg;
  const ui = MF.ui;

  function render(root, { puzzle: pz, actions }) {
    const o = MF.murdokuView.options(pz.options.murdoku);
    const puzzle = pz.layout?.engine === 'murdoku' ? pz.layout.pages[0] : null;
    const nSuspects = o.size - 1;
    const set = patch => actions.setOptions({ murdoku: { ...o, ...patch } });

    root.innerHTML = `<div class="mdk-panel">
      <button type="button" class="btn btn-primary btn-lg mdk-new" id="mdk-new">${ic('dice')}${t('Nouvelle enquête')}</button>
      ${puzzle ? `<p class="muted small mdk-summary">${ic('magnifier', 'ic-inline')} ${esc(t('{size} × {size} · {rooms} · {clues}', { size: puzzle.size, rooms: plural(puzzle.rooms.length, 'pièce'), clues: plural(puzzle.clues.length, 'indice') }))}</p>` : ''}
      <div class="field"><span>${t('Taille du plateau')}</span>${ui.segmented('size', [5, 6, 7, 8].map(n => [n, `${n} × ${n}`]), o.size, 'data-mdk')}
        <span class="field-hint">${t('{n} suspects et une victime : une personne par ligne et par colonne.', { n: nSuspects })}</span></div>
      <div class="field"><span>${t('Difficulté')}</span>${ui.segmented('difficulty', [['easy', t('Facile')], ['medium', t('Moyen')], ['hard', t('Difficile')]], o.difficulty, 'data-mdk')}</div>
      <div class="field"><span>${t('Style du plateau')}</span>${ui.segmented('render', [['3d', t('Diorama 3D')], ['2d', t('Plan dessiné')]], o.render, 'data-mdk')}</div>

      ${ui.advanced('mdk-scene', t('Scène'), `
        <div class="field"><span>${t('Pièces')}</span>${ui.segmented('rooms', [['few', t('Peu')], ['normal', t('Normal')], ['many', t('Beaucoup')]], o.rooms, 'data-mdk')}</div>
        <div class="field"><span>${t('Mobilier')}</span>${ui.segmented('density', [['sparse', t('Épuré')], ['normal', t('Normal')], ['full', t('Chargé')]], o.density, 'data-mdk')}</div>`)}

      ${ui.advanced('mdk-cast', t('Personnages'), `
        <p class="field-hint">${t('Laisse vide pour des prénoms choisis au hasard.')}</p>
        <div class="mdk-names">${Array.from({ length: nSuspects }, (_, i) => `<input class="input" data-name="${i}" maxlength="16" placeholder="${esc(t('Suspect {n}', { n: i + 1 }))}" value="${esc(o.names[i] || '')}">`).join('')}</div>
        <label class="field"><span>${t('Victime')}</span><input class="input" id="mdk-victim" maxlength="16" placeholder="${esc(t('Au hasard'))}" value="${esc(o.victim)}"></label>`)}

      ${o.render === '3d' ? ui.advanced('mdk-look', t('Rendu'), `
        <div class="field"><span>${t('Style')}</span>${ui.segmented('look', MF.murdokuView.LOOKS(), o.look, 'data-mdk')}</div>
        <div class="field"><span>${t('Ambiance')}</span>${ui.segmented('mood', MF.murdokuView.MOODS(), o.mood, 'data-mdk')}</div>
        <div class="field"><span>${t('Vue')}</span>${ui.segmented('camera', [['iso', t('Diorama (3/4)')], ['top', t('De dessus')]], o.camera, 'data-mdk')}</div>
        <label class="check"><input type="checkbox" id="mdk-labels" ${o.labels ? 'checked' : ''}> ${t('Repères des lignes et colonnes')}</label>`) : `<label class="check"><input type="checkbox" id="mdk-labels" ${o.labels ? 'checked' : ''}> ${t('Repères des lignes et colonnes')}</label>`}
    </div>`;

    ui.bindAdvanced(root);
    root.querySelector('#mdk-new').addEventListener('click', () => set({ seed: MF.util.randomSeed() % 2147483647 }));
    // Écouteur sur le contenu recréé à chaque rendu (jamais empilé sur le conteneur du panneau)
    root.querySelector('.mdk-panel').addEventListener('click', e => {
      const b = /** @type {any} */ (e.target).closest('[data-mdk] [data-v]');
      if (!b) return;
      const key = b.parentElement.dataset.mdk;
      set({ [key]: key === 'size' ? +b.dataset.v : b.dataset.v });
    });
    root.querySelector('#mdk-labels').addEventListener('change', e => set({ labels: /** @type {HTMLInputElement} */ (e.target).checked }));
    const names = () => [...root.querySelectorAll('[data-name]')].map(i => /** @type {HTMLInputElement} */ (i).value.trim());
    root.querySelectorAll('[data-name]').forEach(inp => inp.addEventListener('change', () => set({ names: names() })));
    root.querySelector('#mdk-victim')?.addEventListener('change', e => set({ victim: /** @type {HTMLInputElement} */ (e.target).value.trim() }));
  }

  return render;
})();
