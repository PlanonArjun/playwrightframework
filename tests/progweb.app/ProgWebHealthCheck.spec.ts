import { type Page, type Locator} from '@playwright/test';

import urls from '../../utils/progweb.utils/urls'
import HappyPathApproved from 'data/progweb.approveme/HappyPathApproved';

class ProgWebHealthCheck {

  readonly page: Page;
  readonly fieldEmail: Locator;
  readonly fieldPassword: Locator;
  readonly buttonContinue: Locator;
  readonly happyPathApproved;

  private statusHealthy: Boolean = false;

  constructor(page: Page) {
    this.page = page;
    this.fieldEmail = this.page.getByRole('textbox', { name: 'Email address' });
    this.fieldPassword = this.page.getByRole('textbox', { name: 'Password' });
    this.buttonContinue = this.page.getByRole('button', { name: 'Continue' });
    this.happyPathApproved = new HappyPathApproved();
  }

  async _navigate() {
    await this.page.goto(urls.myaccount.myaccount); // https://slc-qaswebapp11.stormwind.local/myaccount/
    await this.page.waitForTimeout(250);
  }

  async _authenticate() {
    await this.fieldEmail.click();

    /* The duplicate email entry here is not a bug in the test.
    It's a workaround for a bug in the SUT.
     */
    await this.fieldEmail.fill(this.happyPathApproved.approvedDatasetFull.userEmail);
    await this.buttonContinue.click();
    await this.fieldEmail.click();
    await this.fieldEmail.fill(this.happyPathApproved.approvedDatasetFull.userEmail);
    await this.buttonContinue.click();

    await this.fieldPassword.click();
    await this.fieldPassword.fill(this.happyPathApproved.approvedDatasetFull.userPassword);
    await this.buttonContinue.click();

    await this.page.getByRole('button', { name: 'Accept' }).click(); // user-facing cookie prompt
  }

  async isHealthy() {
    await this._navigate();
    await this._authenticate();
    try {
      await this.page.getByText('Log out', { exact: true }).click();
      await this.page.getByRole('button', { name: 'Log out' }).click();
      console.log('ProgWeb health check PASS');
      this.statusHealthy = true;
    }catch(Error) {
      console.log('ProgWeb health check FAIL');
    }
    return this.statusHealthy;
  }

}
export default ProgWebHealthCheck;