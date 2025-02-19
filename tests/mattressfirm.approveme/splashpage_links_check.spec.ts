import {test, expect } from '@playwright/test';
import B_SplashPage from "../../pages/mattressfirm.approveme/B_SplashPage";

test.describe('navigation', async () => {

  test.describe.configure({ retries: 0 });
  test.describe.configure({ mode: 'parallel' });

  test('photoId', { tag: ['@approveme', '@mattressfirm', '@splashpage', '@linkscheck'] },async ({browser}) => {
    await expect(async () => {
      const bCont = await browser.newContext();
      const cPage = await bCont.newPage();
      let splashPageLocal = new B_SplashPage(cPage);
      await splashPageLocal.navigate();
      await splashPageLocal.checkLinkPhoto();
      await bCont.close();
    }).toPass({timeout: 25000});
  });

  test('bankInfo', { tag: ['@approveme', '@mattressfirm', '@splashpage', '@linkscheck'] },async ({browser}) => {
    await expect(async () => {
      const bCont = await browser.newContext();
      const cPage = await bCont.newPage();
      let splashPageLocal = new B_SplashPage(cPage);
      await splashPageLocal.navigate();
      await splashPageLocal.checkLinkBankInfo();
      await bCont.close();
    }).toPass({timeout: 25000});
  });

  test('checkbox', { tag: ['@approveme', '@mattressfirm', '@splashpage', '@linkscheck'] },async ({browser}) => {
    await expect(async () => {
      const bCont = await browser.newContext();
      const cPage = await bCont.newPage();
      let splashPageLocal = new B_SplashPage(cPage);
      await splashPageLocal.navigate();
      await splashPageLocal.selectCheckbox();
      await splashPageLocal.unSelectCheckbox();
      await bCont.close();
    }).toPass({timeout: 25000});
  });

  test('terms', { tag: ['@approveme', '@mattressfirm', '@splashpage', '@linkscheck'] },async ({browser}) => {
    await expect(async () => {
      const bCont = await browser.newContext();
      const cPage = await bCont.newPage();
      let splashPageLocal = new B_SplashPage(cPage);
      await splashPageLocal.navigate();
      await splashPageLocal.checkLinkTerms();
      await bCont.close();
    }).toPass({timeout: 25000});
  });

  test('privacy', { tag: ['@approveme', '@mattressfirm', '@splashpage', '@linkscheck'] },async ({browser}) => {
    await expect(async () => {
      const bCont = await browser.newContext();
      const cPage = await bCont.newPage();
      let splashPageLocal = new B_SplashPage(cPage);
      await splashPageLocal.navigate();
      await splashPageLocal.checkLinkPrivacy();
      await bCont.close();
    }).toPass({timeout: 25000});
  });

  test('disclosure', { tag: ['@approveme', '@mattressfirm', '@splashpage', '@linkscheck'] },async ({browser}) => {
    await expect(async () => {
      const bCont = await browser.newContext();
      const cPage = await bCont.newPage();
      let splashPageLocal = new B_SplashPage(cPage);
      await splashPageLocal.navigate();
      await splashPageLocal.checkLinkDisclosure();
      await bCont.close();
    }).toPass({timeout: 25000});
  });

  test('arbitration', { tag: ['@approveme', '@mattressfirm', '@splashpage', '@linkscheck'] },async ({browser}) => {
    await expect(async () => {
      const bCont = await browser.newContext();
      const cPage = await bCont.newPage();
      let splashPageLocal = new B_SplashPage(cPage);
      await splashPageLocal.navigate();
      await splashPageLocal.checkLinkArbitration();
      await bCont.close();
    }).toPass({timeout: 25000});
  });

});