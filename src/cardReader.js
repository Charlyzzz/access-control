const { nfc } = require('nfc');
const logger = require('./logger');

function cardReaderViaSerialPort(pins) {
  const nfcReader = new nfc.NFC();;
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
  logger.debug('card reader ready');
  let lastTagDetected = 0;
  let lastUID = null;
  this._reader.on('read', ({ uid }) => {
    if (uid) {
      logger.debug('tag detected');
      const now = this.now();
      const ellapsedTime = now - lastTagDetected;
      if (uid !== lastUID || ellapsedTime > this.pollingInterval) {
        lastTagDetected = now;
        lastUID = uid;
        callback(uid);
      }
    } else {
      this._reader.stop();
    }
  }).on('error', (err) => {
    console.trace(1)
    logger.error(err)
    process.exit(1);
  }).on('stopped', (err) => {
    console.trace(2)
    logger.error(err)
    process.exit(1);
  }).start();
};

exports.CardReader = CardReader;
exports.cardReaderViaSerialPort = cardReaderViaSerialPort;
