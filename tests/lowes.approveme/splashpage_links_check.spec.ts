import {test, Page, BrowserContext} from '@playwright/test';
import B_BeforeStartPage from '../../pages/lowes.approveme/B_BeforeStartPage';
import urls from '$utils/lowes.utils/urls';
import LowesHealthCheck from './LowesHealthCheck';

let bCont: BrowserContext;
let cPage: Page;
let isHealthyLocal: Boolean;

test.describe('lowes links', async () => {

  test.describe.configure({retries: 0});
  test.describe.configure({mode: 'parallel'});

  test.beforeAll(async ({browser}) => {
    bCont = await browser.newContext();
    cPage = await bCont.newPage();
    isHealthyLocal = await new LowesHealthCheck(cPage).isHealthy();
  });

  test.beforeEach(async ({browser}) => {
    await cPage.goto(urls.beforeYouStart.beforeYouStart);
  });

  test.afterAll(async () => {
    await cPage.close();
    await bCont.close();
  });

  test('terms', { tag: ['@lowes', '@approveme', '@happypath', '@links'] },async () => {
    test.skip(isHealthyLocal == false, 'health check FAILED; test.skip()');
    try {
      await (new B_BeforeStartPage(cPage).checkLinkTerms());
      await cPage.evaluate(_ => {}, `browserstack_executor: ${JSON.stringify({action: 'setSessionStatus',arguments: {status: 'passed',reason: 'terms'}})}`);
    }catch(Error) {
      await cPage.evaluate(_ => {}, `browserstack_executor: ${JSON.stringify({action: 'setSessionStatus',arguments: {status: 'failed',reason: Error.toString()}})}`);
    }
  });

  test('privacy', { tag: ['@lowes', '@approveme', '@happypath', '@links'] },async () => {
    test.skip(isHealthyLocal == false, 'health check FAILED; test.skip()');
    try {
      await (new B_BeforeStartPage(cPage).checkLinkPrivacy());
      await cPage.evaluate(_ => {}, `browserstack_executor: ${JSON.stringify({action: 'setSessionStatus',arguments: {status: 'passed',reason: 'privacy'}})}`);
    }catch(Error) {
      await cPage.evaluate(_ => {}, `browserstack_executor: ${JSON.stringify({action: 'setSessionStatus',arguments: {status: 'failed',reason: Error.toString()}})}`);
    }
  });

  test('disclosure', { tag: ['@lowes', '@approveme', '@happypath', '@links'], },async () => {
    test.skip(isHealthyLocal == false, 'health check FAILED; test.skip()');
    try {
      await (new B_BeforeStartPage(cPage).checkLinkDisclosure());
      await cPage.evaluate(_ => {}, `browserstack_executor: ${JSON.stringify({action: 'setSessionStatus',arguments: {status: 'passed',reason: 'disclosure'}})}`);
    }catch(Error) {
      await cPage.evaluate(_ => {}, `browserstack_executor: ${JSON.stringify({action: 'setSessionStatus',arguments: {status: 'failed',reason: Error.toString()}})}`);
    }
  });

  test('arbitration', { tag: ['@lowes', '@approveme', '@happypath', '@links'], },async () => {
    test.skip(isHealthyLocal == false, 'health check FAILED; test.skip()');
    try {
      await (new B_BeforeStartPage(cPage).checkLinkArbitration());
      await cPage.evaluate(_ => {}, `browserstack_executor: ${JSON.stringify({action: 'setSessionStatus',arguments: {status: 'passed',reason: 'arbitration'}})}`);
    }catch(Error) {
      await cPage.evaluate(_ => {}, `browserstack_executor: ${JSON.stringify({action: 'setSessionStatus',arguments: {status: 'failed',reason: Error.toString()}})}`);
    }
  });
});