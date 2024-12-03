// Import handleSubmit function
const getPolarity = require('../src/client/js/formHandler');

// Test the function
test('Get the polarity of the article', () => {
  expect(getPolarity('AGREEMENT')).toBe('Positive');
});