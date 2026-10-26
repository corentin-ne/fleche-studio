// @ts-check
/* =========================================================================
   IndexedDB, version minimale : une base = un magasin d'objets.
   Partagé par les images importées (MF.assets) et les versions
   automatiques des grilles (MF.versions).
   ========================================================================= */
window.MF = window.MF || {};

MF.idb = (() => {
  /**
   * Base `name` contenant le magasin `store` (clé : champ `id`).
   * Renvoie tx(mode, fn) : fn reçoit le magasin ; la promesse donne le résultat
   * de la requête renvoyée par fn, une fois la transaction terminée.
   */
  function database(name, store) {
    let dbp = null;
    const open = () => dbp || (dbp = new Promise((resolve, reject) => {
      const req = indexedDB.open(name, 1);
      req.onupgradeneeded = () => req.result.createObjectStore(store, { keyPath: 'id' });
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => { dbp = null; reject(req.error); };
    }));
    return async function tx(mode, fn) {
      const db = await open();
      return new Promise((resolve, reject) => {
        const t = db.transaction(store, mode);
        const res = fn(t.objectStore(store));
        t.oncomplete = () => resolve(res?.result);
        t.onerror = () => reject(t.error);
        t.onabort = () => reject(t.error);
      });
    };
  }

  return { database };
})();
