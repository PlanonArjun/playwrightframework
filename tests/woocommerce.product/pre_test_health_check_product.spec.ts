import { test, expect, Browser, BrowserContext, Page } from '@playwright/test';
import urls from '../../utils/woocommerce.utils/urls';

test.describe('navigation', async () => {

  test.describe.configure({ retries: 0 });
  test.describe.configure({ mode: 'parallel' });

  let localContext: BrowserContext;
  let localPage: Page;

  test.beforeEach(async ({browser}) => {
    localContext = await browser.newContext();
    localPage = await localContext.newPage();
  });

  test.afterEach(async () => {
    await localContext.close();
    await localPage.close();
  });

  test('product : comfy', async () => {
    await expect(async () => {
      await localPage.goto(urls.product.comfyGrey);
      try {
        await expect(localPage.getByRole('heading', { name: 'Comfy – Gray' })).toBeVisible();
        await expect(localPage.getByRole('button', { name: 'Add to cart' })).toBeVisible();
        await localPage.evaluate(_ => {}, `browserstack_executor: ${JSON.stringify({action: 'setSessionStatus',arguments: {status: 'passed',reason:'woo product : comfy'}})}`);
      }catch(Error) {
        await localPage.evaluate(_ => {}, `browserstack_executor: ${JSON.stringify({action: 'setSessionStatus',arguments: {status: 'failed',reason: Error.toString()}})}`);
      }
    }).toPass({timeout: 15000});
  });

  test('product : marimba', async () => {
    await expect(async () => {
      await localPage.goto(urls.product.marimba);
      try {
        await expect(localPage.locator('#product-15 > div.summary.entry-summary > h1')).toBeVisible();
        await expect(localPage.getByRole('button', { name: 'Add to Cart' })).toBeVisible();
        await localPage.evaluate(_ => {}, `browserstack_executor: ${JSON.stringify({action: 'setSessionStatus',arguments: {status: 'passed',reason:'product : marimba'}})}`);
      }catch(Error) {
        await localPage.evaluate(_ => {}, `browserstack_executor: ${JSON.stringify({action: 'setSessionStatus',arguments: {status: 'failed',reason: Error.toString()}})}`);
      }
    }).toPass({timeout: 15000});
  });

  test('product : magentoBook', async () => {
    await expect(async () => {
      await localPage.goto(urls.product.magentoBook);
      try {
        await expect(localPage.getByRole('heading', { name: 'Magento 2 Magento 2' })).toBeVisible();
        await expect(localPage.getByRole('button', { name: 'Add to Cart' })).toBeVisible();
        await localPage.evaluate(_ => {}, `browserstack_executor: ${JSON.stringify({action: 'setSessionStatus',arguments: {status: 'passed',reason:'product : magentoBook'}})}`);
      }catch(Error) {
        await localPage.evaluate(_ => {}, `browserstack_executor: ${JSON.stringify({action: 'setSessionStatus',arguments: {status: 'failed',reason: Error.toString()}})}`);
      }
    }).toPass({timeout: 20000});
  });

  test('product : occulus', async () => {
    await expect(async () => {
      await localPage.goto(urls.product.oculus);
      try {
        await expect(localPage.getByRole('heading', { name: 'Oculus Quest' })).toBeVisible();
        await expect(localPage.getByRole('button', { name: 'Add to Cart' })).toBeVisible();
        await localPage.evaluate(_ => {}, `browserstack_executor: ${JSON.stringify({action: 'setSessionStatus',arguments: {status: 'passed',reason:'product : occulus'}})}`);
      }catch(Error) {
        await localPage.evaluate(_ => {}, `browserstack_executor: ${JSON.stringify({action: 'setSessionStatus',arguments: {status: 'failed',reason: Error.toString()}})}`);
      }
    }).toPass({timeout: 15000});
  });

  test('product : warrantyMarimba', async () => {
    await expect(async () => {
      await localPage.goto(urls.product.warrantyMarimba);
      try {
        await expect(localPage.getByRole('heading', { name: 'Warranty – Marimba Hero' })).toBeVisible();
        await expect(localPage.getByRole('button', { name: 'Add to Cart' })).toBeVisible();
        await localPage.evaluate(_ => {}, `browserstack_executor: ${JSON.stringify({action: 'setSessionStatus',arguments: {status: 'passed',reason:'product : warrantyMarimba'}})}`);
      }catch(Error) {
        await localPage.evaluate(_ => {}, `browserstack_executor: ${JSON.stringify({action: 'setSessionStatus',arguments: {status: 'failed',reason: Error.toString()}})}`);
      }
    }).toPass({timeout: 15000});
  });

});
