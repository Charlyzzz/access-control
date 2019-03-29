const { cardReaderViaSerialPort } = require('./cardReader')

const nfcReader = cardReaderViaSerialPort();

nfcReader.onTag(console.log);
