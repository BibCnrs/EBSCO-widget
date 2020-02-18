import initialState from './authentication.json';

describe('authentication', function() {
    beforeEach(function(done) {
        browser.pause(1000).loadState(initialState);
        client.start(done);
    });

    it('should display login modal when trying to search article', function(done) {
        browser
            .waitForElementVisible('.navbar.navbar-default', 1000)
            .assert.containsText(
                '.navbar.navbar-default .active',
                'Une revue, un ouvrage',
            )
            .click('.nav-article')
            .pause(300)
            .setValue('.term input', 'aids')
            .click('.fetch-button')
            .pause(300)
            .waitForElementVisible('.authentication .modal-dialog', 2000)
            .assert.containsText(
                '.janus',
                "Via le gestionnaire d'identité janus",
            )
            .assert.containsText(
                '.inist-button',
                "Via votre ancien code d'accès portail",
            )
            .setValue('.username', 'test')
            .setValue('.password', 'secret')
            .click('button.api')
            .waitForElementVisible('.navbar.navbar-default', 1000)
            .assert.containsText(
                '.navbar.navbar-default .active',
                'Un article',
            );

        client.start(done);
    });
});
