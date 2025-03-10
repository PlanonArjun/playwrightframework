import {BrowserContext, expect, Page, test} from '@playwright/test';
import A_MarketingPage from "../../pages/cricket.approveme/A_MarketingPage";
import B_SplashPage from "../../pages/cricket.approveme/B_SplashPage";
import C_StartAppPage from "../../pages/cricket.approveme/C_StartAppPage";
import D_AboutYou1Page from "../../pages/cricket.approveme/D_AboutYou1Page";
import E_AboutYou2Page from "../../pages/cricket.approveme/E_AboutYou2Page";
import F_IncomeInfoPage from '$pages/cricket.approveme/F_IncomeInfoPage';
import G_BankAcctInfoPage from '$pages/cricket.approveme/G_BankAcctInfoPage';
import H_DirDepPage from '$pages/cricket.approveme/H_DirectDepositPage';
import I_PaymentCardPage from '$pages/cricket.approveme/I_PaymentCardPage';
import J_ReviewAndSubmitPage from '$pages/cricket.approveme/J_ReviewAndSubmitPage';
import K_ResultsPage from "$pages/cricket.approveme/K_ResultsPage";
import L_ResumeApplication from '$pages/cricket.approveme/L_ResumeApplication';
import M_PaymentEstimator from '$pages/cricket.approveme/M_PaymentEstimator';
import HappyPathApproved from "../../data/cricket.approveme/HappyPathApproved"; // data object
import HappyPathPending from "../../data/cricket.approveme/HappyPathPending";
import HappyPathDenied from "../../data/cricket.approveme/HappyPathDenied";
import {PaymentFrequency} from "../../data/paymentFrequency";

let isLandingPageLoads: boolean = false;

