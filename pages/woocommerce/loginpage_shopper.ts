// loginpage_admin.ts
// magento staging login admin
import { type Page, type Locator , expect } from '@playwright/test';
import urls from '../../utils/woocommerce.utils/urls'

class LoginPageShopper {

    readonly page: Page;
    readonly fieldUsername: Locator;
    readonly fieldPassword: Locator;
    readonly buttonLog_In: Locator;
    readonly h1_My_account: Locator;
    readonly linkLogout: Locator;

    constructor(page: Page) {
        this.page = page;
        this.fieldUsername = page.locator("#username");
        this.fieldPassword = page.locator("#password");
        this.buttonLog_In = page.locator("#post-9 > div > div > form > p:nth-child(3) > button");
        this.h1_My_account = page.getByRole('heading', { name: 'My account' });
        this.linkLogout = page.locator('#post-9').getByRole('link', { name: 'Log out', exact: true });
    }

    async navigate() {
        await this.page.goto(urls.login.shopper);
        await expect(this.fieldUsername).toBeVisible();
    }

    async authenticate(usr: string, pass: string) {
        await this.fieldUsername.fill(usr);
        await this.fieldPassword.fill(pass);
        await this.page.waitForTimeout(1000);
        await this.buttonLog_In.click();
        await expect(this.h1_My_account).toBeVisible();
    }

    async authenticateRoundRobin(usr: string, pass: string) {
        await this.navigate();
        await this.authenticate(usr, pass);
        await this.logOff();
    }

    async logOff() {
        await this.linkLogout.click();
        await expect(this.h1_My_account).toBeVisible();
    }

}
export default LoginPageShopper;
