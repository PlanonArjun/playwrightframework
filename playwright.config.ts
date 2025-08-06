import { defineConfig, devices } from '@playwright/test';
import testData from './data/d2c.marketplace/testdata.json';

// Get env from CLI or default to QA
const envName = process.env.TEST_ENV || 'qa';
const baseUrl = testData.urls.marketplace.environments[envName].baseUrl;

if (!baseUrl) {
  throw new Error(`Invalid environment: ${envName}`);
}

const config = {
	testDir: './tests/',
	// testMatch: 'auth/pre_test_health_check_auth.spec.ts',

	/* Maximum time one test can run for. */
	timeout: 120 * 1000,
	/* For ProgWeb: timeout: 240 * 1000, */
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
	workers: 10,
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
		/* Base URL to use in actions like `await page.goto('/')`. 
		baseURL: 'http://localhost:3000',

		/* https://playwright.dev/docs/trace-viewer */
		baseURL: baseUrl,
		trace: 'retain-on-failure',

		/* [off(default)|on|only-on-failure] */
		screenshot: 'only-on-failure',

		/* [off(default)|on|retain-on-failure|on-first-retry] */
		/* NOTE this video setting is ignored by BrowserStack */
		// video: 'retain-on-failure',

		headless: true,

		ignoreHTTPSErrors: true,
	},

	/* Configure projects for major browsers */
	/* NOTE this section is ignored by BrowserStack */
	projects: [

		/* desktop */
		{
			name: 'chrome',
			use: {
				...devices['Desktop Chrome'],
				ignoreHTTPSErrors: true,
			},
		},
		{
			name: 'firefox',
			use: {
				...devices['Desktop Firefox'],
				ignoreHTTPSErrors: true
			},
		},
		{
			name: 'webkit',
			use: { ...devices['Desktop Safari'],
				ignoreHTTPSErrors: true
			},
		},

		/* mobile */
		{
			name: 'iPhone14',
			use: {
				...devices['iPhone 14'],
				"userAgent": "Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15 (HTML, like Gecko) Version/18.0 Mobile/15E148 Safari/604.1",
				"screen": {
					"width": 390,
					"height": 844
				},
				"viewport": {
					"width": 390,
					"height": 664
				},
				"deviceScaleFactor": 3,
				"isMobile": true,
				"hasTouch": false,
				"defaultBrowserType": "webkit",
				"ignoreHTTPSErrors": true
			},
		},
		{
			name: 'iPhone15Landscape',
			use: {
				...devices['iPhone 15 landscape'],
				"userAgent": "Mozilla/5.0 (iPhone; CPU iPhone OS 17_5 like Mac OS X) AppleWebKit/605.1.15 (HTML, like Gecko) Version/18.0 Mobile/15E148 Safari/604.1",
				"screen": {
					"width": 393,
					"height": 852
				},
				"viewport": {
					"width": 734,
					"height": 343
				},
				"deviceScaleFactor": 3,
				"isMobile": true,
				"hasTouch": false,
				"defaultBrowserType": "webkit",
				"ignoreHTTPSErrors": true
			},
		},
		{
			name: 'iPad',
			use: {
				...devices['iPad Pro 11 landscape'],
				"userAgent": "Mozilla/5.0 (iPad; CPU OS 12_2 like Mac OS X) AppleWebKit/605.1.15 (HTML, like Gecko) Version/18.0 Mobile/15E148 Safari/604.1",
				"viewport": {
					"width": 1194,
					"height": 834
				},
				"deviceScaleFactor": 2,
				"isMobile": true,
				"hasTouch": false,
				"defaultBrowserType": "webkit",
				"ignoreHTTPSErrors": true
			},
		},
		{
			name: 'Pixel7',
			use: {
				...devices['Pixel 7'],
				"userAgent": "Mozilla/5.0 (Linux; Android 14; Pixel 7) AppleWebKit/537.36 (HTML, like Gecko) Chrome/131.0.6778.33 Mobile Safari/537.36",
				"screen": {
					"width": 412,
					"height": 915
				},
				"viewport": {
					"width": 412,
					"height": 839
				},
				"deviceScaleFactor": 2.625,
				"isMobile": true,
				"hasTouch": false,
				"defaultBrowserType": "chromium",
				"ignoreHTTPSErrors": true
			},
		},
		{
			name: 'GalaxyS9',
			use: {
				...devices['Galaxy S9+'],
				"userAgent": "Mozilla/5.0 (Linux; Android 8.0.0; SM-G965U Build/R16NW) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.7049.17 Mobile Safari/537.36",
				"viewport": {
					"width": 320,
					"height": 658
				},
				"deviceScaleFactor": 4.5,
				"isMobile": true,
				"hasTouch": true,
				"defaultBrowserType": "chromium",
				"ignoreHTTPSErrors": true
			},
		},
		{
			name: "GalaxyTab",
			use: {
				...devices['Galaxy Tab S4'],
				"userAgent": "Mozilla/5.0 (Linux; Android 8.1.0; SM-T837A) AppleWebKit/537.36 (HTML, like Gecko) Chrome/132.0.6834.57 Safari/537.36",
				"viewport": {
					"width": 712,
					"height": 1138
				},
				"deviceScaleFactor": 2.25,
				"isMobile": true,
				"hasTouch": true,
				"defaultBrowserType": "chromium"
			},
		},


		/* Test against branded browsers. */
		/* NOTE you must have these installed on your local machine when running tests locally. */
		{
			name: 'Google Chrome',
			use: { ...devices['Desktop Chrome'], channel: 'chrome', "ignoreHTTPSErrors": true }, // or 'chrome-beta'
		},
		{
			name: 'Microsoft Edge',
			use: { ...devices['Desktop Edge'], channel: 'msedge', "ignoreHTTPSErrors": true }, // or 'msedge-dev'
		},
	],
};

module.exports = config;