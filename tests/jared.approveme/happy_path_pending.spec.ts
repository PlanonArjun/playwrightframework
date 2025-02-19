import { test, expect } from '@playwright/test';
import A_MarketingPage from "../../pages/jared.approveme/A_MarketingPage";
import B_SplashPage from "../../pages/jared.approveme/B_SplashPage";
import C_StartAppPage from "../../pages/jared.approveme/C_StartAppPage";
import F_RentOwn from '../../pages/jared.approveme/F_RentOwn';
import G_IDType from '../../pages/jared.approveme/G_IDType';
import H_EmployStatus from '../../pages/jared.approveme/H_EmployStatus';
import I_EmployeeInfo from '../../pages/jared.approveme/I_EmployeeInfo';
import J_EmployerDuration from '../../pages/jared.approveme/J_EmployerDuration';
import K_IncomeInfoPage from '../../pages/jared.approveme/K_IncomeInfoPage';
import P_ConfirmSubmit from '../../pages/jared.approveme/P_ConfirmSubmit';
import Q_Results from '../../pages/jared.approveme/Q_ResultsPage';
import D_AboutYouContactPage from '../../pages/jared.approveme/D_AboutYouContactPage';
import E_AboutYouAddressPage from '../../pages/jared.approveme/E_AboutYouAddressPage';
import L_BankAccountDetails from '../../pages/jared.approveme/L_BankAccountDetails';
import M_BankDepositMode from '../../pages/jared.approveme/M_BankDepositMode';
import N_PaymentCardDetails from '../../pages/jared.approveme/N_PaymentCardDetails';
import O_PaymentBillingAddress from '../../pages/jared.approveme/O_PaymentBillingAddress';
import HappyPathPending from '../../data/jared.approveme/HappyPathPending';


test.describe('navigation', async () => {

  test.describe.configure({ retries: 0 });
  test.describe.configure({ mode: 'serial' });

  let getStartAppData: string[];
  let nameFirstFetched:string;
  let nameLastFetched:string;
  let ssnFetched:string;

  test('happy path pending to results page - apply', { tag: ['@approveme', '@signet', '@jared', '@splashpage', '@happy', '@pending'] }, async ({ browser }) => {
    await expect(async () => {

      const bCont = await browser.newContext();
      const cPage = await bCont.newPage();

      let marketingPage = new A_MarketingPage(cPage);
      await marketingPage.beginApply();
      await cPage.waitForTimeout(1000);

      let splashPage = new B_SplashPage(cPage);
      await splashPage.continue();

      let happyPathPending = new HappyPathPending();

      let c_startAppPage = new C_StartAppPage(cPage);

      getStartAppData = happyPathPending.getStartAppData;
      nameFirstFetched  = getStartAppData[0];
      nameLastFetched   = getStartAppData[1];
      ssnFetched        = getStartAppData[3]; // ssn is 3

      for(let value in getStartAppData) { // optional, helpful
        console.log(getStartAppData[value] + "\t");
      }
      await c_startAppPage.happyPathPopulate(getStartAppData);

      let aboutYouContactPage = new D_AboutYouContactPage(cPage);
      await aboutYouContactPage.happyPathPopulate(happyPathPending.getAboutYou1);

      let aboutYouAddressPage = new E_AboutYouAddressPage(cPage);
      await aboutYouAddressPage.happyPathPopulate(happyPathPending.getAboutYou2);

      let rentOwn = new F_RentOwn(cPage);
      await rentOwn.setIsOwn(true);

      let iDType = new G_IDType(cPage);
      await iDType.happyPathPopulate(happyPathPending.getIdNumber);

      let employStatus = new H_EmployStatus(cPage);
      await employStatus.happyPathPopulate();

      let employeeInfo = new I_EmployeeInfo(cPage);
      await employeeInfo.happyPathPopulate(happyPathPending.getEmployeeInfo);

      let employerDuration = new J_EmployerDuration(cPage);
      await employerDuration.happyPathPopulate(happyPathPending.getEmployerInfo);

      let incomeInfoPage = new K_IncomeInfoPage(cPage);
      await incomeInfoPage.happyPathPopulate(happyPathPending.getIncomeInfo);

      let bankAccountDetails = new L_BankAccountDetails(cPage);
      await bankAccountDetails.happyPathPopulate(happyPathPending.getBankInfo1);

      let bankDepositMode = new M_BankDepositMode(cPage);
      await bankDepositMode.setIsDirectDeposit(happyPathPending.getBankInfo2);

      let paymentCardsDetails = new N_PaymentCardDetails(cPage);
      await paymentCardsDetails.happyPathPopulate(happyPathPending.getPaymentCard);

      let paymentBillingAddress = new O_PaymentBillingAddress(cPage);
      await paymentBillingAddress._checkSameAs();
      await paymentBillingAddress._NEXT();

      let p_submitConfirm = new P_ConfirmSubmit(cPage);
      await p_submitConfirm.submitApplication();

      let q_results: Q_Results = new Q_Results(cPage);

      try {
        await q_results.verifySuccessPending();
        await cPage.evaluate(_ => {}, `browserstack_executor: ${JSON.stringify({action: 'setSessionStatus',arguments: {status: 'passed',reason:'jared pending'}})}`);
      }catch(Error) {
        await cPage.evaluate(_ => {}, `browserstack_executor: ${JSON.stringify({action: 'setSessionStatus',arguments: {status: 'failed',reason: Error.toString()}})}`);
      }finally{
        await cPage.close();
        await bCont.close();
      }

    }).toPass({ timeout: 100000 });
  });
});