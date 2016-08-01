import initialState from './authenticationModal.json';

describe('authenticationModal', function() {

    beforeEach(function (done) {
        browser
        .pause(1000)
        .loadState(initialState);

        client.start(done);
    });

    // find a way to remember paused action in test env
    it.skip('should trigger pausedAction(go to article) once logged with janus button', function (done) {
        browser
        .waitForElementVisible('.authentication .modal-dialog', 1000)
        .assert.containsText('.navbar.navbar-default .active', 'A à Z')
        .assert.containsText('.janus .panel-title', 'Vous avez un compte Labintel.')
        .assert.containsText('.bibapi .panel-title', 'Vous avez un compte Inist.')
        .click('button.janus')
        .pause(1000)
        .waitForElementVisible('.navbar.navbar-default', 1000)
        .assert.containsText('.navbar.navbar-default .active', 'Article');

        client.start(done);
    });

    it('should trigger pausedAction(go to article) once logged with bibapi account', function (done) {
        browser
        .waitForElementVisible('.authentication .modal-dialog', 1000)
        .assert.containsText('.navbar.navbar-default .active', 'A à Z')
        .assert.containsText('.janus .panel-title', 'Vous avez un compte Labintel.')
        .assert.containsText('.bibapi .panel-title', 'Vous avez un compte Inist.')
        .click('.bibapi .panel-title a')
        .setValue('.username', 'test')
        .setValue('.password', 'secret')
        .click('button.api')
        .waitForElementVisible('.navbar.navbar-default', 1000)
        .assert.containsText('.navbar.navbar-default .active', 'Article');

        client.start(done);
    });

    it('should display Unauthorized error if wrong username and password when using api button', function (done) {
        browser
        .waitForElementVisible('.authentication .modal-dialog', 1000)
        .click('.bibapi .panel-title a')
        .setValue('.username', 'nightwatch')
        .setValue('.password', 'password')
        .click('button.api')
        .waitForElementVisible('.error', 1000)
        .assert.containsText('.error', 'Unauthorized')
        .assert.containsText('.navbar.navbar-default .active', 'A à Z');
        client.start(done);
    });
});
