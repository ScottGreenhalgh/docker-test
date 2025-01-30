import { expect } from "chai";

describe("Example Test", () => {
  it("should have the correct title after hydration", async () => {
    await browser.url("http://localhost:3000"); // next js default port
    const hydrationCompleteElement = await browser.$(
      '[data-test-id="hydration-complete"]'
    );

    await browser.waitUntil(
      async () => await hydrationCompleteElement.isDisplayed(),
      {
        timeout: 5000,
        timeoutMsg: "Hydration marker did not appear in time",
        interval: 500,
      }
    );

    const title = await browser.getTitle();
    expect(title).to.equal("Test");
  });
});
