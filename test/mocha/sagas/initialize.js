import { put, select, call } from 'redux-saga/effects';

import { initialize, retrieveLoginData, initializeAllDomains } from '../../../lib/sagas/initialize';
import * as fromState from '../../../lib/reducers';
import fetch from '../../../lib/sagas/fetch';
import { localStorage, sessionStorage } from '../../../lib/services/storage';
import actions from '../../../lib/actions';

describe('sagas initialize', function () {
    describe('initialize', function () {

        let iterator;
        beforeEach(function () {
            iterator = initialize();
        });

        it('should call localStorage.getItem EBSCO_WIDGET_history', function () {
            const next = iterator.next();
            assert.deepEqual(next.value, call(localStorage.getItem, 'EBSCO_WIDGET_history'));
        });

        it('should put setHistory then selectAllDomains if receiving history', function () {
            iterator.next();
            let next = iterator.next('history');
            assert.deepEqual(next.value, put(actions.setHistory('history')));
            next = iterator.next();
            assert.deepEqual(next.value, select(fromState.getAllDomains));
        });

        it('should select allDomains if receiving no history', function () {
            iterator.next();
            const next = iterator.next();
            assert.deepEqual(next.value, select(fromState.getAllDomains));
        });

        it('should call initializeAllDomains if receiving no domains before select isLoggingWithRenater', function () {
            iterator.next();
            iterator.next();
            let next = iterator.next([]);
            assert.deepEqual(next.value, call(initializeAllDomains));
            next = iterator.next();
            assert.deepEqual(next.value, select(fromState.isLoggingWithRenater));
        });

        it('should select isLoggingWithRenater', function () {
            iterator.next();
            iterator.next();
            const next = iterator.next(['insb', 'inshs']);
            assert.deepEqual(next.value, select(fromState.isLoggingWithRenater));
        });

        it('should call retrieveLoginData then localStorage.getItem if isLoggingWithRenater is false', function () {
            iterator.next();
            iterator.next();
            iterator.next(['insb', 'inshs']);
            let next = iterator.next(false);
            assert.deepEqual(next.value, call(retrieveLoginData));
            next = iterator.next();
            assert.isTrue(next.done);
        });

        it('should put showResult(false) if isLoggingWithRenater is true', function () {
            iterator.next();
            iterator.next();
            iterator.next(['insb', 'inshs']);
            const next = iterator.next(true);
            assert.deepEqual(next.value, put(actions.showResult(false)));
        });
    });

    describe('retrieveLoginData', function() {
        let iterator, domain;
        beforeEach(function () {
            domain = 'insb';
            iterator = retrieveLoginData(domain);
        });

        it('should select getLoginRequest and call fetch with it', function () {
            let next = iterator.next();
            assert.deepEqual(next.value, select(fromState.getGetLoginRequest));
            next = iterator.next({ getLogin: 'request' });
            assert.deepEqual(next.value, call(fetch, { getLogin: 'request' }));
        });

        it('should put loginError if getLogin return an error other than Unauthorized', function () {
            iterator.next();
            iterator.next({ getLogin: 'request' });
            const next = iterator.next({ error: new Error('boom') });
            assert.deepEqual(next.value, put(actions.loginError(new Error('boom'))));
        });

        it('should put loginCancel if error unauthorized', function () {
            iterator.next();
            iterator.next({ getLogin: 'request' });
            const next = iterator.next({ error: new Error('Unauthorized') });
            assert.deepEqual(next.value, put(actions.loginCancel()));
        });

        it('should end if no response nor error', function () {
            iterator.next();
            iterator.next({ getLogin: 'request' });
            const next = iterator.next({});
            assert.isTrue(next.done);
        });

        it('should put loginSuccess if response', function () {
            const response = {
                token: 'token',
                username: 'john',
                domains: [ 'insb', 'inshs']
            };
            iterator.next();
            iterator.next({ getLogin: 'request' });
            const next = iterator.next({ response });
            assert.deepEqual(next.value, put(actions.loginSuccess(response)));
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
