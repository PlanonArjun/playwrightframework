// biglots approve me
import { type Page, type Locator , expect } from '@playwright/test';
class O_PaymentCard2Page {

    readonly page: Page;

    readonly checkboxSameAs: Locator;
    readonly buttonNEXT: Locator;
    readonly buttonEXIT: Locator;
    readonly buttonEXITConfirm: Locator;

    constructor(page: Page) {
        this.page = page;

        this.checkboxSameAs = page.locator('.mark-placeholder');
        this.buttonNEXT = page.getByRole('button', { name: 'Next' });
        this.buttonEXIT = page.getByRole('button', { name: 'Exit' });
        this.buttonEXITConfirm = page.locator('div').filter({ hasText: /^Exit$/ }).getByRole('button');
    }

    async _checkSameAs() {
        if(!(await this.checkboxSameAs.isChecked())) {
            await this.checkboxSameAs.check();
        }
        await this.page.waitForTimeout(500);
    }

    async _NEXT() {
        await this.buttonNEXT.click();
    }

    async EXIT() {
        await this.buttonEXIT.click();
        await this.buttonEXITConfirm.click();
    }

}
export default O_PaymentCard2Page
