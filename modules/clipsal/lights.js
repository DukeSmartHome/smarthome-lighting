const testLights = Array(50).fill(0).map((n, i) => [i, [i], 'outside']);

const categories = ['all', 'social', 'rooms', 'bath', 'labs', 'outside'];
const peopleRooms = [
  ['Alex', [6], 'rooms'],          // SW
  ['Alex', [7], 'rooms'],      // Downstairs
  ['Alex', [9], 'rooms'],         // NW
  ['Not Alex', [21], 'rooms'],  // NE
  ['Spud', [28], 'rooms'],       // SE
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
  ['Downstairs Bed Outlets 2', [10], 'rooms'],
  ['Kitchen Rail', [11], 'social'],
  ['Stairs Rail', [12], 'social'],
  ['Downstairs Bathroom', [13], 'bath'],
  ['West Upstairs Shower', [14], 'bath'],
  ['West Upstairs Bathroom', [15], 'bath'],
  ['Downstairs Shower', [16], 'bath'],
  ['East Upper Bathroom', [17], 'bath'],
  ['East Shower', [18], 'bath'],
  ['Basement', [19], 'labs'],
  ['Media Room Back Row', [20], 'social'],
  ['Back Staircase', [23], 'social'],
  ['Media Room Front Row', [24], 'social'],
  ['Media Outlets 1', [25], 'social'],
  ['Hardware Lab', [26], 'labs'],
  ['Hardware Lab East Cabinets', [27], 'labs'],
  ['SE Outlets', [29], 'rooms'],
  ['NW Outlets - Xu Fan', [30], 'rooms'],
  ['Atrium Sides', [31], 'social'],
  ['Basement Stairs', [32], 'labs'],
  ['Hardware Lab West Cabinets', [33], 'labs'],
  ['Upstairs Balcony', [34], 'outside'],
  ['Front Porch (East)', [35], 'outside'],
  // 36 is the pole light in the driveway. It's on a sunset-sunrise timer and manual control has been removed.
  ['Media Outlets 3', [37], 'social'],
  ['Kitchen Cabinets', [38], 'social'],
  ['Downstairs Bed Outlets 1', [39], 'rooms'],
  ['Lower Basement Stair', [42], 'labs'],
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
  ...peopleRooms,
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
