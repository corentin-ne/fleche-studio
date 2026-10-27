// @ts-check
/* =========================================================================
   Schéma et assainissement des données.
   TOUTE donnée qui entre dans l'application (stockage local, fichier importé,
   lien de partage) passe par ici : types vérifiés, valeurs bornées, listes
   blanches pour les énumérations et les couleurs. Rien d'autre n'est conservé,
   ce qui empêche l'injection de code via un attribut SVG/HTML ou la pollution
   de prototype.
   ========================================================================= */
window.MF = window.MF || {};

MF.schema = (() => {
  const { clamp, cleanText, uid, HEX } = MF.util;

  const LIMITS = { puzzles: 200, words: 1500, wordLen: 40, clue: 260, name: 80, stickers: 300, text: 400, title: 120 };

  /* ---------------- Primitives ---------------- */
  const isObj = v => !!v && typeof v === 'object' && !Array.isArray(v);
  const obj = v => (isObj(v) ? v : {});
  const color = (v, d) => (typeof v === 'string' && HEX.test(v) ? v.toLowerCase() : d);
  const colorOrAuto = (v, d = 'auto') => (v === 'auto' ? 'auto' : color(v, d));
  const num = (v, min, max, d) => { const n = Number(v); return Number.isFinite(n) ? clamp(n, min, max) : d; };
  const int = (v, min, max, d) => Math.round(num(v, min, max, d));
  const oneOf = (v, list, d) => (list.includes(v) ? v : d);
  const str = (v, max, d = '') => (typeof v === 'string' || typeof v === 'number' ? cleanText(v, max) : d);
  const bool = (v, d) => (typeof v === 'boolean' ? v : d);
  const id = v => (typeof v === 'string' && /^[A-Za-z0-9_-]{4,40}$/.test(v) ? v : uid());
  const optId = v => (typeof v === 'string' && /^[A-Za-z0-9_-]{4,40}$/.test(v) ? v : '');
  const WORD = /^[A-Z]{2,40}$/;

  /* ---------------- Options de génération ---------------- */
  const DEFAULT_OPTIONS = {
    size: 'auto', pages: 1, fillers: true, cols: 15, rows: 19, effort: 'normal', photoBand: 0,
    shape: 'rect', directions: 'normal', givens: 3, density: 'normal', lang: 'fr',
  };
  function options(o) {
    o = obj(o);
    const D = DEFAULT_OPTIONS;
    return {
      size: oneOf(o.size, ['auto', 'fixed'], D.size),
      pages: int(o.pages, 1, 2, D.pages),
      fillers: bool(o.fillers, D.fillers),
      cols: int(o.cols, 5, 50, D.cols),
      rows: int(o.rows, 5, 50, D.rows),
      effort: oneOf(o.effort, ['fast', 'normal', 'deep'], D.effort),
      photoBand: int(o.photoBand, 0, 20, D.photoBand),
      shape: oneOf(o.shape, MF.shapes.ids, D.shape),
      directions: oneOf(o.directions, ['easy', 'normal', 'hard'], D.directions),
      givens: int(o.givens, 0, 12, D.givens),
      density: oneOf(o.density, ['airy', 'normal', 'dense'], D.density),
      // Langue des mots de la grille (les anciennes grilles, sans langue, sont en français)
      lang: oneOf(o.lang, MF.lexicon.ids, D.lang),
      murdoku: murdokuOptions(o.murdoku),
    };
  }

  /* ---------------- Murdoku ---------------- */
  const MDK_LOOKS = ['print', 'gouache', 'film', 'pixel', 'clean'];
  const MDK_MOODS = ['day', 'golden', 'dusk', 'night'];
  /** Réglages d'une enquête (génération et rendu). */
  /** Textes retouchés d'une enquête : { type: valeur } pour les seuls types connus. */
  const textMap = (m, types, fn) => Object.fromEntries(Object.entries(obj(m)).filter(([k]) => types.includes(k)).map(([k, v]) => [k, fn(v)]).filter(([, v]) => v));
  function murdokuOptions(o) {
    o = obj(o);
    const M = MF.murdoku;
    return {
      theme: oneOf(o.theme, MF.murdokuThemes?.ids || ['manor'], 'manor'),
      size: int(o.size, 5, 8, 6),
      difficulty: oneOf(o.difficulty, ['easy', 'medium', 'hard', 'expert'], 'medium'),
      rooms: oneOf(o.rooms, ['few', 'normal', 'many'], 'normal'),
      density: oneOf(o.density, ['sparse', 'normal', 'full'], 'normal'),
      names: (Array.isArray(o.names) ? o.names : []).slice(0, 8).map(n => str(n, 20)),
      victim: str(o.victim, 20),
      // Lieux et objets renommés (par type), histoire
      roomNames: M ? textMap(o.roomNames, M.ROOM_TYPES, v => { const x = obj(v), name = str(x.name, 40), inn = str(x.in, 60); return name || inn ? { name, in: inn } : null; }) : {},
      objectNames: M ? textMap(o.objectNames, Object.keys(M.OBJECTS), v => str(v, 32)) : {},
      story: str(o.story, 600),
      look: oneOf(o.look, MDK_LOOKS, 'print'),
      mood: oneOf(o.mood, MDK_MOODS, 'day'),
      camera: oneOf(o.camera, ['iso', 'top'], 'iso'),
      labels: bool(o.labels, true),
      render: oneOf(o.render, ['3d', '2d'], '3d'),
      clutter: oneOf(o.clutter, ['none', 'some', 'lots'], 'lots'),
      roomLabels: bool(o.roomLabels, true),
      // Variante des noms et de l'histoire (générateur), indépendante de l'énigme
      flavor: int(o.flavor, 0, 2147483647, 0),
      seed: int(o.seed, 0, 2147483647, 0),
    };
  }

  /**
   * Énigme Murdoku (lien partagé = donnée externe) : structure, bornes et cohérence vérifiées.
   * Les indices gardent leurs seuls champs connus ; une énigme incohérente est rejetée (null).
   */
  function murdokuPage(p) {
    if (!isObj(p)) return null;
    const N = int(p.size, 5, 8, 0);
    const M = MF.murdoku;
    if (!N || !M || !Array.isArray(p.rooms) || !Array.isArray(p.cells) || p.cells.length !== N) return null;
    const PATTERNS = ['wood', 'tile', 'carpet', 'grass', 'stone', 'sand', 'water', 'snow', 'marble', 'tatami', 'planks', 'parquet', 'metal', 'mosaic', 'cobble', 'hex', 'straw', 'checker'];
    const rooms = p.rooms.slice(0, N * N).map(obj).map((r, i) => {
      const out = { id: i, type: oneOf(r.type, M.ROOM_TYPES, 'hall') };
      // Habillage d'un univers : nom, phrase « dans … », sol et mur
      if (r.name) out.name = str(r.name, 40);
      if (r.in) out.in = str(r.in, 60);
      if (Array.isArray(r.floor) && PATTERNS.includes(r.floor[0])) out.floor = [r.floor[0], color(r.floor[1], '#cccccc'), color(r.floor[2], '#999999')];
      if (r.wall) out.wall = color(r.wall, '#cccccc');
      if (typeof r.open === 'boolean') out.open = r.open;
      return out;
    });
    const cells = p.cells.map(row => (Array.isArray(row) && row.length === N ? row.map(v => int(v, 0, rooms.length - 1, -1)) : null));
    if (cells.some(row => !row || row.includes(-1))) return null;
    const OBJ = M.OBJECTS;
    const cellOk = (r, c) => Number.isInteger(r) && Number.isInteger(c) && r >= 0 && c >= 0 && r < N && c < N;
    const objects = (Array.isArray(p.objects) ? p.objects : []).slice(0, N * N).map(obj)
      .filter(o => OBJ[o.type] && cellOk(o.r, o.c)).map(o => ({ type: o.type, r: o.r, c: o.c }));
    const people = (Array.isArray(p.people) ? p.people : []).slice(0, N).map(obj).map((x, i) => ({
      id: /^[a-z0-9]{1,8}$/i.test(x.id) ? x.id : `p${i}`, name: str(x.name, 20) || '?', color: color(x.color, '#888888'),
      role: x.role === 'victim' ? 'victim' : 'suspect', r: int(x.r, 0, N - 1, 0), c: int(x.c, 0, N - 1, 0),
    }));
    const ids = new Set(people.map(x => x.id));
    if (people.length !== N || ids.size !== N || people.filter(x => x.role === 'victim').length !== 1) return null;
    if (new Set(people.map(x => x.r)).size !== N || new Set(people.map(x => x.c)).size !== N) return null;
    const ref = v => (ids.has(v) ? v : null);
    // Indices : seuls les champs connus (voir docs/murdoku-format.md), puis vérification par le moteur
    const clues = (Array.isArray(p.clues) ? p.clues : []).slice(0, 80).map(obj).filter(c => M.KINDS.includes(c.kind)).map(c => {
      const out = { kind: c.kind };
      for (const k of ['person', 'a', 'b']) if (c[k] !== undefined) out[k] = ref(c[k]);
      if (c.room !== undefined) out.room = int(c.room, 0, rooms.length - 1, 0);
      if (c.object !== undefined) out.object = OBJ[c.object] ? c.object : 'plant';
      if (c.row !== undefined) out.row = int(c.row, 0, N - 1, 0);
      if (c.col !== undefined) out.col = int(c.col, 0, N - 1, 0);
      if (c.n !== undefined) out.n = int(c.n, 0, N, 0);
      return out;
    });
    const out = {
      engine: 'murdoku', v: 1, size: N, seed: int(p.seed, 0, 2 ** 32, 0), rooms, cells, objects, people,
      victim: people.find(x => x.role === 'victim').id, lang: oneOf(p.lang, MF.lexicon.ids, 'fr'),
      murderer: ref(p.murderer) || people[0].id, difficulty: oneOf(p.difficulty, ['easy', 'medium', 'hard', 'expert'], 'medium'),
    };
    if (typeof p.theme === 'string') out.theme = str(p.theme, 20);
    if (p.story) out.story = str(p.story, 600);
    const on = Object.entries(obj(p.objectNames)).filter(([k]) => OBJ[k]).map(([k, v]) => {
      const x = obj(v);
      /** @type {{ name: string, a: string, on: string, icon?: string }} */
      const w = { name: str(x.name, 32), a: str(x.a, 48), on: str(x.on, 60) };
      if (x.icon) w.icon = str(x.icon, 8);
      return /** @type {[string, typeof w]} */ ([k, w]);
    }).filter(([, w]) => w.name && w.a);
    if (on.length) out.objectNames = Object.fromEntries(on);
    out.clues = clues.filter(c => M.validClue(c, out));
    return out;
  }

  /* ---------------- Design ---------------- */
  function design(d) {
    d = obj(d);
    const D = MF.design.DEFAULT;
    const fonts = Object.keys(MF.design.FONTS);
    const c = obj(d.colors), b = obj(d.background), f = obj(d.frame), ce = obj(d.cell), fo = obj(d.font);
    const ar = obj(d.arrows), po = obj(d.poster), ti = obj(d.title), li = obj(d.lists);
    const mu = obj(d.multi), mt = obj(mu.targets), DM = D.multi;
    const pal = (Array.isArray(mu.palette) ? mu.palette : []).slice(0, MF.design.MULTI_MAX).map(x => color(x, null)).filter(Boolean);
    return {
      theme: str(d.theme, 30, D.theme),
      accent: color(d.accent, D.accent),
      colors: Object.fromEntries(Object.keys(D.colors).map(k => [k, colorOrAuto(c[k])])),
      background: {
        type: oneOf(b.type, Object.keys(MF.backgrounds.TYPES), D.background.type),
        c1: color(b.c1, D.background.c1), c2: color(b.c2, D.background.c2), c3: color(b.c3, D.background.c3),
        angle: int(b.angle, 0, 360, D.background.angle),
        pattern: oneOf(b.pattern, Object.keys(MF.backgrounds.PATTERNS), D.background.pattern),
        scale: num(b.scale, 0.3, 4, D.background.scale),
        imageId: optId(b.imageId),
        fit: oneOf(b.fit, ['cover', 'contain', 'tile'], D.background.fit),
        imageOpacity: num(b.imageOpacity, 0, 1, 1),
        overlay: color(b.overlay, D.background.overlay),
        overlayOpacity: num(b.overlayOpacity, 0, 0.9, 0),
      },
      frame: { width: num(f.width, 0, 80, D.frame.width), radius: num(f.radius, 0, 120, D.frame.radius) },
      voids: oneOf(d.voids, Object.keys(MF.design.VOIDS), D.voids),
      cell: {
        style: oneOf(ce.style, Object.keys(MF.design.CELL_STYLES), D.cell.style),
        gap: num(ce.gap, 0, 24, D.cell.gap),
        radius: num(ce.radius, 0, 50, D.cell.radius),
        line: num(ce.line, 0, 12, D.cell.line),
        letterShape: oneOf(ce.letterShape, ['square', 'circle'], D.cell.letterShape),
        shadow: bool(ce.shadow, D.cell.shadow),
      },
      font: {
        clue: oneOf(fo.clue, fonts, D.font.clue),
        letter: oneOf(fo.letter, fonts, D.font.letter),
        clueWeight: oneOf(+fo.clueWeight, [400, 500, 600, 700, 800], D.font.clueWeight),
        clueSize: num(fo.clueSize, 11, 26, D.font.clueSize),
        upper: bool(fo.upper, D.font.upper),
      },
      arrows: { style: oneOf(ar.style, Object.keys(MF.design.ARROWS), D.arrows.style), size: num(ar.size, 0.6, 1.8, 1) },
      poster: {
        format: oneOf(po.format, Object.keys(MF.design.FORMATS), D.poster.format),
        orientation: oneOf(po.orientation, ['portrait', 'landscape'], D.poster.orientation),
        padding: num(po.padding, 0, 400, D.poster.padding),
        anchor: oneOf(po.anchor, MF.design.ANCHORS, D.poster.anchor),
        scale: num(po.scale, 0.3, 1, D.poster.scale),
        radius: num(po.radius, 0, 200, D.poster.radius),
        customW: int(po.customW, 1, 20000, D.poster.customW),
        customH: int(po.customH, 1, 20000, D.poster.customH),
      },
      title: {
        show: bool(ti.show, D.title.show),
        text: str(ti.text, LIMITS.title), subtitle: str(ti.subtitle, LIMITS.title),
        font: oneOf(ti.font, fonts, D.title.font),
        color: colorOrAuto(ti.color),
        size: num(ti.size, 40, 260, D.title.size),
        align: oneOf(ti.align, ['left', 'center', 'right'], D.title.align),
      },
      lists: { font: oneOf(li.font, fonts, D.lists.font), size: num(li.size, 18, 60, D.lists.size), color: colorOrAuto(li.color) },
      multi: {
        on: bool(mu.on, DM.on),
        targets: Object.fromEntries(Object.keys(DM.targets).map(k => [k, bool(mt[k], DM.targets[k])])),
        mode: oneOf(mu.mode, Object.keys(MF.design.MULTI_MODES), DM.mode),
        preset: oneOf(mu.preset, [...Object.keys(MF.design.MULTI_PRESETS), 'custom'], DM.preset),
        palette: pal.length >= MF.design.MULTI_MIN ? pal : DM.palette.slice(),
        seed: int(mu.seed, 0, 99999, DM.seed),
      },
    };
  }

  /* ---------------- Stickers (décor posé sur l'affiche) ---------------- */
  const STICKER_KINDS = ['emoji', 'shape', 'image', 'text'];
  function sticker(s) {
    s = obj(s);
    const kind = oneOf(s.kind, STICKER_KINDS, null);
    if (!kind) return null;
    const out = {
      id: id(s.id), kind,
      x: num(s.x, -0.5, 1.5, 0.5), y: num(s.y, -0.5, 1.5, 0.5),
      w: num(s.w, 0.01, 3, 0.15), ar: num(s.ar, 0.05, 20, 1),
      rot: num(s.rot, -360, 360, 0), opacity: num(s.opacity, 0.05, 1, 1),
      flip: bool(s.flip, false), layer: oneOf(s.layer, ['above', 'below'], 'above'),
      shadow: bool(s.shadow, false), locked: bool(s.locked, false),
    };
    if (kind === 'emoji') {
      // Un seul « graphème » emoji, pas de texte arbitraire
      const e = str(s.emoji, 16);
      if (!e || /[<>&"'\\]/.test(e)) return null;
      out.emoji = e;
    } else if (kind === 'shape') {
      out.shape = oneOf(s.shape, Object.keys(MF.stickers?.SHAPES || {}), null);
      if (!out.shape) return null;
      out.color = color(s.color, '#ff5c8a');
      out.color2 = color(s.color2, '#ffd23f');
    } else if (kind === 'image') {
      out.imageId = optId(s.imageId);
      if (!out.imageId) return null;
      out.mask = oneOf(s.mask, ['none', 'rounded', 'circle', 'heart', 'star'], 'none');
      out.border = num(s.border, 0, 40, 0);
      out.borderColor = color(s.borderColor, '#ffffff');
    } else {
      out.text = str(s.text, LIMITS.text);
      if (!out.text) return null;
      out.font = oneOf(s.font, Object.keys(MF.design.FONTS), 'baloo');
      out.color = color(s.color, '#231f20');
      out.bg = color(s.bg, 'none');
      out.weight = oneOf(+s.weight, [400, 500, 600, 700, 800], 700);
      out.align = oneOf(s.align, ['left', 'center', 'right'], 'center');
    }
    return out;
  }

  /* ---------------- Mots ---------------- */
  function word(w) {
    w = obj(w);
    const text = str(w.text, LIMITS.wordLen);
    if (!text) return null;
    return { id: id(w.id), text, clue: str(w.clue, LIMITS.clue), priority: !!w.priority };
  }

  /* ---------------- Grilles calculées ---------------- */
  const ARROW_SET = ['right', 'down', 'downRight', 'rightDown'];
  function frame(f) {
    f = obj(f);
    const w = int(f.w, 3, 90, 0), h = int(f.h, 3, 90, 0);
    if (!w || !h) return null;
    return { w, h, top: int(f.top, 0, h - 1, 0), shape: oneOf(f.shape, MF.shapes.ids, 'rect') };
  }
  function builderPage(p) {
    p = obj(p);
    const fr = frame(p.frame);
    if (!fr || !Array.isArray(p.rows) || p.rows.length !== fr.h) return null;
    if (!p.rows.every(r => typeof r === 'string' && r.length === fr.w && /^[A-Z#]+$/.test(r))) return null;
    if (!Array.isArray(p.words) || p.words.length > 2000) return null;
    const inR = (r, c) => Number.isInteger(r) && Number.isInteger(c) && r >= 0 && c >= 0 && r < fr.h && c < fr.w;
    const words = [];
    for (const w of p.words) {
      if (!isObj(w) || !inR(w.r, w.c) || !inR(w.sr, w.sc) || !['H', 'V'].includes(w.dir)) return null;
      if (typeof w.word !== 'string' || !WORD.test(w.word) || w.word.length !== w.len || !ARROW_SET.includes(w.arrow)) return null;
      const [dr, dc] = w.dir === 'H' ? [0, 1] : [1, 0];
      if (!inR(w.r + (w.len - 1) * dr, w.c + (w.len - 1) * dc)) return null;
      for (let i = 0; i < w.len; i++) if (p.rows[w.r + i * dr][w.c + i * dc] !== w.word[i]) return null;
      words.push({ r: w.r, c: w.c, dir: w.dir, len: w.len, word: w.word, sr: w.sr, sc: w.sc, arrow: w.arrow, src: w.src === 'theme' ? 'theme' : 'curated', wid: optId(w.wid) || undefined });
    }
    return {
      engine: 'builder', frame: fr, rows: p.rows.slice(), words,
      photos: int(p.photos, 0, 9000, 0),
      unplaced: Array.isArray(p.unplaced) ? p.unplaced.map(optId).filter(Boolean).slice(0, LIMITS.words) : [],
      attempts: int(p.attempts, 0, 1e9, 0),
    };
  }
  function melesPage(p) {
    p = obj(p);
    const fr = frame(p.frame);
    if (!fr || !Array.isArray(p.rows) || p.rows.length !== fr.h) return null;
    if (!p.rows.every(r => typeof r === 'string' && r.length === fr.w && /^[A-Z.]+$/.test(r))) return null;
    if (!Array.isArray(p.words) || p.words.length > 600) return null;
    const words = [];
    for (const w of p.words) {
      if (!isObj(w) || typeof w.word !== 'string' || !WORD.test(w.word)) return null;
      const [r, c, dr, dc] = [w.r, w.c, w.dr, w.dc].map(Number);
      if (![r, c, dr, dc].every(Number.isInteger) || Math.abs(dr) > 1 || Math.abs(dc) > 1 || (!dr && !dc)) return null;
      const L = w.word.length;
      for (let i = 0; i < L; i++) if (p.rows[r + i * dr]?.[c + i * dc] !== w.word[i]) return null;
      words.push({ word: w.word, r, c, dr, dc, len: L, wid: optId(w.wid) || undefined, label: str(w.label, LIMITS.wordLen) || w.word });
    }
    return { engine: 'meles', frame: fr, rows: p.rows.slice(), words, unplaced: Array.isArray(p.unplaced) ? p.unplaced.map(optId).filter(Boolean) : [] };
  }
  function layout(l) {
    if (!isObj(l) || !Array.isArray(l.pages) || !l.pages.length || l.pages.length > 2) return null;
    const engine = oneOf(l.engine, ['builder', 'meles', 'murdoku'], null);
    if (!engine) return null;
    const pages = l.pages.slice(0, engine === 'murdoku' ? 1 : 2).map(engine === 'builder' ? builderPage : engine === 'meles' ? melesPage : murdokuPage);
    if (pages.some(p => !p)) return null;
    // Données de jeu propres à la grille (codes des mots codés)
    const extra = {};
    if (isObj(l.codes)) {
      const codes = {};
      for (const [k, v] of Object.entries(l.codes)) if (/^[A-Z]$/.test(k)) codes[k] = int(v, 1, 26, 1);
      if (new Set(Object.values(codes)).size === Object.keys(codes).length) extra.codes = codes;
    }
    if (Array.isArray(l.givens)) extra.givens = l.givens.filter(x => typeof x === 'string' && /^[A-Z]$/.test(x)).slice(0, 26);
    return { engine, pages, hash: str(l.hash, 40), at: num(l.at, 0, 1e15, Date.now()), ...extra };
  }

  /** Images (identifiants MF.assets) utilisées par une grille : fond et photos du décor. */
  const assetIds = p => [p?.design?.background?.imageId, ...(p?.stickers || []).map(s => s.imageId)].filter(Boolean);

  /* ---------------- Grille complète ---------------- */
  function puzzle(p) {
    p = obj(p);
    const fillerClues = {};
    for (const [k, v] of Object.entries(obj(p.fillerClues))) if (WORD.test(k)) fillerClues[k] = str(v, LIMITS.clue);
    const legacyAccent = color(p.accent, null);
    const des = design(p.design || (legacyAccent ? { accent: legacyAccent, poster: { padding: 0 }, background: { type: 'none' } } : {}));
    // Ancienne « feuille de référence » (A3, paysage) : reprise par le format de page,
    // seul réglage désormais (sauf si la page avait déjà un format fixe, qui l'emporte)
    const oldOpts = obj(p.options);
    if (des.poster.format === 'fit') {
      if (oldOpts.paper === 'A3') des.poster.format = 'A3';
      if (oldOpts.orientation === 'landscape') des.poster.orientation = 'landscape';
    }
    return {
      id: id(p.id),
      name: str(p.name, LIMITS.name) || MF.i18n.t('Nouvelle grille'),
      game: oneOf(p.game, MF.games.ids, 'fleches'),
      createdAt: num(p.createdAt, 0, 1e15, Date.now()),
      updatedAt: num(p.updatedAt, 0, 1e15, Date.now()),
      words: (Array.isArray(p.words) ? p.words : []).slice(0, LIMITS.words).map(word).filter(Boolean),
      fillerClues,
      banned: (Array.isArray(p.banned) ? p.banned : []).filter(w => typeof w === 'string' && WORD.test(w)).slice(0, 2000),
      options: options(p.options),
      design: des,
      stickers: (Array.isArray(p.stickers) ? p.stickers : []).slice(0, LIMITS.stickers).map(sticker).filter(Boolean),
      layout: layout(p.layout),
    };
  }

  return { LIMITS, DEFAULT_OPTIONS, options, murdokuOptions, murdokuPage, design, sticker, word, puzzle, layout, assetIds, color, num, int, oneOf, str, bool, isObj, WORD };
})();
