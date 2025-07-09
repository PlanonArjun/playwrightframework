class LocationData {

    private dataset = {

        /* city */
        NEW_YORK_CITY: 'New York'

        /* Zipcode */
        
    }

    private _newYorkCityName: string = this.dataset.NEW_YORK_CITY

    get getNewYorkCityName() {
        return this._newYorkCityName;
    }

}

export default LocationData;