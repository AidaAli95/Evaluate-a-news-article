const isValid = require('../src/client/js/urlChecker');

test('Check that the url is valid', () => {
  expect(isValid('https://www.udacity.com')).toBe(true);
});