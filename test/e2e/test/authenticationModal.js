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
        .assert.containsText('.navbar.navbar-default .active', 'Revues, Ouvrages')
        .assert.containsText('.janus .panel-title', 'Via le gestionnaire d\'identité janus')
        .assert.containsText('.bibapi .panel-title', 'Via votre ancien code d\'accés portail')
        .click('button.janus')
        .pause(1000)
        .waitForElementVisible('.navbar.navbar-default', 1000)
        .assert.containsText('.navbar.navbar-default .active', 'Articles');

        client.start(done);
    });

    it('should trigger pausedAction(go to article) once logged with bibapi account', function (done) {
        browser
        .waitForElementVisible('.authentication .modal-dialog', 1000)
        .assert.containsText('.navbar.navbar-default .active', 'Revues, Ouvrages')
        .assert.containsText('.janus', 'Via le gestionnaire d\'identité janus')
        .assert.containsText('.inist-button', 'Via votre ancien code d\'accés portail')
        .click('.inist-button')
        .setValue('.username', 'test')
        .setValue('.password', 'secret')
        .click('button.api')
        .waitForElementVisible('.navbar.navbar-default', 1000)
        .assert.containsText('.navbar.navbar-default .active', 'Articles');

        client.start(done);
    });

    it('should display Unauthorized error if wrong username and password when using api button', function (done) {
        browser
        .waitForElementVisible('.authentication .modal-dialog', 1000)
        .click('.inist-button')
        .setValue('.username', 'nightwatch')
        .setValue('.password', 'password')
        .click('button.api')
        .waitForElementVisible('.error', 1000)
        .assert.containsText('.error', 'Unauthorized')
        .assert.containsText('.navbar.navbar-default .active', 'Revues, Ouvrages');
        client.start(done);
    });
});
