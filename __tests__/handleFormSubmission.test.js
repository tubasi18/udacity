const { handleFormSubmission, clearText } = require('../src/client/js/app');

describe("handleFormSubmission() function", () => {

  test("should be defined", async () => {
    expect(handleFormSubmission).toBeDefined();
  });

  test("should be a function", async () => {
    expect(typeof handleFormSubmission).toBe("function");
  });

});

describe("clearText() function", () => {

  test("should be defined", async () => {
    expect(clearText).toBeDefined();
  });

  test("should be a function", async () => {
    expect(typeof clearText).toBe("function");
  });

});
