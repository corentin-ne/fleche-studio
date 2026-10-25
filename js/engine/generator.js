/* =========================================================================
   Lancement d'un calcul de grille : dans un Web Worker quand c'est possible
   (interface toujours fluide, annulation immédiate), sinon dans la page
   (ouverture directe du fichier, navigateur sans worker).
   ========================================================================= */
window.MF = window.MF || {};

MF.generator = (() => {
  let worker = null;
  let seq = 0;
  const pending = new Map(); // id -> { resolve, onProgress }
  // Les workers ne se chargent pas depuis file:// : on calcule alors dans la page
  let usable = typeof Worker === 'function' && /^https?:$/.test(location.protocol);

  function spawn() {
    const v = document.querySelector('script[src*="generator.js"]')?.src.split('?')[1];
    worker = new Worker(`js/engine/worker.js${v ? `?${v}` : ''}`);
    worker.onmessage = e => {
      const { id, progress, result, error } = e.data || {};
      const job = pending.get(id);
      if (!job) return;
      if (progress !== undefined) { job.onProgress?.(progress); return; }
      pending.delete(id);
      job.resolve(error ? { error } : { result });
    };
    worker.onerror = e => {
      // Worker impossible à démarrer : on bascule définitivement sur le calcul dans la page
      e.preventDefault?.();
      usable = false;
      worker = null;
      const jobs = [...pending.values()];
      pending.clear();
      jobs.forEach(j => j.fallback());
    };
  }

  function inPage(task, onProgress, signal) {
    const gen = task.engine === 'meles' ? MF.wordsearch.generate : MF.builder.generate;
    return gen(task.words, task.options, { seed: task.seed, banned: task.banned, exclude: new Set(task.exclude), onProgress, signal })
      .then(result => ({ result }), err => ({ error: String(err?.message || err) }));
  }

  /**
   * Lance un calcul. Renvoie { promise, cancel } ; promise -> { result } | { error } | { cancelled }.
   * @param task { engine, words, options, seed, exclude: [], banned: [] }
   */
  function run(task, onProgress) {
    const signal = { cancelled: false };
    let settle;
    const promise = new Promise(r => { settle = r; });
    const fallback = () => inPage(task, onProgress, signal).then(r => settle(signal.cancelled ? { cancelled: true } : r));
    if (!usable) { fallback(); return { promise, cancel: () => { signal.cancelled = true; settle({ cancelled: true }); } }; }
    try { if (!worker) spawn(); } catch { usable = false; fallback(); return { promise, cancel: () => { signal.cancelled = true; } }; }
    const id = ++seq;
    pending.set(id, { resolve: settle, onProgress, fallback });
    worker.postMessage({ id, ...task });
    return {
      promise,
      cancel() {
        // Arrêt immédiat : on termine le worker (un nouveau sera créé au prochain calcul)
        if (!pending.has(id)) return;
        pending.delete(id);
        worker?.terminate();
        worker = null;
        [...pending.values()].forEach(j => j.fallback());
        pending.clear();
        settle({ cancelled: true });
      },
    };
  }

  return { run };
})();
