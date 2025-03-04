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















}
export default B_ApplyWidget;