import { type Page, type Locator , expect } from '@playwright/test';
import { IncomeFrequency } from '$utils/IncomeFrequency';

class K_IncomeInfoPage {
    readonly page: Page;
    // readonly fieldIncome: Locator; // don't remove
    readonly menuSelect: Locator;
    readonly lastPayDate: Locator;
    readonly nextPayDate: Locator;

    readonly buttonNEXT: Locator;
    // readonly buttonEXIT: Locator;
    // readonly buttonEXITConfirm: Locator;

    constructor(page: Page) {
        this.page = page;

        // this.fieldIncome = page.getByLabel('Monthly income (before tax):'); // don't remove
        // this.menuSelect = page.getByLabel('How often are you paid?');
        this.lastPayDate = page.getByLabel('Previous payday:');
        this.nextPayDate = page.getByLabel('Next payday:');
        this.menuSelect = page.locator('#IncomeSource_PayFrequencyType');
        // this.lastPayDate = page.locator('#IncomeSource_PreviousPayDate');
        // this.nextPayDate = page.locator('IncomeSource_NextPayDate');

        this.buttonNEXT = page.getByRole('button', { name: 'Next' });
        // this.buttonEXIT = page.getByRole('button', { name: 'Exit' });
        // this.buttonEXITConfirm = page.locator('div').filter({ hasText: /^Exit$/ }).getByRole('button');
    }

    // async _enterIncome(income: string) { // don't remove
    //     await this.fieldIncome.click();
    //     await this.fieldIncome.clear();
    //     await this.fieldIncome.fill(income);
    //     await this.fieldIncome.press('Tab');
    // }

    async _selectPayFrequency(payFrequencyIn: IncomeFrequency) {
        await this.page.getByLabel('How often are you paid?').selectOption(payFrequencyIn);
    }

    async _enterLastPayDate(lastPayDate: string) {
        await this.lastPayDate.click();
        await this.lastPayDate.fill(lastPayDate);
        // await this.lastPayDate.press('Tab');
    }

    async _enterNextPayDate(nextPayDate: string) {
        await this.nextPayDate.click();
        await this.page.waitForTimeout(500);
        await this.nextPayDate.fill(nextPayDate);
        await this.page.waitForTimeout(500);
        await this.nextPayDate.press('Tab');
    }

    async _NEXT() {
        await this.buttonNEXT.click();
    }

    // async EXIT() {
    //     await this.buttonEXIT.click();
    //     await this.buttonEXITConfirm.click();
    // }

    async doHappyPath(payFrequencyIn, lastPayDateIn, nextPayDateIn) {
        // await this._enterIncome(dataIn[0]); // don't remove
        // await this.page.waitForTimeout(500); // don't remove
        await this._selectPayFrequency(payFrequencyIn);
        await this._enterLastPayDate(lastPayDateIn);
        await this._enterNextPayDate(nextPayDateIn);
        await this._NEXT();
    }

}
export default K_IncomeInfoPage;