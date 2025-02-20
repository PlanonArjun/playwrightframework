// signet_jared approve me
import { type Page, type Locator, expect } from '@playwright/test';
class M_BankInfo2Page {

    readonly page: Page;
    readonly buttonYES: Locator;
    readonly buttonNO: Locator;
    readonly buttonNEXT: Locator;
    readonly buttonEXIT: Locator;
    readonly buttonEXITConfirm: Locator;

    constructor(page: Page) {
        this.page = page;

        this.buttonYES = page.getByRole('button', { name: 'Yes' });
        this.buttonNO = page.getByRole('button', { name: 'No' });
        this.buttonNEXT = page.getByRole('button', { name: 'Next' });
        this.buttonEXIT = page.getByRole('button', { name: 'Exit' });
        this.buttonEXITConfirm = page.locator('div').filter({ hasText: /^Exit$/ }).getByRole('button');
    }

    async setIsDirectDeposit(isDirectDeposit: boolean) {
        if (isDirectDeposit) {
            await this.buttonYES.click();
        } else {
            await this.buttonNO.click();
        }
    }

    async _NEXT() {
        await this.buttonNEXT.click();
    }

    async EXIT() {
        await this.buttonEXIT.click();
        await this.buttonEXITConfirm.click();
    }

}
export default M_BankInfo2Page;