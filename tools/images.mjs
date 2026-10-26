// Images dérivées de icon.svg (npm run images) : icônes PNG pour l'installation (Android, iOS)
// et image d'aperçu des liens partagés (Open Graph). À relancer après une modification du logo.
import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';

const root = new URL('..', import.meta.url);
const icon = await readFile(new URL('icon.svg', root), 'utf8');
const font = name => fileURLToPath(new URL(`fonts/${name}`, root));
const BG = '#07090d';

/** Icônes : le logo seul (fond transparent), sur fond plein (iOS), ou réduit dans la zone sûre (maskable). */
const icons = [
  { file: 'icon-192.png', size: 192, pad: 0, bg: 'transparent' },
  { file: 'icon-512.png', size: 512, pad: 0, bg: 'transparent' },
  { file: 'icon-maskable-512.png', size: 512, pad: 0.12, bg: '#562ca0' },
  { file: 'apple-touch-icon.png', size: 180, pad: 0.08, bg: '#562ca0' },
];

// PW_EXECUTABLE : navigateur Chromium déjà installé (sinon celui de Playwright)
const browser = await chromium.launch({ executablePath: process.env.PW_EXECUTABLE || undefined });
try {
  const page = await browser.newPage();
  for (const { file, size, pad, bg } of icons) {
    await page.setViewportSize({ width: size, height: size });
    await page.setContent(`<body style="margin:0;background:${bg};display:grid;place-items:center;height:100vh">
      <div style="width:${(1 - 2 * pad) * 100}%;height:${(1 - 2 * pad) * 100}%">${icon.replace('<svg ', '<svg width="100%" height="100%" ')}</div></body>`);
    await writeFile(new URL(`icons/${file}`, root), await page.screenshot({ omitBackground: bg === 'transparent' }));
    console.log(`icons/${file}`);
  }

  // Aperçu des liens (WhatsApp, Facebook, LinkedIn…) : 1200 × 630
  await page.setViewportSize({ width: 1200, height: 630 });
  await page.setContent(`<style>
    @font-face { font-family: Inter; src: url('file://${font('inter-latin-wght-normal.woff2')}') format('woff2'); font-weight: 100 900; }
    body { margin: 0; width: 1200px; height: 630px; display: flex; align-items: center; gap: 64px; padding: 0 90px; box-sizing: border-box;
      font-family: Inter, sans-serif; color: #fff; background: radial-gradient(circle at 20% 10%, #3a1d78 0, ${BG} 60%), ${BG}; }
    .logo { width: 300px; height: 300px; flex: none; filter: drop-shadow(0 30px 60px rgba(123,63,228,.55)); }
    h1 { font-size: 92px; font-weight: 800; letter-spacing: -2px; margin: 0 0 18px; line-height: 1; }
    h1 small { font-weight: 400; opacity: .7; }
    p { font-size: 36px; line-height: 1.3; margin: 0; opacity: .85; }
    .tags { display: flex; gap: 12px; margin-top: 30px; flex-wrap: wrap; }
    .tags span { font-size: 24px; padding: 8px 18px; border-radius: 999px; background: rgba(255,255,255,.1); border: 1px solid rgba(255,255,255,.18); }
  </style>
  <div class="logo">${icon.replace('<svg ', '<svg width="100%" height="100%" ')}</div>
  <div><h1>Flèche <small>Studio</small></h1><p>Crée tes grilles de mots, en quelques clics.</p>
  <div class="tags"><span>Fléchés</span><span>Croisés</span><span>Mêlés</span><span>Codés</span></div></div>`);
  await page.evaluate(() => document.fonts.ready);
  await writeFile(new URL('icons/social.png', root), await page.screenshot({ type: 'png' }));
  console.log('icons/social.png');
} finally {
  await browser.close();
}
