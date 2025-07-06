# marketplace-e2e-tests
Repo to house code needed for marketplace application tests

First time setup (run in terminal in the playwright-e2e-tests directory):
* NOTE! YOU WILL NEED TO DOWNLOAD AQUA IF YOU DON'T HAVE THE PAID VERSION OF INTELLIJ www.jetbrains.com/aqua/download
1. Set registry: `npm config set registry https://art.proginternal.net/artifactory/api/npm/nmpjs.org/`
2. `npm login` (if you get an error about a certificate you can disable certs with this command: (npm config set strict-ssl false)
3. Enter username and password
4. Remove playwright-qe-core dependency from package.json
5. Run `npm install`
6. Set registry: `npm config set registry https://art.proginternal.net/artifactory/api/npm/npm-release/`
7. Add playwright-qe-core dependency back in to package.json
8. Run `npm install`
9. Run a test and make sure it executes.


Run tests in BrowserStack cloud, or locally.

To run tests in BrowserStack cloud:
1) Look in package.json.
2) Look in the scripts element.
3) Copy and paste any of those values, then use it in a run command like the examples below.

npm run test:globalfooter:appandsociallinks:ios
npm run test:globalfooter:appandsociallinks:desktop


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