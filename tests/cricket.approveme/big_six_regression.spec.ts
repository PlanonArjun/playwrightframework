import {BrowserContext, expect, Page, test} from '@playwright/test';
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
import Q_ResumeApplication from "$pages/cricket.approveme/xQ_ResumeApplication";
import HappyPathPending from "../../data/cricket.approveme/HappyPathPending";
import HappyPathDenied from "../../data/cricket.approveme/HappyPathDenied";
import R_PaymentEstimator from "$pages/cricket.approveme/xR_PaymentEstimator";
import {PaymentFrequency} from "../../data/paymentFrequency";

let isLandingPageLoads: boolean = false;

test.describe('Cricket Big Six', async () => {

  test.describe.configure({ mode: 'serial' }); // do not change

  let getStartAppData: string[];
  let nameFirstFetched:string;
  let nameLastFetched:string;
  let ssnFetched:string;
  let isApplyPass: boolean = false;
  let isResumePass: boolean = false;
  let isFlowsShouldContinue: boolean = false;

  test('landing page', async ({browser}) => {
    let bCont = await browser.newContext();
    let cPage = await bCont.newPage();

    let a_marketingPage = new A_MarketingPage(cPage);
    try {
      await a_marketingPage.navigate();
      await cPage.evaluate(_ => {}, `browserstack_executor: ${JSON.stringify({action: 'setSessionStatus',arguments: {status: 'passed',reason: 'landing page up'}})}`);
      isLandingPageLoads = true;
      console.log('landing page is up; begin tests...')
    }catch(Error) {
      console.log('\nfull stop; landing page is down...\n');
      test.fail();
    }finally{
      await cPage.close();
      await bCont.close();
    }
  });

  test('approve before resume', { tag: ['@approveme', '@cricketwireless', '@happy'] },async ({browser}) => {
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
      nameFirstFetched = getStartAppData[0];
      nameLastFetched = getStartAppData[1];
      ssnFetched = getStartAppData[3]; // ssn is 3

      for (let value in getStartAppData) { // optional, helpful
        console.log(getStartAppData[value] + "\t");
      }
      await c_startAppPage.happyPathPopulate(getStartAppData);

      let d_aboutYou1Page = new D_AboutYou1Page(cPage);
      await d_aboutYou1Page.happyPathPopulate(happyPathApproved.getAboutYou1);

      let e_aboutYou2Page = new E_AboutYou2Page(cPage);
      await e_aboutYou2Page.happyPathPopulate(happyPathApproved.getAboutYou2);

      let f_aboutYou3Page: XF_AboutYou3Page = new XF_AboutYou3Page(cPage, HousingType.OWN);
      await f_aboutYou3Page._selectHousingType();

      let g_aboutYou4Page: XG_AboutYou4Page = new XG_AboutYou4Page(cPage, IDType.State);
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

      let m_dirDep: M_DirectDepositPage = new M_DirectDepositPage(cPage, true);
      await m_dirDep.happyPathGo();

      let n_paymentCard: XN_PaymentCardPage = new XN_PaymentCardPage(cPage);
      await n_paymentCard.happyPathGoWithSameAddress(happyPathApproved.getPaymentCard.toString().slice(0, 7));

      let o_reviewSubmit: O_ReviewAndSubmitPage = new O_ReviewQAndSubmitPage(cPage);
      await o_reviewSubmit.happyPathGo();

      let p_results: K_ResultsPage = new K_ResultsPage(cPage);

      try {
        await p_results.verifyApproved();
        isApplyPass = true;
        console.log("apply passed; resume up next...")
        await cPage.evaluate(_ => {
        }, `browserstack_executor: ${JSON.stringify({
          action: 'setSessionStatus',
          arguments: {status: 'passed', reason: 'initial apply'}
        })}`);
      } catch (Error) {
        await cPage.evaluate(_ => {
        }, `browserstack_executor: ${JSON.stringify({
          action: 'setSessionStatus',
          arguments: {status: 'failed', reason: Error.toString()}
        })}`);
      } finally {
        await cPage.close();
        await bCont.close();
      }
    }).toPass({timeout: 120000});
  });

  test('resume second', { tag: ['@approveme', '@cricketwireless', '@happy', '@resume'] },async ({browser}) => {
    if(isApplyPass) {

      await expect(async () => {

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
          console.log("apply-resume back-to-back passed...")
          isResumePass = true;
          isFlowsShouldContinue = true;
          await cPageR.evaluate(_ => {}, `browserstack_executor: ${JSON.stringify({action: 'setSessionStatus',arguments: {status: 'passed',reason:'resume'}})}`);
        }catch(Error) {
          await cPageR.evaluate(_ => {}, `browserstack_executor: ${JSON.stringify({action: 'setSessionStatus',arguments: {status: 'failed',reason: Error.toString()}})}`);
        }finally{
          await cPageR.close();
          await bContR.close();
        }
      }).toPass({timeout: 90000});
    }else {
      console.log("apply failed so resume skipped...");
    }
  });

  test('separate approved', { tag: ['@approveme', '@cricketwireless', '@happy', '@approved'] },async ({browser}) => {
    if((!isResumePass) && (isFlowsShouldContinue)) {

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
          await cPage.evaluate(_ => {}, `browserstack_executor: ${JSON.stringify({action: 'setSessionStatus',arguments: {status: 'passed',reason:'cricket separate approved'}})}`);
        }catch(Error) {
          isFlowsShouldContinue = false;
          await cPage.evaluate(_ => {}, `browserstack_executor: ${JSON.stringify({action: 'setSessionStatus',arguments: {status: 'failed',reason: Error.toString()}})}`);
        }finally{
          await cPage.close();
          await bCont.close();
        }

      }).toPass({timeout: 120000});

    }else {
      console.log('separate approved skipped on purpose, not needed');
    }
  });

  test('pending', { tag: ['@approveme', '@cricketwireless', '@happy', '@pending'] },async ({browser}) => {
    const ATTEMPTS_MAX: number = 2;
    let attempts: number = 1;
    let isPendingPass = false;
    while((attempts <= ATTEMPTS_MAX) && (isPendingPass===false)) {

      if (isFlowsShouldContinue) {

        if(attempts===1) {
          console.log('continue with pending...');
        }

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
          nameFirstFetched = getStartAppData[0];
          nameLastFetched = getStartAppData[1];
          ssnFetched = getStartAppData[3]; // ssn is 3

          for (let value in getStartAppData) { // optional, helpful
            console.log(getStartAppData[value] + "\t");
          }
          await c_startAppPage.happyPathPopulate(getStartAppData);

          let d_aboutYou1Page = new D_AboutYou1Page(cPage);
          await d_aboutYou1Page.happyPathPopulate(happyPathPending.getAboutYou1);

          let e_aboutYou2Page = new E_AboutYou2Page(cPage);
          await e_aboutYou2Page.happyPathPopulate(happyPathPending.getAboutYou2);

          let f_aboutYou3Page: XF_AboutYou3Page = new XF_AboutYou3Page(cPage, HousingType.OWN);
          await f_aboutYou3Page._selectHousingType();

          let g_aboutYou4Page: XG_AboutYou4Page = new XG_AboutYou4Page(cPage, IDType.State);
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

          let m_dirDep: M_DirectDepositPage = new M_DirectDepositPage(cPage, true);
          await m_dirDep.happyPathGo();

          let n_paymentCard: XN_PaymentCardPage = new XN_PaymentCardPage(cPage);
          await n_paymentCard.happyPathGoWithSameAddress(happyPathPending.getPaymentCard.toString().slice(0, 7));

          let o_reviewSubmit: O_ReviewAndSubmitPage = new O_ReviewQAndSubmitPage(cPage);
          await o_reviewSubmit.happyPathGo();

          let p_results: K_ResultsPage = new K_ResultsPage(cPage);

          try {
            await p_results.verifyPending();
            isPendingPass = true;
            await cPage.evaluate(_ => {
            }, `browserstack_executor: ${JSON.stringify({
              action: 'setSessionStatus',
              arguments: {status: 'passed', reason: 'cricket pending'}
            })}`);
            console.log("pending passed...");
          } catch (Error) {
            await cPage.evaluate(_ => {
            }, `browserstack_executor: ${JSON.stringify({
              action: 'setSessionStatus',
              arguments: {status: 'failed', reason: Error.toString()}
            })}`);
            attempts++;
            isFlowsShouldContinue = false;
          } finally {
            await cPage.close();
            await bCont.close();
          }

        }).toPass({timeout: 120000});
      }
    }
  });

  test('denied', { tag: ['@approveme', '@cricketwireless', '@happy', '@denied'] },async ({browser}) => {
    const ATTEMPTS_MAX: number = 2;
    let attempts: number = 1;
    let isDeniedPass = false;
    while((attempts <= ATTEMPTS_MAX) && (isDeniedPass===false)) {

      if(isFlowsShouldContinue) {

        console.log('continue with denied...');

        await expect(async () => {

          let bCont = await browser.newContext();
          let cPage = await bCont.newPage();

          let a_marketingPage = new A_MarketingPage(cPage);
          await a_marketingPage.navigate();
          await a_marketingPage.beginApply();
          await cPage.waitForTimeout(500);

          let b_splashPage = new B_SplashPage(cPage);
          await b_splashPage.continue();

          let happyPathDenied = new HappyPathDenied();

          let c_startAppPage = new C_StartAppPage(cPage);

          getStartAppData = happyPathDenied.getStartAppData;
          nameFirstFetched = getStartAppData[0];
          nameLastFetched = getStartAppData[1];
          ssnFetched = getStartAppData[3]; // ssn is 3

          for (let value in getStartAppData) { // optional, helpful
            console.log(getStartAppData[value] + "\t");
          }
          await c_startAppPage.happyPathPopulate(getStartAppData);

          let d_aboutYou1Page = new D_AboutYou1Page(cPage);
          await d_aboutYou1Page.happyPathPopulate(happyPathDenied.getAboutYou1);

          let e_aboutYou2Page = new E_AboutYou2Page(cPage);
          await e_aboutYou2Page.happyPathPopulate(happyPathDenied.getAboutYou2);

          let f_aboutYou3Page: XF_AboutYou3Page = new XF_AboutYou3Page(cPage, HousingType.OWN);
          await f_aboutYou3Page._selectHousingType();

          let g_aboutYou4Page: XG_AboutYou4Page = new XG_AboutYou4Page(cPage, IDType.State);
          await g_aboutYou4Page.selectIDType();
          await g_aboutYou4Page.enterIDNumber("123456");
          await g_aboutYou4Page.selectStateIssued("AZ");
          await g_aboutYou4Page.NEXT();

          let h_incomeSource = new XH_IncomeSourcePage(cPage, IncomeSource.FT);
          await h_incomeSource._selectIncomeSource();

          let i_incomeContact: XI_IncomeContactPage = new XI_IncomeContactPage(cPage);
          await i_incomeContact.happyPathPopulate(happyPathDenied.getEmployerContactInfo);

          let j_incomeHistory: XJ_IncomeHistoryPage = new XJ_IncomeHistoryPage(cPage);
          await j_incomeHistory.happyPathPopulate(happyPathDenied.getIncomeHistory);

          let k_incomeFrequency: XK_IncomeFrequencyPage = new XK_IncomeFrequencyPage(cPage, Frequency.MONTHLY);
          await k_incomeFrequency._selectFrequency();
          await k_incomeFrequency.enterDates(happyPathDenied.getPayDates);

          let l_paymentAccount: XL_PaymentAccountPage = new XL_PaymentAccountPage(cPage);
          await l_paymentAccount.happyPathPopulate(happyPathDenied.getPaymentAccountInfo);

          let m_dirDep: M_DirectDepositPage = new M_DirectDepositPage(cPage, true);
          await m_dirDep.happyPathGo();

          let n_paymentCard: XN_PaymentCardPage = new XN_PaymentCardPage(cPage);
          await n_paymentCard.happyPathGoWithSameAddress(happyPathDenied.getPaymentCard.toString().slice(0, 7));

          let o_reviewSubmit: O_ReviewAndSubmitPage = new O_ReviewQAndSubmitPage(cPage);
          await o_reviewSubmit.happyPathGo();

          let p_results: K_ResultsPage = new K_ResultsPage(cPage);
          try {
            await p_results.verifyDenied();
            isDeniedPass = true;
            await cPage.evaluate(_ => {
            }, `browserstack_executor: ${JSON.stringify({
              action: 'setSessionStatus',
              arguments: {status: 'passed', reason: 'cricket denied'}
            })}`);
            console.log("denied passed...")
            return;
          } catch (Error) {
            await cPage.evaluate(_ => {
            }, `browserstack_executor: ${JSON.stringify({
              action: 'setSessionStatus',
              arguments: {status: 'failed', reason: Error.toString()}
            })}`);
            isFlowsShouldContinue = false;
            attempts++;
          } finally {
            await cPage.close();
            await bCont.close();
          }

        }).toPass({timeout: 120000});
      }
    }
  });

  test('estimator : weekly', { tag: ['@cricket', '@approveme', '@happypath', '@estimate'] }, async ({browser}) => {
    const ATTEMPTS_MAX: number = 2;
    let attempts: number = 1;
    let isWeeklyPass = false;
    while((attempts <= ATTEMPTS_MAX) && (isWeeklyPass===false)) {
      if (isLandingPageLoads) {
        console.log('continue with estimator tests...');

        let bCont = await browser.newContext();
        let cPage = await bCont.newPage();
        let a_marketingPage = new A_MarketingPage(cPage);
        await a_marketingPage.beginEstimate();
        let r_estimator = new R_PaymentEstimator(cPage);

        try {
          await r_estimator.happyPathEstimate('3001', PaymentFrequency.Weekly);
          isWeeklyPass = true;
          await cPage.evaluate(_ => {
          }, `browserstack_executor: ${JSON.stringify({
            action: 'setSessionStatus',
            arguments: {status: 'passed', reason: 'weekly'}
          })}`);
        } catch (Error) {
          attempts++;
          await cPage.evaluate(_ => {
          }, `browserstack_executor: ${JSON.stringify({
            action: 'setSessionStatus',
            arguments: {status: 'failed', reason: Error.toString()}
          })}`);
        } finally {
          await cPage.close();
          await bCont.close();
        }
      }
    }
    });

  test('estimator : biweekly', { tag: ['@cricket', '@approveme', '@happypath', '@estimate'] }, async ({browser}) => {
    const ATTEMPTS_MAX: number = 2;
    let attempts: number = 1;
    let isBiweeklyPass = false;
    while((attempts <= ATTEMPTS_MAX) && (isBiweeklyPass===false)) {
      if (isLandingPageLoads) {

        let bCont = await browser.newContext();
        let cPage = await bCont.newPage();
        let a_marketingPage = new A_MarketingPage(cPage);
        await a_marketingPage.beginEstimate();
        let r_estimator = new R_PaymentEstimator(cPage);

        try {
          await r_estimator.happyPathEstimate('3022', PaymentFrequency.BiWeekly);
          isBiweeklyPass = true;
          await cPage.evaluate(_ => {
          }, `browserstack_executor: ${JSON.stringify({
            action: 'setSessionStatus',
            arguments: {status: 'passed', reason: 'biweekly'}
          })}`);
        } catch (Error) {
          attempts++;
          await cPage.evaluate(_ => {
          }, `browserstack_executor: ${JSON.stringify({
            action: 'setSessionStatus',
            arguments: {status: 'failed', reason: Error.toString()}
          })}`);
        } finally {
          await cPage.close();
          await bCont.close();
        }
      }
    }
  });

  test('estimator : semimonthly', { tag: ['@cricket', '@approveme', '@happypath', '@estimate'] }, async ({browser}) => {
    const ATTEMPTS_MAX: number = 2;
    let attempts: number = 1;
    let isSemiMonthlyPass = false;
    while((attempts <= ATTEMPTS_MAX) && (isSemiMonthlyPass===false)) {
      if (isLandingPageLoads) {

        let bCont = await browser.newContext();
        let cPage = await bCont.newPage();
        let a_marketingPage = new A_MarketingPage(cPage);
        await a_marketingPage.beginEstimate();
        let r_estimator = new R_PaymentEstimator(cPage);

        try {
          await r_estimator.happyPathEstimate('3044', PaymentFrequency.SemiMonthly);
          isSemiMonthlyPass = true;
          await cPage.evaluate(_ => {
          }, `browserstack_executor: ${JSON.stringify({
            action: 'setSessionStatus',
            arguments: {status: 'passed', reason: 'semimonthly'}
          })}`);
        } catch (Error) {
          attempts++;
          await cPage.evaluate(_ => {
          }, `browserstack_executor: ${JSON.stringify({
            action: 'setSessionStatus',
            arguments: {status: 'failed', reason: Error.toString()}
          })}`);
        } finally {
          await cPage.close();
          await bCont.close();
        }
      }
    }
  });

  test('estimator : monthly', { tag: ['@cricket', '@approveme', '@happypath', '@estimate'] }, async ({browser}) => {
    const ATTEMPTS_MAX: number = 2;
    let attempts: number = 1;
    let isMonthlyPass = false;
    while((attempts <= ATTEMPTS_MAX) && (isMonthlyPass===false)) {
      if (isLandingPageLoads) {

        let bCont = await browser.newContext();
        let cPage = await bCont.newPage();
        let a_marketingPage = new A_MarketingPage(cPage);
        await a_marketingPage.beginEstimate();
        let r_estimator = new R_PaymentEstimator(cPage);

        try {
          await r_estimator.happyPathEstimate('3099', PaymentFrequency.Monthly);
          isMonthlyPass = true;
          await cPage.evaluate(_ => {
          }, `browserstack_executor: ${JSON.stringify({
            action: 'setSessionStatus',
            arguments: {status: 'passed', reason: 'monthly'}
          })}`);
        } catch (Error) {
          attempts++;
          await cPage.evaluate(_ => {
          }, `browserstack_executor: ${JSON.stringify({
            action: 'setSessionStatus',
            arguments: {status: 'failed', reason: Error.toString()}
          })}`);
        } finally {
          await cPage.close();
          await bCont.close();
        }
      }
    }
  });

  test('links check : photoId', { tag: ['@approveme', '@cricketwireless', '@linkscheck'] },async ({browser}) => {
    const ATTEMPTS_MAX: number = 2;
    let attempts: number = 1;
    let isLinksPhotoPass = false;
    while((attempts <= ATTEMPTS_MAX) && (isLinksPhotoPass===false)) {
      if (isLandingPageLoads) {
        console.log('continue with links check tests...');
        let bCont: BrowserContext = await browser.newContext();
        let cPage: Page = await bCont.newPage();
        let splashPageLocal: B_SplashPage = new B_SplashPage(cPage);
        await splashPageLocal.navigate();

        try {
          await splashPageLocal.checkLinkPhoto();
          isLinksPhotoPass = true;
          await cPage.evaluate(_ => {
          }, `browserstack_executor: ${JSON.stringify({
            action: 'setSessionStatus',
            arguments: {status: 'passed', reason: 'photoId'}
          })}`);
        } catch (Error) {
          attempts++;
          await cPage.evaluate(_ => {
          }, `browserstack_executor: ${JSON.stringify({
            action: 'setSessionStatus',
            arguments: {status: 'failed', reason: Error.toString()}
          })}`);
        } finally {
          await cPage.close();
          await bCont.close();
        }
      }
    }
  });

  test('links check : bankInfo', { tag: ['@approveme', '@cricketwireless', '@linkscheck'] },async ({browser}) => {
    const ATTEMPTS_MAX: number = 2;
    let attempts: number = 1;
    let isLinksBankInfoPass = false;
    while((attempts <= ATTEMPTS_MAX) && (isLinksBankInfoPass===false)) {
      if (isLandingPageLoads) {

        let bCont: BrowserContext = await browser.newContext();
        let cPage: Page = await bCont.newPage();
        let splashPageLocal: B_SplashPage = new B_SplashPage(cPage);
        await splashPageLocal.navigate();

        try {
          await splashPageLocal.checkLinkBankInfo();
          isLinksBankInfoPass = true;
          await cPage.evaluate(_ => {
          }, `browserstack_executor: ${JSON.stringify({
            action: 'setSessionStatus',
            arguments: {status: 'passed', reason: 'bankInfo'}
          })}`);
        } catch (Error) {
          attempts++;
          await cPage.evaluate(_ => {
          }, `browserstack_executor: ${JSON.stringify({
            action: 'setSessionStatus',
            arguments: {status: 'failed', reason: Error.toString()}
          })}`);
        } finally {
          await cPage.close();
          await bCont.close();
        }
      }
    }
  });

  test('links check : checkbox', { tag: ['@approveme', '@cricketwireless', '@linkscheck'] },async ({browser}) => {
    const ATTEMPTS_MAX: number = 2;
    let attempts: number = 1;
    let isLinksCheckboxPass = false;
    while((attempts <= ATTEMPTS_MAX) && (isLinksCheckboxPass===false)) {
      if (isLandingPageLoads) {

        let bCont: BrowserContext = await browser.newContext();
        let cPage: Page = await bCont.newPage();
        let splashPageLocal: B_SplashPage = new B_SplashPage(cPage);
        await splashPageLocal.navigate();

        try {
          await splashPageLocal.selectCheckbox();
          await splashPageLocal.unSelectCheckbox();
          isLinksCheckboxPass = true;
          await cPage.evaluate(_ => {
          }, `browserstack_executor: ${JSON.stringify({
            action: 'setSessionStatus',
            arguments: {status: 'passed', reason: 'checkbox'}
          })}`);
        } catch (Error) {
          attempts++;
          await cPage.evaluate(_ => {
          }, `browserstack_executor: ${JSON.stringify({
            action: 'setSessionStatus',
            arguments: {status: 'failed', reason: Error.toString()}
          })}`);
        } finally {
          await cPage.close();
          await bCont.close();
        }
      }
    }
  });

  test('links check : terms', { tag: ['@approveme', '@cricketwireless', '@linkscheck'] },async ({browser}) => {
    const ATTEMPTS_MAX: number = 2;
    let attempts: number = 1;
    let isLinksTermsPass = false;
    while((attempts <= ATTEMPTS_MAX) && (isLinksTermsPass===false)) {
      if (isLandingPageLoads) {

        let bCont: BrowserContext = await browser.newContext();
        let cPage: Page = await bCont.newPage();
        let splashPageLocal: B_SplashPage = new B_SplashPage(cPage);
        await splashPageLocal.navigate();

        try {
          await splashPageLocal.checkLinkTerms();
          isLinksTermsPass = true;
          await cPage.evaluate(_ => {
          }, `browserstack_executor: ${JSON.stringify({
            action: 'setSessionStatus',
            arguments: {status: 'passed', reason: 'terms'}
          })}`);
        } catch (Error) {
          attempts++;
          await cPage.evaluate(_ => {
          }, `browserstack_executor: ${JSON.stringify({
            action: 'setSessionStatus',
            arguments: {status: 'failed', reason: Error.toString()}
          })}`);
        } finally {
          await cPage.close();
          await bCont.close();
        }
      }
    }
  });

  test('links check : privacy', { tag: ['@approveme', '@cricketwireless', '@linkscheck'] },async ({browser}) => {
    const ATTEMPTS_MAX: number = 2;
    let attempts: number = 1;
    let isLinksPrivacyPass = false;
    while((attempts <= ATTEMPTS_MAX) && (isLinksPrivacyPass===false)) {
      if (isLandingPageLoads) {

        let bCont: BrowserContext = await browser.newContext();
        let cPage: Page = await bCont.newPage();
        let splashPageLocal: B_SplashPage = new B_SplashPage(cPage);
        await splashPageLocal.navigate();

        try {
          await splashPageLocal.checkLinkPrivacy();
          isLinksPrivacyPass = true;
          await cPage.evaluate(_ => {
          }, `browserstack_executor: ${JSON.stringify({
            action: 'setSessionStatus',
            arguments: {status: 'passed', reason: 'privacy'}
          })}`);
        } catch (Error) {
          attempts++;
          await cPage.evaluate(_ => {
          }, `browserstack_executor: ${JSON.stringify({
            action: 'setSessionStatus',
            arguments: {status: 'failed', reason: Error.toString()}
          })}`);
        } finally {
          await cPage.close();
          await bCont.close();
        }
      }
    }
  });

  test('links check : disclosure', { tag: ['@approveme', '@cricketwireless', '@linkscheck'] },async ({browser}) => {
    const ATTEMPTS_MAX: number = 2;
    let attempts: number = 1;
    let isLinksDisclosurePass = false;
    while((attempts <= ATTEMPTS_MAX) && (isLinksDisclosurePass===false)) {
      if (isLandingPageLoads) {

        let bCont: BrowserContext = await browser.newContext();
        let cPage: Page = await bCont.newPage();
        let splashPageLocal: B_SplashPage = new B_SplashPage(cPage);
        await splashPageLocal.navigate();

        try {
          await splashPageLocal.checkLinkDisclosure();
          isLinksDisclosurePass = true;
          await cPage.evaluate(_ => {
          }, `browserstack_executor: ${JSON.stringify({
            action: 'setSessionStatus',
            arguments: {status: 'passed', reason: 'privacy'}
          })}`);
        } catch (Error) {
          attempts++;
          await cPage.evaluate(_ => {
          }, `browserstack_executor: ${JSON.stringify({
            action: 'setSessionStatus',
            arguments: {status: 'failed', reason: Error.toString()}
          })}`);
        } finally {
          await cPage.close();
          await bCont.close();
        }
      }
    }
  });

  test('links check : arbitration', { tag: ['@approveme', '@cricketwireless', '@linkscheck'] },async ({browser}) => {
    const ATTEMPTS_MAX: number = 2;
    let attempts: number = 1;
    let isLinksArbitrationPass = false;
    while((attempts <= ATTEMPTS_MAX) && (isLinksArbitrationPass===false)) {
      if (isLandingPageLoads) {

        let bCont: BrowserContext = await browser.newContext();
        let cPage: Page = await bCont.newPage();
        let splashPageLocal: B_SplashPage = new B_SplashPage(cPage);
        await splashPageLocal.navigate();

        try {
          await splashPageLocal.checkLinkArbitration();
          isLinksArbitrationPass = true;
          await cPage.evaluate(_ => {
          }, `browserstack_executor: ${JSON.stringify({
            action: 'setSessionStatus',
            arguments: {status: 'passed', reason: 'privacy'}
          })}`);
        } catch (Error) {
          attempts++;
          await cPage.evaluate(_ => {
          }, `browserstack_executor: ${JSON.stringify({
            action: 'setSessionStatus',
            arguments: {status: 'failed', reason: Error.toString()}
          })}`);
        } finally {
          await cPage.close();
          await bCont.close();
        }
      }
    }
  });
});