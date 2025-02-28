import { FrameLocator, Locator, Page, expect } from '@playwright/test';
import { NavPage } from './nav-page';

export class StorybookPage extends NavPage {
  readonly page: Page;
  readonly storyBookUrl: string =
    'https://progconnect-cdn.api.prog-research.com/storybook/index.html?path=/story';
  readonly storybookPreviewWrapper: Locator;
  readonly iframe: FrameLocator;
  readonly iframeLocation = '#storybook-preview-iframe';

  constructor(page: Page) {
    super(page);
    this.page = page;
    this.iframe = this.page.frameLocator(this.iframeLocation);
    this.storybookPreviewWrapper = this.iframe.locator('html');
  }

  async goToStorybookPage(storybookPath) {
    await this.page.goto(`${this.storyBookUrl}${storybookPath}`, {
      waitUntil: 'networkidle',
    });
    await super.waitForValidation();
  }

  async clickContinue() {
    await this.iframe.locator('pc-primary-button').click();
  }

  async comparePreviewWith(snapshotFile: string, extraTime: number = 3500) {
    await super.waitForValidation(extraTime);
    await expect(async () => {
      expect
        .soft(await this.storybookPreviewWrapper.screenshot())
        .toMatchSnapshot(snapshotFile);
    }).toPass();
  }
}
