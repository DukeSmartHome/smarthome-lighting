// setup express
var express = require('express');
var app = express();
app.get('/', function (req, res) {
        res.sendFile(__dirname + '/index.html'); // load main page
    })
    .use(express.static(__dirname + '/public')); // setup static files


// setup favicon
var favicon = require('serve-favicon');
app.use(favicon(__dirname + '/public/favicon.ico'));


// setup http server
var http = require('http');
var http_server = http.Server(app);

http_server.listen(80, function () {
    console.log('Listening on port 80');
});


// require the lighting module
var lights = require('./lighting-control.js');


// require the LED module for RGB light strips
var leds = require('./led-control.js');

// socket.io module
var socket = require('./socket-io.js')
socket.setupSocket(http_server, lights, leds);