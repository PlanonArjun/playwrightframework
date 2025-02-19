import { test, expect } from '@playwright/test';
import HappyPathApproved from '../../data/lowes.approveme/HappyPathApproved';
import A_MarketingPage from "../../pages/lowes.approveme/A_Marketingpage";
import B_BeforeStartPage from '../../pages/lowes.approveme/B_BeforeStartPage';
import C_AboutYou1Page from '../../pages/lowes.approveme/C_AboutYou1Page';
import D_AboutYou2Page from '../../pages/lowes.approveme/D_AboutYou2page';
import E_HomeAddress from '../../pages/lowes.approveme/E_HomeAddress';
import F_IncomePage from '../../pages/lowes.approveme/F_IncomePage';
import G_CreditCardDetailsPage from '../../pages/lowes.approveme/G_CreditCardDetails';
import H_BillingAddress from '../../pages/lowes.approveme/H_BillingAddress';
import I_AccountDetails from '../../pages/lowes.approveme/I_AccountDetails';
import J_LeaseIDVerification from '../../pages/lowes.approveme/J_LeaseIDVerification';
import K_LeaseStatusPage from '../../pages/lowes.approveme/K_LeaseStatusPage';

test.describe('approved', async () => {

  test.describe.configure({ retries: 0 });
  test.describe.configure({ mode: 'serial' });

  test('approved', { tag: ['@lowes', '@approveme', '@happypath', '@approved'] }, async ({ browser }) => {
    await expect(async () => {

      // context and page
      const bCont = await browser.newContext();
      const cPage = await bCont.newPage();

      // data object
      let happyPathApproved = new HappyPathApproved();

      // navigate
      let marketingPage = new A_MarketingPage(cPage);
      await marketingPage.navigate();

      // agree to terms and begin application
      let beforeStartPage = new B_BeforeStartPage(cPage);
      await beforeStartPage.continue();

      // name dob ssn
      let aboutYou1Page = new C_AboutYou1Page(cPage);
      await aboutYou1Page.happyPathPopulate(happyPathApproved.getStartAppData);

      // phone email
      let aboutYou2Page = new D_AboutYou2Page(cPage);
      await aboutYou2Page.happyPathPopulate(happyPathApproved.getAboutYou1);

      // address city state zip
      let homeAddress = new E_HomeAddress(cPage);
      await homeAddress.happyPathPopulate(happyPathApproved.getHomeAddress);

      // pay freq pay dates income
      let incomePage = new F_IncomePage(cPage);
      await incomePage.happyPathPopulate(happyPathApproved.getIncomeInfo);

      // payment card
      let creditCardDetails = new G_CreditCardDetailsPage(cPage);
      await creditCardDetails.happyPathPopulate(happyPathApproved.getCreditCardInfo);

      // billing address
      let billingAddress = new H_BillingAddress(cPage);
      await billingAddress.happyPathPopulate(happyPathApproved.getHomeAddress);

      // bank info
      let accountDetails = new I_AccountDetails(cPage);
      await accountDetails.happyPathPopulate(happyPathApproved.getBankInfo1);

      // accept and proceed - finish
      let leaseIdVerification = new J_LeaseIDVerification(cPage);
      await leaseIdVerification.happyPathAcceptProceed();

      // verify approved success and then exit
      let leaseStatusPage = new K_LeaseStatusPage(cPage);
      await leaseStatusPage.verifySuccessApproved();
      await leaseStatusPage.EXIT();

      await cPage.close();
      await bCont.close();

    }).toPass({ timeout: 90000 });
  });
});