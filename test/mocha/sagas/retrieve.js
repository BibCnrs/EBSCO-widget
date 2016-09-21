import { put, select, call } from 'redux-saga/effects';

import retrieve from '../../../lib/sagas/retrieve';
import actions, { SEARCH, LOGOUT } from '../../../lib/actions';
import fetch from '../../../lib/sagas/fetch';
import * as fromState from '../../../lib/selectors';

describe('sagas retrieve', function () {
    let iterator;

    beforeEach(function () {
        iterator = retrieve('id', 'category');
    });

    it('should put retrievePending', function () {
        let next = iterator.next();
        assert.deepEqual(next.value, put(actions.retrievePending('category', 'id')));
    });

    it('should select retrieveRequest', function () {
        iterator.next();
        let next = iterator.next();
        assert.deepEqual(next.value, select(fromState.getRetrieveRequest, 'id'));
    });

    it('should call fetch with request', function () {
        iterator.next();
        iterator.next();
        let next = iterator.next('request');
        assert.deepEqual(next.value, call(fetch, 'request', [SEARCH, LOGOUT]));
    });

    it('should put actions.retrieveError if fetch return an error', function () {
        iterator.next();
        iterator.next();
        iterator.next('request');
        let next = iterator.next({ error: 'boom' });
        assert.deepEqual(next.value, put(actions.retrieveError('category', 'id', 'boom')));
    });

    it('should put actions.retrieveCancel if fetch return cancel', function () {
        iterator.next();
        iterator.next();
        iterator.next('request');
        let next = iterator.next({ cancel: true });
        assert.deepEqual(next.value, put(actions.retrieveCancel('category', 'id')));
    });

    it('should put actions.retrieveSuccess if fetch return response', function () {
        iterator.next();
        iterator.next();
        iterator.next('request');
        let next = iterator.next({ response: 'response' });
        assert.deepEqual(next.value, put(actions.retrieveSuccess('category', 'id', 'response')));
    });

});
