# marketplace-e2e-tests
Repo to house code needed for marketplace application tests
Overview:

marketplace-e2e-tests   project automates end-to-end UI testing for Prog Leasing website using Playwright and TypeScript. The project is a cloned version of the playwright-e2e-tests project where tests relevant to the marketplace application are kept and maintained. It is designed to test the website across multiple environments (e.g. qa, stage) both locally and on BrowserStack cloud infrastructure. In the current state of the project, the tests are supported to run on desktop browsers.

Objectives:

Validate core user workflows through key customer journeys in the website automatically.

Ensure application health by running regression tests.

Provide cross-browser test coverage on desktop using BrowserStack driven by configuration.

Enable rapid feedback via test reports and logs.

Support config-driven execution to minimize script updates when UI changes.

Technology Stack:

Component

Description

Playwright

Automation framework for UI testing (supports Chromium, Firefox, WebKit)

TypeScript

Typed JavaScript language used for improved readability and maintainability

BrowserStack SDK

Integration for running Playwright tests on cloud browsers

Node.js

JavaScript runtime used for executing the Playwright test

VS Code

Recommended IDE for development and debugging

GIT & Github

Version control system and code repository

Project Structure

marketplace-e2e-tests/
│
├── 📁 data/d2c.marketplace/                            # test data json config file and product mapping
├── 📁 pages/d2c.marketplace/                           # Page Object Model classes
├── 📁 tests/d2c.marketplace/                           # All test specs (.spec.ts files)
├── 📁 utils/d2c.marketplace/                           # utility enum constants and helper classes
│
├── 📄 .eslintrc                        # Linting configuration
├── 📄 .gitignore                       # Git ignore rules
├── 📄 .prettierrc                      # Prettier code formatter config
│
├── 📄 browserstack.android            # BrowserStack yml config for Android
├── 📄 browserstack.api                # BrowserStack yml config for API tests
├── 📄 browserstack.config             # Generic BrowserStack configuration
├── 📄 browserstack.desktop            # BrowserStack yml config for Desktop
├── 📄 browserstack.ios                # BrowserStack yml config for iOS
│
├── 📄 global-setup                    # Global setup script for Playwright
├── 📄 package.json                    # Project metadata and npm scripts
├── 📄 package-lock.json               # Exact dependency versions
│
├── 📄 playwright.config.ts            # Main Playwright config file
├── 📄 playwright.api.config           # Playwright config for API tests
├── 📄 playwright.browserstack.config  # Playwright config for BrowserStack
├── 📄 playwright.ios.config           # Playwright config for iOS tests
│
├── 📄 README                          # Project documentation
├── 📄 tsconfig.json                   # TypeScript compiler configuration

Features:

Feature

Description

Environment-Driven Execution

Tests can dynamically adapted or defaulted to QA, staging, etc. using CLI or env vars. 

Configurable Locators

Text-based or regex-based HTML texts are defined in JSON for easy updates.

Cross-Browser Support

Run tests locally or in BrowserStack across multiple browsers in desktop

Serial Execution, Headless or headed execution

Fine-grained control using test.describe.configure() or CLI flags.

Health Check Before Tests

beforeAll checks if the app is up before running tests. Fail-Fast Health Checks to avoid running tests on a down service.

Structured Reporting

HTML reports generated via Playwright; logs can be emailed or shared.

Test Structure

This section describes how the test code is organized within the project, including the purpose of each folder and naming conventions.

Test Files (/tests/d2c.markeplace Folder): 

Purpose: Contain the actual test scenarios (.spec.ts files) and the health check TS file.

Scenarios: In the current state of project, the tests consists of 5 scenarios which are referred to as customer journeys. In each scenario, the user either applies for the leasing process for a particular product offered by a specific retailer, or, estimates the leasing cost for the same. Both the actions takes the user to another application which is out of this project’s scope. If the store type is Online, then user is displayed with QR code on PDP page, which takes the user to the Mobile app.

Naming Conventions: Each file is named as customerjourney<scenarionumber>_<actiontype>.spec.ts. The <actiontype> , as in the current state, has 3 values; leaseonline, estimatecost, availableonapp. Example: customerjourney1_leaseonline.spec.ts

Structure inside each spec file:  The parent describe() block is named as Regression Suite. This block has configuration steps for serial execution and retries. It also houses 2 blocks; beforeAll() and inner describe(). beforeAll() block performs the health check of the website in an isolated session. The inner describe() has 3 blocks; beforeEach(), test(), afterEach(). The beforeEach() is the hook responsible for the setup like initializing the browser context and loading the home page of website. If there is a health check failure, this block skips the entire test. The test() block consists of the actual test steps. The afterEach()block is responsible for tear down actions, like, closing the page and browser context.

