
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
  console.log(statusData.length);

  let valueChanged = false;
  statusData = statusData.map((prevStatus, index) => {
    const groups = lights[index][1];
    let newStatus;
    if (groups.length === 1 && groups[0] in updates) {
      newStatus = updates[groups[0]];
    } else {
      newStatus = groups.every(g => updates[g]);
    }
    if (!valueChanged && newStatus !== prevStatus) {
      valueChanged = true;
    }
    return newStatus;
  });

  if (valueChanged && io) {
    io.sockets.emit('update', statusData);  // update all connected users
  }
};

module.exports = {
  initStatusData,
  getStatusData,
  updateStatusData,
}