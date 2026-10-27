// Dev page for the Murdoku 3D bundle (not deployed). Query: ?look=&mood=&camera=&show=&puzzle=&shot=1
import * as M3D from '../js/vendor/murdoku3d.js';

const DEMO = {
  engine: 'murdoku', v: 1, size: 6, seed: 4242,
  rooms: [{ id: 0, type: 'living' }, { id: 1, type: 'kitchen' }, { id: 2, type: 'bedroom' }, { id: 3, type: 'garden' }, { id: 4, type: 'bathroom' }],
  cells: [
    [2, 2, 2, 1, 1, 1],
    [2, 2, 4, 1, 1, 1],
    [0, 0, 4, 4, 1, 3],
    [0, 0, 0, 4, 3, 3],
    [0, 0, 0, 3, 3, 3],
    [0, 0, 0, 3, 3, 3],
  ],
  objects: [
    { type: 'bed', r: 0, c: 0 }, { type: 'cabinet', r: 0, c: 2 }, { type: 'counter', r: 0, c: 4 }, { type: 'sink', r: 0, c: 5 },
    { type: 'rug', r: 1, c: 1 }, { type: 'bath', r: 1, c: 2 }, { type: 'table', r: 1, c: 4 }, { type: 'chair', r: 2, c: 4 },
    { type: 'fireplace', r: 2, c: 0 }, { type: 'sofa', r: 3, c: 1 }, { type: 'armchair', r: 4, c: 2 }, { type: 'bookshelf', r: 5, c: 0 },
    { type: 'piano', r: 5, c: 2 }, { type: 'tree', r: 3, c: 4 }, { type: 'bench', r: 3, c: 5 }, { type: 'fountain', r: 5, c: 5 },
  ],
  people: [
    { id: 'p0', name: 'Alice', color: '#e4572e', role: 'suspect', r: 0, c: 1 },
    { id: 'p1', name: 'Bruno', color: '#2e86ab', role: 'suspect', r: 1, c: 3 },
    { id: 'p2', name: 'Chloé', color: '#3f9e4d', role: 'suspect', r: 2, c: 5 },
    { id: 'p3', name: 'David', color: '#f2b134', role: 'suspect', r: 3, c: 0 },
    { id: 'p4', name: 'Emma', color: '#8e5cc4', role: 'suspect', r: 4, c: 2 },
    { id: 'p5', name: 'Victor', color: '#2b2d42', role: 'victim', r: 5, c: 4 },
  ],
  murderer: 'p2', clues: [], difficulty: 'easy',
};

const ALL = {
  engine: 'murdoku', v: 1, size: 8, seed: 99,
  rooms: ['living', 'kitchen', 'bedroom', 'bathroom', 'office', 'library', 'dining', 'garden', 'hall', 'music'].map((type, id) => ({ id, type })),
  cells: [
    [2, 2, 2, 3, 3, 1, 1, 1],
    [2, 2, 2, 3, 3, 1, 1, 1],
    [4, 4, 8, 8, 8, 6, 6, 6],
    [4, 4, 8, 0, 0, 6, 6, 6],
    [5, 5, 8, 0, 0, 0, 9, 9],
    [5, 5, 8, 0, 0, 0, 9, 9],
    [7, 7, 7, 7, 7, 7, 9, 9],
    [7, 7, 7, 7, 7, 7, 7, 7],
  ],
  objects: [
    ['bed', 0, 0], ['tv', 0, 2], ['rug', 1, 1], ['bath', 0, 3], ['sink', 1, 4], ['counter', 0, 6], ['sink', 0, 7], ['table', 1, 6], ['chair', 1, 5],
    ['desk', 2, 0], ['armchair', 3, 1], ['bookshelf', 2, 1], ['cabinet', 2, 3], ['bench', 3, 2], ['table', 3, 6], ['chair', 2, 6], ['plant', 3, 7],
    ['sofa', 4, 3], ['table', 5, 4], ['fireplace', 3, 4], ['lamp', 5, 5], ['bookshelf', 4, 0], ['armchair', 5, 1], ['piano', 5, 7], ['lamp', 4, 6],
    ['tree', 6, 0], ['fountain', 7, 3], ['bench', 6, 4], ['tree', 7, 6], ['plant', 6, 2], ['rug', 4, 2],
  ].map(([type, r, c]) => ({ type, r, c })),
  people: [
    { id: 'a', name: 'Anna', color: '#e4572e', role: 'suspect', r: 0, c: 1 },
    { id: 'b', name: 'Basile', color: '#2e86ab', role: 'suspect', r: 1, c: 3 },
    { id: 'c', name: 'Clara', color: '#3f9e4d', role: 'suspect', r: 2, c: 5 },
    { id: 'd', name: 'Denis', color: '#f2b134', role: 'suspect', r: 3, c: 0 },
    { id: 'e', name: 'Eva', color: '#8e5cc4', role: 'suspect', r: 4, c: 7 },
    { id: 'f', name: 'Félix', color: '#d1495b', role: 'suspect', r: 5, c: 2 },
    { id: 'g', name: 'Gaston', color: '#00a6a6', role: 'suspect', r: 6, c: 6 },
    { id: 'v', name: 'Vera', color: '#6b4e71', role: 'victim', r: 7, c: 4 },
  ],
  murderer: 'g', clues: [], difficulty: 'hard',
};

