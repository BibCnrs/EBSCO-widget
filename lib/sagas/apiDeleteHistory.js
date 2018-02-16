import { takeLatest } from 'redux-saga';
import { put, select, call } from 'redux-saga/effects';
import fetch from './fetch';

import * as fromState from '../selectors';
import actions, { API_DELETE_HISTORY } from '../actions';

export function* apiDeleteHistory({ id }) {
    const request = yield select(fromState.getApiDeleteHistoryRequest);
    yield put(actions.deleteHistoryFromServerPending());

    const { response, error, cancel } = yield call(
        fetch,
        {
            ...request,
            url: `${request.url}?id=${id}`,
        },
        [],
        false,
    );

    if (error) {
        return yield put(actions.deleteHistoryFromServerError(error));
    }

    if (cancel) {
        return yield put(actions.deleteHistoryFromServerCancel());
    }

    yield put(actions.deleteHistoryFromServerSuccess(response));
}

function* watchApiDeleteHistory() {
    yield* takeLatest(API_DELETE_HISTORY, apiDeleteHistory);
}

export default watchApiDeleteHistory;
