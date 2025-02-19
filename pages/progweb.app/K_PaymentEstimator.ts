// signet_jared approve me payment estimator
import { type Page, type Locator, expect, FrameLocator } from '@playwright/test';
import {PaymentFrequency} from "../../data/paymentFrequency";

class I_PaymentEstimator {

    readonly page: Page;
    readonly linkPaymentEstimator: Locator;
    readonly fieldCostOfItems: Locator;

    readonly buttonRadioEveryWeek: Locator;
    readonly buttonRadioEveryOtherWeek: Locator;
    readonly buttonRadioTwicePerMonth: Locator;
    readonly buttonRadioEveryMonth: Locator;
    readonly menuState: Locator;
    readonly buttonGetMyEstimate: Locator;
    readonly heading12MonthLTOSummary: Locator;
    readonly textHangtag: Locator;
    readonly buttonContinueToApply: Locator;
    readonly buttonCloseEstimatorX: Locator;
    readonly declineCache: Locator;
    readonly frame: FrameLocator;

    constructor(page: Page) {
        this.page = page;
        this.linkPaymentEstimator = page.getByRole('button', { name: 'Estimate leasing cost' });
        this.frame = page.frameLocator('iframe[title = "A Progressive Leasing tool for Lease Cost Estimator"]');
        this.fieldCostOfItems = page.locator('label:has-text("Cash price")+input');
        this.buttonRadioEveryWeek = page.getByLabel('Every week');
        this.buttonRadioEveryOtherWeek = page.getByLabel('Every other week');
        this.buttonRadioTwicePerMonth = page.locator('#select-twice-month_label');
        this.buttonRadioEveryMonth = page.getByLabel('Every month');
        this.menuState = page.locator('#lce-iframe').contentFrame().getByLabel('State');
        this.buttonGetMyEstimate = page.locator('#get-my-estimate-button-button-element');
        this.heading12MonthLTOSummary = page.locator('#lce-iframe').contentFrame().getByRole('heading', { name: '-month lease-to-own estimate' });
        this.textHangtag = page.locator('#lce-iframe').contentFrame().getByText('This is an estimate of what');
        this.buttonContinueToApply = page.locator('#lce-iframe').contentFrame().getByLabel('Continue to apply');
        this.buttonCloseEstimatorX = page.getByText('X', { exact: true });
        this.declineCache = page.getByRole('button', { name: 'Accept' });

    }

    async launchPaymentEstimator() {
        await this.declineCache.click();
        await this.linkPaymentEstimator.click();
        await this.page.waitForTimeout(250);
    }

    async _enterCostOfItemsAsString(cost: string) {
        await this.frame.locator('label:has-text("Cash price")+input').click();
        await this.frame.locator('label:has-text("Cash price")+input').fill(cost);
        await this.page.waitForTimeout(100);
        await this.frame.locator('label:has-text("Cash price")+input').press('Tab');
        await this.page.waitForTimeout(100);
    }

    async _selectPaymentFrequency(payFreq: PaymentFrequency) {
        switch (payFreq) {
            case PaymentFrequency.Weekly: {
                await this.frame.getByLabel('Every week').click();
                await this.page.waitForTimeout(250);
                break;
            }
            case PaymentFrequency.BiWeekly: {
                await this.frame.getByLabel('Every other week').click();
                await this.page.waitForTimeout(250);
                await this.frame.getByLabel('Every other week').press('Tab');
                break;
            }
            case PaymentFrequency.SemiMonthly: {
                this.frame.getByLabel('Twice per month').click();
                await this.page.waitForTimeout(250);
                await this.frame.getByLabel('Twice per month').press('Tab');
                break;
            }
            case PaymentFrequency.Monthly: {
                this.frame.getByLabel('Every month').click();
                await this.page.waitForTimeout(250);
                await this.frame.getByLabel('Every month').press('Tab');
                break;
            }
        }
    }

    async _enterTwoLetterState(state: string) {
        await this.menuState.selectOption(state);
    }

    async _getMyEstimate() {
        try {
            await this.frame.getByLabel('Get my estimate').click();
        } catch (error) {
            console.log(error);
        }
    }

    async _verifyEstimateLaunch() {
        await expect(this.frame.getByRole('heading', { name: '-month lease-to-own estimate' })).toBeVisible();
        await expect(this.frame.getByText('This is an estimate of what')).toBeVisible();
    }

    async _continueToApply() {
        await this.buttonContinueToApply.click();
    }

    async _closeEstimator() {
        await this.buttonCloseEstimatorX.click();
    }

    async happyPathEstimate(costOfItemsAsString: string, payFrequencyIn: PaymentFrequency) {
        await this.launchPaymentEstimator();
        await this._enterCostOfItemsAsString(costOfItemsAsString);
        await this._selectPaymentFrequency(payFrequencyIn);
        await this.page.waitForTimeout(500);
        await this._getMyEstimate();
        await this._verifyEstimateLaunch();
    }

}
export default I_PaymentEstimator;