const decToHexByte = (decimal) => {
  let hexByte = decimal.toString(16);                // convert light to hex
  if (hexByte.length == 1) hexByte = '0' + hexByte;  // zero pad
  return hexByte;
};

const hexToASCII = (hexStr) => {
  let finalStr = '';
  for (let i = 0; i < hexStr.length; i++) {
    finalStr +=
        hexStr[i].charCodeAt(0).toString(16);  // convert hex string to ascii
  }
  return finalStr + '0D';
};

const computeCheckSum = (hexStr) => {
  // i=1 because we want to ignore the leading slash
  let byteSum = 0;
  for (let i = 1; i < hexStr.length - 1; i += 2) {
    byteSum += parseInt(hexStr[i] + hexStr[i + 1], 16);
  }
  const modded = (byteSum % 256).toString(2);  // take mod and convert to binary
  // compute two's complement (flip bits and add 1)
  let checkSumBinary = '';
  for (let i = 0; i < modded.length; i++) {
    checkSumBinary += modded[i] == '1' ? '0' : '1';
  }
  return (1 + parseInt(checkSumBinary, 2))
      .toString(16);  // convert checksum back to hex
};

module.exports = {
  decToHexByte,
  hexToASCII,
  computeCheckSum,
};
