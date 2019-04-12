const { cardReaderViaSerialPort } = require('./src/cardReader');
const reportNewTagDetected = require('./src/reporter');
const authorize = require('./src/sv');
const configurePins = require('./src/pinOut')

configurePins().then(pins => {
  const nfcReader = cardReaderViaSerialPort(pins);
  nfcReader.onTag((uid) => {
    console.log('UUID: ', uid);
    /*
    reportNewTagDetected({ uid, timestamp: Date.now() })
      .catch(console.error);
      */
    authorize({ uid }).then(console.log).catch(console.error);
  });
})
