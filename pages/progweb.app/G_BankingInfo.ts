// progWeb application
import { type Page, type Locator, expect } from '@playwright/test';

class G_BankingInfo {

    readonly page: Page;
    readonly updatebankDetails: Locator;
    readonly routingNumber: Locator;
    readonly accountNumber: Locator;
    readonly frequency: Locator;
    readonly saveButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.updatebankDetails = page.locator('#Bank_Panel_Button_Update');
        this.routingNumber = page.locator('#pg-input-4');
        this.accountNumber = page.locator('#pg-input-5');
        this.frequency = page.locator('xpath=//span[text()="More than 1 year"]');
        this.saveButton = page.getByRole('button', { name: 'Save' });
    }

    async _updateBankDetails() {
        await this.updatebankDetails.click();
    }

    async _enterRoutingNumber(number: string) {
        await this.routingNumber.click();
        await this.routingNumber.fill(number);
    }

    async _enterAccountNumber(accNumber: string) {
        await this.accountNumber.click();
        await this.accountNumber.fill(accNumber);
    }

    async _selectFrequency() {
        await this.frequency.click({ timeout: 5000, force: true });
    }

    async _saveAddress() {
        await this.saveButton.click();
    }

    async happyPathPopulate(dataIn: string[]) {
        await this._updateBankDetails();
        await this._enterRoutingNumber(dataIn[0]);
        await this._enterAccountNumber(dataIn[1]);
        await this._selectFrequency();
        await this._saveAddress();
    }

}
export default G_BankingInfo;