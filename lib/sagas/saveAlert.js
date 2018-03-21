import { takeEvery } from 'redux-saga';
import { call, select, put } from 'redux-saga/effects';

import * as fromState from '../selectors';
import fetch from './fetch';
import actions, { SAVE_ALERT } from '../actions';

export function* handleSaveAlert({ userId, historyId, frequence }) {
    const request = yield select(fromState.getApiSaveAlertRequest, {
        userId,
        historyId,
        frequence,
    });
    const { error } = yield call(fetch, request);

    if (error) {
        yield put(actions.fetchError(error));
        yield put(actions.saveAlertError(historyId, frequence));
    }
}

export default function*() {
    yield takeEvery(SAVE_ALERT, handleSaveAlert);
}
