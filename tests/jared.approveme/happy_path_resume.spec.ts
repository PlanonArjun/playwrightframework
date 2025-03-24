import { test, expect, BrowserContext, Page } from '@playwright/test';
import A_MarketingPage from "../../pages/jared.approveme/A_MarketingPage";
import B_SplashPage from "../../pages/jared.approveme/B_SplashPage";
import C_StartAppPage from "../../pages/jared.approveme/C_StartAppPage";
import F_RentOwn from '../../pages/jared.approveme/F_RentOwn';
import G_IDType from '../../pages/jared.approveme/G_IDType';
import H_EmployStatus from '../../pages/jared.approveme/H_EmployStatus';
import I_EmployeeInfo from '../../pages/jared.approveme/I_EmployeeInfo';
import J_EmployerDuration from '../../pages/jared.approveme/J_EmployerDuration';
import K_IncomeInfoPage from '../../pages/jared.approveme/K_IncomeInfoPage';
import P_ConfirmSubmit from '../../pages/jared.approveme/P_ConfirmSubmit';
import Q_Results from '../../pages/jared.approveme/Q_ResultsPage';
import HappyPathApproved from '../../data/jared.approveme/HappyPathApproved';
import L_BankAccountDetails from '../../pages/jared.approveme/L_BankAccountDetails';
import M_BankDepositMode from '../../pages/jared.approveme/M_BankDepositMode';
import N_PaymentCardDetails from '../../pages/jared.approveme/N_PaymentCardDetails';
import O_PaymentBillingAddress from '../../pages/jared.approveme/O_PaymentBillingAddress';
import D_AboutYouContactPage from '../../pages/jared.approveme/D_AboutYouContactPage';
import E_AboutYouAddressPage from '../../pages/jared.approveme/E_AboutYouAddressPage';
import R_ResumeApplication from "../../pages/jared.approveme/R_ResumeApplication";
import JaredHealthCheck from './JaredHealthCheck';

let bCont: BrowserContext;
let cPage: Page;
let isHealthyLocal: Boolean;

test.describe('approved-resume', async () => {

  test.describe.configure({ retries: 0 });
  test.describe.configure({ mode: 'serial' });

  let getStartAppData: string[];
  let nameFirstFetched: string;
  let nameLastFetched: string;
  let ssnFetched: string;
  let isApplyPass: boolean = false;

  test.beforeAll(async ({browser}) => {
    bCont = await browser.newContext();
    cPage = await bCont.newPage();
    isHealthyLocal = await new JaredHealthCheck(cPage).isHealthy();
  });

  test('approved first', { tag: ['@approveme', '@jared', '@signet', '@happy', '@approved'] }, async () => {
    test.skip(isHealthyLocal == false, 'health check FAILED; test.skip()');
    await expect(async () => {

      let splashPage = new B_SplashPage(cPage);
      await splashPage.navigate();
      await splashPage.continue();

      let happyPathApproved = new HappyPathApproved();

      let startAppPage = new C_StartAppPage(cPage);
      await startAppPage.happyPathPopulate(happyPathApproved.getStartAppData);
      getStartAppData = happyPathApproved.getStartAppData;
      nameFirstFetched = getStartAppData[0];
      nameLastFetched = getStartAppData[1];
      ssnFetched = getStartAppData[3]; // ssn is 3

      for(let value in getStartAppData) {
        console.log(getStartAppData[value]);
      }

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

      let paymentCardDetails = new N_PaymentCardDetails(cPage);
      await paymentCardDetails.happyPathPopulate(happyPathApproved.getPaymentCard);

      let paymentBillingAddress = new O_PaymentBillingAddress(cPage);
      await paymentBillingAddress._checkSameAs();
      await paymentBillingAddress._NEXT();

      let submitConfirm = new P_ConfirmSubmit(cPage);
      await submitConfirm.submitApplication();

      let results: Q_Results = new Q_Results(cPage);

      try {
        await results.verifySuccessApproved();
        isApplyPass = true;
        console.log("Apply passed. Resume up next.")
        await cPage.evaluate(_ => {}, `browserstack_executor: ${JSON.stringify({action: 'setSessionStatus',arguments: {status: 'passed',reason:'jared approved'}})}`);
      }catch(Error) {
        await cPage.evaluate(_ => {}, `browserstack_executor: ${JSON.stringify({action: 'setSessionStatus',arguments: {status: 'failed',reason: Error.toString()}})}`);
      }

    }).toPass({ timeout: 120000 });
  });

  test('resume second', { tag: ['@approveme', '@jared', '@Signet', '@happy', '@resume'] }, async ({ browser }) => {
    test.skip(isHealthyLocal == false, 'health check FAILED; test.skip()');
    await expect(async () => {

      if(isApplyPass) {

        const bContR = await browser.newContext();
        const cPageR = await bContR.newPage();

        let marketingPageR = new A_MarketingPage(cPageR);
        await marketingPageR.beginResume();

        let resumePage: R_ResumeApplication = new R_ResumeApplication(cPageR);
        await resumePage.happyPathPopulate([nameFirstFetched,nameLastFetched],ssnFetched);

        let results: Q_Results = new Q_Results(cPageR);

        try {
          await results.verifySuccessApproved();
          console.log("Resume passed. End test.")
          await cPageR.evaluate(_ => {}, `browserstack_executor: ${JSON.stringify({action: 'setSessionStatus',arguments: {status: 'passed',reason:'jared resume'}})}`);
        }catch(Error) {
          await cPageR.evaluate(_ => {}, `browserstack_executor: ${JSON.stringify({action: 'setSessionStatus',arguments: {status: 'failed',reason: Error.toString()}})}`);
        }
      }else {
        console.log("Apply failed. Resume skipped.");
      }

    }).toPass({ timeout: 90000 });
  });

});