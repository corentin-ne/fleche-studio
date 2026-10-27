// Furniture kits: for each world (puzzle.theme), the model and colours of each
// object type, matching the names the world gives them (js/data/murdoku-themes.js:
// a « futon » is a futon, a « hammock » a hammock). An entry is a model name or
// [name, params]; models come from seats.js, things.js and scenery.js, or the
// classic ones of furniture.js. Types a kit leaves out use the classic model.
import { SEATS } from './seats.js';
import { THINGS } from './things.js';
import { SCENERY } from './scenery.js';

export const KIT_MODELS = { ...SEATS, ...THINGS, ...SCENERY };

const PASTEL = ['#f2a6c0', '#9ad0e0', '#f6e08a', '#b7d98a', '#c8a0e0'];

export const KITS = {
  manor: {},

  mermaids: {
    bed: 'clamBed', sofa: 'coralBench', armchair: ['throne', { c: '#7fd6c8', frame: '#f6eef6', crest: 'shell', step: '#5fc6c9' }],
    chair: ['rockSeat', { c: '#6a8a86', moss: true }], rug: 'seaweedMat', bench: 'ray', table: 'coralTable',
    desk: ['lectern', { c: '#f6eef6', book: '#5fc6c9', glow: '#bff4ff' }], plant: 'anemone', bookshelf: ['shelf', { c: '#8ea29e', items: 'shells' }],
    piano: ['harp', { c: '#f6eef6', board: '#f0a8c4' }], bath: 'vent', sink: 'vent', tv: ['mirror', { c: '#f6eef6', glow: '#9fe8ff' }],
    fireplace: 'volcano', counter: 'oysterBank', cabinet: ['trunk', { open: true, c: '#5c4532', band: '#6a8a86' }], lamp: 'jellyfish',
    tree: ['deco', { name: 'kelp', s: 2.2, h: 2.2 }], fountain: 'anchor',
  },

  japan: {
    bed: 'futon', sofa: 'lacquerBench', armchair: 'zabuton', chair: ['stool', { c: '#a8703f', h: 0.35 }], rug: 'tatami',
    bench: ['stoneBench', { moss: true }], table: 'lowTable', desk: 'lowDesk', plant: ['deco', { name: 'bonsai', s: 2.2, h: 1.0, pot: null }],
    bookshelf: ['rack', { kind: 'katana' }], piano: 'koto', bath: ['tub', { square: true, steam: true, bucket: true }], sink: ['basin', { pedestal: false, h: 0.3, ladle: true }],
    tv: ['screen', { art: 'crane', c: '#f2ead8' }], fireplace: 'irori', counter: 'kamado', cabinet: ['trunk', { c: '#1d1716', band: '#c9a24a' }],
    lamp: 'andon', tree: ['deco', { name: 'sakura', s: 1.8, h: 2.2 }], fountain: ['pond', { fish: 5, pads: 3, edge: '#8e8a82' }],
  },

  paris: {
    bed: ['ironBed', { sheet: '#f2d3d6' }], sofa: ['chaiseLongue', { c: '#2c4a7a' }], armchair: ['bergere', { c: '#c0392b' }], chair: 'bistro',
    rug: ['rug', { pal: ['#24427a', '#f3e3c3', '#c0392b'] }], table: ['roundTable', { r: 0.42, marble: true, c: '#f2ede2', leg: '#2a2523', items: 'candle' }],
    desk: 'easel', plant: ['potted', { pot: '#c46a3a', flowers: '#e0283a', palette: 'green' }], bookshelf: 'bookBox', piano: 'piano',
    bath: 'clawBath', sink: ['basin', { c: '#f6f2ea' }], tv: ['portrait', { kind: 'poster', cols: ['#f2d46a', '#c0392b', '#1d1b1c', '#24427a'], frame: false }],
    fireplace: 'breadOven', counter: ['bar', { zinc: true, top: '#b8bcc0', c: '#24427a' }], cabinet: ['cabinet', { c: '#e8d8c0' }],
    lamp: 'streetLamp', tree: ['tree', { palette: 'green', flowers: '#f4f1ff' }], fountain: 'fountain',
  },

  regency: {
    bed: ['fourPoster', { wood: '#f2ede2', curtain: '#c9b6e8', sheet: '#f6eef6', trim: '#d9b44a' }], sofa: ['chaiseLongue', { c: '#c9b6e8' }],
    armchair: ['wingback', { c: '#9fc4b8', wood: '#d9b44a' }], chair: ['gildedChair', { c: '#c9b6e8' }],
    rug: ['rug', { pal: ['#7d6bb3', '#f2e8d8', '#b0507a'] }], bench: ['bench', { c: '#f2ede2', wood: '#f2ede2' }],
    table: ['roundTable', { r: 0.45, c: '#f2ede2', leg: '#d9b44a', items: 'tea', cloth: '#f6eef6' }], desk: ['bureau', { c: '#f2ede2', leather: '#9fc4b8' }],
    plant: ['potted', { pot: '#f2ede2', flowers: '#e8749a', palette: 'green', s: 0.55 }], bookshelf: ['shelf', { c: '#f2ede2', cols: ['#7d6bb3', '#b0507a', '#d9b44a', '#5a8a7a'] }],
    piano: ['piano', { c: '#7a4a2a' }], bath: ['clawBath', { c: '#c27a4a', metal: true, feet: '#d9b44a', petals: '#e8749a' }], sink: 'vanity',
    tv: ['portrait', { cols: ['#3a3050', '#f2d3b6', '#7d6bb3', '#5a3b26'] }], fireplace: ['fireplace', { marble: true }],
    counter: ['cabinet', { c: '#f2ede2', w: 1.6 }], cabinet: ['cabinet', { c: '#f2ede2' }], lamp: ['candelabra', { drops: true }],
    tree: 'willow', fountain: ['fountain', { top: 'swan', c: '#f2ede2' }],
  },

  egypt: {
    bed: ['kline', { wood: '#d9b44a', c: '#f2ede2', c2: '#2f5e8c', legs: '#d9b44a' }], sofa: ['throne', { c: '#2f5e8c', step: '#b8862b' }],
    armchair: ['throne', { c: '#a33b2b', frame: '#2a2220', step: '#b8862b' }], chair: ['stool', { c: '#a8703f', kind: 'three' }], rug: 'reedMat',
    bench: ['stoneBench', { c: '#d4ac6a' }], table: 'altar', desk: ['lowDesk', { c: '#a8703f', scrolls: true }], plant: 'papyrus',
    bookshelf: ['shelf', { c: '#d4ac6a', items: 'scrolls' }], piano: ['harp', { board: '#2f5e8c' }],
    bath: ['tub', { square: true, c: '#d4ac6a', band: '#b8862b', water: '#f6f2ea' }], sink: ['jar', { handles: true, band: '#2f5e8c' }],
    tv: 'fresco', fireplace: 'brazier', counter: ['breadOven', { c: '#b8673f' }], cabinet: 'sarcophagus', lamp: 'oilLamp',
    tree: ['deco', { name: 'palm', s: 1.7, h: 2.4 }], fountain: ['deco', { name: 'obelisk', s: 1.6, h: 2.2 }],
  },

  pirates: {
    bed: ['hammock', { c: '#d9c08a' }], sofa: 'sailPile', armchair: ['woodArmchair', { c: '#7a1f2a', wood: '#5a3420' }], chair: 'barrel',
    rug: 'net', bench: 'rowBench', table: 'mapTable', desk: ['desk', { c: '#5a3420' }], plant: 'parrot', bookshelf: ['rack', { kind: 'cutlass' }],
    piano: ['organ', { kind: 'barrel' }], bath: ['barrel', { h: 1.0, r: 0.5, liquid: '#7a3a1a' }], sink: ['bucket', { mop: true }],
    tv: ['portrait', { kind: 'poster', cols: ['#e8d8a8', '#1d1b1c', '#7a1f2a', '#5a3420'], frame: '#5a3420' }], fireplace: 'cannon',
    counter: ['bar', { c: '#5a3420' }], cabinet: ['trunk', { open: true, lid: 'round' }], lamp: 'shipLantern',
    tree: ['deco', { name: 'palm', s: 1.7, h: 2.4 }], fountain: 'treasureMound',
  },

  western: {
    bed: 'cot', sofa: 'pew', armchair: 'rockingChair', chair: ['stool', { kind: 'bar', c: '#7a4a2a', leg: '#3a3a3e', h: 0.7 }],
    rug: ['pelt', { c: '#6b4a2e' }], bench: ['pew', { wood: '#a8703f' }], table: 'pokerTable', desk: ['desk', { c: '#7a4a2a' }],
    plant: ['deco', { name: 'cactus', s: 1.6, h: 1.4, pot: '#b8673f' }], bookshelf: ['rack', { kind: 'rifle' }], piano: ['upright', { glass: true }],
    bath: ['tub', { c: '#b8bcc0', band: '#8a8e92', r: 0.6, h: 0.5 }], sink: 'trough',
    tv: ['portrait', { kind: 'poster', cols: ['#e8d8a8', '#3a2414', '#a8321e', '#3a2414'], frame: false, w: 0.7, h: 0.9 }], fireplace: 'potStove',
    counter: 'bar', cabinet: 'safe', lamp: ['shipLantern', { c: '#3a3a3e' }], tree: ['deco', { name: 'cactus', s: 2.6, h: 2.4 }], fountain: 'well',
  },

  space: {
    bed: 'sleepPod', sofa: 'loungePod', armchair: 'pilotSeat', chair: 'magStool', rug: 'lightPanel', bench: 'gymBench',
    table: 'holoConsole', desk: 'commandDesk', plant: ['potted', { pot: '#cfd6de', palette: 'coral', flowers: '#3fe0ff' }], bookshelf: 'serverRack',
    piano: 'synth', bath: 'cryoTank', sink: 'recycler', tv: 'porthole', fireplace: 'reactor', counter: 'dispenserWall',
    cabinet: ['locker', { light: true }], lamp: 'neon', tree: 'growTower', fountain: 'waterTank',
  },

  haunted: {
    bed: 'coffin', sofa: ['sofa', { c: '#4a2a5a' }], armchair: ['wingback', { c: '#3a2a40', wood: '#1d1716' }], chair: ['chair', { c: '#4a2a5a', wood: '#2a1d20' }],
    rug: ['pelt', { c: '#3a2a22', head: true }], bench: ['stoneBench', { c: '#7a7680', moss: true }], table: ['longTable', { c: '#2a1d20', cloth: '#5a2a3a' }],
    desk: ['lectern', { c: '#2a1d20', candle: true }], plant: 'flytrap', bookshelf: ['shelf', { c: '#2a1d20', items: 'potions' }],
    piano: ['organ', { kind: 'pipe', c: '#2a1d20' }], bath: 'cauldron', sink: ['basin', { c: '#7a7680', water: '#5a7a3a' }],
    tv: ['portrait', { eyes: '#ff3a2a', cols: ['#2a2230', '#d9c8b6', '#3a2a40', '#1d1b1c'] }], fireplace: ['fireplace', { c: '#5a5660' }],
    counter: 'alembic', cabinet: 'armor', lamp: ['candelabra', { c: '#3a3a3e', web: true }],
    tree: ['deco', { name: 'deadTree', s: 2.4, h: 2.2 }], fountain: ['deco', { name: 'tomb', s: 2.2, h: 1.6 }],
  },

  medieval: {
    bed: ['fourPoster', { wood: '#5a3a22', curtain: '#7a1f2a', sheet: '#d9b45a', trim: '#8e8a82' }], sofa: ['throne', { c: '#2f4a8a', frame: '#5a3a22', gem: '#d9b45a', step: '#7a1f2a' }],
    armchair: ['throne', { c: '#7a1f2a', frame: '#6b4a34', gem: '#2f4a8a', step: '#5a3a22' }], chair: ['stool', { kind: 'three', c: '#7a5434' }],
    rug: ['pelt', { c: '#7a766e', head: true }], bench: ['pew', { wood: '#7a5434' }], table: ['roundTable', { r: 0.75, c: '#7a5434', items: 'feast', legs: 4 }],
    desk: ['lectern', { candle: true }], plant: 'hayBale', bookshelf: ['rack', { kind: 'sword' }], piano: ['harp', { c: '#8a5a36' }],
    bath: ['tub', { r: 0.65, steam: true }], sink: ['jar', { c: '#9aa6b4', h: 0.6, handles: true }], tv: 'tapestry', fireplace: 'hearth',
    counter: 'anvil', cabinet: ['trunk', { c: '#6b4a34', band: '#3a3a3e', lid: 'round' }], lamp: 'torch',
    tree: ['tree', { palette: 'olive', h: 2.6 }], fountain: ['well', { roof: '#5a3a22' }],
  },

  prehistory: {
    bed: ['leafBed', { palette: 'green' }], sofa: 'hidePile', armchair: 'rockSeat', chair: 'stump', rug: ['pelt', { c: '#8a6a4a' }],
    bench: ['log', { c: '#6b4a34' }], table: 'grindStone', desk: ['fresco', { hands: true, wall: '#8e8a82', cols: ['#a09682', '#a33b2b', '#1d1b1c', '#c27a4a', '#e8d8a8', '#1d1b1c'] }],
    plant: ['deco', { name: 'fern', s: 2.4, h: 1.2 }], bookshelf: 'bonePile', piano: 'drum', bath: ['pond', { reeds: true, r: 0.7 }],
    sink: ['jar', { c: '#c9a46a', h: 0.7 }], tv: ['fresco', { hands: true, wall: '#8e8a82', cols: ['#a09682', '#a33b2b', '#1d1b1c', '#c27a4a', '#e8d8a8', '#1d1b1c'] }],
    fireplace: ['firePit', { spit: true }], counter: 'stonePile', cabinet: 'woodpile', lamp: 'torch', tree: ['tree', { palette: 'green', h: 2.6 }], fountain: 'menhir',
  },

  circus: {
    bed: ['hammock', { c: '#c0283a', post: '#f2c94c' }], sofa: 'bleacher', armchair: ['armchair', { c: '#c0283a' }], chair: ['stool', { kind: 'drum', c: '#c0283a', c2: '#f2c94c', h: 0.5 }],
    rug: ['playMat', { cols: ['#c0283a', '#f2c94c', '#2f6f9a', '#f6f2ea'] }], bench: 'hayBale', table: ['roundTable', { r: 0.4, c: '#2f6f9a', leg: '#f2c94c', items: 'sweets' }],
    desk: 'booth', plant: 'balloons', bookshelf: ['maskWall', { c: '#2f6f9a' }], piano: ['organ', { kind: 'fair' }], bath: ['pond', { seal: true, edge: '#c0283a', r: 0.7 }],
    sink: ['bucket', { c: '#c0283a', fill: '#f2c94c', items: '#2f6f9a' }], tv: ['portrait', { kind: 'poster', cols: ['#f2c94c', '#c0283a', '#1d1b1c', '#2f6f9a'] }],
    fireplace: ['cannon', { c: '#c0283a', cart: '#2f6f9a', stripes: true }], counter: 'popcorn', cabinet: ['trunk', { c: '#2f6f9a', band: '#f2c94c', stickers: true }],
    lamp: 'spotlight', tree: 'tentPole', fountain: 'carousel',
  },

  train: {
    bed: ['bed', { wood: '#4a2a1a', sheet: '#2f5a46' }], sofa: ['sofa', { c: '#7a1f2a' }], armchair: ['wingback', { c: '#6b3a22', wood: '#2a1a12' }],
    chair: ['chair', { c: '#7a1f2a', wood: '#4a2a1a' }], rug: ['rug', { pal: ['#7a1f2a', '#e9d9b8', '#2f5a46'] }],
    table: ['roundTable', { r: 0.5, c: '#4a2a1a', cloth: '#f6f2ea', items: 'candle' }], desk: ['desk', { c: '#4a2a1a' }], plant: ['potted', { plant: 'palm', pot: '#c9a24a' }],
    bookshelf: 'luggageRack', piano: ['upright', { c: '#2a1a12', glass: true }], bath: ['clawBath', { feet: '#c9a24a' }], sink: ['sink', {}],
    tv: 'frostWindow', fireplace: ['potStove', { coal: true }], counter: ['bar', { c: '#4a2a1a' }], cabinet: ['trunk', { c: '#33405a', band: '#c9a24a', stickers: true }],
    lamp: ['lamp', { c: '#f2d48a' }], tree: 'streetLamp', fountain: 'newsstand',
  },

  chalet: {
    bed: ['logBed', { c: '#2f5a8a' }], sofa: ['sofa', { c: '#7a4a2a' }], armchair: ['woodArmchair', { c: '#b3202c' }], chair: ['chair', { c: '#b3202c', wood: '#8a5a36' }],
    rug: ['pelt', { c: '#f2ede2' }], bench: ['sleigh', { c: '#8a5a36', runner: '#3a3a3e', c2: '#b3202c' }], table: ['roundTable', { r: 0.5, c: '#a8703f', items: 'fondue', legs: 4 }],
    desk: ['desk', { c: '#8a5a36' }], plant: ['deco', { name: 'pine', s: 1.2, h: 1.4, pot: '#b3202c' }], bookshelf: 'skiRack', piano: 'alphorn',
    bath: ['tub', { r: 0.7, steam: true, c: '#8a5a36' }], sink: 'sink', tv: 'stagHead', fireplace: ['fireplace', { c: '#8e8a82', stone: true }],
    counter: 'counter', cabinet: ['locker', { c: '#2f5a8a', skis: true }], lamp: ['shipLantern', { post: '#8a5a36' }],
    tree: ['deco', { name: 'pine', s: 2.0, h: 2.4 }], fountain: ['deco', { name: 'snowman', s: 2.2, h: 1.8 }],
  },

  world: {
    bed: ['hammock', { c: '#e8492c', post: '#a8703f' }], sofa: 'deckchair', armchair: 'planeSeat', chair: 'pouf', rug: ['rug', { pal: ['#b8562a', '#efe6c8', '#2c4a6a'] }],
    table: ['pokerTable', { wheel: true }], desk: 'checkin', plant: ['deco', { name: 'bamboo', s: 1.6, h: 1.8, pot: '#2f6f7e' }], bookshelf: 'postcards',
    piano: 'piano', bath: ['pond', { edge: '#e8f4f8', water: '#3fb6e0', r: 0.75 }], sink: ['basin', { c: '#cfd6de' }], tv: 'board', fireplace: 'brazier',
    counter: 'stall', cabinet: ['trunk', { c: '#2f5d8a', stickers: true, w: 0.9 }], lamp: ['lanternPost', { c: '#f2c94c' }], tree: 'baobab', fountain: 'statue',
  },

  rome: {
    bed: ['kline', { wood: '#5a3420', c: '#8a2a2a', c2: '#d9b45a' }], sofa: ['kline', { wood: '#5a3420', c: '#e9d9b0', c2: '#8a2a2a' }], armchair: 'curule', chair: ['stool', { c: '#efe9dc' }],
    rug: 'mosaic', bench: ['stoneBench', { c: '#efe9dc' }], table: ['roundTable', { r: 0.55, marble: true, c: '#efe9dc', leg: '#d8d0bc', items: 'fruit' }],
    desk: 'lectern', plant: ['potted', { pot: '#efe9dc', palette: 'olive' }], bookshelf: ['shelf', { c: '#d8d0bc', items: 'scrolls' }], piano: ['harp', { s: 0.6 }],
    bath: ['pond', { edge: '#efe9dc', water: '#5fb5c9', r: 0.8 }], sink: ['jar', { handles: true, more: true }], tv: ['fresco', { wall: '#efe9dc', cols: ['#c9604a', '#efe6d0', '#2f5e8c', '#d9b45a', '#3f7a4a', '#1d1b1c'] }],
    fireplace: 'brazier', counter: ['bar', { c: '#efe9dc', top: '#d8d0bc' }], cabinet: ['trunk', { c: '#7a4a2a', band: '#d9b45a' }], lamp: 'oilLamp',
    tree: ['tree', { palette: 'olive' }], fountain: ['statue', { wreath: true }],
  },

  halloween: {
    bed: ['fourPoster', { wood: '#2a1d20', curtain: '#5a2a6a', sheet: '#ff7518', trim: '#8fd16a' }], sofa: ['sofa', { c: '#5a2a6a' }],
    armchair: ['wingback', { c: '#ff7518', wood: '#2a1d20' }], chair: ['chair', { c: '#ff7518', wood: '#c9a46a' }], rug: ['roundRug', { cols: ['#2a1838', '#ff7518', '#8fd16a'] }],
    bench: 'hayBale', table: ['longTable', { c: '#3a2420', items: 'sweets', cloth: '#5a2a6a' }], desk: ['lectern', { c: '#2a1d20', candle: true, book: '#5a2a6a' }],
    plant: ['pumpkin', { s: 1.2 }], bookshelf: ['shelf', { c: '#3a2420', items: 'potions' }], piano: ['upright', { c: '#2a1d20' }],
    bath: ['clawBath', { c: '#e8e2d2', water: '#c9e0a8' }], sink: ['bucket', { items: '#c0392b', fill: '#5fa5b5' }], tv: ['mirror', { c: '#2a1d20', glow: '#8fd16a' }],
    fireplace: ['fireplace', { c: '#5a3a5a' }], counter: ['counter', { c: '#3a2a40' }], cabinet: ['trunk', { c: '#5a2a6a', band: '#ff7518' }], lamp: 'jackLantern',
    tree: 'scarecrow', fountain: ['cauldron', { fire: true }],
  },

  easter: {
    bed: ['bed', { wood: '#c9a46a', sheet: '#f2a6c0' }], sofa: ['sofa', { c: '#b7d98a' }], armchair: ['armchair', { c: '#9ad0e0' }], chair: ['chair', { c: '#f6e08a', wood: '#f6f2ea' }],
    rug: ['roundRug', { cols: ['#f6f2ea', '#f6e08a', '#b7d98a'], petals: '#ffffff' }], bench: ['bench', { c: '#f6f2ea', wood: '#b7d98a' }],
    table: ['roundTable', { r: 0.5, c: '#f6f2ea', cloth: '#f6e08a', items: 'cake' }], desk: ['desk', { c: '#c9a46a' }], plant: ['potted', { pot: '#9ad0e0', flowers: '#f6d23a' }],
    bookshelf: ['shelf', { c: '#f6f2ea', items: 'eggs', cols: PASTEL }], piano: ['organ', { kind: 'harmonium', c: '#a8703f' }], bath: ['clawBath', { c: '#f2a6c0' }],
    sink: 'sink', tv: 'cuckoo', fireplace: ['breadOven', { c: '#f2a6c0' }], counter: 'chocFountain', cabinet: 'basket', lamp: ['lanternPost', { c: '#f2a6c0', post: '#f6f2ea' }],
    tree: ['tree', { palette: 'blossom' }], fountain: ['pond', { ducks: 3, edge: '#b7d98a' }],
  },

  carnival: {
    bed: ['fourPoster', { wood: '#2a1838', curtain: '#6a1f6e', sheet: '#f2c94c', trim: '#d9b44a' }], sofa: ['chaiseLongue', { c: '#6a1f6e' }], armchair: ['bergere', { c: '#e0283a' }],
    chair: ['stool', { kind: 'drum', c: '#6a1f6e', c2: '#f2c94c' }], rug: ['playMat', { cols: ['#e0283a', '#f2c94c', '#3fa08a', '#6a1f6e'] }], bench: ['bench', { c: '#2a1838', wood: '#d9b44a' }],
    table: ['roundTable', { r: 0.5, c: '#6a1f6e', cloth: '#f2c94c', items: 'sweets' }], desk: ['desk', { c: '#6a1f6e' }], plant: 'plumes', bookshelf: 'maskWall',
    piano: ['piano', { c: '#c9a46a' }], bath: ['clawBath', { c: '#efe4d0' }], sink: ['basin', { c: '#efe4d0' }], tv: ['mirror', {}], fireplace: ['fireplace', { marble: true }],
    counter: ['cabinet', { c: '#6a1f6e', w: 1.6 }], cabinet: 'wardrobe', lamp: ['candelabra', { arms: 7, drops: true }], tree: 'flowerFloat', fountain: ['fountain', { top: 'confetti' }],
  },

  lunar: {
    bed: ['fourPoster', { wood: '#1d1716', curtain: '#b3202c', sheet: '#e0b23a', trim: '#e0b23a' }], sofa: ['lacquerBench', { wood: '#7a1018', c: '#e0b23a', c2: '#1d1716' }],
    armchair: ['throne', { c: '#e0b23a', frame: '#b3202c', step: '#1d1716', gem: '#3f9a5a' }], chair: ['stool', { kind: 'drum', c: '#f6f2ea', c2: '#2f5d8a' }],
    rug: ['rug', { pal: ['#b3202c', '#f2d46a', '#1d1716'] }], bench: ['stoneBench', {}], table: 'lazySusan', desk: ['lowDesk', { c: '#7a1018' }],
    plant: ['potted', { pot: '#2f5d8a', flowers: '#ff8a1a', palette: 'dark' }], bookshelf: ['shelf', { c: '#7a1018', items: 'scrolls' }], piano: ['koto', { c: '#7a1018', cushion: '#e0b23a' }],
    bath: ['pond', { fish: 6, pads: 2, edge: '#9aa696' }], sink: ['basin', { c: '#5aa07a' }], tv: ['screen', { c: '#f2d46a', frame: '#b3202c', cols: ['#b3202c', '#1d1716', '#3f9a5a'] }],
    fireplace: ['brazier', { c: '#e0b23a' }], counter: 'steamers', cabinet: ['trunk', { c: '#b3202c', band: '#e0b23a' }],
    lamp: ['lanternPost', { c: '#d8263f', tassel: '#e0b23a', cap: '#e0b23a' }], tree: ['deco', { name: 'sakura', s: 1.8, h: 2.2 }], fountain: 'dragon',
  },

  forest: {
    bed: 'leafBed', sofa: 'log', armchair: 'rootThrone', chair: 'toadstoolSeat', rug: 'mossRug', bench: ['stump', { moss: true, r: 0.4 }], table: 'stumpTable',
    desk: ['lectern', { c: '#6b4a34', book: '#3f7a4a', glow: '#d8ff7a' }], plant: ['deco', { name: 'fern', s: 2.4, h: 1.2 }], bookshelf: ['shelf', { c: '#6b4a34', items: 'potions' }],
    piano: ['harp', { c: '#8a6a4a', leaves: true }], bath: ['pond', { pads: 4, reeds: true, edge: '#7a766e' }], sink: ['basin', { pedestal: false, h: 0.35 }],
    tv: ['mirror', { c: '#6b4a34', glow: '#bff4ff' }], fireplace: ['firePit', { logs: true }], counter: ['shelf', { c: '#6b4a34', items: 'jars', h: 0.9 }],
    cabinet: ['trunk', { c: '#8a5a36', band: '#5a8a3a', top: '#a8703f', lid: 'round' }], lamp: 'firefly', tree: ['tree', { h: 2.8, spread: 2, palette: 'green' }],
    fountain: ['well', { flowers: '#f2c94c', roof: '#5a8a3a' }],
  },

  xmas: {
    bed: ['logBed', { c: '#b3202c', c2: '#2f5a3a' }], sofa: ['sofa', { c: '#2f5a3a' }], armchair: ['throne', { c: '#b3202c', step: '#2f5a3a' }], chair: ['stool', { c: '#3f7a4a', cushion: '#b3202c' }],
    rug: ['roundRug', { cols: ['#b3202c', '#f6f2ea', '#2f5a3a'] }], bench: ['sleigh', { gifts: true }], table: ['longTable', { c: '#7a4a2a', cloth: '#b3202c' }],
    desk: ['lowDesk', { c: '#7a4a2a', scrolls: true }], plant: 'holly', bookshelf: ['shelf', { c: '#b3202c', items: 'toys' }], piano: ['organ', { kind: 'pipe', c: '#7a4a2a' }],
    bath: ['clawBath', { c: '#c27a4a', metal: true }], sink: ['bucket', { fill: '#f6f9fc' }], tv: 'snowGlobe', fireplace: ['fireplace', { stockings: true }],
    counter: ['breadOven', { c: '#b3202c' }], cabinet: 'sack', lamp: 'lightString', tree: 'xmasTree', fountain: ['deco', { name: 'snowman', s: 2.2, h: 1.8 }],
  },

  birthday: {
    bed: 'bunk', sofa: 'beanbag', armchair: ['throne', { c: '#ff4d8d', frame: '#5aa9e6', step: '#f2c94c', gem: '#f2c94c' }], chair: ['chair', { c: '#ff4d8d', wood: '#5aa9e6' }],
    rug: 'playMat', bench: 'cushionPile', table: ['roundTable', { r: 0.6, c: '#f6f2ea', cloth: '#5aa9e6', items: 'party' }], desk: ['trunk', { c: '#ff4d8d', band: '#f2c94c', w: 1.2 }],
    plant: 'balloons', bookshelf: ['shelf', { c: '#5aa9e6', items: 'games' }], piano: 'karaoke', bath: 'ballPit', sink: 'dispenser', tv: ['tv', { c: '#ff4d8d' }],
    fireplace: 'photoBooth', counter: ['shelf', { c: '#ff4d8d', items: 'jars', h: 0.9 }], cabinet: ['trunk', { c: '#b06ad8', band: '#f2c94c', stickers: true }],
    lamp: 'discoBall', tree: ['tree', { palette: 'lime' }], fountain: 'chocFountain',
  },

  love: {
    bed: 'heartBed', sofa: ['chaiseLongue', { c: '#e5384f' }], armchair: ['bergere', { c: '#ffb3c4' }], chair: ['gildedChair', { c: '#e5384f' }],
    rug: ['roundRug', { cols: ['#ffd6e0', '#e5384f', '#ffb3c4'], petals: '#c0283a' }], bench: ['bench', { c: '#ffb3c4', wood: '#d9b44a' }],
    table: ['roundTable', { r: 0.42, c: '#f6f2ea', cloth: '#e5384f', items: 'candle' }], desk: ['bureau', { c: '#f6e6ea', leather: '#e5384f' }],
    plant: ['deco', { name: 'rosebush', s: 2.0, h: 1.2 }], bookshelf: ['shelf', { c: '#f6e6ea', cols: ['#e5384f', '#ffb3c4', '#d9b44a', '#8e3b5a'] }],
    piano: ['harp', {}], bath: ['clawBath', { petals: '#e5384f' }], sink: ['basin', { c: '#f6e6ea', flowers: '#e5384f' }], tv: ['mirror', { crest: 'heart' }],
    fireplace: ['fireplace', { marble: true }], counter: ['counter', { c: '#7a3a2a' }], cabinet: ['trunk', { c: '#ffb3c4', band: '#d9b44a', w: 0.8 }],
    lamp: 'candelabra', tree: ['tree', { palette: 'blossom', flowers: '#e5384f', rate: 0.2 }], fountain: ['fountain', { top: 'cupid' }],
  },
};


/** Model name and params of an object type in a world (null: the classic model). */
export function kitEntry(theme, type) {
  const e = KITS[theme]?.[type];
  if (!e) return null;
  return Array.isArray(e) ? { model: e[0], params: e[1] ?? {} } : { model: e, params: {} };
}
