import initialState from './history.json';

describe('history', function() {

    beforeEach(function (done) {
        browser.loadState(initialState);

        client.start(done);
    });

    it('should display history', function (done) {
        browser
        .waitForElementVisible('.history', 100)
        .assert.containsText('tr', 'Terme recherchés Domaine Limites Facettes Actions')
        .assert.containsText('tr:nth-child(2)', 'Tout: aids vie Texte intégral; Date de publication: 1914/1918 253975 résultats')
        .assert.containsText('tr:nth-child(3)', 'Tout: phylloxera vie Texte intégral 1193 résultats');

        client.start(done);
    });

    it('should reload search in history', function (done) {
        browser
        .waitForElementVisible('.history', 100)
        .click('tr:nth-child(2) .edit')
        .assert.value('.article-search-input-list input', 'aids')
        .assert.value('.fullText', 'on')
        .waitForElementVisible('.publication-date-limiter')
        .assert.value('.publication-date-limiter .from', '1914')
        .assert.value('.publication-date-limiter .to', '1918')
        .assert.elementCount('.record', 0);

        client.start(done);
    });

    it('should relaunch search in history', function (done) {
        browser
        .waitForElementVisible('.history', 100)
        .click('tr:nth-child(2) .refresh')
        .assert.value('.article-search-input-list input', 'aids')
        .assert.value('.fullText', 'on')
        .waitForElementVisible('.publication-date-limiter')
        .assert.value('.publication-date-limiter .from', '1914')
        .assert.value('.publication-date-limiter .to', '1918')
        .assert.elementCount('.record', 20);

        client.start(done);
    });

    it('should delete search in history', function (done) {
        browser
        .waitForElementVisible('.history', 100)
        .click('tr:nth-child(2) .delete')
        .assert.containsText('tr:nth-child(2)', 'Tout: phylloxera vie Texte intégral 1193 résultats');

        client.start(done);
    });
});
