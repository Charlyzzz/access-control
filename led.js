const gpio = require('rpi-gpio');
const gpiop = gpio.promise;

function Led(pin, _gpiop = gpiop) {
  this.pin = pin;
  this.gpiop = _gpiop;
  this.value = 0;
}

Led.prototype.on = function on() {
  this.setValue(1);
};

Led.prototype.off = function off() {
  return this.setValue(0);
};

Led.prototype.isOn = function isOn() {
  return this.value;
};

Led.prototype.setValue = function setValue(newValue) {
  return this.gpiop.write(this.pin, newValue).then(() => this.setValue(true));
};

module.exports = Led;
