import { takeLatest } from 'redux-saga';
import { put, select, call } from 'redux-saga/effects';
import fetch from './fetch';

import * as fromState from '../selectors';
import actions, {
    API_PERSIST_HISTORY
} from '../actions';

export function* apiPersistHistory() {
    const request = yield select(fromState.getApiPersistHistoryRequest);
    console.log({ request });
    yield put(actions.persistHistoryPending());

    const { response, error, cancel } = yield call(fetch, request, [], false);

    if(error) {
        return yield put(actions.persistHistoryError(error));
    }

    if(cancel) {
        return yield put(actions.persistHistoryCancel());
    }

    yield put(actions.persistHistorySuccess(response));
}

function* watchApiPersistHistory() {
    yield* takeLatest(API_PERSIST_HISTORY, apiPersistHistory);
}

export default watchApiPersistHistory;
