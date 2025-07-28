import { test, expect, BrowserContext, Page, chromium } from '@playwright/test';
import { A_BasePage } from '$pages/d2c.marketplace/A_BasePage';
import D2CMarketPlaceHealthCheck from './D2CMarketPlaceHealthCheck';
import urls from '$utils/d2cmarketplace.utils/urls';
import { normalizedURL } from '$utils/d2cmarketplace.utils/urls';

let browserContext: BrowserContext;
let page: Page;
let isHealthyLocal: Boolean;
let basePage: A_BasePage;

test.describe.skip('Global Footers Test Suite', () => {
    test.describe.configure({ retries: 0 });
    test.describe.configure({ mode: 'serial' });

    test.beforeAll(async ({ browser }) => {
        let browserTemp = await chromium.launch({ headless: true });
        let pageTemp = await browserTemp.newPage();
        isHealthyLocal = await new D2CMarketPlaceHealthCheck(pageTemp).isHealthy();
        await browserTemp.close();
        await pageTemp.close();
    });

    test.describe('Mobile apps and social media navigation links', () => {
        test.skip(isHealthyLocal == false, 'health check FAILED; test.skip()');
        test.beforeEach(async ({ browser }) => {
            browserContext = await browser.newContext();
            page = await browserContext.newPage();
            basePage = new A_BasePage(page);
            await basePage.onBasePage();
        });

        test('Verify iOS app link is working', { tag: ['@globalfooters', '@mobileapps', '@01'] }, async () => {
            const [newPage] = await Promise.all([
                browserContext.waitForEvent('page'),
                basePage.clickAppStoreLink()
            ]);
            await newPage.waitForLoadState();
            const actualURL: string = normalizedURL(newPage.url());
            expect(actualURL).toBe(urls.APP_STORE_URL.APP_STORE_URL);
            await newPage.close();
        })

        test('Verify Android app link is working', { tag: ['@globalfooters', '@mobileapps', '@02'] }, async () => {
            const [newPage] = await Promise.all([
                browserContext.waitForEvent('page'),
                basePage.clickPlayStoreLink()
            ]);
            await newPage.waitForLoadState();
            const actualURL: string = normalizedURL(newPage.url());
            expect(actualURL).toBe(urls.PLAY_STORE_URL.PLAY_STORE_URL);
            await newPage.close();
        })

        test('Verify facebook link is working', { tag: ['@globalfooters', '@socialmedialinks', '@03'] }, async () => {
            const [newPage] = await Promise.all([
                browserContext.waitForEvent('page'),
                basePage.clickFBLink()
            ]);
            await newPage.waitForLoadState();
            const actualURL: string = normalizedURL(newPage.url());
            expect(actualURL).toBe(urls.FB_URL.FB_URL);
            await newPage.close();
        })

        test('Verify instagram link is working', { tag: ['@globalfooters', '@socialmedialinks', '@04'] }, async () => {
            const [newPage] = await Promise.all([
                browserContext.waitForEvent('page'),
                basePage.clickIGLink()
            ]);
            await newPage.waitForLoadState();
            const actualURL: string = normalizedURL(newPage.url());
            expect(actualURL).toBe(urls.IG_URL.IG_URL);
            await newPage.close();
        })

        test.afterEach(async () => {
            await page.close();
            await browserContext.close();
        });
    })
})