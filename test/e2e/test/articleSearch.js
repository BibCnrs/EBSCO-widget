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
});
