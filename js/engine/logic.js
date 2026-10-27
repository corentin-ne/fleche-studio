// @ts-check
/* =========================================================================
   Moteur « logique » : les jeux qui ne se construisent pas en croisant des
   mots (sudoku, wordoku, calcudoku, futoshiki, kakuro, nombres fléchés /
   croisés, picross, logigramme, échelle de mots, citation codée).

   Même contrat que MF.builder et MF.wordsearch (prepare, generate,
   layoutHash), plus la vérification des pages venues de l'extérieur
   (sanitize) et l'écriture des textes dans la langue de la grille
   (formules des nombres fléchés, indices du logigramme).

   Une page « logic » : { engine: 'logic', kind, … } ; ses champs dépendent
   du jeu (voir les générateurs MF.logicNumbers, MF.logicWords, MF.logicPictures).
   ========================================================================= */
window.MF = window.MF || {};

MF.logic = (() => {
  const KINDS = ['sudoku', 'wordoku', 'calcudoku', 'futoshiki', 'kakuro', 'nombres', 'picross', 'logigramme', 'echelle', 'citation'];
  /** Jeux dont la grille prend les proportions de la page. */
  const USES_PAGE = new Set(['kakuro', 'nombres', 'citation']);
  /** Réglages par défaut de chaque jeu (MF.schema.logicOptions). */
  const DEFAULTS = {
    sudoku: { size: 9, variant: 'classic' }, wordoku: { size: 9 }, calcudoku: { size: 5, variant: 'all' }, futoshiki: { size: 5 },
    kakuro: { size: 8 }, nombres: { size: 9, variant: 'croises' }, picross: { size: 15, source: 'emoji' }, logigramme: { size: 4 },
    echelle: { size: 4, count: 2 }, citation: {}, mystere: {}, cases: {},
  };

  /** Réglages complets d'un jeu (valeurs enregistrées, sinon celles par défaut). */
  const settings = (game, o = {}) => ({
    ...DEFAULTS[game],
    ...Object.fromEntries(Object.entries(o || {}).filter(([, v]) => v !== '' && v !== 0 && v !== null && v !== undefined)),
    level: o?.level || 'medium',
  });

  function prepare(words) {
    const out = [];
    const seen = new Set();
    for (const w of words || []) {
      const norm = MF.util.normalize(w.text);
      if (norm.length < 2 || seen.has(norm)) continue;
      seen.add(norm);
      out.push({ id: w.id, norm });
    }
    // Un jeu de logique se calcule même sans mot : une entrée vide suffit à le lancer
    return out.length ? out : [{ id: '', norm: '' }];
  }

  /**
   * @param {any[]} words
   * @param {any} opts  options de la grille (MF.paper.gridOptions) + game, et les données préparées dans la page (picture, cats)
   * @param {{ seed?: number, signal?: { cancelled: boolean }, onProgress?: (p: number) => void }} [run]
   */
  async function generate(words, opts = {}, { seed = Date.now(), signal, onProgress } = {}) {
    const game = opts.game;
    if (!KINDS.includes(game)) throw new Error(`jeu inconnu : ${game}`);
    const rnd = MF.util.rng(seed);
    const o = { ...settings(game, opts.logic), game, lang: opts.lang, aspect: opts.aspect, picture: opts.picture, cats: opts.cats };
    onProgress?.(0.15);
    await MF.util.nextFrame();
    if (signal?.cancelled) return null;
    // Wordoku, échelle : mots choisis dans les réglages (sinon pris au dictionnaire)
    const W = String(o.text || '').split(/[\s,;/→>-]+/).map(x => ({ norm: MF.util.normalize(x) })).filter(w => w.norm.length >= 2);
    const N = MF.logicNumbers, Wd = MF.logicWords, P = MF.logicPictures;
    const make = {
      sudoku: () => N.sudoku(o, rnd), wordoku: () => N.wordoku(o, rnd, W), calcudoku: () => N.calcudoku(o, rnd),
      futoshiki: () => N.futoshiki(o, rnd), kakuro: () => N.kakuro(o, rnd), nombres: () => N.nombres(o, rnd),
      picross: () => P.picross(o, rnd), logigramme: () => P.logigramme(o, rnd),
      echelle: () => Wd.echelle(o, rnd, W), citation: () => Wd.citation(o, rnd),
    }[game];
    const page = make();
    onProgress?.(1);
    if (signal?.cancelled) return null;
    return { engine: 'logic', words: [], ...page, level: o.level };
  }

  /** Empreinte des données qui influencent la grille. */
  function layoutHash(puzzle) {
    const o = MF.paper.gridOptions(puzzle);
    return MF.util.hash(`logic1#${puzzle.game}#${JSON.stringify(settings(puzzle.game, o.logic))}#${o.lang}#${USES_PAGE.has(puzzle.game) ? MF.paper.key(o) : ''}`);
  }

  /* ---------------- Textes dans la langue de la grille ---------------- */
  /** Définition d'un nombre (nombres fléchés / croisés). */
  function formula(f, lang) {
    const tr = (s, p) => MF.i18n.tr(lang, s, p);
    const { a, b, c } = f;
    switch (f.t) {
      case 'add': return `${a} + ${b}`;
      case 'sub': return `${a} − ${b}`;
      case 'mul': return `${a} × ${b}`;
      case 'div': return `${a} ÷ ${b}`;
      case 'sq': return `${a}²`;
      case 'cube': return `${a}³`;
      case 'sqp': return `${a}² + ${b}`;
      case 'mix': return `${a} × ${b} + ${c}`;
      case 'mix2': return `${a} × ${b} − ${c}`;
      case 'dbl': return tr('Double de {n}', { n: a });
      case 'half': return tr('Moitié de {n}', { n: a });
      default: return '';
    }
  }

  /** Indice d'un logigramme, en toutes lettres. */
  function clueText(clue, cats, lang) {
    const tr = (s, p) => MF.i18n.tr(lang, s, p);
    const item = ([k, i]) => { const c = cats[k], it = c.items[i]; return { kind: c.kind, label: it.label, ph: it.ph || it.label }; };
    const subject = x => ({
      person: x.label,
      place: tr('La personne {ph}', { ph: x.ph }),
      thing: tr('La personne qui avait {ph}', { ph: x.ph }),
      time: tr('La personne présente {ph}', { ph: x.ph }),
    }[x.kind]);
    const lower = (x, s) => (x.kind === 'person' ? s : s[0].toLowerCase() + s.slice(1));
    // « n'avait pas un piano » -> « n'avait pas de piano » (négation française)
    const none = ph => (lang === 'fr' ? ph.replace(/^(un|une|des) (?=[aeiouyhàâéèêîôû])/i, 'd\'').replace(/^(un|une|des) /i, 'de ') : ph);
    const pred = (x, neg) => ({
      person: tr(neg ? 'n\'est pas {ph}' : 'est {ph}', { ph: x.label }),
      place: tr(neg ? 'n\'était pas {ph}' : 'était {ph}', { ph: x.ph }),
      thing: tr(neg ? 'n\'avait pas {ph}' : 'avait {ph}', { ph: neg ? none(x.ph) : x.ph }),
      time: tr(neg ? 'n\'était pas là {ph}' : 'était là {ph}', { ph: x.ph }),
    }[x.kind]);
    const obj = x => (x.kind === 'person' ? x.label : x.ph);
    const a = item(clue.a), b = item(clue.b);
    switch (clue.t) {
      case 'is': return `${subject(a)} ${pred(b, false)}.`;
      case 'not': return `${subject(a)} ${pred(b, true)}.`;
      case 'or': return `${subject(a)} ${pred(b, false)} ${tr('ou')} ${obj(item(clue.c))}.`;
      case 'before': return tr('{a} était là avant {b}.', { a: subject(a), b: lower(b, subject(b)) });
      case 'next': return tr('{a} était là une heure avant {b}.', { a: subject(a), b: lower(b, subject(b)) });
      default: return '';
    }
  }

  /* ---------------- Pages venues de l'extérieur ---------------- */
  const { isObj } = { isObj: v => !!v && typeof v === 'object' && !Array.isArray(v) };
  const int = (v, min, max) => (Number.isInteger(v) && v >= min && v <= max ? v : null);
  const text = (v, max) => (typeof v === 'string' ? MF.util.cleanText(v, max) : '');
  /** Lignes de même longueur, chaque caractère accepté par `re`. */
  const grid = (rows, w, h, re) => Array.isArray(rows) && rows.length === h && rows.every(r => typeof r === 'string' && r.length === w && re.test(r));
  const LEVELS = ['easy', 'medium', 'hard', 'expert'];

  function sanitize(p) {
    if (!isObj(p) || !KINDS.includes(p.kind)) return null;
    const out = { engine: 'logic', kind: p.kind, words: [], level: LEVELS.includes(p.level) ? p.level : 'medium' };
    const k = p.kind;
    if (k === 'sudoku' || k === 'wordoku') {
      const n = [4, 6, 8, 9].includes(p.n) ? p.n : 0;
      if (!n) return null;
      const re = k === 'sudoku' ? new RegExp(`^[1-${n}]+$`) : /^[A-Z]+$/;
      if (!grid(p.rows, n, n, re) || !grid(p.given, n, n, /^[01]+$/) || !grid(p.regions, n, n, /^[A-Z]+$/)) return null;
      if (p.regions.join('').split('').some(ch => ch.charCodeAt(0) - 65 >= n)) return null;
      if (k === 'wordoku' && new Set(p.rows.join('')).size !== n) return null;
      Object.assign(out, { n, rows: p.rows.slice(), given: p.given.slice(), regions: p.regions.slice(), variant: ['classic', 'jigsaw', 'diagonal'].includes(p.variant) ? p.variant : 'classic' });
      if (k === 'wordoku' && typeof p.word === 'string' && /^[A-Z]+$/.test(p.word) && p.word.length === n) out.word = p.word;
      return out;
    }
    if (k === 'calcudoku' || k === 'futoshiki') {
      const n = int(p.n, 4, 7);
      if (!n || !grid(p.rows, n, n, new RegExp(`^[1-${n}]+$`))) return null;
      out.n = n;
      out.rows = p.rows.slice();
      out.given = grid(p.given, n, n, /^[01]+$/) ? p.given.slice() : Array(n).fill('0'.repeat(n));
      if (k === 'calcudoku') {
        if (!Array.isArray(p.cages) || p.cages.length > n * n) return null;
        const owner = new Array(n * n).fill(0);
        const cages = [];
        for (const cg of p.cages) {
          if (!isObj(cg) || !Array.isArray(cg.cells) || !cg.cells.length || cg.cells.length > 8) return null;
          const cells = cg.cells.map(c => int(c, 0, n * n - 1));
          if (cells.some(c => c === null)) return null;
          cells.forEach(c => { owner[c]++; });
          if (!['=', '+', '-', 'x', '/'].includes(cg.op)) return null;
          cages.push({ cells, op: cg.op, target: int(cg.target, 0, 10 ** 7) ?? 0 });
        }
        if (owner.some(x => x !== 1)) return null;
        out.cages = cages;
        out.variant = p.variant === 'add' ? 'add' : 'all';
      } else {
        const adj = (a, b) => Math.abs(a - b) === n || (Math.abs(a - b) === 1 && Math.floor(a / n) === Math.floor(b / n));
        out.signs = (Array.isArray(p.signs) ? p.signs : []).slice(0, 2 * n * n)
          .filter(s => Array.isArray(s) && s.length === 2 && int(s[0], 0, n * n - 1) !== null && int(s[1], 0, n * n - 1) !== null && adj(s[0], s[1])).map(s => [s[0], s[1]]);
      }
      return out;
    }
    if (k === 'kakuro' || k === 'picross' || k === 'citation') {
      const w = int(p.w, 3, 40), h = int(p.h, 1, 40);
      if (!w || !h) return null;
      const re = { kakuro: /^[1-9#]+$/, picross: /^[01]+$/, citation: /^[A-Z ,.;:!?'-]+$/ }[k];
      if (!grid(p.rows, w, h, re)) return null;
      Object.assign(out, { w, h, rows: p.rows.slice() });
      if (k !== 'citation') out.given = grid(p.given, w, h, /^[01]+$/) ? p.given.slice() : Array(h).fill('0'.repeat(w));
      if (k === 'kakuro' && (p.rows[0] !== '#'.repeat(w) || p.rows.some(r => r[0] !== '#'))) return null;
      if (k === 'citation') { out.author = text(p.author, 60); out.givens = int(p.givens, 0, 8) ?? 3; }
      return out;
    }
    if (k === 'nombres') {
      const w = int(p.w, 3, 40), h = int(p.h, 3, 40);
      if (!w || !h || !grid(p.rows, w, h, /^[0-9#]+$/) || !Array.isArray(p.words) || p.words.length > 600) return null;
      const T = ['add', 'sub', 'mul', 'div', 'sq', 'cube', 'sqp', 'mix', 'mix2', 'dbl', 'half'];
      const inR = (r, c) => int(r, 0, h - 1) !== null && int(c, 0, w - 1) !== null;
      const words = [];
      for (const x of p.words) {
        if (!isObj(x) || !inR(x.r, x.c) || !inR(x.sr, x.sc) || !['H', 'V'].includes(x.dir) || typeof x.word !== 'string' || !/^[0-9]{2,15}$/.test(x.word) || x.word.length !== x.len) return null;
        const [dr, dc] = x.dir === 'H' ? [0, 1] : [1, 0];
        for (let i = 0; i < x.len; i++) if (p.rows[x.r + i * dr]?.[x.c + i * dc] !== x.word[i]) return null;
        const f = isObj(x.clue) ? x.clue : {};
        const num = v => (Number.isSafeInteger(v) && Math.abs(v) < 1e12 ? v : 0);
        words.push({ r: x.r, c: x.c, dir: x.dir, len: x.len, word: x.word, sr: x.sr, sc: x.sc, arrow: x.dir === 'H' ? 'right' : 'down', src: 'num', clue: { t: T.includes(f.t) ? f.t : 'add', a: num(f.a), b: num(f.b), c: num(f.c) } });
      }
      return Object.assign(out, { w, h, rows: p.rows.slice(), words, variant: p.variant === 'fleches' ? 'fleches' : 'croises' });
    }
    if (k === 'logigramme') {
      const m = int(p.m, 3, 6);
      if (!m || !Array.isArray(p.cats) || p.cats.length < 3 || p.cats.length > 4) return null;
      const cats = p.cats.map(c => (isObj(c) && Array.isArray(c.items) && c.items.length >= m ? {
        kind: ['person', 'place', 'thing', 'time'].includes(c.kind) ? c.kind : 'thing', name: text(c.name, 30),
        items: c.items.slice(0, m).map(it => ({ label: text(it?.label, 24) || '?', ph: text(it?.ph, 60) })),
      } : null));
      if (cats.some(c => !c)) return null;
      const K = cats.length;
      const perm = o => Array.isArray(o) && o.length === m && new Set(o).size === m && o.every(v => int(v, 0, m - 1) !== null);
      if (!Array.isArray(p.order) || p.order.length !== K || !p.order.every(perm)) return null;
      const ref = x => Array.isArray(x) && int(x[0], 0, K - 1) !== null && int(x[1], 0, m - 1) !== null;
      const clues = (Array.isArray(p.clues) ? p.clues : []).slice(0, 60).filter(c => isObj(c) && ['is', 'not', 'or', 'before', 'next'].includes(c.t) && ref(c.a) && ref(c.b) && (c.t !== 'or' || ref(c.c)))
        .map(c => ({ t: c.t, a: [c.a[0], c.a[1]], b: [c.b[0], c.b[1]], ...(c.t === 'or' ? { c: [c.c[0], c.c[1]] } : {}) }));
      return Object.assign(out, { m, cats, order: p.order.map(o => o.slice()), clues });
    }
    if (k === 'echelle') {
      if (!Array.isArray(p.ladders) || !p.ladders.length || p.ladders.length > 4) return null;
      const ladders = [];
      for (const l of p.ladders) {
        if (!isObj(l) || !Array.isArray(l.words) || l.words.length < 2 || l.words.length > 12) return null;
        const L = l.words[0]?.length;
        if (!l.words.every(w => typeof w === 'string' && /^[A-Z]{2,10}$/.test(w) && w.length === L)) return null;
        ladders.push({ words: l.words.slice(), clues: l.words.map((_, i) => text(l.clues?.[i], 160)) });
      }
      return Object.assign(out, { ladders });
    }
    return null;
  }

  return { KINDS, USES_PAGE, DEFAULTS, LEVELS, settings, prepare, generate, layoutHash, formula, clueText, sanitize };
})();
