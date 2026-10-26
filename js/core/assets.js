/* =========================================================================
   Images importées (fonds, photos) : stockées dans IndexedDB, côté navigateur.

   Sécurité : chaque image est DÉCODÉE puis RÉ-ENCODÉE via un canvas avant
   d'être gardée. On ne conserve donc que des pixels : métadonnées (EXIF, GPS)
   supprimées, et aucun contenu actif possible (les SVG sont refusés).
   ========================================================================= */
window.MF = window.MF || {};

MF.assets = (() => {
  const DB = 'mfm-assets', STORE = 'images';
  const ACCEPT = ['image/png', 'image/jpeg', 'image/webp', 'image/gif', 'image/avif', 'image/bmp'];
  const MAX_INPUT = 25 * 1024 * 1024;
  const MAX_SIDE = 2600;

  const urls = new Map();      // id -> objet URL (affichage écran)
  const dims = new Map();      // id -> { w, h }
  const dataUrls = new Map();  // id -> data URL (export autonome)
  const tx = MF.idb.database(DB, STORE);

  /** Décode, réduit si besoin et ré-encode une image. Renvoie { blob, w, h }. */
  async function sanitize(file) {
    if (!(file instanceof Blob)) throw new Error(MF.i18n.t('Fichier invalide'));
    if (file.size > MAX_INPUT) throw new Error(MF.i18n.t('Image trop lourde (25 Mo maximum)'));
    if (file.type && !ACCEPT.includes(file.type)) throw new Error(MF.i18n.t('Format non pris en charge (PNG, JPEG, WebP, GIF)'));
    let bmp;
    try { bmp = await createImageBitmap(file); } catch { throw new Error(MF.i18n.t('Image illisible')); }
    const k = Math.min(1, MAX_SIDE / Math.max(bmp.width, bmp.height));
    const w = Math.max(1, Math.round(bmp.width * k)), h = Math.max(1, Math.round(bmp.height * k));
    const cv = document.createElement('canvas');
    cv.width = w; cv.height = h;
    const g = cv.getContext('2d');
    g.drawImage(bmp, 0, 0, w, h);
    bmp.close?.();
    // Transparence présente ? WebP la garde (et compresse mieux que PNG) ; repli PNG
    let blob = await new Promise(r => cv.toBlob(r, 'image/webp', 0.9));
    if (!blob || blob.type !== 'image/webp') blob = await new Promise(r => cv.toBlob(r, 'image/png'));
    cv.width = cv.height = 0;
    if (!blob) throw new Error(MF.i18n.t('Conversion impossible'));
    return { blob, w, h };
  }

  /** Importe une image : renvoie { id, w, h }. */
  async function add(file, name = '') {
    const { blob, w, h } = await sanitize(file);
    const id = MF.util.uid();
    await tx('readwrite', s => s.put({ id, blob, w, h, name: MF.util.cleanText(name, 80), at: Date.now() }));
    urls.set(id, URL.createObjectURL(blob));
    dims.set(id, { w, h });
    return { id, w, h };
  }

  async function getRecord(id) {
    try { return await tx('readonly', s => s.get(id)); } catch { return null; }
  }

  /** Charge en mémoire les URLs des images demandées (à faire avant le rendu). */
  async function ensure(ids) {
    const missing = [...ids].filter(id => id && !urls.has(id));
    await Promise.all(missing.map(async id => {
      const rec = await getRecord(id);
      if (rec?.blob) { urls.set(id, URL.createObjectURL(rec.blob)); dims.set(id, { w: rec.w, h: rec.h }); }
      else urls.set(id, null);
    }));
  }

  /** URL synchrone (null tant que `ensure` n'a pas été appelé, ou image absente). */
  const url = id => urls.get(id) || null;
  const has = id => !!urls.get(id);
  /** Dimensions connues d'une image (après `ensure` ou `add`). */
  const size = id => dims.get(id) || null;

  /** Data URL d'une image (exports SVG autonomes, sauvegardes, partage). */
  async function dataUrl(id) {
    if (dataUrls.has(id)) return dataUrls.get(id);
    const rec = await getRecord(id);
    if (!rec?.blob) return null;
    const d = await MF.util.blobToDataUrl(rec.blob);
    dataUrls.set(id, d);
    return d;
  }

  async function info(id) {
    const rec = await getRecord(id);
    return rec ? { id, w: rec.w, h: rec.h, name: rec.name, size: rec.blob.size } : null;
  }

  async function list() {
    try {
      const all = await tx('readonly', s => s.getAll());
      return (all || []).map(r => ({ id: r.id, w: r.w, h: r.h, name: r.name, size: r.blob?.size || 0, at: r.at }));
    } catch { return []; }
  }

  async function remove(id) {
    await tx('readwrite', s => s.delete(id));
    const u = urls.get(id);
    if (u) URL.revokeObjectURL(u);
    urls.delete(id); dataUrls.delete(id);
  }

  /** Supprime les images qui ne sont plus utilisées nulle part. */
  async function collect(keep) {
    const all = await list();
    await Promise.all(all.filter(a => !keep.has(a.id)).map(a => remove(a.id)));
  }

  async function clear() {
    try { await tx('readwrite', s => s.clear()); } catch { /* ignoré */ }
    urls.forEach(u => u && URL.revokeObjectURL(u));
    urls.clear(); dataUrls.clear();
  }

  /** Restaure une image depuis une data URL (import de sauvegarde) : repasse par l'assainissement. */
  async function fromDataUrl(d, name) {
    const blob = MF.util.dataUrlToBlob(d);
    if (!blob) return null;
    try { return await add(blob, name); } catch { return null; }
  }

  return { add, ensure, url, has, size, dataUrl, info, list, remove, collect, clear, fromDataUrl, ACCEPT };
})();
