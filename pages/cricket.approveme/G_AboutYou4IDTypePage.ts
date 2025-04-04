// Cricket approve me
import { type Locator, type Page } from '@playwright/test';
import { IdentificationType } from '$utils/cricket.utils/IdentificationType';
import { USStateMenuItems } from '$utils/USStateMenuItems';

class G_AboutYou4IDTypePage {

    readonly page: Page;
    readonly menuDropDownIDType: Locator;
    readonly fieldIDNumber: Locator;
    readonly menuDropDownIssuingState: Locator;
    readonly buttonNEXT: Locator;

    constructor(page: Page) {
        this.page = page;
        this.menuDropDownIDType = page.locator('#Identification_IdentificationType');
        this.fieldIDNumber = page.locator('#Identification_Number');
        this.menuDropDownIssuingState = page.locator('#Identification_State');
        this.buttonNEXT = page.getByRole('button', { name: 'Next' });
    }

    async _selectIDType(typeIn: IdentificationType) {
        await this.menuDropDownIDType.selectOption(typeIn.toString());
    }

    async _selectState(stateIn: USStateMenuItems) {
        await this.menuDropDownIssuingState.selectOption(stateIn.toString());
    }

    async _enterIDNumber(numberIn: string) {
        await this.fieldIDNumber.fill(numberIn);
    }

    async _NEXT() {
        await this.buttonNEXT.click();
    }

    async doHappyPathWithPassport() {
        await this._selectIDType(IdentificationType.PASSPORT);
        await this._enterIDNumber('P12345678');
        await this._NEXT();
    }

    async doHappyPathWithDriverLicense(stateIn: USStateMenuItems, numberIn: string) {
        await this._selectIDType(IdentificationType.DRIVER_LICENSE);
        await this._selectState(stateIn);
        await this._enterIDNumber(numberIn);
        await this._NEXT();
    }

    async doHappyPathWithDriverLicenseRandomState() {
        await this._selectIDType(IdentificationType.DRIVER_LICENSE);
        await this._selectState(USStateMenuItems.TX);
        await this._enterIDNumber('DL12345678');
        await this._NEXT();
    }

}
export default G_AboutYou4IDTypePage;