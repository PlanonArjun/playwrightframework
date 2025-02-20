// cricket wireless approve me
import { type Page, type Locator , expect } from '@playwright/test';

export enum HousingType {
    RENT,
    OWN,
}

class F_AboutYou3Page { // housing type rent own

    readonly page: Page;
    readonly housingType: HousingType;
    readonly buttonRENT: Locator;
    readonly buttonOWN: Locator;
    readonly buttonEXIT: Locator;
    readonly buttonEXITConfirm: Locator;

    constructor(page: Page, housingType: HousingType) {
        this.page = page;
        this.housingType = housingType;
        this.buttonRENT = page.getByRole('button', { name: 'Rent' });
        this.buttonOWN = page.getByRole('button', { name: 'Own' });
        this.buttonEXIT = page.getByRole('button', { name: 'Exit' });
        this.buttonEXITConfirm = page.locator('div').filter({ hasText: /^Exit$/ }).getByRole('button');
    }

    /* don't remove or reduce the sleeps in this method please thank you */
    async _selectHousingType() {
        if (this.housingType == HousingType.RENT) {
            await this.buttonRENT.click();
            await this.page.waitForTimeout(1000);
        } else {
            await this.buttonOWN.click();
            await this.page.waitForTimeout(1000);
        }
    };

    async EXIT() {
        await this.buttonEXIT.click();
        await this.buttonEXITConfirm.click();
    }

}
export default F_AboutYou3Page;
