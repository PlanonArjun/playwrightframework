import { BrowserContext, chromium, expect, Page, test } from '@playwright/test';
import A_MarketingPage from "../../pages/cricket.approveme/A_MarketingPage";
import B_SplashPage from "../../pages/cricket.approveme/B_SplashPage";
import C_StartAppPage from "../../pages/cricket.approveme/C_StartAppPage";
import D_AboutYou1EmailPhonePage from "$pages/cricket.approveme/D_AboutYou1EmailPhonePage";
import E_AboutYou2HomeAddressPage from "$pages/cricket.approveme/E_AboutYou2HomeAddressPage";
import K_IncomeInfoPage from '$pages/cricket.approveme/K_IncomeInfoPage';
import L_BankAcctInfoPage from '$pages/cricket.approveme/L_BankAcctInfoPage';
import H_DirDepPage from '$pages/cricket.approveme/M_DirectDepositPage';
import N_PaymentCardPage from '$pages/cricket.approveme/N_PaymentCardPage';
import J_ReviewAndSubmitPage from '$pages/cricket.approveme/O_ConfirmAndSubmitPage';
import P_ResultsPage from "$pages/cricket.approveme/P_ResultsPage";
import ResumeApplication from '$pages/cricket.approveme/ResumeApplication';
import PaymentEstimator from '$pages/cricket.approveme/PaymentEstimator';
import HappyPathApproved from "../../data/cricket.approveme/HappyPathApproved"; // data object
import HappyPathPending from "../../data/cricket.approveme/HappyPathPending";
import HappyPathDenied from "../../data/cricket.approveme/HappyPathDenied";
import {PaymentFrequency} from "../../data/paymentFrequency";
import CricketHealthCheck from './CricketHealthCheck';
import F_AboutYou3RentOwnPage from '$pages/cricket.approveme/F_AboutYou3RentOwnPage';
import G_AboutYou4IDTypePage from '$pages/cricket.approveme/G_AboutYou4IDTypePage';
import H_IncomeSourcePage from '$pages/cricket.approveme/H_IncomeSourcePage';
import I_EmployerInfoPage from '$pages/cricket.approveme/I_EmployerInfoPage';
import J_EmploymentHistoryPage from '$pages/cricket.approveme/J_EmploymentHistoryPage';
import { IncomeFrequency } from '$utils/IncomeFrequency';
import M_DirectDepositPage from '$pages/cricket.approveme/M_DirectDepositPage';
import O_ConfirmAndSubmitPage from '$pages/cricket.approveme/O_ConfirmAndSubmitPage';
import { IncomeSource } from '$utils/IncomeSource';

