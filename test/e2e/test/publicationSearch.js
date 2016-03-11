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
        .waitForElementVisible('.navbar.navbar-default', 100)
        .assert.containsText('.navbar.navbar-default .active', 'Publication')
        .setValue('.search-input', 'study')
        .click('.fetch-button button')
        .waitForElementVisible('.search-result', 1000)
        .assert.elementCount('.record', 20);

        client.start(done);
    });
});
