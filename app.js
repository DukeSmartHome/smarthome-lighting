// setup express
var express = require('express');
var app = express();
app.get('/', function (req, res) {
        res.sendFile(__dirname + '/index.html'); // load main page
    })
    .use(express.static(__dirname + '/public')); // setup static files


// setup http server
var http = require('http');
var http_server = http.Server(app);

http_server.listen(80, function () {
    console.log('Listening on port 80');
});


// require the lighting module
var lights = require('./lighting-control.js');


// setup socket.io
var io = require('socket.io')(http_server);

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

        // toggle lights
        lights.changeStatus(msg, lightGroups);
        console.log('Status: ', msg);

        // edit combo
        io.sockets.emit('change status', twoMsg);

        // edit individual lights, if any
        if (lightGroups.length > 1) {
            for (var w = 0; w < lightGroups.length; ++w) {
                io.sockets.emit('change status', msg + "." + lightGroups[w]);
            }
        }
    });
});