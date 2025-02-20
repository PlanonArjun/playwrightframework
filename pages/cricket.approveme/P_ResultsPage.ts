import { type Page, type Locator , expect } from '@playwright/test';

class P_ResultsPage {
    readonly page: Page;
    readonly buttonNEXT: Locator;
    readonly buttonEXIT: Locator;
    readonly buttonEXITConfirm: Locator;

    constructor(page: Page) {
        this.page = page;
        this.buttonNEXT = page.getByRole('button', { name: 'Next' });
        this.buttonEXIT = page.locator('#results').getByRole('button', { name: 'Exit' });
        this.buttonEXITConfirm = page.locator('div').filter({ hasText: /^Exit$/ }).getByRole('button');
    }

    async verifyApproved() {
        await this.page.getByText('Congratulations!').click();
        await this.page.getByText('Approved', { exact: true }).click();
    }

    async verifyPending() {
        await this.page.getByRole('heading', { name: 'Your application is pending.' }).click({timeout:10000});
    }

    async verifyDenied() {
        await this.page.getByRole('heading', { name: 'Your Progressive Leasing' }).click({timeout:10000});
    }

    async EXIT() {
        await this.buttonEXIT.click();
        await this.buttonEXITConfirm.click();
    }

}
export default P_ResultsPage;