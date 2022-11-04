// This file is not compliant with the testing-library doctrine. Should be refactored to be more user-centric.
import initialState from '../data/articleSearchResult.json';

describe('articleSearchResult', () => {
    beforeEach(function() {
        cy.visit('/', {
            onBeforeLoad: win => {
                win.initialState = initialState;
            },
        });
    });

    it('should retrieve clicked article', () => {
        cy.get('.record').should('be.visible');
        cy.get('.record_list .notice-opener')
            .first()
            .click();
        cy.get('.notice').should('be.visible');
        cy.get('.notice dl span:nth-child(1) dt').should('contain', 'Auteur');
        cy.get('.notice dl span:nth-child(2) dt').should('contain', 'Source');
        cy.get('.notice dl span:nth-child(3) dt').should(
            'contain',
            'Année de publication',
        );
        cy.get('.notice dl span:nth-child(4) dt').should('contain', 'Mot clé');
        cy.get('.notice dl span:nth-child(5) dt').should('contain', 'Résumé');
        cy.get('.notice dl span:nth-child(6) dt').should(
            'contain',
            'Type de document',
        );
        cy.get('.notice dl span:nth-child(7) dt').should('contain', 'Langue');
        cy.get('.notice dl span:nth-child(8) dt').should('contain', 'ISSN');
        cy.get('.notice dl span:nth-child(9) dt').should(
            'contain',
            "Numéro d'accès",
        );
        cy.get('.notice dl span:nth-child(10) dt').should(
            'contain',
            'Airiti Library eBooks & Journals - 華藝線上圖書館',
        );
    });

    it('should change page', () => {
        cy.get('.record').should('be.visible');
        cy.get('.search-count').should('contain', '1 - 10 / 516730');
        cy.get('.pagination .current.page').should('contain', '1');
        cy.get('.pagination a.page')
            .first()
            .should('contain', '2');
        cy.get('.pagination a.page')
            .first()
            .click();
        cy.get('.record').should('be.visible');
        cy.get('.pagination .current.page').should('contain', '2');
        cy.get('.search-count').should('contain', '11 - 20 / 516730');
    });

    it('should display facet', () => {
        cy.get('.record').should('be.visible');
        cy.get('.active_facet').should('have.length', 1);
        cy.get('.active_facet .header .title').should(
            'contain',
            'Réinitialiser vos filtres',
        );
        cy.get('.available_facets .facet:nth-child(1) .header .title').should(
            'contain',
            'Type de ressource (14)',
        );
        cy.get(
            '.available_facets .facet:nth-child(1) .facet_values .facet_value',
        ).should('have.length', 3);
        cy.get('.available_facets .facet:nth-child(1) .facet_values', {
            timeout: 2000,
        }).should('contain', 'Academic Journals (237702)');
        cy.get('.available_facets .facet:nth-child(1) .header .more').click();
        cy.get('.available_facets', { timeout: 5000 }).should('be.visible');
        cy.get(
            '.available_facets .facet:nth-child(1) .facet_values .facet_value',
        ).should('have.length', 14);
        cy.get(
            '.available_facets .facet:nth-child(1) .facet_values .facet_value:nth-child(1)',
        ).click();
        cy.get('.available_facets', { timeout: 5000 }).should('be.visible');
        cy.get('.active_facet .header .title').should(
            'contain',
            'Réinitialiser vos filtres',
        );
        cy.get('.active_facet .facet_values .facet_value', {
            timeout: 5000,
        }).should('have.length', 1);
        cy.get('.active_facet .facet_values').should(
            'contain',
            'Academic Journals',
        );
    });

    it('should translate articleSearchResult', () => {
        cy.get('.record').should('be.visible');
        cy.findByText('Texte Intégral').should('exist');
        cy.findByText('Relu par un comité de lecture').should('exist');
        cy.get('.limiters .publication-date-limiter .boundaries .to').should(
            'contain',
            'à',
        );
        cy.get('.navbar.navbar-default .language').should('contain', 'fr');
        cy.findByText('Affiner votre recherche').should('exist');

        cy.get('.navbar.navbar-default .language', { timeout: 1000 }).click();
        cy.findByText('english', { timeout: 1000 }).should('exist');
        cy.findByText('english', { timeout: 1000 }).click();
        cy.get('.navbar.navbar-default .language', { timeout: 1000 }).contains(
            'en',
        );

        cy.findByText('Full text').should('exist');
        cy.findByText('Peer reviewed').should('exist');
        cy.get('.limiters .publication-date-limiter .boundaries .to').should(
            'contain',
            'to',
        );
        cy.get('.sidebar h3', { timeout: 10000 }).should(
            'contain',
            'Refine your search',
        );
    });
});
