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
        args: ["--headless", "--disable-gpu", "--window-size=1920x1080"],
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
  services: ["selenium-standalone"],
  hostname: "selenium",
  port: 4444, // selenium default port
  path: "wd/hub", // default path for webdriver requests
  before: async function () {
    await browser.maximizeWindow(); // Ensures browser is recognized correctly
  },
};
