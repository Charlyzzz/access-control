const { cardReaderViaSerialPort } = require('./src/cardReader');
const reportNewTagDetected = require('./src/reporter');
const nfcReader = cardReaderViaSerialPort().then(() => {
  nfcReader.onTag((uid) => {
    console.log('UUID: ', uid);
    reportNewTagDetected({ uid, timestamp: Date.now() })
      .catch(console.error);
  });
});

