// This file is not compliant with the testing-library doctrine. Should be refactored to be more user-centric.
import initialState from '../data/authenticationModal.json';

describe('authenticationModal', () => {
    beforeEach(function() {
        cy.visit('/', {
            onBeforeLoad: win => {
                win.initialState = initialState;
            },
        });
    });

    it('should display Unauthorized error if wrong username and password when using api button', () => {
        cy.get('.authentication .modal-dialog').should('be.visible');
        cy.get('.inist-button').click();
        cy.get('.username').should('be.visible');
        cy.get('.username').type('nightwatch');
        cy.get('.password').type('password');
        cy.get('button.api').click();
        cy.get('.error').should('be.visible');
        cy.get('.error').contains(
            `L'identifiant/mot de passe saisi n'a pas permis de vous connecter au portail, veuillez essayer à nouveau en majuscule sans espace. Si le problème persiste, n'hésitez pas à contacter assistance-portail@inist.fr`,
        );
        cy.get('.navbar.navbar-default .active').contains('Revue, ouvrage');
    });
});
