// c_aboutYou1 
// Lowes Apply Approve me 
import { type Page, type Locator, expect } from '@playwright/test';
import B_BeforeStartPage from './B_BeforeStartPage';
import A_MarketingPage from './A_MarketingPage';


class E_HomeAddress {
    readonly page: Page;
    readonly a_marketingPage: A_MarketingPage;
    readonly b_beforeStartPage: B_BeforeStartPage;

    readonly homeAddressLine1: Locator;
    readonly homeAddressLine2: Locator;
    readonly cityName: Locator;
    readonly menuState: Locator;
    readonly selectState: Locator;
    readonly zipCode: Locator;

    constructor(page: Page) {
        this.page = page;
        this.a_marketingPage = new A_MarketingPage(this.page);
        this.b_beforeStartPage = new B_BeforeStartPage(this.page);
        this.homeAddressLine1 = page.locator('#Address_Line1');
        this.homeAddressLine2 = page.locator('#Address_Line2');
        this.cityName = page.locator('#Address_City');
        this.menuState = page.locator('#Address_State');
        this.selectState = page.getByText('UT');
        this.zipCode = page.locator('#Address_Zip');
    }

    async _enterAddressLine1(addressLine: string) {
        await this.homeAddressLine1.clear();
        await this.homeAddressLine1.fill(addressLine);
    }

    async _enterAddressLine2(addressLine: string) {
        await this.homeAddressLine2.clear();
        await this.homeAddressLine2.fill(addressLine);
    }

    async _enterCityName(cityName: string) {
        await this.cityName.clear();
        await this.cityName.fill(cityName);
    }

    async _selectState(stateAbbreviationIn: string) {
        await this.menuState.selectOption(stateAbbreviationIn);
    }

    async _enterZip(zipCode: string) {
        await this.zipCode.click();
        await this.zipCode.clear();
        await this.zipCode.fill(zipCode);
    }
    async happyPathPopulate(dataIn: string[]) {
        await this._enterAddressLine1(dataIn[0]);
        await this.page.waitForTimeout(500);
        await this._enterAddressLine2(dataIn[1]);
        await this.page.waitForTimeout(500);
        await this._enterCityName(dataIn[2]);
        await this.page.waitForTimeout(500);
        await this._selectState(dataIn[3]);
        await this.page.waitForTimeout(500);
        await this._enterZip(dataIn[4]);
    }
}
export default E_HomeAddress;
