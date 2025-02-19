// biglots approve me
import { type Page, type Locator , expect } from '@playwright/test';
class Q_Results {

    readonly page: Page;

    readonly headingCongrats: Locator;
    readonly headingApproved: Locator;
    readonly headingPending: Locator;
    readonly iconPending: Locator;
    readonly buttonEXIT: Locator;
    readonly buttonEXITConfirm: Locator;

    constructor(page: Page) {
        this.page = page;

        this.headingCongrats = page.getByText('Congratulations!');
        this.headingApproved = page.getByText('Approved', { exact: true });
        this.headingPending = page.getByRole('heading', { name: 'Your application is pending. We have a couple of questions, please call us at 877-898-1970 so we may finalize your request.' });
        this.iconPending = page.getByText('i', { exact: true });
        this.buttonEXIT = page.getByRole('banner').getByRole('button', { name: 'Exit' });
        this.buttonEXITConfirm = page.locator('div').filter({ hasText: /^Exit$/ }).getByRole('button');
    }

    async verifySuccessApproved() {
        await expect(this.headingCongrats).toBeVisible();
        await expect(this.headingApproved).toBeVisible();
        console.log('success - approved');
        await this.EXIT();
    }

    async verifySuccessPending() {
        await expect(this.iconPending).toBeVisible(); // the Info icon that appears with Pending
        await expect(this.headingPending).toBeVisible();
        await this.EXIT();
    }

    async verifySuccessDenied() {
        const element = this.page.getByText('Your Progressive Leasing application was unable to be approved.')
        await expect(element).toHaveCount(1)
        await this.EXIT();
    }

    async EXIT() {
        await this.buttonEXIT.click();
        await this.buttonEXITConfirm.click();
    }

}
export default Q_Results