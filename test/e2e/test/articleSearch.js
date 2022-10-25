import initialState from './articleSearch.json';

describe('simple articleSearch', function() {
    beforeEach(function(done) {
        browser.pause(1000).loadState(initialState);

        client.start(done);
    });

    it('should display article search result when triggering search', function(done) {
        browser
            .pause(300)
            .waitForElementVisible('.navbar.navbar-default', 1000)
            .assert.containsText('.navbar.navbar-default .active', 'Article')
            .pause(300)
            .setValue('.term input', 'aids')
            .click('.search-fetch button')
            .pause(300)
            .waitForElementVisible('.search-result-with-sidebar', 1000)
            .assert.elementCount('.record', 20);

        client.start(done);
    });

    // this feature is now hidden, therefore this test is nosense and will always fail. By keeping the same strategy we skip it.
    it.skip('should add/remove article Input when clicking add/remove', function(done) {
        browser
            .waitForElementVisible('.navbar.navbar-default', 1000)
            .assert.containsText('.navbar.navbar-default .active', 'Article')
            .assert.elementCount('.query-list .search-input', 1)
            .setValue('.term input', 'aids')
            .click('.query-list .query:nth-child(1) .action .add')
            .pause(300)
            .assert.elementCount('.query-list .search-input', 2)
            .assert.value(
                '.query-list .query:nth-child(1) .search-input .term input',
                'aids',
            )
            .assert.value(
                '.query-list .query:nth-child(2) .search-input .term input',
                '',
            )
            .click('.query-list .query:nth-child(1) .action .remove')
            .pause(300)
            .assert.elementCount('.query-list .search-input', 1)
            .assert.value(
                '.query-list .query:nth-child(1) .search-input .term input',
                '',
            );

        client.start(done);
    });

    it('should translate ArticleSearch', function(done) {
        browser
            .waitForElementVisible('.navbar.navbar-default', 100)
            .assert.containsText('.navbar.navbar-default', 'Article')
            .assert.containsText('.navbar.navbar-default', 'Revue, ouvrage')
            .assert.containsText('.navbar.navbar-default .language', 'fr')
            .assert.attributeEquals(
                '.search-input .term input',
                'placeholder',
                'Rechercher des articles, des chapitres de livre, des DOIs, des auteurs, des mots du résumé du titre, ISSN, ISBN.',
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
            .assert.containsText('.navbar.navbar-default .language', 'en')
            .assert.containsText('.navbar.navbar-default', 'Article')
            .assert.containsText('.navbar.navbar-default', 'Journal, book')
            .assert.attributeEquals(
                '.search-input .term input',
                'placeholder',
                'Search articles, book chapters, DOIs, authors, words from the title abstract, ISSN, ISBN.',
            )
            .assert.attributeEquals(
                '.search-fetch button',
                'aria-label',
                'Search',
            );

        client.start(done);
    });
});
