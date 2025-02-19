import {expect, test} from "@playwright/test";
import {postRequestRestWithBody, getRequestRest, postRequestSoap} from "playwright-qe-core/dist/utils/httpCallManager";
import {UriBuilder} from "playwright-qe-core/dist/utils/uriBuilder";
import {HttpStatus} from "@nestjs/common";

const eventRequest = {
    eventRequestCode: "Welcome",
    id: 12676368,
    data: {
        leaseId: 12676368,
        previousStatus: "Contracts Received",
        newStatus: "Funded",
        modifiedDate: "2025-01-29",
    }
}

test.describe("Calling apiExample POST through FETCH", () => {
  test("http post", async ({ request }) => {
      const response = await postRequestRestWithBody({ request }, new UriBuilder("https://slc-rcpwebcor.stormwind.local/CCMOrchestrator", "CcmEvent"),
        eventRequest);
      expect(response.status(), {
          message: `Invalid code ${response.status()} - ${await response.text()}]`,
      }).toEqual(HttpStatus.OK);
  });
});


test.describe("Calling apiExample GET through FETCH", () => {
  test("http get", async ({ request }) => {
    //you can also utilize playright/test to initialize requests this way they're consume anything in the
    //playwright config, doing this you would remove the context variable from apiExample and instead use
    //the request param/fixture
      const response = await getRequestRest({ request}, new UriBuilder("https://delinqncy.eks.test.aws.proginternal.com", "health"));
      expect(response.status(), {
          message: `Invalid code ${response.status()} - ${await response.text()}]`,
      }).toEqual(HttpStatus.OK);
  });
});

