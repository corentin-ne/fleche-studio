// Tests automatiques (npm test, et à chaque push dans GitHub Actions) :
//   1. la page tests/index.html (moteur, données, sécurité, traductions) dans un vrai navigateur ;
//   2. un essai de l'application : démarrage sans erreur, création d'une grille, calcul dans le worker.
// Un petit serveur statique sert le dépôt, comme GitHub Pages. Navigateur : Chromium de Playwright
// (PW_CHANNEL=msedge ou chrome pour utiliser un navigateur déjà installé).
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname, join, normalize, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';

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

const browser = await chromium.launch({ channel: process.env.PW_CHANNEL || undefined });
let failed = 0;
const fail = msg => { failed++; console.error(`✘ ${msg}`); };

try {
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
    await page.click('#mode-switch [data-mode="play"]');
    const cells = await page.locator('.play-cell[aria-describedby="clue-text"]').count();
    if (!cells) fail(`application (${lang}) : mode jeu sans cases`);
    if (errors.length) fail(`application (${lang}) : erreurs dans la console\n    ${errors.join('\n    ')}`);
    else console.log(`✔ application (${lang}) : ${stats}, ${cells} cases à jouer`);
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
