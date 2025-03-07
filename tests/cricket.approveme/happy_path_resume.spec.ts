import {expect, test} from '@playwright/test';
import HappyPathApproved from "../../data/cricket.approveme/HappyPathApproved"; // data object
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
import R_ResumeApplication from "../../pages/jared.approveme/R_ResumeApplication";
import Q_ResumeApplication from "$pages/cricket.approveme/xQ_ResumeApplication";

test.describe('happy path resume', async () => {

  test.describe.configure({ retries: 0 }); // do not change
  test.describe.configure({ mode: 'serial' }); // do not change

  let getStartAppData: string[];
  let nameFirstFetched:string;
  let nameLastFetched:string;
  let ssnFetched:string;
  let isApplyPass: boolean = false;


  test('approve first', { tag: ['@approveme', '@cricketwireless', '@happy', '@resume'] },async ({browser}) => {
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
      await i_incomeContact.happyPathPopulate(happyPathApproved.getEmployerContactInfo);

      let j_incomeHistory: XJ_IncomeHistoryPage = new XJ_IncomeHistoryPage(cPage);
      await j_incomeHistory.happyPathPopulate(happyPathApproved.getIncomeHistory);

      let k_incomeFrequency: XK_IncomeFrequencyPage = new XK_IncomeFrequencyPage(cPage, Frequency.MONTHLY);
      await k_incomeFrequency._selectFrequency();
      await k_incomeFrequency.enterDates(happyPathApproved.getPayDates);

      let l_paymentAccount: XL_PaymentAccountPage = new XL_PaymentAccountPage(cPage);
      await l_paymentAccount.happyPathPopulate(happyPathApproved.getPaymentAccountInfo);

      let m_dirDep: M_DirectDepositPage = new M_DirectDepositPage(cPage,true);
      await m_dirDep.happyPathGo();

      let n_paymentCard: XN_PaymentCardPage = new XN_PaymentCardPage(cPage);
      await n_paymentCard.happyPathGoWithSameAddress(happyPathApproved.getPaymentCard.toString().slice(0,7));

      let o_reviewSubmit: O_ReviewAndSubmitPage = new O_ReviewQAndSubmitPage(cPage);
      await o_reviewSubmit.happyPathGo();

      let p_results: K_ResultsPage = new K_ResultsPage(cPage);

      try {
        await p_results.verifyApproved();
        isApplyPass = true;
        console.log("Apply passed. Resume up next.")
        await cPage.evaluate(_ => {}, `browserstack_executor: ${JSON.stringify({action: 'setSessionStatus',arguments: {status: 'passed',reason:'initial apply'}})}`);
      }catch(Error) {
        await cPage.evaluate(_ => {}, `browserstack_executor: ${JSON.stringify({action: 'setSessionStatus',arguments: {status: 'failed',reason: Error.toString()}})}`);
      }finally{
        await cPage.close();
        await bCont.close();
      }

    }).toPass({timeout: 100000});
  });

  test('resume second', { tag: ['@approveme', '@cricketwireless', '@happy', '@resume'] },async ({browser}) => {
    await expect(async () => {

      if(isApplyPass) {

        const bContR = await browser.newContext();
        const cPageR = await bContR.newPage();

        let marketingPageR = new A_MarketingPage(cPageR);
        await marketingPageR.navigate();
        await marketingPageR.beginResume();

        let resumePage = new Q_ResumeApplication(cPageR);
        await resumePage.happyPathPopulate([nameFirstFetched,nameLastFetched],ssnFetched);

        let p_resultsR: K_ResultsPage = new K_ResultsPage(cPageR);

        try {
          await p_resultsR.verifyApproved();
          console.log("Resume passed. End test.")
          await cPageR.evaluate(_ => {}, `browserstack_executor: ${JSON.stringify({action: 'setSessionStatus',arguments: {status: 'passed',reason:'resume'}})}`);
        }catch(Error) {
          await cPageR.evaluate(_ => {}, `browserstack_executor: ${JSON.stringify({action: 'setSessionStatus',arguments: {status: 'failed',reason: Error.toString()}})}`);
        }finally{
          await cPageR.close();
          await bContR.close();
        }
      }else {
        console.log("Apply failed. Resume skipped.");
      }

    }).toPass({timeout: 90000});
  });

});
