import { type Page, type Locator, expect } from "@playwright/test"
import testData from '../../data/d2c.marketplace/testdata.json'

export class F_ShopAllList {

    private readonly page: Page
    private readonly shopAllBreadCrumb: Locator
    private readonly electronicsAndGamingBreadCrumb: Locator
    private readonly cityOrZipInputBox: Locator
    private readonly firstValueInLocationDropdown: Locator
    private readonly continueBtnForLocation: Locator
    private readonly shopAllHeader: Locator
    private readonly shopElectronicsAndGamingHeader: Locator
    private readonly shopFurnitureHeader: Locator
    private readonly locationUpdateLink: Locator
    private readonly filtersBtn: Locator
    private readonly filtersHeader: Locator
    private readonly laptopsCategory: Locator
    private readonly televisionsCategory: Locator
    private readonly retailerInputBoxOnFilterScreen: Locator
    private readonly bestBuyRetailerOptionOnFilterScreen: Locator
    private readonly amazonRetailerOptionOnFilterScreen: Locator
    private readonly brandInputBoxOnFilterScreen: Locator
    private readonly dellBrandOptionOnFilterScreen: Locator
    private readonly asusBrandOptionOnFilterScreen: Locator
    private readonly applyFiltersBtn: Locator
    private readonly clearFiltersBtn: Locator
    private readonly laptopsCategoryFilterApplied: Locator
    private readonly televisionsCategoryFilterApplied: Locator
    private readonly bestBuyRetailerFilterApplied: Locator
    private readonly amazonRetailerFilterApplied: Locator
    private readonly dellBrandFilterApplied: Locator
    private readonly asusBrandFilterApplied: Locator
    private readonly productLoadMoreBtn: Locator
    private readonly listOfRetailerNamesForProducts: Locator
    private readonly listOfProductDesc: Locator
    private readonly productSortByOption: Locator
    private readonly lowToHighProductSort: Locator
    private readonly applySorting: Locator
    private readonly listOfProductPrice: Locator
    private readonly firstProductTilePrice: Locator
    private readonly firstProductTileDesc: Locator
    private readonly firstProductTileRetailer: Locator

    constructor(page: Page) {
        this.page = page
        this.shopAllBreadCrumb = page.locator('li', { hasText: testData.pageTexts.shopAllListPage.shopAllBreadcrumbText })
        this.electronicsAndGamingBreadCrumb = page.locator('li span', { hasText: testData.pageTexts.shopAllListPage.electronicsAndGamingBreadcrumbText })
        this.cityOrZipInputBox = page.getByPlaceholder(testData.pageTexts.shopAllListPage.locationInputBoxPlaceholderText)
        this.firstValueInLocationDropdown = page.locator('ul[role="listbox"] li').first()
        this.continueBtnForLocation = page.locator('button', { hasText: testData.pageTexts.shopAllListPage.continueBtnText })
        this.shopAllHeader = page.locator('h1', { hasText: testData.pageTexts.shopAllListPage.shopAllHeaderText })
        this.shopElectronicsAndGamingHeader = page.locator('h1', { hasText: testData.pageTexts.shopAllListPage.shopElectronicsAndGamingHeaderText })
        this.shopFurnitureHeader = page.locator('h1', { hasText: testData.pageTexts.shopAllListPage.shopFurnitureHeaderText })
        this.locationUpdateLink = page.locator('div[class="flex items-center gap-5"] button').first()
        this.filtersBtn = page.locator('span', { hasText: testData.pageTexts.shopAllListPage.filtersBtnText })
        this.filtersHeader = page.locator('span[class="global-text-sm-semi-degular text-primary"]', { hasText: testData.pageTexts.shopAllListPage.filtersHeaderText })
        this.laptopsCategory = page.locator('span', { hasText: testData.pageTexts.shopAllListPage.laptopsCategoryFilterText })
        this.televisionsCategory = page.locator('span', { hasText: testData.pageTexts.shopAllListPage.televisionsCategoryFilterText })
        this.retailerInputBoxOnFilterScreen = page.locator('input[placeholder="Search Retailers"]')
        this.bestBuyRetailerOptionOnFilterScreen = page.locator('input[type="radio"][value="Best Buy"]')
        this.amazonRetailerOptionOnFilterScreen = page.locator('input[type="radio"][value="Amazon"]')
        this.brandInputBoxOnFilterScreen = page.locator('input[placeholder="Search Brands"]')
        this.dellBrandOptionOnFilterScreen = page.locator('input[type="radio"][value="Dell"]')
        this.asusBrandOptionOnFilterScreen = page.locator('input[type="radio"][value="ASUS"]')
        this.applyFiltersBtn = page.locator('button', { hasText: testData.pageTexts.shopAllListPage.applyFiltersBtnText })
        this.clearFiltersBtn = page.locator('button', { hasText: testData.pageTexts.shopAllListPage.clearFiltersBtnText })
        this.laptopsCategoryFilterApplied = page.locator('//span[contains(@class, "MuiChip-label")]/span[text()="Laptops"]')
        this.televisionsCategoryFilterApplied = page.locator('//span[contains(@class, "MuiChip-label")]/span[text()="Televisions"]')
        this.bestBuyRetailerFilterApplied = page.locator('//span[contains(@class, "MuiChip-label")]/span[text()="Best Buy"]')
        this.amazonRetailerFilterApplied = page.locator('//span[contains(@class, "MuiChip-label")]/span[text()="Amazon"]')
        this.dellBrandFilterApplied = page.locator('//span[contains(@class, "MuiChip-label")]/span[text()="Dell"]')
        this.asusBrandFilterApplied = page.locator('//span[contains(@class, "MuiChip-label")]/span[text()="ASUS"]')
        this.productLoadMoreBtn = page.locator('button[aria-label="Load more products"]', { hasText: testData.pageTexts.shopAllListPage.loadMoreBtnText })
        this.listOfRetailerNamesForProducts = page.locator('xpath=//div[@class="component--filter-products"]/descendant::a/div/div/p[contains(@class, "global-text-xs-bold")]')
        this.listOfProductDesc = page.locator('xpath=//div[@class="component--filter-products"]/descendant::a/div/div/p[contains(@class, "global-text-xs-bold")]/following-sibling::p')
        this.productSortByOption = page.getByRole('button', { name: testData.pageTexts.shopAllListPage.productSortByOptionText })
        this.lowToHighProductSort = page.locator('input[value="lowToHigh"]')
        this.applySorting = page.locator('button', { hasText: /^Apply$/ })
        this.listOfProductPrice = page.locator('xpath=//div[@class="component--filter-products"]/descendant::a/div/div/div/p[contains(@aria-label, "rice")]')
        this.firstProductTilePrice = this.listOfProductPrice.first()
        this.firstProductTileDesc = this.listOfProductDesc.first()
        this.firstProductTileRetailer = this.listOfRetailerNamesForProducts.first()
    }

