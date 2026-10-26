// @ts-check
/* =========================================================================
   Lancement d'un calcul de grille : dans un Web Worker quand c'est possible
   (interface toujours fluide), sinon dans la page (ouverture directe du
   fichier, navigateur sans worker).
   Le worker est créé une fois puis réutilisé : annuler un calcul lui envoie
   un simple message, sans recharger le moteur ni les dictionnaires.
   ========================================================================= */
window.MF = window.MF || {};

MF.generator = (() => {
  let worker = null;
  let seq = 0;
  const pending = new Map(); // id -> { resolve, onProgress, onSnapshot, fallback }
  // Les workers ne se chargent pas depuis file:// : on calcule alors dans la page
  let usable = typeof Worker === 'function' && /^https?:$/.test(location.protocol);

  function spawn() {
    worker = new Worker(MF.loader.url('js/engine/worker.js'));
    worker.onmessage = e => {
      const { id, progress, snapshot, result, error } = e.data || {};
      const job = pending.get(id);
      if (!job) return; // calcul annulé entre-temps
      if (progress !== undefined) { job.onProgress?.(progress); return; }
      if (snapshot !== undefined) { job.onSnapshot?.(snapshot); return; }
      pending.delete(id);
      job.resolve(error ? { error } : { result });
    };
    worker.onerror = e => {
      // Worker impossible à démarrer : on bascule définitivement sur le calcul dans la page
      e.preventDefault?.();
      usable = false;
      worker?.terminate();
      worker = null;
      const jobs = [...pending.values()];
      pending.clear();
      jobs.forEach(j => j.fallback());
    };
  }

  async function inPage(task, onProgress, onSnapshot, signal) {
    const meles = task.engine === 'meles';
    if (!meles) await MF.lexicon.ensure(task.options?.lang);
    const { generate } = MF.games.engineModule(task.engine);
    // Même cadence que dans le worker (voir worker.js)
    let lastSnap = 0;
    const snap = onSnapshot && ((make, every) => { const now = Date.now(); if (every || now - lastSnap > 90) { lastSnap = now; onSnapshot(make()); } });
    return generate(task.words, task.options, { seed: task.seed, banned: task.banned, exclude: new Set(task.exclude), onProgress, onSnapshot: snap, signal })
      .then(result => ({ result }), err => ({ error: String(err?.message || err) }));
  }

  /**
   * Lance un calcul. Renvoie { promise, cancel } ; promise -> { result } | { error } | { cancelled }.
   * @param {{ engine: string, words: object[], options: any, seed: number, exclude: string[], banned: string[] }} task
   * @param {(p: number) => void} [onProgress]  avancement de 0 à 1
   * @param {(snapshot: any) => void} [onSnapshot]  grille en cours de construction (aperçu animé), voir MF.builder / MF.wordsearch
   */
  function run(task, onProgress, onSnapshot) {
    const signal = { cancelled: false };
    let settle;
    const promise = new Promise(r => { settle = r; });
    const local = () => inPage(task, onProgress, onSnapshot, signal).then(r => settle(signal.cancelled ? { cancelled: true } : r));
    const stopLocal = { promise, cancel: () => { signal.cancelled = true; settle({ cancelled: true }); } };
    if (!usable) { local(); return stopLocal; }
    try { if (!worker) spawn(); } catch { usable = false; local(); return stopLocal; }
    const id = ++seq;
    pending.set(id, { resolve: settle, onProgress, onSnapshot, fallback: local });
    worker.postMessage({ type: 'run', id, ...task });
    return {
      promise,
      cancel() {
        signal.cancelled = true; // vaut aussi pour un calcul repris dans la page après une panne du worker
        if (pending.delete(id)) worker?.postMessage({ type: 'cancel', id });
        settle({ cancelled: true });
      },
    };
  }

  return { run };
})();
