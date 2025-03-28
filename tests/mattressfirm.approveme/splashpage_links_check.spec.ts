import { test, expect, BrowserContext, Page, chromium } from '@playwright/test';
import B_SplashPage from "../../pages/mattressfirm.approveme/B_SplashPage";
import MTFMHealthCheck from './MTFMHealthCheck';

test.describe('navigation', async () => {

  test.describe.configure({ retries: 0 });
  test.describe.configure({ mode: 'parallel' });

  let bCont: BrowserContext;
  let cPage: Page;
  let isHealthyLocal: Boolean;
  let splashPageLocal: B_SplashPage;

  test.beforeAll(async () => {
    let browserTemp = await chromium.launch({ headless: true });
    let pageTemp = await browserTemp.newPage();
    isHealthyLocal = await new MTFMHealthCheck(pageTemp).isHealthy();
    await browserTemp.close();
    await pageTemp.close();
  });

  test.beforeEach(async ({browser}) => {
    bCont = await browser.newContext();
    cPage = await bCont.newPage();
    splashPageLocal = new B_SplashPage(cPage);
    await splashPageLocal.navigate();
  });

  test.afterAll(async () => {
    splashPageLocal = null;
    await cPage.close();
    await bCont.close();
  });

  test('photoId', { tag: ['@approveme', '@mattressfirm', '@splashpage', '@linkscheck'] },async () => {
    test.skip(isHealthyLocal == false, 'health check FAILED; test.skip()');
    try {
      await splashPageLocal.checkLinkPhoto();
      await cPage.evaluate(_ => {}, `browserstack_executor: ${JSON.stringify({action: 'setSessionStatus',arguments: {status: 'passed',reason: 'photoId'}})}`);
    }catch(Error) {
      await cPage.evaluate(_ => {}, `browserstack_executor: ${JSON.stringify({action: 'setSessionStatus',arguments: {status: 'failed',reason: Error.toString()}})}`);
    }
  });

  test('bankInfo', { tag: ['@approveme', '@mattressfirm', '@splashpage', '@linkscheck'] },async () => {
    test.skip(isHealthyLocal == false, 'health check FAILED; test.skip()');
    try {
      await splashPageLocal.checkLinkBankInfo();
      await cPage.evaluate(_ => {}, `browserstack_executor: ${JSON.stringify({action: 'setSessionStatus',arguments: {status: 'passed',reason: 'bankInfo'}})}`);
    }catch(Error) {
      await cPage.evaluate(_ => {}, `browserstack_executor: ${JSON.stringify({action: 'setSessionStatus',arguments: {status: 'failed',reason: Error.toString()}})}`);
    }
  });

  test('checkbox', { tag: ['@approveme', '@mattressfirm', '@splashpage', '@linkscheck'] },async () => {
    test.skip(isHealthyLocal == false, 'health check FAILED; test.skip()');
    try {
      await splashPageLocal.selectCheckbox();
      await splashPageLocal.unSelectCheckbox();
      await cPage.evaluate(_ => {}, `browserstack_executor: ${JSON.stringify({action: 'setSessionStatus',arguments: {status: 'passed',reason: 'checkbox'}})}`);
    }catch(Error) {
      await cPage.evaluate(_ => {}, `browserstack_executor: ${JSON.stringify({action: 'setSessionStatus',arguments: {status: 'failed',reason: Error.toString()}})}`);
    }
  });

  test('terms', { tag: ['@approveme', '@mattressfirm', '@splashpage', '@linkscheck'] },async () => {
    test.skip(isHealthyLocal == false, 'health check FAILED; test.skip()');
    try {
      await splashPageLocal.checkLinkTerms();
      await cPage.evaluate(_ => {}, `browserstack_executor: ${JSON.stringify({action: 'setSessionStatus',arguments: {status: 'passed',reason: 'terms'}})}`);
    }catch(Error) {
      await cPage.evaluate(_ => {}, `browserstack_executor: ${JSON.stringify({action: 'setSessionStatus',arguments: {status: 'failed',reason: Error.toString()}})}`);
    }
  });

  test('privacy', { tag: ['@approveme', '@mattressfirm', '@splashpage', '@linkscheck'] },async () => {
    test.skip(isHealthyLocal == false, 'health check FAILED; test.skip()');
    try {
      await splashPageLocal.checkLinkPrivacy();
      await cPage.evaluate(_ => {}, `browserstack_executor: ${JSON.stringify({action: 'setSessionStatus',arguments: {status: 'passed',reason: 'privacy'}})}`);
    }catch(Error) {
      await cPage.evaluate(_ => {}, `browserstack_executor: ${JSON.stringify({action: 'setSessionStatus',arguments: {status: 'failed',reason: Error.toString()}})}`);
    }
  });

  test('disclosure', { tag: ['@approveme', '@mattressfirm', '@splashpage', '@linkscheck'] },async () => {
    test.skip(isHealthyLocal == false, 'health check FAILED; test.skip()');
    try {
      await splashPageLocal.checkLinkDisclosure();
      await cPage.evaluate(_ => {}, `browserstack_executor: ${JSON.stringify({action: 'setSessionStatus',arguments: {status: 'passed',reason: 'disclosure'}})}`);
    }catch(Error) {
      await cPage.evaluate(_ => {}, `browserstack_executor: ${JSON.stringify({action: 'setSessionStatus',arguments: {status: 'failed',reason: Error.toString()}})}`);
    }
  });

  test('arbitration', { tag: ['@approveme', '@mattressfirm', '@splashpage', '@linkscheck'] },async ({browser}) => {
    test.skip(isHealthyLocal == false, 'health check FAILED; test.skip()');
    try {
      await splashPageLocal.checkLinkArbitration();
      await cPage.evaluate(_ => {}, `browserstack_executor: ${JSON.stringify({action: 'setSessionStatus',arguments: {status: 'passed',reason: 'arbitration'}})}`);
    }catch(Error) {
      await cPage.evaluate(_ => {}, `browserstack_executor: ${JSON.stringify({action: 'setSessionStatus',arguments: {status: 'failed',reason: Error.toString()}})}`);
    }
  });

});