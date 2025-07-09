import { type Page, type Locator, expect } from "@playwright/test"
import urls from '../../utils/d2cmarketplace.utils/urls'
import { LANGUAGE } from "$utils/d2cmarketplace.utils/language"
import { PL } from "$utils/d2cmarketplace.utils/pl"

export class C_RetailersIndexPage {

    private readonly page: Page
    private readonly cityOrZipInputBox: Locator
    private readonly firstValueInLocationDropdown: Locator
    private readonly continueBtnForLocation: Locator

    constructor(page: Page) {
        this.page = page
        this.cityOrZipInputBox = page.getByPlaceholder('City or zip code')
        this.firstValueInLocationDropdown = page.locator('ul[role="listbox"] li').first()
        this.continueBtnForLocation = page.locator('button', {hasText: "Continue"})
    }

    async enterCityInLocationModalView(city: string) {
        await this.cityOrZipInputBox.fill(city)
    }

    async clickOnFirstOption() {
        await this.firstValueInLocationDropdown.waitFor({ state: 'visible' })
        await this.firstValueInLocationDropdown.click()
    }

    async verifyLocationOptionSelected() {
         
    }

    async clickOnContinueBtn() {
        await this.continueBtnForLocation.click()
    }

}

export default C_RetailersIndexPage;