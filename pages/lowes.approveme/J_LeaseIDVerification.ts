// Lowes Apply Approve me
import { type Page, type Locator, expect } from '@playwright/test';
import B_BeforeStartPage from './B_BeforeStartPage';
import A_MarketingPage from './A_MarketingPage';

class J_LeaseIDVerification {
    readonly page: Page;
    readonly a_marketingPage: A_MarketingPage;
    readonly b_beforeStartPage: B_BeforeStartPage;

    readonly continueButton: Locator;
    readonly checkAccept: Locator;
    readonly buttonSubmitApplication: Locator;

    constructor(page: Page) {
        this.page = page;
        this.a_marketingPage = new A_MarketingPage(this.page);
        this.b_beforeStartPage = new B_BeforeStartPage(this.page);
        this.continueButton = page.getByRole('button', { name: 'Continue' });
        this.checkAccept = page.locator('xpath = //label//span').last();
        this.buttonSubmitApplication = page.getByRole('button', { name: 'Submit' })
    }

    async _submitApplication() {
        await this.continueButton.click();
    }

    async _checkAcceptTerms() {
        await this.checkAccept.click();
    }

    async _clickSubmit() {
        await this.buttonSubmitApplication.click();
    }

    async happyPathAcceptProceed() {
        await this._submitApplication();
        await this.page.waitForTimeout(1000);
        await this._checkAcceptTerms();
        await this.page.waitForTimeout(1000);
        await this._clickSubmit();
        await this.page.waitForTimeout(1000);
    }
}
export default J_LeaseIDVerification;