test.describe('Cricket Big Six', async () => {

  test.describe.configure({ retries: 0 }); // do not change
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

  let isHealthyLocal: Boolean;
  let isApplyPass: boolean = false;
  let isResumePass: boolean = false;

  test.beforeAll(async () => {
    let browserTemp = await chromium.launch({ headless: true });
    let pageTemp = await browserTemp.newPage();
    isHealthyLocal = await new CricketHealthCheck(pageTemp).isHealthy();
    await browserTemp.close();
    await pageTemp.close();
  });

  test('approve before resume', { tag: ['@approveme', '@cricketwireless', '@happy'] },async ({browser}) => {
    test.skip(isHealthyLocal == false, 'health check FAILED; test.skip()');
    await expect(async () => {

      let bCont = await browser.newContext();
      let cPage = await bCont.newPage();

      await (new B_SplashPage(cPage)).continue();

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

      let d_aboutYou1Page = new D_AboutYou1EmailPhonePage(cPage);
      await d_aboutYou1Page.happyPathPopulate(happyPathApproved.getAboutYou1);

      let e_aboutYou2Page = new E_AboutYou2HomeAddressPage(cPage);
      await e_aboutYou2Page.happyPathPopulate(happyPathApproved.getAboutYou2);

      /*
      They move this rent-own frame in and out of the flow from time to time...
       */
      await (new F_AboutYou3RentOwnPage(cPage)).setIsOwn(true);

      let g_bankAcctInfoPage: L_BankAcctInfoPage = new L_BankAcctInfoPage(cPage);

      bankInfo1Data = happyPathApproved.getBankInfo1;
      routing = bankInfo1Data[0];
      checking = bankInfo1Data[1];
      yearsOpen = bankInfo1Data[2];
      monthsOpen = bankInfo1Data[3];

      for(let value in bankInfo1Data) { // optional, helpful
        console.log(bankInfo1Data[value] + "\t");
      }

      await (new G_AboutYou4IDTypePage(cPage)).doHappyPathWithPassport(); // ID type, ID number, State (if applicable)

      await (new H_IncomeSourcePage(cPage)).doHappyPathFullTime();

      await (new I_EmployerInfoPage(cPage)).doHappyPath(happyPathApproved.getEmployerContactInfo); // employer name, phone, zip

      await (new J_EmploymentHistoryPage(cPage)).doHappyPath(happyPathApproved.getEmploymentHistory); // employedYears employedMonths monthlyIncome

      await (new K_IncomeInfoPage(cPage)).doHappyPath(IncomeFrequency.MONTHLY, happyPathApproved.getLastPayDate, happyPathApproved.getNextPayDate); // how often paid [weekly biweekly semimontly montly]; last and next paydays

      await (new L_BankAcctInfoPage(cPage)).happyPathPopulate(happyPathApproved.getPaymentAccountInfo); // routing checking yearsOpen monthsOpen

      await (new M_DirectDepositPage(cPage, true)).happyPathGo();

      await (new N_PaymentCardPage(cPage).enterCardNumberFirstSix(happyPathApproved.getPaymentCardFirstSix));

      await (new O_ConfirmAndSubmitPage(cPage)).happyPathGo();

      try {
        await (new P_ResultsPage(cPage)).verifyApproved();
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
    test.skip(isHealthyLocal == false, 'health check FAILED; test.skip()');
    if(!isApplyPass) {
      console.log("Initial apply failed. Resume skipped.");
    }
    test.skip(isApplyPass == false);

    await expect(async () => {

      let bContR = await browser.newContext();
      let cPageR = await bContR.newPage();

      let marketingPageR = new A_MarketingPage(cPageR);
      await marketingPageR.navigate();
      await marketingPageR.beginResume();

      let resumePage: ResumeApplication = new ResumeApplication(cPageR);
      await resumePage.happyPathPopulate([nameFirstFetched,nameLastFetched],ssnFetched);

      try {
        await (new P_ResultsPage(cPageR)).verifyApproved();
        console.log("apply-resume back-to-back passed...")
        isResumePass = true;
        await cPageR.evaluate(_ => {}, `browserstack_executor: ${JSON.stringify({action: 'setSessionStatus',arguments: {status: 'passed',reason:'resume'}})}`);
      }catch(Error) {
        await cPageR.evaluate(_ => {}, `browserstack_executor: ${JSON.stringify({action: 'setSessionStatus',arguments: {status: 'failed',reason: Error.toString()}})}`);
      }finally{
        await cPageR.close();
        await bContR.close();
      }
    }).toPass({timeout: 90000});
  });

  test('separate approved', { tag: ['@approveme', '@cricketwireless', '@happy', '@approved'] },async ({browser}) => {
    test.skip(isHealthyLocal == false, 'health check FAILED; test.skip()');
    if(isResumePass) {
      console.log('separate approved skipped on purpose, not needed');
      test.skip(isResumePass);
    }

    await expect(async () => {

      let bCont = await browser.newContext();
      let cPage = await bCont.newPage();

      await (new B_SplashPage(cPage)).continue();

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

      let d_aboutYou1Page = new D_AboutYou1EmailPhonePage(cPage);
      await d_aboutYou1Page.happyPathPopulate(happyPathApproved.getAboutYou1);

      let e_aboutYou2Page = new E_AboutYou2HomeAddressPage(cPage);
      await e_aboutYou2Page.happyPathPopulate(happyPathApproved.getAboutYou2);

      /*
      They move this rent-own frame in and out of the flow from time to time...
       */
      await (new F_AboutYou3RentOwnPage(cPage)).setIsOwn(true);

      await (new G_AboutYou4IDTypePage(cPage)).doHappyPathWithPassport(); // ID type, ID number, State (if applicable)

      bankInfo1Data = happyPathApproved.getBankInfo1;
      routing = bankInfo1Data[0];
      checking = bankInfo1Data[1];
      yearsOpen = bankInfo1Data[2];
      monthsOpen = bankInfo1Data[3];

      for(let value in bankInfo1Data) { // optional, helpful
        console.log(bankInfo1Data[value] + "\t");
      }

      await (new H_IncomeSourcePage(cPage)).doHappyPathFullTime();

      await (new I_EmployerInfoPage(cPage)).doHappyPath(happyPathApproved.getEmployerContactInfo); // employer name, phone, zip

      await (new J_EmploymentHistoryPage(cPage)).doHappyPath(happyPathApproved.getEmploymentHistory); // employedYears employedMonths monthlyIncome

      await (new K_IncomeInfoPage(cPage)).doHappyPath(IncomeFrequency.MONTHLY, happyPathApproved.getLastPayDate, happyPathApproved.getNextPayDate); // how often paid [weekly biweekly semimontly montly]; last and next paydays

      await (new L_BankAcctInfoPage(cPage)).happyPathPopulate(happyPathApproved.getPaymentAccountInfo); // routing checking yearsOpen monthsOpen

      await (new M_DirectDepositPage(cPage, true)).happyPathGo();

      await (new N_PaymentCardPage(cPage).enterCardNumberFirstSix(happyPathApproved.getPaymentCardFirstSix));

      await (new O_ConfirmAndSubmitPage(cPage)).happyPathGo();

      try {
        await (new P_ResultsPage(cPage)).verifyApproved();
        isApplyPass = true;
        console.log("Cricket separate approved passed...");
        await cPage.evaluate(_ => {}, `browserstack_executor: ${JSON.stringify({action: 'setSessionStatus',arguments: {status: 'passed',reason:'cricket separate approved'}})}`);
      }catch(Error) {
        await cPage.evaluate(_ => {}, `browserstack_executor: ${JSON.stringify({action: 'setSessionStatus',arguments: {status: 'failed',reason: Error.toString()}})}`);
      }finally{
        await cPage.close();
        await bCont.close();
      }
    }).toPass({timeout: 120000});
  });

  test('pending', { tag: ['@approveme', '@cricketwireless', '@happy', '@pending'] },async ({browser}) => {
    test.skip(isHealthyLocal == false, 'health check FAILED; test.skip()');
    test.skip(isApplyPass = false);
    console.log('begin pending...');

    await expect(async () => {

      let bCont = await browser.newContext();
      let cPage = await bCont.newPage();

      await (new B_SplashPage(cPage)).continue();

      let pendingDataset = new HappyPathPending();

      let c_startAppPage = new C_StartAppPage(cPage);

      getStartAppData = pendingDataset.getStartAppData;
      nameFirstFetched  = getStartAppData[0];
      nameLastFetched   = getStartAppData[1];
      ssnFetched        = getStartAppData[3]; // ssn is 3

      for(let value in getStartAppData) { // optional, helpful
        console.log(getStartAppData[value] + "\t");
      }
      console.log('\n');

      await c_startAppPage.happyPathPopulate(getStartAppData);

      let d_aboutYou1Page = new D_AboutYou1EmailPhonePage(cPage);
      await d_aboutYou1Page.happyPathPopulate(pendingDataset.getAboutYou1);

      let e_aboutYou2Page = new E_AboutYou2HomeAddressPage(cPage);
      await e_aboutYou2Page.happyPathPopulate(pendingDataset.getAboutYou2);

      /*
      They move this rent-own frame in and out of the flow from time to time...
       */
      await (new F_AboutYou3RentOwnPage(cPage)).setIsOwn(true);

      await (new G_AboutYou4IDTypePage(cPage)).doHappyPathWithPassport(); // ID type, ID number, State (if applicable)

      bankInfo1Data = pendingDataset.getBankInfo1;
      routing = bankInfo1Data[0];
      checking = bankInfo1Data[1];
      yearsOpen = bankInfo1Data[2];
      monthsOpen = bankInfo1Data[3];

      for(let value in bankInfo1Data) { // optional, helpful
        console.log(bankInfo1Data[value] + "\t");
      }

      await (new H_IncomeSourcePage(cPage)).doHappyPathSpecified(IncomeSource.FULL_TIME); // IncomeSource.ts enum

      await (new I_EmployerInfoPage(cPage)).doHappyPath(pendingDataset.getEmployerContactInfo); // employer name, phone, zip

      await (new J_EmploymentHistoryPage(cPage)).doHappyPath(pendingDataset.getEmploymentHistory); // employedYears employedMonths monthlyIncome

      await (new K_IncomeInfoPage(cPage)).doHappyPath(IncomeFrequency.MONTHLY, pendingDataset.getLastPayDate, pendingDataset.getNextPayDate); // how often paid [weekly biweekly semimontly montly]; last and next paydays

      await (new L_BankAcctInfoPage(cPage)).happyPathPopulate(pendingDataset.getPaymentAccountInfo); // routing checking yearsOpen monthsOpen

      await (new M_DirectDepositPage(cPage, true)).happyPathGo();

      await (new N_PaymentCardPage(cPage)).enterCardNumberFirstSix('411111');

      await (new O_ConfirmAndSubmitPage(cPage)).happyPathGo();

      try {
        await (new P_ResultsPage(cPage)).verifyPending();
        console.log("Cricket pending passed...");
        await cPage.evaluate(_ => {
        }, `browserstack_executor: ${JSON.stringify({
          action: 'setSessionStatus',
          arguments: {status: 'passed', reason: 'cricket pending'}
        })}`);
        console.log("Cricket pending passed...");
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

  test('denied', { tag: ['@approveme', '@cricketwireless', '@happy', '@denied'] },async ({browser}) => {
    test.skip(isHealthyLocal == false, 'health check FAILED; test.skip()');
    test.skip(isApplyPass = false);
    console.log('begin denied...');

    await expect(async () => {

      let bCont = await browser.newContext();
      let cPage = await bCont.newPage();

      await (new B_SplashPage(cPage)).continue();

      let deniedDataset = new HappyPathDenied();

      let c_startAppPage = new C_StartAppPage(cPage);

      getStartAppData = deniedDataset.getStartAppData;
      nameFirstFetched  = getStartAppData[0];
      nameLastFetched   = getStartAppData[1];
      ssnFetched        = getStartAppData[3]; // ssn is 3

      for(let value in getStartAppData) { // optional, helpful
        console.log(getStartAppData[value] + "\t");
      }
      console.log('\n');

      await c_startAppPage.happyPathPopulate(getStartAppData);

      let d_aboutYou1Page = new D_AboutYou1EmailPhonePage(cPage);
      await d_aboutYou1Page.happyPathPopulate(deniedDataset.getAboutYou1);

      let e_aboutYou2Page = new E_AboutYou2HomeAddressPage(cPage);
      await e_aboutYou2Page.happyPathPopulate(deniedDataset.getAboutYou2);

      /*
      They move this rent-own frame in and out of the flow from time to time...
       */
      await (new F_AboutYou3RentOwnPage(cPage)).setIsOwn(true);

      await (new G_AboutYou4IDTypePage(cPage)).doHappyPathWithPassport(); // ID type, ID number, State (if applicable)

      bankInfo1Data = deniedDataset.getBankInfo1;
      routing = bankInfo1Data[0];
      checking = bankInfo1Data[1];
      yearsOpen = bankInfo1Data[2];
      monthsOpen = bankInfo1Data[3];

      for(let value in bankInfo1Data) { // optional, helpful
        console.log(bankInfo1Data[value] + "\t");
      }

      await (new H_IncomeSourcePage(cPage)).doHappyPathSpecified(IncomeSource.FULL_TIME); // IncomeSource.ts enum

      await (new I_EmployerInfoPage(cPage)).doHappyPath(deniedDataset.getEmployerContactInfo); // employer name, phone, zip

      await (new J_EmploymentHistoryPage(cPage)).doHappyPath(deniedDataset.getEmploymentHistory); // employedYears employedMonths monthlyIncome

      await (new K_IncomeInfoPage(cPage)).doHappyPath(IncomeFrequency.MONTHLY, deniedDataset.getLastPayDate, deniedDataset.getNextPayDate);

      await (new L_BankAcctInfoPage(cPage)).happyPathPopulate(deniedDataset.getPaymentAccountInfo); // routing checking yearsOpen monthsOpen

      await (new M_DirectDepositPage(cPage, true)).happyPathGo();

      await (new N_PaymentCardPage(cPage)).enterCardNumberFirstSix('411111');

      await (new O_ConfirmAndSubmitPage(cPage)).happyPathGo();

      try {
        await (new P_ResultsPage(cPage)).verifyDenied();
        await cPage.evaluate(_ => {
        }, `browserstack_executor: ${JSON.stringify({
          action: 'setSessionStatus',
          arguments: {status: 'passed', reason: 'cricket denied'}
        })}`);
        console.log("Cricket denied passed...");
        return;
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

  test('estimator : weekly', { tag: ['@cricket', '@approveme', '@happypath', '@estimate'] }, async ({browser}) => {
    test.skip(isHealthyLocal == false, 'health check FAILED; test.skip()');
    console.log('begin estimator tests...');
    let bCont = await browser.newContext();
    let cPage = await bCont.newPage();
    let a_marketingPage = new A_MarketingPage(cPage);
    await a_marketingPage.beginEstimate();
    let m_PaymentEstimator: PaymentEstimator = new PaymentEstimator(cPage);

    try {
      await m_PaymentEstimator.happyPathEstimate('3001', PaymentFrequency.Weekly);
      await cPage.evaluate(_ => {
      }, `browserstack_executor: ${JSON.stringify({
        action: 'setSessionStatus',
        arguments: {status: 'passed', reason: 'weekly'}
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
  });

  test('estimator : biweekly', { tag: ['@cricket', '@approveme', '@happypath', '@estimate'] }, async ({browser}) => {
    test.skip(isHealthyLocal == false, 'health check FAILED; test.skip()');
    let bCont = await browser.newContext();
    let cPage = await bCont.newPage();
    let a_marketingPage = new A_MarketingPage(cPage);
    await a_marketingPage.beginEstimate();
    let m_PaymentEstimator: PaymentEstimator = new PaymentEstimator(cPage);

    try {
      await m_PaymentEstimator.happyPathEstimate('3022', PaymentFrequency.BiWeekly);
      await cPage.evaluate(_ => {
      }, `browserstack_executor: ${JSON.stringify({
        action: 'setSessionStatus',
        arguments: {status: 'passed', reason: 'biweekly'}
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
  });

  test('estimator : semimonthly', { tag: ['@cricket', '@approveme', '@happypath', '@estimate'] }, async ({browser}) => {
    test.skip(isHealthyLocal == false, 'health check FAILED; test.skip()');
    let bCont = await browser.newContext();
    let cPage = await bCont.newPage();
    let a_marketingPage = new A_MarketingPage(cPage);
    await a_marketingPage.beginEstimate();
    let m_PaymentEstimator: PaymentEstimator = new PaymentEstimator(cPage);

    try {
      await m_PaymentEstimator.happyPathEstimate('3044', PaymentFrequency.SemiMonthly);
      await cPage.evaluate(_ => {
      }, `browserstack_executor: ${JSON.stringify({
        action: 'setSessionStatus',
        arguments: {status: 'passed', reason: 'semimonthly'}
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
  });

  test('estimator : monthly', { tag: ['@cricket', '@approveme', '@happypath', '@estimate'] }, async ({browser}) => {
    test.skip(isHealthyLocal == false, 'health check FAILED; test.skip()');
    let bCont = await browser.newContext();
    let cPage = await bCont.newPage();
    let a_marketingPage = new A_MarketingPage(cPage);
    await a_marketingPage.beginEstimate();
    let m_PaymentEstimator: PaymentEstimator = new PaymentEstimator(cPage);

    try {
      await m_PaymentEstimator.happyPathEstimate('3099', PaymentFrequency.Monthly);
      await cPage.evaluate(_ => {
      }, `browserstack_executor: ${JSON.stringify({
        action: 'setSessionStatus',
        arguments: {status: 'passed', reason: 'monthly'}
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
  });

  test('links check : photoId', { tag: ['@approveme', '@cricketwireless', '@linkscheck'] },async ({browser}) => {
    test.skip(isHealthyLocal == false, 'health check FAILED; test.skip()');
    console.log('begin links checks...');
    let bCont: BrowserContext = await browser.newContext();
    let cPage: Page = await bCont.newPage();
    let splashPageLocal: B_SplashPage = new B_SplashPage(cPage);
    await splashPageLocal.navigate();

    try {
      await splashPageLocal.checkLinkPhoto();
      await cPage.evaluate(_ => {
      }, `browserstack_executor: ${JSON.stringify({
        action: 'setSessionStatus',
        arguments: {status: 'passed', reason: 'photoId'}
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
  });

  test('links check : bankInfo', { tag: ['@approveme', '@cricketwireless', '@linkscheck'] },async ({browser}) => {
    test.skip(isHealthyLocal == false, 'health check FAILED; test.skip()');
    let bCont: BrowserContext = await browser.newContext();
    let cPage: Page = await bCont.newPage();
    let splashPageLocal: B_SplashPage = new B_SplashPage(cPage);
    await splashPageLocal.navigate();

    try {
      await splashPageLocal.checkLinkBankInfo();
      await cPage.evaluate(_ => {
      }, `browserstack_executor: ${JSON.stringify({
        action: 'setSessionStatus',
        arguments: {status: 'passed', reason: 'bankInfo'}
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
  });

  test('links check : checkbox', { tag: ['@approveme', '@cricketwireless', '@linkscheck'] },async ({browser}) => {
    test.skip(isHealthyLocal == false, 'health check FAILED; test.skip()');
    let bCont: BrowserContext = await browser.newContext();
    let cPage: Page = await bCont.newPage();
    let splashPageLocal: B_SplashPage = new B_SplashPage(cPage);
    await splashPageLocal.navigate();

    try {
      await splashPageLocal.selectCheckbox();
      await splashPageLocal.unSelectCheckbox();
      await cPage.evaluate(_ => {
      }, `browserstack_executor: ${JSON.stringify({
        action: 'setSessionStatus',
        arguments: {status: 'passed', reason: 'checkbox'}
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
  });

  test('links check : terms', { tag: ['@approveme', '@cricketwireless', '@linkscheck'] },async ({browser}) => {
    test.skip(isHealthyLocal == false, 'health check FAILED; test.skip()');
    let bCont: BrowserContext = await browser.newContext();
    let cPage: Page = await bCont.newPage();
    let splashPageLocal: B_SplashPage = new B_SplashPage(cPage);
    await splashPageLocal.navigate();

    try {
      await splashPageLocal.checkLinkTerms();
      await cPage.evaluate(_ => {
      }, `browserstack_executor: ${JSON.stringify({
        action: 'setSessionStatus',
        arguments: {status: 'passed', reason: 'terms'}
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
  });

  test('links check : privacy', { tag: ['@approveme', '@cricketwireless', '@linkscheck'] },async ({browser}) => {
    test.skip(isHealthyLocal == false, 'health check FAILED; test.skip()');
    let bCont: BrowserContext = await browser.newContext();
    let cPage: Page = await bCont.newPage();
    let splashPageLocal: B_SplashPage = new B_SplashPage(cPage);
    await splashPageLocal.navigate();

    try {
      await splashPageLocal.checkLinkPrivacy();
      await cPage.evaluate(_ => {
      }, `browserstack_executor: ${JSON.stringify({
        action: 'setSessionStatus',
        arguments: {status: 'passed', reason: 'privacy'}
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
  });

  test('links check : disclosure', { tag: ['@approveme', '@cricketwireless', '@linkscheck'] },async ({browser}) => {
    test.skip(isHealthyLocal == false, 'health check FAILED; test.skip()');
    let bCont: BrowserContext = await browser.newContext();
    let cPage: Page = await bCont.newPage();
    let splashPageLocal: B_SplashPage = new B_SplashPage(cPage);
    await splashPageLocal.navigate();

    try {
      await splashPageLocal.checkLinkDisclosure();
      await cPage.evaluate(_ => {
      }, `browserstack_executor: ${JSON.stringify({
        action: 'setSessionStatus',
        arguments: {status: 'passed', reason: 'privacy'}
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
  });

  test('links check : arbitration', { tag: ['@approveme', '@cricketwireless', '@linkscheck'] },async ({browser}) => {
    test.skip(isHealthyLocal == false, 'health check FAILED; test.skip()');
    let bCont: BrowserContext = await browser.newContext();
    let cPage: Page = await bCont.newPage();
    let splashPageLocal: B_SplashPage = new B_SplashPage(cPage);
    await splashPageLocal.navigate();

    try {
      await splashPageLocal.checkLinkArbitration();
      await cPage.evaluate(_ => {
      }, `browserstack_executor: ${JSON.stringify({
        action: 'setSessionStatus',
        arguments: {status: 'passed', reason: 'privacy'}
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
  });
});