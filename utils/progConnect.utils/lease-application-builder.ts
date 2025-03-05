import { AddressInfoPage, IAddressInformation } from '$pages/address-info-page';
import { BankInfoPage, IBankInformation } from '$pages/bank-info-page';
import { CardInfoPage, ICardInformation } from '$pages/card-info-page';
import { ContactInfoPage, IContactInformation } from '$pages/contact-info-page';
import { IIncomeInformation, IncomeInfoPage } from '$pages/income-info-page';
import { NavPage } from '$pages/nav-page';
import {
  IPersonalInformation,
  PersonalInfoPage,
} from '$pages/personal-info-page';
import { ReviewApplicationPage } from '$pages/review-application-page';
import { TermsConditionsPage } from '$pages/terms-conditions-page';
import { Page } from '@playwright/test';
import { ResultsPage } from '$pages/results-page';
import { EsignPage } from '$pages/esign-page';
import { TestHarnessPage } from '$pages/test-harness-page';
import { PaymentAtSigningPage } from '$pages/payment-at-signing-page';
import { WooShoppingPage } from '$pages/woo-shopping-page';
import { CartReviewPage } from '$pages/cart-review-page';

export interface ICustomerLeaseApplication {
  contactInformation: IContactInformation;
  personalInformation: IPersonalInformation;
  addressInformation: IAddressInformation;
  incomeInformation: IIncomeInformation;
  cardInformation: ICardInformation;
  bankInformation: IBankInformation;
}

export class BuildLeaseApplication extends NavPage {
  readonly page: Page;
  readonly navPage: NavPage;
  readonly termsPage: TermsConditionsPage;
  readonly contactInfoPage: ContactInfoPage;
  readonly personalInfoPage: PersonalInfoPage;
  readonly addressInfoPage: AddressInfoPage;
  readonly incomeInfoPage: IncomeInfoPage;
  readonly cardInfoPage: CardInfoPage;
  readonly bankInfoPage: BankInfoPage;
  readonly reviewPage: ReviewApplicationPage;
  readonly resultsPage: ResultsPage;
  readonly cartReviewPage: CartReviewPage;
  readonly paymentAtSigningPage: PaymentAtSigningPage;
  readonly esignPage: EsignPage;
  readonly testHarnessPage: TestHarnessPage;
  readonly wooShoppingPage: WooShoppingPage;

  constructor(page: Page) {
    super(page);
    this.page = page;
    this.navPage = new NavPage(page);
    this.termsPage = new TermsConditionsPage(page);
    this.contactInfoPage = new ContactInfoPage(page);
    this.personalInfoPage = new PersonalInfoPage(page);
    this.addressInfoPage = new AddressInfoPage(page);
    this.incomeInfoPage = new IncomeInfoPage(page);
    this.cardInfoPage = new CardInfoPage(page);
    this.bankInfoPage = new BankInfoPage(page);
    this.reviewPage = new ReviewApplicationPage(page);
    this.resultsPage = new ResultsPage(page);
    this.cartReviewPage = new CartReviewPage(page);
    this.paymentAtSigningPage = new PaymentAtSigningPage(page);
    this.esignPage = new EsignPage(page);
    this.testHarnessPage = new TestHarnessPage(page);
    this.wooShoppingPage = new WooShoppingPage(page);
  }

  async buildLease(leaseInformation: ICustomerLeaseApplication) {
    await this.waitForValidation();
    await this.clickContinue();
    await this.waitForValidation();
    await this.termsPage.checkTCCheckboxContinue();
    await this.waitForValidation();
    await this.contactInfoPage.enterContactInformationContinue(
      leaseInformation.contactInformation
    );
    await this.personalInfoPage.enterPersonalInformationContinue(
      leaseInformation.personalInformation
    );
    await this.addressInfoPage.enterAddressInformationContinue(
      leaseInformation.addressInformation
    );
    await this.incomeInfoPage.enterIncomeInformationContinue(
      leaseInformation.incomeInformation
    );
    await this.cardInfoPage.enterCardInformationContinue(
      leaseInformation.cardInformation
    );
    await this.bankInfoPage.enterBankInformationContinue(
      leaseInformation.bankInformation
    );
  }

  async buildLeaseAndSubmit(leaseInformation: ICustomerLeaseApplication) {
    await this.buildLeaseToSubmit(leaseInformation);
    await this.waitForValidation();
    await this.clickContinue();

    return await this.resultsPage.waitForSubmitResponse();
  }

  async buildLeaseToSubmit(leaseInformation: ICustomerLeaseApplication) {
    await this.buildLease(leaseInformation);
    await this.waitForValidation();
    await this.clickContinue();
  }

  async buildLeaseTo1TC() {
    await this.waitForValidation();
    await this.clickContinue();
    await this.termsPage.checkTCCheckbox();
    await this.waitForValidation();
  }

