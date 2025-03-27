import test, {BrowserContext, Page} from '@playwright/test';
import A_MarketingPage from '../../pages/mattressfirm.approveme/A_MarketingPage';
import S_PaymentEstimator from '../../pages/mattressfirm.approveme/S_PaymentEstimator';
import {PaymentFrequency} from "../../data/paymentFrequency";
import MTFMHealthCheck from './MTFMHealthCheck';

let bCont: BrowserContext;
let cPage: Page;
let isHealthyLocal: Boolean;

let a_marketingPage: A_MarketingPage;
let s_estimator: S_PaymentEstimator;

test.describe('estimate', async () => {

    test.describe.configure({ retries: 0 });
    test.describe.configure({ mode: 'parallel' });
    test.setTimeout(30000);

    test.beforeAll(async ({browser}) => {
        bCont = await browser.newContext();
        cPage = await bCont.newPage();
        isHealthyLocal = await new MTFMHealthCheck(cPage).isHealthy();
    });

    test.beforeEach(async ({browser}) => {
        a_marketingPage = new A_MarketingPage(cPage);
        await a_marketingPage.navigate();
        await a_marketingPage.beginEstimate();
        s_estimator = new S_PaymentEstimator(cPage);
    });

    test.afterEach(async () => {
        await cPage.close();
        await bCont.close();
    });

    test('weekly', { tag: ['@mattressfirm', '@approveme', '@happypath', '@estimate'] }, async () => {
        test.skip(isHealthyLocal == false, 'health check FAILED; test.skip()');
        try {
                await s_estimator.happyPathEstimate('2999', PaymentFrequency.Weekly/*, 'TX'*/);
                await cPage.evaluate(_ => {}, `browserstack_executor: ${JSON.stringify({action: 'setSessionStatus',arguments: {status: 'passed',reason: 'weekly'}})}`);
            }catch(Error) {
                await cPage.evaluate(_ => {}, `browserstack_executor: ${JSON.stringify({action: 'setSessionStatus',arguments: {status: 'failed',reason: Error.toString()}})}`);
            }
    });

    test('biweekly', { tag: ['@mattressfirm', '@approveme', '@happypath', '@estimate'] }, async () => {
        test.skip(isHealthyLocal == false, 'health check FAILED; test.skip()');
            try {
                await s_estimator.happyPathEstimate('5000', PaymentFrequency.BiWeekly/*, 'ND'*/);
                await cPage.evaluate(_ => {}, `browserstack_executor: ${JSON.stringify({action: 'setSessionStatus',arguments: {status: 'passed',reason: 'biweekly'}})}`);
            }catch(Error) {
                await cPage.evaluate(_ => {}, `browserstack_executor: ${JSON.stringify({action: 'setSessionStatus',arguments: {status: 'failed',reason: Error.toString()}})}`);
            }
    });

    test('semimonthly', { tag: ['@mattressfirm', '@approveme', '@happypath', '@estimate'] }, async () => {
        test.skip(isHealthyLocal == false, 'health check FAILED; test.skip()');
        try {
            await s_estimator.happyPathEstimate('4000', PaymentFrequency.SemiMonthly/*, 'ME'*/);
            await cPage.evaluate(_ => {}, `browserstack_executor: ${JSON.stringify({action: 'setSessionStatus',arguments: {status: 'passed',reason: 'semimonthly'}})}`);
        }catch(Error) {
            await cPage.evaluate(_ => {}, `browserstack_executor: ${JSON.stringify({action: 'setSessionStatus',arguments: {status: 'failed',reason: Error.toString()}})}`);
        }
    });

    test('monthly', { tag: ['@mattressfirm', '@approveme', '@happypath', '@estimate'] }, async () => {
        test.skip(isHealthyLocal == false, 'health check FAILED; test.skip()');
        try {
            await s_estimator.happyPathEstimate('3001', PaymentFrequency.Monthly/*, 'UT'*/);
            await cPage.evaluate(_ => {}, `browserstack_executor: ${JSON.stringify({action: 'setSessionStatus',arguments: {status: 'passed',reason: 'monthly'}})}`);
        }catch(Error) {
            await cPage.evaluate(_ => {}, `browserstack_executor: ${JSON.stringify({action: 'setSessionStatus',arguments: {status: 'failed',reason: Error.toString()}})}`);
        }
    });

});