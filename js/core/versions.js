// @ts-check
/* =========================================================================
   Versions automatiques : filet de sécurité sans aucune action de l'utilisateur.
   Toutes les grilles sont copiées dans IndexedDB toutes les 10 minutes (si
   quelque chose a changé) et quand l'onglet passe en arrière-plan. Les 15
   plus récentes sont gardées ; une version se restaure depuis Grille → Données.
   Les images ne sont pas copiées : celles qu'utilise une version sont
   protégées du ménage automatique (keepAssets).
   ========================================================================= */
window.MF = window.MF || {};

MF.versions = (() => {
  const KEEP = 15;
  const EVERY_MS = 10 * 60 * 1000;
  const ON_HIDE_MS = 2 * 60 * 1000;
  const tx = MF.idb.database('mfm-versions', 'versions');

  let lastRev = null, lastAt = 0, busy = false;

  /** Versions enregistrées, de la plus récente à la plus ancienne (sans le contenu). */
  async function list() {
    try {
      const all = await tx('readonly', s => s.getAll());
      return (all || []).map(({ id, at, count, names, size, assets }) => ({ id, at, count, names, size, assets: assets || [] })).sort((a, b) => b.at - a.at);
    } catch { return []; }
  }

  const imagesOf = puzzles => [...new Set(puzzles.flatMap(p => [p.design?.background?.imageId, ...(p.stickers || []).map(s => s.imageId)]).filter(Boolean))];

  /** Enregistre l'état actuel (sauf s'il est identique à la dernière version). Renvoie true si une version a été créée. */
  async function save(state) {
    if (!state?.puzzles?.length || busy) return false;
    busy = true;
    try {
      const data = JSON.stringify({ puzzles: state.puzzles, activeId: state.activeId });
      const hash = MF.util.hash(data);
      const all = await tx('readonly', s => s.getAll()).catch(() => []);
      const sorted = (all || []).sort((a, b) => b.at - a.at);
      if (sorted[0]?.hash === hash) return false;
      const rec = {
        id: MF.util.uid(), at: Date.now(), hash, data, size: data.length * 2,
        count: state.puzzles.length, names: state.puzzles.slice(0, 4).map(p => p.name), assets: imagesOf(state.puzzles),
      };
      await tx('readwrite', s => {
        s.put(rec);
        sorted.slice(KEEP - 1).forEach(old => s.delete(old.id));
      });
      return true;
    } catch { return false; } finally { busy = false; }
  }

  /** Contenu d'une version : { puzzles, activeId } (à repasser par le schéma). */
  async function get(id) {
    try {
      const rec = await tx('readonly', s => s.get(id));
      const data = rec ? JSON.parse(rec.data) : null;
      return MF.schema.isObj(data) && Array.isArray(data.puzzles) ? data : null;
    } catch { return null; }
  }

  async function clear() {
    try { await tx('readwrite', s => s.clear()); } catch { /* ignoré */ }
  }

  /** Images à ne jamais supprimer : celles d'une version qu'on pourrait restaurer. */
  const keepAssets = async () => new Set((await list()).flatMap(v => v.assets));

  /** Sauvegarde périodique d'un store (contenu modifié depuis la dernière version). */
  function watch(store) {
    lastRev = store.rev();
    const tick = minGap => {
      if (store.rev() === lastRev || Date.now() - lastAt < minGap) return;
      lastRev = store.rev();
      lastAt = Date.now();
      save(store.get());
    };
    setInterval(() => tick(EVERY_MS), 60 * 1000);
    document.addEventListener('visibilitychange', () => { if (document.hidden) tick(ON_HIDE_MS); });
  }

  return { list, save, get, clear, keepAssets, watch };
})();
