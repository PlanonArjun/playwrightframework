import { type Page, type Locator, expect } from "@playwright/test"
import urls from '../../utils/d2cmarketplace.utils/urls'
import { LANGUAGE } from "$utils/d2cmarketplace.utils/language"
import { PL } from "$utils/d2cmarketplace.utils/pl"
import testData from '../../data/d2c.marketplace/testdata.json'

export class A_BasePage {

    private readonly page: Page
    private readonly progLeasingLogo: Locator
    private readonly shopRetailersIcon: Locator
    private readonly locationPopUpHeader: Locator
    private readonly shopAllIcon: Locator
    private readonly shopAllLink: Locator
    private readonly shopCategoriesHeader: Locator
    private readonly shopCategoriesItems: Locator
    private readonly learnMoreBtn: Locator
    private readonly learnMoreHeader: Locator
    private readonly howItWorksLink_LearnMore: Locator
    private readonly contactUsLink_LearnMore: Locator
    private readonly getTheAppLink_LearnMore: Locator
    private readonly faqsLink_LearnMore: Locator
    private readonly startALeaseBtn_LearnMore: Locator
    private readonly languageIcon: Locator
    private readonly globalSearch: Locator
    private readonly searchProductAndRetailerInput: Locator
    private readonly progLeasingLogoFooter: Locator
    private readonly forRetailersHeader: Locator
    private readonly partnerSignUpLink: Locator
    private readonly retailerLoginLink: Locator
    private readonly mediaKitLink: Locator
    private readonly progCentralLink: Locator
    private readonly ourBusinessHeader: Locator
    private readonly aboutUsLink: Locator
    private readonly investorsLink: Locator
    private readonly partnersLink: Locator
    private readonly progFoundationLink: Locator
    private readonly careersLink: Locator
    private readonly supportHeader: Locator
    private readonly howItWorksLink: Locator
    private readonly contactUsLink: Locator
    private readonly customerFeedbackLink: Locator
    private readonly blogsLink: Locator
    private readonly faqsLink: Locator
    private readonly appStoreLink: Locator
    private readonly playStoreLink: Locator
    private readonly fbLink: Locator
    private readonly igLink: Locator
    private readonly plDeclarationText: Locator
    private readonly plCopyrightText: Locator
    private readonly termsOfUseLink: Locator
    private readonly privacyLink: Locator
    private readonly trustCentreLink: Locator
    private readonly dataSubjectRequestsLink: Locator
    private readonly bipaLink: Locator
    private readonly yourPrivacyChoicesLink: Locator
    private readonly languageFooter: Locator

