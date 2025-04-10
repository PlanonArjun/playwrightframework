import { test, expect } from '@playwright/test';
import LoginPageShopper from '../../pages/woocommerce/loginpage_shopper';
import LoginPageAdmin from '../../pages/woocommerce/loginpage_admin';
import credentials from '../../utils/woocommerce.utils/credentials';

let loginPageShopper: LoginPageShopper;
let loginPageAdmin: LoginPageAdmin;

test.describe('auth (shopper and admin)', async () => {

  test.describe.configure({ retries: 0 });
  test.describe.configure({ mode: 'parallel' });

  test('authentication shopper round robin',{ tag: ['@authentication', '@shopper'], },async ({browser}) => {
    await expect(async () => {
      const shopperContext = await browser.newContext();
      const shopperPage = await shopperContext.newPage();
      loginPageShopper = new LoginPageShopper(shopperPage);
      try {
        await loginPageShopper.authenticateRoundRobin(credentials.stagingShopper.username, credentials.stagingShopper.password);
        await shopperPage.evaluate(_ => {}, `browserstack_executor: ${JSON.stringify({action: 'setSessionStatus',arguments: {status: 'passed',reason:'woo auth shopper round robin'}})}`);
      }catch(Error) {
        await shopperPage.evaluate(_ => {}, `browserstack_executor: ${JSON.stringify({action: 'setSessionStatus',arguments: {status: 'failed',reason: Error.toString()}})}`);
      }finally{
        await shopperPage.close();
        await shopperContext.close();
      }
    }).toPass({timeout: 20000});
  });

  test('authentication admin round robin', { tag: ['@authentication', '@admin'], },async ({browser}) => {
    await expect(async () => {
      const adminContext = await browser.newContext();
      const adminPage = await adminContext.newPage();
      loginPageAdmin = new LoginPageAdmin(adminPage);
      await loginPageAdmin.authenticateRoundRobin(credentials.stagingAdmin.username, credentials.stagingAdmin.password);
      try {
        await loginPageAdmin.authenticateRoundRobin(credentials.stagingShopper.username, credentials.stagingShopper.password);
        await adminPage.evaluate(_ => {}, `browserstack_executor: ${JSON.stringify({action: 'setSessionStatus',arguments: {status: 'passed',reason:'woo auth admin round robin'}})}`);
      }catch(Error) {
        await adminPage.evaluate(_ => {}, `browserstack_executor: ${JSON.stringify({action: 'setSessionStatus',arguments: {status: 'failed',reason: Error.toString()}})}`);
      }finally{
        await adminPage.close();
        await adminContext.close();
      }
    }).toPass({timeout: 20000});
  });

});