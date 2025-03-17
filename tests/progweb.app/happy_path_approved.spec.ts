import { test, expect } from '@playwright/test';
import A_LoginPage from '../../pages/progweb.app/A_LoginPage';
import B_SelectShop from '../../pages/progweb.app/B_SelectShop';
import C_StartApplication from '../../pages/progweb.app/C_StartApplication';
import D_UpdateHomeAddress from '../../pages/progweb.app/D_UpdateHomeAddress';
import E_UpdateIncomeInfo from '../../pages/progweb.app/E_UpdateIncomeInfo';
import F_CreditCardDetails from '../../pages/progweb.app/F_UpdateCreditCardDetails';
import G_BankingInfo from '../../pages/progweb.app/G_UpdateBankingInfo';
import H_SubmitApplication from '../../pages/progweb.app/H_SubmitApplication';
import I_ResultsPage from '../../pages/progweb.app/I_ResultsPage';
import HappyPathApproved from 'data/progweb.approveme/HappyPathApproved';


test.describe('navigation', async () => {

  test.describe.configure({ retries: 0 });
  test.describe.configure({ mode: 'serial' });

  test('happy path approved to results page - apply', { tag: ['@approveme', '@progweb', '@happy', '@approved'] }, async ({ browser }) => {
    await expect(async () => {

      const bCont = await browser.newContext();
      const cPage = await bCont.newPage();
      let happyPathApproved = new HappyPathApproved();

      let loginPage = new A_LoginPage(cPage);
      await loginPage.happyPathPopulate(happyPathApproved.getLoginData);

      let selectShop = new B_SelectShop(cPage);
      await selectShop.clickMarchantDetails();
      await selectShop.lastLeaseMerchantName();
      await selectShop.clickForShop();
      await selectShop.navigateLocation();
      await selectShop._selectCityWithCode(happyPathApproved.getShopDetails[0]);
      await selectShop._selectOnline();
      await selectShop._selectShopName();
      await selectShop._startAplicaion();

      let startApplication = new C_StartApplication(cPage);
      await startApplication.selectCheckBox();
      await startApplication.clickStartButton();

      let updateHomeAddress = new D_UpdateHomeAddress(cPage);
      await updateHomeAddress.happyPathPopulate(happyPathApproved.getHomeAddress);

      let updateIncomeInfo = new E_UpdateIncomeInfo(cPage);
      await updateIncomeInfo.happyPathPopulate(happyPathApproved.getIncomeInfo);

      await cPage.waitForTimeout(3000);
      let updateCreditCardDetails = new F_CreditCardDetails(cPage);
      await updateCreditCardDetails.happyPathPopulate(happyPathApproved.getCreditCardDetails);

      let updateBankDetails = new G_BankingInfo(cPage);
      await updateBankDetails.happyPathPopulate(happyPathApproved.getBankingDetails);

      let submitApplication = new H_SubmitApplication(cPage);
      await submitApplication.happyPathPopulate();
      await cPage.waitForTimeout(15000);

      let resultsPage = new I_ResultsPage(cPage);
      await resultsPage.verifySuccessApproved();

      await cPage.close();
      await bCont.close();

    }).toPass({ timeout: 500000 });
  });
});