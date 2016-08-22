import initialState from './authentication.json';

describe('authentication', function() {

    beforeEach(function (done) {
        browser
        .pause(1000)
        .loadState(initialState);

        client.start(done);
    });

    it('should display login modal when trying to retrieve clicked publication title', function (done) {
        browser
        .waitForElementVisible('.navbar.navbar-default', 1000)
        .assert.containsText('.navbar.navbar-default .active', 'Revues, Ouvrages')
        .waitForElementVisible('.record', 1000)
        .click('.record_list a.fetch-link')
        .pause(300)
        .waitForElementVisible('.authentication .modal-dialog', 1000)
        .assert.containsText('.janus .panel-title', 'Vous avez un compte Labintel.')
        .assert.containsText('.bibapi .panel-title', 'Vous avez un compte Inist.')
        .click('.bibapi .panel-title a')
        .setValue('.username', 'test')
        .setValue('.password', 'secret')
        .click('button.api')
        .pause(1000)
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

    it('should display login modal when trying to search article', function (done) {
        browser
        .waitForElementVisible('.navbar.navbar-default', 1000)
        .assert.containsText('.navbar.navbar-default .active', 'Revues, Ouvrages')
        .click('.nav-article')
        .pause(300)
        .setValue('.article-search-input-list input', 'aids')
        .click('.fetch-button button')
        .pause(300)
        .waitForElementVisible('.authentication .modal-dialog', 1000)
        .assert.containsText('.janus .panel-title', 'Vous avez un compte Labintel.')
        .assert.containsText('.bibapi .panel-title', 'Vous avez un compte Inist.')
        .click('.bibapi .panel-title a')
        .setValue('.username', 'test')
        .setValue('.password', 'secret')
        .click('button.api')
        .waitForElementVisible('.navbar.navbar-default', 1000)
        .assert.containsText('.navbar.navbar-default .active', 'Articles');

        client.start(done);
    });
});
