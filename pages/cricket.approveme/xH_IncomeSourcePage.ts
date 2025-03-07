// cricket wireless approve me
import { type Page, type Locator , expect } from '@playwright/test';

export enum IncomeSource {
    FT = "EmployedFullTime",
    PT = "EmployedPartTime",
    SE = "SelfEmployed",
    SS = "SocialSecurity",
    OTHER = "Other",
}

class XH_IncomeSourcePage { // housing type rent own

    readonly page: Page;
    readonly incomeSource: IncomeSource;
    readonly menuIncomeSource: Locator;
    readonly buttonNEXT: Locator;
    readonly buttonEXIT: Locator;
    readonly buttonEXITConfirm: Locator;

    constructor(page: Page, incomeSource: IncomeSource) {
        this.page = page;
        this.incomeSource = incomeSource;
        this.menuIncomeSource = page.getByLabel('Primary source of income:');
        this.buttonNEXT = page.getByRole('button', { name: 'Next' });
        this.buttonEXIT = page.getByRole('button', { name: 'Exit' });
        this.buttonEXITConfirm = page.locator('div').filter({ hasText: /^Exit$/ }).getByRole('button');
    }

    /* don't remove or reduce the sleeps in this method please thank you */
    async _selectIncomeSource() {

        switch(this.incomeSource) {
            case IncomeSource.FT: {
                await this.menuIncomeSource.selectOption('string:' + IncomeSource.FT.toString());
                await this.page.waitForTimeout(250);
                break;
            }
            case IncomeSource.PT: {
                await this.menuIncomeSource.selectOption('string:' + IncomeSource.PT.toString());
                await this.page.waitForTimeout(250);
                break;
            }
            case IncomeSource.SE: {
                await this.menuIncomeSource.selectOption('string:' + IncomeSource.SE.toString());
                await this.page.waitForTimeout(250);
                break;
            }
            case IncomeSource.SS: {
                await this.menuIncomeSource.selectOption('string:' + IncomeSource.SS.toString());
                await this.page.waitForTimeout(250);
                break;
            }
            case IncomeSource.OTHER: {
                await this.menuIncomeSource.selectOption('string:' + IncomeSource.OTHER.toString());
                await this.page.waitForTimeout(250);
                break;
            }
        }
        await this._NEXT();
    };

    async _NEXT() {
        await this.buttonNEXT.click();
        await this.page.waitForTimeout(1000);
    }

    async EXIT() {
        await this.buttonEXIT.click();
        await this.buttonEXITConfirm.click();
    }

}
export default XH_IncomeSourcePage;
