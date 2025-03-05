import { Locator, Page } from '@playwright/test';
import { StorybookPage } from './storybook-page';
import { NavPage } from './nav-page';

export class ReviewApplicationPage extends NavPage {
  readonly page: Page;
  readonly storybookPage: StorybookPage;
  readonly reviewPhone: Locator;
  readonly reviewEmail: Locator;
  readonly reviewName: Locator;
  readonly reviewDOB: Locator;
  readonly reviewSSN: Locator;
  readonly reviewAddress: Locator;
  readonly reviewLocation: Locator;
  readonly reviewIncome: Locator;
  readonly reviewFrequency: Locator;
  readonly reviewLastPay: Locator;
  readonly reviewNextPay: Locator;
  readonly reviewCCName: Locator;
  readonly reviewCCNumber: Locator;
  readonly reviewCCExpiration: Locator;
  readonly reviewCCAddress: Locator;
  readonly reviewCCLocation: Locator;
  readonly reviewBankRouting: Locator;
  readonly reviewBankChecking: Locator;
  readonly updateContactInfo: Locator;
  readonly updatePersonalInfo: Locator;
  readonly updateHomeAddress: Locator;
  readonly updateIncomeInfo: Locator;
  readonly updateCreditCard: Locator;
  readonly updateCreditBillingAddress: Locator;
  readonly updateBankAccount: Locator;

  constructor(page: Page) {
    super(page);
    this.page = page;
    this.storybookPage = new StorybookPage(this.page);
    this.reviewPhone = this.page.locator(
      'pc-application-review div.wrapper:nth-of-type(1) pc-body-small:nth-of-type(1)'
    );
    this.reviewEmail = this.page.locator(
      'pc-application-review div.wrapper:nth-of-type(1) pc-body-small:nth-of-type(2)'
    );
    this.reviewName = this.page.locator(
      'pc-application-review div.wrapper:nth-of-type(2) pc-body-small:nth-of-type(1)'
    );
    this.reviewDOB = this.page.locator(
      'pc-application-review div.wrapper:nth-of-type(2) pc-body-small:nth-of-type(2)'
    );
    this.reviewSSN = this.page.locator(
      'pc-application-review div.wrapper:nth-of-type(2) pc-body-small:nth-of-type(3)'
    );
    this.reviewAddress = this.page.locator(
      'pc-application-review div.wrapper:nth-of-type(3) pc-body-small:nth-of-type(1)'
    );
    this.reviewLocation = this.page.locator(
      'pc-application-review div.wrapper:nth-of-type(3) pc-body-small:nth-of-type(2)'
    );
    this.reviewIncome = this.page.locator(
      'pc-application-review div.wrapper:nth-of-type(4) li:nth-of-type(1) pc-body-small'
    );
    this.reviewFrequency = this.page.locator(
      'pc-application-review div.wrapper:nth-of-type(4)  li:nth-of-type(2) pc-body-small'
    );
    this.reviewLastPay = this.page.locator(
      'pc-application-review div.wrapper:nth-of-type(4) li:nth-of-type(3) pc-body-small'
    );
    this.reviewNextPay = this.page.locator(
      'pc-application-review div.wrapper:nth-of-type(4) li:nth-of-type(4) pc-body-small'
    );
    this.reviewCCName = this.page.locator(
      'pc-application-review div.wrapper:nth-of-type(5) pc-body-small:nth-of-type(1)'
    );
    this.reviewCCNumber = this.page.locator(
      'pc-application-review div.wrapper:nth-of-type(5) pc-body-small:nth-of-type(2)'
    );
    this.reviewCCExpiration = this.page.locator(
      'pc-application-review div.wrapper:nth-of-type(5) pc-body-small:nth-of-type(3)'
    );
    this.reviewCCAddress = this.page.locator(
      'pc-application-review div.wrapper:nth-of-type(6) pc-body-small:nth-of-type(1)'
    );
    this.reviewCCLocation = this.page.locator(
      'pc-application-review div.wrapper:nth-of-type(6) pc-body-small:nth-of-type(2)'
    );
    this.reviewBankRouting = this.page.locator(
      'pc-application-review div.wrapper:nth-of-type(7) pc-body-small:nth-of-type(1)'
    );
    this.reviewBankChecking = this.page.locator(
      'pc-application-review div.wrapper:nth-of-type(7) pc-body-small:nth-of-type(2)'
    );
    this.updateContactInfo = this.page.locator(
      'pc-application-review div.wrapper:nth-of-type(1) pc-link-small'
    );
    this.updatePersonalInfo = this.page.locator(
      'pc-application-review div.wrapper:nth-of-type(2) pc-link-small'
    );
    this.updateHomeAddress = this.page.locator(
      'pc-application-review div.wrapper:nth-of-type(3) pc-link-small'
    );
    this.updateIncomeInfo = this.page.locator(
      'pc-application-review div.wrapper:nth-of-type(4) pc-link-small'
    );
    this.updateCreditCard = this.page.locator(
      'pc-application-review div.wrapper:nth-of-type(5) pc-link-small'
    );
    this.updateCreditBillingAddress = this.page.locator(
      'pc-application-review div.wrapper:nth-of-type(6) pc-link-small'
    );
    this.updateBankAccount = this.page.locator(
      'pc-application-review div.wrapper:nth-of-type(7) pc-link-small'
    );
  }
}
