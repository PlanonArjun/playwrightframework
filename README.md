# playwright-e2e-tests
Test Repo for all things e2e, will be using this for our e2e project initiative

First time setup (run in terminal in the playwright-e2e-tests directory):
1. Set registry: `npm config set registry https://art.proginternal.net/artifactory/api/npm/npm-release/`
2. Run `npm install`
3. Run a test and make sure it executes.


Run tests in BrowserStack cloud, or locally.

To run tests in BrowserStack cloud:
1) Look in package.json.
2) Look in the scripts element.
3) Copy and paste any of those values, then use it in a run command like the examples below.

npm run test:woo:auth:ios
npm run test:woo:product:desktop


To run tests locally:
1) Look in playwright.config.ts.
2) Look in the projects element.
3) Copy and paste any of those name values (under desktop or mobile), then use it in run commands like the examples below.

And keep in mind that there are more command line arguments than show here.

But in almost all cases, if you are running locally, you will want to include the --headed flag.

/* run all tests found on a Galaxy emulator */
npx playwright test --project=GalaxyS9 --headed

/* run all tests found on an iPad emulator then display results in a web page to include the trace */
npx playwright test --project=iPad --headed --reporter=html --trace=on

/* run only my_test.spec.ts on an iPhone on landscape */
npx playwright test ./tests/my_test.spec.ts --project=iPhone15Landscape --headed