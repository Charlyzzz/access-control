const { cardReaderViaSerialPort } = require('./src/cardReader');
const reportNewTagDetected = require('./src/reporter');
const authorize = require('./src/sv');
const configurePins = require('./src/pinOut')

configurePins().then(pins => {
  const nfcReader = cardReaderViaSerialPort(pins);
  pins.yellow.blink(400)

  nfcReader.onTag((uid) => {
    console.log('UUID: ', uid);
    /*
    reportNewTagDetected({ uid, timestamp: Date.now() })
      .catch(console.error);
      */
    authorize({ uid })
      .then(respuestaDeAutorizacion => {
        console.log(respuestaDeAutorizacion)
        const { estaAutorizado, nombre } = respuestaDeAutorizacion
        if (estaAutorizado) {
          pins.green.step(500);
        } else {
          pins.red.step(500);
        }
      })
  })
});
