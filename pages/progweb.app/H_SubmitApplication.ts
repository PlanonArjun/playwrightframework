// progWeb application
import { type Page, type Locator, expect } from '@playwright/test';

class H_SubmitApplication {

    readonly page: Page;
    readonly buttonContinue: Locator;
    readonly buttonsubmit: Locator;
    readonly leaseStatus: Locator;
    readonly lastPayDate: Locator;
    readonly selectDate: Locator;
    readonly nextPayDate: Locator;
    readonly buttonContinueDate: Locator;
    readonly selectNextDate: Locator;
    readonly declineCookie: Locator;

    constructor(page: Page) {
        this.page = page;
        this.buttonContinue = page.locator('div').filter({ hasText: 'Continue' }).locator('#Reapply_Review_Continue_Button');
        this.lastPayDate = page.locator('div').filter({ hasText: /^Last pay day$/ }).locator('div');
        this.selectDate = page.getByText('2', { exact: true }).first();
        this.nextPayDate = page.locator('div').filter({ hasText: /^Next pay day$/ }).locator('div');
        this.nextPayDate = page.getByText('28', { exact: true });
        this.buttonsubmit =page.locator('div').filter({ hasText: 'Agree and submit' }).locator('#Disclosures_Button_Submit');
        this.buttonContinueDate = page.getByRole('button', { name: 'Continue' });
        this.declineCookie = page.getByRole('button', { name: 'Accept' });
    }

    async _clickContinue() {
        await this.buttonContinue.click();
    }

    async _selectLastpayDate() {
        await this.lastPayDate.click();
        await this.selectDate.click();
    }

    async _selectNextpayDate() {
        await this.nextPayDate.click();
        await this.selectNextDate.click();
    }
    async _clickContinueAfterDate() {
        await this.buttonContinueDate.click();
    }

    async _declineCookieBar() {
        await this.declineCookie.click();
    }

    async _clickSubmit() {
        await this.buttonsubmit.click();
    }

    async _checkLeaseStatus() {
        await expect(this.leaseStatus).toBeVisible;
    }

    async happyPathPopulate() {
        await this._clickContinue();
        await this._selectLastpayDate();
        await this._declineCookieBar();
        await this._clickContinueAfterDate();
        await this._clickSubmit();
    }

}
export default H_SubmitApplication;