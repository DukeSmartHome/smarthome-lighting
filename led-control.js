//require spark
var spark = require('spark');
// login to spark/particle
spark.login({
    accessToken: 'bd49c429e68203cb6314fab4b900b45255ef8a3e'
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