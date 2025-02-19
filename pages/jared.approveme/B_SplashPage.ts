// signet_jared approve me
import { type Page, type Locator, expect } from '@playwright/test';
import A_MarketingPage from "./A_MarketingPage";

class B_SplashPage {

    readonly page: Page;
    readonly a_marketingPage: A_MarketingPage;
    readonly linkPhotoId: Locator;
    readonly headingExpectedPhoto: Locator;
    readonly linkBankInfo: Locator;
    readonly headingExpectedBank: Locator;
    readonly checkboxIHaveRead: Locator;
    readonly linkTerms: Locator;
    readonly textExpectedTerms: Locator;
    readonly linkPrivacy: Locator;
    readonly headingExpectedPrivacy: Locator;
    readonly linkDisclosure: Locator;
    readonly textExpectedDisclosure: Locator;
    readonly linkArbitration: Locator;
    readonly headingExpectedArbitration: Locator;
    readonly buttonComeBackLater: Locator;
    readonly buttonContinue: Locator;
    readonly buttonBACK_shared: Locator;

    constructor(page: Page) {
        this.page = page;
        this.a_marketingPage = new A_MarketingPage(this.page);
        this.linkPhotoId = page.getByRole('link', { name: 'Photo ID' });
        this.headingExpectedPhoto = page.getByRole('heading', { name: 'Photo identification' });
        this.linkBankInfo = page.getByRole('link', { name: 'Bank routing and checking' });
        this.headingExpectedBank = page.getByRole('heading', { name: 'Bank routing and checking' });
        this.checkboxIHaveRead = page.locator('xpath=//label//span[1]');
        this.linkTerms = page.locator('#view-splash').getByRole('link', { name: 'Terms of Use' });
        this.textExpectedTerms = page.getByText('These Terms of Use ("Terms of');
        this.linkPrivacy = page.locator('#view-splash').getByRole('link', { name: 'Privacy Policy' });
        this.headingExpectedPrivacy = page.getByText('This privacy policy ("Privacy');
        this.linkDisclosure = page.locator('#view-splash').getByRole('link', { name: 'Application Disclosure' });
        this.textExpectedDisclosure = page.getByText('PLEASE READ THESE APPLICATION');
        this.linkArbitration = page.locator('#view-splash').getByRole('link', { name: 'Arbitration Provision' });
        this.headingExpectedArbitration = page.getByRole('heading', { name: 'Arbitration Provision' });
        this.buttonComeBackLater = page.getByRole('button', { name: 'Come Back Later' });
        this.buttonContinue = page.getByRole('button', { name: 'Continue' });
        this.buttonBACK_shared = page.getByRole('button', { name: 'Back' }).first();
    }

    async navigate() {
        await this.a_marketingPage.beginApply();
    }

    async checkLinkPhoto() {
        await this.linkPhotoId.click();
        await expect(this.headingExpectedPhoto).toBeVisible();
        await this.page.getByLabel('Close').click(); // required for Photo and Bank do not remove
        await this.BACK();

    }

    async checkLinkBankInfo() {
        await this.linkBankInfo.click();
        await expect(this.headingExpectedBank).toBeVisible();
        await this.page.getByLabel('Close').click(); // required for Photo and Bank do not remove
        await this.BACK();

    }

    async selectCheckbox() {
        if (!(await this.checkboxIHaveRead.isChecked())) {
            await this.checkboxIHaveRead.check();
        }
    }

    async unSelectCheckbox() {
        if (await this.checkboxIHaveRead.isChecked()) {
            await this.checkboxIHaveRead.uncheck();
        }
    }

    async checkLinkTerms() {
        await this.linkTerms.click();
        await expect(this.textExpectedTerms).toBeVisible();
        await this.BACK();
    }

    async checkLinkPrivacy() {
        await this.linkPrivacy.click();
        await expect(this.headingExpectedPrivacy).toBeVisible();
        await this.BACK();
    }

    async checkLinkDisclosure() {
        await this.linkDisclosure.click();
        await expect(this.textExpectedDisclosure).toBeVisible();
        await this.BACK();
    }

    async checkLinkArbitration() {
        await this.linkArbitration.click();
        await expect(this.headingExpectedArbitration).toBeVisible();
        await this.BACK();
    }

    async comeBackLater() {
        await this.buttonComeBackLater.click();
    }

    async continue() {
        await this.selectCheckbox(); // required before CONTINUE button enabled
        await this.buttonContinue.click();
    }

    async BACK() {
        await this.buttonBACK_shared.click();
    }

}
export default B_SplashPage;
