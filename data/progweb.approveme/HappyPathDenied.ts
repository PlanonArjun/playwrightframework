
class HappyPathDenied {

    private deniedDatasetFull = {
        userEmail: 'ccm.dev@progleasing.com',
        userPassword: 'January2025!',
        nameFirst: 'Predenied',
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
        firstName: 'Predenied',
        phoneNumber: '8018315555',
        zipCode: '84020',
        yrsEmployed: '5',
        monthsEmployed: '5',
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
        monthExpiration: '02 - February',
        yearExpiration: '2025',
        cardNameFirst: 'Predenied',
        cardNameLast: 'RiskLow',
        expirationDate: '0225',
    }
    private _loginData: Array<string> = [
        this.deniedDatasetFull.userEmail,
        this.deniedDatasetFull.userPassword,
    ];
    get getLoginData() {
        return this._loginData;
    }

    private _shopDetails: Array<string> = [
        this.deniedDatasetFull.zip,
        //this.deniedDatasetFull.userPassword,
    ];
    get getShopDetails() {
        return this._shopDetails;
    }

    private _homeAddress: Array<string> = [
        this.deniedDatasetFull.streetAddress1,
        this.deniedDatasetFull.streetAddress2,
        this.deniedDatasetFull.city,
        this.deniedDatasetFull.zip,
    ];
    get getHomeAddress() {
        return this._homeAddress;
    }
    private _incomeInfo: Array<string> = [
        this.deniedDatasetFull.income,
    ];
    get getIncomeInfo() {
        return this._incomeInfo;
    }

    private _creditCardDetails: Array<string> = [
        this.deniedDatasetFull.cardNumber,
        this.deniedDatasetFull.expirationDate,
    ];
    get getCreditCardDetails() {
        return this._creditCardDetails;
    }

    
    private _bankingDetails: Array<string> = [
        this.deniedDatasetFull.routingNumber,
        this.deniedDatasetFull.accountNumber.toString(),
    ];
    get getBankingDetails() {
        return this._bankingDetails;
    }


}
export default HappyPathDenied;
