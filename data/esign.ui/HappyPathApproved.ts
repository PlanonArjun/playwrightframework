import { expect, test } from '@playwright/test';
import { getRandomInt } from '../../utils/esign.ui/randomUtil'
import { sendSoapRequest } from '$utils/esign.ui/serviceutils';
import {url} from '$utils/esign.ui/urls';

export async function submitApplication() {
  let ID = getRandomInt(11110000, 99999999);
  const xmlPayload = `
    <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:app="http://progfinance.com/Application">
      <soapenv:Header/>
      <soapenv:Body>
        <app:SubmitApplication>
          <app:submission>
            <app:Authentication>
              <app:Username>onlineappuser67702</app:Username>
              <app:Password>progfin09</app:Password>
              <app:Source>{"LanguagePreference":"EN", "MarketingOptIn":"false"}</app:Source>
            </app:Authentication>
            <app:Store>
              <app:StoreId>67702</app:StoreId>
              <app:StoreName>Oak Express (5740 Broadway)</app:StoreName>
              <app:StoreApplicationIdentifier>123</app:StoreApplicationIdentifier>
            </app:Store>
            <app:Applicant>
              <app:FirstName>Antonia</app:FirstName>
              <app:LastName>Pollich</app:LastName>
              <app:SocialSecurityNumber>5${ID}</app:SocialSecurityNumber>
              <app:BirthDate>1973-08-04T00:00:00</app:BirthDate>
              <app:HomePhone>8015550129</app:HomePhone>
              <app:CellPhone>8015550151</app:CellPhone>
              <app:IsMilitary>false</app:IsMilitary>
              <app:IsSocialSecurityBenefits>false</app:IsSocialSecurityBenefits>
              <app:IsSelfEmployed>false</app:IsSelfEmployed>
              <app:EMailAddress>antonia.pollich@progleasing.com</app:EMailAddress>
              <app:HomeOwnership>Own</app:HomeOwnership>
              <app:CustomerAddresses>
                <app:CustomerAddress>
                  <app:StreetAddress1>10</app:StreetAddress1>
                  <app:StreetAddress2/>
                  <app:City>progtest city</app:City>
                  <app:State>UT</app:State>
                  <app:Zip>84088</app:Zip>
                  <app:MonthsAtAddress>36</app:MonthsAtAddress>
                </app:CustomerAddress>
              </app:CustomerAddresses>
              <app:Banks>
                <app:Bank>
                  <app:BankName>Bank of Sporer</app:BankName>
                  <app:ABARoutingNumber>111000012</app:ABARoutingNumber>
                  <app:AccountNumber>382837</app:AccountNumber>
                  <app:AccountType>Checking</app:AccountType>
                  <app:DateAccountOpened>2009-04-05T00:00:00</app:DateAccountOpened>
                  <app:NumberOfNSFFees xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:nil="true"/>
                  <app:NumberOfOverdraftFees xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:nil="true"/>
                </app:Bank>
              </app:Banks>
              <app:Employments>
                <app:Employment>
                  <app:EmployerName>Prog Fin</app:EmployerName>
                  <app:Occupation>Banker</app:Occupation>
                  <app:HireDate>2022-04-05T00:00:00</app:HireDate>
                  <app:MonthlyGrossIncome>3435.99</app:MonthlyGrossIncome>
                  <app:LastPayDate>2025-04-17T00:00:00</app:LastPayDate>
                  <app:NextPayDate>2025-04-20T00:00:00</app:NextPayDate>
                  <app:PayFrequency>WEEKLY</app:PayFrequency>
                  <app:SupervisorName>George</app:SupervisorName>
                  <app:WorkAddress>
                    <app:StreetAddress>2522 Fait Ave</app:StreetAddress>
                    <app:City>Draper</app:City>
                    <app:State>UT</app:State>
                    <app:Zip>84020</app:Zip>
                  </app:WorkAddress>
                  <app:WorkPhone>8017896789</app:WorkPhone>
                  <app:WorkPhoneExtension xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:nil="true"/>
                </app:Employment>
              </app:Employments>
              <app:References>
                <app:Reference>
                  <app:FirstName>George</app:FirstName>
                  <app:LastName>Jungle</app:LastName>
                  <app:City>West Jordan</app:City>
                  <app:State>UT</app:State>
                  <app:Phone>8019088978</app:Phone>
                  <app:Relationship>Friend</app:Relationship>
                </app:Reference>
              </app:References>
            </app:Applicant>
            <app:CreditCard>
              <app:CreditCardNumber>6011000991200035</app:CreditCardNumber>
              <app:ExpirationDate>2025-12-31T00:00:00</app:ExpirationDate>
              <app:CreditCardBillingAddress>
                <app:StreetAddress1>2522 Fait Ave</app:StreetAddress1>
                <app:StreetAddress2/>
                <app:City>Draper</app:City>
                <app:State>UT</app:State>
                <app:Zip>84020</app:Zip>
              </app:CreditCardBillingAddress>
              <app:FirstNameOnCard>Antonia</app:FirstNameOnCard>
              <app:LastNameOnCard>Pollich</app:LastNameOnCard>
            </app:CreditCard>
            <app:DeliverCustomerDocument>false</app:DeliverCustomerDocument>
            <app:MarketingOptIn>false</app:MarketingOptIn>
          </app:submission>
        </app:SubmitApplication>
      </soapenv:Body>
    </soapenv:Envelope>
    `;
  const SOAPAction = 'SubmitApplication';

  console.log(`Request: ${xmlPayload}`);

  const response = await sendSoapRequest(url, xmlPayload, SOAPAction);

  console.log(`url: ${url}`);
  console.log(`soapAction: ${SOAPAction}`);

  console.log(`Status: ${response.status()}`);
  console.log('Headers:', response.headers());
  console.log('Body:', await response.text());
  const text = await response.text();
  console.log(`Response Status:${response.status()}`);

  expect(`${response.status()}`).toBe("200");

  const acctNumstartpos = (await response.text()).indexOf("<AccountNumber>");
  const acctNumendpos = (await response.text()).indexOf("</AccountNumber>");
  console.log(`acctNumstartpos:${acctNumstartpos}`);
  console.log(`acctNumendpos:${acctNumendpos}`);

  let leaseId = text.substring(acctNumstartpos + 15,acctNumendpos);

  console.log('Body:leaseId', leaseId);

  return leaseId; 
}

