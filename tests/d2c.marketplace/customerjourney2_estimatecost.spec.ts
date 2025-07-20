import { test, expect, BrowserContext, Page, chromium } from '@playwright/test';
import { A_BasePage } from '$pages/d2c.marketplace/A_BasePage';
import { C_RetailersIndexPage } from '$pages/d2c.marketplace/C_RetailersIndexPage';
import D2CMarketPlaceHealthCheck from './D2CMarketPlaceHealthCheck';
import LocationData from '../../data/d2c.marketplace/LocationData';
import urls from '../../utils/d2cmarketplace.utils/urls';
import FeaturedRetailerData from 'data/d2c.marketplace/FeaturedRetailerData';
import { normalizedURL } from '$utils/d2cmarketplace.utils/urls';
import { LEASE_TO_OWN_OPTIONS } from '$utils/d2cmarketplace.utils/filters/leasetoownoptions';

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

    test.describe('Key Customer Journey 2', () => {
        test.skip(isHealthyLocal == false, 'health check FAILED; test.skip()');
        test.beforeEach(async ({ browser }) => {
            browserContext = await browser.newContext();
            page = await browserContext.newPage();
            basePage = new A_BasePage(page);
            await basePage.onBasePage();
        });

        test('Estimate cost from Retailer modal screen for Brick & Mortar store', { tag: ['@regression', '@kcj2'] }, async () => {
            //user lands on home page and click on shop retailers icon
            retailerIndexPage = new C_RetailersIndexPage(page);
            await basePage.clickShopRetailersLink();
            await retailerIndexPage.verifyPresenceOfBreadCrumb();
            await basePage.verifyLocationPopUpVisibility();
            expect(page).toHaveURL(urls.SHOP_RETAILERS_URL.SHOP_RETAILERS_URL);

            //provide a zipcode for location 
            let locationData = new LocationData();
            await retailerIndexPage.enterCityInLocationModalView(locationData.getNewYorkZipcode);
            await retailerIndexPage.clickOnFirstOption();
            await retailerIndexPage.verifyLocationOptionSelected(locationData.getNewYorkZipcode);
            await retailerIndexPage.clickOnContinueBtn();

            //land on retailers page and perform basic assertions like url header and location
            expect(page).toHaveURL(urls.SHOP_RETAILERS_URL.SHOP_RETAILERS_URL);
            await retailerIndexPage.verifyPresenceOfShopRetailersHeader();
            await retailerIndexPage.verifyLocationSelectedOnRetailersIndexPage(locationData.getNewYorkCityName);

            //User search for the retailer
            let featuredRetailersData = new FeaturedRetailerData();
            await retailerIndexPage.enterRetailerInSearchInput(featuredRetailersData.getBestBuy);
            await retailerIndexPage.searchForResults();
            await retailerIndexPage.verifyRetailerNameInInputBoxAfterSearch(featuredRetailersData.getBestBuy);

            //Apply for In-Store filter
            // await retailerIndexPage.clickOnFilterBtn();
            // await retailerIndexPage.selectInStoreOptionForLeaseToOwnOptions();
            // await retailerIndexPage.applyFilter();
            await retailerIndexPage.clickOnLoadMore();
            //await retailerIndexPage.verifyLeaseToOwnOptionFilterIsApplied(LEASE_TO_OWN_OPTIONS.IN_STORE);

            //Check if near to far sorting is applied for BM stores
            //await retailerIndexPage.verifyNearToFarSortingWithInStoreFilter();

            //Click on the first retailer tile and verify in store details on modal screen
            await retailerIndexPage.clickOnFirstTile();
            await retailerIndexPage.verifyInStoreDetailsOnModalScreen(featuredRetailersData.getBestBuy);
            const [googleMapPage] = await Promise.all([
                browserContext.waitForEvent('page'),
                await retailerIndexPage.clickOnGetDirectionLinkOnRetailerModalScreen()
            ]);
            await googleMapPage.waitForLoadState();
            await expect(googleMapPage).toHaveTitle(new RegExp(locationData.getNewYorkCityName, 'i'), { timeout: 10000 });
            await googleMapPage.close();

            //Select In Store radio button on modal screen
            await retailerIndexPage.selectInStoreTileFromModalScreen();

            //Click on Estimate Leasing Cost and verify the page navigation
            await retailerIndexPage.clickOnEstimateCostFromModalScreen();

        })

        test.afterEach(async () => {
            await page.close();
            await browserContext.close();
        });
    })
})