const { cardReaderViaSerialPort } = require('./src/cardReader');
const authorize = require('./src/reporter');
const configurePins = require('./src/pinOut')

configurePins().then(pins => {
  const nfcReader = cardReaderViaSerialPort(pins);
  pins.yellow.blink(400)

  nfcReader.onTag((uid) => {
    console.log('UUID: ', uid);
    authorize({ uid })
      .then(respuestaDeAutorizacion => {
        console.log(respuestaDeAutorizacion)
        if (respuestaDeAutorizacion.estaAutorizado) {
          pins.green.step(500);
        } else {
          pins.red.step(500);
        }
      })
  })
});
