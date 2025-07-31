import { test, expect, BrowserContext, Page, chromium } from '@playwright/test';
import { A_BasePage } from '$pages/d2c.marketplace/A_BasePage';
import { C_RetailersIndexPage } from '$pages/d2c.marketplace/C_RetailersIndexPage';
import D2CMarketPlaceHealthCheck from './D2CMarketPlaceHealthCheck';
import LocationData from '../../data/d2c.marketplace/LocationData';
import urls from '../../utils/d2cmarketplace.utils/urls';
import FeaturedRetailerData from 'data/d2c.marketplace/FeaturedRetailerData';
import { D_RetailersDetailPage } from '$pages/d2c.marketplace/D_RetailersDetailPage';
import { getProductKeyByName, getProductDescriptionByName } from 'data/d2c.marketplace/ProductMapping';
import { Formatter } from '$utils/d2cmarketplace.utils/Formatter';
import { normalizedURL } from '$utils/d2cmarketplace.utils/urls';

let browserContext: BrowserContext;
let page: Page;
let isHealthyLocal: Boolean;
let basePage: A_BasePage;
let retailerIndexPage: C_RetailersIndexPage;
let retailerDetailPage: D_RetailersDetailPage;

test.describe('Regression Suite', () => {
    test.describe.configure({ retries: 0 });
    test.describe.configure({ mode: 'serial' });

    test.beforeAll(async () => {
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
            retailerIndexPage = new C_RetailersIndexPage(page);
            await basePage.clickShopRetailersLink();
            await retailerIndexPage.verifyPresenceOfBreadCrumb();
            await basePage.verifyLocationPopUpVisibility();
            expect(page).toHaveURL(urls.SHOP_RETAILERS_URL.SHOP_RETAILERS_URL);

            //provide a city for location 
            let locationData = new LocationData();
            await retailerIndexPage.enterCityInLocationModalView(locationData.getChicagoCityName);
            await retailerIndexPage.clickOnFirstOption();
            await retailerIndexPage.verifyLocationOptionSelected(locationData.getChicagoCityName);
            await retailerIndexPage.clickOnContinueBtn();

            //land on retailers page and perform basic assertions like url header and location
            expect(page).toHaveURL(urls.SHOP_RETAILERS_URL.SHOP_RETAILERS_URL);
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
            await retailerIndexPage.clickOnUpdateBtnOnLocationModalView();

            //User search for and click the first search suggestion
            let featuredRetailersData = new FeaturedRetailerData();
            await retailerIndexPage.enterRetailerInSearchInput(featuredRetailersData.getBestBuy);
            await retailerIndexPage.clickOnFirstOptionForRetailer(featuredRetailersData.getBestBuy);

            //User lands on grand parent retailer detail page and verifies relevant information
            retailerDetailPage = new D_RetailersDetailPage(page);
            let expectedRetailerDetailURL = `${urls.SHOP_RETAILERS_URL.SHOP_RETAILERS_URL}${getProductKeyByName(featuredRetailersData.getBestBuy)}/`;
            await expect(page).toHaveURL(expectedRetailerDetailURL);
            await retailerDetailPage.verifyProductKeyInBreadCrumb(Formatter.formatProductName(getProductKeyByName(featuredRetailersData.getBestBuy)));
            await retailerDetailPage.verifyPresenceOfRetailerHeader(featuredRetailersData.getBestBuy);
            await retailerDetailPage.verifyPresenceOfRetailerDesc(getProductDescriptionByName(featuredRetailersData.getBestBuy));
            await retailerDetailPage.verifyOtherOptionsHeaderAndDesc(featuredRetailersData.getBestBuy);

            //User clicks on Lease Online Button to proceed with leasing process
            await Promise.all([
                page.waitForNavigation({ waitUntil: 'load' }),
                retailerDetailPage.clickOnLeaseOnlineBtn(featuredRetailersData.getBestBuy),
            ]);
            const currentUrl = page.url();
            expect(currentUrl).toContain(urls.LEASE_ONLINE_URL.LEASE_ONLINE_URL);
        })

        test.afterEach(async () => {
            await page.close();
            await browserContext.close();
        });
    })
})