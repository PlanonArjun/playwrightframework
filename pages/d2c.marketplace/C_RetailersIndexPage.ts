import { type Page, type Locator, expect } from "@playwright/test"

export class C_RetailersIndexPage {

    private readonly page: Page
    private readonly cityOrZipInputBox: Locator
    private readonly firstValueInLocationDropdown: Locator
    private readonly continueBtnForLocation: Locator
    private readonly shopRetailersHeader: Locator
    private readonly retailersBreadCrumb: Locator
    private readonly locationUpdateLink: Locator
    private readonly locationCancelBtn: Locator
    private readonly locationUpdateBtn: Locator
    private readonly retailerSearchBtn: Locator
    private readonly retailerInputBox: Locator
    private readonly firstValueInRetailerDropdown: Locator
    private readonly searchResultsHeader: Locator
    private readonly retailerSearchInputBoxWithRetailerName: Locator
    private readonly filtersBtn: Locator
    private readonly filtersHeader: Locator
    private readonly leaseToOwnOptionsHeaderInFilter: Locator
    private readonly inStoreOptionLeaseToOwnInFilter: Locator
    private readonly onlineOptionLeaseToOwnInFilter: Locator
    private readonly applyFiltersBtn: Locator
    private readonly clearFiltersBtn: Locator
    private readonly inStoreFilterApplied: Locator
    private readonly onlineFilterApplied: Locator
    private readonly loadMoreBtn: Locator
    private readonly distanceOfRetailersOrOnline: Locator
    private readonly sortByOption: Locator
    private readonly defaultSortBy: Locator
    private readonly applySorting: Locator
    private readonly crossBtnSortBy: Locator
    private readonly distanceFirstTile: Locator
    private readonly addressFirstTile: Locator
    private readonly retailerNameOnModalScreen: Locator
    private readonly leaseToOwnOptionsHeaderOnModalScreen: Locator
    private readonly retailerNameForInStoreOptionOnModalScreen: Locator
    private readonly retailerNameForOnlineOptionOnModalScreen: Locator
    private readonly addressInStoreOnModalScreen: Locator
    private readonly distanceInStoreOnModalScreen: Locator
    private readonly inStoreRadioBtnOnModalScreen: Locator
    private readonly onlineRadioBtnOnModalScreen: Locator
    private readonly applyNowModalScreen: Locator
    private readonly estimateCostModalScreen: Locator
    private readonly getDirectionsLink: Locator

