// Lowes Apply Approve me
import { type Page, type Locator, expect } from '@playwright/test';
import B_BeforeStartPage from './B_BeforeStartPage';
import A_MarketingPage from './A_MarketingPage';

class I_AccountDetails {
    readonly page: Page;
    readonly a_marketingPage: A_MarketingPage;
    readonly b_beforeStartPage: B_BeforeStartPage;

    readonly bankRoutingNumber: Locator;
    readonly checkingAccountNumber: Locator;
    readonly accountInfoYears: Locator;
    readonly accountInfoMonths: Locator;

    constructor(page: Page) {
        this.page = page;
        this.a_marketingPage = new A_MarketingPage(this.page);
        this.b_beforeStartPage = new B_BeforeStartPage(this.page);
        this.bankRoutingNumber = page.locator('[name = "BankAccount_RoutingNumber"]');
        this.checkingAccountNumber = page.locator('[name = "BankAccount_AccountNumber"]');
        this.accountInfoYears = page.locator('[name = "BankAccount_OpenYear"]');
        this.accountInfoMonths = page.locator('[name = "BankAccount_OpenMonth"]');
    }

    async _enterBankRoutingNumber(routingNumber: string) {
        await this.bankRoutingNumber.clear();
        await this.bankRoutingNumber.fill(routingNumber);
    }

    async _enterAccountNumber(accountNumber: string) {
        await this.checkingAccountNumber.clear();
        await this.checkingAccountNumber.fill(accountNumber);
    }

    async _enterAccountYears(years: string) {
        await this.accountInfoYears.clear();
        await this.page.waitForTimeout(2000);
        await this.accountInfoYears.fill(years);
    }

    async _enterAccountMonths(months: string) {
        await this.accountInfoMonths.clear();
        await this.accountInfoMonths.fill(months);
    }
    async happyPathPopulate(dataIn: string[]) {
        await this._enterBankRoutingNumber(dataIn[0]);
        await this._enterAccountNumber(dataIn[1]);
        await this._enterAccountYears(dataIn[2]);
        await this._enterAccountMonths(dataIn[3]);
        await this.accountInfoMonths.press('Tab');
    }
}
export default I_AccountDetails;
