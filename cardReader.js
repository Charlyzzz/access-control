const PN532 = require('pn532').PN532;
const SerialPort = require('serialport');

function cardReaderViaSerialPort(port = '/dev/ttyAMA0', cfg = { baudRate: 115200, pollInterval: 1000 }, portType = SerialPort) {
  const serialPort = new SerialPort(port, cfg);
  const nfcReader = new PN532(serialPort);
  return new CardReader(nfcReader, Date);
}

function CardReader(nfcReader, timer) {
  this._reader = nfcReader;
  this.timer = timer;
  this.pollingInterval = 3000;
}

CardReader.prototype.onTag = function onTag(callback) {
  this._reader.on('ready', () => {
    let lastEvent = 0;
    this._reader.on('tag', (tag) => {
      const now = this.timer.now();
      const ellapsedTime = now - lastEvent;
      console.log("ellapsed", ellapsedTime);
      if (lastEvent == null || now - lastEvent > this.pollingInterval) {
        lastEvent = now;
        callback(tag);
      }
      lastEvent = now;
    });
  });
}

exports.CardReader = CardReader
exports.cardReaderViaSerialPort = cardReaderViaSerialPort

