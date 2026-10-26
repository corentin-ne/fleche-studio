/* =========================================================================
   Calcul des grilles en arrière-plan (Web Worker) : l'interface reste fluide
   pendant les quelques secondes de recherche, et « Mélanger » peut être
   relancé à tout moment (le calcul précédent est simplement arrêté).
   Le worker charge uniquement le moteur (aucun accès au DOM ni au stockage).
   ========================================================================= */
/* global importScripts */
self.window = self;
const v = self.location.search; // même version que la page (cache navigateur)
importScripts(...['../core/utils.js', 'shapes.js', 'paper.js', '../data/clues-fr.js', 'grid-model.js', 'builder.js', 'wordsearch.js'].map(f => f + v));

self.onmessage = async e => {
  const { id, engine, words, options, seed, exclude, banned } = e.data || {};
  try {
    const gen = engine === 'meles' ? MF.wordsearch.generate : MF.builder.generate;
    let last = 0, lastSnap = 0;
    const result = await gen(words, options, {
      seed, banned, exclude: new Set(exclude || []),
      onProgress: p => { const now = Date.now(); if (now - last > 80) { last = now; self.postMessage({ id, progress: p }); } },
      // Grille en cours de construction, ~11 images/s (chaque étape du remplissage, très court, est envoyée)
      onSnapshot: (make, every) => { const now = Date.now(); if (every || now - lastSnap > 90) { lastSnap = now; self.postMessage({ id, snapshot: make() }); } },
    });
    self.postMessage({ id, result });
  } catch (err) {
    self.postMessage({ id, error: String(err?.message || err) });
  }
};
