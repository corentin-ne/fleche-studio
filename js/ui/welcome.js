/* =========================================================================
   Accueil (aucune grille) et assistant de création d'une grille.
   ========================================================================= */
window.MF = window.MF || {};

MF.welcome = (() => {
  const { esc } = MF.util;
  const ic = MF.icons.svg;

  function render(root, { legacy = 0, onNew, onOpen, onLegacy, onQuick }) {
    root.innerHTML = `<div class="welcome">
      <div class="welcome-hero">
        <div class="hero-mark" aria-hidden="true">${heroGrid()}</div>
        <h1>Crée ta grille de mots, en quelques clics.</h1>
        <p class="lead">Mots fléchés, mots croisés, mots mêlés ou mots codés : avec tes mots, tes définitions, ton style. Prête à imprimer ou à partager.</p>
        <div class="row hero-actions">
          <button class="btn btn-primary btn-lg" data-w="new">${ic('plus')}Nouvelle grille</button>
          <button class="btn btn-lg" data-w="open">${ic('upload')}Ouvrir une sauvegarde</button>
        </div>
        ${legacy ? `<button class="btn btn-ghost btn-sm legacy" data-w="legacy">${ic('archive')}Récupérer mes ${legacy} anciennes grilles enregistrées dans ce navigateur</button>` : ''}
      </div>
      <div class="quick-grid">
        ${Object.entries(MF.games.GAMES).map(([id, g]) => `<button class="quick-card glass" data-quick="${id}">${ic(g.icon, 'ic-lg')}<b>${esc(g.label)}</b><span>${esc(g.desc)}</span><em>Créer ${ic('chevronRight', 'ic-sm')}</em></button>`).join('')}
      </div>
      <div class="welcome-foot">
        <span>${ic('lock')}Rien n'est envoyé sur un serveur : tout reste dans ton navigateur.</span>
        <span>${ic('book')}${MF.dictionary.size().toLocaleString('fr-FR')} mots définis + Wiktionnaire</span>
        <span>${ic('palette')}${Object.keys(MF.themes.THEMES).length} thèmes · ${MF.shapes.ids.length} formes · stickers</span>
      </div>
    </div>`;
    root.querySelector('[data-w="new"]').onclick = onNew;
    root.querySelector('[data-w="open"]').onclick = onOpen;
    root.querySelector('[data-w="legacy"]')?.addEventListener('click', onLegacy);
    root.querySelectorAll('[data-quick]').forEach(b => (b.onclick = () => onQuick(b.dataset.quick)));
  }

  /** Petite grille décorative animée. */
  function heroGrid() {
    const word = 'FLECHES';
    return `<div class="hero-grid">${[...word].map((ch, i) => `<span style="--i:${i}">${ch}</span>`).join('')}</div>`;
  }

  /** Assistant : renvoie { name, game, shape, theme, start } ou null. */
  function wizard(defaults = {}) {
    const st = { game: 'fleches', shape: 'rect', theme: 'violet', start: 'empty', ...defaults };
    const themes = Object.entries(MF.themes.THEMES);
    return MF.ui.modal({
      title: 'Nouvelle grille', wide: true, icon: 'sparkle', className: 'wizard',
      body: `<div class="wizard-body">
        <label class="field"><span>Nom</span><input class="input input-lg" id="wz-name" maxlength="${MF.schema.LIMITS.name}" placeholder="ex : Anniversaire de Léa, Révisions CM2…" autofocus></label>
        <div class="field"><span>Jeu</span><div class="game-grid compact">${Object.entries(MF.games.GAMES).map(([id, g]) => `<button type="button" class="game-card ${id === st.game ? 'active' : ''}" data-wz="game" data-v="${id}">${ic(g.icon)}<b>${esc(g.label)}</b></button>`).join('')}</div></div>
        <div class="field"><span>Forme</span><div class="shape-grid compact">${MF.shapes.ids.map(id => `<button type="button" class="shape-btn ${id === st.shape ? 'active' : ''}" data-wz="shape" data-v="${id}" title="${esc(MF.shapes.SHAPES[id].label)}">${MF.shapes.preview(id, 11)}<span>${esc(MF.shapes.SHAPES[id].label)}</span></button>`).join('')}</div></div>
        <div class="field"><span>Style <span class="field-hint">modifiable à tout moment dans Design</span></span><div class="theme-strip">${themes.map(([id, t]) => {
          const { bg, C } = MF.themes.swatch(id);
          return `<button type="button" class="theme-chip ${id === st.theme ? 'active' : ''}" data-wz="theme" data-v="${id}"><span style="background:${esc(bg)}"><i style="background:${C.frame}"></i><i style="background:${C.clue}"></i></span>${esc(t.label)}</button>`;
        }).join('')}</div></div>
        <div class="field"><span>Pour commencer</span><div class="start-grid">
          <button type="button" class="start-card ${st.start === 'empty' ? 'active' : ''}" data-wz="start" data-v="empty">${ic('edit')}<b>Mes propres mots</b><small>Liste vide</small></button>
          <button type="button" class="start-card ${st.start === 'random' ? 'active' : ''}" data-wz="start" data-v="random">${ic('dice')}<b>Mots au hasard</b><small>nombre au choix</small></button>
          ${Object.entries(MF.packs).slice(0, 6).map(([id, p]) => `<button type="button" class="start-card" data-wz="start" data-v="pack:${id}"><span class="pack-emoji">${p.emoji}</span><b>${esc(p.label)}</b><small>${p.words.length} mots</small></button>`).join('')}
        </div>
        <div class="row wz-random" ${st.start === 'random' ? '' : 'hidden'}>
          <label class="field mini"><span class="field-hint">Nombre de mots</span><input class="input" type="number" id="wz-count" min="1" max="200" value="20"></label>
          <label class="field mini"><span class="field-hint">Lettres min.</span><input class="input" type="number" id="wz-min" min="2" max="15" value="3"></label>
          <label class="field mini"><span class="field-hint">Lettres max.</span><input class="input" type="number" id="wz-max" min="2" max="15" value="9"></label>
        </div></div>
      </div>`,
      onOpen: root => {
        root.addEventListener('click', e => {
          const b = e.target.closest('[data-wz]');
          if (!b) return;
          st[b.dataset.wz] = b.dataset.v;
          root.querySelectorAll(`[data-wz="${b.dataset.wz}"]`).forEach(x => x.classList.toggle('active', x === b));
          root.querySelector('.wz-random').hidden = st.start !== 'random';
        });
        root.querySelector('#wz-name').addEventListener('keydown', e => { if (e.key === 'Enter') root.querySelector('.modal-foot .btn-primary').click(); });
      },
      actions: [{ label: 'Annuler', value: null }, { label: 'Créer la grille', kind: 'primary', icon: 'sparkle', value: root => {
        const n = id => parseInt(root.querySelector(id).value, 10);
        return { ...st, name: root.querySelector('#wz-name').value.trim(), count: MF.util.clamp(n('#wz-count') || 20, 1, 200), min: MF.util.clamp(n('#wz-min') || 3, 2, 15), max: MF.util.clamp(n('#wz-max') || 9, 2, 15) };
      } }],
    });
  }

  return { render, wizard };
})();
