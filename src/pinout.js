const gpio = require('rpi-gpio');
const gpiop = gpio.promise;
const Output = require('./output');

const configurePins = () => {
  const pins = [33, 35, 37, 12].map(pinNumber => {
    return gpiop.setup(pinNumber, gpio.DIR_OUT)
      .then(() => pinNumber);
  });
  return Promise.all(pins)
    .then(([red, yellow, green, relay]) => {
      return {
        yellow: new Output(yellow),
        red: new Output(red),
        green: new Output(green),
        relay: new Output(relay)
      };
    });
};

module.exports = configurePins;
