// progWeb application
import { type Page, type Locator, expect } from '@playwright/test';

class I_ResultsPage {

    readonly page: Page;

    readonly clickToPage: Locator;
    readonly headingApproved: Locator;
    readonly headingPending: Locator;
    readonly iconPending: Locator;
    readonly buttonLOGOUT: Locator;
    readonly buttonLOGOUTConfirm: Locator;
    readonly cancelRating: Locator;

    constructor(page: Page) {
        this.page = page;

        this.clickToPage = page.locator('div').filter({ hasText: /^chevron_right$/ }).locator('div');
        this.headingApproved = page.getByText('Approved', { exact: true });
        this.headingPending = page.getByText('Pending');
        this.iconPending = page.getByText('i', { exact: true });
        this.buttonLOGOUT = page.getByText('exit_to_appLog out');
        this.buttonLOGOUTConfirm = page.getByRole('button', { name: 'Log out' });
        this.cancelRating = page.locator('//a[contains(text(),"Cancel")]');
    }

    async verifySuccessApproved() {
       try{
        await this.cancelRating.click({timeout:15000});
       }catch(error){
        console.log('This Feedback rating window appears once in a while, if appears it cancel the pop-up window');
       }
        await expect(this.page.getByText('Congratulations Preapproved,')).toBeVisible({ timeout: 15000 });
        await this.clickToPage.click({ force: true });
        await expect(this.page.getByText('Approved', { exact: true })).toBeVisible();
        await expect(this.page.locator('clam-status-header').getByRole('img')).toBeVisible();
        await expect(this.page.getByText('You have been approved to lease items up to $1,000 in cash price.', { exact: true })).toBeVisible();
        console.log('success - approved');
    }

    async verifySuccessPending() {
        await expect(this.page.getByText('Current applications')).toBeVisible();
        await expect(this.page.getByText('Pending')).toBeVisible();
        await this.headingPending.click();
        await expect(this.page.getByText('Thank you for submitting your')).toBeVisible();
        console.log('success - pending');
    }

    async verifySuccessDenied() {
        const element = this.page.getByText('Your application was not approved').first();
        await expect(element).toHaveCount(1, { timeout: 15000 });
        console.log('success - denied');
    }

    async LOGOUT() {
        await this.buttonLOGOUT.click()
        await this.page.waitForTimeout(500);
        await this.buttonLOGOUTConfirm.click();
    }

}
export default I_ResultsPage;