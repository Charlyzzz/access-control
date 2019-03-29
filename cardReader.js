var PN532 = require('pn532').PN532;
var SerialPort = require('serialport');

function CardReader(port = '/dev/ttyAMA0', cfg = { baudRate: 115200, pollInterval: 1500 }) {
  const serialPort = new SerialPort(port, cfg);
  this._reader = new PN532(serialPort);
}

CardReader.prototype.onTag = function onTag(callback) {
  this._reader.on('ready', () => {
    this._reader.on('tag', (tag) => callback(tag))
  });
}

module.exports = CardReader