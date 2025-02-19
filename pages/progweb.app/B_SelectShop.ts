//ProgWeb Application
import { type Page, type Locator, expect } from '@playwright/test';
import urls from '../../utils/progweb.utils/urls';
import A_LoginPage from './A_LoginPage';

class B_SelectShop {

    readonly page: Page;
    readonly a_loginPage: A_LoginPage;
    readonly buttonShop: Locator;
    readonly enterCode: Locator;
    readonly selectCity: Locator;
    readonly clickOnline: Locator;
    readonly selectShopBBY: Locator;
    readonly selectShopLowes: Locator;
    readonly getStarted: Locator;
    readonly declineCache: Locator;
    readonly buttonContinue: Locator;
    readonly clickToPage: Locator;
    readonly merchantname: Locator;
    merchantText: any;
    private leaseMarchant: string = "Lowe's";

    constructor(page: Page) {
        this.page = page;
        this.a_loginPage = new A_LoginPage(this.page);
        this.buttonShop = page.locator('#Nav_Bar_Shop').getByRole('img');
        this.enterCode = page.locator('#pg-input-0');
        this.selectCity = page.getByText('Draper, UT 84020, USA');
        this.clickOnline = page.locator('#In_Store_Online_Toggle').getByText('Online');
        this.selectShopBBY = page.locator('#Map_StoreList_Ecom_1000112005').getByText('Best Buy');
        this.selectShopLowes = page.locator('#Map_StoreList_Ecom_1000124407').getByText('Lowe\'s');
        this.getStarted = page.getByRole('button', { name: 'Get started' });
        this.declineCache = page.getByRole('button', { name: 'Decline' });
        this.buttonContinue = page.getByRole('button', { name: 'Continue' });
        this.buttonShop = page.locator('#Nav_Bar_Shop').getByRole('img');
        this.clickToPage = page.locator('div').filter({ hasText: /^chevron_right$/ }).locator('div');
        this.merchantname = page.locator('xpath = //div[@class = "address-right clam-body-s"]//div[1]');
    }

    async clickMarchantDetails() {
        await this.clickToPage.click();

    }
    async lastLeaseMerchantName(): Promise<void> {
        const textRetrived = await this.merchantname.textContent();
        this.merchantText = textRetrived ?? '';
        console.log("Mrchant Name ====== ", this.merchantText);

    }

    async clickForShop() {
        //Shop Button locator is unstable
        try {
            await this.buttonShop.click({ force: true });
        } catch (error) {
            console.log(error);
        }
    }

    async navigateLocation() {
        await this.page.goto(urls.storelocation.storelocation);
    }

    async _selectCityWithCode(code: string) {
        await this.enterCode.click();
        await this.enterCode.fill(code);
        await this.page.getByText('Draper, UT 84020, USA').waitFor({ state: 'visible' })
        await this.selectCity.click({ force: true });
    }

    async _selectOnline() {
        await this.clickOnline.click();
    }

    async _selectShopName() {
        console.log("In shop Page Marchant Name =  ", this.merchantText);
        if (this.merchantText == "Lowe's") {
            await this.selectShopBBY.click();
            console.log('Selecting BBY Store for the Lease Application');
        } else {
            await this.selectShopLowes.click();
            console.log('Selecting Lowes Store for the Lease Application');
        }
    }
    async _startAplicaion() {
        await this.getStarted.click();
    }

    async happyPathPopulate(dataIn: string[]) {
        await this.clickForShop();
        await this.navigateLocation();
        await this._selectCityWithCode(dataIn[0]);
        await this._selectOnline();
        await this._selectShopName();
        await this._startAplicaion();
    }

}
export default B_SelectShop;