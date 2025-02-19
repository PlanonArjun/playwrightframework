// loginpage_admin.ts
// magento staging login admin
import { type Page, type Locator , expect } from '@playwright/test';
import urls from '../../utils/woocommerce.utils/urls'

class LoginPageAdmin {

    readonly page: Page;
    readonly fieldUsername: Locator;
    readonly fieldPassword: Locator;
    readonly checkboxRememberMe: Locator;
    readonly buttonLog_In: Locator;
    readonly linkGoToUserBlog: Locator;
    readonly h1_Dashboard: Locator;
    readonly linkLogoutConfirm: Locator;
    readonly msgConfirmedLoggedOut: Locator;

    constructor(page: Page) {
        this.page = page;
        this.fieldUsername = page.locator("#user_login");
        this.fieldPassword = page.locator("#user_pass");
        this.buttonLog_In = page.locator("#wp-submit");
        this.checkboxRememberMe = page.locator("#rememberme");
        this.linkGoToUserBlog = page.locator("#backtoblog > a");
        this.h1_Dashboard = page.locator("#wpbody-content > div.wrap > h1");
        this.linkLogoutConfirm = page.getByRole('link', { name: 'log out' });
        this.msgConfirmedLoggedOut = page.getByText('You are now logged out.');
    }

    async navigate() {
        await this.page.goto(urls.login.admin);
        await expect(this.fieldUsername).toBeVisible();
    }

    async authenticate(usr: string, pass: string) {
        await this.fieldUsername.fill(usr);
        await this.fieldPassword.fill(pass);
        await this.page.waitForTimeout(1000);
        await this.buttonLog_In.click();
        await expect(this.h1_Dashboard).toBeVisible();
        await expect(this.page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();
    }

    async authenticateRoundRobin(usr: string, pass: string) {
        await this.navigate();
        await this.authenticate(usr, pass);
        await this.logOff();
    }

    async logOff() {
        await this.page.goto(urls.logout.admin);
        await this.linkLogoutConfirm.click();
        await this.page.waitForTimeout(1000);
        await expect(this.msgConfirmedLoggedOut).toBeVisible();
    }

}
export default LoginPageAdmin;
