// cricket wireless approve me
import { type Page, type Locator , expect } from '@playwright/test';

export enum Frequency {
    WEEKLY = 'string:Weekly',
    BIWEEKLY = 'string:BiWeekly',
    SEMIMONTHLY = 'string:SemiMonthly',
    MONTHLY = 'string:Monthly',
}

class XK_IncomeFrequencyPage { // housing type rent own

    readonly page: Page;
    readonly frequency: Frequency;
    readonly menuPayFrequency: Locator;
    readonly fieldPreviousPayDate: Locator;
    readonly fieldNextPayDate: Locator;
    readonly buttonNEXT: Locator;
    readonly buttonEXIT: Locator;
    readonly buttonEXITConfirm: Locator;

    constructor(page: Page, frequency: Frequency) {
        this.page = page;
        this.frequency = frequency;
        this.menuPayFrequency = page.getByLabel('How often are you paid?');
        this.fieldPreviousPayDate = page.getByLabel('Previous payday:');
        this.fieldNextPayDate = page.getByLabel('Next payday:');
        this.buttonNEXT = page.getByRole('button', { name: 'Next' });
        this.buttonEXIT = page.getByRole('button', { name: 'Exit' });
        this.buttonEXITConfirm = page.locator('div').filter({ hasText: /^Exit$/ }).getByRole('button');
    }

    /* don't remove or reduce the sleeps in this method please thank you */
    async _selectFrequency() {

        switch(this.frequency) {
            case Frequency.WEEKLY: {
                await this.menuPayFrequency.selectOption(Frequency.WEEKLY.toString());
                await this.page.waitForTimeout(250);
                break;
            }
            case Frequency.BIWEEKLY: {
                await this.menuPayFrequency.selectOption(Frequency.BIWEEKLY.toString());
                await this.page.waitForTimeout(250);
                break;
            }
            case Frequency.SEMIMONTHLY: {
                await this.menuPayFrequency.selectOption(Frequency.SEMIMONTHLY.toString());
                await this.page.waitForTimeout(250);
                break;
            }
            case Frequency.MONTHLY: {
                await this.menuPayFrequency.selectOption(Frequency.MONTHLY.toString());
                await this.page.waitForTimeout(250);
                break;
            }
        }
        await this._NEXT();
    };

    async enterDates(dataIn: string[]) {
        await this.fieldPreviousPayDate.click();
        await this.fieldPreviousPayDate.fill(dataIn[0]);
        await this.page.waitForTimeout(500);
        await this.fieldNextPayDate.click();
        await this.fieldNextPayDate.fill(dataIn[1]);
        await this.page.waitForTimeout(500);
        await this._NEXT();
        await this.page.waitForTimeout(500);
    }

    async _NEXT() {
        await this.buttonNEXT.click();
    }

    async EXIT() {
        await this.buttonEXIT.click();
        await this.buttonEXITConfirm.click();
    }

}
export default XK_IncomeFrequencyPage;