export async function submitInvoiceInformation(leaseId: string) {
    const xmlPayload = `
      <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:app="http://progfinance.com/Application">
        <soapenv:Header/>
        <soapenv:Body>
          <app:SubmitInvoiceInformation>
            <app:submission>
              <app:Authentication>
                <app:Username>onlineappuser67702</app:Username>
                <app:Password>progfin09</app:Password>
                <app:Source>{"LanguagePreference":"EN", "MarketingOptIn":"false"}</app:Source>
              </app:Authentication>
              <app:ApplicationId>
                <app:StoreApplicationIdentifier/>
                <app:AccountNumber>${leaseId}</app:AccountNumber>
              </app:ApplicationId>
              <app:Invoice xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:nil="true"/>
              <app:StandardInvoice>
                <app:InvoiceNumber>1235</app:InvoiceNumber>
                <app:InvoiceTotal>700.0</app:InvoiceTotal>
                <app:AdditionalAmountDown>0.0</app:AdditionalAmountDown>
                <app:DeliveryCharge>0.0</app:DeliveryCharge>
                <app:SalesTax>0.0</app:SalesTax>
                <app:InvoiceDate>2025-03-05T00:00:00</app:InvoiceDate>
                <app:DeliveryDate>2025-01-27T00:00:00</app:DeliveryDate>
                <app:Merchandise>
                  <app:MerchandiseItem>
                    <app:SKU>TESTHAULAWAY</app:SKU>
                    <app:Model>T-17</app:Model>
                    <app:Description>RetailerFee</app:Description>
                    <app:PriceEach>650.0</app:PriceEach>
                    <app:Quantity>1</app:Quantity>
                  </app:MerchandiseItem>
                  <app:MerchandiseItem>
                    <app:SKU>TESTINSTALL</app:SKU>
                    <app:Model>T-17</app:Model>
                    <app:Description>RetailerFee</app:Description>
                    <app:PriceEach>50.0</app:PriceEach>
                    <app:Quantity>1</app:Quantity>
                  </app:MerchandiseItem>
                </app:Merchandise>
                <app:SendTextToSign>false</app:SendTextToSign>
              </app:StandardInvoice>
              <app:MerchantCustomerId/>
            </app:submission>
          </app:SubmitInvoiceInformation>
        </soapenv:Body>
      </soapenv:Envelope>
    `;
    const soapAction = 'SubmitInvoiceInformation';
    console.log(`Request: ${xmlPayload}`);
  
    const response = await sendSoapRequest(url, xmlPayload, soapAction);
  
    console.log(`url: ${url}`);
    console.log(`soapAction: ${soapAction}`);
  
  
    console.log(`Status: ${response.status()}`);
    console.log('Headers:', response.headers());
    console.log('Body:', await response.text());
    const text = await response.text();
    console.log(`Response Status:${response.status()}`);
  
    expect(`${response.status()}`).toBe("200");
  
    const esignurlstartpos = text.indexOf("<EsignURL>");
    const esignurlendpos = text.indexOf("</EsignURL");
    console.log(`esignurlstartpos:${esignurlstartpos}`);
    console.log(`esignurlendpos:${esignurlendpos}`);
  
    let esignURL = text.substring(esignurlstartpos + 10,esignurlendpos);
  
    console.log('Body:esignURL', esignURL);
    return esignURL;
  }
  