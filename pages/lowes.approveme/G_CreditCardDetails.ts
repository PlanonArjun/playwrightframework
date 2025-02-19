// Lowes ApproveMe
import { type Page, type Locator, expect } from '@playwright/test';
import B_BeforeStartPage from './B_BeforeStartPage';
import A_MarketingPage from './A_Marketingpage';


class G_CreditCardDetailsPage {
    readonly page: Page;
    readonly a_marketingPage: A_MarketingPage;
    readonly b_beforeStartPage: B_BeforeStartPage;

    readonly directDepositYes: Locator;
    readonly creditCardNumber: Locator;
    readonly cardExpirationMonth: Locator;
    readonly cardExpirationYear: Locator;
    readonly nameOnCardFirstName: Locator;
    readonly nameOnCardLastName: Locator;

    constructor(page: Page) {
        this.page = page;
        this.a_marketingPage = new A_MarketingPage(this.page);
        this.b_beforeStartPage = new B_BeforeStartPage(this.page);
        this.directDepositYes = page.getByRole('button', { name: 'Yes' }); //page.locator('#IncomeSource_IsDirectDeposit_Yes');
        this.creditCardNumber = page.locator('#PaymentCard_CardNumber');
        this.cardExpirationMonth = page.locator('#PaymentCard_ExpirationMonth');
        this.cardExpirationYear = page.locator('#PaymentCard_ExpirationYear');
        this.nameOnCardFirstName = page.locator('#PaymentCard_FirstName');
        this.nameOnCardLastName = page.locator('#PaymentCard_LastName');
    }

    async _directDeposit_Yes() {

        if (await this.directDepositYes.isVisible()) {
            await this.directDepositYes.click({ force: true });
        } else {
            console.error("directDepositYes is not interactable !!");
        }


    }
    async _enterCreditCardNumber(cardNumber: string) {

        try {
            await this.creditCardNumber.click({ force: true });
            //await this.creditCardNumber.clear();
            await this.creditCardNumber.fill(cardNumber);
        } catch (error) {
            console.log('error as :', error)
        }

    }

    async _enterCreditCardMonth(month: string) {
        // await this.page.waitForSelector('PaymentCard_ExpirationMonth',{state: 'visible'});
        try {
            await this.cardExpirationMonth.selectOption(month);
        } catch (error) {
            console.log('error as :', error)
        }
    }

    async _enterCreditCardYear(year: string) {
        //await this.page.waitForSelector('#PaymentCard_ExpirationYear',{state: 'visible'});
        await this.cardExpirationYear.selectOption(year);
    }

    async _enterFirstNameCard(fName: string) {
        await this.nameOnCardFirstName.clear();
        await this.nameOnCardFirstName.fill(fName);
    }

    async _enterLastnameCard(lName: string) {
        await this.nameOnCardLastName.clear();
        await this.nameOnCardLastName.fill(lName);

    }
    async happyPathPopulate(dataIn: string[]) {
        await this._directDeposit_Yes();
        await this.page.waitForTimeout(1000);
        await this._enterCreditCardNumber(dataIn[0]);
        await this.page.waitForTimeout(1000);
        await this._enterCreditCardMonth(dataIn[1]);
        await this.page.waitForTimeout(1000);
        await this._enterCreditCardYear(dataIn[2]);
        await this.page.waitForTimeout(1000);
        await this._enterFirstNameCard(dataIn[3]);
        await this.page.waitForTimeout(1000);
        await this._enterLastnameCard(dataIn[4]);
        await this.page.waitForTimeout(1000);
    }
}
export default G_CreditCardDetailsPage;
