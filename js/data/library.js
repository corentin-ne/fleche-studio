// @ts-check
/* =========================================================================
   Bibliothèque des thèmes, commune à tous les jeux : un seul catalogue, un
   seul ordre, rangé en rayons.

   Chaque thème peut exister en deux versions qui portent le même identifiant :
     2D : habillage des grilles (MF.themes : couleurs, fond, cases, polices)
     3D : univers Murdoku (MF.murdokuThemes : lieux, objets, suspects, diorama)
   Un thème de la bibliothèque a l'une, l'autre ou les deux ; les styles
   simples (Violet doux, Minimal…) restent en 2D seulement.

   Réorganiser : déplacer un identifiant dans SHELVES suffit, l'ordre est
   repris partout (Design, Enquête, assistant de création). Un thème oublié
   ici apparaît quand même, à la fin de son rayon par défaut (les tests le
   signalent).
   ========================================================================= */
window.MF = window.MF || {};

MF.library = (() => {
  const { t } = MF.i18n;

  /** Rayons, dans l'ordre d'affichage, et leurs thèmes dans l'ordre. */
  const SHELVES = [
    { id: 'styles', label: t('Styles'), items: ['violet', 'canva', 'print', 'minimal', 'pastel', 'mint', 'lavender', 'coral', 'sunset', 'rainbow', 'candy', 'crayons', 'memphis', 'neon', 'kraft', 'chalk', 'gold', 'night', 'ocean'] },
    { id: 'worlds', label: t('Univers'), items: ['manor', 'haunted', 'paris', 'regency', 'japan', 'egypt', 'rome', 'medieval', 'prehistory', 'forest', 'pirates', 'mermaids', 'western', 'train', 'circus', 'chalet', 'world', 'space'] },
    { id: 'party', label: t('Fêtes'), items: ['birthday', 'love', 'xmas', 'halloween', 'easter', 'carnival', 'lunar'] },
  ];

  /** Identifiants historiques différents d'une version à l'autre (thème -> { grid, mdk }). */
  const ALIAS = { mermaids: { grid: 'mermaid' } };

  const gridOf = id => ALIAS[id]?.grid ?? id;
  const mdkOf = id => ALIAS[id]?.mdk ?? id;

  /**
   * Catalogue construit une fois : { id, shelf, grid, mdk } (grid / mdk : identifiant de la
   * version 2D / 3D, ou null). Les thèmes absents des rayons sont ajoutés à la fin.
   */
  const ENTRIES = (() => {
    const out = [], seen = new Set();
    const add = (id, shelf) => {
      if (seen.has(id)) return;
      const grid = MF.themes.THEMES[gridOf(id)] ? gridOf(id) : null;
      const mdk = MF.murdokuThemes.THEMES[mdkOf(id)] ? mdkOf(id) : null;
      if (!grid && !mdk) return;
      seen.add(id);
      if (grid) seen.add(grid);
      if (mdk) seen.add(mdk);
      out.push({ id, shelf, grid, mdk });
    };
    for (const s of SHELVES) for (const id of s.items) add(id, s.id);
    for (const id of Object.keys(MF.themes.THEMES)) add(id, 'styles');
    for (const id of MF.murdokuThemes.ids) add(id, 'worlds');
    return out;
  })();
  const byId = new Map(ENTRIES.map(e => [e.id, e]));
  const byGridId = new Map(ENTRIES.filter(e => e.grid).map(e => [e.grid, e]));
  const byMdkId = new Map(ENTRIES.filter(e => e.mdk).map(e => [e.mdk, e]));

  /**
   * Thèmes dans l'ordre de la bibliothèque.
   * @param {'2d' | '3d' | 'all'} [kind] '2d' : ceux qui habillent une grille, '3d' : les univers Murdoku
   */
  const list = (kind = 'all') => ENTRIES.filter(e => kind === 'all' || (kind === '2d' ? e.grid : e.mdk));

  /**
   * Rayons qui ont au moins un thème de ce genre, avec ces thèmes.
   * @param {'2d' | '3d' | 'all'} [kind]
   */
  const shelves = (kind = 'all') => SHELVES.map(s => ({ id: s.id, label: s.label, entries: list(kind).filter(e => e.shelf === s.id) })).filter(s => s.entries.length);

  return {
    SHELVES, ENTRIES, list, shelves,
    get: id => byId.get(id) || null,
    /** Thème de la bibliothèque d'un thème de grille (MF.themes) ou d'un univers (MF.murdokuThemes). */
    byGrid: id => byGridId.get(id) || null,
    byUniverse: id => byMdkId.get(id) || null,
  };
})();
