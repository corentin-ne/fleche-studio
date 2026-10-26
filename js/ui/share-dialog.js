// @ts-check
/* =========================================================================
   Fenêtre « Partager la grille à jouer » : lien à copier ou envoyer,
   QR code (à scanner ou imprimer), et ce qui ne voyage pas dans le lien.
   Le lien lui-même est fabriqué par MF.share.
   ========================================================================= */
window.MF = window.MF || {};

MF.shareDialog = (() => {
  const { t } = MF.i18n;
  const { esc, plural } = MF.util;
  const ic = (name, cls) => MF.icons.svg(name, cls);

  /** Ce qui n'est pas inclus dans le lien (trop lourd pour une adresse), en clair. */
  function omittedText(pz) {
    const { photos, background } = MF.share.omitted(pz);
    return [photos && plural(photos, 'photo'), background && t('l\'image de fond')].filter(Boolean).join(', ');
  }

  /** Bloc QR code, ou explication si le lien est trop long pour en faire un. */
  function qrBlock(qr) {
    if (!qr) return `<p class="field-hint">${ic('info', 'ic-inline')} ${t('Grille trop grande pour un QR code : partage le lien.')}</p>`;
    // Au moins 3 px par module : un QR dense (lien long) reste lisible par un téléphone
    const px = (qr.size + 8) * 3;
    return `<div class="share-qr ${px > 200 ? 'big' : ''}"><div class="share-qr-code" style="width:min(100%, ${Math.max(168, px)}px)">${MF.qr.svg(qr)}</div>
      <div class="share-qr-side"><b>${t('QR code')}</b><p class="muted small">${t('À scanner avec un téléphone, ou à imprimer à côté de la grille.')}</p>
      <button class="btn btn-sm" id="share-qr-png">${ic('download')}${t('Télécharger (PNG)')}</button></div></div>`;
  }

  /**
   * Ouvre la fenêtre de partage d'une grille.
   * @param {any} pz
   * @param {string} url  lien de partage (MF.share.link)
   */
  function open(pz, url) {
    const lost = omittedText(pz);
    const qr = url.length <= MF.qr.capacity('L') ? MF.qr.encode(url) : null;
    return MF.ui.modal({
      title: t('Partager la grille à jouer'), icon: 'share',
      body: `<p class="muted small">${t('Envoie ce lien : on pourra jouer à ta grille directement dans le navigateur, sans compte. La grille est <b>dans le lien lui-même</b> (rien n\'est stocké sur un serveur).')}</p>
        <div class="row share-row"><input class="input mono" id="share-url" readonly value="${esc(url)}" aria-label="${esc(t('Lien de partage'))}"><button class="btn btn-primary" id="share-copy">${ic('copy')}${t('Copier')}</button></div>
        <p class="field-hint">${ic('info', 'ic-inline')} ${t('Le lien contient les réponses (pour vérifier). {size} Ko.', { size: MF.i18n.num(+(url.length / 1024).toFixed(1)) })}</p>
        ${lost ? `<p class="share-lost small">${ic('alert', 'ic-inline')} ${t('Non inclus dans le lien : {list}. Le reste du design voyage avec la grille.', { list: esc(lost) })}</p>` : ''}
        ${qrBlock(qr)}`,
      onOpen: r => bind(r, pz, url, qr),
      actions: [{ label: t('Fermer'), value: null }],
    });
  }

  function bind(r, pz, url, qr) {
    const inp = r.querySelector('#share-url');
    inp.addEventListener('focus', () => inp.select());
    r.querySelector('#share-copy').onclick = async () => {
      try { await navigator.clipboard.writeText(url); MF.ui.toast(t('Lien copié !'), 'ok'); } catch { inp.select(); document.execCommand?.('copy'); }
    };
    r.querySelector('#share-qr-png')?.addEventListener('click', async () => {
      const blob = await MF.qr.png(qr, { px: 10 });
      if (blob) MF.util.downloadBlob(`${MF.util.slug(pz.name, t('grille'))}-qr.png`, blob);
    });
    if (navigator.share) {
      const b = MF.util.html(`<button class="btn">${ic('share')}${t('Envoyer…')}</button>`);
      b.onclick = () => navigator.share({ title: pz.name, url }).catch(() => {});
      r.querySelector('.share-row').appendChild(b);
    }
  }

  /**
   * Grille reçue par un lien : proposer de l'ajouter et d'y jouer.
   * @returns {Promise<boolean>}
   */
  function received(pz) {
    return MF.ui.modal({
      title: t('Une grille t\'a été partagée !'), icon: 'share',
      body: `<p><b>${esc(pz.name)}</b> · ${esc(MF.games.get(pz.game).label)} · ${plural(pz.words.length, 'mot')}</p><p class="muted small">${t('Elle sera ajoutée à tes grilles (dans ce navigateur uniquement).')}</p>`,
      actions: [{ label: t('Non merci'), value: false }, { label: t('Jouer'), kind: 'primary', icon: 'play', value: true }],
    });
  }

  return { open, received };
})();
