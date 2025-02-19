// progWeb application
import { type Page, type Locator, expect } from '@playwright/test';

class E_UpdateIncomeInfo {

    readonly page: Page;
    readonly updateInfo: Locator;
    readonly monthlyIncome: Locator;
    readonly frequency: Locator;
    readonly enterCity: Locator;
    readonly enterZip: Locator;
    readonly saveButton: Locator;
    readonly continue: Locator;
    readonly backArrow: Locator;

    constructor(page: Page) {
        this.page = page;
        this.updateInfo = page.locator('#Income_Panel_Button_Update');
        this.monthlyIncome = page.locator('#pg-input-3');
        this.frequency = page.locator('clam-radio-list-item').filter({ hasText: 'Weeklylens' }).locator('div').nth(2);
        this.saveButton = page.getByRole('button', { name: 'Save' });
        this.continue = page.locator('div').filter({ hasText: 'Continue' }).locator('#Reapply_Review_Continue_Button');
        this.backArrow = page.getByRole('banner').getByText('arrow_back');
    }


    async _clickContinue(){
        await this.continue.click();
        await this.backArrow.click();
    }

    async _updateInfo() {
        await this.updateInfo.click();
    }

    async _enterMonthlyIncome(income: string) {
        await this.monthlyIncome.fill(income);
    }

    async _selectFrequency() {
        await this.frequency.click();
    }

    async _saveAddress() {
        await this.saveButton.click();
    }

    async happyPathPopulate(dataIn: string[]) {
        await this._updateInfo();
        await this._enterMonthlyIncome(dataIn[0]);
        await this._selectFrequency();
        await this._saveAddress();
    }

}
export default E_UpdateIncomeInfo;