// @ts-check
/* =========================================================================
   Espace « Jouer » : la salle de jeu. Rien à régler pour commencer : on choisit
   un jeu, deux ou trois réglages au plus, et la partie se construit sans
   montrer la solution. Les grilles du studio s'y jouent aussi ; « Éditer »
   les renvoie dans le studio (espace Créer).
   ========================================================================= */
window.MF = window.MF || {};

MF.arcade = (() => {
  const { esc, plural } = MF.util;
  const { t } = MF.i18n;
  const ic = MF.icons.svg;

  /** Taille d'une partie de mots : nombre de mots tirés au hasard. */
  const SIZES = () => [['small', t('Petite'), 12], ['medium', t('Moyenne'), 20], ['large', t('Grande'), 32]];
  const LEVELS = () => [['easy', t('Facile')], ['medium', t('Moyen')], ['hard', t('Difficile')], ['expert', t('Expert')]];
  /** Murdoku : taille du plateau selon le niveau (plus de suspects = plus long). */
  const MDK_SIZE = { easy: '5', medium: '6', hard: '7', expert: '7' };

  /** Une grille se joue-t-elle déjà (contenu prêt ou calculable sans rien écrire) ? */
  function playable(pz) {
    const g = MF.games.get(pz.game);
    if (pz.layout?.pages?.length) return true;
    return g.engine === 'logic' || g.engine === 'murdoku' || pz.words.length >= 2;
  }

  /** État d'une grille pour le joueur : nouvelle, en cours ou terminée (meilleur temps). */
  function progress(pz) {
    const best = MF.play.bestOf(pz);
    if (best) return { kind: 'done', label: t('Record {time}', { time: MF.play.clock(best) }) };
    const saved = pz.layout ? MF.play.load(MF.play.keyOf(pz, 0)) : null;
    const started = saved && Object.keys(saved).some(k => k !== 'tool' && (Array.isArray(saved[k]) ? saved[k].length : typeof saved[k] === 'object' ? Object.keys(saved[k] || {}).length : !!saved[k]));
    return started ? { kind: 'started', label: t('En cours') } : { kind: 'new', label: t('À jouer') };
  }

  /**
   * Salle de jeu.
   * @param {HTMLElement} root
   * @param {any} o { puzzles, onGame(game), onPlay(id), onEdit(id), onCreate() }
   */
  function render(root, o) {
    const mine = o.puzzles.filter(playable).sort((a, b) => b.updatedAt - a.updatedAt);
    const states = new Map(mine.map(p => [p.id, progress(p)]));
    const going = mine.filter(p => states.get(p.id).kind === 'started');
    const card = p => {
      const g = MF.games.get(p.game), st = states.get(p.id);
      return `<article class="arc-card" style="--c:${esc(p.design.accent)}">
        <button type="button" class="arc-open" data-play="${p.id}" aria-label="${esc(t('Jouer à {name}', { name: p.name }))}">
          <span class="arc-thumb">${MF.dashboard.thumb(p) || `<span class="dash-empty">${ic(g.icon, 'ic-lg')}</span>`}<span class="arc-go">${ic('play')}</span></span>
          <span class="arc-info"><b>${esc(p.name)}</b><span>${ic(g.icon, 'ic-xs')}${esc(g.short)} · <em class="arc-st ${st.kind}">${esc(st.label)}</em></span></span>
        </button>
        <button type="button" class="btn btn-sm btn-icon btn-ghost arc-edit" data-edit="${p.id}" title="${esc(t('Modifier dans le studio'))}" aria-label="${esc(t('Éditer {name}', { name: p.name }))}">${ic('edit')}</button>
      </article>`;
    };
    root.innerHTML = `<div class="arcade">
      <header class="arc-head">
        <h1>${ic('gamepad')}${t('Jouer')}</h1>
        <p class="muted">${t('Choisis un jeu : la grille se prépare sans montrer la solution, et c\'est parti.')}</p>
      </header>

      ${going.length ? `<section class="arc-sec"><h2>${t('Reprendre')}</h2><div class="arc-row">${going.slice(0, 6).map(card).join('')}</div></section>` : ''}

      <section class="arc-sec">
        <h2>${t('Nouvelle partie')}</h2>
        ${MF.games.FAMILIES.map(([f, label]) => `<h3 class="arc-family">${esc(label)}</h3><div class="arc-games">${Object.entries(MF.games.GAMES).filter(([, g]) => g.family === f).map(([id, g]) => `<button type="button" class="arc-game" data-game="${id}">${ic(g.icon, 'ic-lg')}<b>${esc(g.short)}</b></button>`).join('')}</div>`).join('')}
      </section>

      <section class="arc-sec">
        <h2>${t('Mes grilles')} <small class="muted">${mine.length ? plural(mine.length, 'grille') : ''}</small></h2>
        ${mine.length ? `<div class="arc-list">${mine.map(card).join('')}</div>`
          : `<p class="arc-empty muted">${t('Les grilles que tu crées dans le studio apparaissent ici pour y jouer.')} <button type="button" class="link-btn" data-arc="create">${t('Créer une grille')}</button></p>`}
      </section>
    </div>`;

    root.querySelector('.arcade').addEventListener('click', e => {
      const target = /** @type {any} */ (e.target);
      const ed = target.closest('[data-edit]');
      if (ed) { o.onEdit(ed.dataset.edit); return; }
      const g = target.closest('[data-game]');
      if (g) { o.onGame(g.dataset.game); return; }
      const c = target.closest('[data-play]');
      if (c) { o.onPlay(c.dataset.play); return; }
      if (target.closest('[data-arc="create"]')) o.onCreate();
    });
  }

  /**
   * Réglages d'une nouvelle partie : le strict nécessaire, tout a une valeur par défaut.
   * Mots : langue et taille (ou un thème de mots) ; chiffres et logique : niveau ;
   * Murdoku : univers et niveau.
   * @returns {Promise<any>} réglages pour actions.createPuzzle, ou null
   */
  function setup(game) {
    const g = MF.games.get(game);
    const mdk = game === 'murdoku', logic = g.engine === 'logic';
    const st = { lang: MF.lexicon.preferred(), size: 'medium', level: 'medium', words: 'random', mdkTheme: 'manor' };
    const langs = MF.lexicon.ids.map(l => [l, MF.lexicon.LANGS[l].label]);
    const packs = lang => Object.entries(MF.lexicon.packs(lang)).map(([id, p]) => `<button type="button" class="chip qp-pack" data-qp="words" data-v="pack:${id}" data-lang="${lang}" ${lang === st.lang ? '' : 'hidden'}>${p.emoji} ${esc(p.label)}</button>`).join('');
    const body = mdk
      ? `<div class="field"><span>${t('Univers')}</span><div class="qp-mdk">${MF.panels.murdoku.themeCards(st.mdkTheme, st.lang, 'data-qp-mdk')}</div></div>
         <div class="field"><span>${t('Niveau')}</span>${MF.ui.segmented('level', LEVELS(), st.level, 'data-qp-seg')}</div>`
      : logic
        ? `<div class="field"><span>${t('Niveau')}</span>${MF.ui.segmented('level', LEVELS(), st.level, 'data-qp-seg')}</div>
           <p class="field-hint">${esc(g.desc)}</p>`
        : `<div class="field"><span>${t('Taille')}</span>${MF.ui.segmented('size', SIZES().map(([id, label, n]) => [id, `${label} · ${n}`]), st.size, 'data-qp-seg')}</div>
           <div class="field"><span>${t('Mots')}</span><div class="qp-packs"><button type="button" class="chip qp-pack active" data-qp="words" data-v="random">${ic('dice', 'ic-xs')} ${t('Au hasard')}</button>${MF.lexicon.ids.map(packs).join('')}</div></div>
           <div class="field"><span>${t('Langue')}</span>${MF.ui.segmented('lang', langs, st.lang, 'data-qp-seg')}</div>`;
    return MF.ui.modal({
      title: g.label, icon: g.icon, className: 'quick-play', wide: mdk,
      body: `<div class="stack qp-body">${body}</div>`,
      onOpen: root => root.addEventListener('click', e => {
        const target = /** @type {any} */ (e.target);
        if (MF.panels.murdoku.shelfClick(target)) return;
        const th = target.closest('[data-qp-mdk]');
        if (th) {
          st.mdkTheme = th.dataset.qpMdk;
          root.querySelectorAll('[data-qp-mdk]').forEach(x => { x.classList.toggle('active', x === th); x.setAttribute('aria-checked', String(x === th)); });
          return;
        }
        const seg = target.closest('[data-qp-seg] [data-v]');
        if (seg) {
          const key = seg.parentElement.dataset.qpSeg;
          st[key] = seg.dataset.v;
          seg.parentElement.querySelectorAll('[data-v]').forEach(x => x.classList.toggle('active', x === seg));
          if (key === 'lang') {
            root.querySelectorAll('[data-lang]').forEach(x => { x.hidden = x.dataset.lang !== st.lang; });
            if (st.words !== 'random') { st.words = 'random'; root.querySelectorAll('[data-qp="words"]').forEach(x => x.classList.toggle('active', x.dataset.v === 'random')); }
          }
          return;
        }
        const w = target.closest('[data-qp="words"]');
        if (w) { st.words = w.dataset.v; root.querySelectorAll('[data-qp="words"]').forEach(x => x.classList.toggle('active', x === w)); }
      }),
      actions: [{ label: t('Annuler'), value: null }, {
        label: t('Jouer'), kind: 'primary', icon: 'play',
        value: () => {
          const count = (SIZES().find(s => s[0] === st.size) || [])[2] || 20;
          const card = mdk ? MF.murdokuThemes.card(st.mdkTheme, st.lang).label : '';
          return {
            game, lang: st.lang, level: st.level, start: st.words, count, min: 3, max: st.size === 'small' ? 7 : 9,
            mdkTheme: st.mdkTheme, mdkDifficulty: st.level, mdkSize: MDK_SIZE[st.level] || '6',
            name: mdk ? `Murdoku · ${card}` : t('Partie de {game}', { game: g.short.toLowerCase() }),
          };
        },
      }],
    });
  }

  return { render, setup, playable };
})();
