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
        .assert.containsText('tr:nth-child(2)', 'Tout: aids vie Texte intégral; Langue: English 253975 résultats')
        .assert.containsText('tr:nth-child(3)', 'Tout: phylloxera vie Texte intégral 1193 résultats');

        client.start(done);
    });
});
