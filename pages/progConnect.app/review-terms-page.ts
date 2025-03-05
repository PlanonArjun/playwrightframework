import { Locator, Page } from '@playwright/test';
import { StorybookPage } from './storybook-page';
import { NavPage } from './nav-page';

const paymentAmountLocator = 'pc-lease-to-own-cost pc-body-large';
const payFrequencyLocator = 'pc-lease-to-own-cost pc-body-small';
const cashPriceAmountLocator =
  'pc-section pc-total-container:nth-of-type(1) #value-wrapper';
const ltoTotalLocator =
  'pc-section pc-total-container:nth-of-type(2) #value-wrapper';

export class ReviewTermsPage extends NavPage {
  readonly page: Page;
  readonly storybookPage: StorybookPage;
  readonly paymentAmount: Locator;
  readonly payFrequency: Locator;
  readonly cashPriceAmount: Locator;
  readonly ltoTotal: Locator;

  constructor(page: Page) {
    super(page);
    this.page = page;
    this.storybookPage = new StorybookPage(this.page);
    this.paymentAmount = process.env.STORYBOOK
      ? this.storybookPage.iframe.locator(paymentAmountLocator)
      : this.page.locator(paymentAmountLocator);
    this.payFrequency = process.env.STORYBOOK
      ? this.storybookPage.iframe.locator(payFrequencyLocator)
      : this.page.locator(payFrequencyLocator);
    this.cashPriceAmount = process.env.STORYBOOK
      ? this.storybookPage.iframe.locator(cashPriceAmountLocator)
      : this.page.locator(cashPriceAmountLocator);
    this.ltoTotal = process.env.STORYBOOK
      ? this.storybookPage.iframe.locator(ltoTotalLocator)
      : this.page.locator(ltoTotalLocator);
  }

  async getPaymentAmount() {
    return await this.paymentAmount.textContent();
  }

  async getCashPriceAmount() {
    return this.parseIntRemovePriceFormat(
      await this.cashPriceAmount.textContent()
    );
  }

  async getLtoTotal() {
    return this.parseIntRemovePriceFormat(await this.ltoTotal.textContent());
  }
}
