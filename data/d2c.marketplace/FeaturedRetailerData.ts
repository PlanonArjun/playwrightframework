class FeaturedRetailerData {

    private dataset = {

        /* featured retailers */
        retailer1: 'Best Buy',
        retailer2: 'Amazon',
        retailer3: 'Walmart',
        retailer4: 'Mattress Firm',
        retailer5: 'Zales'

    }

    private _featuredRetailers: Array<string> = [
        this.dataset.retailer1,
        this.dataset.retailer2,
        this.dataset.retailer3,
        this.dataset.retailer4,
        this.dataset.retailer5
    ];

    get getFeaturedRetailers() {
        return this._featuredRetailers;
    }

}

export default FeaturedRetailerData;