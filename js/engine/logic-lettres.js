// @ts-check
/* =========================================================================
   Jeux de lettres du registre MF.logicGames (voir logic-grids.js) :
     - mots en escalier : chaque marche ajoute une lettre au mot du dessus
       (les lettres sont mélangées), une définition par marche ;
     - acrostiche : des mots définis dont une lettre, lue de haut en bas,
       forme un mot caché ;
     - anagrammes : retrouver le mot dont les lettres sont mélangées.
   Les mots et définitions viennent du dictionnaire de la langue de la grille.
   ========================================================================= */
window.MF = window.MF || {};

(() => {
  const K = MF.logicKit;
  const { t } = MF.i18n;
  const defined = dict => Object.keys(dict).filter(w => dict[w] && /^[A-Z]+$/.test(w));
  const sortKey = w => [...w].sort().join('');
  const clueOf = (dict, w) => MF.util.cleanText(dict[w] || '', 160);
  /** Mots choisis par l'auteur (réglage texte), en lettres de grille. */
  const mine = text => String(text || '').split(/[\s,;/]+/).map(x => MF.util.normalize(x)).filter(x => x.length >= 2);
  /** @type {(kit: any, m: any, r: number, x0: number, word: string, key: string, given: boolean, extra: (i: number) => any) => void} */
  const wordRow = (kit, m, r, x0, word, key, given, extra) => {
    const cells = [...word].map((ch, i) => { m.cells[r][x0 + i] = kit.letter(ch, { given, words: { H: key }, ...extra(i) }); return [r, x0 + i]; });
    m.slots.set(key, { cells, dir: 'H', word });
  };

  /* ---------------- Mots en escalier ---------------- */
  (() => {
    function generate(o, rnd) {
      const dict = MF.lexicon.get(o.lang);
      const top = K.clamp(o.size || 7, 4, 10);
      const first = { easy: 3, medium: 3, hard: 3, expert: 4 }[o.level] || 3;
      const bySig = new Map();
      for (const w of defined(dict)) {
        if (w.length < first || w.length > top) continue;
        const k = sortKey(w);
        if (!bySig.has(k)) bySig.set(k, []);
        bySig.get(k).push(w);
      }
      const starts = K.shuffle([...bySig.values()].flat().filter(w => w.length === first), rnd);
      const ABC = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      const t0 = Date.now();
      let best = [];
      const rec = chain => {
        if (chain.length > best.length) best = chain.slice();
        if (chain[chain.length - 1].length === top || Date.now() - t0 > 2500) return chain[chain.length - 1].length === top;
        const w = chain[chain.length - 1];
        for (const ch of K.shuffle([...ABC], rnd)) {
          for (const next of K.shuffle(bySig.get(sortKey(w + ch)) || [], rnd)) {
            if (chain.includes(next)) continue;
            chain.push(next);
            if (rec(chain)) return true;
            chain.pop();
          }
        }
        return false;
      };
      for (const s of starts.slice(0, 400)) if (rec([s]) || Date.now() - t0 > 2500) break;
      if (best.length < 3) throw new Error(t('Aucun escalier trouvé : essaie une autre longueur de mot.'));
      return { kind: 'escalier', words: best, clues: best.map(w => clueOf(dict, w)), first: o.level === 'easy' || o.level === 'medium' };
    }
    function sanitize(p, out) {
      if (!Array.isArray(p.words) || p.words.length < 2 || p.words.length > 10) return null;
      if (!p.words.every((w, i) => typeof w === 'string' && /^[A-Z]{2,12}$/.test(w) && (!i || (w.length === p.words[i - 1].length + 1 && [...p.words[i - 1]].every(ch => w.split(ch).length - 1 >= p.words[i - 1].split(ch).length - 1))))) return null;
      return Object.assign(out, { words: p.words.slice(), clues: p.words.map((_, i) => K.text(p.clues?.[i], 160)), first: !!p.first });
    }
    function model(page, { kit }) {
      const { words, clues } = page;
      const W = words[words.length - 1].length;
      const m = kit.base('escalier', W, words.length, { shape: 'free' });
      m.cells = kit.grid(words.length, W, () => ({ type: 'out' }));
      words.forEach((w, r) => wordRow(kit, m, r, Math.floor((W - w.length) / 2), w, `S${r}`, r === 0 && page.first, () => ({})));
      m.lists = [{ title: t('Définitions'), items: words.map((w, r) => ({ num: r + 1, text: r === 0 && page.first ? `${w}` : clues[r] || '…' })) }];
      m.note = t('Chaque marche reprend les lettres du mot du dessus, mélangées, plus une nouvelle lettre.');
      return m;
    }
    MF.logicGames.escalier = { defaults: { size: 7 }, generate, sanitize, model, words: true };
  })();

  /* ---------------- Acrostiche ---------------- */
  (() => {
    function generate(o, rnd) {
      const dict = MF.lexicon.get(o.lang);
      const all = defined(dict).filter(w => w.length >= 4 && w.length <= 9);
      const len = { easy: 5, medium: 6, hard: 7, expert: 8 }[o.level] || 6;
      const wanted = mine(o.text).find(w => w.length >= 3 && w.length <= 12);
      const hidden = wanted || K.pick(all.filter(w => w.length === len), rnd) || 'MOT';
      const firstOnly = o.level === 'easy' || o.variant === 'first';
      const used = new Set([hidden]);
      const rows = [];
      for (const ch of hidden) {
        const pool = K.shuffle(all.filter(w => !used.has(w) && (firstOnly ? w[0] === ch : w.includes(ch))), rnd);
        const w = pool[0];
        if (!w) throw new Error(t('Aucun mot trouvé pour la lettre {l}.', { l: ch }));
        used.add(w);
        const spots = [...w].map((x, i) => (x === ch ? i : -1)).filter(i => i >= 0);
        rows.push({ w, at: firstOnly ? 0 : K.pick(spots, rnd) });
      }
      return { kind: 'acrostiche', word: hidden, rows, clues: rows.map(r => clueOf(dict, r.w)) };
    }
    function sanitize(p, out) {
      if (typeof p.word !== 'string' || !/^[A-Z]{2,14}$/.test(p.word) || !Array.isArray(p.rows) || p.rows.length !== p.word.length) return null;
      const rows = p.rows.map((r, i) => (K.isObj(r) && typeof r.w === 'string' && /^[A-Z]{2,14}$/.test(r.w) && K.int(r.at, 0, r.w.length - 1) !== null && r.w[r.at] === p.word[i] ? { w: r.w, at: r.at } : null));
      if (rows.some(r => !r)) return null;
      return Object.assign(out, { word: p.word, rows, clues: rows.map((_, i) => K.text(p.clues?.[i], 160)) });
    }
    function model(page, { kit }) {
      const { rows, clues } = page;
      const A = Math.max(...rows.map(r => r.at));
      const W = Math.max(...rows.map(r => A - r.at + r.w.length));
      const m = kit.base('acrostiche', W, rows.length, { shape: 'free' });
      m.cells = kit.grid(rows.length, W, () => ({ type: 'out' }));
      rows.forEach((r, i) => wordRow(kit, m, i, A - r.at, r.w, `A${i}`, false, k => (k === r.at ? { tint: true } : {})));
      m.lists = [{ title: t('Définitions'), items: rows.map((_, i) => ({ num: i + 1, text: clues[i] || '…' })) }];
      m.note = t('La colonne teintée, lue de haut en bas, donne le mot caché.');
      return m;
    }
    MF.logicGames.acrostiche = { defaults: { size: 6 }, generate, sanitize, model, words: true };
  })();

  /* ---------------- Anagrammes ---------------- */
  (() => {
    /** Lettres mélangées, jamais dans l'ordre du mot. */
    function scramble(w, rnd) {
      if (new Set(w).size < 2) return w;
      for (let k = 0; k < 20; k++) { const x = K.shuffle([...w], rnd).join(''); if (x !== w) return x; }
      return [...w].reverse().join('');
    }
    function generate(o, rnd) {
      const dict = MF.lexicon.get(o.lang);
      const count = K.clamp(o.size || 8, 4, 12);
      const [lo, hi] = { easy: [4, 5], medium: [5, 7], hard: [6, 8], expert: [7, 10] }[o.level] || [5, 7];
      const picked = mine(o.text).filter(w => w.length >= 3 && w.length <= 12).slice(0, 12);
      // Mots dont les lettres ne forment aucun autre mot du dictionnaire (une seule réponse)
      const sigs = new Map();
      for (const w of Object.keys(dict)) { const k = sortKey(w); sigs.set(k, (sigs.get(k) || 0) + 1); }
      const pool = K.shuffle(defined(dict).filter(w => w.length >= lo && w.length <= hi && !picked.includes(w) && sigs.get(sortKey(w)) === 1), rnd);
      const words = [...picked, ...pool].slice(0, Math.max(count, picked.length));
      if (words.length < 2) throw new Error(t('Pas assez de mots dans le dictionnaire.'));
      return { kind: 'anagrammes', items: words.map(w => ({ word: w, mix: scramble(w, rnd), clue: clueOf(dict, w) })) };
    }
    function sanitize(p, out) {
      if (!Array.isArray(p.items) || !p.items.length || p.items.length > 14) return null;
      const items = p.items.map(x => (K.isObj(x) && typeof x.word === 'string' && /^[A-Z]{2,14}$/.test(x.word) && typeof x.mix === 'string' && sortKey(x.mix) === sortKey(x.word) ? { word: x.word, mix: x.mix, clue: K.text(x.clue, 160) } : null));
      if (items.some(x => !x)) return null;
      return Object.assign(out, { items });
    }
    function model(page, { kit }) {
      const { items } = page;
      const L = Math.max(...items.map(x => x.word.length));
      const W = L * 2 + 1;
      const m = kit.base('anagrammes', W, items.length, { shape: 'free' });
      m.cells = kit.grid(items.length, W, () => ({ type: 'out' }));
      items.forEach((x, r) => {
        [...x.mix].forEach((ch, i) => { m.cells[r][i] = { type: 'hint', text: ch }; });
        wordRow(kit, m, r, L + 1, x.word, `N${r}`, false, () => ({}));
      });
      if (items.some(x => x.clue)) m.lists = [{ title: t('Coups de pouce'), items: items.map((x, i) => ({ num: i + 1, text: x.clue || '…' })) }];
      return m;
    }
    MF.logicGames.anagrammes = { defaults: { size: 8 }, generate, sanitize, model, words: true };
  })();
})();
