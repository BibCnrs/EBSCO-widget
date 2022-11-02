import initialState from './articleSearch.json';

describe('navigate between tab', function() {
    beforeEach(function(done) {
        browser.pause(1000).loadState(initialState);

        client.start(done);
    });

    it('should keep search term between tabs', function(done) {
        browser
            .pause(300)
            .waitForElementVisible('.navbar.navbar-default', 1000)
            .assert.containsText('.navbar.navbar-default .active', 'Article')
            .pause(300)
            .setValue('.term input', 'covid')
            .click('.nav-item.nav-publication')
            .pause(300)
            .waitForElementVisible('.navbar.navbar-default', 1000)
            .assert.containsText(
                '.navbar.navbar-default .active',
                'Revue, ouvrage',
            )
            .assert.value('.term input', 'covid')
            .click('.nav-item.nav-metadore')
            .pause(300)
            .waitForElementVisible('.navbar.navbar-default', 1000)
            .assert.containsText(
                '.navbar.navbar-default .active',
                'Données de recherche',
            )
            .assert.value('.term input', 'covid');

        client.start(done);
    });
    it('should trigger search when navigating between tabs after changing search term', function(done) {
        browser
            .pause(300)
            .waitForElementVisible('.navbar.navbar-default', 1000)
            .assert.containsText('.navbar.navbar-default .active', 'Article')
            .pause(300)
            .setValue('.term input', 'covid')
            .click('.nav-item.nav-publication')
            .pause(300)
            .waitForElementVisible('.navbar.navbar-default', 1000)
            .assert.containsText(
                '.navbar.navbar-default .active',
                'Revue, ouvrage',
            )
            .waitForElementVisible('.search-result', 1000)
            .assert.elementCount('.record', 20)
            .click('.nav-item.nav-metadore')
            .pause(300)
            .waitForElementVisible('.navbar.navbar-default', 1000)
            .assert.containsText(
                '.navbar.navbar-default .active',
                'Données de recherche',
            )
            .waitForElementVisible('.search-result', 1000)
            .assert.elementCount('.record', 20)
            .click('.nav-item.nav-article')
            .pause(300)
            .waitForElementVisible('.navbar.navbar-default', 1000)
            .assert.containsText('.navbar.navbar-default .active', 'Article')
            .waitForElementVisible('.search-result-with-sidebar', 1000)
            .assert.elementCount('.record', 20);

        client.start(done);
    });
});
