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
import HappyPathPending from '../../data/progweb.approveme/HappyPathPending';

test.describe('navigation', async () => {

  test.describe.configure({ retries: 0 });
  test.describe.configure({ mode: 'serial' });

  test('happy path pending to results page - apply', { tag: ['@progweb', '@happy', '@pending'] }, async ({ browser }) => {
    await expect(async () => {

      const bCont = await browser.newContext();
      const cPage = await bCont.newPage();
      let happyPathPending = new HappyPathPending();

      let loginPage = new A_LoginPage(cPage);
      await loginPage.happyPathPopulate(happyPathPending.getLoginData);
      await cPage.waitForTimeout(2000);

      let selectShop = new B_SelectShop(cPage);
      await selectShop.happyPathPopulate(happyPathPending.getShopDetails);
      await cPage.waitForTimeout(5000);

      let startApplication = new C_StartApplication(cPage);
      await startApplication.selectCheckBox();
      await startApplication.clickStartButton();
      await cPage.waitForTimeout(2000);

      let updateHomeAddress = new D_UpdateHomeAddress(cPage);
      await updateHomeAddress.happyPathPopulate(happyPathPending.getHomeAddress);

      let updateIncomeInfo = new E_UpdateIncomeInfo(cPage);
      await updateIncomeInfo.happyPathPopulate(happyPathPending.getIncomeInfo);

      let updateCreditCardDetails = new F_CreditCardDetails(cPage);
      await updateCreditCardDetails.happyPathPopulate(happyPathPending.getCreditCardDetails);

      let updateBankDetails = new G_BankingInfo(cPage);
      await updateBankDetails.happyPathPopulate(happyPathPending.getBankingDetails);

      let submitApplication = new H_SubmitApplication(cPage);
      await submitApplication.happyPathPopulate();
      await cPage.waitForTimeout(15000);

      let resultsPage = new I_ResultsPage(cPage);
      try {
        await resultsPage.verifySuccessPending();
        await cPage.evaluate(_ => {}, `browserstack_executor: ${JSON.stringify({action: 'setSessionStatus',arguments: {status: 'passed',reason: 'pending'}})}`);
      }catch(Error) {
        await cPage.evaluate(_ => {}, `browserstack_executor: ${JSON.stringify({action: 'setSessionStatus',arguments: {status: 'failed',reason: Error.toString()}})}`);
      }finally  {
        await cPage.close();
        await bCont.close();
      }

    }).toPass({ timeout: 500000 });
  });
});