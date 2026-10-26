/* =========================================================================
   Panneau « Décor » : emojis, stickers, textes et photos posés sur l'affiche,
   calques, et réglages de l'élément sélectionné.
   ========================================================================= */
window.MF = window.MF || {};
MF.panels = MF.panels || {};

MF.panels.decor = (() => {
  const { esc } = MF.util;
  const ic = MF.icons.svg;
  const ui = MF.ui;
  const { t } = MF.i18n;
  const QUICK_TEXTS = ['Joyeux anniversaire !', 'Bravo !', 'À toi de jouer', 'Solutions au dos', 'Bonne chance !', 'Félicitations', 'Je t\'aime', 'Bonnes vacances'].map(q => t(q));
  const fontOptions = v => Object.entries(MF.design.FONTS).map(([id, f]) => `<option value="${id}" ${id === v ? 'selected' : ''} style="font-family:${esc(f.css)}">${esc(f.label)}</option>`).join('');

  function libraryHtml(tab, view) {
    if (tab === 'emoji') {
      const cats = Object.keys(MF.stickers.EMOJIS);
      const cat = cats.includes(view.emojiCat) ? view.emojiCat : cats[0];
      return `<div class="chips emoji-cats">${cats.map(c => `<button type="button" class="chip chip-btn ${c === cat ? 'active' : ''}" data-emoji-cat="${esc(c)}">${esc(t(c))}</button>`).join('')}</div>
        <div class="emoji-grid">${MF.stickers.EMOJIS[cat].map(e => `<button type="button" data-emoji="${esc(e)}" aria-label="${esc(e)}">${esc(e)}</button>`).join('')}</div>`;
    }
    if (tab === 'shapes') {
      return `<div class="sticker-grid">${Object.entries(MF.stickers.SHAPES).map(([id, s]) => `<button type="button" data-shape="${id}" title="${esc(s.label)}">${MF.stickers.preview(id)}</button>`).join('')}</div>`;
    }
    if (tab === 'text') {
      return `<div class="stack">
        <textarea class="textarea" id="new-text" rows="2" maxlength="${MF.schema.LIMITS.text}" placeholder="${esc(t('Ton texte (Entrée + Maj pour aller à la ligne)'))}"></textarea>
        <div class="row"><select class="select select-sm grow" id="new-text-font">${fontOptions('baloo')}</select>
          <label class="color-swatch sm" style="--c:#231f20" title="${esc(t('Couleur'))}"><input type="color" id="new-text-color" value="#231f20"></label>
          <button type="button" class="btn btn-primary btn-sm" id="add-text">${ic('plus')}${t('Ajouter')}</button></div>
        <div class="chips">${QUICK_TEXTS.map(q => `<button type="button" class="chip chip-btn" data-quick="${esc(q)}">${esc(q)}</button>`).join('')}</div>
      </div>`;
    }
    return `<div class="dropzone small-drop" id="photo-drop">${ic('image')}<b>${t('Ajoute tes photos')}</b><span class="muted small">${t('Clique ou glisse des images ici (PNG, JPEG, WebP)')}</span></div>
      <div class="asset-grid" id="asset-grid"><span class="muted small">${t('Chargement…')}</span></div>
      <p class="field-hint">${ic('shield', 'ic-inline')} ${t('Les images sont nettoyées (métadonnées GPS/EXIF retirées) et restent uniquement dans ce navigateur.')}</p>`;
  }

  function propsHtml(s, d) {
    const common = `
      ${ui.slider('w', t('Taille'), s.w, 1, 150, 1, '%', { div: 100 })}
      ${ui.slider('rot', t('Rotation'), Math.round(s.rot), -180, 180, 1, '°')}
      ${ui.slider('opacity', t('Opacité'), s.opacity, 0.05, 1, 0.05)}
      <div class="field"><span>${t('Plan')}</span>${ui.segmented('layer', [['above', t('Devant la grille')], ['below', t('Derrière la grille')]], s.layer)}</div>
      <div class="row">
        <label class="check"><input type="checkbox" data-toggle="flip" ${s.flip ? 'checked' : ''}> ${t('Miroir')}</label>
        <label class="check"><input type="checkbox" data-toggle="shadow" ${s.shadow ? 'checked' : ''}> ${t('Ombre')}</label>
        <label class="check"><input type="checkbox" data-toggle="locked" ${s.locked ? 'checked' : ''}> ${t('Verrouillé')}</label>
      </div>`;
    let specific = '';
    if (s.kind === 'shape') specific = `<div class="color-row">${ui.colorField('color', t('Couleur'), s.color)}${MF.stickers.SHAPES[s.shape].paths.some(p => p.fill === 'second' || p.stroke === 'second') ? ui.colorField('color2', t('Couleur 2'), s.color2) : ''}</div>`;
    if (s.kind === 'image') specific = `<div class="field"><span>${t('Forme')}</span>${ui.segmented('mask', [['none', t('Aucune')], ['rounded', t('Arrondie')], ['circle', t('Ronde')], ['heart', t('Cœur')], ['star', t('Étoile')]], s.mask)}</div>
      ${ui.slider('border', t('Bordure'), s.border, 0, 40, 1)}<div class="color-row">${ui.colorField('borderColor', t('Couleur de bordure'), s.borderColor)}</div>
      ${s.layer === 'below' && d.voids !== 'transparent' ? `<p class="field-hint">${ic('info', 'ic-inline')} ${t('Derrière la grille, la photo n\'apparaît que dans les zones transparentes : choisis « Cases vides : Transparentes » dans Design.')}</p>` : ''}`;
    if (s.kind === 'text') specific = `<textarea class="textarea" data-text="text" rows="2" maxlength="${MF.schema.LIMITS.text}">${esc(s.text)}</textarea>
      <div class="row"><select class="select select-sm grow" data-select="font">${fontOptions(s.font)}</select></div>
      <div class="field"><span>${t('Alignement')}</span>${ui.segmented('align', [['left', t('Gauche')], ['center', t('Centre')], ['right', t('Droite')]], s.align)}</div>
      <div class="color-row">${ui.colorField('color', t('Texte'), s.color)}${ui.colorField('bg', t('Fond'), s.bg === 'none' ? '#ffffff' : s.bg)}</div>
      ${s.bg !== 'none' ? `<button type="button" class="btn btn-sm btn-ghost" data-nobg>${t('Sans fond')}</button>` : ''}`;
    return `<div class="props glass-soft">
      <div class="props-head"><b>${esc(label(s))}</b><span class="spacer"></span>
        <button type="button" class="btn btn-sm btn-ghost btn-icon" data-act="dup" title="${esc(t('Dupliquer'))}">${ic('copy')}</button>
        <button type="button" class="btn btn-sm btn-ghost btn-icon btn-danger" data-act="del" title="${esc(t('Supprimer'))}">${ic('trash')}</button>
        <button type="button" class="btn btn-sm btn-ghost btn-icon" data-act="deselect" title="${esc(t('Désélectionner'))}">${ic('x')}</button></div>
      ${specific}${common}</div>`;
  }

  const label = s => (s.kind === 'emoji' ? t('Emoji {emoji}', { emoji: s.emoji }) : s.kind === 'shape' ? MF.stickers.SHAPES[s.shape]?.label || t('Sticker') : s.kind === 'image' ? t('Photo') : t('« {text} »', { text: `${s.text.slice(0, 22)}${s.text.length > 22 ? '…' : ''}` }));
  const thumb = s => (s.kind === 'emoji' ? `<span class="layer-emoji">${esc(s.emoji)}</span>` : s.kind === 'shape' ? MF.stickers.preview(s.shape, s.color, s.color2)
    : s.kind === 'image' ? (MF.assets.url(s.imageId) ? `<span class="layer-img" style="background-image:url('${esc(MF.assets.url(s.imageId))}')"></span>` : ic('image')) : ic('type'));

  function render(root, { puzzle, actions, view, state }) {
    const tab = state.ui.decor;
    const sel = puzzle.stickers.find(s => s.id === view.selected);
    const layers = [...puzzle.stickers].reverse();
    root.innerHTML = `<div class="decor-panel">
      <div class="segmented decor-tabs" id="decor-tabs">${[['emoji', t('Emojis'), 'smile'], ['shapes', t('Stickers'), 'shapes'], ['text', t('Texte'), 'type'], ['images', t('Photos'), 'image']].map(([v, l, i]) => `<button type="button" data-v="${v}" class="${tab === v ? 'active' : ''}">${ic(i)}${l}</button>`).join('')}</div>
      <div class="decor-lib">${libraryHtml(tab, view)}</div>
      ${sel ? propsHtml(sel, puzzle.design) : `<p class="field-hint decor-tip">${ic('info', 'ic-inline')} ${t('Clique un élément sur l\'affiche pour le sélectionner : glisse pour le déplacer, poignées pour la taille et la rotation. <kbd>Suppr</kbd> efface, flèches pour ajuster.')}</p>`}
      ${puzzle.stickers.length ? `<div class="section-title">${ic('layers')}${t('Calques')} <span class="badge">${puzzle.stickers.length}</span><span class="spacer"></span><button type="button" class="btn btn-sm btn-ghost btn-danger" data-clear-stickers>${ic('trash')}${t('Tout retirer')}</button></div>
      <ul class="layer-list">${layers.map(s => `<li class="layer ${s.id === view.selected ? 'active' : ''}" data-layer="${s.id}">
          <span class="layer-thumb">${thumb(s)}</span><span class="grow">${esc(label(s))}<small>${s.layer === 'below' ? t('derrière la grille') : t('devant')}${s.locked ? ` · ${t('verrouillé')}` : ''}</small></span>
          <button type="button" class="btn btn-sm btn-ghost btn-icon" data-move="up" title="${esc(t('Monter'))}">${ic('arrowUp')}</button>
          <button type="button" class="btn btn-sm btn-ghost btn-icon" data-move="down" title="${esc(t('Descendre'))}">${ic('arrowDown')}</button>
        </li>`).join('')}</ul>` : ''}
      <input type="file" id="photo-file" accept="${MF.assets.ACCEPT.join(',')}" multiple hidden>
    </div>`;
    bind(root, puzzle, actions, view, sel);
    if (tab === 'images') fillAssets(root, actions);
  }

  async function fillAssets(root, actions) {
    const grid = root.querySelector('#asset-grid');
    const list = await MF.assets.list();
    await MF.assets.ensure(list.map(a => a.id));
    if (!grid.isConnected) return;
    grid.innerHTML = list.length ? list.sort((a, b) => b.at - a.at).map(a => `<button type="button" class="asset" data-asset="${a.id}" title="${esc(t('Ajouter cette image'))}" style="background-image:url('${esc(MF.assets.url(a.id))}')"></button>`).join('') : `<span class="muted small">${t('Aucune image importée pour l\'instant.')}</span>`;
    grid.addEventListener('click', e => {
      const b = e.target.closest('[data-asset]');
      if (b) { const a = list.find(x => x.id === b.dataset.asset); actions.addSticker({ kind: 'image', imageId: a.id, ar: a.h / a.w, w: 0.3 }); }
    });
  }

  function bind(root, puzzle, actions, view, sel) {
    root.querySelector('#decor-tabs').addEventListener('click', e => { const b = e.target.closest('button'); if (b) actions.setUi({ decor: b.dataset.v }); });
    const photoFile = root.querySelector('#photo-file');
    photoFile.addEventListener('change', () => { const files = [...photoFile.files]; photoFile.value = ''; if (files.length) actions.addPhotos(files); });
    const drop = root.querySelector('#photo-drop');
    if (drop) {
      drop.onclick = () => photoFile.click();
      drop.addEventListener('dragover', e => { e.preventDefault(); drop.classList.add('over'); });
      drop.addEventListener('dragleave', () => drop.classList.remove('over'));
      drop.addEventListener('drop', e => { e.preventDefault(); e.stopPropagation(); drop.classList.remove('over'); actions.addPhotos([...e.dataTransfer.files]); });
    }
    const addText = (text, font, color) => {
      if (!text.trim()) { MF.ui.toast(t('Écris d\'abord un texte.'), 'warn'); return; }
      actions.addSticker({ kind: 'text', text: text.trim(), font, color, w: 0.42 });
    };
    root.querySelector('#add-text')?.addEventListener('click', () => addText(root.querySelector('#new-text').value, root.querySelector('#new-text-font').value, root.querySelector('#new-text-color').value));
    root.querySelector('#new-text')?.addEventListener('keydown', e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); root.querySelector('#add-text').click(); } });
    root.querySelector('#new-text-color')?.addEventListener('input', e => e.target.parentElement.style.setProperty('--c', e.target.value));

    root.addEventListener('click', e => {
      const t = e.target.closest('button, li[data-layer]');
      if (!t) return;
      if (t.dataset.emojiCat) { view.emojiCat = t.dataset.emojiCat; actions.refreshSide(); }
      else if (t.dataset.emoji) actions.addSticker({ kind: 'emoji', emoji: t.dataset.emoji, w: 0.1 });
      else if (t.dataset.shape) { const s = MF.stickers.SHAPES[t.dataset.shape]; actions.addSticker({ kind: 'shape', shape: t.dataset.shape, color: s.main, color2: s.second || '#ffffff', w: 0.16 }); }
      else if (t.dataset.quick) addText(t.dataset.quick, 'baloo', '#231f20');
      else if (t.dataset.move) { e.stopPropagation(); actions.moveSticker(t.closest('[data-layer]').dataset.layer, t.dataset.move === 'up' ? 1 : -1); }
      else if (t.dataset.layer) actions.selectSticker(t.dataset.layer);
      else if (t.hasAttribute('data-clear-stickers')) actions.clearStickers();
      else if (t.dataset.act && sel) actions.stickerAction(t.dataset.act, sel.id);
      else if (t.hasAttribute('data-nobg') && sel) actions.updateSticker(sel.id, { bg: 'none' });
      else if (sel) { const seg = t.closest('[data-seg]'); if (seg) actions.updateSticker(sel.id, { [seg.dataset.seg]: MF.util.parseValue(t.dataset.v) }); }
    });
    if (!sel) return;
    // Réglages de l'élément sélectionné : un texte vide n'est jamais enregistré
    ui.bindFields(root.querySelector('.props'), (key, value, live) => {
      if (key === 'text' && !String(value).trim()) return;
      actions.updateSticker(sel.id, { [key]: value }, { live });
    });
  }

  return render;
})();
