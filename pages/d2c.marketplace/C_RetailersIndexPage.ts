import { type Page, type Locator, expect } from "@playwright/test"
import urls from '../../utils/d2cmarketplace.utils/urls'

export class C_RetailersIndexPage {

    private readonly page: Page
    private readonly cityOrZipInputBox: Locator
    private readonly firstValueInLocationDropdown: Locator
    private readonly continueBtnForLocation: Locator
    private readonly shopRetailersHeader: Locator
    private readonly locationUpdateLink: Locator
    private readonly locationCancelBtn: Locator
    private readonly locationUpdateBtn: Locator

    constructor(page: Page) {
        this.page = page
        this.cityOrZipInputBox = page.getByPlaceholder('City or zip code')
        this.firstValueInLocationDropdown = page.locator('ul[role="listbox"] li').first()
        this.continueBtnForLocation = page.locator('button', {hasText: "Continue"})
        this.shopRetailersHeader = page.locator('h1', {hasText: "Shop Retailers"})
        this.locationUpdateLink = page.locator('div[class="flex items-center gap-5"] button').first()
        this.locationCancelBtn = page.locator('button', {hasText: "Cancel"})
        this.locationUpdateBtn = page.locator('button', {hasText: "Update"})
    }

    async enterCityInLocationModalView(city: string) {
        await this.cityOrZipInputBox.fill(city)
    }

    async clickOnFirstOption() {
        await this.firstValueInLocationDropdown.waitFor({ state: 'visible' })
        await this.firstValueInLocationDropdown.click()
    }

    async verifyLocationOptionSelected(city: string) {
        expect(await this.cityOrZipInputBox.getAttribute('value')).toContain(city)
    }

    async clickOnContinueBtn() {
        await this.continueBtnForLocation.click()
    }

    async getCurrentURL() {
        this.page.waitForLoadState()
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

}

export default C_RetailersIndexPage;