import { type Page, type Locator , expect } from '@playwright/test';

class XN_PaymentCardPage {
    readonly page: Page;
    readonly fieldCardNumberFirstSix: Locator;
    readonly fieldAddressLine1: Locator;
    readonly fieldAddressLine2: Locator;
    readonly fieldCity: Locator;
    readonly menuState: Locator;
    readonly fieldZip: Locator;
    readonly checkboxSameAs: Locator;
    readonly buttonNEXT: Locator;
    readonly buttonEXIT: Locator;
    readonly buttonEXITConfirm: Locator;

    constructor(page: Page) {
        this.page = page;
        this.fieldCardNumberFirstSix = page.getByPlaceholder('-11');
        this.checkboxSameAs = page.locator('label').filter({ hasText: 'Same as home address' }).locator('span').first();
        this.fieldAddressLine1 = page.getByLabel('Home address:');
        this.fieldAddressLine2 = page.getByPlaceholder('APT / SUITE / OTHER');
        this.fieldCity = page.getByPlaceholder('CITY');
        this.menuState = page.locator('#Address_State');
        this.fieldZip = page.getByPlaceholder('ZIP');

        this.buttonNEXT = page.getByRole('button', { name: 'Next' });
        this.buttonEXIT = page.getByRole('button', { name: 'Exit' });
        this.buttonEXITConfirm = page.locator('div').filter({ hasText: /^Exit$/ }).getByRole('button');
    }

    async _enterCardNumberFirstSix(cardNumFirstSix: string) {
        await this.fieldCardNumberFirstSix.click();
        await this.fieldCardNumberFirstSix.clear();
        await this.fieldCardNumberFirstSix.fill(cardNumFirstSix);
        await this.page.waitForTimeout(250);
    }

    async _setSameAsBilling(isSameAsBilling: boolean) {
        if(isSameAsBilling) {
            if(!(await this.checkboxSameAs.isChecked())) {
                await this.checkboxSameAs.check();
                await this.page.waitForTimeout(250);
            }
        }else {
            if(await this.checkboxSameAs.isChecked()) {
                await this.checkboxSameAs.uncheck();
                await this.page.waitForTimeout(250);
            }
        }
    }

    async happyPathGoWithSameAddress(firstSixIn: string) {
        await this._setSameAsBilling(true);
        await this._enterCardNumberFirstSix(firstSixIn);
        await this._NEXT();
    }

    /* addressLine2 is optional */
    async enterStreetAddress(addressLine1: string, addressLine2: string) {
        await this.fieldAddressLine1.click();
        await this.fieldAddressLine1.clear();
        await this.fieldAddressLine1.fill(addressLine1);
        if(addressLine2.length>0) {
            await this.fieldAddressLine2.click();
            await this.fieldAddressLine2.clear();
            await this.fieldAddressLine2.fill(addressLine2);
        }
    }

    async enterCity(cityIn: string) {
        await this.fieldCity.click();
        await this.fieldCity.clear();
        await this.fieldCity.fill(cityIn);
    }

    async selectState(stateAbbreviationIn: string) {
        await this.menuState.selectOption('string:' + stateAbbreviationIn);
    }

    async enterZip(zipIn: string) {
        await this.fieldZip.click();
        await this.fieldZip.clear();
        await this.fieldZip.fill(zipIn);
    }

    async _NEXT() {
        await this.buttonNEXT.click();
        await this.page.waitForTimeout(250);
    }

    async EXIT() {
        await this.buttonEXIT.click();
        await this.buttonEXITConfirm.click();
    }

}
export default XN_PaymentCardPage;