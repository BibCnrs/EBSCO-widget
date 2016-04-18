import initialState from './publicationSearch.json';

describe('publicationSearch', function() {

    beforeEach(function (done) {
        browser
        .loadState(initialState)
        .loadState(initialState);
        client.start(done);
    });

    it('should display article search result when triggering search', function (done) {
        browser
        .waitForElementVisible('.navbar.navbar-default', 1000)
        .assert.containsText('.navbar.navbar-default .active', 'Titre')
        .setValue('.search-input', 'study')
        .click('.fetch-button button')
        .pause(300)
        .waitForElementVisible('.search-result', 1000)
        .assert.elementCount('.record', 20);

        client.start(done);
    });

    it('should translate PublicationSearch', function (done) {
        browser
        .waitForElementVisible('.navbar.navbar-default', 1000)
        .assert.attributeEquals('.search .search-input', 'placeholder', 'Rechercher des titres de revues, de livres...')
        .assert.containsText('.fetch-button', 'Rechercher')
        .assert.containsText('.search-menu', 'Résultats')
        .click('.navbar.navbar-default .language')
        .waitForElementVisible('#en', 1000)
        .click('.navbar.navbar-default #en')
        .waitForElementVisible('.navbar.navbar-default .language', 1000)
        .assert.containsText('.navbar.navbar-default .language', 'en')
        .assert.attributeEquals('.search .search-input', 'placeholder', 'Search journal titles, book titles...')
        .assert.containsText('.fetch-button', 'Search')
        .assert.containsText('.search-menu', 'Results')
        ;

        client.start(done);
    });
});