//TODO: Static string will need to be converted later to an object when we move the SOAP requests over from Rest Assured.
const submitApplication = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:app="http://progfinance.com/Application">' +
    '  <soapenv:Header/>' +
    '  <soapenv:Body>' +
    '    <app:SubmitApplication>' +
    '      <app:submission>' +
    '        <app:Authentication>' +
    '          <app:Username>onlineappuser6765</app:Username>' +
    '          <app:Password>progfin09</app:Password>' +
    '          <app:Source>{"LanguagePreference":"en", "MarketingOptIn":"false"}</app:Source>' +
    '        </app:Authentication>' +
    '        <app:Store>' +
    '          <app:StoreId>6765</app:StoreId>' +
    '          <app:StoreName>Oak Express (5740 Broadway)</app:StoreName>' +
    '          <app:StoreApplicationIdentifier>123</app:StoreApplicationIdentifier>' +
    '        </app:Store>' +
    '        <app:Applicant>' +
    '          <app:FirstName>Gerry</app:FirstName>' +
    '          <app:LastName>Bosco</app:LastName>' +
    '          <app:SocialSecurityNumber>561966619</app:SocialSecurityNumber>' +
    '          <app:BirthDate>1967-05-23T00:00:00</app:BirthDate>' +
    '          <app:HomePhone>8015550139</app:HomePhone>' +
    '          <app:CellPhone>8015550177</app:CellPhone>' +
    '          <app:IsMilitary>false</app:IsMilitary>' +
    '          <app:IsSocialSecurityBenefits>false</app:IsSocialSecurityBenefits>' +
    '          <app:IsSelfEmployed>false</app:IsSelfEmployed>' +
    '          <app:EMailAddress>gerry.bosco@progleasing.com</app:EMailAddress>' +
    '          <app:HomeOwnership>Own</app:HomeOwnership>' +
    '          <app:CustomerAddresses>' +
    '            <app:CustomerAddress>' +
    '              <app:StreetAddress1>2522 Fait Ave</app:StreetAddress1>' +
    '              <app:StreetAddress2/>' +
    '              <app:City>Draper</app:City>' +
    '              <app:State>UT</app:State>' +
    '              <app:Zip>84020</app:Zip>' +
    '              <app:MonthsAtAddress>36</app:MonthsAtAddress>' +
    '            </app:CustomerAddress>' +
    '          </app:CustomerAddresses>' +
    '          <app:Banks>' +
    '            <app:Bank>' +
    '              <app:BankName>Bank of Purdy</app:BankName>' +
    '              <app:ABARoutingNumber>111000012</app:ABARoutingNumber>' +
    '              <app:AccountNumber>848156</app:AccountNumber>' +
    '              <app:AccountType>Checking</app:AccountType>' +
    '              <app:DateAccountOpened>2010-02-03T00:00:00</app:DateAccountOpened>' +
    '              <app:NumberOfNSFFees xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:nil="true"/>' +
    '              <app:NumberOfOverdraftFees xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:nil="true"/>' +
    '            </app:Bank>' +
    '          </app:Banks>' +
    '          <app:Employments>' +
    '            <app:Employment>' +
    '              <app:EmployerName>Prog Fin</app:EmployerName>' +
    '              <app:Occupation>Banker</app:Occupation>' +
    '              <app:HireDate>2023-02-03T00:00:00</app:HireDate>' +
    '              <app:MonthlyGrossIncome>3435.99</app:MonthlyGrossIncome>' +
    '              <app:LastPayDate>2025-02-02T00:00:00</app:LastPayDate>' +
    '              <app:NextPayDate>2025-02-04T00:00:00</app:NextPayDate>' +
    '              <app:PayFrequency>WEEKLY</app:PayFrequency>' +
    '              <app:SupervisorName>George</app:SupervisorName>' +
    '              <app:WorkAddress>' +
    '                <app:StreetAddress>2522 Fait Ave</app:StreetAddress>' +
    '                <app:City>Draper</app:City>' +
    '                <app:State>UT</app:State>' +
    '                <app:Zip>84020</app:Zip>' +
    '              </app:WorkAddress>' +
    '              <app:WorkPhone>8017896789</app:WorkPhone>' +
    '              <app:WorkPhoneExtension xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:nil="true"/>' +
    '            </app:Employment>' +
    '          </app:Employments>' +
    '          <app:References>' +
    '            <app:Reference>' +
    '              <app:FirstName>George</app:FirstName>' +
    '              <app:LastName>Jungle</app:LastName>' +
    '              <app:City>West Jordan</app:City>' +
    '              <app:State>UT</app:State>' +
    '              <app:Phone>8019088978</app:Phone>' +
    '              <app:Relationship>Friend</app:Relationship>' +
    '            </app:Reference>' +
    '          </app:References>' +
    '        </app:Applicant>' +
    '        <app:CreditCard>' +
    '          <app:CreditCardNumber>4012000077777777</app:CreditCardNumber>' +
    '          <app:ExpirationDate>2025-12-31T00:00:00</app:ExpirationDate>' +
    '          <app:CreditCardBillingAddress>' +
    '            <app:StreetAddress1>2522 Fait Ave</app:StreetAddress1>' +
    '            <app:StreetAddress2/>' +
    '            <app:City>Draper</app:City>' +
    '            <app:State>UT</app:State>' +
    '            <app:Zip>84020</app:Zip>' +
    '          </app:CreditCardBillingAddress>' +
    '          <app:FirstNameOnCard>Gerry</app:FirstNameOnCard>' +
    '          <app:LastNameOnCard>Bosco</app:LastNameOnCard>' +
    '        </app:CreditCard>' +
    '        <app:DeliverCustomerDocument>false</app:DeliverCustomerDocument>' +
    '        <app:MarketingOptIn>false</app:MarketingOptIn>' +
    '      </app:submission>' +
    '    </app:SubmitApplication>' +
    '  </soapenv:Body>' +
    '</soapenv:Envelope>';

test.describe("Make SOAP request to submit a new application", () => {
    test("SOAP POST", async ({ request }) => {
        const response = await postRequestSoap({ request }, new UriBuilder("https://slc-rcpwebpws.stormwind.local/Application/Application.svc"),
            submitApplication, 'SubmitApplication');
        expect(response.status(), {
            message: `Invalid code ${response.status()} - ${await response.text()}]`,
        }).toEqual(HttpStatus.OK);
    });
});
