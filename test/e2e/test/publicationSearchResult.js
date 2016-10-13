import initialState from './publicationSearchResult.json';

describe('publication Search result', function() {

    beforeEach(function (done) {
        browser
        .pause(1000)
        .loadState(initialState);

        client.start(done);
    });

    it('should retrieve clicked title', function (done) {
        browser
        .waitForElementVisible('.record', 1000)
        .waitForElementVisible('.record:nth-child(1) a.fetch-link', 100)
        .click('.record:nth-child(1) a.fetch-link')
        .pause(300)
        .waitForElementVisible('.notice', 1000)
        .pause(300)
        .assert.containsText('.notice dl span:nth-child(1) dt', 'ISSN')
        .assert.containsText('.notice dl span:nth-child(2) dt', 'Info éditeur')
        .assert.containsText('.notice dl span:nth-child(3) dt', 'Type de publication')
        .assert.containsText('.notice dl span:nth-child(4) dt', 'Mot clé')
        .assert.containsText('.notice dl span:nth-child(5) dt', 'Description')
        .assert.containsText('.notice dl span:nth-child(6) dt', 'URL')
        .assert.containsText('.notice dl span:nth-child(7) dt', 'Fréquence')
        .assert.containsText('.notice dl span:nth-child(8) dt', 'Relu par un comité de lecture');

        client.start(done);
    });

    it('should change page', function (done) {
        browser
        .waitForElementVisible('.record', 1000)
        .assert.containsText('.search-count', '1 - 20 / 4968')
        .assert.containsText('.pagination .current.page', '1')
        .assert.containsText('.pagination a.page', '2')
        .click('.pagination a.page')
        .waitForElementVisible('.record', 1000)
        .pause(300)
        .assert.containsText('.pagination .current.page', '2')
        .assert.containsText('.search-count', '21 - 40 / 4968');

        client.start(done);
    });

    it('should translate publicationSearchResult', function (done) {
        browser
        .waitForElementVisible('.navbar.navbar-default', 1000)
        .waitForElementVisible('.limiters', 1000)
        .assert.containsText('.limiters', 'Relu par un comité de lecture')
        .assert.containsText('.navbar.navbar-default .language', 'fr')
        .assert.containsText('.sidebar h3', 'Affiner votre recherche')
        .click('.navbar.navbar-default .language')
        .waitForElementVisible('#en', 1000)
        .click('.navbar.navbar-default #en')
        .waitForElementVisible('.navbar.navbar-default .language', 1000)
        .assert.containsText('.navbar.navbar-default .language', 'en')
        .assert.containsText('.limiters', 'Peer reviewed')
        .assert.containsText('.sidebar h3', 'Refine your search')
        ;

        client.start(done);
    });
});
