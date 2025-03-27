import { chromium, expect, test } from '@playwright/test';
import A_MarketingPage from "../../pages/mattressfirm.approveme/A_MarketingPage";
import B_SplashPage from "../../pages/mattressfirm.approveme/B_SplashPage";
import HappyPathApproved from "../../data/mattressfirm.approveme/HappyPathApproved";
import C_StartAppPage from "../../pages/mattressfirm.approveme/C_StartAppPages";
import D_AboutYouPage from "../../pages/mattressfirm.approveme/D_AboutYouPage";
import E_AboutYouPage from "../../pages/mattressfirm.approveme/E_AboutYouPage";
import F_RentOwnPage from "../../pages/mattressfirm.approveme/F_RentOwnPage";
import G_IdTypePage from "../../pages/mattressfirm.approveme/G_IdTypePage";
import H_EmployeeStatusPage from "../../pages/mattressfirm.approveme/H_EmployeeStatusPage";
import I_EmployeeInfo from "../../pages/mattressfirm.approveme/I_EmployeeInfoPage";
import J_EmployeeDurationPage from "../../pages/mattressfirm.approveme/J_EmployeeDurationPage";
import K_IncomeInfoPage from "../../pages/mattressfirm.approveme/K_IncomeInfoPage";
import L_BankInfo1Page from '../../pages/mattressfirm.approveme/L_BankInfoPage';
import M_BankInfo2Page from '../../pages/mattressfirm.approveme/M_BankInfoPage';
import N_PaymentCardPage from '../../pages/mattressfirm.approveme/N_PaymentCardPage';
import O_PaymentCardPage from '../../pages/mattressfirm.approveme/O_PaymentCardPage';
import P_ConfirmSubmit from "../../pages/mattressfirm.approveme/P_ConfirmSubmit";
import Q_Results from "../../pages/mattressfirm.approveme/Q_Results";
import R_Resume from "../../pages/mattressfirm.approveme/R_Resume";
import M_BankInfoPage from "../../pages/mattressfirm.approveme/M_BankInfoPage";
import L_BankInfoPage from "../../pages/mattressfirm.approveme/L_BankInfoPage";
import HappyPathPending from "../../data/mattressfirm.approveme/HappyPathPending";
import HappyPathDenied from "../../data/mattressfirm.approveme/HappyPathDenied";
import F_RentOwn from "../../pages/mattressfirm.approveme/F_RentOwnPage";
import G_IDType from "../../pages/mattressfirm.approveme/G_IdTypePage";
import H_EmployStatus from "../../pages/mattressfirm.approveme/H_EmployeeStatusPage";
import J_EmployerDuration from "../../pages/mattressfirm.approveme/J_EmployeeDurationPage";
import {PaymentFrequency} from "../../data/paymentFrequency";
import S_PaymentEstimator from "../../pages/mattressfirm.approveme/S_PaymentEstimator";
import MTFMHealthCheck from './MTFMHealthCheck';


