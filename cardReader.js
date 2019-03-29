const PN532 = require('pn532').PN532;
const SerialPort = require('serialport');

function cardReaderViaSerialPort(port = '/dev/ttyAMA0', cfg = { baudRate: 115200, pollInterval: 3000 }, portType = SerialPort) {
  const serialPort = new SerialPort(port, cfg);
  const nfcReader = new PN532(serialPort);
  return CardReader(nfcReader);
}

function CardReader(nfcReader) {
  this._reader = new PN532(serialPort);
}

CardReader.prototype.onTag = function onTag(callback) {
  this._reader.on('ready', () => {
    this._reader.scanTag().then(callback);
  });
}

exports.CardReader = CardReader
exports.defaultReader = CardReader
