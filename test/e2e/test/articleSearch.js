describe('articleSearch', function() {

    beforeEach(function (done) {
        browser
        .loadState({
            ...defaultState,
            login: {
                ...defaultState.login,
                token: 'token'
            },
            article: {
                ...defaultState.article
            }
        });
        client.start(done);
    });

    it('should display search article view if login is correct', function (done) {
        browser
        .waitForElementVisible('.navbar.navbar-default', 100)
        .assert.containsText('.navbar.navbar-default .active', 'Article');

        client.start(done);
    });
});
