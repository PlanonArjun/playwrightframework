import { setTaxFreeStatus } from "$pages/progConnect.app/cart-review-page";
import test from "@playwright/test";
import { DefaultObjectBuilder, setCustomerState } from "../default-object-builder";
import { ITEM_SKU } from "./item-skus";
import { ICustomerLeaseApplication } from "$utils/progConnect.utils/lease-application-builder";
import { LEASE_STATUS } from "$utils/progConnect.utils/lease-status";

test.beforeAll(() => {
  setTaxFreeStatus(false);
  setCustomerState({ state: 'UT', zip: '84070' });
});

test.beforeEach(async ({ navPage, wooShoppingPage }) => {
  await wooShoppingPage.goToWoo();
  await wooShoppingPage.buildBasicCart();
  await wooShoppingPage.addItemToCart(ITEM_SKU.COMFY_150);
  await wooShoppingPage.proceedToCheckout();
  await navPage.openWidget();
});

test('Happy path to virtual Card @Tier1 @Woo', async ({ buildLease }) => {
  const customer: ICustomerLeaseApplication = new DefaultObjectBuilder(
    LEASE_STATUS.APPROVED
  ).leaseApplication;

  await buildLease.submitTo6VCard(customer);
});
