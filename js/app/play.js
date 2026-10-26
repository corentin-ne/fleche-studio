// @ts-check
/* =========================================================================
   Mode jeu : progression enregistrée (lettres saisies, mots trouvés),
   chronomètre, meilleur temps, écran gardé allumé et célébration de fin de grille.
   Une progression est liée à UN calcul de grille (id@date#page) : quand la
   grille est recalculée ou supprimée, l'ancienne progression ne sert plus
   et est supprimée (prune), au démarrage ou quand le stockage est plein.
   ========================================================================= */
window.MF = window.MF || {};

MF.play = (() => {
  const PREFIX = 'mfm:play:';
  const COLORS = ['#ff4d7d', '#ffd23f', '#3dd68c', '#4d9bff', '#7b3fe4', '#ff8a3d'];

  /** Clé de progression d'une page de grille. */
  const keyOf = (pz, page) => `${pz.id}@${pz.layout?.at}#${page}`;

  function load(key) {
    try { const v = JSON.parse(localStorage.getItem(PREFIX + key) || '{}'); return MF.schema.isObj(v) ? v : {}; } catch { return {}; }
  }
  const save = MF.util.debounce((key, entries) => {
    try { localStorage.setItem(PREFIX + key, JSON.stringify(entries)); } catch { /* stockage plein : la partie continue */ }
  }, 300);

  /**
   * Supprime les progressions qui ne correspondent plus à aucune grille calculée.
   * `all` : supprime tout sauf `keep` (dernier recours quand le stockage est plein).
   * Renvoie le nombre d'entrées supprimées.
   * @param {any[]} puzzles
   * @param {{ all?: boolean, keep?: string | null, storage?: Storage }} [o]  storage : remplaçable dans les tests
   */
  function prune(puzzles, { all = false, keep = null, storage = localStorage } = {}) {
    const valid = new Set(puzzles.filter(p => p.layout).map(p => `${p.id}@${p.layout.at}`));
    let removed = 0;
    try {
      Object.keys(storage).filter(k => k.startsWith(PREFIX)).forEach(k => {
        const id = k.slice(PREFIX.length);
        if (id === keep) return;
        if (all || !valid.has(id.split('#')[0])) { storage.removeItem(k); removed++; }
      });
      // Records des grilles recalculées ou supprimées (les autres sont gardés, même stockage plein : ils sont minuscules)
      const best = readBest(storage);
      const stale = Object.keys(best).filter(id => !valid.has(id.split('#')[0]));
      if (stale.length) { stale.forEach(id => delete best[id]); storage.setItem(BEST, JSON.stringify(best)); removed += stale.length; }
    } catch { /* stockage indisponible */ }
    return removed;
  }

  /** Durée en secondes au format m:ss. */
  const clock = (/** @type {number} */ s) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
  /** Durée écoulée depuis `start`, au format m:ss. */
  const elapsed = (/** @type {number} */ start) => clock(Math.max(0, Math.floor((Date.now() - start) / 1000)));

  /* ---------------- Records (meilleur temps par grille calculée) ---------------- */
  const BEST = 'mfm:best';
  /** @param {Storage} storage */
  function readBest(storage) {
    try { const v = JSON.parse(storage.getItem(BEST) || '{}'); return MF.schema.isObj(v) ? v : {}; } catch { return {}; }
  }

  /**
   * Enregistre un temps de fin de partie ; renvoie le record précédent et s'il est battu.
   * @param {string} key  clé de progression (keyOf)
   * @param {number} seconds
   * @param {Storage} [storage]
   * @returns {{ best: number, previous: number, isNew: boolean }}
   */
  function record(key, seconds, storage = localStorage) {
    const all = readBest(storage);
    const previous = Number.isFinite(all[key]) && all[key] > 0 ? all[key] : 0;
    const isNew = !previous || seconds < previous;
    if (isNew) {
      all[key] = Math.max(1, Math.round(seconds));
      try { storage.setItem(BEST, JSON.stringify(all)); } catch { /* stockage plein : record non retenu */ }
    }
    return { best: isNew ? all[key] : previous, previous, isNew };
  }

  /** Meilleur temps d'une grille (toutes ses pages, calcul en cours) en secondes, 0 si aucun. */
  function bestOf(/** @type {any} */ pz, storage = localStorage) {
    if (!pz?.layout) return 0;
    const prefix = `${pz.id}@${pz.layout.at}#`;
    const times = Object.entries(readBest(storage)).filter(([k, v]) => k.startsWith(prefix) && v > 0).map(([, v]) => v);
    return times.length ? Math.min(...times) : 0;
  }

  /* ---------------- Écran allumé pendant une partie ---------------- */
  /** @type {any} */
  let wakeLock = null;
  let awake = false;
  /** Garde l'écran allumé pendant le jeu (téléphone, tablette), si le navigateur le permet. */
  async function keepAwake(/** @type {boolean} */ on) {
    awake = on;
    const nav = /** @type {any} */ (navigator);
    if (!on) { wakeLock?.release?.().catch(() => {}); wakeLock = null; return; }
    if (wakeLock || !nav.wakeLock || document.hidden) return;
    try {
      wakeLock = await nav.wakeLock.request('screen');
      wakeLock.addEventListener?.('release', () => { wakeLock = null; });
    } catch { wakeLock = null; /* batterie faible, refus : sans importance */ }
  }
  // Le verrou tombe quand l'onglet passe en arrière-plan : repris au retour
  if (typeof document !== 'undefined') document.addEventListener('visibilitychange', () => { if (awake && !document.hidden) keepAwake(true); });

  /** Pluie de confettis (rien si l'utilisateur a demandé moins d'animations). */
  function confetti() {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const layer = MF.util.html('<div class="confetti" aria-hidden="true"></div>');
    for (let i = 0; i < 90; i++) {
      const p = document.createElement('i');
      p.style.cssText = `--x:${Math.random() * 100}vw;--dx:${Math.round((Math.random() - 0.5) * 240)}px;--d:${1.6 + Math.random() * 1.8}s;--r:${Math.random() * 720 - 360}deg;--c:${COLORS[i % COLORS.length]};--delay:${Math.random() * 0.4}s`;
      layer.appendChild(p);
    }
    document.body.appendChild(layer);
    setTimeout(() => layer.remove(), 4000);
  }

  return { keyOf, load, save, prune, clock, elapsed, record, bestOf, keepAwake, confetti };
})();
