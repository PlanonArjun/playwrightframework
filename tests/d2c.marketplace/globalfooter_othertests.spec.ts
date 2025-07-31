import { test, expect, BrowserContext, Page, chromium } from '@playwright/test';
import { A_BasePage } from '$pages/d2c.marketplace/A_BasePage';
import D2CMarketPlaceHealthCheck from './D2CMarketPlaceHealthCheck';
import urls from '$utils/d2cmarketplace.utils/urls';
import { normalizedURL } from '$utils/d2cmarketplace.utils/urls';

let browserContext: BrowserContext;
let page: Page;
let isHealthyLocal: Boolean;
let basePage: A_BasePage;

test.describe.skip('Global Footers Test Suite', () => {
    test.describe.configure({ retries: 0 });
    test.describe.configure({ mode: 'serial' });

    test.beforeAll(async ({ browser }) => {
        let browserTemp = await chromium.launch({ headless: true });
        let pageTemp = await browserTemp.newPage();
        isHealthyLocal = await new D2CMarketPlaceHealthCheck(pageTemp).isHealthy();
        await browserTemp.close();
        await pageTemp.close();
    });

    test.describe('Declaration copyright and T&C tests', () => {
        test.skip(isHealthyLocal == false, 'health check FAILED; test.skip()');
        test.beforeEach(async ({ browser }) => {
            browserContext = await browser.newContext();
            page = await browserContext.newPage();
            basePage = new A_BasePage(page);
            await basePage.onBasePage();
        });

        test('verify declaration info on footer', { tag: ['@globalfooters', '@declaration', '@01'] }, async () => {
            await basePage.verifyPLDeclarationText();
        })

        test('verify copyright info on footer', { tag: ['@globalfooters', '@copyright', '@01'] }, async () => {
            await basePage.verifyPLCopyrightText();
        })

        test('Verify all terms and conditions links are working', { tag: ['@globalfooters', '@termsandcondition', '@03'] }, async () => {
            const [termsPage] = await Promise.all([
                browserContext.waitForEvent('page'),
                basePage.clickTermsOfUseLink()
            ]);
            await termsPage.waitForLoadState();
            let actualURL: string = normalizedURL(termsPage.url());
            expect(actualURL).toBe(urls.PL_TERMS_URL.PL_TERMS_URL);
            await termsPage.close();

            const [privacyPage] = await Promise.all([
                browserContext.waitForEvent('page'),
                basePage.clickPrivacyLink()
            ]);
            await privacyPage.waitForLoadState();
            actualURL = normalizedURL(privacyPage.url());
            expect(actualURL).toBe(urls.PL_PRIVACY_URL.PL_PRIVACY_URL);
            await privacyPage.close();

            const [trustPage] = await Promise.all([
                browserContext.waitForEvent('page'),
                basePage.clickTrustCentreLink()
            ]);
            await trustPage.waitForLoadState();
            actualURL = normalizedURL(trustPage.url());
            expect(actualURL).toBe(urls.PL_TRUST_URL.PL_TRUST_URL);
            await trustPage.close();

            const [dataSubjectReqPage] = await Promise.all([
                browserContext.waitForEvent('page'),
                basePage.clickDataSubjectsRequestsLink()
            ]);
            await dataSubjectReqPage.waitForLoadState();
            actualURL = normalizedURL(dataSubjectReqPage.url());
            expect(actualURL).toBe(urls.PL_DATA_SUBJECT_REQUEST_URL.PL_DATA_SUBJECT_REQUEST_URL);
            await dataSubjectReqPage.close();

            const [cookiesPage] = await Promise.all([
                browserContext.waitForEvent('page'),
                basePage.clickYourPrivacyChoicesLink()
            ]);
            await cookiesPage.waitForLoadState();
            actualURL = normalizedURL(cookiesPage.url());
            expect(actualURL).toBe(urls.PL_COOKIE_PREFERENCE_URL.PL_COOKIE_PREFERENCE_URL);
            await cookiesPage.close();

            await basePage.clickBIPALink();
            await expect(page).toHaveURL(urls.PL_BIPA_URL.PL_BIPA_URL);
        })

        test('Verify language in footer section is as per selection', { tag: ['@globalfooters', '@language', '@04'] }, async () => {
           let initialLang = await basePage.getCurrentLanguage()
            await basePage.clickLanguageIcon()
            await basePage.checkLanguageChange(initialLang)
            initialLang = await basePage.getCurrentLanguage()
            await basePage.clickLanguageIcon()
            await basePage.checkLanguageChange(initialLang)
        })

        test.afterEach(async () => {
            await page.close();
            await browserContext.close();
        });
    })
})