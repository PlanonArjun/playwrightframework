import { test, expect } from '@playwright/test';
import A_MarketingPage from "../../pages/biglots.approveme.deprecated/A_MarketingPage";
import B_SplashPage from "../../pages/biglots.approveme.deprecated/B_SplashPage";
import C_StartAppPage from "../../pages/biglots.approveme.deprecated/C_StartAppPage";
import D_AboutYou1Page from "../../pages/biglots.approveme.deprecated/D_AboutYou1Page";
import E_AboutYou2Page from "../../pages/biglots.approveme.deprecated/E_AboutYou2Page";
import F_RentOwn from '../../pages/biglots.approveme.deprecated/F_RentOwn';
import G_IDType from '../../pages/biglots.approveme.deprecated/G_IDType';
import H_EmployStatus from '../../pages/biglots.approveme.deprecated/H_EmployStatus';
import I_EmployeeInfo from '../../pages/biglots.approveme.deprecated/I_EmployeeInfo';
import J_EmployerDuration from '../../pages/biglots.approveme.deprecated/J_EmployerDuration';
import K_IncomeInfoPage from '../../pages/biglots.approveme.deprecated/K_IncomeInfoPage';
import L_BankInfo1Page from '../../pages/biglots.approveme.deprecated/L_BankInfo1Page';
import M_BankInfo2Page from '../../pages/biglots.approveme.deprecated/M_BankInfo2Page';
import P_ConfirmSubmit from '../../pages/biglots.approveme.deprecated/P_ConfirmSubmit';
import Q_Results from '../../pages/biglots.approveme.deprecated/Q_Results';
import N_PaymentCard1Page from '../../pages/biglots.approveme.deprecated/N_PaymentCard1Page';
import HappyPathDenied from '../../data/biglots.approveme.deprecated/HappyPathDenied';
import O_PaymentCard2Page from '../../pages/biglots.approveme.deprecated/O_PaymentCard2Page';

test.describe('denied', async () => {

  test.describe.configure({ retries: 0 });
  test.describe.configure({ mode: 'serial' });

  /**
   * @deprecated
   */
  test.skip('happy path denied', { tag: ['@approveme', '@biglots', '@splashpage', '@happy', '@denied'] }, async ({ browser }) => {
    await expect(async () => {

      const bCont = await browser.newContext();
      const cPage = await bCont.newPage();

      let a_marketingPage = new A_MarketingPage(cPage);
      await a_marketingPage.beginApply();
      await cPage.waitForTimeout(1000);

      let b_splashPage = new B_SplashPage(cPage);
      await b_splashPage.continue();

      let happyPathDenied = new HappyPathDenied();

      let c_startAppPage = new C_StartAppPage(cPage);
      await c_startAppPage.happyPathPopulate(happyPathDenied.getStartAppData);

      let d_aboutYou1Page = new D_AboutYou1Page(cPage);
      await d_aboutYou1Page.happyPathPopulate(happyPathDenied.getAboutYou1);

      let e_aboutYou2Page = new E_AboutYou2Page(cPage);
      await e_aboutYou2Page.happyPathPopulate(happyPathDenied.getAboutYou2);

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

      let l_bankInfo1Page = new L_BankInfo1Page(cPage);
      await l_bankInfo1Page.happyPathPopulate(happyPathDenied.getBankInfo1);

      let m_bankInfo2Page = new M_BankInfo2Page(cPage);
      await m_bankInfo2Page.setIsDirectDeposit(happyPathDenied.getBankInfo2);


      let n_paymentCardPage = new N_PaymentCard1Page(cPage);
      await n_paymentCardPage.happyPathPopulate(happyPathDenied.getPaymentCard);

      let o_paymentCardPage = new O_PaymentCard2Page(cPage);
      await o_paymentCardPage._checkSameAs();
      await o_paymentCardPage._NEXT();

      let p_submitConfirm = new P_ConfirmSubmit(cPage);
      await p_submitConfirm.submitApplication();

      await cPage.waitForTimeout(5000);
      let q_results = new Q_Results(cPage);
      await q_results.verifySuccessDenied();

      await cPage.close();
      await bCont.close();

    }).toPass({ timeout: 90000 });
  });
});