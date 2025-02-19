// signet_jared approve me
import { type Page, type Locator, expect } from '@playwright/test';
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
        this.headingPending = page.getByRole('heading', { name: 'Your application is pending. We have a couple of questions, please call us at 866-319-0290 so we may finalize your request.' });
        this.iconPending = page.getByText('i', { exact: true });
        this.buttonEXIT = page.getByRole('banner').getByRole('button', { name: 'Exit' });
        this.buttonEXITConfirm = page.locator('div').filter({ hasText: /^Exit$/ }).getByRole('button');
    }

    async verifySuccessApproved() {
        await expect(this.headingCongrats).toBeVisible({timeout:15000});
        await expect(this.headingApproved).toBeVisible({timeout:15000});
        console.log('success - approved');
    }

    async verifySuccessPending() {
        await expect(this.iconPending).toBeVisible(); // the Info icon that appears with Pending
        await expect(this.headingPending).toBeVisible({timeout:15000});
        console.log('success - pending');
    }

    async verifySuccessDenied() {
        const element = this.page.getByText(/Your Progressive Leasing application was unable to be approved./i)
        await expect(element).toHaveCount(1,{timeout:15000});
        console.log('success - denied');
    }

    async EXIT() {
        await this.page.keyboard.press('PageDown');
        if (await this.buttonEXIT.isVisible() && await this.buttonEXIT.isEnabled()) {
            try {
                /*Exit or EXIT buttons not displayed for mobile app test which causes failure at the last page, to avoid failure of 
                test cases for mobile apps added try catch block*/
                await this.buttonEXIT.click();
                await this.buttonEXITConfirm.click();
            } catch (error) {
                console.log("Exit button not displayed : ", error);
            }
        }
    }
}
export default Q_Results

function textContent(headingPending: Locator): any {
    throw new Error('Function not implemented.');
}
