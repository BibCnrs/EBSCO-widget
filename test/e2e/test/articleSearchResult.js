import initialState from './articleSearchResult.json';

describe('articleSearchResult', function() {

    beforeEach(function (done) {
        browser
        .pause(1000)
        .loadState(initialState);

        client.start(done);
    });

    it('should retrieve clicked article', function (done) {
        browser
        .waitForElementVisible('.record', 1000)
        .click('.record_list a.fetch-link')
        .waitForElementVisible('.notice', 1000)
        .pause(300)
        .assert.containsText('.notice dl span:nth-child(1) dt', 'Authors')
        .assert.containsText('.notice dl span:nth-child(2) dt', 'Source')
        .assert.containsText('.notice dl span:nth-child(3) dt', 'Publication Year')
        .assert.containsText('.notice dl span:nth-child(4) dt', 'Subject Terms')
        .assert.containsText('.notice dl span:nth-child(5) dt', 'Description (Translated)')
        .assert.containsText('.notice dl span:nth-child(6) dt', 'Document Type')
        .assert.containsText('.notice dl span:nth-child(7) dt', 'Language')
        .assert.containsText('.notice dl span:nth-child(8) dt', 'ISSN')
        .assert.containsText('.notice dl span:nth-child(9) dt', 'Accession Number')
        .assert.containsText('.notice dl span:nth-child(10) dt', 'Airiti Library eBooks & Journals - 華藝線上圖書館');

        client.start(done);
    });

    it('should change page', function (done) {
        browser
        .waitForElementVisible('.record', 1000)
        .assert.containsText('.search-count', 'Résultats de recherche : 1 - 10 / 516730')
        .assert.containsText('.pagination .current.page', '1')
        .assert.containsText('.pagination a.page', '2')
        .click('.pagination a.page')
        .pause(300)
        .waitForElementVisible('.record', 1000)
        .assert.containsText('.pagination .current.page', '2')
        .assert.containsText('.search-count', 'Résultats de recherche : 11 - 20 / 516730');

        client.start(done);
    });

    it('should display facet', function (done) {
        browser
        .waitForElementVisible('.facet_list', 1000)
        .assert.elementCount('.active_facet', 0)
        .assert.containsText('.available_facets .facet:nth-child(1) .header .title', 'Source Type (14)')
        .assert.elementCount('.available_facets .facet:nth-child(1) .facet_values .facet_value', 3)
        .assert.containsText('.available_facets .facet:nth-child(1) .facet_values', 'Academic Journals (237702)\nMagazines (75583)\nReports (41302)')
        .click('.available_facets .facet:nth-child(1) .header .more')
        .waitForElementVisible('.available_facets', 1000)
        .assert.elementCount('.available_facets .facet:nth-child(1) .facet_values .facet_value', 14)
        .click('.available_facets .facet:nth-child(1) .facet_values .facet_value:nth-child(1)')
        .waitForElementVisible('.available_facets', 1000)
        .assert.containsText('.active_facet .header .title', 'Vos filtres')
        .assert.elementCount('.active_facet .facet_values .facet_value', 1)
        .assert.containsText('.active_facet .facet_values', 'Academic Journals')
        ;

        client.start(done);
    });

    it('should translate articleSearchResult', function (done) {
        browser
        .waitForElementVisible('.navbar.navbar-default', 1000)
        .assert.containsText('.search-count', 'Résultats de recherche : 1 - 10 / 516730')
        .assert.containsText('.limiters', 'Texte Intégral')
        .assert.containsText('.limiters', 'Relu par un comité de lecture')
        .assert.containsText('.limiters .publication-date-limiter .boundaries .to', 'à')
        .assert.containsText('.navbar.navbar-default .language', 'fr')
        .assert.containsText('.facet_list h3', 'Affiner votre recherche')
        .click('.navbar.navbar-default .language')
        .waitForElementVisible('#en', 1000)
        .click('.navbar.navbar-default #en')
        .waitForElementVisible('.navbar.navbar-default .language', 1000)
        .assert.containsText('.navbar.navbar-default .language', 'en')
        .assert.containsText('.search-count', 'Search results : 1 - 10 / 516730')
        .assert.containsText('.limiters', 'Full Text')
        .assert.containsText('.limiters', 'Peer Reviewed')
        .assert.containsText('.limiters .publication-date-limiter .boundaries .to', 'to')
        .assert.containsText('.facet_list h3', 'Refine your search')
        ;

        client.start(done);
    });
});
