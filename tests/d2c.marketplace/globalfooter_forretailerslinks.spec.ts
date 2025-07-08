import { test, expect, BrowserContext, Page, chromium } from '@playwright/test';
import { A_BasePage } from '$pages/d2c.marketplace/A_BasePage';
import D2CMarketPlaceHealthCheck from './D2CMarketPlaceHealthCheck';
import urls from '$utils/d2cmarketplace.utils/urls';

let browserContext: BrowserContext;
let page: Page;
let isHealthyLocal: Boolean;
let basePage: A_BasePage;

test.describe('Global Footers Test Suite', () => {
    test.describe.configure({ retries: 0 });
    test.describe.configure({ mode: 'serial' });

    test.beforeAll(async ({ browser }) => {
        let browserTemp = await chromium.launch({ headless: true });
        let pageTemp = await browserTemp.newPage();
        isHealthyLocal = await new D2CMarketPlaceHealthCheck(pageTemp).isHealthy();
        await browserTemp.close();
        await pageTemp.close();
    });

    test.describe('For Retailers navigation links test', () => {
        test.skip(isHealthyLocal == false, 'health check FAILED; test.skip()');
        test.beforeEach(async ({ browser }) => {
            browserContext = await browser.newContext();
            page = await browserContext.newPage();
            basePage = new A_BasePage(page);
            await basePage.onBasePage();
        });

        test('validate Partner signup link is working', { tag: ['@globalfooters', '@forretailers', '@01'] }, async () => {
            await basePage.verifyAvailabilityOfForRetailersHeader();
            const [newPage] = await Promise.all([
                browserContext.waitForEvent('page'),
                basePage.clickPartnerSignUpLink()
            ]);
            await newPage.waitForLoadState();
            const actualURL: string = newPage.url();
            expect(actualURL).toBe(urls.PARTNER_SIGNUP_URL.PARTNER_SIGNUP_URL);
            await newPage.close();
        })

        test('validate Retailer login link is working', { tag: ['@globalfooters', '@forretailers', '@02'] }, async () => {
            await basePage.verifyAvailabilityOfForRetailersHeader();
            const [newPage] = await Promise.all([
                browserContext.waitForEvent('page'),
                basePage.clickRetailerLoginLink()
            ]);
            await newPage.waitForLoadState();
            const actualURL: string = newPage.url();
            expect(actualURL).toBe(urls.RETAILER_LOGIN_URL.RETAILER_LOGIN_URL);
            await newPage.close();
        })

        test('validate Media Kit link is working', { tag: ['@globalfooters', '@forretailers', '@03'] }, async () => {
            await basePage.verifyAvailabilityOfForRetailersHeader();
            const [newPage] = await Promise.all([
                browserContext.waitForEvent('page'),
                basePage.clickMediaKitLink()
            ]);
            await newPage.waitForLoadState();
            const actualURL: string = newPage.url();
            expect(actualURL).toBe(urls.MEDIA_KIT_URL.MEDIA_KIT_URL);
            await newPage.close();
        })

        test.skip('validate Prog Central link is working', { tag: ['@globalfooters', '@forretailers', '@04'] }, async () => {
            
        })

        test.afterEach(async () => {
            await page.close();
            await browserContext.close();
        });
    })
})