import { takeEvery } from 'redux-saga';
import { call, select, put } from 'redux-saga/effects';

import * as fromState from '../selectors';
import fetch from './fetch';
import actions, { REMOVE_ALERT } from '../actions';

export function* handleRemoveAlert({ historyId }) {
    const request = yield select(fromState.getApiRemoveAlertRequest, historyId);
    const { error } = yield call(fetch, request);

    if (error) {
        yield put(actions.fetchError(error));
    }
}

export default function*() {
    yield takeEvery(REMOVE_ALERT, handleRemoveAlert);
}
