const { CardReader } = require('../cardReader');

test('onTag waits to be ready first', () => {
  const fakeNfcReader = {}
  fakeNfcReader.on = jest.fn();
  const cardReader = new CardReader(fakeNfcReader);
  cardReader.onTag(new Function);
  expect(fakeNfcReader.on).toHaveBeenCalledWith('ready', expect.any(Function));
});