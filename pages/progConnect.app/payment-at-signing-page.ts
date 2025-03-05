import { Locator, Page, expect } from '@playwright/test';
import { StorybookPage } from './storybook-page';
import { NavPage } from './nav-page';
import { TIMEOUTS } from '$utils/progConnect.utils/timeouts';
import { RESPONSES } from '$utils/network-responses';
import { isNonDeliveryState } from '../../data/progconnect/default-object-builder';

export class PaymentAtSigningPage extends NavPage {
  readonly page: Page;
  readonly storybookPage: StorybookPage;
  readonly line1InitialPaymentLocator: Locator;
  readonly line3TaxesLocator: Locator;
  readonly line2DeliveryCostLocator: Locator;
  readonly line4PaymentDueAtSigningLocator: Locator;
  readonly initialPaymentDescriptionLocator: Locator;
  readonly taxesDescriptionLocator: Locator;
  readonly deliveryCostDescriptionLocator: Locator;
  readonly paymentDueAtSigningDescriptionLocator: Locator;
  readonly chargingCardNumberLocator: Locator;
  readonly visaLogoLocator: Locator;
  readonly amexLogoLocator: Locator;
  readonly mCardLogoLocator: Locator;

  constructor(page: Page) {
    super(page);
    this.page = page;
    this.storybookPage = new StorybookPage(this.page);
    this.line1InitialPaymentLocator = this.page.locator(
      'div.details-card>pc-total-container pc-body-small#value-wrapper'
    );
    this.line3TaxesLocator = this.page.locator(
      'div.details-card div.payment-label-space:nth-of-type(2) #value-wrapper'
    );
    this.line2DeliveryCostLocator = this.page.locator(
      'div.details-card div.payment-label-space:nth-of-type(1) #value-wrapper'
    );
    this.line4PaymentDueAtSigningLocator = this.page.locator(
      'div.details-card pc-total-container pc-body-large#value-wrapper'
    );
    this.initialPaymentDescriptionLocator = this.page.locator(
      'div.details-card>pc-total-container pc-body-small#label-wrapper'
    );
    this.taxesDescriptionLocator = this.page.locator(
      'div.details-card div.payment-label-space:nth-of-type(2) #label-wrapper'
    );
    this.deliveryCostDescriptionLocator = this.page.locator(
      'div.details-card div.payment-label-space:nth-of-type(1) #label-wrapper'
    );
    this.paymentDueAtSigningDescriptionLocator = this.page.locator(
      'div.detail-card>div:nth-of-type(2) pc-total-container pc-body-small#label-wrapper'
    );
    this.chargingCardNumberLocator = this.page.locator(
      '.ccard-icon pc-title-small'
    );
    this.visaLogoLocator = this.page.locator('visa-logo.hydrated');
    this.amexLogoLocator = this.page.locator('amex-logo.hydrated');
    this.mCardLogoLocator = this.page.locator('mcard-logo.hydrated');
  }

  async continueWaitForESign() {
    await this.clickContinue();

    let signResponse;
    try {
      signResponse = await this.page.waitForResponse(
        (resp) => resp.url().includes('/sign'),
        { timeout: TIMEOUTS.SIGN }
      );
    } catch (error) {
      expect(
        signResponse,
        `The /sign call did not respond within the expected time (${TIMEOUTS.SIGN}ms) - ${error}`
      ).toBe(expect.anything());
    }

    expect(
      signResponse.status(),
      `InitialPayment or Esign API call failed - Response: ${await signResponse.body()}`
    ).toBe(RESPONSES.OK);
  }

  async getInitialPayment() {
    return this.parseIntRemovePriceFormat(
      await this.line1InitialPaymentLocator.textContent()
    );
  }

  async getDeliverCost() {
    return isNonDeliveryState()
      ? await this.line2DeliveryCostLocator.textContent()
      : '';
  }

  async getTaxAmount() {
    return isNonDeliveryState()
      ? this.parseIntRemovePriceFormat(
          await this.line3TaxesLocator.textContent()
        )
      : this.parseIntRemovePriceFormat(
          await this.line2DeliveryCostLocator.textContent()
        );
  }

  async getPaymentDueAtSigning() {
    return this.parseIntRemovePriceFormat(
      await this.line4PaymentDueAtSigningLocator.textContent()
    );
  }
}
