import initialState from './authentication.json';

describe('authentication', function() {
    beforeEach(function(done) {
        browser.pause(1000).loadState(initialState);

        client.start(done);
    });

    it('should display login modal when trying to retrieve clicked publication title', function(done) {
        browser
            .waitForElementVisible('.navbar.navbar-default', 1000)
            .assert.containsText(
                '.navbar.navbar-default .active',
                'Une revue, un ouvrage',
            )
            .waitForElementVisible('.record', 1000)
            .click('.record_list a.fetch-link')
            .pause(300)
            .waitForElementVisible('.authentication .modal-dialog', 1000)
            .assert.containsText(
                '.janus',
                "Via le gestionnaire d'identité janus",
            )
            .assert.containsText(
                '.inist-button',
                "Via votre ancien code d'accès portail",
            )
            .click('.inist-button')
            .waitForElementVisible('.username', 1000)
            .setValue('.username', 'test')
            .setValue('.password', 'secret')
            .click('button.api')
            .pause(2000)
            .waitForElementVisible('.notice', 1000)
            .assert.containsText('.notice dl span:nth-child(1) dt', 'ISSN')
            .assert.containsText(
                '.notice dl span:nth-child(2) dt',
                'Info éditeur',
            )
            .assert.containsText(
                '.notice dl span:nth-child(3) dt',
                'Type de publication',
            )
            .assert.containsText('.notice dl span:nth-child(4) dt', 'Mot clé')
            .assert.containsText(
                '.notice dl span:nth-child(5) dt',
                'Description',
            )
            .assert.containsText('.notice dl span:nth-child(6) dt', 'URL')
            .assert.containsText('.notice dl span:nth-child(7) dt', 'Fréquence')
            .assert.containsText(
                '.notice dl span:nth-child(8) dt',
                'Relu par un comité de lecture',
            );

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
