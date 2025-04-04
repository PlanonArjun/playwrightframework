// Cricket approve me
import { type Locator, type Page } from '@playwright/test';
import { IncomeSource } from '$utils/IncomeSource';

class H_IncomeSourcePage {

    readonly page: Page;
    readonly menuDropDownIncomeSource: Locator;
    readonly buttonNEXT: Locator;

    constructor(page: Page) {
        this.page = page;
        this.menuDropDownIncomeSource = page.locator('#IncomeSource_IncomeType');
        // this.buttonNEXT = page.locator('#am_button_next');
        this.buttonNEXT = page.getByRole('button', { name: 'Next' });
    }

    async _selectIncomeSource(sourceIn: IncomeSource) {
        await this.menuDropDownIncomeSource.selectOption(sourceIn.toString());
    }

    async _NEXT() {
        await this.buttonNEXT.click();
    }

    async doHappyPathFullTime() {
        await this._selectIncomeSource(IncomeSource.FULL_TIME);
        await this._NEXT();
    }

    async doHappyPathSpecified(sourceIn: IncomeSource) {
        await this._selectIncomeSource(sourceIn);
        await this._NEXT();
    }

}
export default H_IncomeSourcePage;