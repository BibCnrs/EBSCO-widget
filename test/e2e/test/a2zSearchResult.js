import initialState from './a2zSearchResult.json';

describe('a2z Search result', function() {

    beforeEach(function (done) {
        browser.loadState(initialState).loadState(initialState);

        client.start(done);
    });

    it('should retrieve clicked title', function (done) {
        browser
        .waitForElementVisible('.record', 1000)
        .click('.record_list a.fetch-link')
        .waitForElementVisible('.notice', 1000)
        .pause(300)
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
        .assert.containsText('.search-count', 'Résultats de recherche : 1 - 20 / 432')
        .assert.containsText('.pagination .current.page', '1')
        .assert.containsText('.pagination a.page', '2')
        .click('.pagination a.page')
        .waitForElementVisible('.record', 1000)
        .assert.containsText('.pagination .current.page', '2')
        .assert.containsText('.search-count', 'Résultats de recherche : 21 - 40 / 432');

        client.start(done);
    });

});
