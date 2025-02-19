// biglots approve me
 import { type Page, type Locator , expect } from '@playwright/test';
class F_RentOwn {

    readonly page: Page;
    readonly buttonOnRent: Locator;
    readonly buttonOnOwn: Locator;

    constructor(page: Page) {
        this.page = page;
        this.buttonOnRent = page.locator('#Residence_HousingStatus_Rent');
        this.buttonOnOwn = page.locator('#Residence_HousingStatus_Own');
    }

    async setIsOwn(isOwn: boolean) {
        if(isOwn) {
            await this.buttonOnRent.click();
        }else {
            await this.buttonOnOwn.click();
        }
    }

}
export default F_RentOwn;