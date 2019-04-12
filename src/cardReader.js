const PN532 = require('pn532').PN532;
const SerialPort = require('serialport');
const gpio = require('rpi-gpio');
const gpiop = gpio.promise;
const Led = require('./led');

function cardReaderViaSerialPort(port = '/dev/ttyAMA0', cfg = { baudRate: 115200, pollInterval: 2000 }, portType = SerialPort) {
  const serialPort = new SerialPort(port, cfg);
  const nfcReader = new PN532(serialPort);
  return new CardReader(nfcReader, Date.now, 3000);
}

function CardReader(nfcReader, timer, pollingInterval) {
  this._reader = nfcReader;
  this.now = timer;
  this.pollingInterval = pollingInterval;
  return this.configureLeds().then(() => {
    this.yellow.blink(400)
    return this;
  });
}

CardReader.prototype.onTag = function onTag(callback) {
  this._reader.on('ready', () => {
    let lastTagDetected = 0;
    let lastUID = null;
    this._reader.on('tag', ({ uid }) => {
      const now = this.now();
      const ellapsedTime = now - lastTagDetected;
      if (uid !== lastUID || ellapsedTime > this.pollingInterval) {
        lastTagDetected = now;
        lastUID = uid;
        this.green.step(500);
        callback(uid);
      }
    });
  });
};

CardReader.prototype.configureLeds = function configureLeds() {
  const pins = [33, 35, 37].map(pinNumber => {
    return gpiop.setup(pinNumber, gpio.DIR_OUT)
      .then(() => pinNumber)
  })
  return Promise.all(pins)
    .then(([red, yellow, green]) => {
      this.yellow = new Led(yellow);
      this.green = new Led(green);
      this.red = new Led(red);
    })
};

exports.CardReader = CardReader;
exports.cardReaderViaSerialPort = cardReaderViaSerialPort;

