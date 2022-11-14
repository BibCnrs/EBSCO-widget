import '@testing-library/cypress/add-commands';

Cypress.Commands.add('loadState', state => {
    cy.window().then(window => {
        window.store.dispatch({ type: 'SET_STATE', state: state });
    });
});
