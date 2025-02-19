// progWeb application
import { type Page, type Locator, expect } from '@playwright/test';

class F_CreditCardDetails {

    readonly page: Page;
    readonly updateDetails: Locator;
    readonly cardNumber: Locator;
    readonly expirationDate: Locator;
    readonly saveButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.updateDetails = page.locator('#Credit_Card_Panel_Button_Update');
        this.cardNumber = page.locator('#pg-input-7');
        this.expirationDate = page.getByPlaceholder('MM/YY');
        this.saveButton = page.getByRole('button', { name: 'Save' });
    }

    async _updateDetails() {
        await this.updateDetails.click();
    }

    async _enterCardNumber(number: string) {
        await this.cardNumber.click();
        await this.page.waitForTimeout(200);
        await this.cardNumber.fill(number);
    }

    async _enterExpDate(date: string) {
        await this.expirationDate.click();
        await this.page.waitForTimeout(200);
        await this.expirationDate.fill(date);
    }
    async _saveAddress() {
        await this.saveButton.click();
    }

    async happyPathPopulate(dataIn: string[]) {
        await this._updateDetails();
        await this._enterCardNumber(dataIn[0]);
        await this._enterExpDate(dataIn[1]);
        await this._saveAddress();
    }

}
export default F_CreditCardDetails;