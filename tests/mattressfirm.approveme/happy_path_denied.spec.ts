import { test, expect, BrowserContext, Page } from '@playwright/test';
import A_MarketingPage from "../../pages/mattressfirm.approveme/A_MarketingPage";
import B_SplashPage from "../../pages/mattressfirm.approveme/B_SplashPage";
import C_StartAppPage from "../../pages/mattressfirm.approveme/C_StartAppPages";
import F_RentOwn from '../../pages/mattressfirm.approveme/F_RentOwnPage';
import G_IDType from '../../pages/mattressfirm.approveme/G_IdTypePage';
import H_EmployStatus from '../../pages/mattressfirm.approveme/H_EmployeeStatusPage';
import I_EmployeeInfo from '../../pages/mattressfirm.approveme/I_EmployeeInfoPage';
import J_EmployerDuration from '../../pages/mattressfirm.approveme/J_EmployeeDurationPage';
import K_IncomeInfoPage from '../../pages/mattressfirm.approveme/K_IncomeInfoPage';
import L_BankInfoPage from '../../pages/mattressfirm.approveme/L_BankInfoPage';
import M_BankInfoPage from '../../pages/mattressfirm.approveme/M_BankInfoPage';
import P_ConfirmSubmit from '../../pages/mattressfirm.approveme/P_ConfirmSubmit';
import Q_Results from '../../pages/mattressfirm.approveme/Q_Results';
import N_PaymentCardPage from '../../pages/mattressfirm.approveme/N_PaymentCardPage';
import O_PaymentCardPage from '../../pages/mattressfirm.approveme/O_PaymentCardPage';
import HappyPathDenied from '../../data/mattressfirm.approveme/HappyPathDenied';
import D_AboutYouPage from '../../pages/mattressfirm.approveme/D_AboutYouPage';
import E_AboutYouPage from '../../pages/mattressfirm.approveme/E_AboutYouPage';
import MTFMHealthCheck from './MTFMHealthCheck';

let bCont: BrowserContext;
let cPage: Page;
let isHealthyLocal: Boolean;

test.describe('MTFM', async () => {

  test.describe.configure({ retries: 0 });
  test.describe.configure({ mode: 'serial' });

  test.beforeAll(async ({browser}) => {
    bCont = await browser.newContext();
    cPage = await bCont.newPage();
    isHealthyLocal = await new MTFMHealthCheck(cPage).isHealthy();
  });

  test('denied', {tag: ['@approveme', '@mattressfirm', '@happy', '@denied']}, async ({browser}) => {
    test.skip(isHealthyLocal == false, 'health check FAILED; test.skip()');
    await expect(async () => {

      bCont = await browser.newContext();
      cPage = await bCont.newPage();

      let a_marketingPage = new A_MarketingPage(cPage);
      await a_marketingPage.navigate()
      await a_marketingPage.beginApply();
      await cPage.waitForTimeout(1000);

      let b_splashPage = new B_SplashPage(cPage);
      await b_splashPage.continue();

      let happyPathDenied = new HappyPathDenied();

      let getStartAppData: string[] =  happyPathDenied.getStartAppData;

      let c_startAppPage = new C_StartAppPage(cPage);

      for(let value in getStartAppData) { // optional, helpful
        console.log(getStartAppData[value] + "\t");
      }
      await c_startAppPage.happyPathPopulate(getStartAppData);

      let d_aboutYouPage = new D_AboutYouPage(cPage);
      await d_aboutYouPage.happyPathPopulate(happyPathDenied.getAboutYou1);

      let e_aboutYouPage = new E_AboutYouPage(cPage);
      await e_aboutYouPage.happyPathPopulate(happyPathDenied.getAboutYou2);

      let f_rentOwn = new F_RentOwn(cPage);
      await f_rentOwn.setIsOwn(true);

      let g_iDType = new G_IDType(cPage);
      await g_iDType.happyPathPopulate(happyPathDenied.getIdNumber);

      let h_employStatus = new H_EmployStatus(cPage);
      await h_employStatus.happyPathPopulate();

      let i_employeeInfo = new I_EmployeeInfo(cPage);
      await i_employeeInfo.happyPathPopulate(happyPathDenied.getEmployeeInfo);

      let j_employerDuration = new J_EmployerDuration(cPage);
      await j_employerDuration.happyPathPopulate(happyPathDenied.getEmployerInfo);

      let k_incomeInfoPage = new K_IncomeInfoPage(cPage);
      await k_incomeInfoPage.happyPathPopulate(happyPathDenied.getIncomeInfo);

      let l_bankInfoPage = new L_BankInfoPage(cPage);
      await l_bankInfoPage.happyPathPopulate(happyPathDenied.getBankInfo1);

      let m_bankInfoPage = new M_BankInfoPage(cPage);
      await m_bankInfoPage.setIsDirectDeposit(happyPathDenied.getBankInfo2);

      let n_paymentCardPage = new N_PaymentCardPage(cPage);
      await n_paymentCardPage.happyPathPopulate(happyPathDenied.getPaymentCard);

      let o_paymentCardPage = new O_PaymentCardPage(cPage);
      await o_paymentCardPage._checkSameAs();
      await o_paymentCardPage._NEXT();

      await (new P_ConfirmSubmit(cPage)).submitApplication();

      try {
        await (new Q_Results(cPage)).verifySuccessDenied();
        console.log("MTFM denied passed");
        await cPage.evaluate(_ => {}, `browserstack_executor: ${JSON.stringify({action: 'setSessionStatus',arguments: {status: 'passed',reason: 'denied'}})}`);
      }catch(Error) {
        await cPage.evaluate(_ => {}, `browserstack_executor: ${JSON.stringify({action: 'setSessionStatus',arguments: {status: 'failed',reason: Error.toString()}})}`);
      }finally {
        await cPage.close();
        await bCont.close();
      }
    }).toPass({ timeout: 120000 });
  });
});