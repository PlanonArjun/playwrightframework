import { type Page, type Locator, expect } from "@playwright/test"
import { getStoreTypeByName } from "data/d2c.marketplace/ProductMapping"

export class E_ProductDetailsPage {

    private readonly page: Page
    private readonly productDescription: Locator
    private readonly productPrice: Locator
    private readonly productDetails: Locator
    private readonly productDetailsHeader: Locator
    private readonly availableInTheAppText: Locator
    private readonly plDisclaimerOnPDPPage: Locator
    private readonly onlineRetailerAppDesc: Locator
    private readonly qrImg: Locator

    constructor(page: Page) {
        this.page = page
        this.productDescription = page.locator('xpath=//div[@class="component--product-title"]/h1').last()
        this.productPrice = page.locator('xpath=//div[@class="component--price"]/p[contains(@aria-label, "Price") and contains(@class, "global-text-xxl")]').last()
        this.productDetailsHeader = page.locator('xpath=//div[@class="component--product-description"]/h2[text()="Product Details"]').first();
        this.productDetails = page.locator('xpath=//div[@class="component--product-description"]/p').first()
        this.availableInTheAppText = page.getByRole('paragraph').filter({ hasText: 'Available in the App!' })
        this.plDisclaimerOnPDPPage = page.getByRole('paragraph').filter({ hasText: 'As an affiliate, Progressive Leasing earns from qualifying purchases.' })
        this.onlineRetailerAppDesc = page.getByRole('paragraph').filter({ hasText: 'Use our app to start your lease' })
        this.qrImg = this.onlineRetailerAppDesc.locator('xpath=following-sibling::div[1]/img[@alt="Scan QR to download the app"]')
    }

    async getProductDescription() {
        await expect(this.productDescription).toBeVisible()
        return await this.productDescription.evaluate((el) => {
            const raw = (el as HTMLElement).innerText;
            const textarea = document.createElement('textarea');
            textarea.innerHTML = raw;
            return textarea.value;
        });
    }

    async getProductDetails() {
        await expect(this.productDetailsHeader).toBeVisible()
        return await this.productDetails.evaluate((el) => {
            const raw = (el as HTMLElement).innerText;
            const textarea = document.createElement('textarea');
            textarea.innerHTML = raw;
            return textarea.value;
        });
    }

    async getProductPrice() {
        await expect(this.productPrice).toBeVisible()
        return await this.productPrice.innerHTML()
    }

    async clickOnLeaseOnlineIfNotOnlineRetailerElseVerifyAppDownloadLink(retailer: string) {
        if (getStoreTypeByName(retailer) === 'Online') {
            await this.verifyAppDownloadLinkForOnlineRetailer(retailer)
        } else {
            await this.verifyLeaseOnlineButtonOnPDPPage()
        }
    }

    private async verifyAppDownloadLinkForOnlineRetailer(retailer: string) {
        await expect(this.availableInTheAppText).toBeVisible()
        await expect(this.plDisclaimerOnPDPPage).toBeVisible()
        expect(await this.onlineRetailerAppDesc.innerText()).toContain(retailer)
        await expect(this.qrImg).toBeVisible()
    }

    private async verifyLeaseOnlineButtonOnPDPPage() {

    }

    private async verifyEstimateCostButtonOnPDPPage() {

    }

}

export default E_ProductDetailsPage;