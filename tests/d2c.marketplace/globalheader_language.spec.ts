import { test, expect, BrowserContext, Page, chromium } from '@playwright/test';
import { A_BasePage } from '$pages/d2c.marketplace/A_BasePage';
import D2CMarketPlaceHealthCheck from './D2CMarketPlaceHealthCheck';
import { LANGUAGE } from '$utils/d2cmarketplace.utils/language';

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

    test.describe('Language icon Tests', () => {
        test.skip(isHealthyLocal == false, 'health check FAILED; test.skip()');
        test.beforeEach(async ({ browser }) => {
            browserContext = await browser.newContext();
            page = await browserContext.newPage();
            basePage = new A_BasePage(page);
            await basePage.onBasePage();
        });

        //Not working
        test.skip('Verify that the default language selected is English', { tag: ['@globalheaders', '@language', '@01'] }, async () => {
            expect(await basePage.getCurrentLanguage()).toEqual(LANGUAGE.ENGLISH);
        })

        test('Verify that the language change is functional', { tag: ['@globalheaders', '@language', '@02'] }, async () => {
            let initialLang = await basePage.getCurrentLanguage()
            await basePage.clickLanguageIcon()
            await basePage.checkLanguageChange(initialLang)
            initialLang = await basePage.getCurrentLanguage()
            await basePage.clickLanguageIcon()
            await basePage.checkLanguageChange(initialLang)
        })

        test.afterEach(async () => {
            await page.close();
            await browserContext.close();
        });
    })
})