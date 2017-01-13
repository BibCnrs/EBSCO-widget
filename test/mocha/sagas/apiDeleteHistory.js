import { put, select, call } from 'redux-saga/effects';

import { apiDeleteHistory } from '../../../lib/sagas/apiDeleteHistory';
import * as fromState from '../../../lib/selectors';
import fetch from '../../../lib/sagas/fetch';
import actions from '../../../lib/actions';

describe('sagas apiDeleteHistory', function () {
    let iterator;
    let action = {
        id: 'foo',
    };

    beforeEach(function () {
        iterator = apiDeleteHistory(action);
    });

    it('should select getApiDeleteHistoryRequest', function () {
        assert.deepEqual(iterator.next().value, select(fromState.getApiDeleteHistoryRequest));
    });

    it('should trigger deleteHistoryFromServerPending', function () {
        iterator.next();
        assert.deepEqual(iterator.next().value, put(actions.deleteHistoryFromServerPending()));
    });


    it('should call the fetch for the apiDeleteHistoryRequest', function () {
        iterator.next();
        iterator.next({ url: 'foo' });

        assert.deepEqual(iterator.next().value, call(fetch, { url: 'foo?id=foo' }, [], false));
    });

    it('should trigger deleteHistoryFromServerCancel if receiving cancel', function () {
        iterator.next();
        iterator.next({ url: 'foo' });
        iterator.next();
        const next = iterator.next({ cancel: true, response: 'response' });

        assert.deepEqual(next.value, put(actions.deleteHistoryFromServerCancel()));
        assert.isTrue(iterator.next().done);
    });

    it('should trigger deleteHistoryFromServerError if receiving error', function () {
        iterator.next();
        iterator.next({ url: 'foo' });
        iterator.next();
        const next = iterator.next({ response: 'response', error: 'error' });

        assert.deepEqual(next.value, put(actions.deleteHistoryFromServerError('error')));
        assert.isTrue(iterator.next().done);
    });

    it('should trigger deleteHistoryFromServerSuccess if receiving response with no error', function () {
        iterator.next();
        iterator.next({ url: 'foo' });
        iterator.next();
        const next = iterator.next({ response: 'response' });

        assert.deepEqual(next.value, put(actions.deleteHistoryFromServerSuccess('response')));
    });

});
