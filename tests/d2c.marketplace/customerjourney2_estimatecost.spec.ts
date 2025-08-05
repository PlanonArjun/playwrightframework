import { test, expect, BrowserContext, Page, chromium } from '@playwright/test';
import { A_BasePage } from '$pages/d2c.marketplace/A_BasePage';
import { C_RetailersIndexPage } from '$pages/d2c.marketplace/C_RetailersIndexPage';
import D2CMarketPlaceHealthCheck from './D2CMarketPlaceHealthCheck';
import testData from '../../data/d2c.marketplace/testdata.json';

let browserContext: BrowserContext;
let page: Page;
let isHealthyLocal: Boolean;
let basePage: A_BasePage;
let retailerIndexPage: C_RetailersIndexPage;

test.describe('Regression Suite', () => {
    test.describe.configure({ retries: 0 });
    test.describe.configure({ mode: 'serial' });

    test.beforeAll(async () => {
        let browserTemp = await chromium.launch({ headless: true });
        let pageTemp = await browserTemp.newPage();
        isHealthyLocal = await new D2CMarketPlaceHealthCheck(pageTemp).isHealthy();
        await pageTemp.close();
        await browserTemp.close();
    });

    test.describe('Key Customer Journey 2', () => {
        test.beforeEach(async ({ browser }) => {
            if (!isHealthyLocal) {
                test.skip(true, 'health check FAILED; skipping tests');
            }
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
            expect(page).toHaveURL(testData.urls.marketplace.endpoints.shopRetailers);

            //provide a zipcode for location 
            await retailerIndexPage.enterCityInLocationModalView(testData.location.newYorkCity.zipcode);
            await retailerIndexPage.clickOnFirstOption();
            await retailerIndexPage.verifyLocationOptionSelected(testData.location.newYorkCity.zipcode);
            await retailerIndexPage.clickOnContinueBtn();

            //land on retailers page and perform basic assertions like url header and location
            expect(page).toHaveURL(testData.urls.marketplace.endpoints.shopRetailers);
            await retailerIndexPage.verifyPresenceOfShopRetailersHeader();
            await retailerIndexPage.verifyLocationSelectedOnRetailersIndexPage(testData.location.newYorkCity.name);

            //User search for the retailer
            await retailerIndexPage.enterRetailerInSearchInput(testData.featuredRetailers.bestBuy);
            await retailerIndexPage.searchForResults();
            await retailerIndexPage.verifyRetailerNameInInputBoxAfterSearch(testData.featuredRetailers.bestBuy);

            //Apply for In-Store filter
            await retailerIndexPage.clickOnFilterBtn();
            await retailerIndexPage.selectInStoreOptionForLeaseToOwnOptions();
            await retailerIndexPage.applyFilter();
            await retailerIndexPage.clickOnLoadMore();
            await retailerIndexPage.verifyLeaseToOwnOptionFilterIsApplied(testData.leaseToOwnOptionsFilter.inStoreFilter);

            //Check if near to far sorting is applied for BM stores
            await retailerIndexPage.verifyNearToFarSortingWithInStoreFilter();

            //Click on the first retailer tile and verify in store details on modal screen
            await retailerIndexPage.clickOnFirstTile();
            await retailerIndexPage.verifyInStoreDetailsOnModalScreen(testData.featuredRetailers.bestBuy);
            const [googleMapPage] = await Promise.all([
                browserContext.waitForEvent('page'),
                await retailerIndexPage.clickOnGetDirectionLinkOnRetailerModalScreen()
            ]);
            await googleMapPage.waitForLoadState();
            await expect(googleMapPage).toHaveTitle(new RegExp(testData.location.newYorkCity.name, 'i'), { timeout: 10000 });
            await googleMapPage.close();

            //Select In Store radio button on modal screen
            await retailerIndexPage.selectInStoreTileFromModalScreen();

            //Click on Estimate Leasing Cost and verify the page navigation
            await Promise.all([
                page.waitForNavigation({ waitUntil: 'load' }),
                await retailerIndexPage.clickOnEstimateCostFromModalScreen(),
            ]);
            const currentUrl = page.url();
            expect(currentUrl).toContain(testData.urls.external.pl.estimateCostPartial);

        })

        test.afterEach(async () => {
            //defensive tear up 
            if (page && !page.isClosed()) {
                await page.close();
            }
            if (browserContext) {
                await browserContext.close();
            }
        });
    })
})