// lowes approve me estimator
import { type Page, type Locator, expect } from '@playwright/test';
import {PaymentFrequency} from "../../data/paymentFrequency";

class M_LeaseEstimator {

    readonly page: Page;
    readonly linkPaymentEstimator: Locator;
    readonly fieldPriceOfItems: Locator;
    readonly menuPaymentFrequency: Locator;
    readonly textPaymentDetails: Locator;
    readonly headingPaymentDetails: Locator;
    readonly initPayDetail: Locator;
    readonly iconXClose: Locator;
    readonly buttonClose: Locator;

    constructor(page: Page) {
        this.page = page;
        this.fieldPriceOfItems = page.getByPlaceholder('0');
        this.menuPaymentFrequency = page.locator('#pay_frequency');
        this.textPaymentDetails = page.getByText('See payment details');
        this.headingPaymentDetails = page.getByText('Payment Details', { exact: true });
        this.initPayDetail = page.getByText('Initial payment Initial');
        this.iconXClose = page.getByText('×');
        this.buttonClose = page.getByText('CLOSE');
    }

    async enterPriceOfItems(amount: string) {
        await this.fieldPriceOfItems.click();
        await this.fieldPriceOfItems.fill(amount);
        await this.fieldPriceOfItems.press('Tab');
    }

    async _selectPaymentFrequency(payFreq: PaymentFrequency) {
        switch (payFreq) {
            case PaymentFrequency.Weekly: {
                await this.page.locator('#pay_frequency').selectOption('string:Weekly');
                await this.page.waitForTimeout(250);
                break;
            }
            case PaymentFrequency.BiWeekly: {
                await this.page.locator('#pay_frequency').selectOption('string:BiWeekly');
                await this.page.waitForTimeout(250);
                break;
            }
            case PaymentFrequency.SemiMonthly: {
                await this.page.locator('#pay_frequency').selectOption('string:SemiMonthly');
                await this.page.waitForTimeout(250);
                break;
            }
            case PaymentFrequency.Monthly: {
                await this.page.locator('#pay_frequency').selectOption('string:Monthly');
                await this.page.waitForTimeout(250);
                break;
            }
        }
    }

    async verifyEstimateLaunch() {
        await this.page.getByRole('heading', { name: 'Lease details' }).click();
        await this.initPayDetail.click();
        await this.textPaymentDetails.click();
        await this.headingPaymentDetails.click();
    }

    async closeEstimator() {
        await this.iconXClose.click();
        await this.buttonClose.click();
    }

    async happyPathEstimate(priceOfItems: string, payFreq: PaymentFrequency) {
        await this.enterPriceOfItems(priceOfItems);
        await this._selectPaymentFrequency(payFreq);
        await this.verifyEstimateLaunch();
        await this.closeEstimator();
    }

}
export default M_LeaseEstimator;