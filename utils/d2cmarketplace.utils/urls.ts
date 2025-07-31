export const HOME_PAGE_URL: string = 'https://marketplace01-progleasing.frontend.site/en/';
export const PL_CURRENT_HOME_PAGE_URL: string = 'https://progleasing.com/';
export const PL_BASE_URL: string = 'https://www.progleasing.com/';
export const PL_FAQ_URL: string = 'https://help.progleasing.com/hc/en-us';
export const PL_INVESTORS_URL: string = 'https://investor.progholdings.com/';
export const PROG_FOUNDATION_URL: string = 'https://progfoundation.org/';
export const APP_STORE_URL: string = 'https://apps.apple.com/us/app/progressive-leasing/id995368829?mt=8';
export const PLAY_STORE_URL: string = 'https://play.google.com/store/apps/details?id=com.progfinance.progressivemobile&hl=en_US';
export const FB_URL: string = 'https://facebook.com/ProgLeasingLLC';
export const IG_URL: string = 'https://instagram.com/accounts/login/?next=https%3A%2F%2Fwww.instagram.com%2Fprogressiveleasing%2F&is_from_rle';
export const PL_DATA_SUBJECT_REQUEST_URL: string = 'https://progleasing.truyo.com/consumer/make_request';
export const LEASE_ONLINE_URL: string = 'https://cic-preview.progleasing.com/u/login/'
export const ESTIMATE_LEASING_COST_URL: string = 'https://www.stage.progleasing.com/myaccount/'
export const normalizedURL = (url: string): string => {
    // Remove protocol and www (optional)
    const stripped = url.replace(/^https?:\/\/(www\.)?/, '');

    // Add a consistent protocol back (https here)
    const normalized = `https://${stripped}`;

    return normalized;
};

export default {
    HOME_PAGE_URL: {
        HOME_PAGE_URL: HOME_PAGE_URL
    },
    SHOP_RETAILERS_URL: {
        SHOP_RETAILERS_URL: HOME_PAGE_URL + 'retailers/'
    },
    SHOP_ALL_URL: {
        SHOP_ALL_URL: HOME_PAGE_URL + 'shop/shop/'
    },
    HOW_IT_WORKS_URL: {
        HOW_IT_WORKS_URL: PL_CURRENT_HOME_PAGE_URL + 'how-it-works'
    },
    CONTACT_US_URL: {
        CONTACT_US_URL: PL_CURRENT_HOME_PAGE_URL + 'contact-us'
    },
    BLOG_URL: {
        BLOG_URL: PL_CURRENT_HOME_PAGE_URL + 'blog'
    },
    PARTNER_SIGNUP_URL: {
        PARTNER_SIGNUP_URL: PL_BASE_URL + 'index.php/merchant'
    },
    RETAILER_LOGIN_URL: {
        RETAILER_LOGIN_URL: PL_BASE_URL + 'merchant'
    },
    MEDIA_KIT_URL: {
        MEDIA_KIT_URL: PL_BASE_URL + 'index.php/retailer-social-kits'
    },
    ABOUT_US_URL: {
        ABOUT_US_URL: PL_BASE_URL + 'about-us'
    },
    PL_CAREERS_URL: {
        PL_CAREERS_URL: PL_CURRENT_HOME_PAGE_URL + 'jobs/'
    },
    FAQ_URL: {
        FAQ_URL: PL_FAQ_URL
    },
    INVESTORS_URL: {
        INVESTORS_URL: PL_INVESTORS_URL
    },
    PROG_FOUNDATION_URL: {
        PROG_FOUNDATION_URL: PROG_FOUNDATION_URL
    },
    APP_STORE_URL: {
        APP_STORE_URL: APP_STORE_URL
    },
    PLAY_STORE_URL: {
        PLAY_STORE_URL: PLAY_STORE_URL
    },
    FB_URL: {
        FB_URL: FB_URL
    },
    IG_URL: {
        IG_URL: IG_URL
    },
    PL_TERMS_URL: {
        PL_TERMS_URL: PL_CURRENT_HOME_PAGE_URL + 'terms/'
    },
    PL_PRIVACY_URL: {
        PL_PRIVACY_URL: PL_CURRENT_HOME_PAGE_URL + 'privacy/'
    },
    PL_TRUST_URL: {
        PL_TRUST_URL: PL_CURRENT_HOME_PAGE_URL + 'prog-force-trust-center'
    },
    PL_DATA_SUBJECT_REQUEST_URL: {
        PL_DATA_SUBJECT_REQUEST_URL: PL_DATA_SUBJECT_REQUEST_URL
    },
    PL_COOKIE_PREFERENCE_URL: {
        PL_COOKIE_PREFERENCE_URL: PL_CURRENT_HOME_PAGE_URL + 'CookiePreferences'
    },
    PL_BIPA_URL: {
        PL_BIPA_URL: PL_BASE_URL + 'bipa'
    },
    LEASE_ONLINE_URL: {
        LEASE_ONLINE_URL: LEASE_ONLINE_URL
    },
    ESTIMATE_LEASING_COST_URL: {
        ESTIMATE_LEASING_COST_URL: ESTIMATE_LEASING_COST_URL
    }
};