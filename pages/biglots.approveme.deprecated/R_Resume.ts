// biglots approve me
import { type Page, type Locator , expect } from '@playwright/test';
import B_SplashPage from "./B_SplashPage";

class R_Resume {

    readonly page: Page;
    //readonly b_splashPage: B_SplashPage;

    readonly linkResume: Locator;
    readonly fieldNameFirst: Locator;
    readonly fieldNameLast: Locator;
    readonly fieldDOB: Locator;
    readonly fieldSSN: Locator;
    readonly checkboxIHaveRead: Locator;
    readonly buttonPREVIOUS: Locator;
    readonly buttonNEXT: Locator;
    readonly buttonEXIT: Locator;
    readonly buttonEXITConfirm: Locator;

    constructor(page: Page) {
        this.page = page;
        this.linkResume = page.getByText('Resume');
        //this.b_splashPage = new B_SplashPage(this.page);
        this.fieldNameFirst = page.getByPlaceholder('first');
        this.fieldNameLast = page.getByPlaceholder('last');
        this.fieldDOB = page.getByPlaceholder('MM/DD/YYYY');
        this.fieldSSN = page.getByPlaceholder('-45-6789');
        this.checkboxIHaveRead = page.locator('xpath=//label//span[1]');
        this.buttonPREVIOUS = page.getByRole('link', { name: 'Privacy Policy' });
        this.buttonNEXT = page.getByRole('button', { name: 'Next' });
        this.buttonEXIT = page.getByRole('button', { name: 'Exit' });
        this.buttonEXITConfirm = page.locator('div').filter({ hasText: /^Exit$/ }).getByRole('button');
    }

   async resume() {
       await this.linkResume.click(); // marketing page APPLY NOW
   }

    async _enterNameFirst(nameFirstIn: string) {
        await this.fieldNameFirst.clear();
        await this.fieldNameFirst.fill(nameFirstIn);
    }

    async _enterNameLast(nameLastIn: string) {
        await this.fieldNameLast.clear();
        await this.fieldNameLast.fill(nameLastIn);
    }

    async _enterSSN(ssnIn: string) {
        await this.fieldSSN.clear();
        await this.fieldSSN.fill(ssnIn);
    }

    async selectCheckbox() {
        if(!(await this.checkboxIHaveRead.isChecked())) {
            await this.checkboxIHaveRead.check();
        }
    }

    async _NEXT() {
        await this.buttonNEXT.click();
        await this.page.waitForTimeout(1000);
    }

    async EXIT() {
        await this.buttonEXIT.click();
        await this.buttonEXITConfirm.click();
    }

    async happyPathPopulate(dataIn: string[], SSN: string) {
        await this.resume();
        await this._enterNameFirst(dataIn[0]);
        await this._enterNameLast(dataIn[1]);
        await this._enterSSN(SSN);
        await this.page.waitForTimeout(500);
        await this.selectCheckbox();
        await this._NEXT();
    }

}
export default R_Resume;
