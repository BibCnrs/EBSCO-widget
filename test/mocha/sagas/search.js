import { select, put, call } from 'redux-saga/effects';

import { search } from '../../../lib/sagas/search';
import fetch from '../../../lib/sagas/fetch';
import * as fromState from '../../../lib/selectors';

import actions, { SEARCH, RETRIEVE, LOGOUT } from '../../../lib/actions';

describe('sagas search', function() {
    let iterator;
    const action = { category: 'article', type: SEARCH };
    beforeEach(function() {
        iterator = search(action);
    });

    it('should select isUserLogged if user cannot search', function() {
        iterator.next();
        const next = iterator.next(false);
        assert.deepEqual(next.value, select(fromState.isUserLogged));
    });

    it('should put pauseAction and showLogin and then return if user is not logged', function() {
        iterator.next();
        iterator.next(false);
        let next = iterator.next(false);
        assert.deepEqual(next.value, put(actions.pauseAction(action)));
        next = iterator.next();
        assert.deepEqual(next.value, put(actions.showLogin()));
        next = iterator.next();
        assert.isTrue(next.done);
    });

    it('should put forbidAccess if user is logged', function() {
        iterator.next();
        iterator.next(false);
        let next = iterator.next(true);
        assert.deepEqual(
            next.value,
            put(actions.forbidAccess(action.category)),
        );
    });

    it('should select isQueryReady if user can search', function() {
        iterator.next();
        const next = iterator.next(true);
        assert.deepEqual(next.value, select(fromState.isQueryReady));
    });

    it('should end if isQueryReady is false', function() {
        iterator.next();
        iterator.next(true);
        const next = iterator.next(false);
        assert.isTrue(next.done);
    });

    it('should put searchPending, loading, select searchQuery, select searchRequest and then call fetch with searchrequest if isQueryReady is true', function() {
        iterator.next();
        iterator.next(true);
        let next = iterator.next(true);
        assert.deepEqual(
            next.value,
            put(actions.searchPending(action.category)),
        );
        next = iterator.next();
        assert.deepEqual(next.value, select(fromState.getSearchQuery));
        next = iterator.next({ search: 'query' });
        assert.deepEqual(next.value, select(fromState.getSearchRequest));
        next = iterator.next({ search: 'request' });
        assert.deepEqual(
            next.value,
            call(fetch, { search: 'request' }, [RETRIEVE, LOGOUT]),
        );
    });

    it('should put action searchCancel and return if receiving cancel key', function() {
        iterator.next();
        iterator.next(true);
        iterator.next(true);
        iterator.next();
        iterator.next({ search: 'query' });
        iterator.next({ search: 'request' });
        let next = iterator.next({ cancel: true });
        assert.deepEqual(
            next.value,
            put(actions.searchCancel(action.category)),
        );
        next = iterator.next();
        assert.isTrue(next.done);
    });

    it('should put searchError and return if receiving error key', function() {
        iterator.next();
        iterator.next(true);
        iterator.next(true);
        iterator.next();
        iterator.next({ search: 'query' });
        iterator.next({ search: 'request' });
        let next = iterator.next({ error: 'error' });
        assert.deepEqual(
            next.value,
            put(actions.searchError(action.category, 'error')),
        );
        next = iterator.next();
        assert.isTrue(next.done);
    });

    it('should put searchSuccess, loaded, call trackSearch and return if receiving response key', function() {
        iterator.next();
        iterator.next(true);
        iterator.next(true);
        iterator.next();
        iterator.next({ search: 'query', domain: 'domain' });
        iterator.next({ search: 'request' });
        let next = iterator.next({ response: 'response' });
        assert.deepEqual(
            next.value,
            put(
                actions.searchSuccess(action.category, 'response', {
                    search: 'query',
                    domain: 'domain',
                }),
            ),
        );
        next = iterator.next();
        assert.isTrue(next.done);
    });
});
