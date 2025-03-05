import { Locator, Page, expect } from '@playwright/test';
import { NavPage } from './nav-page';
import { StorybookPage } from './storybook-page';

export interface IAddressInformation {
  address1: string;
  address2: string;
  city: string;
  state: string;
  zip: string;
}

const address1InputLocator = 'pc-address1-input grit-wc-field input';
const address2InputLocator = 'pc-address2-input grit-wc-field input';
const cityInputLocator = 'pc-city-input grit-wc-field input';
const stateInputLocator = 'pc-state-input grit-wc-field input';
const zipInputLocator = 'pc-zip-code-input grit-wc-field input';

export class AddressInfoPage extends NavPage {
  readonly page: Page;
  readonly storybookPage: StorybookPage;
  readonly address1Input: Locator;
  readonly address2Input: Locator;
  readonly cityInput: Locator;
  readonly stateInput: Locator;
  readonly zipInput: Locator;

  constructor(page: Page) {
    super(page);
    this.page = page;
    this.storybookPage = new StorybookPage(this.page);
    this.address1Input = process.env.STORYBOOK
      ? this.storybookPage.iframe.locator(address1InputLocator)
      : this.page.locator(address1InputLocator);
    this.address2Input = process.env.STORYBOOK
      ? this.storybookPage.iframe.locator(address2InputLocator)
      : this.page.locator(address2InputLocator);
    this.cityInput = process.env.STORYBOOK
      ? this.storybookPage.iframe.locator(cityInputLocator)
      : this.page.locator(cityInputLocator);
    this.stateInput = process.env.STORYBOOK
      ? this.storybookPage.iframe.locator(stateInputLocator)
      : this.page.locator(stateInputLocator);
    this.zipInput = process.env.STORYBOOK
      ? this.storybookPage.iframe.locator(zipInputLocator)
      : this.page.locator(zipInputLocator);
  }

  async enterAddressInformation(form: IAddressInformation) {
    await this.waitForValidation();
    await this.address1Input.fill(form.address1);
    await this.waitForValidation();
    await this.address2Input.fill(form.address2);
    await this.waitForValidation();
    await this.cityInput.fill(form.city);
    await this.waitForValidation();
    await this.stateInput.fill(form.state);
    await this.waitForValidation();
    await this.zipInput.fill(form.zip);
    await this.waitForValidation();
  }

  async enterAddressInformationContinue(form: IAddressInformation) {
    await expect(async () => {
      await this.enterAddressInformation(form);
      await super.continueEnabled();
    }).toPass({ timeout: 15000 });
    await super.continueForm('Address Information');
  }
}
