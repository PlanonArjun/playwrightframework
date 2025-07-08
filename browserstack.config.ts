const caps = {
    'browserstack.username': process.env.BROWSERSTACK_USERNAME || 'yourBrowserStackUsernameHere ',
    'browserstack.accessKey': process.env.BROWSERSTACK_ACCESS_KEY || 'yourBrowserStackAccessKeyHere',
};
/*
Published best practice is to export your Browserstack credentials
as environment variables. And if you have already done so, this file
itself is technically optional. It could be deleted, and your tests
would continue to run.

Mac users, you'll want to do this in your ~/.zprofile with two lines
like this:

export BROWSERSTACK_USERNAME="whatever"
export BROWSERSTACK_ACCESS_KEY="whatever"

Don't change those variable names. Case-sensitive. Exact match.

Your current username and access key can be found here:

https://www.browserstack.com/accounts/profile/details
 */
