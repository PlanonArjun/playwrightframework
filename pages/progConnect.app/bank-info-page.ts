import { Locator, Page, expect } from '@playwright/test';
import { StorybookPage } from './storybook-page';
import { NavPage } from './nav-page';

export interface IBankInformation {
  routingNumber: string;
  checkingNumber: string;
}

const routingInputLocator = 'pc-routing-number-input input';
const checkingAccountInputLocator = 'pc-checking-account-input input';

export class BankInfoPage extends NavPage {
  readonly page: Page;
  readonly storybookPage: StorybookPage;
  readonly routingInput: Locator;
  readonly checkingAccountInput: Locator;

  constructor(page: Page) {
    super(page);
    this.page = page;
    this.storybookPage = new StorybookPage(this.page);
    this.routingInput = process.env.STORYBOOK
      ? this.storybookPage.iframe.locator(routingInputLocator)
      : this.page.locator(routingInputLocator);
    this.checkingAccountInput = process.env.STORYBOOK
      ? this.storybookPage.iframe.locator(checkingAccountInputLocator)
      : this.page.locator(checkingAccountInputLocator);
  }

  async enterBankInformation(form: IBankInformation) {
    await this.routingInput.fill(form.routingNumber);
    await this.waitForValidation();
    await this.checkingAccountInput.fill(form.checkingNumber);
    await this.waitForValidation();
  }

  async enterBankInformationContinue(form: IBankInformation) {
    await expect(async () => {
      await this.enterBankInformation(form);
      await this.waitForValidation();
      await super.continueEnabled();
    }).toPass({ timeout: 15000 });
    await super.continueForm('Bank Information');
  }
}
