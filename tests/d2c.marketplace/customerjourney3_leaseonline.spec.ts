import { test, expect, BrowserContext, Page, chromium } from '@playwright/test';
import { A_BasePage } from '$pages/d2c.marketplace/A_BasePage';
import D2CMarketPlaceHealthCheck from './D2CMarketPlaceHealthCheck';
import LocationData from '../../data/d2c.marketplace/LocationData';
import urls from '../../utils/d2cmarketplace.utils/urls';
import FeaturedRetailerData from 'data/d2c.marketplace/FeaturedRetailerData';
import { CATEGORIES } from '$utils/d2cmarketplace.utils/filters/categories';
import { F_ShopAllList } from '$pages/d2c.marketplace/F_ShopAllList';
import { BRANDS } from '$utils/d2cmarketplace.utils/filters/brands';
import E_ProductDetailsPage from '$pages/d2c.marketplace/E_ProductDetailsPage';

let browserContext: BrowserContext;
let page: Page;
let isHealthyLocal: Boolean;
let basePage: A_BasePage;
let shopAllListPage: F_ShopAllList;
let productDetailPage: E_ProductDetailsPage;

test.describe('Regression Suite', () => {
    test.describe.configure({ retries: 0 });
    test.describe.configure({ mode: 'serial' });

    test.beforeAll(async() => {
        let browserTemp = await chromium.launch({ headless: true });
        let pageTemp = await browserTemp.newPage();
        isHealthyLocal = await new D2CMarketPlaceHealthCheck(pageTemp).isHealthy();
        await browserTemp.close();
        await pageTemp.close();
    });

    test.describe('Key Customer Journey 3', () => {
        test.skip(isHealthyLocal == false, 'health check FAILED; test.skip()');
        test.beforeEach(async ({ browser }) => {
            browserContext = await browser.newContext();
            page = await browserContext.newPage();
            basePage = new A_BasePage(page);
            await basePage.onBasePage();
        });

        test('Lease Online for a product using Shop All navigation', { tag: ['@regression', '@kcj3'] }, async () => {
            //user lands on home page and click on Shop All icon
            shopAllListPage = new F_ShopAllList(page);
            await basePage.clickShopAllBtn();           
            await basePage.verifyPresenceOfShopCategories();
            await basePage.clickShopAllLink();
            await shopAllListPage.verifyPresenceOfBreadCrumb();
            await basePage.verifyLocationPopUpVisibility();
            expect(page).toHaveURL(urls.SHOP_ALL_URL.SHOP_ALL_URL);

            //provide a zipcode for location 
            let locationData = new LocationData();
            await shopAllListPage.enterCityInLocationModalView(locationData.getNewYorkZipcode);
            await shopAllListPage.clickOnFirstOption();
            await shopAllListPage.verifyLocationOptionSelected(locationData.getNewYorkZipcode);
            await shopAllListPage.clickOnContinueBtn();

            //land on shop all page and perform basic assertions like url header and location
            expect(page).toHaveURL(urls.SHOP_ALL_URL.SHOP_ALL_URL);
            await shopAllListPage.verifyPresenceOfShopAllHeader();
            await shopAllListPage.verifyLocationSelectedOnProductIndexPage(locationData.getNewYorkCityName);

            //Click on fliters button and apply filters for retailer and categories
            await shopAllListPage.clickOnFilterBtn();
            await shopAllListPage.selectCategoryFilter(CATEGORIES.LAPTOPS);
            let featuredRetailersData = new FeaturedRetailerData();
            await shopAllListPage.selectRetailerFilter(featuredRetailersData.getAmazon);
            //await shopAllListPage.selectBrandFilter(BRANDS.ASUS);
            await shopAllListPage.applyFilter();
            await shopAllListPage.clickOnLoadMoreForProductIfApplicable(3);
            await shopAllListPage.verifyCategoryFilterIsApplied(CATEGORIES.LAPTOPS);
            await shopAllListPage.verifyRetailerFilterIsApplied(featuredRetailersData.getAmazon);
            //await shopAllListPage.verifyBrandFilterIsApplied(BRANDS.ASUS);

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

            await productDetailPage.clickOnLeaseOnlineIfNotOnlineRetailerElseVerifyAppDownloadLink(expectedProductRetailer);

        })

        test.afterEach(async () => {
            await page.close();
            await browserContext.close();
        });
    })
})