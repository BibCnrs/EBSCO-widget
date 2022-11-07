// This file is not compliant with the testing-library doctrine. Should be refactored to be more user-centric.
import initialState from '../data/articleSearch.json';

describe('navigate between tab', () => {
    beforeEach(function() {
        cy.visit('/', {
            onBeforeLoad: win => {
                win.initialState = initialState;
            },
        });
    });

    it('should keep search term between tabs', () => {
        cy.get('.navbar.navbar-default').should('be.visible');
        cy.get('.navbar.navbar-default .active').should('contain', 'Article');
        cy.get('.term input').type('covid');
        cy.get('.nav-item.nav-publication').click();
        cy.get('.navbar.navbar-default').should('be.visible');
        cy.get('.navbar.navbar-default .active').should(
            'contain',
            'Revue, ouvrage',
        );
        cy.get('.term input').should('have.value', 'covid');
        cy.get('.nav-item.nav-metadore').click();
        cy.get('.navbar.navbar-default').should('be.visible');
        cy.get('.navbar.navbar-default .active').should(
            'contain',
            'Données de recherche',
        );
        cy.get('.term input').should('have.value', 'covid');
    });

    it('should trigger search when navigating between tabs after changing search term', () => {
        cy.get('.navbar.navbar-default').should('be.visible');
        cy.get('.navbar.navbar-default .active').should('contain', 'Article');
        cy.get('.term input').type('covid');
        cy.get('.nav-item.nav-publication').click();
        cy.get('.navbar.navbar-default').should('be.visible');
        cy.get('.navbar.navbar-default .active').should(
            'contain',
            'Revue, ouvrage',
        );
        cy.get('.search-result').should('be.visible');
        cy.get('.record').should('have.length', 20);
        cy.get('.nav-item.nav-metadore').click();
        cy.get('.navbar.navbar-default').should('be.visible');
        cy.get('.navbar.navbar-default .active').should(
            'contain',
            'Données de recherche',
        );
        cy.get('.search-result').should('be.visible');
        cy.get('.record').should('have.length', 20);
        cy.get('.nav-item.nav-article').click();
        cy.get('.navbar.navbar-default').should('be.visible');
        cy.get('.navbar.navbar-default .active').should('contain', 'Article');
        cy.get('.search-result-with-sidebar').should('be.visible');
        cy.get('.record').should('have.length', 20);
    });
});
