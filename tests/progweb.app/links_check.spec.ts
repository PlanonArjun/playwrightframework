import { test, expect, BrowserContext, Page } from '@playwright/test';
import HappyPathPending from '../../data/progweb.approveme/HappyPathPending';
import A_LoginPage from '../../pages/progweb.app/A_LoginPage';
import B_SelectShop from '../../pages/progweb.app/B_SelectShop';
import J_LinksCheck from '../../pages/progweb.app/J_LinksCheck';

test.describe('navigation', async () => {

  test.describe.configure({ retries: 0 });
  test.describe.configure({ mode: 'parallel' });

  let happyPathPending: HappyPathPending;

  let bCont: BrowserContext;
  let cPage: Page;

  let loginPage: A_LoginPage;
  let selectShop: B_SelectShop;
  let linksCheck: J_LinksCheck;

  test.beforeAll(async () => {
    happyPathPending = new HappyPathPending();
  });

  test.beforeEach(async ({browser}) => {
    bCont = await browser.newContext();
    cPage = await bCont.newPage();
    loginPage = new A_LoginPage(cPage);
    await loginPage.happyPathPopulate(happyPathPending.getLoginData);
    selectShop = new B_SelectShop(cPage);
    await selectShop.happyPathPopulate(happyPathPending.getShopDetails);
    linksCheck = new J_LinksCheck(cPage);
  });

  test.afterEach(async () => {
    await cPage.close();
    await bCont.close();
  });

  test('application disclosure', { tag: ['@happypath','@prog web', '@linkscheck'] }, async () => {
    await expect(async () => {
      try {
        await linksCheck.checkApplicationDisclosure();
        await cPage.evaluate(_ => {}, `browserstack_executor: ${JSON.stringify({action: 'setSessionStatus',arguments: {status: 'passed',reason: 'application disclosure'}})}`);
      }catch(Error) {
        await cPage.evaluate(_ => {}, `browserstack_executor: ${JSON.stringify({action: 'setSessionStatus',arguments: {status: 'failed',reason: Error.toString()}})}`);
      }
    }).toPass({ timeout: 200000 });
  });

  test('eSign', { tag: ['@happypath','@prog web', '@linkscheck'] }, async () => {
    await expect(async () => {
      try {
        await linksCheck.checkESignDisclosure();
        await cPage.evaluate(_ => {}, `browserstack_executor: ${JSON.stringify({action: 'setSessionStatus',arguments: {status: 'passed',reason: 'esign'}})}`);
      }catch(Error) {
        await cPage.evaluate(_ => {}, `browserstack_executor: ${JSON.stringify({action: 'setSessionStatus',arguments: {status: 'failed',reason: Error.toString()}})}`);
      }
    }).toPass({ timeout: 200000 });
  });

  test('arbitration', { tag: ['@happypath','@prog web', '@linkscheck'] }, async () => {
    await expect(async () => {
      try {
        await linksCheck.checkArbitrationProvision();
        await cPage.evaluate(_ => {}, `browserstack_executor: ${JSON.stringify({action: 'setSessionStatus',arguments: {status: 'passed',reason: 'arbitration'}})}`);
      }catch(Error) {
        await cPage.evaluate(_ => {}, `browserstack_executor: ${JSON.stringify({action: 'setSessionStatus',arguments: {status: 'failed',reason: Error.toString()}})}`);
      }
    }).toPass({ timeout: 200000 });
  });

  test('privacy', { tag: ['@happypath','@prog web', '@linkscheck'] }, async () => {
    await expect(async () => {
      try {
        await linksCheck.checkPrivacyPolicy();
        await cPage.evaluate(_ => {}, `browserstack_executor: ${JSON.stringify({action: 'setSessionStatus',arguments: {status: 'passed',reason: 'privacy'}})}`);
      }catch(Error) {
        await cPage.evaluate(_ => {}, `browserstack_executor: ${JSON.stringify({action: 'setSessionStatus',arguments: {status: 'failed',reason: Error.toString()}})}`);
      }
    }).toPass({ timeout: 200000 });
  });

  test('terms', { tag: ['@happypath','@prog web', '@linkscheck'] }, async () => {
    await expect(async () => {

      try {
        await linksCheck.checkTermsOfUse();
        await cPage.evaluate(_ => {}, `browserstack_executor: ${JSON.stringify({action: 'setSessionStatus',arguments: {status: 'passed',reason: 'terms'}})}`);
      }catch(Error) {
        await cPage.evaluate(_ => {}, `browserstack_executor: ${JSON.stringify({action: 'setSessionStatus',arguments: {status: 'failed',reason: Error.toString()}})}`);
      }
    }).toPass({ timeout: 200000 });
  });

});
