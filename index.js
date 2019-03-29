const { cardReaderViaSerialPort } = require('./cardReader');
const reportNewTagDetected = require('./reporter');
const nfcReader = cardReaderViaSerialPort();

nfcReader.onTag((uid) => {
  console.log('UUID: ', uid);
  reportNewTagDetected(uid);
});
