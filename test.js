const {example_lib} = require('./index.js');

console.log(example_lib);

describe('Tests work', () => {
  it('Math is still a thing', () => {
    expect(1 + 1).toBe(2);
  });
});

describe('lib', () => {
  it('returns the right error text', () => {
    expect(example_lib.zlibVersion()).toBe('1.2.12');
  });
});
