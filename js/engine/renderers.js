/* =========================================================================
   Rendus d'un modèle de grille : SVG (écran + export vectoriel) et Canvas (PNG).
   Style « DA Canva » : cadre épais et cases vides pleines dans la couleur,
   cases lettres blanches, cases définitions teintées.
   ========================================================================= */
window.MF = window.MF || {};

MF.renderers = (() => {
  const M = MF.gridModel;
  const { U, LINE, FRAME, FONT, CLUE_WEIGHT, LINE_H } = M;
  const INK = '#231f20';
  const PAPER = '#ffffff';

  /** Mélange une couleur hex avec du blanc (t = part de blanc). */
  function tint(hex, t) {
    const [r, g, b] = MF.util.hexToRgb(hex);
    const mix = v => Math.round(v + (255 - v) * t).toString(16).padStart(2, '0');
    return `#${mix(r)}${mix(g)}${mix(b)}`;
  }

  function palette(accent, style = {}) {
    return {
      frame: accent,
      line: accent,
      letter: PAPER,
      clue: style.clueFill === 'white' ? PAPER : tint(accent, 0.86),
      ink: INK,
      arrow: accent,
    };
  }

  const size = model => ({ w: model.cols * U + FRAME * 2, h: model.rows * U + FRAME * 2 });
  const cellX = c => FRAME + c * U;
  const cellY = r => FRAME + r * U;

  /** Position verticale (ligne de base) de chaque ligne d'une définition. */
  function clueLines(cell, x, y) {
    const n = cell.clues.length;
    const slotH = (U - LINE) / n;
    const out = [];
    cell.clues.forEach((cl, i) => {
      const { size: fs, lines } = cl.fit;
      const blockH = lines.length * fs * LINE_H;
      const top = y + LINE / 2 + i * slotH + (slotH - blockH) / 2;
      lines.forEach((text, k) => out.push({ text, fs, x: x + U / 2, y: top + k * fs * LINE_H + (fs * LINE_H - fs) / 2 + fs * 0.8 }));
    });
    return out;
  }

  /** Repère « zone photo » couvrant toute la bande du haut. */
  function bandMark(model) {
    const x = FRAME + 20, y = FRAME + 20, bw = model.cols * U - 40, bh = model.band * U - 40;
    const cx = x + bw / 2, cy = y + bh / 2;
    return `<g class="photo-band" opacity=".6"><rect x="${x}" y="${y}" width="${bw}" height="${bh}" rx="24" fill="none" stroke="#fff" stroke-width="4" stroke-dasharray="14 10"/>`
      + `<path d="M${cx - 60} ${cy + 20}l35-40 24 27 18-18 43 31Z" fill="#fff"/><circle cx="${cx + 30}" cy="${cy - 30}" r="12" fill="#fff"/>`
      + `<text x="${cx}" y="${cy + 70}" font-family='${FONT}' font-size="34" font-weight="700" fill="#fff" text-anchor="middle">Zone photo · ${model.cols} × ${model.band} cases</text></g>`;
  }

  /* ---------------- SVG ---------------- */
  const xml = s => String(s).replace(/[&<>"]/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[ch]));
  const pts = (list, ox, oy) => list.map(([a, b]) => `${(ox + a).toFixed(1)},${(oy + b).toFixed(1)}`).join(' ');

  /**
   * @param opts.letters   afficher la solution
   * @param opts.forExport SVG autonome (dimensions explicites, pas de classes d'interaction)
   */
  function svg(model, accent, opts = {}) {
    const { w, h } = size(model);
    const p = palette(accent, opts.style);
    const parts = [];
    const font = `font-family='${FONT}'`;
    parts.push(`<rect x="0" y="0" width="${w}" height="${h}" fill="${p.frame}"/>`);
    // Bande photo : un seul grand repère à l'écran (l'export la laisse pleine dans la couleur)
    if (!opts.forExport && opts.photoMarks && model.band) parts.push(bandMark(model));

    model.cells.forEach((row, r) => row.forEach((cell, c) => {
      if (cell.type === 'void') {
        // Case photo : pleine dans la couleur (export) ; repère discret à l'écran si demandé
        if (!opts.forExport && opts.photoMarks && r >= model.band) {
          const x = cellX(c), y = cellY(r);
          parts.push(`<g class="photo-cell" opacity=".55"><rect x="${x + 14}" y="${y + 14}" width="${U - 28}" height="${U - 28}" rx="10" fill="none" stroke="#fff" stroke-width="2.5" stroke-dasharray="6 5"/><path d="M${x + 30} ${y + 66}l13-15 9 10 7-7 11 12Z" fill="#fff"/><circle cx="${x + 62}" cy="${y + 38}" r="5" fill="#fff"/></g>`);
        }
        return;
      }
      const x = cellX(c), y = cellY(r);
      const attrs = opts.forExport ? '' : ` class="cell ${cell.type}" data-r="${r}" data-c="${c}"`;
      const fill = cell.type === 'clue' ? p.clue : p.letter;
      parts.push(`<rect${attrs} x="${x + LINE / 2}" y="${y + LINE / 2}" width="${U - LINE}" height="${U - LINE}" fill="${fill}"/>`);

      if (cell.type === 'clue') {
        if (cell.clues.length === 2) {
          const my = y + U / 2;
          parts.push(`<line x1="${x + LINE / 2}" y1="${my}" x2="${x + U - LINE / 2}" y2="${my}" stroke="${p.line}" stroke-width="${LINE * 0.7}"/>`);
        }
        for (const l of clueLines(cell, x, y)) {
          parts.push(`<text x="${l.x.toFixed(1)}" y="${l.y.toFixed(1)}" ${font} font-size="${l.fs}" font-weight="${CLUE_WEIGHT}" fill="${p.ink}" text-anchor="middle">${xml(l.text)}</text>`);
        }
        // Définition manquante : repère à l'écran seulement (l'export laisse la case vierge)
        if (!opts.forExport) {
          const slotH = (U - LINE) / cell.clues.length;
          cell.clues.forEach((cl, i) => {
            if (!cl.missing) return;
            const cy = y + LINE / 2 + i * slotH + slotH / 2;
            parts.push(`<g class="missing" data-key="${cl.wid}"><rect x="${x + 8}" y="${cy - 13}" width="${U - 16}" height="26" rx="13" fill="#fff" stroke="${p.arrow}" stroke-width="2" stroke-dasharray="5 4"/><text x="${x + U / 2}" y="${cy + 5}" ${font} font-size="13" font-weight="700" fill="${p.arrow}" text-anchor="middle">à définir</text></g>`);
          });
        }
      } else {
        if (opts.letters) {
          parts.push(`<text${opts.forExport ? '' : ' class="sol"'} x="${x + U / 2}" y="${y + U * 0.69}" ${font} font-size="${U * 0.56}" font-weight="700" fill="${p.ink}" text-anchor="middle">${cell.ch}</text>`);
        }
        for (const a of cell.arrows) {
          const g = M.arrowShape(a.arrow, a.y);
          if (g.line) parts.push(`<polyline points="${pts(g.line, x, y)}" fill="none" stroke="${p.arrow}" stroke-width="3.2" stroke-linejoin="round"/>`);
          if (g.poly) parts.push(`<polygon points="${pts(g.poly, x, y)}" fill="${p.arrow}"/>`);
        }
      }
    }));

    const dims = opts.forExport ? ` width="${w}" height="${h}"` : '';
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}"${dims} class="mf-svg">${parts.join('')}</svg>`;
  }

  /* ---------------- Canvas (PNG) ---------------- */
  function canvas(model, accent, opts = {}) {
    const { w, h } = size(model);
    const scale = opts.scale || 2;
    const cv = document.createElement('canvas');
    cv.width = Math.round(w * scale); cv.height = Math.round(h * scale);
    const g = cv.getContext('2d');
    g.scale(scale, scale);
    const p = palette(accent, opts.style);

    g.fillStyle = p.frame;
    g.fillRect(0, 0, w, h);
    g.textAlign = 'center';
    g.textBaseline = 'alphabetic';

    model.cells.forEach((row, r) => row.forEach((cell, c) => {
      if (cell.type === 'void') return;
      const x = cellX(c), y = cellY(r);
      g.fillStyle = cell.type === 'clue' ? p.clue : p.letter;
      g.fillRect(x + LINE / 2, y + LINE / 2, U - LINE, U - LINE);

      if (cell.type === 'clue') {
        if (cell.clues.length === 2) {
          g.strokeStyle = p.line; g.lineWidth = LINE * 0.7;
          g.beginPath(); g.moveTo(x + LINE / 2, y + U / 2); g.lineTo(x + U - LINE / 2, y + U / 2); g.stroke();
        }
        g.fillStyle = p.ink;
        for (const l of clueLines(cell, x, y)) {
          g.font = `${CLUE_WEIGHT} ${l.fs}px ${FONT}`;
          g.fillText(l.text, l.x, l.y);
        }
      } else {
        if (opts.letters) {
          g.fillStyle = p.ink;
          g.font = `700 ${U * 0.56}px ${FONT}`;
          g.fillText(cell.ch, x + U / 2, y + U * 0.69);
        }
        for (const a of cell.arrows) {
          const shape = M.arrowShape(a.arrow, a.y);
          g.fillStyle = p.arrow; g.strokeStyle = p.arrow; g.lineWidth = 3.2; g.lineJoin = 'round';
          if (shape.line) {
            g.beginPath();
            shape.line.forEach(([a1, b1], i) => (i ? g.lineTo(x + a1, y + b1) : g.moveTo(x + a1, y + b1)));
            g.stroke();
          }
          if (shape.poly) {
            g.beginPath();
            shape.poly.forEach(([a1, b1], i) => (i ? g.lineTo(x + a1, y + b1) : g.moveTo(x + a1, y + b1)));
            g.closePath(); g.fill();
          }
        }
      }
    }));
    return cv;
  }

  return { svg, canvas, size, tint };
})();
