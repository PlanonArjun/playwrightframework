import { test, expect } from '@playwright/test';
import A_LoginPage from '../../pages/progweb.app/A_LoginPage';
import B_SelectShop from '../../pages/progweb.app/B_SelectShop';
import C_StartApplication from '../../pages/progweb.app/C_StartApplication';
import D_UpdateHomeAddress from '../../pages/progweb.app/D_UpdateHomeAddress';
import E_UpdateIncomeInfo from '../../pages/progweb.app/E_UpdateIncomeInfo';
import F_CreditCardDetails from '../../pages/progweb.app/F_CreditCardDetails';
import G_BankingInfo from '../../pages/progweb.app/G_BankingInfo';
import H_SubmitApplication from '../../pages/progweb.app/H_SubmitApplication';
import I_ResultsPage from '../../pages/progweb.app/I_ResultsPage';
import HappyPathDenied from '../../data/progweb.approveme/HappyPathDenied';

//This flow is not working as there is some pending work to do
test.describe('navigation', async () => {

  test.describe.configure({ retries: 0 });
  test.describe.configure({ mode: 'serial' });

  test('happy path denied to results page - apply', { tag: ['@progweb', '@happy', '@denied'] }, async ({ browser }) => {
    await expect(async () => {

      const bCont = await browser.newContext();
      const cPage = await bCont.newPage();
      let happyPathDenied = new HappyPathDenied();

      let loginPage = new A_LoginPage(cPage);
      await loginPage.happyPathPopulate(happyPathDenied.getLoginData);
      await cPage.waitForTimeout(2000);

      let selectShop = new B_SelectShop(cPage);
      await selectShop.happyPathPopulate(happyPathDenied.getShopDetails);
      await cPage.waitForTimeout(5000);

      let startApplication = new C_StartApplication(cPage);
      await startApplication.selectCheckBox();
      await startApplication.clickStartButton();

      let updateHomeAddress = new D_UpdateHomeAddress(cPage);
      await updateHomeAddress.happyPathPopulate(happyPathDenied.getHomeAddress);

      let updateIncomeInfo = new E_UpdateIncomeInfo(cPage);
      await updateIncomeInfo.happyPathPopulate(happyPathDenied.getIncomeInfo);

      await cPage.waitForTimeout(3000);
      let updateCreditCardDetails = new F_CreditCardDetails(cPage);
      await updateCreditCardDetails.happyPathPopulate(happyPathDenied.getCreditCardDetails);

      let updateBankDetails = new G_BankingInfo(cPage);
      await updateBankDetails.happyPathPopulate(happyPathDenied.getBankingDetails);

      let submitApplication = new H_SubmitApplication(cPage);
      await submitApplication.happyPathPopulate();

      await cPage.waitForTimeout(5000);
      let resultsPage = new I_ResultsPage(cPage);
      await resultsPage.verifySuccessDenied();

      await cPage.close();
      await bCont.close();

    }).toPass({ timeout: 500000 });
  });
});