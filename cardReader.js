const PN532 = require('pn532').PN532;
const SerialPort = require('serialport');
const gpio = require('rpi-gpio');
const gpiop = gpio.promise;
const PIN = 37;

function cardReaderViaSerialPort(port = '/dev/ttyAMA0', cfg = { baudRate: 115200, pollInterval: 2000 }, portType = SerialPort) {
  const serialPort = new SerialPort(port, cfg);
  const nfcReader = new PN532(serialPort);
  return new CardReader(nfcReader, Date.now, 3000);
}

function CardReader(nfcReader, timer, pollingInterval) {
  this._reader = nfcReader;
  this.now = timer;
  this.pollingInterval = pollingInterval;
  this.startOperationalBeacon();
}

CardReader.prototype.onTag = function onTag(callback) {
  this._reader.on('ready', () => {

    let lastTagDetected = 0;
    let lastUID = null;
    this._reader.on('tag', ({ uid }) => {
      const now = this.now();
      const ellapsedTime = now - lastTagDetected;
      console.log('ellapsed', ellapsedTime);
      if (uid !== lastUID || now - lastTagDetected > this.pollingInterval) {
        lastTagDetected = now;
        lastUID = uid;
        callback(uid);
      }
    });
  });
};

CardReader.prototype.startOperationalBeacon = function startOperationalBeacon() {
  gpiop.setup(PIN, gpio.DIR_OUT)
    .then(() => {
      let ledValue = 1;
      setInterval(() => {
        console.log(ledValue);
        ledValue = ledValue === 1 ? 0 : 1;
      });
    });
};

exports.CardReader = CardReader;
exports.cardReaderViaSerialPort = cardReaderViaSerialPort;

