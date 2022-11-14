// This file is not compliant with the testing-library doctrine. Should be refactored to be more user-centric.
import initialState from '../data/history.json';

describe('history', () => {
    beforeEach(function() {
        cy.visit('/', {
            onBeforeLoad: win => {
                win.initialState = initialState;
            },
        });
    });

    it('should display history', () => {
        cy.get('.history').should('be.visible');
        cy.get('tr')
            .first()
            .children()
            .should('have.length', 5)
            .and('contain', 'Terme recherchés')
            .and('contain', 'Domaine')
            .and('contain', 'Limites')
            .and('contain', 'Facettes')
            .and('contain', 'Actions');

        cy.get('tr')
            .eq(1)
            .children()
            .should('have.length', 5)
            .and('contain', 'Tout: aids')
            .and('contain', 'vie')
            .and('contain', 'Texte intégral;')
            .and('contain', 'Date de publication: 1914/1918')
            .and('contain', '44 résultats');

        cy.get('tr')
            .eq(2)
            .children()
            .should('have.length', 5)
            .and('contain', 'Tout: phylloxera')
            .and('contain', 'vie')
            .and('contain', 'Texte intégral')
            .and('contain', '1189 résultats');
    });

    it('should reload search in history', () => {
        cy.get('.history').should('be.visible');
        cy.get('tr')
            .eq(1)
            .find('.edit')
            .click();
        cy.get('.term input').should('have.value', 'aids');
        cy.get('.fullText input').should('have.value', 'on');
        cy.get('.publication-date-limiter').should('be.visible');
        cy.get('.publication-date-limiter input.from').should(
            'have.value',
            '1914',
        );
        cy.get('.publication-date-limiter input.to').should(
            'have.value',
            '1918',
        );
    });

    it('should relaunch search in history', () => {
        cy.get('.history').should('be.visible');
        cy.get('tr')
            .eq(1)
            .find('.refresh')
            .click();
        cy.get('.term input').should('have.value', 'aids');
        cy.get('.fullText input').should('have.value', 'on');
        cy.get('.publication-date-limiter').should('be.visible');
        cy.get('.publication-date-limiter input.from').should(
            'have.value',
            '1914',
        );
        cy.get('.publication-date-limiter input.to').should(
            'have.value',
            '1918',
        );
        cy.get('.record').should('have.length', 20);
    });

    it('should delete search in history', () => {
        cy.get('.history').should('be.visible');
        cy.get('tr')
            .eq(1)
            .find('.delete')
            .click();
        cy.get('tr')
            .eq(1)
            .children()
            .should('have.length', 5)
            .and('contain', 'Tout: phylloxera')
            .and('contain', 'vie')
            .and('contain', 'Texte intégral')
            .and('contain', '1189 résultats');
    });

    it('should translate history', () => {
        cy.get('.history').should('be.visible');
        cy.get('tr')
            .first()
            .children()
            .should('have.length', 5)
            .and('contain', 'Terme recherchés')
            .and('contain', 'Domaine')
            .and('contain', 'Limites')
            .and('contain', 'Facettes')
            .and('contain', 'Actions');

        cy.get('tr')
            .eq(1)
            .children()
            .should('have.length', 5)
            .and('contain', 'Tout: aids')
            .and('contain', 'vie')
            .and('contain', 'Texte intégral;')
            .and('contain', 'Date de publication: 1914/1918')
            .and('contain', '44 résultats');

        cy.get('.navbar.navbar-default .language').should('contain', 'fr');
        cy.get('.navbar.navbar-default .language').click();
        cy.get('#en').click();
        cy.get('.navbar.navbar-default .language').should('contain', 'en');

        cy.get('tr')
            .first()
            .children()
            .should('have.length', 5)
            .and('contain', 'Searched terms')
            .and('contain', 'Discipline')
            .and('contain', 'Limits')
            .and('contain', 'Facets')
            .and('contain', 'Actions');

        cy.get('tr')
            .eq(1)
            .children()
            .should('have.length', 5)
            .and('contain', 'All: aids')
            .and('contain', 'vie')
            .and('contain', 'Full text;')
            .and('contain', 'Publication date: 1914/1918')
            .and('contain', '44 results');
    });
});
