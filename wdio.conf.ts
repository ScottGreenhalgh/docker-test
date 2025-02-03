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
        args: [
          "--no-sandbox",
          "--disable-dev-shm-usage",
          "--headless",
          "--disable-gpu",
          `--user-data-dir=/tmp/chrome-profile`,
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
      "selenium-standalone",
      {
        installArgs: {
          drivers: {
            chrome: { version: "132.0.6834.159" },
          },
        },
        args: {
          drivers: {
            chrome: { version: "132.0.6834.159" },
          },
        },
      },
    ],
  ],
  before: async function () {
    await browser.maximizeWindow(); // Ensures browser is recognized correctly
  },
};
