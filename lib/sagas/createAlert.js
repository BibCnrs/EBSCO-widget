import { takeEvery } from 'redux-saga';
import { call, select, put } from 'redux-saga/effects';

import * as fromState from '../selectors';
import fetch from './fetch';
import actions, { CREATE_ALERT } from '../actions';

export function* handleCreateAlert({ userId, historyId, frequence }) {
    const request = yield select(fromState.getApiCreateAlertRequest, {
        userId,
        historyId,
        frequence,
    });
    const { error } = yield call(fetch, request);

    if (error) {
        yield put(actions.fetchError(error));
    }
}

export default function*() {
    yield takeEvery(CREATE_ALERT, handleCreateAlert);
}
