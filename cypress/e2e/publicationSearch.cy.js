// This file is not compliant with the testing-library doctrine. Should be refactored to be more user-centric.
import initialState from '../data/publicationSearch.json';

describe('publicationSearch', () => {
    beforeEach(function() {
        cy.visit('/', {
            onBeforeLoad: win => {
                win.initialState = initialState;
            },
        });
    });

    it('should display publication search result when triggering search', () => {
        cy.get('.navbar.navbar-default').should('be.visible');
        cy.get('.navbar.navbar-default .active').should(
            'contain',
            'Revue, ouvrage',
        );
        cy.get('.search-input .term input').type('study');
        cy.get('.search-fetch button').click();
        cy.get('.search-result').should('be.visible');
        cy.get('.record').should('have.length', 20);
    });

    it('should trigger a2z search result when clicking on a letter', () => {
        cy.get('.navbar.navbar-default').should('be.visible');
        cy.get('.navbar.navbar-default .active').should(
            'contain',
            'Revue, ouvrage',
        );
        cy.get('.a2z-search .first.letters').should(
            'contain',
            'A B C D E F G H I J K L M N O P Q R S T U V W X Y Z 0-9',
        );
        cy.get('.a2z-search .second.letters').should('not.exist');
        cy.get('.letter_B').click();
        cy.get('.a2z-search .second.letters').should(
            'contain',
            'BA BB BC BD BE BF BG BH BI BJ BK BL BM BN BO BP BQ BR BS BT BU BV BW BX BY BZ',
        );
        cy.get('.search-input .term input').should('have.value', 'B*');
        cy.get('.search-result').should('be.visible');
        cy.get('.record').should('have.length', 20);
    });

    it('should translate PublicationSearch', () => {
        cy.get('.navbar.navbar-default').should('be.visible');
        cy.get('.navbar.navbar-default').should('contain', 'Article');
        cy.get('.navbar.navbar-default').should('contain', 'Revue, ouvrage');
        cy.get('.navbar.navbar-default .language').should('contain', 'fr');
        cy.get('.search .search-input .term input').should(
            'have.attr',
            'placeholder',
            'Rechercher des titres de revues, de livres...',
        );
        cy.get('.search-fetch button').should(
            'have.attr',
            'aria-label',
            'Lancer la recherche',
        );
        cy.get('.navbar.navbar-default .language').click();
        cy.get('#en').should('be.visible');
        cy.get('#en').click();
        cy.get('.navbar.navbar-default .language').should('contain', 'en');
        cy.get('.search .search-input .term input').should(
            'have.attr',
            'placeholder',
            'Search journal titles, book titles...',
        );
        cy.get('.search-fetch button').should(
            'have.attr',
            'aria-label',
            'Launch search',
        );
    });
});
