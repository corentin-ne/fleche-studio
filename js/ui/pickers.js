/* =========================================================================
   Fenêtres de choix de mots et de définitions :
     - bibliothèque (dictionnaire local filtrable : longueur, lettre, motif…) ;
     - thèmes (packs prêts + catégories du Wiktionnaire en ligne) ;
     - coller une liste ; relecture d'un import (cases à cocher) ;
     - choix d'une définition (dictionnaire, Wiktionnaire, Wikipédia).
   Chaque fenêtre renvoie une liste [{ text, clue }] ou null.
   ========================================================================= */
window.MF = window.MF || {};

MF.pickers = (() => {
  const { esc, normalize, plural } = MF.util;
  const ic = MF.icons.svg;
  const D = MF.dictionary;

  /* ---------------- Liste à cocher réutilisable ---------------- */
  function checklist(items, existing) {
    return items.map((it, i) => {
      const dup = existing.has(normalize(it.text));
      return `<label class="pick-row ${dup ? 'is-dup' : ''}">
        <input type="checkbox" data-i="${i}" ${it.checked !== false && !dup ? 'checked' : ''} ${dup ? 'disabled' : ''}>
        <span class="pick-word mono">${esc(normalize(it.text))}<small>${normalize(it.text).length}</small></span>
        <span class="pick-clue">${it.clue ? esc(it.clue) : `<i class="muted">${dup ? 'déjà dans la liste' : it.note ? esc(it.note) : 'définition à trouver'}</i>`}</span>
      </label>`;
    }).join('');
  }
  const checked = (root, items) => [...root.querySelectorAll('.pick-list input:checked')].map(c => items[+c.dataset.i]).filter(Boolean);
  const bindCount = (root, btnLabel = 'Ajouter') => {
    const update = () => {
      const n = root.querySelectorAll('.pick-list input:checked').length;
      const b = root.querySelector('.modal-foot .btn-primary');
      if (b) { b.lastChild.textContent = n ? `${btnLabel} (${n})` : btnLabel; b.disabled = !n; }
      const c = root.querySelector('.pick-count');
      if (c) c.textContent = plural(n, 'mot sélectionné', 'mots sélectionnés');
    };
    root.addEventListener('change', e => { if (e.target.matches('.pick-list input')) update(); });
    root.querySelector('[data-all]')?.addEventListener('click', () => { root.querySelectorAll('.pick-list input:not(:disabled)').forEach(c => { c.checked = true; }); update(); });
    root.querySelector('[data-none]')?.addEventListener('click', () => { root.querySelectorAll('.pick-list input').forEach(c => { c.checked = false; }); update(); });
    update();
    return update;
  };
  const listTools = `<div class="pick-tools"><span class="pick-count small muted"></span><span class="spacer"></span><button type="button" class="btn btn-sm btn-ghost" data-all>Tout cocher</button><button type="button" class="btn btn-sm btn-ghost" data-none>Tout décocher</button></div>`;

  /** Relecture d'une liste importée avant ajout. */
  function review(title, items, puzzle, intro = '') {
    const existing = new Set(puzzle.words.map(w => normalize(w.text)));
    return MF.ui.modal({
      title, wide: true, icon: 'list',
      body: `${intro}${listTools}<div class="pick-list">${checklist(items, existing)}</div>`,
      onOpen: root => bindCount(root),
      actions: [{ label: 'Annuler', value: null }, { label: 'Ajouter', kind: 'primary', icon: 'plus', value: root => checked(root, items) }],
    });
  }

  /* ---------------- Bibliothèque (dictionnaire local) ---------------- */
  function library(puzzle) {
    const existing = new Set(puzzle.words.map(w => normalize(w.text)));
    const selected = new Map(); // mot -> définition
    const f = { q: '', len: 'all', start: '', pattern: '' };
    let shown = 150, results = [];
    const LENS = [['all', 'Toutes'], ['3-4', '3-4'], ['5-6', '5-6'], ['7-8', '7-8'], ['9-30', '9 +']];
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

    const body = `
      <div class="lib-filters">
        <input class="input input-search" id="lib-q" placeholder="Chercher un mot ou un thème dans les définitions (ex : fleur, sport, cuisine…)" autofocus>
        <div class="row">
          <div class="field"><span>Longueur</span>${MF.ui.segmented('len', LENS, 'all', 'data-lib')}</div>
          <label class="field lib-pattern"><span>Motif <span class="field-hint">? = lettre inconnue</span></span><input class="input mono" id="lib-pattern" placeholder="CH?V?L" maxlength="30"></label>
          <button type="button" class="btn" id="lib-random">${ic('dice')}Au hasard</button>
        </div>
        <div class="letters" id="lib-letters"><button type="button" data-l="" class="active">Toutes</button>${letters.map(l => `<button type="button" data-l="${l}">${l}</button>`).join('')}</div>
      </div>
      <div class="pick-tools"><span class="small muted" id="lib-info"></span><span class="spacer"></span><span class="pick-count small"></span></div>
      <div class="pick-list lib-list" id="lib-list"></div>`;

    return MF.ui.modal({
      title: `Bibliothèque de mots · ${D.size().toLocaleString('fr-FR')} mots`, wide: true, icon: 'book', className: 'lib-modal',
      body,
      onOpen: root => {
        const list = root.querySelector('#lib-list');
        const count = () => {
          const n = selected.size;
          root.querySelector('.pick-count').textContent = n ? plural(n, 'mot choisi', 'mots choisis') : 'Coche les mots à ajouter';
          const b = root.querySelector('.modal-foot .btn-primary');
          b.lastChild.textContent = n ? `Ajouter (${n})` : 'Ajouter';
          b.disabled = !n;
        };
        const draw = () => {
          list.innerHTML = results.slice(0, shown).map(w => {
            const dup = existing.has(w);
            return `<label class="pick-row ${dup ? 'is-dup' : ''}"><input type="checkbox" data-w="${w}" ${selected.has(w) ? 'checked' : ''} ${dup ? 'disabled' : ''}>
              <span class="pick-word mono">${w}<small>${w.length}</small></span><span class="pick-clue">${esc(MF.cluesFr[w])}</span></label>`;
          }).join('') + (results.length > shown ? `<button type="button" class="btn btn-sm lib-more" id="lib-more">Afficher plus (${results.length - shown} restants)</button>` : '')
            || '<p class="empty small">Aucun mot ne correspond.</p>';
          root.querySelector('#lib-info').textContent = `${results.length.toLocaleString('fr-FR')} résultat${results.length > 1 ? 's' : ''}`;
          count();
        };
        const run = () => {
          const [min, max] = f.len === 'all' ? [2, 30] : f.len.split('-').map(Number);
          results = D.search({ q: f.q, min, max, start: f.start, pattern: f.pattern });
          shown = 150;
          draw();
        };
        root.querySelector('#lib-q').addEventListener('input', MF.util.debounce(e => { f.q = e.target.value.trim(); run(); }, 160));
        root.querySelector('#lib-pattern').addEventListener('input', MF.util.debounce(e => { f.pattern = e.target.value; run(); }, 200));
        root.querySelector('[data-lib="len"]').addEventListener('click', e => {
          const b = e.target.closest('button'); if (!b) return;
          root.querySelectorAll('[data-lib="len"] button').forEach(x => x.classList.toggle('active', x === b));
          f.len = b.dataset.v; run();
        });
        root.querySelector('#lib-letters').addEventListener('click', e => {
          const b = e.target.closest('button'); if (!b) return;
          root.querySelectorAll('#lib-letters button').forEach(x => x.classList.toggle('active', x === b));
          f.start = b.dataset.l; run();
        });
        root.querySelector('#lib-random').onclick = () => {
          const [min, max] = f.len === 'all' ? [3, 9] : f.len.split('-').map(Number);
          D.random(12, { min, max, exclude: existing }).forEach(({ word, clue }) => selected.set(word, clue));
          results = [...selected.keys(), ...results.filter(w => !selected.has(w))];
          draw();
          MF.ui.toast('12 mots tirés au hasard et cochés.', 'ok', 2000);
        };
        list.addEventListener('change', e => {
          const c = e.target.closest('input[data-w]'); if (!c) return;
          if (c.checked) selected.set(c.dataset.w, MF.cluesFr[c.dataset.w]); else selected.delete(c.dataset.w);
          count();
        });
        list.addEventListener('click', e => { if (e.target.id === 'lib-more') { shown += 300; draw(); } });
        run();
      },
      actions: [{ label: 'Annuler', value: null }, { label: 'Ajouter', kind: 'primary', icon: 'plus', value: () => [...selected].map(([w, clue]) => ({ text: D.pretty(w), clue })) }],
    });
  }

  /* ---------------- Thèmes : packs + Wiktionnaire ---------------- */
  function themes(puzzle) {
    const packs = Object.entries(MF.packs);
    const body = `
      <div class="section-title">${ic('sparkle')}Packs prêts à l'emploi <span class="muted small">(avec définitions)</span></div>
      <div class="pack-grid">${packs.map(([id, p]) => `<button type="button" class="pack-card" data-pack="${id}"><span class="pack-emoji">${p.emoji}</span><b>${esc(p.label)}</b><small>${p.words.length} mots</small></button>`).join('')}</div>
      <div class="section-title">${ic('globe')}N'importe quel thème, depuis le Wiktionnaire <span class="badge info">en ligne</span></div>
      <form class="row theme-search" id="theme-form" autocomplete="off">
        <input class="input grow" id="theme-q" placeholder="ex : oiseaux, fruits, instruments de musique, métiers…" maxlength="60">
        <button class="btn btn-primary" type="submit">${ic('search')}Chercher</button>
      </form>
      <div id="theme-cats" class="chips"></div>
      <div id="theme-results"></div>`;
    let items = [];
    return MF.ui.modal({
      title: 'Ajouter des mots par thème', wide: true, icon: 'sparkle',
      body,
      onOpen: (root, close) => {
        const res = root.querySelector('#theme-results');
        const showList = (list, intro) => {
          items = list;
          const existing = new Set(puzzle.words.map(w => normalize(w.text)));
          res.innerHTML = `${intro}${listTools}<div class="pick-list">${checklist(items, existing)}</div>`;
          bindCount(root);
          res.scrollIntoView({ behavior: 'smooth', block: 'start' });
        };
        root.querySelectorAll('[data-pack]').forEach(b => (b.onclick = () => {
          root.querySelectorAll('[data-pack]').forEach(x => x.classList.toggle('active', x === b));
          const p = MF.packs[b.dataset.pack];
          showList(p.words.map(([text, clue]) => ({ text, clue })), `<div class="section-title">${p.emoji} ${esc(p.label)}</div>`);
        }));
        const cats = root.querySelector('#theme-cats');
        root.querySelector('#theme-form').addEventListener('submit', async e => {
          e.preventDefault();
          const q = root.querySelector('#theme-q').value.trim();
          if (!q) return;
          cats.innerHTML = '<span class="spinner sm"></span><span class="muted small">Recherche…</span>';
          try {
            const list = await MF.wiki.categories(q);
            cats.innerHTML = list.length ? list.map(c => `<button type="button" class="chip chip-btn" data-cat="${esc(c)}">${esc(c.replace(/ en français$/, ''))}</button>`).join('') : '<span class="muted small">Aucune catégorie trouvée : essaie un mot au pluriel (ex : « oiseaux »).</span>';
            cats.querySelector('[data-cat]')?.click();
          } catch {
            cats.innerHTML = '<span class="warn-text small">Impossible de joindre le Wiktionnaire (hors ligne ?). Les packs ci-dessus restent disponibles.</span>';
          }
        });
        cats.addEventListener('click', async e => {
          const b = e.target.closest('[data-cat]'); if (!b) return;
          cats.querySelectorAll('[data-cat]').forEach(x => x.classList.toggle('active', x === b));
          res.innerHTML = '<p class="muted small"><span class="spinner sm"></span> Chargement des mots…</p>';
          try {
            const words = await MF.wiki.members(b.dataset.cat);
            // Mots courants d'abord (présents dans le dictionnaire local), longueurs jouables
            const seen = new Set();
            const list = words.map(t => ({ text: t, n: normalize(t) }))
              .filter(x => x.n.length >= 3 && x.n.length <= 13 && !seen.has(x.n) && seen.add(x.n))
              .map(x => ({ text: x.text, clue: D.clue(x.n), known: D.has(x.n) }))
              .sort((a, c) => (c.known - a.known) || a.text.length - c.text.length);
            const items2 = list.slice(0, 250).map((x, i) => ({ text: x.text, clue: x.clue, checked: x.known && i < 30, note: 'définition cherchée en ligne à l\'ajout' }));
            showList(items2, `<p class="muted small">${plural(list.length, 'mot trouvé', 'mots trouvés')} dans « ${esc(b.dataset.cat)} ». Les mots courants sont en tête et pré-cochés ; les définitions manquantes seront cherchées automatiquement.</p>`);
          } catch {
            res.innerHTML = '<p class="warn-text small">Chargement impossible. Réessaie dans un instant.</p>';
          }
        });
        void close;
      },
      actions: [{ label: 'Fermer', value: null }, { label: 'Ajouter', kind: 'primary', icon: 'plus', value: root => checked(root, items) }],
    });
  }

  /* ---------------- Coller une liste ---------------- */
  function paste(puzzle) {
    const existing = new Set(puzzle.words.map(w => normalize(w.text)));
    return MF.ui.modal({
      title: 'Coller une liste de mots', wide: true, icon: 'paste',
      body: `
        <p class="muted small">Une ligne par mot. Formats acceptés : <code>Mot ; Définition</code>, <code>Mot : Définition</code>, <code>Mot - Définition</code>, colonnes copiées d'Excel / Google Sheets, ou juste des mots (<code>chat, chien, cheval</code>).</p>
        <textarea class="textarea tall mono" id="bulk-text" autofocus placeholder="Cheval ; Il galope&#10;Soleil : Astre du jour&#10;Lune"></textarea>
        <div class="bulk-preview small" id="bulk-preview"></div>`,
      onOpen: root => {
        const ta = root.querySelector('#bulk-text');
        const pv = root.querySelector('#bulk-preview');
        ta.addEventListener('input', MF.util.debounce(() => {
          const rows = MF.importer.parseText(ta.value);
          const dup = rows.filter(r => existing.has(normalize(r.text))).length;
          const noDef = rows.filter(r => !r.clue).length;
          pv.innerHTML = rows.length
            ? `<b>${plural(rows.length, 'mot détecté', 'mots détectés')}</b>${dup ? ` · <span class="warn-text">${plural(dup, 'déjà présent', 'déjà présents')}</span>` : ''}${noDef ? ` · ${plural(noDef, 'sans définition', 'sans définition')} (complétées automatiquement si possible)` : ''}<div class="chips">${rows.slice(0, 40).map(r => `<span class="chip mono">${esc(normalize(r.text))}</span>`).join('')}${rows.length > 40 ? ' …' : ''}</div>`
            : '<span class="muted">Rien à importer pour l\'instant.</span>';
        }, 120));
        ta.dispatchEvent(new Event('input'));
      },
      actions: [{ label: 'Annuler', value: null }, { label: 'Ajouter les mots', kind: 'primary', icon: 'plus', value: root => MF.importer.parseText(root.querySelector('#bulk-text').value) }],
    });
  }

  /* ---------------- Choix d'une définition ---------------- */
  function chooseDefinition(word, current = '') {
    const n = normalize(word);
    const local = D.clue(n);
    const ctrl = new AbortController();
    const item = (src, short, full) => `<button type="button" class="def-option" data-def="${esc(short)}"><span class="def-src">${src}</span><b>${esc(short)}</b>${full && full !== short ? `<small>${esc(full)}</small>` : ''}</button>`;
    return MF.ui.modal({
      title: `Définition de « ${word} »`, wide: true, icon: 'book',
      onClose: () => ctrl.abort(),
      body: `
        <p class="muted small">Clique une proposition pour la reprendre (tu pourras la modifier). Une définition courte et un peu drôle, c'est encore mieux !</p>
        <div class="def-list" id="def-list">
          ${local ? item('Dictionnaire', local) : ''}
          <div class="def-loading" id="def-wikt"><span class="spinner sm"></span> Wiktionnaire…</div>
          <div class="def-loading" id="def-wiki"><span class="spinner sm"></span> Wikipédia…</div>
        </div>
        <label class="field"><span>Ma définition</span><input class="input" id="def-own" value="${esc(current || local)}" maxlength="${MF.schema.LIMITS.clue}" spellcheck="true" lang="fr"></label>`,
      onOpen: root => {
        const own = root.querySelector('#def-own');
        root.querySelector('#def-list').addEventListener('click', e => {
          const b = e.target.closest('[data-def]'); if (!b) return;
          own.value = b.dataset.def; own.focus();
          root.querySelectorAll('.def-option').forEach(x => x.classList.toggle('active', x === b));
        });
        own.addEventListener('keydown', e => { if (e.key === 'Enter') root.querySelector('.btn-primary').click(); });
        MF.wiki.definitions(word, { signal: ctrl.signal }).then(defs => {
          const el = root.querySelector('#def-wikt');
          el.outerHTML = defs.length ? defs.map(d => item(`Wiktionnaire · ${d.pos}`, d.short, d.text)).join('') : '<div class="def-loading muted">Rien trouvé sur le Wiktionnaire.</div>';
        }).catch(() => { const el = root.querySelector('#def-wikt'); if (el) el.outerHTML = '<div class="def-loading muted">Wiktionnaire injoignable (hors ligne ?).</div>'; });
        MF.wiki.wikipedia(word, { signal: ctrl.signal }).then(r => {
          const el = root.querySelector('#def-wiki');
          if (el) el.outerHTML = r ? item('Wikipédia', r.short, r.text) : '';
        }).catch(() => { root.querySelector('#def-wiki')?.remove(); });
      },
      actions: [{ label: 'Annuler', value: null }, { label: 'Utiliser', kind: 'primary', icon: 'check', value: root => root.querySelector('#def-own').value.trim() }],
    });
  }

  /**
   * Définitions automatiques pour une liste de mots : dictionnaire local, puis Wiktionnaire.
   * @param onEach (index, clue) appelé dès qu'une définition est trouvée
   */
  async function autoDefine(words, onEach, { concurrency = 3, signal } = {}) {
    let found = 0, i = 0;
    const queue = words.map((w, idx) => ({ w, idx }));
    const worker = async () => {
      while (i < queue.length && !signal?.aborted) {
        const { w, idx } = queue[i++];
        let clue = D.clue(w);
        if (!clue && MF.wiki.isOnline()) {
          try { clue = (await MF.wiki.definitions(w, { signal }))[0]?.short || ''; } catch { /* suivant */ }
        }
        if (clue) { found++; onEach(idx, clue); }
      }
    };
    await Promise.all(Array.from({ length: concurrency }, worker));
    return found;
  }

  return { library, themes, paste, review, chooseDefinition, autoDefine };
})();
