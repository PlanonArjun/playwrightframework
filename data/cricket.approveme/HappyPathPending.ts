import {FetchSSN} from "playwright-qe-core/dist/utils/fetchSSN";
import { daysFromNow } from "$utils/progConnect.utils/date-helper";

class HappyPathPending {

    private pendingDatasetFull = {
        nameFirst:      'Preapproved',
        nameLast:       'RiskMedium',
        DOB:            '10101985',
        SSN: new FetchSSN(6).getRandomSSN(),
        email:          '006@test.com',
        phone:          '5305456666',
        streetAddress1: '401 W Miner St',
        streetAddress2: '',
        city:           'Yreka',
        stateAbbrev:    'CA',
        zip:            '96097',
        monthlyIncome:  '3666',
        yearsAddress:        '6',
        monthsAddress:       '6',
        // payFrequency:   'string:Weekly',
        // payFrequency:   'string:BiWeekly',
        // payFrequency:   'string:SemiMonthly',
        payFrequency:   'string:Monthly',
        lastPayDate: daysFromNow(0),
        nextPayDate: daysFromNow(30),
        routingNumber:  '000000000',
        accountNumber:  123765098,
        yearsOpen:      6,
        monthsOpen:     6,
        directDeposit:  true,
        paymentCardNumber:   4111111111111111,
        employerName: 'Thorn Creek Kennel',
        employerPhone: '4357832364',
        employerZip: '84036',
        yearsEmployed: '6',
        monthsEmployed: '6',
    }

    private _startAppData: Array<string> = [
        this.pendingDatasetFull.nameFirst,
        this.pendingDatasetFull.nameLast,
        this.pendingDatasetFull.DOB,
        this.pendingDatasetFull.SSN,
    ];
    get getStartAppData() {
        return this._startAppData;
    }

    private _aboutYou1: Array<string> = [
        this.pendingDatasetFull.email,
        this.pendingDatasetFull.phone,
    ];
    get getAboutYou1() {
        return this._aboutYou1;
    }

    private _aboutYou2: Array<string> = [
        this.pendingDatasetFull.streetAddress1,
        this.pendingDatasetFull.streetAddress2,
        this.pendingDatasetFull.city,
        this.pendingDatasetFull.stateAbbrev,
        this.pendingDatasetFull.zip,
        this.pendingDatasetFull.yearsAddress,
        this.pendingDatasetFull.monthsAddress,
    ];
    get getAboutYou2() {
        return this._aboutYou2;
    }

    private _incomeInfo = [
        this.pendingDatasetFull.monthlyIncome, // already a string
        this.pendingDatasetFull.payFrequency.toString(),
        this.pendingDatasetFull.lastPayDate.toString(),
        this.pendingDatasetFull.nextPayDate.toString(),
    ];
    get getIncomeInfo(): string[] {
        return this._incomeInfo;
    }

    private _bankInfo1 = [
        this.pendingDatasetFull.routingNumber, // string
        this.pendingDatasetFull.accountNumber.toString(), // number
        this.pendingDatasetFull.yearsOpen.toString(),     // number
        this.pendingDatasetFull.monthsOpen.toString(),    // number
    ];
    get getBankInfo1() {
        return this._bankInfo1;
    }

    get getBankInfo2(): boolean {
        return this.pendingDatasetFull.directDeposit; // true = 'YES'
    }

    get getPaymentCard(): number {
        return this.pendingDatasetFull.paymentCardNumber;
    }

    get getPaymentCardFirstSix(): string {
        let cardNumberLocal = this.getPaymentCard.toString();
        return cardNumberLocal.slice(0,6);
    }

    private _employerContactInfo = [
        this.pendingDatasetFull.employerName,
        this.pendingDatasetFull.employerPhone,
        this.pendingDatasetFull.employerZip,
    ];
    get getEmployerContactInfo(): string[] {
        return this._employerContactInfo;
    }

    private _incomeHistory = [
        this.pendingDatasetFull.yearsEmployed, // already a string
        this.pendingDatasetFull.monthsEmployed, // already a string
        this.pendingDatasetFull.monthlyIncome, // already a string
    ];
    get getIncomeHistory(): string[] {
        return this._incomeHistory;
    }

    private _payDatesLastAndNext = [
        this.pendingDatasetFull.lastPayDate,
        this.pendingDatasetFull.nextPayDate,
    ];
    get getPayDates() {
        return this._payDatesLastAndNext;
    }

    private _paymentAccountInfo: string[] = [
        this.pendingDatasetFull.routingNumber,
        this.pendingDatasetFull.accountNumber.toString(),
        this.pendingDatasetFull.yearsOpen.toString(),
        this.pendingDatasetFull.monthsOpen.toString(),
    ];
    get getPaymentAccountInfo() {
        return this._paymentAccountInfo;
    }

}
export default HappyPathPending;
