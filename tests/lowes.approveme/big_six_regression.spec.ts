import { chromium, expect, test } from '@playwright/test';
import A_MarketingPage from "../../pages/lowes.approveme/A_MarketingPage";
import K_LeaseStatusPage from "../../pages/lowes.approveme/K_LeaseStatusPage";
import J_LeaseIDVerification from "../../pages/lowes.approveme/J_LeaseIDVerification";
import I_AccountDetails from "../../pages/lowes.approveme/I_AccountDetails";
import H_BillingAddress from "../../pages/lowes.approveme/H_BillingAddress";
import G_CreditCardDetailsPage from "../../pages/lowes.approveme/G_CreditCardDetails";
import F_IncomePage from "../../pages/lowes.approveme/F_IncomePage";
import E_HomeAddress from "../../pages/lowes.approveme/E_HomeAddress";
import D_AboutYou2Page from "../../pages/lowes.approveme/D_AboutYou2Page";
import C_AboutYou1Page from "../../pages/lowes.approveme/C_AboutYou1Page";
import B_BeforeStartPage from "../../pages/lowes.approveme/B_BeforeStartPage";
import HappyPathApproved from "../../data/lowes.approveme/HappyPathApproved";
import L_ResumeApplication from "$pages/lowes.approveme/L_ResumeApplication";
import HappyPathPending from "../../data/lowes.approveme/HappyPathPending";
import HappyPathDenied from "../../data/lowes.approveme/HappyPathDenied";
import M_LeaseEstimator from "$pages/lowes.approveme/M_LeaseEstimator";
import {PaymentFrequency} from "../../data/paymentFrequency";
import urls from '$utils/lowes.utils/urls';
import LowesHealthCheck from './LowesHealthCheck';

let isHealthyLocal: Boolean;

