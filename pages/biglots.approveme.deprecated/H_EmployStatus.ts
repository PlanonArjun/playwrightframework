// biglots approve me
import { type Page, type Locator , expect } from '@playwright/test';
class H_EmployStatus {

    readonly page: Page;

    readonly selectMenu: Locator;
    readonly buttonNEXT: Locator;

    constructor(page: Page) {
        this.page = page;
        this.selectMenu = page.locator('#IncomeSource_IncomeType');
        this.buttonNEXT = page.getByRole('button', { name: 'Next' });
    }

    async setIsFullTime() {
        await this.selectMenu.selectOption('Employed Full-Time');
    }
    
    async _NEXT() {
        await this.buttonNEXT.click();
    }

    async happyPathPopulate() {
        await this.setIsFullTime(); 
        await this.page.waitForTimeout(500);
        await this._NEXT();
    }

}
export default H_EmployStatus;