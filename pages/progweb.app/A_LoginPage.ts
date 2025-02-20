// progWeb application
import { type Page, type Locator, expect } from '@playwright/test';
import urls from '../../utils/progweb.utils/urls';

class A_LoginPage {

    readonly page: Page;
    readonly emailID: Locator;
    readonly password: Locator;
    readonly buttonContinue: Locator;
    merchantText: any;


    constructor(page: Page) {
        this.page = page;
        this.emailID = page.getByLabel('Email address');
        this.password = page.getByLabel('Password', { exact: true });
        this.buttonContinue = page.getByRole('button', { name: 'Continue' });
    }

    async navigate() {
        await this.page.goto(urls.myaccount.myaccount);
    }

    async enterUserEmail(EMAILID: string) {
        await this.emailID.click();
        await this.emailID.fill(EMAILID);
        await this.buttonContinue.click();
        await this.page.waitForTimeout(1500);
        //Because of the Exception for the email address it repeats the enter email Id, to avoid OTP verification
        await this.emailID.click();
        await this.emailID.fill(EMAILID);
        await this.buttonContinue.click();
    }

    async enterPassword(PWDIN: string) {
        await this.password.click();
        await this.password.fill(PWDIN);
        await this.buttonContinue.click();
    }


    async happyPathPopulate(dataIN: string[]) {
        await this.navigate();
        await this.enterUserEmail(dataIN[0]);
        await this.enterPassword(dataIN[1]);
        
    }

}
export default A_LoginPage;