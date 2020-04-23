import { takeEvery } from 'redux-saga';
import { call, put, select } from 'redux-saga/effects';
import actions, { DISABLE_ALERT } from '../actions';
import * as fromState from '../selectors';
import fetch from './fetch';

export function* handleDisableAlert({ historyId }) {
    const request = yield select(
        fromState.getApiDisableAlertRequest,
        historyId,
    );
    const { error } = yield call(fetch, request);
    if (error) {
        yield put(actions.fetchError(error));
    }
}

export default function*() {
    yield takeEvery(DISABLE_ALERT, handleDisableAlert);
}
