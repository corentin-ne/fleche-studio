/* =========================================================================
   Composants d'interface : icônes, toasts, modales, confirmation.
   ========================================================================= */
window.MF = window.MF || {};

MF.icons = (() => {
  const P = {
    plus: '<path d="M12 5v14M5 12h14"/>',
    trash: '<path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6"/>',
    edit: '<path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z"/>',
    refresh: '<path d="M21 12a9 9 0 1 1-2.6-6.4L21 8"/><path d="M21 3v5h-5"/>',
    shuffle: '<path d="M16 3h5v5M4 20 21 3M21 16v5h-5M15 15l6 6M4 4l5 5"/>',
    print: '<path d="M6 9V2h12v7"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><path d="M6 14h12v8H6z"/>',
    contrast: '<circle cx="12" cy="12" r="9"/><path d="M12 3v18a9 9 0 0 0 0-18Z" fill="currentColor"/>',
    check: '<path d="m5 12 5 5L20 7"/>',
    alert: '<path d="M12 9v4M12 17h.01"/><path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z"/>',
    info: '<circle cx="12" cy="12" r="9"/><path d="M12 16v-4M12 8h.01"/>',
    x: '<path d="M18 6 6 18M6 6l12 12"/>',
    download: '<path d="M12 3v12M7 10l5 5 5-5M5 21h14"/>',
    upload: '<path d="M12 21V9M7 14l5-5 5 5M5 3h14"/>',
    paste: '<rect x="8" y="2" width="8" height="4" rx="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/>',
    grid: '<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M3 15h18M9 3v18M15 3v18"/>',
    search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>',
    play: '<path d="M7 4l13 8-13 8Z"/>',
    eye: '<path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z"/><circle cx="12" cy="12" r="3"/>',
    eyeOff: '<path d="M3 3l18 18M10.6 5.1A10 10 0 0 1 12 5c6.5 0 10 7 10 7a17 17 0 0 1-3.2 4M6.6 6.6C3.9 8.3 2 12 2 12s3.5 7 10 7a9.6 9.6 0 0 0 5.4-1.6"/><path d="M9.9 9.9a3 3 0 0 0 4.2 4.2"/>',
    sliders: '<path d="M4 21v-7M4 10V3M12 21v-9M12 8V3M20 21v-5M20 12V3M1 14h6M9 8h6M17 16h6"/>',
    list: '<path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"/>',
    link: '<path d="M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.7 1.7"/><path d="M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.7-1.7"/>',
    image: '<rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-5-5L5 21"/>',
    copy: '<rect x="9" y="9" width="12" height="12" rx="2"/><path d="M5 15H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v1"/>',
    wand: '<path d="m12 3 1.9 5.8L20 10l-6.1 1.2L12 17l-1.9-5.8L4 10l6.1-1.2Z"/>',
    more: '<circle cx="5" cy="12" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/>',
    archive: '<rect x="2" y="3" width="20" height="5" rx="1"/><path d="M4 8v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8M10 12h4"/>',
    star: '<path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1-5.4-2.9-5.4 2.9 1-6.1-4.4-4.3 6.1-.9Z"/>',
    'page-portrait': '<rect x="6" y="3" width="12" height="18" rx="1.5"/>',
    'page-landscape': '<rect x="3" y="6" width="18" height="12" rx="1.5"/>',
  };
  const svg = (name, cls = '') => `<svg class="ic ${cls}" viewBox="0 0 24 24" aria-hidden="true">${P[name] || ''}</svg>`;
  /** Remplace les <span data-icon="nom"> par l'icône correspondante. */
  function hydrate(root = document) {
    root.querySelectorAll('[data-icon]').forEach(el => {
      if (!el.firstElementChild) el.innerHTML = svg(el.dataset.icon);
    });
  }
  return { svg, hydrate };
})();

MF.ui = (() => {
  const { esc, html } = MF.util;

  function toast(message, kind = 'info', ms = 3200) {
    const icon = { ok: 'check', err: 'alert', info: 'info', warn: 'alert' }[kind] || 'info';
    const el = html(`<div class="toast glass ${kind}" role="status">${MF.icons.svg(icon)}<span>${esc(message)}</span></div>`);
    document.getElementById('toasts').appendChild(el);
    setTimeout(() => { el.classList.add('out'); setTimeout(() => el.remove(), 300); }, ms);
  }

  /**
   * Modale générique.
   * @param {object} o  { title, body (HTML), actions:[{label, kind, value, icon}], wide, onOpen(root) }
   * @returns Promise résolue avec la `value` du bouton cliqué (null si fermée).
   */
  function modal(o) {
    return new Promise(resolve => {
      const actions = (o.actions || [{ label: 'Fermer', value: null }]).map((a, i) =>
        `<button class="btn ${a.kind ? 'btn-' + a.kind : ''}" data-i="${i}">${a.icon ? MF.icons.svg(a.icon) : ''}${esc(a.label)}</button>`).join('');
      const root = html(`
        <div class="modal-scrim">
          <div class="modal glass ${o.wide ? 'wide' : ''}" role="dialog" aria-modal="true" aria-label="${esc(o.title)}">
            <div class="modal-head"><h3>${esc(o.title)}</h3>
              <button class="btn btn-icon btn-ghost" data-close aria-label="Fermer">${MF.icons.svg('x')}</button></div>
            <div class="modal-body">${o.body || ''}</div>
            <div class="modal-foot">${actions}</div>
          </div>
        </div>`);
      const close = value => {
        document.removeEventListener('keydown', onKey);
        root.remove();
        resolve(value);
      };
      const onKey = e => {
        if (e.key === 'Escape') close(null);
        if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) root.querySelector('.btn-primary')?.click();
      };
      root.addEventListener('mousedown', e => { if (e.target === root) close(null); });
      root.querySelector('[data-close]').onclick = () => close(null);
      root.querySelectorAll('.modal-foot .btn').forEach(b => {
        b.onclick = () => {
          const a = o.actions[+b.dataset.i];
          if (a.validate && a.validate(root) === false) return;
          close(typeof a.value === 'function' ? a.value(root) : a.value);
        };
      });
      document.addEventListener('keydown', onKey);
      document.getElementById('modal-root').appendChild(root);
      o.onOpen?.(root);
      (root.querySelector('[autofocus]') || root.querySelector('.modal-foot .btn-primary'))?.focus();
    });
  }

  const confirm = (title, message, label = 'Confirmer') => modal({
    title,
    body: `<p class="muted">${esc(message)}</p>`,
    actions: [{ label: 'Annuler', value: false }, { label, kind: 'danger-solid', value: true }],
  });

  return { toast, modal, confirm };
})();
