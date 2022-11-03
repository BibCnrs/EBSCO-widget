import initialState from './metadoreSearchResult.json';

describe('metadore Search result', function() {
    beforeEach(function(done) {
        browser.pause(1000).loadState(initialState);

        client.start(done);
    });

    it('should retrieve clicked more details', function(done) {
        browser
            .waitForElementVisible('.record', 1000)
            .waitForElementVisible(
                '.record:nth-child(1) button.notice-opener',
                100,
            )
            .click('.record:nth-child(1) button.notice-opener')
            .pause(300)
            .waitForElementVisible('.notice', 1000)
            .pause(300)
            .assert.containsText('.notice dl span:nth-child(1) dt', 'DOI')
            .assert.containsText('.notice dl span:nth-child(2) dt', 'Type')
            .assert.containsText(
                '.notice dl span:nth-child(3) dt',
                'Année de publication',
            )
            .assert.containsText(
                '.notice dl span:nth-child(4) dt',
                'Description',
            )
            .assert.containsText(
                '.notice dl span:nth-child(5) dt',
                'Mots clés',
            );

        client.start(done);
    });

    it('should change page', function(done) {
        browser
            .waitForElementVisible('.record', 1000)
            .assert.containsText('.search-count', '1 - 20 / 5275')
            .assert.containsText('.pagination .current.page', '1')
            .assert.containsText('.pagination a.page', '2')
            .click('.pagination a.page')
            .waitForElementVisible('.record', 1000)
            .pause(300)
            .assert.containsText('.pagination .current.page', '2')
            .assert.containsText('.search-count', '21 - 40 / 5275');

        client.start(done);
    });
});
