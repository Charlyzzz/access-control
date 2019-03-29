const { cardReaderViaSerialPort } = require('./cardReader');

const nfcReader = cardReaderViaSerialPort();

nfcReader.onTag((uid) => console.log('UUID: ', uid));
