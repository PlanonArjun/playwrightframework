// signet_jared approve me
import { type Page, type Locator, expect } from '@playwright/test';

class G_IDType {
    readonly page: Page;

    //readonly typeOfPhotoID: Locator;
    readonly menuSelect: Locator;
    readonly fieldIDNumber: Locator;
    readonly buttonNEXT: Locator;
    readonly buttonEXIT: Locator;
    readonly buttonEXITConfirm: Locator;

    constructor(page: Page) {
        this.page = page;

        this.menuSelect = page.locator('#Identification_IdentificationType');
        this.fieldIDNumber = page.locator('#Identification_Number');
        this.buttonNEXT = page.getByRole('button', { name: 'Next' });
        this.buttonEXIT = page.getByRole('button', { name: 'Exit' });
        this.buttonEXITConfirm = page.locator('div').filter({ hasText: /^Exit$/ }).getByRole('button');
    }


    async _selectTyepOfID(typeOfID: string) {
        await this.menuSelect.selectOption('US Passport');
    }

    async _enterID(id: string) {
        await this.fieldIDNumber.click();
        await this.fieldIDNumber.clear();
        await this.fieldIDNumber.fill(id);
    }

    async _NEXT() {
        await this.buttonNEXT.click();
    }

    async EXIT() {
        await this.buttonEXIT.click();
        await this.buttonEXITConfirm.click();
    }

    async happyPathPopulate(dataIn: string[]) {
        await this._selectTyepOfID(dataIn[0]); // hard coded to US Passport temporarily
        await this.page.waitForTimeout(500);
        await this._enterID(dataIn[1]);
        await this.page.waitForTimeout(500);
        await this._NEXT();
    }

}
export default G_IDType;