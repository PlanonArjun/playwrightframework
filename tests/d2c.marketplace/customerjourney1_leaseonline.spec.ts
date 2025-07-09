import { test, expect, BrowserContext, Page, chromium } from '@playwright/test';
import { A_BasePage } from '$pages/d2c.marketplace/A_BasePage';
import { C_RetailersIndexPage } from '$pages/d2c.marketplace/C_RetailersIndexPage';
import D2CMarketPlaceHealthCheck from './D2CMarketPlaceHealthCheck';
import LocationData from '../../data/d2c.marketplace/LocationData';

let browserContext: BrowserContext;
let page: Page;
let isHealthyLocal: Boolean;
let basePage: A_BasePage;
let retailerIndexPage: C_RetailersIndexPage;

test.describe('Regression Suite', () => {
    test.describe.configure({ retries: 0 });
    test.describe.configure({ mode: 'serial' });

    test.beforeAll(async ({ browser }) => {
        let browserTemp = await chromium.launch({ headless: true });
        let pageTemp = await browserTemp.newPage();
        isHealthyLocal = await new D2CMarketPlaceHealthCheck(pageTemp).isHealthy();
        await browserTemp.close();
        await pageTemp.close();
    });

    test.describe('Key Customer Journey 1', () => {
        test.skip(isHealthyLocal == false, 'health check FAILED; test.skip()');
        test.beforeEach(async ({ browser }) => {
            browserContext = await browser.newContext();
            page = await browserContext.newPage();
            basePage = new A_BasePage(page);
            await basePage.onBasePage();
        });

        test('Lease Online from Grand Parent Retailer page', { tag: ['@regression', '@kcj1'] }, async () => {
            await basePage.clickShopRetailersLink();
            await basePage.verifyLocationPopUpVisibility();
            retailerIndexPage = new C_RetailersIndexPage(page);
            let locationData = new LocationData();
            await retailerIndexPage.enterCityInLocationModalView(locationData.getNewYorkCityName);
            await retailerIndexPage.clickOnFirstOption();
            await retailerIndexPage.clickOnContinueBtn();
        })

        test.afterEach(async () => {
            await page.close();
            await browserContext.close();
        });
    })
})