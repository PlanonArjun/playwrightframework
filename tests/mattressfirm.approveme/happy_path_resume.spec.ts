import {test, expect } from '@playwright/test';
import B_SplashPage from "../../pages/mattressfirm.approveme/B_SplashPage";
import C_StartAppPage from "../../pages/mattressfirm.approveme/C_StartAppPages";
import D_AboutYouPage from "../../pages/mattressfirm.approveme/D_AboutYouPage";
import E_AboutYouPage from "../../pages/mattressfirm.approveme/E_AboutYouPage";
import HappyPathApproved from "../../data/mattressfirm.approveme/HappyPathApproved";
import I_EmployeeInfo from '../../pages/mattressfirm.approveme/I_EmployeeInfoPage';
import K_IncomeInfoPage from '../../pages/mattressfirm.approveme/K_IncomeInfoPage';
import L_BankInfo1Page from '../../pages/mattressfirm.approveme/L_BankInfoPage';
import M_BankInfo2Page from '../../pages/mattressfirm.approveme/M_BankInfoPage';
import P_ConfirmSubmit from '../../pages/mattressfirm.approveme/P_ConfirmSubmit';
import Q_Results from '../../pages/mattressfirm.approveme/Q_Results';
import N_PaymentCardPage from '../../pages/mattressfirm.approveme/N_PaymentCardPage';
import O_PaymentCardPage from '../../pages/mattressfirm.approveme/O_PaymentCardPage';
import J_EmployeeDurationPage from '../../pages/mattressfirm.approveme/J_EmployeeDurationPage';
import A_MarketingPage from '../../pages/mattressfirm.approveme/A_MarketingPage';
import H_EmployeeStatusPage from '../../pages/mattressfirm.approveme/H_EmployeeStatusPage';
import F_RentOwnPage from '../../pages/mattressfirm.approveme/F_RentOwnPage';
import G_IdTypePage from '../../pages/mattressfirm.approveme/G_IdTypePage';
import R_Resume from "../../pages/mattressfirm.approveme/R_Resume";

test.describe('navigation', async () => {

    test.describe.configure({ retries: 0 });
    test.describe.configure({ mode: 'serial' });

    let getStartAppData: string[];
    let nameFirstFetched:string;
    let nameLastFetched:string;
    let ssnFetched:string;
    let isApplyPass: boolean = false;

    test('approve first', { tag: ['@approveme', '@mattressfirm', '@happy', '@approved'] },async ({browser}) => {
        await expect(async () => {

            const bCont = await browser.newContext();
            const cPage = await bCont.newPage();

            let a_marketingPage = new A_MarketingPage(cPage);
            await a_marketingPage.navigate()
            await a_marketingPage.beginApply();
            await cPage.waitForTimeout(1000);

            let b_splashPage = new B_SplashPage(cPage);
            await b_splashPage.continue();

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

            let p_ConfirmSubmit = new P_ConfirmSubmit(cPage);
            await p_ConfirmSubmit.submitApplication();

            let q_results: Q_Results = new Q_Results(cPage);
            await q_results.verifySuccessApproved();

            isApplyPass = true;
            console.log("Apply passed. Resume up next.")

            await bCont.close();
            await cPage.close();

        }).toPass({timeout: 100000});
    });

    test('resume second', { tag: ['@approveme', '@mattressfirm', '@happy', '@resume'] }, async ({ browser }) => {
        await expect(async () => {

            if(isApplyPass) {

                const bContR = await browser.newContext();
                const cPageR = await bContR.newPage();

                let marketingPageR = new A_MarketingPage(cPageR);
                await marketingPageR.beginResume();

                let resumePageR = new R_Resume(cPageR);
                await resumePageR.happyPathPopulate([nameFirstFetched,nameLastFetched],ssnFetched);

                let results: Q_Results = new Q_Results(cPageR);
                await results.verifySuccessApproved();

                console.log("Resume passed. End test.")

                await cPageR.close();
                await bContR.close();

            }else {
                console.log("Apply failed. Resume skipped.");
            }

        }).toPass({ timeout: 90000 });
    });

});