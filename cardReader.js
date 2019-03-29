var PN532 = require('pn532').PN532;
var SerialPort = require('serialport');

function CardReader(port = '/dev/ttyAMA0', cfg = { baudRate: 115200 }) {
  const serialPort = new SerialPort(port, cfg);
  this._reader = new PN532(serialPort);

  this.onTag = (callback) => { this._reader.on('tag', callback) }
}

exports.CardReader = CardReader