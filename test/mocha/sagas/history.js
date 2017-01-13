import { call, select, put } from 'redux-saga/effects';

import { updateStorageHistory } from '../../../lib/sagas/history';
import { localStorage } from '../../../lib/services/storage';
import * as fromState from '../../../lib/selectors';
import actions, { DELETE_HISTORY, SEARCH_SUCCESS } from '../../../lib/actions';

describe('history sagas', function () {
    it('should return if action is SEARCH_SUCCESS for a category othe than article', function () {
        const iterator = updateStorageHistory({ type: SEARCH_SUCCESS, category: 'not article' });
        assert.isTrue(iterator.next().done);
    });

    it('should select canPersistHistoryOnServer', function () {
        const iterator = updateStorageHistory({ type: SEARCH_SUCCESS, category: 'article' });
        assert.deepEqual(iterator.next().value, select(fromState.canPersistHistoryOnServer));
    });

    it('should select history and save it in localStorage if canPersistHistoryOnServer is false', function () {
        const iterator = updateStorageHistory({ type: SEARCH_SUCCESS, category: 'article' });
        iterator.next();
        assert.deepEqual(iterator.next(false).value, select(fromState.getHistory));
        assert.deepEqual(iterator.next('history value').value, call(localStorage.setItem, 'EBSCO_WIDGET_history', 'history value'));
    });

    it('should put persistHistory if canPersistHistoryOnServer is true and action is SEARCH_SUCCESS', function () {
        const iterator = updateStorageHistory({ type: SEARCH_SUCCESS, category: 'article' });
        iterator.next();
        assert.deepEqual(iterator.next(true).value, put(actions.persistHistory()));
    });

    it('should put deleteHistoryFromServer if canPersistHistoryOnServer is true and action is DELETE_HISTORY', function () {
        const iterator = updateStorageHistory({ type: DELETE_HISTORY, category: 'article', query: { id: 'foo' } });
        iterator.next();
        assert.deepEqual(iterator.next(true).value, put(actions.deleteHistoryFromServer('foo')));
    });
});
