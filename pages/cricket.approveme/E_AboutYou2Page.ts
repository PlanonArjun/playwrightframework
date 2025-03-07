// cricket wireless approve me
import { type Page, type Locator , expect } from '@playwright/test';

class E_AboutYou2Page { // home address city state zip years & months at address

    readonly page: Page;

    readonly fieldAddressLine1: Locator;
    readonly fieldAddressLine2: Locator;
    readonly fieldCity: Locator;
    readonly menuState: Locator;
    readonly fieldZip: Locator;
    readonly fieldYearsAtAddress: Locator;
    readonly fieldMonthsAtAddress: Locator;
    readonly buttonNEXT: Locator;
    readonly buttonEXIT: Locator;
    readonly buttonEXITConfirm: Locator;

    constructor(page: Page) {
        this.page = page;

        this.fieldAddressLine1 = page.getByLabel('Home address:');
        this.fieldAddressLine2 = page.getByPlaceholder('APT / SUITE / OTHER');
        this.fieldCity = page.getByPlaceholder('CITY');
        this.menuState = page.locator('#Address_State');
        this.fieldZip = page.getByPlaceholder('ZIP');
        this.fieldYearsAtAddress = page.getByLabel('Time at current address:');
        this.fieldMonthsAtAddress = page.getByLabel('', { exact: true });
        this.buttonNEXT = page.locator('#MoveNext > span.next > span');
        this.buttonEXIT = page.getByRole('button', { name: 'Exit' });
        this.buttonEXITConfirm = page.locator('div').filter({ hasText: /^Exit$/ }).getByRole('button');
    }

    /* addressLine2 is optional */
    async _enterStreetAddress(addressLine1: string, addressLine2: string) {
        await this.fieldAddressLine1.click();
        await this.fieldAddressLine1.clear();
        await this.fieldAddressLine1.fill(addressLine1);
        if(addressLine2.length>0) {
            await this.fieldAddressLine2.click();
            await this.fieldAddressLine2.clear();
            await this.fieldAddressLine2.fill(addressLine2);
        }
    }

    async _enterCity(cityIn: string) {
        await this.fieldCity.click();
        await this.fieldCity.clear();
        await this.fieldCity.fill(cityIn);
    }

    async _selectState(stateAbbreviationIn: string) {
        await this.menuState.selectOption('string:' + stateAbbreviationIn);
    }

    async _enterZip(zipIn: string) {
        await this.fieldZip.click();
        await this.fieldZip.clear();
        await this.fieldZip.fill(zipIn);
    }

    // async _enterTimeAddAddress(years: string, months: string) {
    //     await this.fieldYearsAtAddress.click();
    //     await this.fieldYearsAtAddress.fill(years);
    //     await this.fieldYearsAtAddress.press('Tab');
    //     await this.fieldMonthsAtAddress.click();
    //     await this.fieldMonthsAtAddress.fill(months);
    //     await this.fieldMonthsAtAddress.press('Tab');
    // }

    async _NEXT() {
        await this.buttonNEXT.click();
    }

    async EXIT() {
        await this.buttonEXIT.click();
        await this.buttonEXITConfirm.click();
    }

    async happyPathPopulate(dataIn: string[]) {
        await this._enterStreetAddress(dataIn[0],dataIn[1]);
        await this._enterCity(dataIn[2]);
        await this._selectState(dataIn[3]);
        await this._enterZip(dataIn[4]);
        // await this._enterTimeAddAddress(dataIn[5],dataIn[6]);
        await this._NEXT();
    }

}
export default E_AboutYou2Page;
