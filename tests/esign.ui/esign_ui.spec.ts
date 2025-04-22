import { expect, test } from '@playwright/test';
import A_IronCladHtmlBasePage from '$pages/esign.ui/A_IronCladHtmlBasePage';
import {submitApplication, submitInvoiceInformation} from "../../data/esign.ui/HappyPathApproved";


test.describe('esignui', async () => {
 // let ID : any;

  test('sign a contract',async ({ browser }) => {
    console.log(' generating esign ui url')
    // this is api call - submit application to get leaseId
    let leaseId = await submitApplication();

    // this is api call - submitInvoiceInformation  to get esignuiUrl
    let esignuiUrl = await submitInvoiceInformation(leaseId);

    let bCont = await browser.newContext();
    let cPage = await bCont.newPage();

    let a_ironCladHtmlPage = new A_IronCladHtmlBasePage(cPage);
    await a_ironCladHtmlPage.navigate(esignuiUrl);
    await a_ironCladHtmlPage.clickConsentRecurringPayment();
    await a_ironCladHtmlPage.clickConsentPaymentDueAtSigning();
    await a_ironCladHtmlPage.clickContinueButton();

    await a_ironCladHtmlPage.checkUrlforContractHTMLPage();
    await a_ironCladHtmlPage.clickScrollToRead();
    await a_ironCladHtmlPage.clickSignAndCompleteButton();

  });
});