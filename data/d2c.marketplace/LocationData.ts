class LocationData {

    private dataset = {

        /* city */
        NEW_YORK_CITY: 'New York',
        CHICAGO_CITY: 'Chicago',

        /* Zipcode */
        NEW_YORK_ZIPCODE: '10006',
        CHICAGO_ZIPCODE: '60007 '

    }

    private _newYorkCityName: string = this.dataset.NEW_YORK_CITY

    private _chicagoCityName: string = this.dataset.CHICAGO_CITY

    private _newYorkZipcode: string = this.dataset.NEW_YORK_ZIPCODE

    private _chicagoZipcode: string = this.dataset.CHICAGO_ZIPCODE

    get getNewYorkCityName() {
        return this._newYorkCityName;
    }

    get getChicagoCityName() {
        return this._chicagoCityName;
    }

    get getNewYorkZipcode() {
        return this._newYorkZipcode;
    }

    get getChicagoZipcode() {
        return this._chicagoZipcode;
    }

}

export default LocationData;