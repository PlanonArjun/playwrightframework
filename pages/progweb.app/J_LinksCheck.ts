import { type Page, type Locator, expect } from '@playwright/test';

class J_LinksCheck {

    readonly page: Page;
    readonly link_ApplicationDisclosure: Locator;
    readonly link_eSignDisclosure: Locator;
    readonly link_ArbitrationProvision: Locator;
    readonly link_PrivacyPolicy: Locator;
    readonly link_TermsOfUse: Locator;

    constructor(page: Page) {
        this.page = page;

        this.link_ApplicationDisclosure = page.getByRole('link', { name: 'Application Disclosure,' });
        // this.linkApplicationDisclosure = page.locator('#Application_Disclosure_Checkbox-label > div > a:nth-child(1)');

        this.link_eSignDisclosure = page.getByRole('link', { name: 'E-Sign Disclosure' });
        // this.linkeSignDisclosure = page.locator('#Application_Disclosure_Checkbox-label > div > a:nth-child(2)');

        this.link_ArbitrationProvision = page.getByRole('link', { name: 'Arbitration Provision' });
        // this.linkArbitrationProvision = page.locator('#Application_Disclosure_Checkbox-label > div > a:nth-child(3)');

        this.link_PrivacyPolicy = page.getByRole('link', { name: 'Privacy Policy' }).first();
        // this.linkPrivacyPolicy = page.locator('#Application_Disclosure_Checkbox-label > div > a:nth-child(4)');

        this.link_TermsOfUse = page.getByRole('link', { name: 'Terms of Use.' });
        // this.linkTermsOfUse = page.locator('#Application_Disclosure_Checkbox-label > div > a:nth-child(5)');
    }

    async checkApplicationDisclosure() {
        await this.link_ApplicationDisclosure.click();
        const page1Promise = this.page.waitForEvent('popup');
        const newPage = await page1Promise;
        await expect(newPage.getByRole('heading', { name: 'Application Disclosure' })).toBeVisible();
        newPage.close();
    }

    async checkESignDisclosure() {
        const page1Promise = this.page.waitForEvent('popup');
        await this.link_eSignDisclosure.click();
        const newPage = await page1Promise;
        await expect(newPage.getByRole('heading', { name: 'E-sign disclosure', exact: true })).toBeVisible();
        newPage.close();
    }

    async checkArbitrationProvision() {
        const page1Promise = this.page.waitForEvent('popup');
        await this.link_ArbitrationProvision.click();
        const newPage = await page1Promise;
        await expect(newPage.getByRole('heading', { name: 'Arbitration Clause' })).toBeVisible();
        newPage.close();
    }

    async checkPrivacyPolicy() {
        const page1Promise = this.page.waitForEvent('popup');
        await this.link_PrivacyPolicy.click();
        const newPage = await page1Promise;
        await expect(newPage.getByRole('heading', { name: 'Privacy' })).toBeVisible();
        newPage.close();
    }

    async checkTermsOfUse() {
        const page1Promise = this.page.waitForEvent('popup');
        await this.link_TermsOfUse.click();
        const newPage = await page1Promise;
        await expect(newPage.getByRole('heading', { name: 'Terms of use', exact: true })).toBeVisible();
        newPage.close();
    }
}
export default J_LinksCheck;