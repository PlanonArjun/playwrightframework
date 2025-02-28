import { RESPONSES } from '$utils/progConnect.utils/network-responses';
import { TIMEOUTS } from '$utils/progConnect.utils/timeouts';
import { FrameLocator, Locator, Page, expect } from '@playwright/test';

let extraTime: number = TIMEOUTS.PAGE_RENDER;
let validationTime: number = TIMEOUTS.INPUT_VALIDATION;

export async function setExtraTime(time) {
  extraTime = time;
}

export async function setValidationTime(time) {
  validationTime = time;
}

const backIconButtonLocator =
  'pc-nav-bar div pc-nav-icon:nth-of-type(1) grit-wc-icon-button';
const closeIconButtonLocator =
  'pc-nav-bar div pc-nav-icon:nth-of-type(2) grit-wc-icon-button';
const headerTextLocator = 'pc-nav-bar div.pc-nav-bar-title-content';
const continueButtonLocator = 'pc-apply-flow pc-primary-button button';
const leaseWithProgButtonLocator = 'grit-wc-button#launch-button';
const findMyLeaseApprovalButtonLocator = 'pc-button-button grit-button-md';
const iframeLocation = '#storybook-preview-iframe';
const confirmCloseButtonLocator = 'pc-apply-flow pc-danger-button';
const cancelCloseButtonLocator = 'pc-apply-flow pc-tertiary-button';
const exitPromptLocator = 'pc-apply-flow pc-exit-prompt pc-body-large.hydrated';
const pcMobileLocator = 'pc-mobile-view';
const useMyApprovalLocator = 'pc-secondary-button.border';

export class NavPage {
  readonly page: Page;
  readonly iframe: FrameLocator;
  readonly backIconButton: Locator;
  readonly closeIconButton: Locator;
  readonly headerText: Locator;
  readonly continueButton: Locator;
  readonly leaseWithProgButton: Locator;
  readonly findMyLeaseApprovalButtonLocator: Locator;
  readonly confirmCloseButton: Locator;
  readonly cancelCloseButton: Locator;
  readonly exitPrompt: Locator;
  readonly pcMobile: Locator;
  readonly useMyApprovalButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.iframe = this.page.frameLocator(iframeLocation);
    this.backIconButton = process.env.STORYBOOK
      ? this.iframe.locator(backIconButtonLocator)
      : this.page.locator(backIconButtonLocator);
    this.closeIconButton = process.env.STORYBOOK
      ? this.iframe.locator(closeIconButtonLocator)
      : this.page.locator(closeIconButtonLocator);
    this.headerText = process.env.STORYBOOK
      ? this.iframe.locator(headerTextLocator)
      : this.page.locator(headerTextLocator);
    this.continueButton = process.env.STORYBOOK
      ? this.iframe.locator(continueButtonLocator)
      : this.page.locator(continueButtonLocator);
    this.leaseWithProgButton = process.env.STORYBOOK
      ? this.iframe.locator(leaseWithProgButtonLocator)
      : this.page.locator(leaseWithProgButtonLocator);
    this.confirmCloseButton = process.env.STORYBOOK
      ? this.iframe.locator(confirmCloseButtonLocator)
      : this.page.locator(confirmCloseButtonLocator);
    this.cancelCloseButton = process.env.STORYBOOK
      ? this.iframe.locator(cancelCloseButtonLocator)
      : this.page.locator(cancelCloseButtonLocator);
    this.exitPrompt = process.env.STORYBOOK
      ? this.iframe.locator(exitPromptLocator)
      : this.page.locator(exitPromptLocator);
    this.pcMobile = this.page.locator(pcMobileLocator);
    this.useMyApprovalButton = this.page.locator(useMyApprovalLocator);
  }

  async openWidget() {
    await this.leaseWithProgButton.isVisible();
    await this.leaseWithProgButton.click({ force: true });

    let authorizeResponse;
    try {
      authorizeResponse = await this.page.waitForResponse(
        (resp) => resp.url().includes('/authorize'),
        { timeout: TIMEOUTS.AUTHORIZE }
      );
    } catch (error) {
      expect(
        authorizeResponse,
        `The /authorize call did not respond within the expected time (${TIMEOUTS.AUTHORIZE}ms) - ${error}`
      ).toBe(expect.anything());
    }

    expect(
      authorizeResponse.status(),
      `Authorize failed - Response: ${await authorizeResponse.body()}`
    ).toBe(RESPONSES.OK);
  }

  async closeWidget() {
    await this.closeIconButton.click();
  }

  async confirmClose() {
    await this.confirmCloseButton.click();
  }

  async cancelClose() {
    await this.cancelCloseButton.click();
  }

  async goBack() {
    await this.backIconButton.click();
    await this.waitForValidation();
  }

  async useMyApproval() {
    await this.useMyApprovalButton.click({ force: true });
    await this.waitForValidation();
  }

  async getHeaderText() {
    return await this.headerText.textContent();
  }

  async clickContinue() {
    await this.continueButton.isEnabled();
    await this.continueButton.click({ force: true });
  }

  async waitForValidation(timeout = validationTime) {
    await this.page.evaluate(async () => {
      const locators = Array.from(
        document.querySelectorAll('pc-mobile-layout')
      );
      await Promise.all(
        locators.map(async (component) => {
          await new Promise((resolve, reject) => {
            component.addEventListener('load', resolve);
            component.addEventListener('error', reject);
          });
        })
      );
    });
    await new Promise((resolve) => setTimeout(resolve, timeout));
  }

  async continueForm(applicationStep = 'Form') {
    await this.waitForValidation();
    await this.continueEnabled();
    await this.page.keyboard.press('Enter');

    let leaseApplicationResponse;
    let endPoint;

    if (
      applicationStep === 'Card Information' ||
      applicationStep === 'Card and Billing Information'
    ) {
      endPoint = '/credit-card';
    } else {
      endPoint = '/lease-application';
    }

    try {
      leaseApplicationResponse = await this.page.waitForResponse(
        (resp) => resp.url().includes(endPoint),
        { timeout: TIMEOUTS.PATCH }
      );
    } catch (error) {
      expect(
        leaseApplicationResponse,
        `The /lease-application PATCH call did not respond within the expected time (${TIMEOUTS.PATCH}ms) - ${error}`
      ).toBe(expect.anything());
    }

    expect(
      leaseApplicationResponse.status(),
      `${applicationStep} PATCH Failed to Update Lease-Application - Response: ${await leaseApplicationResponse.body()}`
    ).toBe(RESPONSES.OK);
    await this.waitForValidation(extraTime);
  }

  async continueEnabled() {
    await this.continueButton.isEnabled();
  }

  parseIntRemovePriceFormat(value: string) {
    return value.replace(/[$,]/g, '');
  }
}
