// d2c marketplace application health check
import { type Page, type Locator} from '@playwright/test';

import urls from '../../utils/d2cmarketplace.utils/urls'

class D2CMarketPlaceHealthCheck {

  readonly page: Page;
  readonly progLeasingLogo: Locator;
  private statusHealthy: Boolean = true;

  constructor(page: Page) {
    this.page = page
        this.progLeasingLogo = page.locator('img[alt="B2C Retail Store"]')
  }

  async _navigate() {
    await this.page.goto(urls.HOME_PAGE_URL.HOME_PAGE_URL);
  }

  async isHealthy() {
    await this._navigate();
    if(!(await this.progLeasingLogo.isVisible({timeout: 5000}))) {
      this.statusHealthy = false;
    }
    if(this.statusHealthy) {
      console.log('D2C Marketplace app pre check PASS...')
    }

    return this.statusHealthy;
  }

}
export default D2CMarketPlaceHealthCheck;