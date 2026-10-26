// @ts-check
/* =========================================================================
   Archive ZIP minimale (sans compression : PNG et SVG se téléchargent en un seul fichier).
   Format « stored » + noms UTF-8 : lu par Windows, macOS et tous les outils courants.
   ========================================================================= */
window.MF = window.MF || {};

MF.zip = (() => {
  let crcTable = null;
  function crc32(bytes) {
    if (!crcTable) {
      crcTable = new Uint32Array(256);
      for (let n = 0; n < 256; n++) {
        let c = n;
        for (let k = 0; k < 8; k++) c = c & 1 ? 0xEDB88320 ^ (c >>> 1) : c >>> 1;
        crcTable[n] = c >>> 0;
      }
    }
    let crc = 0xFFFFFFFF;
    for (let i = 0; i < bytes.length; i++) crc = crcTable[(crc ^ bytes[i]) & 0xFF] ^ (crc >>> 8);
    return (crc ^ 0xFFFFFFFF) >>> 0;
  }

  function dosDateTime(d = new Date()) {
    return {
      time: (d.getHours() << 11) | (d.getMinutes() << 5) | (d.getSeconds() >> 1),
      date: ((d.getFullYear() - 1980) << 9) | ((d.getMonth() + 1) << 5) | d.getDate(),
    };
  }

  const toBytes = async data =>
    data instanceof Uint8Array ? data
      : data instanceof Blob ? new Uint8Array(await data.arrayBuffer())
        : new TextEncoder().encode(String(data));

  /**
   * @param files [{ name: 'dossier/fichier.png', data: Blob | Uint8Array | string }]
   * @returns Blob application/zip
   */
  async function create(files) {
    const enc = new TextEncoder();
    const { time, date } = dosDateTime();
    const chunks = [];
    const central = [];
    let offset = 0;

    for (const f of files) {
      const name = enc.encode(f.name);
      const data = await toBytes(f.data);
      const crc = crc32(data);

      const local = new DataView(new ArrayBuffer(30));
      local.setUint32(0, 0x04034b50, true);
      local.setUint16(4, 20, true);          // version requise
      local.setUint16(6, 0x0800, true);      // noms en UTF-8
      local.setUint16(8, 0, true);           // stored
      local.setUint16(10, time, true);
      local.setUint16(12, date, true);
      local.setUint32(14, crc, true);
      local.setUint32(18, data.length, true);
      local.setUint32(22, data.length, true);
      local.setUint16(26, name.length, true);
      local.setUint16(28, 0, true);
      chunks.push(local, name, data);

      const cd = new DataView(new ArrayBuffer(46));
      cd.setUint32(0, 0x02014b50, true);
      cd.setUint16(4, 20, true);
      cd.setUint16(6, 20, true);
      cd.setUint16(8, 0x0800, true);
      cd.setUint16(10, 0, true);
      cd.setUint16(12, time, true);
      cd.setUint16(14, date, true);
      cd.setUint32(16, crc, true);
      cd.setUint32(20, data.length, true);
      cd.setUint32(24, data.length, true);
      cd.setUint16(28, name.length, true);
      cd.setUint32(42, offset, true);         // position de l'en-tête local
      central.push(cd, name);

      offset += 30 + name.length + data.length;
    }

    const cdSize = central.reduce((n, part) => n + part.byteLength, 0);
    const end = new DataView(new ArrayBuffer(22));
    end.setUint32(0, 0x06054b50, true);
    end.setUint16(8, files.length, true);
    end.setUint16(10, files.length, true);
    end.setUint32(12, cdSize, true);
    end.setUint32(16, offset, true);

    return new Blob(/** @type {BlobPart[]} */ ([...chunks, ...central, end]), { type: 'application/zip' });
  }

  return { create, crc32 };
})();
