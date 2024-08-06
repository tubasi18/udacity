const { addTrip, deleteTrip } = require('../src/client/js/api');

describe("addTrip() function", () => {

  test("should be defined", async () => {
    expect(addTrip).toBeDefined();
  });

  test('should be a function', async () => {
    expect(typeof addTrip).toBe("function");
  });
});
describe("deleteTrip() function", () => {

  test("should be defined", async () => {
    expect(deleteTrip).toBeDefined();
  });

  test("should be a function", async () => {
    expect(typeof deleteTrip).toBe("function");
  });
});
