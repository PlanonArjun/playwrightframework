// mattress firm approve me
import { type Page, type Locator , expect } from '@playwright/test';
import A_MarketingPage from "./A_MarketingPage";

class B_SplashPage {

    readonly page: Page;
    readonly a_marketingPage: A_MarketingPage;
    readonly linkPhotoId: Locator;
    readonly linkBankInfo: Locator;
    readonly checkboxIHaveRead: Locator;
    readonly linkTerms: Locator;
    readonly linkPrivacy: Locator;
    readonly linkDisclosure: Locator;
    readonly linkArbitration: Locator;
    readonly buttonComeBackLater: Locator;
    readonly buttonContinue: Locator;

    constructor(page: Page) {
        this.page = page;
        this.a_marketingPage = new A_MarketingPage(this.page);
        this.linkPhotoId = page.getByRole('link', { name: 'Photo ID' });
        this.linkBankInfo = page.getByRole('link', { name: 'Bank routing and checking' });
        this.checkboxIHaveRead = page.locator('#view-splash span').first();
        this.linkTerms = page.getByRole('link', { name: 'Terms of Use' });
        this.linkPrivacy = page.getByRole('link', { name: 'Privacy Policy' });
        this.linkDisclosure = page.getByRole('link', { name: 'Application Disclosure' });
        this.linkArbitration = page.getByRole('link', { name: 'Arbitration Provision' });
        this.buttonComeBackLater = page.getByRole('button', { name: 'Come Back Later' });
        this.buttonContinue = page.getByRole('button', { name: 'Continue' });
    }

   async navigate() {
       await this.a_marketingPage.navigate();
       await this.a_marketingPage.beginApply();
   }

    async checkLinkPhoto() {
        await this.linkPhotoId.click();
        await this.page.getByRole('heading', { name: 'Photo identification' }).click();
        await this.page.getByLabel('Close').click();
    }

    async checkLinkBankInfo() {
        await this.linkBankInfo.click();
        await this.page.getByRole('heading', { name: 'Bank routing and checking' }).click();
        await this.page.getByLabel('Close').click();
    }

    async selectCheckbox() {
        if(!(await this.checkboxIHaveRead.isChecked())) {
            await this.checkboxIHaveRead.check();
        }
    }

    async unSelectCheckbox() {
        if(await this.checkboxIHaveRead.isChecked()) {
            await this.checkboxIHaveRead.uncheck();
        }
    }

    async checkLinkTerms() {
        await this.linkTerms.click();
        await this.page.getByText('These Terms of Use ("Terms of').click();
        await this.page.getByRole('button', { name: 'Back' }).first().click();
    }

    async checkLinkPrivacy() {
        await this.linkPrivacy.click();
        let localHeading = this.page.getByText('This privacy policy ("Privacy')
        await expect(localHeading).toBeVisible();
        await this.page.getByRole('button', { name: 'Back' }).first().click();
    }

    async checkLinkDisclosure() {
        await this.linkDisclosure.click();
        let localTarget = this.page.getByRole('heading', { name: 'Application Disclosure' });
        await expect(localTarget).toBeVisible();
        localTarget = this.page.getByText('PLEASE READ THESE APPLICATION');
        await expect(localTarget).toBeVisible();
        await this.page.getByRole('button', { name: 'Back' }).first().click();
    }

    async checkLinkArbitration() {
        await this.linkArbitration.click();
        let localTarget = this.page.getByRole('heading', { name: 'Arbitration Provision' });
        await expect(localTarget).toBeVisible();
        localTarget = this.page.getByText('This Arbitration Provision (“');
        await expect(localTarget).toBeVisible();
        await this.page.getByRole('button', { name: 'Back' }).first().click();
    }

    async comeBackLater() {
        await this.buttonComeBackLater.click();
    }

    async continue() {
        await this.selectCheckbox(); // required before CONTINUE button enabled
        await this.buttonContinue.click();
    }

}
export default B_SplashPage;
