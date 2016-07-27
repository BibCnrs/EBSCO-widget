import { takeEvery } from 'redux-saga';
import { call, select } from 'redux-saga/effects';

import { localStorage } from '../services/storage';
import * as fromState from '../reducers';
import { SEARCH_SUCCESS, DELETE_HISTORY } from '../actions';

export function* updateStorageHistory(action) {
    if (action.type === SEARCH_SUCCESS && action.category !== 'article') {
        return;
    }

    const history = yield select(fromState.getHistory);
    yield call(localStorage.setItem, 'EBSCO_WIDGET_history', history);
}

export default function* watchLoadPage() {
    yield takeEvery([SEARCH_SUCCESS, DELETE_HISTORY], updateStorageHistory);
}
