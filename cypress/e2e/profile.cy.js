// This file is not compliant with the testing-library doctrine. Should be refactored to be more user-centric.
import initialState from '../data/profile.json';
import initialStateNotLogged from '../data/profileNotLogged.json';
import initialStateInistAccount from '../data/profileInistAccount.json';

describe('profile', () => {
    beforeEach(function() {
        cy.visit('/', {
            onBeforeLoad: win => {
                win.initialState = initialState;
            },
        });
    });

    it('should allow to add resource from databases', () => {
        cy.get('.nav-db').click();
        cy.get('.databases').should('be.visible');
        cy.contains('.databases .db .title', 'Test add');
        cy.get('.letter_t .bookmark-button').click();
        cy.get('.profile-button').click();
        cy.get('.favourite-resource__list').should('be.visible');
        cy.contains('.favourite-resource__item:nth-child(1)', 'Test add');
        cy.contains('.favourite-resource__item:nth-child(2)', '.Test : CNRS');
        cy.contains('.favourite-resource__item:nth-child(3)', 'Wikipedia');
        cy.contains('.favourite-resource__item:nth-child(4)', 'google');
        cy.contains('.favourite-resource__item:nth-child(5)', 'bibcnrs');
    });

    it('should allow to add resource from publication', () => {
        cy.get('.nav-publication').click();
        cy.get('.record_list').should('be.visible');
        cy.contains(
            '.record_list .record .fetch-link',
            'The hitchhiker guide to the galaxy',
        );
        cy.get('.bookmark-button').click();
        cy.get('.profile-button').click();
        cy.get('.favourite-resource__list').should('be.visible');
        cy.contains(
            '.favourite-resource__item:nth-child(1)',
            'The hitchhiker guide to the galaxy',
        );
        cy.contains('.favourite-resource__item:nth-child(2)', '.Test : CNRS');
        cy.contains('.favourite-resource__item:nth-child(3)', 'Wikipedia');
        cy.contains('.favourite-resource__item:nth-child(4)', 'google');
        cy.contains('.favourite-resource__item:nth-child(5)', 'bibcnrs');
    });

    it('clicking on bookmark button should remove an alredy added resources', () => {
        cy.get('.nav-db').click();
        cy.get('.databases').should('be.visible');
        cy.contains('.databases .letter_w .db .title', 'Wikipedia');
        cy.get('.letter_w .bookmark-button').click();
        cy.get('.profile').should('be.visible');
        cy.get('.favourite-resource__list').should('be.visible');
        cy.contains('.favourite-resource__item:nth-child(1)', '.Test : CNRS');
        cy.contains('.favourite-resource__item:nth-child(2)', 'google');
        cy.contains('.favourite-resource__item:nth-child(3)', 'bibcnrs');
    });
});

describe('profile not logged', () => {
    beforeEach(function() {
        cy.visit('/', {
            onBeforeLoad: win => {
                win.initialState = initialStateNotLogged;
            },
        });
    });

    it('should hide profile and bookmark button when not logged', () => {
        cy.get('.profile').should('not.exist');
        cy.get('.bookmark-button').should('not.exist');
    });
});

describe('profile inist account', () => {
    beforeEach(function() {
        cy.visit('/', {
            onBeforeLoad: win => {
                win.initialState = initialStateInistAccount;
            },
        });
    });

    it('should hide profile and bookmark button when logged with inist account', () => {
        cy.get('.profile').should('not.exist');
        cy.get('.bookmark-button').should('not.exist');
    });
});
