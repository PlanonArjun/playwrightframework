// signet_jared approve me health check
import { type Page, type Locator} from '@playwright/test';

import urls from '../../utils/cricket.utils/urls'

class CricketHealthCheck {

  readonly page: Page;
  readonly agreeTo: Locator;
  readonly buttonContinue: Locator;
  private statusHealthy: Boolean = true;

  constructor(page: Page) {
    this.page = page;
    this.agreeTo = this.page.getByText('I have read and agree to the');
    this.buttonContinue = this.page.getByRole('button', { name: 'Continue' });
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
      console.log('Cricket health pre-check PASS...')
    }
    return this.statusHealthy;
  }

}
export default CricketHealthCheck;