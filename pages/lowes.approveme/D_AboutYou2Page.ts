// c_aboutYou1 
// Lowes Apply Approve me 
import { type Page, type Locator, expect } from '@playwright/test';
import B_BeforeStartPage from './B_BeforeStartPage';
import A_MarketingPage from './A_Marketingpage';

class D_AboutYou2Page {

    readonly page: Page;
    readonly a_marketingPage: A_MarketingPage;
    readonly b_beforeStartPage: B_BeforeStartPage;

    readonly fieldPhone: Locator;
    readonly fieldEmail: Locator;

    constructor(page: Page) {
        this.page = page;
        this.a_marketingPage = new A_MarketingPage(this.page);
        this.b_beforeStartPage = new B_BeforeStartPage(this.page);
        this.fieldPhone = page.locator('#Customer_MobilePhone');
        this.fieldEmail = page.locator('#Customer_Email');
    }

    async _enterPhone(phoneNumberIn: string) {
        await this.fieldPhone.click();
        await this.fieldPhone.clear();
        console.log("phoneNumberIn: " + phoneNumberIn);
        await this.fieldPhone.fill(phoneNumberIn);
    }

    async _enterEmail(emailAddressIn: string) {
        await this.fieldEmail.click();
        await this.fieldEmail.clear();
        await this.fieldEmail.fill(emailAddressIn);
    }

    async happyPathPopulate(dataIn: string[]) {
        await this._enterPhone(dataIn[0]);
        await this.page.waitForTimeout(500);
        await this._enterEmail(dataIn[1]);
        await this.page.waitForTimeout(3000);
    }
}
export default D_AboutYou2Page;
