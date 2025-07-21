import { type Page, type Locator, expect } from "@playwright/test"

export class F_ShopAllList {

    private readonly page: Page
    private readonly shopAllBreadCrumb: Locator
    private readonly cityOrZipInputBox: Locator
    private readonly firstValueInLocationDropdown: Locator
    private readonly continueBtnForLocation: Locator
    private readonly shopAllHeader: Locator
    private readonly locationUpdateLink: Locator
    private readonly filtersBtn: Locator
    private readonly filtersHeader: Locator
    private readonly laptopsCategory: Locator
    private readonly retailerInputBoxOnFilterScreen: Locator
    private readonly bestBuyRetailerOptionOnFilterScreen: Locator
    private readonly applyFiltersBtn: Locator
    private readonly clearFiltersBtn: Locator
    private readonly laptopsCategoryFilterApplied: Locator
    private readonly bestBuyRetailerFilterApplied: Locator
    private readonly productLoadMoreBtn: Locator
    private readonly listOfRetailerNamesForProducts: Locator
    private readonly productSortByOption: Locator
    private readonly lowToHighProductSort: Locator
    private readonly applySorting: Locator
    private readonly listOfProductPrice: Locator

    constructor(page: Page) {
        this.page = page
        this.shopAllBreadCrumb = page.locator('li span', { hasText: "Shop All" })
        this.cityOrZipInputBox = page.getByPlaceholder('City or zip code')
        this.firstValueInLocationDropdown = page.locator('ul[role="listbox"] li').first()
        this.continueBtnForLocation = page.locator('button', { hasText: "Continue" })
        this.shopAllHeader = page.locator('h1', { hasText: "Shop All" })
        this.locationUpdateLink = page.locator('div[class="flex items-center gap-5"] button').first()
        this.filtersBtn = page.locator('span', { hasText: "Filters" })
        this.filtersHeader = page.locator('span[class="global-text-sm-semi-degular text-primary"]', { hasText: "Filters" })
        this.laptopsCategory = page.locator('span', { hasText: "Laptops" })
        this.retailerInputBoxOnFilterScreen = page.locator('input[placeholder="Search Retailers"]')
        this.bestBuyRetailerOptionOnFilterScreen = page.locator('input[type="radio"][value="Best Buy"]')
        this.applyFiltersBtn = page.locator('button', { hasText: "Apply Filters" })
        this.clearFiltersBtn = page.locator('button', { hasText: "Clear Filters" })
        this.laptopsCategoryFilterApplied = page.locator('//span[contains(@class, "MuiChip-label")]/span[text()="Laptops"]')
        this.bestBuyRetailerFilterApplied = page.locator('//span[contains(@class, "MuiChip-label")]/span[text()="Best Buy"]')
        this.productLoadMoreBtn = page.locator('button[aria-label="Load more products"]', { hasText: "Load more" })
        this.listOfRetailerNamesForProducts = page.locator('a div div h1')
        this.productSortByOption = page.getByRole('button', { name: 'Sort By: A to Z' })
        this.lowToHighProductSort = page.locator('input[value="Low to High"]')
        this.applySorting = page.locator('button', { hasText: "Apply" })
        this.listOfProductPrice = page.locator('//a/div/div/div/p[contains(@aria-label, "Price")]')
    }

    async verifyPresenceOfBreadCrumb() {
        await expect(this.shopAllBreadCrumb).toBeVisible({ timeout: 50000 })
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

    async verifyLocationSelectedOnProductIndexPage(city: string) {
        await expect(this.locationUpdateLink).toContainText(city)
    }

    async clickOnFilterBtn() {
        await this.filtersBtn.scrollIntoViewIfNeeded()
        await this.filtersBtn.click()
        await expect(this.filtersHeader).toBeVisible()
    }

    async selectCategoryFilter(category: string) {
        if (category === 'Laptops') {
            await this.laptopsCategory.click()
        }
    }

    async selectRetailerFilter(retailer: string) {
        await this.retailerInputBoxOnFilterScreen.scrollIntoViewIfNeeded()
        await this.retailerInputBoxOnFilterScreen.fill(retailer)
        expect(await this.retailerInputBoxOnFilterScreen.getAttribute('value')).toContain(retailer)
        await this.bestBuyRetailerOptionOnFilterScreen.check()
        expect(await this.bestBuyRetailerOptionOnFilterScreen.isChecked()).toBeTruthy()
    }

    async applyFilter() {
        await this.applyFiltersBtn.click()
    }

    async clearFilter() {
        await this.clearFiltersBtn.click()
    }

    async verifyCategoryFilterIsApplied(categoryFilter: string) {
        if (categoryFilter === 'Laptops') {
            await expect(this.laptopsCategoryFilterApplied).toBeVisible()
        }
    }

    async verifyRetailerFilterIsApplied(retailerFilter: string) {
        if (retailerFilter === 'Best Buy') {
            await expect(this.bestBuyRetailerFilterApplied).toBeVisible()
            const listOfRetailerName = await this.listOfRetailerNamesForProducts.allTextContents()
            expect(listOfRetailerName.every(retailer => retailer === retailerFilter)).toBeTruthy()
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
        const listOfPriceText = await this.listOfProductPrice.allTextContents()
        const prices = listOfPriceText.map(price => parseFloat(price.replace(/[^0-9.]/g, '')))
        const isSorted = prices.every((val, i, arr) => i === 0 || arr[i - 1] <= val);
        expect(isSorted).toBe(true);
    }

}