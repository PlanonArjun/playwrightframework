
class HappyPathPending {

    private pendingDatasetFull = {
        userEmail: 'CartContractServicingTech@progleasing.com',
        userPassword: 'AppleTree@2024',
        nameFirst: 'Preapproved',
        nameLast: 'RiskMedium',
        DOB: '09131984',
        email: '006@test.com',
        phone: '8018315555',
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
        phoneNumber: '8018316666',
        zipCode: '84020',
        yrsEmployed: '6',
        monthsEmployed: '6',
        income: '3666',
        payFrequency: 'string:Monthly',
        lastPayDate: '04012025',
        nextPayDate: '05012025',
        routingNumber: '000000000',
        accountNumber: 123765098,
        yearsOpen: 6,
        monthsOpen: 6,
        isDirectDeposit: true,
        cardNumber: '4653584876987657',
        monthExpiration: '12 - December',
        yearExpiration: '2025',
        cardNameFirst: 'Preapproved',
        cardNameLast: 'RiskMedium',
        expirationDate: '1225',
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
