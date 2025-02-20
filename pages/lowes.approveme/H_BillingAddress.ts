// Lowes Apply Approve me
import { type Page, type Locator, expect } from '@playwright/test';
import B_BeforeStartPage from './B_BeforeStartPage';
import A_MarketingPage from './A_Marketingpage';


class H_BillingAddress {
    readonly page: Page;
    readonly a_marketingPage: A_MarketingPage;
    readonly b_beforeStartPage: B_BeforeStartPage;

    readonly streetBillingAddress: Locator;
    readonly cityBillingAddress: Locator;
    readonly menuState: Locator;
    readonly selectState: Locator;
    readonly zipCodeBillingAddress: Locator;

    constructor(page: Page) {
        this.page = page;
        this.a_marketingPage = new A_MarketingPage(this.page);
        this.b_beforeStartPage = new B_BeforeStartPage(this.page);
        this.streetBillingAddress = page.locator('#PaymentCard_Address');
        this.cityBillingAddress = page.locator('#PaymentCard_City');
        this.menuState = page.locator('#Address_State');
        this.selectState = page.getByText('Utah');
        this.zipCodeBillingAddress = page.locator('#PaymentCard_Zip');
    }

    async _enterAddressLine1(addressLine: string) {
        await this.streetBillingAddress.clear();
        await this.streetBillingAddress.fill(addressLine);
    }

    async _enterAddressLine2(addressLine: string) {
        await this.streetBillingAddress.clear();
        await this.streetBillingAddress.fill(addressLine);
    }

    async _enterCityName(cityName: string) {
        await this.cityBillingAddress.clear();
        await this.cityBillingAddress.fill(cityName);
    }

    async _selectState(stateAbbreviationIn: string) {
        await this.menuState.selectOption(stateAbbreviationIn);
    }

    async _enterZip(zipCode: string) {
        await this.zipCodeBillingAddress.clear();
        await this.zipCodeBillingAddress.fill(zipCode);
    }
    async happyPathPopulate(dataIn: string[]) {
        await this._enterAddressLine1(dataIn[0]);
        await this._enterAddressLine2(dataIn[1]);
        await this._enterCityName(dataIn[2]);
        await this._selectState(dataIn[3]);
        await this.page.waitForTimeout(1000);
        await this._enterZip(dataIn[4]);
    }
}
export default H_BillingAddress;
