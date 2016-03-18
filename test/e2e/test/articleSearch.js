import initialState from './articleSearch.json';

describe('articleSearch', function() {

    beforeEach(function (done) {
        browser.loadState(initialState);

        client.start(done);
    });

    it('should display article search result when triggering search', function (done) {
        browser
        .waitForElementVisible('.navbar.navbar-default', 100)
        .assert.containsText('.navbar.navbar-default .active', 'Article')
        .setValue('.article-search-input-list input', 'aids')
        .click('.fetch-button button')
        .waitForElementVisible('.search-result-with-sidebar', 1000)
        .assert.elementCount('.record', 20);

        client.start(done);
    });

    it('should add/remove article Input when clicking add/remove', function (done) {
        browser
        .waitForElementVisible('.navbar.navbar-default', 100)
        .assert.containsText('.navbar.navbar-default .active', 'Article')
        .assert.elementCount('.article-search-input-list .search-input', 1)
        .setValue('.article-search-input-list input', 'aids')
        .click('.article-search-input-list .row:nth-child(1) .action .add')
        .assert.elementCount('.article-search-input-list .search-input', 2)
        .assert.value('.article-search-input-list .row:nth-child(1) .search-input', 'aids')
        .assert.value('.article-search-input-list .row:nth-child(2) .search-input', '')
        .click('.article-search-input-list .row:nth-child(1) .action .remove')
        .assert.elementCount('.article-search-input-list .search-input', 1)
        .assert.value('.article-search-input-list .row:nth-child(1) .search-input', '');

        client.start(done);
    });
});
