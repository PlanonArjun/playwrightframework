import { chromium, expect, test } from '@playwright/test';
import HappyPathApproved from "../../data/cricket.approveme/HappyPathApproved"; // data object
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
import Q_ResumeApplication from "$pages/cricket.approveme/L_ResumeApplication";
import CricketHealthCheck from './CricketHealthCheck';

test.describe('happy path approved-resume', async () => {

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

  let isApplyPass: boolean = false;
  let isHealthyLocal: Boolean;

  test.beforeAll(async () => {
    let browserTemp = await chromium.launch({ headless: true });
    let pageTemp = await browserTemp.newPage();
    isHealthyLocal = await new CricketHealthCheck(pageTemp).isHealthy();
    await browserTemp.close();
    await pageTemp.close();
  });

  test('approve first', { tag: ['@approveme', '@cricketwireless', '@happy', '@resume'] },async ({browser}) => {
    test.skip(isHealthyLocal == false, 'health check FAILED; test.skip()');
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
        console.log("Initial apply passed. Resume up next.")
        await cPage.evaluate(_ => {}, `browserstack_executor: ${JSON.stringify({action: 'setSessionStatus',arguments: {status: 'passed',reason:'initial apply'}})}`);
      }catch(Error) {
        await cPage.evaluate(_ => {}, `browserstack_executor: ${JSON.stringify({action: 'setSessionStatus',arguments: {status: 'failed',reason: Error.toString()}})}`);
      }finally{
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

      let resumePage = new Q_ResumeApplication(cPageR);
      await resumePage.happyPathPopulate([nameFirstFetched, nameLastFetched], ssnFetched);

      let k_resultsPage: K_ResultsPage = new K_ResultsPage(cPageR);

      try {
        await k_resultsPage.verifyApproved();
        console.log('Resume passed. End test.');
        await cPageR.evaluate(_ => {
        }, `browserstack_executor: ${JSON.stringify({
          action: 'setSessionStatus',
          arguments: { status: 'passed', reason: 'resume' },
        })}`);
      } catch (Error) {
        await cPageR.evaluate(_ => {
        }, `browserstack_executor: ${JSON.stringify({
          action: 'setSessionStatus',
          arguments: { status: 'failed', reason: Error.toString() },
        })}`);
      } finally {
        await cPageR.close();
        await bContR.close();
      }
    }).toPass({ timeout: 90000 });
  });
});