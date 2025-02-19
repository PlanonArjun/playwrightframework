// Lowes ApproveMe
import { type Page, type Locator, expect } from '@playwright/test';
import B_BeforeStartPage from './B_BeforeStartPage';
import A_MarketingPage from './A_Marketingpage';


class F_IncomePage {
    readonly page: Page;
    readonly a_marketingPage: A_MarketingPage;
    readonly b_beforeStartPage: B_BeforeStartPage;

    readonly menuPayFrequency: Locator;
    readonly fieldPreviousPayDate: Locator;
    readonly fieldNextPayDate: Locator;
    readonly fieldMonthlyIncome: Locator;

    constructor(page: Page) {
        this.page = page;
        this.a_marketingPage = new A_MarketingPage(this.page);
        this.b_beforeStartPage = new B_BeforeStartPage(this.page);
        this.menuPayFrequency = page.locator('#IncomeSource_PayFrequencyType');
        this.fieldPreviousPayDate = page.locator('#IncomeSource_PreviousPayDate');
        this.fieldNextPayDate = page.locator('#IncomeSource_NextPayDate');
        this.fieldMonthlyIncome = page.locator('#IncomeSource_MonthlyIncome');
    }

    async _enterPayFrequency(payFrequencyIn: string) {
        await this.menuPayFrequency.selectOption(payFrequencyIn);
    }

    async _enterPreviousPayDate(payDay: string) {
        await this.fieldPreviousPayDate.click({ force: true });
        await this.page.waitForTimeout(500);
        console.log("previousPayDayIn: " + payDay);
        await this.fieldPreviousPayDate.fill(payDay);
        await this.page.keyboard.down('Enter');
        await this.page.waitForTimeout(1000);
    }

    async _enterNextPayDate(payDay: string) {
        await this.fieldNextPayDate.click({ force: true });
        await this.page.waitForTimeout(500);
        console.log("nextPayDayIn: " + payDay);
        await this.fieldNextPayDate.fill(payDay);
        await this.page.waitForTimeout(500);
        await this.page.keyboard.down('Enter');
        await this.page.waitForTimeout(1000);
    }

    async _enterMonthlyIncome(income: string) {
        await this.fieldMonthlyIncome.clear();
        await this.fieldMonthlyIncome.fill(income);
    }

    async happyPathPopulate(dataIn: string[]) {
        await this._enterPayFrequency(dataIn[0]);
        await this._enterPreviousPayDate(dataIn[1]);
        await this._enterNextPayDate(dataIn[2]);
        await this._enterMonthlyIncome(dataIn[3]);

    }
}
export default F_IncomePage;
