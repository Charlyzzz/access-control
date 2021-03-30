const logger = require('./src/logger');

const { cardReaderViaSerialPort } = require('./src/cardReader');
const authorize = require('./src/reporter');
const configurePins = require('./src/pinout');

const BLINK_PERIOD = 400;
const DOOR_DELAY = 3000;

logger.info('Starting system');
logger.debug('Configuring IO');
configurePins()
  .then(pins => {
    logger.debug('IO configured');
    const nfcReader = cardReaderViaSerialPort(pins);

    nfcReader.onTag((uid) => {
      logger.info({ UUID: uid });
      pins.yellow.blink(BLINK_PERIOD);
      authorize({ uid })
        .then(respuestaDeAutorizacion => {
          logger.info(respuestaDeAutorizacion);
          pins.yellow.stopBlinking().then(() => {
            if (respuestaDeAutorizacion.authorized) {
              pins.green.step(DOOR_DELAY);
              pins.relay.step(DOOR_DELAY);
            } else {
              pins.red.step(800);
            }
          });
        }).catch((error) => {
          logger.error(error);
        });
    });
  })
  .catch(error => {
    logger.error(error);
    process.exit(1);
  });
