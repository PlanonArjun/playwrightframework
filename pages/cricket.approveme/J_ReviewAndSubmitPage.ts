import { type Page, type Locator , expect } from '@playwright/test';

class J_ReviewQAndSubmitPage {
    readonly page: Page;
    readonly checkboxHaveReadAndAgree: Locator;
    readonly buttonSUBMIT_APPLICATION: Locator;
    readonly buttonNEXT: Locator;
    readonly buttonEXIT: Locator;
    readonly buttonEXITConfirm: Locator;

    constructor(page: Page) {
        this.page = page;
        this.checkboxHaveReadAndAgree = page.locator('label').filter({ hasText: 'I have read and I agree to' }).locator('span').first();
        this.buttonSUBMIT_APPLICATION = page.getByRole('button', { name: 'Submit Application' });
        this.buttonNEXT = page.getByRole('button', { name: 'Next' });
        this.buttonEXIT = page.getByRole('button', { name: 'Exit' });
        this.buttonEXITConfirm = page.locator('div').filter({ hasText: /^Exit$/ }).getByRole('button');
    }

    async happyPathGo() {
        await this.checkboxHaveReadAndAgree.click();
        await this.page.waitForTimeout(1000);
        await this.buttonSUBMIT_APPLICATION.click();
        await this.page.waitForTimeout(10000);
    }

    async EXIT() {
        await this.buttonEXIT.click();
        await this.buttonEXITConfirm.click();
    }

}
export default J_ReviewQAndSubmitPage;