// @ts-check
/* =========================================================================
   Calcul des grilles en arrière-plan (Web Worker) : l'interface reste fluide
   pendant les quelques secondes de recherche.
   Le worker reste chargé d'un calcul à l'autre (« Mélanger » repart aussitôt) :
   un calcul est arrêté par un message « cancel », lu à chaque pause du moteur.
   Il charge uniquement le moteur (aucun accès au DOM ni au stockage), et le
   dictionnaire de la langue demandée, au premier calcul qui en a besoin.
   ========================================================================= */
self.window = self;
self.MF = { base: new URL('../../', self.location.href).href };
importScripts(`../loader.js${self.location.search}`);
MF.loader.load(MF.loader.WORKER);

const running = new Map(); // id -> signal d'arrêt

self.onmessage = async e => {
  const msg = e.data || {};
  if (msg.type === 'cancel') {
    const signal = running.get(msg.id);
    if (signal) signal.cancelled = true;
    return;
  }
  const { id, engine, words, options, seed, exclude, banned } = msg;
  const signal = { cancelled: false };
  running.set(id, signal);
  try {
    // Dictionnaire : pour les grilles de mots croisés, le mot mystère, l'échelle et le wordoku
    if (engine !== 'meles' || options?.game === 'mystere') MF.loader.lexicon(MF.lexicon.pick(options?.lang)); // synchrone dans un worker
    const { generate } = MF.games.engineModule(engine);
    let last = 0, lastSnap = 0;
    const result = await generate(words, options, {
      seed, banned, signal, exclude: new Set(exclude || []),
      onProgress: p => { const now = Date.now(); if (now - last > 80) { last = now; self.postMessage({ id, progress: p }); } },
      // Grille en cours de construction, ~11 images/s (chaque étape du remplissage, très court, est envoyée)
      onSnapshot: (make, every) => { const now = Date.now(); if (every || now - lastSnap > 90) { lastSnap = now; self.postMessage({ id, snapshot: make() }); } },
    });
    if (!signal.cancelled) self.postMessage({ id, result });
  } catch (err) {
    if (!signal.cancelled) self.postMessage({ id, error: String(err?.message || err) });
  } finally {
    running.delete(id);
  }
};
