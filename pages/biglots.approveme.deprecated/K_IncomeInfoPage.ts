// biglots approve me
import { type Page, type Locator , expect } from '@playwright/test';

class K_IncomeInfoPage {
    readonly page: Page;
    readonly fieldIncome: Locator;
    readonly menuSelect: Locator;
    readonly lastPayDate: Locator;
    readonly nextPayDate: Locator;
    readonly buttonNEXT: Locator;
    readonly buttonEXIT: Locator;
    readonly buttonEXITConfirm: Locator;

    constructor(page: Page) {
        this.page = page;

        this.menuSelect = page.getByLabel('How often are you paid?');
        this.lastPayDate = page.getByLabel('Previous payday:');
        this.nextPayDate = page.getByLabel('Next payday:');
        this.buttonNEXT = page.getByRole('button', { name: 'Next' });
        this.buttonEXIT = page.getByRole('button', { name: 'Exit' });
        this.buttonEXITConfirm = page.locator('div').filter({ hasText: /^Exit$/ }).getByRole('button');
    }

    async _selectPayFrequency(payFrequencyIn: string) {
        await this.page.getByLabel('How often are you paid?').selectOption(payFrequencyIn);
    }

    async _enterLastPayDate(lastPayDate: string) {
        await this.lastPayDate.click();
        await this.lastPayDate.fill(lastPayDate);
    }

    async _enterNextPayDate(nextPayDate: string) {
        await this.nextPayDate.click();
        await this.nextPayDate.fill(nextPayDate);
    }

    async _NEXT() {
        await this.buttonNEXT.click();
    }

    async EXIT() {
        await this.buttonEXIT.click();
        await this.buttonEXITConfirm.click();
    }

    async happyPathPopulate(dataIn: string[]) {
        await this._selectPayFrequency(dataIn[0]); // hard coded to monthly temporarily
        await this.page.waitForTimeout(500);
        await this._enterLastPayDate(dataIn[1]);
        await this.page.waitForTimeout(500);
        await this._enterNextPayDate(dataIn[2]);
        await this.page.waitForTimeout(500);
        await this._NEXT();
    }

}
export default K_IncomeInfoPage;