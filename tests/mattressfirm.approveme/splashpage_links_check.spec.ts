import {test, expect, BrowserContext, Page} from '@playwright/test';
import B_SplashPage from "../../pages/mattressfirm.approveme/B_SplashPage";

test.describe('navigation', async () => {

  test.describe.configure({ retries: 0 });
  test.describe.configure({ mode: 'parallel' });

  let bCont: BrowserContext;
  let cPage: Page;
  let splashPageLocal: B_SplashPage;

  test.beforeEach(async ({browser}) => {
    bCont = await browser.newContext();
    cPage = await bCont.newPage();
    splashPageLocal = new B_SplashPage(cPage);
    await splashPageLocal.navigate();

  });

  test.afterEach(async () => {
    splashPageLocal = null;
    await cPage.close();
    await bCont.close();
  });

  test('photoId', { tag: ['@approveme', '@mattressfirm', '@splashpage', '@linkscheck'] },async () => {
    await expect(async () => {
      try {
        await splashPageLocal.checkLinkPhoto();
        await cPage.evaluate(_ => {}, `browserstack_executor: ${JSON.stringify({action: 'setSessionStatus',arguments: {status: 'passed',reason: 'photoId'}})}`);
      }catch(Error) {
        await cPage.evaluate(_ => {}, `browserstack_executor: ${JSON.stringify({action: 'setSessionStatus',arguments: {status: 'failed',reason: Error.toString()}})}`);
      }
    }).toPass({timeout: 25000});
  });

  test('bankInfo', { tag: ['@approveme', '@mattressfirm', '@splashpage', '@linkscheck'] },async () => {
    await expect(async () => {
      try {
        await splashPageLocal.checkLinkBankInfo();
        await cPage.evaluate(_ => {}, `browserstack_executor: ${JSON.stringify({action: 'setSessionStatus',arguments: {status: 'passed',reason: 'bankInfo'}})}`);
      }catch(Error) {
        await cPage.evaluate(_ => {}, `browserstack_executor: ${JSON.stringify({action: 'setSessionStatus',arguments: {status: 'failed',reason: Error.toString()}})}`);
      }
    }).toPass({timeout: 25000});
  });

  test('checkbox', { tag: ['@approveme', '@mattressfirm', '@splashpage', '@linkscheck'] },async () => {
    await expect(async () => {
      try {
        await splashPageLocal.selectCheckbox();
        await splashPageLocal.unSelectCheckbox();
        await cPage.evaluate(_ => {}, `browserstack_executor: ${JSON.stringify({action: 'setSessionStatus',arguments: {status: 'passed',reason: 'checkbox'}})}`);
      }catch(Error) {
        await cPage.evaluate(_ => {}, `browserstack_executor: ${JSON.stringify({action: 'setSessionStatus',arguments: {status: 'failed',reason: Error.toString()}})}`);
      }
    }).toPass({timeout: 25000});
  });

  test('terms', { tag: ['@approveme', '@mattressfirm', '@splashpage', '@linkscheck'] },async () => {
    await expect(async () => {
      try {
        await splashPageLocal.checkLinkTerms();
        await cPage.evaluate(_ => {}, `browserstack_executor: ${JSON.stringify({action: 'setSessionStatus',arguments: {status: 'passed',reason: 'terms'}})}`);
      }catch(Error) {
        await cPage.evaluate(_ => {}, `browserstack_executor: ${JSON.stringify({action: 'setSessionStatus',arguments: {status: 'failed',reason: Error.toString()}})}`);
      }
    }).toPass({timeout: 25000});
  });

  test('privacy', { tag: ['@approveme', '@mattressfirm', '@splashpage', '@linkscheck'] },async () => {
    await expect(async () => {
      try {
        await splashPageLocal.checkLinkPrivacy();
        await cPage.evaluate(_ => {}, `browserstack_executor: ${JSON.stringify({action: 'setSessionStatus',arguments: {status: 'passed',reason: 'privacy'}})}`);
      }catch(Error) {
        await cPage.evaluate(_ => {}, `browserstack_executor: ${JSON.stringify({action: 'setSessionStatus',arguments: {status: 'failed',reason: Error.toString()}})}`);
      }
    }).toPass({timeout: 25000});
  });

  test('disclosure', { tag: ['@approveme', '@mattressfirm', '@splashpage', '@linkscheck'] },async () => {
    await expect(async () => {
      try {
        await splashPageLocal.checkLinkDisclosure();
        await cPage.evaluate(_ => {}, `browserstack_executor: ${JSON.stringify({action: 'setSessionStatus',arguments: {status: 'passed',reason: 'disclosure'}})}`);
      }catch(Error) {
        await cPage.evaluate(_ => {}, `browserstack_executor: ${JSON.stringify({action: 'setSessionStatus',arguments: {status: 'failed',reason: Error.toString()}})}`);
      }
    }).toPass({timeout: 25000});
  });

  test('arbitration', { tag: ['@approveme', '@mattressfirm', '@splashpage', '@linkscheck'] },async ({browser}) => {
    await expect(async () => {
      try {
        await splashPageLocal.checkLinkArbitration();
        await cPage.evaluate(_ => {}, `browserstack_executor: ${JSON.stringify({action: 'setSessionStatus',arguments: {status: 'passed',reason: 'arbitration'}})}`);
      }catch(Error) {
        await cPage.evaluate(_ => {}, `browserstack_executor: ${JSON.stringify({action: 'setSessionStatus',arguments: {status: 'failed',reason: Error.toString()}})}`);
      }
    }).toPass({timeout: 25000});
  });

});