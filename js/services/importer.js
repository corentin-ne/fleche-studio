/* =========================================================================
   Import de listes de mots, sous toutes leurs formes :
     - texte collé : « Mot ; Définition », tabulations (copié d'un tableur),
       « Mot : Définition », « Mot - Définition », ou un mot par ligne,
       ou « chat, chien, cheval » sur une seule ligne ;
     - fichiers .txt, .csv, .tsv, .json et .xlsx (Excel, lu sans bibliothèque).
   Tout est traité comme du texte, borné et nettoyé (MF.schema).
   ========================================================================= */
window.MF = window.MF || {};

MF.importer = (() => {
  const { normalize, cleanText } = MF.util;
  const L = MF.schema.LIMITS;
  const HEADER = /^(mots?|words?|r[ée]ponses?|pr[ée]noms?|d[ée]finitions?|indices?|clues?)$/i;

  const entry = (text, clue = '') => {
    const t = cleanText(text, L.wordLen), c = cleanText(clue, L.clue);
    return normalize(t).length >= 2 ? { text: t, clue: c } : null;
  };

  /** Découpe une ligne CSV (guillemets gérés). */
  function csvLine(line, sep) {
    const out = [];
    let cur = '', q = false;
    for (let i = 0; i < line.length; i++) {
      const ch = line[i];
      if (q) {
        if (ch === '"' && line[i + 1] === '"') { cur += '"'; i++; } else if (ch === '"') q = false; else cur += ch;
      } else if (ch === '"') q = true;
      else if (ch === sep) { out.push(cur); cur = ''; } else cur += ch;
    }
    out.push(cur);
    return out.map(s => s.trim());
  }

  /** Lignes (tableaux de colonnes) -> mots. */
  function fromRows(rows) {
    rows = rows.filter(r => r.some(c => c && c.trim()));
    if (!rows.length) return [];
    // Ancien format à 3 colonnes (Prénom ⇥ Mot ⇥ Définition) : la 1re colonne est ignorée
    const wide = rows.filter(r => r.length >= 3 && r[2]).length > rows.length / 2;
    const out = [];
    for (const r of rows) {
      if (HEADER.test(r[0] || '') || HEADER.test(r[wide ? 1 : 0] || '') || /^ex\s*:/i.test(r[0] || '')) continue;
      let word, clue;
      if (wide) { word = r[1]; clue = r.slice(2).join(' '); } else if (!r[0] && r.length >= 3) { word = r[1]; clue = r.slice(2).join(' '); } else { word = r[0]; clue = r.slice(1).join(' '); }
      const e = entry(word, clue);
      if (e) out.push(e);
    }
    return out;
  }

  /** Texte libre -> mots. */
  function parseText(text) {
    const lines = String(text || '').replace(/\r/g, '').split('\n').map(l => l.replace(/^\s*(?:[-*•·]|\d+[.)])\s+/, '')).filter(l => l.trim());
    // Une seule ligne de mots séparés par des virgules : « chat, chien, cheval »
    if (lines.length === 1 && /,/.test(lines[0]) && !/[;:\t]/.test(lines[0]) && lines[0].split(',').every(x => x.trim().split(/\s+/).length <= 2)) {
      return dedupe(lines[0].split(',').map(x => entry(x)).filter(Boolean));
    }
    const rows = lines.map(raw => {
      if (raw.includes('\t')) return raw.split('\t').map(s => s.trim());
      if (raw.includes(';')) return csvLine(raw, ';');
      const m = /^(.+?)\s*(?:\s[:=—–-]\s|:\s|=\s)\s*(.+)$/.exec(raw.trim());
      if (m) return [m[1], m[2]];
      // « mot, définition » : virgule après un premier mot unique
      const c = /^([^\s,]+)\s*,\s*(.+)$/.exec(raw.trim());
      if (c) return [c[1], c[2]];
      return [raw.trim()];
    });
    return dedupe(fromRows(rows));
  }

  function parseCsv(text) {
    const lines = String(text).replace(/\r/g, '').split('\n').filter(l => l.trim());
    const first = lines[0] || '';
    const sep = first.includes('\t') ? '\t' : (first.split(';').length >= first.split(',').length ? ';' : ',');
    return dedupe(fromRows(lines.map(l => csvLine(l, sep))));
  }

  /** JSON : ["chat", …] | [{ mot|word|text, definition|clue|def }] | { mot: définition } */
  function parseJson(data) {
    let out = [];
    const pick = (o, keys) => keys.map(k => o[k]).find(v => typeof v === 'string' || typeof v === 'number');
    if (Array.isArray(data)) {
      out = data.slice(0, L.words * 2).map(x => (typeof x === 'string' ? entry(x)
        : MF.schema.isObj(x) ? entry(String(pick(x, ['mot', 'word', 'text', 'reponse', 'réponse', 'answer']) ?? ''), String(pick(x, ['definition', 'définition', 'clue', 'def', 'indice']) ?? '')) : null)).filter(Boolean);
    } else if (MF.schema.isObj(data)) {
      const list = data.words || data.mots;
      if (Array.isArray(list)) return parseJson(list);
      out = Object.entries(data).slice(0, L.words * 2).filter(([, v]) => typeof v === 'string').map(([k, v]) => entry(k, v)).filter(Boolean);
    }
    return dedupe(out);
  }

  function dedupe(list) {
    const seen = new Set();
    return list.filter(e => { const n = normalize(e.text); if (seen.has(n)) return false; seen.add(n); return true; }).slice(0, L.words);
  }

  /* ---------------- Excel (.xlsx) : ZIP + XML, lus nativement ---------------- */
  async function inflate(bytes, max = 40 * 1024 * 1024) {
    const ds = new DecompressionStream('deflate-raw');
    const reader = new Blob([bytes]).stream().pipeThrough(ds).getReader();
    const chunks = [];
    let total = 0;
    for (;;) {
      const { done, value } = await reader.read();
      if (done) break;
      total += value.length;
      if (total > max) { reader.cancel(); throw new Error(MF.i18n.t('Fichier trop volumineux une fois décompressé')); }
      chunks.push(value);
    }
    const out = new Uint8Array(total);
    let o = 0;
    for (const c of chunks) { out.set(c, o); o += c.length; }
    return out;
  }

  async function unzip(buf) {
    const dv = new DataView(buf), bytes = new Uint8Array(buf);
    let e = buf.byteLength - 22;
    while (e >= 0 && dv.getUint32(e, true) !== 0x06054b50) e--;
    if (e < 0) throw new Error(MF.i18n.t('Archive illisible'));
    const count = dv.getUint16(e + 10, true);
    let off = dv.getUint32(e + 16, true);
    const entries = new Map();
    const dec = new TextDecoder();
    for (let i = 0; i < count && off + 46 <= buf.byteLength; i++) {
      if (dv.getUint32(off, true) !== 0x02014b50) break;
      const method = dv.getUint16(off + 10, true), size = dv.getUint32(off + 20, true);
      const n = dv.getUint16(off + 28, true), x = dv.getUint16(off + 30, true), k = dv.getUint16(off + 32, true);
      const local = dv.getUint32(off + 42, true);
      entries.set(dec.decode(bytes.subarray(off + 46, off + 46 + n)), { method, size, local });
      off += 46 + n + x + k;
    }
    return {
      names: [...entries.keys()],
      async text(name) {
        const ent = entries.get(name);
        if (!ent) return null;
        const start = ent.local + 30 + dv.getUint16(ent.local + 26, true) + dv.getUint16(ent.local + 28, true);
        const data = bytes.subarray(start, start + ent.size);
        return dec.decode(ent.method === 8 ? await inflate(data) : data);
      },
    };
  }

  async function parseXlsx(buf) {
    const zip = await unzip(buf);
    const xml = s => new DOMParser().parseFromString(s, 'application/xml');
    const shared = [];
    const ss = await zip.text('xl/sharedStrings.xml');
    if (ss) xml(ss).querySelectorAll('si').forEach(si => shared.push([...si.querySelectorAll('t')].map(t => t.textContent).join('')));
    const sheetName = zip.names.find(n => /^xl\/worksheets\/sheet1\.xml$/.test(n)) || zip.names.find(n => /^xl\/worksheets\/sheet\d+\.xml$/.test(n));
    if (!sheetName) throw new Error(MF.i18n.t('Aucune feuille trouvée'));
    const doc = xml(await zip.text(sheetName));
    const col = ref => [...ref.replace(/\d+/g, '')].reduce((s, ch) => s * 26 + ch.charCodeAt(0) - 64, 0) - 1;
    const rows = [];
    doc.querySelectorAll('sheetData row').forEach(row => {
      const cells = [];
      row.querySelectorAll('c').forEach(c => {
        const t = c.getAttribute('t');
        const v = c.querySelector('v')?.textContent ?? '';
        const val = t === 's' ? shared[+v] ?? '' : t === 'inlineStr' ? [...c.querySelectorAll('is t')].map(x => x.textContent).join('') : v;
        cells[col(c.getAttribute('r') || 'A')] = String(val);
      });
      rows.push(Array.from(cells, x => x ?? ''));
    });
    return dedupe(fromRows(rows));
  }

  /** Lit un fichier de mots. Renvoie [{ text, clue }]. */
  async function parseFile(file) {
    const name = (file.name || '').toLowerCase();
    if (file.size > 20 * 1024 * 1024) throw new Error(MF.i18n.t('Fichier trop volumineux (20 Mo maximum)'));
    if (/\.xlsx$/.test(name)) return parseXlsx(await file.arrayBuffer());
    if (/\.(xls|ods|numbers|docx?)$/.test(name)) throw new Error(MF.i18n.t('Ce format n\'est pas lu directement : enregistre-le en .xlsx ou .csv.'));
    const text = await file.text();
    if (/\.json$/.test(name)) return parseJson(JSON.parse(text));
    if (/\.(csv|tsv)$/.test(name)) return parseCsv(text);
    return parseText(text);
  }

  return { parseText, parseCsv, parseJson, parseFile, ACCEPT: '.txt,.csv,.tsv,.json,.xlsx,text/plain,text/csv,application/json' };
})();
