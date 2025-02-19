// b_beforestartpage
// lowes apply approve me
import { type Page, type Locator, expect } from '@playwright/test';

class B_BeforeStartPage {

    readonly page: Page;
    readonly checkboxIHaveRead: Locator;

    readonly linkTerms: Locator;
    readonly headingTerms: Locator;
    readonly paragraphTerms: Locator;

    readonly linkPrivacy: Locator;
    readonly headingPrivacy: Locator;
    readonly paragraphPrivacy: Locator;

    readonly linkDisclosure: Locator;
    readonly headingDisclosure: Locator;
    readonly paragraphDisclosure: Locator;

    readonly linkArbitration: Locator;
    readonly headingArbitration: Locator;
    readonly paragraphArbitration: Locator;

    readonly buttonComeBackLater: Locator;
    readonly buttonContinue: Locator;

    constructor(page: Page) {
        this.page = page;

        this.checkboxIHaveRead = page.locator('xpath = //label//span');

        this.linkTerms = page.getByRole('link', { name: 'Terms of Use' });
        this.headingTerms = page.getByRole('heading', { name: 'Terms of Use' });
        this.paragraphTerms = page.getByText('These Terms of Use ("Terms of');

        this.linkPrivacy = page.getByRole('link', { name: 'Privacy Policy' });
        this.headingPrivacy = page.getByRole('heading', { name: 'Privacy Policy' });
        this.paragraphPrivacy = page.getByText('This privacy policy ("Privacy');

        this.linkDisclosure = page.getByRole('link', { name: 'Application Disclosure' });
        this.headingDisclosure = page.getByRole('heading', { name: 'Application Disclosure' });
        this.paragraphDisclosure = page.getByText('PLEASE READ THESE APPLICATION');

        this.linkArbitration = page.getByRole('link', { name: 'Arbitration Provision' });
        this.headingArbitration = page.getByRole('heading', { name: 'Arbitration Provision' });
        this.paragraphArbitration = page.getByText('This Arbitration Provision (“');

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
        await this.headingTerms.click();
        await this.paragraphTerms.click();
        await this._commonExit();
    }

    async checkLinkPrivacy() {
        await this.linkPrivacy.click();
        await this.headingPrivacy.click();
        await this.paragraphPrivacy.click();
        await this._commonExit();
    }

    async checkLinkDisclosure() {
        await this.linkDisclosure.click();
        await this.headingDisclosure.click();
        await this.paragraphDisclosure.click();
        await this._commonExit();
    }

    async checkLinkArbitration() {
        await this.linkArbitration.click();
        await this.headingArbitration.click();
        await this.paragraphArbitration.click();
        await this._commonExit();
    }

    async _commonExit() {
        await this.page.getByRole('button', { name: 'Exit' }).click();
        await this.page.locator('#continue').click();
    }



}
export default B_BeforeStartPage;


