//To be split out eventually and live on its own project, including control functions used in the component-page.ts files
import { test as base } from '@playwright/test';
import { NavPage } from './nav-page';
import { ResultsPage } from './results-page';
import { ReviewApplicationPage } from './review-application-page';
import { StorybookPage } from './storybook-page';
import { AddressInfoPage } from './address-info-page';
import { BankInfoPage } from './bank-info-page';
import { CardInfoPage } from './card-info-page';
import { ContactInfoPage } from './contact-info-page';
import { CartReviewPage } from './cart-review-page';
import { OnboardingPage } from './onboarding-page';
import { TermsConditionsPage } from './terms-conditions-page';
import { PersonalInfoPage } from './personal-info-page';
import { SubmitDisclosurePage } from './submit-disclosure-page';
import { IncomeInfoPage } from './income-info-page';
import { PaymentAtSigningPage } from './payment-at-signing-page';
import { ReviewTermsPage } from './review-terms-page';
//import { BuildLeaseApplication } from '$utils/lease-application-builder';
import { TestHarnessPage } from './test-harness-page';
import { WooShoppingPage } from './woo-shopping-page';
import { UseMyApprovalPage } from './use-my-approval-page';
import { BuildLeaseApplication } from '$utils/progConnect.utils/lease-application-builder';

export const test = base.extend<{
  addressInfoPage: AddressInfoPage;
  bankInfoPage: BankInfoPage;
  cardInfoPage: CardInfoPage;
  contactInfoPage: ContactInfoPage;
  useMyApprovalPage: UseMyApprovalPage;
  navPage: NavPage;
  reviewApplicationPage: ReviewApplicationPage;
  resultsPage: ResultsPage;
  storybookPage: StorybookPage;
  cartReviewPage: CartReviewPage;
  onboardingPage: OnboardingPage;
  termsConditionsPage: TermsConditionsPage;
  personalInfoPage: PersonalInfoPage;
  submitDisclosurePage: SubmitDisclosurePage;
  incomeInformationPage: IncomeInfoPage;
  paymentAtSigningPage: PaymentAtSigningPage;
  reviewTermsPage: ReviewTermsPage;
  buildLease: BuildLeaseApplication;
  testHarnessPage: TestHarnessPage;
  wooShoppingPage: WooShoppingPage;
}>({
  navPage: async ({ page }, use) => {
    await use(new NavPage(page));
  },
  addressInfoPage: async ({ page }, use) => {
    await use(new AddressInfoPage(page));
  },
  reviewApplicationPage: async ({ page }, use) => {
    await use(new ReviewApplicationPage(page));
  },
  resultsPage: async ({ page }, use) => {
    await use(new ResultsPage(page));
  },
  storybookPage: async ({ page }, use) => {
    await use(new StorybookPage(page));
  },
  bankInfoPage: async ({ page }, use) => {
    await use(new BankInfoPage(page));
  },
  cardInfoPage: async ({ page }, use) => {
    await use(new CardInfoPage(page));
  },
  contactInfoPage: async ({ page }, use) => {
    await use(new ContactInfoPage(page));
  },
  cartReviewPage: async ({ page }, use) => {
    await use(new CartReviewPage(page));
  },
  onboardingPage: async ({ page }, use) => {
    await use(new OnboardingPage(page));
  },
  termsConditionsPage: async ({ page }, use) => {
    await use(new TermsConditionsPage(page));
  },
  personalInfoPage: async ({ page }, use) => {
    await use(new PersonalInfoPage(page));
  },
  submitDisclosurePage: async ({ page }, use) => {
    await use(new SubmitDisclosurePage(page));
  },
  useMyApprovalPage: async ({ page }, use) => {
    await use(new UseMyApprovalPage(page));
  },
  incomeInformationPage: async ({ page }, use) => {
    await use(new IncomeInfoPage(page));
  },
  paymentAtSigningPage: async ({ page }, use) => {
    await use(new PaymentAtSigningPage(page));
  },
  reviewTermsPage: async ({ page }, use) => {
    await use(new ReviewTermsPage(page));
  },
  buildLease: async ({ page }, use) => {
    await use(new BuildLeaseApplication(page));
  },
  testHarnessPage: async ({ page }, use) => {
    await use(new TestHarnessPage(page));
  },
  wooShoppingPage: async ({ page }, use) => {
    await use(new WooShoppingPage(page));
  },
});

export { expect } from '@playwright/test';