    async verifyPresenceOfBreadCrumb() {
        await expect(this.shopAllBreadCrumb).toBeVisible({ timeout: 50000 })
    }

    async verifyPresenceOfCategoryInBreadCrumb(category: string) {
        if (category === testData.pageTexts.shopAllListPage.electronicsAndGamingBreadcrumbText) {
            await expect(this.electronicsAndGamingBreadCrumb).toBeVisible()
        } else {
            throw new Error(`Test failed: Category mismatch`)
        }
    }

    async enterCityInLocationModalView(city: string) {
        await this.cityOrZipInputBox.fill(city)
    }

    async clickOnFirstOption() {
        await expect(this.firstValueInLocationDropdown).toBeVisible({ timeout: 10000 });
        await this.firstValueInLocationDropdown.click()
    }

    async verifyLocationOptionSelected(city: string) {
        expect(await this.cityOrZipInputBox.getAttribute('value')).toContain(city)
    }

    async clickOnContinueBtn() {
        await this.continueBtnForLocation.click()
    }

    async verifyPresenceOfShopAllHeader() {
        await expect(this.shopAllHeader).toBeVisible()
    }

    async verifyPresenceOfShopCategoryHeader(category: string) {
        if (testData.pageTexts.shopAllListPage.shopElectronicsAndGamingHeaderText.includes(category)) {
            await expect(this.shopElectronicsAndGamingHeader).toBeVisible()
        } else if (testData.pageTexts.shopAllListPage.shopFurnitureHeaderText.includes(category)) {
            await expect(this.shopFurnitureHeader).toBeVisible()
        } else {
            throw new Error(`Test failed: Category mismatch`)
        }
    }

    async verifyLocationSelectedOnProductIndexPage(city: string) {
        await expect(this.locationUpdateLink).toContainText(city)
    }

    async clickOnFilterBtn() {
        await this.filtersBtn.scrollIntoViewIfNeeded()
        await this.filtersBtn.click()
        await expect(this.filtersHeader).toBeVisible()
    }

    async selectCategoryFilter(category: string) {
        if (category === testData.pageTexts.shopAllListPage.laptopsCategoryFilterText) {
            await this.laptopsCategory.click()
        } else if (category === testData.pageTexts.shopAllListPage.televisionsCategoryFilterText) {
            await this.televisionsCategory.click()
        } else {
            throw new Error(`Test failed: Category mismatch`)
        }
    }

    async selectRetailerFilter(retailer: string) {
        await this.retailerInputBoxOnFilterScreen.scrollIntoViewIfNeeded()
        await this.retailerInputBoxOnFilterScreen.fill(retailer)
        expect(await this.retailerInputBoxOnFilterScreen.getAttribute('value')).toContain(retailer)
        if (retailer === 'Best Buy') {
            await this.bestBuyRetailerOptionOnFilterScreen.check()
            expect(await this.bestBuyRetailerOptionOnFilterScreen.isChecked()).toBeTruthy()
        } else if (retailer === 'Amazon') {
            await this.amazonRetailerOptionOnFilterScreen.check()
            expect(await this.amazonRetailerOptionOnFilterScreen.isChecked()).toBeTruthy()
        }
    }

