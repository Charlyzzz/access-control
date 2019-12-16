const {createLogger, format, transports} = require('winston');

var logger = createLogger({

  format: format.combine(
    format.timestamp(),
    format.json()
  ),
  transports: [
    new transports.Console()
  ],
  exitOnError: false
});

module.exports = logger;
