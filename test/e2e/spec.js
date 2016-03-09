module.exports = {
    'Nightwatch.js Test' : function (browser) {
        browser
        .url(browser.launch_url)
        .waitForElementVisible('body', 1000)
        .setValue('.username', 'nightwatch')
        .setValue('.password', 'password')
        .click('button')
        .waitForElementVisible('.error', 100)
        .assert.containsText('.error', 'Unauthorized')
        .end();
    }
};
