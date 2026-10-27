// @ts-check
/* =========================================================================
   Panneau « Enquête » (Murdoku) : univers, taille et difficulté en vue ;
   personnages, lieux, objets, histoire, scène et rendu dans des sections
   repliables. Tout ce que l'univers propose est modifiable.
   ========================================================================= */
window.MF = window.MF || {};
MF.panels = MF.panels || {};

MF.panels.murdoku = (() => {
  const { esc, plural } = MF.util;
  const { t } = MF.i18n;
  const ic = MF.icons.svg;
  const ui = MF.ui;
  const V = () => MF.murdokuView;

  /** Cartes des univers (défilement horizontal sur téléphone). */
  function themeCards(current, lang, attr = 'data-mdk-theme') {
    return `<div class="mdk-themes" role="radiogroup" aria-label="${esc(t('Univers'))}">${MF.murdokuThemes.ids.map(id => {
      const c = MF.murdokuThemes.card(id, lang);
      return `<button type="button" role="radio" aria-checked="${id === current}" class="mdk-theme ${id === current ? 'active' : ''}" ${attr}="${id}" style="--t1:${c.colors[0]};--t2:${c.colors[1]}"><span class="mdk-theme-emoji" aria-hidden="true">${c.emoji}</span><b>${esc(c.label)}</b><small>${esc(c.tagline)}</small></button>`;
    }).join('')}</div>`;
  }

  /** Niveaux en cartes (étoiles + description). */
  const levelCards = (current, attr = 'data-mdk-level') => `<div class="mdk-levels">${V().LEVELS().map(([id, label, desc, stars]) =>
    `<button type="button" class="mdk-level ${id === current ? 'active' : ''}" ${attr}="${id}" aria-pressed="${id === current}"><span class="mdk-stars" aria-hidden="true">${'★'.repeat(stars)}<i>${'★'.repeat(4 - stars)}</i></span><b>${esc(label)}</b><small>${esc(desc)}</small></button>`).join('')}</div>`;

  function render(root, { puzzle: pz, actions }) {
    const o = V().options(pz.options.murdoku);
    const lang = pz.options.lang === 'en' ? 'en' : 'fr';
    const puzzle = pz.layout?.engine === 'murdoku' ? pz.layout.pages[0] : null;
    const th = MF.murdokuThemes.resolve(o.theme, lang);
    const nSuspects = o.size - 1;
    const set = patch => actions.setOptions({ murdoku: { ...o, ...patch } });
    const fresh = () => MF.util.randomSeed() % 2147483647;
    const current = puzzle ? puzzle.people.filter(p => p.role !== 'victim').map(p => p.name) : [];
    const victimNow = puzzle?.people.find(p => p.role === 'victim')?.name || '';
    // Lieux : ceux de l'univers (ou tous les types pour le manoir), ceux du plan en premier
    const used = new Set(puzzle?.rooms.map(r => r.type) || []);
    const roomTypes = (th.roomTypes.length ? th.roomTypes : MF.murdoku.ROOM_TYPES).slice().sort((a, b) => +used.has(b) - +used.has(a));
    const objTypes = [...new Set(puzzle?.objects.map(x => x.type) || [])];
    const roomBase = type => th.rooms[type] || { name: MF.murdoku.roomLabel(type), in: '' };
    const objBase = type => th.objects[type]?.name || MF.murdoku.objectLabel(type);
    const custom = Object.keys(o.roomNames).length + Object.keys(o.objectNames).length + (o.story ? 1 : 0) + o.names.filter(Boolean).length + (o.victim ? 1 : 0);

    root.innerHTML = `<div class="mdk-panel">
      <div class="field"><span>${t('Univers')}</span>${themeCards(o.theme, lang)}</div>
      <button type="button" class="btn btn-primary btn-lg mdk-new" id="mdk-new">${ic('dice')}${t('Nouvelle enquête')}</button>
      ${puzzle ? `<p class="muted small mdk-summary">${ic('magnifier', 'ic-inline')} ${esc(t('{size} × {size} · {rooms} · {clues}', { size: puzzle.size, rooms: plural(puzzle.rooms.length, 'pièce'), clues: plural(puzzle.clues.length, 'indice') }))}</p>` : ''}
      <div class="field"><span>${t('Difficulté')}</span>${levelCards(o.difficulty)}</div>
      <div class="field"><span>${t('Taille du plateau')}</span>${ui.segmented('size', [5, 6, 7, 8].map(n => [n, `${n} × ${n}`]), o.size, 'data-mdk')}
        <span class="field-hint">${t('{n} suspects et une victime : une personne par ligne et par colonne.', { n: nSuspects })}</span></div>
      <div class="field"><span>${t('Style du plateau')}</span>${ui.segmented('render', [['3d', t('Diorama 3D')], ['2d', t('Plan dessiné')]], o.render, 'data-mdk')}</div>

      ${ui.advanced('mdk-cast', t('Personnages'), `
        <p class="field-hint">${t('Prénoms de l\'univers par défaut : écris par-dessus pour mettre les tiens.')}</p>
        <div class="mdk-names">${Array.from({ length: nSuspects }, (_, i) => `<input class="input" data-name="${i}" maxlength="20" aria-label="${esc(t('Suspect {n}', { n: i + 1 }))}" placeholder="${esc(current[i] || t('Suspect {n}', { n: i + 1 }))}" value="${esc(o.names[i] || '')}">`).join('')}</div>
        <label class="field"><span>${t('Victime')}</span><input class="input" id="mdk-victim" maxlength="20" placeholder="${esc(victimNow || t('Au hasard'))}" value="${esc(o.victim)}"></label>
        <button type="button" class="btn btn-sm" id="mdk-shuffle">${ic('dice')}${t('Réinventer les noms et l\'histoire')}</button>`)}

      ${ui.advanced('mdk-places', t('Lieux'), `
        <p class="field-hint">${t('Renomme les pièces. La seconde case est la façon de le dire dans les indices (« dans la cave »).')}</p>
        <div class="mdk-renames">${roomTypes.map(type => {
          const b = roomBase(type), c = o.roomNames[type] || { name: '', in: '' };
          return `<div class="mdk-rename ${used.has(type) ? '' : 'unused'}"><input class="input" data-room="${type}" data-k="name" maxlength="40" placeholder="${esc(b.name)}" value="${esc(c.name)}" aria-label="${esc(t('Nom de la pièce'))}">
            <input class="input input-sm" data-room="${type}" data-k="in" maxlength="60" placeholder="${esc(c.name ? MF.murdokuThemes.where(c.name, lang) : b.in || '')}" value="${esc(c.in)}" aria-label="${esc(t('Dans les indices'))}"></div>`;
        }).join('')}</div>`)}

      ${objTypes.length ? ui.advanced('mdk-objects', t('Objets'), `
        <p class="field-hint">${t('Les objets de cette enquête. Un objet garde sa règle : on peut s\'asseoir ou s\'allonger sur certains, pas sur les autres.')}</p>
        <div class="mdk-objs">${objTypes.map(type => `<label class="mdk-obj"><span title="${esc(MF.murdoku.OBJECTS[type].occupiable ? t('On peut s\'y tenir') : t('Bloquant'))}">${MF.murdoku.OBJECTS[type].occupiable ? '🪑' : '⛔'}</span><input class="input" data-obj="${type}" maxlength="32" placeholder="${esc(objBase(type))}" value="${esc(o.objectNames[type] || '')}"></label>`).join('')}</div>`) : ''}

      ${ui.advanced('mdk-story', t('Histoire'), `
        <textarea class="input mdk-story-input" id="mdk-story" rows="4" maxlength="600" placeholder="${esc(puzzle?.story || th.story)}">${esc(o.story)}</textarea>
        <span class="field-hint">${t('{victim} est remplacé par le nom de la victime.')}</span>`)}

      ${ui.advanced('mdk-scene', t('Scène'), `
        <div class="field"><span>${t('Pièces')}</span>${ui.segmented('rooms', [['few', t('Peu')], ['normal', t('Normal')], ['many', t('Beaucoup')]], o.rooms, 'data-mdk')}</div>
        <div class="field"><span>${t('Mobilier')}</span>${ui.segmented('density', [['sparse', t('Épuré')], ['normal', t('Normal')], ['full', t('Chargé')]], o.density, 'data-mdk')}</div>`)}

      ${o.render === '3d' ? ui.advanced('mdk-look', t('Rendu'), `
        <div class="field"><span>${t('Style')}</span>${ui.segmented('look', V().LOOKS(), o.look, 'data-mdk')}</div>
        <div class="field"><span>${t('Ambiance')}</span>${ui.segmented('mood', V().MOODS(), o.mood, 'data-mdk')}</div>
        <div class="field"><span>${t('Décor')}</span>${ui.segmented('clutter', [['none', t('Aucun')], ['some', t('Un peu')], ['lots', t('Beaucoup')]], o.clutter, 'data-mdk')}
          <span class="field-hint">${t('Nourriture, livres, tonneaux, coquillages… pour le plaisir des yeux : le décor ne compte pas dans l\'énigme.')}</span></div>
        <div class="field"><span>${t('Vue')}</span>${ui.segmented('camera', [['iso', t('Diorama (3/4)')], ['top', t('De dessus')]], o.camera, 'data-mdk')}</div>
        <label class="check"><input type="checkbox" id="mdk-labels" ${o.labels ? 'checked' : ''}> ${t('Repères des lignes et colonnes')}</label>
        <label class="check"><input type="checkbox" id="mdk-room-labels" ${o.roomLabels ? 'checked' : ''}> ${t('Noms des pièces sur le plateau')}</label>`) : `<label class="check"><input type="checkbox" id="mdk-labels" ${o.labels ? 'checked' : ''}> ${t('Repères des lignes et colonnes')}</label>`}
      ${custom ? `<button type="button" class="btn btn-ghost btn-sm" id="mdk-reset">${ic('undo')}${t('Revenir aux noms de l\'univers')}</button>` : ''}
    </div>`;

    ui.bindAdvanced(root);
    // Univers choisi en vue dans le bandeau (une fois le panneau affiché)
    requestAnimationFrame(() => {
      const card = /** @type {HTMLElement | null} */ (root.querySelector('.mdk-theme.active'));
      if (card?.parentElement) card.parentElement.scrollLeft = card.offsetLeft - card.parentElement.offsetLeft - 8;
    });
    root.querySelector('#mdk-new').addEventListener('click', () => set({ seed: fresh(), flavor: 0 }));
    // Écouteur sur le contenu recréé à chaque rendu (jamais empilé sur le conteneur du panneau)
    root.querySelector('.mdk-panel').addEventListener('click', e => {
      const target = /** @type {any} */ (e.target);
      const th2 = target.closest('[data-mdk-theme]');
      if (th2) {
        const id = th2.dataset.mdkTheme;
        if (id === o.theme) return;
        // Nouvel univers : ses noms, son ambiance, une nouvelle énigme
        const look = MF.murdokuThemes.get(id);
        set({ theme: id, names: [], victim: '', roomNames: {}, objectNames: {}, story: '', look: look.look, mood: look.mood, seed: fresh(), flavor: 0 });
        return;
      }
      const lv = target.closest('[data-mdk-level]');
      if (lv) { set({ difficulty: lv.dataset.mdkLevel, seed: fresh(), flavor: 0 }); return; }
      const b = target.closest('[data-mdk] [data-v]');
      if (!b) return;
      const key = b.parentElement.dataset.mdk;
      set({ [key]: key === 'size' ? +b.dataset.v : b.dataset.v });
    });
    root.querySelector('#mdk-labels').addEventListener('change', e => set({ labels: /** @type {HTMLInputElement} */ (e.target).checked }));
    root.querySelector('#mdk-room-labels')?.addEventListener('change', e => set({ roomLabels: /** @type {HTMLInputElement} */ (e.target).checked }));
    const val = el => /** @type {HTMLInputElement} */ (el).value.trim();
    const names = () => [...root.querySelectorAll('[data-name]')].map(val);
    root.querySelectorAll('[data-name]').forEach(inp => inp.addEventListener('change', () => set({ names: names() })));
    root.querySelector('#mdk-victim')?.addEventListener('change', e => set({ victim: val(e.target) }));
    // Générateur : nouveaux surnoms, victime et histoire, même énigme
    root.querySelector('#mdk-shuffle')?.addEventListener('click', () => set({ flavor: fresh(), names: [], victim: '', story: '' }));
    root.querySelectorAll('[data-room]').forEach(inp => inp.addEventListener('change', () => {
      const type = /** @type {any} */ (inp).dataset.room;
      const get = k => val(root.querySelector(`[data-room="${type}"][data-k="${k}"]`));
      const next = { ...o.roomNames };
      if (get('name') || get('in')) next[type] = { name: get('name'), in: get('in') }; else delete next[type];
      set({ roomNames: next });
    }));
    root.querySelectorAll('[data-obj]').forEach(inp => inp.addEventListener('change', () => {
      const next = { ...o.objectNames, [/** @type {any} */ (inp).dataset.obj]: val(inp) };
      set({ objectNames: Object.fromEntries(Object.entries(next).filter(([, v]) => v)) });
    }));
    root.querySelector('#mdk-story')?.addEventListener('change', e => set({ story: val(e.target) }));
    root.querySelector('#mdk-reset')?.addEventListener('click', () => set({ names: [], victim: '', roomNames: {}, objectNames: {}, story: '' }));
  }

  return Object.assign(render, { themeCards, levelCards });
})();
