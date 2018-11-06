const io = require('socket.io')();
const {categories, lights, changeStatus} = require('./lighting-control.js');
const socketPort = 8000;
let statusData = new Array(lights.length).fill(false);

const setupSocket = () => {
  // setup socket.io
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
  io.listen(socketPort);
};

module.exports = setupSocket;