import {Locator, type Page} from '@playwright/test';

class B_ApplyWidget {
    readonly page: Page;
    readonly parent: string = 'pc-mobile-view';
    readonly applyButton: Locator;
    readonly estimatePaymentsButton: Locator;
    readonly iAgreeCheckbox: Locator;
    readonly startMyApplicationButton: Locator;
    readonly contactInfoEmailField: Locator;
    readonly contactInfoMobilePhoneField: Locator;
    readonly contactInfoContinueButton:Locator;
    readonly personalInfoFirstNameField: Locator;
    readonly personalInfoLastNameField: Locator;
    readonly personalInfoDobField: Locator;
    readonly personalInfoSsnField: Locator;
    readonly personalInfoContinueButton: Locator;
    readonly homeAddressStreetAddressField: Locator;
    readonly homeAddressAptField:Locator;
    readonly homeAddressCityField:Locator;
    readonly homeAddressStateField:Locator;
    readonly homeAddressZipField:Locator;
    readonly homeAddressContinueButton:Locator;
    readonly incomeInfoMonthlyIncomeField:Locator;
    readonly incomeInfoLastPayDayField:Locator;
    readonly incomeInfonextPayDayField:Locator;
    readonly incomeInfoPayFrequencyDropDown:Locator;
    readonly incomeInfoContinueButton:Locator;
    readonly cardInfoFirstNameField:Locator;
    readonly cardInfoLastNameField:Locator;
    readonly cardInfoCardNumberField:Locator;
    readonly cardInfoExpDateField:Locator;
    readonly cardInfoCvv:Locator;
    readonly cardInfoContinueButton:Locator;
    readonly bankInfoRoutingField:Locator;
    readonly bankInfoAccountField:Locator;
    readonly bankInfoContinueButton:Locator;
    readonly reviewYourInfoContinueButton:Locator;
    readonly submitApplicationButton:Locator;
    readonly yourApprovedContinueButton:Locator;
    readonly leaseOverviewContinueButton:Locator;
    readonly dueTodayVerifyPaymentButton:Locator;
    readonly reviewAndSignPaymentDueCheckbox:Locator;
    readonly reviewAndSignRecurringPaymentCheckbox:Locator;
    readonly reviewAndSignAgreeAndContinueButton:Locator;
    readonly reviewAndSignSignAndContinueButton:Locator;
    readonly checkoutPlaceOrderWithLowesButton:Locator;


    constructor(page: Page) {
        this.page = page;
        this.applyButton = this.page.locator('span.grit-component.pc-dark-button button.pc-dark-button-primary.pc-dark-button-md');
        this.estimatePaymentsButton = this.page.locator('pc-estimate-button');
        this.iAgreeCheckbox = this.page.locator('#-control-checkbox_oszbq');
        this.startMyApplicationButton = this.page.locator('div > pc-dark-button');
        this.contactInfoEmailField = this.page.locator('#email-input');
        this.contactInfoMobilePhoneField = this.page.locator('#phone-number');
        this.contactInfoContinueButton = this.page.locator('pc-primary-button.hydrated');
        this.personalInfoFirstNameField = this.page.locator('#First\\[object\\ Object\\]');
        this.personalInfoLastNameField = this.page.locator('#Last\\[object\\ Object\\]');
        this.personalInfoDobField = this.page.locator('#date-of-birth');
        this.personalInfoSsnField = this.page.locator('#ssn-input');
        this.personalInfoContinueButton = this.page.locator('pc-primary-button.hydrated');
        this.homeAddressStreetAddressField = this.page.locator('#address1-input');
        this.homeAddressAptField = this.page.locator('#address2-input');
        this.homeAddressCityField = this.page.locator('#city-input');
        this.homeAddressStateField = this.page.locator('#state-input');
        this.homeAddressZipField = this.page.locator('#zipcode-input');
        this.homeAddressContinueButton = this.page.locator('pc-primary-button.hydrated');
        this.incomeInfoMonthlyIncomeField = this.page.locator('#currency-input');
        this.incomeInfoLastPayDayField = this.page.locator('#last-pay-day-input');
        this.incomeInfonextPayDayField = this.page.locator('#next-pay-day-input');
        this.incomeInfoPayFrequencyDropDown = this.page.locator('#select-input');
        this.incomeInfoContinueButton = this.page.locator('pc-primary-button.hydrated');
        this.cardInfoFirstNameField = this.page.locator('#First\\[object\\ Object\\]');
        this.cardInfoLastNameField = this.page.locator('#Last\\[object\\ Object\\]');
        this.cardInfoCardNumberField = this.page.locator('#card-input');
        this.cardInfoExpDateField = this.page.locator('#cc-exp-date-input');
        this.cardInfoCvv = this.page.locator('#cc-cvv-input');
        this.cardInfoContinueButton = this.page.locator('pc-primary-button.hydrated');
        this.bankInfoRoutingField = this.page.locator('#routing-number-input');
        this.bankInfoAccountField = this.page.locator('#checking-account-input');
        this.bankInfoContinueButton = this.page.locator('pc-primary-button.hydrated');
        this.reviewYourInfoContinueButton = this.page.locator('pc-primary-button.hydrated');
        this.submitApplicationButton = this.page.locator('pc-primary-button.hydrated');
        this.yourApprovedContinueButton = this.page.locator('pc-primary-button.hydrated');
        this.leaseOverviewContinueButton = this.page.locator('pc-primary-button.hydrated');
        this.dueTodayVerifyPaymentButton = this.page.locator('pc-primary-button.hydrated');
        this.reviewAndSignPaymentDueCheckbox = this.page.locator('#-control-checkbox_xudwh');
        this.reviewAndSignRecurringPaymentCheckbox = this.page.locator('#-control-checkbox_hmwhq');
        this.reviewAndSignAgreeAndContinueButton = this.page.locator('span.grit-component.grit-button button.grit-button-primary.grit-button-md');
        this.reviewAndSignSignAndContinueButton = this.page.locator('span#continue-button-loading.grit-component.grit-button button#continue-button-button-element.grit-button-primary.grit-button-md');
        this.checkoutPlaceOrderWithLowesButton = this.page.locator('pc-primary-button.hydrated');
    }

