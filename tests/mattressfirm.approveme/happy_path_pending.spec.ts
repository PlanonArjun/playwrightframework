import { test, expect, BrowserContext, Page, chromium } from '@playwright/test';

import B_SplashPage from "../../pages/mattressfirm.approveme/B_SplashPage";
import C_StartAppPage from "../../pages/mattressfirm.approveme/C_StartAppPages";
import D_AboutYouPage from "../../pages/mattressfirm.approveme/D_AboutYouPage";
import E_AboutYouPage from "../../pages/mattressfirm.approveme/E_AboutYouPage";
import F_RentOwnPage from '../../pages/mattressfirm.approveme/F_RentOwnPage';
import G_IdTypePage from '../../pages/mattressfirm.approveme/G_IdTypePage';
import H_EmployeeStatusPage from '../../pages/mattressfirm.approveme/H_EmployeeStatusPage';
import I_EmployeeInfo from '../../pages/mattressfirm.approveme/I_EmployeeInfoPage';
import J_EmployeeDurationPage from '../../pages/mattressfirm.approveme/J_EmployeeDurationPage';
import K_IncomeInfoPage from '../../pages/mattressfirm.approveme/K_IncomeInfoPage';
import L_BankInfoPage from '../../pages/mattressfirm.approveme/L_BankInfoPage';
import M_BankInfoPage from '../../pages/mattressfirm.approveme/M_BankInfoPage';
import P_ConfirmSubmit from '../../pages/mattressfirm.approveme/P_ConfirmSubmit';
import Q_Results from '../../pages/mattressfirm.approveme/Q_Results';
import N_PaymentCardPage from '../../pages/mattressfirm.approveme/N_PaymentCardPage';
import O_PaymentCardPage from '../../pages/mattressfirm.approveme/O_PaymentCardPage';
import HappyPathPending from '../../data/mattressfirm.approveme/HappyPathPending';
import A_MarketingPage from '../../pages/mattressfirm.approveme/A_MarketingPage';
import MTFMHealthCheck from './MTFMHealthCheck';

let bCont: BrowserContext;
let cPage: Page;
let isHealthyLocal: Boolean;

test.describe('navigation', async () => {

    test.describe.configure({ retries: 0 });
    test.describe.configure({ mode: 'serial' });

    let getStartAppData: string[];

    test.beforeAll(async () => {
        let browserTemp = await chromium.launch({ headless: true });
        let pageTemp = await browserTemp.newPage();
        isHealthyLocal = await new MTFMHealthCheck(pageTemp).isHealthy();
        await browserTemp.close();
        await pageTemp.close();
    });

    test('happy path approved to results page - apply', {tag: ['@approveme', '@mattressfirm', '@happy', '@pending']}, async ({browser}) => {
        test.skip(isHealthyLocal == false, 'health check FAILED; test.skip()');
        await expect(async () => {

            bCont = await browser.newContext();
            cPage = await bCont.newPage();

            let a_marketingPage = new A_MarketingPage(cPage);
            await a_marketingPage.navigate()
            await a_marketingPage.beginApply();
            await cPage.waitForTimeout(1000);

            let b_splashPage = new B_SplashPage(cPage);
            await b_splashPage.continue();

            let happyPathPending = new HappyPathPending();

            let c_startAppPage = new C_StartAppPage(cPage);

            getStartAppData = happyPathPending.getStartAppData;

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
                console.log("MTFM pending passed");
                await cPage.evaluate(_ => {}, `browserstack_executor: ${JSON.stringify({action: 'setSessionStatus',arguments: {status: 'passed',reason: 'pending'}})}`);
            }catch(Error) {
                await cPage.evaluate(_ => {}, `browserstack_executor: ${JSON.stringify({action: 'setSessionStatus',arguments: {status: 'failed',reason: Error.toString()}})}`);
            }finally {
                await bCont.close();
                await cPage.close();
            }
        }).toPass({timeout: 120000});
    });
});