import {test, BrowserContext, Page} from '@playwright/test';
import A_MarketingPage from "../../pages/cricket.approveme/A_MarketingPage";
import R_PaymentEstimator from "$pages/cricket.approveme/xR_PaymentEstimator";
import {PaymentFrequency} from "../../data/paymentFrequency";

test.describe('Cricket estimator', async () => {

  test.describe.configure({ retries: 0 });
  test.describe.configure({ mode: 'parallel' });

  let bCont: BrowserContext;
  let cPage: Page;
  let a_marketingPage: A_MarketingPage;
  let r_estimator: R_PaymentEstimator;

  test.beforeEach(async ({browser}) => {
    bCont = await browser.newContext();
    cPage = await bCont.newPage();
  });

  test.afterEach(async () => {
    await cPage.close();
    await bCont.close();
  });

  test('weekly', { tag: ['@approveme', '@cricketwireless', '@estimator'] },async () => {
    a_marketingPage = new A_MarketingPage(cPage);
    await a_marketingPage.beginEstimate();
    r_estimator = new R_PaymentEstimator(cPage);
    try {
      await r_estimator.happyPathEstimate('3001',PaymentFrequency.Weekly);
      await cPage.evaluate(_ => {}, `browserstack_executor: ${JSON.stringify({action: 'setSessionStatus',arguments: {status: 'passed',reason:'weekly'}})}`);
    }catch(Error) {
      await cPage.evaluate(_ => {}, `browserstack_executor: ${JSON.stringify({action: 'setSessionStatus',arguments: {status: 'failed',reason: Error.toString()}})}`);
    }
  });

  test('monthly', { tag: ['@approveme', '@cricketwireless', '@estimator'] },async () => {
    a_marketingPage = new A_MarketingPage(cPage);
    await a_marketingPage.beginEstimate();
    r_estimator = new R_PaymentEstimator(cPage);
    try {
      await r_estimator.happyPathEstimate('3001',PaymentFrequency.Monthly);
      await cPage.evaluate(_ => {}, `browserstack_executor: ${JSON.stringify({action: 'setSessionStatus',arguments: {status: 'passed',reason:'monthly'}})}`);
    }catch(Error) {
      await cPage.evaluate(_ => {}, `browserstack_executor: ${JSON.stringify({action: 'setSessionStatus',arguments: {status: 'failed',reason: Error.toString()}})}`);
    }
  });

  test('semimonthly', { tag: ['@approveme', '@cricketwireless', '@estimator'] },async () => {
    a_marketingPage = new A_MarketingPage(cPage);
    await a_marketingPage.beginEstimate();
    r_estimator = new R_PaymentEstimator(cPage);
    try {
      await r_estimator.happyPathEstimate('3001',PaymentFrequency.SemiMonthly);
      await cPage.evaluate(_ => {}, `browserstack_executor: ${JSON.stringify({action: 'setSessionStatus',arguments: {status: 'passed',reason:'semimonthly'}})}`);
    }catch(Error) {
      await cPage.evaluate(_ => {}, `browserstack_executor: ${JSON.stringify({action: 'setSessionStatus',arguments: {status: 'failed',reason: Error.toString()}})}`);
    }
  });

  test('biweekly', { tag: ['@approveme', '@cricketwireless', '@estimator'] },async () => {
    a_marketingPage = new A_MarketingPage(cPage);
    await a_marketingPage.beginEstimate();
    r_estimator = new R_PaymentEstimator(cPage);
    try {
      await r_estimator.happyPathEstimate('3001',PaymentFrequency.BiWeekly);
      await cPage.evaluate(_ => {}, `browserstack_executor: ${JSON.stringify({action: 'setSessionStatus',arguments: {status: 'passed',reason:'biweekly'}})}`);
    }catch(Error) {
      await cPage.evaluate(_ => {}, `browserstack_executor: ${JSON.stringify({action: 'setSessionStatus',arguments: {status: 'failed',reason: Error.toString()}})}`);
    }
  });

});