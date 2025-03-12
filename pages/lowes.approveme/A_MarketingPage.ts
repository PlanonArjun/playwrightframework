// lowes apply approve me
import { type Page, type Locator, expect } from '@playwright/test';
import urls from '../../utils/lowes.utils/urls'

class A_MarketingPage {

    readonly page: Page;
    readonly linkResume: Locator;
    readonly linkPaymentEstimator: Locator;
    readonly buttonAPPLY_NOW: Locator;

    constructor(page: Page) {
        this.page = page;
        this.linkResume = page.getByText('Resume');
        this.linkPaymentEstimator = page.getByText('Payment Estimator');
        this.buttonAPPLY_NOW = page.getByText('Apply Now');
    }

    async navigateMarketing() {
        await this.page.goto(urls.marketing.marketing);
    }

    async navigateEstimator() {
        await this.page.goto(urls.marketing.marketing);
        await this.page.locator('a').filter({ hasText: 'PAYMENT ESTIMATOR' }).click();
    }

    async navigateResume() {
        await this.page.goto(urls.continue.continue); // it's called Continue in Lowe's universe
    }

    async navigateBeforeStart() {
        await this.page.goto(urls.beforeYouStart.beforeYouStart);
        await this.page.waitForTimeout(1000);
    }

    async beginApply() {
        await expect(this.buttonAPPLY_NOW).toBeVisible();
        await this.buttonAPPLY_NOW.click();
    }

}
export default A_MarketingPage;
