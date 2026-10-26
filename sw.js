/* =========================================================================
   Service worker : Flèche Studio fonctionne hors ligne et s'installe comme
   une application.
     - Nos fichiers : « réseau d'abord » (toujours la dernière version en
       ligne), la copie locale sert hors connexion.
     - Polices : « copie locale d'abord » (elles ne changent jamais).
   La liste des fichiers vient de js/loader.js (aucune liste à tenir ici).
   « __BUILD__ » est remplacé à chaque déploiement : le navigateur voit un
   nouveau service worker et l'application propose de recharger (MF.updates).
   Les requêtes Wiktionnaire / Wikipédia ne passent jamais par ce cache.
   ========================================================================= */
self.MF = { base: new URL('./', self.location.href).href };
importScripts('js/loader.js');

const CACHE = 'fleche-studio-__BUILD__';
const FONT_CACHE = 'fleche-studio-fonts-v2';

/** Clé de cache : l'adresse sans paramètre de version (une seule copie par fichier). */
const keyOf = url => { const u = new URL(url, self.location.href); return u.origin + u.pathname; };

/** Fichiers à garder : l'application (liste du chargeur), les styles, les polices les plus utilisées. */
async function shell() {
  const html = await (await fetch('./index.html', { cache: 'no-cache' })).text();
  const styles = [...html.matchAll(/href="(css\/[^"?]+)/g)].map(m => m[1]);
  return ['./', './index.html', './manifest.webmanifest', './icon.svg', ...styles, ...MF.loader.all()];
}

self.addEventListener('install', event => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE);
    const files = await shell().catch(() => ['./', './index.html']);
    await Promise.all(files.map(async f => {
      try {
        const res = await fetch(f, { cache: 'reload' });
        if (res.ok) await cache.put(keyOf(res.url || f), res);
      } catch { /* hors ligne pendant l'installation : réessayé à la prochaine visite */ }
    }));
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
  // Seulement nos propres fichiers ; le reste (Wiktionnaire, Wikipédia) passe directement au réseau
  if (url.origin !== self.location.origin) return;
  const key = keyOf(req.url);

  // Polices : copie locale immédiate (fichiers immuables)
  if (url.pathname.endsWith('.woff2')) {
    event.respondWith((async () => {
      const cache = await caches.open(FONT_CACHE);
      const hit = await cache.match(key);
      if (hit) return hit;
      const res = await fetch(req);
      if (res.ok) cache.put(key, res.clone());
      return res;
    })());
    return;
  }

  event.respondWith((async () => {
    const cache = await caches.open(CACHE);
    try {
      const res = await fetch(req);
      if (res.ok && res.type === 'basic') cache.put(key, res.clone());
      return res;
    } catch {
      return (await cache.match(key)) || (req.mode === 'navigate' ? cache.match(keyOf('./index.html')) : Response.error());
    }
  })());
});
