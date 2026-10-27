// Tests automatiques (npm test, et à chaque push dans GitHub Actions) :
//   1. la page tests/index.html (moteur, données, sécurité, traductions) dans un vrai navigateur ;
//   2. un essai de l'application : démarrage sans erreur, création d'une grille, calcul dans le worker ;
//   3. les parcours principaux : annuler / rétablir, export PNG, sauvegarde puis restauration,
//      lien de partage, téléphone, accessibilité (axe) ;
//   0. avant tout : budget de poids des fichiers envoyés au navigateur.
// Un petit serveur statique sert le dépôt, comme GitHub Pages. Navigateur : Chromium de Playwright
// (PW_CHANNEL=msedge ou chrome, ou PW_EXECUTABLE=chemin, pour utiliser un navigateur déjà installé).
import { createServer } from 'node:http';
import { readFile, readdir, stat } from 'node:fs/promises';
import vm from 'node:vm';
import { extname, join, normalize, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';
import AxeBuilder from '@axe-core/playwright';

const ROOT = resolve(fileURLToPath(new URL('..', import.meta.url)));
const TYPES = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.svg': 'image/svg+xml', '.json': 'application/json', '.webmanifest': 'application/manifest+json', '.woff2': 'font/woff2', '.png': 'image/png' };

const server = createServer(async (req, res) => {
  const path = normalize(decodeURIComponent(new URL(req.url, 'http://x').pathname)).replace(/^([/\\])+/, '');
  const file = join(ROOT, path || 'index.html');
  if (!file.startsWith(ROOT)) { res.writeHead(403).end(); return; }
  try {
    const body = await readFile(file.endsWith('\\') || file.endsWith('/') ? join(file, 'index.html') : file);
    res.writeHead(200, { 'Content-Type': TYPES[extname(file)] || 'application/octet-stream', 'Cache-Control': 'no-store' });
    res.end(req.method === 'HEAD' ? undefined : body);
  } catch {
    res.writeHead(404).end();
  }
});
await new Promise(r => server.listen(0, '127.0.0.1', r));
const base = `http://127.0.0.1:${server.address().port}`;

const browser = await chromium.launch({ channel: process.env.PW_CHANNEL || undefined, executablePath: process.env.PW_EXECUTABLE || undefined });
/** Wiktionnaire / Wikipédia : jamais appelés pendant les tests (réponses vides, résultat reproductible hors ligne). */
const offlineApis = ctx => ctx.route(url => !url.href.startsWith(base), route => route.fulfill({ status: 200, contentType: 'application/json', body: '{}' }));
let failed = 0;
const fail = msg => { failed++; console.error(`✘ ${msg}`); };

/**
 * Budget de poids (Ko, non compressé) : une hausse involontaire (fichier dupliqué, données
 * collées par erreur) fait échouer la vérification. À relever consciemment si nécessaire.
 */
const BUDGET = { app: 1000, 'dictionnaire fr': 220, 'dictionnaire en': 220, styles: 160, polices: 800, images: 700, 'murdoku 3D': 900 };

/** Fichiers listés par js/loader.js (même liste que la page et le service worker). */
async function loaderLists() {
  /** @type {any} */
  const ctx = { MF: { base: 'http://x/' }, location: { href: 'http://x/' } };
  ctx.self = ctx;
  vm.createContext(ctx);
  vm.runInContext(await readFile(join(ROOT, 'js/loader.js'), 'utf8'), ctx);
  return ctx.MF.loader;
}
/** Énigme Murdoku cohérente : une personne par ligne et par colonne, un coupable parmi les suspects. */
function MF_solveCheck(pz) {
  const n = pz.size;
  if (new Set(pz.people.map(p => p.r)).size !== n || new Set(pz.people.map(p => p.c)).size !== n) return 'lignes ou colonnes en double';
  if (!pz.people.some(p => p.id === pz.murderer && p.role === 'suspect')) return 'coupable introuvable';
  return '';
}
const sizeOf = async files => (await Promise.all(files.map(f => stat(join(ROOT, f))))).reduce((n, st) => n + st.size, 0) / 1024;
const dir = async (d, ext) => (await readdir(join(ROOT, d))).filter(f => f.endsWith(ext)).map(f => `${d}/${f}`);

try {
  /* ---------- 0. Budget de poids ---------- */
  {
    const L = await loaderLists();
    const measured = {
      app: await sizeOf(L.ENTRIES.app),
      'dictionnaire fr': await sizeOf(L.LEXICONS.fr),
      'dictionnaire en': await sizeOf(L.LEXICONS.en),
      styles: await sizeOf(await dir('css', '.css')),
      polices: await sizeOf(await dir('fonts', '.woff2')),
      images: await sizeOf(await dir('icons', '.png')),
      // Rendu 3D du Murdoku : chargé seulement quand on ouvre une enquête
      'murdoku 3D': await sizeOf(['js/vendor/murdoku3d.js']),
    };
    for (const [k, kb] of Object.entries(measured)) {
      if (kb > BUDGET[k]) fail(`budget : ${k} ${kb.toFixed(0)} Ko > ${BUDGET[k]} Ko`);
      else console.log(`✔ budget : ${k} ${kb.toFixed(0)} / ${BUDGET[k]} Ko`);
    }
  }

  /* ---------- 1. Tests du moteur ---------- */
  {
    const page = await browser.newPage();
    page.on('pageerror', e => fail(`tests : ${e.message}`));
    await page.goto(`${base}/tests/index.html`);
    await page.waitForFunction(() => Array.isArray(window.testResults), null, { timeout: 180000 });
    const results = await page.evaluate(() => window.testResults);
    for (const r of results) {
      if (r.ok) console.log(`✔ ${r.name} (${r.ms} ms)`);
      else fail(`${r.name}\n    ${r.detail.replace(/\n/g, '\n    ')}`);
    }
    console.log(`\n${results.filter(r => r.ok).length} / ${results.length} tests réussis`);
    await page.close();
  }

  /* ---------- 2. Essai de l'application (navigateur neuf : aucune donnée) ---------- */
  for (const lang of ['fr', 'en']) {
    const ctx = await browser.newContext({ locale: lang === 'fr' ? 'fr-FR' : 'en-GB', serviceWorkers: 'block' });
    await offlineApis(ctx);
    const page = await ctx.newPage();
    const errors = [];
    page.on('pageerror', e => errors.push(e.message));
    page.on('console', m => { if (m.type() === 'error') errors.push(m.text()); });
    await page.goto(`${base}/index.html`);
    await page.waitForSelector('[data-quick="fleches"]', { timeout: 30000 });
    if (await page.evaluate(() => document.documentElement.lang) !== lang) fail(`application (${lang}) : mauvaise langue`);
    // Création rapide d'une grille de mots fléchés, tirée au hasard, puis calcul (worker)
    await page.click('[data-quick="fleches"]');
    await page.click('.modal-foot .btn-primary');
    await page.waitForFunction(() => /\d+ \/ \d+/.test(document.querySelector('#grid-stats')?.textContent || '') && !document.querySelector('.live-build'), null, { timeout: 60000 });
    const stats = (await page.textContent('#grid-stats')).replace(/\s+/g, ' ').trim();
    const svg = await page.locator('#grid-scroll svg.mf-svg').count();
    if (!svg) fail(`application (${lang}) : grille non affichée`);
    // Mode jeu : une case par lettre, reliée à la définition du mot
    await page.click('#btn-play');
    const cells = await page.locator('.play-cell[aria-describedby="clue-text"]').count();
    if (!cells) fail(`application (${lang}) : mode jeu sans cases`);
    if (errors.length) fail(`application (${lang}) : erreurs dans la console\n    ${errors.join('\n    ')}`);
    else console.log(`✔ application (${lang}) : ${stats}, ${cells} cases à jouer`);
    await ctx.close();
  }

  /* ---------- 3. Parcours principaux ---------- */
  {
    const ctx = await browser.newContext({ locale: 'fr-FR', serviceWorkers: 'block', acceptDownloads: true });
    await offlineApis(ctx);
    const page = await ctx.newPage();
    const errors = [];
    page.on('pageerror', e => errors.push(e.message));
    page.on('console', m => { if (m.type() === 'error') errors.push(m.text()); });
    const step = async (name, fn) => {
      try { const detail = await fn(); console.log(`✔ parcours : ${name}${detail ? ` (${detail})` : ''}`); } catch (e) { fail(`parcours : ${name}\n    ${e.message}`); }
    };
    const check = (cond, msg) => { if (!cond) throw new Error(msg); };
    const ready = () => page.waitForFunction(() => /\d+ \/ \d+/.test(document.querySelector('#grid-stats')?.textContent || '') && !document.querySelector('.live-build'), null, { timeout: 60000 });
    const noModal = () => page.waitForFunction(() => !document.querySelector('.modal'), null, { timeout: 10000 });
    const axe = async where => {
      const r = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa']).disableRules(['color-contrast']).analyze();
      const bad = r.violations.filter(v => v.impact === 'critical' || v.impact === 'serious');
      check(!bad.length, bad.map(v => `${where} · ${v.id} (${v.impact}) : ${v.nodes.slice(0, 3).map(n => n.target.join(' ')).join(', ')}`).join('\n    '));
      return `${r.passes.length} règles respectées`;
    };

    await page.goto(`${base}/index.html`);
    await page.waitForSelector('[data-quick="fleches"]', { timeout: 30000 });
    await step('accessibilité de l\'accueil', () => axe('accueil'));

    await step('assistant : tous les packs à thème proposés', async () => {
      await page.click('[data-w="new"]');
      await page.waitForSelector('.wizard');
      // Étape 1 : le jeu (le choisir passe à l'étape des mots)
      await page.click('.wz-game[data-v="fleches"]');
      const shown = await page.locator('.start-card[data-v^="pack:"]:visible').count();
      const total = await page.evaluate(() => Object.keys(MF.lexicon.packs('fr')).length);
      check(shown === total && total >= 12, `${shown} packs affichés sur ${total}`);
      const a11y = await axe('assistant');
      // Pack « Animaux » : 25 mots avec leur définition
      await page.click('.start-card[data-v="pack:animaux"]:visible');
      await page.click('.modal-foot .btn-primary');
      await ready();
      const words = Number(await page.textContent('#count-words'));
      check(words >= 25, `${words} mots dans la grille du pack`);
      return `${total} packs, ${a11y}`;
    });

    await step('accessibilité de l\'éditeur', () => axe('éditeur'));

    await step('annuler / rétablir', async () => {
      const before = Number(await page.textContent('#count-words'));
      await page.fill('#add-form [name=text]', 'Zygomatique');
      await page.fill('#add-form [name=clue]', 'Muscle du sourire');
      await page.click('#add-form [type=submit]');
      await page.waitForFunction(n => Number(document.querySelector('#count-words').textContent) === n + 1, before);
      await page.click('#btn-undo');
      await page.waitForFunction(n => Number(document.querySelector('#count-words').textContent) === n, before);
      await page.click('#btn-redo');
      await page.waitForFunction(n => Number(document.querySelector('#count-words').textContent) === n + 1, before);
      return `${before} → ${before + 1} → ${before} → ${before + 1} mots`;
    });

    await step('export PNG', async () => {
      await ready().catch(() => {});
      await page.click('#btn-export');
      await page.waitForSelector('.export-modal #exp-preview svg');
      const [dl] = await Promise.all([page.waitForEvent('download', { timeout: 30000 }), page.click('.export-modal .modal-foot .btn-primary')]);
      const file = await readFile(await dl.path());
      check(/\.png$/.test(dl.suggestedFilename()), `nom inattendu : ${dl.suggestedFilename()}`);
      check(file.subarray(1, 4).toString() === 'PNG' && file.length > 5000, `fichier PNG invalide (${file.length} octets)`);
      return `${dl.suggestedFilename()}, ${Math.round(file.length / 1024)} Ko`;
    });

    let backup;
    await step('sauvegarde complète', async () => {
      await noModal();
      await page.evaluate(() => document.getElementById('btn-save').click());
      await page.waitForSelector('#bk-img');
      const [dl] = await Promise.all([page.waitForEvent('download'), page.click('.modal-foot .btn-primary')]);
      backup = await readFile(await dl.path());
      const data = JSON.parse(backup.toString('utf8'));
      check(Array.isArray(data.puzzles) && data.puzzles.length === 1, 'sauvegarde sans grille');
      check(await page.evaluate(() => MF.store.backupAt() > 0), 'date de sauvegarde non retenue');
      return `${data.puzzles[0].words.length} mots`;
    });

    let link;
    await step('lien de partage', async () => {
      await noModal();
      link = await page.evaluate(() => MF.share.link(MF.store.active()));
      check(link.includes('#g='), 'lien sans grille');
      return `${(link.length / 1024).toFixed(1)} Ko`;
    });

    if (errors.length) fail(`parcours : erreurs dans la console\n    ${errors.join('\n    ')}`);
    await ctx.close();

    // Navigateur neuf : restauration de la sauvegarde, puis ouverture du lien de partage
    const fresh = await browser.newContext({ locale: 'fr-FR', serviceWorkers: 'block' });
    await offlineApis(fresh);
    const p2 = await fresh.newPage();
    await p2.goto(`${base}/index.html`);
    await p2.waitForSelector('[data-quick="fleches"]', { timeout: 30000 });
    await step('restauration dans un autre navigateur', async () => {
      await p2.setInputFiles('#file-open', { name: 'mes-grilles.json', mimeType: 'application/json', buffer: backup });
      await p2.waitForFunction(() => MF.store.get().puzzles.length === 1, null, { timeout: 15000 });
      return `${await p2.evaluate(() => MF.store.active().words.length)} mots`;
    });
    await step('jouer à une grille partagée', async () => {
      await p2.goto('about:blank');
      await p2.goto(link.replace(/^https?:\/\/[^/]+/, base));
      await p2.waitForSelector('.modal-foot .btn-primary', { timeout: 15000 });
      await p2.click('.modal-foot .btn-primary');
      await p2.waitForSelector('.play-cell', { timeout: 30000 });
      return `${await p2.evaluate(() => MF.store.get().puzzles.length)} grilles`;
    });
    await fresh.close();
  }

  /* ---------- Murdoku : création, solution, partie jusqu'au coupable ---------- */
  {
    const ctx = await browser.newContext({ locale: 'fr-FR', serviceWorkers: 'block' });
    await offlineApis(ctx);
    const page = await ctx.newPage();
    const errors = [];
    page.on('pageerror', e => errors.push(e.message));
    try {
      await page.goto(`${base}/index.html`);
      await page.waitForSelector('[data-quick="murdoku"]', { timeout: 30000 });
      await page.click('[data-quick="murdoku"]');
      await page.click('.modal-foot .btn-primary');
      await page.waitForSelector('.mdk-stage .mdk-clues li', { timeout: 30000 });
      // Plan dessiné (2D) : rapide et identique partout ; la 3D est essayée à part (tools/murdoku3d-demo)
      await page.click('.mdk-panel [data-mdk="render"] [data-v="2d"]');
      await page.waitForSelector('.mdk-board svg .mdk-cell');
      const pz = await page.evaluate(() => MF.store.active().layout.pages[0]);
      if (MF_solveCheck(pz)) throw new Error(MF_solveCheck(pz));
      await page.click('#btn-play');
      await page.waitForSelector('.mdk-tools [data-tool]');
      for (const p of pz.people) {
        await page.click(`.mdk-tools [data-tool="${p.id}"]`);
        await page.click(`.mdk-board svg .mdk-cell[data-r="${p.r}"][data-c="${p.c}"]`, { force: true });
      }
      await page.waitForSelector('[data-accuse]', { timeout: 5000 });
      await page.click(`[data-accuse="${pz.murderer}"]`);
      await page.waitForFunction(() => /Bravo|record/.test(document.querySelector('.toasts')?.textContent || ''), null, { timeout: 5000 });
      if (errors.length) throw new Error(errors.join('\n    '));
      console.log(`✔ murdoku : ${pz.size} × ${pz.size}, ${pz.clues.length} indices, partie gagnée`);
    } catch (e) { fail(`murdoku : ${e.message}`); }
    await ctx.close();
  }

  /* ---------- 4. Téléphone ---------- */
  {
    const ctx = await browser.newContext({ locale: 'fr-FR', serviceWorkers: 'block', viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, deviceScaleFactor: 2 });
    await offlineApis(ctx);
    const page = await ctx.newPage();
    const errors = [];
    page.on('pageerror', e => errors.push(e.message));
    await page.goto(`${base}/index.html`);
    await page.waitForSelector('[data-quick="meles"]', { timeout: 30000 });
    await page.click('[data-quick="meles"]');
    await page.click('.modal-foot .btn-primary');
    await page.waitForSelector('#grid-scroll svg.mf-svg', { timeout: 60000 });
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - innerWidth);
    const nav = await page.locator('#phone-nav').isVisible();
    if (overflow > 1) fail(`téléphone : la page déborde de ${overflow} px en largeur`);
    else if (!nav) fail('téléphone : barre de navigation absente');
    else if (errors.length) fail(`téléphone : erreurs\n    ${errors.join('\n    ')}`);
    else console.log('✔ téléphone : grille affichée, aucun débordement, navigation du bas');
    await ctx.close();
  }
} catch (e) {
  fail(e.stack || String(e));
} finally {
  await browser.close();
  server.close();
}

if (failed) { console.error(`\n${failed} échec(s)`); process.exit(1); }
console.log('\nTout est vert.');
