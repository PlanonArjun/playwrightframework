import {FetchSSN} from "playwright-qe-core/dist/utils/fetchSSN";

class HappyPathPending {

    private pendingDatasetFull = {
        nameFirst: 'Preapproved',
        nameLast: 'RiskMedium',
        DOB: '09131984',
        SSN: new FetchSSN(6).getRandomSSN(),
        email: '006@test.com',
        phone: '8018316666',
        streetAddress1: '256 W Data Dr',
        streetAddress2: 'Ste 105',
        city: 'Draper',
        stateAbbrev: 'UT',
        zip: '84020',
        yrsAtAddress: '6',
        monthsAtAddress: '6',
        isOwn: true,
        iDType: "US Passport",
        number: '123456',
        isFullTime: "Employed Full-Time",
        firstName: 'Preapproved',
        phoneNumber: '8018315555',
        zipCode: '84020',
        yrsEmployed: '6',
        monthsEmployed: '6',
        income: '3555',
        payFrequency: 'string:Monthly',
        lastPayDate: '02012025',
        nextPayDate: '03012025',
        routingNumber: '000000000',
        accountNumber: 123765098,
        yearsOpen: 5,
        monthsOpen: 5,
        isDirectDeposit: true,
        cardNumber: '4653584876987657',
        monthExpiration: '02 - February',
        yearExpiration: '2025',
        cardNameFirst: 'Preapproved',
        cardNameLast: 'RiskMedium'
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
        this.pendingDatasetFull.yrsAtAddress,
        this.pendingDatasetFull.monthsAtAddress,
    ];
    get getAboutYou2() {
        return this._aboutYou2;
    }

    private _idNumber = [
        this.pendingDatasetFull.iDType, // already a string
        this.pendingDatasetFull.number,
    ];
    get getIdNumber(): string[] {
        return this._idNumber;
    }

    get getEmployeeStatus(): string {
        return this.pendingDatasetFull.isFullTime; // true = 'YES'
    }
    private _employeeInfo: Array<string> = [
        this.pendingDatasetFull.firstName,
        this.pendingDatasetFull.phoneNumber,
        this.pendingDatasetFull.zipCode,
    ];

    get getEmployeeInfo() {
        return this._employeeInfo;
    }

    private _employerInfo: Array<string> = [
        this.pendingDatasetFull.yrsEmployed,
        this.pendingDatasetFull.monthsEmployed,
        this.pendingDatasetFull.income,
    ];
    get getEmployerInfo() {
        return this._employerInfo;
    }

    private _incomeInfo = [
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
        return this.pendingDatasetFull.isDirectDeposit; // true = 'YES'
    }

    private _cardPaymentInfo: Array<string> = [
        this.pendingDatasetFull.cardNumber, // string
        this.pendingDatasetFull.monthExpiration,
        this.pendingDatasetFull.yearExpiration,
        this.pendingDatasetFull.cardNameFirst,
        this.pendingDatasetFull.cardNameLast,
    ];

    get getPaymentCard() {
        return this._cardPaymentInfo;
    }

}
export default HappyPathPending;
