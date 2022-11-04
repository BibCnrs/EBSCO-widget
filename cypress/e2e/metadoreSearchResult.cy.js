import initialState from '../data/metadoreSearchResult.json';

describe('metadore Search result', () => {
    beforeEach(function() {
        cy.visit('/', {
            onBeforeLoad: win => {
                win.initialState = initialState;
            },
        });
    });

    it('should retrieve clicked more details', () => {
        // .waitForElementVisible('.record', 1000)
        // .waitForElementVisible(
        //     '.record:nth-child(1) button.notice-opener',
        //     100,
        // )
        // .click('.record:nth-child(1) button.notice-opener')
        // .pause(300)
        // .waitForElementVisible('.notice', 1000)
        // .pause(300)
        // .assert.containsText('.notice dl span:nth-child(1) dt', 'DOI')
        // .assert.containsText('.notice dl span:nth-child(2) dt', 'Type')
        // .assert.containsText(
        //     '.notice dl span:nth-child(3) dt',
        //     'Description',
        // );
        cy.get('.record').should('be.visible');
        cy.get('.record:nth-child(1) button.notice-opener')
            .should('be.visible')
            .click();
        cy.get('.notice').should('be.visible');
        cy.get('.notice dl span:nth-child(1) dt').should('contain', 'DOI');
        cy.get('.notice dl span:nth-child(2) dt').should('contain', 'Type');
        cy.get('.notice dl span:nth-child(3) dt').should(
            'contain',
            'Année de publication',
        );
        cy.get('.notice dl span:nth-child(4) dt').should(
            'contain',
            'Description',
        );
        cy.get('.notice dl span:nth-child(5) dt').should(
            'contain',
            'Mots clés',
        );
    });

    it('should change page', () => {
        cy.get('.record').should('be.visible');
        cy.get('.search-count').should('contain', '1 - 20 / 5275');
        cy.get('.pagination .current.page').should('contain', '1');
        cy.get('.pagination a.page').should('contain', '2');
        cy.get('.pagination a.page').click();
        cy.get('.record').should('be.visible');
        cy.get('.pagination .current.page').should('contain', '2');
        cy.get('.search-count').should('contain', '21 - 40 / 5275');
    });
});
