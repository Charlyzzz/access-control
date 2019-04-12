const { cardReaderViaSerialPort } = require('./src/cardReader');
const reportNewTagDetected = require('./src/reporter');
cardReaderViaSerialPort().then((nfcReader) => {

  nfcReader.onTag((uid) => {
    console.log('UUID: ', uid);
    reportNewTagDetected({ uid, timestamp: Date.now() })
      .catch(console.error);
  });
})