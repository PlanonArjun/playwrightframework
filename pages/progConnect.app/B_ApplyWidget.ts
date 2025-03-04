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

    constructor(page: Page) {
        this.page = page;
        this.applyButton = this.page.locator('span.grit-component.pc-dark-button button.pc-dark-button-primary.pc-dark-button-md');
        this.estimatePaymentsButton = this.page.locator('pc-estimate-button');
        this.iAgreeCheckbox = this.page.locator('#-control-checkbox_oszbq');
        this.startMyApplicationButton = this.page.locator('div > pc-dark-button');
        this.contactInfoEmailField = this.page.locator('#email-input');
        this.contactInfoMobilePhoneField = this.page.locator('#phone-number');
        this.contactInfoContinueButton = this.page.locator('');
        this.personalInfoFirstNameField = this.page.locator('#First\\[object\\ Object\\]');
        this.personalInfoLastNameField = this.page.locator('#Last\\[object\\ Object\\]');
        this.personalInfoDobField = this.page.locator('#date-of-birth');
        this.personalInfoSsnField = this.page.locator('#ssn-input');
        this.personalInfoContinueButton = this.page.locator('span > button > span');
        this.homeAddressStreetAddressField = this.page.locator('');
        this.homeAddressAptField = this.page.locator('');
        this.homeAddressCityField = this.page.locator('');
        this.homeAddressStateField = this.page.locator('');
        this.homeAddressZipField = this.page.locator('');
        this.homeAddressContinueButton = this.page.locator('');
        this.incomeInfoMonthlyIncomeField = this.page.locator('');
        this.incomeInfoLastPayDayField = this.page.locator('');
        this.incomeInfonextPayDayField = this.page.locator('');
        this.incomeInfoPayFrequencyDropDown = this.page.locator('');
        this.incomeInfoContinueButton = this.page.locator('');
        this.cardInfoFirstNameField = this.page.locator('');
        this.cardInfoLastNameField = this.page.locator('');
        this.cardInfoCardNumberField = this.page.locator('');
        this.cardInfoExpDateField = this.page.locator('');
        this.cardInfoCvv = this.page.locator('');
        this.cardInfoContinueButton = this.page.locator('');
        this.bankInfoRoutingField = this.page.locator('');
        this.bankInfoAccountField = this.page.locator('');
        this.bankInfoContinueButton = this.page.locator('');
        this.reviewYourInfoContinueButton = this.page.locator('');
        this.submitApplicationButton = this.page.locator('');
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
        await this.incomeInfoPayFrequencyDropDown.selectOption('Biweekly');
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
        await this.cardInfoCardNumberField.fill('4200000000000000')
    }

    async fillCardInfoExpDateField() {
        await this.cardInfoExpDateField.fill("01/29")
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

}
export default B_ApplyWidget;