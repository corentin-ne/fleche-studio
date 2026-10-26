// @ts-check
/* =========================================================================
   QR codes (norme ISO 18004), sans bibliothèque externe : mode octets,
   correction d'erreur L ou M, versions 1 à 40, choix du meilleur masque.
   Sert à partager une grille sur papier ou d'un écran à un téléphone.
   Adapté de l'algorithme de référence de Project Nayuki (licence MIT).
   ========================================================================= */
window.MF = window.MF || {};

MF.qr = (() => {
  // Index = version (1..40) ; la case 0 est inutilisée
  const ECC_PER_BLOCK = {
    L: [-1, 7, 10, 15, 20, 26, 18, 20, 24, 30, 18, 20, 24, 26, 30, 22, 24, 28, 30, 28, 28, 28, 28, 30, 30, 26, 28, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30],
    M: [-1, 10, 16, 26, 18, 24, 16, 18, 22, 22, 26, 30, 22, 22, 24, 24, 28, 28, 26, 26, 26, 26, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28],
  };
  const BLOCKS = {
    L: [-1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 4, 4, 4, 4, 4, 6, 6, 6, 6, 7, 8, 8, 9, 9, 10, 12, 12, 12, 13, 14, 15, 16, 17, 18, 19, 19, 20, 21, 22, 24, 25],
    M: [-1, 1, 1, 1, 2, 2, 4, 4, 4, 5, 5, 5, 8, 9, 9, 10, 10, 11, 13, 14, 16, 17, 17, 18, 20, 21, 23, 25, 26, 28, 29, 31, 33, 35, 37, 38, 40, 43, 45, 47, 49],
  };
  const FORMAT_BITS = { L: 1, M: 0 };

  const bit = (x, i) => ((x >>> i) & 1) !== 0;

  /** Nombre de modules de données (hors motifs fixes) d'une version. */
  function rawModules(ver) {
    let n = (16 * ver + 128) * ver + 64;
    if (ver >= 2) {
      const align = Math.floor(ver / 7) + 2;
      n -= (25 * align - 10) * align - 55;
      if (ver >= 7) n -= 36;
    }
    return n;
  }
  const dataCodewords = (ver, ecl) => Math.floor(rawModules(ver) / 8) - ECC_PER_BLOCK[ecl][ver] * BLOCKS[ecl][ver];

  /* ---------- Reed-Solomon sur GF(256), polynôme 0x11D ---------- */
  function mul(x, y) {
    let z = 0;
    for (let i = 7; i >= 0; i--) {
      z = (z << 1) ^ ((z >>> 7) * 0x11D);
      z ^= ((y >>> i) & 1) * x;
    }
    return z;
  }
  function divisor(degree) {
    const out = new Array(degree).fill(0);
    out[degree - 1] = 1;
    let root = 1;
    for (let i = 0; i < degree; i++) {
      for (let j = 0; j < out.length; j++) {
        out[j] = mul(out[j], root);
        if (j + 1 < out.length) out[j] ^= out[j + 1];
      }
      root = mul(root, 0x02);
    }
    return out;
  }
  function remainder(data, div) {
    const out = new Array(div.length).fill(0);
    for (const b of data) {
      const factor = b ^ out.shift();
      out.push(0);
      div.forEach((c, i) => { out[i] ^= mul(c, factor); });
    }
    return out;
  }

  /** Données + correction, découpées en blocs puis entrelacées. */
  function codewords(data, ver, ecl) {
    const nBlocks = BLOCKS[ecl][ver], eccLen = ECC_PER_BLOCK[ecl][ver];
    const raw = Math.floor(rawModules(ver) / 8);
    const nShort = nBlocks - (raw % nBlocks);
    const shortLen = Math.floor(raw / nBlocks);
    const div = divisor(eccLen);
    const blocks = [];
    for (let i = 0, k = 0; i < nBlocks; i++) {
      const dat = data.slice(k, k + shortLen - eccLen + (i < nShort ? 0 : 1));
      k += dat.length;
      const ecc = remainder(dat, div);
      if (i < nShort) dat.push(0);
      blocks.push(dat.concat(ecc));
    }
    const out = [];
    for (let i = 0; i < blocks[0].length; i++) {
      blocks.forEach((b, j) => { if (i !== shortLen - eccLen || j >= nShort) out.push(b[i]); });
    }
    return out;
  }

  /* ---------- Matrice ---------- */
  function alignmentPositions(ver, size) {
    if (ver === 1) return [];
    const n = Math.floor(ver / 7) + 2;
    const step = Math.floor((ver * 8 + n * 3 + 5) / (n * 4 - 4)) * 2;
    const out = [6];
    for (let pos = size - 7; out.length < n; pos -= step) out.splice(1, 0, pos);
    return out;
  }

  function build(data, ver, ecl, mask) {
    const size = ver * 4 + 17;
    const mod = Array.from({ length: size }, () => new Array(size).fill(false));
    const fixed = Array.from({ length: size }, () => new Array(size).fill(false));
    const set = (x, y, dark) => { mod[y][x] = dark; fixed[y][x] = true; };

    // Motifs de synchronisation, de repérage et d'alignement
    for (let i = 0; i < size; i++) { set(6, i, i % 2 === 0); set(i, 6, i % 2 === 0); }
    for (const [cx, cy] of [[3, 3], [size - 4, 3], [3, size - 4]]) {
      for (let dy = -4; dy <= 4; dy++) {
        for (let dx = -4; dx <= 4; dx++) {
          const x = cx + dx, y = cy + dy, d = Math.max(Math.abs(dx), Math.abs(dy));
          if (x >= 0 && x < size && y >= 0 && y < size) set(x, y, d !== 2 && d !== 4);
        }
      }
    }
    const al = alignmentPositions(ver, size);
    al.forEach((ax, i) => al.forEach((ay, j) => {
      if ((i === 0 && j === 0) || (i === 0 && j === al.length - 1) || (i === al.length - 1 && j === 0)) return;
      for (let dy = -2; dy <= 2; dy++) for (let dx = -2; dx <= 2; dx++) set(ax + dx, ay + dy, Math.max(Math.abs(dx), Math.abs(dy)) !== 1);
    }));

    // Informations de format (niveau de correction + masque), en double
    const fmt = (FORMAT_BITS[ecl] << 3) | mask;
    let rem = fmt;
    for (let i = 0; i < 10; i++) rem = (rem << 1) ^ ((rem >>> 9) * 0x537);
    const bits = ((fmt << 10) | rem) ^ 0x5412;
    for (let i = 0; i <= 5; i++) set(8, i, bit(bits, i));
    set(8, 7, bit(bits, 6));
    set(8, 8, bit(bits, 7));
    set(7, 8, bit(bits, 8));
    for (let i = 9; i < 15; i++) set(14 - i, 8, bit(bits, i));
    for (let i = 0; i < 8; i++) set(size - 1 - i, 8, bit(bits, i));
    for (let i = 8; i < 15; i++) set(8, size - 15 + i, bit(bits, i));
    set(8, size - 8, true);

    // Informations de version (à partir de la version 7)
    if (ver >= 7) {
      let r = ver;
      for (let i = 0; i < 12; i++) r = (r << 1) ^ ((r >>> 11) * 0x1F25);
      const vb = (ver << 12) | r;
      for (let i = 0; i < 18; i++) {
        const a = size - 11 + (i % 3), b = Math.floor(i / 3);
        set(a, b, bit(vb, i));
        set(b, a, bit(vb, i));
      }
    }

    // Données, en zigzag de deux colonnes, du bas à droite vers le haut
    let i = 0;
    for (let right = size - 1; right >= 1; right -= 2) {
      if (right === 6) right = 5;
      for (let vert = 0; vert < size; vert++) {
        for (let j = 0; j < 2; j++) {
          const x = right - j;
          const y = ((right + 1) & 2) === 0 ? size - 1 - vert : vert;
          if (!fixed[y][x] && i < data.length * 8) {
            mod[y][x] = bit(data[i >>> 3], 7 - (i & 7));
            i++;
          }
        }
      }
    }

    // Masque (jamais sur les motifs fixes)
    const MASKS = [
      (x, y) => (x + y) % 2 === 0, (x, y) => y % 2 === 0, x => x % 3 === 0, (x, y) => (x + y) % 3 === 0,
      (x, y) => (Math.floor(x / 3) + Math.floor(y / 2)) % 2 === 0, (x, y) => ((x * y) % 2) + ((x * y) % 3) === 0,
      (x, y) => (((x * y) % 2) + ((x * y) % 3)) % 2 === 0, (x, y) => (((x + y) % 2) + ((x * y) % 3)) % 2 === 0,
    ];
    for (let y = 0; y < size; y++) for (let x = 0; x < size; x++) if (!fixed[y][x] && MASKS[mask](x, y)) mod[y][x] = !mod[y][x];
    return mod;
  }

  /** Pénalité d'un masque (plus bas = plus facile à lire) : règles de la norme. */
  function penalty(mod) {
    const size = mod.length;
    let score = 0, dark = 0;
    const lines = [];
    for (let y = 0; y < size; y++) lines.push(mod[y]);
    for (let x = 0; x < size; x++) lines.push(mod.map(row => row[x]));
    const FINDER = [true, false, true, true, true, false, true];
    for (const line of lines) {
      for (let i = 0, run = 1; i < size; i++) {
        if (i > 0 && line[i] === line[i - 1]) { run++; if (run === 5) score += 3; else if (run > 5) score++; } else run = 1;
        // Faux motif de repérage (1:1:3:1:1) bordé de 4 modules clairs
        if (i + 7 <= size && FINDER.every((v, k) => line[i + k] === v)) {
          const before = i >= 4 && [1, 2, 3, 4].every(k => !line[i - k]);
          const after = i + 11 <= size && [7, 8, 9, 10].every(k => !line[i + k]);
          if (before || after) score += 40;
        }
      }
    }
    for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        if (mod[y][x]) dark++;
        if (x < size - 1 && y < size - 1 && mod[y][x] === mod[y][x + 1] && mod[y][x] === mod[y + 1][x] && mod[y][x] === mod[y + 1][x + 1]) score += 3;
      }
    }
    return score + Math.floor(Math.abs(dark * 20 - size * size * 10) / (size * size)) * 10;
  }

  /**
   * Encode un texte (UTF-8). Renvoie { size, modules: boolean[][] } ou null s'il est trop long.
   * Correction M quand elle tient, sinon L (capacité maximale : 2 953 octets).
   */
  function encode(text) {
    const bytes = [...new TextEncoder().encode(String(text))];
    for (const ecl of ['M', 'L']) {
      for (let ver = 1; ver <= 40; ver++) {
        const cap = dataCodewords(ver, ecl) * 8;
        const countBits = ver <= 9 ? 8 : 16;
        const used = 4 + countBits + bytes.length * 8;
        if (used > cap) continue;
        // Mode octets (0100), longueur, données, terminaison, remplissage
        const bitsOut = [];
        const push = (val, len) => { for (let i = len - 1; i >= 0; i--) bitsOut.push((val >>> i) & 1); };
        push(4, 4);
        push(bytes.length, countBits);
        bytes.forEach(b => push(b, 8));
        push(0, Math.min(4, cap - bitsOut.length));
        push(0, (8 - (bitsOut.length % 8)) % 8);
        for (let pad = 0xEC; bitsOut.length < cap; pad ^= 0xEC ^ 0x11) push(pad, 8);
        const data = [];
        for (let i = 0; i < bitsOut.length; i += 8) data.push(bitsOut.slice(i, i + 8).reduce((a, b) => (a << 1) | b, 0));
        const all = codewords(data, ver, ecl);
        let best = null, bestScore = Infinity;
        for (let mask = 0; mask < 8; mask++) {
          const m = build(all, ver, ecl, mask);
          const s = penalty(m);
          if (s < bestScore) { best = m; bestScore = s; }
        }
        return { size: best.length, version: ver, ecl, modules: best };
      }
    }
    return null;
  }

  /** Dessin SVG (modules sombres en un seul chemin), avec la marge blanche réglementaire. */
  function svg(qr, { margin = 4, dark = '#000', light = '#fff' } = {}) {
    const n = qr.size + margin * 2;
    let d = '';
    qr.modules.forEach((row, y) => row.forEach((on, x) => { if (on) d += `M${x + margin} ${y + margin}h1v1h-1z`; }));
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${n} ${n}" shape-rendering="crispEdges" role="img"><rect width="${n}" height="${n}" fill="${light}"/><path d="${d}" fill="${dark}"/></svg>`;
  }

  /** Image PNG (impression, envoi) : `px` pixels par module. */
  function png(qr, { px = 8, margin = 4 } = {}) {
    const n = (qr.size + margin * 2) * px;
    const cv = document.createElement('canvas');
    cv.width = cv.height = n;
    const g = cv.getContext('2d');
    g.fillStyle = '#fff';
    g.fillRect(0, 0, n, n);
    g.fillStyle = '#000';
    qr.modules.forEach((row, y) => row.forEach((on, x) => { if (on) g.fillRect((x + margin) * px, (y + margin) * px, px, px); }));
    return new Promise(r => cv.toBlob(r, 'image/png'));
  }

  return { encode, svg, png, capacity: ecl => dataCodewords(40, ecl) - 3 };
})();
