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
        this.linkPaymentEstimator = page.getByText('estimator');
        this.buttonAPPLY_NOW = page.getByRole('link', { name: 'Apply Now' });
    }

    async navigate() {
        await this.page.goto(urls.marketing.marketing,{timeout:10000});
    }
    
    async beginResume() {
        await this.page.goto(urls.marketing.marketing,{timeout: 20000});
        await this.linkResume.click({timeout: 10000});
        await expect(this.page.getByRole('heading', { name: 'Resume by providing the' })).toBeVisible({timeout:20000});
    }

    async beginEstimate() {
        await this.navigate();
        await this.linkPaymentEstimator.click();
        await expect(this.page.locator('#lce-iframe').contentFrame().getByRole('heading', { name: 'Estimate lease-to-own costs' })).toBeVisible();
    }

    async beginApply() {
        await this.page.goto(urls.splash.splash,{timeout:10000});
        await this.page.waitForLoadState();
    }

}
export default A_MarketingPage1;