import {FetchSSN} from "playwright-qe-core/dist/utils/fetchSSN";
import { daysFromNow } from "$utils/progConnect.utils/date-helper";

class HappyPathApproved {

    private approvedDatasetFull = {
        /* C_StartAppPage */
        nameFirst: 'Preapproved',
        nameLast: 'RiskLow',
        DOB: '09131984',
        SSN: new FetchSSN(5).getRandomSSN(),
        SSNLastFour: '3547',
        /* D_AboutYou1Page */
        email: '005@test.com',
        phone: '8018315555',
        /* E_AboutYou2Page */
        streetAddress1: '256 W Data Dr',
        streetAddress2: 'Ste 105',
        city: 'Draper',
        stateAbbrev: 'Utah',
        zip: '84020',
        /* F_IncomeInfoPage */
        monthlyIncome: '3555',
        // payFrequency:   'string:Weekly',
        // payFrequency:   'string:BiWeekly',
        // payFrequency:   'string:SemiMonthly',
        payFrequency: 'Monthly',
        lastPayDate: daysFromNow(0),
        nextPayDate: daysFromNow(30),
        /* G_BankInfo1Page */
        routingNumber: '000000000',
        accountNumber: 123765098,
        yearsOpen: 5,
        monthsOpen: 5,
        /* H_BankInfo2Page */
        isDirectDeposit: true,
        /* I_PaymentCardPage */
        creditCardNumber: '4653584876987657',
        creditCardMonth: '12 - December',
        creditCardYear: '2025',

        // assume default checked Same as home address
        /* J_ConfirmSubmit */
        // no further data required in the flow
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
        this.approvedDatasetFull.phone,
        this.approvedDatasetFull.email,
    ];

    get getAboutYou1() {
        return this._aboutYou1;
    }

    private _homeAddress: Array<string> = [
        this.approvedDatasetFull.streetAddress1,
        this.approvedDatasetFull.streetAddress2,
        this.approvedDatasetFull.city,
        this.approvedDatasetFull.stateAbbrev,
        this.approvedDatasetFull.zip,
    ];

    get getHomeAddress() {
        return this._homeAddress;
    }

    private _incomeInfo = [
        this.approvedDatasetFull.payFrequency.toString(),
        this.approvedDatasetFull.lastPayDate.toString(),
        this.approvedDatasetFull.nextPayDate.toString(),
        this.approvedDatasetFull.monthlyIncome, // already a string
    ];

    get getIncomeInfo(): string[] {
        return this._incomeInfo;
    }

    private _creditCardInfo = [
        this.approvedDatasetFull.creditCardNumber,
        this.approvedDatasetFull.creditCardMonth,
        this.approvedDatasetFull.creditCardYear,
        this.approvedDatasetFull.nameFirst,
        this.approvedDatasetFull.nameLast,

    ];
    get getCreditCardInfo() {
        return this._creditCardInfo
    }

    private _resumeData = [
        this.approvedDatasetFull.SSNLastFour.toString(),
        this.approvedDatasetFull.phone.toString(),
    ];

    get getResumeData(): string[] {
        return this._resumeData;
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

    private _paymentEstimate = [
        this.approvedDatasetFull.monthlyIncome, // string
        this.approvedDatasetFull.payFrequency, // number

    ];

    get getPaymentEstimate() {
        return this._paymentEstimate;
    }

    get getBankInfo2(): boolean {
        return this.approvedDatasetFull.isDirectDeposit; // true = 'YES'
    }

}
export default HappyPathApproved;
