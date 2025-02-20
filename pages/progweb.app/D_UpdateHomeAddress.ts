// progWeb application
import { type Page, type Locator, expect } from '@playwright/test';

class D_UpdateHomeAddress {

   readonly page: Page;
   readonly updateAddress: Locator;
   readonly addManually: Locator;
   readonly enterStreetName: Locator;
   readonly enterAptName: Locator;
   readonly enterCity: Locator;
   readonly enterZip: Locator;
   readonly saveButton: Locator;

   constructor(page: Page) {
      this.page = page;
      this.updateAddress = page.locator('#Address_Panel_Button_Update');
      this.addManually = page.getByText('Add address manually');
      this.enterStreetName = page.locator('xpath = //span[contains(text(),"Street address")]//following-sibling::div//input');
      this.enterAptName = page.locator('xpath = //span[contains(text(),"Apt / suite / other")]//following-sibling::div//input');
      this.enterCity = page.locator('xpath = //span[contains(text(),"City")]//following-sibling::div//input');
      this.enterZip = page.locator('xpath = //span[contains(text(),"Zip")]//following-sibling::div//input');
      this.saveButton = page.getByRole('button', { name: 'Save' });
   }

   async _updateAddress() {
      await this.updateAddress.click();
   }

   async _addAddressManually() {
      await this.addManually.click();
   }

   async _enterStreetName(street: string) {
      await this.enterStreetName.click();
      await this.enterStreetName.fill(street);
   }

   async _enterAptName(apt: string) {
      await this.enterAptName.click();
      await this.enterAptName.fill(apt);
   }
   async _enterCityName(city: string) {
      await this.enterCity.click();
      await this.enterCity.fill(city);
   }

   async _enterZipCode(zip: string) {
      await this.enterZip.click();
      await this.enterZip.fill(zip);
   }

   async _saveAddress() {
      await this.saveButton.click();
   }
   
   async happyPathPopulate(dataIn: string[]) {
      await this._updateAddress();
      await this._addAddressManually();
      await this._enterStreetName(dataIn[0]);
      await this._enterAptName(dataIn[1]);
      await this._enterCityName(dataIn[2]);
      await this._enterZipCode(dataIn[3]);
      await this._saveAddress();
   }

}
export default D_UpdateHomeAddress;