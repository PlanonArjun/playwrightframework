
class HappyPathPending {

    private pendingDatasetFull = {
        userEmail: 'CartContractServicingTech@progleasing.com',
        userPassword: 'AppleTree@2024',
        nameFirst: 'Prepending',
        nameLast: 'RiskLow',
        DOB: '09131984',
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
        firstName: 'Prepending',
        phoneNumber: '8018315555',
        zipCode: '84020',
        yrsEmployed: '5',
        monthsEmployed: '5',
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
        cardNameFirst: 'Prepending',
        cardNameLast: 'RiskLow',
        expirationDate: '0225',
    }
    private _loginData: Array<string> = [
        this.pendingDatasetFull.userEmail,
        this.pendingDatasetFull.userPassword,
    ];
    get getLoginData() {
        return this._loginData;
    }

    private _shopDetails: Array<string> = [
        this.pendingDatasetFull.zip,
        //this.pendingDatasetFull.userPassword,
    ];
    get getShopDetails() {
        return this._shopDetails;
    }

    private _homeAddress: Array<string> = [
        this.pendingDatasetFull.streetAddress1,
        this.pendingDatasetFull.streetAddress2,
        this.pendingDatasetFull.city,
        this.pendingDatasetFull.zip,
    ];
    get getHomeAddress() {
        return this._homeAddress;
    }
    private _incomeInfo: Array<string> = [
        this.pendingDatasetFull.income,
    ];
    get getIncomeInfo() {
        return this._incomeInfo;
    }

    private _creditCardDetails: Array<string> = [
        this.pendingDatasetFull.cardNumber,
        this.pendingDatasetFull.expirationDate,
    ];
    get getCreditCardDetails() {
        return this._creditCardDetails;
    }

    
    private _bankingDetails: Array<string> = [
        this.pendingDatasetFull.routingNumber,
        this.pendingDatasetFull.accountNumber.toString(),
    ];
    get getBankingDetails() {
        return this._bankingDetails;
    }


}
export default HappyPathPending;
