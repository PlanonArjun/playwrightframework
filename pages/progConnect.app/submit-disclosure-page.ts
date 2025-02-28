import { Locator, Page } from '@playwright/test';
import { StorybookPage } from './storybook-page';

const submitDisclosureTextLocator = 'pc-disclosures>pc-unordered-list';
export class SubmitDisclosurePage {
  readonly page: Page;
  readonly storybookPage: StorybookPage;
  readonly submitDisclosureText: Locator;

  constructor(page: Page) {
    this.page = page;
    this.storybookPage = new StorybookPage(this.page);
    this.submitDisclosureText = process.env.STORYBOOK
      ? this.storybookPage.iframe.locator(submitDisclosureTextLocator)
      : this.page.locator(submitDisclosureTextLocator);
  }
}
