import initialState from './articleSearchResult.json';

describe('article Search result', function() {

    beforeEach(function (done) {
        browser.loadState(initialState);

        client.start(done);
    });

    it('should retrieve clicked article', function (done) {
        browser
        .waitForElementVisible('.record', 1000)
        .click('.record_list a.fetch-link')
        .waitForElementVisible('.notice', 1000)
        .assert.containsText('.notice h3', 'The Legislative and Policy Gaps in the National HIV and AIDS, STI Policy, 2004-2014, Ghana');

        client.start(done);
    });

    it('should change page', function (done) {
        browser
        .waitForElementVisible('.record', 1000)
        .assert.containsText('.search-count', 'Résultats de recherche : 1 - 20 of 516730')
        .assert.containsText('.pagination .current.page', '1')
        .assert.containsText('.pagination a.page', '2')
        .click('.pagination a.page')
        .waitForElementVisible('.record', 1000)
        .assert.containsText('.pagination .current.page', '2')
        .assert.containsText('.search-count', 'Résultats de recherche : 21 - 40 of 516730');

        client.start(done);
    });
});
