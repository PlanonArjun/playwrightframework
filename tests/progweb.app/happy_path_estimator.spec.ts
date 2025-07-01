import { test, expect, BrowserContext, Page, Locator, FrameLocator } from '@playwright/test';
import urls from '$utils/progweb.utils/urls';

test.describe.configure({ retries: 0 });
test.describe.configure({ mode: 'parallel' });

let bCont: BrowserContext;
let cPage: Page;

let fieldCashPrice: Locator;
let estimatorRoot: FrameLocator;

test.beforeEach(async ({browser}) => {
    bCont = await browser.newContext();
    cPage = await bCont.newPage();

    estimatorRoot = cPage.locator('iframe[title="A Progressive Leasing tool for Lease Cost Estimator"]').contentFrame();
    fieldCashPrice = estimatorRoot.getByRole('textbox', { name: 'Cash price' });

    /*
    We can re-use a BBY test store for each of these.
     */
    await cPage.goto(urls.locatorBestBuyTestStore.locatorBestBuyTestStore);
    await cPage.getByRole('button', { name: 'Accept' }).click();
    await cPage.getByRole('img', { name: 'Best Buy' }).click();
    await cPage.getByText('Best Buy Blocked Test 7.1 mi').click();

    await cPage.getByRole('button', { name: 'Estimate leasing cost' }).click();
    await fieldCashPrice.click();
    await fieldCashPrice.fill('3000.00');
    await fieldCashPrice.press('Tab');
});

test('ProgWeb estimator Every week', async () => {
    await estimatorRoot.getByRole('radio', { name: 'Every week' }).check();
    await estimatorRoot.getByRole('button', { name: 'Get my estimate' }).click();
    try {
        await expect (estimatorRoot.getByRole('heading', { name: '-month lease-to-own summary' })).toBeVisible();
        await expect (estimatorRoot.getByRole('heading', { name: 'Total of Payments' })).toBeVisible();
        await cPage.evaluate(_ => {}, `browserstack_executor: ${JSON.stringify({action: 'setSessionStatus',arguments: {status: 'passed',reason:'ProgWeb estimator Every week'}})}`);
    }catch(Error) {
        await cPage.evaluate(_ => {}, `browserstack_executor: ${JSON.stringify({action: 'setSessionStatus',arguments: {status: 'failed',reason: Error.toString()}})}`);
    }
});

test('ProgWeb estimator Every other week', async () => {
    await estimatorRoot.getByRole('radio', { name: 'Every other week' }).check();
    await estimatorRoot.getByRole('button', { name: 'Get my estimate' }).click();
    try {
        await expect (estimatorRoot.getByRole('heading', { name: '-month lease-to-own summary' })).toBeVisible();
        await expect (estimatorRoot.getByRole('heading', { name: 'Total of Payments' })).toBeVisible();
        await cPage.evaluate(_ => {}, `browserstack_executor: ${JSON.stringify({action: 'setSessionStatus',arguments: {status: 'passed',reason:'ProgWeb estimator Every other week'}})}`);
    }catch(Error) {
        await cPage.evaluate(_ => {}, `browserstack_executor: ${JSON.stringify({action: 'setSessionStatus',arguments: {status: 'failed',reason: Error.toString()}})}`);
    }
});

test('ProgWeb estimator Twice per month', async () => {
    await estimatorRoot.getByRole('radio', { name: 'Twice per month' }).check();
    await estimatorRoot.getByRole('button', { name: 'Get my estimate' }).click();
    try {
        await expect (estimatorRoot.getByRole('heading', { name: '-month lease-to-own summary' })).toBeVisible();
        await expect (estimatorRoot.getByRole('heading', { name: 'Total of Payments' })).toBeVisible();
        await cPage.evaluate(_ => {}, `browserstack_executor: ${JSON.stringify({action: 'setSessionStatus',arguments: {status: 'passed',reason:'ProgWeb estimator Twice per month'}})}`);
    }catch(Error) {
        await cPage.evaluate(_ => {}, `browserstack_executor: ${JSON.stringify({action: 'setSessionStatus',arguments: {status: 'failed',reason: Error.toString()}})}`);
    }
});

test('ProgWeb estimator Every month', async () => {
    await estimatorRoot.getByRole('radio', { name: 'Every month' }).check();
    await estimatorRoot.getByRole('button', { name: 'Get my estimate' }).click();
    try {
        await expect (estimatorRoot.getByRole('heading', { name: '-month lease-to-own summary' })).toBeVisible();
        await expect (estimatorRoot.getByRole('heading', { name: 'Total of Payments' })).toBeVisible();
        await cPage.evaluate(_ => {}, `browserstack_executor: ${JSON.stringify({action: 'setSessionStatus',arguments: {status: 'passed',reason:'ProgWeb estimator Every month'}})}`);
    }catch(Error) {
        await cPage.evaluate(_ => {}, `browserstack_executor: ${JSON.stringify({action: 'setSessionStatus',arguments: {status: 'failed',reason: Error.toString()}})}`);
    }
});

test.afterEach(async () => {
    await bCont.close();
    await cPage.close();
});
