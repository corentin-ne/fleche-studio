/* =========================================================================
   Tests du moteur, exécutés dans le navigateur (ouvrir tests/index.html via
   le serveur local). Ils vérifient les règles des grilles générées, la
   sécurité des données importées, les imports et le rendu.
   Résultat : tableau à l'écran + window.testResults.
   ========================================================================= */
(async () => {
  const results = [];
  const tests = [];
  const test = (name, fn) => tests.push({ name, fn });
  const assert = (cond, msg) => { if (!cond) throw new Error(msg || 'assertion échouée'); };
  const eq = (a, b, msg) => assert(JSON.stringify(a) === JSON.stringify(b), `${msg || ''} attendu ${JSON.stringify(b)}, obtenu ${JSON.stringify(a)}`);
  const randomWords = (n, seed) => {
    const rnd = MF.util.rng(seed);
    const all = Object.keys(MF.cluesFr).filter(w => w.length >= 3 && w.length <= 9);
    return MF.util.shuffle(all, rnd).slice(0, n).map((w, i) => ({ id: `w${seed}x${i}`, text: w, clue: MF.cluesFr[w], priority: false }));
  };

  /** Règles d'une grille « builder » : renvoie la liste des violations. */
  function checkBuilder(page) {
    const errs = [];
    const { w: W, h: H, shape = 'rect', top = 0 } = page.frame;
    const mask = MF.shapes.mask(shape, W, H, top);
    const at = (r, c) => (r >= 0 && c >= 0 && r < H && c < W ? page.rows[r][c] : '#');
    const isL = (r, c) => at(r, c) !== '#';
    const words = new Set(page.words.map(w => `${w.dir}:${w.r},${w.c}:${w.len}`));
    const holders = new Map();
    for (const w of page.words) {
      const [dr, dc] = w.dir === 'H' ? [0, 1] : [1, 0];
      for (let i = 0; i < w.len; i++) {
        const r = w.r + i * dr, c = w.c + i * dc;
        if (at(r, c) !== w.word[i]) errs.push(`${w.word} : lettre ${i} incorrecte`);
        if (!mask[r * W + c]) errs.push(`${w.word} : hors de la forme`);
      }
      if (isL(w.r - dr, w.c - dc) || isL(w.r + w.len * dr, w.c + w.len * dc)) errs.push(`${w.word} : collé à une autre lettre`);
      if (isL(w.sr, w.sc)) errs.push(`${w.word} : case définition sur une lettre`);
      const k = `${w.sr},${w.sc}`;
      holders.set(k, (holders.get(k) || 0) + 1);
    }
    for (const [k, n] of holders) if (n > 2) errs.push(`case ${k} : ${n} définitions`);
    // Toute suite de 2 lettres ou plus doit être un mot placé (pas de mot parasite)
    for (const [dir, dr, dc] of [['H', 0, 1], ['V', 1, 0]]) {
      for (let r = 0; r < H; r++) {
        for (let c = 0; c < W; c++) {
          if (!isL(r, c) || isL(r - dr, c - dc)) continue;
          let len = 0;
          while (isL(r + len * dr, c + len * dc)) len++;
          if (len >= 2 && !words.has(`${dir}:${r},${c}:${len}`)) errs.push(`suite parasite ${dir} en ${r},${c} (${len} lettres)`);
        }
      }
    }
    return errs;
  }

  /* ---------------- Utilitaires ---------------- */
  test('normalize : accents, ligatures, espaces', () => {
    eq(MF.util.normalize('Crème brûlée'), 'CREMEBRULEE');
    eq(MF.util.normalize("Œuf d'Ève"), 'OEUFDEVE');
    eq(MF.util.normalize('arc-en-ciel'), 'ARCENCIEL');
  });
  test('levenshtein', () => { eq(MF.util.levenshtein('CHEVAL', 'CHEVL'), 1); assert(MF.util.levenshtein('ABC', 'XYZWV', 2) > 2); });
  test('identifiants uniques', () => { const s = new Set(Array.from({ length: 2000 }, MF.util.uid)); eq(s.size, 2000); });

  test('slug : noms de fichiers lisibles', () => {
    eq(MF.util.slug('Test étoile !'), 'test-etoile');
    eq(MF.util.slug('Cœur & Âme'), 'coeur-ame');
    eq(MF.util.slug('***', 'grille'), 'grille');
    eq(MF.util.slug('x'.repeat(100)).length, 60);
  });
  test('pool : ordre des résultats et nombre de tâches simultanées bornés', async () => {
    let running = 0, peak = 0;
    const out = await MF.util.pool([5, 1, 4, 2, 3], 2, async (n, i) => {
      peak = Math.max(peak, ++running);
      await MF.util.sleep(n * 3);
      running--;
      return n * 10 + i;
    });
    eq(out, [50, 11, 42, 23, 34]);
    eq(peak, 2, 'simultanées');
    eq(await MF.util.pool([], 4, async x => x), []);
  });
  test('stockage local : préfixes, lecture protégée, effacement ciblé', () => {
    const P = 'mfm:test-storage:';
    MF.storage.removeAll(P);
    assert(MF.storage.set(`${P}a`, { n: 1 }) && MF.storage.set(`${P}b`, 'texte'));
    eq(MF.storage.getJSON(`${P}a`), { n: 1 });
    eq(MF.storage.getJSON(`${P}b`, 'repli'), 'repli', 'JSON illisible');
    eq(MF.storage.getJSON(`${P}absent`, 7), 7);
    eq(MF.storage.keys(P).sort(), [`${P}a`, `${P}b`]);
    eq(MF.storage.removeAll(P), 2);
    eq(MF.storage.keys(P), []);
  });

  /* ---------------- Sécurité des données ---------------- */
  test('schéma : injections HTML/SVG rejetées', () => {
    const p = MF.schema.puzzle({
      name: '<img src=x onerror=alert(1)>',
      design: { accent: 'red" onload="alert(1)', background: { type: 'image', c1: 'url(javascript:1)', pattern: '__proto__' } },
      stickers: [{ kind: 'emoji', emoji: '<script>' }, { kind: 'text', text: 'ok', color: '#fff"/><script>' }, { kind: 'shape', shape: 'nope' }],
    });
    assert(MF.util.HEX.test(p.design.accent), 'couleur non validée');
    eq(p.design.background.pattern, 'dots', 'motif');
    eq(p.stickers.length, 1, 'stickers invalides gardés');
    assert(MF.util.HEX.test(p.stickers[0].color), 'couleur du texte');
  });
  test('schéma : pas de pollution de prototype', () => {
    MF.schema.puzzle(JSON.parse('{"fillerClues":{"__proto__":{"x":1}},"design":{"__proto__":{"polluted":1}}}'));
    MF.design.merge({}, JSON.parse('{"__proto__":{"polluted":1}}'));
    assert(({}).polluted === undefined && ({}).x === undefined);
  });
  test('schéma : grille incohérente rejetée', () => {
    const bad = { engine: 'builder', pages: [{ frame: { w: 3, h: 1 }, rows: ['ABC'], words: [{ r: 0, c: 0, dir: 'H', len: 3, word: 'XYZ', sr: 0, sc: 0, arrow: 'right' }] }] };
    eq(MF.schema.layout(bad), null);
  });
  test('schéma : valeurs bornées', () => {
    const o = MF.schema.options({ cols: 9999, rows: -5, pages: 7, shape: 'licorne' });
    eq([o.cols, o.rows, o.pages, o.shape], [50, 5, 2, 'rect']);
  });

  /* ---------------- Imports ---------------- */
  test('import texte : tous les séparateurs', () => {
    const r = MF.importer.parseText('Chat ; Félin\nChien : Aboie\nSoleil - Astre\nLune\n- Mer = Océan');
    eq(r.map(x => `${x.text}|${x.clue}`), ['Chat|Félin', 'Chien|Aboie', 'Soleil|Astre', 'Lune|', 'Mer|Océan']);
  });
  test('import texte : liste à virgules sur une ligne', () => eq(MF.importer.parseText('chat, chien, cheval').map(x => x.text), ['chat', 'chien', 'cheval']));
  test('import CSV avec guillemets', () => {
    const r = MF.importer.parseCsv('mot;définition\n"Arc";"Tir, à l\'arc"\nBol;Récipient');
    eq(r.map(x => `${x.text}|${x.clue}`), ["Arc|Tir, à l'arc", 'Bol|Récipient']);
  });
  test('import JSON : formats variés', () => {
    eq(MF.importer.parseJson(['Ab', 'Pomme', 'x']).map(x => x.text), ['Ab', 'Pomme'], 'mot d\'une lettre ignoré');
    eq(MF.importer.parseJson([{ mot: 'Pomme', definition: 'Fruit' }])[0].clue, 'Fruit');
    eq(MF.importer.parseJson({ Pomme: 'Fruit' })[0].text, 'Pomme');
  });
  test('import : doublons retirés', () => eq(MF.importer.parseText('Été\nete\nÉTÉ').length, 1));

  /* ---------------- Générateurs ---------------- */
  for (const shape of ['rect', 'circle', 'heart', 'star', 'moon', 'lW', 'lA', 'n8']) {
    test(`mots fléchés (${shape}) : règles respectées`, async () => {
      const words = randomWords(18, shape.length * 7);
      const page = await MF.builder.generate(words, MF.schema.options({ shape, effort: 'fast' }), { seed: 1234 });
      assert(page, 'aucune grille');
      const errs = checkBuilder(page);
      assert(!errs.length, errs.slice(0, 5).join('\n'));
      const placed = page.words.filter(w => w.src === 'theme').length;
      assert(placed >= 16, `seulement ${placed}/18 mots placés`);
      assert(MF.schema.layout({ engine: 'builder', pages: [page], hash: 'x', at: 1 }), 'grille refusée par le schéma');
    });
  }
  test('mots fléchés : mots bannis jamais utilisés', async () => {
    const banned = ['ETE', 'ROI', 'AIR', 'ILE', 'ART', 'EST', 'NID', 'RUE', 'MER', 'SEL'];
    const page = await MF.builder.generate(randomWords(12, 99), MF.schema.options({ effort: 'fast' }), { seed: 7, banned });
    assert(!page.words.some(w => w.src !== 'theme' && banned.includes(w.word)));
  });
  test('mots mêlés : chaque mot est lisible à sa place', async () => {
    const words = randomWords(15, 5);
    const page = await MF.wordsearch.generate(words, MF.schema.options({ directions: 'hard', shape: 'circle' }), { seed: 3 });
    for (const w of page.words) for (let i = 0; i < w.len; i++) assert(page.rows[w.r + w.dr * i][w.c + w.dc * i] === w.word[i], `${w.word} illisible`);
    assert(page.words.length >= 13, `seulement ${page.words.length}/15 placés`);
    assert(MF.schema.layout({ engine: 'meles', pages: [page], hash: 'x', at: 1 }), 'grille refusée par le schéma');
  });

  /* ---------------- Modèle & rendu ---------------- */
  for (const game of ['fleches', 'croises', 'codes']) {
    test(`rendu ${game} : SVG sain, canvas OK`, async () => {
      const words = randomWords(10, 11);
      const page = await MF.builder.generate(words, MF.schema.options({ effort: 'fast' }), { seed: 5 });
      const pz = MF.schema.puzzle({ game, words, layout: { engine: 'builder', pages: [page], hash: 'x', at: 42 } });
      const model = MF.gridModel.from(pz.layout.pages[0], pz, MF.design.metrics(pz.design), pz.layout);
      const scene = MF.scene.compose(model, pz, { letters: true, forExport: true });
      const svg = MF.renderers.svg(scene, { forExport: true });
      assert(svg.startsWith('<svg') && svg.endsWith('</svg>') && !/<script|on\w+=/i.test(svg), 'SVG suspect');
      const doc = new DOMParser().parseFromString(svg, 'image/svg+xml');
      assert(!doc.querySelector('parsererror'), 'SVG mal formé');
      const cv = await MF.renderers.canvas(scene, { scale: 0.2 });
      assert(cv.width > 50 && cv.height > 50, 'canvas vide');
      if (game === 'croises') assert(model.across.length + model.down.length === page.words.length, 'numérotation incomplète');
      if (game === 'codes') eq(new Set(Object.values(model.codes)).size, 26, 'codes non uniques');
    });
  }
  test('thèmes : textes toujours lisibles (contraste ≥ 4,5)', () => {
    const bad = [];
    for (const id of Object.keys(MF.themes.THEMES)) {
      const C = MF.design.resolve(MF.themes.apply(MF.schema.design({}), id));
      if (MF.design.contrast(C.clueInk, C.clue) < 4.5) bad.push(`${id}: définitions`);
      if (MF.design.contrast(C.solution, C.letter) < 4.5) bad.push(`${id}: lettres`);
    }
    assert(!bad.length, bad.join(', '));
  });
  test('formats : rapports corrects', () => {
    const r = p => MF.design.formatRatio({ ...MF.design.DEFAULT.poster, ...p });
    assert(Math.abs(r({ format: 'A4' }) - 210 / 297) < 1e-6);
    assert(Math.abs(r({ format: 'A4', orientation: 'landscape' }) - 297 / 210) < 1e-6);
    eq(r({ format: 'story', orientation: 'landscape' }), 1080 / 1920, 'story ne pivote pas');
    eq(r({ format: 'custom', customW: 300, customH: 100 }), 3);
    eq(r({ format: 'fit' }), null);
    assert(Math.abs(r({ format: 'bookmark', orientation: 'landscape' }) - 180 / 50) < 1e-6, 'les cartes pivotent');
    eq(MF.design.formatMm({ format: 'A5', orientation: 'landscape' }), [210, 148]);
    eq(MF.design.formatMm({ format: 'story' }), null);
  });
  test('formes : chaque lettre et chiffre a une surface utilisable', () => {
    for (const g of ['letters', 'digits']) eq(MF.shapes.byGroup(g).length, g === 'letters' ? 26 : 10);
    for (const id of MF.shapes.ids) { const f = MF.shapes.fraction(id); assert(f > 0.25 && f <= 1, `${id} : ${f}`); }
  });

  /* ---------------- Langues ---------------- */
  test('langues : paramètres et repli sur le français', () => {
    eq(MF.i18n.t('Texte absent du catalogue {n}', { n: 3 }), 'Texte absent du catalogue 3');
    assert(['fr', 'en'].includes(MF.i18n.lang));
  });
  test('langues : les grilles sans langue restent en français', () => {
    eq(MF.schema.options({}).lang, 'fr');
    eq(MF.schema.options({ lang: 'en' }).lang, 'en');
    eq(MF.schema.options({ lang: 'klingon' }).lang, 'fr');
  });
  test('dictionnaire anglais : mots propres et définis', () => {
    const en = MF.lexicon.get('en');
    const words = Object.keys(en);
    assert(words.length > 3000, `${words.length} mots seulement`);
    for (const w of words) assert(/^[A-Z]{2,9}$/.test(w) && en[w], `entrée invalide : ${w}`);
  });
  test('mots fléchés en anglais : remplissage avec le dictionnaire anglais', async () => {
    const en = MF.lexicon.get('en');
    const words = MF.util.shuffle(Object.keys(en).filter(w => w.length >= 3 && w.length <= 8), MF.util.rng(5)).slice(0, 15)
      .map((w, i) => ({ id: `en${i}`, text: w, clue: en[w], priority: false }));
    const page = await MF.builder.generate(words, MF.schema.options({ lang: 'en', effort: 'fast' }), { seed: 42 });
    eq(checkBuilder(page), [], 'règles');
    const fillers = page.words.filter(w => w.src !== 'theme');
    assert(fillers.length > 0 && fillers.every(w => en[w.word]), 'mots de remplissage anglais');
  });

  /* ---------------- Partage ---------------- */
  test('lien de partage : aller-retour', async () => {
    const words = randomWords(8, 21);
    const page = await MF.builder.generate(words, MF.schema.options({ effort: 'fast' }), { seed: 9 });
    const pz = MF.schema.puzzle({ name: 'Test', words, layout: { engine: 'builder', pages: [page], hash: 'x', at: 1 } });
    const link = await MF.share.link(pz);
    const back = await MF.share.read(link.slice(link.indexOf('#')));
    eq([back.name, back.words.length, back.layout.pages[0].rows], ['Test', 8, page.rows]);
  });
  test('lien de partage : lien trafiqué refusé', async () => {
    let failed = false;
    try { await MF.share.read('#g=AAAA%%%'); } catch { failed = true; }
    assert(failed);
  });

  /* ---------------- Page et proportions de la grille ---------------- */
  const posterOf = (format, orientation = 'portrait') => ({ ...MF.design.DEFAULT.poster, format, orientation });
  test('page : la grille prend les proportions de la page', () => {
    const fr = (f, o) => MF.paper.frame(posterOf(f, o));
    eq(fr('A4'), { aspect: 0.72, large: false });
    eq(fr('A4', 'landscape'), { aspect: 1.39, large: false });
    eq(fr('A3').large, true, 'A3 = grande grille');
    eq(fr('fit'), { aspect: 0.72, large: false }, 'page ajustée : portrait par défaut');
    eq(fr('fit', 'landscape').aspect, 1.39, 'page ajustée : sens choisi');
    assert(fr('story').aspect < 0.6 && Math.abs(fr('square').aspect - 1) < 0.05, 'formats écran');
  });
  test('page : grilles déjà calculées toujours à jour (mêmes empreintes)', () => {
    const key = (f, o, extra = {}) => MF.paper.key({ ...MF.paper.frame(posterOf(f, o)), ...extra });
    eq([key('fit'), key('A4'), key('A4', 'landscape'), key('A3'), key('fit', 'landscape')], ['A4 portrait', 'A4 portrait', 'A4 paysage', 'A3 portrait', 'A4 paysage']);
    eq(key('story', 'portrait', { size: 'fixed' }), 'A4 portrait', 'taille fixe : la page ne change pas la grille');
    eq(key('story', 'portrait', { shape: 'heart' }), 'A4 portrait', 'forme : proportions propres');
  });
  test('page : l\'ancienne « feuille de référence » est reprise par le format de page', () => {
    const a3 = MF.schema.puzzle({ options: { paper: 'A3', orientation: 'landscape' } });
    eq([a3.design.poster.format, a3.design.poster.orientation, 'paper' in a3.options], ['A3', 'landscape', false]);
    const kept = MF.schema.puzzle({ options: { paper: 'A3' }, design: { poster: { format: 'story' } } });
    eq(kept.design.poster.format, 'story', 'un format de page déjà choisi l\'emporte');
  });
  test('page : tailles fixes proposées selon la page', () => {
    const p = MF.paper.presets({ aspect: 0.72 });
    eq(p.map(x => `${x.cols}x${x.rows}`), ['12x17', '15x21', '17x24', '15x15']);
    assert(MF.paper.presets({ aspect: 1.39 }).every(x => x.cols >= x.rows), 'paysage');
    assert(MF.paper.presets({ aspect: 0.72, large: true })[1].rows === 30, 'A3');
  });

  /* ---------------- Chargeur ---------------- */
  test('chargeur : chaque fichier listé une seule fois et présent', async () => {
    const app = MF.loader.ENTRIES.app;
    eq(app.length, new Set(app).size, 'doublons');
    const missing = [];
    await Promise.all(MF.loader.all().map(async p => { const r = await fetch(`../${p}`, { method: 'HEAD', cache: 'no-store' }); if (!r.ok) missing.push(p); }));
    eq(missing, [], 'fichiers absents');
  });
  test('chargeur : le worker ne charge que le moteur, dans le même ordre que la page', () => {
    const app = MF.loader.ENTRIES.app;
    const order = MF.loader.WORKER.map(p => app.indexOf(p));
    assert(order.every(i => i >= 0), 'fichier du worker absent de la page');
    eq(order, [...order].sort((a, b) => a - b), 'ordre différent');
    assert(!MF.loader.WORKER.some(p => /\/ui\/|\/app/.test(p)), 'interface chargée dans le worker');
  });
  test('dictionnaires : chargés à la demande, une seule fois', async () => {
    await MF.lexicon.ensure('en');
    assert(MF.lexicon.ready('en') && MF.loader.hasLexicon('en'));
    eq(MF.lexicon.pick('xx'), 'fr');
  });
  test('jeux : registre des moteurs', () => {
    assert(MF.games.engine('meles') === MF.wordsearch && MF.games.engine('croises') === MF.builder && MF.games.engine('inconnu') === MF.builder);
  });

  test('jeux : particularités déclarées une seule fois', () => {
    for (const [id, g] of Object.entries(MF.games.GAMES)) {
      assert(MF.themes.THEMES[g.theme], `${id} : thème ${g.theme} inconnu`);
      eq(g.wordSearch, g.engine === 'meles', `${id} : wordSearch`);
    }
    const pz = MF.schema.puzzle({ game: 'fleches', layout: null });
    assert(!MF.games.compatible(pz), 'sans grille');
    pz.layout = { engine: 'builder' };
    assert(MF.games.compatible(pz) && !MF.games.compatible({ ...pz, game: 'meles' }), 'moteur du jeu');
  });
  test('grille : mots de l\'utilisateur et clés des mots', () => {
    const builder = { engine: 'builder', words: [{ dir: 'H', r: 1, c: 2, wid: 'w1', src: 'theme' }, { dir: 'V', r: 0, c: 0, src: 'curated' }, { dir: 'H', r: 3, c: 0, wid: 'w2', src: 'curated' }] };
    eq(MF.gridModel.placedIn(builder).map(w => w.wid), ['w1']);
    eq(MF.gridModel.wordKey(builder, 0), 'H:1,2');
    const meles = { engine: 'meles', words: [{ wid: 'a' }, { word: 'X' }] };
    eq(MF.gridModel.placedIn(meles).map(w => w.wid), ['a']);
    eq(MF.gridModel.wordKey(meles, 1), 'W1');
  });
  test('schéma : images utilisées par une grille', () => {
    const pz = MF.schema.puzzle({
      design: { background: { type: 'image', imageId: 'bgimage1' } },
      stickers: [{ kind: 'image', imageId: 'photo001' }, { kind: 'emoji', emoji: '⭐' }],
    });
    eq(MF.schema.assetIds(pz), ['bgimage1', 'photo001']);
    eq(MF.schema.assetIds(MF.schema.puzzle({})), []);
    eq(MF.schema.assetIds(null), []);
  });

  /* ---------------- Store (isolé : jamais les vraies données) ---------------- */
  /** Store de test avec deux grilles, A (active) et B ; renvoie aussi leurs identifiants. */
  const testStore = () => {
    const s = MF.createStore({ key: 'mfm:test', persist: false });
    s.load({ puzzles: [{ name: 'A' }, { name: 'B' }] });
    const [a, b] = s.get().puzzles.map(p => p.id);
    return { s, a, b };
  };
  const rename = (s, name, opts) => s.update(st => { st.puzzles.find(p => p.id === st.activeId).name = name; }, 'puzzle', opts);
  test('store : annuler / rétablir une modification', () => {
    const { s } = testStore();
    rename(s, 'A1');
    eq(s.active().name, 'A1');
    assert(s.undo() && s.active().name === 'A', 'annuler');
    assert(s.redo() && s.active().name === 'A1', 'rétablir');
    assert(!s.redo(), 'rien à rétablir');
  });
  test('store : l\'annulation revient sur la grille modifiée', () => {
    const { s, a, b } = testStore();
    rename(s, 'A1');
    s.update(st => { st.activeId = b; }, 'active');
    rename(s, 'B1');
    s.undo();
    eq([s.active().id, s.active().name], [b, 'B']);
    s.undo();
    eq([s.active().id, s.active().name], [a, 'A'], 'retour sur la grille A');
    eq(s.puzzle(b).name, 'B', 'B intacte');
  });
  test('store : suppression d\'une grille annulable', () => {
    const { s, a, b } = testStore();
    s.update(st => { st.puzzles = st.puzzles.filter(p => p.id !== a); st.activeId = b; }, 'puzzles');
    eq(s.get().puzzles.map(p => p.id), [b]);
    s.undo();
    eq([s.get().puzzles.map(p => p.id), s.active().id], [[a, b], a]);
  });
  test('store : un curseur qu\'on fait glisser = une seule étape', () => {
    const { s } = testStore();
    for (let i = 0; i < 10; i++) rename(s, `A${i}`, { coalesce: 'slider' });
    s.undo();
    eq(s.active().name, 'A');
    assert(!s.canUndo());
  });
  test('store : révision inchangée pour un réglage d\'affichage', () => {
    const { s } = testStore();
    const r0 = s.rev();
    s.update(st => { st.ui.cell = 40; }, 'zoom');
    s.update(st => { st.puzzles[0].design.accent = '#123456'; }, 'design');
    eq(s.rev(), r0, 'réglages cosmétiques');
    rename(s, 'A1');
    assert(s.rev() > r0, 'contenu modifié');
  });
  test('store : état illisible assaini', () => {
    const s = MF.createStore({ persist: false });
    const st = s.load({ theme: 'rose', ui: { cell: 9999, tab: '<script>' }, puzzles: 'nope', activeId: 'x' });
    eq([st.theme === 'rose', st.ui.cell, st.ui.tab, st.puzzles, st.activeId], [false, 140, 'words', [], null]);
  });

  test('store : restauration de toutes les grilles annulable', () => {
    const { s, a, b } = testStore();
    s.replacePuzzles([{ name: 'Z' }], null);
    eq(s.get().puzzles.map(p => p.name), ['Z']);
    s.undo();
    eq([s.get().puzzles.map(p => p.id), s.active().id], [[a, b], a]);
  });
  test('store : images de l\'historique gardées', () => {
    const { s } = testStore();
    s.update(st => { st.puzzles[0].design.background.imageId = 'oldimage'; }, 'design', { coalesce: 'un' });
    s.update(st => { st.puzzles[0].design.background.imageId = 'newimage'; }, 'design', { coalesce: 'deux' });
    const used = s.usedAssets();
    assert(used.has('newimage') && used.has('oldimage'), 'image restaurable par Ctrl+Z');
  });
  test('store : stockage plein signalé, sans perte de l\'état', () => {
    const key = 'mfm:test-quota';
    const s = MF.createStore({ key, persist: true });
    s.load({ puzzles: [{ name: 'A' }] });
    const reasons = [];
    s.subscribe(r => reasons.push(r));
    const write = MF.storage.write;
    MF.storage.write = () => { throw new DOMException('plein', 'QuotaExceededError'); };
    try {
      assert(!s.flush(), 'écriture refusée');
      eq(reasons, ['quota']);
      eq(s.active().name, 'A', 'état gardé en mémoire');
    } finally { MF.storage.write = write; }
    assert(s.flush(), 'écriture rétablie');
    eq(MF.storage.getJSON(key).puzzles[0].name, 'A');
    MF.storage.remove(key);
  });
  test('store : tout effacer vide aussi l\'historique', async () => {
    const { s } = testStore();
    rename(s, 'A1');
    await s.wipe();
    eq([s.get().puzzles, s.canUndo(), s.canRedo()], [[], false, false]);
  });

  /* ---------------- Actions (store isolé, interface simulée) ---------------- */
  /** Actions branchées sur un store de test ; MF.ui et MF.assets simulés le temps du test. */
  async function withActions(fn, { puzzle = {} } = {}) {
    const saved = { store: MF.store, ui: MF.ui, fromDataUrl: MF.assets.fromDataUrl, raf: window.requestAnimationFrame };
    const toasts = [];
    MF.store = MF.createStore({ persist: false });
    MF.store.load({ puzzles: [{ name: 'Test', options: { lang: 'fr' }, ...puzzle }] });
    MF.ui = { toast: (msg, kind) => toasts.push({ msg, kind }), confirm: async () => true };
    window.requestAnimationFrame = () => 0;
    MF.dictionary.use('fr');
    const app = { view: { draft: {}, page: 0 }, renderAll() {}, renderSide() {}, regenerate() {}, setMode() {} };
    try { await fn(MF.createActions(app), MF.store, toasts); } finally {
      MF.store = saved.store; MF.ui = saved.ui; MF.assets.fromDataUrl = saved.fromDataUrl; window.requestAnimationFrame = saved.raf;
    }
  }
  test('actions : ajout de mots sans doublon ni mot trop court', () => withActions((actions, store) => {
    const known = Object.keys(MF.cluesFr).find(w => w.length > 4);
    const n = actions.addWords([{ text: 'Été' }, { text: 'ete' }, { text: 'a' }, { text: known.toLowerCase() }, { text: 'Zorglubix' }]);
    eq(n, 3);
    eq(store.active().words.map(w => MF.util.normalize(w.text)), ['ETE', known, 'ZORGLUBIX']);
    eq(store.active().words[1].clue, MF.cluesFr[known], 'définition du dictionnaire');
    eq(actions.addWords([{ text: 'ete' }], { silent: true }), 0, 'déjà présent');
  }));
  test('actions : limite du nombre de mots respectée', () => {
    const words = Array.from({ length: MF.schema.LIMITS.words - 1 }, (_, i) => ({ text: `MOT${i}`.replace(/\d/g, d => 'ABCDEFGHIJ'[d]) }));
    return withActions((actions, store) => {
      eq(actions.addWords([{ text: 'XYLOPHONE' }, { text: 'ZEBRURE' }], { silent: true }), 1);
      eq(store.active().words.length, MF.schema.LIMITS.words);
    }, { puzzle: { words } });
  });
  test('actions : restauration d\'une sauvegarde (images renumérotées, grille remplacée)', () => withActions(async (actions, store, toasts) => {
    const existing = store.active();
    let n = 0;
    MF.assets.fromDataUrl = async url => (url === 'data:good' ? { id: `restored${++n}` } : null);
    const backup = {
      app: 'mots-fleches-maker', v: 3,
      puzzles: [
        { ...existing, name: 'Remplacée', stickers: [{ kind: 'image', imageId: 'photoAA1' }, { kind: 'image', imageId: 'photoBB2' }] },
        { name: 'Nouvelle', design: { background: { type: 'image', imageId: 'photoAA1' } } },
      ],
      assets: { photoAA1: 'data:good', photoBB2: 'data:bad' },
    };
    await actions.openFile(new File([JSON.stringify(backup)], 'sauvegarde.json', { type: 'application/json' }));
    const list = store.get().puzzles;
    eq(list.map(p => p.name), ['Remplacée', 'Nouvelle'], 'même identifiant remplacé, nouvelle ajoutée');
    eq(list[0].stickers.map(s => s.imageId), ['restored1'], 'image illisible retirée');
    eq(list[1].design.background.imageId, 'restored1');
    assert(toasts.some(t => t.kind === 'ok'), 'confirmation');
    assert(store.undo() && store.get().puzzles.length === 1, 'annulable');
  }));
  test('actions : décor, ordre et suppression', () => withActions((actions, store) => {
    actions.addSticker({ kind: 'emoji', emoji: '⭐' });
    actions.addSticker({ kind: 'emoji', emoji: '🌙' });
    const [first, second] = store.active().stickers.map(s => s.id);
    actions.moveSticker(second, -1);
    eq(store.active().stickers.map(s => s.id), [second, first]);
    actions.stickerAction('dup', first);
    eq(store.active().stickers.length, 3);
    actions.stickerAction('del', first);
    assert(!store.active().stickers.some(s => s.id === first));
  }));

  /* ---------------- Jeu ---------------- */
  test('progression : les parties périmées sont supprimées', () => {
    const P = 'mfm:play:';
    const fake = { [`${P}a@1#0`]: '{}', [`${P}a@0#0`]: '{}', [`${P}z@5#0`]: '{}', other: 'x', removeItem(k) { delete this[k]; } };
    const removed = MF.play.prune([{ id: 'a', layout: { at: 1 } }], { storage: fake });
    eq([removed, Object.keys(fake).filter(k => k.startsWith(P))], [2, [`${P}a@1#0`]]);
    eq(MF.play.prune([], { all: true, keep: 'a@1#0', storage: fake }), 0, 'partie en cours gardée');
  });
  test('progression : chronomètre', () => eq(MF.play.elapsed(Date.now() - 125000), '2:05'));
  test('diagnostic : définitions manquantes', () => {
    const pz = MF.schema.puzzle({ game: 'fleches', words: [{ text: 'chat', clue: '' }, { text: 'chien', clue: 'Aboie' }] });
    const fillers = [{ word: 'ROI', clue: '' }, { word: 'ART', clue: 'Beau' }];
    eq(MF.diagnostics.missing(pz, fillers), 2);
    eq(MF.diagnostics.missing(pz, fillers, { words: false }), 1);
    eq(MF.diagnostics.missing({ ...pz, game: 'meles' }, fillers), 0, 'mots mêlés : pas de définitions');
  });

  /* ---------------- QR codes ---------------- */
  test('QR code : taille, motifs de repérage, capacité', () => {
    const qr = MF.qr.encode('https://exemple.fr/#g=abc');
    eq([qr.version, qr.size], [2, 25]);
    const finder = (x0, y0) => [0, 6].every(d => qr.modules[y0][x0 + d] && qr.modules[y0 + d][x0]) && !qr.modules[y0 + 1][x0 + 1] && qr.modules[y0 + 3][x0 + 3];
    assert(finder(0, 0) && finder(qr.size - 7, 0) && finder(0, qr.size - 7), 'motifs de repérage');
    eq(MF.qr.encode('x'.repeat(MF.qr.capacity('L') + 1)), null, 'trop long');
    eq(MF.qr.encode('x'.repeat(MF.qr.capacity('L'))).version, 40);
    assert(/^<svg[^>]+viewBox="0 0 33 33"/.test(MF.qr.svg(qr)), 'SVG');
  });

  /* ---------------- Partage ---------------- */
  test('lien de partage : photos et image de fond annoncées, jamais incluses', async () => {
    const words = randomWords(6, 31);
    const page = await MF.builder.generate(words, MF.schema.options({ effort: 'fast' }), { seed: 4 });
    const pz = MF.schema.puzzle({
      words, layout: { engine: 'builder', pages: [page], hash: 'x', at: 1 },
      design: { background: { type: 'image', imageId: 'img1' } },
      stickers: [{ kind: 'image', imageId: 'img2' }, { kind: 'emoji', emoji: '⭐' }],
    });
    eq(MF.share.omitted(pz), { photos: 1, background: true });
    const back = await MF.share.read((await MF.share.link(pz)).replace(/^[^#]*/, ''));
    eq([back.stickers.map(s => s.kind), back.design.background.type], [['emoji'], 'solid']);
  });

  /* ---------------- Packs, records, sauvegarde ---------------- */
  test('packs à thème : 25 mots définis par pack, mêmes thèmes en français et en anglais', () => {
    eq(Object.keys(MF.packs), Object.keys(MF.packsEn), 'thèmes différents');
    for (const [lang, packs] of [['fr', MF.packs], ['en', MF.packsEn]]) {
      for (const [id, p] of Object.entries(packs)) {
        assert(p.label && p.emoji, `${lang}/${id} : libellé`);
        assert(p.words.length >= 25, `${lang}/${id} : ${p.words.length} mots`);
        const seen = new Set();
        for (const [w, c] of p.words) {
          const n = MF.util.normalize(w);
          assert(n.length >= 2 && !seen.has(n), `${lang}/${id} : « ${w} » invalide ou en double`);
          assert(MF.schema.word({ text: w, clue: c })?.clue === c, `${lang}/${id} : définition de « ${w} »`);
          seen.add(n);
        }
      }
    }
  });
  test('jeu : meilleur temps retenu, record battu seulement s\'il est meilleur', () => {
    const mem = { data: {}, getItem(k) { return this.data[k] ?? null; }, setItem(k, v) { this.data[k] = String(v); }, removeItem(k) { delete this.data[k]; } };
    const storage = /** @type {any} */ (mem);
    eq(MF.play.record('p@1#0', 90, storage), { best: 90, previous: 0, isNew: true });
    eq(MF.play.record('p@1#0', 120, storage), { best: 90, previous: 90, isNew: false });
    eq(MF.play.record('p@1#0', 60, storage), { best: 60, previous: 90, isNew: true });
    eq(MF.play.clock(605), '10:05');
  });
  test('sauvegarde : rappel seulement après des changements non sauvegardés', () => {
    const st = MF.createStore({ persist: false });
    const day = 86400000, now = Date.now();
    st.load({ puzzles: [] });
    assert(!st.backupDue(7, now), 'aucune grille');
    st.load({ puzzles: [{ name: 'A', words: [{ text: 'chat' }], createdAt: now - 2 * day, updatedAt: now - day }] });
    assert(st.backupDue(7, now), 'jamais sauvegardé, grille de 2 jours');
    st.load({ puzzles: [{ name: 'A', words: [{ text: 'chat' }], createdAt: now - 3600000, updatedAt: now }] });
    assert(!st.backupDue(7, now), 'grille toute neuve');
  });

  /* ---------------- Murdoku ---------------- */
  /** Contrat d'un puzzle Murdoku (docs/murdoku-format.md) : renvoie la liste des violations. */
  function checkMurdoku(pz) {
    const M = MF.murdoku, errs = [];
    const N = pz.size;
    if (pz.engine !== 'murdoku' || pz.v !== 1) errs.push('en-tête');
    if (!(N >= 5 && N <= 8) || pz.cells.length !== N || pz.cells.some(row => row.length !== N)) errs.push('taille');
    pz.rooms.forEach((r, i) => { if (r.id !== i || !M.ROOMS[r.type]) errs.push(`pièce ${i}`); });
    // Pièces contiguës, toutes utilisées
    for (const room of pz.rooms) {
      const cells = [];
      pz.cells.forEach((row, r) => row.forEach((v, c) => { if (v === room.id) cells.push([r, c]); }));
      if (!cells.length) { errs.push(`pièce ${room.id} vide`); continue; }
      const seen = new Set([cells[0].join()]), todo = [cells[0]];
      while (todo.length) {
        const [r, c] = todo.pop();
        for (const [y, x] of [[r - 1, c], [r + 1, c], [r, c - 1], [r, c + 1]]) {
          if (pz.cells[y]?.[x] === room.id && !seen.has(`${y},${x}`)) { seen.add(`${y},${x}`); todo.push([y, x]); }
        }
      }
      if (seen.size !== cells.length) errs.push(`pièce ${room.id} non contiguë`);
      if (room.type === 'garden' && !cells.some(([r, c]) => !r || !c || r === N - 1 || c === N - 1)) errs.push('jardin loin du bord');
    }
    const objAt = new Map();
    for (const o of pz.objects) {
      if (!M.OBJECTS[o.type]) errs.push(`objet ${o.type}`);
      if (objAt.has(`${o.r},${o.c}`)) errs.push(`deux objets en ${o.r},${o.c}`);
      objAt.set(`${o.r},${o.c}`, o.type);
    }
    // Solution : une personne par ligne et par colonne, jamais sur un objet bloquant
    eq(pz.people.length, N, 'nombre de personnes');
    if (new Set(pz.people.map(p => p.r)).size !== N || new Set(pz.people.map(p => p.c)).size !== N) errs.push('ligne ou colonne en double');
    for (const p of pz.people) {
      const t = objAt.get(`${p.r},${p.c}`);
      if (t && !M.OBJECTS[t].occupiable) errs.push(`${p.id} sur ${t}`);
      if (!MF.util.HEX.test(p.color) || !p.name) errs.push(`${p.id} : nom ou couleur`);
    }
    const victims = pz.people.filter(p => p.role === 'victim');
    if (victims.length !== 1 || victims[0].id !== pz.victim) errs.push('victime');
    if (new Set(pz.people.map(p => p.name)).size !== N) errs.push('prénoms en double');
    // Le coupable est le seul suspect seul avec la victime
    const roomOf = p => pz.cells[p.r][p.c];
    const withVictim = pz.people.filter(p => p.role === 'suspect' && roomOf(p) === roomOf(victims[0]));
    if (withVictim.length !== 1 || withVictim[0].id !== pz.murderer) errs.push('coupable pas seul avec la victime');
    const placement = Object.fromEntries(pz.people.map(p => [p.id, { r: p.r, c: p.c }]));
    if (M.murdererOf(pz, placement) !== pz.murderer) errs.push('murdererOf');
    if (!M.isSolved(pz, placement)) errs.push('isSolved');
    // Indices vrais, bien formés, sans désigner directement le coupable
    for (const cl of pz.clues) {
      if (!M.validClue(cl, pz)) errs.push(`indice mal formé ${JSON.stringify(cl)}`);
      else if (!M.holds(pz, cl, placement)) errs.push(`indice faux ${JSON.stringify(cl)}`);
      const pair = [cl.a, cl.b];
      if (cl.kind === 'withPerson' && pair.includes(pz.murderer) && pair.includes(pz.victim)) errs.push('indice : coupable avec la victime');
      if (cl.kind === 'inRoom' && cl.person === pz.murderer && cl.room === roomOf(victims[0])) errs.push('indice : coupable dans la pièce de la victime');
      const text = M.clueText(cl, pz);
      if (!text || /[{}]|undefined/.test(text)) errs.push(`texte : ${text}`);
    }
    // Solution unique, égale à celle du puzzle
    const sols = M.solve(pz);
    if (sols.length !== 1) errs.push(`${sols.length} solutions`);
    else if (JSON.stringify(sols[0]) !== JSON.stringify(placement)) errs.push('solution différente');
    return errs;
  }
  test('murdoku : puzzles conformes, solution unique, coupable seul avec la victime', () => {
    const times = [];
    for (const size of [5, 6, 7, 8]) {
      for (const difficulty of ['easy', 'medium', 'hard', 'expert']) {
        for (const seed of [1, 77, 4242]) {
          const opts = { size, difficulty, rooms: ['few', 'normal', 'many'][seed % 3], density: ['sparse', 'normal', 'full'][size % 3] };
          const t0 = performance.now();
          const pz = MF.murdoku.generate(opts, seed * 1000 + size);
          times.push(performance.now() - t0);
          assert(pz, `aucun puzzle ${JSON.stringify(opts)}`);
          const errs = checkMurdoku(pz);
          assert(!errs.length, `${size}×${size} ${difficulty} graine ${seed} : ${errs.slice(0, 5).join(' ; ')}`);
        }
      }
    }
    const avg = times.reduce((a, b) => a + b, 0) / times.length;
    assert(avg < 300, `génération trop lente : ${Math.round(avg)} ms en moyenne`);
    assert(Math.max(...times) < 2500, `génération trop lente : ${Math.round(Math.max(...times))} ms au pire`);
  });
  test('murdoku : même graine, même puzzle', () => {
    for (const size of [5, 8]) {
      const a = MF.murdoku.generate({ size, difficulty: 'hard' }, 99);
      const b = MF.murdoku.generate({ size, difficulty: 'hard' }, 99);
      eq(JSON.stringify(a), JSON.stringify(b), 'déterminisme');
      assert(JSON.stringify(a) !== JSON.stringify(MF.murdoku.generate({ size, difficulty: 'hard' }, 100)), 'graines différentes');
    }
  });
  test('murdoku : options (prénoms, victime, types de pièces, sortes d\'indices)', () => {
    const pz = MF.murdoku.generate({ size: 6, names: ['Zorro', 'Alice', 'alice', ' '], victimName: 'Hector', roomTypes: ['kitchen', 'garden', 'bedroom', 'office'], clueKinds: ['inRoom', 'besideObject', 'above', 'leftOf', 'roomCount'], lang: 'en' }, 3);
    eq(checkMurdoku(pz), [], 'contrat');
    eq(pz.people.slice(0, 2).map(p => p.name), ['Zorro', 'Alice'], 'prénoms donnés');
    eq(pz.people.find(p => p.role === 'victim').name, 'Hector', 'victime');
    assert(pz.rooms.every(r => ['kitchen', 'garden', 'bedroom', 'office'].includes(r.type)), 'types de pièces');
    assert(pz.clues.every(cl => ['inRoom', 'besideObject', 'above', 'leftOf', 'roomCount'].includes(cl.kind)), 'sortes d\'indices');
    // Sorte d'indice insuffisante seule : repli sur les lignes et colonnes, solution toujours unique
    const lone = MF.murdoku.generate({ size: 5, clueKinds: ['onObject'] }, 8);
    eq(checkMurdoku(lone), [], 'repli');
  });
  test('murdoku : solveur, vérification et textes', () => {
    const M = MF.murdoku;
    const pz = M.generate({ size: 6, difficulty: 'medium' }, 2024);
    assert(M.solve(pz, [], 2).length === 2, 'sans indice : plusieurs solutions');
    const sol = M.solve(pz)[0];
    const wrong = { ...sol, [pz.victim]: { r: sol[pz.victim].r, c: (sol[pz.victim].c + 1) % pz.size } };
    assert(!M.isSolved(pz, wrong), 'disposition fausse acceptée');
    assert(!M.isSolved(pz, {}), 'disposition vide acceptée');
    eq(M.solve(pz, [...pz.clues, { kind: 'inRoom', person: 'nobody', room: 0 }]).length, 1, 'indice mal formé ignoré');
    // Chaque sorte d'indice a un texte, en français forcé comme dans la langue de l'interface
    const p = pz.people;
    const all = [
      { kind: 'inRoom', person: p[0].id, room: 0 }, { kind: 'notInRoom', person: p[0].id, room: 0 },
      { kind: 'onObject', person: p[0].id, object: 'chair' }, { kind: 'onObject', person: p[0].id, object: 'table' },
      { kind: 'besideObject', person: p[0].id, object: 'plant' }, { kind: 'notBesideObject', person: p[0].id, object: 'plant' },
      { kind: 'edge', person: p[0].id }, { kind: 'notEdge', person: p[0].id }, { kind: 'row', person: p[0].id, row: 2 },
      { kind: 'column', person: p[0].id, col: 1 }, { kind: 'sameRow', person: p[0].id, object: 'bed' },
      { kind: 'sameColumn', person: p[0].id, object: 'tv' }, { kind: 'alone', person: p[0].id },
      { kind: 'withPerson', a: p[0].id, b: p[1].id }, { kind: 'notWith', a: p[0].id, b: p[1].id },
      { kind: 'above', a: p[0].id, b: p[1].id }, { kind: 'below', a: p[0].id, b: p[1].id },
      { kind: 'leftOf', a: p[0].id, b: p[1].id }, { kind: 'rightOf', a: p[0].id, b: p[1].id },
      { kind: 'roomCount', room: 0, n: 1 }, { kind: 'roomCount', room: 0, n: 3 }, { kind: 'emptyRoom', room: 0 },
    ];
    eq([...new Set(all.map(c => c.kind))].sort(), [...M.KINDS].sort(), 'toutes les sortes');
    for (const cl of all) {
      for (const lang of [undefined, 'fr']) {
        const s = M.clueText(cl, pz, lang);
        assert(s && !/[{}]|undefined/.test(s), `${cl.kind} : ${s}`);
      }
    }
    assert(['était sur la colonne B.', 'La colonne B : voilà où se trouvait'].some(x => M.clueText({ kind: 'column', person: p[0].id, col: 1 }, pz, 'fr').includes(x)), 'colonne');
    const left = M.clueText({ kind: 'leftOf', a: p[0].id, b: p[1].id }, { ...pz, people: [{ id: p[0].id, name: 'Bruno' }, { id: p[1].id, name: 'Alice' }] }, 'fr');
    assert(["Bruno était plus à gauche qu'Alice.", "Bruno se trouvait sur une colonne à gauche de celle d'Alice."].includes(left), left);
    // Formulation stable pour un même indice
    eq(M.clueText(all[0], pz, 'fr'), M.clueText({ ...all[0] }, pz, 'fr'), 'formulation stable');
    assert(M.rulesText().length >= 3 && M.rulesText().every(s => s.length > 10), 'règles');
    for (const t of M.ROOM_TYPES) assert(M.roomLabel(t) && M.roomLabel(t) !== t, `pièce ${t}`);
    for (const t of Object.keys(M.OBJECTS)) assert(M.objectLabel(t) && M.objectLabel(t) !== t, `objet ${t}`);
  });

  test('murdoku : univers (noms, lieux, objets, histoire) et retouches', () => {
    const M = MF.murdoku, U = MF.murdokuThemes;
    assert(U.ids.length >= 15, 'univers');
    for (const id of U.ids) {
      const th = U.THEMES[id];
      for (const lang of ['fr', 'en']) {
        const res = U.resolve(id, lang);
        assert(res.names.length >= 7 && new Set(res.names).size === res.names.length, `${id} ${lang} : prénoms`);
        assert(res.victims.length >= 2 && res.story.includes('{victim}'), `${id} ${lang} : victimes et histoire`);
        for (const type of res.roomTypes) assert(M.ROOMS[type] && res.rooms[type].name && res.rooms[type].in, `${id} : pièce ${type}`);
        for (const type of Object.keys(th.objects)) assert(M.OBJECTS[type] && res.objects[type].a, `${id} : objet ${type}`);
      }
      assert(!Object.keys(th.rooms).length || Object.keys(th.rooms).length >= 8, `${id} : assez de lieux`);
      const pz = M.generate({ size: 6, difficulty: 'hard', lang: 'fr', theme: U.resolve(id, 'fr') }, 31);
      eq(checkMurdoku(pz), [], `${id} : contrat`);
      const th2 = U.resolve(id, 'fr');
      assert(pz.people.filter(x => x.role === 'suspect').every(x => th2.names.includes(x.name)), `${id} : prénoms de l'univers`);
      if (Object.keys(th.rooms).length) assert(pz.rooms.every(r => r.name && r.in && th2.roomTypes.includes(r.type)), `${id} : pièces habillées`);
      assert(pz.story && !pz.story.includes('{victim}'), `${id} : histoire`);
      // Intact après validation (lien partagé)
      const back = MF.schema.layout({ engine: 'murdoku', pages: [pz], hash: 'x', at: 1 }).pages[0];
      eq([back.rooms.map(r => r.name), back.objectNames, back.story], [pz.rooms.map(r => r.name), pz.objectNames, pz.story], `${id} : validation`);
    }
    // Générateur : variantes différentes selon la graine, toujours bien formées
    const stories = new Set(), nicknamed = new Set();
    for (const id of U.ids) for (const lang of ['fr', 'en']) for (let seed = 1; seed <= 6; seed++) {
      const g = U.resolve(id, lang, {}, seed);
      eq(U.resolve(id, lang, {}, seed).story, g.story, `${id} : déterministe`);
      assert(g.story.includes('{victim}') && g.story.length <= 600 && !/undefined|\{thing\}/.test(g.story), `${id} ${lang} : histoire ${g.story}`);
      assert(g.names.length >= 7 && g.names.every(n => n.length <= 20) && new Set(g.names).size === g.names.length, `${id} : prénoms ${g.names}`);
      assert(g.victims.length >= 2 && g.victims.every(v => v && v.length <= 20), `${id} : victimes`);
      stories.add(g.story);
      g.names.filter(n => n.includes(' ')).forEach(n => nicknamed.add(n));
    }
    assert(stories.size > U.ids.length * 6, `histoires variées : ${stories.size}`);
    assert(nicknamed.size > 50, `surnoms : ${nicknamed.size}`);
    const gz = M.generate({ size: 7, lang: 'fr', theme: U.resolve('pirates', 'fr', {}, 9) }, 9);
    eq(checkMurdoku(gz), [], 'contrat avec le générateur');
    // Retouches : un lieu, un objet, l'histoire
    const res = U.resolve('pirates', 'fr', { rooms: { kitchen: { name: 'Cave à rhum' } }, objects: { bed: 'Paillasse' }, story: 'Adieu {victim}.' });
    eq([res.rooms.kitchen.name, res.rooms.kitchen.in, res.objects.bed.a, res.story], ['Cave à rhum', 'dans la cave à rhum', 'une paillasse', 'Adieu {victim}.']);
    eq(U.resolve('pirates', 'en', { objects: { bed: 'anchor' } }).objects.bed.a, 'an anchor');
    // Textes dans la langue de l'énigme
    const en = M.generate({ size: 5, lang: 'en', theme: U.resolve('space', 'en') }, 5);
    const txt = en.clues.map(c => M.clueText(c, en)).join(' ');
    assert(txt && !/était|dans la |personne/.test(txt), `anglais : ${txt.slice(0, 160)}`);
  });

  test('murdoku : énigme intacte après validation (lien partagé), énigme trafiquée rejetée', () => {
    const pz = MF.murdoku.generate({ size: 6, difficulty: 'medium' }, 4242);
    const back = MF.schema.layout({ engine: 'murdoku', pages: [pz], hash: 'x', at: 1 }).pages[0];
    eq(back.clues, pz.clues, 'indices');
    eq([back.cells, back.people, back.murderer], [pz.cells, pz.people, pz.murderer], 'plateau');
    eq(MF.murdoku.solve(back).length, 1, 'solution unique');
    assert(!MF.schema.layout({ engine: 'murdoku', pages: [{ ...pz, people: pz.people.slice(1) }] }), 'personne manquante acceptée');
    assert(!MF.schema.layout({ engine: 'murdoku', pages: [{ ...pz, cells: pz.cells.slice(1) }] }), 'plateau tronqué accepté');
  });

  /* ---------------- Traductions ---------------- */
  test('traductions : chaque texte de l\'interface existe en anglais', async () => {
    const lit = String.raw`'((?:[^'\\]|\\.)*)'`;
    const keys = new Set();
    const files = MF.loader.ENTRIES.app.filter(p => !/i18n/.test(p));
    for (const p of files) {
      const src = await (await fetch(`../${p}`)).text();
      for (const m of src.matchAll(new RegExp(String.raw`\bt\(\s*` + lit, 'g'))) keys.add(m[1]);
      for (const m of src.matchAll(new RegExp(String.raw`plural\([^,]+,\s*` + lit + String.raw`(?:\s*,\s*` + lit + ')?', 'g'))) { keys.add(m[1]); keys.add(m[2] ?? `${m[1]}s`); }
    }
    const missing = [...keys].map(k => k.replace(/\\'/g, "'")).filter(k => !MF.i18n.has('en', k));
    assert(keys.size > 500, `${keys.size} textes trouvés seulement`);
    eq(missing, [], 'textes sans traduction anglaise');
  });

  /* ---------------- Exécution ---------------- */
  const table = document.getElementById('results');
  for (const t of tests) {
    const t0 = performance.now();
    let ok = true, detail = '';
    try { await t.fn(); } catch (e) { ok = false; detail = e.message; }
    const ms = Math.round(performance.now() - t0);
    results.push({ name: t.name, ok, detail, ms });
    table.insertAdjacentHTML('beforeend', `<tr><td class="${ok ? 'pass' : 'fail'}">${ok ? '✔' : '✘'}</td><td>${MF.util.esc(t.name)} <span class="detail">(${ms} ms)</span>${detail ? `<div class="detail">${MF.util.esc(detail)}</div>` : ''}</td></tr>`);
  }
  const failed = results.filter(r => !r.ok).length;
  const sum = document.getElementById('summary');
  sum.textContent = failed ? `${failed} test(s) en échec sur ${results.length}` : `${results.length} tests réussis`;
  sum.className = failed ? 'ko' : 'ok';
  document.title = `${failed ? '✘' : '✔'} ${sum.textContent}`;
  window.testResults = results;
})();
