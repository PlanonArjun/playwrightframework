// biglots approve me
import { type Page, type Locator , expect } from '@playwright/test';
import urls from '../../utils/biglots.utils.deprecated/urls'

class A_MarketingPage {

    readonly page: Page;
    readonly linkResume: Locator;
    readonly linkAPPLY_NOW: Locator;
    readonly buttonAPPLY_NOW: Locator;
    readonly linkPaymentEstimator_RC: Locator; // exists only on RC
    readonly headingBeforeYouStart: Locator; // exists only on RC

    constructor(page: Page) {
        this.page = page;
        this.linkResume = page.getByText('Resume');
        this.linkAPPLY_NOW = page.getByText('APPLY NOW');
        this.buttonAPPLY_NOW = page.locator('#banner-text-new').getByRole('link', { name: 'Apply Now' });
        this.linkPaymentEstimator_RC = page.getByText('estimator');
        this.headingBeforeYouStart = page.getByRole('heading', { name: 'Before you start' });
    }

    async _navigate() {
        await this.page.goto(urls.marketing.marketing);
        await expect(this.page.getByRole('heading', { name: 'No credit needed', exact: true })).toBeVisible();
    }

    async navigateResume() {
        // To work for a resume flow we only need to click on Apply  
        await this.page.goto(urls.marketing.marketing);
    }

    async beginResume() {
        await this._navigate();
        await this.linkResume.click();
        await expect(this.page.getByPlaceholder('first')).toBeVisible();
    }

    async beginEstimate() {
        await this._navigate();
        await this.linkPaymentEstimator_RC.click();
        await expect(this.page.locator('#lce-iframe').contentFrame().getByRole('heading', { name: 'Estimate lease-to-own costs' })).toBeVisible();
        await this.page.getByText('X', { exact: true }).click();
    }

    async beginApply() {
        await this._navigate();
        await this.buttonAPPLY_NOW.click();
        await expect(this.headingBeforeYouStart).toBeVisible();
    }

}
export default A_MarketingPage;
