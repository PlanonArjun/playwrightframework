// lowes approve me health check
import { type Page, type Locator} from '@playwright/test';

import urls from '../../utils/lowes.utils/urls'

class LowesHealthCheck {

  readonly page: Page;
  readonly headingExpected: Locator;
  readonly checkbox: Locator;
  readonly buttonContinue: Locator;
  private statusHealthy: Boolean = true;

  constructor(page: Page) {
    this.page = page;
    this.headingExpected = page.getByRole('heading', { name: 'Before you start' });
    this.checkbox = page.locator('label span');
    this.buttonContinue = page.getByRole('button', { name: 'Continue' });
  }

  async _navigate() {
    await this.page.goto(urls.beforeYouStart.beforeYouStart);
  }

  async isHealthy() {
    await this._navigate();
    if(!(await this.headingExpected.isVisible({timeout: 5000}))) {
      this.statusHealthy = false;
    }
    if(!(await this.checkbox.isVisible({timeout: 5000}))) {
      this.statusHealthy = false;
    }
    if(this.statusHealthy) {
      console.log('Lowes health pre-check PASS...')
    }
    return this.statusHealthy;
  }

}
export default LowesHealthCheck;