import { type Page, type Locator , expect } from '@playwright/test';

class N_PaymentCardPage {

    readonly page: Page;

    readonly fieldCardNumber: Locator;
    readonly fieldFirstName: Locator;
    readonly fieldLastName: Locator;
    readonly buttonPREVIOUS: Locator;
    readonly selectMonthMenu: Locator;
    readonly selectYearMenu: Locator;
    readonly buttonNEXT: Locator;
    readonly buttonEXIT: Locator;
    readonly buttonEXITConfirm: Locator;

    constructor(page: Page) {
        this.page = page;

        this.fieldCardNumber = page.locator('#PaymentCard_CardNumber');
        this.selectMonthMenu = page.locator('#PaymentCard_ExpirationMonth');
        this.selectYearMenu = page.locator('#PaymentCard_ExpirationYear');
        this.fieldFirstName = page.getByPlaceholder('first');
        this.fieldLastName = page.getByPlaceholder('last');      
        this.buttonPREVIOUS = page.getByRole('link', { name: 'Privacy Policy' });
        this.buttonNEXT = page.getByRole('button', { name: 'Next' });
        this.buttonEXIT = page.getByRole('button', { name: 'Exit' });
        this.buttonEXITConfirm = page.locator('div').filter({ hasText: /^Exit$/ }).getByRole('button');
    }


    async _enterCardNumber(cardNumberIn: string) {
        await this.fieldCardNumber.click();
        await this.fieldCardNumber.clear();
        await this.fieldCardNumber.fill(cardNumberIn.toString());
    }

    async _enterMonthExpiration(monthExp: string) {
        await this.selectMonthMenu.selectOption(monthExp);
    }

    async _enterYearExpiration(yearExp: string) {
        await this.selectYearMenu.selectOption(yearExp);
    }

    async _enterNameFirst(nameFirstIn: string) {
        await this.fieldFirstName.click();
        await this.fieldLastName.fill(nameFirstIn);
    }

    async _enterNameLast(nameLastIn: string) {
        await this.fieldLastName.click();
        await this.fieldLastName.fill(nameLastIn);
    }

    async _NEXT() {
        await this.buttonNEXT.click();
        await this.page.waitForTimeout(1000);
    }

    async EXIT() {
        await this.buttonEXIT.click();
        await this.buttonEXITConfirm.click();
    }

    async happyPathPopulate(dataIn: string[]) {
        await this._enterCardNumber(dataIn[0]);
        await this._enterMonthExpiration(dataIn[1]);
        await this._enterYearExpiration(dataIn[2]);
        await this.page.waitForTimeout(1000);
        await this._enterNameFirst(dataIn[3]);
        await this._enterNameLast(dataIn[4]);
        await this.page.waitForTimeout(500);
        await this._NEXT();
    }

}
export default N_PaymentCardPage;