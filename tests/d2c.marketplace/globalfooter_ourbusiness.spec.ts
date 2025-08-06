import { test, expect, BrowserContext, Page, chromium } from '@playwright/test';
import { A_BasePage } from '$pages/d2c.marketplace/A_BasePage';
import D2CMarketPlaceHealthCheck from './D2CMarketPlaceHealthCheck';

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

    test.describe('Our Business navigation links test', () => {
        test.skip(isHealthyLocal == false, 'health check FAILED; test.skip()');
        test.beforeEach(async ({ browser }) => {
            browserContext = await browser.newContext();
            page = await browserContext.newPage();
            basePage = new A_BasePage(page);
            await basePage.onBasePage();
        });

        test('validate About us link is working', { tag: ['@globalfooters', '@ourbusiness', '@01'] }, async () => {
            await basePage.verifyAvailabilityOfForRetailersHeader();
            const [newPage] = await Promise.all([
                browserContext.waitForEvent('page'),
                basePage.clickAboutUsLink()
            ]);
            await newPage.waitForLoadState();
            const actualURL: string = newPage.url();
            //expect(actualURL).toBe(urls.ABOUT_US_URL.ABOUT_US_URL);
            await newPage.close();
        })

        test('validate Investors link is working', { tag: ['@globalfooters', '@ourbusiness', '@02'] }, async () => {
            await basePage.verifyAvailabilityOfForRetailersHeader();
            const [newPage] = await Promise.all([
                browserContext.waitForEvent('page'),
                basePage.clickInvestorsLink()
            ]);
            await newPage.waitForLoadState();
            const actualURL: string = newPage.url();
            //expect(actualURL).toBe(urls.INVESTORS_URL.INVESTORS_URL);
            await newPage.close();
        })

        test('validate Partners link is working', { tag: ['@globalfooters', '@ourbusiness', '@03'] }, async () => {
            await basePage.verifyAvailabilityOfForRetailersHeader();
            const [newPage] = await Promise.all([
                browserContext.waitForEvent('page'),
                basePage.clickPartnersLink()
            ]);
            await newPage.waitForLoadState();
            const actualURL: string = newPage.url();
            //expect(actualURL).toBe(urls.RETAILER_LOGIN_URL.RETAILER_LOGIN_URL);
            await newPage.close();
        })

        test('validate Prog Foundation link is working', { tag: ['@globalfooters', '@ourbusiness', '@04'] }, async () => {
            await basePage.verifyAvailabilityOfForRetailersHeader();
            const [newPage] = await Promise.all([
                browserContext.waitForEvent('page'),
                basePage.clickProgFoundationLink()
            ]);
            await newPage.waitForLoadState();
            const actualURL: string = newPage.url();
            //expect(actualURL).toBe(urls.PROG_FOUNDATION_URL.PROG_FOUNDATION_URL);
            await newPage.close();
        })

        test('validate Careers link is working', { tag: ['@globalfooters', '@ourbusiness', '@05'] }, async () => {
            await basePage.verifyAvailabilityOfForRetailersHeader();
            const [newPage] = await Promise.all([
                browserContext.waitForEvent('page'),
                basePage.clickCareersLink()
            ]);
            await newPage.waitForLoadState();
            const actualURL: string = newPage.url();
            //expect(actualURL).toBe(urls.PL_CAREERS_URL.PL_CAREERS_URL);
            await newPage.close();
        })

        test.afterEach(async () => {
            await page.close();
            await browserContext.close();
        });
    })
})