import { test, expect } from '@playwright/test';
import A_LoginPage from '../../pages/progweb.app/A_LoginPage';
import B_SelectShop from '../../pages/progweb.app/B_SelectShop';
import HappyPathApproved from 'data/progweb.approveme/HappyPathApproved';
import I_PaymentEstimator from '$pages/progweb.app/K_PaymentEstimator';
import { PaymentFrequency } from 'data/paymentFrequency';

test.describe('navigation', async () => {

    test.describe.configure({ retries: 0 });
    test.describe.configure({ mode: 'serial' });

    test('estimate Every week', { tag: ['@progweb','@estimate'] }, async ({ browser }) => {
        await expect(async () => {
            const bCont = await browser.newContext();
            const cPage = await bCont.newPage();

            let happyPathApproved = new HappyPathApproved();

            let loginPage = new A_LoginPage(cPage);
            await loginPage.happyPathPopulate(happyPathApproved.getLoginData);
            await cPage.waitForTimeout(1000);

            let selectShop = new B_SelectShop(cPage);
            await selectShop.clickForShop();
            await selectShop.navigateLocation();
            await selectShop._selectCityWithCode(happyPathApproved.getShopDetails[0]);
            await selectShop._selectOnline();
            await selectShop._selectShopName();
            await cPage.waitForTimeout(1000);

            let paymentEstimator = new I_PaymentEstimator(cPage);
            await paymentEstimator.happyPathEstimate('2999', PaymentFrequency.Weekly);

            await cPage.close();
            await bCont.close();

        }).toPass({ timeout: 400000 });
    });

    test('estimate twice a week', { tag: ['@progweb','@estimate'] }, async ({ browser }) => {
        await expect(async () => {
            const bCont = await browser.newContext();
            const cPage = await bCont.newPage();

            let happyPathApproved = new HappyPathApproved();

            let loginPage = new A_LoginPage(cPage);
            await loginPage.happyPathPopulate(happyPathApproved.getLoginData);
            await cPage.waitForTimeout(1000);

            let selectShop = new B_SelectShop(cPage);
            await selectShop.clickForShop();
            await selectShop.navigateLocation();
            await selectShop._selectCityWithCode(happyPathApproved.getShopDetails[0]);
            await selectShop._selectOnline();
            await selectShop._selectShopName();
            await cPage.waitForTimeout(1000);

            let paymentEstimator = new I_PaymentEstimator(cPage);
            await paymentEstimator.happyPathEstimate('2999', PaymentFrequency.BiWeekly);

            await cPage.close();
            await bCont.close();

        }).toPass({ timeout: 400000 });
    });
    test('estimate twice a month', { tag: ['@progweb','@estimate'] }, async ({ browser }) => {
        await expect(async () => {
            const bCont = await browser.newContext();
            const cPage = await bCont.newPage();

            let happyPathApproved = new HappyPathApproved();

            let loginPage = new A_LoginPage(cPage);
            await loginPage.happyPathPopulate(happyPathApproved.getLoginData);
            await cPage.waitForTimeout(1000);

            let selectShop = new B_SelectShop(cPage);
            await selectShop.clickForShop();
            await selectShop.navigateLocation();
            await selectShop._selectCityWithCode(happyPathApproved.getShopDetails[0]);
            await selectShop._selectOnline();
            await selectShop._selectShopName();
            await cPage.waitForTimeout(1000);

            let paymentEstimator = new I_PaymentEstimator(cPage);
            await paymentEstimator.happyPathEstimate('2999', PaymentFrequency.SemiMonthly);

            await cPage.close();
            await bCont.close();

        }).toPass({ timeout: 400000 });
    });
    test('estimate monthly', { tag: ['@progweb','@estimate'] }, async ({ browser }) => {
        await expect(async () => {
            const bCont = await browser.newContext();
            const cPage = await bCont.newPage();

            let happyPathApproved = new HappyPathApproved();

            let loginPage = new A_LoginPage(cPage);
            await loginPage.happyPathPopulate(happyPathApproved.getLoginData);
            await cPage.waitForTimeout(1000);

            let selectShop = new B_SelectShop(cPage);
            await selectShop.clickForShop();
            await selectShop.navigateLocation();
            await selectShop._selectCityWithCode(happyPathApproved.getShopDetails[0]);
            await selectShop._selectOnline();
            await selectShop._selectShopName();
            await cPage.waitForTimeout(1000);

            let paymentEstimator = new I_PaymentEstimator(cPage);
            await paymentEstimator.happyPathEstimate('2999', PaymentFrequency.Monthly);

            await cPage.close();
            await bCont.close();

        }).toPass({ timeout: 400000 });

    });
});