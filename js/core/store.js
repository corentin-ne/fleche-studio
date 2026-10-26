// @ts-check
/* =========================================================================
   Store : état de l'application, persistance locale, historique, abonnements.

   Aucun serveur, aucune base de données : tout reste dans le navigateur.
     - localStorage : grilles, mots, réglages (données texte, quelques Mo) ;
     - IndexedDB (MF.assets, MF.versions) : images importées, versions automatiques.
   L'état relu est TOUJOURS repassé par MF.schema (données jamais supposées sûres).

   Historique (annuler / rétablir) : chaque étape ne garde que la grille
   modifiée ; seules les opérations sur la liste (ajout, suppression,
   restauration) gardent toutes les grilles.
   ========================================================================= */
window.MF = window.MF || {};

/**
 * Crée un store. L'application utilise MF.store ; les tests en créent un isolé.
 * @param {{ key?: string, persist?: boolean }} [o]  persist = false : rien n'est lu ni écrit dans le navigateur
 */
MF.createStore = ({ key: KEY = MF.storage.KEYS.state, persist = true } = {}) => {
  const disk = MF.storage;
  const LEGACY_KEY = `${disk.KEYS.legacy}v1`;
  const HISTORY_MAX = 60;
  const COALESCE_MS = 700;
  // Changements qui entrent dans l'historique (annuler / rétablir)
  const UNDOABLE = new Set(['words', 'clues', 'puzzle', 'design', 'stickers', 'layout', 'puzzles', 'options']);
  // Changements qui touchent à toute la liste des grilles (et pas seulement à la grille active)
  const WHOLE_LIST = new Set(['puzzles', 'reset']);
  // Changements sans effet sur le contenu des grilles (mots, définitions, grille calculée)
  const COSMETIC = new Set(['ui', 'zoom', 'theme', 'design', 'stickers', 'quota']);

  const listeners = new Set();
  let state = null;
  let past = [], future = [], lastPush = { key: null, at: 0 };
  let revision = 0;
  let recovering = false;

  const makePuzzle = p => MF.schema.puzzle(p);
  const { deepClone } = MF.util;

  function defaults() {
    const light = typeof matchMedia === 'function' && matchMedia('(prefers-color-scheme: light)').matches;
    return { v: 2, activeId: null, theme: light ? 'light' : 'dark', ui: { cell: 64, fit: true, mode: 'solution', tab: 'words', photoMarks: false, decor: 'emoji' }, puzzles: [] };
  }

  function sanitizeState(s) {
    const base = defaults();
    const S = MF.schema;
    s = S.isObj(s) ? s : {};
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

  /** Charge l'état enregistré (ou `initial`, pour les tests), toujours assaini. */
  function load(initial) {
    revision++;
    if (initial !== undefined) { state = sanitizeState(initial); return state; }
    // Stockage indisponible ou corrompu : on repart de zéro
    const saved = persist ? disk.getJSON(KEY) : null;
    state = saved ? sanitizeState(saved) : defaults();
    return state;
  }

  /** Écrit l'état maintenant. Renvoie false si le navigateur a refusé (stockage plein). */
  function writeNow() {
    if (!state || !persist) return true; // jamais chargé (ex. page de tests) : on ne touche pas aux données
    try {
      disk.write(KEY, JSON.stringify(state));
      return true;
    } catch (e) {
      // Stockage plein : les abonnés libèrent de la place (progression de jeu…) puis réessaient via flush()
      if (!recovering) {
        recovering = true;
        try { listeners.forEach(l => l('quota', e)); } finally { recovering = false; }
      }
      return false;
    }
  }
  const save = MF.util.debounce(writeNow, 250);
  if (persist) {
    addEventListener('pagehide', () => { save.cancel(); writeNow(); });
    document.addEventListener('visibilitychange', () => { if (document.hidden) { save.cancel(); writeNow(); } });
  }

  const get = () => state;
  const active = () => state.puzzles.find(p => p.id === state.activeId) || null;
  const puzzle = id => state.puzzles.find(p => p.id === id);

  /* ---------------- Historique ---------------- */
  /** Étape d'historique : toute la liste, ou seulement la grille concernée. */
  const snapshot = (whole, id = state.activeId) => (whole || !puzzle(id)
    ? { all: deepClone(state.puzzles), activeId: state.activeId }
    : { id, puzzle: deepClone(puzzle(id)), activeId: state.activeId });

  function pushHistory(reason, coalesceKey) {
    const now = Date.now();
    const key = `${coalesceKey || reason}@${state.activeId}`;
    if (lastPush.key === key && now - lastPush.at < COALESCE_MS) { lastPush.at = now; return; }
    past.push(snapshot(WHOLE_LIST.has(reason)));
    if (past.length > HISTORY_MAX) past.shift();
    future = [];
    lastPush = { key, at: now };
  }

  /** Applique une étape ; renvoie l'étape inverse (même portée), pour l'autre pile. */
  function apply(snap) {
    const inverse = snap.all ? snapshot(true) : snapshot(false, snap.id);
    if (snap.all) state.puzzles = snap.all;
    else {
      const i = state.puzzles.findIndex(p => p.id === snap.id);
      if (i >= 0) state.puzzles[i] = snap.puzzle; else state.puzzles.push(snap.puzzle);
    }
    // On revient sur la grille concernée : l'utilisateur voit ce qui a été annulé
    const target = snap.all ? snap.activeId : snap.id;
    state.activeId = state.puzzles.some(p => p.id === target) ? target : state.puzzles[0]?.id || null;
    return inverse;
  }

  function travel(from, to) {
    if (!from.length) return false;
    to.push(apply(from.pop()));
    lastPush = { key: null, at: 0 };
    revision++;
    save(); notify('history');
    return true;
  }
  const undo = () => travel(past, future);
  const redo = () => travel(future, past);
  const canUndo = () => past.length > 0;
  const canRedo = () => future.length > 0;

  function notify(reason) { listeners.forEach(l => l(reason)); }

  /**
   * Applique une mutation puis notifie. `reason` aide les abonnés à cibler le rendu.
   * @param {(state: any) => void} fn
   * @param {string} [reason]
   * @param {{ coalesce?: string, history?: boolean }} [opts]  coalesce : clé de regroupement dans l'historique (ex. un curseur qu'on fait glisser)
   */
  function update(fn, reason = 'any', { coalesce, history = UNDOABLE.has(reason) } = {}) {
    if (history) pushHistory(reason, coalesce);
    fn(state);
    const pz = active();
    if (pz && history) pz.updatedAt = Date.now();
    if (!COSMETIC.has(reason)) revision++;
    save();
    notify(reason);
  }

  const subscribe = fn => (listeners.add(fn), () => listeners.delete(fn));

  /** Compteur qui change à chaque modification du contenu des grilles (caches de rendu). */
  const rev = () => revision;

  /* ---------------- Données ---------------- */
  /** Grilles de l'ancienne version encore présentes dans ce navigateur (récupération possible). */
  function legacy() {
    if (!persist) return [];
    const s = disk.getJSON(LEGACY_KEY);
    return Array.isArray(s?.puzzles) ? s.puzzles.slice(0, MF.schema.LIMITS.puzzles).map(makePuzzle) : [];
  }
  const forgetLegacy = () => { disk.removeAll(disk.KEYS.legacy); };

  /** Efface TOUTES les données locales de l'application (grilles, progression, images, versions). */
  async function wipe() {
    if (persist) {
      disk.removeAll(disk.OWN);
      await MF.assets.clear();
      await MF.versions?.clear();
    }
    past = []; future = [];
    state = defaults();
    revision++;
    writeNow();
    notify('reset');
  }

  /** Remplace toutes les grilles (version automatique restaurée) : annulable par Ctrl+Z. */
  function replacePuzzles(list, activeId) {
    update(s => {
      s.puzzles = list.slice(0, MF.schema.LIMITS.puzzles).map(makePuzzle);
      s.activeId = s.puzzles.some(p => p.id === activeId) ? activeId : s.puzzles[0]?.id || null;
    }, 'puzzles');
  }

  /** Images encore utilisées par au moins une grille (historique compris). */
  function usedAssets() {
    const ids = new Set();
    const scan = list => list.forEach(p => MF.schema.assetIds(p).forEach(id => ids.add(id)));
    scan(state.puzzles);
    [...past, ...future].forEach(s => scan(s.all || [s.puzzle]));
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
  const isOwnKey = key => persist && key === KEY;

  /** Taille approximative des données texte enregistrées (octets). */
  const bytes = () => (persist ? disk.bytes(KEY) : 0);

  return {
    load, reload, isOwnKey, get, active, puzzle, update, subscribe, undo, redo, canUndo, canRedo, rev,
    makePuzzle, legacy, forgetLegacy, wipe, replacePuzzles, usedAssets, bytes, flush: writeNow,
  };
};

MF.store = MF.createStore();
