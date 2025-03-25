import {BrowserContext, expect, Page, test} from '@playwright/test';
import A_LoginPage from '../../pages/progweb.app/A_LoginPage';
import B_SelectShop from '../../pages/progweb.app/B_SelectShop';
import C_StartApplication from '../../pages/progweb.app/C_StartApplication';
import D_UpdateHomeAddress from '../../pages/progweb.app/D_UpdateHomeAddress';
import E_UpdateIncomeInfo from '../../pages/progweb.app/E_UpdateIncomeInfo';
import F_CreditCardDetails from '../../pages/progweb.app/F_UpdateCreditCardDetails';
import G_BankingInfo from '../../pages/progweb.app/G_UpdateBankingInfo';
import H_SubmitApplication from '../../pages/progweb.app/H_SubmitApplication';
import I_ResultsPage from '../../pages/progweb.app/I_ResultsPage';
import HappyPathApproved from 'data/progweb.approveme/HappyPathApproved';
import {PaymentFrequency} from "../../data/paymentFrequency";
import HappyPathPending from 'data/progweb.approveme/HappyPathPending';
import HappyPathDenied from 'data/progweb.approveme/HappyPathDenied';
import I_PaymentEstimator from '$pages/progweb.app/K_PaymentEstimator';
import J_LinksCheck from '$pages/progweb.app/J_LinksCheck';

let isLandingPageLoads: boolean = false;

