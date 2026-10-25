/* =========================================================================
   Service worker : Flèche Studio fonctionne hors ligne et s'installe comme
   une application. Stratégie « réseau d'abord » pour nos fichiers (toujours
   la dernière version en ligne, la copie locale sert hors connexion), et
   « copie locale puis mise à jour » pour les polices.
   Les requêtes Wiktionnaire / Wikipédia ne sont jamais mises en cache ici.
   ========================================================================= */
const CACHE = 'fleche-studio-v5';
const FONT_CACHE = 'fleche-studio-fonts-v1';
const FONT_HOSTS = ['fonts.googleapis.com', 'fonts.gstatic.com'];

/** Fichiers de l'application, lus dans index.html (pas de liste à maintenir à la main). */
async function shell() {
  const res = await fetch('./index.html', { cache: 'no-cache' });
  const html = await res.text();
  const assets = [...html.matchAll(/(?:src|href)="((?:js|css)\/[^"]+)"/g)].map(m => m[1]);
  return ['./', './index.html', './manifest.webmanifest', './icon.svg', './js/engine/worker.js', ...assets];
}

self.addEventListener('install', event => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE);
    const files = await shell().catch(() => ['./', './index.html']);
    await Promise.all(files.map(f => cache.add(f).catch(() => null)));
    await self.skipWaiting();
  })());
});

self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    const keep = new Set([CACHE, FONT_CACHE]);
    await Promise.all((await caches.keys()).filter(k => !keep.has(k)).map(k => caches.delete(k)));
    await self.clients.claim();
  })());
});

self.addEventListener('fetch', event => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);

  // Polices : copie locale immédiate, rafraîchie en arrière-plan
  if (FONT_HOSTS.includes(url.hostname)) {
    event.respondWith((async () => {
      const cache = await caches.open(FONT_CACHE);
      const hit = await cache.match(req);
      const fresh = fetch(req).then(r => { if (r.ok || r.type === 'opaque') cache.put(req, r.clone()); return r; }).catch(() => hit);
      return hit || fresh;
    })());
    return;
  }

  // Seulement nos propres fichiers ; le reste (API) passe directement au réseau
  if (url.origin !== self.location.origin) return;
  event.respondWith((async () => {
    const cache = await caches.open(CACHE);
    try {
      const res = await fetch(req);
      if (res.ok && res.type === 'basic') cache.put(req, res.clone());
      return res;
    } catch {
      return (await cache.match(req, { ignoreSearch: false })) || (await cache.match(req, { ignoreSearch: true }))
        || (req.mode === 'navigate' ? cache.match('./index.html') : Response.error());
    }
  })());
});
