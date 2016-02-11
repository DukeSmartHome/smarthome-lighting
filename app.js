// Load Libraries 
var express = require('express');
var app  = express();
var server = require('http').Server(app);
var bodyParser = require('body-parser');

// Set up body parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

// Set up static serving of front end:
app.use(express.static(__dirname + '/public')); // HTML, CSS


// setup favicon
var favicon = require('serve-favicon');
app.use(favicon(__dirname + '/public/favicon.ico'));


// setup http server



// require the lighting module
var lights = require('./lighting-control.js');


// require the LED module for RGB light strips
var leds = require('./led-control.js');

// socket.io module
var socket = require('./socket-io.js')
socket.setupSocket(server, lights, leds);

// Routes
require('./config/routes')(app);

exports = module.exports = app;
if (!module.parent) {
  var port = process.env.PORT || 8080; // 8080 as default
  // On Linux make sure you have root to open port 80
  app.listen(port, function() {
    console.log('Listening on port ' + port);
  });
}
