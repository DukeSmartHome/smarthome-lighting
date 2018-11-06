const setupSocket = (io) => {
  const {categories, lights, changeStatus} = require('./lighting-control.js');
  let statusData = new Array(lights.length).fill(false);
  io.on('connection', (socket) => {
    console.log('a user has connected');
    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
    socket.on('led', (msg) => {
      leds.ledUpdate(msg);
    });
    socket.on('update', (message) => {
      const {isOn, lightIDs} = message;
      const newStatus = isOn ? 'ON' : 'OFF';
      changeStatus(newStatus, lightIDs);
      statusData = statusData.map((status, index) => {
        return lights[index][1].every(val => lightIDs.includes(val)) ? isOn :
                                                                       status;
      });
      console.log(lightIDs, newStatus);
      io.sockets.emit('update', statusData);  // update all connected users
    });
    socket.emit('init', {categories, lights, statusData});
  });
};

module.exports = setupSocket;