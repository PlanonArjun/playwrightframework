import {expect, test} from '@playwright/test';
import HappyPathApproved from "../../data/cricket.approveme/HappyPathApproved"; // data object
import A_MarketingPage from "../../pages/cricket.approveme/A_MarketingPage";
import B_SplashPage from "../../pages/cricket.approveme/B_SplashPage";
import C_StartAppPage from "../../pages/cricket.approveme/C_StartAppPage";
import D_AboutYou1Page from "../../pages/cricket.approveme/D_AboutYou1Page";
import E_AboutYou2Page from "../../pages/cricket.approveme/E_AboutYou2Page";
import F_AboutYou3Page, {HousingType} from "../../pages/cricket.approveme/F_AboutYou3Page";
import G_AboutYou4Page, {IDType} from "../../pages/cricket.approveme/G_AboutYou4Page";
import H_IncomeSourcePage, {IncomeSource} from "../../pages/cricket.approveme/H_IncomeSourcePage";
import I_IncomeContactPage from "../../pages/cricket.approveme/I_IncomeContactPage";
import J_IncomeHistoryPage from "../../pages/cricket.approveme/J_IncomeHistoryPage";
import K_IncomeFrequencyPage, {Frequency} from "../../pages/cricket.approveme/K_IncomeFrequencyPage";
import L_PaymentAccountPage from "../../pages/cricket.approveme/L_PaymentAccountPage";
import M_DirectDepositPage from "../../pages/cricket.approveme/M_DirectDepositPage";
import N_PaymentCardPage from "../../pages/cricket.approveme/N_PaymentCardPage";
import O_ReviewAndSubmitPage from "../../pages/cricket.approveme/O_ReviewAndSubmitPage";
import O_ReviewQAndSubmitPage from "../../pages/cricket.approveme/O_ReviewAndSubmitPage";
import P_ResultsPage from "../../pages/cricket.approveme/P_ResultsPage";

test.describe('cricket', async () => {

  test.describe.configure({ retries: 0 }); // do not change
  test.describe.configure({ mode: 'serial' }); // do not change

  let getStartAppData: string[];
  let nameFirstFetched:string;
  let nameLastFetched:string;
  let ssnFetched:string;

  test('approved', { tag: ['@approveme', '@cricketwireless', '@happy', '@approve'] },async ({browser}) => {
    await expect(async () => {

      let bCont = await browser.newContext();
      let cPage = await bCont.newPage();

      let a_marketingPage = new A_MarketingPage(cPage);
      await a_marketingPage.navigate();
      await a_marketingPage.beginApply();
      await cPage.waitForTimeout(500);

      let b_splashPage = new B_SplashPage(cPage);
      await b_splashPage.continue();

      let happyPathApproved = new HappyPathApproved();

      let c_startAppPage = new C_StartAppPage(cPage);

      getStartAppData = happyPathApproved.getStartAppData;
      nameFirstFetched  = getStartAppData[0];
      nameLastFetched   = getStartAppData[1];
      ssnFetched        = getStartAppData[3]; // ssn is 3

      for(let value in getStartAppData) { // optional, helpful
        console.log(getStartAppData[value] + "\t");
      }
      await c_startAppPage.happyPathPopulate(getStartAppData);

      let d_aboutYou1Page = new D_AboutYou1Page(cPage);
      await d_aboutYou1Page.happyPathPopulate(happyPathApproved.getAboutYou1);

      let e_aboutYou2Page = new E_AboutYou2Page(cPage);
      await e_aboutYou2Page.happyPathPopulate(happyPathApproved.getAboutYou2);

      let f_aboutYou3Page : F_AboutYou3Page = new F_AboutYou3Page(cPage,HousingType.OWN);
      await f_aboutYou3Page._selectHousingType();

      let g_aboutYou4Page : G_AboutYou4Page = new G_AboutYou4Page(cPage,IDType.State);
      await g_aboutYou4Page.selectIDType();
      await g_aboutYou4Page.enterIDNumber("123456");
      await g_aboutYou4Page.selectStateIssued("AZ");
      await g_aboutYou4Page.NEXT();

      let h_incomeSource = new H_IncomeSourcePage(cPage, IncomeSource.FT);
      await h_incomeSource._selectIncomeSource();

      let i_incomeContact: I_IncomeContactPage = new I_IncomeContactPage(cPage);
      await i_incomeContact.happyPathPopulate(happyPathApproved.getEmployerContactInfo);

      let j_incomeHistory: J_IncomeHistoryPage = new J_IncomeHistoryPage(cPage);
      await j_incomeHistory.happyPathPopulate(happyPathApproved.getIncomeHistory);

      let k_incomeFrequency: K_IncomeFrequencyPage = new K_IncomeFrequencyPage(cPage, Frequency.MONTHLY);
      await k_incomeFrequency._selectFrequency();
      await k_incomeFrequency.enterDates(happyPathApproved.getPayDates);

      let l_paymentAccount: L_PaymentAccountPage = new L_PaymentAccountPage(cPage);
      await l_paymentAccount.happyPathPopulate(happyPathApproved.getPaymentAccountInfo);

      let m_dirDep: M_DirectDepositPage = new M_DirectDepositPage(cPage,true);
      await m_dirDep.happyPathGo();

      let n_paymentCard: N_PaymentCardPage = new N_PaymentCardPage(cPage);
      await n_paymentCard.happyPathGoWithSameAddress(happyPathApproved.getPaymentCard.toString().slice(0,7));

      let o_reviewSubmit: O_ReviewAndSubmitPage = new O_ReviewQAndSubmitPage(cPage);
      await o_reviewSubmit.happyPathGo();

      let p_results: P_ResultsPage = new P_ResultsPage(cPage);

      try {
        await p_results.verifyApproved();
        await cPage.evaluate(_ => {}, `browserstack_executor: ${JSON.stringify({action: 'setSessionStatus',arguments: {status: 'passed',reason:'cricket approved'}})}`);
      }catch(Error) {
        await cPage.evaluate(_ => {}, `browserstack_executor: ${JSON.stringify({action: 'setSessionStatus',arguments: {status: 'failed',reason: Error.toString()}})}`);
      }finally{
        await cPage.close();
        await bCont.close();
      }

    }).toPass({timeout: 120000});
  });
});
