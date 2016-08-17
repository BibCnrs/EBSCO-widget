import initialState from './publicationSearch.json';

describe('publicationSearch', function() {

    beforeEach(function (done) {
        browser
        .pause(1000)
        .loadState(initialState);
        client.start(done);
    });

    it('should display article search result when triggering search', function (done) {
        browser
        .waitForElementVisible('.navbar.navbar-default', 1000)
        .assert.containsText('.navbar.navbar-default .active', 'Revues, Ouvrages')
        .setValue('.search-input', 'study')
        .waitForElementVisible('.fetch-button .btn', 100)
        .click('.fetch-button .btn')
        .pause(300)
        .waitForElementVisible('.search-result', 1000)
        .assert.elementCount('.record', 20);

        client.start(done);
    });

    it('should translate PublicationSearch', function (done) {
        browser
        .waitForElementVisible('.navbar.navbar-default', 100)
        .assert.containsText('.navbar.navbar-default', 'Articles')
        .assert.containsText('.navbar.navbar-default', 'Revues, Ouvrages')
        .assert.containsText('.navbar.navbar-default .language', 'fr')
        .assert.attributeEquals('.search .search-input', 'placeholder', 'Rechercher des titres de revues, de livres...')
        .assert.containsText('.fetch-button', 'Rechercher')
        .click('.navbar.navbar-default .language')
        .waitForElementVisible('#en', 1000)
        .click('.navbar.navbar-default #en')
        .waitForElementVisible('.navbar.navbar-default .language', 1000)
        .assert.containsText('.navbar.navbar-default .language', 'en')
        .assert.attributeEquals('.search .search-input', 'placeholder', 'Search journal titles, book titles...')
        .assert.containsText('.fetch-button', 'Search')
        ;

        client.start(done);
    });
});
