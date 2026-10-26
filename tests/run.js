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
