import { setTaxFreeStatus } from "$pages/progConnect.app/cart-review-page";
import test, {BrowserContext, Page} from "@playwright/test";
import { DefaultObjectBuilder, setCustomerState } from "../../../data/progconnect/default-object-builder";
import { ITEM_SKU } from "../../../data/progconnect/item-skus";
import { ICustomerLeaseApplication } from "$utils/progConnect.utils/lease-application-builder";
import { LEASE_STATUS } from "$utils/progConnect.utils/lease-status";
import {WooShoppingPage} from "$pages/progConnect.app/woo-shopping-page";

let bCont: BrowserContext;
let cPage: Page;
let wooShoppingPage: WooShoppingPage;

test.describe('happy-path', async () => {

    test.describe.configure({ retries: 0 });
    test.describe.configure({ mode: 'parallel' });
    test.setTimeout(240000);

      test.beforeAll(() => {
        setTaxFreeStatus(false);
        setCustomerState({ state: 'UT', zip: '84070' });
      });

      test.beforeEach(async ({browser}) => {
        bCont = await browser.newContext();
        cPage = await bCont.newPage();
        wooShoppingPage = new WooShoppingPage(cPage);
        await wooShoppingPage.goToWoo();
        await wooShoppingPage.buildBasicCart();
        await wooShoppingPage.addItemToCart(ITEM_SKU.COMFY_150);
        await wooShoppingPage.proceedToCheckout();
        await wooShoppingPage.startApplyOnlyFlow();
      });

      test('Happy path to virtual Card @Tier1 @Woo', async ({  }) => {
        // const customer: ICustomerLeaseApplication = new DefaultObjectBuilder(
        //   LEASE_STATUS.APPROVED
        // ).leaseApplication;

        // await buildLease.submitTo6VCard(customer);
        console.log('placeholder for debugging purposes');

      });

});
