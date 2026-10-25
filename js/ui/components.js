/* =========================================================================
   Composants d'interface : icônes, toasts, modales, confirmation, saisie,
   autocomplétion, champs couleur, curseurs.
   ========================================================================= */
window.MF = window.MF || {};

MF.icons = (() => {
  const P = {
    plus: '<path d="M12 5v14M5 12h14"/>',
    minus: '<path d="M5 12h14"/>',
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
    wand: '<path d="m15 4 1.5 3.5L20 9l-3.5 1.5L15 14l-1.5-3.5L10 9l3.5-1.5Z"/><path d="M3 21 12 12"/>',
    more: '<circle cx="5" cy="12" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/>',
    archive: '<rect x="2" y="3" width="20" height="5" rx="1"/><path d="M4 8v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8M10 12h4"/>',
    star: '<path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1-5.4-2.9-5.4 2.9 1-6.1-4.4-4.3 6.1-.9Z"/>',
    'page-portrait': '<rect x="6" y="3" width="12" height="18" rx="1.5"/>',
    'page-landscape': '<rect x="3" y="6" width="18" height="12" rx="1.5"/>',
    undo: '<path d="M9 14 4 9l5-5"/><path d="M4 9h11a5 5 0 0 1 0 10h-3"/>',
    redo: '<path d="m15 14 5-5-5-5"/><path d="M20 9H9a5 5 0 0 0 0 10h3"/>',
    share: '<circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="m8.6 13.5 6.8 4M15.4 6.5l-6.8 4"/>',
    palette: '<path d="M12 3a9 9 0 1 0 0 18c1.1 0 2-.9 2-2 0-.5-.2-1-.5-1.3-.3-.4-.5-.8-.5-1.3 0-1.1.9-2 2-2h2.3A4.7 4.7 0 0 0 22 9.7C22 6 17.5 3 12 3Z"/><circle cx="7.5" cy="10.5" r="1"/><circle cx="12" cy="7.5" r="1"/><circle cx="16.5" cy="10.5" r="1"/>',
    sticker: '<path d="M15.5 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h9.5L21 14.5V5a2 2 0 0 0-2-2Z"/><path d="M15 21v-4a2 2 0 0 1 2-2h4"/><path d="M8 13s1.5 2 4 2 4-2 4-2M9 9h.01M15 9h.01"/>',
    layers: '<path d="m12 2 10 5-10 5L2 7Z"/><path d="m2 17 10 5 10-5M2 12l10 5 10-5"/>',
    type: '<path d="M4 7V4h16v3M9 20h6M12 4v16"/>',
    smile: '<circle cx="12" cy="12" r="9"/><path d="M8 14s1.5 2 4 2 4-2 4-2M9 9h.01M15 9h.01"/>',
    shapes: '<path d="M8.3 10a.7.7 0 0 1-.6-1.1l3.7-6a.7.7 0 0 1 1.2 0l3.7 6a.7.7 0 0 1-.6 1.1Z"/><rect x="3" y="14" width="7" height="7" rx="1"/><circle cx="17.5" cy="17.5" r="3.5"/>',
    help: '<circle cx="12" cy="12" r="9"/><path d="M9.1 9a3 3 0 0 1 5.8 1c0 2-3 3-3 3M12 17h.01"/>',
    sparkle: '<path d="M12 3c.5 4.5 2.5 6.5 7 7-4.5.5-6.5 2.5-7 7-.5-4.5-2.5-6.5-7-7 4.5-.5 6.5-2.5 7-7Z"/>',
    book: '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20V3H6.5A2.5 2.5 0 0 0 4 5.5Z"/><path d="M4 19.5A2.5 2.5 0 0 0 6.5 22H20v-5"/>',
    globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/>',
    file: '<path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9Z"/><path d="M14 3v6h6"/>',
    shield: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"/><path d="m9 12 2 2 4-4"/>',
    chevronDown: '<path d="m6 9 6 6 6-6"/>',
    chevronRight: '<path d="m9 6 6 6-6 6"/>',
    arrowUp: '<path d="M12 19V5M5 12l7-7 7 7"/>',
    arrowDown: '<path d="M12 5v14M19 12l-7 7-7-7"/>',
    flip: '<path d="M12 3v18M16 7l4 5-4 5M8 7l-4 5 4 5"/>',
    sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
    moon: '<path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z"/>',
    dice: '<rect x="3" y="3" width="18" height="18" rx="3"/><path d="M8 8h.01M16 8h.01M12 12h.01M8 16h.01M16 16h.01"/>',
    keyboard: '<rect x="2" y="6" width="20" height="12" rx="2"/><path d="M6 10h.01M10 10h.01M14 10h.01M18 10h.01M7 14h10"/>',
    home: '<path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1Z"/>',
    heart: '<path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21.2l8.8-8.8a5.5 5.5 0 0 0 0-7.8Z"/>',
    folder: '<path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    bulb: '<path d="M9 18h6M10 22h4M12 2a7 7 0 0 0-4 12.7c.6.5 1 1.3 1 2.3h6c0-1 .4-1.8 1-2.3A7 7 0 0 0 12 2Z"/>',
    lock: '<rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>',
    unlock: '<rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 7.5-2"/>',
    arrowGrid: '<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 12h18M12 3v18"/><path d="m14.5 6.5 2 1.5-2 1.5" />',
    crossGrid: '<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M3 15h18M9 3v18M15 3v18"/><rect x="9" y="9" width="6" height="6" fill="currentColor"/>',
    hash: '<path d="M4 9h16M4 15h16M10 3 8 21M16 3l-2 18"/>',
    frame: '<rect x="3" y="3" width="18" height="18" rx="2"/><rect x="7" y="7" width="10" height="10" rx="1"/>',
    bringFront: '<rect x="8" y="8" width="13" height="13" rx="2"/><path d="M4 16V5a1 1 0 0 1 1-1h11"/>',
    rotate: '<path d="M21 12a9 9 0 1 1-3-6.7L21 8"/><path d="M21 3v5h-5"/>',
    database: '<ellipse cx="12" cy="5" rx="8" ry="3"/><path d="M4 5v14c0 1.7 3.6 3 8 3s8-1.3 8-3V5M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3"/>',
    flag: '<path d="M4 22V4M4 4h13l-2 4 2 4H4"/>',
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
  const ic = MF.icons.svg;

  /** Notification éphémère. `action` = { label, run } ajoute un bouton (ex. « Annuler »). */
  function toast(message, kind = 'info', ms = 3200, action = null) {
    const icon = { ok: 'check', err: 'alert', info: 'info', warn: 'alert' }[kind] || 'info';
    const el = html(`<div class="toast glass ${kind}" role="status">${ic(icon)}<span>${esc(message)}</span>${action ? `<button class="btn btn-sm btn-ghost">${esc(action.label)}</button>` : ''}</div>`);
    const remove = () => { el.classList.add('out'); setTimeout(() => el.remove(), 300); };
    if (action) el.querySelector('button').onclick = () => { action.run(); remove(); };
    document.getElementById('toasts').appendChild(el);
    setTimeout(remove, ms);
  }

  const stack = [];
  /**
   * Modale générique.
   * @param {object} o  { title, body (HTML), actions:[{label, kind, value, icon, validate}], wide, size, onOpen(root), className }
   * @returns Promise résolue avec la `value` du bouton cliqué (null si fermée).
   */
  function modal(o) {
    return new Promise(resolve => {
      const prevFocus = document.activeElement;
      const actions = (o.actions || [{ label: 'Fermer', value: null }]).map((a, i) =>
        `<button class="btn ${a.kind ? 'btn-' + a.kind : ''}" data-i="${i}">${a.icon ? ic(a.icon) : ''}${esc(a.label)}</button>`).join('');
      const root = html(`
        <div class="modal-scrim">
          <div class="modal glass ${o.wide ? 'wide' : ''} ${o.size || ''} ${o.className || ''}" role="dialog" aria-modal="true" aria-label="${esc(o.title)}">
            <div class="modal-head">${o.icon ? `<span class="modal-icon">${ic(o.icon)}</span>` : ''}<h3>${esc(o.title)}</h3>
              <button class="btn btn-icon btn-ghost" data-close aria-label="Fermer">${ic('x')}</button></div>
            <div class="modal-body">${o.body || ''}</div>
            ${actions ? `<div class="modal-foot">${o.footNote ? `<span class="foot-note">${o.footNote}</span>` : ''}${actions}</div>` : ''}
          </div>
        </div>`);
      const close = value => {
        document.removeEventListener('keydown', onKey, true);
        stack.splice(stack.indexOf(root), 1);
        root.classList.add('closing');
        setTimeout(() => root.remove(), 120);
        o.onClose?.();
        prevFocus?.focus?.();
        resolve(value);
      };
      const onKey = e => {
        if (stack[stack.length - 1] !== root) return;
        if (e.key === 'Escape') { e.stopPropagation(); close(null); }
        if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) root.querySelector('.modal-foot .btn-primary')?.click();
        // Piège à focus : Tab reste dans la modale
        if (e.key === 'Tab') {
          const f = [...root.querySelectorAll('button, input, select, textarea, [tabindex]:not([tabindex="-1"])')].filter(x => !x.disabled && x.offsetParent);
          if (!f.length) return;
          if (e.shiftKey && document.activeElement === f[0]) { e.preventDefault(); f[f.length - 1].focus(); }
          else if (!e.shiftKey && document.activeElement === f[f.length - 1]) { e.preventDefault(); f[0].focus(); }
        }
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
      root.close = close;
      document.addEventListener('keydown', onKey, true);
      document.getElementById('modal-root').appendChild(root);
      stack.push(root);
      o.onOpen?.(root, close);
      requestAnimationFrame(() => (root.querySelector('[autofocus]') || root.querySelector('.modal-foot .btn-primary') || root.querySelector('.modal-body button, .modal-body input'))?.focus());
    });
  }

  const confirm = (title, message, label = 'Confirmer', kind = 'danger-solid') => modal({
    title, size: 'small',
    body: `<p class="muted">${esc(message)}</p>`,
    actions: [{ label: 'Annuler', value: false }, { label, kind, value: true }],
  });

  /** Demande un texte. */
  function prompt(title, { label = '', value = '', placeholder = '', okLabel = 'Valider', max = 80 } = {}) {
    return modal({
      title, size: 'small',
      body: `<label class="field"><span>${esc(label)}</span><input class="input" id="prompt-input" maxlength="${max}" value="${esc(value)}" placeholder="${esc(placeholder)}" autofocus></label>`,
      onOpen: r => r.querySelector('#prompt-input').addEventListener('keydown', e => { if (e.key === 'Enter') r.querySelector('.btn-primary').click(); }),
      actions: [{ label: 'Annuler', value: null }, { label: okLabel, kind: 'primary', value: r => r.querySelector('#prompt-input').value.trim() }],
    });
  }

  /* ---------------- Autocomplétion ---------------- */
  /**
   * Liste déroulante de suggestions sous un champ.
   * @param o.source   async (q, signal) => [{ value, label (texte), hint, badge }]
   * @param o.onPick   (item) => void
   */
  function autocomplete(input, { source, onPick, minChars = 2, delay = 160 }) {
    const box = html('<div class="ac-list" role="listbox" hidden></div>');
    input.setAttribute('aria-autocomplete', 'list');
    input.setAttribute('autocomplete', 'off');
    input.parentElement.classList.add('ac-host');
    input.insertAdjacentElement('afterend', box);
    let items = [], cur = -1, ctrl = null, seq = 0;

    const close = () => { box.hidden = true; cur = -1; };
    const render = () => {
      box.innerHTML = items.map((it, i) => `<button type="button" role="option" class="ac-item ${i === cur ? 'active' : ''}" data-i="${i}" tabindex="-1">
        <span class="ac-main">${esc(it.label)}</span>${it.hint ? `<span class="ac-hint">${esc(it.hint)}</span>` : ''}${it.badge ? `<span class="ac-badge">${esc(it.badge)}</span>` : ''}</button>`).join('');
      box.hidden = !items.length;
    };
    const run = MF.util.debounce(async () => {
      const q = input.value.trim();
      ctrl?.abort();
      if (q.length < minChars) { items = []; close(); return; }
      ctrl = new AbortController();
      const my = ++seq;
      try {
        await source(q, ctrl.signal, partial => { if (my === seq && document.activeElement === input) { items = partial; cur = -1; render(); } });
      } catch { /* hors ligne ou annulé : on garde les suggestions locales */ }
    }, delay);

    input.addEventListener('input', run);
    input.addEventListener('keydown', e => {
      if (box.hidden) return;
      if (e.key === 'ArrowDown') { e.preventDefault(); cur = (cur + 1) % items.length; render(); }
      else if (e.key === 'ArrowUp') { e.preventDefault(); cur = (cur - 1 + items.length) % items.length; render(); }
      else if (e.key === 'Enter' && cur >= 0) { e.preventDefault(); e.stopPropagation(); onPick(items[cur]); close(); }
      else if (e.key === 'Escape') { e.stopPropagation(); close(); }
      else if (e.key === 'Tab' && cur >= 0) { onPick(items[cur]); close(); }
    });
    input.addEventListener('blur', () => setTimeout(close, 150));
    box.addEventListener('mousedown', e => e.preventDefault());
    box.addEventListener('click', e => {
      const b = e.target.closest('.ac-item');
      if (b) { onPick(items[+b.dataset.i]); close(); input.focus(); }
    });
    return { close, destroy: () => { ctrl?.abort(); run.cancel(); box.remove(); } };
  }

  /* ---------------- Champs réutilisables (HTML) ---------------- */
  /** Champ couleur avec bouton « auto » optionnel. data-color-key identifie la valeur. */
  function colorField(key, label, value, { auto = false, resolved } = {}) {
    const isAuto = value === 'auto';
    const shown = isAuto ? resolved || '#888888' : value;
    return `<div class="color-field ${isAuto ? 'is-auto' : ''}" data-color-key="${esc(key)}">
      <label class="color-swatch" style="--c:${esc(shown)}" title="${esc(label)}"><input type="color" value="${esc(shown)}" aria-label="${esc(label)}"></label>
      <span class="color-label">${esc(label)}${isAuto ? '<small>auto</small>' : ''}</span>
      ${auto && !isAuto ? `<button type="button" class="btn btn-sm btn-ghost btn-icon" data-auto title="Revenir à la couleur automatique" aria-label="Couleur automatique">${ic('refresh')}</button>` : ''}
    </div>`;
  }

  /**
   * Curseur avec valeur affichée.
   * @param div  la valeur enregistrée = valeur du curseur / div (ex. 100 pour un pourcentage)
   */
  function slider(key, label, value, min, max, step = 1, unit = '', { div = 1 } = {}) {
    const shown = +(+value * div).toFixed(2);
    return `<label class="slider-field"><span>${esc(label)}<output data-unit="${esc(unit)}">${esc(shown)}${esc(unit)}</output></span>
      <input type="range" data-slider="${esc(key)}"${div !== 1 ? ` data-div="${div}"` : ''} min="${min}" max="${max}" step="${step}" value="${esc(shown)}"></label>`;
  }

  /**
   * Branche d'un coup tous les champs d'un bloc : curseurs, couleurs, listes, cases à cocher, textes.
   * `set(key, value, live)` est appelé en continu (live = true) puis à la fin du geste (live = false).
   * @param skip sélecteur des zones gérées ailleurs
   */
  function bindFields(root, set, { skip = null } = {}) {
    const mine = el => !skip || !el.closest(skip);
    root.querySelectorAll('[data-slider]').forEach(inp => {
      if (!mine(inp)) return;
      const out = inp.closest('.slider-field')?.querySelector('output');
      const val = () => +inp.value / (+inp.dataset.div || 1);
      inp.addEventListener('input', () => { if (out) out.textContent = `${+(+inp.value).toFixed(2)}${out.dataset.unit}`; set(inp.dataset.slider, val(), true); });
      inp.addEventListener('change', () => set(inp.dataset.slider, val(), false));
    });
    root.querySelectorAll('[data-color-key] input[type=color]').forEach(inp => {
      if (!mine(inp)) return;
      const key = inp.closest('[data-color-key]').dataset.colorKey;
      inp.addEventListener('input', () => { inp.parentElement.style.setProperty('--c', inp.value); set(key, inp.value, true); });
      inp.addEventListener('change', () => set(key, inp.value, false));
    });
    root.querySelectorAll('[data-select]').forEach(sel => mine(sel) && sel.addEventListener('change', () => set(sel.dataset.select, sel.value, false)));
    root.querySelectorAll('[data-toggle]').forEach(cb => mine(cb) && cb.addEventListener('change', () => set(cb.dataset.toggle, cb.checked, false)));
    root.querySelectorAll('[data-text]').forEach(inp => {
      if (!mine(inp)) return;
      inp.addEventListener('input', MF.util.debounce(() => set(inp.dataset.text, inp.value, true), 250));
      inp.addEventListener('change', () => set(inp.dataset.text, inp.value, false));
    });
  }

  /** Contrôle segmenté. */
  const segmented = (key, items, value, attr = 'data-seg') => `<div class="segmented" ${attr}="${esc(key)}">${items.map(([v, l, icon]) => `<button type="button" data-v="${esc(v)}" class="${String(value) === String(v) ? 'active' : ''}">${icon ? ic(icon) : ''}${esc(l)}</button>`).join('')}</div>`;
  return { toast, modal, confirm, prompt, autocomplete, colorField, slider, bindFields, segmented };
})();
