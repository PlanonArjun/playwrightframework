// signet_jared approve me health check
import { type Page, type Locator} from '@playwright/test';

import urls from '../../utils/mattressfirm.utils/urls'

class MTFMHealthCheck {

  readonly page: Page;
  readonly agreeTo: Locator;
  readonly buttonContinue: Locator;
  private statusHealthy: Boolean = true;

  constructor(page: Page) {
    this.page = page;
    this.agreeTo = this.page.getByText('I have read and agree to the');
    // this.agreeTo = this.page.locator('#view-splash > div.row.row-agreeterms.ng-scope > div > label > span.mark-placeholder');
    this.buttonContinue = this.page.getByRole('button', { name: 'Continue' });
    // this.buttonContinue = this.page.locator('#continue');
  }

  async _navigate() {
    await this.page.goto(urls.splash.splash);
  }

  async isHealthy() {
    await this._navigate();
    if(!(await this.agreeTo.isVisible({timeout: 5000}))) {
      this.statusHealthy = false;
    }
    if(!(await this.buttonContinue.isVisible({timeout: 5000}))) {
      this.statusHealthy = false;
    }
    if(this.statusHealthy) {
      console.log('MTFM health pre-check PASS...')
    }

    return this.statusHealthy;
  }

}
export default MTFMHealthCheck;