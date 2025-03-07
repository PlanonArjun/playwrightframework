import { type Page, type Locator , expect } from '@playwright/test';

class H_DirDepPage {
    readonly page: Page;
    readonly buttonDirectDepositYes: Locator;
    readonly buttonDirectDepositNo: Locator;
    readonly isDirectDeposit: boolean;

    constructor(page: Page, isDirectDeposit: boolean) {
        this.page = page;
        this.isDirectDeposit = isDirectDeposit;
        this.buttonDirectDepositYes = page.getByRole('button', { name: 'Yes' });
        this.buttonDirectDepositNo = page.getByRole('button', { name: 'No' });
    }

    async happyPathGo() {
        if (this.isDirectDeposit) {
            await this.buttonDirectDepositYes.click();
        } else {
            await this.buttonDirectDepositNo.click();
        }
        await this.page.waitForTimeout(250);
    }

}
export default H_DirDepPage;