test.describe('Regression Suite', () => {
    test.beforeAll(async ({ browser }) => {
    });

    test.describe('Key Customer Journey 1', () => {
        test.beforeEach(async ({ browser }) => {
        });

        test('Lease Online from Grand Parent Retailer page', { tag: ['@regression', '@kcj1'] }, async () => {
            //user lands on home page and click on shop retailers icon

            //provide a city for location 

            //land on retailers page and perform basic assertions like url header and location

            //go to location modal screen again and click cancel update
            
            //go to location modal screen again and update city location
            
            //User search for and click the first search suggestion
            
            //User lands on grand parent retailer detail page and verifies relevant information
            
            //User clicks on Lease Online Button to proceed with leasing process
            
        })

        test.afterEach(async () => {
        });
    })
})

Page Objects (/pages/d2c.markeplace Folder):

Purpose: Encapsulate UI element selectors and page-level actions and assertions which are called upon by tests.

Number of Pages: In the current state of the project, there are a total of 6 page classes created and they are; A_BasePage, B_HomePage, C_RetailersIndexPage, D_RetailersDetailPage, E_ProductDetailsPage, F_ShopAllListPage. The user facing locators have been used in the page classes as much as possible which goes in-line with playwright best practice guidance. However, for some of the elements, xpaths have been used. The page texts for the element locators are driven by JSON config file.

Naming Convention: AlphabeticalSerialPrefix_PascalCase

Utilities (/utils/d2c.markeplace Folder):

Purpose: Holds ENUM constants which are being leveraged for comparison against input test data. It has helper class like Formatter and can also contain other helper classes in future to improve Reusability principle. 

Test Data (/data/d2c.markeplace Folder):

Purpose: The purpose if to keep test data JSON file and product mapping TS file. The JSON config file consists of; pageTexts, env specific urls, endpoints, external urls and input test data.

{
    "pageTexts": {
        "basePage": {
            
        },
        "homePage": {
          
        },
        "retailersIndexPage": {
            
        },
        "retailersDetailPage": {
            
        },
        "productDetailsPage": {
            
        },
        "shopAllListPage": {
            
        }
    },
    "urls": {
        "marketplace": {
            "environments": {
                "qa": {
                    "baseUrl": "BASE_URL"
                },
                "staging": {
                    "baseUrl": "BASE_URL"
                },
                "production": {
                    "baseUrl": "BASE_URL"
                }
            },
            "endpoints": {
                
            }
        },
        "social": {
            
        },
        "mobileApps": {
            
        },
        "external": {
            "pl": {
                
            }
        }
    },
    "pageTitle": {
        
    },
    "location": {
        
    },
    "shopCategories": {
        
    },
    "filterCategories": {
        
    },
    "leaseToOwnOptionsFilter": {
        
    },
    "retailerFilter": {
        
    },
    "brandFilter": {
        
    },
    "featuredRetailers": {
        
    },
    "search": {
        "products": {
            
        },
        "retailers": {
            
        }
    }
}

 

Config Files:

playwright.config.ts: Main Playwright configuration (baseURL, retries, reporter, projects, etc.).

browserstack.*.yml: Configurations for different BrowserStack environments.

tsconfig.json: TypeScript compilation settings.

Project Setup

Prerequisites:

Node.js >= 20x

NPM >= 9.x

GIT

Gitbash

VS Code

Access to PL Github Enterprise

Installation Steps

Start Gitbash terminal

Clone the project 

git clone https://github.com/Prog-Leasing-LLC-Legacy/marketplace-e2e-tests.git 

cd marketplace-e2e-tests

Open the project in VS Code and start a terminal. (You can continue in Gitbash as well)

Set registry:

npm config set registry https://art.proginternal.net/artifactory/api/npm/nmpjs.org/

Remove playwright-qe-core dependency from package.json (markeplace-e2e-tests consumes this package, so we need to make sure it is installed in a correct way from dependencies)



Before Snippet Removal

After Snippet Removal

