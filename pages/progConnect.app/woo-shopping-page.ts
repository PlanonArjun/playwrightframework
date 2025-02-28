import { Locator, Page } from '@playwright/test';
import { NavPage } from './nav-page';
import { ICustomerLeaseApplication } from '$utils/lease-application-builder';
import { ITEM_SKU } from 'tests/connect/widget/item-skus';
import { TIMEOUTS } from '$utils/timeouts';
import { setSalesTaxPrice } from './cart-review-page';

export class WooShoppingPage extends NavPage {
  readonly page: Page;
  readonly wooShopUrl: string = '/shop/';
  readonly wooCheckoutUrl: string = '/checkout/';
  readonly wooCartUrl: string = '/cart/';
  readonly prefillFirstName: Locator;
  readonly prefillLastName: Locator;
  readonly prefillEmail: Locator;
  readonly prefillPhone: Locator;
  readonly prefillAddress: Locator;
  readonly prefillAddress2: Locator;
  readonly prefillCity: Locator;
  readonly prefillState: Locator;
  readonly prefillZip: Locator;
  readonly nextPage: Locator;
  readonly prevPage: Locator;
  readonly searchInput: Locator;
  readonly itemAddedBanner: Locator;
  readonly shippingFee: Locator;
  readonly salesTax: Locator;

  constructor(page: Page) {
    super(page);
    this.page = page;
    this.prefillFirstName = this.page.locator('input#billing_first_name');
    this.prefillLastName = this.page.locator('input#billing_last_name');
    this.prefillEmail = this.page.locator('input#billing_email');
    this.prefillPhone = this.page.locator('input#billing_phone');
    this.prefillAddress = this.page.locator('input#billing_address_1');
    this.prefillAddress2 = this.page.locator('input#billing_address_2');
    this.prefillCity = this.page.locator('input#billing_city');
    this.prefillState = this.page.locator('select#billing_state');
    this.prefillZip = this.page.locator('input#billing_postcode');
    this.nextPage = this.page.locator('a.next');
    this.prevPage = this.page.locator('a.prev');
    this.searchInput = this.page.locator(
      'input#woocommerce-product-search-field-0'
    );
    this.itemAddedBanner = this.page.locator('div.is-success a.wc-forward');
    this.shippingFee = this.page.locator(
      '#shipping_method span.woocommerce-Price-amount'
    );
    this.salesTax = this.page.locator(
      '.tax-rate span.woocommerce-Price-amount'
    );
  }

  async goToWoo() {
    await this.page.goto(`.${this.wooShopUrl}`, { waitUntil: 'networkidle' });
    await this.waitForValidation();
  }

  async prefillBillingInformation(customer: ICustomerLeaseApplication) {
    await this.waitForValidation(TIMEOUTS.INPUT_VALIDATION);
    await this.prefillFirstName.fill(customer.personalInformation.firstName);
    await this.waitForValidation(TIMEOUTS.INPUT_VALIDATION);
    await this.prefillLastName.fill(customer.personalInformation.lastName);
    await this.waitForValidation(TIMEOUTS.INPUT_VALIDATION);
    await this.prefillAddress.fill(customer.addressInformation.address1);
    await this.waitForValidation(TIMEOUTS.INPUT_VALIDATION);
    await this.prefillAddress2.fill(customer.addressInformation.address2);
    await this.waitForValidation(TIMEOUTS.INPUT_VALIDATION);
    await this.prefillCity.fill(customer.addressInformation.city);
    await this.waitForValidation(TIMEOUTS.INPUT_VALIDATION);
    await this.prefillState.selectOption(customer.addressInformation.state);
    await this.waitForValidation(TIMEOUTS.INPUT_VALIDATION);
    await this.prefillZip.fill(customer.addressInformation.zip);
    await this.waitForValidation(TIMEOUTS.INPUT_VALIDATION);
    await this.prefillPhone.fill(customer.contactInformation.phoneNumber);
    await this.waitForValidation(TIMEOUTS.INPUT_VALIDATION);
    await this.prefillEmail.fill(customer.contactInformation.emailAddress);
    await this.waitForValidation(TIMEOUTS.PAGE_RENDER);
  }

  async addItemToCart(itemNumber: string) {
    await this.page.goto(`.${this.wooShopUrl}?add-to-cart=${itemNumber}`);
    await this.itemAddedBanner.isVisible();
  }

  async buildBasicCart() {
    await this.addItemToCart(ITEM_SKU.MARIMBA_499_95);
    await this.waitForValidation(2500);
  }

  async getRetailerShippingFees() {
    await this.waitForValidation();
    return await this.shippingFee.innerText();
  }

  async setRetailerSalesTaxForCart() {
    setSalesTaxPrice((await this.salesTax.innerText()).slice(1));
  }

  async proceedToCheckout() {
    await this.page.goto(`.${this.wooCheckoutUrl}`);
    await this.page.waitForURL(`.${this.wooCheckoutUrl}`);
    await this.waitForValidation();
    await this.leaseWithProgButton.isEnabled();
    await this.setRetailerSalesTaxForCart();
    await this.waitForValidation();
  }

  async startApplyOnlyFlow() {
    await this.page.goto(`.${this.wooCartUrl}`);
    await this.page.waitForURL(`.${this.wooCartUrl}`);
    await this.leaseWithProgButton.isEnabled();
    await this.waitForValidation();
    await super.openWidget();
  }
}
