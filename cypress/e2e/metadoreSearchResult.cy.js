// This file is not compliant with the testing-library doctrine. Should be refactored to be more user-centric.
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
        cy.get('.record').should('be.visible');
        cy.get('.record_list li:nth-child(1) button.notice-opener')
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
        cy.get('.pagination a.page')
            .first()
            .click();
        cy.get('.record').should('be.visible');
        cy.get('.pagination .current.page').should('contain', '2');
        cy.get('.search-count').should('contain', '21 - 40 / 5275');
    });
});
