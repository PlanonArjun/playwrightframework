import {test, expect, BrowserContext, Page} from '@playwright/test';
import A_MarketingPage from "../../pages/lowes.approveme/A_Marketingpage";
import B_BeforeStartPage from '../../pages/lowes.approveme/B_BeforeStartPage';

test.describe('lowes links', async () => {

  test.describe.configure({ retries: 0 });
  test.describe.configure({ mode: 'parallel' });

  let bCont: BrowserContext;
  let cPage: Page;
  let a_marketingPage: A_MarketingPage;
  let b_beforeStartPage: B_BeforeStartPage;

  test.beforeEach(async ({browser}) => {
    bCont = await browser.newContext();
    cPage = await bCont.newPage();
    a_marketingPage = new A_MarketingPage(cPage);
    b_beforeStartPage = new B_BeforeStartPage(cPage);
    await a_marketingPage.navigate();
  });

  test.afterEach(async () => {
    a_marketingPage = null;
    b_beforeStartPage = null;
    await cPage.close();
    await bCont.close();
  });

  test('terms', { tag: ['@lowes', '@approveme', '@happypath', '@links'] },async () => {
    await expect(async () => {
      try {
        await b_beforeStartPage.checkLinkTerms();
        await cPage.evaluate(_ => {}, `browserstack_executor: ${JSON.stringify({action: 'setSessionStatus',arguments: {status: 'passed',reason: 'terms'}})}`);
      }catch(Error) {
        await cPage.evaluate(_ => {}, `browserstack_executor: ${JSON.stringify({action: 'setSessionStatus',arguments: {status: 'failed',reason: Error.toString()}})}`);
      }
    }).toPass({timeout: 20000});
  });

  test('privacy', { tag: ['@lowes', '@approveme', '@happypath', '@links'] },async () => {
    await expect(async () => {
      try {
        await b_beforeStartPage.checkLinkPrivacy();
        await cPage.evaluate(_ => {}, `browserstack_executor: ${JSON.stringify({action: 'setSessionStatus',arguments: {status: 'passed',reason: 'privacy'}})}`);
      }catch(Error) {
        await cPage.evaluate(_ => {}, `browserstack_executor: ${JSON.stringify({action: 'setSessionStatus',arguments: {status: 'failed',reason: Error.toString()}})}`);
      }
    }).toPass({timeout: 20000});
  });

  test('disclosure', { tag: ['@lowes', '@approveme', '@happypath', '@links'], },async () => {
    await expect(async () => {
      try {
        await b_beforeStartPage.checkLinkDisclosure();
        await cPage.evaluate(_ => {}, `browserstack_executor: ${JSON.stringify({action: 'setSessionStatus',arguments: {status: 'passed',reason: 'disclosure'}})}`);
      }catch(Error) {
        await cPage.evaluate(_ => {}, `browserstack_executor: ${JSON.stringify({action: 'setSessionStatus',arguments: {status: 'failed',reason: Error.toString()}})}`);
      }
    }).toPass({timeout: 20000});
  });

  test('arbitration', { tag: ['@lowes', '@approveme', '@happypath', '@links'], },async () => {
    await expect(async () => {
      try {
        await b_beforeStartPage.checkLinkArbitration();
        await cPage.evaluate(_ => {}, `browserstack_executor: ${JSON.stringify({action: 'setSessionStatus',arguments: {status: 'passed',reason: 'arbitration'}})}`);
      }catch(Error) {
        await cPage.evaluate(_ => {}, `browserstack_executor: ${JSON.stringify({action: 'setSessionStatus',arguments: {status: 'failed',reason: Error.toString()}})}`);
      }
    }).toPass({timeout: 20000});

  });

});