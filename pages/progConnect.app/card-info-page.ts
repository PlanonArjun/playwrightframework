import { Locator, Page, expect } from '@playwright/test';
import { StorybookPage } from './storybook-page';
import { NavPage } from './nav-page';

export interface ICardInformation {
  firstName: string;
  lastName: string;
  cardNumber: string;
  expirationDate: string;
  cvv: string;
}

export interface ICardBillingInformation {
  address1: string;
  address2: string;
  city: string;
  state: string;
  zip: string;
}

const firstNameInputLocator = 'pc-cc-name-input:nth-of-type(1) input';
const lastNameInputLocator = 'pc-cc-name-input:nth-of-type(2) input';
const cardNumberInputLocator = 'pc-cc-number-input input';
const expirationDateInputLocator = 'pc-cc-expiration-date-input input';
const cvvInputLocator = 'pc-cc-cvv input';
const billingAddressCheckboxLocator = 'pc-checkbox input';
const cardAddress1InputLocator = 'pc-cc-address1-input input';
const cardAddress2InputLocator = 'pc-cc-address2-input input';
const cardCityInputLocator = 'pc-cc-city-input input';
const cardStateInputLocator = 'pc-cc-state-input input';
const cardZipInputLocator = 'pc-cc-zip-code-input input';

export class CardInfoPage extends NavPage {
  readonly page: Page;
  readonly storybookPage: StorybookPage;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly cardNumberInput: Locator;
  readonly expirationDateInput: Locator;
  readonly cvvInput: Locator;
  readonly billingAddressCheckbox: Locator;
  readonly cardAddress1Input: Locator;
  readonly cardAddress2Input: Locator;
  readonly cardCityInput: Locator;
  readonly cardStateInput: Locator;
  readonly cardZipInput: Locator;

  constructor(page: Page) {
    super(page);
    this.page = page;
    this.storybookPage = new StorybookPage(this.page);
    this.firstNameInput = process.env.STORYBOOK
      ? this.storybookPage.iframe.locator(firstNameInputLocator)
      : this.page.locator(firstNameInputLocator);

    this.lastNameInput = process.env.STORYBOOK
      ? this.storybookPage.iframe.locator(lastNameInputLocator)
      : this.page.locator(lastNameInputLocator);

    this.cardNumberInput = process.env.STORYBOOK
      ? this.storybookPage.iframe.locator(cardNumberInputLocator)
      : this.page.locator(cardNumberInputLocator);

    this.expirationDateInput = process.env.STORYBOOK
      ? this.storybookPage.iframe.locator(expirationDateInputLocator)
      : this.page.locator(expirationDateInputLocator);

    this.cvvInput = process.env.STORYBOOK
      ? this.storybookPage.iframe.locator(cvvInputLocator)
      : this.page.locator(cvvInputLocator);

    this.billingAddressCheckbox = process.env.STORYBOOK
      ? this.storybookPage.iframe.locator(billingAddressCheckboxLocator)
      : this.page.locator(billingAddressCheckboxLocator);

    this.cardAddress1Input = process.env.STORYBOOK
      ? this.storybookPage.iframe.locator(cardAddress1InputLocator)
      : this.page.locator(cardAddress1InputLocator);

    this.cardAddress2Input = process.env.STORYBOOK
      ? this.storybookPage.iframe.locator(cardAddress2InputLocator)
      : this.page.locator(cardAddress2InputLocator);

    this.cardCityInput = process.env.STORYBOOK
      ? this.storybookPage.iframe.locator(cardCityInputLocator)
      : this.page.locator(cardCityInputLocator);

    this.cardStateInput = process.env.STORYBOOK
      ? this.storybookPage.iframe.locator(cardStateInputLocator)
      : this.page.locator(cardStateInputLocator);

    this.cardZipInput = process.env.STORYBOOK
      ? this.storybookPage.iframe.locator(cardZipInputLocator)
      : this.page.locator(cardZipInputLocator);
  }

  async enterCardInformation(form: ICardInformation) {
    await this.firstNameInput.fill(form.firstName);
    await this.waitForValidation();
    await this.lastNameInput.fill(form.lastName);
    await this.waitForValidation();
    await this.cardNumberInput.fill(form.cardNumber);
    await this.waitForValidation();
    await this.expirationDateInput.fill(form.expirationDate);
    await super.waitForValidation();
    await this.cvvInput.fill(form.cvv);
    await super.waitForValidation();
  }

  async enterCardInformationContinue(form: ICardInformation) {
    await expect(async () => {
      await this.enterCardInformation(form);
      await super.continueEnabled();
    }).toPass({ timeout: 15000 });
    await super.continueForm('Card Information');
  }

  async openBillingAddress() {
    await this.billingAddressCheckbox.click({ force: true });
  }

  async enterBillingAddress(form: ICardBillingInformation) {
    await this.cardAddress1Input.fill(form.address1);
    await this.waitForValidation();
    await this.cardAddress2Input.fill(form.address2);
    await this.waitForValidation();
    await this.cardCityInput.fill(form.city);
    await this.waitForValidation();
    await this.cardStateInput.fill(form.state);
    await this.waitForValidation();
    await this.cardZipInput.fill(form.zip);
    await this.waitForValidation();
  }

  async enterBillingAddressContinue(form: ICardBillingInformation) {
    await expect(async () => {
      await this.enterBillingAddress(form);
      await this.waitForValidation();
      await super.continueEnabled();
    }).toPass({ timeout: 15000 });
    await super.continueForm('Card and Billing information');
  }
}