{
  "name": "marketplace-e2e-tests",
  "version": "1.0.0",
  "description": "Contains all the component level and customer journey UI tests for D2C marketplace application",
  "main": "index.js",
  "scripts": {
    "test:customerjourney1:leaseonline:desktop": "npx browserstack-node-sdk playwright test d2c.marketplace/customerjourney1_leaseonline.spec.ts --workers=1 --browserstack.config=./browserstack.desktop.yml --config=./playwright.config.ts",
    "test:customerjourney2:estimatecost:desktop": "npx browserstack-node-sdk playwright test d2c.marketplace/customerjourney2_estimatecost.spec.ts --workers=1 --browserstack.config=./browserstack.desktop.yml --config=./playwright.config.ts",
    "test:customerjourney3:availableonapp:desktop": "npx browserstack-node-sdk playwright test d2c.marketplace/customerjourney3_availableonapp.spec.ts --workers=1 --browserstack.config=./browserstack.desktop.yml --config=./playwright.config.ts",
    "test:customerjourney4:leaseonline:desktop": "npx browserstack-node-sdk playwright test d2c.marketplace/customerjourney4_leaseonline.spec.ts --workers=1 --browserstack.config=./browserstack.desktop.yml --config=./playwright.config.ts",
    "test:customerjourney5:estimatecost:desktop": "npx browserstack-node-sdk playwright test d2c.marketplace/customerjourney5_estimatecost.spec.ts --workers=1 --browserstack.config=./browserstack.desktop.yml --config=./playwright.config.ts"
     },
  "repository": {
    "type": "git",
    "url": "git+https://github.com/Prog-Leasing-LLC-Legacy/marketplace-e2e-tests.git"
  },
  "private": false,
  "keywords": [],
  "author": "",
  "license": "ISC",
  "bugs": {
    "url": "https://github.com/Prog-Leasing-LLC-Legacy/marketplace-e2e-tests/issues"
  },
  "devDependencies": {
    "@nestjs/common": "^11.0.10",
    "@playwright/test": "^ 1.51.0",
    "browserstack-node-sdk": "^1.34.42",
    "x2js": "^3.4.4",
    "playwright-qe-core": "^1.0.1"
  },
  "homepage": "https://github.com/Prog-Leasing-LLC-Legacy/marketplace-e2e-tests#readme"
}


{
  "name": "marketplace-e2e-tests",
  "version": "1.0.0",
  "description": "Contains all the component level and customer journey UI tests for D2C marketplace application",
  "main": "index.js",
  "scripts": {
    "test:customerjourney1:leaseonline:desktop": "npx browserstack-node-sdk playwright test d2c.marketplace/customerjourney1_leaseonline.spec.ts --workers=1 --browserstack.config=./browserstack.desktop.yml --config=./playwright.config.ts",
    "test:customerjourney2:estimatecost:desktop": "npx browserstack-node-sdk playwright test d2c.marketplace/customerjourney2_estimatecost.spec.ts --workers=1 --browserstack.config=./browserstack.desktop.yml --config=./playwright.config.ts",
    "test:customerjourney3:availableonapp:desktop": "npx browserstack-node-sdk playwright test d2c.marketplace/customerjourney3_availableonapp.spec.ts --workers=1 --browserstack.config=./browserstack.desktop.yml --config=./playwright.config.ts",
    "test:customerjourney4:leaseonline:desktop": "npx browserstack-node-sdk playwright test d2c.marketplace/customerjourney4_leaseonline.spec.ts --workers=1 --browserstack.config=./browserstack.desktop.yml --config=./playwright.config.ts",
    "test:customerjourney5:estimatecost:desktop": "npx browserstack-node-sdk playwright test d2c.marketplace/customerjourney5_estimatecost.spec.ts --workers=1 --browserstack.config=./browserstack.desktop.yml --config=./playwright.config.ts"
     },
  "repository": {
    "type": "git",
    "url": "git+https://github.com/Prog-Leasing-LLC-Legacy/marketplace-e2e-tests.git"
  },
  "private": false,
  "keywords": [],
  "author": "",
  "license": "ISC",
  "bugs": {
    "url": "https://github.com/Prog-Leasing-LLC-Legacy/marketplace-e2e-tests/issues"
  },
  "devDependencies": {
    "@nestjs/common": "^11.0.10",
    "@playwright/test": "^ 1.51.0",
    "browserstack-node-sdk": "^1.34.42",
    "x2js": "^3.4.4"
  },
  "homepage": "https://github.com/Prog-Leasing-LLC-Legacy/marketplace-e2e-tests#readme"
}


Run

npm install

If Step 6 causes SELF_SIGNED_CERT_IN_CHAIN error, then run:

npm config set strict-ssl false
npm config set registry https://art.proginternal.net/artifactory/api/npm/nmpjs.org/
Note: The artifactory url has got change
New: npm config set registry https://progleasing.jfrog.io/artifactory/api/npm/npmjs/
npm install

Set registry:

