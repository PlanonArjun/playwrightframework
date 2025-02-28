import { daysFromNow } from "$utils/progConnect.utils/date-helper";
import { ICustomerLeaseApplication } from "$utils/progConnect.utils/lease-application-builder";
import { LEASE_STATUS } from "$utils/progConnect.utils/lease-status";
import { getRandomSSN } from "$utils/progConnect.utils/random-ssn";
import { IStateZip } from "$utils/progConnect.utils/state-lists";

// let customerState = 'CO';
// let customerZip = '81658';
// let customerState = 'OR';
// let customerZip = '97015';
let state: IStateZip = { state: 'UT', zip: '84070' };
export function setCustomerState(stateZip: IStateZip) {
  state = stateZip;
}

export function getCustomerState() {
  return state;
}

const nonDeliveryStates = [
  'CA',
  'CO',
  'CT',
  'HI',
  'IA',
  'ME',
  'MI',
  'NE',
  'NY',
  'OH',
  'PA',
  'SC',
];

export function isNonDeliveryState() {
  return nonDeliveryStates.includes(getCustomerState().state);
}

export class DefaultObjectBuilder {
  ssnLeadNumber;
  ssn;
  ssnLastFour;
  phone;
  leaseApplication: ICustomerLeaseApplication;

  constructor(leaseResponse: LEASE_STATUS = LEASE_STATUS.APPROVED) {
    this.ssnLeadNumber =
      leaseResponse == LEASE_STATUS.APPROVED
        ? '5'
        : leaseResponse == LEASE_STATUS.DENIED
        ? '7'
        : leaseResponse == LEASE_STATUS.PENDING
        ? '6'
        : '1';

    this.ssn = `${this.ssnLeadNumber}${getRandomSSN()}`;

    this.phone = '8012221313';
    this.leaseApplication = {
      contactInformation: {
        emailAddress: 'playwright@test.com',
        phoneNumber: `${this.phone}`,
      },
      personalInformation: {
        firstName: 'Test',
        lastName: 'User',
        dob: '02021980',
        ssn: `${this.ssn}`,
      },
      addressInformation: {
        address1: '123 Test ave.',
        address2: '2',
        city: 'SLC',
        state: `${state.state}`,
        zip: `${state.zip}`,
      },
      incomeInformation: {
        monthlyIncome: '3500',
        lastPayDate: daysFromNow(0),
        nextPayDate: daysFromNow(30),
        payFrequency: 'Monthly',
      },
      cardInformation: {
        firstName: 'Approved',
        lastName: 'User',
        cardNumber: '4012000077777777',
        expirationDate: '12/25',
        cvv: '222',
      },
      bankInformation: {
        routingNumber: '324079555',
        checkingNumber: '123123',
      },
    };
  }
}
