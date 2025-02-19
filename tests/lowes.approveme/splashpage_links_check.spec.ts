import {test, expect} from '@playwright/test';
import A_MarketingPage from "../../pages/lowes.approveme/A_Marketingpage";
import B_BeforeStartPage from '../../pages/lowes.approveme/B_BeforeStartPage';

test.describe('lowes links', async () => {

  test.describe.configure({ retries: 0 });
  test.describe.configure({ mode: 'parallel' });

  test('terms', { tag: ['@lowes', '@approveme', '@happypath', '@links'] },async ({browser}) => {
    await expect(async () => {
      const bCont = await browser.newContext();
      const cPage = await bCont.newPage();
      await (new A_MarketingPage(cPage)).navigate();
      await (new B_BeforeStartPage(cPage)).checkLinkTerms();
      await cPage.close();
      await bCont.close();
    }).toPass({timeout: 20000});
  });

  test('privacy', { tag: ['@lowes', '@approveme', '@happypath', '@links'] },async ({browser}) => {
    await expect(async () => {
      const bCont = await browser.newContext();
      const cPage = await bCont.newPage();
      await (new A_MarketingPage(cPage)).navigate();
      await (new B_BeforeStartPage(cPage)).checkLinkPrivacy();
      await cPage.close();
      await bCont.close();
    }).toPass({timeout: 20000});
  });

  test('disclosure', { tag: ['@lowes', '@approveme', '@happypath', '@links'], },async ({browser}) => {
    await expect(async () => {
      const bCont = await browser.newContext();
      const cPage = await bCont.newPage();
      await (new A_MarketingPage(cPage)).navigate();
      await (new B_BeforeStartPage(cPage)).checkLinkDisclosure();
      await cPage.close();
      await bCont.close();
    }).toPass({timeout: 20000});
  });

  test('arbitration', { tag: ['@lowes', '@approveme', '@happypath', '@links'], },async ({browser}) => {
    await expect(async () => {
      const bCont = await browser.newContext();
      const cPage = await bCont.newPage();
      await (new A_MarketingPage(cPage)).navigate();
      await (new B_BeforeStartPage(cPage)).checkLinkArbitration();
      await cPage.close();
      await bCont.close();
    }).toPass({timeout: 20000});

  });

});