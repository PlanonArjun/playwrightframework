import {test, expect } from '@playwright/test';
import B_SplashPage from "../../pages/biglots.approveme.deprecated/B_SplashPage";

test.describe('navigation', async () => {

  test.describe.configure({ retries: 0 });
  test.describe.configure({ mode: 'serial' });

  /**
   * @deprecated
   */
  test.skip('photoId', { tag: ['@approveme', '@biglots', '@splashpage', '@linkscheck'] },async ({browser}) => {
    await expect(async () => {
      const bCont = await browser.newContext();
      const cPage = await bCont.newPage();
      let splashPageLocal = new B_SplashPage(cPage);
      await splashPageLocal.navigate();
      await splashPageLocal.checkLinkPhoto();
      await bCont.close();
    }).toPass({timeout: 25000});
  });

  /**
   * @deprecated
   */
  test.skip('bankInfo', { tag: ['@approveme', '@biglots', '@splashpage', '@linkscheck'], },async ({browser}) => {
    await expect(async () => {
      const bCont = await browser.newContext();
      const cPage = await bCont.newPage();
      let splashPageLocal = new B_SplashPage(cPage);
      await splashPageLocal.navigate();
      await splashPageLocal.checkLinkBankInfo();
      await bCont.close();
    }).toPass({timeout: 25000});
  });

  /**
   * @deprecated
   */
  test.skip('checkbox', { tag: ['@approveme', '@biglots', '@splashpage', '@linkscheck'], },async ({browser}) => {
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

  /**
   * @deprecated
   */
  test.skip('terms', { tag: ['@approveme', '@biglots', '@splashpage', '@linkscheck'], },async ({browser}) => {
    await expect(async () => {
      const bCont = await browser.newContext();
      const cPage = await bCont.newPage();
      let splashPageLocal = new B_SplashPage(cPage);
      await splashPageLocal.navigate();
      await splashPageLocal.checkLinkTerms();
      await bCont.close();
    }).toPass({timeout: 25000});
  });

  /**
   * @deprecated
   */
  test.skip('privacy', { tag: ['@approveme', '@biglots', '@splashpage', '@linkscheck'], },async ({browser}) => {
    await expect(async () => {
      const bCont = await browser.newContext();
      const cPage = await bCont.newPage();
      let splashPageLocal = new B_SplashPage(cPage);
      await splashPageLocal.navigate();
      await splashPageLocal.checkLinkPrivacy();
      await bCont.close();
    }).toPass({timeout: 25000});
  });

  /**
   * @deprecated
   */
  test.skip('disclosure', { tag: ['@approveme', '@biglots', '@splashpage', '@linkscheck'], },async ({browser}) => {
    await expect(async () => {
      const bCont = await browser.newContext();
      const cPage = await bCont.newPage();
      let splashPageLocal = new B_SplashPage(cPage);
      await splashPageLocal.navigate();
      await splashPageLocal.checkLinkDisclosure();
      await bCont.close();
    }).toPass({timeout: 25000});
  });

  /**
   * @deprecated
   */
  test.skip('arbitration', { tag: ['@approveme', '@biglots', '@splashpage', '@linkscheck'], },async ({browser}) => {
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
