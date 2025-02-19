// biglots approve me
import { type Page, type Locator , expect } from '@playwright/test';
class L_BankInfo1Page {

    readonly page: Page;

    readonly fieldRoutingNumber: Locator;
    readonly fieldAccountNumber: Locator;
    readonly fieldAccountOpenYear: Locator;
    readonly fieldAccountOpenMonth: Locator;

    readonly buttonNEXT: Locator;
    readonly buttonEXIT: Locator;
    readonly buttonEXITConfirm: Locator;

    constructor(page: Page) {
        this.page = page;

        this.fieldRoutingNumber = page.getByLabel('Bank routing number:');
        this.fieldAccountNumber = page.getByLabel('Checking account number:');
        this.fieldAccountOpenYear = page.locator('#BankAccount_OpenYear');
        this.fieldAccountOpenMonth = page.locator('#BankAccount_OpenMonth');

        this.buttonNEXT = page.getByRole('button', { name: 'Next' });
        this.buttonEXIT = page.getByRole('button', { name: 'Exit' });
        this.buttonEXITConfirm = page.locator('div').filter({ hasText: /^Exit$/ }).getByRole('button');
    }

    async _enterBankRoutingNumber(routingNumberIn: string) {
        await this.fieldRoutingNumber.click();
        await this.fieldRoutingNumber.clear();
        await this.fieldRoutingNumber.fill(routingNumberIn);
    }

    async _enterBankAccountNumber(accountNumberIn: string) {
        await this.fieldAccountNumber.click();
        await this.fieldAccountNumber.clear();
        await this.fieldAccountNumber.fill(accountNumberIn.toString());
    }

    async _enterAccountOpenYear(yearIn: string) {
        await this.fieldAccountOpenYear.click();
        await this.fieldAccountOpenYear.clear();
        await this.fieldAccountOpenYear.fill(yearIn.toString());
    }

    async _enterAccountOpenMonth(monthIn: string) {
        await this.fieldAccountOpenMonth.click();
        await this.fieldAccountOpenMonth.clear();
        await this.fieldAccountOpenMonth.fill(monthIn.toString());
    }

    async _NEXT() {
        await this.buttonNEXT.click();
    }

    async EXIT() {
        await this.buttonEXIT.click();
        await this.buttonEXITConfirm.click();
    }

    async happyPathPopulate(dataIn: string[]) {
        await this._enterBankRoutingNumber(dataIn[0]);
        await this.page.waitForTimeout(500);
        await this._enterBankAccountNumber(dataIn[1]);
        await this.page.waitForTimeout(500);
        await this._enterAccountOpenYear(dataIn[2]);
        await this.page.waitForTimeout(500);
        await this._enterAccountOpenMonth(dataIn[3]);
        await this.page.waitForTimeout(500);
        await this._NEXT();
    }

}
export default L_BankInfo1Page;