    async selectBrandFilter(brand: string) {
        await this.brandInputBoxOnFilterScreen.scrollIntoViewIfNeeded()
        await this.brandInputBoxOnFilterScreen.fill(brand)
        expect(await this.brandInputBoxOnFilterScreen.getAttribute('value')).toContain(brand)
        if (brand === 'Dell') {
            await this.dellBrandOptionOnFilterScreen.check()
            expect(await this.dellBrandOptionOnFilterScreen.isChecked()).toBeTruthy()
        } else if (brand === 'ASUS') {
            await this.asusBrandOptionOnFilterScreen.check()
            expect(await this.asusBrandOptionOnFilterScreen.isChecked()).toBeTruthy()
        }
    }

    async applyFilter() {
        await this.applyFiltersBtn.click()
    }

    async clearFilter() {
        await this.clearFiltersBtn.click()
    }

    async verifyCategoryFilterIsApplied(categoryFilter: string) {
        if (categoryFilter === testData.pageTexts.shopAllListPage.laptopsCategoryFilterText) {
            await expect(this.laptopsCategoryFilterApplied).toBeVisible()
        } else if (categoryFilter === testData.pageTexts.shopAllListPage.televisionsCategoryFilterText) {
            await expect(this.televisionsCategoryFilterApplied).toBeVisible()
        } else {
            throw new Error(`Test failed: Category mismatch`)
        }
    }

    async verifyRetailerFilterIsApplied(retailerFilter: string) {
        if (retailerFilter === 'Best Buy') {
            await expect(this.bestBuyRetailerFilterApplied).toBeVisible()
            const listOfRetailerName = await this.listOfRetailerNamesForProducts.allTextContents()
            expect(listOfRetailerName.length).toBeGreaterThan(0);
            expect(listOfRetailerName.every(retailer => retailer === retailerFilter)).toBeTruthy()
        } else if (retailerFilter === 'Amazon') {
            await expect(this.amazonRetailerFilterApplied).toBeVisible()
            const listOfRetailerName = await this.listOfRetailerNamesForProducts.allTextContents()
            expect(listOfRetailerName.length).toBeGreaterThan(0);
            expect(listOfRetailerName.every(retailer => retailer === retailerFilter)).toBeTruthy()
        }
    }

    async verifyBrandFilterIsApplied(brandFilter: string) {
        if (brandFilter === 'Dell') {
            await expect(this.dellBrandFilterApplied).toBeVisible()
            const listOfProductDecription = await this.listOfProductDesc.evaluateAll((elements) =>
                elements.map(el => (el as HTMLElement).innerText))
            expect(listOfProductDecription.every(desc => desc.includes(brandFilter))).toBeTruthy()
        } else if (brandFilter === 'ASUS') {
            await expect(this.asusBrandFilterApplied).toBeVisible()
            const listOfProductDecription = await this.listOfProductDesc.evaluateAll((elements) =>
                elements.map(el => (el as HTMLElement).innerText))
            expect(listOfProductDecription.every(desc => desc.includes(brandFilter))).toBeTruthy()
        }
    }

    async clickOnLoadMoreForProductIfApplicable(numberOfIterations: number) {
        await this.page.waitForTimeout(1000)
        if (await this.productLoadMoreBtn.isVisible()) {
            for (let i: number = 1; i <= numberOfIterations; i++) {
                await this.productLoadMoreBtn.scrollIntoViewIfNeeded()
                await this.productLoadMoreBtn.click()
                await this.page.waitForTimeout(500)
                if (!await this.productLoadMoreBtn.isVisible()) {
                    break
                }
            }
        }
    }

    async applyLowToHighPriceSorting() {
        await this.productSortByOption.scrollIntoViewIfNeeded()
        await this.productSortByOption.click()
        await this.lowToHighProductSort.check()
        expect(await this.lowToHighProductSort.isChecked()).toBeTruthy()
        await this.applySorting.click()
        await this.clickOnLoadMoreForProductIfApplicable(3)
        const listOfPriceText = await this.listOfProductPrice.allTextContents()
        expect(listOfPriceText.length).toBeGreaterThan(0);
        const prices = listOfPriceText.map(price => parseFloat(price.replace(/[^0-9.]/g, '')))
        const isSorted = prices.every((val, i, arr) => i === 0 || arr[i - 1] <= val);
        expect(isSorted).toBe(true);
    }

    async clickOnFirstProductTile() {
        await this.firstProductTilePrice.click()
        await expect(this.page).toHaveTitle(testData.pageTitle.productDetailsPage, { timeout: 10000 });
    }

    async getProductDescOnPLP() {
        return await this.firstProductTileDesc.innerText()
    }

    async getProductPriceOnPLP() {
        return await this.firstProductTilePrice.innerText()
    }

    async getProductRetailerNameOnPLP() {
        return await this.firstProductTileRetailer.innerText()
    }

}

export default F_ShopAllList;