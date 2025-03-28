import { test, expect, BrowserContext, Page, chromium } from '@playwright/test';

import HappyPathApproved from '../../data/lowes.approveme/HappyPathApproved';
import B_BeforeStartPage from '../../pages/lowes.approveme/B_BeforeStartPage';
import C_AboutYou1Page from '../../pages/lowes.approveme/C_AboutYou1Page';
import D_AboutYou2Page from '../../pages/lowes.approveme/D_AboutYou2Page';
import E_HomeAddress from '../../pages/lowes.approveme/E_HomeAddress';
import F_IncomePage from '../../pages/lowes.approveme/F_IncomePage';
import G_CreditCardDetailsPage from '../../pages/lowes.approveme/G_CreditCardDetails';
import H_BillingAddress from '../../pages/lowes.approveme/H_BillingAddress';
import I_AccountDetails from '../../pages/lowes.approveme/I_AccountDetails';
import J_LeaseIDVerification from '../../pages/lowes.approveme/J_LeaseIDVerification';
import K_LeaseStatusPage from '../../pages/lowes.approveme/K_LeaseStatusPage';
import L_ResumeApplication from '$pages/lowes.approveme/L_ResumeApplication';
import LowesHealthCheck from './LowesHealthCheck';

let ssnFetched:string;
let phoneFetched:string;

let isHealthyLocal: Boolean;
let isApplyPass: boolean = false;

test.describe('happy path resume', async () => {

  test.describe.configure({ retries: 0 });
  test.describe.configure({ mode: 'serial' });

  test.beforeAll(async () => {
    let browserTemp = await chromium.launch({ headless: true });
    let pageTemp = await browserTemp.newPage();
    isHealthyLocal = await new LowesHealthCheck(pageTemp).isHealthy();
    await browserTemp.close();
    await pageTemp.close();
  });

  test('approve first', { tag: ['@lowes', '@approveme', '@happypath', '@approved'] }, async ({ browser }) => {
    test.skip(isHealthyLocal == false, 'health check FAILED; test.skip()');
    await expect(async () => {

      let bCont: BrowserContext = await browser.newContext();
      let cPage: Page = await bCont.newPage();

      // data object
      let approvedDataset = new HappyPathApproved();

      // navigate
      // agree to terms and begin application
      await (new B_BeforeStartPage(cPage)).continue();

      // name dob ssn
      let aboutYou1Page = new C_AboutYou1Page(cPage);
      await aboutYou1Page.happyPathPopulate(approvedDataset.getStartAppData);
      ssnFetched = approvedDataset.getStartAppData[3].substring(5,9);
      console.log('SSN last four digits fetched from approved flow ', ssnFetched);

      // phone email
      let aboutYou2Page = new D_AboutYou2Page(cPage);
      await aboutYou2Page.happyPathPopulate(approvedDataset.getAboutYou1);
      phoneFetched = approvedDataset.getAboutYou1[0];
      console.log('Phone number fetched from approved flow ', phoneFetched);

      // address city state zip
      let homeAddress = new E_HomeAddress(cPage);
      await homeAddress.happyPathPopulate(approvedDataset.getHomeAddress);

      // pay freq pay dates income
      let incomePage = new F_IncomePage(cPage);
      await incomePage.happyPathPopulate(approvedDataset.getIncomeInfo);

      // payment card
      let creditCardDetails = new G_CreditCardDetailsPage(cPage);
      await creditCardDetails.happyPathPopulate(approvedDataset.getCreditCardInfo);

      // billing address
      let billingAddress = new H_BillingAddress(cPage);
      await billingAddress.happyPathPopulate(approvedDataset.getHomeAddress);

      // bank info
      let accountDetails = new I_AccountDetails(cPage);
      await accountDetails.happyPathPopulate(approvedDataset.getBankInfo1);

      // accept and proceed - finish
      let leaseIdVerification = new J_LeaseIDVerification(cPage);
      await leaseIdVerification.happyPathAcceptProceed();

      // verify approved success and then exit
      try {
        await (new K_LeaseStatusPage(cPage)).verifySuccessApproved();
        console.log("Initial apply passed. Resume up next.")
        isApplyPass = true;
        await cPage.evaluate(_ => {}, `browserstack_executor: ${JSON.stringify({action: 'setSessionStatus',arguments: {status: 'passed',reason:'Lowes approved before resume'}})}`);
      }catch(Error) {
        console.log("Initial apply failed.")
        await cPage.evaluate(_ => {}, `browserstack_executor: ${JSON.stringify({action: 'setSessionStatus',arguments: {status: 'failed',reason: Error.toString()}})}`);
        test.fail();
      }finally{
        await cPage.close();
        await bCont.close();
      }

    }).toPass({ timeout: 120000 });

  });


  test('resume second', { tag: ['@lowes', '@approveme', '@happypath', '@resume'] }, async ({ browser }) => {
    test.skip(isHealthyLocal == false, 'health check FAILED; test.skip()');
    if(!isApplyPass) {
      console.log('Initial apply failed. Resume skipped.');
      test.skip(isApplyPass == false, 'initial apply FAILED; test.skip()');
    }

    await expect(async () => {

        let bContR = await browser.newContext();
        let cPageR = await bContR.newPage();

        const resumePageR =  new L_ResumeApplication(cPageR);
        await resumePageR.navigateResume();
        await resumePageR.happyPathPopulate(ssnFetched,phoneFetched);

        // verify approved success and then exit
        try {
          await (new K_LeaseStatusPage(cPageR)).verifySuccessApproved();
          console.log("Resume passed. End test.")
          await cPageR.evaluate(_ => {}, `browserstack_executor: ${JSON.stringify({action: 'setSessionStatus',arguments: {status: 'passed',reason:'Lowes resume'}})}`);
        }catch(Error) {
          await cPageR.evaluate(_ => {}, `browserstack_executor: ${JSON.stringify({action: 'setSessionStatus',arguments: {status: 'failed',reason: Error.toString()}})}`);
        }finally{
          await cPageR.close();
          await bContR.close();
        }
    }).toPass({ timeout: 90000 });
  });
});