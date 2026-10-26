// @ts-check
/* =========================================================================
   Murdoku : affichage du plateau (3D peinte, sinon plan 2D), studio, jeu et
   export. Le moteur (MF.murdoku) produit l'énigme ; le rendu 3D vient de
   js/vendor/murdoku3d.js (chargé à la demande, adapté de building-builder).
   Le plan 2D sert de repli (navigateur sans WebGL), de vignette et d'export SVG.

   Énigme : voir docs/murdoku-format.md. Lignes 1…N, colonnes A, B, C…
   ========================================================================= */
window.MF = window.MF || {};

MF.murdokuView = (() => {
  const { esc } = MF.util;
  const { t } = MF.i18n;
  const ic = MF.icons.svg;
  const U = 100;

  /* ---------------- Options d'une enquête ---------------- */
  const LOOKS = () => [['print', t('Livre d\'art')], ['gouache', t('Encre & gouache')], ['film', t('Film rétro')], ['pixel', t('Pixel art')], ['clean', t('Net')]];
  const MOODS = () => [['day', t('Jour')], ['golden', t('Fin d\'après-midi')], ['dusk', t('Crépuscule')], ['night', t('Nuit')]];

  /** Niveaux : [id, nom, description courte, étoiles]. */
  const LEVELS = () => [
    ['easy', t('Facile'), t('Indices directs, quelques bonus'), 1],
    ['medium', t('Moyen'), t('Un vrai raisonnement'), 2],
    ['hard', t('Difficile'), t('Relations et négations'), 3],
    ['expert', t('Expert'), t('Aucune ligne ni colonne donnée'), 4],
  ];
  const levelName = id => (LEVELS().find(l => l[0] === id) || [])[1] || '';

  /** Options de génération et de rendu, toujours complètes et bornées (MF.schema). */
  const options = o => MF.schema.murdokuOptions(o);

  /** Empreinte des réglages qui changent l'énigme (le style d'affichage n'en fait pas partie). */
  const hashOf = pz => { const o = options(pz.options.murdoku); return MF.util.hash(JSON.stringify([o.theme, o.size, o.difficulty, o.rooms, o.density, o.names, o.victim, o.roomNames, o.objectNames, o.story, o.seed, pz.options.lang])); };

  /** Habillage de l'enquête : univers choisi + noms retouchés, dans la langue de l'enquête. */
  const themeOf = pz => {
    const o = options(pz.options.murdoku);
    return MF.murdokuThemes.resolve(o.theme, pz.options.lang === 'en' ? 'en' : 'fr', { rooms: o.roomNames, objects: o.objectNames, story: o.story });
  };

  /** Adaptateur pour le registre des jeux (MF.games) : pas de mots à préparer, empreinte des réglages. */
  const engine = { prepare: () => [1], layoutHash: hashOf };

  /** Calcule l'énigme d'une grille (quelques dizaines de millisecondes). */
  function generate(pz) {
    const o = options(pz.options.murdoku);
    const names = o.names.filter(Boolean);
    return MF.murdoku.generate({ size: o.size, difficulty: o.difficulty, rooms: o.rooms, density: o.density, lang: pz.options.lang, names: names.length ? names : undefined, victimName: o.victim || undefined, theme: themeOf(pz) }, o.seed || MF.util.randomSeed());
  }

  /* ---------------- Plan 2D ---------------- */
  const FLOORS = { living: '#ecd9b6', kitchen: '#dfe9e1', bedroom: '#efd9d6', bathroom: '#d3e6ee', office: '#e6dcc8', library: '#dcc6a8', dining: '#f0dcc0', garden: '#cfe4b4', hall: '#e7e2d6', music: '#e2d8ec' };
  const ICONS = { bed: '🛏️', sofa: '🛋️', armchair: '💺', chair: '🪑', bench: '🪵', table: '🍽️', desk: '🖥️', plant: '🪴', bookshelf: '📚', piano: '🎹', bath: '🛁', sink: '🚰', tv: '📺', fireplace: '🔥', counter: '🍳', cabinet: '🗄️', lamp: '💡', tree: '🌳', fountain: '⛲' };
  const colLabel = c => String.fromCharCode(65 + c);
  const initial = name => (String(name || '?').trim()[0] || '?').toUpperCase();

  /**
   * Plan vu de dessus, en SVG.
   * @param {any} pz  énigme
   * @param {any} [o] { people: 'none'|'solution'|{ id: {r,c} }, crosses: string[], labels, highlight: {r,c}, selected, interactive }
   */
  function planSvg(pz, o = {}) {
    const N = pz.size, M = o.labels === false ? 24 : 70;
    const W = N * U + M * 2, X = c => M + c * U, Y = r => M + r * U;
    const room = (r, c) => (r < 0 || c < 0 || r >= N || c >= N ? -1 : pz.cells[r][c]);
    const out = [];
    out.push(`<rect x="${M - 14}" y="${M - 14}" width="${N * U + 28}" height="${N * U + 28}" rx="18" fill="#3b2f2a"/>`);
    for (let r = 0; r < N; r++) for (let c = 0; c < N; c++) {
      const type = pz.rooms[room(r, c)]?.type;
      out.push(`<rect x="${X(c)}" y="${Y(r)}" width="${U}" height="${U}" fill="${esc(pz.rooms[room(r, c)]?.floor?.[1] || FLOORS[type] || '#eee')}"${o.interactive ? ` class="mdk-cell" data-r="${r}" data-c="${c}"` : ''}/>`);
    }
    // Quadrillage léger, puis murs entre pièces
    for (let i = 1; i < N; i++) out.push(`<path d="M${X(i)} ${M}V${M + N * U}M${M} ${Y(i)}H${M + N * U}" stroke="#5b4a3f" stroke-opacity=".18" stroke-width="2"/>`);
    const walls = [];
    for (let r = 0; r < N; r++) for (let c = 0; c < N; c++) {
      if (room(r, c) !== room(r, c + 1) && c < N - 1) walls.push(`M${X(c + 1)} ${Y(r)}V${Y(r + 1)}`);
      if (room(r, c) !== room(r + 1, c) && r < N - 1) walls.push(`M${X(c)} ${Y(r + 1)}H${X(c + 1)}`);
    }
    out.push(`<path d="${walls.join('')}" stroke="#3b2f2a" stroke-width="9" stroke-linecap="round"/>`);
    // Noms des pièces (une fois, dans la première case libre de chaque pièce)
    const named = new Set();
    for (let r = 0; r < N; r++) for (let c = 0; c < N; c++) {
      const id = room(r, c);
      if (named.has(id)) continue;
      named.add(id);
      out.push(`<text x="${X(c) + 8}" y="${Y(r) + 20}" font-size="15" font-weight="700" fill="#3b2f2a" fill-opacity=".6" font-family="Inter, sans-serif">${esc(MF.murdoku.roomName(pz, id))}</text>`);
    }
    if (o.highlight) out.push(`<rect x="${X(o.highlight.c) + 4}" y="${Y(o.highlight.r) + 4}" width="${U - 8}" height="${U - 8}" rx="12" fill="none" stroke="#7b3fe4" stroke-width="6"/>`);
    for (const ob of pz.objects) {
      const occ = MF.murdoku.OBJECTS[ob.type]?.occupiable;
      if (ob.type === 'rug') out.push(`<rect x="${X(ob.c) + 14}" y="${Y(ob.r) + 22}" width="${U - 28}" height="${U - 44}" rx="8" fill="#b5523b" fill-opacity=".55" stroke="#7a3324" stroke-dasharray="6 5" stroke-width="3"/>`);
      else {
        if (occ) out.push(`<circle cx="${X(ob.c) + U / 2}" cy="${Y(ob.r) + U / 2}" r="34" fill="#fff" fill-opacity=".45"/>`);
        out.push(`<text x="${X(ob.c) + U / 2}" y="${Y(ob.r) + U / 2 + 17}" font-size="${occ ? 40 : 48}" text-anchor="middle">${esc(pz.objectNames?.[ob.type]?.icon || ICONS[ob.type] || '▪')}</text>`);
      }
    }
    for (const k of o.crosses || []) {
      const [r, c] = k.split(',').map(Number);
      out.push(`<path d="M${X(c) + 30} ${Y(r) + 30}l40 40m0-40-40 40" stroke="#b3261e" stroke-opacity=".7" stroke-width="7" stroke-linecap="round"/>`);
    }
    const place = o.people === 'solution' ? Object.fromEntries(pz.people.map(p => [p.id, { r: p.r, c: p.c }])) : (MF.schema.isObj(o.people) ? o.people : {});
    for (const p of pz.people) {
      const at = place[p.id];
      if (!at) continue;
      const cx = X(at.c) + U / 2, cy = Y(at.r) + U / 2;
      if (p.role === 'victim') {
        out.push(`<g opacity=".95"><ellipse cx="${cx}" cy="${cy + 6}" rx="38" ry="22" fill="none" stroke="#fff" stroke-width="5" stroke-dasharray="7 6"/><circle cx="${cx}" cy="${cy}" r="25" fill="${esc(p.color)}" stroke="#fff" stroke-width="4"/><text x="${cx}" y="${cy + 9}" font-size="26" text-anchor="middle">💀</text></g>`);
      } else {
        const sel = o.selected === p.id;
        out.push(`<g><circle cx="${cx}" cy="${cy + 3}" r="${sel ? 34 : 31}" fill="#000" fill-opacity=".18"/><circle cx="${cx}" cy="${cy}" r="${sel ? 34 : 30}" fill="${esc(p.color)}" stroke="#fff" stroke-width="${sel ? 7 : 5}"/><text x="${cx}" y="${cy + 11}" font-size="30" font-weight="800" fill="#fff" text-anchor="middle" font-family="Inter, sans-serif">${esc(initial(p.name))}</text></g>`);
      }
    }
    if (o.labels !== false) {
      for (let i = 0; i < N; i++) {
        out.push(`<text x="${X(i) + U / 2}" y="${M - 30}" font-size="26" font-weight="700" fill="currentColor" text-anchor="middle" font-family="Inter, sans-serif">${colLabel(i)}</text>`);
        out.push(`<text x="${M - 36}" y="${Y(i) + U / 2 + 9}" font-size="26" font-weight="700" fill="currentColor" text-anchor="middle" font-family="Inter, sans-serif">${i + 1}</text>`);
      }
    }
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${W}" class="${o.cls || 'mdk-plan'}" role="img" aria-label="${esc(t('Plan de la scène du crime'))}">${out.join('')}</svg>`;
  }

  /* ---------------- 3D (chargée à la demande) ---------------- */
  /** @type {Promise<any> | null} */
  let loading = null;
  /** Module 3D, ou null si le navigateur ne sait pas l'afficher (repli : plan 2D). */
  function load3d() {
    if (!loading) {
      loading = import(MF.loader.url('js/vendor/murdoku3d.js'))
        .then(m => (m.supported() ? m : null))
        .catch(e => { console.warn('Murdoku 3D indisponible', e); return null; });
    }
    return loading;
  }
  const want3d = pz => options(pz.options.murdoku).render === '3d';
  const viewOpts = pz => { const o = options(pz.options.murdoku); return { look: o.look, mood: o.mood, camera: o.camera, labels: o.labels }; };

  /**
   * Vue 3D unique, déplacée d'un conteneur à l'autre (studio, jeu) : créer une scène prend du
   * temps et chaque contexte WebGL coûte cher. Libérée en quittant le Murdoku (release).
   * @type {{ host: HTMLElement, view: any, onCell: Function | null, state?: any } | null}
   */
  let live = null;
  /** @type {Promise<any> | null} */
  let creating = null;
  function release() {
    live?.view.dispose();
    live = null;
  }

  /** Plateau dans un conteneur : 3D si choisie et possible, sinon plan SVG. */
  async function mountBoard(el, pz, state, onCell) {
    const puzzle = pz.layout.pages[0];
    if (want3d(pz)) {
      if (!live) {
        if (!el.querySelector('.mdk-host')) el.innerHTML = `<div class="mdk-loading"><span class="spinner"></span>${esc(t('Préparation de la scène…'))}</div>`;
        creating = creating || (async () => {
          const m = await load3d();
          if (!m) return null;
          const host = document.createElement('div');
          host.className = 'mdk-host';
          el.replaceChildren(host);
          const view = await m.createView(host, { ...viewOpts(pz), interactive: true });
          live = { host, view, onCell: null };
          view.onCell = (r, c) => live?.onCell?.(r, c);
          return live;
        })();
        await creating;
        creating = null;
      }
      if (live) {
        if (live.host.parentElement !== el) el.replaceChildren(live.host);
        live.onCell = onCell;
        live.view.setOptions(viewOpts(pz));
        live.view.setPuzzle(puzzle, state);
        live.state = state;
        return;
      }
    } else release();
    // Plan 2D
    el.innerHTML = planSvg(puzzle, { people: state.show === 'solution' ? 'solution' : state.show === 'play' ? state.placements : 'none', crosses: state.crosses, highlight: state.highlight, selected: state.selected, interactive: true, labels: viewOpts(pz).labels });
    el.querySelector('svg').addEventListener('click', e => {
      const cell = /** @type {any} */ (e.target).closest?.('[data-r]');
      const pt = cell ? { r: +cell.dataset.r, c: +cell.dataset.c } : hitCell(/** @type {any} */ (e.currentTarget), e, puzzle.size, viewOpts(pz).labels);
      if (pt) onCell?.(pt.r, pt.c);
    });
  }
  /** Case sous le pointeur (clic sur un pion ou un objet du plan 2D). */
  function hitCell(svg, e, N, labels) {
    const M = labels === false ? 24 : 70, W = N * U + M * 2;
    const box = svg.getBoundingClientRect();
    const x = ((e.clientX - box.left) / box.width) * W - M, y = ((e.clientY - box.top) / box.height) * W - M;
    const r = Math.floor(y / U), c = Math.floor(x / U);
    return r >= 0 && c >= 0 && r < N && c < N ? { r, c } : null;
  }

  /** Image du plateau (export) : 3D si choisie et disponible, sinon plan 2D. */
  async function boardCanvas(pz, show, width) {
    const puzzle = pz.layout.pages[0];
    if (want3d(pz)) {
      // Vue déjà affichée : on la réutilise le temps de l'image (bien plus rapide qu'une nouvelle scène)
      if (live?.state) {
        try {
          live.view.setPuzzle(puzzle, { show });
          return await live.view.toCanvas({ width, height: width });
        } catch (e) { console.warn(e); } finally { live?.view.setPuzzle(puzzle, live.state); }
      }
      const m = await load3d();
      if (m) {
        try { return await m.renderImage(puzzle, { show, ...viewOpts(pz), width, height: width }); } catch (e) { console.warn(e); }
      }
    }
    const svg = planSvg(puzzle, { people: show === 'solution' ? 'solution' : 'none', labels: viewOpts(pz).labels }).replace('fill="currentColor"', 'fill="#3b2f2a"').replaceAll('fill="currentColor"', 'fill="#3b2f2a"');
    const img = new Image();
    img.src = URL.createObjectURL(new Blob([svg], { type: 'image/svg+xml' }));
    await img.decode();
    const cv = document.createElement('canvas');
    cv.width = cv.height = width;
    cv.getContext('2d').drawImage(img, 0, 0, width, width);
    URL.revokeObjectURL(img.src);
    return cv;
  }

  /* ---------------- Énoncé ---------------- */
  const clueList = puzzle => puzzle.clues.map(c => MF.murdoku.clueText(c, puzzle, puzzle.lang));
  const suspects = puzzle => puzzle.people.filter(p => p.role !== 'victim');
  const victim = puzzle => puzzle.people.find(p => p.role === 'victim');

  function sheetHtml(puzzle, { checks = [], murderer = false } = {}) {
    const v = victim(puzzle);
    const theme = MF.murdokuThemes.get(puzzle.theme);
    return `<div class="mdk-sheet">
      ${puzzle.story ? `<p class="mdk-story"><span aria-hidden="true">${theme.emoji}</span>${esc(puzzle.story)}</p>` : ''}
      <div class="mdk-cast">${puzzle.people.map(p => `<span class="mdk-person ${p.role}" style="--p:${esc(p.color)}"><i>${p.role === 'victim' ? '💀' : esc(initial(p.name))}</i>${esc(p.name)}${p.role === 'victim' ? ` <small>${esc(t('victime'))}</small>` : ''}</span>`).join('')}</div>
      <ol class="mdk-clues">${clueList(puzzle).map((txt, i) => `<li><label><input type="checkbox" data-clue="${i}" ${checks.includes(i) ? 'checked' : ''}><span>${esc(txt)}</span></label></li>`).join('')}</ol>
      ${murderer ? `<p class="mdk-verdict">${ic('magnifier')} ${esc(t('Coupable : {name}', { name: puzzle.people.find(p => p.id === puzzle.murderer)?.name || '?' }))}</p>` : ''}
      <details class="mdk-rules"><summary>${ic('help')} ${esc(t('Règles'))}</summary><ul>${MF.murdoku.rulesText().map(r => `<li>${esc(r)}</li>`).join('')}</ul>
        <p class="muted small">${esc(t('{victim} a été retrouvé·e sans vie. Place chaque personne, puis désigne le coupable.', { victim: v?.name || '?' }))}</p></details>
    </div>`;
  }

  /* ---------------- Studio ---------------- */
  /** Studio : plateau (solution ou vierge) et énoncé. */
  function renderStudio(box, pz, mode) {
    const puzzle = pz.layout?.engine === 'murdoku' ? pz.layout.pages[0] : null;
    if (!puzzle) { box.innerHTML = `<div class="empty"><span class="spinner"></span><h3>${esc(t('Préparation de l\'enquête…'))}</h3></div>`; return; }
    let stage = box.querySelector('.mdk-stage');
    if (!stage || stage.dataset.mode !== 'studio') {
      box.innerHTML = `<div class="mdk-stage" data-mode="studio"><div class="mdk-board"></div><div class="mdk-side"></div></div>`;
      stage = box.querySelector('.mdk-stage');
    }
    stage.querySelector('.mdk-side').innerHTML = sheetHtml(puzzle, { murderer: mode === 'solution' });
    mountBoard(stage.querySelector('.mdk-board'), pz, { show: mode === 'solution' ? 'solution' : 'blank' }, null);
  }

  /* ---------------- Jeu ---------------- */
  /**
   * Partie : choisir une personne puis toucher sa case ; « ✕ » marque les cases impossibles.
   * @param {any} o { entries, onEntries(e), onComplete() }
   */
  function renderPlay(box, pz, o) {
    const puzzle = pz.layout.pages[0];
    const st = { m: {}, x: [], k: [], accused: '', ...(o.entries || {}) };
    let tool = st.tool || suspects(puzzle)[0]?.id || 'x';
    const placements = () => Object.fromEntries(Object.entries(st.m).map(([id, k]) => { const [r, c] = String(k).split(',').map(Number); return [id, { r, c }]; }));
    const save = () => o.onEntries?.({ ...st, tool });
    box.innerHTML = `<div class="mdk-stage" data-mode="play"><div class="mdk-board"></div><div class="mdk-side">
      <div class="mdk-tools" role="toolbar" aria-label="${esc(t('Personnes à placer'))}"></div>
      <div class="mdk-sheet-wrap"></div></div></div>`;
    const stage = box.querySelector('.mdk-stage');
    const boardEl = stage.querySelector('.mdk-board');
    const draw = () => {
      stage.querySelector('.mdk-tools').innerHTML = [...puzzle.people.map(p => {
        const placed = !!st.m[p.id];
        return `<button type="button" class="mdk-tool ${tool === p.id ? 'active' : ''} ${placed ? 'placed' : ''}" data-tool="${p.id}" style="--p:${esc(p.color)}" aria-pressed="${tool === p.id}"><i>${p.role === 'victim' ? '💀' : esc(initial(p.name))}</i><span>${esc(p.name)}</span>${placed ? ic('check', 'ic-xs') : ''}</button>`;
      }), `<button type="button" class="mdk-tool cross ${tool === 'x' ? 'active' : ''}" data-tool="x" aria-pressed="${tool === 'x'}"><i>✕</i><span>${esc(t('Barrer'))}</span></button>`].join('');
      stage.querySelector('.mdk-sheet-wrap').innerHTML = sheetHtml(puzzle, { checks: st.k });
      mountBoard(boardEl, pz, { show: 'play', placements: placements(), crosses: st.x, selected: tool }, onCell);
    };
    const onCell = (r, c) => {
      const key = `${r},${c}`;
      if (tool === 'x') {
        st.x = st.x.includes(key) ? st.x.filter(k => k !== key) : [...st.x, key];
      } else {
        const here = Object.keys(st.m).find(id => st.m[id] === key);
        if (here === tool) delete st.m[tool];
        else { if (here) delete st.m[here]; st.m[tool] = key; st.x = st.x.filter(k => k !== key); }
        // Personne suivante à placer : gain de temps
        if (st.m[tool]) tool = puzzle.people.find(p => !st.m[p.id])?.id || tool;
      }
      save();
      draw();
      if (puzzle.people.every(p => st.m[p.id])) checkAll(true);
    };
    stage.addEventListener('click', e => {
      const b = /** @type {any} */ (e.target).closest('[data-tool]');
      if (b) { tool = b.dataset.tool; save(); draw(); }
    });
    stage.addEventListener('change', e => {
      const cb = /** @type {any} */ (e.target).closest('[data-clue]');
      if (!cb) return;
      const i = +cb.dataset.clue;
      st.k = cb.checked ? [...new Set([...st.k, i])] : st.k.filter(x => x !== i);
      save();
    });
    /** Vérifie les positions ; toutes justes : on désigne le coupable. */
    async function checkAll(auto = false) {
      const wrong = puzzle.people.filter(p => st.m[p.id] && st.m[p.id] !== `${p.r},${p.c}`).length;
      const placed = puzzle.people.filter(p => st.m[p.id]).length;
      if (wrong || placed < puzzle.people.length) {
        if (!auto) MF.ui.toast(wrong ? t('{n} mal placée(s).', { n: wrong }) : t('{placed} / {total} personnes placées, aucune erreur.', { placed, total: puzzle.people.length }), wrong ? 'warn' : 'info');
        else if (wrong) MF.ui.toast(t('Tout le monde est placé… mais quelque chose cloche.'), 'warn');
        return;
      }
      const pick = await MF.ui.modal({
        title: t('Qui est le coupable ?'), icon: 'magnifier', size: 'small',
        body: `<p class="muted small">${esc(t('Le coupable est le seul suspect seul dans une pièce avec la victime.'))}</p><div class="mdk-accuse">${suspects(puzzle).map(p => `<button type="button" class="mdk-tool" data-accuse="${p.id}" style="--p:${esc(p.color)}"><i>${esc(initial(p.name))}</i><span>${esc(p.name)}</span></button>`).join('')}</div>`,
        onOpen: (root, close) => root.querySelector('.mdk-accuse').addEventListener('click', e => { const b = /** @type {any} */ (e.target).closest('[data-accuse]'); if (b) close(b.dataset.accuse); }),
        actions: [{ label: t('Plus tard'), value: null }],
      });
      if (!pick) return;
      st.accused = pick;
      save();
      if (pick === puzzle.murderer) o.onComplete?.();
      else MF.ui.toast(t('Ce n\'est pas {name}… Regarde qui est seul avec la victime.', { name: puzzle.people.find(p => p.id === pick)?.name || '?' }), 'warn', 5000);
    }
    const api = {
      check: () => checkAll(false),
      reveal: () => { // indice : place une personne correctement
        const p = puzzle.people.find(x => st.m[x.id] !== `${x.r},${x.c}`);
        if (!p) return false;
        for (const id of Object.keys(st.m)) if (st.m[id] === `${p.r},${p.c}`) delete st.m[id];
        st.m[p.id] = `${p.r},${p.c}`;
        save(); draw();
        return true;
      },
      clear: () => { st.m = {}; st.x = []; st.k = []; st.accused = ''; save(); draw(); },
    };
    draw();
    return api;
  }

  /* ---------------- Export ---------------- */
  /** Page d'export : titre, plateau, personnes, indices (et coupable pour la solution). */
  async function composePage(pz, { solution = false, width = 2400 } = {}) {
    const puzzle = pz.layout.pages[0];
    const W = width, pad = Math.round(W * 0.06), S = W / 2400;
    const font = MF.design.font(pz.design.font.clue).css, titleFont = MF.design.font(pz.design.title?.font || 'fraunces').css;
    const board = await boardCanvas(pz, solution ? 'solution' : 'blank', W - pad * 2);
    const ctx0 = document.createElement('canvas').getContext('2d');
    // Mise en page du texte (indices sur deux colonnes si la page est large)
    const lines = [];
    const wrap = (text, size, maxW, weight = 500) => {
      ctx0.font = `${weight} ${size}px ${font}`;
      const words = text.split(' '), out = [];
      let cur = '';
      for (const w of words) { const next = cur ? `${cur} ${w}` : w; if (ctx0.measureText(next).width > maxW && cur) { out.push(cur); cur = w; } else cur = next; }
      if (cur) out.push(cur);
      return out;
    };
    const clueSize = 40 * S, colW = (W - pad * 2 - 60 * S) / 2;
    clueList(puzzle).forEach((txt, i) => lines.push({ n: i + 1, rows: wrap(txt, clueSize, colW - 60 * S) }));
    const colH = [0, 0], placed = [];
    for (const l of lines) { const col = colH[0] <= colH[1] ? 0 : 1; placed.push({ ...l, col, y: colH[col] }); colH[col] += l.rows.length * clueSize * 1.3 + 18 * S; }
    const storyRows = puzzle.story ? wrap(puzzle.story, 34 * S, W - pad * 2, 500) : [];
    const storyH = storyRows.length ? storyRows.length * 34 * S * 1.35 + 30 * S : 0;
    const titleH = 130 * S + storyH, castH = 110 * S, cluesH = Math.max(...colH) + 40 * S, verdictH = solution ? 110 * S : 0;
    const H = Math.round(pad + titleH + board.height + 40 * S + castH + cluesH + verdictH + pad);
    const cv = document.createElement('canvas');
    cv.width = W; cv.height = H;
    const g = cv.getContext('2d');
    g.fillStyle = '#f6f0e4'; g.fillRect(0, 0, W, H);
    const ink = '#2b2320';
    let y = pad;
    g.fillStyle = ink; g.textBaseline = 'alphabetic';
    g.font = `700 ${84 * S}px ${titleFont}`;
    g.fillText(pz.name, pad, y + 80 * S);
    g.font = `600 ${34 * S}px ${font}`; g.fillStyle = '#8a6d5a'; g.textAlign = 'right';
    const level = levelName(puzzle.difficulty);
    g.fillText(`Murdoku · ${level}${solution ? ` · ${t('Solution')}` : ''}`, W - pad, y + 76 * S);
    g.textAlign = 'left';
    if (storyRows.length) {
      g.fillStyle = '#5a4638'; g.font = `italic 500 ${34 * S}px ${font}`;
      storyRows.forEach((row, j) => g.fillText(row, pad, y + 130 * S + 20 * S + j * 34 * S * 1.35));
    }
    y += titleH;
    g.drawImage(board, pad, y);
    y += board.height + 40 * S;
    // Personnes
    let x = pad;
    g.font = `700 ${36 * S}px ${font}`;
    for (const p of puzzle.people) {
      const label = p.role === 'victim' ? `${p.name} (${t('victime')})` : p.name;
      const w = g.measureText(label).width + 110 * S;
      if (x + w > W - pad) { x = pad; y += 70 * S; }
      g.fillStyle = p.color; g.beginPath(); g.arc(x + 30 * S, y + 30 * S, 30 * S, 0, Math.PI * 2); g.fill();
      g.fillStyle = '#fff'; g.textAlign = 'center'; g.fillText(p.role === 'victim' ? '✝' : initial(p.name), x + 30 * S, y + 43 * S);
      g.fillStyle = ink; g.textAlign = 'left'; g.fillText(label, x + 72 * S, y + 43 * S);
      x += w;
    }
    y += castH;
    // Indices
    g.font = `500 ${clueSize}px ${font}`;
    for (const l of placed) {
      const cx = pad + l.col * (colW + 60 * S);
      g.fillStyle = '#b5523b'; g.font = `800 ${clueSize}px ${font}`;
      g.fillText(`${l.n}.`, cx, y + l.y + clueSize);
      g.fillStyle = ink; g.font = `500 ${clueSize}px ${font}`;
      l.rows.forEach((row, j) => g.fillText(row, cx + 60 * S, y + l.y + clueSize + j * clueSize * 1.3));
    }
    y += cluesH;
    if (solution) {
      g.fillStyle = '#b5523b'; g.font = `800 ${52 * S}px ${font}`;
      g.fillText(t('Coupable : {name}', { name: puzzle.people.find(p => p.id === puzzle.murderer)?.name || '?' }), pad, y + 60 * S);
    }
    return cv;
  }

  /** Fenêtre d'export Murdoku : énoncé, solution ou les deux ; PNG, JPEG ou impression / PDF. */
  async function openExport(pz) {
    const st = { content: 'blank', type: 'png', width: 2400 };
    const slug = MF.exporter.slug(pz.name);
    const res = await MF.ui.modal({
      title: t('Exporter l\'enquête'), icon: 'download', size: 'small',
      body: `<div class="field"><span>${esc(t('Contenu'))}</span>${MF.ui.segmented('content', [['blank', t('Énoncé')], ['solution', t('Solution')], ['both', t('Les deux')]], st.content, 'data-mx')}</div>
        <div class="field"><span>${esc(t('Type de fichier'))}</span>${MF.ui.segmented('type', [['png', 'PNG'], ['jpeg', 'JPEG']], st.type, 'data-mx')}</div>
        <div class="field"><span>${esc(t('Résolution'))}</span>${MF.ui.segmented('width', [[1200, 'Web'], [2400, 'HD'], [3600, t('Impression')]], st.width, 'data-mx')}</div>
        <p class="field-hint">${esc(t('Le plateau, les personnes et tous les indices sur une seule page, prête à imprimer.'))}</p>`,
      onOpen: root => root.addEventListener('click', e => {
        const b = /** @type {any} */ (e.target).closest('[data-mx] [data-v]');
        if (!b) return;
        const key = b.parentElement.dataset.mx;
        st[key] = key === 'width' ? +b.dataset.v : b.dataset.v;
        b.parentElement.querySelectorAll('[data-v]').forEach(x => x.classList.toggle('active', x === b));
      }),
      actions: [{ label: t('Imprimer / PDF'), icon: 'print', value: 'print' }, { label: t('Télécharger'), icon: 'download', kind: 'primary', value: 'file' }],
    });
    if (!res) return;
    MF.ui.toast(t('Préparation…'), 'info', 2000);
    const variants = st.content === 'both' ? [false, true] : [st.content === 'solution'];
    try {
      const pages = [];
      for (const solution of variants) pages.push({ solution, cv: await composePage(pz, { solution, width: res === 'print' ? 2400 : st.width }) });
      if (res === 'print') {
        const area = document.getElementById('print-area');
        area.innerHTML = pages.map(p => `<div class="print-page"><img src="${p.cv.toDataURL('image/png')}" alt="" style="max-width:100%;max-height:100%"></div>`).join('');
        setTimeout(() => window.print(), 80);
        return;
      }
      for (const p of pages) {
        const blob = await new Promise(r => p.cv.toBlob(r, st.type === 'jpeg' ? 'image/jpeg' : 'image/png', 0.92));
        MF.util.downloadBlob(`${slug}${p.solution ? '-solution' : ''}.${st.type === 'jpeg' ? 'jpg' : 'png'}`, blob);
        await MF.util.sleep(250);
      }
    } catch (e) { MF.ui.toast(t('Export impossible : {error}', { error: e.message }), 'err'); }
  }

  /** Vignette du tableau de bord (plan 2D, solution cachée). */
  const thumb = pz => (pz.layout?.engine === 'murdoku' ? planSvg(pz.layout.pages[0], { labels: false, cls: 'dash-svg' }) : '');

  return { LOOKS, MOODS, LEVELS, levelName, themeOf, options, hashOf, engine, release, generate, planSvg, load3d, renderStudio, renderPlay, openExport, composePage, thumb, clueList };
})();
