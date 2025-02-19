import { type Page, type Locator , expect } from '@playwright/test';
class P_ConfirmSubmit {

    readonly page: Page;

    readonly checkboxSameAs: Locator;
    readonly buttonSUBMIT_APPLICATION: Locator;
    readonly buttonEXIT: Locator;
    readonly buttonEXITConfirm: Locator;

    constructor(page: Page) {
        this.page = page;

        this.checkboxSameAs = page.locator('label').filter({ hasText: 'I have read and I agree to' }).locator('span').first();
        this.buttonSUBMIT_APPLICATION = page.getByRole('button', { name: 'Submit Application' });
        this.buttonEXIT = page.getByRole('button', { name: 'Exit' });
        this.buttonEXITConfirm = page.locator('div').filter({ hasText: /^Exit$/ }).getByRole('button');
    }

    async submitApplication() {
        await this.checkboxSameAs.scrollIntoViewIfNeeded();
        await this._checkSameAs();
        await this._SUBMIT();
    }

    async _checkSameAs() {
        if(!(await this.checkboxSameAs.isChecked())) {
            await this.checkboxSameAs.check();
        }
        await this.page.waitForTimeout(500);
    }

    async _SUBMIT() {
        await this.buttonSUBMIT_APPLICATION.click();
        await this.page.waitForTimeout(12000); // do not remove or reduce
    }

    async EXIT() {
        await this.buttonEXIT.click();
        await this.buttonEXITConfirm.click();
    }

}
export default P_ConfirmSubmit