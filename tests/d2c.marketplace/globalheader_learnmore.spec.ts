import { test, expect, BrowserContext, Page, chromium } from '@playwright/test';
import { A_BasePage } from '$pages/d2c.marketplace/A_BasePage';
import urls from '../../utils/d2cmarketplace.utils/urls';
import D2CMarketPlaceHealthCheck from './D2CMarketPlaceHealthCheck';

let browserContext: BrowserContext;
let page: Page;
let isHealthyLocal: Boolean;
let basePage: A_BasePage;

test.describe.skip('Global Headers Test Suite', () => {
    test.describe.configure({ retries: 0 });
    test.describe.configure({ mode: 'serial' });

    test.beforeAll(async ({ browser }) => {
        let browserTemp = await chromium.launch({ headless: true });
        let pageTemp = await browserTemp.newPage();
        isHealthyLocal = await new D2CMarketPlaceHealthCheck(pageTemp).isHealthy();
        await browserTemp.close();
        await pageTemp.close();
    });

    test.describe('Learn More Option Tests', () => {
        test.skip(isHealthyLocal == false, 'health check FAILED; test.skip()');
        test.beforeEach(async ({ browser }) => {
            browserContext = await browser.newContext();
            page = await browserContext.newPage();
            basePage = new A_BasePage(page);
            await basePage.onBasePage();
        });

        test('Verify user is displayed with different informational option when clicked on Learn More option', { tag: ['@globalheaders', '@learnmore', '@01'] }, async () => {
            await basePage.clickLearnMoreBtn();
            await basePage.verifyHeaderAndOptionsInLearnMore();
        })

        test('Validate the user navigates to correct page when clicked on How It Works option', { tag: ['@globalheaders', '@learnmore', '@02'] }, async () => {
            await basePage.clickLearnMoreBtn();
            await basePage.verifyHeaderAndOptionsInLearnMore();
            await basePage.clickHowItWorksLearnMoreLink();
            await expect(page).toHaveURL(urls.HOW_IT_WORKS_URL.HOW_IT_WORKS_URL);
        })

        test('Validate the user navigates to correct page when clicked on Contact Us option', { tag: ['@globalheaders', '@learnmore', '@03'] }, async () => {
            await basePage.clickLearnMoreBtn();
            await basePage.verifyHeaderAndOptionsInLearnMore();
            await basePage.clickContactUsLearnMoreLink();
            await expect(page).toHaveURL(urls.CONTACT_US_URL.CONTACT_US_URL);
        })

        test('Validate the user navigates to correct page when clicked on FAQ option', { tag: ['@globalheaders', '@learnmore', '@04'] }, async () => {
            await basePage.clickLearnMoreBtn();
            await basePage.verifyHeaderAndOptionsInLearnMore();
            await basePage.clickFAQsLearnMoreLink();
            await expect(page).toHaveURL(urls.FAQ_URL.FAQ_URL);
        })

        test.afterEach(async () => {
            await page.close();
            await browserContext.close();
        });
    })
})


