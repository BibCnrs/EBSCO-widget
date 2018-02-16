import { put, select, call } from 'redux-saga/effects';

import { apiLoadHistoryPage } from '../../../lib/sagas/apiLoadHistoryPage';
import * as fromState from '../../../lib/selectors';
import fetch from '../../../lib/sagas/fetch';
import actions from '../../../lib/actions';

describe('sagas apiLoadHistoryPage', function() {
    let iterator;
    let action = {
        page: 10,
    };

    beforeEach(function() {
        iterator = apiLoadHistoryPage(action);
    });

    it('should select getApiLoadHistoryRequest', function() {
        assert.deepEqual(
            iterator.next().value,
            select(fromState.getApiLoadHistoryRequest),
        );
    });

    it('should trigger loadHistoryPagePending', function() {
        iterator.next();
        assert.deepEqual(
            iterator.next().value,
            put(actions.loadHistoryPagePending()),
        );
    });

    it('should call the fetch for the apiLoadHistoryPageRequest', function() {
        iterator.next();
        iterator.next({ url: 'foo' });

        assert.deepEqual(
            iterator.next().value,
            call(fetch, { url: 'foo?limit=5&offset=45' }, [], false),
        );
    });

    it('should trigger loadHistoryPageCancel if receiving cancel', function() {
        iterator.next();
        iterator.next({ url: 'foo' });
        iterator.next();
        const next = iterator.next({ cancel: true, response: 'response' });

        assert.deepEqual(next.value, put(actions.loadHistoryPageCancel()));
        assert.isTrue(iterator.next().done);
    });

    it('should trigger loadHistoryPageError if receiving error', function() {
        iterator.next();
        iterator.next({ url: 'foo' });
        iterator.next();
        const next = iterator.next({ response: 'response', error: 'error' });

        assert.deepEqual(
            next.value,
            put(actions.loadHistoryPageError('error')),
        );
        assert.isTrue(iterator.next().done);
    });

    it('should trigger loadHistoryPageSuccess if receiving response with no error', function() {
        iterator.next();
        iterator.next({ url: 'foo' });
        iterator.next();
        const next = iterator.next({ response: 'response' });

        assert.deepEqual(
            next.value,
            put(actions.loadHistoryPageSuccess('response', 10)),
        );
    });
});
