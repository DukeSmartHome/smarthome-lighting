// require spark
var Particle = require('particle-api-js'), particle = new Particle();

var key = require('./led-key.js');
var token = key.getToken(), ID = key.getID();


function callFxn(name, argument) {
  particle.callFunction(
      {deviceId: ID, name: name, argument: argument, auth: token});
}

module.exports = {
  ledUpdate: (type, rgbArray) => {
    console.log('LED control: ' + type);
    switch (type) {
      case 'off':
        callFxn('setRGB', 'off');
        break;
      case 'warm':
        callFxn('setRGB', '154,84,17');
        break;
      case 'on':
        callFxn('setRGB', '100,100,100');
        break;
      case 'high':
        callFxn('setRGB', '255,255,255');
        break;
      case 'red':
        callFxn('setRGB', '200,0,0');
        break;
      case 'green':
        callFxn('setRGB', '0,200,0');
        break;
      case 'blue':
        callFxn('setRGB', '0,0,200');
        break;
      case 'party':
        callFxn('lightParty', 'yolo');
        break;
    }
  }
};
