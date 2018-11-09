const {verifyPassword, verifyToken, getToken} = require('./auth');
const {getStatusData, updateStatusData} = require('./statusData');
const {categories, lights, changeStatus} = require('./clipsal');

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
    const updates = {};
    changeStatus(isOn, lightIDs);  // change light status in clipsal hardware
    lightIDs.forEach((lightID) => {updates[lightID] = isOn});
    updateStatusData(updates);
  });
  const statusData = getStatusData();
  socket.emit('authenticated', {
    categories,
    lights,
    statusData,
  });
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

module.exports = {setupSocket};