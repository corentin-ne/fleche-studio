/* =========================================================================
   Diagnostic d'une grille pleine :
     - mots perso invalides, en double, sans définition ou à définition longue ;
     - mots perso qui n'ont pas trouvé de place ;
     - mots de remplissage dont la définition reste à écrire.
   ========================================================================= */
window.MF = window.MF || {};

MF.diagnostics = (() => {
  const LONG_CLUE = 60;

  function analyze(puzzle, layout) {
    const issues = [];
    const seen = new Set();
    const o = puzzle.options || {};

    for (const w of puzzle.words) {
      const norm = MF.util.normalize(w.text);
      if (norm.length < 2) {
        issues.push({ level: 'err', wid: w.id, title: `« ${w.text || '(vide)'} » est trop court`, detail: 'Un mot doit contenir au moins 2 lettres.' });
        continue;
      }
      if (seen.has(norm)) {
        issues.push({ level: 'warn', wid: w.id, title: `${norm} est en double`, detail: 'Seule la première occurrence est utilisée.' });
        continue;
      }
      seen.add(norm);
      if (o.size === 'fixed' && norm.length > Math.max(o.cols || 13, (o.rows || 17) - (+o.photoBand || 0)) - 1) {
        issues.push({ level: 'warn', wid: w.id, title: `${norm} est trop long pour la grille`, detail: `${norm.length} lettres : agrandis la grille pour qu'il puisse y entrer.` });
      }
      if (!w.clue.trim()) issues.push({ level: 'warn', wid: w.id, title: `${norm} n'a pas de définition`, detail: 'Sa case définition restera vide.' });
      else if (w.clue.length > LONG_CLUE) issues.push({ level: 'info', wid: w.id, title: `Définition longue pour ${norm}`, detail: `${w.clue.length} caractères : elle sera écrite en tout petit. Raccourcis-la si possible.` });
    }
    return issues.sort((a, b) => ({ err: 0, warn: 1, info: 2 })[a.level] - ({ err: 0, warn: 1, info: 2 })[b.level]);
  }

  /** Mots de remplissage de la grille, ceux sans définition en premier. */
  function fillers(puzzle, layout) {
    if (!layout?.words) return [];
    const seen = new Set();
    return layout.words
      .filter(w => w.src !== 'theme' && !seen.has(w.word) && seen.add(w.word))
      .map(w => {
        const own = (puzzle.fillerClues || {})[w.word];
        const ready = (MF.cluesFr || {})[w.word] || '';
        return { word: w.word, key: MF.gridModel.slotKey(w), clue: own ?? ready ?? '', own: own !== undefined, ready };
      })
      .sort((a, b) => (a.clue ? 1 : 0) - (b.clue ? 1 : 0) || a.word.localeCompare(b.word));
  }

  return { analyze, fillers };
})();
