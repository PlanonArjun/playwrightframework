// cricket wireless approve me
import { type Page, type Locator , expect } from '@playwright/test';
import urls from '../../utils/cricket.utils/urls'

class A_MarketingPage {

    readonly page: Page;
    readonly linkResume: Locator;
    readonly linkPaymentEstimator: Locator;
    readonly buttonAPPLY_NOW: Locator;

    constructor(page: Page) {
        this.page = page;
        this.linkResume = page.getByText('Resume');
        this.linkPaymentEstimator = page.getByText('estimator');
        /* Leave this. They routinely toggle between these two. */
        // this.buttonAPPLY_NOW = page.getByRole('link', { name: 'Apply In English' });
        this.buttonAPPLY_NOW = page.getByRole('link', { name: 'Apply Now' });
    }

    async navigate() {
        await this.page.goto(urls.marketing.marketing);
    }

    async beginResume() {
        await this.linkResume.click();
        await this.page.waitForTimeout(500);
    }

    async beginEstimate() {
        await this.navigate();
        await this.linkPaymentEstimator.click();
    }

    async beginApply() {
        await this.buttonAPPLY_NOW.click();
        await expect(this.page.locator('#view-splash span').first()).toBeVisible({timeout: 5000});
    }

}
export default A_MarketingPage;
