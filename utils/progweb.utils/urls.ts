// urls.ts
// let base: string = 'https://slc-qaswebapp11.stormwind.local'
// let base: string = 'https://slc-qaswebapp01.stormwind.local'
let base: string = 'https://slc-rcpwebpws.stormwind.local'
export default {
    base: {
        base: base,
    },
    myaccount: {
        myaccount: base + '/myaccount/',
    },
    storelocation: {
        storelocation: base + '/myaccount/find-store/location',
    },
    locatorBestBuyTestStore: {
        locatorBestBuyTestStore: base + '/myaccount/find-store?lat=40.5584836&lng=-112.0178286',
    }
};