    constructor(page: Page) {
        this.page = page
        this.retailersBreadCrumb = page.locator('li span', { hasText: "Retailers" })
        this.cityOrZipInputBox = page.getByPlaceholder('City or zip code')
        this.firstValueInLocationDropdown = page.locator('ul[role="listbox"] li').first()
        this.continueBtnForLocation = page.locator('button', { hasText: "Continue" })
        this.shopRetailersHeader = page.locator('h1', { hasText: "Shop Retailers" })
        this.locationUpdateLink = page.locator('div[class="flex items-center gap-5"] button').first()
        this.locationCancelBtn = page.locator('button', { hasText: "Cancel" })
        this.locationUpdateBtn = page.locator('button', { hasText: "Update" })
        this.retailerSearchBtn = page.locator('button', { hasText: "Search Retailers" })
        this.retailerInputBox = page.getByPlaceholder('Search Retailers')
        this.firstValueInRetailerDropdown = page.locator('li a div span').nth(2)
        this.searchResultsHeader = page.locator('h1', { hasText: "Search Results" })
        this.retailerSearchInputBoxWithRetailerName = page.locator('//div[contains(@class,"MuiContainer-root")]/div/button')
        this.filtersBtn = page.locator('span', { hasText: "Filters" })
        this.filtersHeader = page.locator('span[class="global-text-sm-semi-degular text-primary"]', { hasText: "Filters" })
        this.leaseToOwnOptionsHeaderInFilter = page.locator('h2', { hasText: "Lease-to-Own Options" })
        this.inStoreOptionLeaseToOwnInFilter = page.locator('input[name="In Store"]')
        this.onlineOptionLeaseToOwnInFilter = page.locator('input[name="Online"]')
        this.applyFiltersBtn = page.locator('button', { hasText: "Apply Filters" })
        this.clearFiltersBtn = page.locator('button', { hasText: "Clear Filters" })
        this.inStoreFilterApplied = page.locator('//span[contains(@class, "MuiChip-label")]/span[text()="In Store"]')
        this.onlineFilterApplied = page.locator('//span[contains(@class, "MuiChip-label")]/span[text()="Online"]')
        this.loadMoreBtn = page.locator('button', { hasText: "Load more" })
        this.distanceOfRetailersOrOnline = page.locator('span[class="global-text-xxs-medium text-secondary"]')
        this.sortByOption = page.locator('span[class="global-text-sm-medium"]', { hasText: "Sort By:" })
        this.defaultSortBy = page.locator('input[value="nearToFar"]')
        this.applySorting = page.locator('button', { hasText: "Apply" })
        this.crossBtnSortBy = page.locator('//button[contains(@class, "MuiIconButton-sizeMedium")]')
        this.distanceFirstTile = this.distanceOfRetailersOrOnline.first()
        this.addressFirstTile = this.distanceFirstTile.locator('xpath=preceding-sibling::*[1]')
        this.retailerNameOnModalScreen = page.locator('h2[class="global-text-sm-semi-degular"]')
        this.leaseToOwnOptionsHeaderOnModalScreen = page.locator('h2[class="global-text-xs-semi-degular"]', {hasText: "Lease-to-Own Options"})
        this.retailerNameForInStoreOptionOnModalScreen = page.locator('span span[class="global-text-xs-semi"]').first()
        this.retailerNameForOnlineOptionOnModalScreen = page.locator('span span[class="global-text-xs-semi"]').last()
        this.addressInStoreOnModalScreen = this.retailerNameForInStoreOptionOnModalScreen.locator('xpath=../following-sibling::*[1]/*[1]/*[1]')
        this.inStoreRadioBtnOnModalScreen = page.locator('//input[contains(@class, "PrivateSwitchBase-input")]').first()
        this.onlineRadioBtnOnModalScreen = page.locator('//input[contains(@class, "PrivateSwitchBase-input")]').last()
        this.estimateCostModalScreen = page.locator('button', {hasText: "Estimate leasing cost"})
        this.getDirectionsLink = page.locator('a', {hasText: "Get Directions"})
    }

