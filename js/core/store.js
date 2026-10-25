/* =========================================================================
   Store : état de l'application, persistance locale, historique, abonnements.

   Aucun serveur, aucune base de données : tout reste dans le navigateur.
     - localStorage : grilles, mots, réglages (données texte, quelques Mo) ;
     - IndexedDB (MF.assets) : images importées (fonds, photos).
   L'état relu est TOUJOURS repassé par MF.schema (données jamais supposées sûres).
   ========================================================================= */
window.MF = window.MF || {};

MF.store = (() => {
  const KEY = 'mfm:v2';
  const LEGACY_KEY = 'mots-fleches-maker:v1';
  const HISTORY_MAX = 60;
  const COALESCE_MS = 700;
  // Changements qui entrent dans l'historique (annuler / rétablir)
  const UNDOABLE = new Set(['words', 'clues', 'puzzle', 'design', 'stickers', 'layout', 'puzzles', 'options']);

  const listeners = new Set();
  let state = null;
  let past = [], future = [], lastPush = { reason: null, at: 0 };
  let quotaWarned = false;

  const makePuzzle = p => MF.schema.puzzle(p);

  function defaults() {
    const dark = matchMedia?.('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
    return { v: 2, activeId: null, theme: dark, ui: { cell: 64, fit: true, mode: 'solution', tab: 'words', photoMarks: false, decor: 'emoji' }, puzzles: [] };
  }

  function sanitizeState(s) {
    const base = defaults();
    const S = MF.schema;
    const ui = S.isObj(s.ui) ? s.ui : {};
    const puzzles = (Array.isArray(s.puzzles) ? s.puzzles : []).slice(0, S.LIMITS.puzzles).map(makePuzzle);
    const out = {
      v: 2,
      theme: S.oneOf(s.theme, ['light', 'dark'], base.theme),
      ui: {
        cell: S.int(ui.cell, 12, 140, base.ui.cell),
        fit: S.bool(ui.fit, true),
        mode: S.oneOf(ui.mode, ['solution', 'blank', 'play'], 'solution'),
        tab: S.oneOf(ui.tab, ['words', 'diag', 'design', 'decor', 'settings'], 'words'),
        photoMarks: S.bool(ui.photoMarks, false),
        decor: S.oneOf(ui.decor, ['emoji', 'shapes', 'text', 'images'], 'emoji'),
      },
      puzzles,
      activeId: null,
    };
    out.activeId = puzzles.some(p => p.id === s.activeId) ? s.activeId : puzzles[0]?.id || null;
    return out;
  }

  function load() {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) { state = sanitizeState(JSON.parse(raw)); return state; }
    } catch { /* stockage indisponible ou corrompu : on repart de zéro */ }
    state = defaults();
    return state;
  }

  function writeNow() {
    if (!state) return; // jamais chargé (ex. page de tests) : on ne touche pas aux données
    try {
      localStorage.setItem(KEY, JSON.stringify(state));
    } catch (e) {
      if (!quotaWarned) { quotaWarned = true; listeners.forEach(l => l('quota', e)); }
    }
  }
  const save = MF.util.debounce(writeNow, 250);
  addEventListener('pagehide', () => { save.cancel(); writeNow(); });
  document.addEventListener('visibilitychange', () => { if (document.hidden) { save.cancel(); writeNow(); } });

  const get = () => state;
  const active = () => state.puzzles.find(p => p.id === state.activeId) || null;
  const puzzle = id => state.puzzles.find(p => p.id === id);

  /* ---------------- Historique ---------------- */
  const snapshot = () => ({ puzzles: MF.util.deepClone(state.puzzles), activeId: state.activeId });
  function pushHistory(reason, coalesceKey) {
    const now = Date.now();
    const key = coalesceKey || reason;
    if (lastPush.key === key && now - lastPush.at < COALESCE_MS) { lastPush.at = now; return; }
    past.push(snapshot());
    if (past.length > HISTORY_MAX) past.shift();
    future = [];
    lastPush = { key, at: now };
  }
  function restore(snap) {
    state.puzzles = snap.puzzles;
    state.activeId = snap.puzzles.some(p => p.id === snap.activeId) ? snap.activeId : snap.puzzles[0]?.id || null;
  }
  function undo() {
    if (!past.length) return false;
    future.push(snapshot());
    restore(past.pop());
    lastPush = { key: null, at: 0 };
    save(); notify('history');
    return true;
  }
  function redo() {
    if (!future.length) return false;
    past.push(snapshot());
    restore(future.pop());
    lastPush = { key: null, at: 0 };
    save(); notify('history');
    return true;
  }
  const canUndo = () => past.length > 0;
  const canRedo = () => future.length > 0;

  function notify(reason) { listeners.forEach(l => l(reason)); }

  /**
   * Applique une mutation puis notifie. `reason` aide les abonnés à cibler le rendu.
   * @param opts.coalesce  clé de regroupement dans l'historique (ex. un curseur qu'on fait glisser)
   */
  function update(fn, reason = 'any', { coalesce, history = UNDOABLE.has(reason) } = {}) {
    if (history) pushHistory(reason, coalesce);
    fn(state);
    const pz = active();
    if (pz && history) pz.updatedAt = Date.now();
    save();
    notify(reason);
  }

  const subscribe = fn => (listeners.add(fn), () => listeners.delete(fn));

  /* ---------------- Données ---------------- */
  /** Grilles de l'ancienne version encore présentes dans ce navigateur (récupération possible). */
  function legacy() {
    try {
      const s = JSON.parse(localStorage.getItem(LEGACY_KEY) || 'null');
      return Array.isArray(s?.puzzles) ? s.puzzles.slice(0, MF.schema.LIMITS.puzzles).map(makePuzzle) : [];
    } catch { return []; }
  }
  function forgetLegacy() {
    try {
      localStorage.removeItem(LEGACY_KEY);
      Object.keys(localStorage).filter(k => k.startsWith('mots-fleches-maker:')).forEach(k => localStorage.removeItem(k));
    } catch { /* ignoré */ }
  }

  /** Efface TOUTES les données locales de l'application (grilles, progression, images). */
  async function wipe() {
    try { Object.keys(localStorage).filter(k => k.startsWith('mfm:') || k.startsWith('mots-fleches-maker:')).forEach(k => localStorage.removeItem(k)); } catch { /* ignoré */ }
    await MF.assets.clear();
    past = []; future = [];
    state = defaults();
    writeNow();
    notify('reset');
  }

  /** Images encore utilisées par au moins une grille (historique compris). */
  function usedAssets() {
    const ids = new Set();
    const scan = list => list.forEach(p => {
      if (p.design?.background?.imageId) ids.add(p.design.background.imageId);
      p.stickers?.forEach(s => s.imageId && ids.add(s.imageId));
    });
    scan(state.puzzles);
    past.forEach(s => scan(s.puzzles));
    future.forEach(s => scan(s.puzzles));
    return ids;
  }

  /** Relit les données enregistrées (ex. modifiées dans un autre onglet). */
  function reload() {
    save.cancel();
    load();
    past = []; future = [];
    notify('reset');
  }
  /** Les données ont-elles été modifiées par un autre onglet ? */
  const isOwnKey = key => key === KEY;

  /** Taille approximative des données texte enregistrées (octets). */
  const bytes = () => { try { return (localStorage.getItem(KEY) || '').length * 2; } catch { return 0; } };

  return { load, reload, isOwnKey, get, active, puzzle, update, subscribe, undo, redo, canUndo, canRedo, makePuzzle, legacy, forgetLegacy, wipe, usedAssets, bytes, flush: writeNow };
})();
