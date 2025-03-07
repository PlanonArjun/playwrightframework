import {expect, test} from '@playwright/test';
import HappyPathPending from "../../data/cricket.approveme/HappyPathPending"; // data object
import A_MarketingPage from "../../pages/cricket.approveme/A_MarketingPage";
import B_SplashPage from "../../pages/cricket.approveme/B_SplashPage";
import C_StartAppPage from "../../pages/cricket.approveme/C_StartAppPage";
import D_AboutYou1Page from "../../pages/cricket.approveme/D_AboutYou1Page";
import E_AboutYou2Page from "../../pages/cricket.approveme/E_AboutYou2Page";
import XF_AboutYou3Page, {HousingType} from "$pages/cricket.approveme/xF_AboutYou3Page";
import XG_AboutYou4Page, {IDType} from "$pages/cricket.approveme/xG_AboutYou4Page";
import XH_IncomeSourcePage, {IncomeSource} from "$pages/cricket.approveme/xH_IncomeSourcePage";
import XI_IncomeContactPage from "$pages/cricket.approveme/xI_IncomeContactPage";
import XJ_IncomeHistoryPage from "$pages/cricket.approveme/xJ_IncomeHistoryPage";
import XK_IncomeFrequencyPage, {Frequency} from "$pages/cricket.approveme/xK_IncomeFrequencyPage";
import XL_PaymentAccountPage from "$pages/cricket.approveme/xL_PaymentAccountPage";
import M_DirectDepositPage from "$pages/cricket.approveme/xM_DirectDepositPage";
import XN_PaymentCardPage from "$pages/cricket.approveme/xN_PaymentCardPage";
import O_ReviewAndSubmitPage from "$pages/cricket.approveme/J_ReviewAndSubmitPage";
import O_ReviewQAndSubmitPage from "$pages/cricket.approveme/J_ReviewAndSubmitPage";
import K_ResultsPage from "$pages/cricket.approveme/K_ResultsPage";

test.describe('happy path pending', async () => {

  test.describe.configure({ retries: 0 }); // do not change
  test.describe.configure({ mode: 'serial' }); // do not change

  let getStartAppData: string[];
  let nameFirstFetched:string;
  let nameLastFetched:string;
  let ssnFetched:string;

  test('pending', { tag: ['@approveme', '@cricketwireless', '@happy', '@pending'] },async ({browser}) => {
    await expect(async () => {

      let bCont = await browser.newContext();
      let cPage = await bCont.newPage();

      let a_marketingPage = new A_MarketingPage(cPage);
      await a_marketingPage.navigate();
      await a_marketingPage.beginApply();
      await cPage.waitForTimeout(500);

      let b_splashPage = new B_SplashPage(cPage);
      await b_splashPage.continue();

      let happyPathPending = new HappyPathPending();

      let c_startAppPage = new C_StartAppPage(cPage);

      getStartAppData = happyPathPending.getStartAppData;
      nameFirstFetched  = getStartAppData[0];
      nameLastFetched   = getStartAppData[1];
      ssnFetched        = getStartAppData[3]; // ssn is 3

      for(let value in getStartAppData) { // optional, helpful
        console.log(getStartAppData[value] + "\t");
      }
      console.log('\n');

      await c_startAppPage.happyPathPopulate(getStartAppData);

      let d_aboutYou1Page = new D_AboutYou1Page(cPage);
      await d_aboutYou1Page.happyPathPopulate(happyPathPending.getAboutYou1);


      let e_aboutYou2Page = new E_AboutYou2Page(cPage);
      await e_aboutYou2Page.happyPathPopulate(happyPathPending.getAboutYou2);

      let f_aboutYou3Page : XF_AboutYou3Page = new XF_AboutYou3Page(cPage,HousingType.OWN);
      await f_aboutYou3Page._selectHousingType();

      let g_aboutYou4Page : XG_AboutYou4Page = new XG_AboutYou4Page(cPage,IDType.State);
      await g_aboutYou4Page.selectIDType();
      await g_aboutYou4Page.enterIDNumber("123456");
      await g_aboutYou4Page.selectStateIssued("AZ");
      await g_aboutYou4Page.NEXT();

      let h_incomeSource = new XH_IncomeSourcePage(cPage, IncomeSource.FT);
      await h_incomeSource._selectIncomeSource();

      let i_incomeContact: XI_IncomeContactPage = new XI_IncomeContactPage(cPage);
      await i_incomeContact.happyPathPopulate(happyPathPending.getEmployerContactInfo);

      let j_incomeHistory: XJ_IncomeHistoryPage = new XJ_IncomeHistoryPage(cPage);
      await j_incomeHistory.happyPathPopulate(happyPathPending.getIncomeHistory);

      let k_incomeFrequency: XK_IncomeFrequencyPage = new XK_IncomeFrequencyPage(cPage, Frequency.MONTHLY);
      await k_incomeFrequency._selectFrequency();
      await k_incomeFrequency.enterDates(happyPathPending.getPayDates);

      let l_paymentAccount: XL_PaymentAccountPage = new XL_PaymentAccountPage(cPage);
      await l_paymentAccount.happyPathPopulate(happyPathPending.getPaymentAccountInfo);

      let m_dirDep: M_DirectDepositPage = new M_DirectDepositPage(cPage,true);
      await m_dirDep.happyPathGo();

      let n_paymentCard: XN_PaymentCardPage = new XN_PaymentCardPage(cPage);
      await n_paymentCard.happyPathGoWithSameAddress(happyPathPending.getPaymentCard.toString().slice(0,7));

      let o_reviewSubmit: O_ReviewAndSubmitPage = new O_ReviewQAndSubmitPage(cPage);
      await o_reviewSubmit.happyPathGo();

      let p_results: K_ResultsPage = new K_ResultsPage(cPage);

      try {
        await p_results.verifyPending();
        await cPage.evaluate(_ => {}, `browserstack_executor: ${JSON.stringify({action: 'setSessionStatus',arguments: {status: 'passed',reason:'cricket pending'}})}`);
      }catch(Error) {
        await cPage.evaluate(_ => {}, `browserstack_executor: ${JSON.stringify({action: 'setSessionStatus',arguments: {status: 'failed',reason: Error.toString()}})}`);
      }finally{
        await cPage.close();
        await bCont.close();
      }

    }).toPass({timeout: 120000});
  });

});
