// @ts-check
/* =========================================================================
   Édition directe des stickers sur l'affiche : sélection, déplacement,
   redimensionnement (proportionnel), rotation, guides de centrage.
   L'aperçu suit la souris en temps réel ; la modification est enregistrée
   (une seule étape d'historique) quand on relâche.
   ========================================================================= */
window.MF = window.MF || {};

MF.stickerEditor = (() => {
  const ic = MF.icons.svg;
  const { esc } = MF.util;
  const { t } = MF.i18n;
  let st = null; // { view, opts, box }
  const bound = new WeakSet();

  /**
   * @param view  contexte renvoyé par MF.gridView.render
   * @param opts  objet { selected, onSelect(id|null), onCommit(id, patch), onAction(action, id) }
   */
  function attach(view, opts) {
    st = { view, opts, box: null };
    if (!view || view.mode === 'play') return;
    const svg = view.sheet.querySelector('.mf-svg');
    // Affiche conservée d'un rendu à l'autre (MF.gridView) : un seul écouteur, qui lit toujours `st`
    if (!bound.has(svg)) { bound.add(svg); svg.addEventListener('pointerdown', onPointerDown); }
    if (opts.selected) drawBox(); else view.sheet.querySelector('.sel-box')?.remove();
  }

  function onPointerDown(e) {
    const g = e.target.closest('.sticker');
    if (!g) { if (st.opts.selected && !e.target.closest('.missing')) st.opts.onSelect(null); return; }
    const s = sticker(g.dataset.sticker);
    if (!s) return;
    e.preventDefault();
    if (st.opts.selected !== s.id) st.opts.onSelect(s.id, { silent: true });
    if (!s.locked) startDrag(e, s, 'move');
  }

  const sticker = id => st.view.puzzle.stickers.find(s => s.id === id);
  const groupOf = id => st.view.sheet.querySelector(`.mf-svg .sticker[data-sticker="${CSS.escape(id)}"]`);

  function geometry(s, live = {}) {
    const { W, H } = st.view.scene;
    const x = live.x ?? s.x, y = live.y ?? s.y, w = live.w ?? s.w, rot = live.rot ?? s.rot;
    return { x, y, w, rot, pw: w * W, ph: w * W * s.ar, W, H };
  }

  function drawBox(live) {
    const s = sticker(st.opts.selected);
    st.view.sheet.querySelector('.sel-box')?.remove();
    if (!s) return;
    const g = geometry(s, live);
    const box = document.createElement('div');
    box.className = `sel-box ${s.locked ? 'locked' : ''}`;
    Object.assign(box.style, {
      left: `${g.x * 100}%`, top: `${g.y * 100}%`,
      width: `${(g.pw / g.W) * 100}%`, height: `${(g.ph / g.H) * 100}%`,
      transform: `translate(-50%, -50%) rotate(${g.rot}deg)`,
    });
    box.innerHTML = s.locked ? '' : `
      <i class="h nw" data-h="resize"></i><i class="h ne" data-h="resize"></i><i class="h sw" data-h="resize"></i><i class="h se" data-h="resize"></i>
      <i class="h rot" data-h="rotate" title="${esc(t('Tourner'))}"></i>`;
    const bar = document.createElement('div');
    bar.className = 'sel-bar';
    bar.style.transform = `rotate(${-g.rot}deg)`;
    bar.innerHTML = [['dup', 'copy', t('Dupliquer')], ['front', 'bringFront', t('Premier plan / arrière-plan')], ['lock', s.locked ? 'lock' : 'unlock', s.locked ? t('Déverrouiller') : t('Verrouiller')], ['del', 'trash', t('Supprimer')]]
      .map(([a, i, label]) => `<button type="button" data-act="${a}" title="${esc(label)}" aria-label="${esc(label)}">${ic(i)}</button>`).join('');
    box.appendChild(bar);
    st.view.sheet.appendChild(box);
    st.box = box;
    box.addEventListener('pointerdown', e => {
      const b = /** @type {Element} */ (e.target).closest('[data-act]');
      if (b) { e.stopPropagation(); return; }
      const h = /** @type {any} */ (e.target).closest('[data-h]');
      e.preventDefault(); e.stopPropagation();
      if (s.locked) return;
      startDrag(e, s, h ? h.dataset.h : 'move');
    });
    bar.addEventListener('click', e => {
      const b = /** @type {any} */ (e.target).closest('[data-act]');
      if (b) st.opts.onAction(b.dataset.act, s.id);
    });
  }

  function startDrag(e, s, kind) {
    const sheet = st.view.sheet;
    const rect = sheet.getBoundingClientRect();
    const g0 = geometry(s);
    const px = ev => ({ x: (ev.clientX - rect.left) / rect.width, y: (ev.clientY - rect.top) / rect.height });
    const p0 = px(e);
    const cx = rect.left + g0.x * rect.width, cy = rect.top + g0.y * rect.height;
    const d0 = Math.hypot(e.clientX - cx, e.clientY - cy) || 1;
    const a0 = Math.atan2(e.clientY - cy, e.clientX - cx);
    let live = {};
    let moved = false;
    const guides = document.createElement('div');
    guides.className = 'guides';
    sheet.appendChild(guides);

    const onMove = ev => {
      moved = true;
      if (kind === 'move') {
        const p = px(ev);
        let x = g0.x + p.x - p0.x, y = g0.y + p.y - p0.y;
        // Aimant vers le centre de l'affiche
        const snapX = Math.abs(x - 0.5) < 0.012, snapY = Math.abs(y - 0.5) < 0.012;
        if (snapX) x = 0.5;
        if (snapY) y = 0.5;
        guides.className = `guides ${snapX ? 'gx' : ''} ${snapY ? 'gy' : ''}`;
        live = { x, y };
      } else if (kind === 'resize') {
        const d = Math.hypot(ev.clientX - cx, ev.clientY - cy);
        live = { w: Math.max(0.015, Math.min(3, g0.w * (d / d0))) };
      } else if (kind === 'rotate') {
        let rot = g0.rot + ((Math.atan2(ev.clientY - cy, ev.clientX - cx) - a0) * 180) / Math.PI;
        rot = ((rot + 540) % 360) - 180;
        if (!ev.shiftKey) for (const snap of [-180, -90, 0, 90, 180]) if (Math.abs(rot - snap) < 4) rot = snap;
        live = { rot: Math.round(rot) };
      }
      preview(s, live);
    };
    const onUp = () => {
      removeEventListener('pointermove', onMove);
      removeEventListener('pointerup', onUp);
      guides.remove();
      if (moved && Object.keys(live).length) st.opts.onCommit(s.id, live);
    };
    addEventListener('pointermove', onMove);
    addEventListener('pointerup', onUp);
  }

  /** Aperçu instantané : on ne retouche que la transformation du groupe SVG. */
  function preview(s, live) {
    const g = geometry(s, live);
    const el = groupOf(s.id);
    // Le DOM ne correspond plus au dessin mémorisé : le prochain rendu le reconstruira
    st.view.markup = null;
    if (el) {
      const k = g.w / s.w;
      el.setAttribute('transform', `translate(${g.x * g.W} ${g.y * g.H}) rotate(${g.rot}) scale(${(s.flip ? -1 : 1) * k} ${k})`);
    }
    drawBox(live);
  }

  /** Change la sélection sans redessiner l'affiche (un glisser peut être en cours). */
  function select(id) {
    if (!st?.view) return;
    st.opts.selected = id;
    if (id) drawBox(); else st.view.sheet.querySelector('.sel-box')?.remove();
  }

  return { attach, select };
})();
