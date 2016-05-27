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
        .assert.containsText('.a2z-search .first.letters', 'A B C D E F G H I J K L M N O P Q R S T U V W X Y Z #')
        .click('.a2z-search .letters .P')
        .pause(300)
        .waitForElementVisible('.search-result', 1000)
        .assert.containsText('.a2z-search .second.letters', 'PA PB PC PD PE PF PG PH PI PJ PK PL PM PN PO PP PQ PR PS PT PU PV PW PX PY PZ P#')
        .assert.elementCount('.record', 20);

        client.start(done);
    });
});
