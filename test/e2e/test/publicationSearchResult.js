import initialState from './publicationSearchResult.json';

describe('publication Search result', function() {

    beforeEach(function (done) {
        browser.loadState(initialState).loadState(initialState);

        client.start(done);
    });

    it('should retrieve clicked article', function (done) {
        browser
        .waitForElementVisible('.record', 1000)
        .click('.record:nth-child(1) a.fetch-link')
        .waitForElementVisible('.notice', 1000)
        .assert.containsText('.notice h3', 'Romani Studies');

        client.start(done);
    });

    it('should change page', function (done) {
        browser
        .waitForElementVisible('.record', 1000)
        .assert.containsText('.search-count', 'Résultats de recherche : 1 - 20 / 4968')
        .assert.containsText('.pagination .current.page', '1')
        .assert.containsText('.pagination a.page', '2')
        .click('.pagination a.page')
        .waitForElementVisible('.record', 1000)
        .assert.containsText('.pagination .current.page', '2')
        .assert.containsText('.search-count', 'Résultats de recherche : 21 - 40 / 4968');

        client.start(done);
    });

    it('should translate publicationSearchResult', function (done) {
        browser
        .waitForElementVisible('.navbar.navbar-default', 1000)
        .assert.containsText('.search-count', 'Résultats de recherche : 1 - 20 / 4968')
        .assert.containsText('.limiters', 'Relu par un comité de lecture')
        .assert.containsText('.navbar.navbar-default .language', 'fr')
        .assert.containsText('.facet_list h3', 'Affiner votre recherche')
        .click('.navbar.navbar-default .language')
        .waitForElementVisible('#en', 1000)
        .click('.navbar.navbar-default #en')
        .waitForElementVisible('.navbar.navbar-default .language', 1000)
        .assert.containsText('.navbar.navbar-default .language', 'en')
        .assert.containsText('.search-count', 'Search results : 1 - 20 / 4968')
        .assert.containsText('.limiters', 'Peer Reviewed')
        .assert.containsText('.facet_list h3', 'Refine your search')
        ;

        client.start(done);
    });
});
