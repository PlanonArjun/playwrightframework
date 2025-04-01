import {FetchSSN} from "playwright-qe-core/dist/utils/fetchSSN";

class HappyPathApproved {

    private approvedDatasetFull = {
        nameFirst: 'Preapproved',
        nameLast: 'RiskLow',
        DOB: '09131984',
        SSN: new FetchSSN(5).getRandomSSN(),
        email: '005@test.com',
        phone: '8018315555',
        streetAddress1: '256 W Data Dr',
        streetAddress2: 'Ste 105',
        city: 'Draper',
        stateAbbrev: 'UT',
        zip: '84020',
        yrsAtAddress: '5',
        monthsAtAddress: '5',
        isOwn: true,
        iDType: "US Passport",
        number: '123456',
        isFullTime: "Employed Full-Time",
        firstName: 'Preapproved',
        phoneNumber: '8018315555',
        zipCode: '84020',
        yrsEmployed: '5',
        monthsEmployed: '5',
        income: '3555',
        payFrequency: 'string:Monthly',
        lastPayDate: '04012025',
        nextPayDate: '05012025',
        routingNumber: '000000000',
        accountNumber: 123765098,
        yearsOpen: 5,
        monthsOpen: 5,
        isDirectDeposit: true,
        cardNumber: '4653584876987657',
        monthExpiration: '12 - December',
        yearExpiration: '2025',
        cardNameFirst: 'Preapproved',
        cardNameLast: 'RiskLow'
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
        this.approvedDatasetFull.yrsAtAddress,
        this.approvedDatasetFull.monthsAtAddress,
    ];
    get getAboutYou2() {
        return this._aboutYou2;
    }

    private _idNumber = [
        this.approvedDatasetFull.iDType, // already a string
        this.approvedDatasetFull.number,
    ];
    get getIdNumber(): string[] {
        return this._idNumber;
    }

    get getEmployeeStatus(): string {
        return this.approvedDatasetFull.isFullTime; // true = 'YES'
    }

    private _employeeInfo: Array<string> = [
        this.approvedDatasetFull.firstName,
        this.approvedDatasetFull.phoneNumber,
        this.approvedDatasetFull.zipCode,
    ];
    get getEmployeeInfo() {
        return this._employeeInfo;
    }

    private _employerInfo: Array<string> = [
        this.approvedDatasetFull.yrsEmployed,
        this.approvedDatasetFull.monthsEmployed,
        this.approvedDatasetFull.income,
    ];
    get getEmployerInfo() {
        return this._employerInfo;
    }

    private _incomeInfo = [
        this.approvedDatasetFull.payFrequency.toString(),
        this.approvedDatasetFull.lastPayDate.toString(),
        this.approvedDatasetFull.nextPayDate.toString(),
    ];

    get getIncomeInfo(): string[] {
        return this._incomeInfo;
    }

    private _bankInfo1 = [
        this.approvedDatasetFull.routingNumber, // string
        this.approvedDatasetFull.accountNumber.toString(), // number
        this.approvedDatasetFull.yearsOpen.toString(),     // number
        this.approvedDatasetFull.monthsOpen.toString(),    // number
    ];
    get getBankInfo1() {
        return this._bankInfo1;
    }

    get getBankInfo2(): boolean {
        return this.approvedDatasetFull.isDirectDeposit; // true = 'YES'
    }

    private _cardPaymentInfo: Array<string> = [
        this.approvedDatasetFull.cardNumber, // string
        this.approvedDatasetFull.monthExpiration,
        this.approvedDatasetFull.yearExpiration,
        this.approvedDatasetFull.cardNameFirst,
        this.approvedDatasetFull.cardNameLast,
    ];

    get getPaymentCard() {
        return this._cardPaymentInfo;
    }

}
export default HappyPathApproved;
