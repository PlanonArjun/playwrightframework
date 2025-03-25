
// mattressfirm approve me payment estimator
import { type Page, type Locator, expect } from '@playwright/test';
import {PaymentFrequency} from "../../data/paymentFrequency";

class S_PaymentEstimator {

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

    constructor(page: Page) {
        this.page = page;
        this.linkPaymentEstimator = page.getByText('Payment Estimator');
        this.fieldCostOfItems = page.locator('#lce-iframe').contentFrame().getByRole('textbox', { name: 'Cash price' });

        this.buttonRadioEveryWeek = page.locator('#lce-iframe').contentFrame().getByLabel('Every week');
        this.buttonRadioEveryOtherWeek = page.locator('#lce-iframe').contentFrame().getByLabel('Every other week');
        this.buttonRadioTwicePerMonth = page.locator('#lce-iframe').contentFrame().getByLabel('Twice per month')
        this.buttonRadioEveryMonth = page.locator('#lce-iframe').contentFrame().getByLabel('Every month')
        this.menuState = page.locator('#lce-iframe').contentFrame().getByLabel('State');
        this.buttonGetMyEstimate = page.locator('#lce-iframe').contentFrame().getByRole('button', { name: 'Get my estimate' });

        this.heading12MonthLTOSummary = page.locator('#lce-iframe').contentFrame().getByRole('heading', { name: '-month lease-to-own estimate' });
        this.textHangtag = page.locator('#lce-iframe').contentFrame().getByText('This is an estimate of what');

        this.buttonContinueToApply = page.locator('#lce-iframe').contentFrame().getByLabel('Continue to apply');
    }

    async launchPaymentEstimator() {
        /* This unconventional path to the estimator is here because it
        works consistently for all desktop and mobile browsers we need.
         */
        await this.page.waitForTimeout(500);
        await this.page.getByText('estimator').click();
        await this.page.waitForTimeout(250);
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

    /*
    Not currently used but don't remove it.
    */
    async _enterTwoLetterState(state : string) {
        await this.menuState.selectOption(state);
    }

    async _getMyEstimate() {
        await this.buttonGetMyEstimate.click();
    }

    async _verifyEstimateLaunch() {
        await this.heading12MonthLTOSummary.click();
        await this.textHangtag.click();
    }

    async _continueToApply() {
        await this.buttonContinueToApply.click();
    }

    async happyPathEstimate(costOfItemsAsString: string, payFrequencyIn: PaymentFrequency/*, twoLetterState: string*/) {
        await this._enterCostOfItemsAsString(costOfItemsAsString);
        await this._selectPaymentFrequency(payFrequencyIn);
        await this.page.keyboard.press('Tab');
        /*
        On 2025-02-17 I noticed they had removed the state menu from this flow.
        On 2025-02-21 I noticed they put it back....
        And this has repeated several times.
        Leave this in here, and comment it out, or not, as per the current state.
        */

        /*await this._enterTwoLetterState(twoLetterState);*/
        await this._getMyEstimate();
        await this._verifyEstimateLaunch();
        await this._continueToApply();
    }

}
export default S_PaymentEstimator;
