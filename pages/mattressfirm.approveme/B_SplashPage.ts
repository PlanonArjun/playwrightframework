// mattress firm approve me
import { type Page, type Locator , expect } from '@playwright/test';
import A_MarketingPage from "./A_MarketingPage";
import urls from '$utils/mattressfirm.utils/urls';

class B_SplashPage {

  readonly page: Page;
  readonly a_marketingPage: A_MarketingPage;
  readonly linkPhotoId: Locator;
  readonly headingExpectedPhoto: Locator;
  readonly linkBankInfo: Locator;
  readonly headingExpectedBankInfo: Locator;
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
  readonly buttonCommonBack: Locator;

  constructor(page: Page) {
    this.page = page;
    this.a_marketingPage = new A_MarketingPage(this.page);
    this.linkPhotoId = page.getByRole('link', { name: 'Photo ID' });
    this.headingExpectedPhoto = page.getByRole('heading', { name: 'Photo identification' });
    this.linkBankInfo = page.getByRole('link', { name: 'Bank routing and checking' });
    this.headingExpectedBankInfo = page.getByRole('heading', { name: 'Bank routing and checking' });
    this.checkboxIHaveRead = page.locator('#view-splash span').first();
    this.linkTerms = page.getByRole('link', { name: 'Terms of Use' });
    this.textExpectedTerms = page.getByText('These Terms of Use ("Terms of');
    this.linkPrivacy = page.getByRole('link', { name: 'Privacy Policy' });
    this.textExpectedPrivacy = page.getByText('This privacy policy ("Privacy');
    this.linkDisclosure = page.getByRole('link', { name: 'Application Disclosure' });
    this.textExpectedDisclosure = page.getByText('PLEASE READ THESE APPLICATION');
    this.linkArbitration = page.getByRole('link', { name: 'Arbitration Provision' });
    this.textExpectedArbitration = page.getByText('This Arbitration Provision (“');
    this.buttonComeBackLater = page.getByRole('button', { name: 'Come Back Later' });
    this.buttonCommonBack = page.getByRole('button', { name: 'Back' }).first();
    this.buttonContinue = page.getByRole('button', { name: 'Continue' });
  }

  async navigate() {
    await this.page.goto(urls.splash.splash);
  }

  async commonBACK() {
    await this.buttonCommonBack.click({timeout: 5000});
  }

  async checkLinkPhoto() {
    await this.linkPhotoId.click();
    await this.page.waitForTimeout(250);
    await expect(this.headingExpectedPhoto).toBeVisible({ timeout: 5000 });
    let buttonCloseConditional = await this.page.getByRole('button', { name: 'Close' });
    let buttonCount = await buttonCloseConditional.count();
    if (buttonCount > 0) {
      await buttonCloseConditional.click();
    }
  }

  async checkLinkBankInfo() {
    await this.linkBankInfo.click();
    await this.page.waitForTimeout(250);
    await expect(this.headingExpectedBankInfo).toBeVisible({timeout: 5000});
    let buttonCloseConditional = await this.page.getByRole('button', { name: 'Close' });
    let buttonCount = await buttonCloseConditional.count();
    if (buttonCount > 0) {
      await buttonCloseConditional.click();
    }
  }

  async selectCheckbox() {
    if(!(await this.checkboxIHaveRead.isChecked())) {
      await this.checkboxIHaveRead.check();
      await this.page.waitForTimeout(250);
    }
  }

  async unSelectCheckbox() {
    if(await this.checkboxIHaveRead.isChecked()) {
      await this.checkboxIHaveRead.uncheck();
      await this.page.waitForTimeout(250);
    }
  }

  async checkLinkTerms() {
    await this.linkTerms.click();
    await this.page.waitForTimeout(250);
    await expect(this.textExpectedTerms).toBeVisible({timeout: 5000});
    await this.commonBACK();
    await this.navigate();
  }

  async checkLinkPrivacy() {
    await this.linkPrivacy.click();
    await this.page.waitForTimeout(250);
    await expect(this.textExpectedPrivacy).toBeVisible({timeout: 5000});
    await this.commonBACK();
    await this.navigate();
  }

  async checkLinkDisclosure() {
    await this.linkDisclosure.click();
    await this.page.waitForTimeout(250);
    await expect(this.textExpectedDisclosure).toBeVisible({timeout: 5000});
    await this.commonBACK();
    await this.navigate();
  }

  async checkLinkArbitration() {
    await this.linkArbitration.click();
    await this.page.waitForTimeout(250);
    await expect(this.textExpectedArbitration).toBeVisible({timeout: 5000});
    await this.commonBACK();
    await this.navigate();
  }

  async comeBackLater() {
    await this.buttonComeBackLater.click();
  }

  async continue() {
    await this.selectCheckbox(); // required before CONTINUE button enabled
    await this.page.waitForTimeout(250);
    await this.buttonContinue.click();
  }

}
export default B_SplashPage;
