// Per-theme look of the diorama (puzzle.theme): the plinth border around the
// board (where the row and column labels live), its edge colours and props,
// the kind of wall between rooms, the fence around open-air areas and the
// low marker between two open-air areas (they are not rooms: no wall).
//
// border: [pattern, colour 1, colour 2]; side / rim: plinth colours; ink: labels
// wall:  plaster | stone | sandstone | marble | rock | planks | logs | metal | shoji | coral | canvas
// fence: picket | hedge | coral | bamboo | iron | rocks | rope | rail | snow | palisade
// open:  hedge | pebbles | shells | rocks | rope | line | snow
// deco:  props scattered on the border (corners and the right-hand side)
export const STYLES3D = {
  manor: { border: ['parquet', '#d9b88a', '#a8845a'], side: '#8a6446', rim: '#4a3426', ink: '#3a2c26', wall: 'plaster', fence: 'picket', open: 'hedge', deco: ['bush', 'flowers', 'lamp', 'bush', 'rock'] },
  mermaids: { border: ['water', '#4fb3c6', '#e6fbff'], side: '#2f6f8a', rim: '#1d4a5e', ink: '#ffffff', wall: 'coral', fence: 'coral', open: 'shells', deco: ['coralTree', 'kelp', 'shells', 'pearls', 'kelp', 'rock'] },
  japan: { border: ['sand', '#ece6d6', '#cfc6b0'], side: '#5a3b26', rim: '#2a2523', ink: '#3a2c26', wall: 'shoji', fence: 'bamboo', open: 'pebbles', deco: ['sakura', 'lanternStone', 'bamboo', 'rock', 'bonsai'] },
  paris: { border: ['cobble', '#b8b0a2', '#7e7668'], side: '#5a5048', rim: '#2e2a26', ink: '#ffffff', wall: 'plaster', fence: 'iron', open: 'pebbles', deco: ['lamp', 'flowers', 'bush', 'bench', 'lamp'] },
  regency: { border: ['grass', '#9ccc7a', '#6fa456'], side: '#7a8a5a', rim: '#3e4a2e', ink: '#ffffff', wall: 'plaster', fence: 'hedge', open: 'hedge', deco: ['topiary', 'rosebush', 'topiary', 'fountainSmall', 'rosebush'] },
  egypt: { border: ['sand', '#ecd08a', '#c9a456'], side: '#c4a060', rim: '#7a5a2a', ink: '#5a3a1a', wall: 'sandstone', fence: 'rocks', open: 'rocks', deco: ['palm', 'jar', 'rock', 'palm', 'dryBush', 'obelisk'] },
  pirates: { border: ['water', '#3f9fb8', '#dff6fb'], side: '#6b4a2b', rim: '#3a2618', ink: '#ffffff', wall: 'planks', fence: 'rope', open: 'rope', deco: ['palm', 'barrel', 'crate', 'rock', 'palm', 'cannonballs'] },
  western: { border: ['sand', '#d9b27a', '#a8804c'], side: '#8a5a32', rim: '#4a2e18', ink: '#4a2e18', wall: 'planks', fence: 'rail', open: 'rail', deco: ['cactus', 'barrel', 'hay', 'cactus', 'rock', 'dryBush'] },
  space: { border: ['metal', '#4a5466', '#232833'], side: '#2e343e', rim: '#15181e', ink: '#bfe9ff', wall: 'metal', fence: 'rail', open: 'line', deco: ['antenna', 'canisters', 'crate', 'canisters', 'dish'] },
  haunted: { border: ['cobble', '#5a5660', '#34303a'], side: '#3a3440', rim: '#1a171e', ink: '#e8dcff', wall: 'stone', fence: 'iron', open: 'pebbles', deco: ['deadTree', 'pumpkin', 'tomb', 'candles', 'deadTree', 'bones'] },
  medieval: { border: ['grass', '#9ac06a', '#6f9a48'], side: '#6e6258', rim: '#3a332c', ink: '#ffffff', wall: 'stone', fence: 'palisade', open: 'hedge', deco: ['bush', 'hay', 'barrel', 'banner', 'tree', 'rock'] },
  prehistory: { border: ['grass', '#a8c070', '#7f9a50'], side: '#7a6248', rim: '#3e3022', ink: '#3a2a1a', wall: 'rock', fence: 'rocks', open: 'rocks', deco: ['fern', 'rock', 'bones', 'fern', 'logs', 'tree'] },
  circus: { border: ['straw', '#e6cc80', '#c09a4a'], side: '#c0283a', rim: '#6e1420', ink: '#6e1420', wall: 'canvas', fence: 'rail', open: 'line', deco: ['balloons', 'popcorn', 'barrel', 'ball', 'balloons'] },
  train: { border: ['cobble', '#8a8478', '#5e5a52'], side: '#4a3a2e', rim: '#221a14', ink: '#ffffff', wall: 'planks', fence: 'rail', open: 'line', deco: ['lamp', 'suitcase', 'crate', 'bush', 'lamp'] },
  chalet: { border: ['snow', '#f4f8fc', '#cfdbe8'], side: '#7a5a3a', rim: '#3e2c1c', ink: '#3a2c26', wall: 'logs', fence: 'snow', open: 'snow', deco: ['pine', 'snowman', 'pine', 'logs', 'rock', 'pine'] },
  world: { border: ['water', '#4fb0d8', '#e8fbff'], side: '#2f7aa0', rim: '#1a4a66', ink: '#ffffff', wall: 'plaster', fence: 'rail', open: 'line', deco: ['palm', 'suitcase', 'rock', 'flowers', 'palm'] },
  rome: { border: ['marble', '#efe9dc', '#bdb39c'], side: '#c8bea8', rim: '#6e6450', ink: '#5a3a2a', wall: 'marble', fence: 'rocks', open: 'pebbles', deco: ['cypress', 'jar', 'column', 'cypress', 'bush'] },
};

export const styleFor = (theme) => STYLES3D[theme] ?? STYLES3D.manor;

// Colours of the wall materials (plaster walls use each room's own colour)
export const WALL_COLORS = {
  stone: ['#8e8a82', '#a9a296', '#76726a'],
  sandstone: ['#d4ac6a', '#c49a58', '#b8884a'],
  marble: ['#f2ede2', '#e6dfd0', '#d8d0bc'],
  rock: ['#8a8070', '#a09682', '#6e665a'],
  planks: ['#a8703f', '#8a5a36', '#b98552'],
  logs: ['#9a6a3e', '#7a5232', '#b07a48'],
  metal: ['#9aa6b4', '#7a8696', '#b8c2ce'],
  coral: ['#f08a7e', '#f0a8c4', '#b56ad8', '#e8743a'],
  canvas: ['#c0283a', '#f6f2ea'],
};
