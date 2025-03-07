// cricket wireless approve me
import { type Page, type Locator , expect } from '@playwright/test';

class XJ_IncomeHistoryPage { // housing type rent own

    readonly page: Page;
    readonly fieldYearsEmployed: Locator;
    readonly fieldMonthsEmployed: Locator;
    readonly fieldMonthlyIncome: Locator;
    readonly buttonNEXT: Locator;
    readonly buttonEXIT: Locator;
    readonly buttonEXITConfirm: Locator;

    constructor(page: Page) {
        this.page = page;
        this.fieldYearsEmployed = page.getByLabel('Length of time with current');
        this.fieldMonthsEmployed = page.getByLabel('', { exact: true });
        this.fieldMonthlyIncome = page.getByLabel('Monthly income (before tax):');
        this.buttonNEXT = page.getByRole('button', { name: 'Next' });
        this.buttonEXIT = page.getByRole('button', { name: 'Exit' });
        this.buttonEXITConfirm = page.locator('div').filter({ hasText: /^Exit$/ }).getByRole('button');
    }

    async _enterYearsEmployed(yearsIn: string) {
        await this.fieldYearsEmployed.click();
        await this.fieldYearsEmployed.clear();
        await this.fieldYearsEmployed.fill(yearsIn);
    }

    async _enterMonthsEmployed(monthsIn: string) {
        await this.fieldMonthsEmployed.click();
        await this.fieldMonthsEmployed.clear();
        await this.fieldMonthsEmployed.fill(monthsIn);
    }

    async _enterMonthlyIncome(employerZip: string) {
        await this.fieldMonthlyIncome.click();
        await this.fieldMonthlyIncome.clear();
        await this.fieldMonthlyIncome.fill(employerZip);
    }

    async happyPathPopulate(dataIn: string[]) {
        await this._enterYearsEmployed(dataIn[0]);
        await this._enterMonthsEmployed(dataIn[1]);
        await this._enterMonthlyIncome(dataIn[2]);
        await this.page.waitForTimeout(500);
        await this._NEXT();
        await this.page.waitForTimeout(500);
    }

    async _NEXT() {
        await this.buttonNEXT.click();
        await this.page.waitForTimeout(1000);
    }

    async EXIT() {
        await this.buttonEXIT.click();
        await this.buttonEXITConfirm.click();
    }

}
export default XJ_IncomeHistoryPage;
