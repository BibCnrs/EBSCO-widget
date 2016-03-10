describe('login', function() {

    beforeEach(function (done) {
        browser
        .loadState(defaultState);

        client.start(done);
    });

    it('should display Unauthorized error if wrong username and password', function (done) {
        browser
        .setValue('.username', 'nightwatch')
        .setValue('.password', 'password')
        .click('button.btn')
        .waitForElementVisible('.error', 100)
        .assert.containsText('.error', 'Unauthorized');
        client.start(done);
    });

    it('should display search article view if login is correct', function (done) {
        browser
        .clearValue('.username')
        .setValue('.username', 'test')
        .clearValue('.password')
        .setValue('.password', 'secret')
        .click('button.btn')
        .waitForElementVisible('.navbar.navbar-default', 100)
        .assert.containsText('.navbar.navbar-default .active', 'Article');
        client.start(done);
    });
});
