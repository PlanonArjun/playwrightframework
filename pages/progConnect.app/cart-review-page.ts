import { Locator, Page, expect } from '@playwright/test';
import { StorybookPage } from './storybook-page';
import { NavPage } from './nav-page';
import { isNonDeliveryState } from '../../data/progconnect/default-object-builder';
import { TIMEOUTS } from '$utils/progConnect.utils/timeouts';
import { RESPONSES } from '$utils/progConnect.utils/network-responses';

let taxFree = false;
let salesTaxPrice: string;

export function setTaxFreeStatus(isTaxFree: boolean) {
  taxFree = isTaxFree;
}
export function setSalesTaxPrice(priceAmount: string) {
  salesTaxPrice = priceAmount;
}

export interface ICartResponse {
  items: Array<ICartItems>;
  numberOfRecurringPayments: number;
  periodicPayment: number;
  paymentFrequency: string;
  termMonths: number;
  cashPrice: number;
  leaseToOwnTotal: number;
  initialPayment: number;
  totalRetailerFeeAmount: number;
  totalTax: number;
  totalDueAtSigning: number;
  totalRetailerFees: number;
  retailerFeeTax: number;
  retailerDeliveryFeesTax: number;
  totalInitialPayment: number;
  totalRetailerDeliveryFees: number;
  totalRetailerOtherFees: number;
  status: string;
}

export interface ICartItems {
  brand: string;
  description: string;
  identifier: string;
  imgUrl: string;
  unitPrice: number;
  tax: number;
  quantity: number;
  condition: string;
  isLeasable: boolean;
}
export class CartReviewPage extends NavPage {
  readonly page: Page;
  readonly storybookPage: StorybookPage;
  readonly lowOverageTitle: Locator;
  readonly lowOverageBody: Locator;
  readonly noLeasableItemsError: Locator;
  readonly noLeasableItemsErrorBody: Locator;
  readonly line1DeliveryPriceLocator: Locator;
  readonly line2CashPriceLocator: Locator;
  readonly line3TotalLTOCostLocator: Locator;

  constructor(page: Page) {
    super(page);
    this.page = page;
    this.storybookPage = new StorybookPage(this.page);
    this.lowOverageTitle = this.page.locator('pc-info-card pc-title-small');
    this.lowOverageBody = this.page.locator('pc-info-card pc-body-small');
    this.noLeasableItemsError = this.page.locator(
      'pc-error-card pc-title-small'
    );
    this.noLeasableItemsErrorBody = this.page.locator(
      'pc-error-card pc-body-small'
    );
    this.line1DeliveryPriceLocator = this.page.locator(
      'div.items>pc-total-container:nth-of-type(1) #value-wrapper'
    );
    this.line2CashPriceLocator = this.page.locator(
      'div.items>pc-total-container:nth-of-type(2) #value-wrapper'
    );
    this.line3TotalLTOCostLocator = this.page.locator(
      'div.items>pc-total-container:nth-of-type(3) #value-wrapper'
    );
  }

  async getDeliveryCost() {
    return await this.line1DeliveryPriceLocator.textContent();
  }

  async getSalesTax() {}

  async getLTOCost() {}

  async getMonthlyPayments() {}

  async getCashPriceAmount() {
    return isNonDeliveryState()
      ? this.parseIntRemovePriceFormat(
          await this.line1DeliveryPriceLocator.textContent()
        )
      : this.parseIntRemovePriceFormat(
          await this.line2CashPriceLocator.textContent()
        );
  }

  async getLTO12MonthTotal() {
    return isNonDeliveryState()
      ? this.parseIntRemovePriceFormat(
          await this.line2CashPriceLocator.textContent()
        )
      : this.parseIntRemovePriceFormat(
          await this.line3TotalLTOCostLocator.textContent()
        );
  }

  async waitForCartResponse() {
    if (taxFree) {
      console.log(`Is taxFreeCart:${taxFree}`);
      await this.page.route('**/cart', async (route, request) => {
        const modifiedData = request
          .postData()
          .replace(`"tax":${salesTaxPrice}`, '"tax":0');
        await route.continue({ postData: modifiedData });
      });
    }

    await this.clickContinue();
    let cartResponse;
    try {
      cartResponse = await this.page.waitForResponse(
        (resp) => resp.url().includes('/cart'),
        { timeout: TIMEOUTS.CART }
      );
    } catch (error) {
      expect(
        cartResponse,
        `The /cart call did not respond within the expected time (${TIMEOUTS.CART}ms) - ${error}`
      ).toBe(expect.anything());
    }
    expect(
      await cartResponse.status(),
      `Cart failed - Response: ${await cartResponse.body()}`
    ).toBe(RESPONSES.OK);
    return cartResponse.json();
  }
}
