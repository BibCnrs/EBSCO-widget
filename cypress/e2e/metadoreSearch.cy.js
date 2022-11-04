// This file is not compliant with the testing-library doctrine. Should be refactored to be more user-centric.
import initialState from '../data/metadoreSearch.json';

describe('metadoreSearch', () => {
    beforeEach(function() {
        cy.visit('/', {
            onBeforeLoad: win => {
                win.initialState = initialState;
            },
        });
    });

    it('should display metadore search result when triggering search', () => {
        cy.get('.navbar.navbar-default').should('be.visible');
        cy.get('.navbar.navbar-default .active').should(
            'contain',
            'Données de recherche',
        );
        cy.get('.search-input .term input').type('covid');
        cy.get('.search-fetch button').click();
        cy.get('.search-result').should('be.visible');
        cy.get('.record').should('have.length', 20);
    });

    it('should translate MetadoreSearch', () => {
        cy.get('.navbar.navbar-default').should('be.visible');
        cy.get('.navbar.navbar-default .active').should(
            'contain',
            'Données de recherche',
        );
        cy.get('.navbar.navbar-default .language').should('contain', 'fr');
        cy.get('.search-input .term input').should(
            'have.attr',
            'placeholder',
            'Recherche',
        );
        cy.findByLabelText('Rechercher').should('exist');
        cy.get('.navbar.navbar-default .language').click();
        cy.get('#en').should('be.visible');
        cy.get('#en').click();
        cy.get('.navbar.navbar-default .language').should('contain', 'en');
        cy.get('.navbar.navbar-default').should('contain', 'Research data');
        cy.get('.search-input .term input').should(
            'have.attr',
            'placeholder',
            'Search',
        );
        cy.findByLabelText('Search').should('exist');
    });
});
