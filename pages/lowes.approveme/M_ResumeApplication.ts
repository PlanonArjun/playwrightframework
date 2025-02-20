// lowes apply approve me
import { type Page, type Locator, expect } from '@playwright/test';
import urls from '../../utils/lowes.utils/urls'

class M_ResumeApplication {

    readonly page: Page;
    readonly linkResume: Locator;
    readonly linkPaymentEstimator: Locator;
    readonly buttonAPPLY_NOW: Locator;
    readonly fieldSSN: Locator;
    readonly fieldPhone: Locator;
    readonly checkTerms: Locator;
    readonly nextButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.linkResume = page.getByText('Resume');
        this.linkPaymentEstimator = page.getByText('Payment Estimator');
        this.buttonAPPLY_NOW = page.getByText('Apply Now');
        this.fieldSSN = page.locator('#ssn');
        this.fieldPhone = page.locator('#phoneNumber');
        this.checkTerms = page.locator('xpath = //label//span');
        this.nextButton = page.getByText('Next');

    }

    async navigateResume() {
        await this.page.goto(urls.resume.resume);
    }

    async _enterSSN(ssnIN: string) {
        await this.fieldSSN.click();
        await this.fieldSSN.fill(ssnIN);
    }

    async _enterPhone(phoneIn: string) {
        await this.fieldPhone.click();
        await this.fieldPhone.fill(phoneIn);
    }

    async _checkbox() {
        await this.checkTerms.click();
    }

    async _NEXT() {
        await this.nextButton.click();
    }

    async happyPathPopulate( ssn:string, phone:string) {
        await this.navigateResume();
        await this._enterSSN(ssn);
        await this._enterPhone(phone);
        await this._checkbox();
        await this._NEXT();
    }

}
export default M_ResumeApplication;