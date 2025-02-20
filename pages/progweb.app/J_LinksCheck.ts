import { type Page, type Locator, expect } from '@playwright/test';

class J_LinksCheck {


    readonly page: Page;
    readonly applicationDiscloser: Locator;
    readonly eSignDiscloser: Locator;
    readonly arbitrationClause: Locator;
    readonly priavacyPolicy: Locator;
    readonly termsOfUse: Locator;

    constructor(page: Page) {
        this.page = page;
        this.applicationDiscloser = page.getByRole('link', { name: 'Application Disclosure,' });

        this.eSignDiscloser = page.getByRole('link', { name: 'E-Sign Disclosure' });
        this.arbitrationClause = page.getByRole('link', { name: 'Arbitration Provision' });
        this.priavacyPolicy = page.getByRole('link', { name: 'Privacy Policy' }).first();
        this.termsOfUse = page.getByRole('link', { name: 'Terms of Use.' });
    }

    async checkApplicationDiscloser() {
        const page1Promise = this.page.waitForEvent('popup');
        await this.applicationDiscloser.click();
        const newPage = await page1Promise;
        await expect(newPage.getByRole('heading', { name: 'Application Disclosure' })).toBeVisible();
        newPage.close();
    }

    async checkEsignDiscloser() {
        const page1Promise = this.page.waitForEvent('popup');
        await this.eSignDiscloser.click();
        const newPage = await page1Promise;
        await expect(newPage.getByRole('heading', { name: 'E-sign disclosure', exact: true })).toBeVisible();
        newPage.close();
    }

    async checkArbitrationProvision() {
        const page1Promise = this.page.waitForEvent('popup');
        await this.arbitrationClause.click();
        const newPage = await page1Promise;
        await expect(newPage.getByRole('heading', { name: 'Arbitration Clause' })).toBeVisible();
        newPage.close();
    }

    async checkPriavacyPolicy() {
        const page1Promise = this.page.waitForEvent('popup');
        await this.priavacyPolicy.click();
        const newPage = await page1Promise;
        await expect(newPage.getByRole('heading', { name: 'Privacy' })).toBeVisible();
        newPage.close();
    }

    async checkTermsOfUse() {
        const page1Promise = this.page.waitForEvent('popup');
        await this.termsOfUse.click();
        const newPage = await page1Promise;
        await expect(newPage.getByRole('heading', { name: 'Terms of use', exact: true })).toBeVisible();
        newPage.close();
    }
}
export default J_LinksCheck;