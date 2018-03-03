// setup serialport library
let SerialPort = require('serialport'); // include serialport
let serialPort = new SerialPort("/dev/ttyUSB0", {
    baudRate: 9600
});

module.exports = {
    changeStatus: function (status, whichLights) {
        if (status == 'ON') {
            for (let w = 0; w < whichLights.length; ++w) { 
                let whichLight = whichLights[w];
                let tempHex = whichLight.toString(16);
                if (tempHex.length == 1)
                    tempHex = "0" + tempHex;
                let chksum = ((182 + whichLight) % 256).toString(2);
                let newsum = "";
                for (let i = 0, len = chksum.length; i < len; i++) {
                    if (chksum[i] == '1') newsum += '0';
                    else newsum += '1';
                }
                let cSum = (1 + parseInt(newsum, 2)).toString(16);
                let fullStr = "\\05380079" + tempHex + cSum;
                fullStr = fullStr.toUpperCase();
                let finalStr = "";
                for (let i = 0, len = fullStr.length; i < len; i++) {
                    finalStr += fullStr[i].charCodeAt(0).toString(16);
                }
                console.log(whichLights[w] + " " + status + " " + finalStr + "0D");
                // write raw buffer input
                let buffer = new Buffer(finalStr + "0D", "hex");
                serialPort.write(buffer);
            }
        } else {
            // turn lights off - same process as above
            for (let w = 0; w < whichLights.length; ++w) {
                let whichLight = whichLights[w];
                let tempHex = whichLight.toString(16);
                if (tempHex.length == 1)
                    tempHex = "0" + tempHex;
                let chksum = ((62 + whichLight) % 256).toString(2);
                let newsum = "";
                for (let i = 0, len = chksum.length; i < len; i++) {
                    if (chksum[i] == '1') newsum += '0';
                    else newsum += '1';
                }
                let cSum = (1 + parseInt(newsum, 2)).toString(16);
                let fullStr = "\\05380001" + tempHex + cSum;
                fullStr = fullStr.toUpperCase();
                let finalStr = "";
                for (let i = 0, len = fullStr.length; i < len; i++) {
                    finalStr += fullStr[i].charCodeAt(0).toString(16);
                }
                console.log(whichLights[w] + " " + status + " " + finalStr + "0D");
                let buffer = new Buffer(finalStr + "0D", "hex");
                serialPort.write(buffer);
            }
        }
    }
}