import {FetchSSN} from "playwright-qe-core/dist/utils/fetchSSN";

class HappyPathDenied {

    private deniedDatasetFull = {
        nameFirst:      'Preapproved',
        nameLast:       'RiskHigh',
        DOB:            '10101985',
        SSN: new FetchSSN(7).getRandomSSN(),
        email:          '007@test.com',
        phone:          '5305457777',
        streetAddress1: '401 W Miner St',
        streetAddress2: '',
        city:           'Yreka',
        stateAbbrev:    'CA',
        zip:            '96097',
        monthlyIncome:  '3777',
        yearsAddress:        '7',
        monthsAddress:       '7',
        // payFrequency:   'string:Weekly',
        // payFrequency:   'string:BiWeekly',
        // payFrequency:   'string:SemiMonthly',
        payFrequency:   'string:Monthly',
        lastPayDate:    '03012025',
        nextPayDate:    '04012025',
        routingNumber:  '000000000',
        accountNumber:  123765098,
        yearsOpen:      7,
        monthsOpen:     6,
        directDeposit:  true,
        cardFirstSix:   4111111,
        employerName: 'Thorn Creek Kennel',
        employerPhone: '4357832364',
        employerZip: '84036',
        yearsEmployed: '7',
        monthsEmployed: '7',
    }

    private _startAppData: Array<string> = [
        this.deniedDatasetFull.nameFirst,
        this.deniedDatasetFull.nameLast,
        this.deniedDatasetFull.DOB,
        this.deniedDatasetFull.SSN,
    ];
    get getStartAppData() {
        return this._startAppData;
    }

    private _aboutYou1: Array<string> = [
        this.deniedDatasetFull.email,
        this.deniedDatasetFull.phone,
    ];
    get getAboutYou1() {
        return this._aboutYou1;
    }

    private _aboutYou2: Array<string> = [
        this.deniedDatasetFull.streetAddress1,
        this.deniedDatasetFull.streetAddress2,
        this.deniedDatasetFull.city,
        this.deniedDatasetFull.stateAbbrev,
        this.deniedDatasetFull.zip,
        this.deniedDatasetFull.yearsAddress,
        this.deniedDatasetFull.monthsAddress,
    ];
    get getAboutYou2() {
        return this._aboutYou2;
    }

    private _incomeInfo = [
        this.deniedDatasetFull.monthlyIncome, // already a string
        this.deniedDatasetFull.payFrequency.toString(),
        this.deniedDatasetFull.lastPayDate.toString(),
        this.deniedDatasetFull.nextPayDate.toString(),
    ];
    get getIncomeInfo(): string[] {
        return this._incomeInfo;
    }

    private _bankInfo1 = [
        this.deniedDatasetFull.routingNumber, // string
        this.deniedDatasetFull.accountNumber.toString(), // number
        this.deniedDatasetFull.yearsOpen.toString(),     // number
        this.deniedDatasetFull.monthsOpen.toString(),    // number
    ];
    get getBankInfo1() {
        return this._bankInfo1;
    }

    get getBankInfo2(): boolean {
        return this.deniedDatasetFull.directDeposit; // true = 'YES'
    }

    get getPaymentCard(): number {
        return this.deniedDatasetFull.cardFirstSix;
    }

    private _employerContactInfo = [
        this.deniedDatasetFull.employerName,
        this.deniedDatasetFull.employerPhone,
        this.deniedDatasetFull.employerZip,
    ];
    get getEmployerContactInfo(): string[] {
        return this._employerContactInfo;
    }

    private _incomeHistory = [
        this.deniedDatasetFull.yearsEmployed, // already a string
        this.deniedDatasetFull.monthsEmployed, // already a string
        this.deniedDatasetFull.monthlyIncome, // already a string
    ];
    get getIncomeHistory(): string[] {
        return this._incomeHistory;
    }

    private _payDatesLastAndNext = [
        this.deniedDatasetFull.lastPayDate,
        this.deniedDatasetFull.nextPayDate,
    ];
    get getPayDates() {
        return this._payDatesLastAndNext;
    }

    private _paymentAccountInfo: string[] = [
        this.deniedDatasetFull.routingNumber,
        this.deniedDatasetFull.accountNumber.toString(),
        this.deniedDatasetFull.yearsOpen.toString(),
        this.deniedDatasetFull.monthsOpen.toString(),
    ];
    get getPaymentAccountInfo() {
        return this._paymentAccountInfo;
    }

}
export default HappyPathDenied;