    constructor(page: Page) {
        this.page = page
        this.progLeasingLogo = page.locator('img[alt="B2C Retail Store"]')
        this.shopRetailersIcon = page.locator('a', { hasText: testData.pageTexts.basePage.shopRetailersBtnText })
        this.locationPopUpHeader = page.locator('span', { hasText: testData.pageTexts.basePage.locationHeaderText })
        this.shopAllIcon = page.getByRole('button', { name: testData.pageTexts.basePage.shopAllBtnAndLinkText, exact: true })
        this.shopAllLink = page.getByRole('link', { name: testData.pageTexts.basePage.shopAllBtnAndLinkText })
        this.shopCategoriesHeader = page.locator('p', { hasText: testData.pageTexts.basePage.shopCategoriesHeaderText })
        this.shopCategoriesItems = page.locator('div[class="flex flex-col items-center justify-center gap-[0.5rem]"] p')
        this.learnMoreBtn = page.locator('button', { hasText: testData.pageTexts.basePage.learnMoreBtnAndHeaderText })
        this.learnMoreHeader = page.locator('p', { hasText: testData.pageTexts.basePage.learnMoreBtnAndHeaderText })
        this.howItWorksLink_LearnMore = page.locator('a span', { hasText: testData.pageTexts.basePage.howItWorksLinkText })
        this.contactUsLink_LearnMore = page.locator('a span', { hasText: testData.pageTexts.basePage.contactUsLinkText })
        this.getTheAppLink_LearnMore = page.locator('a span', { hasText: testData.pageTexts.basePage.getTheAppLinkText })
        this.faqsLink_LearnMore = page.locator('a span', { hasText: testData.pageTexts.basePage.faqsLinkText })
        this.startALeaseBtn_LearnMore = page.locator('button', { hasText: testData.pageTexts.basePage.startALeaseBtnText })
        this.languageIcon = page.locator('div button', { hasText: /^E/ })
        this.globalSearch = page.locator('button[aria-label="search"]')
        this.searchProductAndRetailerInput = page.getByPlaceholder('Search Retailers and products')
        this.progLeasingLogoFooter = page.locator('img[alt="progressive leasing"]')
        this.forRetailersHeader = page.locator('h2', { hasText: testData.pageTexts.basePage.forRetailersHeaderText })
        this.partnerSignUpLink = page.getByRole('link', { name: testData.pageTexts.basePage.partnerSignUpLinkText })
        this.retailerLoginLink = page.getByRole('link', { name: testData.pageTexts.basePage.retailerLoginLinkText })
        this.mediaKitLink = page.getByRole('link', { name: testData.pageTexts.basePage.mediaKitLinkText })
        this.progCentralLink = page.getByRole('link', { name: testData.pageTexts.basePage.progCentralLinkText })
        this.ourBusinessHeader = page.locator('h2', { hasText: testData.pageTexts.basePage.ourBusinessHeaderText })
        this.aboutUsLink = page.getByRole('link', { name: testData.pageTexts.basePage.aboutUsLinkText })
        this.investorsLink = page.getByRole('link', { name: testData.pageTexts.basePage.investorsLinkText })
        this.partnersLink = page.getByRole('link', { name: testData.pageTexts.basePage.partnersLinkText })
        this.progFoundationLink = page.getByRole('link', { name: testData.pageTexts.basePage.progFoundationLinkText })
        this.careersLink = page.getByRole('link', { name: testData.pageTexts.basePage.careersLinkText })
        this.supportHeader = page.locator('h2', { hasText: testData.pageTexts.basePage.supportHeaderText })
        this.howItWorksLink = page.getByRole('link', { name: testData.pageTexts.basePage.howItWorksLinkText })
        this.contactUsLink = page.getByRole('link', { name: testData.pageTexts.basePage.contactUsLinkText })
        this.customerFeedbackLink = page.getByRole('link', { name: testData.pageTexts.basePage.customerFeedbackLink })
        this.blogsLink = page.getByRole('link', { name: testData.pageTexts.basePage.blogsLinkText })
        this.faqsLink = page.getByRole('link', { name: testData.pageTexts.basePage.faqsLinkText })
        this.appStoreLink = page.getByRole('link', { name: testData.pageTexts.basePage.appStoreLinkText })
        this.playStoreLink = page.getByRole('link', { name: testData.pageTexts.basePage.playStoreLinkText })
        this.fbLink = page.getByRole('link', { name: testData.pageTexts.basePage.fbLinkText })
        this.igLink = page.getByRole('link', { name: testData.pageTexts.basePage.igLinkText })
        this.plDeclarationText = page.getByText(testData.pageTexts.basePage.plDeclarationText)
        this.plCopyrightText = page.getByText(testData.pageTexts.basePage.plCopyrightText)
        this.termsOfUseLink = page.getByRole('link', {name: testData.pageTexts.basePage.termsOfUseLinkText})
        this.privacyLink = page.getByRole('link', { name: testData.pageTexts.basePage.privacyLinkText })
        this.trustCentreLink = page.getByRole('link', {name: testData.pageTexts.basePage.trustCentreLinkText})
        this.dataSubjectRequestsLink = page.getByRole('link', {name: testData.pageTexts.basePage.dataSubjectsRequestLinkText})
        this.bipaLink = page.getByRole('link', {name: testData.pageTexts.basePage.bipaLinkText})
        this.yourPrivacyChoicesLink = page.getByRole('link', {name: testData.pageTexts.basePage.yourPrivacyChoicesLinkText})
        this.languageFooter = page.locator('span[class="global-text-sm-medium ml-1 text-primary focus:outline-none focus:outline-2 focus:outline-black"]')
    }

    async onBasePage() {
        await this.page.goto(urls.HOME_PAGE_URL.HOME_PAGE_URL)
        await this.page.waitForTimeout(2000);
        await expect(this.progLeasingLogo).toBeVisible()
    }

    async clickPLLogo() {
        await this.progLeasingLogo.click()
    }

    async getCurrentURL() {
        this.page.waitForLoadState()
        return this.page.url()
    }

    async clickShopRetailersLink() {
        await this.shopRetailersIcon.click()
    }

    //CSS validation of header to be added
    async verifyLocationPopUpVisibility() {
        await expect(this.locationPopUpHeader).toBeVisible()
    }

    //CSS validation of header to be added
    async clickShopAllBtn() {
        await this.shopAllIcon.click({ timeout: 10000 })
    }

    async clickShopAllLink() {
        await this.shopAllLink.click()
    }

    //CSS validation of header to be added
    async verifyPresenceOfShopCategories() {
        await expect(this.shopCategoriesHeader).toBeVisible()
    }

    getCategoriesMenu() {
        return this.shopCategoriesItems
    }

    async clickLearnMoreBtn() {
        await this.learnMoreBtn.click()
    }

    //CSS validation of header to be added
    async verifyHeaderAndOptionsInLearnMore() {
        await expect(this.learnMoreHeader).toBeVisible()
        await expect(this.howItWorksLink_LearnMore).toBeVisible()
        await expect(this.contactUsLink_LearnMore).toBeVisible()
        await expect(this.getTheAppLink_LearnMore).toBeVisible()
        await expect(this.faqsLink_LearnMore).toBeVisible()
        await expect(this.startALeaseBtn_LearnMore).toBeVisible()
    }

    async clickHowItWorksLearnMoreLink() {
        await this.howItWorksLink_LearnMore.click()
    }

    async clickContactUsLearnMoreLink() {
        await this.contactUsLink_LearnMore.click()
    }

