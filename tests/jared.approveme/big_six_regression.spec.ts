import {BrowserContext, expect, Page, test} from '@playwright/test';
import HappyPathApproved from "../../data/jared.approveme/HappyPathApproved"; // data object
import A_MarketingPage from "../../pages/jared.approveme/A_MarketingPage";
import B_SplashPage from "../../pages/jared.approveme/B_SplashPage";
import C_StartAppPage from "../../pages/jared.approveme/C_StartAppPage";
import D_AboutYouContactPage from "../../pages/jared.approveme/D_AboutYouContactPage";
import E_AboutYouAddressPage from "../../pages/jared.approveme/E_AboutYouAddressPage";
import F_RentOwn from "../../pages/jared.approveme/F_RentOwn";
import G_IDType from "../../pages/jared.approveme/G_IDType";
import H_EmployStatus from "../../pages/jared.approveme/H_EmployStatus";
import I_EmployeeInfo from "../../pages/jared.approveme/I_EmployeeInfo";
import J_EmployerDuration from "../../pages/jared.approveme/J_EmployerDuration";
import K_IncomeInfoPage from "../../pages/jared.approveme/K_IncomeInfoPage";
import L_BankAccountDetails from "../../pages/jared.approveme/L_BankAccountDetails";
import M_BankDepositMode from "../../pages/jared.approveme/M_BankDepositMode";
import N_PaymentCardDetails from "../../pages/jared.approveme/N_PaymentCardDetails";
import O_PaymentBillingAddress from "../../pages/jared.approveme/O_PaymentBillingAddress";
import P_ConfirmSubmit from "../../pages/jared.approveme/P_ConfirmSubmit";
import Q_Results from "../../pages/jared.approveme/Q_ResultsPage";
import R_ResumeApplication from "../../pages/jared.approveme/R_ResumeApplication";
import Q_ResultsPage from "../../pages/jared.approveme/Q_ResultsPage";
import {PaymentFrequency} from "../../data/paymentFrequency";
import HappyPathPending from "../../data/jared.approveme/HappyPathPending";
import HappyPathDenied from "../../data/jared.approveme/HappyPathDenied";
import S_PaymentEstimator from "../../pages/jared.approveme/S_PaymentEstimator";
import JaredHealthCheck from './JaredHealthCheck';
import urls from '$utils/jared.utils/urls';

let bCont: BrowserContext;
let cPage: Page;
let isHealthyLocal: Boolean;

