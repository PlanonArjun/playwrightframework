import { type Page, type Locator, expect } from "@playwright/test" 

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
        this.otherOptionsHeader = page.locator('h4', {hasText: "Looking for another option besides "})
        this.otherOptionsDesc = page.locator('p', {hasText: "No worries. Click here to see all the places  where you can do a lease-to-own purchase"})
        this.allRetailersLink = page.getByRole("link", {name: "All retailers"})
        this.leaseOnlineBtnOnGrandParentDetailPage = page.getByRole("button", {name: /Lease Online with/})
        this.estimateLeasingCostBtnOnGrandParentDetailPage = page.getByRole("button",{name: "Estimate Leasing Cost"})
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

    async verifyOtherOptionsHeaderAndDesc() {
        await expect(this.otherOptionsHeader).toBeVisible()
        await expect(this.otherOptionsDesc).toBeVisible()
    }

    async clickOnLeaseOnlineBtn() {
        await this.leaseOnlineBtnOnGrandParentDetailPage.click()
    }

    async clickOnEstimateLeasingCostBtn() {
        await this.estimateLeasingCostBtnOnGrandParentDetailPage.click()
    }

}