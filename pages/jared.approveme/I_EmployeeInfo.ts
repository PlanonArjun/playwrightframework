// signet_jared approve me
import { type Page, type Locator, expect } from '@playwright/test';

class I_EmployeeInfo {

    readonly page: Page;

    readonly fieldName: Locator;
    readonly fieldPhone: Locator;
    readonly fieldZip: Locator;
    readonly buttonNEXT: Locator;
    readonly buttonEXIT: Locator;
    readonly buttonEXITConfirm: Locator;

    constructor(page: Page) {
        this.page = page;
        this.fieldName = page.locator('#IncomeSource_EmployerName');
        this.fieldPhone = page.locator('#IncomeSource_EmployerPhone');
        this.fieldZip = page.locator('#IncomeSource_Zip');
        this.buttonNEXT = page.getByRole('button', { name: 'Next' });
        this.buttonEXIT = page.getByRole('button', { name: 'Exit' });
        this.buttonEXITConfirm = page.locator('div').filter({ hasText: /^Exit$/ }).getByRole('button');
    }

    async _enterName(firstName: string) {
        await this.fieldName.click();
        await this.fieldName.clear();
        await this.fieldName.fill(firstName);
    }

    async _enterPhone(phoneNumber: string) {
        await this.fieldPhone.click();
        await this.fieldPhone.clear();
        await this.fieldPhone.fill(phoneNumber);
    }

    async _enterZip(zipCode: string) {
        await this.fieldZip.click();
        await this.fieldZip.clear();
        await this.fieldZip.fill(zipCode);
    }

    async _NEXT() {
        await this.buttonNEXT.click();
    }

    async EXIT() {
        await this.buttonEXIT.click();
        await this.buttonEXITConfirm.click();
    }

    async happyPathPopulate(dataIn: string[]) {
        await this._enterName(dataIn[0]);
        await this._enterPhone(dataIn[1]);
        await this._enterZip(dataIn[2]);
        await this._NEXT();
    }

}
export default I_EmployeeInfo;