test.describe('Cricket Big Six', async () => {

  test.describe.configure({ mode: 'serial' }); // do not change

  let getStartAppData: string[];
  let nameFirstFetched:string;
  let nameLastFetched:string;
  let ssnFetched:string;

  let bankInfo1Data: string[];
  let routing:string;
  let checking:string;
  let yearsOpen:string;
  let monthsOpen:string;

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
      console.log('\n');

      await c_startAppPage.happyPathPopulate(getStartAppData);

      let d_aboutYou1Page = new D_AboutYou1Page(cPage);
      await d_aboutYou1Page.happyPathPopulate(happyPathApproved.getAboutYou1);

      let e_aboutYou2Page = new E_AboutYou2Page(cPage);
      await e_aboutYou2Page.happyPathPopulate(happyPathApproved.getAboutYou2);

      let f_incomeInfoPage: F_IncomeInfoPage = new F_IncomeInfoPage(cPage);
      await f_incomeInfoPage.happyPathPopulate(happyPathApproved.getIncomeInfo);

      let g_bankAcctInfoPage: G_BankAcctInfoPage = new G_BankAcctInfoPage(cPage);

      bankInfo1Data = happyPathApproved.getBankInfo1;
      routing = bankInfo1Data[0];
      checking = bankInfo1Data[1];
      yearsOpen = bankInfo1Data[2];
      monthsOpen = bankInfo1Data[3];

      for(let value in bankInfo1Data) { // optional, helpful
        console.log(bankInfo1Data[value] + "\t");
      }

      await g_bankAcctInfoPage.happyPathPopulate(bankInfo1Data);

      await (new H_DirDepPage(cPage,true)).happyPathGo();

      await (new I_PaymentCardPage(cPage).enterCardNumberFirstSix(happyPathApproved.getPaymentCardFirstSix));

      await (new J_ReviewAndSubmitPage(cPage)).happyPathGo();

      try {
        await (new K_ResultsPage(cPage)).verifyApproved();
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

        let resumePage: L_ResumeApplication = new L_ResumeApplication(cPageR);
        await resumePage.happyPathPopulate([nameFirstFetched,nameLastFetched],ssnFetched);

        try {
          await (new K_ResultsPage(cPageR)).verifyApproved();
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
        console.log('\n');

        await c_startAppPage.happyPathPopulate(getStartAppData);

        let d_aboutYou1Page = new D_AboutYou1Page(cPage);
        await d_aboutYou1Page.happyPathPopulate(happyPathApproved.getAboutYou1);

        let e_aboutYou2Page = new E_AboutYou2Page(cPage);
        await e_aboutYou2Page.happyPathPopulate(happyPathApproved.getAboutYou2);

        let f_incomeInfoPage: F_IncomeInfoPage = new F_IncomeInfoPage(cPage);
        await f_incomeInfoPage.happyPathPopulate(happyPathApproved.getIncomeInfo);

        let g_bankAcctInfoPage: G_BankAcctInfoPage = new G_BankAcctInfoPage(cPage);

        bankInfo1Data = happyPathApproved.getBankInfo1;
        routing = bankInfo1Data[0];
        checking = bankInfo1Data[1];
        yearsOpen = bankInfo1Data[2];
        monthsOpen = bankInfo1Data[3];

        for(let value in bankInfo1Data) { // optional, helpful
          console.log(bankInfo1Data[value] + "\t");
        }

        await g_bankAcctInfoPage.happyPathPopulate(bankInfo1Data);

        await (new H_DirDepPage(cPage,true)).happyPathGo();

        await (new I_PaymentCardPage(cPage).enterCardNumberFirstSix(happyPathApproved.getPaymentCardFirstSix));

        await (new J_ReviewAndSubmitPage(cPage)).happyPathGo();

        try {
          await (new K_ResultsPage(cPage)).verifyApproved();
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

          let f_incomeInfoPage: F_IncomeInfoPage = new F_IncomeInfoPage(cPage);
          await f_incomeInfoPage.happyPathPopulate(happyPathPending.getIncomeInfo);

          let g_bankAcctInfoPage: G_BankAcctInfoPage = new G_BankAcctInfoPage(cPage);

          bankInfo1Data = happyPathPending.getBankInfo1;
          routing = bankInfo1Data[0];
          checking = bankInfo1Data[1];
          yearsOpen = bankInfo1Data[2];
          monthsOpen = bankInfo1Data[3];

          for(let value in bankInfo1Data) { // optional, helpful
            console.log(bankInfo1Data[value] + "\t");
          }

          await g_bankAcctInfoPage.happyPathPopulate(bankInfo1Data);

          await (new H_DirDepPage(cPage,true)).happyPathGo();

          await (new I_PaymentCardPage(cPage).enterCardNumberFirstSix(happyPathPending.getPaymentCardFirstSix));

          await (new J_ReviewAndSubmitPage(cPage)).happyPathGo();

          try {
            await (new K_ResultsPage(cPage)).verifyPending();
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
          nameFirstFetched  = getStartAppData[0];
          nameLastFetched   = getStartAppData[1];
          ssnFetched        = getStartAppData[3]; // ssn is 3

          for(let value in getStartAppData) { // optional, helpful
            console.log(getStartAppData[value] + "\t");
          }
          console.log('\n');

          await c_startAppPage.happyPathPopulate(getStartAppData);

          let d_aboutYou1Page = new D_AboutYou1Page(cPage);
          await d_aboutYou1Page.happyPathPopulate(happyPathDenied.getAboutYou1);

          let e_aboutYou2Page = new E_AboutYou2Page(cPage);
          await e_aboutYou2Page.happyPathPopulate(happyPathDenied.getAboutYou2);

          let f_incomeInfoPage: F_IncomeInfoPage = new F_IncomeInfoPage(cPage);
          await f_incomeInfoPage.happyPathPopulate(happyPathDenied.getIncomeInfo);

          let g_bankAcctInfoPage: G_BankAcctInfoPage = new G_BankAcctInfoPage(cPage);

          bankInfo1Data = happyPathDenied.getBankInfo1;
          routing = bankInfo1Data[0];
          checking = bankInfo1Data[1];
          yearsOpen = bankInfo1Data[2];
          monthsOpen = bankInfo1Data[3];

          for(let value in bankInfo1Data) { // optional, helpful
            console.log(bankInfo1Data[value] + "\t");
          }

          await g_bankAcctInfoPage.happyPathPopulate(bankInfo1Data);

          await (new H_DirDepPage(cPage,true)).happyPathGo();

          await (new I_PaymentCardPage(cPage).enterCardNumberFirstSix(happyPathDenied.getPaymentCardFirstSix));

          await (new J_ReviewAndSubmitPage(cPage)).happyPathGo();

          let p_results: K_ResultsPage = new K_ResultsPage(cPage);
          try {
            await (new K_ResultsPage(cPage)).verifyDenied();
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
        let m_PaymentEstimator: M_PaymentEstimator = new M_PaymentEstimator(cPage);

        try {
          await m_PaymentEstimator.happyPathEstimate('3001', PaymentFrequency.Weekly);
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
        let m_PaymentEstimator: M_PaymentEstimator = new M_PaymentEstimator(cPage);

        try {
          await m_PaymentEstimator.happyPathEstimate('3022', PaymentFrequency.BiWeekly);
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
        let m_PaymentEstimator: M_PaymentEstimator = new M_PaymentEstimator(cPage);

        try {
          await m_PaymentEstimator.happyPathEstimate('3044', PaymentFrequency.SemiMonthly);
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
        let m_PaymentEstimator: M_PaymentEstimator = new M_PaymentEstimator(cPage);

        try {
          await m_PaymentEstimator.happyPathEstimate('3099', PaymentFrequency.Monthly);
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