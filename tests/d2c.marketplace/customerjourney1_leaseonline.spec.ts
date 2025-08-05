import { test, expect, BrowserContext, Page, chromium } from '@playwright/test';
import { A_BasePage } from '$pages/d2c.marketplace/A_BasePage';
import { C_RetailersIndexPage } from '$pages/d2c.marketplace/C_RetailersIndexPage';
import D2CMarketPlaceHealthCheck from './D2CMarketPlaceHealthCheck';
import { D_RetailersDetailPage } from '$pages/d2c.marketplace/D_RetailersDetailPage';
import { getProductKeyByName, getProductDescriptionByName } from 'data/d2c.marketplace/ProductMapping';
import { Formatter } from '$utils/d2cmarketplace.utils/Formatter';
import testData from '../../data/d2c.marketplace/testdata.json';


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
        await pageTemp.close();
        await browserTemp.close();
    });

    test.describe('Key Customer Journey 1', () => {
        test.beforeEach(async ({ browser }) => {
            if (!isHealthyLocal) {
                test.skip(true, 'health check FAILED; skipping tests');
            }
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
            const baseUrl = testData.urls.marketplace.environments.qa.baseUrl;
            expect(page).toHaveURL(baseUrl + testData.urls.marketplace.endpoints.shopRetailers);

            //provide a city for location 
            await retailerIndexPage.enterCityInLocationModalView(testData.location.chicagoCity.name);
            await retailerIndexPage.clickOnFirstOption();
            await retailerIndexPage.verifyLocationOptionSelected(testData.location.chicagoCity.name);
            await retailerIndexPage.clickOnContinueBtn();

            //land on retailers page and perform basic assertions like url header and location
            expect(page).toHaveURL(baseUrl + testData.urls.marketplace.endpoints.shopRetailers);
            await retailerIndexPage.verifyPresenceOfShopRetailersHeader();
            await retailerIndexPage.verifyLocationSelectedOnRetailersIndexPage(testData.location.chicagoCity.name);

            //go to location modal screen again and click cancel update
            await retailerIndexPage.clickOnLocationUpdateLink();
            await retailerIndexPage.clickOnCancelBtnOnLocationModalView();

            //go to location modal screen again and update city location
            await retailerIndexPage.clickOnLocationUpdateLink();
            await retailerIndexPage.enterCityInLocationModalView(testData.location.newYorkCity.name);
            await retailerIndexPage.clickOnFirstOption();
            await retailerIndexPage.verifyLocationOptionSelected(testData.location.newYorkCity.name);
            await retailerIndexPage.clickOnUpdateBtnOnLocationModalView();

            //User search for and click the first search suggestion
            await retailerIndexPage.enterRetailerInSearchInput(testData.featuredRetailers.bestBuy);
            await retailerIndexPage.clickOnFirstOptionForRetailer(testData.featuredRetailers.bestBuy);

            //User lands on grand parent retailer detail page and verifies relevant information
            retailerDetailPage = new D_RetailersDetailPage(page);
            let expectedRetailerDetailURL = `${baseUrl + testData.urls.marketplace.endpoints.shopRetailers}${getProductKeyByName(testData.featuredRetailers.bestBuy)}/`;
            await expect(page).toHaveURL(expectedRetailerDetailURL);
            await retailerDetailPage.verifyProductKeyInBreadCrumb(Formatter.formatProductName(getProductKeyByName(testData.featuredRetailers.bestBuy)));
            await retailerDetailPage.verifyPresenceOfRetailerHeader(testData.featuredRetailers.bestBuy);
            await retailerDetailPage.verifyPresenceOfRetailerDesc(getProductDescriptionByName(testData.featuredRetailers.bestBuy));
            await retailerDetailPage.verifyOtherOptionsHeaderAndDesc(testData.featuredRetailers.bestBuy);

            //User clicks on Lease Online Button to proceed with leasing process
            await Promise.all([
                page.waitForNavigation({ waitUntil: 'load' }),
                retailerDetailPage.clickOnLeaseOnlineBtn(testData.featuredRetailers.bestBuy),
            ]);
            await expect(page).toHaveURL(new RegExp(testData.urls.external.pl.leaseOnlinePartial), { timeout: 10000 });
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