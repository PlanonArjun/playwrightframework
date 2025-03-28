import { test, BrowserContext, Page, chromium } from '@playwright/test';
import A_MarketingPage from "../../pages/cricket.approveme/A_MarketingPage";
import R_PaymentEstimator from "$pages/cricket.approveme/M_PaymentEstimator";
import {PaymentFrequency} from "../../data/paymentFrequency";
import CricketHealthCheck from './CricketHealthCheck';

test.describe('Cricket estimator', async () => {

  test.describe.configure({ retries: 0 });
  test.describe.configure({ mode: 'parallel' });

  let bCont: BrowserContext;
  let cPage: Page;
  let r_estimator: R_PaymentEstimator;
  let isHealthyLocal: Boolean;

  test.beforeAll(async () => {
    let browserTemp = await chromium.launch({ headless: true });
    let pageTemp = await browserTemp.newPage();
    isHealthyLocal = await new CricketHealthCheck(pageTemp).isHealthy();
    await browserTemp.close();
    await pageTemp.close();
  });

  test.beforeEach(async ({browser}) => {
    bCont = await browser.newContext();
    cPage = await bCont.newPage();
    await (new A_MarketingPage(cPage)).beginEstimate();
    r_estimator = new R_PaymentEstimator(cPage);
  });

  test.afterEach(async () => {
    await cPage.close();
    await bCont.close();
  });

  test('weekly', { tag: ['@approveme', '@cricketwireless', '@estimator'] },async () => {
    test.skip(isHealthyLocal == false, 'health check FAILED; test.skip()');
    try {
      await r_estimator.happyPathEstimate('3001',PaymentFrequency.Weekly);
      await cPage.evaluate(_ => {}, `browserstack_executor: ${JSON.stringify({action: 'setSessionStatus',arguments: {status: 'passed',reason:'weekly'}})}`);
    }catch(Error) {
      await cPage.evaluate(_ => {}, `browserstack_executor: ${JSON.stringify({action: 'setSessionStatus',arguments: {status: 'failed',reason: Error.toString()}})}`);
    }
  });

  test('monthly', { tag: ['@approveme', '@cricketwireless', '@estimator'] },async () => {
    test.skip(isHealthyLocal == false, 'health check FAILED; test.skip()');
    try {
      await r_estimator.happyPathEstimate('3001',PaymentFrequency.Monthly);
      await cPage.evaluate(_ => {}, `browserstack_executor: ${JSON.stringify({action: 'setSessionStatus',arguments: {status: 'passed',reason:'monthly'}})}`);
    }catch(Error) {
      await cPage.evaluate(_ => {}, `browserstack_executor: ${JSON.stringify({action: 'setSessionStatus',arguments: {status: 'failed',reason: Error.toString()}})}`);
    }
  });

  test('semimonthly', { tag: ['@approveme', '@cricketwireless', '@estimator'] },async () => {
    test.skip(isHealthyLocal == false, 'health check FAILED; test.skip()');
    try {
      await r_estimator.happyPathEstimate('3001',PaymentFrequency.SemiMonthly);
      await cPage.evaluate(_ => {}, `browserstack_executor: ${JSON.stringify({action: 'setSessionStatus',arguments: {status: 'passed',reason:'semimonthly'}})}`);
    }catch(Error) {
      await cPage.evaluate(_ => {}, `browserstack_executor: ${JSON.stringify({action: 'setSessionStatus',arguments: {status: 'failed',reason: Error.toString()}})}`);
    }
  });

  test('biweekly', { tag: ['@approveme', '@cricketwireless', '@estimator'] },async () => {
    test.skip(isHealthyLocal == false, 'health check FAILED; test.skip()');
    try {
      await r_estimator.happyPathEstimate('3001',PaymentFrequency.BiWeekly);
      await cPage.evaluate(_ => {}, `browserstack_executor: ${JSON.stringify({action: 'setSessionStatus',arguments: {status: 'passed',reason:'biweekly'}})}`);
    }catch(Error) {
      await cPage.evaluate(_ => {}, `browserstack_executor: ${JSON.stringify({action: 'setSessionStatus',arguments: {status: 'failed',reason: Error.toString()}})}`);
    }
  });

});