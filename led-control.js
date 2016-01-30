//require spark
var spark = require('spark');

// require led-key: include your own particle api key
var key = require('./led-key.js');

// login to spark/particle
spark.login({
    accessToken: key.getKey()
});

module.exports = {
    ledUpdate: function (type, rgbArray) {
        switch (type) {
        case 'off':
            spark.listDevices(function (err, devices) {
                devices[0].callFunction('setRGB', 'off');
            });
            break;
        case 'warm':
            spark.listDevices(function (err, devices) {
                devices[0].callFunction('setRGB', '154,84,17');
            });

            break;
        case 'on':
            spark.listDevices(function (err, devices) {
                devices[0].callFunction('setRGB', '100,100,100');
            });

            break;
        case 'high':
            spark.listDevices(function (err, devices) {
                devices[0].callFunction('setRGB', '255,255,255');
            });
            break;

            break;
        case 'red':
            spark.listDevices(function (err, devices) {
                devices[0].callFunction('setRGB', '200,0,0');
            });

            break;
        case 'green':
            spark.listDevices(function (err, devices) {
                devices[0].callFunction('setRGB', '0,200,0');
            });

            break;
        case 'blue':
            spark.listDevices(function (err, devices) {
                devices[0].callFunction('setRGB', '0,0,200');
            });
            break;
        case 'party':
            spark.listDevices(function (err, devices) {
                devices[0].callFunction('lightParty', 'yolo');
            });
            break;
        }
    }
};