    async clickFAQsLearnMoreLink() {
        await this.faqsLink_LearnMore.click()
    }

    async clickGetTheAppLearnMoreLink() {
        await this.getTheAppLink_LearnMore.click()
    }

    async clickStartALeaseLearnMoreBtn() {
        await this.faqsLink_LearnMore.click()
    }

    async clickLanguageIcon() {
        await this.languageIcon.click()
    }

    async getCurrentLanguage() {
        return await this.languageIcon.textContent()
    }

    async checkLanguageChange(initialLang: string) {
        if (initialLang == LANGUAGE.ENGLISH_CODE) {
            expect(await this.getCurrentLanguage()).toEqual(LANGUAGE.SPANISH_CODE);
        } else {
            expect(await this.getCurrentLanguage()).toEqual(LANGUAGE.ENGLISH_CODE);
        }
    }

    async clickGlobalSearch() {
        await this.globalSearch.click()
        await expect(this.searchProductAndRetailerInput).toBeVisible()
    }

    async clickPLLogoInFooter() {
        await this.progLeasingLogoFooter.scrollIntoViewIfNeeded()
        await this.progLeasingLogoFooter.click()
    }

    //CSS validation to be added
    async verifyAvailabilityOfForRetailersHeader() {
        await this.forRetailersHeader.scrollIntoViewIfNeeded()
        expect(this.forRetailersHeader).toBeVisible()
    }

    async clickPartnerSignUpLink() {
        await this.partnerSignUpLink.click()
    }

    async clickRetailerLoginLink() {
        await this.retailerLoginLink.click()
    }

    async clickMediaKitLink() {
        await this.mediaKitLink.click()
    }

    async clickProgCentralLink() {
        await this.progCentralLink.click()
    }

    //CSS validation to be added
    async verifyAvailabilityOfOurBusinessHeader() {
        await this.ourBusinessHeader.scrollIntoViewIfNeeded()
        expect(this.ourBusinessHeader).toBeVisible()
    }

    async clickAboutUsLink() {
        await this.aboutUsLink.click()
    }

    async clickInvestorsLink() {
        await this.investorsLink.click()
    }

    async clickPartnersLink() {
        await this.partnersLink.click()
    }

    async clickProgFoundationLink() {
        await this.progFoundationLink.click()
    }

    async clickCareersLink() {
        await this.careersLink.click()
    }

    //CSS validation to be added
    async verifyAvailabilityOfSupportHeader() {
        await this.supportHeader.scrollIntoViewIfNeeded()
        expect(this.supportHeader).toBeVisible()
    }

    async clickHowItWorksLink() {
        await this.howItWorksLink.click()
    }

    async clickContactUsLink() {
        await this.contactUsLink.click()
    }

    async clickCustomerFeedbackLink() {
        await this.customerFeedbackLink.click()
    }

    async clickBlogsLink() {
        await this.blogsLink.click()
    }

    async clickFAQsLink() {
        await this.faqsLink.click()
    }

    async clickAppStoreLink() {
        await this.appStoreLink.scrollIntoViewIfNeeded()
        await this.appStoreLink.click()
    }

    async clickPlayStoreLink() {
        await this.playStoreLink.scrollIntoViewIfNeeded()
        await this.playStoreLink.click()
    }

    async clickFBLink() {
        await this.fbLink.scrollIntoViewIfNeeded()
        await this.fbLink.click()
    }

    async clickIGLink() {
        await this.igLink.scrollIntoViewIfNeeded()
        await this.igLink.click()
    }

    async verifyPLDeclarationText() {
        await this.plDeclarationText.scrollIntoViewIfNeeded()
        await expect(this.plDeclarationText).toHaveText(PL.DECLARATION)
    }

    async verifyPLCopyrightText() {
        await this.plCopyrightText.scrollIntoViewIfNeeded()
        await expect(this.plCopyrightText).toHaveText(PL.COPYRIGHT)
    }

    async clickTermsOfUseLink() {
        await this.termsOfUseLink.scrollIntoViewIfNeeded()
        await this.termsOfUseLink.click()
    }

    async clickPrivacyLink() {
        await this.privacyLink.scrollIntoViewIfNeeded()
        await this.privacyLink.click()
    }

    async clickTrustCentreLink() {
        await this.trustCentreLink.scrollIntoViewIfNeeded()
        await this.trustCentreLink.click()
    }

    async clickDataSubjectsRequestsLink() {
        await this.dataSubjectRequestsLink.scrollIntoViewIfNeeded()
        await this.dataSubjectRequestsLink.click()
    }

    async clickBIPALink() {
        await this.bipaLink.scrollIntoViewIfNeeded()
        await this.bipaLink.click()
    }

    async clickYourPrivacyChoicesLink() {
        await this.yourPrivacyChoicesLink.scrollIntoViewIfNeeded()
        await this.yourPrivacyChoicesLink.click()
    }

    async getTheLanguageSelectedInFooter() {
       return await this.languageFooter.innerText()
    }

}

export default A_BasePage;