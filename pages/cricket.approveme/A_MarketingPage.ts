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
        this.buttonAPPLY_NOW = page.getByRole('link', { name: 'Apply In English' });
    }

    async navigate() {
        await this.page.goto(urls.marketing.marketing);
    }

    async beginResume() {
        await this.linkResume.click();
        await this.page.waitForTimeout(500);
        await expect(this.page.getByRole('heading', { name: 'Resume by providing the' })).toBeVisible();
    }

    async beginEstimate() {
        await this.navigate();
        await this.linkPaymentEstimator.click();
    }

    async beginApply() {
        await this.buttonAPPLY_NOW.click();
        await expect(this.page.locator('#view-splash span').first()).toBeVisible();
    }

}
export default A_MarketingPage;
