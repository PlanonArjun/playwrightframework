class FeaturedRetailerData {

    private dataset = {

        /* featured retailers */
        retailer1: 'Best Buy',
        retailer2: 'Amazon',
        retailer3: 'Walmart'

    }

    private _featuredRetailers: Array<string> = [
        this.dataset.retailer1,
        this.dataset.retailer2,
        this.dataset.retailer3
    ];

    private _bestBuy: string = this.dataset.retailer1

    get getFeaturedRetailers() {
        return this._featuredRetailers;
    }

    get getBestBuy() {
        return this._bestBuy;
    }

    private _amazon: string = this.dataset.retailer2

    get getAmazon() {
        return this._amazon;
    }

}

export default FeaturedRetailerData;