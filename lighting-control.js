module.exports = {
    changeStatus: function (status, whichLights) {
        if (status == 'ON') {
            for (var w = 0; w < whichLights.length; ++w) {
                var whichLight = whichLights[w];
                var tempHex = whichLight.toString(16);
                if (tempHex.length == 1)
                    tempHex = "0" + tempHex;
                var chksum = ((182 + whichLight) % 256).toString(2);
                var newsum = "";
                for (var i = 0, len = chksum.length; i < len; i++) {
                    if (chksum[i] == '1') newsum += '0';
                    else newsum += '1';
                }
                var cSum = (1 + parseInt(newsum, 2)).toString(16);
                var fullStr = "\\05380079" + tempHex + cSum;
                fullStr = fullStr.toUpperCase();
                var finalStr = "";
                for (var i = 0, len = fullStr.length; i < len; i++) {
                    finalStr += fullStr[i].charCodeAt(0).toString(16);
                }
                // write raw buffer input
                var buffer = new Buffer(finalStr + "0D", "hex");
                serialPort.write(buffer);
            }
        } else {
            // turn lights off - same process as above
            for (var w = 0; w < whichLights.length; ++w) {
                var whichLight = whichLights[w];
                var tempHex = whichLight.toString(16);
                if (tempHex.length == 1)
                    tempHex = "0" + tempHex;
                var chksum = ((62 + whichLight) % 256).toString(2);
                var newsum = "";
                for (var i = 0, len = chksum.length; i < len; i++) {
                    if (chksum[i] == '1') newsum += '0';
                    else newsum += '1';
                }
                var cSum = (1 + parseInt(newsum, 2)).toString(16);
                var fullStr = "\\05380001" + tempHex + cSum;
                fullStr = fullStr.toUpperCase();
                var finalStr = "";
                for (var i = 0, len = fullStr.length; i < len; i++) {
                    finalStr += fullStr[i].charCodeAt(0).toString(16);
                }
                var buffer = new Buffer(finalStr + "0D", "hex");
                serialPort.write(buffer);
            }
        }
    }
}