// Cricket approve me
import { type Page, type Locator, expect } from '@playwright/test';
class F_AboutYou3RentOwnPage {

    readonly page: Page;
    readonly buttonOnRent: Locator;
    readonly buttonOnOwn: Locator;

    constructor(page: Page) {
        this.page = page;
        this.buttonOnRent = page.locator('#Residence_HousingStatus_Rent');
        this.buttonOnOwn = page.locator('#Residence_HousingStatus_Own');
    }

    /*
    There is nothing to do on this frame but to click RENT or OWN.
    Then the frame advances automatically (hence no NEXT button).
     */
    async setIsOwn(isOwn: boolean) {
        if (isOwn) {
            await this.buttonOnRent.click();
        } else {
            await this.buttonOnOwn.click();
        }
    }

}
export default F_AboutYou3RentOwnPage;