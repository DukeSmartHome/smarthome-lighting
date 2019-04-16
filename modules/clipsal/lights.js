const testLights = Array(50).fill(0).map((n, i) => [i, [i], 'outside']);

const categories = ['all', 'social', 'rooms', 'bath', 'labs', 'outside'];
const peopleRooms = [
  ['Anuj & Matt', [6], 'rooms'],          // SW
  ['David & Ricardo', [7], 'rooms'],      // Downstairs
  ['Flo & Lauren', [9], 'rooms'],         // NW
  ['Elizabeth & Sakura', [21], 'rooms'],  // NE
  ['Mac & Rebecca', [28], 'rooms'],       // SE
];
const anonymizedRooms = [
  ['Southwest Bedroom', [6], 'rooms'],   // SW
  ['Downstairs Bedroom', [7], 'rooms'],  // Downstairs
  ['Northwest Bedroom', [9], 'rooms'],   // NW
  ['Northeast Bedroom', [21], 'rooms'],  // NE
  ['Southeast Bedroom', [28], 'rooms'],  // SE
];
const individualLights = [
  ['Loft Space', [0], 'social'],
  ['Main Ceiling', [2], 'social'],
  ['Computer Lab Cabinets', [3], 'labs'],
  ['Computer Lab', [4], 'labs'],
  ['Back Patio', [8], 'outside'],
  ['Kitchen Rail', [11], 'social'],
  ['Stairs Rail', [12], 'social'],
  ['Downstairs Bathroom', [13], 'bath'],
  ['West Upstairs Shower', [14], 'bath'],
  ['West Upstairs Bathroom', [15], 'bath'],
  ['Downstairs Shower', [16], 'bath'],
  ['East Upper Bathroom', [17], 'bath'],
  ['Basement', [19], 'labs'],
  ['Back Staircase', [23], 'social'],
  ['Hardware Lab', [26], 'labs'],
  ['White Boards', [31], 'social'],
  ['Basement Stairs', [32], 'labs'],
  ['Upstairs Balcony', [34], 'outside'],
  ['Front Porch (East)', [35], 'outside'],
  ['Kitchen Cabinets', [38], 'social'],
];
const groupLights = [
  ['Hardware Lab Cabinets', [27, 33], 'labs'],
  ['Main Room', [11, 12, 31], 'social'],
  ['Media Room', [20, 24], 'social'],
  ['All Outside', [8, 34, 35], 'outside'],
];

const lights = [
  ...individualLights,
  ...groupLights,
  ...anonymizedRooms,
].sort((a, b) => {
  if (a[0] === b[0]) {
    return 0;
  } else {
    return (a[0] > b[0]) ? -1 : 1;
  }
});

const uniqueLights = new Set();
lights.forEach(light => light[1].forEach(id => uniqueLights.add(id)));
const unique = Array.from(uniqueLights).sort((a, b) => a - b);
const statusMap = {};  // contains mappings from unique to lights
unique.forEach(u => {
  let index = -1;
  lights.some((light, i) => {
    if (light[1].length === 1 && light[1][0] === u) {  // single light
      index = i;
      return true;
    }
    if (light[1].length > 1 && light[1].includes(u)) {  // light group
      index = i;
      return true;
    }
  });
  statusMap[u] = index;
});

module.exports = {
  categories,
  lights,
  unique,
  statusMap,
};
