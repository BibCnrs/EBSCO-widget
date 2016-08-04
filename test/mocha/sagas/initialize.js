import { put, select, call } from 'redux-saga/effects';

import { initialize, initializeLogin, initializeAllDomains } from '../../../lib/sagas/initialize';
import * as fromState from '../../../lib/reducers';
import fetch from '../../../lib/sagas/fetch';
import { localStorage, sessionStorage } from '../../../lib/services/storage';
import actions from '../../../lib/actions';

describe('sagas initialize', function () {
    describe('initialize', function () {

        let iterator;
        let action = {
            domain: 'insb'
        };
        beforeEach(function () {
            iterator = initialize(action);
        });

        it('should select isUserLogged', function () {
            const next = iterator.next();
            assert.deepEqual(next.value, select(fromState.isUserLogged));
        });

        it('should call initializeLogin then localStorage.getItem if isUserLogged is false', function () {
            iterator.next();
            let next = iterator.next(false);
            assert.deepEqual(next.value, call(initializeLogin));
            next = iterator.next();
            assert.deepEqual(next.value, call(localStorage.getItem, 'EBSCO_WIDGET_history'));
        });

        it('should call localStorage.getItem EBSCO_WIDGET_history if isUserLogged is false', function () {
            iterator.next();
            const next = iterator.next(true);
            assert.deepEqual(next.value, call(localStorage.getItem, 'EBSCO_WIDGET_history'));
        });

        it('should put setHistory then selectAllDomains if receiving history', function () {
            iterator.next();
            iterator.next(true);
            let next = iterator.next('history');
            assert.deepEqual(next.value, put(actions.setHistory('history')));
            next = iterator.next();
            assert.deepEqual(next.value, select(fromState.getAllDomains));
        });

        it('should select allDomains if receiving no history', function () {
            iterator.next();
            iterator.next(true);
            const next = iterator.next();
            assert.deepEqual(next.value, select(fromState.getAllDomains));
        });

        it('should call initializeAllDomains if receiving no domains before put changeDomain', function () {
            iterator.next();
            iterator.next(true);
            iterator.next();
            let next = iterator.next([]);
            assert.deepEqual(next.value, call(initializeAllDomains));
            next = iterator.next();
            assert.deepEqual(next.value, put(actions.changeDomain('article', action.domain)));
        });

        it('should before put changeDomain if receiving domains', function () {
            iterator.next();
            iterator.next(true);
            iterator.next();
            let next = iterator.next(['insb', 'inshs']);
            assert.deepEqual(next.value, put(actions.changeDomain('article', action.domain)));
            next = iterator.next();
            assert.deepEqual(next.value, put(actions.changeDomain('publication', action.domain)));
            next = iterator.next();
            assert.deepEqual(next.value, put(actions.changeDomain('a2z', action.domain)));
        });
    });

    describe('initializeLogin', function() {
        let iterator;
        beforeEach(function () {
            iterator = initializeLogin();
        });

        it('should select getLoginRequest and call fetch with it', function () {
            let next = iterator.next();
            assert.deepEqual(next.value, select(fromState.getGetLoginRequest));
            next = iterator.next({ getLogin: 'request' });
            assert.deepEqual(next.value, call(fetch, { getLogin: 'request' }));
        });

        it('should throw an error if getLogin return an error other than Unauthorized', function () {
            iterator.next();
            iterator.next({ getLogin: 'request' });
            assert.throws(function () { iterator.next({ error: new Error('boom') }); }, 'boom');
        });

        it('should put apiLoginSuccess if error unauthorized and response', function () {
            const response = {
                token: 'token',
                username: 'john',
                domains: [ 'insb', 'inshs']
            };
            iterator.next();
            iterator.next({ getLogin: 'request' });
            let next = iterator.next({ error: new Error('Unauthorized'), response });
            assert.deepEqual(next.value, put(actions.apiLoginSuccess(response)));
            next = iterator.next();
            assert.deepEqual(next.value, call(sessionStorage.setItem, 'EBSCO_WIDGET_username', response.username));
            next = iterator.next();
            assert.deepEqual(next.value, call(sessionStorage.setItem, 'EBSCO_WIDGET_availableDomains', response.domains));
            next = iterator.next();
            assert.deepEqual(next.value, call(sessionStorage.setItem, 'EBSCO_WIDGET_domain', response.domains[0]));
            next = iterator.next();
            assert.deepEqual(next.value, select(fromState.getPausedAction));
            next = iterator.next({ paused: 'action' });
            assert.deepEqual(next.value, put({ paused: 'action' }));
        });

        it('should end if no response and Unauthorized error', function () {
            iterator.next();
            iterator.next({ getLogin: 'request' });
            const next = iterator.next({ error: new Error('Unauthorized') });
            assert.isTrue(next.done);
        });

        it('should put apiLoginSuccess if response', function () {
            const response = {
                token: 'token',
                username: 'john',
                domains: [ 'insb', 'inshs']
            };
            iterator.next();
            iterator.next({ getLogin: 'request' });
            let next = iterator.next({ response });
            assert.deepEqual(next.value, put(actions.apiLoginSuccess(response)));
            next = iterator.next();
            assert.deepEqual(next.value, call(sessionStorage.setItem, 'EBSCO_WIDGET_username', response.username));
            next = iterator.next();
            assert.deepEqual(next.value, call(sessionStorage.setItem, 'EBSCO_WIDGET_availableDomains', response.domains));
            next = iterator.next();
            assert.deepEqual(next.value, call(sessionStorage.setItem, 'EBSCO_WIDGET_domain', response.domains[0]));
            next = iterator.next();
            assert.deepEqual(next.value, select(fromState.getPausedAction));
            next = iterator.next({ paused: 'action' });
            assert.deepEqual(next.value, put({ paused: 'action' }));
        });

    });

    describe('initializeAllDomains', function () {
        let iterator;
        beforeEach(function () {
            iterator = initializeAllDomains();
        });

        it('should call sessionStorage.getItem EBSCO_WIDGET_allDomains', function () {
            const next = iterator.next();
            assert.deepEqual(next.value, call(sessionStorage.getItem, 'EBSCO_WIDGET_allDomains'));
        });

        it('should fetch domains if none are returned', function () {
            iterator.next();
            let next = iterator.next();
            assert.deepEqual(next.value, select(fromState.getDomainsRequest));
            next = iterator.next({ domains: 'request' });
            assert.deepEqual(next.value, call(fetch, { domains: 'request' }));
        });

        it('should end if fetch domains return an error', function () {
            iterator.next();
            iterator.next();
            iterator.next({ domains: 'request' });
            const next = iterator.next({ error: 'error', response: 'response' });
            assert.isTrue(next.done);
        });

        it('should call sessionStorage.setItem with fetch resposne', function () {
            iterator.next();
            iterator.next();
            iterator.next({ domains: 'request' });
            const next = iterator.next({ response: 'response' });
            assert.deepEqual(next.value, call(sessionStorage.setItem, 'EBSCO_WIDGET_allDomains', 'response'));
        });

        it('should put setAllDomains if domains are returned', function () {
            iterator.next();
            const next = iterator.next('domains');
            assert.deepEqual(next.value, put(actions.setAllDomains('domains')));
        });
    });

});
