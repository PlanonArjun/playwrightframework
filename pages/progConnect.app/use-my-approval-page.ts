import { Locator, Page, expect } from '@playwright/test';
import { NavPage } from './nav-page';
import { StorybookPage } from './storybook-page';
import { ICustomerLeaseApplication } from '$utils/progConnect.utils/lease-application-builder';
import { DefaultObjectBuilder } from '../../data/progconnect/default-object-builder';
import { TIMEOUTS } from '$utils/progConnect.utils/timeouts';
import { RESPONSES } from '$utils/network-responses';

export interface IUseMyApproval {
  lastFourSsn: string;
  phoneNumber: string;
}

const lastFourSsnInputLocator = '#ssn-last-four-input';
const phoneNumberInputLocator = '#phone-number';

export class UseMyApprovalPage extends NavPage {
  readonly page: Page;
  readonly storybookPage: StorybookPage;
  readonly phoneNumberInput: Locator;
  readonly lastFourSsnInput: Locator;

  constructor(page: Page) {
    super(page);
    this.page = page;
    this.storybookPage = new StorybookPage(page);
    this.phoneNumberInput = process.env.STORYBOOK
      ? this.storybookPage.iframe.locator(phoneNumberInputLocator)
      : this.page.locator(phoneNumberInputLocator);
    this.lastFourSsnInput = process.env.STORYBOOK
      ? this.storybookPage.iframe.locator(lastFourSsnInputLocator)
      : this.page.locator(lastFourSsnInputLocator);
  }

  async enterApprovalInformation(customer: DefaultObjectBuilder) {
    await this.lastFourSsnInput.fill(
      customer.ssn.substr(customer.ssn.length - 4)
    );
    await this.waitForValidation();
    await this.phoneNumberInput.fill(customer.phone);
    await this.waitForValidation();
  }

  async enterApprovalInformationFindLease(customer: DefaultObjectBuilder) {
    await this.enterApprovalInformation(customer);
    await this.clickContinue();
    await this.waitForFindResponse();
  }

  async waitForFindResponse() {
    let findResponse;
    try {
      findResponse = await this.page.waitForResponse(
        (resp) => resp.url().includes('/find'),
        { timeout: TIMEOUTS.SUBMIT }
      );
    } catch (error) {
      expect(
        findResponse,
        `the /find Application call did not respond within the expected time (${TIMEOUTS.SUBMIT}ms) - ${error}`
      ).toBe(expect.anything());
    }

    expect(
      findResponse.status(),
      `Find Application call failed - Response: ${await findResponse.body()}`
    ).toBe(RESPONSES.OK);
  }
}
