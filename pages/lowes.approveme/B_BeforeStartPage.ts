// lowes apply approve me
import { type Page, type Locator, expect } from '@playwright/test';

class B_BeforeStartPage {

    readonly page: Page;
    readonly checkboxIHaveRead: Locator;

    readonly linkTerms: Locator;
    readonly headingTerms: Locator;

    readonly linkPrivacy: Locator;
    readonly headingPrivacy: Locator;

    readonly linkDisclosure: Locator;
    readonly headingDisclosure: Locator;

    readonly linkArbitration: Locator;
    readonly headingArbitration: Locator;

    readonly buttonComeBackLater: Locator;
    readonly buttonContinue: Locator;

    constructor(page: Page) {
        this.page = page;

        this.checkboxIHaveRead = page.locator('xpath = //label//span');

        this.linkTerms = page.getByRole('link', { name: 'Terms of Use' });
        this.headingTerms = page.getByRole('heading', { name: 'Terms of Use' });

        this.linkPrivacy = page.getByRole('link', { name: 'Privacy Policy' });
        this.headingPrivacy = page.getByRole('heading', { name: 'Privacy Policy' });

        this.linkDisclosure = page.getByRole('link', { name: 'Application Disclosure' });
        this.headingDisclosure = page.getByRole('heading', { name: 'Application Disclosure' });

        this.linkArbitration = page.getByRole('link', { name: 'Arbitration Provision' });
        this.headingArbitration = page.getByRole('heading', { name: 'Arbitration Provision' });

        this.buttonComeBackLater = page.getByRole('button', { name: 'Come Back Later' });
        this.buttonContinue = page.getByRole('button', { name: 'Continue' });
    }

    async _selectCheckbox() {
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
        await this._selectCheckbox(); // required before CONTINUE button enabled
        await this.buttonContinue.click();
        await this.page.waitForTimeout(250); // may need this quarter second here...
    }

    async checkLinkTerms() {
        await this.linkTerms.click();
        await this.page.waitForTimeout(250); // may need this quarter second here...
        await this.headingTerms.isVisible();
    }

    async checkLinkPrivacy() {
        await this.linkPrivacy.click();
        await this.page.waitForTimeout(250); // may need this quarter second here...
        await this.headingPrivacy.isVisible();
    }

    async checkLinkDisclosure() {
        await this.linkDisclosure.click();
        await this.page.waitForTimeout(250); // may need this quarter second here...
        await this.headingDisclosure.isVisible();
    }

    async checkLinkArbitration() {
        await this.linkArbitration.click();
        await this.page.waitForTimeout(250); // may need this quarter second here...
        await this.headingArbitration.isVisible();
    }

}
export default B_BeforeStartPage;


