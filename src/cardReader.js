const PN532 = require('pn532').PN532;
const SerialPort = require('serialport');
const logger = require('./logger');

function cardReaderViaSerialPort(pins, port = '/dev/ttyS0', cfg = { baudRate: 115200, pollInterval: 2000 }, portType = SerialPort) {
  const serialPort = new SerialPort(port, cfg);
  const nfcReader = new PN532(serialPort);
  return new CardReader(nfcReader, Date.now, pins, 3000);
}

function CardReader(nfcReader, timer, { red, yellow, green }, pollingInterval) {
  this._reader = nfcReader;
  this.now = timer;
  this.pollingInterval = pollingInterval;
  this.red = red;
  this.yellow = yellow;
  this.green = green;
}

CardReader.prototype.onTag = function onTag(callback) {
  this._reader.on('ready', () => {
    logger.info('card reader ready');
    let lastTagDetected = 0;
    let lastUID = null;
    this._reader.on('tag', ({ uid }) => {
      logger.info('tag detected');
      const now = this.now();
      const ellapsedTime = now - lastTagDetected;
      if (uid !== lastUID || ellapsedTime > this.pollingInterval) {
        lastTagDetected = now;
        lastUID = uid;
        callback(uid);
      }
    });
  });
};

exports.CardReader = CardReader;
exports.cardReaderViaSerialPort = cardReaderViaSerialPort;
