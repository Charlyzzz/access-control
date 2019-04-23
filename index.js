const { cardReaderViaSerialPort } = require('./src/cardReader');
const authorize = require('./src/reporter');
const configurePins = require('./src/pinout')

const BLINK_PERIOD = 400;
const DOOR_DELAY = 3000;

configurePins().then(pins => {
  const nfcReader = cardReaderViaSerialPort(pins);
  pins.yellow.blink(BLINK_PERIOD)

  nfcReader.onTag((uid) => {
    console.log('UUID: ', uid);
    authorize({ uid })
      .then(respuestaDeAutorizacion => {
        console.log(respuestaDeAutorizacion)
        if (respuestaDeAutorizacion.authorized) {
          pins.yellow.stopBlinking().then(() => {
            const doorOpen = [
              pins.green.step(DOOR_DELAY),
              pins.relay.step(DOOR_DELAY)
            ]
            Promise.all(doorOpen).then(() => {
              pins.yellow.blink(BLINK_PERIOD);
            })
          })
        } else {
          pins.red.step(500);
        }
      })
  })
});
