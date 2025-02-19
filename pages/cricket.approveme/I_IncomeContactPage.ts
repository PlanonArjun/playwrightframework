// cricket wireless approve me
import { type Page, type Locator , expect } from '@playwright/test';

class I_IncomeContactPage { // housing type rent own

    readonly page: Page;
    readonly fieldEmployerName: Locator;
    readonly fieldEmployerPhone: Locator;
    readonly fieldEmployerZipCode: Locator;
    readonly buttonNEXT: Locator;
    readonly buttonEXIT: Locator;
    readonly buttonEXITConfirm: Locator;

    constructor(page: Page) {
        this.page = page;
        this.fieldEmployerName = page.getByLabel('Employer name:');
        this.fieldEmployerPhone = page.getByLabel('Employer phone:');
        this.fieldEmployerZipCode = page.getByLabel('Employer zip code:');
        this.buttonNEXT = page.getByRole('button', { name: 'Next' });
        this.buttonEXIT = page.getByRole('button', { name: 'Exit' });
        this.buttonEXITConfirm = page.locator('div').filter({ hasText: /^Exit$/ }).getByRole('button');
    }

    async _enterEmployerName(employerName: string) {
        await this.fieldEmployerName.click();
        await this.fieldEmployerName.clear();
        await this.fieldEmployerName.fill(employerName);
    }

    async _enterEmployerPhone(employerPhone: string) {
        await this.fieldEmployerPhone.click();
        await this.fieldEmployerPhone.clear();
        await this.fieldEmployerPhone.fill(employerPhone);
    }

    async _enterEmployerZip(employerZip: string) {
        await this.fieldEmployerZipCode.click();
        await this.fieldEmployerZipCode.clear();
        await this.fieldEmployerZipCode.fill(employerZip);
    }

    async happyPathPopulate(dataIn: string[]) {
        await this._enterEmployerName(dataIn[0]);
        await this._enterEmployerPhone(dataIn[1]);
        await this._enterEmployerZip(dataIn[2]);
        await this.page.waitForTimeout(250);
        await this._NEXT();
    }

    async _NEXT() {
        // await this.buttonNEXT.click();
        await this.page.getByRole('button', { name: 'Next' }).click();
    }

    async EXIT() {
        await this.buttonEXIT.click();
        await this.buttonEXITConfirm.click();
    }

}
export default I_IncomeContactPage;
