import { test, expect, devices } from '@playwright/test';

test.use({
    ...devices['Desktop Safari'],
});

test('ProgWeb estimator Every week', async ({ page }) => {
    await page.goto('https://slc-rcpwebpws.stormwind.local/myaccount/find-store/location');
    await page.getByRole('button', { name: 'Accept' }).click();
    await page.locator('div').filter({ hasText: /^City or ZIP$/ }).nth(3).click();
    await page.locator('#pg-input-0').fill('84009');
    await page.getByText('South Jordan, UT 84009, USA').click();
    await page.getByRole('img', { name: 'Best Buy' }).click();
    await page.getByText('Best Buy Blocked Test 7.1 mi').click();
    await page.getByRole('button', { name: 'Estimate leasing cost' }).click();
    await page.locator('iframe[title="A Progressive Leasing tool for Lease Cost Estimator"]').contentFrame().getByRole('textbox', { name: 'Cash price' }).click();
    await page.locator('iframe[title="A Progressive Leasing tool for Lease Cost Estimator"]').contentFrame().getByRole('textbox', { name: 'Cash price' }).fill('3000.00');
    await page.locator('iframe[title="A Progressive Leasing tool for Lease Cost Estimator"]').contentFrame().getByRole('textbox', { name: 'Cash price' }).press('Tab');
    await page.locator('iframe[title="A Progressive Leasing tool for Lease Cost Estimator"]').contentFrame().getByRole('radio', { name: 'Every week' }).check();
    await page.locator('iframe[title="A Progressive Leasing tool for Lease Cost Estimator"]').contentFrame().getByRole('button', { name: 'Get my estimate' }).click();
    await page.locator('iframe[title="A Progressive Leasing tool for Lease Cost Estimator"]').contentFrame().getByRole('heading', { name: '-month lease-to-own summary' }).click();
    await page.locator('iframe[title="A Progressive Leasing tool for Lease Cost Estimator"]').contentFrame().getByRole('heading', { name: 'Total of Payments' }).click();
    await page.locator('iframe[title="A Progressive Leasing tool for Lease Cost Estimator"]').contentFrame().getByRole('button', { name: 'Continue to apply' }).click();
});

test('ProgWeb estimator Every other week', async ({ page }) => {
    await page.goto('https://slc-rcpwebpws.stormwind.local/myaccount/find-store/location');
    await page.getByRole('button', { name: 'Accept' }).click();
    await page.locator('div').filter({ hasText: /^City or ZIP$/ }).nth(3).click();
    await page.locator('#pg-input-0').fill('84009');
    await page.getByText('South Jordan, UT 84009, USA').click();
    await page.getByRole('img', { name: 'Best Buy' }).click();
    await page.getByText('Best Buy Blocked Test 7.1 mi').click();
    await page.getByRole('button', { name: 'Estimate leasing cost' }).click();
    await page.locator('iframe[title="A Progressive Leasing tool for Lease Cost Estimator"]').contentFrame().getByRole('textbox', { name: 'Cash price' }).click();
    await page.locator('iframe[title="A Progressive Leasing tool for Lease Cost Estimator"]').contentFrame().getByRole('textbox', { name: 'Cash price' }).fill('3000.00');
    await page.locator('iframe[title="A Progressive Leasing tool for Lease Cost Estimator"]').contentFrame().getByRole('textbox', { name: 'Cash price' }).press('Tab');
    await page.locator('iframe[title="A Progressive Leasing tool for Lease Cost Estimator"]').contentFrame().getByRole('radio', { name: 'Every other week' }).check();
    await page.locator('iframe[title="A Progressive Leasing tool for Lease Cost Estimator"]').contentFrame().getByRole('button', { name: 'Get my estimate' }).click();
    await page.locator('iframe[title="A Progressive Leasing tool for Lease Cost Estimator"]').contentFrame().getByRole('heading', { name: '-month lease-to-own summary' }).click();
    await page.locator('iframe[title="A Progressive Leasing tool for Lease Cost Estimator"]').contentFrame().getByRole('heading', { name: 'Total of Payments' }).click();
    await page.locator('iframe[title="A Progressive Leasing tool for Lease Cost Estimator"]').contentFrame().getByRole('button', { name: 'Continue to apply' }).click();
});

