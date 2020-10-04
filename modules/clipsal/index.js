// setup serialport library
const SerialPort = require('serialport');
const Delimiter = require('@serialport/parser-delimiter');
const {categories, lights, unique} = require('./lights');
const {decToHexByte, hexToASCII, computeCheckSum} = require('./math');
const {updateStatusData} = require('../statusData');

const commands = {
  init: ['~~~', 'A3210038g', 'A3420002g', 'A3300079g'],
  on: (whichLight) => '\\05380079' + decToHexByte(whichLight),
  off: (whichLight) => '\\05380001' + decToHexByte(whichLight),
};

// To check which serial port is available run ls /dev/tty* and look for ttyUSB, ttyAMA, or ttyACM
const serialPort = new SerialPort('/dev/ttyAMA0', {
  baudRate: 9600,
});

const sendCommand = (command) => {
  const hexCommand = (command + computeCheckSum(command)).toUpperCase() + 'g';
  const asciiCommand = hexToASCII(hexCommand);
  serialPort.write(Buffer.from(asciiCommand, 'hex'));
};

const changeStatus = (on, whichLights) => {
  // console.log(`Turning ${on ? 'on' : 'off'} ${whichLights}`);
  if (on) {
    whichLights.forEach(light => sendCommand(commands.on(light)));
  } else {
    whichLights.forEach(light => sendCommand(commands.off(light)));
  }
};

const parseGroups = (hexByteStr) => {
  const group = parseInt(hexByteStr, 16).toString(2).padStart(8, '0');
  const result = [];
  for (let i = 3; i >= 0; i--) {
    const statusBits = group[(i * 2) + 0] + group[(i * 2) + 1];
    result[3 - i] = statusBits === '01';
  }
  return result;
};

const parseMMI = (data) => {
  if (data.startsWith('D83800')) {
    let allGroups = [];
    for (let i = 6; i < data.length - 1; i += 2) {
      const hexByteStr = data[i] + data[i + 1];
      if (hexByteStr !== '00') {  // assume we've reached the end
        allGroups = allGroups.concat(parseGroups(hexByteStr));
      } else {
        break;
      }
    }
    let uniqueIndex = 0;
    const updates = {};
    allGroups.forEach((groupStatus, i) => {
      const lightID = unique[uniqueIndex];
      if (i === lightID) {
        uniqueIndex += 1;
        updates[lightID] = groupStatus;
      }
    });
    updateStatusData(updates);
  }
};

serialPort.on('open', () => {
  console.log('Serial port opened');
  commands.init.forEach(cmd => sendCommand(cmd));
  const parser = serialPort.pipe(new Delimiter({delimiter: '\n'}))
  parser.on('data', (data) => {
    parseMMI(data.toString());
  });
});

module.exports = {
  categories,
  lights,
  changeStatus
};
