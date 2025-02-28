export interface IStateZip {
  state: string;
  zip: string;
}
export const nonLeaseStates: Array<IStateZip> = [
  { state: 'MN', zip: '55029' },
  { state: 'NJ', zip: '07533' },
  { state: 'VT', zip: '05009' },
  { state: 'WI', zip: '53031' },
  { state: 'WV', zip: '24701' },
  { state: 'WY', zip: '82073' },
];

export const leaseStates: Array<IStateZip> = [
  { state: 'AK', zip: '99540' },
  { state: 'AL', zip: '35013' },
  { state: 'AR', zip: '71657' },
  { state: 'AZ', zip: '85063' },
  { state: 'CA', zip: '90210' },
  { state: 'CO', zip: '81658' },
  { state: 'CT', zip: '06034' },
  { state: 'DC', zip: '20001' },
  { state: 'DE', zip: '19701' },
  { state: 'FL', zip: '32004' },
  { state: 'GA', zip: '30004' },
  { state: 'HI', zip: '96701' },
  { state: 'IA', zip: '50001' },
  { state: 'ID', zip: '83720' },
  { state: 'IL', zip: '60601' },
  { state: 'IN', zip: '46001' },
  { state: 'KS', zip: '66002' },
  { state: 'KY', zip: '40031' },
  { state: 'LA', zip: '70001' },
  { state: 'MA', zip: '02116' },
  { state: 'MD', zip: '21201' },
  { state: 'ME', zip: '04038' },
  { state: 'MI', zip: '48002' },
  { state: 'MO', zip: '63002' },
  { state: 'MS', zip: '38655' },
  { state: 'MT', zip: '59401' },
  { state: 'NC', zip: '28092' },
  { state: 'ND', zip: '58078' },
  { state: 'NE', zip: '68005' },
  { state: 'NH', zip: '03103' },
  { state: 'NM', zip: '87501' },
  { state: 'NV', zip: '89012' },
  { state: 'NY', zip: '10002' },
  { state: 'OH', zip: '44106' },
  { state: 'OK', zip: '74012' },
  { state: 'OR', zip: '97015' },
  { state: 'PA', zip: '15010' },
  { state: 'RI', zip: '02840' },
  { state: 'SC', zip: '29102' },
  { state: 'SD', zip: '57069' },
  { state: 'TN', zip: '37013' },
  { state: 'TX', zip: '75001' },
  { state: 'UT', zip: '84070' },
  { state: 'VA', zip: '22201' },
  { state: 'WA', zip: '98104' },
];

export const nonTaxStates: Array<IStateZip> = [
  { state: 'DE', zip: '19701' },
  { state: 'MT', zip: '59401' },
  { state: 'NH', zip: '03103' },
  { state: 'OR', zip: '97015' },
];

export const rateCapStates: Array<IStateZip> = [
  { state: 'CA', zip: '90210' },
  { state: 'CO', zip: '81658' },
  { state: 'CT', zip: '06034' },
  { state: 'HI', zip: '96701' },
  { state: 'IA', zip: '50001' },
  { state: 'ME', zip: '04038' },
  { state: 'MI', zip: '48002' },
  { state: 'NE', zip: '68005' },
  { state: 'NY', zip: '10002' },
  { state: 'OH', zip: '44106' },
  { state: 'PA', zip: '15010' },
  { state: 'SC', zip: '29102' },
];

export const businessShortList: Array<IStateZip> = [
  { state: 'AK', zip: '99540' },
  { state: 'DE', zip: '19701' },
  { state: 'CO', zip: '81658' },
];

export const stateQuickList: Array<IStateZip> = [
  { state: 'AK', zip: '99540' },
  { state: 'DE', zip: '19701' },
  { state: 'CO', zip: '81658' },
  { state: 'NJ', zip: '07533' },
];
