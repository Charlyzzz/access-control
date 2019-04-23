const gpio = require('rpi-gpio');
const gpiop = gpio.promise;

function Output(pin, _gpiop = gpiop) {
  this.pin = pin;
  this.gpiop = _gpiop;
  this.value = false;
  this.blinker = undefined;
}

Output.prototype.on = function on() {
  this.setValue(true);
};

Output.prototype.off = function off() {
  return this.setValue(false);
};

Output.prototype.isOn = function isOn() {
  return this.value;
};

Output.prototype.setValue = function setValue(newValue) {
  return this.gpiop.write(this.pin, newValue).then(() => this.value = newValue);
};

Output.prototype.blink = function blink(time) {
  if (this.blinker !== undefined) {
    clearInterval(this.blinker);
  }
  this.blinker = setInterval(() => this.setValue(!this.value), time);
};

Output.prototype.step = function step(duration) {
  this.setValue(true);
  setTimeout(() => this.off(), duration);
};


module.Led = Output;
module.Relay = Output;
