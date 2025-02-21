import test, {BrowserContext, Page} from '@playwright/test';
import A_MarketingPage from '../../pages/mattressfirm.approveme/A_MarketingPage';
import S_PaymentEstimator from '../../pages/mattressfirm.approveme/S_PaymentEstimator';
import {PaymentFrequency} from "../../data/paymentFrequency";

let bCont: BrowserContext;
let cPage: Page;
let a_marketingPage: A_MarketingPage;
let s_estimator: S_PaymentEstimator;

test.describe('estimate', async () => {

    test.describe.configure({ retries: 0 });
    test.describe.configure({ mode: 'parallel' });
    test.setTimeout(30000);

    test.beforeEach(async ({browser}) => {
        bCont = await browser.newContext();
        cPage = await bCont.newPage();
        a_marketingPage = new A_MarketingPage(cPage);
        await a_marketingPage.navigate();
        s_estimator = new S_PaymentEstimator(cPage);
    });

    test.afterEach(async () => {
        await cPage.close();
        await bCont.close();
    });

    test('weekly', { tag: ['@mattressfirm', '@approveme', '@happypath', '@estimate'] }, async () => {
        try {
                await s_estimator.happyPathEstimate('2999', PaymentFrequency.Weekly);
                await cPage.evaluate(_ => {}, `browserstack_executor: ${JSON.stringify({action: 'setSessionStatus',arguments: {status: 'passed',reason: 'weekly'}})}`);
            }catch(Error) {
                await cPage.evaluate(_ => {}, `browserstack_executor: ${JSON.stringify({action: 'setSessionStatus',arguments: {status: 'failed',reason: Error.toString()}})}`);
            }
    });

    test('biweekly', { tag: ['@mattressfirm', '@approveme', '@happypath', '@estimate'] }, async () => {
            try {
                await s_estimator.happyPathEstimate('5000', PaymentFrequency.BiWeekly);
                await cPage.evaluate(_ => {}, `browserstack_executor: ${JSON.stringify({action: 'setSessionStatus',arguments: {status: 'passed',reason: 'biweekly'}})}`);
            }catch(Error) {
                await cPage.evaluate(_ => {}, `browserstack_executor: ${JSON.stringify({action: 'setSessionStatus',arguments: {status: 'failed',reason: Error.toString()}})}`);
            }
    });

    test('semimonthly', { tag: ['@mattressfirm', '@approveme', '@happypath', '@estimate'] }, async () => {
        try {
            await s_estimator.happyPathEstimate('4000', PaymentFrequency.SemiMonthly);
            await cPage.evaluate(_ => {}, `browserstack_executor: ${JSON.stringify({action: 'setSessionStatus',arguments: {status: 'passed',reason: 'semimonthly'}})}`);
        }catch(Error) {
            await cPage.evaluate(_ => {}, `browserstack_executor: ${JSON.stringify({action: 'setSessionStatus',arguments: {status: 'failed',reason: Error.toString()}})}`);
        }
    });

    test('monthly', { tag: ['@mattressfirm', '@approveme', '@happypath', '@estimate'] }, async () => {
        try {
            await s_estimator.happyPathEstimate('3001', PaymentFrequency.Monthly);
            await cPage.evaluate(_ => {}, `browserstack_executor: ${JSON.stringify({action: 'setSessionStatus',arguments: {status: 'passed',reason: 'monthly'}})}`);
        }catch(Error) {
            await cPage.evaluate(_ => {}, `browserstack_executor: ${JSON.stringify({action: 'setSessionStatus',arguments: {status: 'failed',reason: Error.toString()}})}`);
        }
    });

});