const q = new URLSearchParams(location.search);
const $ = (id) => document.getElementById(id);
if (q.get('shot')) document.body.classList.add('shot');
for (const l of M3D.LOOKS) $('look').append(new Option(l.label, l.id));
for (const m of M3D.MOODS) $('mood').append(new Option(m, m));
for (const k of ['look', 'mood', 'camera', 'show', 'puzzle']) if (q.get(k)) $(k).value = q.get(k);
if (q.get('labels') === '0') $('labels').checked = false;
if (q.get('names') === '1') $('names').checked = true;

const state = { placements: {}, crosses: new Set(), selected: null, highlight: null };
const puzzle = () => ($('puzzle').value === 'all' ? ALL : DEMO);
if (q.get('play')) {
  // a sample game in progress
  state.placements = { p0: { r: 0, c: 1 }, p3: { r: 3, c: 0 }, p5: { r: 5, c: 4 } };
  state.crosses = new Set(['0,3', '2,1', '4,4', '1,0', '5,3']);
  state.selected = 'p3';
  state.highlight = { r: 2, c: 3 };
}

const opts = () => ({ look: $('look').value, mood: $('mood').value, camera: $('camera').value, labels: $('labels').checked, names: $('names').checked });
$('info').textContent = M3D.supported() ? 'WebGL ok' : 'pas de WebGL';
const t0 = performance.now();
const view = await M3D.createView($('board'), opts());
const sync = () => view.setPuzzle(puzzle(), { show: $('show').value, placements: state.placements, crosses: [...state.crosses], selected: state.selected, highlight: state.highlight });
sync();
$('info').textContent += ` — ${Math.round(performance.now() - t0)} ms`;
view.onCell = (r, c) => {
  state.highlight = { r, c };
  const key = `${r},${c}`;
  if ($('show').value === 'play' && state.selected) {
    state.placements[state.selected] = { r, c };
    state.selected = null;
  } else if (state.crosses.has(key)) state.crosses.delete(key);
  else state.crosses.add(key);
  sync();
};
for (const id of ['look', 'mood', 'camera', 'labels', 'names']) $(id).addEventListener('change', () => view.setOptions(opts()));
for (const id of ['show', 'puzzle']) $(id).addEventListener('change', sync);
$('png').addEventListener('click', async () => {
  const cv = await view.toCanvas({ width: 2400 });
  const a = document.createElement('a');
  a.href = cv.toDataURL('image/png');
  a.download = 'murdoku.png';
  a.click();
});
window.demo = { view, M3D, DEMO, ALL, state, sync, ready: true };
