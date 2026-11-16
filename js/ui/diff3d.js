// @ts-check
/* =========================================================================
   7 différences en 3D : les deux plateaux d'une page « differences »
   (MF.logicGames.differences.boards) sont rendus avec le moteur 3D du
   Murdoku (chargé à la demande), avec le petit décor de l'univers. Les
   différences visibles sont repérées en comparant les deux images (zones de
   pixels qui changent) : elles deviennent les cercles à trouver.

   Les images vivent en mémoire (une par grille, recalculées au rechargement
   de la page) ; sans WebGL, le jeu garde son plan 2D.
   ========================================================================= */
window.MF = window.MF || {};

MF.diff3d = (() => {
  const W = 1400, H = 1050;
  /** @type {Map<string, { img: any, promise: Promise<any> }>} */
  const cache = new Map();
  /** Appelé quand de nouvelles images sont prêtes (l'application redessine la grille). */
  let onReady = null;
  let queue = Promise.resolve();
  /** Dernier rendu : zones trouvées et changements voulus (diagnostic). */
  let last = null;

  const keyOf = page => MF.util.hash(JSON.stringify([page.n, page.seed, page.theme, page.level, page.kinds, page.rooms, page.room, page.objs, page.people, page.a, page.b, page.salt]));

  /** Images prêtes pour cette page : { a, b, w, h, spots: [[x, y, r]] } (fractions de la largeur), sinon null. */
  const ready = page => cache.get(keyOf(page))?.img || null;

  /** Lance le rendu 3D d'une page (une seule fois) ; résolu avec les images, ou null (pas de 3D). */
  function request(page) {
    const k = keyOf(page);
    const hit = cache.get(k);
    if (hit) return hit.promise;
    const entry = { img: null, promise: null };
    // Un rendu à la fois : chaque contexte WebGL coûte cher
    entry.promise = queue = queue.then(() => render(page)).then(img => {
      entry.img = img;
      if (img) onReady?.();
      return img;
    }, e => { console.warn(e); return null; });
    cache.set(k, entry);
    if (cache.size > 12) cache.delete(cache.keys().next().value);
    return entry.promise;
  }

  async function render(page) {
    if (typeof document === 'undefined' || document.hidden === undefined) return null;
    const m = await MF.murdokuView.load3d();
    if (!m) return null;
    const [A, B] = MF.logicGames.differences.boards(page);
    const th = MF.murdokuThemes.resolve(page.theme, 'fr');
    const opts = { look: th.look, mood: th.mood, camera: 'iso', labels: false, roomLabels: false, names: false, badges: false, clutter: page.level === 'easy' ? 'lots' : 'full', interactive: false };
    // Une seule vue pour les deux images : même ombrage, même grain (sinon le bruit passerait pour des différences)
    const div = document.createElement('div');
    div.style.cssText = `position:fixed;left:-20000px;top:0;width:${W}px;height:${H}px;pointer-events:none;`;
    document.body.appendChild(div);
    const view = await m.createView(div, opts);
    let ca, cb, box;
    try {
      view.setPuzzle(A, { show: 'solution' });
      box = crop(await view.toCanvas({ width: W, height: H }));
      view.setPuzzle(B, { show: 'solution' });
      cb = box.cut(await view.toCanvas({ width: W, height: H }));
      ca = box.cut(box.src);
    } finally {
      view.dispose();
      div.remove();
    }
    const spots = compare(ca, cb);
    const want = page.a.filter((v, i) => v !== page.b[i]).length + (page.salt?.length || 0);
    last = { spots: spots.length, want, crop: [ca.width, ca.height] };
    // Une ombre déplacée un peu plus loin compte aussi (elle se voit) ; au-delà, le rendu n'est pas fiable
    if (!spots.length || spots.length > want * 2 + 3) return null;
    return { a: ca.toDataURL('image/jpeg', 0.86), b: cb.toDataURL('image/jpeg', 0.86), w: ca.width, h: ca.height, spots };
  }

  /**
   * Cadre du plateau : blocs de pixels (moyennés : le grain de l'impression ne compte pas) qui diffèrent du fond
   * de leur rangée, pris sur ses bords gauche et droit (dégradés et vignettage suivis).
   */
  function crop(src) {
    const w = src.width, h = src.height;
    const d = src.getContext('2d', { willReadFrequently: true }).getImageData(0, 0, w, h).data;
    const S = Math.max(6, Math.round(w / 100)), bw = Math.floor(w / S), bh = Math.floor(h / S);
    const mean = (bx, by) => {
      const m = [0, 0, 0];
      let k = 0;
      for (let y = by * S; y < by * S + S; y += 2) for (let x = bx * S; x < bx * S + S; x += 2) { const i = (y * w + x) * 4; m[0] += d[i]; m[1] += d[i + 1]; m[2] += d[i + 2]; k++; }
      return m.map(v => v / k);
    };
    let x0 = w, y0 = h, x1 = 0, y1 = 0;
    for (let by = 0; by < bh; by++) {
      const L = mean(2, by), R = mean(bw - 3, by);
      let hits = 0, lo = bw, hi = -1;
      for (let bx = 3; bx < bw - 3; bx++) {
        const t = (bx - 2) / (bw - 5), m = mean(bx, by);
        const diff = [0, 1, 2].reduce((sum, j) => sum + Math.abs(m[j] - (L[j] * (1 - t) + R[j] * t)), 0);
        if (diff > 45) { hits++; lo = Math.min(lo, bx); hi = Math.max(hi, bx); }
      }
      if (hits < 3) continue;
      y0 = Math.min(y0, by * S); y1 = Math.max(y1, by * S + S);
      // Largeur : prise au milieu de l'image (le haut et le bas peuvent avoir un liseré ou un arrondi clair)
      if (by > bh * 0.2 && by < bh * 0.8) { x0 = Math.min(x0, lo * S); x1 = Math.max(x1, hi * S + S); }
    }
    const pad = Math.round(w * 0.02);
    if (x1 <= x0 || y1 <= y0) { x0 = 0; y0 = 0; x1 = w - 1; y1 = h - 1; }
    const rx = Math.max(0, x0 - pad), ry = Math.max(0, y0 - pad), rw = Math.min(w, x1 + pad) - rx, rh = Math.min(h, y1 + pad) - ry;
    const cut = c => {
      const out = document.createElement('canvas');
      out.width = rw; out.height = rh;
      out.getContext('2d').drawImage(c, rx, ry, rw, rh, 0, 0, rw, rh);
      return out;
    };
    return { src, cut, rect: [rx, ry, rw, rh] };
  }

  /**
   * Zones qui changent entre deux images : blocs de pixels assez différents, reliés entre eux,
   * les zones proches réunies. Renvoie des cercles [x, y, r] en fractions de la largeur.
   */
  function compare(ca, cb) {
    const w = Math.min(ca.width, cb.width), h = Math.min(ca.height, cb.height);
    const da = ca.getContext('2d', { willReadFrequently: true }).getImageData(0, 0, w, h).data;
    const db = cb.getContext('2d', { willReadFrequently: true }).getImageData(0, 0, w, h).data;
    const S = Math.max(4, Math.round(w / 120));
    const bw = Math.ceil(w / S), bh = Math.ceil(h / S);
    const on = new Uint8Array(bw * bh), level = new Float32Array(bw * bh);
    for (let by = 0; by < bh; by++) {
      for (let bx = 0; bx < bw; bx++) {
        let sum = 0, k = 0;
        for (let y = by * S; y < Math.min(h, by * S + S); y += 2) {
          for (let x = bx * S; x < Math.min(w, bx * S + S); x += 2) {
            const i = (y * w + x) * 4;
            sum += Math.abs(da[i] - db[i]) + Math.abs(da[i + 1] - db[i + 1]) + Math.abs(da[i + 2] - db[i + 2]);
            k++;
          }
        }
        level[by * bw + bx] = sum / Math.max(1, k);
        if (level[by * bw + bx] > 20) on[by * bw + bx] = 1;
      }
    }
    // Zones reliées (8 voisins), les poussières écartées
    const seen = new Uint8Array(bw * bh);
    let boxes = [];
    for (let s = 0; s < bw * bh; s++) {
      if (!on[s] || seen[s]) continue;
      const stack = [s];
      seen[s] = 1;
      let n = 0, peak = 0, x0 = bw, y0 = bh, x1 = 0, y1 = 0;
      while (stack.length) {
        const q = stack.pop();
        n++;
        peak = Math.max(peak, level[q]);
        const qx = q % bw, qy = Math.floor(q / bw);
        x0 = Math.min(x0, qx); x1 = Math.max(x1, qx); y0 = Math.min(y0, qy); y1 = Math.max(y1, qy);
        for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) {
          const nx = qx + dx, ny = qy + dy, nq = ny * bw + nx;
          if (nx >= 0 && ny >= 0 && nx < bw && ny < bh && on[nq] && !seen[nq]) { seen[nq] = 1; stack.push(nq); }
        }
      }
      // Zone nette (un objet), ou assez grande ; un léger halo d'ombre seul ne compte pas
      if (n >= 4 && (peak >= 45 || n >= 12)) boxes.push({ x0, y0, x1, y1 });
    }
    // Zones proches (ombre et objet d'un même changement) réunies
    const G = 5;
    const near = (p, q) => p.x0 - G <= q.x1 && q.x0 - G <= p.x1 && p.y0 - G <= q.y1 && q.y0 - G <= p.y1;
    for (let merged = true; merged;) {
      merged = false;
      for (let i = 0; i < boxes.length && !merged; i++) {
        for (let j = i + 1; j < boxes.length && !merged; j++) {
          if (!near(boxes[i], boxes[j])) continue;
          const p = boxes[i], q = boxes[j];
          const u = { x0: Math.min(p.x0, q.x0), y0: Math.min(p.y0, q.y0), x1: Math.max(p.x1, q.x1), y1: Math.max(p.y1, q.y1) };
          // Jamais plus grand qu'une case et demie environ : deux changements voisins restent deux zones
          if (Math.max(u.x1 - u.x0, u.y1 - u.y0) * S > w * 0.2) continue;
          boxes[i] = u;
          boxes = boxes.filter((_, k) => k !== j);
          merged = true;
        }
      }
    }
    return boxes.map(b => {
      const cx = ((b.x0 + b.x1 + 1) / 2) * S, cy = ((b.y0 + b.y1 + 1) / 2) * S;
      const r = Math.min(w * 0.12, Math.max(w * 0.035, (Math.hypot(b.x1 - b.x0 + 1, b.y1 - b.y0 + 1) * S) / 2));
      return [cx / w, cy / w, r / w].map(v => Math.round(v * 10000) / 10000);
    });
  }

  return { ready, request, compare, crop, get last() { return last; }, set onReady(fn) { onReady = fn; } };
})();
