import { test, expect, BrowserContext, Page, chromium } from '@playwright/test';
import { A_BasePage } from '$pages/d2c.marketplace/A_BasePage';
import D2CMarketPlaceHealthCheck from './D2CMarketPlaceHealthCheck';
import { F_ShopAllList } from '$pages/d2c.marketplace/F_ShopAllList';
import E_ProductDetailsPage from '$pages/d2c.marketplace/E_ProductDetailsPage';
import testData from '../../data/d2c.marketplace/testdata.json';
import { getStoreTypeByName } from "data/d2c.marketplace/ProductMapping";
import { STORE_TYPE } from '$utils/d2cmarketplace.utils/storeType';

let browserContext: BrowserContext;
let page: Page;
let isHealthyLocal: Boolean;
let basePage: A_BasePage;
let shopAllListPage: F_ShopAllList;
let productDetailPage: E_ProductDetailsPage;

test.describe('Regression Suite', () => {
    test.describe.configure({ retries: 0 });
    test.describe.configure({ mode: 'serial' });

    test.beforeAll(async () => {
        let browserTemp = await chromium.launch({ headless: true });
        let pageTemp = await browserTemp.newPage();
        isHealthyLocal = await new D2CMarketPlaceHealthCheck(pageTemp).isHealthy()
        await pageTemp.close();
        await browserTemp.close();
    });

    test.describe('Key Customer Journey 4', () => {
        test.beforeEach(async ({ browser }) => {
            if (!isHealthyLocal) {
                test.skip(true, 'health check FAILED; skipping tests');
            }
            browserContext = await browser.newContext();
            page = await browserContext.newPage();
            basePage = new A_BasePage(page);
            await basePage.onBasePage();
        });

        test('Lease online for a product using Shop Categories list', { tag: ['@regression', '@kcj4'] }, async () => {
            //user lands on home page and click on Shop Products button
            shopAllListPage = new F_ShopAllList(page);
            await basePage.clickShopProductsBtn();
            await basePage.verifyPresenceOfShopCategories();

            //User clicks on Electronics & Gaming category
            await basePage.clickOnCategoryImg(testData.shopCategories.electronicsAndGaming);
            await shopAllListPage.verifyPresenceOfBreadCrumb();
            await shopAllListPage.verifyPresenceOfCategoryInBreadCrumb(testData.shopCategories.electronicsAndGaming);
            await basePage.verifyLocationPopUpVisibility();
            const baseUrl = testData.urls.marketplace.homeQA;
            expect(page).toHaveURL(baseUrl + testData.urls.marketplace.endpoints.shopCategories.shopElectronics);

            //provide a zipcode for location 
            await shopAllListPage.enterCityInLocationModalView(testData.location.newYorkCity.zipcode);
            await shopAllListPage.clickOnFirstOption();
            await shopAllListPage.verifyLocationOptionSelected(testData.location.newYorkCity.zipcode);
            await shopAllListPage.clickOnContinueBtn();

            //land on category list page and perform basic assertions like url header and location
            expect(page).toHaveURL(baseUrl + testData.urls.marketplace.endpoints.shopCategories.shopElectronics);
            await shopAllListPage.verifyPresenceOfShopCategoryHeader(testData.shopCategories.electronicsAndGaming);
            await shopAllListPage.verifyLocationSelectedOnProductIndexPage(testData.location.newYorkCity.name);

            //Click on fliters button and apply filters for retailer and categories
            await shopAllListPage.clickOnFilterBtn();
            await shopAllListPage.selectCategoryFilter(testData.filterCategories.televisionsFilter);
            await shopAllListPage.selectRetailerFilter(testData.featuredRetailers.bestBuy);
            await shopAllListPage.applyFilter();
            await shopAllListPage.clickOnLoadMoreForProductIfApplicable(3);
            await shopAllListPage.verifyCategoryFilterIsApplied(testData.filterCategories.televisionsFilter);
            await shopAllListPage.verifyRetailerFilterIsApplied(testData.featuredRetailers.bestBuy);

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

            //User clicks on Apply Now Button to proceed with leasing process
            const isOnlineRetailer: boolean = getStoreTypeByName(expectedProductRetailer) === STORE_TYPE.ONLINE;
            if (!isOnlineRetailer) {
                await Promise.all([
                    page.waitForNavigation({ waitUntil: 'load' }),
                    productDetailPage.clickOnApplyNowBtnOnPDPPageForInStoreRetailer(expectedProductRetailer),
                ]);
                await expect(page).toHaveURL(new RegExp(testData.urls.external.pl.leaseOnlinePartial), { timeout: 10000 });
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