    async clickApplyButton() {
        await this.applyButton.click();
    }

    async clickIAgreeCheckbox() {
        await this.iAgreeCheckbox.check();
    }

    async clickStartMyApplicationButton() {
        await this.startMyApplicationButton.click();
    }

    async contactInfoEmailAddress() {
        await this.contactInfoEmailField.fill('testemailaddress@progleasing.com');
    }

    async contactInfoMobilePhone() {
        await this.contactInfoMobilePhoneField.fill('8015551234');
    }

    async clickContactInfoContinueButton() {
        await this.contactInfoContinueButton.click();
    }

    async personalInfoFirstName() {
        await this.personalInfoFirstNameField.fill('TestFirst');
    }

    async personalInfoLastName() {
        await this.personalInfoLastNameField.fill('TestLast');
    }

    async personalInfoDob() {
        await this.personalInfoDobField.fill('01/01/1989')
    }

    async personalInfoSsn() {
        await this.personalInfoSsnField.fill('5555431234')
    }

    async personalInfoContinue() {
        await this.personalInfoContinueButton.click();
    }

    async fillHomeAddressStreetAddress() {
        await this.homeAddressStreetAddressField.fill('256 W Data Dr');
    }

    async fillHomeAddressApt() {
        await this.homeAddressAptField.fill('');
    }

    async fillHomeAddressCity() {
        await this.homeAddressCityField.fill('Draper');
    }

    async fillHomeAddressState() {
        await this.homeAddressStateField.fill('UT');
    }

    async fillHomeAddressZip() {
        await this.homeAddressZipField.fill('84020')
    }

    async clickHomeAddressContinueButton() {
        await this.homeAddressContinueButton.click();
    }

    async fillIncomeInfoMonthlyIncome() {
        await this.incomeInfoMonthlyIncomeField.fill('1100');
    }

    async fillIncomeInfoLastPayDay() {
        await this.incomeInfoLastPayDayField.fill('03/01/2025');
    }

    async fillIncomeInfonextPayDayField() {
        await this.incomeInfonextPayDayField.fill('03/15/2025');
    }

    async enterIncomeInfoPayFrequencyDropDown() {
        await this.incomeInfoPayFrequencyDropDown.selectOption('Weekly');
    }

    async clickIncomeInfoContinueButton() {
        await this.incomeInfoContinueButton.click();
    }

    async fillCardInfoFirstNameField() {
        await this.cardInfoFirstNameField.fill('Firstname');
    }

    async fillCardInfoLastNameField() {
        await this.cardInfoLastNameField.fill('Lastname')
    }

    async fillCardInfoCardNumberField() {
        await this.cardInfoCardNumberField.fill('373953192351004')
    }

    async fillCardInfoExpDateField() {
        await this.cardInfoExpDateField.fill("01/27")
    }

    async fillCardInfoCvv() {
        await this.cardInfoCvv.fill('123')
    }

    async clickCardInfoContinueButton() {
        await this.cardInfoContinueButton.click()
    }

    async fillBankInfoRoutingField() {
        await this.bankInfoRoutingField.fill('123456789')
    }

    async fillBankInfoAccountField() {
        await this.bankInfoAccountField.fill('12345678890')
    }

    async clickBankInfoContinueButton() {
        await this.bankInfoContinueButton.click();
    }

    async clickReviewYourInfoContinueButton() {
        await this.reviewYourInfoContinueButton.click();
    }

    async clickSubmitApplicationButton() {
        await this.submitApplicationButton.click();
    }

    async clickYourApprovedContinueButton() {
        await this.yourApprovedContinueButton.click();
    }

    async clickLeaseOverviewContinueButton() {
        await this.leaseOverviewContinueButton.click();
    }

    async clickDueTodayVerifyPaymentButton() {
        await this.dueTodayVerifyPaymentButton.click();
    }

    async checkReviewAndSignPaymentDueCheckbox() {
        await this.reviewAndSignPaymentDueCheckbox.check();
    }

    async checkReviewAndSignRecurringPaymentCheckbox() {
        await this.reviewAndSignRecurringPaymentCheckbox.check();
    }

    async clickReviewAndSignAgreeAndContinueButton() {
        await this.reviewAndSignAgreeAndContinueButton.click();
    }

    async clickReviewAndSignSignAndContinueButton() {
        await this.reviewAndSignSignAndContinueButton.click();
    }

    async clickCheckoutPlaceOrderWithLowesButton() {
        await this.checkoutPlaceOrderWithLowesButton.click();
    }

}
export default B_ApplyWidget;