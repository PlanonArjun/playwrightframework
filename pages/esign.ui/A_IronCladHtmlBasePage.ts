// cricket wireless approve me
import { type Page, type Locator , expect } from '@playwright/test';
import urls from '../../utils/cricket.utils/urls'

class A_IronCladHtmlBasePage {

    readonly page: Page;
    readonly consentRecurringPayment: Locator;
    readonly fieldAddressLine2: Locator;
    readonly consentPaymentDue: Locator;
    readonly continueButton: Locator;
    readonly scrollToReadButton: Locator;
    readonly signAndCompleteButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.consentRecurringPayment = this.page.locator(`[data-test-consent-recurring-payment-checkbox]>div:nth-child(1)>div:nth-child(1)>div:nth-child(1)>div[class='checkbox animation']>input`);
        this.consentPaymentDue =  this.page.locator(`[data-test-consent-payment-due-at-signing-checkbox]>div:nth-child(1)>div:nth-child(1)>div:nth-child(1)>div[class='checkbox animation']>input`);
        this.continueButton =  this.page.locator('.slim-button');
        this.scrollToReadButton =  this.page.locator('#scroll-container');
        this.signAndCompleteButton =  this.page.locator('#continue-button');

    }

    async navigate(contractUrl: string) {
        await this.page.goto(contractUrl);
    }

    async clickConsentRecurringPayment() {
        await this.page.waitForTimeout(500);
        await this.consentRecurringPayment.scrollIntoViewIfNeeded();
        await this.consentRecurringPayment.click();
    }

    async clickConsentPaymentDueAtSigning() {
        await this.page.waitForTimeout(5000);
        await this.consentPaymentDue.scrollIntoViewIfNeeded();
        await this.consentPaymentDue.click();
    }

    async clickContinueButton() {
        await this.page.waitForTimeout(500);
        await this.continueButton.scrollIntoViewIfNeeded();
        await this.continueButton.click();
    }

    async checkUrlforContractHTMLPage() {
        await this.page.waitForTimeout(4000);
        expect(this.page.url()).toContain('contract-html');
    }

    async clickScrollToRead() {
        await this.page.waitForTimeout(500);
        await this.scrollToReadButton.scrollIntoViewIfNeeded();
        await this.scrollToReadButton.click();
    }

    async clickSignAndCompleteButton() {
        await this.page.waitForTimeout(1000);
        await this.signAndCompleteButton.scrollIntoViewIfNeeded();
        await this.signAndCompleteButton.click();
    }

}
export default A_IronCladHtmlBasePage;
