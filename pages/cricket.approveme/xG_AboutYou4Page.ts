// cricket approve me
import { type Page, type Locator , expect } from '@playwright/test';

export enum IDType {
    DL = 'string:DriversLicense',
    Military = 'string:MilitaryID',
    Passport = 'string:Passport',
    Alien = 'string:ResidentAlienCard',
    State = 'string:StateIDCard',
}

class XG_AboutYou4Page {
    readonly page: Page;
    readonly type: IDType;
    readonly menuIDType: Locator;
    readonly fieldIDNumber: Locator;
    readonly menuStateIssued: Locator;
    readonly buttonNEXT: Locator;
    readonly buttonEXIT: Locator;
    readonly buttonEXITConfirm: Locator;

    constructor(page: Page, iDType: IDType) {
        this.page = page;
        this.type = iDType;
        this.menuIDType = page.getByLabel('Type of photo ID:');
        this.fieldIDNumber = page.locator('#Identification_Number');
        this.menuStateIssued = page.getByLabel('State issued:');
        this.buttonNEXT = page.getByRole('button', { name: 'Next' });
        this.buttonEXIT = page.getByRole('button', { name: 'Exit' });
        this.buttonEXITConfirm = page.locator('div').filter({ hasText: /^Exit$/ }).getByRole('button');
    }

    async selectIDType()  {
        switch (this.type) {
            case IDType.Alien: {
                await this.page.getByLabel('Type of photo ID:').selectOption('string:ResidentAlienCard');
                break;
            }
            case IDType.DL: {
                await this.page.getByLabel('Type of photo ID:').selectOption('string:DriversLicense');
                break;
            }
            case IDType.Military: {
                await this.page.getByLabel('Type of photo ID:').selectOption('string:MilitaryID');
                break;
            }
            case IDType.Passport: {
                await this.page.getByLabel('Type of photo ID:').selectOption('string:Passport');
                break;
            }
            case IDType.State: {
                await this.page.getByLabel('Type of photo ID:').selectOption('string:StateIDCard');
                break;
            }
        }
    }

    async enterIDNumber(id: string) {
        await this.fieldIDNumber.click();
        await this.fieldIDNumber.clear();
        await this.fieldIDNumber.fill(id);
    }

    async selectStateIssued(twoLetterState: string) {
        if(this.type==IDType.Military || this.type==IDType.Passport || this.type==IDType.Alien) {
            return;
        }
        let base: string = "string:";
        let selection: string = base.concat(twoLetterState);
        await this.menuStateIssued.selectOption(selection);
        await this.page.waitForTimeout(1000);
    }

    async NEXT() {
        await this.buttonNEXT.click();
        await this.page.waitForTimeout(1000);
    }

    async EXIT() {
        await this.buttonEXIT.click();
        await this.buttonEXITConfirm.click();
    }

}
export default XG_AboutYou4Page;