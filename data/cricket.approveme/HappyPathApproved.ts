import {FetchSSN} from "playwright-qe-core/dist/utils/fetchSSN";

class HappyPathApproved {

    private approvedDatasetFull = {
        nameFirst:      'Preapproved',
        nameLast:       'RiskLow',
        DOB:            '09131984',
        SSN: new FetchSSN(5).getRandomSSN(),
        email:          '005@test.com',
        phone:          '8018315555',
        streetAddress1: '256 W Data Dr',
        streetAddress2: 'Ste 105',
        city:           'Draper',
        stateAbbrev:    'UT',
        zip:            '84020',
        yearsAddress:        '5',
        monthsAddress:       '5',
        isRent: true, // else isOwn
        payFrequency:   'string:Monthly',
        lastPayDate:    '04012025',
        nextPayDate:    '05012025',
        routingNumber:  '000000000',
        accountNumber:  123765098,
        yearsOpen:      5,
        monthsOpen:     5,
        isDirectDeposit:  true,
        employerName: 'Thorn Creek Kennel',
        employerPhone: '4357832364',
        employerZip: '84036',
        yearsEmployed: '5',
        monthsEmployed: '5',
        monthlyIncome: '3555',
        paymentCardNumber:   4111111111111111,
    }

    private _startAppData: Array<string> = [
        this.approvedDatasetFull.nameFirst,
        this.approvedDatasetFull.nameLast,
        this.approvedDatasetFull.DOB,
        this.approvedDatasetFull.SSN,
    ];
    get getStartAppData() {
        return this._startAppData;
    }

    private _aboutYou1: Array<string> = [
        this.approvedDatasetFull.email,
        this.approvedDatasetFull.phone,
    ];
    get getAboutYou1() {
        return this._aboutYou1;
    }

    private _aboutYou2: Array<string> = [
        this.approvedDatasetFull.streetAddress1,
        this.approvedDatasetFull.streetAddress2,
        this.approvedDatasetFull.city,
        this.approvedDatasetFull.stateAbbrev,
        this.approvedDatasetFull.zip,
        this.approvedDatasetFull.yearsAddress,
        this.approvedDatasetFull.monthsAddress,
    ];
    get getAboutYou2() {
        return this._aboutYou2;
    }

    private _incomeInfo = [
        this.approvedDatasetFull.monthlyIncome, // already a string
        this.approvedDatasetFull.payFrequency.toString(),
        this.approvedDatasetFull.lastPayDate.toString(),
        this.approvedDatasetFull.nextPayDate.toString(),
    ];
    get getIncomeInfo(): string[] {
        return this._incomeInfo;
    }

    private _incomeHistory = [
        this.approvedDatasetFull.yearsEmployed,
        this.approvedDatasetFull.monthsEmployed,
        this.approvedDatasetFull.monthlyIncome,
    ];
    get getIncomeHistory(): string[] {
        return this._incomeHistory;
    }

    private _employerContactInfo = [
        this.approvedDatasetFull.employerName,
        this.approvedDatasetFull.employerPhone,
        this.approvedDatasetFull.employerZip,
    ];
    get getEmployerContactInfo(): string[] {
        return this._employerContactInfo;
    }

    private _bankInfo1 = [
        this.approvedDatasetFull.routingNumber, // string
        this.approvedDatasetFull.accountNumber.toString(),
        this.approvedDatasetFull.yearsOpen.toString(),
        this.approvedDatasetFull.monthsOpen.toString(),
    ];
    get getBankInfo1() {
        return this._bankInfo1;
    }

    private _payDatesLastAndNext = [
        this.approvedDatasetFull.lastPayDate,
        this.approvedDatasetFull.nextPayDate,
    ];
    get getPayDates() {
        return this._payDatesLastAndNext;
    }

    private _paymentAccountInfo: string[] = [
        this.approvedDatasetFull.routingNumber,
        this.approvedDatasetFull.accountNumber.toString(),
        this.approvedDatasetFull.yearsOpen.toString(),
        this.approvedDatasetFull.monthsOpen.toString(),
    ];
    get getPaymentAccountInfo() {
        return this._paymentAccountInfo;
    }

    get getBankInfo2(): boolean {
        return this.approvedDatasetFull.isDirectDeposit; // true = 'YES'
    }

    get getPaymentCard(): number {
        return this.approvedDatasetFull.paymentCardNumber;
    }

    get getPaymentCardFirstSix(): string {
        let cardNumberLocal = this.getPaymentCard.toString();
        return cardNumberLocal.slice(0,6);
    }

}
export default HappyPathApproved;
