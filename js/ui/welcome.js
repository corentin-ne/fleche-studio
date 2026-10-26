// @ts-check
/* =========================================================================
   Accueil (aucune grille) et assistant de création d'une grille.
   ========================================================================= */
window.MF = window.MF || {};

MF.welcome = (() => {
  const { esc, plural } = MF.util;
  const { t } = MF.i18n;
  const ic = MF.icons.svg;

  function render(root, { legacy = 0, onNew, onOpen, onLegacy, onQuick }) {
    root.innerHTML = `<div class="welcome">
      <div class="welcome-hero">
        <span class="hero-logo">${MF.brand.svg()}</span>
        <h1>${t('Crée ta grille de mots, en quelques clics.')}</h1>
        <p class="lead">${t('Mots fléchés, mots croisés, mots mêlés ou mots codés : avec tes mots, tes définitions, ton style. Prête à imprimer ou à partager.')}</p>
        <div class="row hero-actions">
          <button class="btn btn-primary btn-lg" data-w="new">${ic('plus')}${t('Nouvelle grille')}</button>
          <button class="btn btn-lg" data-w="open">${ic('upload')}${t('Ouvrir une sauvegarde')}</button>
        </div>
        ${legacy ? `<button class="btn btn-ghost btn-sm legacy" data-w="legacy">${ic('archive')}${t('Récupérer mes {n} anciennes grilles enregistrées dans ce navigateur', { n: legacy })}</button>` : ''}
      </div>
      <div class="quick-grid">
        ${Object.entries(MF.games.GAMES).map(([id, g]) => `<button class="quick-card glass" data-quick="${id}">${ic(g.icon, 'ic-lg')}<b>${esc(g.label)}</b><span>${esc(g.desc)}</span><em>${t('Créer')} ${ic('chevronRight', 'ic-sm')}</em></button>`).join('')}
      </div>
      <div class="welcome-foot">
        <span>${ic('lock')}${t('Rien n\'est envoyé sur un serveur : tout reste dans ton navigateur.')}</span>
        <span>${ic('book')}${t('{n} mots définis + Wiktionnaire', { n: MF.i18n.num(MF.dictionary.size()) })}</span>
        <span>${ic('palette')}${esc(t('{themes} thèmes · {shapes} formes & lettres · stickers', { themes: Object.keys(MF.themes.THEMES).length, shapes: MF.shapes.ids.length }))}</span>
      </div>
    </div>`;
    root.querySelector('[data-w="new"]').onclick = onNew;
    root.querySelector('[data-w="open"]').onclick = onOpen;
    root.querySelector('[data-w="legacy"]')?.addEventListener('click', onLegacy);
    root.querySelectorAll('[data-quick]').forEach(b => (b.onclick = () => onQuick(b.dataset.quick)));
  }

  /** Assistant : renvoie { name, game, shape, theme, start } ou null. */
  function wizard(defaults = {}) {
    const st = { game: 'fleches', shape: 'rect', theme: 'violet', start: 'empty', lang: MF.lexicon.preferred(), mdkSize: '6', mdkDifficulty: 'medium', ...defaults };
    // Tous les packs à thème de chaque langue, rendus d'avance : changer de langue bascule sur place
    const packCards = lang => Object.entries(MF.lexicon.packs(lang)).map(([id, p]) => `<button type="button" class="start-card" data-wz="start" data-v="pack:${id}" data-lang="${lang}" ${lang === st.lang ? '' : 'hidden'}><span class="pack-emoji">${p.emoji}</span><b>${esc(p.label)}</b><small>${plural(p.words.length, 'mot')}</small></button>`).join('');
    const themes = Object.entries(MF.themes.THEMES);
    return MF.ui.modal({
      title: t('Nouvelle grille'), wide: true, icon: 'sparkle', className: 'wizard',
      body: `<div class="wizard-body">
        <label class="field"><span>${t('Nom')}</span><input class="input input-lg" id="wz-name" maxlength="${MF.schema.LIMITS.name}" placeholder="${esc(t('ex : Anniversaire de Léa, Révisions CM2…'))}" autofocus></label>
        <div class="field"><span>${t('Jeu')}</span><div class="game-grid compact">${Object.entries(MF.games.GAMES).map(([id, g]) => `<button type="button" class="game-card ${id === st.game ? 'active' : ''}" data-wz="game" data-v="${id}">${ic(g.icon)}<b>${esc(g.label)}</b></button>`).join('')}</div></div>
        <div class="field"><span>${t('Langue des mots')}</span>${MF.ui.segmented('lang', MF.lexicon.ids.map(l => [l, MF.lexicon.LANGS[l].label]), st.lang, 'data-wz-lang')}</div>
        <div class="field wz-words"><span>${t('Forme')}</span>${MF.shapePicker.html(st.shape, { compact: true, attrs: id => `data-wz="shape" data-v="${id}"` })}</div>
        <div class="field wz-mdk"><span>${t('Taille du plateau')}</span><div class="segmented">${[5, 6, 7, 8].map(n => `<button type="button" data-wz="mdkSize" data-v="${n}" class="${String(n) === st.mdkSize ? 'active' : ''}">${n} × ${n}</button>`).join('')}</div></div>
        <div class="field wz-mdk"><span>${t('Difficulté')}</span><div class="segmented">${[['easy', t('Facile')], ['medium', t('Moyen')], ['hard', t('Difficile')]].map(([v, l]) => `<button type="button" data-wz="mdkDifficulty" data-v="${v}" class="${v === st.mdkDifficulty ? 'active' : ''}">${esc(l)}</button>`).join('')}</div>
          <span class="field-hint">${t('Une enquête est créée tout de suite : tu pourras la régénérer et tout régler ensuite.')}</span></div>
        <div class="field"><span>${t('Style')} <span class="field-hint">${t('modifiable à tout moment dans Design')}</span></span><div class="theme-strip">${themes.map(([id, th]) => {
          const { bg, C } = MF.themes.swatch(id);
          return `<button type="button" class="theme-chip ${id === st.theme ? 'active' : ''}" data-wz="theme" data-v="${id}"><span style="background:${esc(bg)}"><i style="background:${C.frame}"></i><i style="background:${C.clue}"></i></span>${esc(th.label)}</button>`;
        }).join('')}</div></div>
        <div class="field wz-words"><span>${t('Pour commencer')}</span><div class="start-grid">
          <button type="button" class="start-card ${st.start === 'empty' ? 'active' : ''}" data-wz="start" data-v="empty">${ic('edit')}<b>${t('Mes propres mots')}</b><small>${t('Liste vide')}</small></button>
          <button type="button" class="start-card ${st.start === 'random' ? 'active' : ''}" data-wz="start" data-v="random">${ic('dice')}<b>${t('Mots au hasard')}</b><small>${t('nombre au choix')}</small></button>
          ${MF.lexicon.ids.map(packCards).join('')}
        </div>
        <div class="row wz-random" ${st.start === 'random' ? '' : 'hidden'}>
          <label class="field mini"><span class="field-hint">${t('Nombre de mots')}</span><input class="input" type="number" id="wz-count" min="1" max="200" value="20"></label>
          <label class="field mini"><span class="field-hint">${t('Lettres min.')}</span><input class="input" type="number" id="wz-min" min="2" max="15" value="3"></label>
          <label class="field mini"><span class="field-hint">${t('Lettres max.')}</span><input class="input" type="number" id="wz-max" min="2" max="15" value="9"></label>
        </div></div>
      </div>`,
      onOpen: root => {
        MF.shapePicker.bind(root);
        // Murdoku : ni forme ni liste de mots, mais une taille et une difficulté
        const syncGame = () => {
          const mdk = st.game === 'murdoku';
          root.querySelectorAll('.wz-words').forEach(x => { x.hidden = mdk; });
          root.querySelectorAll('.wz-mdk').forEach(x => { x.hidden = !mdk; });
        };
        syncGame();
        root.addEventListener('click', e => {
          const lb = e.target.closest('[data-wz-lang] [data-v]');
          if (lb) {
            st.lang = lb.dataset.v;
            lb.parentElement.querySelectorAll('[data-v]').forEach(x => x.classList.toggle('active', x === lb));
            root.querySelectorAll('[data-lang]').forEach(x => { x.hidden = x.dataset.lang !== st.lang; });
            // Un pack de l'autre langue ne peut pas rester choisi
            if (st.start.startsWith('pack:')) { st.start = 'empty'; root.querySelectorAll('[data-wz="start"]').forEach(x => x.classList.toggle('active', x.dataset.v === 'empty')); }
            return;
          }
          const b = e.target.closest('[data-wz]');
          if (!b) return;
          st[b.dataset.wz] = b.dataset.v;
          root.querySelectorAll(`[data-wz="${b.dataset.wz}"]`).forEach(x => x.classList.toggle('active', x === b));
          root.querySelector('.wz-random').hidden = st.start !== 'random';
          if (b.dataset.wz === 'game') syncGame();
        });
        root.querySelector('#wz-name').addEventListener('keydown', e => { if (e.key === 'Enter') root.querySelector('.modal-foot .btn-primary').click(); });
      },
      actions: [{ label: t('Annuler'), value: null }, { label: t('Créer la grille'), kind: 'primary', icon: 'sparkle', value: root => {
        const n = id => parseInt(root.querySelector(id).value, 10);
        return { ...st, name: root.querySelector('#wz-name').value.trim(), count: MF.util.clamp(n('#wz-count') || 20, 1, 200), min: MF.util.clamp(n('#wz-min') || 3, 2, 15), max: MF.util.clamp(n('#wz-max') || 9, 2, 15) };
      } }],
    });
  }

  return { render, wizard };
})();
