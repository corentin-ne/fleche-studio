/* =========================================================================
   Rendus d'une scène (liste d'opérations de dessin, voir MF.scene) :
     - svg()    : écran et export vectoriel ;
     - canvas() : export PNG (asynchrone : images et motifs sont préchargés).
   Les deux interprètent exactement les mêmes opérations : ce qu'on voit est
   ce qu'on exporte.

   Opérations : rect, circle, line, poly, polyline, path, text, image, group.
   Peintures  : '#rrggbb' | { type: 'linear' | 'radial' | 'pattern' | 'hatch', … }
   ========================================================================= */
window.MF = window.MF || {};

MF.renderers = (() => {
  const xml = s => String(s).replace(/[&<>"']/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch]));
  const f = v => (Math.round(v * 10) / 10).toString();
  const pts = list => list.map(([a, b]) => `${f(a)},${f(b)}`).join(' ');
  const EMOJI_FONT = '"Segoe UI Emoji", "Apple Color Emoji", "Noto Color Emoji", "Twemoji Mozilla", sans-serif';

  /** Contour de découpe (masque d'image / sticker) dans une boîte. */
  function clipPath(kind, x, y, w, h) {
    if (kind === 'circle') {
      const rx = w / 2, ry = h / 2;
      return `M${f(x)} ${f(y + ry)}a${f(rx)} ${f(ry)} 0 1 0 ${f(w)} 0a${f(rx)} ${f(ry)} 0 1 0 ${f(-w)} 0Z`;
    }
    if (kind === 'rounded') {
      const r = Math.min(w, h) * 0.12;
      return `M${f(x + r)} ${f(y)}H${f(x + w - r)}Q${f(x + w)} ${f(y)} ${f(x + w)} ${f(y + r)}V${f(y + h - r)}Q${f(x + w)} ${f(y + h)} ${f(x + w - r)} ${f(y + h)}H${f(x + r)}Q${f(x)} ${f(y + h)} ${f(x)} ${f(y + h - r)}V${f(y + r)}Q${f(x)} ${f(y)} ${f(x + r)} ${f(y)}Z`;
    }
    if (kind === 'heart') {
      const X = u => f(x + u * w), Y = v => f(y + v * h);
      return `M${X(0.5)} ${Y(1)}C${X(-0.05)} ${Y(0.62)} ${X(-0.04)} ${Y(0.05)} ${X(0.27)} ${Y(0.04)}C${X(0.4)} ${Y(0.03)} ${X(0.47)} ${Y(0.12)} ${X(0.5)} ${Y(0.2)}C${X(0.53)} ${Y(0.12)} ${X(0.6)} ${Y(0.03)} ${X(0.73)} ${Y(0.04)}C${X(1.04)} ${Y(0.05)} ${X(1.05)} ${Y(0.62)} ${X(0.5)} ${Y(1)}Z`;
    }
    if (kind === 'star') {
      return 'M' + Array.from({ length: 10 }, (_, i) => {
        const a = -Math.PI / 2 + (i * Math.PI) / 5, r = i % 2 ? 0.45 : 1;
        return `${f(x + w / 2 + Math.cos(a) * r * w / 2)} ${f(y + h * 0.55 + Math.sin(a) * r * h * 0.55)}`;
      }).join('L') + 'Z';
    }
    return `M${f(x)} ${f(y)}H${f(x + w)}V${f(y + h)}H${f(x)}Z`;
  }

  /** Rectangle à coins arrondis en chemin (pour les découpes canvas). */
  const roundRect = (x, y, w, h, r) => {
    r = Math.min(r || 0, w / 2, h / 2);
    if (!r) return `M${f(x)} ${f(y)}H${f(x + w)}V${f(y + h)}H${f(x)}Z`;
    return `M${f(x + r)} ${f(y)}H${f(x + w - r)}A${f(r)} ${f(r)} 0 0 1 ${f(x + w)} ${f(y + r)}V${f(y + h - r)}A${f(r)} ${f(r)} 0 0 1 ${f(x + w - r)} ${f(y + h)}H${f(x + r)}A${f(r)} ${f(r)} 0 0 1 ${f(x)} ${f(y + h - r)}V${f(y + r)}A${f(r)} ${f(r)} 0 0 1 ${f(x + r)} ${f(y)}Z`;
  };

  /* =================================== SVG =================================== */
  function svg(scene, { forExport = false, cls = 'mf-svg' } = {}) {
    const defs = [];
    const ids = new Map();
    let n = 0;
    const uidFor = (key, make) => {
      if (ids.has(key)) return ids.get(key);
      const id = `p${++n}`;
      ids.set(key, id);
      defs.push(make(id));
      return id;
    };
    const stops = list => list.map(([o, c, a = 1]) => `<stop offset="${o}" stop-color="${c}"${a < 1 ? ` stop-opacity="${a}"` : ''}/>`).join('');

    function paint(p) {
      if (!p) return 'none';
      if (typeof p === 'string') return p;
      if (p.type === 'linear') return `url(#${uidFor(JSON.stringify(p), id => `<linearGradient id="${id}" gradientUnits="userSpaceOnUse" x1="${f(p.x1)}" y1="${f(p.y1)}" x2="${f(p.x2)}" y2="${f(p.y2)}">${stops(p.stops)}</linearGradient>`)})`;
      if (p.type === 'radial') return `url(#${uidFor(JSON.stringify(p), id => `<radialGradient id="${id}" gradientUnits="userSpaceOnUse" cx="${f(p.cx)}" cy="${f(p.cy)}" r="${f(p.r)}">${stops(p.stops)}</radialGradient>`)})`;
      if (p.type === 'pattern' || p.type === 'hatch') {
        const t = p.type === 'hatch' ? MF.backgrounds.hatch(p.color) : MF.backgrounds.tile(p.pattern, p.a, p.b);
        const s = p.scale || 1;
        return `url(#${uidFor(JSON.stringify(p), id => `<pattern id="${id}" patternUnits="userSpaceOnUse" width="${t.w}" height="${t.h}"${s !== 1 ? ` patternTransform="scale(${s})"` : ''}>${t.svg}</pattern>`)})`;
      }
      return 'none';
    }
    const shadowId = () => uidFor('shadow', id => `<filter id="${id}" x="-20%" y="-20%" width="140%" height="150%"><feDropShadow dx="0" dy="5" stdDeviation="6" flood-color="#000" flood-opacity=".25"/></filter>`);

    function attrs(o) {
      let a = '';
      if (!forExport) {
        if (o.cls) a += ` class="${o.cls}"`;
        if (o.data) for (const [k, v] of Object.entries(o.data)) a += ` data-${k}="${xml(v)}"`;
      }
      if (o.opacity !== undefined && o.opacity < 1) a += ` opacity="${f(o.opacity * 100) / 100}"`;
      if (o.shadow) a += ` filter="url(#${shadowId()})"`;
      return a;
    }
    const stroke = o => (o.stroke ? ` stroke="${paint(o.stroke)}" stroke-width="${f(o.sw || 1)}"${o.dash ? ` stroke-dasharray="${o.dash}"` : ''}${o.cap ? ` stroke-linecap="${o.cap}"` : ''}${o.join ? ` stroke-linejoin="${o.join}"` : ''}` : '');

    function draw(o) {
      switch (o.op) {
        case 'rect': {
          const r = o.r ? ` rx="${f(Math.min(o.r, o.w / 2, o.h / 2))}"` : '';
          return `<rect${attrs(o)} x="${f(o.x)}" y="${f(o.y)}" width="${f(o.w)}" height="${f(o.h)}"${r} fill="${paint(o.fill)}"${stroke(o)}/>`;
        }
        case 'circle': return `<circle${attrs(o)} cx="${f(o.cx)}" cy="${f(o.cy)}" r="${f(o.r)}" fill="${paint(o.fill)}"${stroke(o)}/>`;
        case 'line': return `<line${attrs(o)} x1="${f(o.x1)}" y1="${f(o.y1)}" x2="${f(o.x2)}" y2="${f(o.y2)}"${stroke(o)}/>`;
        case 'poly': return `<polygon${attrs(o)} points="${pts(o.pts)}" fill="${paint(o.fill)}"${stroke(o)}/>`;
        case 'polyline': return `<polyline${attrs(o)} points="${pts(o.pts)}" fill="none"${stroke(o)}/>`;
        case 'path': return `<path${attrs(o)} d="${o.d}" fill="${paint(o.fill)}"${stroke(o)}${o.evenodd ? ' fill-rule="evenodd"' : ''}/>`;
        case 'text': {
          const anchor = o.anchor && o.anchor !== 'start' ? ` text-anchor="${o.anchor}"` : '';
          const base = o.baseline === 'middle' ? ' dominant-baseline="central"' : '';
          const family = o.emoji ? EMOJI_FONT : o.font;
          return `<text${attrs(o)} x="${f(o.x)}" y="${f(o.y)}" font-family='${xml(family)}' font-size="${f(o.size)}" font-weight="${o.weight || 400}" fill="${paint(o.fill)}"${anchor}${base}${o.ls ? ` letter-spacing="${o.ls}"` : ''}>${xml(o.text)}</text>`;
        }
        case 'image': {
          if (!o.src) return '';
          let clip = '';
          if (o.clip || o.r) {
            const d = o.clip ? clipPath(o.clip, o.x, o.y, o.w, o.h) : roundRect(o.x, o.y, o.w, o.h, o.r);
            clip = ` clip-path="url(#${uidFor('clip' + d, id => `<clipPath id="${id}"><path d="${d}"/></clipPath>`)})"`;
          }
          if (o.fit === 'tile' && o.iw) {
            const tw = o.tile || 400, th = tw * (o.ih / o.iw);
            const pid = uidFor('img' + o.src + tw, id => `<pattern id="${id}" patternUnits="userSpaceOnUse" width="${f(tw)}" height="${f(th)}"><image href="${xml(o.src)}" width="${f(tw)}" height="${f(th)}"/></pattern>`);
            return `<rect${attrs(o)} x="${f(o.x)}" y="${f(o.y)}" width="${f(o.w)}" height="${f(o.h)}" fill="url(#${pid})"${clip}/>`;
          }
          const par = o.fit === 'contain' ? 'xMidYMid meet' : o.fit === 'fill' ? 'none' : 'xMidYMid slice';
          return `<image${attrs(o)} href="${xml(o.src)}" x="${f(o.x)}" y="${f(o.y)}" width="${f(o.w)}" height="${f(o.h)}" preserveAspectRatio="${par}"${clip}/>`;
        }
        case 'group': {
          const t = [];
          if (o.tx || o.ty) t.push(`translate(${f(o.tx || 0)} ${f(o.ty || 0)})`);
          if (o.rot) t.push(`rotate(${f(o.rot)})`);
          if ((o.sx ?? 1) !== 1 || (o.sy ?? 1) !== 1) t.push(`scale(${o.sx ?? 1} ${o.sy ?? 1})`);
          return `<g${attrs(o)}${t.length ? ` transform="${t.join(' ')}"` : ''}>${o.children.map(draw).join('')}</g>`;
        }
        default: return '';
      }
    }

    const body = scene.ops.map(draw).join('');
    const dims = forExport ? ` width="${f(scene.W)}" height="${f(scene.H)}"` : '';
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${f(scene.W)} ${f(scene.H)}"${dims} class="${cls}">${defs.length ? `<defs>${defs.join('')}</defs>` : ''}${body}</svg>`;
  }

  /* ================================== Canvas ================================== */
  const loadImage = src => new Promise(resolve => {
    const img = new Image();
    img.decoding = 'async';
    img.onload = () => resolve(img);
    img.onerror = () => resolve(null);
    img.src = src;
  });

  /** Toutes les sources d'images et de motifs de la scène, préchargées. */
  async function preload(ops, scale) {
    const images = new Map(), tiles = new Map();
    const walk = list => list.forEach(o => {
      if (o.op === 'image' && o.src) images.set(o.src, null);
      if (o.op === 'group') walk(o.children);
      for (const p of [o.fill, o.stroke]) {
        if (p && (p.type === 'pattern' || p.type === 'hatch')) tiles.set(JSON.stringify(p), p);
      }
    });
    walk(ops);
    await Promise.all([...images.keys()].map(async src => images.set(src, await loadImage(src))));
    const patterns = new Map();
    await Promise.all([...tiles.entries()].map(async ([key, p]) => {
      const t = p.type === 'hatch' ? MF.backgrounds.hatch(p.color) : MF.backgrounds.tile(p.pattern, p.a, p.b);
      const k = scale * (p.scale || 1);
      const pw = Math.max(1, Math.round(t.w * k)), ph = Math.max(1, Math.round(t.h * k));
      const markup = `<svg xmlns="http://www.w3.org/2000/svg" width="${pw}" height="${ph}" viewBox="0 0 ${t.w} ${t.h}" preserveAspectRatio="none">${t.svg}</svg>`;
      const img = await loadImage(`data:image/svg+xml;charset=utf-8,${encodeURIComponent(markup)}`);
      patterns.set(key, { img, sx: t.w / pw, sy: t.h / ph, s: p.scale || 1 });
    }));
    return { images, patterns };
  }

  /** @param matte couleur peinte sous l'affiche (formats sans transparence, ex. JPEG) */
  async function canvas(scene, { scale = 2, matte = null } = {}) {
    const cv = document.createElement('canvas');
    cv.width = Math.round(scene.W * scale); cv.height = Math.round(scene.H * scale);
    const g = cv.getContext('2d');
    if (matte) { g.fillStyle = matte; g.fillRect(0, 0, cv.width, cv.height); }
    g.scale(scale, scale);
    const { images, patterns } = await preload(scene.ops, scale);
    const color = (hex, a = 1) => { if (a >= 1) return hex; const [r, gg, b] = MF.util.hexToRgb(hex); return `rgba(${r},${gg},${b},${a})`; };

    function paint(p) {
      if (!p) return null;
      if (typeof p === 'string') return p;
      if (p.type === 'linear' || p.type === 'radial') {
        const gr = p.type === 'linear' ? g.createLinearGradient(p.x1, p.y1, p.x2, p.y2) : g.createRadialGradient(p.cx, p.cy, 0, p.cx, p.cy, p.r);
        p.stops.forEach(([o, c, a = 1]) => gr.addColorStop(o, color(c, a)));
        return gr;
      }
      if (p.type === 'pattern' || p.type === 'hatch') {
        const t = patterns.get(JSON.stringify(p));
        if (!t?.img) return null;
        const pat = g.createPattern(t.img, 'repeat');
        pat.setTransform(new DOMMatrix().scale(t.sx * t.s, t.sy * t.s));
        return pat;
      }
      return null;
    }
    const withShadow = (o, fn) => {
      if (!o.shadow) return fn();
      g.save();
      g.shadowColor = 'rgba(0,0,0,.25)'; g.shadowBlur = 12 * scale; g.shadowOffsetY = 5 * scale;
      fn();
      g.restore();
    };
    const fillStroke = (o, path) => {
      const fp = paint(o.fill);
      if (fp) { g.fillStyle = fp; path ? g.fill(path, o.evenodd ? 'evenodd' : 'nonzero') : g.fill(); }
      if (o.stroke) {
        g.strokeStyle = paint(o.stroke); g.lineWidth = o.sw || 1;
        g.lineCap = o.cap || 'butt'; g.lineJoin = o.join || 'miter';
        g.setLineDash(o.dash ? o.dash.split(/\s+/).map(Number) : []);
        path ? g.stroke(path) : g.stroke();
      }
    };

    function draw(o) {
      const alpha = g.globalAlpha;
      if (o.opacity !== undefined) g.globalAlpha = alpha * o.opacity;
      switch (o.op) {
        case 'rect': withShadow(o, () => { const p = new Path2D(roundRect(o.x, o.y, o.w, o.h, o.r)); fillStroke(o, p); }); break;
        case 'circle': withShadow(o, () => { g.beginPath(); g.arc(o.cx, o.cy, o.r, 0, Math.PI * 2); fillStroke(o); }); break;
        case 'line': g.beginPath(); g.moveTo(o.x1, o.y1); g.lineTo(o.x2, o.y2); fillStroke({ ...o, fill: null }); break;
        case 'poly': g.beginPath(); o.pts.forEach(([x, y], i) => (i ? g.lineTo(x, y) : g.moveTo(x, y))); g.closePath(); fillStroke(o); break;
        case 'polyline': g.beginPath(); o.pts.forEach(([x, y], i) => (i ? g.lineTo(x, y) : g.moveTo(x, y))); fillStroke({ ...o, fill: null }); break;
        case 'path': withShadow(o, () => fillStroke(o, new Path2D(o.d))); break;
        case 'text': {
          g.font = `${o.weight || 400} ${o.size}px ${o.emoji ? EMOJI_FONT : o.font}`;
          g.textAlign = o.anchor === 'middle' ? 'center' : o.anchor === 'end' ? 'right' : 'left';
          g.textBaseline = o.baseline === 'middle' ? 'middle' : 'alphabetic';
          if ('letterSpacing' in g) g.letterSpacing = o.ls ? `${o.ls}px` : '0px';
          withShadow(o, () => { g.fillStyle = paint(o.fill) || '#000'; g.fillText(o.text, o.x, o.y); });
          break;
        }
        case 'image': {
          const img = images.get(o.src);
          if (!img) break;
          g.save();
          if (o.clip || o.r) g.clip(new Path2D(o.clip ? clipPath(o.clip, o.x, o.y, o.w, o.h) : roundRect(o.x, o.y, o.w, o.h, o.r)));
          if (o.fit === 'tile') {
            const tw = o.tile || 400, th = tw * (img.naturalHeight / img.naturalWidth);
            const pat = g.createPattern(img, 'repeat');
            pat.setTransform(new DOMMatrix().scale(tw / img.naturalWidth, th / img.naturalHeight));
            g.fillStyle = pat; g.fillRect(o.x, o.y, o.w, o.h);
          } else if (o.fit === 'fill') {
            g.drawImage(img, o.x, o.y, o.w, o.h);
          } else {
            const ir = img.naturalWidth / img.naturalHeight, br = o.w / o.h;
            const cover = o.fit !== 'contain';
            let w = o.w, h = o.h;
            if ((ir > br) === cover) w = h * ir; else h = w / ir;
            g.drawImage(img, o.x + (o.w - w) / 2, o.y + (o.h - h) / 2, w, h);
          }
          g.restore();
          break;
        }
        case 'group': {
          g.save();
          g.translate(o.tx || 0, o.ty || 0);
          if (o.rot) g.rotate((o.rot * Math.PI) / 180);
          g.scale(o.sx ?? 1, o.sy ?? 1);
          if (o.shadow) { g.shadowColor = 'rgba(0,0,0,.25)'; g.shadowBlur = 12 * scale; g.shadowOffsetY = 5 * scale; }
          o.children.forEach(draw);
          g.restore();
          break;
        }
        default: break;
      }
      g.globalAlpha = alpha;
    }
    scene.ops.forEach(draw);
    return cv;
  }

  return { svg, canvas, clipPath, roundRect, EMOJI_FONT };
})();
