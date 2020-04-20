import { takeLatest } from 'redux-saga';
import { put, select, call } from 'redux-saga/effects';
import fetch from './fetch';

import * as fromState from '../selectors';
import actions, { API_DELETE_HISTORIES } from '../actions';

export function* apiDeleteHistories() {
    const request = yield select(fromState.getApiDeleteHistoriesRequest);
    yield put(actions.deleteHistoriesFromServerPending());

    const { response, error, cancel } = yield call(
        fetch,
        {
            ...request,
            url: request.url,
        },
        [],
        false,
    );

    if (error) {
        return yield put(actions.deleteHistoriesFromServerError(error));
    }

    if (cancel) {
        return yield put(actions.deleteHistoriesFromServerCancel());
    }

    yield put(actions.deleteHistoriesFromServerSuccess(response));
}

function* watchApiDeleteHistories() {
    yield* takeLatest(API_DELETE_HISTORIES, apiDeleteHistories);
}

export default watchApiDeleteHistories;
