import { test, expect, BrowserContext, Page, chromium } from '@playwright/test';
import { A_BasePage } from '$pages/d2c.marketplace/A_BasePage';
import urls from '../../utils/d2cmarketplace.utils/urls';
import D2CMarketPlaceHealthCheck from './D2CMarketPlaceHealthCheck';
import GlobalHeaders_ShopAll from '../../data/d2c.marketplace/GlobalHeaders_ShopAll';

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

    test.describe('Shop All icon Tests', () => {
        test.skip(isHealthyLocal == false, 'health check FAILED; test.skip()');
        test.beforeEach(async ({ browser }) => {
            browserContext = await browser.newContext();
            page = await browserContext.newPage();
            basePage = new A_BasePage(page);
            await basePage.onBasePage();
        });

        test('Verify user is displayed with all menus when clicked on Shop All option', { tag: ['@globalheaders', '@shopallicon', '@01'] }, async () => {
            await basePage.clickShopAllBtn();
            const actualItems = basePage.getCategoriesMenu();
            let testData = new GlobalHeaders_ShopAll();
            const expectedItems = testData.getShopCategories;
            await basePage.verifyPresenceOfShopCategories();
            await expect(actualItems).toContainText(expectedItems);
        })

        test.afterEach(async () => {
            await page.close();
            await browserContext.close();
        });
    })
})