test.describe('ProgWeb Big Six', async () => {

  test.describe.configure({ mode: 'serial' }); // do not change
  let isFlowsShouldContinue: boolean = false;

  test('landing page', async ({browser}) => {
    let bCont: BrowserContext = await browser.newContext();
    let cPage: Page = await bCont.newPage();
    let happyPathApproved = new HappyPathApproved();
    let loginPage = new A_LoginPage(cPage);
    
    try {
      await loginPage.happyPathPopulate(happyPathApproved.getLoginData);
      await cPage.evaluate(_ => {}, `browserstack_executor: ${JSON.stringify({action: 'setSessionStatus',arguments: {status: 'passed',reason: 'landing page up'}})}`);
      isLandingPageLoads = true;
      console.log('Login working; begin tests...')
    }catch(Error) {
      console.log('\nfull stop; Login page is down...\n');
      test.fail();
    }finally{
      await cPage.close();
      await bCont.close();
    }
  });

  test('approved', { tag: ['@progweb', '@happy', '@approved'] },async ({browser}) => {
          await expect(async () => {

        let bCont = await browser.newContext();
        const cPage = await bCont.newPage();
        let happyPathApproved = new HappyPathApproved();
  
        let loginPage = new A_LoginPage(cPage);
        await loginPage.happyPathPopulate(happyPathApproved.getLoginData);
  
        let selectShop = new B_SelectShop(cPage);
        await selectShop.clickMarchantDetails();
        await selectShop.lastLeaseMerchantName();
        await selectShop.clickForShop();
        await selectShop.navigateLocation();
        await selectShop._selectCityWithCode(happyPathApproved.getShopDetails[0]);
        await selectShop._selectOnline();
        await selectShop._selectShopName();
        await selectShop._startAplicaion();
  
        let startApplication = new C_StartApplication(cPage);
        await startApplication.selectCheckBox();
        await startApplication.clickStartButton();
  
        let updateHomeAddress = new D_UpdateHomeAddress(cPage);
        await updateHomeAddress.happyPathPopulate(happyPathApproved.getHomeAddress);
  
        let updateIncomeInfo = new E_UpdateIncomeInfo(cPage);
        await updateIncomeInfo.happyPathPopulate(happyPathApproved.getIncomeInfo);
  
        await cPage.waitForTimeout(3000);
        let updateCreditCardDetails = new F_CreditCardDetails(cPage);
        await updateCreditCardDetails.happyPathPopulate(happyPathApproved.getCreditCardDetails);
  
        let updateBankDetails = new G_BankingInfo(cPage);
        await updateBankDetails.happyPathPopulate(happyPathApproved.getBankingDetails);
  
        let submitApplication = new H_SubmitApplication(cPage);
        await submitApplication.happyPathPopulate();
        await cPage.waitForTimeout(15000);
  
        let resultsPage = new I_ResultsPage(cPage);
        await resultsPage.verifySuccessApproved();
  
        await cPage.close();
        await bCont.close();
  
      }).toPass({ timeout: 500000 });
  });
  
  test('pending', { tag: ['@progweb', '@happy', '@pending'] },async ({browser}) => {
    const ATTEMPTS_MAX: number = 2;
    let attempts: number = 1;
    let isPendingPass = false;
    while((attempts <= ATTEMPTS_MAX) && (isPendingPass===false)) {

      if (isFlowsShouldContinue) {

        if(attempts===1) {
          console.log('continue with pending...');
        }

        await expect(async () => {

          let bCont: BrowserContext = await browser.newContext();
          const cPage = await bCont.newPage();
          let happyPathPending = new HappyPathPending();
    
          let loginPage = new A_LoginPage(cPage);
          await loginPage.happyPathPopulate(happyPathPending.getLoginData);
          await cPage.waitForTimeout(2000);
    
          let selectShop = new B_SelectShop(cPage);
          await selectShop.happyPathPopulate(happyPathPending.getShopDetails);
          await cPage.waitForTimeout(5000);
    
          let startApplication = new C_StartApplication(cPage);
          await startApplication.selectCheckBox();
          await startApplication.clickStartButton();
          await cPage.waitForTimeout(2000);
    
          let updateHomeAddress = new D_UpdateHomeAddress(cPage);
          await updateHomeAddress.happyPathPopulate(happyPathPending.getHomeAddress);
    
          let updateIncomeInfo = new E_UpdateIncomeInfo(cPage);
          await updateIncomeInfo.happyPathPopulate(happyPathPending.getIncomeInfo);
    
          let updateCreditCardDetails = new F_CreditCardDetails(cPage);
          await updateCreditCardDetails.happyPathPopulate(happyPathPending.getCreditCardDetails);
    
          let updateBankDetails = new G_BankingInfo(cPage);
          await updateBankDetails.happyPathPopulate(happyPathPending.getBankingDetails);
    
          let submitApplication = new H_SubmitApplication(cPage);
          await submitApplication.happyPathPopulate();
          await cPage.waitForTimeout(15000);
    
          let resultsPage = new I_ResultsPage(cPage);
          await resultsPage.verifySuccessPending();
    
          await cPage.close();
          await bCont.close();
    
        }).toPass({ timeout: 500000 });
      }
    }
  });

  test('denied', { tag: ['@progweb', '@happy', '@denied'] },async ({browser}) => {
    const ATTEMPTS_MAX: number = 2;
    let attempts: number = 1;
    let isDeniedPass = false;
    while((attempts <= ATTEMPTS_MAX) && (isDeniedPass===false)) {

      if(isFlowsShouldContinue) {

        console.log('continue with denied...');

        await expect(async () => {

          let bCont: BrowserContext = await browser.newContext();
          const cPage = await bCont.newPage();
          let happyPathDenied = new HappyPathDenied();
    
          let loginPage = new A_LoginPage(cPage);
          await loginPage.happyPathPopulate(happyPathDenied.getLoginData);
          await cPage.waitForTimeout(2000);
    
          let selectShop = new B_SelectShop(cPage);
          await selectShop.happyPathPopulate(happyPathDenied.getShopDetails);
          await cPage.waitForTimeout(5000);
    
          let startApplication = new C_StartApplication(cPage);
          await startApplication.selectCheckBox();
          await startApplication.clickStartButton();
    
          let updateHomeAddress = new D_UpdateHomeAddress(cPage);
          await updateHomeAddress.happyPathPopulate(happyPathDenied.getHomeAddress);
    
          let updateIncomeInfo = new E_UpdateIncomeInfo(cPage);
          await updateIncomeInfo.happyPathPopulate(happyPathDenied.getIncomeInfo);
    
          await cPage.waitForTimeout(3000);
          let updateCreditCardDetails = new F_CreditCardDetails(cPage);
          await updateCreditCardDetails.happyPathPopulate(happyPathDenied.getCreditCardDetails);
    
          let updateBankDetails = new G_BankingInfo(cPage);
          await updateBankDetails.happyPathPopulate(happyPathDenied.getBankingDetails);
    
          let submitApplication = new H_SubmitApplication(cPage);
          await submitApplication.happyPathPopulate();
    
          await cPage.waitForTimeout(5000);
          let resultsPage = new I_ResultsPage(cPage);
          await resultsPage.verifySuccessDenied();
    
          await cPage.close();
          await bCont.close();
    
        }).toPass({ timeout: 500000 });
      }
    }
  });

  test('estimator : weekly', { tag: ['@progweb', '@happypath', '@estimate'] }, async ({browser}) => {
    const ATTEMPTS_MAX: number = 2;
    let attempts: number = 1;
    let isWeeklyPass = false;
    while((attempts <= ATTEMPTS_MAX) && (isWeeklyPass===false)) {
      if (isLandingPageLoads) {
        console.log('continue with estimator tests...');

        let bCont: BrowserContext = await browser.newContext();
        const cPage = await bCont.newPage();

        let happyPathApproved = new HappyPathApproved();

        let loginPage = new A_LoginPage(cPage);
        await loginPage.happyPathPopulate(happyPathApproved.getLoginData);
        await cPage.waitForTimeout(1000);

        let selectShop = new B_SelectShop(cPage);
        await selectShop.clickForShop();
        await selectShop.navigateLocation();
        await selectShop._selectCityWithCode(happyPathApproved.getShopDetails[0]);
        await selectShop._selectOnline();
        await selectShop._selectShopName();
        await cPage.waitForTimeout(1000);

        let paymentEstimator:I_PaymentEstimator = new I_PaymentEstimator(cPage);
        try {
      await paymentEstimator.happyPathEstimate('3001', PaymentFrequency.Weekly);
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






  test.skip('estimator : weekly1', { tag: ['@progweb', '@happypath', '@estimate'] }, async ({browser}) => {
    const ATTEMPTS_MAX: number = 2;
    let attempts: number = 1;
    let isWeeklyPass = false;
    while((attempts <= ATTEMPTS_MAX) && (isWeeklyPass===false)) {
      if (isLandingPageLoads) {

        let bCont: BrowserContext = await browser.newContext();
        const cPage = await bCont.newPage();

        let happyPathApproved = new HappyPathApproved();

        let loginPage = new A_LoginPage(cPage);
        await loginPage.happyPathPopulate(happyPathApproved.getLoginData);
        await cPage.waitForTimeout(1000);

        let selectShop = new B_SelectShop(cPage);
        await selectShop.clickForShop();
        await selectShop.navigateLocation();
        await selectShop._selectCityWithCode(happyPathApproved.getShopDetails[0]);
        await selectShop._selectOnline();
        await selectShop._selectShopName();
        await cPage.waitForTimeout(1000);

        let paymentEstimator:I_PaymentEstimator = new I_PaymentEstimator(cPage);
        try {
      await paymentEstimator.happyPathEstimate('3001', PaymentFrequency.Weekly);
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

test('estimator : biweekly', { tag: ['@progweb', '@happypath', '@estimate'] }, async ({browser}) => {
  const ATTEMPTS_MAX: number = 2;
  let attempts: number = 1;
  let isBiweeklyPass = false;
  while((attempts <= ATTEMPTS_MAX) && (isBiweeklyPass===false)) {
    if (isLandingPageLoads) {
let bCont: BrowserContext = await browser.newContext();
          const cPage = await bCont.newPage();

          let happyPathApproved = new HappyPathApproved();

          let loginPage = new A_LoginPage(cPage);
          await loginPage.happyPathPopulate(happyPathApproved.getLoginData);
          await cPage.waitForTimeout(1000);

          let selectShop = new B_SelectShop(cPage);
          await selectShop.clickForShop();
          await selectShop.navigateLocation();
          await selectShop._selectCityWithCode(happyPathApproved.getShopDetails[0]);
          await selectShop._selectOnline();
          await selectShop._selectShopName();
          await cPage.waitForTimeout(1000);

          let paymentEstimator:I_PaymentEstimator = new I_PaymentEstimator(cPage);
          try {
        await paymentEstimator.happyPathEstimate('3001', PaymentFrequency.BiWeekly);
        isBiweeklyPass = true;
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

      	



  test('estimator : semimonthly', { tag: ['@progweb', '@happypath', '@estimate'] }, async ({browser}) => {
    const ATTEMPTS_MAX: number = 2;
    let attempts: number = 1;
    let isSemiMonthlyPass = false;
    while((attempts <= ATTEMPTS_MAX) && (isSemiMonthlyPass===false)) {
      if (isLandingPageLoads) {
	let bCont: BrowserContext = await browser.newContext();
            const cPage = await bCont.newPage();

            let happyPathApproved = new HappyPathApproved();

            let loginPage = new A_LoginPage(cPage);
            await loginPage.happyPathPopulate(happyPathApproved.getLoginData);
            await cPage.waitForTimeout(1000);

            let selectShop = new B_SelectShop(cPage);
            await selectShop.clickForShop();
            await selectShop.navigateLocation();
            await selectShop._selectCityWithCode(happyPathApproved.getShopDetails[0]);
            await selectShop._selectOnline();
            await selectShop._selectShopName();
            await cPage.waitForTimeout(1000);

            let paymentEstimator:I_PaymentEstimator = new I_PaymentEstimator(cPage);
            try {
          await paymentEstimator.happyPathEstimate('3001', PaymentFrequency.SemiMonthly);
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

        	



 test('estimator : monthly', { tag: ['@progweb', '@happypath', '@estimate'] }, async ({browser}) => {
  const ATTEMPTS_MAX: number = 2;
  let attempts: number = 1;
  let isMonthlyPass = false;
  while((attempts <= ATTEMPTS_MAX) && (isMonthlyPass===false)) {
    if (isLandingPageLoads) {
let bCont: BrowserContext = await browser.newContext();
          const cPage = await bCont.newPage();

          let happyPathApproved = new HappyPathApproved();

          let loginPage = new A_LoginPage(cPage);
          await loginPage.happyPathPopulate(happyPathApproved.getLoginData);
          await cPage.waitForTimeout(1000);

          let selectShop = new B_SelectShop(cPage);
          await selectShop.clickForShop();
          await selectShop.navigateLocation();
          await selectShop._selectCityWithCode(happyPathApproved.getShopDetails[0]);
          await selectShop._selectOnline();
          await selectShop._selectShopName();
          await cPage.waitForTimeout(1000);

          let paymentEstimator:I_PaymentEstimator = new I_PaymentEstimator(cPage);
          try {
        await paymentEstimator.happyPathEstimate('3001', PaymentFrequency.Monthly);
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

  
  test('links check : application disclosure', { tag: ['@progweb', '@linkscheck'] },async ({browser}) => {
    const ATTEMPTS_MAX: number = 2;
    let attempts: number = 1;
    let isLinksBankInfoPass = false;
    while((attempts <= ATTEMPTS_MAX) && (isLinksBankInfoPass===false)) {
      if (isLandingPageLoads) {

        let bCont: BrowserContext = await browser.newContext();
      const cPage = await bCont.newPage();
      let happyPathPending = new HappyPathPending();

      let loginPage = new A_LoginPage(cPage);
      await loginPage.happyPathPopulate(happyPathPending.getLoginData);
      await cPage.waitForTimeout(2000);

      let selectShop = new B_SelectShop(cPage);
      await selectShop.happyPathPopulate(happyPathPending.getShopDetails);
      await cPage.waitForTimeout(5000);

      let linksCheck = new J_LinksCheck(cPage);
      
        try {
          await linksCheck.checkApplicationDiscloser();
          isLinksBankInfoPass = true;
          await cPage.evaluate(_ => {
          }, `browserstack_executor: ${JSON.stringify({
            action: 'setSessionStatus',
            arguments: {status: 'passed', reason: 'application disclosure'}
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


  test('links check : eSign disclosure', { tag: ['@progweb', '@linkscheck'] },async ({browser}) => {
    const ATTEMPTS_MAX: number = 2;
    let attempts: number = 1;
    let isLinksTermsPass = false;
    while((attempts <= ATTEMPTS_MAX) && (isLinksTermsPass===false)) {
      if (isLandingPageLoads) {

        let bCont: BrowserContext = await browser.newContext();
      const cPage = await bCont.newPage();
      let happyPathPending = new HappyPathPending();

      let loginPage = new A_LoginPage(cPage);
      await loginPage.happyPathPopulate(happyPathPending.getLoginData);

      let selectShop = new B_SelectShop(cPage);
      await selectShop.happyPathPopulate(happyPathPending.getShopDetails);

      let linksCheck = new J_LinksCheck(cPage);
      
        try {
          await linksCheck.checkEsignDiscloser();
          isLinksTermsPass = true;
          await cPage.evaluate(_ => {
          }, `browserstack_executor: ${JSON.stringify({
            action: 'setSessionStatus',
            arguments: {status: 'passed', reason: 'eSign disclosure'}
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

  test('links check : arbitration', { tag: ['@progweb', '@linkscheck'] },async ({browser}) => {
    const ATTEMPTS_MAX: number = 2;
    let attempts: number = 1;
    let isLinksPrivacyPass = false;
    while((attempts <= ATTEMPTS_MAX) && (isLinksPrivacyPass===false)) {
      if (isLandingPageLoads) {

         let bCont: BrowserContext = await browser.newContext();
      const cPage = await bCont.newPage();
      let happyPathPending = new HappyPathPending();

      let loginPage = new A_LoginPage(cPage);
      await loginPage.happyPathPopulate(happyPathPending.getLoginData);

      let selectShop = new B_SelectShop(cPage);
      await selectShop.happyPathPopulate(happyPathPending.getShopDetails);

      let linksCheck = new J_LinksCheck(cPage);
      await linksCheck.checkArbitrationProvision();

        try {
          await linksCheck.checkArbitrationProvision();
          isLinksPrivacyPass = true;
          await cPage.evaluate(_ => {
          }, `browserstack_executor: ${JSON.stringify({
            action: 'setSessionStatus',
            arguments: {status: 'passed', reason: 'arbitration'}
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

  test('links check : privacy', { tag: ['@progweb', '@linkscheck'] },async ({browser}) => {
    const ATTEMPTS_MAX: number = 2;
    let attempts: number = 1;
    let isLinksDisclosurePass = false;
    while((attempts <= ATTEMPTS_MAX) && (isLinksDisclosurePass===false)) {
      if (isLandingPageLoads) {

        let bCont: BrowserContext = await browser.newContext();
      const cPage = await bCont.newPage();
      let happyPathPending = new HappyPathPending();

      let loginPage = new A_LoginPage(cPage);
      await loginPage.happyPathPopulate(happyPathPending.getLoginData);

      let selectShop = new B_SelectShop(cPage);
      await selectShop.happyPathPopulate(happyPathPending.getShopDetails);

      let linksCheck = new J_LinksCheck(cPage);
      

        try {
          await linksCheck.checkPriavacyPolicy();
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

  test('links check : terms of use', { tag: ['@progweb', '@linkscheck'] },async ({browser}) => {
    const ATTEMPTS_MAX: number = 2;
    let attempts: number = 1;
    let isLinksArbitrationPass = false;
    while((attempts <= ATTEMPTS_MAX) && (isLinksArbitrationPass===false)) {
      if (isLandingPageLoads) {

        let bCont: BrowserContext = await browser.newContext();
      const cPage = await bCont.newPage();
      let happyPathPending = new HappyPathPending();

      let loginPage = new A_LoginPage(cPage);
      await loginPage.happyPathPopulate(happyPathPending.getLoginData);

      let selectShop = new B_SelectShop(cPage);
      await selectShop.happyPathPopulate(happyPathPending.getShopDetails);

      let linksCheck = new J_LinksCheck(cPage);
      

        try {
         await linksCheck.checkTermsOfUse();
          isLinksArbitrationPass = true;
          await cPage.evaluate(_ => {
          }, `browserstack_executor: ${JSON.stringify({
            action: 'setSessionStatus',
            arguments: {status: 'passed', reason: 'terms of use'}
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
   