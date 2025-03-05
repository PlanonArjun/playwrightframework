import { Locator, Page } from '@playwright/test';
import { NavPage } from './nav-page';
import { ICustomerLeaseApplication } from '$utils/progConnect.utils/lease-application-builder';

export class TestHarnessPage extends NavPage {
  readonly page: Page;
  readonly harnessUrl: string =
    'http://slc-devcent01.stormwind.local/lightweight/qa/harness.html';
  readonly prefillFirstName: Locator;
  readonly prefillLastName: Locator;
  readonly prefillEmail: Locator;
  readonly prefillPhone: Locator;
  readonly prefillAddress: Locator;
  readonly prefillAddress2: Locator;
  readonly prefillCity: Locator;
  readonly prefillState: Locator;
  readonly prefillZip: Locator;

  constructor(page: Page) {
    super(page);
    this.page = page;
    this.prefillFirstName = this.page.locator('input#firstName');
    this.prefillLastName = this.page.locator('input#lastName');
    this.prefillEmail = this.page.locator('input#email');
    this.prefillPhone = this.page.locator('input#phone');
    this.prefillAddress = this.page.locator('input#address');
    this.prefillAddress2 = this.page.locator('input#address2');
    this.prefillCity = this.page.locator('input#city');
    this.prefillState = this.page.locator('select#state');
    this.prefillZip = this.page.locator('input#zip');
  }

  async goToWidgetTestHarness() {
    await this.page.goto(this.harnessUrl, {
      waitUntil: 'networkidle',
    });
  }

  async openWidget() {
    super.openWidget();
  }

  async prefillBillingInformation(customer: ICustomerLeaseApplication) {
    await this.prefillFirstName.fill(customer.personalInformation.firstName);
    await this.prefillLastName.fill(customer.personalInformation.lastName);
    await this.prefillEmail.fill(customer.contactInformation.emailAddress);
    await this.prefillPhone.fill(customer.contactInformation.phoneNumber);
    await this.prefillAddress.fill(customer.addressInformation.address1);
    await this.prefillAddress2.fill(customer.addressInformation.address2);
    await this.prefillCity.fill(customer.addressInformation.city);
    await this.prefillState.selectOption(customer.addressInformation.state);
    await this.prefillZip.fill(customer.addressInformation.zip);
  }
}
