import initialState from './publicationSearchResult.json';

describe('publication Search result', function() {

    beforeEach(function (done) {
        browser.loadState(initialState).loadState(initialState);

        client.start(done);
    });

    it('should retrieve clicked title', function (done) {
        browser
        .waitForElementVisible('.record', 1000)
        .waitForElementVisible('.record:nth-child(1) a.fetch-link', 100)
        .click('.record:nth-child(1) a.fetch-link')
        .pause(300)
        .waitForElementVisible('.notice', 1000)
        .assert.containsText('.notice dl span:nth-child(1) dt', 'ISSN')
        .assert.containsText('.notice dl span:nth-child(2) dt', 'Publisher Information')
        .assert.containsText('.notice dl span:nth-child(3) dt', 'Resource Type')
        .assert.containsText('.notice dl span:nth-child(4) dt', 'Subjects')
        .assert.containsText('.notice dl span:nth-child(5) dt', 'Description')
        .assert.containsText('.notice dl span:nth-child(6) dt', 'URL')
        .assert.containsText('.notice dl span:nth-child(7) dt', 'Frequency')
        .assert.containsText('.notice dl span:nth-child(8) dt', 'Peer Reviewed');

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
        .pause(300)
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
