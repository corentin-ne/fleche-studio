// @ts-check
/* =========================================================================
   Composition de l'affiche : fond, titre, grille, listes (croisés, mêlés,
   codés), stickers. Produit une scène = { W, H, ops, grid } que MF.renderers
   dessine à l'identique en SVG (écran / export) et en PNG.

   Coordonnées en unités case (1 case = 100). Les stickers sont positionnés
   en fractions de l'affiche, ils suivent donc ses changements de taille.
   ========================================================================= */
window.MF = window.MF || {};

MF.scene = (() => {
  const U = 100;
  const GAP = 56;              // espace entre titre, grille et listes
  const { font, weightFor } = MF.design;

  /* ---------------- Cases ---------------- */
  function cellOps(model, puzzle, ctx) {
    const { d, C, m, ox, oy, opts } = ctx;
    const shaped = model.shape && model.shape !== 'rect';
    const ops = [], top = [];
    const X = c => ox + c * U, Y = r => oy + r * U;
    const interactive = !opts.forExport;
    const inBand = r => !shaped && r < model.top;
    const tile = (r, c, fill, extra = {}) => (m.gap > 0
      ? { op: 'rect', x: X(c) + m.inset, y: Y(r) + m.inset, w: m.inner, h: m.inner, r: m.radius, fill, ...extra }
      : { op: 'rect', x: X(c), y: Y(r), w: U, h: U, fill, ...extra });

    model.cells.forEach((row, r) => row.forEach((cell, c) => {
      const x = X(c), y = Y(r);
      if (cell.type === 'out') return;
      if (cell.type === 'void') {
        if (inBand(r)) return; // bande libre : couleur du cadre (déjà peinte) ou fond de l'affiche
        if (d.voids === 'frame' && shaped) ops.push({ op: 'rect', x, y, w: U, h: U, fill: C.frame });
        else if (d.voids === 'light') ops.push(tile(r, c, C.void));
        else if (d.voids === 'hatch') { ops.push(tile(r, c, C.letter)); ops.push(tile(r, c, { type: 'hatch', color: C.line })); }
        // Forme + cases transparentes : silhouette légère pour que la forme reste lisible
        else if (d.voids === 'transparent' && shaped) ops.push(tile(r, c, C.letter, { opacity: 0.35 }));
        if (interactive && opts.photoMarks) {
          top.push({ op: 'group', opacity: 0.55, cls: 'photo-cell', children: [
            { op: 'rect', x: x + 14, y: y + 14, w: U - 28, h: U - 28, r: 10, fill: 'none', stroke: '#ffffff', sw: 2.5, dash: '6 5' },
            { op: 'path', d: `M${x + 30} ${y + 66}l13-15 9 10 7-7 11 12Z`, fill: '#ffffff' },
            { op: 'circle', cx: x + 62, cy: y + 38, r: 5, fill: '#ffffff' },
          ] });
        }
        return;
      }
      if (cell.type === 'block') { ops.push(tile(r, c, C.frame, m.gap > 0 && d.cell.shadow ? { shadow: true } : {})); return; }

      if (m.gap === 0 && m.line > 0) ops.push({ op: 'rect', x, y, w: U, h: U, fill: C.line });
      const fill = cell.type === 'clue' ? C.clue : C.letter;
      const meta = interactive ? { cls: `cell ${cell.type}`, data: { r, c } } : {};
      const shadow = m.gap > 0 && d.cell.shadow;
      if (cell.type === 'letter' && d.cell.letterShape === 'circle') ops.push({ op: 'circle', cx: x + U / 2, cy: y + U / 2, r: m.inner / 2, fill, shadow, ...meta });
      else ops.push({ op: 'rect', x: x + m.inset, y: y + m.inset, w: m.inner, h: m.inner, r: m.radius, fill, shadow, ...meta });
    }));
    return { base: ops, marks: top };
  }

  function contentOps(model, puzzle, ctx) {
    const { d, C, m, ox, oy, opts } = ctx;
    const ops = [];
    const X = c => ox + c * U, Y = r => oy + r * U;
    const letterText = (x, y, ch, fill, size = U * 0.56, dy = 0.69) => ({
      op: 'text', x: x + U / 2, y: y + U * dy, text: ch, size, font: m.letterFont, weight: m.letterWeight, fill, anchor: 'middle', cls: opts.forExport ? undefined : 'sol',
    });
    const arrowW = 3.2 * d.arrows.size;

    // Mots mêlés : capsules autour des mots trouvés (solution)
    if (model.game === 'meles' && opts.letters) {
      for (const s of model.slots.values()) {
        const [r0, c0] = s.cells[0], [r1, c1] = s.cells[s.cells.length - 1];
        const x0 = X(c0) + U / 2, y0 = Y(r0) + U / 2, x1 = X(c1) + U / 2, y1 = Y(r1) + U / 2;
        const len = Math.hypot(x1 - x0, y1 - y0) + U * 0.8;
        ops.push({ op: 'group', tx: (x0 + x1) / 2, ty: (y0 + y1) / 2, rot: (Math.atan2(y1 - y0, x1 - x0) * 180) / Math.PI, children: [
          { op: 'rect', x: -len / 2, y: -U * 0.36, w: len, h: U * 0.72, r: U * 0.36, fill: C.arrow, opacity: 0.16 },
          { op: 'rect', x: -len / 2, y: -U * 0.36, w: len, h: U * 0.72, r: U * 0.36, fill: 'none', stroke: C.arrow, sw: 5 },
        ] });
      }
    }

    model.cells.forEach((row, r) => row.forEach((cell, c) => {
      const x = X(c), y = Y(r);
      if (cell.type === 'clue') {
        if (cell.split) {
          const a = m.inset, b = U - m.inset, mid = U / 2;
          const sw = Math.max(1.6, (m.line || 2.5) * 0.7);
          ops.push(cell.split === 'v'
            ? { op: 'line', x1: x + mid, y1: y + a, x2: x + mid, y2: y + b, stroke: C.line, sw }
            : { op: 'line', x1: x + a, y1: y + mid, x2: x + b, y2: y + mid, stroke: C.line, sw });
        }
        for (const cl of cell.clues) {
          const { size: fs, lines } = cl.fit;
          const blockH = lines.length * fs * m.lineH;
          const t = y + cl.box.y + (cl.box.h - blockH) / 2;
          lines.forEach((text, k) => ops.push({
            op: 'text', x: x + cl.box.x + cl.box.w / 2, y: t + k * fs * m.lineH + (fs * m.lineH - fs) / 2 + fs * 0.8,
            text, size: fs, font: m.clueFont, weight: m.clueWeight, fill: C.clueInk, anchor: 'middle',
          }));
          if (cl.missing && !opts.forExport) {
            const narrow = cl.box.w < U / 2;
            const cx = x + cl.box.x + cl.box.w / 2, cy = y + cl.box.y + cl.box.h / 2;
            const bw = cl.box.w - 10, bh = narrow ? 44 : 26;
            // Case étroite : le libellé passe sur deux lignes (premier mot, puis le reste)
            const todo = MF.i18n.t('à définir'), cut = todo.indexOf(' ');
            const label = narrow && cut > 0
              ? [{ op: 'text', x: cx, y: cy - 3, text: todo.slice(0, cut), size: 11, font: m.clueFont, weight: 700, fill: C.arrow, anchor: 'middle' }, { op: 'text', x: cx, y: cy + 11, text: todo.slice(cut + 1), size: 11, font: m.clueFont, weight: 700, fill: C.arrow, anchor: 'middle' }]
              : [{ op: 'text', x: cx, y: cy + 5, text: todo, size: 13, font: m.clueFont, weight: 700, fill: C.arrow, anchor: 'middle' }];
            ops.push({ op: 'group', cls: 'missing', data: { key: cl.wid }, children: [{ op: 'rect', x: cx - bw / 2, y: cy - bh / 2, w: bw, h: bh, r: 13, fill: '#ffffff', stroke: C.arrow, sw: 2, dash: '5 4' }, ...label] });
          }
        }
        return;
      }
      if (cell.type !== 'letter') return;

      if (model.game === 'meles') { ops.push({ ...letterText(x, y, cell.ch, C.ink, U * 0.52, 0.68), cls: undefined }); return; }
      if (model.game === 'croises' || model.game === 'codes') {
        const label = model.game === 'codes' ? cell.code : cell.num;
        if (label) ops.push({ op: 'text', x: x + m.inset + 7, y: y + m.inset + 23, text: String(label), size: model.game === 'codes' ? 22 : 21, font: m.letterFont, weight: 700, fill: C.ink, opacity: 0.8 });
        const given = model.game === 'codes' && model.givens?.has(cell.ch);
        if (opts.letters || given) ops.push(letterText(x, y, cell.ch, given && !opts.letters ? C.ink : C.solution, U * 0.5, 0.76));
        return;
      }
      if (opts.letters) ops.push(letterText(x, y, cell.ch, C.solution));
      for (const a of cell.arrows) {
        const g = MF.gridModel.arrowShape(a.arrow, a.at, d.arrows.style, d.arrows.size);
        const dx = a.arrow === 'right' || a.arrow === 'rightDown' ? m.inset - 1.5 : 0;
        const dy = a.arrow === 'down' || a.arrow === 'downRight' ? m.inset - 1.5 : 0;
        const mv = list => list.map(([p, q]) => [x + dx + p, y + dy + q]);
        if (g.line) ops.push({ op: 'polyline', pts: mv(g.line), stroke: C.arrow, sw: arrowW, join: 'round', cap: 'round' });
        if (g.line2) ops.push({ op: 'polyline', pts: mv(g.line2), stroke: C.arrow, sw: arrowW, join: 'round', cap: 'round' });
        if (g.poly) ops.push({ op: 'poly', pts: mv(g.poly), fill: C.arrow });
        if (g.dot) ops.push({ op: 'circle', cx: x + dx + g.dot[0], cy: y + dy + g.dot[1], r: g.dot[2], fill: C.arrow });
      }
    }));
    return ops;
  }

  /** Bande libre d'une grille rectangulaire : repère « zone photo » (écran). */
  function bandMark(model, ox, oy) {
    const x = ox + 20, y = oy + 20, bw = model.cols * U - 40, bh = model.band * U - 40;
    const cx = x + bw / 2, cy = y + bh / 2;
    return { op: 'group', opacity: 0.6, cls: 'photo-band', children: [
      { op: 'rect', x, y, w: bw, h: bh, r: 24, fill: 'none', stroke: '#ffffff', sw: 4, dash: '14 10' },
      { op: 'path', d: `M${cx - 60} ${cy + 20}l35-40 24 27 18-18 43 31Z`, fill: '#ffffff' },
      { op: 'circle', cx: cx + 30, cy: cy - 30, r: 12, fill: '#ffffff' },
      { op: 'text', x: cx, y: cy + 70, text: MF.i18n.t('Zone libre · {cols} × {rows} cases', { cols: model.cols, rows: model.band }), size: 34, font: MF.design.font('inter').css, weight: 700, fill: '#ffffff', anchor: 'middle' },
    ] };
  }

  function gridBlock(model, puzzle, d, C, m, opts) {
    const shaped = model.shape && model.shape !== 'rect';
    const fw = shaped ? 0 : d.frame.width;
    const w = model.cols * U + fw * 2, h = model.rows * U + fw * 2;
    return {
      w, h, fw,
      draw(gx, gy) {
        const ox = gx + fw, oy = gy + fw;
        const ops = [];
        if (!shaped) {
          if (d.voids === 'frame') ops.push({ op: 'rect', x: gx, y: gy, w, h, r: d.frame.radius, fill: C.frame });
          else if (fw > 0) ops.push({ op: 'rect', x: gx + fw / 2, y: gy + fw / 2, w: w - fw, h: h - fw, r: Math.max(0, d.frame.radius - fw / 2), fill: 'none', stroke: C.frame, sw: fw });
        }
        const ctx = { d, C, m, ox, oy, opts };
        const { base, marks } = cellOps(model, puzzle, ctx);
        ops.push(...base, ...contentOps(model, puzzle, ctx), ...marks);
        if (!opts.forExport && opts.photoMarks && model.band) ops.push(bandMark(model, ox, oy));
        return { ops, ox, oy };
      },
    };
  }

  /* ---------------- Listes sous la grille ---------------- */
  function textLines(lines, x, y, size, family, weight, fill, lh, anchor = 'start') {
    return lines.map((text, i) => ({ op: 'text', x, y: y + size * 0.85 + i * size * lh, text, size, font: family, weight, fill, anchor }));
  }

  function asideBlock(model, puzzle, d, C, width) {
    const fam = font(d.lists.font).css;
    const fs = d.lists.size;
    const lh = 1.3;
    const wN = weightFor(d.lists.font, 500), wB = weightFor(d.lists.font, 800);

    if (model.game === 'croises' && (model.across?.length || model.down?.length)) {
      const twoCols = width >= 900;
      const colGap = 60;
      const colW = twoCols ? (width - colGap) / 2 : width;
      const column = (title, list) => {
        const items = [];
        let h = fs * 1.2 * lh;
        for (const e of list) {
          const lines = MF.text.wrap(`${e.num}. ${e.text || '…'}`, fs, colW, fam, wN) || [''];
          items.push({ lines, y: h });
          h += lines.length * fs * lh + fs * 0.25;
        }
        return { title, items, h };
      };
      const cols = [column(MF.i18n.t('Horizontalement'), model.across), column(MF.i18n.t('Verticalement'), model.down)];
      const h = twoCols ? Math.max(...cols.map(c => c.h)) : cols[0].h + fs + cols[1].h;
      return {
        h,
        draw(x, y) {
          const ops = [];
          let cy = y;
          cols.forEach((col, i) => {
            const cx = twoCols ? x + i * (colW + colGap) : x;
            const y0 = twoCols ? y : cy;
            ops.push(...textLines([col.title], cx, y0, fs * 1.2, fam, wB, C.list, lh));
            col.items.forEach(it => ops.push(...textLines(it.lines, cx, y0 + it.y, fs, fam, wN, C.list, lh)));
            cy = y0 + col.h + fs;
          });
          return ops;
        },
      };
    }

    if (model.game === 'meles' && model.words?.length) {
      const size = fs * 1.05, gap = size * 1.4;
      const rows = [];
      let cur = [], curW = 0;
      for (const { label, key } of model.words) {
        const l = label.toUpperCase();
        const lw = MF.text.measure(l, size, fam, wB);
        if (cur.length && curW + gap + lw > width) { rows.push({ items: cur, w: curW }); cur = []; curW = 0; }
        curW += (cur.length ? gap : 0) + lw;
        cur.push({ l, lw, key });
      }
      if (cur.length) rows.push({ items: cur, w: curW });
      return {
        h: rows.length * size * 1.55,
        draw(x, y) {
          const ops = [];
          rows.forEach((row, i) => {
            let cx = x + (width - row.w) / 2;
            for (const it of row.items) {
              ops.push({ op: 'text', x: cx, y: y + size * 0.9 + i * size * 1.55, text: it.l, size, font: fam, weight: wB, fill: C.list, ls: 2, cls: 'ws-word', data: { key: it.key } });
              cx += it.lw + gap;
            }
          });
          return ops;
        },
      };
    }

    if (model.game === 'codes' && model.codes) {
      const per = 13, bw = width / per, bh = bw * 1.3;
      const inv = Object.fromEntries(Object.entries(model.codes).map(([l, n]) => [n, l]));
      return {
        h: bh * 2 + 12,
        draw(x, y, opts) {
          const ops = [];
          for (let n = 1; n <= 26; n++) {
            const i = n - 1, bx = x + (i % per) * bw, by = y + Math.floor(i / per) * (bh + 12);
            const l = inv[n];
            ops.push({ op: 'rect', x: bx + 3, y: by, w: bw - 6, h: bh, r: Math.min(12, d.cell.radius), fill: C.letter, stroke: C.line, sw: 2.5 });
            ops.push({ op: 'text', x: bx + bw / 2, y: by + bh - 12, text: String(n), size: Math.min(26, bw * 0.3), font: fam, weight: wB, fill: C.ink, anchor: 'middle', opacity: 0.75 });
            if (opts.letters || model.givens.has(l)) ops.push({ op: 'text', x: bx + bw / 2, y: by + bh * 0.52, text: l, size: bw * 0.46, font: font(d.font.letter).css, weight: 700, fill: model.givens.has(l) ? C.ink : C.solution, anchor: 'middle' });
          }
          return ops;
        },
      };
    }
    return null;
  }

  /* ---------------- Titre ---------------- */
  function titleBlock(d, C, width) {
    const t = d.title;
    if (!t.show || !(t.text || t.subtitle)) return null;
    const fam = font(t.font).css, wt = weightFor(t.font, 700);
    const ts = t.size, ss = ts * 0.42;
    const lines = t.text ? MF.text.wrap(t.text, ts, width, fam, wt) || [t.text] : [];
    const subs = t.subtitle ? MF.text.wrap(t.subtitle, ss, width, fam, weightFor(t.font, 500)) || [t.subtitle] : [];
    const h = lines.length * ts * 1.1 + (subs.length ? (lines.length ? ss * 0.6 : 0) + subs.length * ss * 1.3 : 0);
    return {
      h,
      draw(x, y) {
        const anchor = t.align === 'left' ? 'start' : t.align === 'right' ? 'end' : 'middle';
        const ax = t.align === 'left' ? x : t.align === 'right' ? x + width : x + width / 2;
        const ops = textLines(lines, ax, y - ts * 0.08, ts, fam, wt, C.title, 1.1, anchor);
        const sy = y + lines.length * ts * 1.1 + (lines.length ? ss * 0.6 : 0);
        ops.push(...textLines(subs, ax, sy, ss, fam, weightFor(t.font, 500), C.title, 1.3, anchor).map(o => ({ ...o, opacity: 0.85 })));
        return ops;
      },
    };
  }

  /* ---------------- Stickers ---------------- */
  function stickerOps(st, W, H, opts) {
    const w = st.w * W, h = w * st.ar;
    const children = [];
    if (!opts.forExport) children.push({ op: 'rect', x: -w / 2, y: -h / 2, w, h, fill: 'transparent' });
    if (st.kind === 'emoji') {
      children.push({ op: 'text', x: 0, y: h * 0.04, text: st.emoji, size: h * 0.86, emoji: true, anchor: 'middle', baseline: 'middle', fill: '#000000' });
    } else if (st.kind === 'shape') {
      const def = MF.stickers.SHAPES[st.shape];
      const col = c => (c === 'none' ? null : c === 'main' ? st.color : c === 'second' ? st.color2 : c);
      children.push({ op: 'group', tx: -w / 2, ty: -h / 2, sx: w / 100, sy: h / 100, children: def.paths.map(p => ({
        op: 'path', d: p.d, fill: col(p.fill), stroke: p.stroke ? col(p.stroke) : undefined, sw: p.sw, cap: p.cap, join: p.join, dash: p.dash, opacity: p.opacity,
      })) });
    } else if (st.kind === 'image') {
      const src = opts.assetUrl?.(st.imageId);
      const clip = st.mask !== 'none' ? st.mask : undefined;
      if (src) children.push({ op: 'image', x: -w / 2, y: -h / 2, w, h, src, fit: 'cover', clip });
      else children.push({ op: 'rect', x: -w / 2, y: -h / 2, w, h, r: 12, fill: '#e9e6f2', stroke: '#9b94b3', sw: 3, dash: '10 8' });
      if (st.border > 0) children.push({ op: 'path', d: MF.renderers.clipPath(clip || 'rect', -w / 2, -h / 2, w, h), fill: null, stroke: st.borderColor, sw: (st.border / 100) * w, join: 'round' });
    } else if (st.kind === 'text') {
      const lines = st.text.split('\n');
      const fs = (h * 100) / (lines.length * 118 + 20);
      const fam = font(st.font).css;
      if (st.bg !== 'none') children.push({ op: 'rect', x: -w / 2, y: -h / 2, w, h, r: fs * 0.3, fill: st.bg });
      const anchor = st.align === 'left' ? 'start' : st.align === 'right' ? 'end' : 'middle';
      const ax = st.align === 'left' ? -w / 2 + fs * 0.15 : st.align === 'right' ? w / 2 - fs * 0.15 : 0;
      lines.forEach((l, i) => children.push({ op: 'text', x: ax, y: -h / 2 + fs * (0.1 + 1.18 * i + 0.93), text: l, size: fs, font: fam, weight: weightFor(st.font, st.weight), fill: st.color, anchor }));
    }
    return { op: 'group', tx: st.x * W, ty: st.y * H, rot: st.rot, sx: st.flip ? -1 : 1, sy: 1, opacity: st.opacity, shadow: st.shadow, cls: 'sticker', data: { sticker: st.id }, children };
  }

  /* ---------------- Affiche complète ---------------- */
  /**
   * @param {any} [opts]  options :
   *   opts.letters     afficher la solution
   *   opts.forExport   pas d'éléments d'interface (repères, zones cliquables)
   *   opts.assetUrl    id d'image -> URL
   *   opts.stickers    false pour ne pas dessiner les stickers
   */
  function compose(model, puzzle, opts = {}) {
    const d = puzzle.design;
    const C = MF.design.resolve(d);
    const m = MF.design.metrics(d);
    const grid = gridBlock(model, puzzle, d, C, m, opts);
    const width = grid.w;
    const title = opts.title === false ? null : titleBlock(d, C, width);
    const aside = asideBlock(model, puzzle, d, C, width);
    const contentW = width;
    const contentH = (title ? title.h + GAP : 0) + grid.h + (aside ? GAP + aside.h : 0);

    // Taille de l'affiche : ajustée au contenu, ou format fixe avec la grille placée selon l'ancrage
    const pad = d.poster.padding;
    const R = MF.design.formatRatio(d.poster);
    let W, H, cx, cy;
    if (!R) {
      W = contentW + pad * 2; H = contentH + pad * 2; cx = pad; cy = pad;
    } else {
      const s = d.poster.scale;
      const needW = contentW / s, needH = contentH / s;
      W = needW + pad * 2; H = W / R;
      if (H - pad * 2 < needH) { H = needH + pad * 2; W = H * R; }
      const a = d.poster.anchor;
      const ax = a.includes('w') ? 0 : a.includes('e') ? 1 : 0.5;
      const ay = a.includes('n') ? 0 : a.includes('s') ? 1 : 0.5;
      cx = pad + (W - pad * 2 - contentW) * ax;
      cy = pad + (H - pad * 2 - contentH) * ay;
    }

    const ops = [];
    ops.push(...MF.backgrounds.ops(d.background, 0, 0, W, H, { assetUrl: opts.assetUrl, radius: d.poster.radius }).map(o => (o.op === 'image' ? { ...o, iw: MF.assets.size(d.background.imageId)?.w, ih: MF.assets.size(d.background.imageId)?.h } : o)));
    const stickers = opts.stickers === false ? [] : puzzle.stickers || [];
    stickers.filter(s => s.layer === 'below').forEach(s => ops.push(stickerOps(s, W, H, opts)));

    let y = cy;
    if (title) { ops.push(...title.draw(cx, y)); y += title.h + GAP; }
    const gy = y;
    const g = grid.draw(cx, gy);
    ops.push(...g.ops);
    y += grid.h;
    if (aside) ops.push(...aside.draw(cx, y + GAP, opts));

    stickers.filter(s => s.layer !== 'below').forEach(s => ops.push(stickerOps(s, W, H, opts)));
    return { W, H, ops, grid: { x: cx, y: gy, w: grid.w, h: grid.h, ox: g.ox, oy: g.oy, U } };
  }

  return { compose, stickerOps };
})();
