describe('login', function() {
    it('should display Unauthorized error if wrong username and password', function (browser) {
        browser
        .url(browser.launch_url)
        .waitForElementVisible('body', 1000)
        .keys('^(h)')
        .setValue('.username', 'nightwatch')
        .setValue('.password', 'password')
        .click('button.btn')
        .waitForElementVisible('.error', 100)
        .assert.containsText('.error', 'Unauthorized')
        .end();
    });

    it('should display search article view if login is correct', function (browser) {
        browser
        .url(browser.launch_url)
        .waitForElementVisible('body', 1000)
        .keys('^(h)')
        .setValue('.username', 'test')
        .setValue('.password', 'secret')
        .click('button.btn')
        .waitForElementVisible('.navbar.navbar-default', 100)
        .assert.containsText('.navbar.navbar-default .active', 'Article')
        .end();
    });
});
