// cricket wireless approve me
import { type Page, type Locator , expect } from '@playwright/test';

class XL_PaymentAccountPage { // housing type rent own

    readonly page: Page;
    readonly fieldRoutingNumber: Locator;
    readonly fieldAccountNumber: Locator;
    readonly fieldYearsAccountOpen: Locator;
    readonly fieldMonthsAccountOpen: Locator;
    readonly buttonNEXT: Locator;
    readonly buttonEXIT: Locator;
    readonly buttonEXITConfirm: Locator;

    constructor(page: Page) {
        this.page = page;
        this.fieldRoutingNumber = page.getByLabel('Bank routing number:');
        this.fieldAccountNumber = page.getByLabel('Checking account number:');
        this.fieldYearsAccountOpen = page.getByLabel('How long has this account');
        this.fieldMonthsAccountOpen = page.getByLabel('', { exact: true });
        this.buttonNEXT = page.getByRole('button', { name: 'Next' });
        this.buttonEXIT = page.getByRole('button', { name: 'Exit' });
        this.buttonEXITConfirm = page.locator('div').filter({ hasText: /^Exit$/ }).getByRole('button');
    }

    async _enterRoutingNumber(routingIn: string) {
        await this.fieldRoutingNumber.click();
        await this.fieldRoutingNumber.clear();
        await this.fieldRoutingNumber.fill(routingIn);
    }

    async _enterAccountNumber(accountIn: string) {
        await this.fieldAccountNumber.click();
        await this.fieldAccountNumber.clear();
        await this.fieldAccountNumber.fill(accountIn);
    }

    async _enterYearsOpen(yearsIn: string) {
        await this.fieldYearsAccountOpen.click();
        await this.fieldYearsAccountOpen.clear();
        await this.fieldYearsAccountOpen.fill(yearsIn);
    }

    async _enterMonthsOpen(monthsIn: string) {
        await this.fieldMonthsAccountOpen.click();
        await this.fieldMonthsAccountOpen.clear();
        await this.fieldMonthsAccountOpen.fill(monthsIn);
    }

    async happyPathPopulate(dataIn: string[]) {
        await this._enterRoutingNumber(dataIn[0]);
        await this._enterAccountNumber(dataIn[1]);
        await this._enterYearsOpen(dataIn[2]);
        await this._enterMonthsOpen(dataIn[2]);
        await this.page.waitForTimeout(500);
        await this._NEXT();
        await this.page.waitForTimeout(500);
    }

    async _NEXT() {
        await this.buttonNEXT.click();
        await this.page.waitForTimeout(1000);
    }

    async EXIT() {
        await this.buttonEXIT.click();
        await this.buttonEXITConfirm.click();
    }

}
export default XL_PaymentAccountPage;
