import { put, select, call } from 'redux-saga/effects';

import { initialize, retrieveLoginData, initializeAllDomains, updateDomain } from '../../../lib/sagas/initialize';
import * as fromState from '../../../lib/selectors';
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

        it('should call initializeAllDomains if receiving no domains before calling updateDomain', function () {
            iterator.next();
            iterator.next();
            let next = iterator.next([]);
            assert.deepEqual(next.value, call(initializeAllDomains));
            next = iterator.next();
            assert.deepEqual(next.value, call(updateDomain));
        });

        it('should call updateDomain and select isLoggingWithRenater', function () {
            iterator.next();
            iterator.next();
            let next = iterator.next(['insb', 'inshs']);
            assert.deepEqual(next.value, call(updateDomain));
            next = iterator.next();
            assert.deepEqual(next.value, select(fromState.isLoggingWithRenater));
        });

        it('should call retrieveLoginData then localStorage.getItem if isLoggingWithRenater is true', function () {
            iterator.next();
            iterator.next();
            iterator.next(['insb', 'inshs']);
            iterator.next();
            let next = iterator.next(true);
            assert.deepEqual(next.value, call(retrieveLoginData));
            next = iterator.next();
            assert.isTrue(next.done);
        });

        it('should select getQueryListTerm', function () {
            iterator.next();
            iterator.next();
            iterator.next(['insb', 'inshs']);
            iterator.next();
            const next = iterator.next();
            assert.deepEqual(next.value, select(fromState.getQueryListTerm));
        });

        it('should select getLocation', function () {
            iterator.next();
            iterator.next();
            iterator.next(['insb', 'inshs']);
            iterator.next();
            iterator.next();
            const next = iterator.next();
            assert.deepEqual(next.value, select(fromState.getLocation));
        });

        it('should put search() if term is available', function () {
            iterator.next();
            iterator.next();
            iterator.next(['insb', 'inshs']);
            iterator.next();
            iterator.next();
            iterator.next('foo');
            const next = iterator.next('bar');
            assert.deepEqual(next.value, put(actions.search('bar')));
        });

        it('should put showResult(false) if isLoggingWithRenater is false', function () {
            iterator.next();
            iterator.next();
            iterator.next(['insb', 'inshs']);
            iterator.next();
            iterator.next();
            iterator.next();
            const next = iterator.next(false);
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

        it('should select allDomains', function () {
            const next = iterator.next();
            assert.deepEqual(next.value, select(fromState.getAllDomains));
        });

        it('should end if at least one domain is returned', function () {
            iterator.next();
            const next = iterator.next(['INSHS']);
            assert.isTrue(next.done);
        });

        it('should fetch domains if none are returned', function () {
            iterator.next();
            let next = iterator.next([]);
            assert.deepEqual(next.value, select(fromState.getDomainsRequest));
            next = iterator.next({ domains: 'request' });
            assert.deepEqual(next.value, call(fetch, { domains: 'request' }));
        });

        it('should end if fetch domains return an error', function () {
            iterator.next();
            iterator.next([]);
            iterator.next({ domains: 'request' });
            let next = iterator.next({ error: 'error', response: 'response' });
            assert.deepEqual(next.value, put(actions.fetchDomainError('error')));
            next = iterator.next();
            assert.isTrue(next.done);
        });

        it('should call sessionStorage.setItem with fetch resposne', function () {
            iterator.next();
            iterator.next([]);
            iterator.next({ domains: 'request' });
            const next = iterator.next({ response: 'response' });
            assert.deepEqual(next.value, call(sessionStorage.setItem, 'EBSCO_WIDGET_allDomains', 'response'));
        });
    });

    describe('updateDomain', function() {
        let iterator;
        beforeEach(function () {
            iterator = updateDomain();
        });

        it('should select domainToUpdate', function() {
            const next = iterator.next();
            assert.deepEqual(next.value, select(fromState.getDomainToUpdate));
        });

        it('should put changeDomain for article if receiving a domain for article', function() {
            iterator.next();
            const next = iterator.next({ article: 'INSHS' });
            assert.deepEqual(next.value, put(actions.changeDomain('article', 'INSHS')));
        });

        it('should put changeDomain for publication if receiving a domain for publication', function() {
            iterator.next();
            const next = iterator.next({ publication: 'INSHS' });
            assert.deepEqual(next.value, put(actions.changeDomain('publication', 'INSHS')));
        });

        it('should put changeDomain for all category if receiving a domain for all of them', function() {
            iterator.next();
            let next = iterator.next({ article: 'INSB', publication: 'INSMI' });
            assert.deepEqual(next.value, put(actions.changeDomain('article', 'INSB')));
            next = iterator.next();
            assert.deepEqual(next.value, put(actions.changeDomain('publication', 'INSMI')));
        });
    });

});
