import { type Page } from '@playwright/test';

class A_SwaggerPage {

    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async navigate() {
        await this.page.goto("https://connect.eks.stage.aws.proginternal.com/progconnect/api/docs/index.html",{timeout:10000});
    }

    //TODO:Note executing javascript via PlayWright does not appear to be working, this was pulled from the pl-qe-automation project
    async loadRecaptchaToken(siteKey:string) {
        await this.page.evaluate((siteKey) => "var callback = arguments[arguments.length - 1];" +
            "const loader = document.createElement('script');" +
            `loader.src = 'https://www.google.com/recaptcha/enterprise.js?render=`+ siteKey + `';` +
            "loader.async = true;" +
            "loader.onload = function() {" +
            "    grecaptcha.enterprise.ready(function() {" +
            "        callback(true);" +
            "    });" +
            "};" +
            "document.head.appendChild(loader);", siteKey);
    }
    //TODO:Note executing javascript via PlayWright does not appear to be working, this was pulled from the pl-qe-automation project
    async getRecaptchaToken(siteKey:string) {
        return await this.page.evaluate((siteKey) => "var callback = arguments[arguments.length - 1];" +
            `grecaptcha.enterprise.execute('`+ siteKey + `', {action: 'Authorize'})` +
            "   .then(function(token) {" +
            "       callback(token);" +
            "});", siteKey);
    }

}
export default A_SwaggerPage;