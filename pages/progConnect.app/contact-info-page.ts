import { Locator, Page, expect } from '@playwright/test';
import { StorybookPage } from './storybook-page';
import { NavPage } from './nav-page';

export interface IContactInformation {
  emailAddress: string;
  phoneNumber: string;
}

const emailAddressInputLocator = 'pc-email-input input';
const phoneNumberInputLocator = 'pc-phone-input input';
const marketingCheckboxLocator = 'pc-checkbox input';

export class ContactInfoPage extends NavPage {
  readonly page: Page;
  readonly storybookPage: StorybookPage;
  readonly emailAddressInput: Locator;
  readonly phoneNumberInput: Locator;
  readonly marketingCheckbox: Locator;

  constructor(page: Page) {
    super(page);
    this.page = page;
    this.storybookPage = new StorybookPage(page);
    this.emailAddressInput = process.env.STORYBOOK
      ? this.storybookPage.iframe.locator(emailAddressInputLocator)
      : this.page.locator(emailAddressInputLocator);
    this.phoneNumberInput = process.env.STORYBOOK
      ? this.storybookPage.iframe.locator(phoneNumberInputLocator)
      : this.page.locator(phoneNumberInputLocator);
    this.marketingCheckbox = process.env.STORYBOOK
      ? this.storybookPage.iframe.locator(marketingCheckboxLocator)
      : this.page.locator(marketingCheckboxLocator);
  }

  async enterContactInformation(form: IContactInformation) {
    await this.emailAddressInput.fill(form.emailAddress);
    await this.waitForValidation();
    await this.phoneNumberInput.fill(form.phoneNumber);
    await this.waitForValidation();
  }

  async enterContactInformationContinue(form: IContactInformation) {
    await expect(async () => {
      await this.enterContactInformation(form);
      await this.waitForValidation();
      await super.continueEnabled();
    }).toPass({ timeout: 15000 });
    await super.continueForm('Contact Information');
  }
}
