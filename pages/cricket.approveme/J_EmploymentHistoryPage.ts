// Cricket approve me
import { type Locator, type Page } from '@playwright/test';

class J_EmploymentHistoryPage {

    readonly page: Page;
    readonly fieldYearsEmployed: Locator;
    readonly fieldMonthsEmployed: Locator;
    readonly fieldMonthlyIncome: Locator;
    readonly buttonNEXT: Locator;

    constructor(page: Page) {
        this.page = page;
        this.fieldYearsEmployed = page.locator('#IncomeSource_EmployedYears');
        this.fieldMonthsEmployed = page.locator('#IncomeSource_EmployedMonths');
        this.fieldMonthlyIncome = page.locator('#IncomeSource_MonthlyIncome');
        this.buttonNEXT = page.getByRole('button', { name: 'Next' });
    }

    async _enterEmploymentDuration(yearsIn: string, monthsIn: string) {
        await this.fieldYearsEmployed.fill(yearsIn);
        await this.page.waitForTimeout(250);
        await this.fieldMonthsEmployed.fill(monthsIn);
        await this.page.waitForTimeout(250);
    }

    async _enterMonthlyIncome(monthlyIn: string) {
        await this.fieldMonthlyIncome.fill(monthlyIn);
        await this.page.waitForTimeout(250);
    }

    async _NEXT() {
        await this.buttonNEXT.click();
        await this.page.waitForTimeout(250);
    }

    async doHappyPath(dataIn: string[]) {
        await this._enterEmploymentDuration(dataIn[0], dataIn[1]);
        await this._enterMonthlyIncome(dataIn[2]);
        await this._NEXT();
    }

}
export default J_EmploymentHistoryPage;