npm config set registry https://art.proginternal.net/artifactory/api/npm/npm-release/
Note: The artifactory url has got change
New: npm config set registry https://progleasing.jfrog.io/artifactory/api/npm/npm-release/

Add playwright-qe-core dependency back in to package.json

Run

npm install

Run a test and make sure it executes.

npx playwright test d2c.marketplace/customerjourney1_leaseonline.spec.ts --project='chrome' --workers=1 --headed
npx playwright test d2c.marketplace/customerjourney2_estimatecost.spec.ts --project='chrome' --workers=1 --headed
npx playwright test d2c.marketplace/customerjourney3_availableonapp.spec.ts --project='chrome' --workers=1 --headed
npx playwright test d2c.marketplace/customerjourney4_leaseonline.spec.ts --project='chrome' --workers=1 --headed
npx playwright test d2c.marketplace/customerjourney5_estimatecost.spec.ts --project='chrome' --workers=1 --headed




Environment Configuration

JSON-Based Env URLs:

Located at: data/d2c.markeplace/testData.json. The structure is show above in Test Data section.

Reading ENV in Code:

This is handled in playwright.config.ts

const envName = process.env.TEST_ENV || 'staging';
const baseUrl = testData.urls.marketplace.environments[envName].baseUrl;

This baseUrl is then configured in use property as below

const config = {
  use: {
    baseURL = baseUrl;
    }
  }

Injecting ENV in Commands:

If the env is not injected in command, then the default value of env will be used, which is, staging, in above snippet.

On Windows (CMD/PowerShell):

$env:TEST_ENV="qa"
npx playwright test

On Mac/Linux:

TEST_ENV=qa npx playwright test

Validations & Matchers

Use await expect() for most checks:

expect(await this.cityOrZipInputBox.getAttribute('value')).toContain(city)

Fixtures & Hooks

beforeAll, beforeEach, etc. hooks can be used inside the test files. Use of chromium.launch() should be avoided in Browserstack. Always use browser fixture.

BrowserStack Integration

Prerequisites:

Access to PL BrowserStack account.

Set up credentials BROWSERSTACK_USERNAME and BROWSERSTACK_ACCESS_KEY either in browserstack.*.yml file or as environment variables (Preferred)

Platforms: 

Choice of platform should be set in browserstack.*.yml. The example shown below is of browserstack.desktop.yml.

platforms:
  - os: Windows
    osVersion: '11'
    browserName: playwright-chromium
    browserVersion: '131'
  # - os: Windows
  #   osVersion: '11'
  #   browserName: playwright-firefox
  #   browserVersion: '132'
  # - os: Windows
  #   osVersion: '10'
  #   browserName: Chrome
  #   browserVersion: '132'

BrowserStack API:

The last assertion step must be wrapped inside a try/catch block, where browserstack_executor should be used for status reporting.

Special command string sent to BrowserStack using page.evaluate() to mark the test as passed or failed.

Required for status reporting in BrowserStack's Automate Dashboard.

The command is formatted in JSON, wrapped inside a template literal.

Example: 

try {
                    await expect(page).toHaveURL(new RegExp(testData.urls.external.pl.leaseOnlinePartial), { timeout: 10000 });
                    await page.evaluate(_ => { }, `browserstack_executor: ${JSON.stringify({ action: 'setSessionStatus', arguments: { status: 'passed', reason: 'Customer Journey 4' } })}`);
                } catch (Error) {
                    await page.evaluate(_ => { }, `browserstack_executor: ${JSON.stringify({ action: 'setSessionStatus', arguments: { status: 'failed', reason: Error.toString() } })}`);
                }

On your BrowserStack Automate dashboard:

This code updates the test status with either:

🟢 Passed (with reason: "Customer Journey 4")

🔴 Failed (with the error message from the failed assertion)

Test Execution

Local Execution: 

To run the tests locally, following command should be used

npx playwright test d2c.marketplace/customerjourney1_leaseonline.spec.ts --project='chrome' --workers=1 --headed

Explanation of Each Parameter:

Segment

Description

npx playwright test

Runs Playwright tests using npx (no need to globally install).

d2c.marketplace/customerjourney1_leaseonline.spec.ts

Specifies the relative path to the test file or folder to execute.

--project='chrome'

Runs the test using the chrome project as defined in your playwright.config.ts under the projects array. Make sure a project with the name 'chrome' exists in your config.

--workers=1

Forces tests to run serially using a single worker (thread). Useful for debugging or when tests can't be parallelized. If --workers=2, then tests are split across 2 workers (threads), meaning multiple tests run concurrently.

--headed

