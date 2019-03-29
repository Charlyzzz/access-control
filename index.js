const CardReader = require('./cardReader')

const reader = new CardReader();

reader.onTag(console.log);