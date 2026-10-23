/* =========================================================================
   Store : état de l'application, persistance localStorage, abonnements.
   ========================================================================= */
window.MF = window.MF || {};

MF.store = (() => {
  const KEY = 'mots-fleches-maker:v1';
  const DEFAULT_OPTIONS = { size: 'auto', pages: 1, fillers: true, cols: 15, rows: 21, effort: 'normal', clueFill: 'tint', photoBand: 6, paper: 'A4', orientation: 'portrait' };
  const listeners = new Set();
  let state = null;

  /** Options connues uniquement, avec valeurs par défaut (les réglages d'anciennes versions sont ignorés). */
  function pickOptions(o = {}) {
    const out = { ...DEFAULT_OPTIONS };
    for (const k of Object.keys(DEFAULT_OPTIONS)) if (o[k] !== undefined) out[k] = o[k];
    return out;
  }

  function makePuzzle(p = {}) {
    return {
      id: p.id || MF.util.uid(),
      name: p.name || 'Nouvelle grille',
      accent: p.accent || '#8b5cf6',
      options: pickOptions(p.options),
      // Définitions écrites pour les mots de remplissage (gardées d'un calcul à l'autre)
      fillerClues: { ...(p.fillerClues || {}) },
      words: (p.words || []).map(w => ({ id: w.id || MF.util.uid(), text: String(w.text || ''), clue: String(w.clue || ''), author: String(w.author || ''), priority: !!w.priority })),
      // Seules les grilles du moteur actuel (« mots perso d'abord ») sont gardées
      layout: p.layout?.engine === 'builder' && Array.isArray(p.layout.pages) ? p.layout : null,
    };
  }

  function defaults() {
    const puzzles = MF.seed.puzzles().map(makePuzzle);
    return { v: 1, seedRev: MF.seed.REVISION, activeId: puzzles[0].id, theme: 'dark', ui: { cell: 64, fit: true, mode: 'solution', tab: 'words', photoMarks: false }, puzzles };
  }

  /**
   * Met à jour les grilles sauvegardées avec les révisions de données plus récentes :
   * corrections des mots non retouchés, puis ajout des nouveaux mots (sans doublon, sans toucher au reste).
   */
  function applySeedUpdates(s, fromRev) {
    const { normalize } = MF.util;
    for (const add of MF.seed.additionsSince(fromRev)) {
      const pz = s.puzzles.find(p => normalize(p.name) === normalize(add.name));
      if (!pz) continue;
      for (const { from, to } of add.edits) {
        const w = pz.words.find(x => Object.entries(from).every(([k, v]) => x[k].trim() === v));
        if (w) Object.assign(w, to);
      }
      const existing = new Set(pz.words.map(w => normalize(w.text)));
      pz.words.push(...add.words.filter(w => !existing.has(normalize(w.text))).map(w => ({ ...w, priority: false })));
    }
    s.seedRev = MF.seed.REVISION;
  }

  function load() {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) {
        const s = JSON.parse(raw);
        if (s && Array.isArray(s.puzzles) && s.puzzles.length) {
          const base = defaults();
          state = { ...base, ...s, ui: { ...base.ui, ...(s.ui || {}) }, puzzles: s.puzzles.map(makePuzzle) };
          if (!state.puzzles.some(p => p.id === state.activeId)) state.activeId = state.puzzles[0].id;
          const rev = s.seedRev || 1;
          if (rev < MF.seed.REVISION) { applySeedUpdates(state, rev); save(); }
          return state;
        }
      }
    } catch { /* stockage indisponible ou corrompu : on repart des données initiales */ }
    state = defaults();
    return state;
  }

  const save = MF.util.debounce(() => {
    try { localStorage.setItem(KEY, JSON.stringify(state)); } catch { /* navigation privée */ }
  }, 200);

  const get = () => state;
  const active = () => state.puzzles.find(p => p.id === state.activeId) || state.puzzles[0];
  const puzzle = id => state.puzzles.find(p => p.id === id);

  /** Applique une mutation puis notifie. `reason` aide les abonnés à cibler le rendu. */
  function update(fn, reason = 'any') {
    fn(state);
    save();
    listeners.forEach(l => l(reason));
  }

  const subscribe = fn => (listeners.add(fn), () => listeners.delete(fn));

  function reset() {
    state = defaults();
    save();
    listeners.forEach(l => l('reset'));
  }

  return { load, get, active, puzzle, update, subscribe, reset, makePuzzle, DEFAULT_OPTIONS };
})();
