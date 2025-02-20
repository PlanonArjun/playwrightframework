const config = {
	testDir: './tests/',

	/* Maximum time one test can run for. */
	timeout: 120 * 1000,
	expect: {
	  /**
	   * Maximum time expect() should wait for the condition to be met.
	   * For example in `await expect(locator).toHaveText();`
	   */
	  timeout: 5000,
	},
	/* Run tests in files in parallel */
	fullyParallel: true,
	/* tests in parallel */
	workers: 8,
	/* Reporter to use. See https://playwright.dev/docs/test-reporters */
	reporter: [
		['list'],
		// ['dot'],
		// ['html'],
		['html', { open: 'never' }], // [always|never|on-failure] // never when BrowserStack
		// ['json', {  outputFile: './test-results/results.json' }], // overwrite each time
	],
	retries: 0,
	use: {
		/* Maximum time each action such as `click()` can take. Defaults to 0 (no limit). */
		actionTimeout: 0,
		/* Base URL to use in actions like `await page.goto('/')`. */
		// baseURL: 'http://localhost:3000',

		/* https://playwright.dev/docs/trace-viewer */
		trace: 'retain-on-failure',

		/* [off(default)|on|only-on-failure] */
		screenshot: 'only-on-failure',

		/* [off(default)|on|retain-on-failure|on-first-retry] */
		/* NOTE this video setting is ignored by BrowserStack */
		// video: 'retain-on-failure',


		/* Any 1 of these viewports can be un-selected at a time. Rotate. */

		/* iPhone 14 Pro Max */
		// viewport: { width: 432, height: 932 },

		/* iPhone 14 XR */
		// viewport: { width: 414, height: 896 },

		/* iPad Pro 11 */
		viewport: { width: 834, height: 1194 },

		headless: true,

		ignoreHTTPSErrors: true,
	},

	/* Configure projects for major browsers */
	/* NOTE this section is ignored by BrowserStack */
	// projects: [
	//   {
	// 	name: 'chrome',
	// 	use: {
	// 	  browserName: 'chromium',
	// 	  channel: 'chrome',
	// 	},
	//   },
	// ],
  };

  module.exports = config;