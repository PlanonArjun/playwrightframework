// cricket approve me resume
import { type Page, type Locator, expect } from '@playwright/test';

class R_Resume {

    readonly page: Page;

    readonly fieldNameFirst: Locator;
    readonly fieldNameLast: Locator;
    readonly fieldSSN: Locator;
    readonly checkbox: Locator;
    readonly buttonNextR: Locator;

    constructor(page: Page) {
        this.page = page;
        this.fieldNameFirst = page.getByPlaceholder('first');
        this.fieldNameLast = page.getByPlaceholder('last');
        this.fieldSSN = page.getByPlaceholder('-45-6789');
        this.checkbox = page.locator('label').filter({ hasText: 'I have read and agree to the' }).locator('span').first();
        this.buttonNextR = page.getByRole('button', { name: 'Next' });
    }

    async _enterNameFirst(nameFirstIn: string) {
        await this.fieldNameFirst.clear();
        await this.fieldNameFirst.fill(nameFirstIn);
        await this.page.waitForTimeout(100);
    }

    async _enterNameLast(nameLastIn: string) {
        await this.fieldNameLast.clear();
        await this.fieldNameLast.fill(nameLastIn);
    }

    async _enterSSN(ssnIn: string) {
        await this.fieldSSN.clear();
        await this.fieldSSN.fill(ssnIn);
        await this.fieldSSN.press('Tab');
    }

    async selectCheckbox() {
        if (!(await this.checkbox.isChecked())) {
            await this.checkbox.check();
        }
    }

    async _NEXT() {
        await this.buttonNextR.click();
        await this.page.waitForTimeout(1000);
    }

    async happyPathPopulate(dataIn: string[], SSN: string) {
        await this._enterNameFirst(dataIn[0]);
        await this._enterNameLast(dataIn[1]);
        await this._enterSSN(SSN);
        await this.page.waitForTimeout(500);
        await this.selectCheckbox();
        await this._NEXT();
    }

}
export default R_Resume;
