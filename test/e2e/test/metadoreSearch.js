import initialState from './metadoreSearch.json';

describe('metadoreSearch', function() {
    beforeEach(function(done) {
        browser.pause(1000).loadState(initialState);
        client.start(done);
    });

    it('should display metadore search result when triggering search', function(done) {
        browser
            .waitForElementVisible('.navbar.navbar-default', 1000)
            .assert.containsText(
                '.navbar.navbar-default .active',
                'Données de recherche',
            )
            .setValue('.search-input .term input', 'covid')
            .waitForElementVisible('.search-fetch button', 100)
            .click('.search-fetch button')
            .pause(300)
            .waitForElementVisible('.search-result', 1000)
            .assert.elementCount('.record', 20);

        client.start(done);
    });

    it('should translate MetadoreSearch', function(done) {
        browser
            .waitForElementVisible('.navbar.navbar-default', 100)
            .assert.containsText(
                '.navbar.navbar-default',
                'Données de recherche',
            )
            .assert.containsText('.navbar.navbar-default .language', 'fr')
            .assert.attributeEquals(
                '.search .search-input .term input',
                'placeholder',
                'Recherche',
            )
            .assert.attributeEquals(
                '.search-fetch button',
                'aria-label',
                'Rechercher',
            )
            .click('.navbar.navbar-default .language')
            .waitForElementVisible('#en', 1000)
            .click('.navbar.navbar-default #en')
            .waitForElementVisible('.navbar.navbar-default .language', 1000)
            .assert.containsText('.navbar.navbar-default', 'Research data')
            .assert.containsText('.navbar.navbar-default .language', 'en')
            .assert.attributeEquals(
                '.search .search-input .term input',
                'placeholder',
                'Search',
            )
            .assert.attributeEquals(
                '.search-fetch button',
                'aria-label',
                'Search',
            );

        client.start(done);
    });
});
