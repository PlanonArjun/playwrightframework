import { Locator, Page, Response, expect } from '@playwright/test';
import { StorybookPage } from './storybook-page';
import { NavPage } from './nav-page';
import { TIMEOUTS } from '$utils/progConnect.utils/timeouts';
import { RESPONSES } from '$utils/network-responses';

const leaseIdLocator = 'div.lease div.value';
const approvedDisclosureLocator = 'pc-approved>pc-paragraph:nth-of-type(1)';
const pendingDisclosureLocator = 'pc-pending>pc-paragraph:nth-of-type(1)';
const deniedDisclosureLocator = 'pc-denied>pc-paragraph:nth-of-type(1)';
const approveOnlyResultsLocator = 'pc-apply-flow pc-ao-approved';
const approveOnlyAmountLocator = 'span.approved_amount_label';

export interface iSubmitResponse {
  approvalLimit: number;
  leaseId: string;
  status: string;
  validThrough: string;
}

export class ResultsPage extends NavPage {
  readonly page: Page;
  readonly storybookPage: StorybookPage;
  readonly leaseId: Locator;
  readonly response: Response;
  readonly approvedDisclosure: Locator;
  readonly pendingDisclosure: Locator;
  readonly deniedDisclosure: Locator;
  readonly approvedOnlyResults: Locator;
  readonly approvedOnlyAmount: Locator;

  constructor(page: Page) {
    super(page);
    this.page = page;
    this.storybookPage = new StorybookPage(this.page);
    this.leaseId = process.env.STORYBOOK
      ? this.storybookPage.iframe.locator(leaseIdLocator)
      : this.page.locator(leaseIdLocator);
    this.approvedDisclosure = process.env.STORYBOOK
      ? this.storybookPage.iframe.locator(approvedDisclosureLocator)
      : this.page.locator(approvedDisclosureLocator);
    this.pendingDisclosure = process.env.STORYBOOK
      ? this.storybookPage.iframe.locator(pendingDisclosureLocator)
      : this.page.locator(pendingDisclosureLocator);
    this.deniedDisclosure = process.env.STORYBOOK
      ? this.storybookPage.iframe.locator(deniedDisclosureLocator)
      : this.page.locator(deniedDisclosureLocator);
    this.approvedOnlyResults = this.page.locator(approveOnlyResultsLocator);
    this.approvedOnlyAmount = this.page.locator(approveOnlyAmountLocator);
  }

  async getApplyOnlyApprovedAmount() {
    return await this.approvedOnlyAmount.innerText();
  }

  async waitForSubmitResponse(): Promise<iSubmitResponse> {
    let submitResponse;
    try {
      submitResponse = await this.page.waitForResponse(
        (resp) => resp.url().includes('/submit'),
        { timeout: TIMEOUTS.SUBMIT }
      );
    } catch (error) {
      expect(
        submitResponse,
        `the /submit Application call did not respond within the expected time (${TIMEOUTS.SUBMIT}ms) - ${error}`
      ).toBe(expect.anything());
    }

    expect(
      submitResponse.status(),
      `Submit Application call failed - Response: ${await submitResponse.body()}`
    ).toBe(RESPONSES.OK);
    const responseBody: iSubmitResponse = await submitResponse.json();
    // console.log(responseBody);
    return responseBody;
  }
}
