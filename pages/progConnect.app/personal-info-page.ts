import { Locator, Page, expect } from '@playwright/test';
import { StorybookPage } from './storybook-page';
import { NavPage } from './nav-page';

export interface IPersonalInformation {
  firstName: string;
  lastName: string;
  dob: string;
  ssn: string;
}

const firstNameInputLocator = 'pc-name-input:nth-of-type(1) input';
const firstNameErrorMessageLocator =
  'pc-name-input:nth-of-type(1) grit-wc-message[visible]';
const lastNameInputLocator = 'pc-name-input:nth-of-type(2) input';
const lastNameErrorMessageLocator =
  'pc-name-input:nth-of-type(2) grit-wc-message[visible]';
const dobInputLocator = 'pc-dob-input input';
const dobErrorMessageLocator = 'pc-dob-input grit-wc-message[visible]';
const ssnInputLocator = 'pc-ssn-input input';
const ssnErrorMessageLocator = 'pc-ssn-input grit-wc-message[visible]';

export class PersonalInfoPage extends NavPage {
  readonly page: Page;
  readonly storybookPage: StorybookPage;
  readonly firstNameInput: Locator;
  readonly firstNameErrorMessage: Locator;
  readonly lastNameInput: Locator;
  readonly lastNameErrorMessage: Locator;
  readonly dobInput: Locator;
  readonly dobErrorMessage: Locator;
  readonly ssnInput: Locator;
  readonly ssnErrorMessage: Locator;

  constructor(page: Page) {
    super(page);
    this.page = page;
    this.storybookPage = new StorybookPage(this.page);
    this.firstNameInput = process.env.STORYBOOK
      ? this.storybookPage.iframe.locator(firstNameInputLocator)
      : this.page.locator(firstNameInputLocator);
    this.firstNameErrorMessage = process.env.STORYBOOK
      ? this.storybookPage.iframe.locator(firstNameErrorMessageLocator)
      : this.page.locator(firstNameErrorMessageLocator);
    this.lastNameInput = process.env.STORYBOOK
      ? this.storybookPage.iframe.locator(lastNameInputLocator)
      : this.page.locator(lastNameInputLocator);
    this.lastNameErrorMessage = process.env.STORYBOOK
      ? this.storybookPage.iframe.locator(lastNameErrorMessageLocator)
      : this.page.locator(lastNameErrorMessageLocator);
    this.dobInput = process.env.STORYBOOK
      ? this.storybookPage.iframe.locator(dobInputLocator)
      : this.page.locator(dobInputLocator);
    this.ssnInput = process.env.STORYBOOK
      ? this.storybookPage.iframe.locator(ssnInputLocator)
      : this.page.locator(ssnInputLocator);
    this.dobErrorMessage = process.env.STORYBOOK
      ? this.storybookPage.iframe.locator(dobErrorMessageLocator)
      : this.page.locator(dobErrorMessageLocator);
    this.ssnErrorMessage = process.env.STORYBOOK
      ? this.storybookPage.iframe.locator(ssnErrorMessageLocator)
      : this.page.locator(ssnErrorMessageLocator);
  }

  async enterPersonalInformation(form: IPersonalInformation) {
    await this.waitForValidation();
    await this.firstNameInput.fill(form.firstName);
    await super.waitForValidation();
    await this.lastNameInput.fill(form.lastName);
    await super.waitForValidation();
    await this.dobInput.fill(form.dob);
    await super.waitForValidation();
    await this.ssnInput.fill(form.ssn);
    await super.waitForValidation();
  }

  async enterPersonalInformationContinue(form: IPersonalInformation) {
    await this.enterPersonalInformation(form);
    expect(this.continueButton).not.toBeDisabled();
    await super.continueForm('Personal Information');
  }
}
