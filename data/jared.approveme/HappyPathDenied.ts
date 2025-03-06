import {FetchSSN} from "playwright-qe-core/dist/utils/fetchSSN";

class HappyPathDenied {

    private deniedDatasetFull = {
        nameFirst: 'Preapproved',
        nameLast: 'RiskHigh',
        DOB: '09131984',
        SSN: new FetchSSN(7).getRandomSSN(),
        email: '007@test.com',
        phone: '8018317777',
        streetAddress1: '256 W Data Dr',
        streetAddress2: 'Ste 105',
        city: 'Draper',
        stateAbbrev: 'UT',
        zip: '84020',
        yrsAtAddress: '7',
        monthsAtAddress: '7',
        isOwn: true,
        iDType: "US Passport",
        number: '123456',
        isFullTime: "Employed Full-Time",
        firstName: 'Preapproved',
        phoneNumber: '8018315555',
        zipCode: '84020',
        yrsEmployed: '7',
        monthsEmployed: '7',
        income: '3555',
        payFrequency: 'string:Monthly',
        lastPayDate: '03012025',
        nextPayDate: '04012025',
        routingNumber: '000000000',
        accountNumber: 123765098,
        yearsOpen: 5,
        monthsOpen: 5,
        isDirectDeposit: true,
        cardNumber: '4653584876987657',
        monthExpiration: '12 - December',
        yearExpiration: '2025',
        cardNameFirst: 'Preapproved',
        cardNameLast: 'RiskHigh'
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
        this.deniedDatasetFull.yrsAtAddress,
        this.deniedDatasetFull.monthsAtAddress,
    ];
    get getAboutYou2() {
        return this._aboutYou2;
    }

    private _idNumber = [
        this.deniedDatasetFull.iDType, // already a string
        this.deniedDatasetFull.number,
    ];
    get getIdNumber(): string[] {
        return this._idNumber;
    }

    get getEmployeeStatus(): string {
        return this.deniedDatasetFull.isFullTime; // true = 'YES'
    }

    private _employeeInfo: Array<string> = [
        this.deniedDatasetFull.firstName,
        this.deniedDatasetFull.phoneNumber,
        this.deniedDatasetFull.zipCode,
    ];
    get getEmployeeInfo() {
        return this._employeeInfo;
    }

    private _employerInfo: Array<string> = [
        this.deniedDatasetFull.yrsEmployed,
        this.deniedDatasetFull.monthsEmployed,
        this.deniedDatasetFull.income,
    ];
    get getEmployerInfo() {
        return this._employerInfo;
    }

    private _incomeInfo = [
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
        return this.deniedDatasetFull.isDirectDeposit; // true = 'YES'
    }

    private _cardPaymentInfo: Array<string> = [
        this.deniedDatasetFull.cardNumber, // string
        this.deniedDatasetFull.monthExpiration,
        this.deniedDatasetFull.yearExpiration,
        this.deniedDatasetFull.cardNameFirst,
        this.deniedDatasetFull.cardNameLast,
    ];

    get getPaymentCard() {
        return this._cardPaymentInfo;
    }

}
export default HappyPathDenied;