test.describe('MTFM Big Six', async () => {

    test.describe.configure({ mode: 'serial' }); // do not change

    let ssnFetched:string;
    let nameFirstFetched:string;
    let nameLastFetched:string;
    let isApplyPass: boolean = false;
    let isResumePass: boolean = false;
    let isFlowsShouldContinue: boolean = false;
    let isLandingPageLoads: boolean = false;
    let isHealthyLocal: Boolean;

    test.beforeAll(async () => {
        let browserTemp = await chromium.launch({ headless: true });
        let pageTemp = await browserTemp.newPage();
        isHealthyLocal = await new MTFMHealthCheck(pageTemp).isHealthy();
        await browserTemp.close();
        await pageTemp.close();
    });

    test('MTFM approve before resume', { tag: ['@mattressfirm', '@approveme', '@happy', '@approved'] }, async ({ browser }) => {
        test.skip(isHealthyLocal == false, 'health check FAILED; test.skip()');
        await expect(async () => {

            const bCont = await browser.newContext();
            const cPage = await bCont.newPage();

            let a_marketingPage = new A_MarketingPage(cPage);
            await a_marketingPage.navigate()
            await a_marketingPage.beginApply();
            await cPage.waitForTimeout(1000);

            await (new B_SplashPage(cPage)).continue();

            let happyPathApproved = new HappyPathApproved();

            let getStartAppData = happyPathApproved.getStartAppData;
            nameFirstFetched  = getStartAppData[0];
            nameLastFetched   = getStartAppData[1];
            ssnFetched        = getStartAppData[3]; // ssn is 3

            for(let value in getStartAppData) { // optional, helpful
                console.log(getStartAppData[value] + "\t");
            }
            await (new C_StartAppPage(cPage)).happyPathPopulate(getStartAppData);

            let d_aboutYouPage = new D_AboutYouPage(cPage);
            await d_aboutYouPage.happyPathPopulate(happyPathApproved.getAboutYou1);

            let e_aboutYou2Page = new E_AboutYouPage(cPage);
            await e_aboutYou2Page.happyPathPopulate(happyPathApproved.getAboutYou2);

            let f_rentOwnPage = new F_RentOwnPage(cPage);
            await f_rentOwnPage.setIsOwn(true);

            let g_IdTypePage = new G_IdTypePage(cPage);
            await g_IdTypePage.happyPathPopulate(happyPathApproved.getIdNumber);

            let h_employeeStatusPage = new H_EmployeeStatusPage(cPage);
            await h_employeeStatusPage.happyPathPopulate();

            let i_employeeInfo = new I_EmployeeInfo(cPage);
            await i_employeeInfo.happyPathPopulate(happyPathApproved.getEmployeeInfo);

            let j_EmployeeDurationPage = new J_EmployeeDurationPage(cPage);
            await j_EmployeeDurationPage.happyPathPopulate(happyPathApproved.getEmployerInfo);

            let k_incomeInfoPage = new K_IncomeInfoPage(cPage);
            await k_incomeInfoPage.happyPathPopulate(happyPathApproved.getIncomeInfo);

            let l_bankInfo1Page = new L_BankInfo1Page(cPage);
            await l_bankInfo1Page.happyPathPopulate(happyPathApproved.getBankInfo1);

            let m_bankInfo2Page = new M_BankInfo2Page(cPage);
            await m_bankInfo2Page.setIsDirectDeposit(happyPathApproved.getBankInfo2);

            let n_paymentCardPage = new N_PaymentCardPage(cPage);
            await n_paymentCardPage.happyPathPopulate(happyPathApproved.getPaymentCard);

            let o_paymentCardPage = new O_PaymentCardPage(cPage);
            await o_paymentCardPage._checkSameAs();
            await o_paymentCardPage._NEXT();

            await (new P_ConfirmSubmit(cPage)).submitApplication();

            try {
                await (new Q_Results(cPage)).verifySuccessApproved();
                isApplyPass = true;
                console.log("apply passed; resume up next...")
                await cPage.evaluate(_ => {}, `browserstack_executor: ${JSON.stringify({action: 'setSessionStatus',arguments: {status: 'passed',reason: 'initial apply'}})}`);
            }catch(Error) {
                await cPage.evaluate(_ => {}, `browserstack_executor: ${JSON.stringify({action: 'setSessionStatus',arguments: {status: 'failed',reason: Error.toString()}})}`);
            }finally {
                await cPage.close();
                await bCont.close();
            }

        }).toPass({ timeout: 120000 });
    });


    test('resume second', { tag: ['@approveme', '@mattressfirm', '@happy', '@resume'] }, async ({ browser }) => {
        test.skip(isHealthyLocal == false, 'health check FAILED; test.skip()');
        if(!isApplyPass) {
            console.log("Apply failed. Resume skipped.");
        }
        test.skip(isApplyPass == false, 'health check FAILED; test.skip()');
        await expect(async () => {

            const bContR = await browser.newContext();
            const cPageR = await bContR.newPage();

            await (new A_MarketingPage(cPageR)).beginResume();

            await (new R_Resume(cPageR)).happyPathPopulate([nameFirstFetched,nameLastFetched],ssnFetched);

            try {
                await (new Q_Results(cPageR)).verifySuccessApproved();
                isResumePass = true;
                isFlowsShouldContinue = true;
                console.log("Resume passed. End test.")
                await cPageR.evaluate(_ => {}, `browserstack_executor: ${JSON.stringify({action: 'setSessionStatus',arguments: {status: 'passed',reason:'resume'}})}`);
            }catch(Error) {
                await cPageR.evaluate(_ => {}, `browserstack_executor: ${JSON.stringify({action: 'setSessionStatus',arguments: {status: 'failed',reason: Error.toString()}})}`);
            }finally{
                await cPageR.close();
                await bContR.close();
            }
        }).toPass({ timeout: 90000 });
    });


    test('separate approved', { tag: ['@mattressfirm', '@approveme', '@happy', '@approved'] },async ({browser}) => {
        test.skip(isHealthyLocal == false, 'health check FAILED; test.skip()');
        if((!isResumePass) && (isFlowsShouldContinue)) {

            await expect(async () => {

                const bCont = await browser.newContext();
                const cPage = await bCont.newPage();

                let a_marketingPage = new A_MarketingPage(cPage);
                await a_marketingPage.navigate()
                await a_marketingPage.beginApply();
                await cPage.waitForTimeout(1000);

                await (new B_SplashPage(cPage)).continue();

                let happyPathApproved = new HappyPathApproved();

                let getStartAppData = happyPathApproved.getStartAppData;
                nameFirstFetched  = getStartAppData[0];
                nameLastFetched   = getStartAppData[1];
                ssnFetched        = getStartAppData[3]; // ssn is 3

                for(let value in getStartAppData) { // optional, helpful
                    console.log(getStartAppData[value] + "\t");
                }
                await (new C_StartAppPage(cPage)).happyPathPopulate(getStartAppData);

                let d_aboutYouPage = new D_AboutYouPage(cPage);
                await d_aboutYouPage.happyPathPopulate(happyPathApproved.getAboutYou1);

                let e_aboutYou2Page = new E_AboutYouPage(cPage);
                await e_aboutYou2Page.happyPathPopulate(happyPathApproved.getAboutYou2);

                let f_rentOwnPage = new F_RentOwnPage(cPage);
                await f_rentOwnPage.setIsOwn(true);

                let g_IdTypePage = new G_IdTypePage(cPage);
                await g_IdTypePage.happyPathPopulate(happyPathApproved.getIdNumber);

                let h_employeeStatusPage = new H_EmployeeStatusPage(cPage);
                await h_employeeStatusPage.happyPathPopulate();

                let i_employeeInfo = new I_EmployeeInfo(cPage);
                await i_employeeInfo.happyPathPopulate(happyPathApproved.getEmployeeInfo);

                let j_EmployeeDurationPage = new J_EmployeeDurationPage(cPage);
                await j_EmployeeDurationPage.happyPathPopulate(happyPathApproved.getEmployerInfo);

                let k_incomeInfoPage = new K_IncomeInfoPage(cPage);
                await k_incomeInfoPage.happyPathPopulate(happyPathApproved.getIncomeInfo);

                let l_bankInfo1Page = new L_BankInfo1Page(cPage);
                await l_bankInfo1Page.happyPathPopulate(happyPathApproved.getBankInfo1);

                let m_bankInfo2Page = new M_BankInfo2Page(cPage);
                await m_bankInfo2Page.setIsDirectDeposit(happyPathApproved.getBankInfo2);

                let n_paymentCardPage = new N_PaymentCardPage(cPage);
                await n_paymentCardPage.happyPathPopulate(happyPathApproved.getPaymentCard);

                let o_paymentCardPage = new O_PaymentCardPage(cPage);
                await o_paymentCardPage._checkSameAs();
                await o_paymentCardPage._NEXT();

                await (new P_ConfirmSubmit(cPage)).submitApplication();

                try {
                    await (new Q_Results(cPage)).verifySuccessApproved();
                    await cPage.evaluate(_ => {}, `browserstack_executor: ${JSON.stringify({action: 'setSessionStatus',arguments: {status: 'passed',reason: 'MTFM separate approved'}})}`);
                }catch(Error) {
                    await cPage.evaluate(_ => {}, `browserstack_executor: ${JSON.stringify({action: 'setSessionStatus',arguments: {status: 'failed',reason: Error.toString()}})}`);
                }finally {
                    await cPage.close();
                    await bCont.close();
                }

            }).toPass({timeout: 120000});

        }else {
            console.log('separate approved skipped on purpose, not needed');
        }
    });

    test('pending', { tag: ['@mattressfirm', '@approveme', '@happy', '@pending'] },async ({browser}) => {
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

                    let a_marketingPage = new A_MarketingPage(cPage);
                    await a_marketingPage.navigate()
                    await a_marketingPage.beginApply();
                    await cPage.waitForTimeout(1000);

                    let b_splashPage = new B_SplashPage(cPage);
                    await b_splashPage.continue();

                    let happyPathPending = new HappyPathPending();

                    let c_startAppPage = new C_StartAppPage(cPage);

                    let getStartAppData = happyPathPending.getStartAppData;

                    for(let value in getStartAppData) { // optional, helpful
                        console.log(getStartAppData[value] + "\t");
                    }
                    await c_startAppPage.happyPathPopulate(getStartAppData);

                    let d_aboutYouPage = new D_AboutYouPage(cPage);
                    await d_aboutYouPage.happyPathPopulate(happyPathPending.getAboutYou1);

                    let e_aboutYouPage = new E_AboutYouPage(cPage);
                    await e_aboutYouPage.happyPathPopulate(happyPathPending.getAboutYou2);

                    let f_rentOwnPage = new F_RentOwnPage(cPage);
                    await f_rentOwnPage.setIsOwn(true);

                    let g_iDTypePage = new G_IdTypePage(cPage);
                    await g_iDTypePage.happyPathPopulate(happyPathPending.getIdNumber);

                    let h_employStatus = new H_EmployeeStatusPage(cPage);
                    await h_employStatus.happyPathPopulate();

                    let i_employeeInfo = new I_EmployeeInfo(cPage);
                    await i_employeeInfo.happyPathPopulate(happyPathPending.getEmployeeInfo);

                    let j_employeeDurationPage = new J_EmployeeDurationPage(cPage);
                    await j_employeeDurationPage.happyPathPopulate(happyPathPending.getEmployerInfo);

                    let k_incomeInfoPage = new K_IncomeInfoPage(cPage);
                    await k_incomeInfoPage.happyPathPopulate(happyPathPending.getIncomeInfo);

                    let l_bankInfoPage = new L_BankInfoPage(cPage);
                    await l_bankInfoPage.happyPathPopulate(happyPathPending.getBankInfo1);

                    let m_bankInfoPage = new M_BankInfoPage(cPage);
                    await m_bankInfoPage.setIsDirectDeposit(happyPathPending.getBankInfo2);

                    let n_paymentCardPage = new N_PaymentCardPage(cPage);
                    await n_paymentCardPage.happyPathPopulate(happyPathPending.getPaymentCard);

                    let o_paymentCardPage = new O_PaymentCardPage(cPage);
                    await o_paymentCardPage._checkSameAs();
                    await o_paymentCardPage._NEXT();

                    await (new P_ConfirmSubmit(cPage)).submitApplication();

                    try {
                        await (new Q_Results(cPage)).verifySuccessPending();
                        isPendingPass = true;
                        await cPage.evaluate(_ => {
                        }, `browserstack_executor: ${JSON.stringify({
                            action: 'setSessionStatus',
                            arguments: {status: 'passed', reason: 'MTFM pending'}
                        })}`);
                        console.log("MTFM pending passed...");
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


    test('denied', { tag: ['@mattressfirm', '@approveme', '@happy', '@denied'] },async ({browser}) => {
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
                    await a_marketingPage.navigate()
                    await a_marketingPage.beginApply();
                    await cPage.waitForTimeout(1000);

                    let b_splashPage = new B_SplashPage(cPage);
                    await b_splashPage.continue();

                    let happyPathDenied = new HappyPathDenied();

                    let c_startAppPage = new C_StartAppPage(cPage);

                    let getStartAppData = happyPathDenied.getStartAppData;

                    for(let value in getStartAppData) { // optional, helpful
                        console.log(getStartAppData[value] + "\t");
                    }
                    await c_startAppPage.happyPathPopulate(getStartAppData);

                    let d_aboutYouPage = new D_AboutYouPage(cPage);
                    await d_aboutYouPage.happyPathPopulate(happyPathDenied.getAboutYou1);

                    let e_aboutYouPage = new E_AboutYouPage(cPage);
                    await e_aboutYouPage.happyPathPopulate(happyPathDenied.getAboutYou2);

                    let f_rentOwn = new F_RentOwn(cPage);
                    await f_rentOwn.setIsOwn(true);

                    let g_iDType = new G_IDType(cPage);
                    await g_iDType.happyPathPopulate(happyPathDenied.getIdNumber);

                    let h_employStatus = new H_EmployStatus(cPage);
                    await h_employStatus.happyPathPopulate();

                    let i_employeeInfo = new I_EmployeeInfo(cPage);
                    await i_employeeInfo.happyPathPopulate(happyPathDenied.getEmployeeInfo);

                    let j_employerDuration = new J_EmployerDuration(cPage);
                    await j_employerDuration.happyPathPopulate(happyPathDenied.getEmployerInfo);

                    let k_incomeInfoPage = new K_IncomeInfoPage(cPage);
                    await k_incomeInfoPage.happyPathPopulate(happyPathDenied.getIncomeInfo);

                    let l_bankInfoPage = new L_BankInfoPage(cPage);
                    await l_bankInfoPage.happyPathPopulate(happyPathDenied.getBankInfo1);

                    let m_bankInfoPage = new M_BankInfoPage(cPage);
                    await m_bankInfoPage.setIsDirectDeposit(happyPathDenied.getBankInfo2);

                    let n_paymentCardPage = new N_PaymentCardPage(cPage);
                    await n_paymentCardPage.happyPathPopulate(happyPathDenied.getPaymentCard);

                    let o_paymentCardPage = new O_PaymentCardPage(cPage);
                    await o_paymentCardPage._checkSameAs();
                    await o_paymentCardPage._NEXT();

                    await (new P_ConfirmSubmit(cPage)).submitApplication();

                    try {
                        await (new Q_Results(cPage)).verifySuccessDenied();
                        isDeniedPass = true;
                        await cPage.evaluate(_ => {
                        }, `browserstack_executor: ${JSON.stringify({
                            action: 'setSessionStatus',
                            arguments: {status: 'passed', reason: 'MTFM denied'}
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


    test('estimator : weekly', { tag: ['@mattressfirm', '@approveme', '@happypath', '@estimate'] }, async ({browser}) => {
        const ATTEMPTS_MAX: number = 2;
        let attempts: number = 1;
        let isWeeklyPass = false;
        while((attempts <= ATTEMPTS_MAX) && (isWeeklyPass===false)) {
            if (isLandingPageLoads) {
                console.log('continue with estimator tests...');
                let bCont = await browser.newContext();
                let cPage = await bCont.newPage();
                await (new A_MarketingPage(cPage)).navigate();
                try {
                    await (new S_PaymentEstimator(cPage)).happyPathEstimate('3001', PaymentFrequency.Weekly);
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


    test('estimator : biweekly', { tag: ['@mattressfirm', '@approveme', '@happypath', '@estimate'] }, async ({browser}) => {
        const ATTEMPTS_MAX: number = 2;
        let attempts: number = 1;
        let isBiWeeklyPass = false;
        while((attempts <= ATTEMPTS_MAX) && (isBiWeeklyPass===false)) {
            if (isLandingPageLoads) {
                let bCont = await browser.newContext();
                let cPage = await bCont.newPage();
                await (new A_MarketingPage(cPage)).navigate();
                try {
                    await (new S_PaymentEstimator(cPage)).happyPathEstimate('3001', PaymentFrequency.BiWeekly);
                    isBiWeeklyPass = true;
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


    test('estimator : semimonthly', { tag: ['@mattressfirm', '@approveme', '@happypath', '@estimate'] }, async ({browser}) => {
        const ATTEMPTS_MAX: number = 2;
        let attempts: number = 1;
        let isSemiMonthlyPass = false;
        while((attempts <= ATTEMPTS_MAX) && (isSemiMonthlyPass===false)) {
            if (isLandingPageLoads) {
                let bCont = await browser.newContext();
                let cPage = await bCont.newPage();
                await (new A_MarketingPage(cPage)).navigate();
                try {
                    await (new S_PaymentEstimator(cPage)).happyPathEstimate('3001', PaymentFrequency.SemiMonthly);
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


    test('estimator : monthly', { tag: ['@mattressfirm', '@approveme', '@happypath', '@estimate'] }, async ({browser}) => {
        const ATTEMPTS_MAX: number = 2;
        let attempts: number = 1;
        let isSemiMonthlyPass = false;
        while((attempts <= ATTEMPTS_MAX) && (isSemiMonthlyPass===false)) {
            if (isLandingPageLoads) {
                let bCont = await browser.newContext();
                let cPage = await bCont.newPage();
                await (new A_MarketingPage(cPage)).navigate();
                try {
                    await (new S_PaymentEstimator(cPage)).happyPathEstimate('3001', PaymentFrequency.Monthly);
                    isSemiMonthlyPass = true;
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


    test('links check : photoId', { tag: ['@mattressfirm', '@approveme', '@linkscheck'] },async ({browser}) => {
        const ATTEMPTS_MAX: number = 2;
        let attempts: number = 1;
        let isLinkPhotoId = false;
        while((attempts <= ATTEMPTS_MAX) && (isLinkPhotoId===false)) {
            if (isLandingPageLoads) {
                let bCont = await browser.newContext();
                let cPage = await bCont.newPage();
                let marketingPageTemp = new A_MarketingPage(cPage);
                await marketingPageTemp.navigate();
                await marketingPageTemp.beginApply();
                try {
                    await (new B_SplashPage(cPage).checkLinkPhoto());
                    isLinkPhotoId = true;
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


    test('links check : bankInfo', { tag: ['@mattressfirm', '@approveme', '@linkscheck'] },async ({browser}) => {
        const ATTEMPTS_MAX: number = 2;
        let attempts: number = 1;
        let isLinkBankInfo = false;
        while((attempts <= ATTEMPTS_MAX) && (isLinkBankInfo===false)) {
            if (isLandingPageLoads) {
                let bCont = await browser.newContext();
                let cPage = await bCont.newPage();
                let marketingPageTemp = new A_MarketingPage(cPage);
                await marketingPageTemp.navigate();
                await marketingPageTemp.beginApply();
                try {
                    await (new B_SplashPage(cPage).checkLinkBankInfo());
                    isLinkBankInfo = true;
                    await cPage.evaluate(_ => {
                    }, `browserstack_executor: ${JSON.stringify({
                        action: 'setSessionStatus',
                        arguments: {status: 'passed', reason: 'bankInfo'}
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


    test('links check : checkbox', { tag: ['@mattressfirm', '@approveme', '@linkscheck'] },async ({browser}) => {
        const ATTEMPTS_MAX: number = 2;
        let attempts: number = 1;
        let isLinkBankInfo = false;
        while((attempts <= ATTEMPTS_MAX) && (isLinkBankInfo===false)) {
            if (isLandingPageLoads) {
                let bCont = await browser.newContext();
                let cPage = await bCont.newPage();
                let marketingPageTemp = new A_MarketingPage(cPage);
                await marketingPageTemp.navigate();
                await marketingPageTemp.beginApply();
                try {
                    await (new B_SplashPage(cPage)).selectCheckbox();
                    await (new B_SplashPage(cPage)).unSelectCheckbox();
                    isLinkBankInfo = true;
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


    test('links check : terms', { tag: ['@mattressfirm', '@approveme', '@linkscheck'] },async ({browser}) => {
        const ATTEMPTS_MAX: number = 2;
        let attempts: number = 1;
        let isLinkTerms = false;
        while((attempts <= ATTEMPTS_MAX) && (isLinkTerms===false)) {
            if (isLandingPageLoads) {
                let bCont = await browser.newContext();
                let cPage = await bCont.newPage();
                let marketingPageTemp = new A_MarketingPage(cPage);
                await marketingPageTemp.navigate();
                await marketingPageTemp.beginApply();
                try {
                    await (new B_SplashPage(cPage).checkLinkTerms());
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


    test('links check : privacy', { tag: ['@mattressfirm', '@approveme', '@linkscheck'] },async ({browser}) => {
        const ATTEMPTS_MAX: number = 2;
        let attempts: number = 1;
        let isLinkPrivacy = false;
        while((attempts <= ATTEMPTS_MAX) && (isLinkPrivacy===false)) {
            if (isLandingPageLoads) {
                let bCont = await browser.newContext();
                let cPage = await bCont.newPage();
                let marketingPageTemp = new A_MarketingPage(cPage);
                await marketingPageTemp.navigate();
                await marketingPageTemp.beginApply();
                try {
                    await (new B_SplashPage(cPage)).checkLinkPrivacy();
                    isLinkPrivacy = true;
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


    test('links check : disclosure', { tag: ['@mattressfirm', '@approveme', '@linkscheck'] },async ({browser}) => {
        const ATTEMPTS_MAX: number = 2;
        let attempts: number = 1;
        let isLinkPrivacy = false;
        while((attempts <= ATTEMPTS_MAX) && (isLinkPrivacy===false)) {
            if (isLandingPageLoads) {
                let bCont = await browser.newContext();
                let cPage = await bCont.newPage();
                let marketingPageTemp = new A_MarketingPage(cPage);
                await marketingPageTemp.navigate();
                await marketingPageTemp.beginApply();
                try {
                    await (new B_SplashPage(cPage)).checkLinkDisclosure();
                    isLinkPrivacy = true;
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


    test('links check : arbitration', { tag: ['@mattressfirm', '@approveme', '@linkscheck'] },async ({browser}) => {
        const ATTEMPTS_MAX: number = 2;
        let attempts: number = 1;
        let isLinkArbitration = false;
        while((attempts <= ATTEMPTS_MAX) && (isLinkArbitration===false)) {
            if (isLandingPageLoads) {
                let bCont = await browser.newContext();
                let cPage = await bCont.newPage();
                let marketingPageTemp = new A_MarketingPage(cPage);
                await marketingPageTemp.navigate();
                await marketingPageTemp.beginApply();
                try {
                    await (new B_SplashPage(cPage)).checkLinkArbitration();
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