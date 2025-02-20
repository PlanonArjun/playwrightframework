import { test, expect } from '@playwright/test';
import HappyPathPending from '../../data/progweb.approveme/HappyPathPending';
import A_LoginPage from '../../pages/progweb.app/A_LoginPage';
import B_SelectShop from '../../pages/progweb.app/B_SelectShop';
import J_LinksCheck from '../../pages/progweb.app/J_LinksCheck';

test.describe('navigation', async () => {

  test.describe.configure({ retries: 0 });
  test.describe.configure({ mode: 'serial' });

  test('application disclosure', { tag: ['@happypath','@prog web', '@linkscheck'] }, async ({ browser }) => {
    await expect(async () => {
      const bCont = await browser.newContext();
      const cPage = await bCont.newPage();
      let happyPathPending = new HappyPathPending();

      let loginPage = new A_LoginPage(cPage);
      await loginPage.happyPathPopulate(happyPathPending.getLoginData);
      await cPage.waitForTimeout(2000);

      let selectShop = new B_SelectShop(cPage);
      await selectShop.happyPathPopulate(happyPathPending.getShopDetails);
      await cPage.waitForTimeout(5000);

      let linksCheck = new J_LinksCheck(cPage);
      await linksCheck.checkApplicationDiscloser();

      await cPage.close();
      await bCont.close();
    }).toPass({ timeout: 200000 });
  });

  test('eSign disclosure', { tag: ['@happypath','@prog web', '@linkscheck'] }, async ({ browser }) => {
    await expect(async () => {
      const bCont = await browser.newContext();
      const cPage = await bCont.newPage();
      let happyPathPending = new HappyPathPending();

      let loginPage = new A_LoginPage(cPage);
      await loginPage.happyPathPopulate(happyPathPending.getLoginData);

      let selectShop = new B_SelectShop(cPage);
      await selectShop.happyPathPopulate(happyPathPending.getShopDetails);

      let linksCheck = new J_LinksCheck(cPage);
      await linksCheck.checkEsignDiscloser();
      await cPage.close();
      await bCont.close();
    }).toPass({ timeout: 200000 });
  });

  test('arbitration', { tag: ['@happypath','@prog web', '@linkscheck'] }, async ({ browser }) => {
    await expect(async () => {
      const bCont = await browser.newContext();
      const cPage = await bCont.newPage();
      let happyPathPending = new HappyPathPending();

      let loginPage = new A_LoginPage(cPage);
      await loginPage.happyPathPopulate(happyPathPending.getLoginData);

      let selectShop = new B_SelectShop(cPage);
      await selectShop.happyPathPopulate(happyPathPending.getShopDetails);

      let linksCheck = new J_LinksCheck(cPage);
      await linksCheck.checkArbitrationProvision();
      await cPage.close();
      await bCont.close();
    }).toPass({ timeout: 200000 });
  });


  test('privacy', { tag: ['@happypath','@prog web', '@linkscheck'] }, async ({ browser }) => {
    await expect(async () => {
      const bCont = await browser.newContext();
      const cPage = await bCont.newPage();
      let happyPathPending = new HappyPathPending();

      let loginPage = new A_LoginPage(cPage);
      await loginPage.happyPathPopulate(happyPathPending.getLoginData);

      let selectShop = new B_SelectShop(cPage);
      await selectShop.happyPathPopulate(happyPathPending.getShopDetails);

      let linksCheck = new J_LinksCheck(cPage);
      await linksCheck.checkPriavacyPolicy();

      await cPage.close();
      await bCont.close();
    }).toPass({ timeout: 200000 });
  });

  test('terms of use', { tag: ['@happypath','@prog web', '@linkscheck'] }, async ({ browser }) => {
    await expect(async () => {
      const bCont = await browser.newContext();
      const cPage = await bCont.newPage();
      let happyPathPending = new HappyPathPending();

      let loginPage = new A_LoginPage(cPage);
      await loginPage.happyPathPopulate(happyPathPending.getLoginData);

      let selectShop = new B_SelectShop(cPage);
      await selectShop.happyPathPopulate(happyPathPending.getShopDetails);

      let linksCheck = new J_LinksCheck(cPage);
      await linksCheck.checkTermsOfUse();

      await cPage.close();
      await bCont.close();
    }).toPass({ timeout: 200000 });
  });

});
