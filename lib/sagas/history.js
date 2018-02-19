import { takeEvery } from 'redux-saga';
import { call, select, put } from 'redux-saga/effects';

import { localStorage } from '../services/storage';
import * as fromState from '../selectors';
import actions, { SEARCH_SUCCESS, DELETE_HISTORY } from '../actions';

export function* updateStorageHistory(action) {
    if (action.type === SEARCH_SUCCESS && action.category !== 'article') {
        return;
    }

    const canPersistHistoryOnServer = yield select(
        fromState.canPersistHistoryOnServer,
    );
    if (canPersistHistoryOnServer) {
        if (action.type === SEARCH_SUCCESS) {
            yield put(actions.persistHistory());
        } else {
            yield put(actions.deleteHistoryFromServer(action.query.id));
        }
    } else {
        const history = yield select(fromState.getHistory);
        yield call(localStorage.setItem, 'EBSCO_WIDGET_history', history);
    }
}

export default function* watchLoadPage() {
    yield takeEvery([SEARCH_SUCCESS, DELETE_HISTORY], updateStorageHistory);
}
