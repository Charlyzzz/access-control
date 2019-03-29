const { defaultReader } = require('./cardReader')

const nfcReader = defaultReader();

nfcReader.onTag(console.log);