test.describe('Jared Big Six', async () => {

    test.describe.configure({ mode: 'serial' }); // do not change

    let getStartAppData: string[];
    let nameFirstFetched:string;
    let nameLastFetched:string;
    let ssnFetched:string;
    let isApplyPass: boolean = false;
    let isResumePass: boolean = false;

    test.beforeAll(async ({browser}) => {
        bCont = await browser.newContext();
        cPage = await bCont.newPage();
        isHealthyLocal = await new JaredHealthCheck(cPage).isHealthy();
    });

    test('approve before resume', { tag: ['@jared', '@approveme', '@happy', '@approved'] }, async () => {
        test.skip(isHealthyLocal == false, 'health check FAILED; test()');
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
                isApplyPass = true;
                console.log("apply passed; resume up next...")
                await cPage.evaluate(_ => {
                }, `browserstack_executor: ${JSON.stringify({
                    action: 'setSessionStatus',
                    arguments: {status: 'passed', reason: 'Jared apply'}
                })}`);
            } catch (Error) {
                await cPage.evaluate(_ => {
                }, `browserstack_executor: ${JSON.stringify({
                    action: 'setSessionStatus',
                    arguments: {status: 'failed', reason: Error.toString()}
                })}`);
            }
        }).toPass({ timeout: 120000 });
    });

    test('resume second', { tag: ['@jared', '@approveme', '@happy', '@resume'] },async () => {
        test.skip(isHealthyLocal == false, 'health check FAILED; test()');
        test.skip(isApplyPass == false, 'apply FAILED; test()');

        await expect(async () => {

            let marketingPageR = new A_MarketingPage(cPage);
            await marketingPageR.navigate();
            await marketingPageR.beginResume();

            let resumePage = new R_ResumeApplication(cPage);
            await resumePage.happyPathPopulate([nameFirstFetched,nameLastFetched],ssnFetched);

            let results: Q_ResultsPage = new Q_ResultsPage(cPage);

            try {
                await results.verifySuccessApproved();
                console.log("apply-resume back-to-back passed...")
                isApplyPass = true;
                await cPage.evaluate(_ => {}, `browserstack_executor: ${JSON.stringify({action: 'setSessionStatus',arguments: {status: 'passed',reason:'Jared resume'}})}`);
            }catch(Error) {
                await cPage.evaluate(_ => {}, `browserstack_executor: ${JSON.stringify({action: 'setSessionStatus',arguments: {status: 'failed',reason: Error.toString()}})}`);
            }
        }).toPass({timeout: 90000});
    });

    test('separate approved', { tag: ['@jared', '@approveme', '@happy', '@approved'] },async () => {
        test.skip(isHealthyLocal == false, 'health check FAILED; test()');
        if(isApplyPass) {
            console.log('separate approved skipped on purpose, not needed');
        }
        test.skip(isApplyPass == true, 'approved-resume PASS; test()');

        await expect(async () => {

            let splashPage = new B_SplashPage(cPage);
            await splashPage.navigate();
            await splashPage.continue();

            let happyPathApproved = new HappyPathApproved();

            let c_startAppPage = new C_StartAppPage(cPage);

            getStartAppData = happyPathApproved.getStartAppData;
            nameFirstFetched = getStartAppData[0];
            nameLastFetched = getStartAppData[1];
            ssnFetched = getStartAppData[3]; // ssn is 3

            for (let value in getStartAppData) { // optional, helpful
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

            let results: Q_ResultsPage = new Q_ResultsPage(cPage);

            try {
                await results.verifySuccessApproved();
                await cPage.evaluate(_ => {
                }, `browserstack_executor: ${JSON.stringify({
                    action: 'setSessionStatus',
                    arguments: { status: 'passed', reason: 'jared separate approved' }
                })}`);
            } catch (Error) {
                await cPage.evaluate(_ => {
                }, `browserstack_executor: ${JSON.stringify({
                    action: 'setSessionStatus',
                    arguments: { status: 'failed', reason: Error.toString() }
                })}`);
            }
        }).toPass({ timeout: 120000 });
    });

    test('Jared pending', { tag: ['@jared', '@approveme', '@happy', '@pending'] },async () => {
        test.skip(isHealthyLocal == false, 'health check FAILED; test()');
        console.log('continue with pending...');

        await expect(async () => {

            let marketingPage: A_MarketingPage = new A_MarketingPage(cPage);
            await marketingPage.beginApply();

            let splashPage = new B_SplashPage(cPage);
            await splashPage.continue();

            let happyPathPending = new HappyPathPending();

            let c_startAppPage = new C_StartAppPage(cPage);

            getStartAppData = happyPathPending.getStartAppData;
            nameFirstFetched  = getStartAppData[0];
            nameLastFetched   = getStartAppData[1];
            ssnFetched        = getStartAppData[3]; // ssn is 3

            for(let value in getStartAppData) { // optional, helpful
                console.log(getStartAppData[value] + "\t");
            }
            await c_startAppPage.happyPathPopulate(getStartAppData);

            let aboutYouContactPage = new D_AboutYouContactPage(cPage);
            await aboutYouContactPage.happyPathPopulate(happyPathPending.getAboutYou1);

            let aboutYouAddressPage = new E_AboutYouAddressPage(cPage);
            await aboutYouAddressPage.happyPathPopulate(happyPathPending.getAboutYou2);

            let rentOwn = new F_RentOwn(cPage);
            await rentOwn.setIsOwn(true);

            let iDType = new G_IDType(cPage);
            await iDType.happyPathPopulate(happyPathPending.getIdNumber);

            let employStatus = new H_EmployStatus(cPage);
            await employStatus.happyPathPopulate();

            let employeeInfo = new I_EmployeeInfo(cPage);
            await employeeInfo.happyPathPopulate(happyPathPending.getEmployeeInfo);

            let employerDuration = new J_EmployerDuration(cPage);
            await employerDuration.happyPathPopulate(happyPathPending.getEmployerInfo);

            let incomeInfoPage = new K_IncomeInfoPage(cPage);
            await incomeInfoPage.happyPathPopulate(happyPathPending.getIncomeInfo);

            let bankAccountDetails = new L_BankAccountDetails(cPage);
            await bankAccountDetails.happyPathPopulate(happyPathPending.getBankInfo1);

            let bankDepositMode = new M_BankDepositMode(cPage);
            await bankDepositMode.setIsDirectDeposit(happyPathPending.getBankInfo2);

            let paymentCardsDetails = new N_PaymentCardDetails(cPage);
            await paymentCardsDetails.happyPathPopulate(happyPathPending.getPaymentCard);

            let paymentBillingAddress = new O_PaymentBillingAddress(cPage);
            await paymentBillingAddress._checkSameAs();
            await paymentBillingAddress._NEXT();

            let p_submitConfirm = new P_ConfirmSubmit(cPage);
            await p_submitConfirm.submitApplication();

            let q_results: Q_Results = new Q_Results(cPage);

            try {
                await q_results.verifySuccessPending();
                await cPage.evaluate(_ => {
                }, `browserstack_executor: ${JSON.stringify({
                    action: 'setSessionStatus',
                    arguments: {status: 'passed', reason: 'Jared pending'}
                })}`);
                console.log("pending passed...");
            } catch (Error) {
                await cPage.evaluate(_ => {
                }, `browserstack_executor: ${JSON.stringify({
                    action: 'setSessionStatus',
                    arguments: {status: 'failed', reason: Error.toString()}
                })}`);
            }
        }).toPass({timeout: 120000});
    });

    test('Jared denied', { tag: ['@jared', '@approveme', '@happy', '@denied'] },async () => {
        test.skip(isHealthyLocal == false, 'health check FAILED; test()');
        console.log('continue with denied...');

        await expect(async () => {

            let marketingPage: A_MarketingPage = new A_MarketingPage(cPage);
            await marketingPage.beginApply();

            let splashPage = new B_SplashPage(cPage);
            await splashPage.continue();

            let happyPathDenied = new HappyPathDenied();

            let c_startAppPage = new C_StartAppPage(cPage);

            getStartAppData = happyPathDenied.getStartAppData;
            nameFirstFetched  = getStartAppData[0];
            nameLastFetched   = getStartAppData[1];
            ssnFetched        = getStartAppData[3]; // ssn is 3

            for(let value in getStartAppData) { // optional, helpful
                console.log(getStartAppData[value] + "\t");
            }
            await c_startAppPage.happyPathPopulate(getStartAppData);

            let aboutYouContactPage = new D_AboutYouContactPage(cPage);
            await aboutYouContactPage.happyPathPopulate(happyPathDenied.getAboutYou1);

            let aboutYouAddressPage = new E_AboutYouAddressPage(cPage);
            await aboutYouAddressPage.happyPathPopulate(happyPathDenied.getAboutYou2);

            let rentOwn = new F_RentOwn(cPage);
            await rentOwn.setIsOwn(true);

            let iDType = new G_IDType(cPage);
            await iDType.happyPathPopulate(happyPathDenied.getIdNumber);

            let employStatus = new H_EmployStatus(cPage);
            await employStatus.happyPathPopulate();

            let employeeInfo = new I_EmployeeInfo(cPage);
            await employeeInfo.happyPathPopulate(happyPathDenied.getEmployeeInfo);

            let employerDuration = new J_EmployerDuration(cPage);
            await employerDuration.happyPathPopulate(happyPathDenied.getEmployerInfo);

            let incomeInfoPage = new K_IncomeInfoPage(cPage);
            await incomeInfoPage.happyPathPopulate(happyPathDenied.getIncomeInfo);

            let bankAccountDetails = new L_BankAccountDetails(cPage);
            await bankAccountDetails.happyPathPopulate(happyPathDenied.getBankInfo1);

            let bankDepositMode = new M_BankDepositMode(cPage);
            await bankDepositMode.setIsDirectDeposit(happyPathDenied.getBankInfo2);

            let paymentCardsDetails = new N_PaymentCardDetails(cPage);
            await paymentCardsDetails.happyPathPopulate(happyPathDenied.getPaymentCard);

            let paymentBillingAddress = new O_PaymentBillingAddress(cPage);
            await paymentBillingAddress._checkSameAs();
            await paymentBillingAddress._NEXT();

            let submitConfirm = new P_ConfirmSubmit(cPage);
            await submitConfirm.submitApplication();

            let results: Q_Results = new Q_Results(cPage);

            try {
                await results.verifySuccessDenied();
                await cPage.evaluate(_ => {
                }, `browserstack_executor: ${JSON.stringify({
                    action: 'setSessionStatus',
                    arguments: {status: 'passed', reason: 'Jared denied'}
                })}`);
                console.log("denied passed...")
                return;
            } catch (Error) {
                await cPage.evaluate(_ => {
                }, `browserstack_executor: ${JSON.stringify({
                    action: 'setSessionStatus',
                    arguments: {status: 'failed', reason: Error.toString()}
                })}`);
            }
        }).toPass({timeout: 120000});
    });

    test('estimator : weekly', { tag: ['@jared', '@approveme', '@happypath', '@estimate'] }, async () => {
        test.skip(isHealthyLocal == false, 'health check FAILED; test()');
        console.log('continue with estimator tests...');
        await (new A_MarketingPage(cPage)).navigate();
        let s_estimator = new S_PaymentEstimator(cPage);

        try {
            await s_estimator.happyPathEstimate('3001', PaymentFrequency.Weekly);
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
        }
    });

    test('estimator : monthly', { tag: ['@jared', '@approveme', '@happypath', '@estimate'] }, async () => {
        test.skip(isHealthyLocal == false, 'health check FAILED; test()');
        await (new A_MarketingPage(cPage)).navigate();
        let s_estimator = new S_PaymentEstimator(cPage);

        try {
            await s_estimator.happyPathEstimate('4001', PaymentFrequency.Monthly);
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
        }
    });

    test('estimator : biweekly', { tag: ['@jared', '@approveme', '@happypath', '@estimate'] }, async () => {
        test.skip(isHealthyLocal == false, 'health check FAILED; test()');
        await (new A_MarketingPage(cPage)).navigate();
        let s_estimator = new S_PaymentEstimator(cPage);

        try {
            await s_estimator.happyPathEstimate('4001', PaymentFrequency.BiWeekly);
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
        }
    });

    test('estimator : semimonthly', { tag: ['@jared', '@approveme', '@happypath', '@estimate'] }, async () => {
        test.skip(isHealthyLocal == false, 'health check FAILED; test()');
        await (new A_MarketingPage(cPage)).navigate();
        let s_estimator = new S_PaymentEstimator(cPage);
        try {
            await s_estimator.happyPathEstimate('4001', PaymentFrequency.SemiMonthly);
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
        }finally {
            await bCont.close();
            await cPage.close();
        }
    });

    test('links check : photo Id', { tag: ['@approveme', '@signet', '@jared', '@splashpage', '@linkscheck'] }, async ({browser}) => {
        test.skip(isHealthyLocal == false, 'health check FAILED; test()');
        console.log('continue with links check tests...');
        let bContL = await browser.newContext();
        let cPageL = await bContL.newPage();
        await cPageL.goto(urls.splash.splash);
        try {
            await (new B_SplashPage(cPageL)).checkLinkPhoto();
            await cPageL.evaluate(_ => {}, `browserstack_executor: ${JSON.stringify({action: 'setSessionStatus',arguments: {status: 'passed', reason: 'photo Id'}})}`);
        }catch(Error) {
            await cPageL.evaluate(_ => {}, `browserstack_executor: ${JSON.stringify({action: 'setSessionStatus',arguments: {status: 'failed', reason: Error.toString()}})}`);
        }finally {
            await bContL.close();
            await cPageL.close();
        }
    });

    test('links check : bankInfo', { tag: ['@approveme', '@signet', '@jared', '@splashpage', '@linkscheck'] }, async ({browser}) => {
        test.skip(isHealthyLocal !== true, 'health check FAILED; test()');
        let bContL = await browser.newContext();
        let cPageL = await bContL.newPage();
        await cPageL.goto(urls.splash.splash);
        try {
            await (new B_SplashPage(cPageL)).checkLinkBankInfo();
            await cPageL.evaluate(_ => {}, `browserstack_executor: ${JSON.stringify({action: 'setSessionStatus',arguments: {status: 'passed', reason: 'bankInfo'}})}`);
        }catch(Error) {
            await cPageL.evaluate(_ => {}, `browserstack_executor: ${JSON.stringify({action: 'setSessionStatus',arguments: {status: 'failed', reason: Error.toString()}})}`);
        }finally {
            await bContL.close();
            await cPageL.close();
        }
    });

    test('links check : checkbox', { tag: ['@approveme', '@signet', '@jared', '@splashpage', '@linkscheck'] }, async ({browser}) => {
        test.skip(isHealthyLocal !== true, 'health check FAILED; test()');
        let bContL = await browser.newContext();
        let cPageL = await bContL.newPage();
        await cPageL.goto(urls.splash.splash);
        try {
            let splash = new B_SplashPage(cPageL);
            await splash.selectCheckbox();
            await splash.unSelectCheckbox();
            await cPageL.evaluate(_ => {}, `browserstack_executor: ${JSON.stringify({action: 'setSessionStatus',arguments: {status: 'passed', reason: 'checkbox'}})}`);
        }catch(Error) {
            await cPageL.evaluate(_ => {}, `browserstack_executor: ${JSON.stringify({action: 'setSessionStatus',arguments: {status: 'failed', reason: Error.toString()}})}`);
        }finally {
            await bContL.close();
            await cPageL.close();
        }
    });

    test('links check : terms', { tag: ['@approveme', '@signet', '@jared', '@splashpage', '@linkscheck'] }, async ({browser}) => {
        test.skip(isHealthyLocal !== true, 'health check FAILED; test()');
        let bContL = await browser.newContext();
        let cPageL = await bContL.newPage();
        await cPageL.goto(urls.splash.splash);
        try {
            await (new B_SplashPage(cPageL)).checkLinkTerms();
            await cPageL.evaluate(_ => {}, `browserstack_executor: ${JSON.stringify({action: 'setSessionStatus',arguments: {status: 'passed', reason: 'terms'}})}`);
        }catch(Error) {
            await cPageL.evaluate(_ => {}, `browserstack_executor: ${JSON.stringify({action: 'setSessionStatus',arguments: {status: 'failed', reason: Error.toString()}})}`);
        }finally {
            await bContL.close();
            await cPageL.close();
        }
    });

    test('links check : privacy', { tag: ['@approveme', '@signet', '@jared', '@splashpage', '@linkscheck'] }, async ({browser}) => {
        test.skip(isHealthyLocal !== true, 'health check FAILED; test()');
        let bContL = await browser.newContext();
        let cPageL = await bContL.newPage();
        await cPageL.goto(urls.splash.splash);
        try {
            await (new B_SplashPage(cPageL)).checkLinkPrivacy();
            await cPageL.evaluate(_ => {}, `browserstack_executor: ${JSON.stringify({action: 'setSessionStatus',arguments: {status: 'passed', reason: 'privacy'}})}`);
        }catch(Error) {
            await cPageL.evaluate(_ => {}, `browserstack_executor: ${JSON.stringify({action: 'setSessionStatus',arguments: {status: 'failed', reason: Error.toString()}})}`);
        }finally {
            await bContL.close();
            await cPageL.close();
        }
    });

    test('links check : disclosure', { tag: ['@approveme', '@signet', '@jared', '@splashpage', '@linkscheck'] }, async ({browser}) => {
        test.skip(isHealthyLocal !== true, 'health check FAILED; test()');
        let bContL = await browser.newContext();
        let cPageL = await bContL.newPage();
        await cPageL.goto(urls.splash.splash);
        try {
            await (new B_SplashPage(cPageL)).checkLinkDisclosure();
            await cPageL.evaluate(_ => {}, `browserstack_executor: ${JSON.stringify({action: 'setSessionStatus',arguments: {status: 'passed', reason: 'disclosure'}})}`);
        }catch(Error) {
            await cPageL.evaluate(_ => {}, `browserstack_executor: ${JSON.stringify({action: 'setSessionStatus',arguments: {status: 'failed', reason: Error.toString()}})}`);
        }finally {
            await bContL.close();
            await cPageL.close();
        }
    });

    test('links check : arbitration', { tag: ['@approveme', '@signet', '@jared', '@splashpage', '@linkscheck'] }, async ({browser}) => {
        test.skip(isHealthyLocal !== true, 'health check FAILED; test()');
        let bContL = await browser.newContext();
        let cPageL = await bContL.newPage();
        await cPageL.goto(urls.splash.splash);
        try {
            await (new B_SplashPage(cPage)).checkLinkArbitration();
            await cPageL.evaluate(_ => {}, `browserstack_executor: ${JSON.stringify({action: 'setSessionStatus',arguments: {status: 'passed', reason: 'arbitration'}})}`);
        }catch(Error) {
            await cPageL.evaluate(_ => {}, `browserstack_executor: ${JSON.stringify({action: 'setSessionStatus',arguments: {status: 'failed', reason: Error.toString()}})}`);
        }finally {
            await bContL.close();
            await cPageL.close();
        }
    });

});