class LocationData {

    private dataset = {

        /* city */
        NEW_YORK_CITY: 'New York',
        CHICAGO_CITY: 'Chicago'

        /* Zipcode */

    }

    private _newYorkCityName: string = this.dataset.NEW_YORK_CITY

    private _chicagoCityName: string = this.dataset.CHICAGO_CITY

    get getNewYorkCityName() {
        return this._newYorkCityName;
    }

    get getChicagoCityName() {
        return this._chicagoCityName;
    }

}

export default LocationData;