// setup express
var express = require('express');
var app = express();

// setup serialport library
var SerialPort = require('serialport').SerialPort; // include serialport
var serialPort = new SerialPort("COM3", {
    baudRate: 9600
}, false);

// open serial port
serialPort.open(function (error) {
    if (error)
        console.log('failed to open: ' + error);
    else
        console.log('connection opened');
});

var http = require('http');
var http_server = http.Server(app);

// setup http server
http_server.listen(80, function () {
    console.log('Listening on port 80');
});

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

// setup static files
app.use(express.static(__dirname + '/public'));

var lights = require('lighting-control.js');

// setup socket.io
var io = require('socket.io')(http_server);

// socket.io: listen for user connections
io.on('connection', function (socket) {
    console.log('a user has connected');

    socket.on('disconnect', function () {
        console.log('user disconnected');
    });

    socket.on('change status', function (twoMsg) {
        // process socket message
        var msgStrs = twoMsg.split(".");
        var msg = msgStrs[0];
        var lightGroups = JSON.parse("[" + msgStrs[1] + "]");

        // use message
        lights.changeStatus(msg, lightGroups);
        console.log('Status: ', msg);
        io.sockets.emit('change status', twoMsg);
    });

});