describe('publicationSearch', function() {

    const triggerActions = (actions, startingState = defaultState) => {
        return actions.reduce((state, action) => reducers(state, action), startingState);
    };

    beforeEach(function (done) {
        const publicationState = triggerActions([
            { type: 'LOGIN_SUCCESS', response: { token: 'token', domains: ['vie', 'shs'] } },
            { type: 'NAVIGATE', location: 'publication' }
        ]);

        browser
        .loadState(publicationState)
        .loadState(publicationState);
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
