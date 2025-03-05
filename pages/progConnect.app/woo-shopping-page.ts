import {expect, Locator, Page} from '@playwright/test';
import { ICustomerLeaseApplication } from '$utils/progConnect.utils/lease-application-builder';
import { ITEM_SKU } from '../../data/progconnect/item-skus';
import { setSalesTaxPrice } from './cart-review-page';
import urls from "$utils/woocommerce.utils/urls";
import {NavPage} from "$pages/progConnect.app/nav-page";

export class WooShoppingPage {
  readonly page: Page;
  readonly header: Locator;
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
  readonly leaseWithProgressiveButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.header = this.page.locator('body div#content h1')
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
    this.leaseWithProgressiveButton = this.page.locator('#Connect')
  }

  async goToWoo() {
    await this.page.goto(urls.shop.shop);
    // await this.page.goto(urls.shop.shop, { waitUntil: 'domcontentloaded' });
    await expect(this.header).toBeVisible();
  }

  async prefillBillingInformation(customer: ICustomerLeaseApplication) {
    await this.prefillFirstName.fill(customer.personalInformation.firstName);
    await this.prefillLastName.fill(customer.personalInformation.lastName);
    await this.prefillAddress.fill(customer.addressInformation.address1);
    await this.prefillAddress2.fill(customer.addressInformation.address2);
    await this.prefillCity.fill(customer.addressInformation.city);
    await this.prefillState.selectOption(customer.addressInformation.state);
    await this.prefillZip.fill(customer.addressInformation.zip);
    await this.prefillPhone.fill(customer.contactInformation.phoneNumber);
    await this.prefillEmail.fill(customer.contactInformation.emailAddress);
  }

  async addItemToCart(itemNumber: string) {
    await this.page.goto(urls.addToCart.addToCart+`${itemNumber}`);
    await this.itemAddedBanner.isVisible();
  }

  async buildBasicCart() {
    await this.addItemToCart(ITEM_SKU.MARIMBA_499_95);
    // await this.itemAddedBanner.isVisible();
  }

  async getRetailerShippingFees() {
    return await this.shippingFee.innerText();
  }

  async setRetailerSalesTaxForCart() {
    setSalesTaxPrice((await this.salesTax.innerText()).slice(1));
  }

  async proceedToCheckout() {
    await this.page.goto(urls.checkout.checkout_1_BillingDetails);
    // await this.page.goto(urls.checkout.checkout_1_BillingDetails, { waitUntil: 'networkidle' });
    // await this.page.waitForURL(urls.checkout.checkout_1_BillingDetails);
    await this.leaseWithProgressiveButton.isEnabled();
    // await this.setRetailerSalesTaxForCart();
  }

  async startApplyOnlyFlow() {
    // await this.page.goto(urls.checkout.checkout_1_BillingDetails);
    await this.page.goto(urls.checkout.checkout_1_BillingDetails, { waitUntil: 'domcontentloaded' });
    await this.leaseWithProgressiveButton.isEnabled();
    await this.leaseWithProgressiveButton.click();
  }
}
