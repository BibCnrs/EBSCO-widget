import initialState from './login.json';

describe('login', function() {

    beforeEach(function (done) {
        browser
        .loadState(initialState);

        client.start(done);
    });

    it('should display search article view if login is correct with returned domain', function (done) {
        browser
        .click('button.btn')
        .waitForElementVisible('.navbar.navbar-default', 1000)
        .assert.containsText('.navbar.navbar-default .active', 'Article')
        .assert.state('article.search.availableDomains', ['vie', 'shs'])
        .assert.state('login.token', 'token')
        .assert.containsText('#domain', 'vie')
        .assert.sessionStorage('EBSCO_WIDGET_domain', 'vie')
        .assert.sessionStorage('EBSCO_WIDGET_availableDomains', ['vie', 'shs'])
        .assert.sessionStorage('EBSCO_WIDGET_username', 'tester')
        .assert.cookie('cookie=cookie')
        .click('#domain')
        .assert.containsText('ul[aria-labelledby=domain]', 'vie\nshs');

        client.start(done);
    });
});
