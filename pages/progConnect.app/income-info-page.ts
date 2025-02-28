import { Locator, Page, expect } from '@playwright/test';
import { StorybookPage } from './storybook-page';
import { NavPage } from './nav-page';

export interface IIncomeInformation {
  monthlyIncome: string;
  lastPayDate: string;
  nextPayDate: string;
  payFrequency: string;
}

const monthlyIncomeInputLocator = 'input#currency-input';
const lastPayDateInputLocator = '#last-pay-day-input';
const nextPayDateInputLocator = '#next-pay-day-input';
const payFrequencySelectLocator = 'pc-select-input select';

export class IncomeInfoPage extends NavPage {
  readonly page: Page;
  readonly storybookPage: StorybookPage;
  readonly monthlyIncomeInput: Locator;
  readonly lastPayDateInput: Locator;
  readonly nextPayDateInput: Locator;
  readonly payFrequencySelect: Locator;

  constructor(page: Page) {
    super(page);
    this.page = page;
    this.storybookPage = new StorybookPage(this.page);
    this.monthlyIncomeInput = process.env.STORYBOOK
      ? this.storybookPage.iframe.locator(monthlyIncomeInputLocator)
      : this.page.locator(monthlyIncomeInputLocator);
    this.lastPayDateInput = process.env.STORYBOOK
      ? this.storybookPage.iframe.locator(lastPayDateInputLocator)
      : this.page.locator(lastPayDateInputLocator);
    this.nextPayDateInput = process.env.STORYBOOK
      ? this.storybookPage.iframe.locator(nextPayDateInputLocator)
      : this.page.locator(nextPayDateInputLocator);
    this.payFrequencySelect = process.env.STORYBOOK
      ? this.storybookPage.iframe.locator(payFrequencySelectLocator)
      : this.page.locator(payFrequencySelectLocator);
  }

  async enterDate(input: Locator, date: string) {
    await input.click({ force: true });
    await this.page.keyboard.type(date.charAt(0));
    await this.page.keyboard.type(date.charAt(1));
    // await this.page.keyboard.press('Tab');
    await this.page.keyboard.type(date.charAt(2));
    await this.page.keyboard.type(date.charAt(3));
    // await this.page.keyboard.press('Tab');
    await this.page.keyboard.type(date.charAt(4));
    await this.page.keyboard.type(date.charAt(5));
    await this.page.keyboard.type(date.charAt(6));
    await this.page.keyboard.type(date.charAt(7));
    await super.waitForValidation();
  }

  async enterIncomeInformation(form: IIncomeInformation) {
    await this.monthlyIncomeInput.fill(form.monthlyIncome);
    await super.waitForValidation();
    await this.enterDate(this.lastPayDateInput, form.lastPayDate);
    await this.enterDate(this.nextPayDateInput, form.nextPayDate);
    await this.payFrequencySelect.selectOption(form.payFrequency);
    await super.waitForValidation();
  }

  async enterIncomeInformationContinue(form: IIncomeInformation) {
    await expect(async () => {
      await this.enterIncomeInformation(form);
      await this.waitForValidation();
      await super.continueEnabled();
    }).toPass({ timeout: 15000 });
    await super.continueForm('Income Information');
  }
}
