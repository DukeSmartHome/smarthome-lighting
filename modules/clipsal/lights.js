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

const categories = ['all', 'social', 'rooms', 'bath', 'labs', 'outside'];
const lights = [
  ['Dirty Lab', [26], 'labs'],
  ['Clean Lab Cabinets', [3], 'labs'],
  ['Clean Lab', [4], 'labs'],
  ['West Balcony', [35], 'outside'],
  ['Front Porch', [35], 'outside'],
  ['Back Porch', [36], 'outside'],
  ['Stairs', [12], 'social'],
  ['White Boards', [31], 'social'],
  ['Kitchen', [11], 'social'],
  ['Kitchen Cabinets', [38], 'social'],
  ['Main Room', [11, 12, 31], 'social'],
  ['Media Room', [20, 24], 'social'],
  ['Upper Floor', [0, 2], 'social'],
  ['East Upper Bathroom', [17], 'bath'],
  ['West Upper Bathroom', [15], 'bath'],
  ['West Lower Bathroom', [13], 'bath'],
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
  lights.forEach((light, i) => {
    if (light[1].length === 1 && light[1][0] === u) {  // unique match
      index = i;
    } else if (light[1].length > 1 && light[1].includes(u)) {
      index = i;
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