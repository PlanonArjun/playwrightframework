import {test, BrowserContext, Page} from '@playwright/test';
import B_SplashPage from "../../pages/jared.approveme/B_SplashPage";
import urls from '$utils/jared.utils/urls';
import JaredHealthCheck from './JaredHealthCheck';

let bCont: BrowserContext;
let cPage: Page;
let isHealthyLocal: Boolean;

test.describe('navigation', async () => {

  test.describe.configure({ retries: 0 });
  test.describe.configure({ mode: 'parallel' });

  test.beforeAll(async ({browser}) => {
    bCont = await browser.newContext();
    cPage = await bCont.newPage();
    isHealthyLocal = await new JaredHealthCheck(cPage).isHealthy();
  });

  test.beforeEach(async ({browser}) => {
    await cPage.goto(urls.splash.splash);
  });

  test.afterAll(async () => {
    await cPage.close();
    await bCont.close();
  });

  test('photoId', { tag: ['@approveme', '@signet', '@jared', '@splashpage', '@linkscheck'] }, async () => {
    test.skip(isHealthyLocal == false, 'health check FAILED; test.skip()');
    try {
      await (new B_SplashPage(cPage)).checkLinkPhoto();
      await cPage.evaluate(_ => {}, `browserstack_executor: ${JSON.stringify({action: 'setSessionStatus',arguments: {status: 'passed', reason: 'photoId'}})}`);
    }catch(Error) {
      await cPage.evaluate(_ => {}, `browserstack_executor: ${JSON.stringify({action: 'setSessionStatus',arguments: {status: 'failed', reason: Error.toString()}})}`);
    }
  });

  test('bankInfo', { tag: ['@approveme', '@signet', '@jared', '@splashpage', '@linkscheck'] }, async () => {
    test.skip(isHealthyLocal !== true, 'health check FAILED; test.skip()');
    try {
      await (new B_SplashPage(cPage)).checkLinkBankInfo();
      await cPage.evaluate(_ => {}, `browserstack_executor: ${JSON.stringify({action: 'setSessionStatus',arguments: {status: 'passed', reason: 'bankInfo'}})}`);
    }catch(Error) {
      await cPage.evaluate(_ => {}, `browserstack_executor: ${JSON.stringify({action: 'setSessionStatus',arguments: {status: 'failed', reason: Error.toString()}})}`);
    }
  });

  test('checkbox', { tag: ['@approveme', '@signet', '@jared', '@splashpage', '@linkscheck'] }, async ({ browser }) => {
    test.skip(isHealthyLocal !== true, 'health check FAILED; test.skip()');
    try {
      let splash = new B_SplashPage(cPage);
      await splash.selectCheckbox();
      await splash.unSelectCheckbox();
      await cPage.evaluate(_ => {}, `browserstack_executor: ${JSON.stringify({action: 'setSessionStatus',arguments: {status: 'passed', reason: 'checkbox'}})}`);
    }catch(Error) {
      await cPage.evaluate(_ => {}, `browserstack_executor: ${JSON.stringify({action: 'setSessionStatus',arguments: {status: 'failed', reason: Error.toString()}})}`);
    }
  });

  test('terms', { tag: ['@approveme', '@signet', '@jared', '@splashpage', '@linkscheck'] }, async ({ browser }) => {
    test.skip(isHealthyLocal !== true, 'health check FAILED; test.skip()');
    try {
      await (new B_SplashPage(cPage)).checkLinkTerms();
      await cPage.evaluate(_ => {}, `browserstack_executor: ${JSON.stringify({action: 'setSessionStatus',arguments: {status: 'passed', reason: 'terms'}})}`);
    }catch(Error) {
      await cPage.evaluate(_ => {}, `browserstack_executor: ${JSON.stringify({action: 'setSessionStatus',arguments: {status: 'failed', reason: Error.toString()}})}`);
    }
  });

  test('privacy', { tag: ['@approveme', '@signet', '@jared', '@splashpage', '@linkscheck'] }, async ({ browser }) => {
    test.skip(isHealthyLocal !== true, 'health check FAILED; test.skip()');
    try {
      await (new B_SplashPage(cPage)).checkLinkPrivacy();
      await cPage.evaluate(_ => {}, `browserstack_executor: ${JSON.stringify({action: 'setSessionStatus',arguments: {status: 'passed', reason: 'privacy'}})}`);
    }catch(Error) {
      await cPage.evaluate(_ => {}, `browserstack_executor: ${JSON.stringify({action: 'setSessionStatus',arguments: {status: 'failed', reason: Error.toString()}})}`);
    }
  });

  test('disclosure', { tag: ['@approveme', '@signet', '@jared', '@splashpage', '@linkscheck'] }, async ({ browser }) => {
    test.skip(isHealthyLocal !== true, 'health check FAILED; test.skip()');
    try {
      await (new B_SplashPage(cPage)).checkLinkDisclosure();
      await cPage.evaluate(_ => {}, `browserstack_executor: ${JSON.stringify({action: 'setSessionStatus',arguments: {status: 'passed', reason: 'disclosure'}})}`);
    }catch(Error) {
      await cPage.evaluate(_ => {}, `browserstack_executor: ${JSON.stringify({action: 'setSessionStatus',arguments: {status: 'failed', reason: Error.toString()}})}`);
    }
  });

  test('arbitration', { tag: ['@approveme', '@signet', '@jared', '@splashpage', '@linkscheck'] }, async ({ browser }) => {
    test.skip(isHealthyLocal !== true, 'health check FAILED; test.skip()');
    try {
      await (new B_SplashPage(cPage)).checkLinkArbitration();
      await cPage.evaluate(_ => {}, `browserstack_executor: ${JSON.stringify({action: 'setSessionStatus',arguments: {status: 'passed', reason: 'arbitration'}})}`);
    }catch(Error) {
      await cPage.evaluate(_ => {}, `browserstack_executor: ${JSON.stringify({action: 'setSessionStatus',arguments: {status: 'failed', reason: Error.toString()}})}`);
    }
  });

});
