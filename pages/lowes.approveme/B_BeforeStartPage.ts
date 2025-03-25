// lowes apply approve me
import { type Page, type Locator, expect } from '@playwright/test';

class B_BeforeStartPage {

    readonly page: Page;
    readonly checkboxIHaveRead: Locator;

    readonly linkTerms: Locator;
    readonly textExpectedTerms: Locator;

    readonly linkPrivacy: Locator;
    readonly textExpectedPrivacy: Locator;

    readonly linkDisclosure: Locator;
    readonly textExpectedDisclosure: Locator;

    readonly linkArbitration: Locator;
    readonly textExpectedArbitration: Locator;

    readonly buttonComeBackLater: Locator;
    readonly buttonContinue: Locator;

    constructor(page: Page) {
        this.page = page;

        this.checkboxIHaveRead = page.locator('xpath = //label//span');

        this.linkTerms = page.getByRole('link', { name: 'Terms of Use' });
        this.textExpectedTerms = page.getByText('These Terms of Use ("Terms of');

        this.linkPrivacy = page.getByRole('link', { name: 'Privacy Policy' });
        this.textExpectedPrivacy = page.getByText('This privacy policy ("Privacy');

        this.linkDisclosure = page.getByRole('link', { name: 'Application Disclosure' });
        this.textExpectedDisclosure = page.getByText('PLEASE READ THESE APPLICATION');

        this.linkArbitration = page.getByRole('link', { name: 'Arbitration Provision' });
        this.textExpectedArbitration = page.getByText('This Arbitration Provision (“');

        this.buttonComeBackLater = page.getByRole('button', { name: 'Come Back Later' });
        this.buttonContinue = page.getByRole('button', { name: 'Continue' });
    }

    async selectCheckbox() {
        if (!(await this.checkboxIHaveRead.isChecked())) {
            await this.checkboxIHaveRead.check();
            await this.page.waitForTimeout(250); // may need this quarter second here...
        }
    }

    async unSelectCheckbox() {
        if (await this.checkboxIHaveRead.isChecked()) {
            await this.checkboxIHaveRead.uncheck();
        }
    }

    async comeBackLater() {
        await this.buttonComeBackLater.click();
    }

    async continue() {
        await this.selectCheckbox(); // required before CONTINUE button enabled
        await this.buttonContinue.click();
        await this.page.waitForTimeout(250); // may need this quarter second here...
    }

    async checkLinkTerms() {
        await this.linkTerms.click();
        await this.page.waitForTimeout(250); // may need this quarter second here...
        await this.textExpectedTerms.isVisible();
    }

    async checkLinkPrivacy() {
        await this.linkPrivacy.click();
        await this.page.waitForTimeout(250); // may need this quarter second here...
        await this.textExpectedPrivacy.isVisible();
    }

    async checkLinkDisclosure() {
        await this.linkDisclosure.click();
        await this.page.waitForTimeout(250); // may need this quarter second here...
        await this.textExpectedDisclosure.isVisible();
    }

    async checkLinkArbitration() {
        await this.linkArbitration.click();
        await this.page.waitForTimeout(250); // may need this quarter second here...
        await this.textExpectedArbitration.isVisible();
    }

}
export default B_BeforeStartPage;


