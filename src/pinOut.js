const gpio = require('rpi-gpio');
const gpiop = gpio.promise;
const Led = require('./led');

const configurePins = () => {
  const pins = [33, 35, 37, 12].map(pinNumber => {
    return gpiop.setup(pinNumber, gpio.DIR_OUT)
      .then(() => pinNumber)
  })
  return Promise.all(pins)
    .then(([red, yellow, green, relay]) => {
      return {
        yellow: new Led(yellow),
        red: new Led(red),
        green: new Led(green),
        relay: new Led(relay)
      }
    })
};

module.exports = configurePins;
