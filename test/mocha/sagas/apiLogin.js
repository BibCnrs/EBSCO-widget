import { put, select, call } from 'redux-saga/effects';

import { apiLogin } from '../../../lib/sagas/apiLogin';
import * as fromState from '../../../lib/reducers';
import fetch from '../../../lib/sagas/fetch';
import { sessionStorage } from '../../../lib/services/storage';
import actions from '../../../lib/actions';

describe('sagas apiLogin', function () {
    let iterator;
    let action = {
        data: {
            username: 'john',
            password: 'secret'
        }
    };
    beforeEach(function () {
        iterator = apiLogin(action);
    });

    it('should select apiLoginRequest', function () {
        const next = iterator.next();
        assert.deepEqual(next.value, select(fromState.getApiLoginRequest, action.data));
    });

    it('should call the fetch for the apiLoginRequest', function () {
        iterator.next();
        const next = iterator.next({ request: 'object' });

        assert.deepEqual(next.value, call(fetch, { request: 'object' }));
    });

    it('should trigger apiLoginError if receiving error', function () {
        iterator.next();
        iterator.next({ request: 'object' });
        const next = iterator.next({ response: 'response', error: 'error' });

        assert.deepEqual(next.value, put(actions.apiLoginError('error')));
    });

    it('should trigger apiLoginSuccess if receiving response with no error', function () {
        iterator.next();
        iterator.next({ request: 'object' });
        const next = iterator.next({ response: 'response' });

        assert.deepEqual(next.value, put(actions.apiLoginSuccess('response')));
    });

    it('should stop if receiving cancel', function () {
        iterator.next();
        iterator.next({ request: 'object' });
        const next = iterator.next({ cancel: true, response: 'response' });

        assert.isTrue(next.done);
    });

    it('should call sessionStorage.setItem three times', function () {
        iterator.next();
        iterator.next({ request: 'object' });
        iterator.next({ response: { username: 'john', token: 'token', domains: ['insb', 'inshs'] } });

        let next = iterator.next();

        assert.deepEqual(next.value, call(sessionStorage.setItem, 'EBSCO_WIDGET_username', 'john'));
        next = iterator.next();
        assert.deepEqual(next.value, call(sessionStorage.setItem, 'EBSCO_WIDGET_availableDomains', ['insb', 'inshs']));
        next = iterator.next();
        assert.deepEqual(next.value, call(sessionStorage.setItem, 'EBSCO_WIDGET_domain', 'insb'));
    });

    it('should select pausedAction', function () {
        iterator.next();
        iterator.next({ request: 'object' });
        iterator.next({ response: { username: 'john', token: 'token', domains: ['insb', 'inshs'] } });
        iterator.next();
        iterator.next();
        iterator.next();

        const next = iterator.next();
        assert.deepEqual(next.value, select(fromState.getPausedAction));
    });

    it('should end if no pausedAction', function () {
        iterator.next();
        iterator.next({ request: 'object' });
        iterator.next({ response: { username: 'john', token: 'token', domains: ['insb', 'inshs'] } });
        iterator.next();
        iterator.next();
        iterator.next();

        iterator.next();
        const next = iterator.next(undefined);
        assert.isTrue(next.done);
    });

    it('should put retrieved pausedAction', function () {
        iterator.next();
        iterator.next({ request: 'object' });
        iterator.next({ response: { username: 'john', token: 'token', domains: ['insb', 'inshs'] } });
        iterator.next();
        iterator.next();
        iterator.next();

        iterator.next();
        const next = iterator.next({ type: 'PAUSED_ACTION'});
        assert.deepEqual(next.value, put({ type: 'PAUSED_ACTION' }));
    });

});
