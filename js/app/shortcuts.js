// @ts-check
/* =========================================================================
   Entrées globales : raccourcis clavier, glisser-déposer de fichiers,
   collage d'images, zoom (Ctrl + molette, deux doigts).
   ========================================================================= */
window.MF = window.MF || {};

MF.shortcuts = (() => {
  const { $ } = MF.util;
  const TABS = ['words', 'diag', 'design', 'decor', 'settings'];

  /**
   * @param {any} c  contexte :
   *   c.view, c.actions        état de vue et actions de l'application
   *   c.showHome(on), c.openExport(), c.setMode(mode), c.cellPx()
   */
  function bind(c) {
    const store = MF.store;
    const { view, actions } = c;
    const isImage = f => /^image\//.test(f.type);

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
      const images = files.filter(isImage);
      if (images.length && store.active()) actions.addPhotos(images);
      for (const f of files.filter(x => !isImage(x))) await actions.openFile(f);
    });

    // Coller une image (Ctrl+V) : ajoutée comme photo
    addEventListener('paste', e => {
      if (/** @type {Element} */ (e.target).closest?.('input, textarea, [contenteditable]') || !store.active()) return;
      const files = [...(e.clipboardData?.files || [])].filter(isImage);
      if (files.length) { e.preventDefault(); actions.addPhotos(files); }
    });

    // Raccourcis clavier
    document.addEventListener('keydown', e => {
      const typing = /** @type {Element} */ (e.target).closest?.('input, textarea, select, [contenteditable]');
      if ((e.ctrlKey || e.metaKey) && !e.altKey && !typing) {
        const k = e.key.toLowerCase();
        if (k === 'z' && !e.shiftKey) { e.preventDefault(); store.undo(); }
        else if (k === 'y' || (k === 'z' && e.shiftKey)) { e.preventDefault(); store.redo(); }
        return;
      }
      // La grille de mots mêlés gère ses propres touches (curseur clavier)
      if (typing || e.ctrlKey || e.metaKey || e.altKey || document.querySelector('.modal-scrim') || /** @type {Element} */ (e.target).closest?.('.ws-layer')) return;
      const pz = store.active();
      if (!pz) { if (e.key === 'n') { e.preventDefault(); actions.newPuzzle(); } return; }
      if (e.key === 'h') { c.showHome(!view.home); return; }
      if (view.home) { if (e.key === 'n') { e.preventDefault(); actions.newPuzzle(); } if (e.key === 'Escape') c.showHome(false); return; }
      if (view.selected && store.get().ui.mode !== 'play') {
        const step = e.shiftKey ? 0.02 : 0.004;
        const moves = { ArrowLeft: [-step, 0], ArrowRight: [step, 0], ArrowUp: [0, -step], ArrowDown: [0, step] };
        if (moves[e.key]) { e.preventDefault(); actions.nudgeSticker(view.selected, ...moves[e.key]); return; }
        if (e.key === 'Delete' || e.key === 'Backspace') { e.preventDefault(); actions.stickerAction('del', view.selected); return; }
        if (e.key === 'Escape') { actions.selectSticker(null); return; }
      }
      if (e.key === 'n') { e.preventDefault(); store.update(s => { s.ui.tab = 'words'; }, 'ui'); requestAnimationFrame(() => $('#add-form [name=text]')?.focus()); }
      if (e.key === 'm') $('#btn-shuffle').click();
      if (e.key === 'e') c.openExport();
      if (e.key === 'p') c.setMode(store.get().ui.mode === 'play' ? 'solution' : 'play');
      if (e.key === '?') MF.help.open();
      if (/^[1-5]$/.test(e.key)) store.update(s => { s.ui.tab = TABS[+e.key - 1]; }, 'ui');
    });

    // Zoom à la molette + Ctrl dans la grille
    const zoomTo = cell => store.update(s => { s.ui.cell = cell; s.ui.fit = false; }, 'zoom');
    $('#grid-scroll').addEventListener('wheel', e => {
      if (!e.ctrlKey) return;
      e.preventDefault();
      const cur = c.cellPx();
      const next = Math.max(10, Math.min(140, cur + (e.deltaY < 0 ? 4 : -4)));
      if (next !== cur) zoomTo(next);
    }, { passive: false });
    // Zoom à deux doigts (téléphone, tablette)
    MF.pinchZoom.attach($('#grid-scroll'), { cell: c.cellPx, commit: zoomTo });
  }

  return { bind };
})();
