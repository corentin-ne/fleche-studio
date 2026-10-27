// @ts-check
/* =========================================================================
   Panneau « Énigme » des jeux de chiffres et de logique (à la place de la
   liste de mots) : niveau, taille, variante et contenu propre à chaque jeu
   (dessin du picross, univers du logigramme, citation, mot caché…).
   Chaque réglage relance le calcul de la grille (comme une forme ou une taille).
   ========================================================================= */
window.MF = window.MF || {};
MF.panels = MF.panels || {};

MF.panels.logic = (() => {
  const { esc } = MF.util;
  const { t } = MF.i18n;
  const ic = MF.icons.svg;
  const ui = MF.ui;

  const LEVELS = () => [['easy', t('Facile')], ['medium', t('Moyen')], ['hard', t('Difficile')], ['expert', t('Expert')]];
  const seg = (key, items, value) => ui.segmented(key, items.map(([v, l]) => [v, l]), value, 'data-lopt');
  const field = (label, html, hint = '') => `<div class="field"><span>${esc(label)}</span>${html}${hint ? `<span class="field-hint">${esc(hint)}</span>` : ''}</div>`;
  const nums = list => list.map(n => [n, `${n} × ${n}`]);

  /** Réglages propres à chaque jeu. */
  function gameFields(game, o, puzzle) {
    const lang = puzzle.options.lang;
    switch (game) {
      case 'sudoku': return field(t('Taille'), seg('size', nums([4, 6, 9]), o.size))
        + field(t('Variante'), seg('variant', [['classic', t('Classique')], ['jigsaw', t('Irrégulier')], ['diagonal', t('Sudoku X')]], o.variant),
          o.variant === 'jigsaw' ? t('Des régions aux formes libres au lieu des carrés.') : o.variant === 'diagonal' ? t('Les deux diagonales contiennent aussi chaque chiffre une fois.') : '');
      case 'wordoku': return field(t('Taille'), seg('size', nums([4, 6, 9]), o.size))
        + `<label class="field"><span>${t('Mot caché')} <span class="field-hint">${t('{n} lettres toutes différentes, facultatif', { n: o.size })}</span></span><input class="input" data-ltext="text" maxlength="9" value="${esc(o.text || '')}" placeholder="${esc(lang === 'en' ? 'BLACKSMITH'.slice(0, o.size) : 'CHAPEAU'.slice(0, o.size))}" autocapitalize="characters"></label>`;
      case 'calcudoku': return field(t('Taille'), seg('size', nums([4, 5, 6, 7]), o.size))
        + field(t('Opérations'), seg('variant', [['all', '+ − × ÷'], ['add', t('Additions seulement')]], o.variant));
      case 'futoshiki': return field(t('Taille'), seg('size', nums([4, 5, 6, 7]), o.size));
      case 'kakuro': return ui.slider('size', t('Taille'), o.size, 5, 12, 1);
      case 'nombres': return field(t('Présentation'), seg('variant', [['croises', t('Nombres croisés')], ['fleches', t('Nombres fléchés')]], o.variant))
        + ui.slider('size', t('Taille'), o.size, 6, 14, 1);
      case 'echelle': return field(t('Longueur des mots'), seg('size', [[3, '3'], [4, '4'], [5, '5'], [6, '6']], o.size))
        + field(t('Nombre d\'échelles'), seg('count', [[1, '1'], [2, '2'], [3, '3'], [4, '4']], o.count))
        + `<label class="field"><span>${t('Tes mots de départ et d\'arrivée')} <span class="field-hint">${t('facultatif')}</span></span><input class="input" data-ltext="text" maxlength="200" value="${esc(o.text || '')}" placeholder="${esc(lang === 'en' ? 'COLD WARM, LION BEAR' : 'CHAT LOUP, PAIN BEAU')}" autocapitalize="characters">
          <span class="field-hint">${t('Deux mots de même longueur par échelle. Sinon, le dictionnaire choisit.')}</span></label>`;
      case 'citation': return `<label class="field"><span>${t('Ta citation')} <span class="field-hint">${t('vide : un proverbe au hasard')}</span></span><textarea class="textarea" data-ltext="text" rows="3" maxlength="220" placeholder="${esc(t('ex : Petit à petit, l\'oiseau fait son nid.'))}">${esc(o.text || '')}</textarea></label>
        <label class="field"><span>${t('Auteur')} <span class="field-hint">${t('facultatif')}</span></span><input class="input" data-ltext="author" maxlength="60" value="${esc(o.author || '')}"></label>`;
      case 'picross': return picrossFields(o);
      case 'logigramme': return field(t('Univers'), MF.panels.murdoku.themeCards(o.universe, lang, 'data-lg-universe'))
        + field(t('Éléments par catégorie'), seg('size', [[3, '3'], [4, '4'], [5, '5']], o.size))
        + field(t('Catégories'), seg('count', [[3, t('3 : qui, où, quoi')], [4, t('4 : + à quelle heure')]], o.count));
      default: return '';
    }
  }

  function picrossFields(o) {
    const src = o.source || 'emoji';
    let body;
    if (src === 'emoji') {
      body = `<div class="emoji-pick">${MF.logicInput.EMOJIS.map(e => `<button type="button" class="${e === o.emoji ? 'active' : ''}" data-emoji="${esc(e)}" aria-pressed="${e === o.emoji}">${e}</button>`).join('')}</div>
        <div class="row wrap-gap"><button type="button" class="btn btn-sm" data-lact="random-emoji">${ic('dice')}${t('Au hasard')}</button>
        <label class="field mini"><span class="field-hint">${t('Autre emoji')}</span><input class="input" data-ltext="emoji" maxlength="8" value="${esc(o.emoji || '')}"></label></div>`
        + field(t('Dessin'), seg('detail', [['silhouette', t('Silhouette')], ['details', t('Détails')]], o.detail));
    } else if (src === 'shape') {
      body = MF.shapePicker.html(o.shape, { compact: true, attrs: id => `data-lshape="${id}"` });
    } else if (src === 'text') {
      body = `<label class="field"><span>${t('Lettre, chiffre ou mot court')}</span><input class="input" data-ltext="text" maxlength="12" value="${esc(o.text || '')}" placeholder="LÉA"></label>`;
    } else {
      body = `<div class="row wrap-gap"><label class="btn btn-sm">${ic('image')}${t(o.imageId ? 'Changer de photo' : 'Choisir une photo')}<input type="file" accept="image/*" data-lfile hidden></label>
        ${o.imageId ? `<span class="muted small">${t('Photo choisie ✓')}</span>` : ''}</div>
        <p class="field-hint">${t('Les zones sombres deviennent les cases pleines. Une photo contrastée, un visage de face ou un objet sur fond clair donnent les plus beaux dessins.')}</p>`;
    }
    return field(t('Dessin à découvrir'), seg('source', [['emoji', t('Emoji')], ['shape', t('Forme')], ['text', t('Texte')], ['image', t('Photo')]], src))
      + body + ui.slider('size', t('Taille'), o.size, 5, 30, 1);
  }

  function render(root, { puzzle, actions }) {
    const game = MF.games.get(puzzle.game);
    const o = MF.logic.settings(puzzle.game, puzzle.options.logic);
    const usesLang = ['echelle', 'wordoku', 'citation', 'logigramme', 'nombres'].includes(puzzle.game);
    root.innerHTML = `<div class="logic-panel">
      <div class="logic-head">${ic(game.icon, 'ic-lg')}<div><b>${esc(game.label)}</b><small class="muted">${esc(game.desc)}</small></div></div>
      ${field(t('Difficulté'), seg('level', LEVELS(), o.level))}
      ${gameFields(puzzle.game, o, puzzle)}
      ${usesLang ? `<div class="field"><span>${t('Langue')}</span>${ui.segmented('lang', MF.lexicon.ids.map(l => [l, MF.lexicon.LANGS[l].label]), puzzle.options.lang, 'data-opt')}</div>` : ''}
      <button type="button" class="btn btn-primary" data-regen>${ic('shuffle')}${t('Nouvelle grille')}</button>
      <p class="field-hint">${t('Chaque grille a une seule solution, vérifiée à la création. Le style se règle dans Design, le décor dans Décor.')}</p>
    </div>`;
    bind(root, puzzle, actions);
    MF.shapePicker.bind(root);
  }

  function bind(root, puzzle, actions) {
    const set = patch => actions.setOptions({ logic: { ...puzzle.options.logic, ...patch } });
    root.addEventListener('click', e => {
      const target = /** @type {HTMLElement} */ (e.target);
      if (MF.panels.murdoku.shelfClick(target)) return;
      const opt = /** @type {HTMLElement | null} */ (target.closest('[data-lopt] [data-v]'));
      if (opt) { set({ [opt.parentElement.dataset.lopt]: MF.util.parseValue(opt.dataset.v) }); return; }
      const lang = /** @type {HTMLElement | null} */ (target.closest('[data-opt] [data-v]'));
      if (lang) { actions.setOption('lang', lang.dataset.v); return; }
      const em = /** @type {HTMLElement | null} */ (target.closest('[data-emoji]'));
      if (em) { set({ emoji: em.dataset.emoji }); return; }
      const sh = /** @type {HTMLElement | null} */ (target.closest('[data-lshape]'));
      if (sh) { set({ shape: sh.dataset.lshape }); return; }
      const uni = /** @type {HTMLElement | null} */ (target.closest('[data-lg-universe]'));
      if (uni) { set({ universe: uni.dataset.lgUniverse }); return; }
      if (target.closest('[data-lact="random-emoji"]')) {
        const list = MF.logicInput.EMOJIS.filter(x => x !== puzzle.options.logic.emoji);
        set({ emoji: list[Math.floor(Math.random() * list.length)], source: 'emoji' });
      }
    });
    /** @type {NodeListOf<HTMLInputElement>} */ (root.querySelectorAll('[data-ltext]')).forEach(inp => inp.addEventListener('change', () => set({ [inp.dataset.ltext]: inp.value.trim() })));
    /** @type {NodeListOf<HTMLInputElement>} */ (root.querySelectorAll('[data-slider]')).forEach(inp => {
      const out = inp.closest('.slider-field').querySelector('output');
      inp.addEventListener('input', () => { out.textContent = `${inp.value}${out.dataset.unit}`; });
      inp.addEventListener('change', () => set({ [inp.dataset.slider]: +inp.value }));
    });
    root.querySelector('[data-lfile]')?.addEventListener('change', async e => {
      const file = /** @type {HTMLInputElement} */ (e.target).files?.[0];
      if (!file) return;
      try {
        const a = await MF.assets.add(file, file.name);
        set({ imageId: a.id, source: 'image' });
      } catch (err) { MF.ui.toast(err.message || t('Image refusée.'), 'err', 5000); }
    });
  }

  return render;
})();
