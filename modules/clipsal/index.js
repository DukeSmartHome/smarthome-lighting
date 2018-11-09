// setup serialport library
const SerialPort = require('serialport');
const {categories, lights} = require('./lights');
const {decToHexByte, hexToASCII, computeCheckSum} = require('./math');

const serialPort = new SerialPort('/dev/ttyUSB0', {baudRate: 9600});

serialPort.on('readable', () => {
  console.log('New data:', serialPort.read());
});

const commands = {
  on: '\\05380079',
  off: '\\05380001',
};

const getCommand = (command, whichLight) => {
  const baseCommand = command + decToHexByte(whichLight);
  const hexCommand = (baseCommand + computeCheckSum(baseCommand));
  return hexToASCII(hexCommand.toUpperCase());
};

const changeStatus = (on, whichLights) => {
  const status = on ? 'ON' : 'OFF';
  if (on) {
    whichLights.forEach(light => {
      const bufferCmd = getCommand(commands.on, light);
      console.log(light + ' ' + status + ' ' + bufferCmd);
      serialPort.write(Buffer.from(bufferCmd, 'hex'));
    });
  } else {
    whichLights.forEach(light => {
      const bufferCmd = getCommand(commands.off, light);
      console.log(light + ' ' + status + ' ' + bufferCmd);
      serialPort.write(Buffer.from(bufferCmd, 'hex'));
    });
  }
};

// examples and expected return values
// changeStatus(true, [20]);  // 5c3035333830303739313433360D

module.exports = {
  categories,
  lights,
  changeStatus
};
