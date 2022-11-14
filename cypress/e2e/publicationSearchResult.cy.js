// This file is not compliant with the testing-library doctrine. Should be refactored to be more user-centric.
import initialState from '../data/publicationSearchResult.json';

describe('publication Search result', () => {
    beforeEach(function() {
        cy.visit('/', {
            onBeforeLoad: win => {
                win.initialState = initialState;
            },
        });
    });

    it('should retrieve clicked more details', () => {
        cy.get('.record').should('be.visible');
        cy.get('.record_list li:nth-child(1) button.notice-opener').should(
            'be.visible',
        );
        cy.get('.record_list li:nth-child(1) button.notice-opener').click();
        cy.get('.notice').should('be.visible');
        cy.get('.notice dl span:nth-child(1) dt').should('contain', 'ISSN');
        cy.get('.notice dl span:nth-child(2) dt').should(
            'contain',
            'Info éditeur',
        );
        cy.get('.notice dl span:nth-child(3) dt').should(
            'contain',
            'Type de publication',
        );
        cy.get('.notice dl span:nth-child(4) dt').should('contain', 'Mot clé');
        cy.get('.notice dl span:nth-child(5) dt').should(
            'contain',
            'Description',
        );
        cy.get('.notice dl span:nth-child(6) dt').should('contain', 'URL');
        cy.get('.notice dl span:nth-child(7) dt').should(
            'contain',
            'Fréquence',
        );
        cy.get('.notice dl span:nth-child(8) dt').should(
            'contain',
            'Relu par un comité de lecture',
        );
    });

    it('should change page', () => {
        cy.get('.record').should('be.visible');
        cy.get('.search-count').should('contain', '1 - 20 / 4968');
        cy.get('.pagination .current.page').should('contain', '1');
        cy.get('.pagination a.page').should('contain', '2');
        cy.get('.pagination a.page')
            .first()
            .click();
        cy.get('.record').should('be.visible');
        cy.get('.pagination .current.page').should('contain', '2');
        cy.get('.search-count').should('contain', '21 - 40 / 4968');
    });

    it('should translate publicationSearchResult', () => {
        cy.get('.navbar.navbar-default').should('be.visible');
        cy.get('.limiters').should('contain', 'Relu par un comité de lecture');
        cy.get('.navbar.navbar-default .language').should('contain', 'fr');
        cy.get('.sidebar h3').should('contain', 'Affiner votre recherche');
        cy.get('.navbar.navbar-default .language').click();
        cy.get('#en').should('be.visible');
        cy.get('#en').click();
        cy.get('.navbar.navbar-default .language').should('contain', 'en');
        cy.get('.limiters').should('contain', 'Peer reviewed');
        cy.get('.sidebar h3').should('contain', 'Refine your search');
    });
});
