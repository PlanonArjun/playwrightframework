import { chromium, expect, test } from '@playwright/test';
import B_SplashPage from '../../pages/cricket.approveme/B_SplashPage';
import C_StartAppPage from '../../pages/cricket.approveme/C_StartAppPage';
import D_AboutYou1EmailPhonePage from '$pages/cricket.approveme/D_AboutYou1EmailPhonePage';
import E_AboutYou2HomeAddressPage from '$pages/cricket.approveme/E_AboutYou2HomeAddressPage';
import HappyPathPending from '../../data/cricket.approveme/HappyPathPending';
import CricketHealthCheck from './CricketHealthCheck';
import F_AboutYou3RentOwnPage from '$pages/cricket.approveme/F_AboutYou3RentOwnPage';
import G_AboutYou4IDTypePage from '$pages/cricket.approveme/G_AboutYou4IDTypePage';
import H_IncomeSourcePage from '$pages/cricket.approveme/H_IncomeSourcePage';
import { IncomeSource } from '$utils/IncomeSource';
import I_EmployerInfoPage from '$pages/cricket.approveme/I_EmployerInfoPage';
import J_EmploymentHistoryPage from '$pages/cricket.approveme/J_EmploymentHistoryPage';
import K_IncomeInfoPage from '$pages/cricket.approveme/K_IncomeInfoPage';
import { IncomeFrequency } from '$utils/IncomeFrequency';
import L_BankAcctInfoPage from '$pages/cricket.approveme/L_BankAcctInfoPage'
import M_DirectDepositPage from '$pages/cricket.approveme/M_DirectDepositPage';
import N_PaymentCardPage from '$pages/cricket.approveme/N_PaymentCardPage';
import O_ConfirmAndSubmitPage from '$pages/cricket.approveme/O_ConfirmAndSubmitPage';
import P_ResultsPage from '$pages/cricket.approveme/P_ResultsPage';

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

  test('approved', { tag: ['@approveme', '@cricketwireless', '@happy', '@approve'] },async ({ browser }) => {
    test.skip(isHealthyLocal == false, 'health check FAILED; test.skip()');
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

      // await (new H_IncomeSourcePage(cPage)).doHappyPathFullTime();
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
        await cPage.evaluate(_ => {}, `browserstack_executor: ${JSON.stringify({action: 'setSessionStatus',arguments: {status: 'passed',reason:'cricket pending'}})}`);
      }catch(Error) {
        await cPage.evaluate(_ => {}, `browserstack_executor: ${JSON.stringify({action: 'setSessionStatus',arguments: {status: 'failed',reason: Error.toString()}})}`);
      }finally{
        await cPage.close();
        await bCont.close();
      }

    }).toPass({timeout: 130000});
  });
});