test('ProgWeb estimator Twice per month', async ({ page }) => {
    await page.goto('https://slc-rcpwebpws.stormwind.local/myaccount/find-store/location');
    await page.getByRole('button', { name: 'Accept' }).click();
    await page.locator('div').filter({ hasText: /^City or ZIP$/ }).nth(3).click();
    await page.locator('#pg-input-0').fill('84009');
    await page.getByText('South Jordan, UT 84009, USA').click();
    await page.getByRole('img', { name: 'Best Buy' }).click();
    await page.getByText('Best Buy Blocked Test 7.1 mi').click();
    await page.getByRole('button', { name: 'Estimate leasing cost' }).click();
    await page.locator('iframe[title="A Progressive Leasing tool for Lease Cost Estimator"]').contentFrame().getByRole('textbox', { name: 'Cash price' }).click();
    await page.locator('iframe[title="A Progressive Leasing tool for Lease Cost Estimator"]').contentFrame().getByRole('textbox', { name: 'Cash price' }).fill('3000.00');
    await page.locator('iframe[title="A Progressive Leasing tool for Lease Cost Estimator"]').contentFrame().getByRole('textbox', { name: 'Cash price' }).press('Tab');
    await page.locator('iframe[title="A Progressive Leasing tool for Lease Cost Estimator"]').contentFrame().getByRole('radio', { name: 'Twice per month' }).check();
    await page.locator('iframe[title="A Progressive Leasing tool for Lease Cost Estimator"]').contentFrame().getByRole('button', { name: 'Get my estimate' }).click();
    await page.locator('iframe[title="A Progressive Leasing tool for Lease Cost Estimator"]').contentFrame().getByRole('heading', { name: '-month lease-to-own summary' }).click();
    await page.locator('iframe[title="A Progressive Leasing tool for Lease Cost Estimator"]').contentFrame().getByRole('heading', { name: 'Total of Payments' }).click();
    await page.locator('iframe[title="A Progressive Leasing tool for Lease Cost Estimator"]').contentFrame().getByRole('button', { name: 'Continue to apply' }).click();
});

test('ProgWeb estimator Every month', async ({ page }) => {
    await page.goto('https://slc-rcpwebpws.stormwind.local/myaccount/find-store/location');
    await page.getByRole('button', { name: 'Accept' }).click();
    await page.locator('div').filter({ hasText: /^City or ZIP$/ }).nth(3).click();
    await page.locator('#pg-input-0').fill('84009');
    await page.getByText('South Jordan, UT 84009, USA').click();
    await page.getByRole('img', { name: 'Best Buy' }).click();
    await page.getByText('Best Buy Blocked Test 7.1 mi').click();
    await page.getByRole('button', { name: 'Estimate leasing cost' }).click();
    await page.locator('iframe[title="A Progressive Leasing tool for Lease Cost Estimator"]').contentFrame().getByRole('textbox', { name: 'Cash price' }).click();
    await page.locator('iframe[title="A Progressive Leasing tool for Lease Cost Estimator"]').contentFrame().getByRole('textbox', { name: 'Cash price' }).fill('3000.00');
    await page.locator('iframe[title="A Progressive Leasing tool for Lease Cost Estimator"]').contentFrame().getByRole('textbox', { name: 'Cash price' }).press('Tab');
    await page.locator('iframe[title="A Progressive Leasing tool for Lease Cost Estimator"]').contentFrame().getByRole('radio', { name: 'Every month' }).check();
    await page.locator('iframe[title="A Progressive Leasing tool for Lease Cost Estimator"]').contentFrame().getByRole('button', { name: 'Get my estimate' }).click();
    await page.locator('iframe[title="A Progressive Leasing tool for Lease Cost Estimator"]').contentFrame().getByRole('heading', { name: '-month lease-to-own summary' }).click();
    await page.locator('iframe[title="A Progressive Leasing tool for Lease Cost Estimator"]').contentFrame().getByRole('heading', { name: 'Total of Payments' }).click();
    await page.locator('iframe[title="A Progressive Leasing tool for Lease Cost Estimator"]').contentFrame().getByRole('button', { name: 'Continue to apply' }).click();
});