    async verifyPresenceOfBreadCrumb() {
        await expect(this.retailersBreadCrumb).toBeVisible({ timeout: 50000 })
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

    async getCurrentURL() {
        await this.page.waitForLoadState()
        return this.page.url()
    }

    async verifyPresenceOfShopRetailersHeader() {
        await expect(this.shopRetailersHeader).toBeVisible()
    }

    async verifyLocationSelectedOnRetailersIndexPage(city: string) {
        await expect(this.locationUpdateLink).toContainText(city)
    }

    async clickOnLocationUpdateLink() {
        await this.locationUpdateLink.click()
    }

    async clickOnCancelBtnOnLocationModalView() {
        await this.locationCancelBtn.click()
    }

    async clickOnUpdateBtnOnLocationModalView() {
        await this.locationUpdateBtn.click()
    }

    async enterRetailerInSearchInput(retailer: string) {
        await this.retailerSearchBtn.scrollIntoViewIfNeeded()
        await this.retailerSearchBtn.click()
        await this.retailerInputBox.fill(retailer)
    }

    async clickOnFirstOptionForRetailer(retailer: string) {
        expect(await this.firstValueInRetailerDropdown.textContent()).toContain(retailer)
        await this.firstValueInRetailerDropdown.click()
    }

    async searchForResults() {
        await this.retailerInputBox.press('Enter')
        await expect(this.searchResultsHeader).toBeVisible()
    }

    async verifyRetailerNameInInputBoxAfterSearch(retailerName: string) {
        expect(await this.retailerSearchInputBoxWithRetailerName.innerText()).toBe(retailerName)
    }

    async clickOnFilterBtn() {
        await this.filtersBtn.click()
        await expect(this.filtersHeader).toBeVisible()
    }

    async selectInStoreOptionForLeaseToOwnOptions() {
        await this.leaseToOwnOptionsHeaderInFilter.scrollIntoViewIfNeeded()
        await expect(this.leaseToOwnOptionsHeaderInFilter).toBeVisible()
        await this.inStoreOptionLeaseToOwnInFilter.check()
        expect(await this.inStoreOptionLeaseToOwnInFilter.isChecked()).toBeTruthy()
    }

    async selectOnlineOptionForLeaseToOwnOptions() {
        await this.leaseToOwnOptionsHeaderInFilter.scrollIntoViewIfNeeded()
        await expect(this.leaseToOwnOptionsHeaderInFilter).toBeVisible()
        await this.onlineOptionLeaseToOwnInFilter.check()
        expect(await this.onlineOptionLeaseToOwnInFilter.isChecked()).toBeTruthy()
    }

    async applyFilter() {
        await this.applyFiltersBtn.click()
    }

    async clearFilter() {
        await this.clearFiltersBtn.click()
    }

    async verifyLeaseToOwnOptionFilterIsApplied(filter: string) {
        if (filter === 'Online') {
            await expect(this.onlineFilterApplied).toBeVisible()
        } else {
            await expect(this.inStoreFilterApplied).toBeVisible()
            const listOfDistance = await this.distanceOfRetailersOrOnline.allTextContents()
            expect(listOfDistance).not.toContain('Online')
        }
    }

    async clickOnLoadMore() {
        if (await this.loadMoreBtn.isVisible()) {
            while (await this.loadMoreBtn.isVisible()) {
                await this.loadMoreBtn.scrollIntoViewIfNeeded()
                await this.loadMoreBtn.click()
                await this.page.waitForTimeout(500);
            }
        }
    }

    async verifyNearToFarSortingWithInStoreFilter() {
        await this.sortByOption.scrollIntoViewIfNeeded()
        await this.sortByOption.click()
        expect(await this.defaultSortBy.isChecked()).toBeTruthy()
        await this.crossBtnSortBy.click()
        const listOfDistance = await this.distanceOfRetailersOrOnline.allTextContents()
        const distanceValues = listOfDistance.map(text => {
            const match = text.match(/[\d.]+/);
            return match ? parseFloat(match[0]) : NaN;
        }).filter(n => !isNaN(n));
        const isSorted = distanceValues.every((val, i, arr) => i === 0 || arr[i - 1] <= val);
        expect(isSorted).toBe(true);
    }

    async clickOnFirstTile() {
        await this.distanceFirstTile.click();
    }

    async verifyInStoreDetailsOnModalScreen(retailerName: string) {
        expect(await this.retailerNameOnModalScreen.innerText()).toContain(retailerName)
        await expect(this.leaseToOwnOptionsHeaderOnModalScreen).toBeVisible()
        expect(await this.retailerNameForInStoreOptionOnModalScreen.innerText()).toContain(retailerName)
        expect(await this.addressFirstTile.innerText()).toContain(await this.addressInStoreOnModalScreen.innerText())
    }

    async selectInStoreTileFromModalScreen() {
        await this.inStoreRadioBtnOnModalScreen.check()
        expect(await this.inStoreRadioBtnOnModalScreen.isChecked()).toBeTruthy()
    }

    async clickOnEstimateCostFromModalScreen() {
        await this.estimateCostModalScreen.scrollIntoViewIfNeeded()
        await this.estimateCostModalScreen.click()
    }

    async clickOnApplyNowFromModalScreen() {

    }

    async clickOnGetDirectionLinkOnRetailerModalScreen() {
        await this.getDirectionsLink.click();
    }

}

export default C_RetailersIndexPage;