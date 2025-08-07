import { test, expect, BrowserContext, Page, chromium } from '@playwright/test';
import { A_BasePage } from '$pages/d2c.marketplace/A_BasePage';
import D2CMarketPlaceHealthCheck from './D2CMarketPlaceHealthCheck';
import { F_ShopAllList } from '$pages/d2c.marketplace/F_ShopAllList';
import E_ProductDetailsPage from '$pages/d2c.marketplace/E_ProductDetailsPage';
import { getStoreTypeByName } from "data/d2c.marketplace/ProductMapping";
import { STORE_TYPE } from '$utils/d2cmarketplace.utils/storeType';
import testData from '../../data/d2c.marketplace/testdata.json';

let browserContext: BrowserContext;
let page: Page;
let isHealthyLocal: Boolean;
let basePage: A_BasePage;
let shopAllListPage: F_ShopAllList;
let productDetailPage: E_ProductDetailsPage;

test.describe('Regression Suite', () => {
    test.describe.configure({ retries: 0 });
    test.describe.configure({ mode: 'serial' });

    test.beforeAll(async ({ browser }) => {
        const browserContextTemp = await browser.newContext();
        const pageTemp = await browserContextTemp.newPage();
        isHealthyLocal = await new D2CMarketPlaceHealthCheck(pageTemp).isHealthy();
        await pageTemp.close();
        await browserContextTemp.close();
    });

    test.describe('Key Customer Journey 3', () => {
        test.beforeEach(async ({ browser }) => {
            if (!isHealthyLocal) {
                test.skip(true, 'health check FAILED; skipping tests');
            }
            browserContext = await browser.newContext();
            page = await browserContext.newPage();
            basePage = new A_BasePage(page);
            await basePage.onBasePage();
        });

        test('Verify QR for a product offered by online Retailer using Shop All navigation', { tag: ['@regression', '@kcj3'] }, async () => {
            //user lands on home page and click on Shop All icon
            shopAllListPage = new F_ShopAllList(page);
            await basePage.clickShopProductsBtn();
            await basePage.verifyPresenceOfShopCategories();
            await basePage.clickShopAllLink();
            await shopAllListPage.verifyPresenceOfBreadCrumb();
            await basePage.verifyLocationPopUpVisibility();
            const langEndpoint = testData.urls.marketplace.endpoints.englishLanguage;
            expect(page).toHaveURL(new RegExp(`${langEndpoint}${testData.urls.marketplace.endpoints.shopAll}$`));

            //provide a zipcode for location 
            await shopAllListPage.enterCityInLocationModalView(testData.location.newYorkCity.zipcode);
            await shopAllListPage.clickOnFirstOption();
            await shopAllListPage.verifyLocationOptionSelected(testData.location.newYorkCity.zipcode);
            await shopAllListPage.clickOnContinueBtn();

            //land on shop all page and perform basic assertions like url header and location
            expect(page).toHaveURL(new RegExp(`${langEndpoint}${testData.urls.marketplace.endpoints.shopAll}$`));
            await shopAllListPage.verifyPresenceOfShopAllHeader();
            await shopAllListPage.verifyLocationSelectedOnProductIndexPage(testData.location.newYorkCity.name);

            //Click on fliters button and apply filters for retailer and categories
            await shopAllListPage.clickOnFilterBtn();
            await shopAllListPage.selectCategoryFilter(testData.filterCategories.laptopsFilter);
            await shopAllListPage.selectRetailerFilter(testData.featuredRetailers.amazon);
            await shopAllListPage.applyFilter();
            await shopAllListPage.clickOnLoadMoreForProductIfApplicable(3);
            await shopAllListPage.verifyCategoryFilterIsApplied(testData.filterCategories.laptopsFilter);
            await shopAllListPage.verifyRetailerFilterIsApplied(testData.featuredRetailers.amazon);

            //Sort the products by Price low to high
            await shopAllListPage.applyLowToHighPriceSorting();
            const expectedProductDescription = await shopAllListPage.getProductDescOnPLP();
            const expectedProductPrice = await shopAllListPage.getProductPriceOnPLP();
            const expectedProductRetailer = await shopAllListPage.getProductRetailerNameOnPLP();

            //Click on first product tile
            await shopAllListPage.clickOnFirstProductTile();

            //User navigates to the product detail page and verifies the relevant information
            productDetailPage = new E_ProductDetailsPage(page);
            const actualProductDescription = await productDetailPage.getProductDescription();
            const actualProductDetails = await productDetailPage.getProductDetails();
            const actualProductPrice = await productDetailPage.getProductPrice();

            expect(actualProductDescription).toEqual(expectedProductDescription);
            expect(actualProductDetails).toEqual(expectedProductDescription);
            expect(actualProductPrice).toEqual(expectedProductPrice);

            const isOnlineRetailer: boolean = getStoreTypeByName(expectedProductRetailer) === STORE_TYPE.ONLINE;

            if (isOnlineRetailer) {
                try {
                    await productDetailPage.verifyAppDownloadLinkForOnlineRetailer(expectedProductRetailer);
                    await page.evaluate(_ => { }, `browserstack_executor: ${JSON.stringify({ action: 'setSessionStatus', arguments: { status: 'passed', reason: 'Customer Journey 3' } })}`);
                } catch (Error) {
                    await page.evaluate(_ => { }, `browserstack_executor: ${JSON.stringify({ action: 'setSessionStatus', arguments: { status: 'failed', reason: Error.toString() } })}`);
                }
            } else {
                throw new Error(`Test failed: Store Type mismatch`)
            }

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