// @ts-check
/* =========================================================================
   Diagnostic d'une grille :
     - mots perso invalides, en double, sans définition ou à définition longue ;
     - mots de remplissage dont la définition reste à écrire.
   ========================================================================= */
window.MF = window.MF || {};

MF.diagnostics = (() => {
  const LONG_CLUE = 60;
  const RANK = { err: 0, warn: 1, info: 2 };
  const { t } = MF.i18n;

  function analyze(puzzle) {
    const issues = [];
    const seen = new Set();
    const o = puzzle.options || {};
    const needsClues = MF.games.get(puzzle.game).clues;

    for (const w of puzzle.words) {
      const norm = MF.util.normalize(w.text);
      if (norm.length < 2) {
        issues.push({ level: 'err', wid: w.id, title: t('« {word} » est trop court', { word: w.text || t('(vide)') }), detail: t('Un mot doit contenir au moins 2 lettres.') });
        continue;
      }
      if (seen.has(norm)) {
        issues.push({ level: 'warn', wid: w.id, title: t('{word} est en double', { word: norm }), detail: t('Seule la première occurrence est utilisée.') });
        continue;
      }
      seen.add(norm);
      if (o.size === 'fixed' && norm.length > Math.max(o.cols || 13, (o.rows || 17) - (+o.photoBand || 0)) - (MF.games.get(puzzle.game).wordSearch ? 0 : 1)) {
        issues.push({ level: 'warn', wid: w.id, title: t('{word} est trop long pour la grille', { word: norm }), detail: t('{n} lettres : agrandis la grille pour qu\'il puisse y entrer.', { n: norm.length }) });
      }
      if (!needsClues) continue;
      if (!w.clue.trim()) issues.push({ level: 'warn', wid: w.id, title: t('{word} n\'a pas de définition', { word: norm }), detail: t('Sa définition restera vide.') });
      else if (w.clue.length > LONG_CLUE && puzzle.game === 'fleches') issues.push({ level: 'info', wid: w.id, title: t('Définition longue pour {word}', { word: norm }), detail: t('{n} caractères : elle sera écrite en tout petit. Raccourcis-la si possible.', { n: w.clue.length }) });
    }
    return issues.sort((a, b) => RANK[a.level] - RANK[b.level]);
  }

  /** Mots de remplissage d'une page, ceux sans définition en premier. */
  function fillers(puzzle, page) {
    if (!page?.words || page.engine === 'meles') return [];
    const seen = new Set();
    return page.words
      .filter(w => w.src !== 'theme' && !seen.has(w.word) && seen.add(w.word))
      .map(w => {
        const own = (puzzle.fillerClues || {})[w.word];
        const ready = MF.lexicon.get(puzzle.options?.lang)[w.word] || '';
        return { word: w.word, key: MF.gridModel.slotKey(w), clue: own ?? ready ?? '', own: own !== undefined, ready };
      })
      .sort((a, b) => (a.clue ? 1 : 0) - (b.clue ? 1 : 0) || a.word.localeCompare(b.word));
  }

  /** Définitions encore à écrire : mots de remplissage, plus les mots perso si `words`. */
  function missing(puzzle, fillerList, { words = true } = {}) {
    if (!MF.games.get(puzzle.game).clues) return 0;
    return fillerList.filter(f => !f.clue).length + (words ? puzzle.words.filter(w => !w.clue.trim()).length : 0);
  }

  return { analyze, fillers, missing };
})();
