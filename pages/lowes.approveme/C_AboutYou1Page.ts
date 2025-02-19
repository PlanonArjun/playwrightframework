// c_aboutYou1 
// Lowes Apply Approve me 
import { type Page, type Locator, expect } from '@playwright/test';
import B_BeforeStartPage from './B_BeforeStartPage';
import A_MarketingPage from './A_Marketingpage';


class C_AboutYou1Page {
    readonly page: Page;
    readonly a_marketingPage: A_MarketingPage;
    readonly b_beforeStartPage: B_BeforeStartPage;

    readonly fieldNameFirst: Locator;
    readonly fieldNameLast: Locator;
    readonly fieldDOB: Locator;
    readonly fieldSSN: Locator;

    constructor(page: Page) {
        this.page = page;
        this.a_marketingPage = new A_MarketingPage(this.page);
        this.b_beforeStartPage = new B_BeforeStartPage(this.page);
        this.fieldNameFirst = page.locator('#Customer_FirstName');
        this.fieldNameLast = page.locator('#Customer_LastName');
        this.fieldDOB = page.getByPlaceholder('MM/DD/YYYY');
        this.fieldSSN = page.getByPlaceholder('123-45-6789');
    }

    async _enterNameFirst(nameFirstIn: string) {
        await this.fieldNameFirst.clear();
        await this.fieldNameFirst.fill(nameFirstIn);
    }

    async _enterNameLast(nameLastIn: string) {
        await this.fieldNameLast.clear();
        await this.fieldNameLast.fill(nameLastIn);
    }

    async _enterDOB(dobIn: string) {
        await this.fieldDOB.clear();
        console.log("\ndobIn: " + dobIn);
        await this.fieldDOB.fill(dobIn);
    }

    async _enterSSN(ssnIn: string) {
        await this.fieldSSN.clear();
        console.log("ssnIn: " + ssnIn);
        await this.fieldSSN.fill(ssnIn);
    }
    async happyPathPopulate(dataIn: string[]) {
        await this._enterNameFirst(dataIn[0]);
        await this._enterNameLast(dataIn[1]);
        await this._enterDOB(dataIn[2]);
        await this._enterSSN(dataIn[3]);
    }
}
export default C_AboutYou1Page;
