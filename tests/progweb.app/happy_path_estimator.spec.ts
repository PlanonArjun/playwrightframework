import { test, expect, BrowserContext, Page } from '@playwright/test';
import A_LoginPage from '../../pages/progweb.app/A_LoginPage';
import B_SelectShop from '../../pages/progweb.app/B_SelectShop';
import HappyPathApproved from 'data/progweb.approveme/HappyPathApproved';
import I_PaymentEstimator from '$pages/progweb.app/K_PaymentEstimator';
import { PaymentFrequency } from 'data/paymentFrequency';

test.describe('navigation', async () => {

    test.describe.configure({ retries: 0 });
    test.describe.configure({ mode: 'parallel' });

    let approvedDataset: HappyPathApproved;

    let bCont: BrowserContext;
    let cPage: Page;

    let loginPage: A_LoginPage;
    let selectShop: B_SelectShop;
    let paymentEstimator: I_PaymentEstimator;

    test.beforeAll(async () => {
        approvedDataset = new HappyPathApproved();
    });

    test.beforeEach(async ({browser}) => {
        bCont = await browser.newContext();
        cPage = await bCont.newPage();
        loginPage = new A_LoginPage(cPage);
        await loginPage.happyPathPopulate(approvedDataset.getLoginData);
        selectShop = new B_SelectShop(cPage);
        await selectShop.clickForShop();
        await selectShop.navigateLocation();
        await selectShop._selectCityWithCode(approvedDataset.getShopDetails[0]);
        await selectShop._selectOnline();
        await selectShop._selectShopName();
        await cPage.waitForTimeout(1000);
        paymentEstimator = new I_PaymentEstimator(cPage);
    });

    test.afterEach(async () => {
        await cPage.close();
        await bCont.close();
    });

    test('estimate Every week', { tag: ['@progweb','@estimate'] }, async () => {
        await expect(async () => {
            try {
                await paymentEstimator.happyPathEstimate('2999', PaymentFrequency.Weekly);
                await cPage.evaluate(_ => {}, `browserstack_executor: ${JSON.stringify({action: 'setSessionStatus',arguments: {status: 'passed',reason: 'weekly'}})}`);
            }catch(Error) {
                await cPage.evaluate(_ => {}, `browserstack_executor: ${JSON.stringify({action: 'setSessionStatus',arguments: {status: 'failed',reason: Error.toString()}})}`);
            }
        }).toPass({ timeout: 400000 });
    });

    test('estimate twice a week', { tag: ['@progweb','@estimate'] }, async () => {
        await expect(async () => {
            try {
                await paymentEstimator.happyPathEstimate('2999', PaymentFrequency.BiWeekly);
                await cPage.evaluate(_ => {}, `browserstack_executor: ${JSON.stringify({action: 'setSessionStatus',arguments: {status: 'passed',reason: 'biweekly'}})}`);
            }catch(Error) {
                await cPage.evaluate(_ => {}, `browserstack_executor: ${JSON.stringify({action: 'setSessionStatus',arguments: {status: 'failed',reason: Error.toString()}})}`);
            }
        }).toPass({ timeout: 400000 });
    });

    test('estimate twice a month', { tag: ['@progweb','@estimate'] }, async () => {
        await expect(async () => {
            try {
                await paymentEstimator.happyPathEstimate('2999', PaymentFrequency.SemiMonthly);
                await cPage.evaluate(_ => {}, `browserstack_executor: ${JSON.stringify({action: 'setSessionStatus',arguments: {status: 'passed',reason: 'semimonthly'}})}`);
            }catch(Error) {
                await cPage.evaluate(_ => {}, `browserstack_executor: ${JSON.stringify({action: 'setSessionStatus',arguments: {status: 'failed',reason: Error.toString()}})}`);
            }
        }).toPass({ timeout: 400000 });
    });

    test('estimate monthly', { tag: ['@progweb','@estimate'] }, async () => {
        await expect(async () => {
            try {
                await paymentEstimator.happyPathEstimate('2999', PaymentFrequency.Monthly);
                await cPage.evaluate(_ => {}, `browserstack_executor: ${JSON.stringify({action: 'setSessionStatus',arguments: {status: 'passed',reason: 'monthly'}})}`);
            }catch(Error) {
                await cPage.evaluate(_ => {}, `browserstack_executor: ${JSON.stringify({action: 'setSessionStatus',arguments: {status: 'failed',reason: Error.toString()}})}`);
            }
        }).toPass({ timeout: 400000 });
    });
});