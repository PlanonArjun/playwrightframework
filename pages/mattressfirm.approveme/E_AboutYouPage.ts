import { type Page, type Locator , expect } from '@playwright/test';

class E_AboutYouPage {

    readonly page: Page;

    readonly fieldAddressLine1: Locator;
    readonly fieldAddressLine2: Locator;
    readonly fieldCity: Locator;
    readonly menuState: Locator;
    readonly fieldZip: Locator;
    readonly fieldYearsAtCurrentAddress: Locator;
    readonly fieldMonthsAtCurrentAddress: Locator;
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
        this.fieldYearsAtCurrentAddress = page.locator('#Residence_YearsAtAddress');
        this.fieldMonthsAtCurrentAddress = page.locator('#Residence_MonthsAtAddress');
        this.buttonNEXT = page.getByRole('button', { name: 'Next' });
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

    async _enterYearsAtCurrentAddress(yearsAtCurrentAdd: string) {
        await this.fieldYearsAtCurrentAddress.click();
        await this.fieldYearsAtCurrentAddress.clear();
        await this.fieldYearsAtCurrentAddress.fill(yearsAtCurrentAdd);
    }

    async _enterMonthsAtCurrentAddress(monthsAtCurrentAdd: string) {
        await this.fieldMonthsAtCurrentAddress.click();
        await this.fieldMonthsAtCurrentAddress.clear();
        await this.fieldMonthsAtCurrentAddress.fill(monthsAtCurrentAdd);
    }

    async _NEXT() {
        await this.buttonNEXT.click();
    }

    async EXIT() {
        await this.buttonEXIT.click();
        await this.buttonEXITConfirm.click();
    }

    /* call enterStreetAddress() first */
    async happyPathPopulate(dataIn: string[]) {
        await this._enterStreetAddress(dataIn[0],dataIn[1]);
        await this._enterCity(dataIn[2]);
        await this._selectState(dataIn[3]);
        await this._enterZip(dataIn[4]);
        await this._enterYearsAtCurrentAddress(dataIn[5]);
        await this._enterMonthsAtCurrentAddress(dataIn[6]);

        await this._NEXT();
    }

}
export default E_AboutYouPage;