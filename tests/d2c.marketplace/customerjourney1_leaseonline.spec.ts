import { test, expect, BrowserContext, Page, chromium } from '@playwright/test';
import { A_BasePage } from '$pages/d2c.marketplace/A_BasePage';
import { C_RetailersIndexPage } from '$pages/d2c.marketplace/C_RetailersIndexPage';
import D2CMarketPlaceHealthCheck from './D2CMarketPlaceHealthCheck';
import LocationData from '../../data/d2c.marketplace/LocationData';
import urls from '../../utils/d2cmarketplace.utils/urls';

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
            //user lands on home page and click on shop retailers icon
            await basePage.clickShopRetailersLink();
            await basePage.verifyLocationPopUpVisibility();
            let actualShopRetailersURL: string = await basePage.getCurrentURL();
            expect(actualShopRetailersURL).toBe(urls.SHOP_RETAILERS_URL.SHOP_RETAILERS_URL);

            //provide a city for location 
            retailerIndexPage = new C_RetailersIndexPage(page);
            let locationData = new LocationData();
            await retailerIndexPage.enterCityInLocationModalView(locationData.getChicagoCityName);
            await retailerIndexPage.clickOnFirstOption();
            await retailerIndexPage.verifyLocationOptionSelected(locationData.getChicagoCityName);
            await retailerIndexPage.clickOnContinueBtn();

            //land on retailers page and perform basic assertions like url header and location
            actualShopRetailersURL = await retailerIndexPage.getCurrentURL();
            expect(actualShopRetailersURL).toBe(urls.SHOP_RETAILERS_URL.SHOP_RETAILERS_URL);
            await retailerIndexPage.verifyPresenceOfShopRetailersHeader();
            await retailerIndexPage.verifyLocationSelectedOnRetailersIndexPage(locationData.getChicagoCityName);
            
            //go to location modal screen again and click cancel update
            await retailerIndexPage.clickOnLocationUpdateLink();
            await retailerIndexPage.clickOnCancelBtnOnLocationModalView();

            //go to location modal screen again and update city location
            await retailerIndexPage.clickOnLocationUpdateLink();
            await retailerIndexPage.enterCityInLocationModalView(locationData.getNewYorkCityName);
            await retailerIndexPage.clickOnFirstOption();
            await retailerIndexPage.verifyLocationOptionSelected(locationData.getNewYorkCityName);

            //user checks for the featured retailers and clicks on specific featured retailer
        
        })

        test.afterEach(async () => {
            await page.close();
            await browserContext.close();
        });
    })
})