import {test, expect, BrowserContext, Page} from '@playwright/test';
import B_SplashPage from "../../pages/jared.approveme/B_SplashPage";

let bCont: BrowserContext;
let cPage: Page;
let splashPageLocal: B_SplashPage;

test.describe('navigation', async () => {

  test.describe.configure({ retries: 0 });
  test.describe.configure({ mode: 'parallel' });

  test.beforeEach(async ({page, browser}) => {
    bCont = await browser.newContext();
    cPage = await bCont.newPage();
    splashPageLocal = new B_SplashPage(cPage);
    await splashPageLocal.navigate();
  });

  test.afterEach(async () => {
    await cPage.close();
    await bCont.close();
  });

  test('photoId', { tag: ['@approveme', '@signet', '@jared', '@splashpage', '@linkscheck'] }, async ({ browser }) => {
    try {
      await splashPageLocal.checkLinkPhoto();
      await cPage.evaluate(_ => {}, `browserstack_executor: ${JSON.stringify({action: 'setSessionStatus',arguments: {status: 'passed', reason: 'photoId'}})}`);
    }catch(Error) {
      await cPage.evaluate(_ => {}, `browserstack_executor: ${JSON.stringify({action: 'setSessionStatus',arguments: {status: 'failed', reason: Error.toString()}})}`);
    }
  });

  test('bankInfo', { tag: ['@approveme', '@signet', '@jared', '@splashpage', '@linkscheck'] }, async ({ browser }) => {
    try {
      await splashPageLocal.checkLinkBankInfo();
      await cPage.evaluate(_ => {}, `browserstack_executor: ${JSON.stringify({action: 'setSessionStatus',arguments: {status: 'passed', reason: 'bankInfo'}})}`);
    }catch(Error) {
      await cPage.evaluate(_ => {}, `browserstack_executor: ${JSON.stringify({action: 'setSessionStatus',arguments: {status: 'failed', reason: Error.toString()}})}`);
    }
  });

  test('checkbox', { tag: ['@approveme', '@signet', '@jared', '@splashpage', '@linkscheck'] }, async ({ browser }) => {
    try {
      await splashPageLocal.selectCheckbox();
      await splashPageLocal.unSelectCheckbox();
      await cPage.evaluate(_ => {}, `browserstack_executor: ${JSON.stringify({action: 'setSessionStatus',arguments: {status: 'passed', reason: 'checkbox'}})}`);
    }catch(Error) {
      await cPage.evaluate(_ => {}, `browserstack_executor: ${JSON.stringify({action: 'setSessionStatus',arguments: {status: 'failed', reason: Error.toString()}})}`);
    }
  });

  test('terms', { tag: ['@approveme', '@signet', '@jared', '@splashpage', '@linkscheck'] }, async ({ browser }) => {
    try {
      await splashPageLocal.checkLinkTerms();
      await cPage.evaluate(_ => {}, `browserstack_executor: ${JSON.stringify({action: 'setSessionStatus',arguments: {status: 'passed', reason: 'terms'}})}`);
    }catch(Error) {
      await cPage.evaluate(_ => {}, `browserstack_executor: ${JSON.stringify({action: 'setSessionStatus',arguments: {status: 'failed', reason: Error.toString()}})}`);
    }
  });

  test('privacy', { tag: ['@approveme', '@signet', '@jared', '@splashpage', '@linkscheck'] }, async ({ browser }) => {
    try {
      await splashPageLocal.checkLinkPrivacy();
      await cPage.evaluate(_ => {}, `browserstack_executor: ${JSON.stringify({action: 'setSessionStatus',arguments: {status: 'passed', reason: 'privacy'}})}`);
    }catch(Error) {
      await cPage.evaluate(_ => {}, `browserstack_executor: ${JSON.stringify({action: 'setSessionStatus',arguments: {status: 'failed', reason: Error.toString()}})}`);
    }
  });

  test('disclosure', { tag: ['@approveme', '@signet', '@jared', '@splashpage', '@linkscheck'] }, async ({ browser }) => {
    try {
      await splashPageLocal.checkLinkDisclosure();
      await cPage.evaluate(_ => {}, `browserstack_executor: ${JSON.stringify({action: 'setSessionStatus',arguments: {status: 'passed', reason: 'disclosure'}})}`);
    }catch(Error) {
      await cPage.evaluate(_ => {}, `browserstack_executor: ${JSON.stringify({action: 'setSessionStatus',arguments: {status: 'failed', reason: Error.toString()}})}`);
    }
  });

  test('arbitration', { tag: ['@approveme', '@signet', '@jared', '@splashpage', '@linkscheck'] }, async ({ browser }) => {
    try {
      await splashPageLocal.checkLinkArbitration();
      await cPage.evaluate(_ => {}, `browserstack_executor: ${JSON.stringify({action: 'setSessionStatus',arguments: {status: 'passed', reason: 'arbitration'}})}`);
    }catch(Error) {
      await cPage.evaluate(_ => {}, `browserstack_executor: ${JSON.stringify({action: 'setSessionStatus',arguments: {status: 'failed', reason: Error.toString()}})}`);
    }
  });

});
