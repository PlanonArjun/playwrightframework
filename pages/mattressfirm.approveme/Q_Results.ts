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
        this.buttonEXIT = page.getByRole('button', { name: 'Exit' });
        this.buttonEXITConfirm = page.locator('div').filter({ hasText: /^Exit$/ }).getByRole('button');
    }

    async verifySuccessApproved() {
        await this.headingCongrats.click({timeout:20000});
        await this.headingApproved.click({timeout:20000});
        console.log('success - MTFM approved');
    }

    async verifySuccessPending() {
        await expect(this.iconPending).toBeVisible({timeout: 30000}); // the Info icon that appears with Pending
        await expect(this.headingPending).toBeVisible({timeout: 30000});
        console.log('success - MTFM pending');
    }

    async verifySuccessDenied() {
        const element = this.page.getByText('Your Progressive Leasing application was unable to be approved.')
        await expect(element).toHaveCount(1,{timeout: 20000})
        console.log('success - MTFM denied');
    }

    async EXIT() {
        await this.buttonEXIT.click({timeout:5000});
        await this.buttonEXITConfirm.click({timeout:5000});
    }

}
export default Q_Results