test.describe('Lowes Big Six', async () => {

    test.describe.configure({ mode: 'serial' }); // do not change

    let ssnFetched:string;
    let phoneFetched:string;
    let isApplyPass: boolean = false;
    let isResumePass: boolean = false;
    let isPendingPass: boolean = false;

    test.beforeAll(async () => {
        let browserTemp = await chromium.launch({ headless: true });
        let pageTemp = await browserTemp.newPage();
        isHealthyLocal = await new LowesHealthCheck(pageTemp).isHealthy();
        await browserTemp.close();
        await pageTemp.close();
    });

    test('lowes approve before resume', { tag: ['@lowes', '@approveme', '@happy', '@approved'] }, async ({ browser }) => {
        test.skip(isHealthyLocal == false, 'health check FAILED; test.skip()');
        await expect(async () => {

            // context and page
            const bCont = await browser.newContext();
            const cPage = await bCont.newPage();

            // data object
            let happyPathApprovedData = new HappyPathApproved();

            // navigate
            let marketingPage = new A_MarketingPage(cPage);
            await marketingPage.navigateMarketing();
            await marketingPage.beginApply();

            // agree to terms and begin application
            let beforeStartPage = new B_BeforeStartPage(cPage);
            await beforeStartPage.continue();

            // name dob ssn
            let aboutYou1Page = new C_AboutYou1Page(cPage);
            await aboutYou1Page.happyPathPopulate(happyPathApprovedData.getStartAppData);
            ssnFetched = happyPathApprovedData.getStartAppData[3].substring(5,9);
            console.log('SSN last four digits fetched from approved flow ', ssnFetched);

            // phone email
            let aboutYou2Page = new D_AboutYou2Page(cPage);
            await aboutYou2Page.happyPathPopulate(happyPathApprovedData.getAboutYou1);
            phoneFetched = happyPathApprovedData.getAboutYou1[0];
            console.log('Phone number fetched from approved flow ', phoneFetched);

            // address city state zip
            let homeAddress = new E_HomeAddress(cPage);
            await homeAddress.happyPathPopulate(happyPathApprovedData.getHomeAddress);

            // pay freq pay dates income
            let incomePage = new F_IncomePage(cPage);
            await incomePage.happyPathPopulate(happyPathApprovedData.getIncomeInfo);

            // payment card
            let creditCardDetails = new G_CreditCardDetailsPage(cPage);
            await creditCardDetails.happyPathPopulate(happyPathApprovedData.getCreditCardInfo);

            // billing address
            let billingAddress = new H_BillingAddress(cPage);
            await billingAddress.happyPathPopulate(happyPathApprovedData.getHomeAddress);

            // bank info
            let accountDetails = new I_AccountDetails(cPage);
            await accountDetails.happyPathPopulate(happyPathApprovedData.getBankInfo1);

            // accept and proceed - finish
            let leaseIdVerification = new J_LeaseIDVerification(cPage);
            await leaseIdVerification.happyPathAcceptProceed();
            await cPage.waitForTimeout(20000);

            // verify approved success and then exit
            let leaseStatusPage = new K_LeaseStatusPage(cPage);

            try {
                await leaseStatusPage.verifySuccessApproved();
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

        }).toPass({ timeout: 120000 });
    });

    test('resume second', { tag: ['@lowes', '@approveme', '@happy', '@resume'] },async ({browser}) => {
        test.skip(isHealthyLocal == false, 'health check FAILED; test.skip()');
        test.skip(isApplyPass == false, 'initial apply FAILED; test.skip()');

        await expect(async () => {

            const bContR = await browser.newContext();
            const cPageR = await bContR.newPage();

            const resumePageR =  new L_ResumeApplication(cPageR);
            await resumePageR.navigateResume();
            await resumePageR.happyPathPopulate(ssnFetched,phoneFetched);

            let leaseStatusPage = new K_LeaseStatusPage(cPageR);

            try {
                await leaseStatusPage.verifySuccessApproved();
                console.log("apply-resume back-to-back passed...")
                isResumePass = true;
                await cPageR.evaluate(_ => {}, `browserstack_executor: ${JSON.stringify({action: 'setSessionStatus',arguments: {status: 'passed',reason:'Lowes resume'}})}`);
            }catch(Error) {
                await cPageR.evaluate(_ => {}, `browserstack_executor: ${JSON.stringify({action: 'setSessionStatus',arguments: {status: 'failed',reason: Error.toString()}})}`);
            }finally{
                await cPageR.close();
                await bContR.close();
            }
        }).toPass({timeout: 90000});
    });

    test('separate approved', { tag: ['@lowes', '@approveme', '@happy', '@approved'] },async ({browser}) => {
        test.skip(isHealthyLocal == false, 'health check FAILED; test.skip()');
        if(isApplyPass == true && isResumePass == true) {
            console.log('separate approved skipped on purpose, not needed');
        }
        test.skip((isApplyPass == true && isResumePass == true));

        await expect(async () => {

            const bCont = await browser.newContext();
            const cPage = await bCont.newPage();

            // data object
            let happyPathApproved = new HappyPathApproved();

            // navigate
            let marketingPage = new A_MarketingPage(cPage);
            await marketingPage.navigateMarketing();
            await marketingPage.beginApply();

            // agree to terms and begin application
            let beforeStartPage = new B_BeforeStartPage(cPage);
            await beforeStartPage.continue();

            // name dob ssn
            let aboutYou1Page = new C_AboutYou1Page(cPage);
            await aboutYou1Page.happyPathPopulate(happyPathApproved.getStartAppData);
            ssnFetched = happyPathApproved.getStartAppData[3].substring(5,9);
            console.log('SSN last four digits fetched from approved flow ', ssnFetched);

            // phone email
            let aboutYou2Page = new D_AboutYou2Page(cPage);
            await aboutYou2Page.happyPathPopulate(happyPathApproved.getAboutYou1);
            phoneFetched = happyPathApproved.getAboutYou1[0];
            console.log('Phone number fetched from approved flow ', phoneFetched);

            // address city state zip
            let homeAddress = new E_HomeAddress(cPage);
            await homeAddress.happyPathPopulate(happyPathApproved.getHomeAddress);

            // pay freq pay dates income
            let incomePage = new F_IncomePage(cPage);
            await incomePage.happyPathPopulate(happyPathApproved.getIncomeInfo);

            // payment card
            let creditCardDetails = new G_CreditCardDetailsPage(cPage);
            await creditCardDetails.happyPathPopulate(happyPathApproved.getCreditCardInfo);

            // billing address
            let billingAddress = new H_BillingAddress(cPage);
            await billingAddress.happyPathPopulate(happyPathApproved.getHomeAddress);

            // bank info
            let accountDetails = new I_AccountDetails(cPage);
            await accountDetails.happyPathPopulate(happyPathApproved.getBankInfo1);

            // accept and proceed - finish
            let leaseIdVerification = new J_LeaseIDVerification(cPage);
            await leaseIdVerification.happyPathAcceptProceed();

            // verify approved success and then exit
            let leaseStatusPage = new K_LeaseStatusPage(cPage);

            try {
                await leaseStatusPage.verifySuccessApproved();
                console.log('separate approved passed...');
                await cPage.evaluate(_ => {}, `browserstack_executor: ${JSON.stringify({action: 'setSessionStatus',arguments: {status: 'passed',reason:'Lowes separate approved'}})}`);
            }catch(Error) {
                await cPage.evaluate(_ => {}, `browserstack_executor: ${JSON.stringify({action: 'setSessionStatus',arguments: {status: 'failed',reason: Error.toString()}})}`);
            }finally{
                await cPage.close();
                await bCont.close();
            }
        }).toPass({timeout: 120000});
    });

    test('pending', { tag: ['@lowes', '@approveme', '@happy', '@pending'] },async ({browser}) => {
        test.skip(isHealthyLocal == false, 'health check FAILED; test.skip()');
        test.skip(isApplyPass == false || isResumePass == false);
        console.log('continue with pending...');
        await expect(async () => {

            // context and page
            const bCont = await browser.newContext();
            const cPage = await bCont.newPage();

            // data object
            let happyPathPending = new HappyPathPending();

            // navigate
            let marketingPage = new A_MarketingPage(cPage);
            await marketingPage.navigateMarketing();
            await marketingPage.beginApply();

            // agree to terms and begin application
            let beforeStartPage = new B_BeforeStartPage(cPage);
            await beforeStartPage.continue();

            let aboutYou1Page = new C_AboutYou1Page(cPage);
            await aboutYou1Page.happyPathPopulate(happyPathPending.getStartAppData);

            // phone email
            let aboutYou2Page = new D_AboutYou2Page(cPage);
            await aboutYou2Page.happyPathPopulate(happyPathPending.getAboutYou1);

            // address city state zip
            let homeAddress = new E_HomeAddress(cPage);
            await homeAddress.happyPathPopulate(happyPathPending.getHomeAddress);

            // pay freq pay dates income
            let incomePage = new F_IncomePage(cPage);
            await incomePage.happyPathPopulate(happyPathPending.getIncomeInfo);

            // payment card
            let creditCardDetails = new G_CreditCardDetailsPage(cPage);
            await creditCardDetails.happyPathPopulate(happyPathPending.getCreditCardInfo);

            // billing address
            let billingAddress = new H_BillingAddress(cPage);
            await billingAddress.happyPathPopulate(happyPathPending.getHomeAddress);

            // bank info
            let accountDetails = new I_AccountDetails(cPage);
            await accountDetails.happyPathPopulate(happyPathPending.getBankInfo1);

            // accept and proceed - finish
            let leaseIdVerification = new J_LeaseIDVerification(cPage);
            await leaseIdVerification.happyPathAcceptProceed();

            // verify approved success and then exit
            let leaseStatusPage = new K_LeaseStatusPage(cPage);

            try {
                await leaseStatusPage.verifySuccessPending();
                isPendingPass = true;
                await cPage.evaluate(_ => {
                }, `browserstack_executor: ${JSON.stringify({
                    action: 'setSessionStatus',
                    arguments: {status: 'passed', reason: 'Lowes pending'}
                })}`);
                console.log("pending passed...");
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

    test('denied', { tag: ['@lowes', '@approveme', '@happy', '@denied'] },async ({browser}) => {
        test.skip(isHealthyLocal == false, 'health check FAILED; test.skip()');
        test.skip(isPendingPass == false);
        console.log('continue with denied...');

        await expect(async () => {

            const bCont = await browser.newContext();
            const cPage = await bCont.newPage();

            // data object
            let happyPathDenied = new HappyPathDenied();

            // navigate
            let marketingPage = new A_MarketingPage(cPage);
            await marketingPage.navigateMarketing();
            await marketingPage.beginApply();

            // agree to terms and begin application
            let beforeStartPage = new B_BeforeStartPage(cPage);
            await beforeStartPage.continue();

            // name dob ssn
            let aboutYou1Page = new C_AboutYou1Page(cPage);
            await aboutYou1Page.happyPathPopulate(happyPathDenied.getStartAppData);

            // phone email
            let aboutYou2Page = new D_AboutYou2Page(cPage);
            await aboutYou2Page.happyPathPopulate(happyPathDenied.getAboutYou1);

            // address city state zip
            let homeAddress = new E_HomeAddress(cPage);
            await homeAddress.happyPathPopulate(happyPathDenied.getHomeAddress);

            // pay freq pay dates income
            let incomePage = new F_IncomePage(cPage);
            await incomePage.happyPathPopulate(happyPathDenied.getIncomeInfo);

            // payment card
            let creditCardDetails = new G_CreditCardDetailsPage(cPage);
            await creditCardDetails.happyPathPopulate(happyPathDenied.getCreditCardInfo);

            // billing address
            let billingAddress = new H_BillingAddress(cPage);
            await billingAddress.happyPathPopulate(happyPathDenied.getHomeAddress);

            // bank info
            let accountDetails = new I_AccountDetails(cPage);
            await accountDetails.happyPathPopulate(happyPathDenied.getBankInfo1);

            // accept and proceed - finish
            let leaseIdVerification = new J_LeaseIDVerification(cPage);
            await leaseIdVerification.happyPathAcceptProceed();

            // verify approved success and then exit
            let leaseStatusPage = new K_LeaseStatusPage(cPage);

            try {
                await leaseStatusPage.verifySuccessDenied();
                await cPage.evaluate(_ => {
                }, `browserstack_executor: ${JSON.stringify({
                    action: 'setSessionStatus',
                    arguments: {status: 'passed', reason: 'Lowes denied'}
                })}`);
                console.log("denied passed...")
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

    test('estimator : weekly', { tag: ['@lowes', '@approveme', '@happypath', '@estimate'] }, async ({browser}) => {
        test.skip(isHealthyLocal == false, 'health check FAILED; test.skip()');
        console.log('continue with estimator tests...');
        let bCont = await browser.newContext();
        let cPage = await bCont.newPage();
        await (new A_MarketingPage(cPage)).navigateEstimator();
        let n_estimator = new M_LeaseEstimator(cPage);
        try {
            await n_estimator.happyPathEstimate('3001', PaymentFrequency.Weekly);
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

    test('estimator : biweekly', { tag: ['@lowes', '@approveme', '@happypath', '@estimate'] }, async ({browser}) => {
        test.skip(isHealthyLocal == false, 'health check FAILED; test.skip()');
        let bCont = await browser.newContext();
        let cPage = await bCont.newPage();
        await (new A_MarketingPage(cPage)).navigateEstimator();
        let n_estimator = new M_LeaseEstimator(cPage);
        try {
            await n_estimator.happyPathEstimate('4001', PaymentFrequency.BiWeekly);
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

    test('estimator : semimonthly', { tag: ['@lowes', '@approveme', '@happypath', '@estimate'] }, async ({browser}) => {
        test.skip(isHealthyLocal == false, 'health check FAILED; test.skip()');
        let bCont = await browser.newContext();
        let cPage = await bCont.newPage();
        await (new A_MarketingPage(cPage)).navigateEstimator();
        let n_estimator = new M_LeaseEstimator(cPage);
        try {
            await n_estimator.happyPathEstimate('4001', PaymentFrequency.SemiMonthly);
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

    test('estimator : monthly', { tag: ['@lowes', '@approveme', '@happypath', '@estimate'] }, async ({browser}) => {
        test.skip(isHealthyLocal == false, 'health check FAILED; test.skip()');
        let bCont = await browser.newContext();
        let cPage = await bCont.newPage();
        await (new A_MarketingPage(cPage)).navigateEstimator();
        let n_estimator = new M_LeaseEstimator(cPage);
        try {
            await n_estimator.happyPathEstimate('4001', PaymentFrequency.Monthly);
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
            n_estimator = null;
        }
    });

    test('links check : terms', { tag: ['@lowes', '@approveme', '@linkscheck'] },async ({browser}) => {
        test.skip(isHealthyLocal == false, 'health check FAILED; test.skip()');
        console.log('continue with links checks...');
        let bCont = await browser.newContext();
        let cPage = await bCont.newPage();
        await cPage.goto(urls.beforeYouStart.beforeYouStart);
        try {
            await (new B_BeforeStartPage(cPage)).checkLinkTerms();
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

    test('links check : privacy', { tag: ['@lowes', '@approveme', '@linkscheck'] },async ({browser}) => {
        test.skip(isHealthyLocal == false, 'health check FAILED; test.skip()');
        let bCont = await browser.newContext();
        let cPage = await bCont.newPage();
        await cPage.goto(urls.beforeYouStart.beforeYouStart);
        try {
            await (new B_BeforeStartPage(cPage)).checkLinkPrivacy();
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

    test('links check : disclosure', { tag: ['@lowes', '@approveme', '@linkscheck'] },async ({browser}) => {
        test.skip(isHealthyLocal == false, 'health check FAILED; test.skip()');
        let bCont = await browser.newContext();
        let cPage = await bCont.newPage();
        await cPage.goto(urls.beforeYouStart.beforeYouStart);
        try {
            await (new B_BeforeStartPage(cPage)).checkLinkDisclosure();
            await cPage.evaluate(_ => {
            }, `browserstack_executor: ${JSON.stringify({
                action: 'setSessionStatus',
                arguments: {status: 'passed', reason: 'disclosure'}
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

    test('links check : arbitration', { tag: ['@lowes', '@approveme', '@linkscheck'] },async ({browser}) => {
        test.skip(isHealthyLocal == false, 'health check FAILED; test.skip()');
        let bCont = await browser.newContext();
        let cPage = await bCont.newPage();
        await cPage.goto(urls.beforeYouStart.beforeYouStart);
        try {
            await (new B_BeforeStartPage(cPage)).checkLinkArbitration();
            await cPage.evaluate(_ => {
            }, `browserstack_executor: ${JSON.stringify({
                action: 'setSessionStatus',
                arguments: {status: 'passed', reason: 'arbitration'}
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