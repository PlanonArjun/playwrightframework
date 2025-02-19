// Mattress firm approve me
import { type Page, type Locator , expect } from '@playwright/test';
import urls from '../../utils/mattressfirm.utils/urls'

class A_MarketingPage1 {
    
    readonly page: Page;
    readonly linkResume: Locator;
    readonly linkPaymentEstimator: Locator;
    readonly buttonAPPLY_NOW: Locator;

    constructor(page: Page) {
        this.page = page;
        this.linkResume = page.getByText('Resume');
        this.linkPaymentEstimator = page.getByText('Payment Estimator');
        this.buttonAPPLY_NOW = page.getByRole('link', { name: 'Apply Now' });
    }

    async navigate() {
        await this.page.goto(urls.marketing.marketing);
        await expect(this.buttonAPPLY_NOW).toBeVisible();
    }
    
    async navigateResume() {
        // To work for a resume flow we only need to click on Apply  
        await this.page.goto(urls.marketing.marketing);
    }

    async beginResume() {
        await this.page.goto(urls.marketing.marketing);
        await this.linkResume.click();
        await expect(this.page.getByRole('heading', { name: 'Resume by providing the' })).toBeVisible();
    }

    async beginEstimate() {
        await this.linkPaymentEstimator.click();
        await expect(this.page.locator('#lce-iframe').contentFrame().getByRole('heading', { name: 'Estimate lease-to-own costs' })).toBeVisible();
    }

    async beginApply() {
        await this.buttonAPPLY_NOW.click();
        await expect(this.page.locator('#view-splash span').first()).toBeVisible();
    }

}
export default A_MarketingPage1;