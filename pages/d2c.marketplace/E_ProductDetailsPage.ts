import { type Page, type Locator, expect } from "@playwright/test"
import testData from '../../data/d2c.marketplace/testdata.json'

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
    private readonly applyNowBtnOnPDPPage: Locator
    private readonly estimateLeasingCostOnPDPPage: Locator

    constructor(page: Page) {
        this.page = page
        this.productDescription = page.locator('xpath=//div[@class="component--product-title"]/h1').last()
        this.productPrice = page.locator('xpath=//div[@class="component--price"]/p[contains(@aria-label, "Price") and contains(@class, "global-text-xxl")]').last()
        this.productDetailsHeader = page.locator('xpath=//div[@class="component--product-description"]/h2[text()="Product Details"]').first();
        this.productDetails = page.locator('xpath=//div[@class="component--product-description"]/p').first()
        this.availableInTheAppText = page.getByRole('paragraph').filter({ hasText: testData.pageTexts.productDetailsPage.availableInTheAppHeaderText })
        this.plDisclaimerOnPDPPage = page.getByRole('paragraph').filter({ hasText: testData.pageTexts.productDetailsPage.plDisclaimerText })
        this.onlineRetailerAppDesc = page.getByRole('paragraph').filter({ hasText: testData.pageTexts.productDetailsPage.onlineRetailerAppDescText })
        this.qrImg = this.onlineRetailerAppDesc.locator('xpath=following-sibling::div[1]/img[@alt="Scan QR to download the app"]')
        this.applyNowBtnOnPDPPage = page.getByRole("button", { name: testData.pageTexts.productDetailsPage.applyNowBtnText }).first()
        this.estimateLeasingCostOnPDPPage = page.getByRole("button", { name: testData.pageTexts.productDetailsPage.estimateCostBtnText })
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

    async verifyAppDownloadLinkForOnlineRetailer(retailer: string) {
        await expect(this.availableInTheAppText).toBeVisible()
        await expect(this.plDisclaimerOnPDPPage).toBeVisible()
        expect(await this.onlineRetailerAppDesc.innerText()).toContain(retailer)
        await expect(this.qrImg).toBeVisible()
    }

    async clickOnApplyNowBtnOnPDPPageForInStoreRetailer() {
        await this.applyNowBtnOnPDPPage.click()
    }

    async clickOnEstimateCostBtnOnPDPPageForInStoreRetailer() {
        await this.estimateLeasingCostOnPDPPage.click()
    }

}

export default E_ProductDetailsPage;