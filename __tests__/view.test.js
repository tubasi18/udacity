const { updateUI } = require('../src/client/js/view');

describe("updateUI() function", () => {
  test("should be defined", async () => {
    expect(updateUI).toBeDefined();
  });

  test('should be a function', async () => {
    expect(typeof updateUI).toBe("function");
  });
});
