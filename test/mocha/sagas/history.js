import { call, select } from 'redux-saga/effects';

import { updateStorageHistory } from '../../../lib/sagas/history';
import { localStorage } from '../../../lib/services/storage';
import * as fromState from '../../../lib/reducers';
import { SEARCH_SUCCESS } from '../../../lib/actions';

describe('history sagas', function () {
    it('should return if action is SEARCH_SUCCESS for a category othe than article', function () {
        const iterator = updateStorageHistory({ type: SEARCH_SUCCESS, category: 'not article' });
        assert.isTrue(iterator.next().done);
    });

    it('should select history and save it in localStorage', function () {
        const iterator = updateStorageHistory({ type: SEARCH_SUCCESS, category: 'article' });
        const selectStep = iterator.next();
        assert.deepEqual(selectStep.value, select(fromState.getHistory));
        const callStep = iterator.next('history value');
        assert.deepEqual(callStep.value, call(localStorage.setItem, 'EBSCO_WIDGET_history', 'history value'));
    });
});
