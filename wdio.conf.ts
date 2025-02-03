import type { Options } from "@wdio/types";
import "@wdio/globals";

export const config: Options.Testrunner & {
  capabilities: WebdriverIO.Capabilities[];
} = {
  runner: "local",
  specs: ["./tests/**/*.test.ts"],
  exclude: [],
  maxInstances: 10,
  capabilities: [
    {
      browserName: "chrome",
      "goog:chromeOptions": {
        binary: "/usr/bin/chromium",
        args: [
          "--no-sandbox",
          "--disable-dev-shm-usage",
          "--headless",
          "--disable-gpu",
        ],
      },
    },
  ],
  logLevel: "info",
  bail: 0,
  waitforTimeout: 10000,
  connectionRetryTimeout: 120000,
  connectionRetryCount: 3,
  framework: "mocha",
  mochaOpts: {
    require: ["ts-node/register"],
    ui: "bdd",
    timeout: 60000,
  },
  reporters: ["spec"],
  services: [
    [
      "chromedriver",
      {
        version: "134.0.6988.0",
      },
    ],
  ],
  before: async function () {
    await browser.maximizeWindow(); // Ensures browser is recognized correctly
  },
};
