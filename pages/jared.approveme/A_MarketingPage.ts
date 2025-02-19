// signet_jared approve me
import { type Page, type Locator, expect } from '@playwright/test';
import urls from '../../utils/jared.utils/urls'

class A_MarketingPage {

    readonly page: Page;
    readonly linkResume: Locator;
    readonly linkAPPLY_NOW: Locator;
    readonly buttonAPPLY_NOW: Locator;
    readonly linkPaymentEstimator_RC: Locator;
    readonly headingBeforeYouStart: Locator;

    constructor(page: Page) {
        this.page = page;
        this.linkResume = page.getByText('Resume');
        this.linkAPPLY_NOW = page.getByText('APPLY NOW');
        this.buttonAPPLY_NOW = page.locator('xpath = //a[@id = "btn-content-apply"]');
        this.linkPaymentEstimator_RC = page.getByText('estimator');
        this.headingBeforeYouStart = page.getByRole('heading', { name: 'Before you start' });
    }

    async navigate() {
        await this.page.goto(urls.marketing.marketing);
    }

    async beginResume() {
        await this.navigate();
        await this.linkResume.click();
        await expect(this.page.getByPlaceholder('first')).toBeVisible();
    }

    async beginApply() {
        await this.navigate();
        await this.buttonAPPLY_NOW.click();
    }

}
export default A_MarketingPage;
