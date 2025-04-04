import { chromium, expect, test } from '@playwright/test';
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
import HappyPathPending from "../../data/cricket.approveme/HappyPathPending";
import CricketHealthCheck from './CricketHealthCheck'; // data object

test.describe('happy path pending', async () => {

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

  test('pending', { tag: ['@approveme', '@cricketwireless', '@happy', '@pending'] },async ({browser}) => {
    test.skip(isHealthyLocal == false, 'health check FAILED; test.skip()');
    await expect(async () => {

      let bCont = await browser.newContext();
      let cPage = await bCont.newPage();

      await (new B_SplashPage(cPage)).continue();

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

      let d_aboutYou1Page = new D_AboutYou1EmailPhonePage(cPage);
      await d_aboutYou1Page.happyPathPopulate(happyPathPending.getAboutYou1);

      let e_aboutYou2Page = new E_AboutYou2HomeAddressPage(cPage);
      await e_aboutYou2Page.happyPathPopulate(happyPathPending.getAboutYou2);

      let f_incomeInfoPage: K_IncomeInfoPage = new K_IncomeInfoPage(cPage);

      let g_bankAcctInfoPage: L_BankAcctInfoPage = new L_BankAcctInfoPage(cPage);

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

      await (new N_PaymentCardPage(cPage).enterCardNumberFirstSix(happyPathPending.getPaymentCardFirstSix));

      await (new J_ReviewAndSubmitPage(cPage)).happyPathGo();

      try {
        await (new P_ResultsPage(cPage)).verifyPending();
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
