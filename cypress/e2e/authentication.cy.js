// This file is not compliant with the testing-library doctrine. Should be refactored to be more user-centric.
import initialState from '../data/authentication.json';

describe('authentication', () => {
    beforeEach(function() {
        cy.visit('/', {
            onBeforeLoad: win => {
                win.initialState = initialState;
            },
        });
    });

    it('should display login modal', () => {
        cy.findByText('Connexion').click();
        cy.get('.authentication .modal-dialog').should('be.visible');
        cy.get('.janus').should(
            'contain',
            "Via le gestionnaire d'identité janus",
        );
        cy.get('.inist-button')
            .should('contain', "Via votre ancien code d'accès portail")
            .click();
        cy.get('.username').type('test');
        cy.get('.password').type('secret');
        cy.get('button.api').click();
        cy.get('.navbar.navbar-default').should('be.visible');
    });
});
