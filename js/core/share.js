/* =========================================================================
   Liens de partage, sans serveur : la grille est compressée puis placée
   dans le fragment de l'URL (#g=…). Le fragment n'est JAMAIS envoyé au
   serveur web : la grille ne quitte pas les navigateurs de ceux qui ont le lien.
   À l'ouverture, les données sont décompressées (taille bornée) puis
   assainies par MF.schema comme n'importe quelle donnée externe.
   ========================================================================= */
window.MF = window.MF || {};

MF.share = (() => {
  const PREFIX = '#g=';
  const MAX_BYTES = 1.5 * 1024 * 1024;
  const supported = typeof CompressionStream === 'function' && typeof DecompressionStream === 'function';

  async function pipe(bytes, stream, max = Infinity) {
    const reader = new Blob([bytes]).stream().pipeThrough(stream).getReader();
    const chunks = [];
    let total = 0;
    for (;;) {
      const { done, value } = await reader.read();
      if (done) break;
      total += value.length;
      if (total > max) { reader.cancel(); throw new Error(MF.i18n.t('Lien trop volumineux')); }
      chunks.push(value);
    }
    const out = new Uint8Array(total);
    let o = 0;
    for (const c of chunks) { out.set(c, o); o += c.length; }
    return out;
  }

  /** Données partagées : jeu complet, sans les images importées (trop lourdes pour une URL). */
  function payload(pz) {
    const design = MF.util.deepClone(pz.design);
    if (design.background.type === 'image') design.background.type = 'solid';
    design.background.imageId = '';
    return {
      v: 1, name: pz.name, game: pz.game, words: pz.words.map(w => ({ id: w.id, text: w.text, clue: w.clue })),
      fillerClues: pz.fillerClues, options: pz.options, design,
      stickers: pz.stickers.filter(s => s.kind !== 'image'), layout: pz.layout,
    };
  }

  async function link(pz) {
    if (!supported) throw new Error(MF.i18n.t('Navigateur trop ancien pour créer un lien'));
    const json = new TextEncoder().encode(JSON.stringify(payload(pz)));
    const packed = await pipe(json, new CompressionStream('deflate-raw'));
    const url = new URL(location.href);
    url.hash = '';
    url.search = '';
    return `${url.toString().replace(/#$/, '')}${PREFIX}${MF.util.bytesToB64url(packed)}`;
  }

  /** Grille contenue dans l'URL courante (ou null). */
  async function read(hash = location.hash) {
    if (!hash.startsWith(PREFIX) || !supported) return null;
    const raw = hash.slice(PREFIX.length);
    if (raw.length > MAX_BYTES * 1.4) throw new Error(MF.i18n.t('Lien trop volumineux'));
    const bytes = await pipe(MF.util.b64urlToBytes(raw), new DecompressionStream('deflate-raw'), MAX_BYTES);
    const data = JSON.parse(new TextDecoder().decode(bytes));
    if (!MF.schema.isObj(data) || data.v !== 1) throw new Error(MF.i18n.t('Lien invalide'));
    const pz = MF.store.makePuzzle({ ...data, id: null, stickers: data.stickers });
    if (!pz.layout) throw new Error(MF.i18n.t('Grille manquante dans le lien'));
    return pz;
  }

  const clearHash = () => history.replaceState(null, '', location.pathname + location.search);

  return { link, read, clearHash, supported };
})();
