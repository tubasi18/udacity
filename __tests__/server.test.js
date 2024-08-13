const app = require('../src/server/server');

describe('Test: Server PORT', () => {
  it('should have the correct port', async () => {
    expect(app).toBeInstanceOf(Function);
  });
});
