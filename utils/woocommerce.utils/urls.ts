// urls.ts
let landing: string = 'http://10.146.147.90/';
export default {
    landing: {
        landing: landing,
    },
    login: {
        shopper: landing + 'my-account/',
        admin:   landing + 'wp-admin/',
    },
    logout: {
        admin: landing + 'wp-login.php?action=logout',
        shopper: landing + 'my-account/customer-logout/',
    },
    shop: {
        shop: landing + 'shop/',
    },
    cart: {
        cart: landing + 'cart/',
    },
    product: {
        comfyGrey: landing + 'product/comfy-gray/',
        marimba: landing + 'product/marimba-hero',
        magentoBook: landing + 'product/magento-2-magento-2-development-essentials-fernando-j-miguel/',
        oculus: landing + 'product/oculus-quest-2/',
        warrantyMarimba: landing + 'product/warranty-marimba-hero/',
    },
    checkout: {
        checkout_1_BillingDetails: landing + 'checkout/',
    },
};
  