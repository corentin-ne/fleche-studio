// @ts-check
/* =========================================================================
   Zoom à deux doigts sur la grille (écrans tactiles). Pendant le geste,
   l'affiche est simplement agrandie en CSS (fluide) ; au relâcher, la
   nouvelle taille de case est validée et le point pincé reste sous les doigts.
   ========================================================================= */
window.MF = window.MF || {};

MF.pinchZoom = (() => {
  const dist = (a, b) => Math.hypot(a.clientX - b.clientX, a.clientY - b.clientY);
  const mid = (a, b) => ({ x: (a.clientX + b.clientX) / 2, y: (a.clientY + b.clientY) / 2 });

  /**
   * @param box       conteneur défilant de la grille
   * @param {any} o  options :
   *   o.cell()  taille de case actuelle (px)
   *   o.commit(cell) applique la nouvelle taille (re-rendu synchrone de la grille)
   *   o.min/max bornes de la taille de case
   */
  function attach(box, { cell, commit, min = 10, max = 160 }) {
    let g = null; // geste en cours

    box.addEventListener('touchstart', e => {
      const sheet = box.querySelector('.sheet');
      if (e.touches.length !== 2 || !sheet) return;
      const [a, b] = e.touches;
      const rect = sheet.getBoundingClientRect();
      const m = mid(a, b);
      g = { sheet, d0: dist(a, b), base: cell(), ratio: 1, fx: (m.x - rect.left) / rect.width, fy: (m.y - rect.top) / rect.height, m };
      sheet.style.transformOrigin = `${g.fx * 100}% ${g.fy * 100}%`;
      sheet.style.willChange = 'transform';
    }, { passive: true });

    box.addEventListener('touchmove', e => {
      if (!g || e.touches.length !== 2) return;
      e.preventDefault(); // pas de zoom de page ni de défilement pendant le pincement
      const [a, b] = e.touches;
      const target = Math.min(max, Math.max(min, g.base * (dist(a, b) / g.d0)));
      g.ratio = target / g.base;
      g.m = mid(a, b);
      g.sheet.style.transform = `scale(${g.ratio})`;
    }, { passive: false });

    const end = e => {
      if (!g || e.touches.length >= 2) return;
      const { sheet, ratio, base, fx, fy, m } = g;
      g = null;
      sheet.style.transform = sheet.style.transformOrigin = sheet.style.willChange = '';
      if (Math.abs(ratio - 1) < 0.03) return;
      commit(Math.round(base * ratio));
      // Garde sous les doigts le point pincé
      const next = box.querySelector('.sheet');
      if (!next) return;
      const r = next.getBoundingClientRect();
      box.scrollLeft += r.left + fx * r.width - m.x;
      box.scrollTop += r.top + fy * r.height - m.y;
    };
    box.addEventListener('touchend', end);
    box.addEventListener('touchcancel', end);
  }

  return { attach };
})();
