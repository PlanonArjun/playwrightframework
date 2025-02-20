// biglots approve me
import { type Page, type Locator , expect } from '@playwright/test';

class D_AboutYou1Page {

    readonly page: Page;

    readonly fieldEmail: Locator;
    readonly fieldPhone: Locator;
    readonly buttonNEXT: Locator;
    readonly buttonEXIT: Locator;
    readonly buttonEXITConfirm: Locator;

    constructor(page: Page) {
        this.page = page;
        this.fieldEmail = page.locator('#Customer_Email');
        this.fieldPhone = page.locator('#PrimaryPhone_Number');
        this.buttonNEXT = page.getByRole('button', { name: 'Next' });
        this.buttonEXIT = page.getByRole('button', { name: 'Exit' });
        this.buttonEXITConfirm = page.locator('div').filter({ hasText: /^Exit$/ }).getByRole('button');
    }

    async _enterEmail(emailAddressIn: string) {
        await this.fieldEmail.click();
        await this.fieldEmail.clear();
        await this.fieldEmail.fill(emailAddressIn);
    }

    async _enterPhone(phoneNumberIn: string) {
        await this.fieldPhone.click();
        await this.fieldPhone.clear();
        await this.fieldPhone.fill(phoneNumberIn);
    }

    async _NEXT() {
        await this.buttonNEXT.click();
    }

    async EXIT() {
        await this.buttonEXIT.click();
        await this.buttonEXITConfirm.click();
    }

    async happyPathPopulate(dataIn: string[]) {
        await this._enterEmail(dataIn[0]);
        await this._enterPhone(dataIn[1]);
        await this._NEXT();
    }

}
export default D_AboutYou1Page;
