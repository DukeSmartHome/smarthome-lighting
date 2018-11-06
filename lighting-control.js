// setup serialport library
const SerialPort = require('serialport');  // include serialport
const serialPort = new SerialPort('/dev/ttyUSB0', {baudRate: 9600});

const categories = ['all', 'social', 'rooms', 'bath', 'labs', 'outside'];
const lights = [
  ['Dirty Lab', [26], 'labs'],
  ['Clean Lab Cabinets', [3], 'labs'],
  ['Clean Lab', [4], 'labs'],
  ['Anuj & Matt', [6], 'rooms'],          // SW
  ['David & Ricardo', [7], 'rooms'],      // Downstairs
  ['Flo & Lauren', [9], 'rooms'],         // NW
  ['Elizabeth & Sakura', [21], 'rooms'],  // NE
  ['Mac & Rebecca', [28], 'rooms'],       // SE
  ['West Balcony', [35], 'outside'],
  ['Front Porch', [35], 'outside'],
  ['Back Porch', [36], 'outside'],
  ['Stairs', [12], 'social'],
  ['White Boards', [31], 'social'],
  ['Kitchen', [11], 'social'],
  ['Kitchen Cabinets', [38], 'social'],
  ['Main Room', [11, 12, 31], 'social'],
  ['Media Room', [20, 24], 'social'],
  ['Upper Floor', [0, 2], 'social'],
  ['East Upper Bathroom', [17], 'bath'],
  ['West Upper Bathroom', [15], 'bath'],
  ['West Lower Bathroom', [13], 'bath']
].sort((a, b) => {
  if (a[0] === b[0]) {
    return 0;
  } else {
    return (a[0] > b[0]) ? -1 : 1;
  }
});

const changeStatus = (status, whichLights) => {
  if (status == 'ON') {
    for (let w = 0; w < whichLights.length; ++w) {
      let whichLight = whichLights[w];
      let tempHex = whichLight.toString(16);
      if (tempHex.length == 1) tempHex = '0' + tempHex;
      let chksum = ((182 + whichLight) % 256).toString(2);
      let newsum = '';
      for (let i = 0, len = chksum.length; i < len; i++) {
        if (chksum[i] == '1')
          newsum += '0';
        else
          newsum += '1';
      }
      let cSum = (1 + parseInt(newsum, 2)).toString(16);
      let fullStr = '\\05380079' + tempHex + cSum;
      fullStr = fullStr.toUpperCase();
      let finalStr = '';
      for (let i = 0, len = fullStr.length; i < len; i++) {
        finalStr += fullStr[i].charCodeAt(0).toString(16);
      }
      console.log(whichLights[w] + ' ' + status + ' ' + finalStr + '0D');
      // write raw buffer input
      let buffer = new Buffer(finalStr + '0D', 'hex');
      serialPort.write(buffer);
    }
  } else {
    // turn lights off - same process as above
    for (let w = 0; w < whichLights.length; ++w) {
      let whichLight = whichLights[w];
      let tempHex = whichLight.toString(16);
      if (tempHex.length == 1) tempHex = '0' + tempHex;
      let chksum = ((62 + whichLight) % 256).toString(2);
      let newsum = '';
      for (let i = 0, len = chksum.length; i < len; i++) {
        if (chksum[i] == '1')
          newsum += '0';
        else
          newsum += '1';
      }
      let cSum = (1 + parseInt(newsum, 2)).toString(16);
      let fullStr = '\\05380001' + tempHex + cSum;
      fullStr = fullStr.toUpperCase();
      let finalStr = '';
      for (let i = 0, len = fullStr.length; i < len; i++) {
        finalStr += fullStr[i].charCodeAt(0).toString(16);
      }
      console.log(whichLights[w] + ' ' + status + ' ' + finalStr + '0D');
      let buffer = new Buffer(finalStr + '0D', 'hex');
      serialPort.write(buffer);
    }
  }
};
module.exports = {
  categories,
  lights,
  changeStatus
};