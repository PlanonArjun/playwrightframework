// Cricket approve me
import { type Locator, type Page } from '@playwright/test';

class I_EmployerInfo {

    readonly page: Page;
    readonly fieldEmployerName: Locator;
    readonly fieldEmployerPhone: Locator;
    readonly fieldEmployerZip: Locator;
    readonly buttonNEXT: Locator;

    constructor(page: Page) {
        this.page = page;
        this.fieldEmployerName = page.locator('#IncomeSource_EmployerName');
        this.fieldEmployerPhone = page.locator('#IncomeSource_EmployerPhone');
        this.fieldEmployerZip = page.locator('#IncomeSource_Zip');
        this.buttonNEXT = page.getByRole('button', { name: 'Next' });
    }

    async _enterEmployerName(nameIn: string) {
        await this.fieldEmployerName.fill(nameIn);
        await this.fieldEmployerName.press('Tab');
    }

    async _enterEmployerPhone(phoneIn: string) {
        await this.fieldEmployerPhone.fill(phoneIn);
    }

    async _enterEmployerZip(zipIn: string) {
        await this.fieldEmployerZip.fill(zipIn);
    }

    async _NEXT() {
        await this.buttonNEXT.click();
    }

    async doHappyPath(dataIn: string[]) {
        await this._enterEmployerName(dataIn[0]);
        await this._enterEmployerPhone(dataIn[1].toString());
        await this._enterEmployerZip(dataIn[2]);
        await this._NEXT();
    }

}
export default I_EmployerInfo;