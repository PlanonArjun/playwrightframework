// biglots approve me
import { type Page, type Locator , expect } from '@playwright/test';

class I_EmployerDuration {

    readonly page: Page;

    readonly fieldYrs: Locator;
    readonly fieldMonth: Locator;
    readonly fieldIncome: Locator;
    readonly buttonNEXT: Locator;
    readonly buttonEXIT: Locator;
    readonly buttonEXITConfirm: Locator;

    constructor(page: Page) {
        this.page = page;
        this.fieldYrs = page.locator('#IncomeSource_EmployedYears');
        this.fieldMonth = page.locator('#IncomeSource_EmployedMonths');
        this.fieldIncome = page.locator('#IncomeSource_MonthlyIncome');
        this.buttonNEXT = page.getByRole('button', { name: 'Next' });
        this.buttonEXIT = page.getByRole('button', { name: 'Exit' });
        this.buttonEXITConfirm = page.locator('div').filter({ hasText: /^Exit$/ }).getByRole('button');
    }

    async _enterYears(EmpYears: string) {
        await this.fieldYrs.click();
        await this.fieldYrs.clear();
        await this.fieldYrs.fill(EmpYears);
    }

    async _enterMonths(empMonths: string) {
        await this.fieldMonth.click();
        await this.fieldMonth.clear();
        await this.fieldMonth.fill(empMonths);
    }

    async _enterIncome(empIncome: string) {
        await this.fieldIncome.click();
        await this.fieldIncome.clear();
        await this.fieldIncome.fill(empIncome);
    }

    async _NEXT() {
        await this.buttonNEXT.click();
    }

    async EXIT() {
        await this.buttonEXIT.click();
        await this.buttonEXITConfirm.click();
    }

    async happyPathPopulate(dataIn: string[]) {
        await this._enterYears(dataIn[0]);
        await this._enterMonths(dataIn[1]);
        await this._enterIncome(dataIn[2]);
        await this._NEXT();
    }

}
export default I_EmployerDuration;