import test, {expect} from '@playwright/test';
import A_MarketingPage from '../../pages/biglots.approveme.deprecated/A_MarketingPage';
import S_PaymentEstimator, {PaymentFrequency} from '../../pages/biglots.approveme.deprecated/S_PaymentEstimator';

test.describe('estimate', async () => {

    test.describe.configure({ retries: 0 });
    test.describe.configure({ mode: 'parallel' });

    /**
     * @deprecated
     */
    test.skip('estimate Every week', { tag: ['@biglots', '@approveme', '@happypath', '@estimate'] }, async ({ browser }) => {
        await expect(async () => {
            const bCont = await browser.newContext();
            const cPage = await bCont.newPage();

            let a_marketingPage = new A_MarketingPage(cPage);
            await a_marketingPage.navigateResume();
            await cPage.waitForTimeout(3000);

            let s_paymentEstimator = new S_PaymentEstimator(cPage);
            await s_paymentEstimator.happyPathEstimate('2999', PaymentFrequency.Weekly, 'SC');

            await cPage.close();
            await bCont.close();

        }).toPass({ timeout: 90000 });
    });

    /**
     * @deprecated
     */
    test.skip('estimate Every other week', { tag: ['@biglots', '@approveme', '@happypath', '@estimate'] }, async ({ browser }) => {
        await expect(async () => {
            const bCont = await browser.newContext();
            const cPage = await bCont.newPage();

            let marketingPage = new A_MarketingPage(cPage);
            await marketingPage.navigateResume();
            await cPage.waitForTimeout(3000);

            let s_paymentEstimator = new S_PaymentEstimator(cPage);
            await s_paymentEstimator.happyPathEstimate('5000', PaymentFrequency.BiWeekly, 'ND');

            await cPage.close();
            await bCont.close();

        }).toPass({ timeout: 90000 });
    });

    /**
     * @deprecated
     */
    test.skip('estimate Twice per month', { tag: ['@biglots', '@approveme', '@happypath', '@estimate'] }, async ({ browser }) => {
        await expect(async () => {
            const bCont = await browser.newContext();
            const cPage = await bCont.newPage();

            let a_marketingPage = new A_MarketingPage(cPage);
            await a_marketingPage.navigateResume();
            await cPage.waitForTimeout(3000);

            let s_paymentEstimator = new S_PaymentEstimator(cPage);
            await s_paymentEstimator.happyPathEstimate('4000', PaymentFrequency.SemiMonthly, 'CA');
            await cPage.waitForTimeout(5000);

            await cPage.close();
            await bCont.close();

        }).toPass({ timeout: 90000 });
    });

    /**
     * @deprecated
     */
    test.skip('estimate Every month', { tag: ['@biglots', '@approveme', '@happypath', '@estimate'] }, async ({ browser }) => {
        await expect(async () => {
            const bCont = await browser.newContext();
            const cPage = await bCont.newPage();

            let a_marketingPage = new A_MarketingPage(cPage);
            await a_marketingPage.navigateResume();
            await cPage.waitForTimeout(3000);

            let s_paymentEstimator = new S_PaymentEstimator(cPage);
            await s_paymentEstimator.happyPathEstimate('3001', PaymentFrequency.Monthly, 'UT');
            await cPage.waitForTimeout(5000);

            await cPage.close();
            await bCont.close();

        }).toPass({ timeout: 90000 });
    });

});