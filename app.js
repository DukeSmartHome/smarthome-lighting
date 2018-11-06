// setup express
const express = require('express');
const path = require('path');
const app = express();
const favicon = require('serve-favicon');
const setupSocket = require('./socket-io.js');

// Set up static serving of front end:
app.use(express.static(path.join(__dirname, 'build')));  // HTML, CSS
app.use(favicon(__dirname + '/public/favicon.ico'));
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
app.listen(process.env.PORT || 8080);
setupSocket();
