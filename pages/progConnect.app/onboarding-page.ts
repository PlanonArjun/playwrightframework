import { Locator, Page } from '@playwright/test';
import { StorybookPage } from './storybook-page';

const onboardingDisclosureTextLocator =
  'pc-onboarding>pc-body-small:nth-of-type(1)';
const googlePrivacy = 'a[href="https://policies.google.com/privacy"]';
const googleTerms = 'a[href="https://policies.google.com/terms"]';

export class OnboardingPage {
  readonly page: Page;
  readonly storybookPage: StorybookPage;
  readonly onboardingDisclosureText: Locator;
  readonly googlePrivacyLink: Locator;
  readonly googleTermsLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.storybookPage = new StorybookPage(this.page);
    this.onboardingDisclosureText = process.env.STORYBOOK
      ? this.storybookPage.iframe.locator(onboardingDisclosureTextLocator)
      : this.page.locator(onboardingDisclosureTextLocator);
    this.googlePrivacyLink = process.env.STORYBOOK
      ? this.storybookPage.iframe.locator(googlePrivacy)
      : this.page.locator(googlePrivacy);
    this.googleTermsLink = process.env.STORYBOOK
      ? this.storybookPage.iframe.locator(googleTerms)
      : this.page.locator(googleTerms);
  }

  async compareOnboardingDefault() {
    await this.storybookPage.comparePreviewWith(
      'pc_components_apply_onboarding.png'
    );
  }
}
