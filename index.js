const { cardReaderViaSerialPort } = require('./src/cardReader');
const authorize = require('./src/reporter');
const configurePins = require('./src/pinout')

configurePins().then(pins => {
  const nfcReader = cardReaderViaSerialPort(pins);
  pins.yellow.blink(400)

  nfcReader.onTag((uid) => {
    console.log('UUID: ', uid);
    authorize({ uid })
      .then(respuestaDeAutorizacion => {
        console.log(respuestaDeAutorizacion)
        if (respuestaDeAutorizacion.authorized) {
          pins.green.step(500);
          pins.relay.step(3000)
        } else {
          pins.red.step(500);
        }
      })
  })
});
