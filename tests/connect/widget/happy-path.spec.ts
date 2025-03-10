import { setTaxFreeStatus } from "$pages/progConnect.app/cart-review-page";
import test, {BrowserContext, Page} from "@playwright/test";
import { setCustomerState } from "../../../data/progconnect/default-object-builder";
import {WooShoppingPage} from "$pages/progConnect.app/woo-shopping-page";
import B_ApplyWidget from "$pages/progConnect.app/B_ApplyWidget";

/**
 * NOTE: Test must be run with --project='Google Chrome' --headed  OR  --project='firefox' --headed ,
 * chromium fails to load the review and sign page for an unknown reason.
 */

let bCont: BrowserContext;
let cPage: Page;
let wooShoppingPage: WooShoppingPage;
let b_ApplyWidget: B_ApplyWidget;

test.describe('happy-path', async () => {

    test.describe.configure({ retries: 0 });
    test.describe.configure({ mode: 'parallel' });
    test.setTimeout(120000);

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
        await wooShoppingPage.startApplyOnlyFlow();
      });

      test('Happy path to virtual Card @Tier1 @Woo', async () => {

        b_ApplyWidget = await new B_ApplyWidget(cPage);
        await b_ApplyWidget.clickLeaseWithContinueButton();
        await b_ApplyWidget.clickIAgreeCheckbox();
        await b_ApplyWidget.clickStartApplicationButton();
        await b_ApplyWidget.contactInfoEmailAddress();
        await b_ApplyWidget.contactInfoMobilePhone();
        await b_ApplyWidget.clickContactInfoContinueButton();
        await b_ApplyWidget.personalInfoFirstName();
        await b_ApplyWidget.personalInfoLastName();
        await b_ApplyWidget.personalInfoDob();
        await b_ApplyWidget.personalInfoSsn();
        await b_ApplyWidget.personalInfoContinue();
        await b_ApplyWidget.fillHomeAddressStreetAddress();
        await b_ApplyWidget.fillHomeAddressApt();
        await b_ApplyWidget.fillHomeAddressCity();
        await b_ApplyWidget.fillHomeAddressState();
        await b_ApplyWidget.fillHomeAddressZip();
        await b_ApplyWidget.clickHomeAddressContinueButton();
        await b_ApplyWidget.fillIncomeInfoMonthlyIncome();
        await b_ApplyWidget.fillIncomeInfoLastPayDay();
        await b_ApplyWidget.fillIncomeInfoNextPayDay();
        await b_ApplyWidget.enterIncomeInfoPayFrequencyDropDown();
        await b_ApplyWidget.clickIncomeInfoContinueButton();
        await b_ApplyWidget.fillCardInfoFirstNameField();
        await b_ApplyWidget.fillCardInfoLastNameField();
        await b_ApplyWidget.fillCardInfoCardNumberField();
        await b_ApplyWidget.fillCardInfoExpDateField();
        await b_ApplyWidget.fillCardInfoCvv();
        await b_ApplyWidget.clickCardInfoContinueButton();
        await b_ApplyWidget.fillBankInfoRoutingField();
        await b_ApplyWidget.fillBankInfoAccountField();
        await b_ApplyWidget.clickBankInfoContinueButton();
        await b_ApplyWidget.clickReviewYourInfoContinueButton();
        await b_ApplyWidget.clickSubmitApplicationButton();
        await b_ApplyWidget.clickYourApprovedContinueButton();
        await b_ApplyWidget.clickLeaseOverviewContinueButton();
        await b_ApplyWidget.clickDueTodayVerifyPaymentButton();
        await b_ApplyWidget.checkReviewAndSignPaymentDueCheckbox();
        await b_ApplyWidget.checkReviewAndSignRecurringPaymentCheckbox();
        await b_ApplyWidget.clickReviewAndSignAgreeAndContinueButton();
        await b_ApplyWidget.clickReviewAndSignSignAndContinueButton();
        await b_ApplyWidget.clickCheckoutPlaceOrderWithLowesButton();

      //TODO:Might want to implement this API code later down the road, started to go down this road when I was running into the UI site hanging, and found
      // out it needs to be https not http to connect to the Woo Commerce site.
      ////Get site key
      //   const getSiteKeyResponse = await getRequestRest({ request}, new UriBuilder("https://connect.eks.stage.aws.proginternal.com/progconnect/api/site-key"));
      //   expect(getSiteKeyResponse.status(), {
      //     message: `Invalid code ${getSiteKeyResponse.status()} - ${await getSiteKeyResponse.text()}]`,
      //   }).toEqual(HttpStatus.OK);
      //
      //   let siteKey = await getSiteKeyResponse.text();
      //
      //   //Navigate to swagger page
      //   swaggerPage = new A_SwaggerPage(cPage);
      //   await swaggerPage.navigate();
      //
      //   //Load token on page
      //   await swaggerPage.loadRecaptchaToken(siteKey);
      //
      //   //Retrieve token
      //   let recaptchaToken = await swaggerPage.getRecaptchaToken(siteKey);
      //
      //   //Authorize
      //   const response = await postRequestRestWithHeader({ request }, new UriBuilder("https://connect.eks.stage.aws.proginternal.com/progconnect/api/v1/authorize"),
      //       "{" +
      //       "  \"key\": \"4e1ed8e2-f401-11ed-b141-040300000000\"," +
      //       "  \"domain\": \"http://slc-devcent01.stormwind.local/lightweight/qa/harness.html\"" +
      //       "}",
      //       'X-PL-Token=' + recaptchaToken, 'Bearer X-PL-Token=' + recaptchaToken);
      //   expect(response.status(), {
      //     message: `Invalid code ${response.status()} - ${await response.text()}]`,
      //   }).toEqual(HttpStatus.OK);
      //
      });

});
