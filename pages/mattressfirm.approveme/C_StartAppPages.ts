// mattress firm approve me
import { type Page, type Locator , expect } from '@playwright/test';
import B_SplashPage from "./B_SplashPage";

class C_StartAppPage {

    readonly page: Page;
    readonly b_splashPage: B_SplashPage;

    readonly fieldNameFirst: Locator;
    readonly fieldNameLast: Locator;
    readonly fieldDOB: Locator;
    readonly fieldSSN: Locator;
    readonly buttonPREVIOUS: Locator;
    readonly buttonNEXT: Locator;
    readonly buttonEXIT: Locator;
    readonly buttonEXITConfirm: Locator;

    constructor(page: Page) {
        this.page = page;
        this.b_splashPage = new B_SplashPage(this.page);
        this.fieldNameFirst = page.getByPlaceholder('first');
        this.fieldNameLast = page.getByPlaceholder('last');
        this.fieldDOB = page.getByPlaceholder('MM/DD/YYYY');
        this.fieldSSN = page.getByPlaceholder('-45-6789');
        this.buttonPREVIOUS = page.getByRole('link', { name: 'Privacy Policy' });
        this.buttonNEXT = page.getByRole('button', { name: 'Next' });
        this.buttonEXIT = page.getByRole('button', { name: 'Exit' });
        this.buttonEXITConfirm = page.locator('div').filter({ hasText: /^Exit$/ }).getByRole('button');
    }

   async navigate() {
       await this.b_splashPage.navigate(); // marketing page APPLY NOW
       await this.b_splashPage.continue(); // splash page checkbox then CONTINUE
       await expect(this.page.getByRole('heading', { name: 'Start your lease application' })).toBeVisible();
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
        await this.fieldDOB.fill(dobIn);
    }

    async _enterSSN(ssnIn: string) {
        await this.fieldSSN.clear();
        await this.fieldSSN.fill(ssnIn);
    }

    async _NEXT() {
        await this.buttonNEXT.click();
        await this.page.waitForTimeout(1000);
        await this.buttonNEXT.click();
        await this.page.waitForTimeout(1000);
    }

    async EXIT() {
        await this.buttonEXIT.click();
        await this.buttonEXITConfirm.click();
    }

    async happyPathPopulate(dataIn: string[]) {
        await this._enterNameFirst(dataIn[0]);
        await this._enterNameLast(dataIn[1]);
        await this._enterDOB(dataIn[2]);
        await this._enterSSN(dataIn[3]);
        await this.page.waitForTimeout(500);
        await this._NEXT();
    }

}
export default C_StartAppPage;
