import { test, expect, BrowserContext, Page } from '@playwright/test';
import B_SplashPage from "../../pages/jared.approveme/B_SplashPage";
import C_StartAppPage from "../../pages/jared.approveme/C_StartAppPage";
import F_RentOwn from '../../pages/jared.approveme/F_RentOwn';
import G_IDType from '../../pages/jared.approveme/G_IDType';
import HappyPathApproved from "../../data/jared.approveme/HappyPathApproved";
import H_EmployStatus from '../../pages/jared.approveme/H_EmployStatus';
import I_EmployeeInfo from '../../pages/jared.approveme/I_EmployeeInfo';
import J_EmployerDuration from '../../pages/jared.approveme/J_EmployerDuration';
import K_IncomeInfoPage from '../../pages/jared.approveme/K_IncomeInfoPage';
import P_ConfirmSubmit from '../../pages/jared.approveme/P_ConfirmSubmit';
import Q_Results from '../../pages/jared.approveme/Q_ResultsPage';
import D_AboutYouContactPage from '../../pages/jared.approveme/D_AboutYouContactPage';
import E_AboutYouAddressPage from '../../pages/jared.approveme/E_AboutYouAddressPage';
import L_BankAccountDetails from '../../pages/jared.approveme/L_BankAccountDetails';
import M_BankDepositMode from '../../pages/jared.approveme/M_BankDepositMode';
import N_PaymentCardDetails from '../../pages/jared.approveme/N_PaymentCardDetails';
import O_PaymentBillingAddress from '../../pages/jared.approveme/O_PaymentBillingAddress';
import JaredHealthCheck from './JaredHealthCheck';

let bCont: BrowserContext;
let cPage: Page;
let isHealthyLocal: Boolean;

test.describe('navigation', async () => {

  test.describe.configure({ retries: 0 });
  test.describe.configure({ mode: 'serial' });

  let getStartAppData: string[];
  let nameFirstFetched:string;
  let nameLastFetched:string;
  let ssnFetched:string;

  test.beforeAll(async ({browser}) => {
    bCont = await browser.newContext();
    cPage = await bCont.newPage();
    isHealthyLocal = await new JaredHealthCheck(cPage).isHealthy();
  });

  test('happy path approved to results page - apply', { tag: ['@approveme', '@signet', '@jared', '@splashpage', '@happy', '@approved'] }, async () => {
    test.skip(isHealthyLocal == false, 'health check FAILED; test.skip()');
    await expect(async () => {

      let splashPage = new B_SplashPage(cPage);
      await splashPage.navigate();
      await splashPage.continue();

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

      let aboutYouContactPage = new D_AboutYouContactPage(cPage);
      await aboutYouContactPage.happyPathPopulate(happyPathApproved.getAboutYou1);

      let aboutYouAddressPage = new E_AboutYouAddressPage(cPage);
      await aboutYouAddressPage.happyPathPopulate(happyPathApproved.getAboutYou2);

      let rentOwn = new F_RentOwn(cPage);
      await rentOwn.setIsOwn(true);

      let iDType = new G_IDType(cPage);
      await iDType.happyPathPopulate(happyPathApproved.getIdNumber);

      let employStatus = new H_EmployStatus(cPage);
      await employStatus.happyPathPopulate();

      let employeeInfo = new I_EmployeeInfo(cPage);
      await employeeInfo.happyPathPopulate(happyPathApproved.getEmployeeInfo);

      let employerDuration = new J_EmployerDuration(cPage);
      await employerDuration.happyPathPopulate(happyPathApproved.getEmployerInfo);

      let incomeInfoPage = new K_IncomeInfoPage(cPage);
      await incomeInfoPage.happyPathPopulate(happyPathApproved.getIncomeInfo);

      let bankAccountDetails = new L_BankAccountDetails(cPage);
      await bankAccountDetails.happyPathPopulate(happyPathApproved.getBankInfo1);

      let bankDepositMode = new M_BankDepositMode(cPage);
      await bankDepositMode.setIsDirectDeposit(happyPathApproved.getBankInfo2);

      let paymentCardsDetails = new N_PaymentCardDetails(cPage);
      await paymentCardsDetails.happyPathPopulate(happyPathApproved.getPaymentCard);

      let paymentBillingAddress = new O_PaymentBillingAddress(cPage);
      await paymentBillingAddress._checkSameAs();
      await paymentBillingAddress._NEXT();

      let submitConfirm = new P_ConfirmSubmit(cPage);
      await submitConfirm.submitApplication();

      let results: Q_Results = new Q_Results(cPage);

      try {
        await results.verifySuccessApproved();
        await cPage.evaluate(_ => {}, `browserstack_executor: ${JSON.stringify({action: 'setSessionStatus',arguments: {status: 'passed',reason:'jared approved'}})}`);
      }catch(Error) {
        await cPage.evaluate(_ => {}, `browserstack_executor: ${JSON.stringify({action: 'setSessionStatus',arguments: {status: 'failed',reason: Error.toString()}})}`);
      }finally{
        await cPage.close();
        await bCont.close();
      }

    }).toPass({ timeout: 120000 });
  });
});