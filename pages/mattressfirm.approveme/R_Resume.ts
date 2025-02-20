import { type Page, type Locator , expect } from '@playwright/test';

class R_Resume {

    readonly page: Page;
    readonly linkResume: Locator;
    readonly fieldNameFirst: Locator;
    readonly fieldNameLast: Locator;
    readonly fieldSSN: Locator;
    readonly checkboxIHaveRead: Locator;
    readonly buttonPREVIOUS: Locator;
    readonly buttonNEXT: Locator;

    constructor(page: Page) {
        this.page = page;
        this.linkResume = page.getByText('Resume');
        this.fieldNameFirst = page.getByRole('textbox', { name: 'Name:' });
        this.fieldNameLast = page.getByPlaceholder('last');
        this.fieldSSN = page.getByRole('textbox', { name: 'Social Security number or' });
        this.checkboxIHaveRead = page.locator('label').filter({ hasText: 'I have read and agree to the' }).locator('span').first();
        this.buttonPREVIOUS = page.getByRole('link', { name: 'Privacy Policy' });
        this.buttonNEXT = page.getByRole('button', { name: 'Next' });
    }

    async _enterNameFirst(nameFirstIn: string) {
        await this.fieldNameFirst.click({timeout:500});
        await this.fieldNameFirst.fill(nameFirstIn);
    }

    async _enterNameLast(nameLastIn: string) {
        await this.fieldNameLast.click({timeout:500});
        await this.fieldNameLast.fill(nameLastIn);
    }

    async _enterSSN(ssnIn: string) {
        await this.fieldSSN.click({timeout:500});
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