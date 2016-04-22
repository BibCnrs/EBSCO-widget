import initialState from './articleSearch.json';

describe('articleSearch', function() {

    beforeEach(function (done) {
        browser.loadState(initialState);

        client.start(done);
    });

    it('should display article search result when triggering search', function (done) {
        browser
        .waitForElementVisible('.navbar.navbar-default', 1000)
        .assert.containsText('.navbar.navbar-default .active', 'Article')
        .setValue('.article-search-input-list input', 'aids')
        .click('.fetch-button button')
        .pause(300)
        .waitForElementVisible('.search-result-with-sidebar', 1000)
        .assert.elementCount('.record', 20);

        client.start(done);
    });

    it('should add/remove article Input when clicking add/remove', function (done) {
        browser
        .waitForElementVisible('.navbar.navbar-default', 1000)
        .assert.containsText('.navbar.navbar-default .active', 'Article')
        .assert.elementCount('.article-search-input-list .search-input', 1)
        .setValue('.article-search-input-list input', 'aids')
        .click('.article-search-input-list .row:nth-child(1) .action .add')
        .pause(300)
        .assert.elementCount('.article-search-input-list .search-input', 2)
        .assert.value('.article-search-input-list .row:nth-child(1) .search-input', 'aids')
        .assert.value('.article-search-input-list .row:nth-child(2) .search-input', '')
        .click('.article-search-input-list .row:nth-child(1) .action .remove')
        .pause(300)
        .assert.elementCount('.article-search-input-list .search-input', 1)
        .assert.value('.article-search-input-list .row:nth-child(1) .search-input', '');

        client.start(done);
    });

    it('should translate ArticleSearch', function (done) {
        browser
        .waitForElementVisible('.navbar.navbar-default', 100)
        .assert.containsText('.navbar .navbar-header .navbar-brand', 'Recherche')
        .assert.containsText('.navbar.navbar-default', 'Article')
        .assert.containsText('.navbar.navbar-default', 'Titre')
        .assert.containsText('.navbar.navbar-default', 'A à Z')
        .assert.containsText('.navbar.navbar-default .language', 'fr')
        .assert.attributeEquals('.article-search-input-list .search-input', 'placeholder', 'Rechercher des articles, des chapitres de livre...')
        .assert.containsText('.fetch-button', 'Rechercher')
        .assert.containsText('.search-menu', 'Résultats')
        .assert.containsText('.search-menu', 'Historique')
        .click('.navbar.navbar-default .language')
        .waitForElementVisible('#en', 1000)
        .click('.navbar.navbar-default #en')
        .waitForElementVisible('.navbar.navbar-default .language', 1000)
        .assert.containsText('.navbar.navbar-default .language', 'en')
        .assert.containsText('.navbar .navbar-header .navbar-brand', 'Search')
        .assert.containsText('.navbar.navbar-default', 'Article')
        .assert.containsText('.navbar.navbar-default', 'Title')
        .assert.containsText('.navbar.navbar-default', 'A to Z')
        .assert.attributeEquals('.article-search-input-list .search-input', 'placeholder', 'Search articles, book chapters...')
        .assert.containsText('.fetch-button', 'Search')
        .assert.containsText('.search-menu', 'Results')
        .assert.containsText('.search-menu', 'History')
        ;

        client.start(done);
    });
});
