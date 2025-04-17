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
};