Runs tests in a visible browser window (i.e., not headless). Helpful for debugging or visually verifying flow. By default, headless mode is set in playwright.config.ts

playwright.config.ts Snippet for Chrome Project:

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
		}
   ]

BrowserStack Execution:

To run the tests in BrowserStack, following command should be used

npx browserstack-node-sdk playwright test d2c.marketplace/customerjourney1_leaseonline.spec.ts --workers=1 --browserstack.config=./browserstack.desktop.yml --config=./playwright.config.ts

Segment

Purpose

npx browserstack-node-sdk

Invokes the BrowserStack Node.js SDK wrapper for executing Playwright tests on BrowserStack infrastructure.

playwright test

The actual Playwright test command that triggers your suite or spec file.

d2c.marketplace/customerjourney1_leaseonline.spec.ts

Specifies the relative path to the test file or folder to execute.

--workers=1

Forces tests to run serially using a single worker (thread). Useful for debugging or when tests can't be parallelized. If --workers=2, then tests are split across 2 workers (threads), meaning multiple tests run concurrently.

--browserstack.config=./browserstack.desktop.yml

Specifies the custom BrowserStack YAML config file with your credentials, browsers, OS, and run configurations.

--config=./playwright.config.ts

Points to your local Playwright configuration file, ensuring your custom settings like testDir, timeout, baseURL, etc., are respected during the run.

Command Alias in package.json:

"scripts": {
    "test:customerjourney1:leaseonline:desktop": "npx browserstack-node-sdk playwright test d2c.marketplace/customerjourney1_leaseonline.spec.ts --workers=1 --browserstack.config=./browserstack.desktop.yml --config=./playwright.config.ts"
     }

Running below command would work the same.

npm run test:customerjourney1:leaseonline:desktop

Handling BrowserStack Local Cache Issues: If the above command runs into [BrowserstackCLI] bootstrap: failed to bootstrap=Error: spawn EBUSY or bootstrap: failed to bootstrap=TypeError: The "file" argument must be of type string. Received null, then run:

#Kill existing BrowserStack Local processes:
taskkill /IM binary-win-x64.exe /F

#Delete and re-download binary:
Remove-Item "$env:USERPROFILE\.browserstack" -Recurse -Force -ErrorAction SilentlyContinue

After performing the above mentioned fix, try running the browserstack execution command and it should work.

Note: If same issue occurs again, then either try restarting the terminal or execute the browserstack test execution command for second time (cache issue). It has been observed that the above issue in this case no longer appears. 

Handling _bidiChromium: expected channel BrowserType: Ensure the browser capability in BrowserStack config is one of chrome, edge, playwright-chromium, playwright-webkit, playwright-firefox and matches Playwright version compatibility. During the project setup, the latest versions of playwright/test and browserstack-node-sdk within the defined boundary gets installed. It is possible that the two versions might not be compatible. The version compatibility needs to be checked and installed accordingly.

Test Reports

Local Test Reports:

After test run:

npx playwright show-report

To share:

Zip .playwright-report/

Or host report on internal server

BrowserStack Test Reports: 

After test execution:

Each session is listed under your Browserstack Automate Dashboard

Each test includes:

Video recording

Console/Text logs

Public links to individual test sessions can be shared

To identify the test:

Use buildName or projectName in your browserstack.desktop.yml config (This has already been set)

Approach towards Implementation of Script Updates

Keeping test scripts up-to-date with ongoing product changes is crucial for maintaining automation relevance and reliability. Below is a structured approach for implementing updates to test scripts:

1. Understand the Scope of Change

Analyze the feature update, bug fix, or new feature.

Refer to:

User stories / Jira tickets

UI/UX designs

2. Impact Assessment

Identify:

Affected test scripts (tests.d2cmarketplace/)

Page Objects (pages.d2cmarketplace/)

Utilities, constants, or test data

Check for reusable components across features.

3. Update Test Data

Modify or extend testData.json to include:

New selector texts, endpoint paths, or test inputs

Environment-specific configuration (if needed)

4. Update or Create Page Object Methods

Modify the Page Object to reflect new UI behavior.

5. Update Test Scripts

Modify existing tests to reflect new flow or validations.

Add new tests if functionality is expanded.

6. Add or Update Assertions

Use meaningful assertions to verify outcomes.

7. Test Locally

Run tests locally using the commands as described above.

Validate the tests in 3 browsers (The browser configuration in projects section can be checked in playwright.config.ts file)

8. Test on BrowserStack

Run updated scripts on BrowserStack to ensure cross-browser stability:

9. Code Review & Merge

Raise a PR

Ensure review comments are addressed

Merge with main branch
