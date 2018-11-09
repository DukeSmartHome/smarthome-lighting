// setup serialport library
const SerialPort = require('serialport');
const {categories, lights} = require('./lights');
const {decToHexByte, hexToASCII, computeCheckSum} = require('./math');

const commands = {
  init: ['~~~', 'A3210038g', 'A3420002g', 'A3300079g'],
  on: (whichLight) => '\\05380079' + decToHexByte(whichLight),
  off: (whichLight) => '\\05380001' + decToHexByte(whichLight),
};

const serialPort = new SerialPort('/dev/ttyUSB0', {baudRate: 9600});

const sendCommand = (command) => {
  const hexCommand = (command + computeCheckSum(command));
  const asciiCommand = hexToASCII(hexCommand.toUpperCase());
  serialPort.write(Buffer.from(asciiCommand, 'hex'));
};

const changeStatus = (on, whichLights) => {
  if (on) {
    whichLights.forEach(light => sendCommand(commands.on(light)));
  } else {
    whichLights.forEach(light => sendCommand(commands.off(light)));
  }
};

serialPort.on('open', () => {
  console.log('Serial port opened');
  commands.init.forEach(cmd => sendCommand(cmd));
});
serialPort.on('readable', () => {
  console.log('New data:', serialPort.read());
});

// examples and expected return values
// changeStatus(true, [20]);  // 5c3035333830303739313433360D

module.exports = {
  categories,
  lights,
  changeStatus
};
