import initialState from './publicationSearch.json';

describe('publicationSearch', function() {
    beforeEach(function(done) {
        browser.pause(1000).loadState(initialState);
        client.start(done);
    });

    it('should display publication search result when triggering search', function(done) {
        browser
            .waitForElementVisible('.navbar.navbar-default', 1000)
            .assert.containsText(
                '.navbar.navbar-default .active',
                'Une revue, un ouvrage',
            )
            .setValue('.search-input .term input', 'study')
            .waitForElementVisible('.fetch-button', 100)
            .click('.fetch-button')
            .pause(300)
            .waitForElementVisible('.search-result', 1000)
            .assert.elementCount('.record', 20);

        client.start(done);
    });

    it('should trigger a2z search result when clicking on a letter', function(done) {
        browser
            .waitForElementVisible('.navbar.navbar-default', 1000)
            .assert.containsText(
                '.navbar.navbar-default .active',
                'Une revue, un ouvrage',
            )
            .assert.containsText(
                '.a2z-search .first.letters',
                'A B C D E F G H I J K L M N O P Q R S T U V W X Y Z 0-9',
            )
            .assert.elementNotPresent('.a2z-search .second.letters')
            .click('.letter_B')
            .pause(300)
            .assert.containsText(
                '.a2z-search .second.letters',
                'BA BB BC BD BE BF BG BH BI BJ BK BL BM BN BO BP BQ BR BS BT BU BV BW BX BY BZ',
            )
            .assert.value('.search-input .term input', 'B*')
            .assert.containsText('.field.select-button', 'Titre')
            .waitForElementVisible('.search-result', 1000)
            .assert.elementCount('.record', 20);

        client.start(done);
    });

    it('should translate PublicationSearch', function(done) {
        browser
            .waitForElementVisible('.navbar.navbar-default', 100)
            .assert.containsText('.navbar.navbar-default', 'Un article')
            .assert.containsText(
                '.navbar.navbar-default',
                'Une revue, un ouvrage',
            )
            .assert.containsText('.navbar.navbar-default .language', 'fr')
            .assert.attributeEquals(
                '.search .search-input .term input',
                'placeholder',
                'Rechercher des titres de revues, de livres...',
            )
            .assert.containsText('.fetch-button', 'Rechercher')
            .click('.navbar.navbar-default .language')
            .waitForElementVisible('#en', 1000)
            .click('.navbar.navbar-default #en')
            .waitForElementVisible('.navbar.navbar-default .language', 1000)
            .assert.containsText('.navbar.navbar-default .language', 'en')
            .assert.attributeEquals(
                '.search .search-input .term input',
                'placeholder',
                'Search journal titles, book titles...',
            )
            .assert.containsText('.fetch-button', 'Search');

        client.start(done);
    });
});
