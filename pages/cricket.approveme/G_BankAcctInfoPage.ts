import { type Page, type Locator , expect } from '@playwright/test';

class G_BankAcctInfoPage {
    readonly page: Page;
    readonly fieldRouting: Locator;
    readonly fieldChecking: Locator;
    readonly fieldOpenYears: Locator;
    readonly fieldOpenMonths: Locator;

    readonly buttonNEXT: Locator;
    readonly buttonEXIT: Locator;
    readonly buttonEXITConfirm: Locator;

    constructor(page: Page) {
        this.page = page;
        this.fieldRouting = page.getByRole('textbox', { name: 'Bank routing number: info-icon' });
        this.fieldChecking = page.getByRole('textbox', { name: 'Checking account number: info' });
        this.fieldOpenYears = page.locator('#BankAccount_OpenYear');
        this.fieldOpenMonths = page.locator('#BankAccount_OpenMonth');
        this.buttonNEXT = page.getByRole('button', { name: 'Next' });
        this.buttonEXIT = page.getByRole('button', { name: 'Exit' });
        this.buttonEXITConfirm = page.locator('div').filter({ hasText: /^Exit$/ }).getByRole('button');
    }

    async _enterRouting(routingIn: string) {
        await this.fieldRouting.click();
        await this.page.waitForTimeout(250);
        await this.fieldRouting.fill(routingIn);
    }

    async _enterChecking(checkingIn: string) {
        await this.fieldChecking.click();
        await this.page.waitForTimeout(250);
        await this.fieldChecking.fill(checkingIn);
    }

    async _enterYears(yearsIn: string) {
        await this.fieldOpenYears.fill(yearsIn);
        await this.page.waitForTimeout(250);
    }

    async _enterMonths(monthsIn: string) {
        await this.fieldOpenMonths.fill(monthsIn);
        await this.page.waitForTimeout(250);
    }

    async _NEXT() {
        await this.buttonNEXT.click();
    }

    async _EXIT() {
        await this.buttonEXIT.click();
        await this.buttonEXITConfirm.click();
    }

    async happyPathPopulate(dataIn: string[]) {
        await this._enterRouting(dataIn[0]);
        await this._enterChecking(dataIn[1]); // hard coded to monthly temporarily
        await this._enterYears(dataIn[2]);
        await this._enterMonths(dataIn[3]);
        await this._NEXT();
    }

}
export default G_BankAcctInfoPage;