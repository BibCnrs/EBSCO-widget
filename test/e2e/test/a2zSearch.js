import initialState from './a2zSearch.json';

describe('a2zSearch', function() {

    beforeEach(function (done) {
        browser
        .loadState(initialState)
        .loadState(initialState);

        client.start(done);
    });

    it('should display a2z search result when triggering search', function (done) {
        browser
        .waitForElementVisible('.navbar.navbar-default', 1000)
        .assert.containsText('.navbar.navbar-default .active', 'A à Z')
        .assert.containsText('.a2z-search .letters', 'A B C D E F G H I J K L M N O P Q R S T U V W X Y Z 0-9')
        .click('.a2z-search .letters .P')
        .pause(300)
        .waitForElementVisible('.search-result', 1000)
        .assert.elementCount('.record', 20);

        client.start(done);
    });
});
