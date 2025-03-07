import { type Page, type Locator , expect } from '@playwright/test';

class M_IncomeInfoPage {
    readonly page: Page;
    readonly buttonDirectDepositYes: Locator;
    readonly buttonDirectDepositNo: Locator;
    readonly isDirectDeposit: boolean;
    readonly buttonNEXT: Locator;
    readonly buttonEXIT: Locator;
    readonly buttonEXITConfirm: Locator;

    constructor(page: Page, isDirectDeposit: boolean) {
        this.page = page;
        this.isDirectDeposit = isDirectDeposit;
        this.buttonDirectDepositYes = page.getByRole('button', { name: 'Yes' });
        this.buttonDirectDepositNo = page.getByRole('button', { name: 'No' });

        this.buttonNEXT = page.getByRole('button', { name: 'Next' });
        this.buttonEXIT = page.getByRole('button', { name: 'Exit' });
        this.buttonEXITConfirm = page.locator('div').filter({ hasText: /^Exit$/ }).getByRole('button');
    }

    async happyPathGo() {
        if (this.isDirectDeposit) {
            await this.buttonDirectDepositYes.click();
        } else {
            await this.buttonDirectDepositNo.click();
        }
        await this.page.waitForTimeout(250);
    }

    async EXIT() {
        await this.buttonEXIT.click();
        await this.buttonEXITConfirm.click();
    }

}
export default M_IncomeInfoPage;