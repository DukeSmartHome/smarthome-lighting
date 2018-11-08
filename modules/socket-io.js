const {categories, lights, changeStatus} = require('./lighting-control');
const {verifyPassword, verifyToken, getToken} = require('./auth');

let statusData = new Array(lights.length).fill(false);

const authenticate = (socket, data) => {
  console.log('a user has requested authentication');
  if ('token' in data) {
    const verified = verifyToken(data.token);
    // socket.emit('token', verified ? data.token : null);
    return verified;
  } else if ('password' in data) {
    const verified = verifyPassword(data.password);
    socket.emit('token', getToken(data.password));
    return verified;
  }
  return false;
};

const postAuthenticate = (io, socket) => {
  console.log('a user has authenticated successfully');
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
  socket.emit('authenticated', {categories, lights, statusData});
};

const setupSocket = (io) => io.on('connection', (socket) => {
  socket.on('authentication', (data) => {
    if (authenticate(socket, data)) {
      postAuthenticate(io, socket);
    } else {
      socket.emit('authenticated', false);
    }
  });
  socket.on('disconnect', () => console.log('user disconnected'));
});

module.exports = setupSocket;