import { Locator, Page, expect } from '@playwright/test';
import { StorybookPage } from './storybook-page';
import { NavPage } from './nav-page';

export const appDisclosureUrl =
  'https://progleasing.com/application-disclosure/';
export const eSignDisclosureUrl = 'https://progleasing.com/e-sign-disclosure/';
export const arbitrationProvisionUrl =
  'https://progleasing.com/arbitration-clause/';
export const privacyPolicyUrl = 'https://progleasing.com/privacy/';
export const termsOfUseUrl = 'https://progleasing.com/terms/';

const tcCheckboxLocator = 'pc-checkbox input';
const appDisclosureLinkLocator = 'Application Disclosures';
const eSignDisclosureLinkLocator = 'E-Sign Disclosure';
const arbitrationProvisionLinkLocator = 'Arbitration Provision';
const privacyPolicyLinkLocator = 'Privacy Policy';
const termsLinkLocator = 'Terms of Use';
const termsComplianceTextLocator = 'pc-unordered-list.hydrated';
const termsCreditTextLocator = 'pc-terms-and-conditions>pc-body-small';
const termsAgreementTextLocator = 'pc-terms-and-conditions pc-checkbox';

export class TermsConditionsPage extends NavPage {
  readonly page: Page;
  readonly storybookPage: StorybookPage;
  readonly navPage: NavPage;
  readonly tcCheckbox: Locator;
  readonly appDisclosureLink: Locator;
  readonly eSignDisclosureLink: Locator;
  readonly arbitrationProvisionLink: Locator;
  readonly privacyPolicyLink: Locator;
  readonly termsLink: Locator;
  readonly termsConditionsText: Locator;
  readonly termsCreditText: Locator;
  readonly termsAgreementText: Locator;

  constructor(page: Page) {
    super(page);
    this.page = page;
    this.storybookPage = new StorybookPage(page);
    this.navPage = new NavPage(page);
    this.tcCheckbox = process.env.STORYBOOK
      ? this.storybookPage.iframe.locator(tcCheckboxLocator)
      : this.page.locator(tcCheckboxLocator);
    this.appDisclosureLink = process.env.STORYBOOK
      ? this.storybookPage.iframe.getByText(appDisclosureLinkLocator)
      : this.page.getByText(appDisclosureLinkLocator);
    this.eSignDisclosureLink = process.env.STORYBOOK
      ? this.storybookPage.iframe.getByText(eSignDisclosureLinkLocator)
      : this.page.getByText(eSignDisclosureLinkLocator);
    this.arbitrationProvisionLink = process.env.STORYBOOK
      ? this.storybookPage.iframe.getByText(arbitrationProvisionLinkLocator)
      : this.page.getByText(arbitrationProvisionLinkLocator);
    this.privacyPolicyLink = process.env.STORYBOOK
      ? this.storybookPage.iframe.getByText(privacyPolicyLinkLocator)
      : this.page.getByText(privacyPolicyLinkLocator);
    this.termsLink = process.env.STORYBOOK
      ? this.storybookPage.iframe.getByText(termsLinkLocator)
      : this.page.getByText(termsLinkLocator);
    this.termsConditionsText = process.env.STORYBOOK
      ? this.storybookPage.iframe.locator(termsComplianceTextLocator)
      : this.page.locator(termsComplianceTextLocator);
    this.termsCreditText = process.env.STORYBOOK
      ? this.storybookPage.iframe.locator(termsCreditTextLocator)
      : this.page.locator(termsCreditTextLocator);
    this.termsAgreementText = process.env.STORYBOOK
      ? this.storybookPage.iframe.locator(termsAgreementTextLocator)
      : this.page.locator(termsAgreementTextLocator);
  }

  async checkTCCheckbox() {
    await this.tcCheckbox.click({ force: true });
  }

  async checkTCCheckboxContinue() {
    await expect(async () => {
      await this.checkTCCheckbox();
      await super.continueEnabled();
    }).toPass({ timeout: 15000 });
    await super.continueForm('Terms and Conditions');
  }
}
