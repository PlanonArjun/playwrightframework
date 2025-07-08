class GlobalHeaders_ShopAll {

    private dataset = {

        /* shop categories items */
        item1: 'Electronics',
        item2: 'Cell Phones',
        item3: 'Appliances',
        item4: 'Computers',
        item5: 'Jewelry',
        item6: 'Furniture',
        item7: 'Wheels, Tires, & Auto',
        item8: 'Fitness & Sporting Goods',
        item9: 'Home Improvement & Outdoor Living',
        item10: 'Musical Instruments'
    }

    private _shopCategoriesData: Array<string> = [
        this.dataset.item1,
        this.dataset.item2,
        this.dataset.item3,
        this.dataset.item4,
        this.dataset.item5,
        this.dataset.item6,
        this.dataset.item7,
        this.dataset.item8,
        this.dataset.item9,
        this.dataset.item10,
    ];

    get getShopCategories() {
        return this._shopCategoriesData;
    }

}

export default GlobalHeaders_ShopAll;