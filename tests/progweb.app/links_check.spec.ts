import { test, expect, BrowserContext, Page, Locator } from '@playwright/test';
import urls from '$utils/progweb.utils/urls';

test.describe.configure({ retries: 1 });
test.describe.configure({ mode: 'parallel' });

let bCont: BrowserContext;
let cPage: Page;
let buttonFooterAccept: Locator;

test.beforeEach(async ({browser}) => {
  bCont = await browser.newContext();
  cPage = await bCont.newPage();
  buttonFooterAccept = cPage.getByRole('button', { name: 'Accept' });

  /*
  We can re-use a BBY test store for each of these.
   */
  await cPage.goto(urls.locatorBestBuyTestStore.locatorBestBuyTestStore);
  await buttonFooterAccept.click();
  await cPage.getByRole('img', { name: 'Best Buy' }).click();
  await cPage.getByText('Best Buy Blocked Test 7.1 mi').click();
  await cPage.getByRole('button', { name: 'Get started' }).click();
  await cPage.getByRole('link', { name: 'Sign up' }).click();
});

test('ProgWeb link App Disc', async () => {
  await cPage.getByRole('link', { name: 'Application Disclosures' }).click();
  await buttonFooterAccept.click();

  try {
    await expect (cPage.getByRole('heading', { name: 'Application Disclosure' })).toBeVisible();
    await expect (cPage.getByText('PLEASE READ THESE APPLICATION')).toBeVisible();
    await cPage.evaluate(_ => {}, `browserstack_executor: ${JSON.stringify({action: 'setSessionStatus',arguments: {status: 'passed',reason:'ProgWeb link App Disc'}})}`);
  }catch(Error) {
    await cPage.evaluate(_ => {}, `browserstack_executor: ${JSON.stringify({action: 'setSessionStatus',arguments: {status: 'failed',reason: Error.toString()}})}`);
  }
});

test('ProgWeb link eSign', async () => {
  await cPage.getByRole('link', { name: 'E-Sign Disclosure' }).click();
  await buttonFooterAccept.click();

  try {
    await expect (cPage.getByRole('heading', { name: 'E-sign disclosure', exact: true })).toBeVisible();
    await expect (cPage.getByText('E-Sign Disclosure and Consent Notice', { exact: true })).toBeVisible();
    await cPage.evaluate(_ => {}, `browserstack_executor: ${JSON.stringify({action: 'setSessionStatus',arguments: {status: 'passed',reason:'ProgWeb link eSign'}})}`);
  }catch(Error) {
    await cPage.evaluate(_ => {}, `browserstack_executor: ${JSON.stringify({action: 'setSessionStatus',arguments: {status: 'failed',reason: Error.toString()}})}`);
  }
});

test('ProgWeb link Arbitration', async () => {
  await cPage.getByRole('link', { name: 'Arbitration Provision' }).click();
  await buttonFooterAccept.click();

  try {
    await expect (cPage.getByRole('heading', { name: 'Arbitration Clause' })).toBeVisible();
    await expect (cPage.getByText('This Arbitration Provision (“')).toBeVisible();
    await cPage.evaluate(_ => {}, `browserstack_executor: ${JSON.stringify({action: 'setSessionStatus',arguments: {status: 'passed',reason:'ProgWeb link Arbitration'}})}`);
  }catch(Error) {
    await cPage.evaluate(_ => {}, `browserstack_executor: ${JSON.stringify({action: 'setSessionStatus',arguments: {status: 'failed',reason: Error.toString()}})}`);
  }
});

test('ProgWeb link Privacy', async () => {
  await cPage.getByRole('link', { name: 'Privacy Policy' }).click();
  await buttonFooterAccept.click();

  try {
    await expect (cPage.getByRole('heading', { name: 'Privacy' })).toBeVisible();
    await cPage.evaluate(_ => {}, `browserstack_executor: ${JSON.stringify({action: 'setSessionStatus',arguments: {status: 'passed',reason:'ProgWeb link Privacy'}})}`);
  }catch(Error) {
    await cPage.evaluate(_ => {}, `browserstack_executor: ${JSON.stringify({action: 'setSessionStatus',arguments: {status: 'failed',reason: Error.toString()}})}`);
  }
});

test('ProgWeb link Terms', async () => {
  await cPage.getByRole('link', { name: 'Terms of Use.' }).click();
  await buttonFooterAccept.click();

  try {
    await expect (cPage.getByText('13. These Terms of Use')).toBeVisible();
    await cPage.evaluate(_ => {}, `browserstack_executor: ${JSON.stringify({action: 'setSessionStatus',arguments: {status: 'passed',reason:'ProgWeb link Terms'}})}`);
  }catch(Error) {
    await cPage.evaluate(_ => {}, `browserstack_executor: ${JSON.stringify({action: 'setSessionStatus',arguments: {status: 'failed',reason: Error.toString()}})}`);
  }
});

test.afterEach(async () => {
  await bCont.close();
  await cPage.close();
});
