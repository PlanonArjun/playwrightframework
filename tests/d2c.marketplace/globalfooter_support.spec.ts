import { test, expect, BrowserContext, Page, chromium } from '@playwright/test';
import { A_BasePage } from '$pages/d2c.marketplace/A_BasePage';
import D2CMarketPlaceHealthCheck from './D2CMarketPlaceHealthCheck';
import urls from '$utils/d2cmarketplace.utils/urls';
import { normalizedURL } from '$utils/d2cmarketplace.utils/urls';

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

    test.describe('Support navigation links test', () => {
        test.skip(isHealthyLocal == false, 'health check FAILED; test.skip()');
        test.beforeEach(async ({ browser }) => {
            browserContext = await browser.newContext();
            page = await browserContext.newPage();
            basePage = new A_BasePage(page);
            await basePage.onBasePage();
        });

        test('validate How it works link is working', { tag: ['@globalfooters', '@support', '@01'] }, async () => {
            await basePage.verifyAvailabilityOfSupportHeader();
            const [newPage] = await Promise.all([
                browserContext.waitForEvent('page'),
                basePage.clickHowItWorksLink()
            ]);
            await newPage.waitForLoadState();
            const actualURL: string = normalizedURL(newPage.url());
            expect(actualURL).toBe(urls.HOW_IT_WORKS_URL.HOW_IT_WORKS_URL);
            await newPage.close();
        })

        test('validate Contact us link is working', { tag: ['@globalfooters', '@support', '@02'] }, async () => {
            await basePage.verifyAvailabilityOfSupportHeader();
            const [newPage] = await Promise.all([
                browserContext.waitForEvent('page'),
                basePage.clickContactUsLink()
            ]);
            await newPage.waitForLoadState();
            const actualURL: string = normalizedURL(newPage.url());
            expect(actualURL).toBe(urls.CONTACT_US_URL.CONTACT_US_URL);
            await newPage.close();
        })

        test('validate Customer Feedback link is working', { tag: ['@globalfooters', '@support', '@03'] }, async () => {
            await basePage.verifyAvailabilityOfSupportHeader();
            const [newPage] = await Promise.all([
                browserContext.waitForEvent('page'),
                basePage.clickCustomerFeedbackLink()
            ]);
            await newPage.waitForLoadState();
            const actualURL: string = normalizedURL(newPage.url());
            expect(actualURL).toBe(urls.CONTACT_US_URL.CONTACT_US_URL);
            await newPage.close();
        })

        test('validate Blogs link is working', { tag: ['@globalfooters', '@support', '@04'] }, async () => {
            await basePage.verifyAvailabilityOfSupportHeader();
            const [newPage] = await Promise.all([
                browserContext.waitForEvent('page'),
                basePage.clickBlogsLink()
            ]);
            await newPage.waitForLoadState();
            const actualURL: string = normalizedURL(newPage.url());
            expect(actualURL).toBe(urls.BLOG_URL.BLOG_URL);
            await newPage.close();
        })

        test('validate FAQs link is working', { tag: ['@globalfooters', '@support', '@05'] }, async () => {
            await basePage.verifyAvailabilityOfSupportHeader();
            const [newPage] = await Promise.all([
                browserContext.waitForEvent('page'),
                basePage.clickFAQsLink()
            ]);
            await newPage.waitForLoadState();
            const actualURL: string = normalizedURL(newPage.url());
            expect(actualURL).toBe(urls.FAQ_URL.FAQ_URL);
            await newPage.close();
        })

        test.afterEach(async () => {
            await page.close();
            await browserContext.close();
        });
    })
})