// This file is not compliant with the testing-library doctrine. Should be refactored to be more user-centric.
import initialState from '../data/articleSearch.json';

describe('articleSearch', () => {
    beforeEach(function() {
        cy.visit('/', {
            onBeforeLoad: win => {
                win.initialState = initialState;
            },
        });
    });

    it('should display article search result when triggering search', () => {
        cy.findByText(/Article/i, { timeout: 1000 }).should('exist');
        cy.get('.term input').type('aids');
        cy.get('.search-fetch button').click();
        cy.get('.search-result-with-sidebar').should('exist');
        cy.get('.record').should('have.length', 20);
    });

    it('should translate ArticleSearch', () => {
        cy.get('.navbar.navbar-default', { timeout: 1000 }).contains('Article');
        cy.get('.navbar.navbar-default', { timeout: 1000 }).contains(
            'Revue, ouvrage',
        );
        cy.get('.navbar.navbar-default .language', { timeout: 1000 }).contains(
            'fr',
        );
        cy.get('.search-input .term input', { timeout: 1000 }).should(
            'have.attr',
            'placeholder',
            'Rechercher des articles, des chapitres de livre, des DOIs, des auteurs, des mots du résumé du titre, ISSN, ISBN.',
        );
        cy.findByLabelText('Rechercher', { timeout: 1000 }).should('exist');

        cy.get('.navbar.navbar-default .language', { timeout: 1000 }).click();
        cy.findByText('english', { timeout: 1000 }).should('exist');
        cy.findByText('english', { timeout: 1000 }).click();
        cy.get('.navbar.navbar-default .language', { timeout: 1000 }).contains(
            'en',
        );

        cy.get('.navbar.navbar-default', { timeout: 1000 }).contains('Article');
        cy.get('.navbar.navbar-default', { timeout: 1000 }).contains(
            'Journal, book',
        );
        cy.get('.search-input .term input', { timeout: 1000 }).should(
            'have.attr',
            'placeholder',
            'Search articles, book chapters, DOIs, authors, words from the title abstract, ISSN, ISBN.',
        );
        cy.findByLabelText('Search', { timeout: 1000 }).should('exist');
    });
});
