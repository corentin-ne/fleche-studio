// @ts-check
/* =========================================================================
   Mode jeu : progression enregistrée (lettres saisies, mots trouvés),
   chronomètre et célébration de fin de grille.
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
    } catch { /* stockage indisponible */ }
    return removed;
  }

  /** Durée écoulée depuis `start`, au format m:ss. */
  function elapsed(start) {
    const s = Math.max(0, Math.floor((Date.now() - start) / 1000));
    return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
  }

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

  return { keyOf, load, save, prune, elapsed, confetti };
})();
