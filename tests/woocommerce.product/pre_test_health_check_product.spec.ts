import {test, expect } from '@playwright/test';
import urls from '../../utils/woocommerce.utils/urls';

test.describe('navigation', async () => {

  test.describe.configure({ retries: 0 });
  test.describe.configure({ mode: 'parallel' });

  test('product : comfy', async ({browser}) => {
    await expect(async () => {
      const localContext = await browser.newContext();
      const localPage = await localContext.newPage();
      await localPage.goto(urls.product.comfyGrey);
      await expect(localPage.getByRole('heading', { name: 'Comfy – Gray' })).toBeVisible();
      await expect(localPage.getByRole('button', { name: 'Add to cart' })).toBeVisible();
      await localContext.close();
    }).toPass({timeout: 15000});
  });

  test('product : marimba', async ({browser}) => {
    await expect(async () => {
      const localContext = await browser.newContext();
      const localPage = await localContext.newPage();
      await localPage.goto(urls.product.marimba);
      await expect(localPage.getByRole('heading', { name: 'Marimba Hero' })).toBeVisible();
      await expect(localPage.getByRole('button', { name: 'Add to Cart' })).toBeVisible();
      await localContext.close();
    }).toPass({timeout: 15000});
  });

  test('product : magentoBook', async ({browser}) => {
    await expect(async () => {
      const localContext = await browser.newContext();
      const localPage = await localContext.newPage();
      await localPage.goto(urls.product.magentoBook);
      await expect(localPage.getByRole('heading', { name: 'Magento 2 Magento 2' })).toBeVisible();
      await expect(localPage.getByRole('button', { name: 'Add to Cart' })).toBeVisible();
      await localContext.close();
    }).toPass({timeout: 20000});
  });

  test('product : occulus', async ({browser}) => {
    await expect(async () => {
      const localContext = await browser.newContext();
      const localPage = await localContext.newPage();
      await localPage.goto(urls.product.oculus);
      await expect(localPage.getByRole('heading', { name: 'Oculus Quest' })).toBeVisible();
      await expect(localPage.getByRole('button', { name: 'Add to Cart' })).toBeVisible();
      await localContext.close();
    }).toPass({timeout: 15000});
  });

  test('product : warrantyMarimba', async ({browser}) => {
    await expect(async () => {
      const localContext = await browser.newContext();
      const localPage = await localContext.newPage();
      await localPage.goto(urls.product.warrantyMarimba);
      await expect(localPage.getByRole('heading', { name: 'Warranty – Marimba Hero' })).toBeVisible();
      await expect(localPage.getByRole('button', { name: 'Add to Cart' })).toBeVisible();
      await localContext.close();
    }).toPass({timeout: 15000});
  });

});
