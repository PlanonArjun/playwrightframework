import { type Page, type Locator, expect } from '@playwright/test';
class K_LeaseStatusPage {

    readonly page: Page;

    readonly headingCongrats: Locator;
    readonly headingApproved: Locator;
    readonly textApproved: Locator;
    readonly headingPending: Locator;
    readonly textPending: Locator;
    readonly iconPending: Locator;
    readonly buttonEXIT: Locator;
    readonly buttonEXITConfirm: Locator;

    constructor(page: Page) {
        this.page = page;
        this.headingCongrats = page.getByText('Congratulations!');
        this.headingApproved = page.getByText('Approved', { exact: true });
        this.textApproved = page.getByText('You have been approved to');
        this.headingPending = page.getByRole('heading', { name: 'Your application is pending.' });
        this.textPending = page.getByText('Please contact Progressive');
        this.iconPending = page.getByText('i', { exact: true });
        this.buttonEXIT = page.locator('#header-unit').getByRole('button', { name: 'Exit' })
        this.buttonEXITConfirm = page.locator('#continue');
    }

    async verifySuccessApproved() {
        await expect(this.headingCongrats).toBeVisible({timeout: 20000});
        await expect(this.headingApproved).toBeVisible({timeout: 20000});
        await expect(this.textApproved).toBeVisible({timeout: 20000});
        let elementResult = this.page.locator(".prog-results-box-header-right");
        let textResult :string = await elementResult.innerText();
        console.log("textResult: \'" + textResult + "\'");
        console.log("textResult.substring(10,18): '" + textResult.substring(10,18) + "\'\n");
        console.log('success - approved');
    }

    async verifySuccessPending() {
        await expect(this.textPending).toBeVisible({timeout: 20000});
        await expect(this.headingPending).toBeVisible({timeout: 20000});
    }

    async verifySuccessDenied() {
        const element = this.page.getByText('We are unable to approve your application at this time.');
        await expect(element).toHaveCount(1,{timeout: 20000})
    }

    async EXIT() {
        await this.buttonEXIT.click();
        await this.page.waitForTimeout(500);
        await this.buttonEXITConfirm.click();
        await this.page.waitForTimeout(500);
    }
}
export default K_LeaseStatusPage