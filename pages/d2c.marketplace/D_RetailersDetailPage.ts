import { type Page, type Locator, expect } from "@playwright/test" 
import testData from '../../data/d2c.marketplace/testdata.json'

export class D_RetailersDetailPage {

    private readonly page: Page
    private readonly breadCrumbNavigationBar: Locator
    private readonly retailerHeader: Locator
    private readonly retailerDesc: Locator
    private readonly otherOptionsHeader: Locator
    private readonly otherOptionsDesc: Locator
    private readonly allRetailersLink: Locator
    private readonly leaseOnlineBtnOnGrandParentDetailPage: Locator
    private readonly estimateLeasingCostBtnOnGrandParentDetailPage: Locator

    constructor (page: Page) {
        this.page = page
        this.breadCrumbNavigationBar = page.locator('ol')
        this.retailerHeader = page.locator('h2[class="global-text-lg-semi-degular"]')
        this.retailerDesc = page.locator('span[class="global-text-xxs-degular"]')
        this.otherOptionsHeader = page.locator('h2', {hasText: testData.pageTexts.retailersDetailPage.otherOptionsHeaderText})
        this.otherOptionsDesc = page.locator('p', {hasText: new RegExp(testData.pageTexts.retailersDetailPage.otherOptionsDescPartialText)})
        this.allRetailersLink = page.getByRole("link", {name: testData.pageTexts.retailersDetailPage.allRetailersLinkText})
        this.leaseOnlineBtnOnGrandParentDetailPage = page.getByRole("button", {name: testData.pageTexts.retailersDetailPage.applyNowBtnPartialText}).first()
        this.estimateLeasingCostBtnOnGrandParentDetailPage = page.getByRole("button",{name: testData.pageTexts.retailersDetailPage.estimateLeasingCostBtnText})
    }

    async verifyProductKeyInBreadCrumb(productKey: string) {
        expect((await this.breadCrumbNavigationBar.allTextContents()).some(t => t.includes(productKey))).toBe(true)
    }

    async verifyPresenceOfRetailerHeader(retailerName: string) {
        expect(await this.retailerHeader.allTextContents()).toContain(retailerName)
    }

    async verifyPresenceOfRetailerDesc(retailerDesc: string) {
        expect(await this.retailerDesc.allTextContents()).toContain(retailerDesc)
    }

    async verifyOtherOptionsHeaderAndDesc(retailerProduct: string) {
        await expect(this.otherOptionsHeader).toBeVisible()
        await expect(this.otherOptionsDesc).toBeVisible()
        expect(await this.otherOptionsDesc.innerText()).toContain(retailerProduct)
    }

    async clickOnLeaseOnlineBtn() {
        await this.leaseOnlineBtnOnGrandParentDetailPage.click()
    }

    async clickOnEstimateLeasingCostBtn() {
        await this.estimateLeasingCostBtnOnGrandParentDetailPage.click()
    }

}

export default D_RetailersDetailPage;