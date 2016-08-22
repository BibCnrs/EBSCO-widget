import initialState from './history.json';

describe('history', function() {

    beforeEach(function (done) {
        browser
        .pause(1000)
        .loadState(initialState);

        client.start(done);
    });

    it('should display history', function (done) {
        browser
        .waitForElementVisible('.history', 1000)
        .assert.containsText('tr', 'Terme recherchés Domaine Limites Facettes Actions')
        .assert.containsText('tr:nth-child(2)', 'Tout: aids vie Texte intégral; Date de publication: 1914/1918 44 résultats')
        .assert.containsText('tr:nth-child(3)', 'Tout: phylloxera vie Texte intégral 1189 résultats');

        client.start(done);
    });

    it('should reload search in history', function (done) {
        browser
        .waitForElementVisible('.history', 1000)
        .click('tr:nth-child(2) .edit')
        .assert.value('.term input', 'aids')
        .assert.value('.fullText input', 'on')
        .waitForElementVisible('.publication-date-limiter')
        .assert.value('.publication-date-limiter .from', '1914')
        .assert.value('.publication-date-limiter .to', '1918')
        .assert.elementCount('.record', 0);

        client.start(done);
    });

    it('should relaunch search in history', function (done) {
        browser
        .waitForElementVisible('.history', 1000)
        .click('tr:nth-child(2) .refresh')
        .assert.value('.term input', 'aids')
        .assert.value('.fullText input', 'on')
        .waitForElementVisible('.publication-date-limiter')
        .assert.value('.publication-date-limiter .from', '1914')
        .assert.value('.publication-date-limiter .to', '1918')
        .assert.elementCount('.record', 20);

        client.start(done);
    });

    it('should delete search in history', function (done) {
        browser
        .waitForElementVisible('.history', 1000)
        .click('tr:nth-child(2) .delete')
        .assert.containsText('tr:nth-child(2)', 'Tout: phylloxera vie Texte intégral 1189 résultats');

        client.start(done);
    });

    it('should translate history', function (done) {
        browser
        .waitForElementVisible('.history', 1000)
        .assert.containsText('tr', 'Terme recherchés Domaine Limites Facettes Actions')
        .assert.containsText('tr:nth-child(2)', 'Tout: aids vie Texte intégral; Date de publication: 1914/1918 44 résultats')
        .assert.containsText('tr:nth-child(3)', 'Tout: phylloxera vie Texte intégral 1189 résultats')
        .assert.containsText('.navbar.navbar-default .language', 'fr')
        .click('.navbar.navbar-default .language')
        .waitForElementVisible('#en', 1000)
        .click('.navbar.navbar-default #en')
        .waitForElementVisible('.navbar.navbar-default .language', 1000)
        .assert.containsText('.navbar.navbar-default .language', 'en')
        .assert.containsText('tr', 'Searched terms Domain Limits Facets Actions')
        .assert.containsText('tr:nth-child(2)', 'All: aids vie Full text; Publication date: 1914/1918 44 results')
        .assert.containsText('tr:nth-child(3)', 'All: phylloxera vie Full text 1189 results')
        ;

        client.start(done);
    });
});
