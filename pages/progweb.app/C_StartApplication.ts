// progWeb application
import { type Page, type Locator, expect } from '@playwright/test';
import urls from '../../utils/progweb.utils/urls';

class C_StartApplication {

    readonly page: Page;
    readonly checkBox: Locator;
    readonly startButton: Locator;
    readonly leaseEstimator: Locator;


    constructor(page: Page) {
        this.page = page;
        this.checkBox = page.locator('#Application_Disclosure_Checkbox-label');
        this.startButton = page.getByRole('button', { name: 'Start application' });
        this.leaseEstimator = page.getByRole('button', { name: 'Estimate leasing cost' });

    }

    async selectCheckBox() {
        await this.checkBox.click();
    }

    async clickStartButton() {
        await this.startButton.click();

    }

    async clickLeaseEstimator() {
        try {
            await this.leaseEstimator.scrollIntoViewIfNeeded();
            await this.leaseEstimator.waitFor({ state: 'visible' });
            await this.leaseEstimator.click({ force: true });
        } catch (error) {
            console.log(error);
        }
    }

}
export default C_StartApplication;