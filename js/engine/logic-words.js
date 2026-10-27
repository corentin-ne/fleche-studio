// @ts-check
/* =========================================================================
   Jeux de lettres du moteur « logique » :
     - échelle de mots : passer d'un mot à un autre en changeant une lettre à
       chaque étape (mots du dictionnaire, chaque étape a sa définition) ;
     - citation codée : une phrase dont chaque lettre est remplacée par un
       nombre (même jeu que les mots codés, sur une citation ou un proverbe).
   ========================================================================= */
window.MF = window.MF || {};

MF.logicWords = (() => {
  const { shuffle, clamp } = MF.util;
  const pick = (list, rnd) => list[Math.floor(rnd() * list.length)];

  // Proverbes et citations du domaine public, proposés quand aucun texte n'est donné
  const QUOTES = {
    fr: [
      ['Petit à petit, l\'oiseau fait son nid.', 'Proverbe'], ['Il ne faut pas vendre la peau de l\'ours avant de l\'avoir tué.', 'Jean de La Fontaine'],
      ['Rien ne sert de courir, il faut partir à point.', 'Jean de La Fontaine'], ['La raison du plus fort est toujours la meilleure.', 'Jean de La Fontaine'],
      ['On a souvent besoin d\'un plus petit que soi.', 'Jean de La Fontaine'], ['Je pense, donc je suis.', 'René Descartes'],
      ['Le cœur a ses raisons que la raison ne connaît point.', 'Blaise Pascal'], ['Il faut cultiver notre jardin.', 'Voltaire'],
      ['L\'essentiel est invisible pour les yeux.', 'Antoine de Saint-Exupéry'], ['Qui vivra verra.', 'Proverbe'],
      ['Après la pluie, le beau temps.', 'Proverbe'], ['Les petits ruisseaux font les grandes rivières.', 'Proverbe'],
      ['Tout vient à point à qui sait attendre.', 'Proverbe'], ['Il n\'y a pas de fumée sans feu.', 'Proverbe'],
      ['L\'habit ne fait pas le moine.', 'Proverbe'], ['Chacun voit midi à sa porte.', 'Proverbe'],
      ['La nuit porte conseil.', 'Proverbe'], ['Qui sème le vent récolte la tempête.', 'Proverbe'],
      ['Impossible n\'est pas français.', 'Napoléon Bonaparte'], ['La vie est un sommeil, l\'amour en est le rêve.', 'Alfred de Musset'],
      ['Ce qui se conçoit bien s\'énonce clairement.', 'Nicolas Boileau'], ['Vingt fois sur le métier remettez votre ouvrage.', 'Nicolas Boileau'],
      ['À vaincre sans péril, on triomphe sans gloire.', 'Pierre Corneille'], ['Le temps est un grand maître.', 'Pierre Corneille'],
    ],
    en: [
      ['Actions speak louder than words.', 'Proverb'], ['Every cloud has a silver lining.', 'Proverb'],
      ['The early bird catches the worm.', 'Proverb'], ['Where there is a will, there is a way.', 'Proverb'],
      ['Better late than never.', 'Proverb'], ['Rome was not built in a day.', 'Proverb'],
      ['All that glitters is not gold.', 'William Shakespeare'], ['Brevity is the soul of wit.', 'William Shakespeare'],
      ['The course of true love never did run smooth.', 'William Shakespeare'], ['To be, or not to be, that is the question.', 'William Shakespeare'],
      ['Hope is the thing with feathers.', 'Emily Dickinson'], ['A thing of beauty is a joy for ever.', 'John Keats'],
      ['It is never too late to be what you might have been.', 'George Eliot'], ['Fortune favours the bold.', 'Proverb'],
      ['Knowledge is power.', 'Francis Bacon'], ['Not all those who wander are lost.', 'Proverb'],
      ['A journey of a thousand miles begins with a single step.', 'Lao Tzu'], ['Two heads are better than one.', 'Proverb'],
      ['Practice makes perfect.', 'Proverb'], ['Laughter is the best medicine.', 'Proverb'],
      ['Do not count your chickens before they hatch.', 'Proverb'], ['Curiosity killed the cat.', 'Proverb'],
      ['A picture is worth a thousand words.', 'Proverb'], ['The pen is mightier than the sword.', 'Edward Bulwer-Lytton'],
    ],
  };

  /* ---------------- Échelle de mots ---------------- */
  /** Graphe des mots de longueur L : deux mots sont voisins s'ils diffèrent d'une seule lettre. */
  function graph(dict, L) {
    const words = Object.keys(dict).filter(w => w.length === L);
    const buckets = new Map();
    const keys = w => Array.from({ length: L }, (_, i) => `${i}${w.slice(0, i)}_${w.slice(i + 1)}`);
    for (const w of words) for (const k of keys(w)) { if (!buckets.has(k)) buckets.set(k, []); buckets.get(k).push(w); }
    const next = w => [...new Set(keys(w).flatMap(k => buckets.get(k) || []))].filter(x => x !== w);
    return { words, next };
  }
  /** Parcours en largeur : distances et parents depuis `from` (jusqu'à `depth` étapes). */
  function bfs(G, from, depth) {
    const parent = new Map([[from, null]]);
    let front = [from];
    const layers = [front];
    for (let d = 0; d < depth && front.length; d++) {
      const nextFront = [];
      for (const w of front) for (const x of G.next(w)) if (!parent.has(x)) { parent.set(x, w); nextFront.push(x); }
      front = nextFront;
      layers.push(front);
    }
    return { parent, layers };
  }
  const pathTo = (parent, end) => { const out = []; for (let w = end; w; w = parent.get(w)) out.unshift(w); return out; };

  function echelle(opts, rnd, words) {
    const dict = MF.lexicon.get(opts.lang);
    const L = clamp(opts.size || 4, 3, 6);
    const steps = { easy: 3, medium: 4, hard: 5, expert: 6 }[opts.level] || 4;
    const count = clamp(opts.count || 2, 1, 4);
    const ladders = [];
    const used = new Set();
    // Tes mots, deux par deux (même longueur) : départ et arrivée d'une échelle
    const mine = words.map(w => w.norm).filter(w => w.length >= 3 && w.length <= 6);
    for (let i = 0; i + 1 < mine.length && ladders.length < count; i += 2) {
      const [a, b] = [mine[i], mine[i + 1]];
      if (a.length !== b.length || a === b) continue;
      const G = graph({ ...dict, [a]: '', [b]: '' }, a.length);
      const { parent } = bfs(G, a, 9);
      if (parent.has(b)) { const path = pathTo(parent, b); ladders.push(path); path.forEach(w => used.add(w)); }
    }
    const G = graph(dict, L);
    const starts = shuffle(G.words, rnd);
    for (const start of starts) {
      if (ladders.length >= count) break;
      if (used.has(start)) continue;
      const { parent, layers } = bfs(G, start, steps);
      const ends = (layers[steps] || []).filter(w => !used.has(w));
      if (!ends.length) continue;
      const path = pathTo(parent, pick(ends, rnd));
      if (path.some(w => used.has(w))) continue;
      ladders.push(path);
      path.forEach(w => used.add(w));
    }
    if (!ladders.length) throw new Error(MF.i18n.t('Aucune échelle trouvée : essaie une autre longueur de mot.'));
    return {
      kind: 'echelle',
      ladders: ladders.map(path => ({ words: path, clues: path.map(w => MF.util.cleanText(dict[w] || '', 160)) })),
    };
  }

  /* ---------------- Citation codée ---------------- */
  const PUNCT = /[,.;:!?'-]/;
  /** Texte de la citation en lettres de grille : majuscules sans accents, ponctuation simple gardée. */
  const clean = text => MF.util.stripAccents(text).toUpperCase().replace(/[’`´]/g, '\'').replace(/[^A-Z ,.;:!?'-]+/g, ' ').replace(/\s+/g, ' ').trim();

  /** Coupe le texte en lignes de `w` cases au plus (sans couper un mot si possible). */
  function wrap(text, w) {
    const lines = [];
    let cur = '';
    for (let word of text.split(' ')) {
      while (word.length > w) { if (cur) { lines.push(cur); cur = ''; } lines.push(word.slice(0, w)); word = word.slice(w); }
      if (!word) continue;
      if (!cur) cur = word;
      else if (cur.length + 1 + word.length <= w) cur += ` ${word}`;
      else { lines.push(cur); cur = word; }
    }
    if (cur) lines.push(cur);
    return lines;
  }

  function citation(opts, rnd) {
    const pool = QUOTES[opts.lang] || QUOTES.fr;
    const [text, author] = opts.text ? [opts.text, opts.author || ''] : pick(pool, rnd);
    let body = clean(text).slice(0, 220);
    if ((body.match(/[A-Z]/g) || []).length < 4) body = clean(pool[0][0]);
    const aspect = clamp(opts.aspect || 0.8, 0.5, 2);
    // Largeur : des lignes ni trop courtes ni trop longues, aux proportions de la page
    let w = clamp(Math.round(Math.sqrt(body.length * aspect * 1.6)), 8, 22);
    w = Math.max(w, ...body.split(' ').map(x => Math.min(x.length, 22)));
    const lines = wrap(body, w);
    const rows = lines.map(l => l.padEnd(w, ' '));
    const givens = { easy: 4, medium: 3, hard: 2, expert: 1 }[opts.level] ?? 3;
    return { kind: 'citation', w, h: rows.length, rows, author: MF.util.cleanText(author, 60), givens };
  }

  return { echelle, citation, QUOTES, clean, PUNCT };
})();
