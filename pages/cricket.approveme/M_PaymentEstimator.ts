// cricket approve me payment estimator
import { type Page, type Locator, expect } from '@playwright/test';
import {PaymentFrequency} from "../../data/paymentFrequency";

class M_PaymentEstimator {

    readonly page: Page;
    readonly linkPaymentEstimator: Locator;
    readonly fieldCostOfItems: Locator;

    readonly buttonRadioEveryWeek: Locator;
    readonly buttonRadioEveryOtherWeek: Locator;
    readonly buttonRadioTwicePerMonth: Locator;
    readonly buttonRadioEveryMonth: Locator;

    readonly buttonGetMyEstimate: Locator;

    readonly headingInitialPayment: Locator;
    readonly headingTotalPayments: Locator;
    readonly headingHangTag: Locator;

    constructor(page: Page) {
        this.page = page;

        this.linkPaymentEstimator = page.getByText('estimator');

        this.fieldCostOfItems = page.locator('#lce-iframe').contentFrame().getByLabel('Cash price');

        this.buttonRadioEveryWeek = page.locator('#lce-iframe').contentFrame().getByLabel('Every week');
        this.buttonRadioEveryOtherWeek = page.locator('#lce-iframe').contentFrame().getByLabel('Every other week');
        this.buttonRadioTwicePerMonth = page.locator('#lce-iframe').contentFrame().getByLabel('Twice per month');
        this.buttonRadioEveryMonth = page.locator('#lce-iframe').contentFrame().getByLabel('Every month');

        this.buttonGetMyEstimate = page.locator('#lce-iframe').contentFrame().getByLabel('Get my estimate');

        this.headingInitialPayment = page.locator('#lce-iframe').contentFrame().getByText('Initial payment', { exact: true });
        this.headingTotalPayments = page.locator('#lce-iframe').contentFrame().getByRole('heading', { name: 'Total of Payments' });
        this.headingHangTag = page.locator('#lce-iframe').contentFrame().getByRole('heading', { name: '-month lease-to-own summary' });
    }

    async _enterCostOfItemsAsString(cost: string) {
        await this.fieldCostOfItems.click({force: true});
        await this.fieldCostOfItems.clear();
        await this.fieldCostOfItems.fill(cost);
        await this.page.waitForTimeout(100);
        await this.fieldCostOfItems.press('Tab');
        await this.page.waitForTimeout(100);
    }

    async _selectPaymentFrequency(payFreq: PaymentFrequency) {
        switch (payFreq) {
            case PaymentFrequency.Weekly: {
                await this.buttonRadioEveryWeek.click();
                await this.page.waitForTimeout(250);
                break;
            }
            case PaymentFrequency.BiWeekly: {
                await this.buttonRadioEveryOtherWeek.click();
                await this.page.waitForTimeout(250);
                break;
            }
            case PaymentFrequency.SemiMonthly: {
                await this.buttonRadioTwicePerMonth.click();
                await this.page.waitForTimeout(250);
                break;
            }
            case PaymentFrequency.Monthly: {
                await this.buttonRadioEveryMonth.click();
                await this.page.waitForTimeout(250);
                break;
            }
        }
    }

    async _getMyEstimate() {
        await this.buttonGetMyEstimate.click();
    }

    async _verifyEstimateLaunch() {
        await expect(this.headingInitialPayment).toBeVisible({timeout: 5000});
        await expect(this.headingTotalPayments).toBeVisible({timeout: 5000});
        await expect(this.headingHangTag).toBeVisible({timeout: 5000});
    }

    async happyPathEstimate(costOfItemsAsString: string, payFrequencyIn: PaymentFrequency) {
        await this._enterCostOfItemsAsString(costOfItemsAsString);
        await this._selectPaymentFrequency(payFrequencyIn);
        await this._getMyEstimate();
        await this._verifyEstimateLaunch();
    }

}
export default M_PaymentEstimator;