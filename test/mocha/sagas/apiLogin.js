import { put, select, call } from 'redux-saga/effects';

import { apiLogin } from '../../../lib/sagas/apiLogin';
import * as fromState from '../../../lib/reducers';
import fetch from '../../../lib/sagas/fetch';
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
        assert.deepEqual(next.value, select(fromState.getApiLoginRequest));
    });

    it('should call the fetch for the apiLoginRequest', function () {
        iterator.next();
        const next = iterator.next({ request: 'object' });

        assert.deepEqual(next.value, call(fetch, { request: 'object' }));
    });

    it('should trigger loginCancel if receiving cancel', function () {
        iterator.next();
        iterator.next({ request: 'object' });
        const next = iterator.next({ cancel: true, response: 'response' });

        assert.deepEqual(next.value, put(actions.loginCancel()));
        assert.isTrue(iterator.next().done);
    });

    it('should trigger loginError if receiving error', function () {
        iterator.next();
        iterator.next({ request: 'object' });
        const next = iterator.next({ response: 'response', error: 'error' });

        assert.deepEqual(next.value, put(actions.loginError('error')));
        assert.isTrue(iterator.next().done);
    });

    it('should trigger loginSuccess if receiving response with no error', function () {
        iterator.next();
        iterator.next({ request: 'object' });
        const next = iterator.next({ response: 'response' });

        assert.deepEqual(next.value, put(actions.loginSuccess('response')));
    });

});
