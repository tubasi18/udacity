import { urlChecker } from "../src/client/js/urlChecker"

describe("Testing the submit functionality", () => {
  test("Testing the urlChecker() function", () => {
    expect(urlChecker).toBeDefined();
  })
});