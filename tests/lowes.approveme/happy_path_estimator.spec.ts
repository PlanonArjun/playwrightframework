import test, {BrowserContext, Page} from '@playwright/test';
import A_MarketingPage from '../../pages/lowes.approveme/A_MarketingPage';
import M_LeaseEstimator from '$pages/lowes.approveme/M_LeaseEstimator';
import {PaymentFrequency} from "../../data/paymentFrequency";

let bCont: BrowserContext;
let cPage: Page;
let a_marketingPage: A_MarketingPage;
let n_estimator: M_LeaseEstimator;

test.describe('estimate', async () => {

    test.describe.configure({ retries: 0 });
    test.describe.configure({ mode: 'parallel' });
    test.setTimeout(30000);

    test.beforeEach(async ({browser}) => {
        bCont = await browser.newContext();
        cPage = await bCont.newPage();
        a_marketingPage = new A_MarketingPage(cPage);
        await a_marketingPage.navigateEstimator();
        n_estimator = new M_LeaseEstimator(cPage);
    });

    test.afterEach(async () => {
        a_marketingPage = null;
        n_estimator = null;
        await cPage.close();
        await bCont.close();
    });


    test('weekly', { tag: ['@lowes', '@approveme', '@happypath', '@estimate'] }, async () => {
        try {
            await n_estimator.happyPathEstimate('3000', PaymentFrequency.Weekly);
            await cPage.evaluate(_ => {}, `browserstack_executor: ${JSON.stringify({action: 'setSessionStatus',arguments: {status: 'passed',reason:'weekly'}})}`);
        }catch(Error) {
            await cPage.evaluate(_ => {}, `browserstack_executor: ${JSON.stringify({action: 'setSessionStatus',arguments: {status: 'failed',reason: Error.toString()}})}`);
        }
    });

    test('biweekly', { tag: ['@lowes', '@approveme', '@happypath', '@estimate'] }, async () => {
        try {
            await n_estimator.happyPathEstimate('3000', PaymentFrequency.BiWeekly);
            await cPage.evaluate(_ => {}, `browserstack_executor: ${JSON.stringify({action: 'setSessionStatus',arguments: {status: 'passed',reason:'biweekly'}})}`);
        }catch(Error) {
            await cPage.evaluate(_ => {}, `browserstack_executor: ${JSON.stringify({action: 'setSessionStatus',arguments: {status: 'failed',reason: Error.toString()}})}`);
        }
    });

    test('semimonthly', { tag: ['@lowes', '@approveme', '@happypath', '@estimate'] }, async () => {
        try {
            await n_estimator.happyPathEstimate('3000', PaymentFrequency.SemiMonthly);
            await cPage.evaluate(_ => {}, `browserstack_executor: ${JSON.stringify({action: 'setSessionStatus',arguments: {status: 'passed',reason:'semimonthly'}})}`);
        }catch(Error) {
            await cPage.evaluate(_ => {}, `browserstack_executor: ${JSON.stringify({action: 'setSessionStatus',arguments: {status: 'failed',reason: Error.toString()}})}`);
        }
    });

    test('monthly', { tag: ['@lowes', '@approveme', '@happypath', '@estimate'] }, async () => {
        try {
            await n_estimator.happyPathEstimate('3000', PaymentFrequency.Monthly);
            await cPage.evaluate(_ => {}, `browserstack_executor: ${JSON.stringify({action: 'setSessionStatus',arguments: {status: 'passed',reason:'monthly'}})}`);
        }catch(Error) {
            await cPage.evaluate(_ => {}, `browserstack_executor: ${JSON.stringify({action: 'setSessionStatus',arguments: {status: 'failed',reason: Error.toString()}})}`);
        }
    });

});