
const {lights, unique, statusMap} = require('./clipsal/lights');

let statusData = new Array(lights.length).fill(false);
let io;

const initStatusData = (socketIO) => {
  io = socketIO;
};

const getStatusData = () => statusData;

const updateStatusData = (newUpdates) => {
  // merge updates with current status info
  const updates = {};
  unique.forEach((lightID, i) => {
    if (lightID in newUpdates) {
      updates[lightID] = newUpdates[lightID]
    } else {
      updates[lightID] = statusData[statusMap[lightID]];
    }
  });

  statusData = statusData.map((prevStatus, index) => {
    const groups = lights[index][1];
    if (groups.length === 1 && groups[0] in updates) {
      return updates[groups[0]];
    }
    // update for the whole group
    return groups.every(g => g in updates && updates[g]);
  });

  if (io) {
    io.sockets.emit('update', statusData);  // update all connected users
  }
};

module.exports = {
  initStatusData,
  getStatusData,
  updateStatusData,
}