import { test, expect, BrowserContext, Page, chromium } from '@playwright/test';
import { A_BasePage } from '$pages/d2c.marketplace/A_BasePage';
import urls from '../../utils/d2cmarketplace.utils/urls';
import D2CMarketPlaceHealthCheck from './D2CMarketPlaceHealthCheck';

let browserContext: BrowserContext;
let page: Page;
let isHealthyLocal: Boolean;
let basePage: A_BasePage;

test.describe('Global Headers Test Suite', () => {
    test.describe.configure({ retries: 0 });
    test.describe.configure({ mode: 'serial' });

    test.beforeAll(async ({ browser }) => {
        let browserTemp = await chromium.launch({ headless: true });
        let pageTemp = await browserTemp.newPage();
        isHealthyLocal = await new D2CMarketPlaceHealthCheck(pageTemp).isHealthy();
        await browserTemp.close();
        await pageTemp.close();
    });

    test.describe('ProgLeasing Logo Tests', () => {
        test.skip(isHealthyLocal == false, 'health check FAILED; test.skip()');
        test.beforeEach(async ({ browser }) => {
            browserContext = await browser.newContext();
            page = await browserContext.newPage();
            basePage = new A_BasePage(page);
            await basePage.onBasePage();
        });

        test('Verify PL Logo is clickable and takes user to home screen', { tag: ['@globalheaders', '@pllogo', '@01'] }, async () => {
            await basePage.clickPLLogo();
            const actualHomeURL: string = await basePage.getCurrentURL();
            expect(actualHomeURL).toBe(urls.HOME_PAGE_URL.HOME_PAGE_URL);
        })

        test.skip('Validate that the logo is displayed on all pages on global header', { tag: ['@globalheaders', '@pllogo', '@02'] }, async () => {
            //TBD
        })

        test.skip('Validate the css attributes of logo as per brand guidelines', { tag: ['@globalheaders', '@pllogo', '@03'] }, async () => {
            //TBD
        })

        test.afterEach(async () => {
            await page.close();
            await browserContext.close();
        });
    })
})


