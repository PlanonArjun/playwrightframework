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
import urls from "../../utils/jared.utils/urls";

let isLandingPageLoads: boolean = false;

test.describe('Jared Big Six', async () => {

    test.describe.configure({ mode: 'serial' }); // do not change

    let getStartAppData: string[];
    let nameFirstFetched:string;
    let nameLastFetched:string;
    let ssnFetched:string;
    let isApplyPass: boolean = false;
    let isResumePass: boolean = false;
    let isFlowsShouldContinue: boolean = false;

    test('Jared landing page', async ({browser}) => {
        let bCont = await browser.newContext();
        let cPage = await bCont.newPage();

        let a_marketingPage = new A_MarketingPage(cPage);
        try {
            await a_marketingPage.navigate();
            await cPage.evaluate(_ => {}, `browserstack_executor: ${JSON.stringify({action: 'setSessionStatus',arguments: {status: 'passed',reason: 'Jared landing page up'}})}`);
            isLandingPageLoads = true;
            console.log('landing page is up; begin tests...')
        }catch(Error) {
            console.log('\nfull stop; landing page is down...\n');
            test.fail();
        }finally{
            await cPage.close();
            await bCont.close();
        }
    });

    test('approve before resume', { tag: ['@jared', '@approveme', '@happy', '@approved'] }, async ({ browser }) => {
        await expect(async () => {

            const bCont = await browser.newContext();
            const cPage = await bCont.newPage();

            let marketingPage = new A_MarketingPage(cPage);
            await marketingPage.beginApply();
            await cPage.waitForTimeout(1000);

            let splashPage = new B_SplashPage(cPage);
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

        }).toPass({ timeout: 100000 });
    });

    test('resume second', { tag: ['@jared', '@approveme', '@happy', '@resume'] },async ({browser}) => {
        if(isApplyPass) {

            await expect(async () => {

                const bContR = await browser.newContext();
                const cPageR = await bContR.newPage();

                let marketingPageR = new A_MarketingPage(cPageR);
                await marketingPageR.navigate();
                await marketingPageR.beginResume();

                let resumePage = new R_ResumeApplication(cPageR);
                await resumePage.happyPathPopulate([nameFirstFetched,nameLastFetched],ssnFetched);

                let results: Q_ResultsPage = new Q_ResultsPage(cPageR);

                try {
                    await results.verifySuccessApproved();
                    console.log("apply-resume back-to-back passed...")
                    isResumePass = true;
                    isFlowsShouldContinue = true;
                    await cPageR.evaluate(_ => {}, `browserstack_executor: ${JSON.stringify({action: 'setSessionStatus',arguments: {status: 'passed',reason:'resume'}})}`);
                }catch(Error) {
                    await cPageR.evaluate(_ => {}, `browserstack_executor: ${JSON.stringify({action: 'setSessionStatus',arguments: {status: 'failed',reason: Error.toString()}})}`);
                }finally{
                    await cPageR.close();
                    await bContR.close();
                }
            }).toPass({timeout: 90000});
        }else {
            console.log("apply failed so resume skipped...");
        }
    });

    test('separate approved', { tag: ['@jared', '@approveme', '@happy', '@approved'] },async ({browser}) => {
        if((!isResumePass) && (isFlowsShouldContinue)) {

            await expect(async () => {

                let bCont = await browser.newContext();
                let cPage = await bCont.newPage();

                let marketingPage = new A_MarketingPage(cPage);
                await marketingPage.beginApply();
                await cPage.waitForTimeout(1000);

                let splashPage = new B_SplashPage(cPage);
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

                let results: Q_ResultsPage = new Q_ResultsPage(cPage);

                try {
                    await results.verifySuccessApproved();
                    await cPage.evaluate(_ => {}, `browserstack_executor: ${JSON.stringify({action: 'setSessionStatus',arguments: {status: 'passed',reason:'jared separate approved'}})}`);
                }catch(Error) {
                    isFlowsShouldContinue = false;
                    await cPage.evaluate(_ => {}, `browserstack_executor: ${JSON.stringify({action: 'setSessionStatus',arguments: {status: 'failed',reason: Error.toString()}})}`);
                }finally{
                    await cPage.close();
                    await bCont.close();
                }

            }).toPass({timeout: 120000});

        }else {
            console.log('separate approved skipped on purpose, not needed');
        }
    });

    test('pending', { tag: ['@jared', '@approveme', '@happy', '@pending'] },async ({browser}) => {
        const ATTEMPTS_MAX: number = 2;
        let attempts: number = 1;
        let isPendingPass = false;
        while((attempts <= ATTEMPTS_MAX) && (isPendingPass===false)) {

            if (isFlowsShouldContinue) {

                if(attempts===1) {
                    console.log('continue with pending...');
                }

                await expect(async () => {

                    const bCont = await browser.newContext();
                    const cPage = await bCont.newPage();

                    let marketingPage = new A_MarketingPage(cPage);
                    await marketingPage.beginApply();
                    await cPage.waitForTimeout(1000);

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
                        isPendingPass = true;
                        await cPage.evaluate(_ => {
                        }, `browserstack_executor: ${JSON.stringify({
                            action: 'setSessionStatus',
                            arguments: {status: 'passed', reason: 'jared pending'}
                        })}`);
                        console.log("pending passed...");
                    } catch (Error) {
                        await cPage.evaluate(_ => {
                        }, `browserstack_executor: ${JSON.stringify({
                            action: 'setSessionStatus',
                            arguments: {status: 'failed', reason: Error.toString()}
                        })}`);
                        attempts++;
                        isFlowsShouldContinue = false;
                    } finally {
                        await cPage.close();
                        await bCont.close();
                    }

                }).toPass({timeout: 120000});
            }
        }
    });

    test('denied', { tag: ['@jared', '@approveme', '@happy', '@denied'] },async ({browser}) => {
        const ATTEMPTS_MAX: number = 2;
        let attempts: number = 1;
        let isDeniedPass = false;
        while((attempts <= ATTEMPTS_MAX) && (isDeniedPass===false)) {

            if(isFlowsShouldContinue) {

                console.log('continue with denied...');

                await expect(async () => {

                    const bCont = await browser.newContext();
                    const cPage = await bCont.newPage();

                    let a_marketingPage = new A_MarketingPage(cPage);
                    await a_marketingPage.beginApply();
                    await cPage.waitForTimeout(1000);

                    let b_splashPage = new B_SplashPage(cPage);
                    await b_splashPage.continue();

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
                        isDeniedPass = true;
                        await cPage.evaluate(_ => {
                        }, `browserstack_executor: ${JSON.stringify({
                            action: 'setSessionStatus',
                            arguments: {status: 'passed', reason: 'jared denied'}
                        })}`);
                        console.log("denied passed...")
                        return;
                    } catch (Error) {
                        await cPage.evaluate(_ => {
                        }, `browserstack_executor: ${JSON.stringify({
                            action: 'setSessionStatus',
                            arguments: {status: 'failed', reason: Error.toString()}
                        })}`);
                        isFlowsShouldContinue = false;
                        attempts++;
                    } finally {
                        await cPage.close();
                        await bCont.close();
                    }

                }).toPass({timeout: 120000});
            }
        }
    });

    test('estimator : weekly', { tag: ['@jared', '@approveme', '@happypath', '@estimate'] }, async ({browser}) => {
        const ATTEMPTS_MAX: number = 2;
        let attempts: number = 1;
        let isWeeklyPass = false;
        while((attempts <= ATTEMPTS_MAX) && (isWeeklyPass===false)) {
            if (isLandingPageLoads) {
                console.log('continue with estimator tests...');
                const bCont = await browser.newContext();
                const cPage = await bCont.newPage();
                let a_marketingPage = new A_MarketingPage(cPage);
                await a_marketingPage.navigate();
                let s_estimator = new S_PaymentEstimator(cPage);

                try {
                    await s_estimator.happyPathEstimate('3001', PaymentFrequency.Weekly);
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

    test('estimator : monthly', { tag: ['@jared', '@approveme', '@happypath', '@estimate'] }, async ({browser}) => {
        const ATTEMPTS_MAX: number = 2;
        let attempts: number = 1;
        let isWeeklyPass = false;
        while((attempts <= ATTEMPTS_MAX) && (isWeeklyPass===false)) {
            if (isLandingPageLoads) {
                const bCont = await browser.newContext();
                const cPage = await bCont.newPage();
                let a_marketingPage = new A_MarketingPage(cPage);
                await a_marketingPage.navigate();
                let s_estimator = new S_PaymentEstimator(cPage);

                try {
                    await s_estimator.happyPathEstimate('4001', PaymentFrequency.Monthly);
                    isWeeklyPass = true;
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

    test('estimator : biweekly', { tag: ['@jared', '@approveme', '@happypath', '@estimate'] }, async ({browser}) => {
        const ATTEMPTS_MAX: number = 2;
        let attempts: number = 1;
        let isWeeklyPass = false;
        while((attempts <= ATTEMPTS_MAX) && (isWeeklyPass===false)) {
            if (isLandingPageLoads) {
                const bCont = await browser.newContext();
                const cPage = await bCont.newPage();
                let a_marketingPage = new A_MarketingPage(cPage);
                await a_marketingPage.navigate();
                let s_estimator = new S_PaymentEstimator(cPage);

                try {
                    await s_estimator.happyPathEstimate('4001', PaymentFrequency.BiWeekly);
                    isWeeklyPass = true;
                    await cPage.evaluate(_ => {
                    }, `browserstack_executor: ${JSON.stringify({
                        action: 'setSessionStatus',
                        arguments: {status: 'passed', reason: 'biweekly'}
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

    test('estimator : semimonthly', { tag: ['@jared', '@approveme', '@happypath', '@estimate'] }, async ({browser}) => {
        const ATTEMPTS_MAX: number = 2;
        let attempts: number = 1;
        let isWeeklyPass = false;
        while((attempts <= ATTEMPTS_MAX) && (isWeeklyPass===false)) {
            if (isLandingPageLoads) {
                const bCont = await browser.newContext();
                const cPage = await bCont.newPage();
                let a_marketingPage = new A_MarketingPage(cPage);
                await a_marketingPage.navigate();
                let s_estimator = new S_PaymentEstimator(cPage);

                try {
                    await s_estimator.happyPathEstimate('4001', PaymentFrequency.SemiMonthly);
                    isWeeklyPass = true;
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

    test('links check : photoId', { tag: ['@jared', '@approveme', '@linkscheck'] },async ({browser}) => {
        const ATTEMPTS_MAX: number = 2;
        let attempts: number = 1;
        let isLinksPhotoPass = false;
        while((attempts <= ATTEMPTS_MAX) && (isLinksPhotoPass===false)) {
            if (isLandingPageLoads) {
                console.log('continue with links check tests...');
                let bCont = await browser.newContext();
                let cPage = await bCont.newPage();
                let splashPageLocal = new B_SplashPage(cPage);
                await splashPageLocal.navigate();
                try {
                    await splashPageLocal.checkLinkPhoto();
                    isLinksPhotoPass = true;
                    await cPage.evaluate(_ => {
                    }, `browserstack_executor: ${JSON.stringify({
                        action: 'setSessionStatus',
                        arguments: {status: 'passed', reason: 'photoId'}
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

    test('links check : bankinfo', { tag: ['@jared', '@approveme', '@linkscheck'] },async ({browser}) => {
        const ATTEMPTS_MAX: number = 2;
        let attempts: number = 1;
        let isLinkBankInfo = false;
        while((attempts <= ATTEMPTS_MAX) && (isLinkBankInfo===false)) {
            if (isLandingPageLoads) {
                let bCont = await browser.newContext();
                let cPage = await bCont.newPage();
                let splashPageLocal = new B_SplashPage(cPage);
                await splashPageLocal.navigate();
                try {
                    await splashPageLocal.checkLinkBankInfo();
                    isLinkBankInfo = true;
                    await cPage.evaluate(_ => {
                    }, `browserstack_executor: ${JSON.stringify({
                        action: 'setSessionStatus',
                        arguments: {status: 'passed', reason: 'bankinfo'}
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

    test('links check : checkbox', { tag: ['@jared', '@approveme', '@linkscheck'] },async ({browser}) => {
        const ATTEMPTS_MAX: number = 2;
        let attempts: number = 1;
        let isLinksCheckbox = false;
        while((attempts <= ATTEMPTS_MAX) && (isLinksCheckbox===false)) {
            if (isLandingPageLoads) {
                let bCont = await browser.newContext();
                let cPage = await bCont.newPage();
                let splashPageLocal = new B_SplashPage(cPage);
                await splashPageLocal.navigate();
                try {
                    await splashPageLocal.selectCheckbox();
                    await cPage.waitForTimeout(500);
                    await splashPageLocal.unSelectCheckbox();
                    await cPage.waitForTimeout(500);
                    isLinksCheckbox = true;
                    await cPage.evaluate(_ => {
                    }, `browserstack_executor: ${JSON.stringify({
                        action: 'setSessionStatus',
                        arguments: {status: 'passed', reason: 'checkbox'}
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

    test('links check : terms', { tag: ['@jared', '@approveme', '@linkscheck'] },async ({browser}) => {
        const ATTEMPTS_MAX: number = 2;
        let attempts: number = 1;
        let isLinkTerms = false;
        while((attempts <= ATTEMPTS_MAX) && (isLinkTerms===false)) {
            if (isLandingPageLoads) {
                let bCont = await browser.newContext();
                let cPage = await bCont.newPage();
                let splashPageLocal = new B_SplashPage(cPage);
                await splashPageLocal.navigate();
                try {
                    await splashPageLocal.checkLinkTerms();
                    isLinkTerms = true;
                    await cPage.evaluate(_ => {
                    }, `browserstack_executor: ${JSON.stringify({
                        action: 'setSessionStatus',
                        arguments: {status: 'passed', reason: 'terms'}
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

    test('links check : privacy', { tag: ['@jared', '@approveme', '@linkscheck'] },async ({browser}) => {
        const ATTEMPTS_MAX: number = 2;
        let attempts: number = 1;
        let isLinksPrivacy = false;
        while((attempts <= ATTEMPTS_MAX) && (isLinksPrivacy===false)) {
            if (isLandingPageLoads) {
                let bCont = await browser.newContext();
                let cPage = await bCont.newPage();
                let splashPageLocal = new B_SplashPage(cPage);
                await splashPageLocal.navigate();
                try {
                    await splashPageLocal.checkLinkPrivacy();
                    isLinksPrivacy = true;
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

    test('links check : disclosure', { tag: ['@jared', '@approveme', '@linkscheck'] },async ({browser}) => {
        const ATTEMPTS_MAX: number = 2;
        let attempts: number = 1;
        let isLinksDisclosure = false;
        while((attempts <= ATTEMPTS_MAX) && (isLinksDisclosure===false)) {
            if (isLandingPageLoads) {
                let bCont = await browser.newContext();
                let cPage = await bCont.newPage();
                let splashPageLocal = new B_SplashPage(cPage);
                await splashPageLocal.navigate();
                try {
                    await splashPageLocal.checkLinkDisclosure();
                    isLinksDisclosure = true;
                    await cPage.evaluate(_ => {
                    }, `browserstack_executor: ${JSON.stringify({
                        action: 'setSessionStatus',
                        arguments: {status: 'passed', reason: 'disclosure'}
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

    test('links check : arbitration', { tag: ['@jared', '@approveme', '@linkscheck'] },async ({browser}) => {
        const ATTEMPTS_MAX: number = 2;
        let attempts: number = 1;
        let isLinkArbitration = false;
        while((attempts <= ATTEMPTS_MAX) && (isLinkArbitration===false)) {
            if (isLandingPageLoads) {
                let bCont = await browser.newContext();
                let cPage = await bCont.newPage();
                let splashPageLocal = new B_SplashPage(cPage);
                await splashPageLocal.navigate();
                try {
                    await splashPageLocal.checkLinkArbitration()
                    isLinkArbitration = true;
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
});