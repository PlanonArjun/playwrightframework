import { chromium, expect, test } from '@playwright/test';
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
import HappyPathDenied from "../../data/cricket.approveme/HappyPathDenied";
import CricketHealthCheck from './CricketHealthCheck';

test.describe('cricket', async () => {

  test.describe.configure({ retries: 0 }); // do not change
  test.describe.configure({ mode: 'serial' }); // do not change

  let isHealthyLocal: Boolean;

  let getStartAppData: string[];
  let nameFirstFetched:string;
  let nameLastFetched:string;
  let ssnFetched:string;

  let bankInfo1Data: string[];
  let routing:string;
  let checking:string;
  let yearsOpen:string;
  let monthsOpen:string;

  test.beforeAll(async () => {
    let browserTemp = await chromium.launch({ headless: true });
    let pageTemp = await browserTemp.newPage();
    isHealthyLocal = await new CricketHealthCheck(pageTemp).isHealthy();
    await browserTemp.close();
    await pageTemp.close();
  });

  test('denied', { tag: ['@approveme', '@cricketwireless', '@happy', '@denied'] },async ({browser}) => {
    test.skip(isHealthyLocal == false, 'health check FAILED; test.skip()');
    await expect(async () => {

      let bCont = await browser.newContext();
      let cPage = await bCont.newPage();

      await (new B_SplashPage(cPage)).continue();

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

      try {
        await (new K_ResultsPage(cPage)).verifyDenied();
        await cPage.evaluate(_ => {}, `browserstack_executor: ${JSON.stringify({action: 'setSessionStatus',arguments: {status: 'passed',reason:'cricket denied'}})}`);
      }catch(Error) {
        await cPage.evaluate(_ => {}, `browserstack_executor: ${JSON.stringify({action: 'setSessionStatus',arguments: {status: 'failed',reason: Error.toString()}})}`);
      }finally {
        await cPage.close();
        await bCont.close();
      }

    }).toPass({timeout: 120000});
  });

});
