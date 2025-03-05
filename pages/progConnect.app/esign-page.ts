import { FrameLocator, Locator, Page, expect } from '@playwright/test';
import { RESPONSES } from '$utils/progConnect.utils/network-responses';
import { TIMEOUTS } from '$utils/progConnect.utils/timeouts';
import { getCustomerState } from '../../data/progconnect/default-object-builder';

let eboPercent;
export class EsignPage {
  readonly page: Page;
  readonly iframe: FrameLocator;
  readonly consentRecurringPayment: Locator;
  readonly consentPaymentAtSigning: Locator;
  readonly earlyBuyoutParagraph: Locator;
  readonly clickToSign: Locator;
  readonly introLeaseId: Locator;
  readonly footerComplete: Locator;
  readonly consentSleep: number;

  constructor(page: Page) {
    this.page = page;
    this.iframe = this.page.frameLocator('iframe#esign-iframe');
    this.consentRecurringPayment = this.iframe.locator(
      'lite-recurring-payment-consent grit-wc-checkbox input'
    );
    this.consentPaymentAtSigning = this.iframe.locator(
      'lite-initial-payment-consent grit-wc-checkbox input'
    );
    this.earlyBuyoutParagraph = this.iframe.locator('[data-testId=ebo]');
    this.introLeaseId = this.iframe.locator('[data-testId=intro_lease_id]');
    this.footerComplete = this.iframe.locator('footer button');
    this.clickToSign = this.iframe.locator(
      'grit-lessee-signature .signature-wrap button'
    );
    this.consentSleep = 1000;
  }

  async validateEBOPercent() {
    // expect(this.earlyBuyoutParagraph).toContainText('70%');
  }

  async completeEsign() {
    let esignReturnUrlResponse;
    try {
      esignReturnUrlResponse = await this.page.waitForResponse(
        (resp) => resp.url().includes('?returnUrl'),
        { timeout: TIMEOUTS.SIGN }
      );
    } catch (error) {
      expect(
        esignReturnUrlResponse,
        `The esign document did not respond within the expected time (${TIMEOUTS.SIGN}ms) - ${error}`
      ).toBe(expect.anything());
    }
    expect(
      esignReturnUrlResponse.status(),
      `Esign documents failed to load - Response: ${await esignReturnUrlResponse.body()}`
    ).toBe(RESPONSES.OK);
    await this.consentRecurringPayment.click({ force: true });
    await new Promise((resolve) => setTimeout(resolve, this.consentSleep));
    await this.consentPaymentAtSigning.click({ force: true });
    const leaseId = await this.introLeaseId.textContent();
    await this.validateEBOPercent();
    await this.clickToSign.click();
    await this.footerComplete.click();

    let checkoutResponse;
    try {
      checkoutResponse = await this.page.waitForResponse(
        (resp) => resp.url().includes('/checkout'),
        { timeout: TIMEOUTS.CHECKOUT }
      );
    } catch (error) {
      expect(
        checkoutResponse,
        `The /checkout call did not respond within the expected time (${TIMEOUTS.CHECKOUT}ms) - ${error}`
      ).toBe(expect.anything());
    }
    expect(
      checkoutResponse.status(),
      `Checkout API call failed, virtual-card was not generated - Response: ${await checkoutResponse.body()}`
    ).toBe(RESPONSES.OK);

    return leaseId;
  }
}