  async buildLeaseTo2ContactInfo(leaseInformation: ICustomerLeaseApplication) {
    await this.buildLeaseTo1TC();
    await this.continueForm('Terms and Conditions');
    await this.contactInfoPage.enterContactInformation(
      leaseInformation.contactInformation
    );
    await this.waitForValidation();
  }

  async buildLeaseTo3PersonalInfo(leaseInformation: ICustomerLeaseApplication) {
    await this.buildLeaseTo2ContactInfo(leaseInformation);
    await this.continueForm('Contact Information');
    await this.personalInfoPage.enterPersonalInformation(
      leaseInformation.personalInformation
    );
    await this.waitForValidation();
  }

  async buildLeaseTo4AddressInfo(leaseInformation: ICustomerLeaseApplication) {
    await this.buildLeaseTo3PersonalInfo(leaseInformation);
    await this.continueForm('Personal Information');
    await this.addressInfoPage.enterAddressInformation(
      leaseInformation.addressInformation
    );
    await this.waitForValidation();
  }

  async buildLeaseTo5IncomeInfo(leaseInformation: ICustomerLeaseApplication) {
    await this.buildLeaseTo4AddressInfo(leaseInformation);
    await this.continueForm('Address Information');
    await this.incomeInfoPage.enterIncomeInformation(
      leaseInformation.incomeInformation
    );
    await this.waitForValidation();
  }

  async buildLeaseTo6CardInfo(leaseInformation: ICustomerLeaseApplication) {
    await this.buildLeaseTo5IncomeInfo(leaseInformation);
    await this.continueForm('Income Information');
    await this.cardInfoPage.enterCardInformation(
      leaseInformation.cardInformation
    );
    await this.waitForValidation();
  }

  async buildLeaseTo7BankInfo(leaseInformation: ICustomerLeaseApplication) {
    await this.buildLeaseTo6CardInfo(leaseInformation);
    await this.continueForm('Card Information');
    await this.bankInfoPage.enterBankInformation(
      leaseInformation.bankInformation
    );
    await this.waitForValidation();
  }

  async buildLeaseToReview(leaseInformation: ICustomerLeaseApplication) {
    await this.buildLeaseTo7BankInfo(leaseInformation);
    await this.continueForm('Bank Information');
  }

  async prefillBuildLeaseToReview(leaseInformation: ICustomerLeaseApplication) {
    await this.buildLeaseTo1TC();
    await this.continueForm('Terms and Conditions');
    await this.waitForValidation();
    await this.continueForm('Contact Information');
    await this.personalInfoPage.dobInput.fill(
      leaseInformation.personalInformation.dob
    );
    await this.waitForValidation();
    await this.personalInfoPage.ssnInput.fill(
      leaseInformation.personalInformation.ssn
    );
    await this.continueForm('Personal Information');
    await this.incomeInfoPage.enterIncomeInformationContinue(
      leaseInformation.incomeInformation
    );
    await this.cardInfoPage.enterCardInformationContinue(
      leaseInformation.cardInformation
    );
    await this.bankInfoPage.enterBankInformationContinue(
      leaseInformation.bankInformation
    );
  }

  async prefillBuildLeaseAndSubmit(
    leaseInformation: ICustomerLeaseApplication
  ) {
    await this.prefillBuildLeaseToReview(leaseInformation);
    await this.clickContinue();
    await this.waitForValidation();
    await this.clickContinue();
    return await this.resultsPage.waitForSubmitResponse();
  }

  async submitTo1CartReview(leaseInformation: ICustomerLeaseApplication) {
    await this.buildLeaseAndSubmit(leaseInformation);
    await this.waitForValidation();
    await this.cartReviewPage.waitForCartResponse();
  }

  async submitTo3PaymentAtSigning(leaseInformation: ICustomerLeaseApplication) {
    await this.submitTo1CartReview(leaseInformation);
    await this.waitForValidation(3000);
    await this.clickContinue();
  }

  async submitTo5Esign(leaseInformation: ICustomerLeaseApplication) {
    await this.submitTo3PaymentAtSigning(leaseInformation);
    await this.waitForValidation(3000);
    await this.paymentAtSigningPage.continueWaitForESign();
  }

  async submitTo6VCard(leaseInformation: ICustomerLeaseApplication) {
    await this.submitTo5Esign(leaseInformation);
    await this.waitForValidation();
    console.log(await this.esignPage.completeEsign());
  }

  async checkoutOpenWidgetToSubmitResponse(
    customer: ICustomerLeaseApplication
  ) {
    await this.wooShoppingPage.proceedToCheckout();

    await this.wooShoppingPage.prefillBillingInformation(customer);
    await this.wooShoppingPage.openWidget();

    return await this.prefillBuildLeaseAndSubmit(customer);
  }

  async checkoutOpenWidgetToCartReview(customer: ICustomerLeaseApplication) {
    await this.checkoutOpenWidgetToSubmitResponse(customer);

    return await this.cartReviewPage.waitForCartResponse();
  }
}
