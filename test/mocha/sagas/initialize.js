import { put, select, call } from 'redux-saga/effects';

import {
    initialize,
    retrieveLoginData,
    initializeAllDomains,
} from '../../../lib/sagas/initialize';
import updateDomain from '../../../lib/sagas/updateDomain';
import * as fromState from '../../../lib/selectors';
import fetch from '../../../lib/sagas/fetch';
import { localStorage, sessionStorage } from '../../../lib/services/storage';
import actions from '../../../lib/actions';

describe('sagas initialize', function() {
    describe('initialize', function() {
        let iterator;
        beforeEach(function() {
            iterator = initialize();
        });

        it('should call localStorage.getItem EBSCO_WIDGET_history', function() {
            assert.deepEqual(
                iterator.next().value,
                call(localStorage.getItem, 'EBSCO_WIDGET_history'),
            );
        });

        it('should put setHistory then selectAllDomains if receiving history', function() {
            iterator.next();
            assert.deepEqual(
                iterator.next('history').value,
                put(actions.setHistory('history')),
            );
            assert.deepEqual(
                iterator.next().value,
                select(fromState.getAllDomains),
            );
        });

        it('should select allDomains if receiving no history', function() {
            iterator.next();
            assert.deepEqual(
                iterator.next().value,
                select(fromState.getAllDomains),
            );
        });

        it('should call initializeAllDomains if receiving no domains before calling updateDomain', function() {
            iterator.next();
            iterator.next();
            assert.deepEqual(
                iterator.next([]).value,
                call(initializeAllDomains),
            );
            assert.deepEqual(iterator.next().value, call(updateDomain));
        });

        it('should call updateDomain and select isLoggingWithRenater', function() {
            iterator.next();
            iterator.next();
            assert.deepEqual(
                iterator.next(['insb', 'inshs']).value,
                call(updateDomain),
            );
            assert.deepEqual(
                iterator.next().value,
                select(fromState.isLoggingWithRenater),
            );
        });

        it('should call retrieveLoginData then localStorage.getItem if isLoggingWithRenater is true', function() {
            iterator.next();
            iterator.next();
            iterator.next(['insb', 'inshs']);
            iterator.next();
            assert.deepEqual(
                iterator.next(true).value,
                call(retrieveLoginData),
            );
            assert.isTrue(iterator.next().done);
        });

        it('should select isUserLogged', function() {
            iterator.next();
            iterator.next();
            iterator.next(['insb', 'inshs']);
            iterator.next();
            assert.deepEqual(
                iterator.next().value,
                select(fromState.isUserLogged),
            );
        });

        it('should select canPersistHistoryOnServer', function() {
            iterator.next();
            iterator.next();
            iterator.next(['insb', 'inshs']);
            iterator.next();
            iterator.next();
            assert.deepEqual(
                iterator.next().value,
                select(fromState.canPersistHistoryOnServer),
            );
        });

        it('should put loadHistoryPage if user is logged in and can persist history on server', function() {
            iterator.next();
            iterator.next();
            iterator.next(['insb', 'inshs']);
            iterator.next();
            iterator.next();
            iterator.next(true);
            assert.deepEqual(
                iterator.next(true).value,
                put(actions.loadHistoryPage()),
            );
        });

        it('should select getQueryListTerm', function() {
            iterator.next();
            iterator.next();
            iterator.next(['insb', 'inshs']);
            iterator.next();
            iterator.next();
            iterator.next();
            assert.deepEqual(
                iterator.next().value,
                select(fromState.getQueryListTerm),
            );
        });

        it('should select getLocation', function() {
            iterator.next();
            iterator.next();
            iterator.next(['insb', 'inshs']);
            iterator.next();
            iterator.next();
            iterator.next();
            iterator.next();
            assert.deepEqual(
                iterator.next().value,
                select(fromState.getLocation),
            );
        });

        it('should put search() if term is available', function() {
            iterator.next();
            iterator.next();
            iterator.next(['insb', 'inshs']);
            iterator.next();
            iterator.next();
            iterator.next();
            iterator.next();
            iterator.next('foo');
            assert.deepEqual(
                iterator.next('bar').value,
                put(actions.search('bar')),
            );
        });

        it('should put showResult(false) if term is not false', function() {
            iterator.next();
            iterator.next();
            iterator.next(['insb', 'inshs']);
            iterator.next();
            iterator.next();
            iterator.next();
            iterator.next();
            iterator.next();
            assert.deepEqual(
                iterator.next(false).value,
                put(actions.showResult(false)),
            );
        });
    });

    describe('retrieveLoginData', function() {
        let iterator, domain;
        beforeEach(function() {
            domain = 'insb';
            iterator = retrieveLoginData(domain);
        });

        it('should select getLoginRequest and call fetch with it', function() {
            let next = iterator.next();
            assert.deepEqual(next.value, select(fromState.getGetLoginRequest));
            next = iterator.next({ getLogin: 'request' });
            assert.deepEqual(next.value, call(fetch, { getLogin: 'request' }));
        });

        it('should put loginError if getLogin return an error other than Unauthorized', function() {
            iterator.next();
            iterator.next({ getLogin: 'request' });
            const next = iterator.next({ error: new Error('boom') });
            assert.deepEqual(
                next.value,
                put(actions.loginError(new Error('boom'))),
            );
        });

        it('should put loginCancel if error unauthorized', function() {
            iterator.next();
            iterator.next({ getLogin: 'request' });
            const next = iterator.next({ error: new Error('Unauthorized') });
            assert.deepEqual(next.value, put(actions.loginCancel()));
        });

        it('should end if no response nor error', function() {
            iterator.next();
            iterator.next({ getLogin: 'request' });
            const next = iterator.next({});
            assert.isTrue(next.done);
        });

        it('should put loginSuccess if response', function() {
            const response = {
                token: 'token',
                username: 'john',
                domains: ['insb', 'inshs'],
            };
            iterator.next();
            iterator.next({ getLogin: 'request' });
            const next = iterator.next({ response });
            assert.deepEqual(next.value, put(actions.loginSuccess(response)));
        });
    });

    describe('initializeAllDomains', function() {
        let iterator;
        beforeEach(function() {
            iterator = initializeAllDomains();
        });

        it('should select allDomains', function() {
            const next = iterator.next();
            assert.deepEqual(next.value, select(fromState.getAllDomains));
        });

        it('should end if at least one domain is returned', function() {
            iterator.next();
            const next = iterator.next(['INSHS']);
            assert.isTrue(next.done);
        });

        it('should fetch domains if none are returned', function() {
            iterator.next();
            let next = iterator.next([]);
            assert.deepEqual(next.value, select(fromState.getDomainsRequest));
            next = iterator.next({ domains: 'request' });
            assert.deepEqual(next.value, call(fetch, { domains: 'request' }));
        });

        it('should end if fetch domains return an error', function() {
            iterator.next();
            iterator.next([]);
            iterator.next({ domains: 'request' });
            let next = iterator.next({ error: 'error', response: 'response' });
            assert.deepEqual(
                next.value,
                put(actions.fetchDomainError('error')),
            );
            next = iterator.next();
            assert.isTrue(next.done);
        });

        it('should call sessionStorage.setItem with fetch resposne', function() {
            iterator.next();
            iterator.next([]);
            iterator.next({ domains: 'request' });
            const next = iterator.next({ response: 'response' });
            assert.deepEqual(
                next.value,
                call(
                    sessionStorage.setItem,
                    'EBSCO_WIDGET_allDomains',
                    'response',
                ),
            );
        });
    });

    describe('updateDomain', function() {
        let iterator;
        beforeEach(function() {
            iterator = updateDomain();
        });

        it('should select InitialDomains', function() {
            const next = iterator.next();
            assert.deepEqual(next.value, select(fromState.getInitialDomains));
        });

        it('should put changeDomain for article if receiving a domain for article', function() {
            iterator.next();
            const next = iterator.next({ article: 'INSHS' });
            assert.deepEqual(
                next.value,
                put(actions.changeDomain('article', 'INSHS')),
            );
        });

        it('should put changeDomain for publication if receiving a domain for publication', function() {
            iterator.next();
            const next = iterator.next({ publication: 'INSHS' });
            assert.deepEqual(
                next.value,
                put(actions.changeDomain('publication', 'INSHS')),
            );
        });

        it('should put changeDomain for all category if receiving a domain for all of them', function() {
            iterator.next();
            let next = iterator.next({ article: 'INSB', publication: 'INSMI' });
            assert.deepEqual(
                next.value,
                put(actions.changeDomain('article', 'INSB')),
            );
            next = iterator.next();
            assert.deepEqual(
                next.value,
                put(actions.changeDomain('publication', 'INSMI')),
            );
        });
    });
});
