import { IAddressInformation } from '$pages/address-info-page';
import { IContactInformation } from '$pages/contact-info-page';
import { IPersonalInformation } from '$pages/personal-info-page';
import { ICustomerLeaseApplication } from '$utils/lease-application-builder';
import { getRandomSSN } from '$utils/random-ssn';
import { expect } from '@playwright/test';

export async function prefillAndValidate(
  { buildLease, reviewApplicationPage },
  customer: ICustomerLeaseApplication
) {
  await buildLease.prefillBuildLeaseToReview(customer);
  expect(await reviewApplicationPage.reviewPhone.textContent()).toMatch(
    customer.contactInformation.phoneNumber
  );
  expect(await reviewApplicationPage.reviewEmail.textContent()).toMatch(
    customer.contactInformation.emailAddress
  );
  expect(await reviewApplicationPage.reviewName.textContent()).toMatch(
    `${customer.personalInformation.firstName} ${customer.personalInformation.lastName}`
  );
  expect(await reviewApplicationPage.reviewAddress.textContent()).toContain(
    `${customer.addressInformation.address1} ${customer.addressInformation.address2}`
  );
  expect(await reviewApplicationPage.reviewLocation.textContent()).toMatch(
    `${customer.addressInformation.city}, ${customer.addressInformation.state} ${customer.addressInformation.zip}`
  );
}

export async function updateAndValidateContact(
  { buildLease, reviewApplicationPage },
  customer
) {
  await buildLease.prefillBuildLeaseToReview(customer);

  const updatedContactInfo: IContactInformation = {
    phoneNumber: '8013214321',
    emailAddress: 'update@test.com',
  };
  await reviewApplicationPage.updateContactInfo.click();
  await buildLease.contactInfoPage.enterContactInformationContinue(
    updatedContactInfo
  );
  expect(
    (await reviewApplicationPage.reviewPhone.textContent()).replace(/\D/g, '')
  ).toMatch(updatedContactInfo.phoneNumber);
  expect(await reviewApplicationPage.reviewEmail.textContent()).toMatch(
    updatedContactInfo.emailAddress
  );
}

export async function updateAndValidatePersonal({
  buildLease,
  reviewApplicationPage,
}) {
  const updatedPersonalInfo: IPersonalInformation = {
    firstName: 'Updated',
    lastName: 'Name',
    dob: '11121990',
    ssn: `5${getRandomSSN()}`,
  };
  await reviewApplicationPage.updatePersonalInfo.click();
  await buildLease.personalInfoPage.enterPersonalInformationContinue(
    updatedPersonalInfo
  );
  expect(await reviewApplicationPage.reviewName.textContent()).toMatch(
    `${updatedPersonalInfo.firstName} ${updatedPersonalInfo.lastName}`
  );
  expect(
    (await reviewApplicationPage.reviewDOB.textContent()).replace(/\//g, '')
  ).toMatch(updatedPersonalInfo.dob);
}

export async function updateAndValidateAddress({
  buildLease,
  reviewApplicationPage,
}) {
  const updatedAddressInfo: IAddressInformation = {
    address1: '321 update st',
    address2: '#2',
    city: 'LA',
    state: 'CA',
    zip: '90210',
  };
  await reviewApplicationPage.updateHomeAddress.click();
  await buildLease.navPage.waitForValidation();
  await buildLease.addressInfoPage.enterAddressInformationContinue(
    updatedAddressInfo
  );
  expect(await reviewApplicationPage.reviewAddress.textContent()).toMatch(
    `${updatedAddressInfo.address1} ${updatedAddressInfo.address2}`
  );
  expect(await reviewApplicationPage.reviewLocation.textContent()).toMatch(
    `${updatedAddressInfo.city}, ${updatedAddressInfo.state} ${updatedAddressInfo.zip}`
  );
}

export async function useBackUpdateAndValidateCard({
  buildLease,
  reviewApplicationPage,
}) {
  await buildLease.navPage.goBack();
  await buildLease.navPage.goBack();
  await buildLease.cardInfoPage.firstNameInput.fill('A Test');
  await buildLease.navPage.continueForm('Card Information');
  await buildLease.navPage.clickContinue();
  expect(await reviewApplicationPage.reviewCCName.textContent()).toContain(
    'A Test'
  );
}
