// setup express
const express = require('express');
const path = require('path');
const app = express();
const favicon = require('serve-favicon');
const httpServer = require('http').createServer(app);
const io = require('socket.io')(httpServer);

const port = 8080;

// Set up static serving of front end:
app.use(express.static(path.join(__dirname, 'build')));  // HTML, CSS
app.use(favicon(__dirname + '/public/favicon.ico'));
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
httpServer.listen(port, () => console.log('Server started on port ' + port));

const setupSocket = require('./modules/socket-io.js');
setupSocket(io);
