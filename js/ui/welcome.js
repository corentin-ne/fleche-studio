// @ts-check
/* =========================================================================
   Accueil (aucune grille) et assistant de création d'une grille.
   ========================================================================= */
window.MF = window.MF || {};

MF.welcome = (() => {
  const { esc, plural } = MF.util;
  const { t } = MF.i18n;
  const ic = MF.icons.svg;

  let seen = false;
  function render(root, { legacy = 0, onNew, onOpen, onLegacy, onQuick }) {
    root.innerHTML = `<div class="welcome${seen ? ' seen' : ''}">
      <div class="welcome-hero">
        <span class="hero-logo">${MF.brand.svg()}</span>
        <h1>${t('Crée ta grille de mots, en quelques clics.')}</h1>
        <p class="lead">${t('Mots fléchés, croisés, mêlés, sudoku, picross, logigrammes… : avec tes mots, ton style. Prêts à imprimer ou à partager.')}</p>
        <div class="row hero-actions">
          <button class="btn btn-primary btn-lg" data-w="new">${ic('plus')}${t('Nouvelle grille')}</button>
          <button class="btn btn-lg" data-w="open">${ic('upload')}${t('Ouvrir une sauvegarde')}</button>
        </div>
        ${legacy ? `<button class="btn btn-ghost btn-sm legacy" data-w="legacy">${ic('archive')}${t('Récupérer mes {n} anciennes grilles enregistrées dans ce navigateur', { n: legacy })}</button>` : ''}
      </div>
      ${MF.games.FAMILIES.map(([f, label]) => `<section class="quick-family"><h2>${esc(label)}</h2><div class="quick-grid">
        ${Object.entries(MF.games.GAMES).filter(([, g]) => g.family === f).map(([id, g]) => `<button class="quick-card glass" data-quick="${id}">${ic(g.icon, 'ic-lg')}<b>${esc(g.label)}</b><span>${esc(g.desc)}</span><em>${t('Créer')} ${ic('chevronRight', 'ic-sm')}</em></button>`).join('')}
      </div></section>`).join('')}
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
    seen = true;
  }

  /**
   * Assistant de création, en trois étapes (pensé d'abord pour le téléphone) :
   * 1. le jeu, 2. le contenu (mots ou univers d'enquête), 3. les réglages et le nom.
   * « Créer » est possible à chaque étape : les valeurs par défaut suffisent.
   * Renvoie { name, game, shape, theme, start, lang, … } ou null.
   */
  function wizard(defaults = {}) {
    const st = { game: 'fleches', shape: 'rect', theme: 'violet', start: 'empty', lang: MF.lexicon.preferred(), mdkSize: '6', mdkDifficulty: 'medium', mdkTheme: 'manor', mdkRender: '3d', level: 'medium', ...defaults };
    const isLogic = () => MF.games.get(st.game).engine === 'logic';
    let step = defaults.game ? 1 : 0;
    const STEPS = 3;
    // Tous les packs à thème de chaque langue, rendus d'avance : changer de langue bascule sur place
    const packCards = lang => Object.entries(MF.lexicon.packs(lang)).map(([id, p]) => `<button type="button" class="start-card" data-wz="start" data-v="pack:${id}" data-lang="${lang}" ${lang === st.lang ? '' : 'hidden'}><span class="pack-emoji">${p.emoji}</span><b>${esc(p.label)}</b><small>${plural(p.words.length, 'mot')}</small></button>`).join('');
    // Styles de grille dans l'ordre de la bibliothèque (MF.library)
    const themes = MF.library.list('2d').map(e => [e.grid, MF.themes.THEMES[e.grid]]);
    const mdkThemes = lang => MF.panels.murdoku.themeCards(st.mdkTheme, lang, 'data-wz-mdk-theme');
    const stepNames = () => (st.game === 'murdoku' ? [t('Jeu'), t('Univers'), t('Enquête')] : isLogic() ? [t('Jeu'), t('Niveau'), t('Style')] : [t('Jeu'), t('Mots'), t('Style')]);
    const sizeCard = n => `<button type="button" class="wz-size ${String(n) === st.mdkSize ? 'active' : ''}" data-wz="mdkSize" data-v="${n}"><b>${n} × ${n}</b><small>${esc(t('{n} suspects', { n: n - 1 }))}</small></button>`;
    return MF.ui.modal({
      title: t('Nouvelle grille'), wide: true, icon: 'sparkle', className: 'wizard',
      body: `<div class="wizard-body">
        <ol class="wz-steps" aria-label="${esc(t('Étapes'))}"></ol>

        <section class="wz-step" data-step="0">
          <h4 class="wz-title">${t('Que veux-tu créer ?')}</h4>
          ${MF.games.FAMILIES.map(([f, label]) => `<h5 class="wz-family">${esc(label)}</h5><div class="wz-games">${Object.entries(MF.games.GAMES).filter(([, g]) => g.family === f).map(([id, g]) => `<button type="button" class="wz-game ${id === st.game ? 'active' : ''}" data-wz="game" data-v="${id}">${ic(g.icon, 'ic-lg')}<span><b>${esc(g.label)}</b><small>${esc(g.desc)}</small></span>${ic('chevronRight', 'ic-sm')}</button>`).join('')}</div>`).join('')}
        </section>

        <section class="wz-step" data-step="1" hidden>
          <div class="wz-words">
            <h4 class="wz-title">${t('Avec quels mots ?')}</h4>
            <div class="field"><span>${t('Langue des mots')}</span>${MF.ui.segmented('lang', MF.lexicon.ids.map(l => [l, MF.lexicon.LANGS[l].label]), st.lang, 'data-wz-lang')}</div>
            <div class="start-grid">
              <button type="button" class="start-card ${st.start === 'empty' ? 'active' : ''}" data-wz="start" data-v="empty">${ic('edit')}<b>${t('Mes propres mots')}</b><small>${t('Liste vide')}</small></button>
              <button type="button" class="start-card ${st.start === 'random' ? 'active' : ''}" data-wz="start" data-v="random">${ic('dice')}<b>${t('Mots au hasard')}</b><small>${t('nombre au choix')}</small></button>
              ${MF.lexicon.ids.map(packCards).join('')}
            </div>
            <div class="row wz-random" ${st.start === 'random' ? '' : 'hidden'}>
              <label class="field mini"><span class="field-hint">${t('Nombre de mots')}</span><input class="input" type="number" inputmode="numeric" id="wz-count" min="1" max="200" value="20"></label>
              <label class="field mini"><span class="field-hint">${t('Lettres min.')}</span><input class="input" type="number" inputmode="numeric" id="wz-min" min="2" max="15" value="3"></label>
              <label class="field mini"><span class="field-hint">${t('Lettres max.')}</span><input class="input" type="number" inputmode="numeric" id="wz-max" min="2" max="15" value="9"></label>
            </div>
          </div>
          <div class="wz-logic">
            <h4 class="wz-title">${t('Quel niveau ?')}</h4>
            <div class="field">${MF.ui.segmented('level', [['easy', t('Facile')], ['medium', t('Moyen')], ['hard', t('Difficile')], ['expert', t('Expert')]], st.level, 'data-wz-seg')}</div>
            <div class="field"><span>${t('Langue')}</span>${MF.ui.segmented('lang', MF.lexicon.ids.map(l => [l, MF.lexicon.LANGS[l].label]), st.lang, 'data-wz-lang')}</div>
            <p class="field-hint">${t('Taille, variante et contenu (dessin, univers, citation…) se règlent ensuite dans l\'onglet « Énigme ». Chaque grille a une seule solution.')}</p>
          </div>
          <div class="wz-mdk">
            <h4 class="wz-title">${t('Choisis ton univers')}</h4>
            <p class="field-hint">${t('Chaque univers a ses lieux, ses objets, ses suspects et son histoire. Tout reste modifiable ensuite.')}</p>
            <div class="field"><span>${t('Langue de l\'enquête')}</span>${MF.ui.segmented('lang', MF.lexicon.ids.map(l => [l, MF.lexicon.LANGS[l].label]), st.lang, 'data-wz-lang')}</div>
            <div class="wz-mdk-themes">${mdkThemes(st.lang)}</div>
          </div>
        </section>

        <section class="wz-step" data-step="2" hidden>
          <div class="wz-style">
            <div class="field wz-shape"><span>${t('Forme')}</span>${MF.shapePicker.html(st.shape, { compact: true, attrs: id => `data-wz="shape" data-v="${id}"` })}</div>
            <div class="field"><span>${t('Style')} <span class="field-hint">${t('modifiable à tout moment dans Design')}</span></span><div class="theme-strip">${themes.map(([id, th]) => {
              const { bg, C } = MF.themes.swatch(id);
              return `<button type="button" class="theme-chip ${id === st.theme ? 'active' : ''}" data-wz="theme" data-v="${id}"><span style="background:${esc(bg)}"><i style="background:${C.frame}"></i><i style="background:${C.clue}"></i></span>${esc(th.label)}</button>`;
            }).join('')}</div></div>
          </div>
          <div class="wz-mdk">
            <div class="field"><span>${t('Difficulté')}</span>${MF.panels.murdoku.levelCards(st.mdkDifficulty, 'data-wz-level')}</div>
            <div class="field"><span>${t('Taille du plateau')}</span><div class="wz-sizes">${[5, 6, 7, 8].map(sizeCard).join('')}</div></div>
            <div class="field"><span>${t('Style du plateau')}</span>${MF.ui.segmented('mdkRender', [['3d', t('Diorama 3D')], ['2d', t('Plan dessiné')]], st.mdkRender, 'data-wz-seg')}</div>
          </div>
          <label class="field"><span>${t('Nom')} <span class="field-hint">${t('facultatif')}</span></span><input class="input input-lg" id="wz-name" maxlength="${MF.schema.LIMITS.name}" placeholder="${esc(t('ex : Anniversaire de Léa, Révisions CM2…'))}" enterkeyhint="done"></label>
        </section>
      </div>`,
      onOpen: root => {
        MF.shapePicker.bind(root);
        const foot = i => /** @type {HTMLElement} */ (root.querySelector(`.modal-foot [data-i="${i}"]`));
        const sync = () => {
          const mdk = st.game === 'murdoku', logic = isLogic();
          root.querySelectorAll('.wz-words').forEach(x => { x.hidden = mdk || logic; });
          root.querySelectorAll('.wz-logic').forEach(x => { x.hidden = !logic; });
          root.querySelectorAll('.wz-style').forEach(x => { x.hidden = mdk; });
          root.querySelectorAll('.wz-shape').forEach(x => { x.hidden = logic; });
          root.querySelectorAll('.wz-mdk').forEach(x => { x.hidden = !mdk; });
          root.querySelectorAll('.wz-step').forEach(x => { x.hidden = +x.dataset.step !== step; });
          root.querySelector('.wz-steps').innerHTML = stepNames().map((n, i) => `<li><button type="button" data-goto="${i}" class="${i === step ? 'active' : i < step ? 'done' : ''}" aria-current="${i === step ? 'step' : 'false'}"><i>${i < step ? ic('check', 'ic-xs') : i + 1}</i>${esc(n)}</button></li>`).join('');
          foot(0).hidden = step === 0;
          foot(1).hidden = step === STEPS - 1;
          foot(1).classList.toggle('btn-primary', false);
          root.querySelector('.modal-body').scrollTop = 0;
        };
        const go = i => { step = MF.util.clamp(i, 0, STEPS - 1); sync(); };
        root.wizardGo = go;
        sync();
        root.addEventListener('click', e => {
          const target = /** @type {any} */ (e.target);
          const g = target.closest('[data-goto]');
          if (g) { go(+g.dataset.goto); return; }
          if (MF.panels.murdoku.shelfClick(target)) return;
          const th = target.closest('[data-wz-mdk-theme]');
          if (th) {
            st.mdkTheme = th.dataset.wzMdkTheme;
            root.querySelectorAll('[data-wz-mdk-theme]').forEach(x => { x.classList.toggle('active', x === th); x.setAttribute('aria-checked', String(x === th)); });
            return;
          }
          const lv = target.closest('[data-wz-level]');
          if (lv) {
            st.mdkDifficulty = lv.dataset.wzLevel;
            root.querySelectorAll('[data-wz-level]').forEach(x => { x.classList.toggle('active', x === lv); x.setAttribute('aria-pressed', String(x === lv)); });
            return;
          }
          const seg = target.closest('[data-wz-seg] [data-v]');
          if (seg) {
            st[seg.parentElement.dataset.wzSeg] = seg.dataset.v;
            seg.parentElement.querySelectorAll('[data-v]').forEach(x => x.classList.toggle('active', x === seg));
            return;
          }
          const lb = target.closest('[data-wz-lang] [data-v]');
          if (lb) {
            st.lang = lb.dataset.v;
            root.querySelectorAll('[data-wz-lang] [data-v]').forEach(x => x.classList.toggle('active', x.dataset.v === st.lang));
            root.querySelectorAll('[data-lang]').forEach(x => { x.hidden = x.dataset.lang !== st.lang; });
            // Noms des univers dans la langue de l'enquête
            root.querySelector('.wz-mdk-themes').innerHTML = mdkThemes(st.lang);
            // Un pack de l'autre langue ne peut pas rester choisi
            if (st.start.startsWith('pack:')) { st.start = 'empty'; root.querySelectorAll('[data-wz="start"]').forEach(x => x.classList.toggle('active', x.dataset.v === 'empty')); }
            return;
          }
          const b = target.closest('[data-wz]');
          if (!b) return;
          st[b.dataset.wz] = b.dataset.v;
          root.querySelectorAll(`[data-wz="${b.dataset.wz}"]`).forEach(x => x.classList.toggle('active', x === b));
          root.querySelector('.wz-random').hidden = st.start !== 'random';
          // Choisir le jeu passe à l'étape suivante
          if (b.dataset.wz === 'game') go(1);
        });
        root.querySelector('#wz-name').addEventListener('keydown', e => { if (e.key === 'Enter') root.querySelector('.modal-foot .btn-primary').click(); });
      },
      actions: [
        { label: t('Retour'), icon: 'chevronLeft', kind: 'ghost', value: null, validate: root => { /** @type {any} */ (root).wizardGo(step - 1); return false; } },
        { label: t('Suivant'), value: null, validate: root => { /** @type {any} */ (root).wizardGo(step + 1); return false; } },
        { label: t('Créer'), kind: 'primary', icon: 'sparkle', value: root => {
          const n = id => parseInt(root.querySelector(id).value, 10);
          return { ...st, name: root.querySelector('#wz-name').value.trim(), count: MF.util.clamp(n('#wz-count') || 20, 1, 200), min: MF.util.clamp(n('#wz-min') || 3, 2, 15), max: MF.util.clamp(n('#wz-max') || 9, 2, 15) };
        } },
      ],
    });
  }

  return { render, wizard };
})();
