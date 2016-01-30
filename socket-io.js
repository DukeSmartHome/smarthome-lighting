module.exports = {
    setupSocket: function (http_server, lights, leds) {
        // setup socket.io
        var io = require('socket.io')(http_server);

        io.on('connection', function (socket) {
            console.log('a user has connected');

            socket.on('disconnect', function () {
                console.log('user disconnected');
            });

            socket.on('led', function (msg) {
                leds.ledUpdate(msg);
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
    }
}